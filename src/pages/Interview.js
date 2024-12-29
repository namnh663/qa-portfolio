import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchInterviewQA, fetchTopics } from '../services/fetchInterviewQA';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/ui/Card';
import Footer from '../components/common/Footer';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';

const Interview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [topics, setTopics] = useState(['All']);
  const { data: questions, loading, error } = useFetch(fetchInterviewQA);

  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(debouncedSearch), 300);
    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const fetchedTopics = await fetchTopics();
        setTopics(['All', ...fetchedTopics]);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
    loadTopics();
  }, []);

  const filteredQuestions = questions?.filter(q =>
    (selectedTopic === 'All' || q.topic === selectedTopic) &&
    (q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') setCurrentPage(prev => Math.max(prev - 1, 1));
      if (e.key === 'ArrowRight') setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [totalPages]);

  const toggleAnswer = (id) => {
    setExpandedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openAllAnswers = () => {
    const allAnswers = {};
    paginatedQuestions.forEach(q => {
      allAnswers[q.id] = true;
    });
    setExpandedAnswers(allAnswers);
  };

  const hideAllAnswers = () => {
    setExpandedAnswers({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-12 text-center text-gray-800 dark:text-white">
          Technical Interview Questions
        </h1>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="relative">
            <input
              type="text"
              id="search-input"
              placeholder="Search questions and answers..."
              value={debouncedSearch}
              onChange={(e) => setDebouncedSearch(e.target.value)}
              className="w-full p-4 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 transition duration-200"
              aria-label="Search questions and answers"
            />
            <svg className="absolute left-4 top-4 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {topics.map(topic => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-full text-sm md:text-base ${
                  selectedTopic === topic 
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700'
                } transition-all duration-300`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg">
            <div className="flex justify-end space-x-4">
              <button
                onClick={openAllAnswers}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
              >
                Open All Answers
              </button>
              <button
                onClick={hideAllAnswers}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Hide All Answers
              </button>
            </div>
          </div>

          <div className="transition-opacity duration-300 ease-in-out">
            {loading ? (
              <LoadingSpinner className="w-12 h-12 mx-auto" />
            ) : error ? (
              <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
                {error.message}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {paginatedQuestions.map((q) => (
                  <Card 
                    key={q.id} 
                    className="p-6 hover:shadow-xl dark:hover:shadow-2xl-dark transition-all duration-300"
                  >
                    <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-4">
                      {q.topic}
                    </span>
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{q.question}</h2>
                    <button
                      onClick={() => toggleAnswer(q.id)}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                      aria-expanded={expandedAnswers[q.id]}
                      aria-controls={`answer-${q.id}`}
                    >
                      {expandedAnswers[q.id] ? 'Hide Answer' : 'Show Answer'}
                    </button>
                    {expandedAnswers[q.id] && (
                      <div id={`answer-${q.id}`} className="mt-4">
                        <MarkdownRenderer 
                          content={q.answer}
                          className="text-gray-700 dark:text-gray-300 leading-relaxed"
                        />
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition duration-200"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Interview;
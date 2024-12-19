import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchInterviewQA, fetchTopics } from '../services/fetchInterviewQA';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/ui/Card';
import Footer from '../components/common/Footer';

const Interview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [topics, setTopics] = useState(['All']);
  const { data: questions, loading, error } = useFetch(fetchInterviewQA);

  const itemsPerPage = 10;

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

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading interview questions</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800 dark:text-white">
          Technical Interview Questions
        </h1>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Search Input with Icon */}
          <div className="relative">
            <input
              type="text"
              id="search-input"
              placeholder="Search questions and answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 transition duration-200"
              aria-label="Search questions and answers"
            />
            <svg className="absolute left-4 top-4 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Topic Tabs */}
          <div className="flex space-x-4 overflow-x-auto">
            {topics.map(topic => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-lg ${selectedTopic === topic ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'} transition duration-200`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Open/Hide All Answers Buttons */}
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

          {/* Questions Grid */}
          <div className="grid gap-8">
            {paginatedQuestions.map((q) => (
              <Card key={q.id} className="transform hover:scale-[1.01] transition-transform duration-200">
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
                  <p id={`answer-${q.id}`} className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {q.answer}
                  </p>
                )}
              </Card>
            ))}
          </div>

          {/* Pagination */}
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
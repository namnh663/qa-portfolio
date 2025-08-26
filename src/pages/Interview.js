import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { fetchInterviewQA, fetchTopics } from '../services/fetchInterviewQA';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/ui/Card';
import Footer from '../components/common/Footer';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';

/**
 * Local debounce hook to mirror the upgraded app's hooks pattern
 * (kept inline to avoid new imports; easy to extract later).
 */
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const ITEMS_PER_PAGE = 10;

const Interview = () => {
  // search/filter
  const [rawSearch, setRawSearch] = useState('');
  const search = useDebouncedValue(rawSearch, 300);
  const [selectedTopic, setSelectedTopic] = useState('All');

  // expanded answers (use Set for O(1) lookups & smaller memory)
  const [expanded, setExpanded] = useState(() => new Set());

  // pagination
  const [page, setPage] = useState(1);

  // topics
  const [topics, setTopics] = useState(['All']);

  // data
  const {
    data: questions,
    loading,
    error,
  } = useFetch(fetchInterviewQA);

  // focus management for a11y
  const topRef = useRef(null);

  // fetch topics once
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const fetched = await fetchTopics();
        if (!active) return;
        setTopics((prev) => ['All', ...fetched.filter(Boolean)]);
      } catch (e) {
        // non-blocking; log only
        // eslint-disable-next-line no-console
        console.error('Error fetching topics:', e);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // derived data
  const filtered = useMemo(() => {
    if (!questions?.length) return [];
    const s = search.trim().toLowerCase();
    const byTopic = selectedTopic === 'All'
      ? questions
      : questions.filter((q) => q.topic === selectedTopic);

    if (!s) return byTopic;

    return byTopic.filter((q) => {
      const qText = q.question?.toLowerCase() ?? '';
      const aText = q.answer?.toLowerCase() ?? '';
      return qText.includes(s) || aText.includes(s);
    });
  }, [questions, search, selectedTopic]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  // clamp page when filters change
  useEffect(() => {
    setPage(1);
    // collapse expanded answers when changing filters to reduce DOM
    setExpanded(new Set());
  }, [search, selectedTopic]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  // counts for header buttons (for current page)
  const pageExpandedCount = useMemo(
    () => paginated.reduce((n, q) => n + (expanded.has(q.id) ? 1 : 0), 0),
    [paginated, expanded]
  );
  const allOnPageExpanded = paginated.length > 0 && pageExpandedCount === paginated.length;
  const noneOnPageExpanded = pageExpandedCount === 0;

  // keyboard pagination like the upgraded app (left/right)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(1, p - 1));
      if (e.key === 'ArrowRight') setPage((p) => Math.min(totalPages, p + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [totalPages]);

  const toggleAnswer = useCallback((id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const openAllAnswers = useCallback(() => {
    const all = new Set();
    paginated.forEach((q) => all.add(q.id));
    setExpanded(all);
  }, [paginated]);

  const hideAllAnswers = useCallback(() => {
    setExpanded(new Set());
  }, []);

  const goPrev = useCallback(() => {
    setPage((p) => {
      const next = Math.max(1, p - 1);
      if (next !== p) topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return next;
    });
  }, []);

  const goNext = useCallback(() => {
    setPage((p) => {
      const next = Math.min(totalPages, p + 1);
      if (next !== p) topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return next;
    });
  }, [totalPages]);

  const onSelectTopic = useCallback((topic) => setSelectedTopic(topic), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1
          ref={topRef}
          className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-12 text-center text-gray-800 dark:text-white"
        >
          Technical Interview Questions
        </h1>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <label htmlFor="search-input" className="sr-only">
              Search questions and answers
            </label>
            <input
              id="search-input"
              type="search"
              placeholder="Search questions and answers..."
              value={rawSearch}
              onChange={(e) => setRawSearch(e.target.value)}
              className="w-full p-4 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 transition duration-200"
              aria-label="Search questions and answers"
              autoComplete="off"
              spellCheck={false}
            />
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-4 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {topics.map((topic) => {
              const isActive = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  onClick={() => onSelectTopic(topic)}
                  type="button"
                  className={[
                    'px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100',
                  ].join(' ')}
                  aria-pressed={isActive}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          {/* Header: count + bulk actions (like your screenshot) */}
          <div className="sticky top-0 z-10">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50/80 dark:border-gray-700 dark:bg-gray-800/70 backdrop-blur px-4 sm:px-6 py-4">
              <div className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                {paginated.length} {paginated.length === 1 ? 'Question' : 'Questions'}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={openAllAnswers}
                  disabled={allOnPageExpanded || paginated.length === 0}
                  className={[
                    'inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 font-medium transition',
                    allOnPageExpanded || paginated.length === 0
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                      : 'bg-gray-900 text-white hover:opacity-90 dark:bg-gray-900',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900',
                  ].join(' ')}
                  aria-disabled={allOnPageExpanded || paginated.length === 0}
                  title="Expand all answers on this page"
                >
                  <Eye className="h-5 w-5" aria-hidden="true" />
                  <span>Show All</span>
                </button>

                <button
                  type="button"
                  onClick={hideAllAnswers}
                  disabled={noneOnPageExpanded}
                  className={[
                    'inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 font-medium transition',
                    noneOnPageExpanded
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                      : 'bg-gray-400 text-white hover:opacity-90 dark:bg-gray-600',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600',
                  ].join(' ')}
                  aria-disabled={noneOnPageExpanded}
                  title="Collapse all answers on this page"
                >
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                  <span>Hide All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="transition-opacity duration-300 ease-in-out">
            {loading ? (
              <LoadingSpinner className="w-12 h-12 mx-auto" />
            ) : error ? (
              <div role="alert" className="text-red-700 text-center p-4 bg-red-100 rounded-lg">
                {error.message || 'Something went wrong. Please try again.'}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center text-gray-600 dark:text-gray-300 p-8">
                No results. Try a different keyword or topic.
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-6">
                {paginated.map((q) => {
                  const isOpen = expanded.has(q.id);
                  const answerId = `answer-${q.id}`;
                  return (
                    <li key={q.id}>
                      <Card className="p-6 hover:shadow-xl dark:hover:shadow-2xl-dark transition-all duration-300">
                        <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-4">
                          {q.topic}
                        </span>

                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                          {q.question}
                        </h2>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleAnswer(q.id)}
                            type="button"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                            aria-expanded={isOpen}
                            aria-controls={answerId}
                          >
                            {isOpen ? 'Hide Answer' : 'Show Answer'}
                          </button>
                        </div>

                        {isOpen && (
                          <div id={answerId} className="mt-4">
                            <MarkdownRenderer
                              content={q.answer}
                              className="text-gray-700 dark:text-gray-300 leading-relaxed"
                            />
                          </div>
                        )}
                      </Card>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Pagination */}
          <nav
            className="flex justify-center items-center gap-4 mt-12"
            aria-label="Pagination"
          >
            <button
              onClick={goPrev}
              disabled={page === 1}
              type="button"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow" aria-live="polite">
              {page} / {totalPages}
            </span>
            <button
              onClick={goNext}
              disabled={page === totalPages}
              type="button"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            >
              Next
            </button>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Interview;
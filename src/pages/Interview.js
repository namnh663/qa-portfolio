import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
// Updated imports: Removed Eye/EyeOff, kept ChevronDown
import { ChevronDown } from 'lucide-react'; 
import useFetch from '../hooks/useFetch';
import { fetchInterviewQA, fetchTopics } from '../services/fetchInterviewQA';
import LoadingSpinner from '../components/common/LoadingSpinner';
// We no longer use the 'Card' component wrapper, so it could be removed,
// but I'll leave it in case your 'Card' component is just a styled 'div'.
// For this design, I'll remove the <Card> wrapper in the JSX.
import Footer from '../components/common/Footer';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';

/**
 * Local debounce hook (unchanged)
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
  // All state, hooks, and logic from your original code remain unchanged...
  // ... (search, selectedTopic, expanded, page, topics, data, topRef) ...
  
  // search/filter
  const [rawSearch, setRawSearch] = useState('');
  const search = useDebouncedValue(rawSearch, 300);
  const [selectedTopic, setSelectedTopic] = useState('All');

  // expanded answers
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

  // focus management
  const topRef = useRef(null);

  // fetch topics
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const fetched = await fetchTopics();
        if (!active) return;
        setTopics((prev) => ['All', ...fetched.filter(Boolean)]);
      } catch (e) {
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

  // clamp page
  useEffect(() => {
    setPage(1);
    setExpanded(new Set());
  }, [search, selectedTopic]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  // counts for header buttons
  const pageExpandedCount = useMemo(
    () => paginated.reduce((n, q) => n + (expanded.has(q.id) ? 1 : 0), 0),
    [paginated, expanded]
  );
  const allOnPageExpanded = paginated.length > 0 && pageExpandedCount === paginated.length;
  const noneOnPageExpanded = pageExpandedCount === 0;

  // keyboard pagination
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(1, p - 1));
      if (e.key === 'ArrowRight') setPage((p) => Math.min(totalPages, p + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [totalPages]);

  // All event handlers (toggleAnswer, openAllAnswers, etc.) are unchanged...
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

  // ========================================================================
  // START: REDESIGNED RENDER METHOD (Minimal Style)
  // ========================================================================
  return (
    // Use a slightly off-white background for a softer feel
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1
          ref={topRef}
          className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white" // Font size reduced
        >
          Technical Interview Questions
        </h1>

        <div className="max-w-3xl mx-auto space-y-5">
          {/*
           * ======================================
           * Sharper, Flatter Control Panel
           * ======================================
           */}
          <div className="sticky top-4 z-10 space-y-3 rounded-md border border-gray-200 bg-white/90 p-3 sm:p-4 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/90">
            {/* Row 1: Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-grow">
                <label htmlFor="search-input" className="sr-only">
                  Search questions and answers
                </label>
                <input
                  id="search-input"
                  type="search"
                  placeholder="Search questions and answers..."
                  value={rawSearch}
                  onChange={(e) => setRawSearch(e.target.value)}
                  className="w-full p-2.5 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 transition" // Sharper 'rounded-md'
                  aria-label="Search questions and answers"
                  autoComplete="off"
                  spellCheck={false}
                />
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Topics (Select Dropdown) */}
              <div className="relative sm:max-w-xs flex-grow">
                <label htmlFor="topic-select" className="sr-only">
                  Filter by topic
                </label>
                <select
                  id="topic-select"
                  value={selectedTopic}
                  onChange={(e) => onSelectTopic(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 transition" // Sharper 'rounded-md'
                  aria-label="Filter by topic"
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                />
              </div>
            </div>

            {/* Row 2: Count and Bulk Actions */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {loading
                  ? 'Loading...'
                  : `Showing ${paginated.length} of ${filtered.length} ${filtered.length === 1 ? 'result' : 'results'}`}
              </div>

              {/* Minimalist text buttons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={openAllAnswers}
                  disabled={allOnPageExpanded || paginated.length === 0}
                  className="text-sm font-medium text-blue-600 hover:underline focus:underline focus:outline-none disabled:text-gray-400 disabled:cursor-not-allowed disabled:no-underline dark:text-blue-400 dark:hover:text-blue-300 dark:disabled:text-gray-500 transition"
                  aria-disabled={allOnPageExpanded || paginated.length === 0}
                  title="Expand all answers on this page"
                >
                  Show All
                </button>

                <button
                  type="button"
                  onClick={hideAllAnswers}
                  disabled={noneOnPageExpanded}
                  className="text-sm font-medium text-gray-600 hover:underline focus:underline focus:outline-none disabled:text-gray-400 disabled:cursor-not-allowed disabled:no-underline dark:text-gray-400 dark:hover:text-gray-300 dark:disabled:text-gray-500 transition"
                  aria-disabled={noneOnPageExpanded}
                  title="Collapse all answers on this page"
                >
                  Hide All
                </button>
              </div>
            </div>
          </div>
          {/* End of Control Panel */}

          {/* Content */}
          <div className="transition-opacity duration-300 ease-in-out">
            {loading ? (
              <LoadingSpinner className="w-10 h-10 mx-auto mt-12" />
            ) : error ? (
              <div role="alert" className="text-red-700 text-center p-4 bg-red-100 rounded-md">
                {error.message || 'Something went wrong. Please try again.'}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center text-gray-600 dark:text-gray-400 p-8">
                No results. Try a different keyword or topic.
              </div>
            ) : (
              // Tighter gap between cards
              <ul className="grid grid-cols-1 gap-3">
                {/*
                 * ======================================
                 * NEW: Flat, Bordered Accordion Card
                 * ======================================
                 */}
                {paginated.map((q) => {
                  const isOpen = expanded.has(q.id);
                  const answerId = `answer-${q.id}`;
                  return (
                    // This is now the main card element
                    <li key={q.id} className="border border-gray-200 dark:border-gray-700/50 rounded-md bg-white dark:bg-gray-800 shadow-sm transition-all duration-300">
                      {/* The button is the entire header */}
                      <button
                        onClick={() => toggleAnswer(q.id)}
                        type="button"
                        className="flex w-full items-start justify-between gap-4 p-4 text-left"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                      >
                        <div className="flex-1">
                          {/* Sharper topic tag */}
                          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-2">
                            {q.topic}
                          </span>
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {/* Font size reduced */}
                            {q.question}
                          </h2>
                        </div>
                        <ChevronDown
                          aria-hidden="true"
                          className={[
                            'h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-300', // Smaller chevron
                            isOpen ? 'rotate-180' : 'rotate-0',
                          ].join(' ')}
                        />
                      </button>

                      {/* Animated answer panel */}
                      <div
                        id={answerId}
                        className={[
                          'overflow-hidden transition-all duration-300 ease-in-out',
                          isOpen ? 'max-h-[2000px]' : 'max-h-0',
                        ].join(' ')}
                      >
                        {/* 'prose' class auto-styles Markdown */}
                        <div className="p-4 pt-0">
                          <MarkdownRenderer
                            content={q.answer}
                            className="text-gray-700 dark:text-gray-300 leading-relaxed"
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/*
           * ======================================
           * Sharper Pagination
           * ======================================
           */}
          {!loading && !error && filtered.length > 0 && (
            <nav
              className="flex justify-between items-center gap-4 mt-8" // Reduced margin-top
              aria-label="Pagination"
            >
              <button
                onClick={goPrev}
                disabled={page === 1}
                type="button"
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" // Flatter button style
              >
                Previous
              </button>
              
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400" aria-live="polite">
                Page {page} / {totalPages}
              </span>
              
              <button
                onClick={goNext}
                disabled={page === totalPages}
                type="button"
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" // Flatter button style
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
  // ========================================================================
  // END: REDESIGNED RENDER METHOD
  // ========================================================================
};

export default Interview;
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Updated to lucide-react icons for a consistent, modern style
import { 
  FileText, 
  Video, 
  Code, 
  Search, 
  X, 
  ArrowUpRight, 
  Loader2 
} from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { fetchResources } from '../services/fetchResources';
import Button from '../components/ui/Button';
// Card component is no longer used, as the 'a' tag is the card
import Footer from '../components/common/Footer';

// Updated typeIcons with lucide-react
const typeIcons = {
  "Article": <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  "Template": <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
  "Checklist": <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />,
  "Video": <Video className="h-5 w-5 text-red-600 dark:text-red-400" />,
  "Tool": <Code className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
};

// Updated Skeleton to match the new card layout
const ResourceSkeleton = () => (
  <div className="animate-pulse p-5 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4">
    <div className="flex justify-between items-center">
      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
    </div>
    <div className="space-y-2">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
    </div>
    <div className="flex flex-wrap gap-2 pt-4">
      <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
    </div>
  </div>
);

// useDebounce hook (from original code)
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return [debouncedValue];
};

const ITEMS_PER_PAGE = 12;

const Resources = () => {
  const { data: resources, loading, error } = useFetch(fetchResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(searchTerm, 300);

  // Memoize all filtered resources
  const allFilteredResources = useMemo(() => {
    if (!resources) return [];
    return resources.filter(resource =>
      resource.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (selectedType === 'All' || resource.type === selectedType)
    );
  }, [resources, debouncedSearch, selectedType]);

  // Paginate the filtered resources
  const paginatedResources = useMemo(() => {
    return allFilteredResources.slice(0, page * ITEMS_PER_PAGE);
  }, [allFilteredResources, page]);

  // Check if there are more items to load
  const hasMore = paginatedResources.length < allFilteredResources.length;

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedType]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-600">Error loading resources: {error.message}</p>
      <Button onClick={() => window.location.reload()} className="mt-4">
        Try Again
      </Button>
    </div>
  );

  const types = ['All', ...new Set(resources?.map(resource => resource.type) || [])];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="container mx-auto px-4 sm:px-6 py-12">
        {/*
         * ======================================
         * NEW: Simplified Header
         * ======================================
         */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resources Hub
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A curated collection of testing tools, articles, videos, and materials to help you excel.
          </p>
        </motion.div>

        {/*
         * ======================================
         * NEW: Simplified Filter Bar
         * ======================================
         */}
        <div
          role="region"
          aria-label="Resource filters"
          className="sticky top-4 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg py-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm mb-10"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative group w-full md:w-80">
                <label htmlFor="resource-search" className="sr-only">Search resources</label>
                <input
                  id="resource-search"
                  name="searchTerm"
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-10 py-2.5 rounded-md border border-gray-300
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                           dark:bg-gray-800 dark:border-gray-700 dark:text-white 
                           transition-all duration-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                      onClick={() => setSearchTerm('')}
                      aria-label="Clear search"
                    >
                      <X className="text-gray-400 hover:text-gray-600 h-4 w-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 overflow-x-auto whitespace-nowrap w-full md:w-auto pb-2 md:pb-0">
                {types.map(type => (
                  <Button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedType === type
                        ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                    aria-pressed={selectedType === type}
                  >
                    {type}
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      selectedType === type
                        ? 'bg-white/20 text-white dark:bg-black/20 dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {type === 'All' ? (resources?.length || 0) : resources.filter(r => r.type === type).length}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*
         * ======================================
         * NEW: Resource Card Grid
         * ======================================
         */}
        {loading && page === 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
            {[...Array(8)].map((_, i) => <ResourceSkeleton key={i} />)}
          </div>
        ) : allFilteredResources.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">No resources found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 auto-rows-fr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {paginatedResources.map((resource, index) => (
              <motion.a
                key={resource.id}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 h-full flex flex-col bg-white dark:bg-gray-800 
                           rounded-xl border border-gray-200 dark:border-gray-700
                           shadow-sm hover:shadow-lg hover:border-blue-500/50
                           transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`p-2 rounded-lg bg-${typeIcons[resource.type].props.className.match(/-(blue|indigo|green|red|purple)-/)[1]}-100 dark:bg-${typeIcons[resource.type].props.className.match(/-(blue|indigo|green|red|purple)-/)[1]}-900/50`}>
                    {typeIcons[resource.type]}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>

                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  {resource.description}
                </p>
                
                {resource.tags && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {resource.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 
                                 rounded-full text-gray-700 dark:text-gray-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.a>
            ))}
          </motion.div>
        )}

        {/*
         * ======================================
         * NEW: Load More Button
         * ======================================
         */}
        <div className="text-center mt-12">
          {hasMore && (
            <Button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-3"
            >
              {loading && page > 1 ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </span>
              ) : (
                'Load More'
              )}
            </Button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaVideo, FaCode, FaSearch, FaTimes } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import { fetchResources } from '../services/fetchResources';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Footer from '../components/common/Footer';

const typeIcons = {
  "Article": <FaFileAlt className="h-5 w-5" />,
  "Template": <FaFileAlt className="h-5 w-5" />,
  "Checklist": <FaFileAlt className="h-5 w-5" />,
  "Video": <FaVideo className="h-5 w-5" />,
  "Tool": <FaCode className="h-5 w-5" />,
};

const ResourceSkeleton = () => (
  <div className="animate-pulse rounded-xl overflow-hidden">
    <div className="h-48 bg-gray-200 dark:bg-gray-700" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>
    </div>
  </div>
);

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

const Resources = () => {
  const { data: resources, loading, error } = useFetch(fetchResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const [debouncedSearch] = useDebounce(searchTerm, 300);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
      {[...Array(8)].map((_, i) => <ResourceSkeleton key={i} />)}
    </div>
  );

  if (error) return (
    <div className="text-center py-10">
      <p className="text-red-600">Error loading resources: {error.message}</p>
      <Button onClick={() => window.location.reload()} className="mt-4">
        Try Again
      </Button>
    </div>
  );

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
    (selectedType === 'All' || resource.type === selectedType)
  ).slice(0, page * ITEMS_PER_PAGE);

  const types = ['All', ...new Set(resources.map(resource => resource.type))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 mb-12">
        <motion.div
          className="container mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4">QA Resources Hub</h1>
          <p className="text-xl opacity-90">Curated collection of testing tools and materials</p>
        </motion.div>
      </div>

      <main className="container mx-auto px-6 py-8">
        <div 
          role="region" 
          aria-label="Resource filters"
          className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg py-4 border-b border-gray-200 dark:border-gray-700 mb-8"
        >
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="relative group w-full md:w-96"
              whileHover={{ scale: 1.02 }}
            >
              <label htmlFor="resource-search" className="sr-only">Search resources</label>
              <input
                id="resource-search"
                name="searchTerm"
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-12 py-3 rounded-full border-2 border-gray-200 
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20
                         dark:bg-gray-800 dark:border-gray-700 dark:text-white 
                         transition-all duration-300"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                  >
                    <FaTimes className="text-gray-400 hover:text-gray-600" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="flex gap-2 overflow-x-auto whitespace-nowrap w-full md:w-auto pb-2">
              {types.map(type => (
                <Button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedType === type 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  aria-pressed={selectedType === type}
                >
                  {type}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    selectedType === type 
                      ? 'bg-white/20' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    {type === 'All' ? resources.length : resources.filter(r => r.type === type).length}
                  </span>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 auto-rows-fr"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredResources.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No resources found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="group p-6 h-full flex flex-col bg-white dark:bg-gray-800 
                           rounded-xl shadow-lg hover:shadow-2xl transform 
                           transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r 
                                from-blue-500 to-purple-500 rounded-t-xl" />
                  <div className="flex items-center gap-3 mb-4">
                    {typeIcons[resource.type]}
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {resource.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {resource.description}
                  </p>
                  {resource.tags && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {resource.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 
                                   rounded-full text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mt-auto"
                  >
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 
                               to-purple-600 hover:from-blue-700 hover:to-purple-700 
                               text-white text-center rounded-lg transition-all duration-300"
                      aria-label={`Access ${resource.title}`}
                    >
                      Access Resource
                    </a>
                  </motion.div>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
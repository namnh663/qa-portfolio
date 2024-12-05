import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaVideo, FaCode, FaSearch } from 'react-icons/fa';
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
  <div className="animate-pulse p-6 h-full bg-white dark:bg-gray-800 rounded-lg">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
    <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
  </div>
);

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue];
};

const Resources = () => {
  const { data: resources, loading, error } = useFetch(fetchResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => <ResourceSkeleton key={i} />)}
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
      <main className="container mx-auto px-6 py-8">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Resources
        </motion.h1>

        <motion.div
          role="region"
          aria-label="Resource filters"
          className="mb-8 flex flex-col md:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full md:w-auto flex-grow">
            <label htmlFor="resource-search" className="sr-only">Search resources</label>
            <input
              id="resource-search"
              name="searchTerm"
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 border border-gray-300 dark:border-gray-600 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scroll-smooth w-full md:w-auto">
            {types.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded ${selectedType === type ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                aria-pressed={selectedType === type}
              >
                {type}
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${selectedType === type ? 'bg-blue-700 text-white dark:bg-blue-600' : 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-300'}`}>
                  {type === 'All' ? resources.length : resources.filter(r => r.type === type).length}
                </span>
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
                  className="p-6 h-full flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => window.open(resource.link, '_blank')}
                >
                  <div className="card-header flex items-center gap-2 mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                    {typeIcons[resource.type]}
                    <span>{resource.title}</span>
                  </div>
                  <div className="card-description text-sm text-gray-500 dark:text-gray-400 mb-2">{resource.type}</div>
                  <div className="card-content flex-grow text-gray-600 dark:text-gray-300 mb-4">
                    <p>{resource.description}</p>
                  </div>
                  {resource.tags && (
                    <div className="flex gap-2 mt-2 mb-4">
                      {resource.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-auto bg-blue-600 text-white dark:bg-blue-500 rounded-lg py-2 text-center block transition-colors duration-200 hover:bg-blue-700 dark:hover:bg-blue-600"
                    aria-label={`Access ${resource.title}`}
                  >
                    Access Resource
                  </a>
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
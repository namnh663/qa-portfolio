import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaFileAlt, FaSearch, FaVideo } from 'react-icons/fa';
import supabase from '../supabaseClient';
import Button from '../components/Button';
import Card from '../components/Card';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner'; // Assuming you have a loading spinner component

const typeIcons = {
  "Article": <FaFileAlt className="h-5 w-5" />,
  "Template": <FaFileAlt className="h-5 w-5" />,
  "Checklist": <FaFileAlt className="h-5 w-5" />,
  "Video": <FaVideo className="h-5 w-5" />,
  "Tool": <FaCode className="h-5 w-5" />,
};

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch resources from Supabase
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('resources').select('*');

      if (error) {
        console.error('Error fetching resources:', error);
      } else {
        setResources(data);
      }
      setLoading(false);
    };

    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedType === 'All' || resource.type === selectedType)
  );

  const types = ['All', ...new Set(resources.map(resource => resource.type))];

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while data is loading
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-6 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Resources
        </motion.h1>

        {/* Search and Filter Section */}
        <motion.div 
          className="mb-8 flex flex-col md:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full md:w-auto flex-grow">
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
          <div className="flex gap-2 overflow-x-auto">
            {types.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded ${selectedType === type ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-black' : 'text-gray-800 dark:text-gray-300'}`}
              >
                {type}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Resource Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
                <div className="card-header flex items-center gap-2 mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                  {typeIcons[resource.type]}
                  <span>{resource.title}</span>
                </div>
                <div className="card-description text-sm text-gray-500 dark:text-gray-400 mb-2">{resource.type}</div>
                <div className="card-content flex-grow text-gray-600 dark:text-gray-300 mb-4">
                  <p>{resource.description}</p>
                </div>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4 bg-black text-white dark:bg-gray-900 rounded-lg py-2 text-center block"
                >
                  Access Resource
                </a>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
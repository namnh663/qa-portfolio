import { useState, useMemo } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchLearningPosts } from '../services/fetchLearningPosts';
import Skeleton from '../components/common/Skeleton';
import Footer from '../components/common/Footer';
import LearningCard from '../components/learning/LearningCard';
import { Search, RotateCcw, Coffee, AlertTriangle } from 'lucide-react';

const Learning = () => {
  const { data: posts, loading, error } = useFetch(fetchLearningPosts);
  
  // State for Search and Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 1. Extract unique categories from actual data
  const categories = useMemo(() => {
    const unique = new Set(posts?.map(p => p.category) || []);
    // Ensure "All" is first, then sort the rest alphabetically
    return ['All', ...Array.from(unique).sort()];
  }, [posts]);

  // 2. Filter Logic (Search + Category)
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);


  // ==========================================
  // STATE 1: LOADING (Skeleton View)
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <main className="container mx-auto px-4 py-12 flex-grow">
          {/* Header Skeleton */}
          <div className="max-w-2xl mx-auto mb-12 text-center space-y-4">
             <Skeleton className="h-10 w-48 mx-auto" />
             <Skeleton className="h-12 w-full rounded-full" />
          </div>
          {/* Grid Skeleton */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <Skeleton className="h-6 w-24 rounded-full mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // STATE 2: ERROR (Redesigned)
  // ==========================================
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col font-sans">
        <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          {/* Error Icon */}
          <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-3">
            Unable to load articles
          </h2>
          
          <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8 leading-relaxed">
            There was a problem connecting to the server. Please check your internet connection and try again.
          </p>
          
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-2.5 
                       text-red-700 dark:text-red-400 font-medium 
                       bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800
                       hover:bg-red-100 dark:hover:bg-red-900/30
                       rounded-full transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // ==========================================
  // STATE 3: EMPTY DATABASE (No posts at all)
  // ==========================================
  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col font-sans">
        <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          {/* Friendly Coffee Icon */}
          <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
            <Coffee className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-3">
            No articles published yet
          </h2>
          
          <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8 leading-relaxed">
            We haven't posted any insights just yet. Check back soon for tutorials, guides, and tech deep dives.
          </p>
          
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-2.5 
                       text-blue-600 dark:text-blue-400 font-medium 
                       bg-transparent border border-gray-200 dark:border-gray-700 
                       hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-200 dark:hover:border-blue-800
                       rounded-full transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Check for updates
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // ==========================================
  // STATE 4: SUCCESS (Main Content)
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans">
      <main className="container mx-auto px-4 sm:px-6 py-12 flex-grow">
        
        {/* --- Header Section --- */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            Knowledge Base
          </h1>
          
          {/* Google Style Search Bar */}
          <div className="relative group max-w-xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 
                         border border-gray-200 dark:border-gray-700 rounded-full 
                         text-gray-900 dark:text-white placeholder-gray-500 
                         shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         transition-all duration-300 hover:shadow-md"
              placeholder="Search guides, tutorials, and insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border
                    ${isActive 
                      ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                    <LearningCard key={post.id} post={post} index={index} />
                ))
            ) : (
                /* Empty Search Results (Filtered list is empty, but posts exist) */
                <div className="col-span-full py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No matches found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter.</p>
                    <button 
                        onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                        className="mt-4 text-blue-600 hover:underline font-medium"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Learning;
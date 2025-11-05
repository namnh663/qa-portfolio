import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { fetchLearningPosts } from '../services/fetchLearningPosts';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Footer from '../components/common/Footer';
import Input from '../components/ui/Input'; // <-- 1. Import our Input component
import { Search, BookOpen, Lightbulb, GraduationCap, Code as CodeIcon } from 'lucide-react';

// --- (Category Icons and Colors are great, no changes needed) ---
const categoryIcons = {
  "Frontend": CodeIcon,
  "Testing": Lightbulb,
  "Career": GraduationCap,
  "General": BookOpen,
};

const getCategoryColor = (category) => {
  const colors = {
    "Frontend": "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
    "Testing": "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
    "Career": "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20",
    "General": "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20",
    "default": "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20",
  };
  return colors[category] || colors["default"];
};

// 2. Create a "motion" version of React Router's Link
//    This lets us make the card itself a motion-animated link.
const MotionLink = motion(Link);

const Learning = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: posts, loading, error } = useFetch(fetchLearningPosts);

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) return <LoadingSpinner />;
  if (error) { /* ... (Error state is fine) ... */ }

  return (
    // 3. Simplified background color
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto px-4 sm:px-6 py-12">
        
        {/*
         * ======================================
         * 4. REDESIGNED: Simplified Header
         * Matches the "Google-like" style of our other pages.
         * ======================================
         */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Knowledge & Insights
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Deep dives into software testing strategy, team leadership, industry trends, and best practices from years of hands-on experience.
          </p>

          {/*
           * ======================================
           * 5. REDESIGNED: Consistent Search Bar
           * Uses our <Input> component.
           * ======================================
           */}
          <div className="relative max-w-md mx-auto">
            <label htmlFor="learning-search" className="sr-only">Search posts</label>
            <Input
              type="text"
              id="learning-search"
              name="searchTerm"
              placeholder="Search posts by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10" // Add padding for the icon
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* --- Card Grid --- */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {filteredPosts.length === 0 && !loading && (
            <div className="col-span-full text-center py-16">
              {/* ... (No posts message is good) ... */}
            </div>
          )}

          {filteredPosts.map((post, index) => {
            const CategoryIcon = categoryIcons[post.category] || BookOpen;
            const categoryColorClasses = getCategoryColor(post.category);

            return (
              /*
               * ======================================
               * 6. REDESIGNED: Card UX
               * The <MotionLink> IS the card.
               * No more 'absolute' links or 'z-index' hacks.
               * ======================================
               */
              <MotionLink
                key={post.id}
                to={`/learning/${post.id}`}
                aria-label={`Read ${post.title}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group flex flex-col p-6 bg-white dark:bg-gray-800 
                           rounded-xl border border-gray-200 dark:border-gray-700 
                           shadow-sm hover:shadow-lg hover:border-blue-500/50
                           transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Category Icon and Label (no change, was good) */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColorClasses}`}>
                  <CategoryIcon className="w-4 h-4" />
                  <span>{post.category}</span>
                </div>
                
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-3 leading-snug">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 text-base line-clamp-4 flex-grow mb-4">
                  {post.excerpt || post.content.substring(0, 150) + '...'}
                </p>
              </MotionLink>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learning;
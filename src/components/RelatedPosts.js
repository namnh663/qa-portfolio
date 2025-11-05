import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Defined variants for cleaner, staggered animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ // 'i' is the custom index we pass
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.3, 
      delay: i * 0.1 // Staggered delay
    }
  })
};

const RelatedPosts = ({ currentPostId, posts = [] }) => {
  const relatedPosts = posts
    ?.filter(post => post?.id !== currentPostId)
    ?.slice(0, 3) || [];

  // Don't render the section at all if there are no related posts
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    // Responsive grid, kept from your original. This is great.
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedPosts.map((post, index) => (
        <motion.div
          key={post?.id}
          custom={index} // Pass the index to the 'visible' variant
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/*
            1. MODERN CARD DESIGN:
               - Removed the 'shadow-lg' base style.
               - Added a subtle 'border' for a cleaner, "Google-like" feel.
               - Kept 'h-full' for uniform card heights in a row.
               - Kept the 'hover:shadow-xl' and 'hover:-translate-y-1'
                 to create a clear, attractive "lift" interaction.
          */}
          <Link 
            to={`/learning/${post?.id}`}
            className="block h-full group bg-white dark:bg-gray-800 rounded-xl
                       border border-gray-200 dark:border-gray-700
                       hover:shadow-xl dark:hover:shadow-gray-900/50 
                       hover:-translate-y-1 transition-all duration-300"
            aria-labelledby={`post-title-${post?.id}`}
          >
            {/* 2. SIMPLIFIED STRUCTURE:
                 - Removed the top <div> with the gradient background.
                 - The content now starts immediately.
            */}
            <div className="p-6">
              <span 
                className="inline-block px-3 py-1 text-xs font-medium uppercase 
                           tracking-wider text-blue-700 dark:text-blue-400 
                           bg-blue-100 dark:bg-blue-900/30 rounded-full"
              >
                {post?.category}
              </span>
              
              {/* 3. REFINED TYPOGRAPHY:
                   - Changed title to 'text-lg' (from 'xl') for a 
                     cleaner look on smaller cards.
              */}
              <h3 
                id={`post-title-${post?.id}`}
                className="text-lg font-semibold text-gray-900 dark:text-white 
                           mt-4 mb-3 group-hover:text-blue-600 
                           dark:group-hover:text-blue-400 transition-colors"
              >
                {post?.title}
              </h3>
              
              {/* 4. REFINED METADATA:
                   - Shrunk icon slightly to 'w-4 h-4' to better match
                     the 'text-sm' font.
              */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg 
                  className="w-4 h-4 mr-1.5 text-gray-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span>{post?.read_time} read</span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default RelatedPosts;
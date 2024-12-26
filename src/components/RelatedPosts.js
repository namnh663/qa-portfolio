import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RelatedPosts = ({ currentPostId, posts = [] }) => {
  const relatedPosts = posts
    ?.filter(post => post?.id !== currentPostId)
    ?.slice(0, 3) || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {relatedPosts.map((post, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          key={post?.id}
        >
          <Link 
            to={`/learning/${post?.id}`}
            className="block h-full group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/50 transform hover:-translate-y-1 transition-all duration-300"
            aria-labelledby={`post-title-${post?.id}`}
          >
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl" />
            <div className="p-6">
              <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                {post?.category}
              </span>
              
              <h3 
                id={`post-title-${post?.id}`}
                className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                {post?.title}
              </h3>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
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
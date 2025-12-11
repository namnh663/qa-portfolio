import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_CONFIG } from '../../config/learningConfig';

const RelatedPosts = ({ currentPostId, posts = [] }) => {
  // FIX: Ensure 'posts' is an array even if it is passed as 'null'
  const safePosts = posts || [];

  const related = safePosts
    .filter(p => p.id !== currentPostId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 pt-16 mt-16">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Read next
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post, index) => {
          // Use config for consistent coloring
          const config = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG['Default'];
          const Icon = config.icon;

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/learning/${post.id}`}
                className="group flex flex-col h-full bg-white dark:bg-gray-800 
                           rounded-2xl border border-gray-200 dark:border-gray-700 
                           hover:shadow-lg transition-all duration-300 p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`p-1.5 rounded-lg ${config.color.split(' ')[1]}`}>
                    <Icon className={`w-4 h-4 ${config.color.split(' ')[0]}`} />
                  </span>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h4>
                
                {/* Spacer to push the footer to the bottom */}
                <div className="flex-grow" /> 
                
                <div className="mt-4 pt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                   Read now <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPosts;
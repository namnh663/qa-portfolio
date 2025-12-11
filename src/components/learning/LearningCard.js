import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { CATEGORY_CONFIG } from '../../config/learningConfig';

const MotionLink = motion(Link);

const LearningCard = ({ post, index }) => {
  // 1. Resolve Config
  const config = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG['Default'];
  const Icon = config.icon;

  // 2. Mock Read Time (or use real data if you have it)
  const readTime = Math.ceil(post.content.length / 1000) + ' min read';

  return (
    <MotionLink
      to={`/learning/${post.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex flex-col bg-white dark:bg-gray-800 
                 rounded-2xl border border-gray-200 dark:border-gray-700 
                 overflow-hidden hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600
                 transition-all duration-300"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Header: Category Chip & Date */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${config.color}`}>
            <Icon className="w-3.5 h-3.5" />
            {post.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {post.excerpt || post.content.substring(0, 140) + '...'}
        </p>

        {/* Footer: "Read Article" Link */}
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm mt-auto group/link">
          Read Article
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
        </div>
      </div>
    </MotionLink>
  );
};

export default LearningCard;
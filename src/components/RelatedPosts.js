import { Link } from 'react-router-dom';

const RelatedPosts = ({ currentPostId, posts = [] }) => {
  const relatedPosts = posts
    ?.filter(post => post?.id !== currentPostId)
    ?.slice(0, 3) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {relatedPosts.map((post) => (
        <Link 
          key={post?.id}
          to={`/learning/${post?.id}`} 
          className="group bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200"
        >
          <div className="p-6">
            <span className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
              {post?.category}
            </span>
            
            <h3 className="font-medium text-gray-900 dark:text-white mt-2 mb-3 group-hover:underline">
              {post?.title}
            </h3>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post?.read_time} read</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedPosts;
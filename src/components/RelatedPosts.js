import { Link } from 'react-router-dom';

const RelatedPosts = ({ currentPostId, posts = [] }) => {
  const relatedPosts = posts
    ?.filter(post => post?.id !== currentPostId)
    ?.slice(0, 3) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relatedPosts.map((post) => (
        <Link 
          key={post?.id}
          to={`/learning/${post?.id}`} 
          className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div className="h-1 bg-gradient-to-r from-indigo-600 to-blue-600"></div>
          <div className="p-6">
            <div className="flex items-center mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{post?.category}</span>
            </div>
            
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
              {post?.title}
            </h3>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
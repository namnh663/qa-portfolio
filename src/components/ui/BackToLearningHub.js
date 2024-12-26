import { Link } from 'react-router-dom';

const BackToLearningHub = () => (
  <Link
    to="/learning"
    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm 
    bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
    dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800
    text-white rounded-md shadow-sm hover:shadow transform hover:-translate-y-0.5 
    transition-all duration-300 mb-6 focus:outline-none focus:ring-1 focus:ring-blue-500 
    focus:ring-offset-1 dark:focus:ring-offset-gray-800"
    aria-label="Return to Learning Hub"
  >
    <svg 
      className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M15 19l-7-7 7-7" 
      />
    </svg>
    <span className="font-medium">Back to Learning Hub</span>
  </Link>
);

export default BackToLearningHub;
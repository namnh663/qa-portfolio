import { Link } from 'react-router-dom';

const BackToLearningHub = () => (
  <Link
    to="/learning"
    // 1. Added 'group' so the icon's hover effect works.
    className="inline-flex items-center gap-1.5 text-sm font-medium group
               text-gray-600 dark:text-gray-400 
               hover:text-blue-600 dark:hover:text-blue-400
               hover:underline
               transition-colors duration-150
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
    aria-label="Return to Learning Hub"
  >
    <svg 
      // 2. Kept the cool 'hover' effect (it's fixed by adding 'group' above)
      className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
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
    <span>Back to Learning Hub</span>
  </Link>
);

export default BackToLearningHub;
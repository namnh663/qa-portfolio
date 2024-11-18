import { Link } from 'react-router-dom';

const BackToLearningHub = () => (
  <Link
    to="/learning"
    className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 font-medium mb-8 group"
  >
    <svg className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
    Back to Learning Hub
  </Link>
);

export default BackToLearningHub;
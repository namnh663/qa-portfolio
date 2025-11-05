import React from 'react';
import { Link } from 'react-router-dom';

// A simple placeholder for a 404-specific illustration (e.g., a lost robot, a broken map).
// This is a key part of a modern, friendly 404 page.
const NotFoundIllustration = () => (
  <div 
    className="w-full max-w-xs h-48 bg-gray-100 dark:bg-gray-800 
               rounded-lg flex items-center justify-center"
    aria-hidden="true"
  >
    <svg 
      className="w-16 h-16 text-gray-300 dark:text-gray-600" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  </div>
);

const NotFound = () => {
  // These are the styles from the "primary" button we designed.
  // We apply them to the Link component directly.
  const buttonStyles =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

  return (
    // 1. Clean, simple background
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      
      {/* 2. Modern two-column layout (responsive) */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-4xl mx-auto">
        
        {/* 3. Illustration placeholder */}
        <div className="flex-shrink-0">
          <NotFoundIllustration />
        </div>

        {/* 4. Clear, left-aligned (on desktop) content */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Sorry, we couldn’t find the page you’re looking for. 
            It might have been moved or deleted.
          </p>
          
          {/* 5. Corrected Button: A Link styled like a button */}
          <div className="flex justify-center md:justify-start">
            <Link to="/" className={buttonStyles}>
              Go back home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
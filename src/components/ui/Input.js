import React from 'react';

const Input = ({
  type = 'text', // Default to 'text'
  className = '', // Default to empty string for merging
  ...props // Pass through all other props (value, onChange, id, name, etc.)
}) => {
  
  // These are the built-in, "Google-like" styles
  const baseStyles =
    `block w-full px-4 py-2 text-sm 
     rounded-md border border-gray-300 dark:border-gray-700 
     bg-white dark:bg-gray-800 
     text-gray-900 dark:text-white
     placeholder-gray-500 dark:placeholder-gray-400
     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
     disabled:opacity-60 disabled:cursor-not-allowed`;

  return (
    <input
      type={type}
      // Merge the base styles with any custom classes
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
};

export default Input;
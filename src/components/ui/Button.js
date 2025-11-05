import React from 'react';

// --- Style Lookups ---

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 disabled:opacity-60 disabled:cursor-not-allowed';

const variantStyles = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500',
  outline:
    'bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
  ghost:
    'bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm', // Your original size
  lg: 'px-5 py-2.5 text-base',
};

// --- Component ---

const Button = ({
  variant = 'primary', // Renamed 'default' to 'primary'
  size = 'md',
  className = '', // Added className prop for merging
  children,
  ...props
}) => {
  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className} 
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
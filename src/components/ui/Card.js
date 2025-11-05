import React from 'react';

// 1. The Card "shell"
//    - Uses a border + subtle shadow for a clean, modern look.
//    - 'overflow-hidden' is important for the sub-components' rounded corners.
//    - NO padding. Padding will be handled by the sub-components.
const Card = ({ children, className = '' }) => {
    return (
        <div 
            className={`bg-white dark:bg-gray-800 rounded-lg border 
                        border-gray-200 dark:border-gray-700 shadow-sm 
                        ${className}`}
        >
            {children}
        </div>
    );
};

// 2. The Header
//    - Adds its own padding and a bottom border.
//    - Uses 'flex' to auto-align title and (optional) action buttons.
Card.Header = ({ children, className = '' }) => (
    <div 
        className={`flex items-center justify-between p-4 sm:p-5 
                    border-b border-gray-200 dark:border-gray-700
                    ${className}`}
    >
        {children}
    </div>
);

// 3. The Title
//    - Sized down to 'text-lg' to be a clean 'card' title.
//    - 'font-semibold' is more modern and less "heavy" than 'font-bold'.
Card.Title = ({ children, className = '' }) => (
    <h3 
        className={`text-lg font-semibold text-gray-900 dark:text-white 
                    ${className}`}
    >
        {children}
    </h3>
);

// 4. The Content
//    - This is the main body. It just adds padding.
Card.Content = ({ children, className = '' }) => (
    <div className={`p-4 sm:p-5 ${className}`}>
        {children}
    </div>
);

// 5. BONUS: A Footer
//    - Just like the header, but for the bottom.
//    - Perfect for "Save" buttons or "View all" links.
Card.Footer = ({ children, className = '' }) => (
    <div 
        className={`bg-gray-50 dark:bg-gray-800 
                    p-4 sm:p-5 
                    border-t border-gray-200 dark:border-gray-700
                    ${className}`}
    >
        {children}
    </div>
);

export default Card;
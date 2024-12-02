import React from 'react';

const Card = ({ children }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            {children}
        </div>
    );
};

Card.Header = ({ children }) => <div className="card-header">{children}</div>;
Card.Title = ({ children }) => <h3 className="text-xl font-bold card-title">{children}</h3>;
Card.Content = ({ children }) => <div className="mt-4 card-content">{children}</div>;

export default Card;
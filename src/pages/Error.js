import React, { useEffect } from 'react';
import Button from '../components/Button';

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">Oops!</h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">Something went wrong</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          We're sorry, but an error occurred while processing your request.
        </p>
        <div className="space-x-4">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline">
            <a href="/">Go back home</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
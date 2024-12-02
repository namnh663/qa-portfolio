import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">Brian</span>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-800 dark:text-white hover:underline">Home</Link>
            <Link to="/blog" className="text-gray-800 dark:text-white hover:underline">Blog</Link>
            <Link to="/learning" className="text-gray-800 dark:text-white hover:underline">Learning</Link>
            <div className="relative">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="text-gray-800 dark:text-white hover:underline"
              >
                Tools ▼
              </button>
              {isToolsOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                  <Link
                    to="/airport"
                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Airport Calculator
                  </Link>
                  <Link
                    to="/json-viewer"
                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    JSON Viewer
                  </Link>
                  <Link
                    to="/resources"
                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Resources
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
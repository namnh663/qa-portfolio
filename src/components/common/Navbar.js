import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsToolsOpen(false);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">Brian</span>
          
          <button 
            className="md:hidden text-gray-800 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:items-center absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-white dark:bg-gray-800 md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-4`}>
            <Link 
              to="/" 
              className={`block md:inline-block ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-800'} dark:text-white hover:text-blue-600 transition-colors duration-200`}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className={`block md:inline-block ${isActive('/blog') ? 'text-blue-600 font-semibold' : 'text-gray-800'} dark:text-white hover:text-blue-600 transition-colors duration-200`}
            >
              Blog
            </Link>
            <Link 
              to="/learning" 
              className={`block md:inline-block ${isActive('/learning') ? 'text-blue-600 font-semibold' : 'text-gray-800'} dark:text-white hover:text-blue-600 transition-colors duration-200`}
            >
              Learning
            </Link>
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                onKeyDown={handleKeyDown}
                className="text-gray-800 dark:text-white hover:text-blue-600 flex items-center gap-1 transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={isToolsOpen}
              >
                Tools
                <span className={`transform transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {isToolsOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 transition-all ease-out duration-200"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="tools-menu"
                >
                  <Link
                    to="/airport"
                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors duration-200"
                    role="menuitem"
                  >
                    Airport Calculator
                  </Link>
                  <Link
                    to="/json-viewer"
                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors duration-200"
                    role="menuitem"
                  >
                    JSON Viewer
                  </Link>
                  <Link
                    to="/resources"
                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors duration-200"
                    role="menuitem"
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
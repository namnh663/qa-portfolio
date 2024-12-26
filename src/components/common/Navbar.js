import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group">
            <span className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors duration-300">
              Brian
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Blog', 'Learning'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`text-white text-lg font-medium hover:text-blue-200 transition-colors duration-300 
                  ${isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'border-b-2 border-white' : ''}`}
              >
                {item}
              </Link>
            ))}

            <div className="relative" ref={dropdownRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-300 
                          flex items-center gap-2 focus:outline-none"
                aria-expanded={isToolsOpen}
              >
                Tools
                <motion.span
                  animate={{ rotate: isToolsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl"
                  >
                    {['Airport Calculator', 'User Management', 'JSON Viewer', 'Resources'].map((item) => (
                      <Link
                        key={item}
                        to={`/${item.toLowerCase().replace(' ', '-')}`}
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                                 rounded-lg transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                      >
                        {item}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-3 bg-white/10 rounded-lg p-4">
                {['Home', 'Blog', 'Learning'].map((item) => (
                  <Link
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-white text-lg font-medium hover:bg-white/20 rounded-lg px-4 py-2 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
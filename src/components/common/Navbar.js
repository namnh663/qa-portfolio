import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Menu } from 'lucide-react'; // Added icons

// --- Helper Data ---
// Defining items outside the component prevents re-creation on re-renders
const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Learning', href: '/learning' },
];

const TOOLS_ITEMS = [
  { name: 'Airport Calculator', href: '/airport-calculator' },
  { name: 'User Management', href: '/user-management' },
  { name: 'JSON Viewer', href: '/json-viewer' },
  { name: 'Resources', href: '/resources' },
];

// --- motion(Link) component ---
// This lets us use Framer Motion props directly on a react-router Link
const MotionLink = motion(Link);

const Navbar = () => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname, isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group">
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              Testing & Leadership
            </span>
          </Link>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center space-x-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-base font-medium transition-colors duration-300 rounded-md
                  ${isActive(item.href)
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 z-[-1] bg-gray-100 dark:bg-gray-800 rounded-md"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            ))}

            {/* Desktop Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center gap-1 px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 focus:outline-none"
                aria-expanded={isToolsOpen}
              >
                Tools
                <motion.div
                  animate={{ rotate: isToolsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-900 rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-2">
                      {TOOLS_ITEMS.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* --- Mobile Menu Button --- */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-700 dark:text-gray-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-full max-w-xs sm:max-w-sm bg-white dark:bg-gray-900 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Menu</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 dark:text-gray-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col space-y-4">
                {NAV_ITEMS.map((item) => (
                  <MotionLink
                    key={item.name}
                    to={item.href}
                    className="px-4 py-3 -mx-4 text-lg font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {item.name}
                  </MotionLink>
                ))}
                
                <hr className="border-gray-200 dark:border-gray-700 !my-6" />

                <span className="px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tools
                </span>
                {TOOLS_ITEMS.map((item) => (
                  <MotionLink
                    key={item.name}
                    to={item.href}
                    className="px-4 py-3 -mx-4 text-lg font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {item.name}
                  </MotionLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
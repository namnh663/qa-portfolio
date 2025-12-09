import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Menu } from 'lucide-react';

// --- 1. Scalable Data Structure ---
// A single source of truth for navigation.
// Adding `children` to any item will automatically create a dropdown.
const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Learning', href: '/learning' },
  {
    name: 'Tools',
    children: [
      { name: 'Airport Calculator', href: '/airport-calculator' },
      { name: 'User Management', href: '/user-management' },
      { name: 'Character Counter', href: '/character-counter' },
      { name: 'JSON Viewer', href: '/json-viewer' },
      { name: 'Test Strategy Builder', href: '/test-strategy-builder' },
      { name: 'XPath Validator', href: '/xpath-validator' },
      { name: 'Resources', href: '/resources' },
    ],
  },
];

// --- 2. Reusable MotionLink Component ---
const MotionLink = motion(Link);

// --- 3. Main Navbar Component (Shell) ---
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group">
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              Testing & Leadership
            </span>
          </Link>

          {/* --- Desktop Navigation --- */}
          <DesktopNav items={navigationItems} />

          {/* --- Mobile Menu Button --- */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-700 dark:text-gray-300 p-2 -mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </nav>

      {/* --- Mobile Menu Panel --- */}
      <MobileNav
        items={navigationItems}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
    </header>
  );
};

// --- 4. Desktop Navigation Component ---
const DesktopNav = ({ items }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden md:flex items-center space-x-2">
      {items.map((item) =>
        item.children ? (
          <Dropdown key={item.name} item={item} />
        ) : (
          <NavLink
            key={item.name}
            item={item}
            isActive={isActive(item.href)}
          />
        )
      )}
    </div>
  );
};

// --- 5. Desktop: Standard Link Component ---
const NavLink = ({ item, isActive }) => {
  return (
    <Link
      to={item.href}
      className={`relative px-4 py-2 text-base font-medium transition-colors duration-300 rounded-md
        ${
          isActive
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
    >
      {isActive && (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 z-[-1] bg-gray-100 dark:bg-gray-800 rounded-md"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      {item.name}
    </Link>
  );
};

// --- 6. Desktop: Dropdown Menu Component ---
const Dropdown = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 focus:outline-none"
        aria-expanded={isOpen}
      >
        {item.name}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-2">
              {item.children.map((child) => (
                <Link
                  key={child.name}
                  to={child.href}
                  onClick={() => setIsOpen(false)} // Close dropdown on link click
                  className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 7. Mobile Navigation Panel Component ---
const MobileNav = ({ items, isOpen, setIsOpen }) => {
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-40 w-full max-w-xs sm:max-w-sm bg-white dark:bg-gray-900 p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Menu
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 dark:text-gray-400 p-2 -mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <nav className="flex flex-col space-y-2">
              {items.map((item) =>
                item.children ? (
                  <MobileAccordion key={item.name} item={item} />
                ) : (
                  <MobileNavLink key={item.name} item={item} />
                )
              )}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- 8. Mobile: Standard Link Component ---
const MobileNavLink = ({ item }) => {
  return (
    <MotionLink
      to={item.href}
      className="px-4 py-3 -mx-4 text-lg font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {item.name}
    </MotionLink>
  );
};

// --- 9. Mobile: Accordion Menu Component ---
const MobileAccordion = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-3 -mx-4 text-lg font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <span>{item.name}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden flex flex-col pl-4"
          >
            {item.children.map((child) => (
              <MotionLink
                key={child.name}
                to={child.href}
                className="px-4 py-3 -mx-4 text-base font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {child.name}
              </MotionLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
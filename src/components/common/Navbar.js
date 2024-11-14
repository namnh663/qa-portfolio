import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">Brian</span>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-800 dark:text-white hover:underline">Home</Link>
            <Link to="/blog" className="text-gray-800 dark:text-white hover:underline">Blog</Link>
            <Link to="/learning" className="text-gray-800 dark:text-white hover:underline">Learning</Link>
            <Link to="/resources" className="text-gray-800 dark:text-white hover:underline">Resources</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
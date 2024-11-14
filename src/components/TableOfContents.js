import { useState, useEffect } from 'react';

const TableOfContents = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    const extractHeadings = () => {
      const contentDiv = document.querySelector('.mt-8');
      if (!contentDiv) return [];

      const headings = Array.from(contentDiv.querySelectorAll('h1, h2, h3'));

      const toc = headings.map((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }

        return {
          id: heading.id,
          title: heading.textContent,
          level: parseInt(heading.tagName.charAt(1))
        };
      });

      setTableOfContents(toc);
    };

    extractHeadings();

    const observer = new MutationObserver(extractHeadings);
    observer.observe(document.querySelector('.p-8') || document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Add offset for fixed header if needed
      const offset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (tableOfContents.length === 0) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 sticky top-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left font-semibold text-gray-900 dark:text-white transition duration-150"
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Table of Contents
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <nav className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ul className="space-y-2">
            {tableOfContents.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
                className="transition-colors duration-150"
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="group text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center py-1 transition-all duration-200 ease-in-out"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 opacity-60 group-hover:opacity-100 transition-opacity"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {item.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;
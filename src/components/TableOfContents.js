import { useState, useEffect } from 'react';

const TableOfContents = () => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  // 1. Parse Headings
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3'));
    const mapped = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent,
      level: Number(elem.tagName.charAt(1)),
    }));
    setHeadings(mapped);
  }, []);

  // 2. Active State Observer ("Scroll Spy")
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -40% 0px' } // Trigger when element is near top
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100; // Offset for header
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block">
      <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        On this page
      </h5>
      <ul className="space-y-3 text-sm border-l-2 border-gray-100 dark:border-gray-800">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={`pl-4 ${level === 3 ? 'ml-2' : ''}`}>
            <button
              onClick={() => scrollTo(id)}
              className={`text-left transition-colors duration-200 block w-full
                ${activeId === id 
                  ? 'text-blue-600 font-medium -ml-[18px] border-l-2 border-blue-600 pl-4' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
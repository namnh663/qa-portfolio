import { useState, useEffect } from 'react';

const TableOfContents = () => {
  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    const extractHeadings = () => {
      // 1. Updated Selector: Changed to '.prose' to match the parent component.
      //    This is more robust than '.mt-8'.
      const contentDiv = document.querySelector('.prose');
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

    // Initial scan
    extractHeadings();

    // 2. Updated Observer: Also watching '.prose' for any async content changes.
    const observer = new MutationObserver(extractHeadings);
    const targetNode = document.querySelector('.prose') || document.body;
    observer.observe(targetNode, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // 3. Offset: Kept your 80px offset, assuming this is for a sticky header.
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

  // 4. Simplified Structure:
  //    - No more 'bg-gray-50', 'border', or 'rounded-xl' wrapper.
  //    - No more collapsible button or 'isOpen' state.
  //    - Added 'max-h' to make the list scrollable on long pages.
  return (
    <nav className="max-h-[calc(100vh-10rem)] overflow-y-auto">
      <ul className="space-y-2">
        {tableOfContents.map((item) => (
          <li
            key={item.id}
            // 5. Indentation: Kept your original logic, which works perfectly.
            style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }} // 0.75rem = pl-3
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              // 6. "Google-like" Link Style:
              //    - 'text-sm' for a cleaner, denser list.
              //    - 'border-l-2' on hover for a subtle, functional highlight.
              //    - 'border-transparent' ensures no layout shift on hover.
              //    - Removed custom bullet and translate-x effect.
              className="block py-1 text-sm
                         text-gray-600 dark:text-gray-400
                         hover:text-gray-900 dark:hover:text-white
                         border-l-2 border-transparent 
                         hover:border-gray-500 dark:hover:border-gray-400
                         pl-3
                         transition-colors duration-150"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
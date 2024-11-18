// src/components/AboutMe.js
import useFetch from '../../hooks/useFetch';
import { fetchAbout } from '../../services/fetchAbout';
import LoadingSpinner from '../common/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

const AboutMe = () => {
  const { data: about, loading, error } = useFetch(fetchAbout);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading about me data</p>;

  return (
    <section id="about" className="py-8">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h2 data-testid="about-title" className="flex items-center text-2xl font-bold">About Me</h2>
          
          {/* Render markdown content */}
          <div data-testid="about-content" className="mt-4 text-gray-600 dark:text-gray-300">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
              }}
            >
              {about?.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
// src/components/AboutMe.js
import useFetch from '../../hooks/useFetch';
import { fetchAbout } from '../../services/fetchAbout';
import LoadingSpinner from '../common/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

const AboutMe = () => {
  const { data: about, loading, error } = useFetch(fetchAbout);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">Error loading about me data</p>;

  // ========================================================================
  // START: REDESIGNED RENDER METHOD
  // ========================================================================
  return (
    <section id="about" className="py-20 sm:py-24 overflow-hidden bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/*
         * ======================================
         * NEW: Two-column layout with an abstract
         * animated effect on the side.
         * ======================================
         */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 items-center gap-16">

          {/* * ======================================
           * Column 1: Content
           * ======================================
           */}
          <div data-testid="about-content" className="lg:col-span-3">
            <h2 
              data-testid="about-title" 
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6"
            >
              About Me
            </h2>
            
            {/* Using 'prose' for attractive, readable markdown.
              'prose-lg' makes the text larger and friendly.
            */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => <p className="leading-relaxed" {...props} />,
                  // You can add more overrides here if needed
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                }}
              >
                {about?.description}
              </ReactMarkdown>
            </div>
          </div>
          
          {/* * ======================================
           * Column 2: Animated Abstract Effect
           * This creates a "lava lamp" or "aurora"
           * effect without any images.
           * ======================================
           */}
          <div className="lg:col-span-2 h-80 lg:h-full relative flex items-center justify-center">
            {/* This is the container that gives the effect its shape and position */}
            <div className="relative w-full max-w-md h-full">
              
              {/* Abstract Shape 1 */}
              <div className="absolute top-0 -left-1/4 w-72 h-72 bg-purple-400 rounded-full 
                            opacity-50 dark:opacity-30 
                            filter blur-3xl 
                            animate-pulse"
                   style={{ animationDelay: '0s' }}
              />
              
              {/* Abstract Shape 2 */}
              <div className="absolute top-0 -right-1/4 w-72 h-72 bg-blue-400 rounded-full 
                            opacity-50 dark:opacity-30 
                            filter blur-3xl 
                            animate-pulse"
                   style={{ animationDelay: '2s' }}
              />
              
              {/* Abstract Shape 3 */}
              <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-green-400 rounded-full 
                            opacity-50 dark:opacity-30 
                            filter blur-3xl 
                            animate-pulse"
                   style={{ animationDelay: '4s' }}
              />
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
  // ========================================================================
  // END: REDESIGNED RENDER METHOD
  // ========================================================================
};

export default AboutMe;
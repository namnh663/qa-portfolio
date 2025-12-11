import ReactMarkdown from 'react-markdown';
import useFetch from '../../hooks/useFetch';
import { fetchAbout } from '../../services/fetchAbout';
import Skeleton from '../common/Skeleton'; // Import the skeleton

const AbstractBackground = () => (
  <div className="lg:col-span-2 h-80 lg:h-full relative flex items-center justify-center pointer-events-none">
    <div className="relative w-full max-w-md h-full">
      <div className="absolute top-0 -left-1/4 w-72 h-72 bg-purple-400 rounded-full opacity-50 dark:opacity-30 filter blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="absolute top-0 -right-1/4 w-72 h-72 bg-blue-400 rounded-full opacity-50 dark:opacity-30 filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-green-400 rounded-full opacity-50 dark:opacity-30 filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
    </div>
  </div>
);

const AboutMe = () => {
  const { data: about, loading, error } = useFetch(fetchAbout);

  // 1. Define the Loading View
  if (loading) {
    return (
      <section className="py-20 sm:py-24 overflow-hidden bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 items-center gap-16">
            {/* Text Column Skeleton */}
            <div className="lg:col-span-3 space-y-4">
              <Skeleton className="h-10 w-48 mb-8" /> {/* Title */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            {/* Visual Column Skeleton (Just a subtle circle) */}
            <div className="lg:col-span-2 flex justify-center">
              <Skeleton className="h-64 w-64 rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) return <p className="text-center text-red-600 py-10">Error loading about me data</p>;

  return (
    <section id="about" className="py-20 sm:py-24 overflow-hidden bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 items-center gap-16">
          <div data-testid="about-content" className="lg:col-span-3">
            <h2 data-testid="about-title" className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              About Me
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <ReactMarkdown
                components={{
                  p: (props) => <p className="leading-relaxed" {...props} />,
                  ul: (props) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                  li: (props) => <li className="leading-relaxed" {...props} />,
                }}
              >
                {about?.description}
              </ReactMarkdown>
            </div>
          </div>
          <AbstractBackground />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
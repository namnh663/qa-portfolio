import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import LoadingSpinner from '../components/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

const AboutMe = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('about_me')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching about me data:', error);
      } else {
        setAbout(data);
      }
      setLoading(false);
    };

    fetchAbout();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section id="about" className="py-8">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="flex items-center text-2xl font-bold">About Me</h2>
          
          {/* ReactMarkdown with customized components */}
          <div className="mt-4 text-gray-600 dark:text-gray-300">
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
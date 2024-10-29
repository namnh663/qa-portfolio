import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import LoadingSpinner from '../components/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

const WorkExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state

  // Helper function to parse "MMM YYYY" date string
  const parseDateString = (dateStr) => {
    if (dateStr === "Present") {
      return new Date();  // Return current date for "Present"
    }
    // Convert "MMM YYYY" string to a Date object
    const [month, year] = dateStr.split(" ");
    return new Date(`${month} 1, ${year}`);  // Example: "Mar 2021" => "Mar 1, 2021"
  };

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);  // Start loading
      const { data, error } = await supabase
        .from('experience')
        .select('*');

      if (error) {
        console.error('Error fetching experience data:', error);
      } else {
        // Sort experiences by end_date (or by start_date if end_date is the same)
        const sortedExperiences = data.sort((a, b) => {
          const dateAEnd = parseDateString(a.end_date);  // Parse end_date
          const dateBEnd = parseDateString(b.end_date);  // Parse end_date
          
          // First sort by end_date descending (most recent first)
          if (dateAEnd > dateBEnd) return -1;
          if (dateAEnd < dateBEnd) return 1;

          // If end_dates are the same, sort by start_date descending
          const dateAStart = parseDateString(a.start_date);
          const dateBStart = parseDateString(b.start_date);
          return dateAStart > dateBStart ? -1 : 1;
        });

        setExperiences(sortedExperiences);
      }
      setLoading(false);  // Stop loading after data is fetched
    };

    fetchExperience();
  }, []);

  // Show loading spinner while loading
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section id="experience" className="py-8">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="flex items-center text-2xl font-bold">
            Work Experience
          </h2>
          <div className="mt-4 space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-semibold text-lg">
                  {exp.role} at {exp.company}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.start_date} - {exp.end_date ? exp.end_date : 'Present'}
                </p>

                {/* Render description with Markdown support */}
                <div className="mt-2 text-gray-600 dark:text-gray-300">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                    }}
                  >
                    {exp.description}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
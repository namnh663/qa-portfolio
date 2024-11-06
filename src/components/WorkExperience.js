// src/components/WorkExperience.js
import useFetch from '../hooks/useFetch';
import { fetchWorkExperience } from '../services/fetchWorkExperience';
import LoadingSpinner from './common/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

// Helper function to parse "MMM YYYY" date string
const parseDateString = (dateStr) => {
  if (dateStr === "Present") {
    return new Date();  // Return current date for "Present"
  }
  // Convert "MMM YYYY" string to a Date object
  const [month, year] = dateStr.split(" ");
  return new Date(`${month} 1, ${year}`);  // Example: "Mar 2024" => "Mar 1, 2024"
};

const WorkExperience = () => {
  const { data: experiences, loading, error } = useFetch(fetchWorkExperience);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading work experience data</p>;

  // Sort experiences by end_date (or by start_date if end_date is the same)
  const sortedExperiences = experiences.sort((a, b) => {
    const dateAEnd = parseDateString(a.end_date);
    const dateBEnd = parseDateString(b.end_date);

    // First sort by end_date descending (most recent first)
    if (dateAEnd > dateBEnd) return -1;
    if (dateAEnd < dateBEnd) return 1;

    // If end_dates are the same, sort by start_date descending
    const dateAStart = parseDateString(a.start_date);
    const dateBStart = parseDateString(b.start_date);
    return dateAStart > dateBStart ? -1 : 1;
  });

  return (
    <section id="experience" className="py-8">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h2 data-testid="experience-title" className="flex items-center text-2xl font-bold">Work Experience</h2>
          <div data-testid="experience-list" className="mt-4 space-y-4">
            {sortedExperiences.map((exp) => (
              <div key={exp.id} data-testid={`experience-item-${exp.id}`} className="border-l-4 border-primary pl-4 py-2">
                <h3 data-testid={`experience-role-${exp.id}`} className="font-semibold text-lg">
                  {exp.role} at {exp.company}
                </h3>
                <p data-testid={`experience-date-${exp.id}`} className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.start_date} - {exp.end_date ? exp.end_date : 'Present'}
                </p>
                <div data-testid={`experience-description-${exp.id}`} className="mt-2 text-gray-600 dark:text-gray-300">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p className="[&:not(:last-child)]:mb-4" {...props} />,
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
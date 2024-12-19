import useFetch from '../../hooks/useFetch';
import { fetchWorkExperience } from '../../services/fetchWorkExperience';
import LoadingSpinner from '../common/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

const parseDateString = (dateStr) => {
  if (dateStr === "Present") {
    return new Date();
  }
  const [month, year] = dateStr.split(" ");
  return new Date(`${month} 1, ${year}`);
};

const WorkExperience = () => {
  const { data: experiences, loading, error } = useFetch(fetchWorkExperience);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading work experience data</p>;

  const sortedExperiences = experiences.sort((a, b) => {
    const dateAEnd = parseDateString(a.end_date);
    const dateBEnd = parseDateString(b.end_date);
    if (dateAEnd > dateBEnd) return -1;
    if (dateAEnd < dateBEnd) return 1;
    const dateAStart = parseDateString(a.start_date);
    const dateBStart = parseDateString(b.start_date);
    return dateAStart > dateBStart ? -1 : 1;
  });

  return (
    <section id="experience" className="py-12">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-900 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <h2 data-testid="experience-title" className="flex items-center text-2xl font-bold mb-8">
            Work Experience
          </h2>
          <div data-testid="experience-list" className="space-y-8">
            {sortedExperiences.map((exp) => (
              <div 
                key={exp.id} 
                data-testid={`experience-item-${exp.id}`} 
                className="relative pl-6 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary/20 border-2 border-primary"></div>
                <h3 data-testid={`experience-role-${exp.id}`} className="font-bold text-xl text-gray-800 dark:text-white">
                  {exp.role}
                </h3>
                <p className="text-primary font-medium mb-1">{exp.company}</p>
                <p data-testid={`experience-date-${exp.id}`} className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">
                  {exp.start_date} - {exp.end_date || 'Present'}
                </p>
                <div 
                  data-testid={`experience-description-${exp.id}`} 
                  className="prose dark:prose-invert prose-sm max-w-none text-gray-600 dark:text-gray-300"
                >
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
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
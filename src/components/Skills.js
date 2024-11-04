import useFetch from '../hooks/useFetch';
import { fetchSkills } from '../services/fetchSkills';
import LoadingSpinner from './common/LoadingSpinner';

const Skills = () => {
    const { data: skills, loading, error } = useFetch(fetchSkills);

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error loading skills</p>;

    return (
        <section id="skills" className="py-8">
            <div className="container mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                    <h2 className="flex items-center text-2xl font-bold">
                        Skills
                    </h2>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {skills.map((skill) => (
                            <div key={skill.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                                {skill.skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
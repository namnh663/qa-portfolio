import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import LoadingSpinner from '../components/LoadingSpinner';  // Global loading spinner

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        const fetchSkills = async () => {
            setLoading(true);  // Start loading
            const { data, error } = await supabase
                .from('skills')
                .select('*');

            if (error) {
                console.error('Error fetching skills data:', error);
            } else {
                setSkills(data);
            }
            setLoading(false);  // Stop loading after data is fetched
        };

        fetchSkills();
    }, []);

    // Show loading spinner while loading
    if (loading) {
        return <LoadingSpinner />;
    }

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
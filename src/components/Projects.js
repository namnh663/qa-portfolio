import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import LoadingSpinner from '../components/LoadingSpinner';  // Global loading spinner

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);  // Start loading
            const { data, error } = await supabase
                .from('projects')
                .select('*');

            if (error) {
                console.error('Error fetching projects data:', error);
            } else {
                setProjects(data);
            }
            setLoading(false);  // Stop loading after data is fetched
        };

        fetchProjects();
    }, []);

    // Show loading spinner while loading
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section id="projects" className="py-8">
            <div className="container mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                    <h2 className="flex items-center text-2xl font-bold">
                        Projects
                    </h2>
                    <div className="mt-4 grid gap-6 md:grid-cols-2">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                                <h3 className="text-lg font-semibold">{project.name}</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
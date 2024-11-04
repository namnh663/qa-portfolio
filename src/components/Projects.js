import useFetch from '../hooks/useFetch';
import { fetchProjects } from '../services/fetchProjects';
import LoadingSpinner from './common/LoadingSpinner';

const Projects = () => {
    const { data: projects, loading, error } = useFetch(fetchProjects);

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error loading projects</p>;

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
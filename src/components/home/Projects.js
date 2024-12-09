import useFetch from '../../hooks/useFetch';
import { fetchProjects } from '../../services/fetchProjects';
import LoadingSpinner from '../common/LoadingSpinner';

const Projects = () => {
    const { data: projects, loading, error } = useFetch(fetchProjects);

    if (loading) return <LoadingSpinner aria-live="polite" />;
    if (error) return <p aria-live="assertive">Error loading projects</p>;

    return (
        <section id="projects" className="py-8" aria-labelledby="projects-title">
            <div className="container mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                    <h2 id="projects-title" data-testid="projects-title" className="flex items-center text-2xl font-bold">Projects</h2>
                    <div data-testid="projects-grid" className="mt-4 grid gap-6 md:grid-cols-1">
                        {projects.map((project) => (
                            <article key={project.id} data-testid={`project-item-${project.id}`} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <h3 data-testid={`project-title-${project.id}`} className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                                <p data-testid={`project-description-${project.id}`} className="mt-2 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
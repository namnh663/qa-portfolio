import useFetch from '../../hooks/useFetch';
import { fetchCertificates } from '../../services/fetchCertificates';
import LoadingSpinner from '../common/LoadingSpinner';
import { Award } from 'lucide-react'; // Removed ArrowUpRight

const Certificates = () => {
    const { data: certificates, loading, error } = useFetch(fetchCertificates);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-600">Error loading certificates</p>;

    return (
        <section id="certificates" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <h2 
                    data-testid="certificates-title" 
                    className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
                >
                    Certificates & Awards
                </h2>

                <div 
                    data-testid="certificates-grid" 
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {certificates.map((cert) => (
                        // Changed back to a 'div' from 'a'
                        <div
                            key={cert.id}
                            data-testid={`certificate-item-${cert.id}`}
                            className="group relative block p-6 bg-white dark:bg-gray-800 
                                       rounded-xl border border-gray-200 dark:border-gray-700 
                                       transition-all duration-300 
                                       hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600"
                        >
                            {/* Main icon */}
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg inline-block mb-4">
                                <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>

                            <h3
                                data-testid={`certificate-name-${cert.id}`}
                                className="font-semibold text-lg mb-1 text-gray-900 dark:text-white"
                            >
                                {cert.name}
                            </h3>

                            <p
                                data-testid={`certificate-org-${cert.id}`}
                                className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                            >
                                {cert.issuing_org}
                            </p>

                            <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                                Issued: {new Date(cert.issue_date).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
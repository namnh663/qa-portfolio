import useFetch from '../../hooks/useFetch';
import { fetchCertificates } from '../../services/fetchCertificates';
import LoadingSpinner from '../common/LoadingSpinner';

const Certificates = () => {
    const { data: certificates, loading, error } = useFetch(fetchCertificates);

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error loading certificates</p>;

    return (
        <section id="certificates" className="py-8">
            <div className="container mx-auto">
                <div className="bg-white dark:bg-gray-900 backdrop-blur-sm rounded-xl shadow-xl p-8">
                    <h2 data-testid="certificates-title" className="flex items-center text-2xl font-bold mb-8">
                        Certificates
                    </h2>
                    <div data-testid="certificates-grid" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {certificates.map((cert) => (
                            <div
                                key={cert.id}
                                data-testid={`certificate-item-${cert.id}`}
                                className="group relative bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-300 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <h3
                                    data-testid={`certificate-name-${cert.id}`}
                                    className="font-bold text-lg mb-2 text-gray-800 dark:text-white"
                                >
                                    {cert.name}
                                </h3>
                                <p
                                    data-testid={`certificate-org-${cert.id}`}
                                    className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between"
                                >
                                    <span className="font-medium">{cert.issuing_org}</span>
                                    <span className="text-blue-500 dark:text-blue-400">
                                        {new Date(cert.issue_date).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>                </div>
            </div>
        </section>
    );
};

export default Certificates;
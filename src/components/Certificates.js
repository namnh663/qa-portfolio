import useFetch from '../hooks/useFetch';
import { fetchCertificates } from '../services/fetchCertificates';
import LoadingSpinner from './common/LoadingSpinner';

const Certificates = () => {
    const { data: certificates, loading, error } = useFetch(fetchCertificates);

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error loading certificates</p>;

    return (
        <section id="certificates" className="py-8">
            <div className="container mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                    <h2 className="flex items-center text-2xl font-bold">
                        Certificates
                    </h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {certificates.map((cert) => (
                            <div key={cert.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                                <h3 className="font-semibold">{cert.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {cert.issuing_org} • {new Date(cert.issue_date).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certificates;
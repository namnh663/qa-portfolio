import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import LoadingSpinner from '../components/LoadingSpinner';  // Global loading spinner

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        const fetchCertificates = async () => {
            setLoading(true);  // Start loading
            const { data, error } = await supabase
                .from('certificates')
                .select('*');

            if (error) {
                console.error('Error fetching certificates data:', error);
            } else {
                setCertificates(data);
            }
            setLoading(false);  // Stop loading after data is fetched
        };

        fetchCertificates();
    }, []);

    // Show loading spinner while loading
    if (loading) {
        return <LoadingSpinner />;
    }

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
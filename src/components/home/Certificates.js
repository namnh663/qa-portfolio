import useFetch from '../../hooks/useFetch';
import { fetchCertificates } from '../../services/fetchCertificates';
import Skeleton from '../common/Skeleton'; // Import Skeleton
import { Award } from 'lucide-react';

const CertificateCard = ({ cert }) => (
  <div
    data-testid={`certificate-item-${cert.id}`}
    className="group relative block p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600"
  >
    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg inline-block mb-4">
      <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </div>
    <h3 data-testid={`certificate-name-${cert.id}`} className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
      {cert.name}
    </h3>
    <p data-testid={`certificate-org-${cert.id}`} className="text-sm text-gray-600 dark:text-gray-400 mb-4">
      {cert.issuing_org}
    </p>
    <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
      Issued: {new Date(cert.issue_date).toLocaleDateString()}
    </p>
  </div>
);

const Certificates = () => {
  const { data: certificates, loading, error } = useFetch(fetchCertificates);

  // 1. Define Loading View
  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12" /> {/* Section Title */}
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {/* Render 3 Card Skeletons */}
             {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <Skeleton className="h-12 w-12 rounded-lg mb-4" /> {/* Icon Box */}
                    <Skeleton className="h-6 w-3/4 mb-2" />           {/* Name */}
                    <Skeleton className="h-4 w-1/2 mb-4" />           {/* Org */}
                    <Skeleton className="h-3 w-1/3" />                {/* Date */}
                </div>
             ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <p className="text-center text-red-600">Error loading certificates</p>;

  return (
    <section id="certificates" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 data-testid="certificates-title" className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Certificates & Awards
        </h2>
        <div data-testid="certificates-grid" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
import { useState, useEffect } from 'react';
import Footer from '../components/common/Footer';
import AboutMe from '../components/AboutMe';
import WorkExperience from '../components/WorkExperience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import LoadingSpinner from '../components/common/LoadingSpinner';  // Import the loading spinner

const Home = () => {
  const [loading, setLoading] = useState(true);  // Global loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate data fetching by fetching each section (or you can use actual data fetching logic here)
        // You could make all the data fetching for different components here if needed
        setLoading(true);
        // Fetch the data for all components if necessary
        await Promise.all([
          // Simulate fetching data for all components here (like waiting for all API calls)
        ]);
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;  // Display loading spinner while data is being fetched
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-6 py-8">
        <AboutMe />
        <WorkExperience />
        <Skills />
        <Projects />
        <Certificates />
      </main>
      <Footer />  {/* Reuse Footer component */}
    </div>
  );
};

export default Home;
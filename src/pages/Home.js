import Footer from '../components/common/Footer';
import AboutMe from '../components/AboutMe';
import WorkExperience from '../components/WorkExperience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';

const Home = () => {

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
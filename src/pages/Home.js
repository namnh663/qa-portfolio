import Footer from '../components/common/Footer';
import AboutMe from '../components/home/AboutMe';
import WorkExperience from '../components/home/WorkExperience';
import Skills from '../components/home/Skills';
import Projects from '../components/home/Projects';
import Certificates from '../components/home/Certificates';

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
      <Footer />
    </div>
  );
};

export default Home;
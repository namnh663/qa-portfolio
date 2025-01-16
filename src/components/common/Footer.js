import { FaEnvelope, FaLinkedin, FaGithub, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiSupabase, SiPostgresql } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">QA Engineer</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">Passionate about creating high-quality software testing solutions.</p>
                        </div>
                        <div className="flex space-x-6">
                            <a 
                                href="mailto:namnh663@gmail.com" 
                                className="transform hover:scale-110 transition-transform duration-300"
                                aria-label="Send email to namnh663@gmail.com"
                            >
                                <FaEnvelope className="h-7 w-7 hover:text-blue-400" />
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/namnh663" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="transform hover:scale-110 transition-transform duration-300"
                                aria-label="Visit LinkedIn profile"
                            >
                                <FaLinkedin className="h-7 w-7 hover:text-blue-400" />
                            </a>
                            <a 
                                href="https://github.com/namnh663" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="transform hover:scale-110 transition-transform duration-300"
                                aria-label="Visit GitHub profile"
                            >
                                <FaGithub className="h-7 w-7 hover:text-blue-400" />
                            </a>
                        </div>
                    </div>

                    {/* Rest of the code remains the same */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
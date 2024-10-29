import { FaEnvelope, FaLinkedin, FaGithub, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiSupabase, SiPostgresql } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Portfolio Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">QA Engineer</h3>
                        <p className="text-gray-600 dark:text-gray-300">Passionate about creating high-quality software testing solutions.</p>
                        <div className="flex space-x-4">
                            <a href="mailto:namnh663@gmail.com" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                                <FaEnvelope className="h-6 w-6" />
                            </a>
                            <a href="https://www.linkedin.com/in/namnh663" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                                <FaLinkedin className="h-6 w-6" />
                            </a>
                            <a href="https://github.com/namnh663" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                                <FaGithub className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Frontend Technologies */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Frontend Technologies</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center">
                                <FaReact className="h-10 w-10 text-blue-500" />
                                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">React</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiTailwindcss className="h-10 w-10 text-blue-400" />
                                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Tailwind CSS</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiJavascript className="h-10 w-10 text-blue-600" />
                                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">JavaScript</span>
                            </div>
                        </div>
                    </div>

                    {/* Backend Technologies */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Backend Technologies</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center">
                                <FaNodeJs className="h-10 w-10 text-green-600" />
                                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Node.js</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiPostgresql className="h-10 w-10 text-blue-600" />
                                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">PostgreSQL</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiSupabase className="h-10 w-10 text-blue-500" />
                                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Supabase</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-center text-gray-600 dark:text-gray-300">© 2024 Nam's Portfolio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
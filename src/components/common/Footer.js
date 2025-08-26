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
                                href="https://www.linkedin.com/in/namnhbr" 
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

                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 inline-block">Frontend Stack</h3>
                        <div className="grid grid-cols-3 gap-8">
                            <div className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2" aria-label="React technology">
                                <FaReact className="h-12 w-12 text-blue-400 group-hover:animate-spin" />
                                <span className="mt-2 group-hover:text-blue-400">React</span>
                            </div>
                            <div className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2" aria-label="Tailwind CSS technology">
                                <SiTailwindcss className="h-12 w-12 text-cyan-400 group-hover:text-cyan-300" />
                                <span className="mt-2 group-hover:text-cyan-300">Tailwind</span>
                            </div>
                            <div className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2" aria-label="JavaScript technology">
                                <SiJavascript className="h-12 w-12 text-yellow-400 group-hover:text-yellow-300" />
                                <span className="mt-2 group-hover:text-yellow-300">JavaScript</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold border-b-2 border-green-500 pb-2 inline-block">Backend Stack</h3>
                        <div className="grid grid-cols-3 gap-8">
                            <div className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2" aria-label="Node.js technology">
                                <FaNodeJs className="h-12 w-12 text-green-500 group-hover:text-green-400" />
                                <span className="mt-2 group-hover:text-green-400">Node.js</span>
                            </div>
                            <div className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2" aria-label="PostgreSQL technology">
                                <SiPostgresql className="h-12 w-12 text-blue-400 group-hover:text-blue-300" />
                                <span className="mt-2 group-hover:text-blue-300">PostgreSQL</span>
                            </div>
                            <div className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2" aria-label="Supabase technology">
                                <SiSupabase className="h-12 w-12 text-emerald-500 group-hover:text-emerald-400" />
                                <span className="mt-2 group-hover:text-emerald-400">Supabase</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-700">
                    <p className="text-center text-gray-400 text-sm">
                        © {new Date().getFullYear()} Brian. Crafted with passion and precision.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
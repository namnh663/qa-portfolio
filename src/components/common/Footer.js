import { FaEnvelope, FaLinkedin, FaGithub, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiSupabase, SiPostgresql } from 'react-icons/si';

// Grouping tech for easier mapping
const techStack = [
  { icon: FaReact, name: 'React', color: 'text-blue-500' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-500' },
  { icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
  { icon: FaNodeJs, name: 'Node.js', color: 'text-green-500' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: 'text-blue-600' },
  { icon: SiSupabase, name: 'Supabase', color: 'text-emerald-500' },
];

// Grouping social links
const socialLinks = [
  { icon: FaEnvelope, name: 'Email', href: 'mailto:namnh663@gmail.com' },
  { icon: FaLinkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/in/namnhbr' },
  { icon: FaGithub, name: 'GitHub', href: 'https://github.com/namnh663' },
];

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Brian
            </h3>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Passionate about creating high-quality, robust, and scalable software solutions.
            </p>
          </div>

          {/* Column 2: Empty or additional links (e.g., Nav) */}
          {/* This spacer column helps balance the layout, but you could add nav links here */}
          <div className="hidden lg:block"></div>

          {/* Column 3: Tech Stack */}
          <div className="md:col-span-1 lg:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Built With
            </h4>
            <div className="flex flex-wrap gap-5 mt-4">
              {techStack.map((tech) => (
                // Changed <a> to <span> and removed href/onClick
                <span
                  key={tech.name}
                  title={tech.name}
                >
                  <tech.icon className={`h-6 w-6 ${tech.color}`} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Brian. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${social.name} profile`}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { useState } from 'react';
import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import { fetchSkills } from '../../services/fetchSkills';
import {
    Code, Database, Users, Smartphone,
    Globe, Zap, Brain, RefreshCw, ScanSearch
} from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const Skills = () => {
    const { data: skills, loading, error } = useFetch(fetchSkills);
    const [selectedCategory, setSelectedCategory] = useState('All');

    if (loading) return <LoadingSpinner aria-live="polite" />;
    if (error) return <p className="text-red-500 text-center py-8" aria-live="assertive">Error loading skills</p>;

    const skillsByType = skills.reduce((acc, skill) => {
        acc[skill.type] = acc[skill.type] || [];
        acc[skill.type].push(skill);
        return acc;
    }, {});

    const categories = ['All', ...Object.keys(skillsByType)];

    const getTypeIcon = (type) => {
        const icons = {
            'Language': Code,
            'Testing': ScanSearch,
            'Database': Database,
            'Management': Users,
            'Mobile': Smartphone,
            'Cloud': Globe,
            'Process': RefreshCw,
            'AI/ML': Brain,
            'Tool': Zap,
        };
        return icons[type] || Code;
    };

    const getTypeColor = (type) => {
        const colors = {
            'Language': 'from-blue-500 to-cyan-500',
            'Testing': 'from-green-500 to-emerald-500',
            'Database': 'from-purple-500 to-violet-500',
            'Management': 'from-pink-500 to-rose-500',
            'Mobile': 'from-orange-500 to-amber-500',
            'Cloud': 'from-sky-500 to-blue-500',
            'Process': 'from-gray-500 to-slate-500',
            'AI/ML': 'from-indigo-500 to-purple-500',
            'Tool': 'from-yellow-500 to-orange-500',
        };
        return colors[type] || 'from-gray-500 to-slate-500';
    };

    const filteredSkills = selectedCategory === 'All'
        ? skills
        : skills.filter(skill => skill.type === selectedCategory);

    return (
        <section id="skills" className="py-16">
            <div className="container mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="flex items-center text-2xl font-bold mb-8">
                            Skills & Technologies
                        </h2>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap gap-3 mb-12"
                    >
                        {categories.map((category) => {
                            const IconComponent = category !== 'All' ? getTypeIcon(category) : null;
                            return (
                                <motion.button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`
                  flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                  ${selectedCategory === category
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                        }
                `}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {IconComponent && <IconComponent className="w-4 h-4" />}
                                    <span className="font-medium">{category}</span>
                                    {category !== 'All' && (
                                        <span className="text-xs bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full">
                                            {skillsByType[category]?.length || 0}
                                        </span>
                                    )}
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {/* Skills Display */}
                    <motion.div layout className="flex flex-wrap gap-3">
                        {filteredSkills.map((skill, index) => {
                            const IconComponent = getTypeIcon(skill.type);
                            return (
                                <motion.div
                                    key={skill.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.02,
                                        layout: { duration: 0.3 }
                                    }}
                                    className="group"
                                >
                                    <motion.div
                                        className={`
                    flex items-center gap-2 px-4 py-3 rounded-xl
                    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10
                    transition-all duration-300 cursor-default
                    hover:border-blue-300 dark:hover:border-blue-600
                  `}
                                        whileHover={{
                                            y: -2,
                                            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)"
                                        }}
                                    >
                                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${getTypeColor(skill.type)} text-white`}>
                                            <IconComponent className="w-3 h-3" />
                                        </div>
                                        <span className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                                            {skill.skill}
                                        </span>
                                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Skills Count */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center mt-12"
                    >
                        <p className="text-gray-500 dark:text-gray-400">
                            Showing <span className="font-semibold text-blue-600">{filteredSkills.length}</span>
                            {selectedCategory === 'All' ? ' skills' : ` ${selectedCategory.toLowerCase()} skills`}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
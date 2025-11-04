import { useState } from 'react'; // Re-added useState
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import useFetch from '../../hooks/useFetch';
import { fetchSkills } from '../../services/fetchSkills';
import {
    Code, Database, Users, Smartphone,
    Globe, Zap, Brain, RefreshCw, ScanSearch
} from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const Skills = () => {
    const { data: skills, loading, error } = useFetch(fetchSkills);
    // State to manage the currently selected tab
    const [selectedCategory, setSelectedCategory] = useState('Language');

    if (loading) return <LoadingSpinner aria-live="polite" />;
    if (error) return <p className="text-red-500 text-center py-8" aria-live="assertive">Error loading skills</p>;

    const skillsByType = skills.reduce((acc, skill) => {
        acc[skill.type] = acc[skill.type] || [];
        acc[skill.type].push(skill);
        return acc;
    }, {});

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
            'Language': 'text-blue-600 dark:text-blue-400',
            'Testing': 'text-green-600 dark:text-green-400',
            'Database': 'text-purple-600 dark:text-purple-400',
            'Management': 'text-pink-600 dark:text-pink-400',
            'Mobile': 'text-orange-600 dark:text-orange-400',
            'Cloud': 'text-sky-600 dark:text-sky-400',
            'Process': 'text-gray-600 dark:text-gray-400',
            'AI/ML': 'text-indigo-600 dark:text-indigo-400',
            'Tool': 'text-yellow-600 dark:text-yellow-400',
        };
        return colors[type] || 'text-gray-600 dark:text-gray-400';
    };

    const categoryOrder = ['Language', 'Testing', 'Database', 'Tool', 'Process', 'Management', 'Mobile', 'Cloud', 'AI/ML'];
    const sortedCategories = Object.keys(skillsByType).sort((a, b) => {
        return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
    });

    // Set a default selected category once data loads
    if (sortedCategories.length > 0 && selectedCategory === null) {
        setSelectedCategory(sortedCategories[0]);
    }

    const currentSkills = skillsByType[selectedCategory] || [];
    const CurrentIcon = getTypeIcon(selectedCategory);
    const currentColor = getTypeColor(selectedCategory);

    return (
        <section id="skills" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        Skills & Technologies
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Click a category to see the tools and technologies I work with.
                    </p>
                </motion.div>

                {/*
                 * ======================================
                 * NEW: Tab Navigation
                 * ======================================
                 */}
                <div 
                  className="flex overflow-x-auto gap-4 pb-4 mb-8 snap-x"
                  role="tablist"
                  aria-label="Skill categories"
                >
                    {sortedCategories.map((type) => {
                        const IconComponent = getTypeIcon(type);
                        const isActive = selectedCategory === type;
                        return (
                            <motion.button
                                key={type}
                                onClick={() => setSelectedCategory(type)}
                                role="tab"
                                aria-selected={isActive}
                                className={`
                                    flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-lg snap-start
                                    transition-all duration-300 border
                                    ${isActive
                                        ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 border-gray-900 dark:border-gray-100'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                                    }
                                `}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <IconComponent className={`w-5 h-5 ${isActive ? '' : getTypeColor(type)}`} />
                                <span className="font-medium text-sm">{type}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/*
                 * ======================================
                 * NEW: Tab Panel Content
                 * ======================================
                 */}
                <div 
                  className="bg-gray-50 dark:bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 min-h-[250px]"
                  role="tabpanel"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory} // This is crucial for AnimatePresence
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Panel Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <CurrentIcon className={`w-7 h-7 ${currentColor}`} />
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {selectedCategory}
                                </h3>
                            </div>

                            {/* Panel Skills (Tag Cloud) */}
                            <div className="flex flex-wrap gap-3">
                                {currentSkills.map((skill) => (
                                    <motion.span
                                        key={skill.id}
                                        className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-base text-gray-700 dark:text-gray-200"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {skill.skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Skills;
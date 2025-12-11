import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import { fetchSkills } from '../../services/fetchSkills';
import Skeleton from '../common/Skeleton'; // Import Skeleton
import { SKILL_CONFIG, SKILL_CATEGORY_ORDER } from '../../config/skillsConfig';

const SkillTabButton = ({ type, isSelected, onClick }) => {
  const { icon: Icon, color } = SKILL_CONFIG[type] || SKILL_CONFIG['Default'];
  
  return (
    <motion.button
      onClick={() => onClick(type)}
      role="tab"
      aria-selected={isSelected}
      className={`
        flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-lg snap-start
        transition-all duration-300 border
        ${isSelected
          ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 border-gray-900 dark:border-gray-100'
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className={`w-5 h-5 ${isSelected ? '' : color}`} />
      <span className="font-medium text-sm">{type}</span>
    </motion.button>
  );
};

const Skills = () => {
  const { data: skills, loading, error } = useFetch(fetchSkills);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const skillsByType = useMemo(() => {
    if (!skills) return {};
    return skills.reduce((acc, skill) => {
      acc[skill.type] = acc[skill.type] || [];
      acc[skill.type].push(skill);
      return acc;
    }, {});
  }, [skills]);

  const sortedCategories = useMemo(() => {
    return Object.keys(skillsByType).sort((a, b) => 
      SKILL_CATEGORY_ORDER.indexOf(a) - SKILL_CATEGORY_ORDER.indexOf(b)
    );
  }, [skillsByType]);

  useEffect(() => {
    if (sortedCategories.length > 0 && !selectedCategory) {
      setSelectedCategory(sortedCategories[0]);
    }
  }, [sortedCategories, selectedCategory]);

  // 1. Define Loading View
  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
                <Skeleton className="h-10 w-64 mx-auto" /> {/* Title */}
                <Skeleton className="h-4 w-96 mx-auto" />  {/* Subtitle */}
            </div>
            {/* Tabs Skeleton */}
            <div className="flex gap-4 pb-4 mb-8 overflow-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 w-32 rounded-lg flex-shrink-0" />
                ))}
            </div>
            {/* Panel Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 h-[250px]">
                <Skeleton className="h-8 w-48 mb-6" /> {/* Category Title */}
                <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-10 w-24 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
      </section>
    );
  }

  if (error) return <p className="text-red-500 text-center py-8">Error loading skills</p>;

  const currentSkills = skillsByType[selectedCategory] || [];
  const { icon: CurrentIcon, color: currentColor } = SKILL_CONFIG[selectedCategory] || SKILL_CONFIG['Default'];

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

        <div className="flex overflow-x-auto gap-4 pb-4 mb-8 snap-x" role="tablist">
          {sortedCategories.map((type) => (
            <SkillTabButton 
              key={type} 
              type={type} 
              isSelected={selectedCategory === type} 
              onClick={setSelectedCategory} 
            />
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 min-h-[250px]" role="tabpanel">
          <AnimatePresence mode="wait">
            {selectedCategory && (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <CurrentIcon className={`w-7 h-7 ${currentColor}`} />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {selectedCategory}
                  </h3>
                </div>

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
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
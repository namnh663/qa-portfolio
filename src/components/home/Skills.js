import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { fetchSkills } from '../../services/fetchSkills';
import LoadingSpinner from '../common/LoadingSpinner';

const Skills = () => {
    const { data: skills, loading, error } = useFetch(fetchSkills);
    const [activeSkill, setActiveSkill] = useState(null);

    if (loading) return <LoadingSpinner aria-live="polite" />;
    if (error) return <p aria-live="assertive">Error loading skills</p>;

    const skillsByType = skills.reduce((acc, skill) => {
        acc[skill.type] = acc[skill.type] || [];
        acc[skill.type].push(skill);
        return acc;
    }, {});

    return (
        <section id="skills" className="py-8" aria-labelledby="skills-title">
            <div className="container mx-auto">
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6">
                    <h2
                        id="skills-title"
                        data-testid="skill-title"
                        className="text-2xl font-bold mb-8"
                    >
                        Skills
                    </h2>

                    {Object.entries(skillsByType).map(([type, typeSkills]) => (
                        <div key={type} className="mb-8 last:mb-0">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                                {`${type}`}
                            </h3>
                            <div
                                data-testid="skill-grid"
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            >
                                {typeSkills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        data-testid={`skill-item-${skill.id}`}
                                        className={`
                                            relative cursor-pointer
                                            p-4 rounded-lg transition-all duration-300
                                            ${activeSkill === skill.id
                                                ? 'bg-gray-100 dark:bg-gray-400 scale-105'
                                                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }
                                            border border-gray-200 dark:border-gray-700
                                            hover:shadow-lg
                                        `}
                                        onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                                        aria-label={`Skill: ${skill.skill}`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            {skill.level && (
                                                <div className="w-2 h-2 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            skill.level === 'expert' ? '#10B981' :
                                                                skill.level === 'advanced' ? '#3B82F6' :
                                                                    '#6B7280'
                                                    }}
                                                />
                                            )}
                                            <span
                                                data-testid={`skill-name-${skill.id}`}
                                                className="font-medium text-gray-800 dark:text-gray-200"
                                            >
                                                {skill.skill}
                                            </span>
                                        </div>

                                        {activeSkill === skill.id && skill.description && (
                                            <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                                {skill.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
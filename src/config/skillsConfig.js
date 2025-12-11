import {
  Code, Database, Users, Smartphone,
  Globe, Zap, Brain, RefreshCw, ScanSearch
} from 'lucide-react';

export const SKILL_CATEGORY_ORDER = [
  'Language', 'Testing', 'Database', 'Tool', 
  'Process', 'Management', 'Mobile', 'Cloud', 'AI/ML'
];

export const SKILL_CONFIG = {
  'Language':   { icon: Code,       color: 'text-blue-600 dark:text-blue-400' },
  'Testing':    { icon: ScanSearch, color: 'text-green-600 dark:text-green-400' },
  'Database':   { icon: Database,   color: 'text-purple-600 dark:text-purple-400' },
  'Management': { icon: Users,      color: 'text-pink-600 dark:text-pink-400' },
  'Mobile':     { icon: Smartphone, color: 'text-orange-600 dark:text-orange-400' },
  'Cloud':      { icon: Globe,      color: 'text-sky-600 dark:text-sky-400' },
  'Process':    { icon: RefreshCw,  color: 'text-gray-600 dark:text-gray-400' },
  'AI/ML':      { icon: Brain,      color: 'text-indigo-600 dark:text-indigo-400' },
  'Tool':       { icon: Zap,        color: 'text-yellow-600 dark:text-yellow-400' },
  // Fallback
  'Default':    { icon: Code,       color: 'text-gray-600 dark:text-gray-400' },
};
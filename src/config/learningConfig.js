import { 
  Code, Lightbulb, GraduationCap, BookOpen, Layers 
} from 'lucide-react';

export const CATEGORY_CONFIG = {
  "Frontend": { 
    icon: Code, 
    color: "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30 ring-blue-600/20" 
  },
  "Testing": { 
    icon: Lightbulb, 
    color: "text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-900/30 ring-amber-600/20" 
  },
  "Career": { 
    icon: GraduationCap, 
    color: "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-900/30 ring-emerald-600/20" 
  },
  "Architecture": { 
    icon: Layers, 
    color: "text-purple-700 bg-purple-50 dark:text-purple-300 dark:bg-purple-900/30 ring-purple-600/20" 
  },
  // Fallbacks
  "General": { 
    icon: BookOpen, 
    color: "text-slate-700 bg-slate-50 dark:text-slate-300 dark:bg-slate-800 ring-slate-600/20" 
  },
  "Default": { 
    icon: BookOpen, 
    color: "text-indigo-700 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-900/30 ring-indigo-600/20" 
  }
};
import { Calendar, User, Tag } from 'lucide-react';

// --- Helper Function ---
// Robustly formats the date and handles invalid/missing data
const formatDate = (dateString) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string passed to PostMetadata:', dateString);
      return null;
    }
    // Format to a more readable, modern style
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return null;
  }
};

// --- Child Component ---
// A self-contained item for metadata. It won't render if text is null.
const MetaItem = ({ icon: Icon, text }) => {
  // If no text is provided, render nothing.
  if (!text) return null;

  return (
    <div className="flex items-center gap-1.5">
      <Icon className="w-4 h-4 text-gray-500 dark:text-gray-500" />
      <span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
    </div>
  );
};

// --- Main Component ---
const PostMetadata = ({ category, read_time, author, created_at }) => {
  const formattedDate = formatDate(created_at);

  return (
    // Added a bit more margin-bottom for breathing room after the separator
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
      {/* Using 'gap' is a modern way to handle spacing in a flex-wrap container.
        It provides responsive horizontal (gap-x-6) and vertical (gap-y-3) spacing.
      */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {/* We pass the value directly. The MetaItem component
          handles the logic of whether to render or not.
        */}
        <MetaItem icon={User} text={author} />
        <MetaItem icon={Calendar} text={formattedDate} />
        <MetaItem icon={Tag} text={category} />
      </div>
    </div>
  );
};

export default PostMetadata;
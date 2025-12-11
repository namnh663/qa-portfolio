const Skeleton = ({ className = "" }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} 
      role="status"
      aria-label="Loading..."
    />
  );
};

export default Skeleton;
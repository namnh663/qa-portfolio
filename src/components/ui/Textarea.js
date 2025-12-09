const Textarea = ({ 
  placeholder, 
  value, 
  onChange, 
  rows = 4, 
  className = '', 
  disabled = false 
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
      className={`
        w-full 
        px-4 py-3 
        bg-white dark:bg-[#1A202C] 
        text-gray-700 dark:text-gray-200 text-sm leading-relaxed
        border border-gray-200 dark:border-gray-700 
        rounded-xl 
        shadow-sm 
        placeholder-gray-400 dark:placeholder-gray-500
        transition-all duration-200 ease-in-out
        hover:border-gray-300 dark:hover:border-gray-600
        focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
        resize-y
        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
        ${className}
      `}
    />
  );
};

export default Textarea;
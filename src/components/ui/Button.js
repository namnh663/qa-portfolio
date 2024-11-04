const Button = ({ variant, children, ...props }) => {
    const baseStyles = 'px-4 py-2 rounded text-sm font-medium';
    const variantStyles =
        variant === 'default'
            ? 'bg-blue-600 text-white hover:bg-blue-500'
            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700';

    return (
        <button className={`${baseStyles} ${variantStyles}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
const Card = ({ children }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            {children}
        </div>
    );
};

export default Card;

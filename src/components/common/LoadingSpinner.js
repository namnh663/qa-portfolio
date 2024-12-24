const LoadingSpinner = () => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60"
            role="status"
            aria-live="polite"
            aria-label="Loading"
        >
            <div className="relative">
                {/* Primary spinner */}
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
                {/* Secondary spinner */}
                <div
                    className="absolute top-0 animate-spin rounded-full h-24 w-24 border-r-4 border-l-4 border-blue-500"
                    style={{ animationDirection: 'reverse', animationDuration: '1s' }}
                ></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
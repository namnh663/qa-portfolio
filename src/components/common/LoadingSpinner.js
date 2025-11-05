const LoadingSpinner = () => {
    return (
        <div
            // MODERNIZED OVERLAY:
            // - Using bg-gray-900/70 for opacity (new Tailwind syntax)
            // - Added 'backdrop-blur-sm' for a modern "glass" effect
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm"
            role="status"
            aria-live="polite"
            aria-label="Loading"
        >
            {/* IMPROVED SPINNER:
                - Simplified to one div.
                - 'border-white/20': Creates a light, subtle "track".
                - 'border-t-blue-400': The vibrant "head" of the spinner. 'blue-400' is a friendlier shade.
                - 'ease-linear': Makes the animation perfectly smooth and continuous, not easing in/out.
                - 'h-20 w-20' and 'border-4': Adjusted size and thickness for a cleaner look.
            */}
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-white/20 border-t-blue-400 ease-linear"></div>
        </div>
    );
};

export default LoadingSpinner;
const GeneratingLoading = () => {
  return (
    <div className="flex items-center justify-center h-48 bg-teal-900/50 rounded-xl border border-teal-800 backdrop-blur-sm shadow-inner transition-all duration-300 cursor-wait shimmer">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-teal-700 border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 animate-pulse"></div>
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium text-black">Generating content</h3>
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratingLoading;

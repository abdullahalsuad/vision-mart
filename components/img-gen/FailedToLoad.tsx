const FailedToLoad = () => {
  return (
    <div className="flex items-center justify-center h-48 text-black text-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-xl shadow-lg  ">
      <span className="flex items-center space-x-2">
        <svg
          className="w-6 h-6 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-white font-semibold ">Failed to load 😔</span>
      </span>
    </div>
  );
};

export default FailedToLoad;

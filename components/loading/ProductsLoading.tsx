import React from "react";

const ProductsLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl shadow-md overflow-hidden bg-white animate-pulse"
        >
          {/* Image skeleton */}
          <div className="relative">
            <div className="w-full h-48 bg-gray-200"></div>
            <span className="absolute top-2 left-2 w-12 h-5 bg-gray-300 rounded-md"></span>
          </div>

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
            <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-5 w-1/2 bg-gray-200 rounded"></div>

            <div className="flex items-center justify-between mt-4">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-20 bg-gray-400 rounded-xl"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsLoading;

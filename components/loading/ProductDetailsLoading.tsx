import React from "react";

const ProductDetailsLoading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <span className="text-gray-300">/</span>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <span className="text-gray-300">/</span>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-white p-6">
            <div className="w-full aspect-square bg-gray-200 rounded"></div>
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="h-5 w-12 bg-gray-300 rounded"></div>
              <div className="h-5 w-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 w-2/3 bg-gray-200 rounded mb-4"></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-16 w-full bg-gray-100 rounded"></div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <div className="h-6 w-20 bg-gray-300 rounded"></div>
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
            </div>

            {/* Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="p-2 bg-gray-200 rounded-lg w-8 h-8"></div>
                  <div>
                    <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-gray-200 pt-8 mb-12">
        <div className="h-6 w-40 bg-gray-300 rounded mb-6"></div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoading;

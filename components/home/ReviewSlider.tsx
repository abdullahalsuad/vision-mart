"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  product: string;
  date: string;
  avatar: string;
  verified: boolean;
}

const ReviewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Static reviews data
  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Amazing product quality! The delivery was super fast and the customer service exceeded my expectations. Highly recommend!",
      product: "Wireless Headphones",
      date: "2 days ago",
      avatar:
        "https://images.unsplash.com/photo-1689193502060-4b78d318277e?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment:
        "Best online shopping experience I've had! The product arrived exactly as described and the packaging was premium quality.",
      product: "Smart Watch",
      date: "1 week ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 4,
      comment:
        "Great value for money! The product works perfectly and shipping was faster than expected. Will definitely order again.",
      product: "Bluetooth Speaker",
      date: "3 days ago",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 4,
      name: "David Rodriguez",
      rating: 5,
      comment:
        "Exceptional quality and service! The team went above and beyond to ensure my satisfaction. Five stars all the way!",
      product: "Gaming Mouse",
      date: "5 days ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 5,
      name: "Lisa Thompson",
      rating: 5,
      comment:
        "Outstanding customer experience from start to finish. The product quality is top-notch and delivery was lightning fast!",
      product: "Laptop Stand",
      date: "1 week ago",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 6,
      name: "Alex Kim",
      rating: 4,
      comment:
        "Really impressed with the build quality and attention to detail. Customer support was very helpful throughout the process.",
      product: "Phone Case",
      date: "4 days ago",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 7,
      name: "Jennifer White",
      rating: 5,
      comment:
        "Perfect shopping experience! Fast shipping, excellent packaging, and the product exceeded all my expectations.",
      product: "Fitness Tracker",
      date: "6 days ago",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 8,
      name: "Robert Brown",
      rating: 5,
      comment:
        "Amazing service and product quality! This is now my go-to store for electronics. Highly recommend to everyone!",
      product: "Tablet",
      date: "1 week ago",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    {
      id: 9,
      name: "Maria Garcia",
      rating: 4,
      comment:
        "Great products at competitive prices. The customer service team was incredibly responsive and helpful.",
      product: "Wireless Charger",
      date: "3 days ago",
      avatar:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
  ];

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const getCurrentReviews = () => {
    const startIndex = currentIndex * reviewsPerPage;
    return reviews.slice(startIndex, startIndex + reviewsPerPage);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="my-12 relative">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          See what our valued customers are saying about their shopping
          experience with us.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-teal-600 shadow-lg rounded-full p-3 hover:bg-teal-500 cursor-pointer transition-all duration-200 hover:scale-110"
          onMouseEnter={() => setIsAutoPlaying(false)}
        >
          <FaChevronLeft className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-teal-600 shadow-lg rounded-full p-3 hover:bg-teal-500 cursor-pointer transition-all duration-200 hover:scale-110"
          onMouseEnter={() => setIsAutoPlaying(false)}
        >
          <FaChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Reviews Container */}
        <div className="mx-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {getCurrentReviews().map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    <FaQuoteLeft className="w-8 h-8 text-teal-600" />
                  </div>

                  {/* User Info */}
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover border-2 border-teal-100"
                      />
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-teal-600 rounded-full p-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {review.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">
                          • {review.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {review.comment}
                  </p>

                  {/* Product Info */}
                  <div className="bg-gray-50 rounded-lg p-3 mt-4">
                    <p className="text-xs uppercase text-gray-500 mb-1">
                      Purchased
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {review.product}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-teal-600 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Overall Rating Summary */}
      <div className="text-center mt-10 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 max-w-4xl mx-auto">
        <div className="mb-2">
          <span className="ml-2 text-2xl font-bold text-gray-800">4.8</span>
          <div className="flex items-center justify-center">
            {renderStars(5)}
          </div>
        </div>
        <p className="text-gray-600">
          Based on{" "}
          <span className="font-semibold text-teal-600">
            {reviews.length} verified reviews
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          98% of customers recommend our products
        </p>
      </div>
    </section>
  );
};

export default ReviewSlider;

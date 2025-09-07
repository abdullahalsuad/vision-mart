"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { FiX, FiCheck, FiMapPin, FiPhone, FiUser, FiMail, FiDollarSign } from "react-icons/fi";

interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  userID: string;
  productID: string;
  name: string;
  email: string;
  img: string;
  title: string;
  price: number;
}

const BuyNowModal: React.FC<BuyNowModalProps> = ({
  isOpen,
  onClose,
  userID,
  productID,
  name,
  email,
  img,
  title,
  price,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const number = formData.get("number") as string;
    const address = formData.get("address") as string;
    
    // Basic validation
    if (!number || !address) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          productID,
          number: String(number),
          address: String(address)
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      toast.success(
        <div className="flex items-center gap-2">
          <FiCheck className="text-green-500" />
          Order placed successfully!
        </div>
      );
      onClose();
    } catch (error: unknown) {
      console.error("Order Error:", error);
      toast.error(
        <div className="flex items-center gap-2">
          <FiX className="text-red-500" />
          Something went wrong. Please try again.
        </div>
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white text-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 relative">
          <h2 className="text-xl font-bold text-center">Complete Your Order</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-teal-100 text-xl transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {/* Product Info */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="w-20 h-20 relative rounded-lg overflow-hidden shadow flex-shrink-0">
              <Image 
                fill
                src={img} 
                alt={title}
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold truncate">{title}</h3>
              <p className="text-teal-600 font-bold text-xl">${price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">Cash on Delivery</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (Display only) */}
            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <FiUser className="text-teal-600" />
                Name
              </label>
              <input
                type="text"
                value={name}
                readOnly
                className="w-full cursor-not-allowed mt-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none"
              />
            </div>

            {/* Email (Display only) */}
            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <FiMail className="text-teal-600" />
                Email
              </label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full cursor-not-allowed mt-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <FiPhone className="text-teal-600" />
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="number"
                required
                placeholder="Enter your phone number"
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <FiMapPin className="text-teal-600" />
                Shipping Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                required
                rows={3}
                placeholder="Enter your complete shipping address"
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
              />
            </div>

            {/* Payment Method - Cash on Delivery Only */}
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <FiDollarSign className="text-teal-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-teal-800">Cash on Delivery</p>
                  <p className="text-sm text-teal-600">Pay when you receive your order</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span className="text-teal-600">${price.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  Confirm Order
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
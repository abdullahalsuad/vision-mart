// app/add-product/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productTitle: "",
    description: "",
    price: "",
    productImg: "",
    category: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "">("");
  const [submitMessage, setSubmitMessage] = useState("");

  const categories = [
    "Electronics",
    "Fashion",
    "Pet Supplies",
    "Beauty",
    "Sports",
    "Groceries"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Product added successfully!");
        setFormData({
          productTitle: "",
          description: "",
          price: "",
          productImg: "",
          category: ""
        });
      } else {
        setSubmitStatus("error");
        setSubmitMessage("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.log(error);
      
      setSubmitStatus("error");
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-600 mt-1">Fill out the form below to add a new product to your inventory.</p>
      </div>

      {/* Status Message */}
      {submitStatus && (
        <div className={`p-3 mb-4 rounded-lg ${submitStatus === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {submitMessage}
        </div>
      )}

      {/* Form - Single column layout */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
        {/* Image URL Section */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Image URL</h2>
          <div>
            <label htmlFor="productImg" className="block text-sm font-medium text-gray-700 mb-2">
              Product Image URL *
            </label>
            <input
              type="text"
              id="productImg"
              name="productImg"
              value={formData.productImg}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              placeholder="https://example.com/image.jpg"
            />
            {formData.productImg && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <Image width={600} height={400}
                  src={formData.productImg} 
                  alt="Preview" 
                  className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Category Section */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Category</h2>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Product Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Product Details</h2>
          
          {/* Product Title */}
          <div className="mb-4">
            <label htmlFor="productTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              id="productTitle"
              name="productTitle"
              value={formData.productTitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              placeholder="Enter product title"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              placeholder="0.00"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              placeholder="Enter product description"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed text-base"
          >
            {isSubmitting ? (
              "Adding Product..."
            ) : (
              <>
                <FiPlus className="mr-2" />
                Add Product
              </>
            )}
          </button>
        </div>
      </form>

      {/* Form Tips */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2">Tips:</h3>
        <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
          <li>Make sure the image URL is a direct link to the image file</li>
          <li>Provide a clear and detailed description of your product</li>
          <li>Select the most appropriate category for your product</li>
        </ul>
      </div>
    </div>
  );
}
// app/allproducts/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiEye, FiPlus, FiSearch, FiX, FiFilter } from "react-icons/fi";
import Image from "next/image";

interface Product {
  _id: string;
  productTitle: string;
  description: string;
  price: number;
  productImg: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique categories for filter
  const categories = ["All", ...new Set(products.map(product => product.category))];

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "" || selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // View product
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  // Edit product
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // Delete product
  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`/api/products/${selectedProduct._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((p) => p._id !== selectedProduct._id));
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>

        {/* Search + Filter + Add */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="relative flex-1">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none w-full appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Product Button */}
          <Link href="/add">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center justify-center cursor-pointer whitespace-nowrap">
              <FiPlus className="mr-2" />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Filter Status */}
      {(searchTerm || selectedCategory) && (
        <div className="mb-6 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm text-blue-700">
              {filteredProducts.length} product(s) found
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory && selectedCategory !== "All" && ` in ${selectedCategory}`}
            </span>
          </div>
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer flex items-center"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-600">No products found.</p>
          {(searchTerm || selectedCategory) && (
            <p className="text-sm text-gray-500 mt-2">
              Try adjusting your search terms or category filter.
            </p>
          )}
          <button
            onClick={clearFilters}
            className="mt-4 text-teal-600 hover:text-teal-800 text-sm cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-100 overflow-hidden relative">
                <Image
                  src={product.productImg || "/placeholder-image.jpg"}
                  alt={product.productTitle}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23f3f4f6'%3E%3Crect width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='12' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate">
                  {product.productTitle}
                </h3>
                <p className="text-teal-600 font-bold text-xl mb-2">
                  ${product.price}
                </p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mb-4">
                  {product.category}
                </span>

                {/* Actions */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 gap-2">
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm cursor-pointer"
                  >
                    <FiEye className="mr-1" size={16} /> View
                  </button>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex items-center text-green-600 hover:text-green-800 text-sm cursor-pointer"
                  >
                    <FiEdit className="mr-1" size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product)}
                    className="flex items-center text-red-600 hover:text-red-800 text-sm cursor-pointer"
                  >
                    <FiTrash2 className="mr-1" size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedProduct && (
        <ViewModal 
          product={selectedProduct} 
          onClose={() => { 
            setIsViewModalOpen(false); 
            setSelectedProduct(null); 
          }} 
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedProduct && (
        <EditModal
          product={selectedProduct}
          onClose={() => { 
            setIsEditModalOpen(false); 
            setSelectedProduct(null); 
          }}
          onUpdate={(updatedProduct) => {
            setProducts(products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)));
          }}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedProduct && (
        <DeleteModal
          product={selectedProduct}
          onClose={() => { 
            setIsDeleteModalOpen(false); 
            setSelectedProduct(null); 
          }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

/* ----------------- View Modal Component ----------------- */
function ViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <FiX size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-64 relative">
              <Image
                src={product.productImg || "/placeholder-image.jpg"}
                alt={product.productTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Title</label>
                <p className="text-gray-900 font-semibold">{product.productTitle}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <p className="text-teal-600 font-bold text-xl">${product.price}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                  <p className="text-gray-600 text-sm">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Updated</label>
                  <p className="text-gray-600 text-sm">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 border-t pt-4">
            <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Edit Modal Component ----------------- */
function EditModal({
  product,
  onClose,
  onUpdate,
}: {
  product: Product;
  onClose: () => void;
  onUpdate: (product: Product) => void;
}) {
  const [formData, setFormData] = useState({
    productTitle: product.productTitle,
    description: product.description,
    price: product.price.toString(),
    productImg: product.productImg,
    category: product.category,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ["Electronics", "Fashion", "Pet Supplies", "Beauty", "Sports", "Groceries"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: parseFloat(formData.price) }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        onUpdate(updatedProduct);
        onClose();
      } else {
        throw new Error("Failed to update product");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <FiX size={24} />
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
              <input
                type="text"
                name="productTitle"
                value={formData.productTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
              <input
                type="text"
                name="productImg"
                value={formData.productImg}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none cursor-pointer"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Delete Modal Component ----------------- */
function DeleteModal({
  product,
  onClose,
  onConfirm,
}: {
  product: Product;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 rounded-lg max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Confirm Delete</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <FiX size={24} />
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete <strong>{product.productTitle}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button 
              onClick={onClose} 
              className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer" 
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirm} 
              disabled={loading} 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Deleting..." : "Delete Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
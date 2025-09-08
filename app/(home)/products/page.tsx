"use client";

import ProductCard from "@/components/home/ProductCard";
import ProductsLoading from "@/components/loading/ProductsLoading";
import { ProductType } from "@/types/productsTypes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/products");
        // Map API data to match Product interface
        const mappedProducts = res.data.map(
          (p: {
            _id: string;
            productTitle?: string;
            description?: string;
            price?: number;
            category?: string;
            productImg?: string;
          }) => ({
            _id: p._id,
            productTitle: p.productTitle || "",
            description: p.description || "",
            price: p.price || 0,
            category: p.category || "",
            productImg: p.productImg || "https://via.placeholder.com/150",
          })
        );
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Filter by search
  let filteredProducts = products.filter((p) =>
    p.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Filter by category
  if (sortOrder) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === sortOrder
    );
  }
  return (
    <div className="rounded-2xl py-8 mt-10 mb-30">
      {/* Title & Description */}
      <div className="text-center mb-8 px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="text-teal-600 text-4xl">Shop</span> Everything You
          Love
        </h1>
        <p className="text-gray-600 text-lg">
          Browse our extensive collection of products, from Electronics and
          Fashion to Pet Supplies and Groceries. Find what you need with ease
          using our search and filter tools.
        </p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-6">
        {/* Search box */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-8 pr-2 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <FaSearch className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        {/* Sort Dropdown */}
        <div className="flex-none w-full md:w-auto">
          <select
            id="filter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Products</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Beauty">Beauty</option>
            <option value="Sports">Sports</option>
            <option value="Groceries">Groceries</option>
          </select>
        </div>
      </div>

      {loading ? (
        <>
          <ProductsLoading />
        </>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10 text-lg font-medium">
          Product Not Found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

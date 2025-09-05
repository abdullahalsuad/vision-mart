"use client";

import ProductCard from "@/components/ProductCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products.json"); // axios দিয়ে GET
        setProducts(res.data); // JSON array সরাসরি set
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Filter by search
  let filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Category filter
  if (sortOrder) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === sortOrder
    );
  }

  return (
    <div className="rounded-2xl py-8">
      <div className="flex items-center  flex-col space-y-2 justify-center">
        <h2 className="text-5xl pt-4 text-center">Featured Products</h2>
        <p className="text-center">
          Discover our hand-picked selection of premium products at amazing
          prices
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-6">
          {/* Search box */}
          <div className="relative  ">
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
          <div className="flex-none">
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
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10 text-lg font-medium">
          Product Not Found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

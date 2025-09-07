"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "@/types/productsTypes";
import Link from "next/link";

const LatestProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await fetch("/api/products/latest");
        if (!res.ok) throw new Error("Failed to fetch latest products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading latest products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No latest products found.
      </div>
    );
  }


  return (
    <section className="my-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Latest Products</h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Discover our newest arrivals! Stay updated with the latest fashion, 
          electronics, and accessories — hand-picked for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <div
            key={`latest${i}`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700 transition"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default LatestProducts;

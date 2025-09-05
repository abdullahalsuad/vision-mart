"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className=" rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition bg-white">
      <div className="relative">
        <Image
          height={600}
          width={600}
          src={product?.img}
          alt={product?.title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
          -20%
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs uppercase text-gray-500">{product?.category}</p>
        <h3 className="text-lg font-semibold mb-1">{product?.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-teal-600">
            ${product?.price}{" "}
            <span className="text-gray-400 line-through text-sm">
              ${product?.price + 50}
            </span>
          </p>
          <Link
            href={`products/${product?.id}`}
            className="bg-[#009688] hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-sm"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

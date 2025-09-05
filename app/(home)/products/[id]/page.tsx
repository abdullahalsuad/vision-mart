"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BuyNowModal from "@/components/BuyNowModal";
import axios from "axios";
import Image from "next/image";

const ProductDetails: React.FC = () => {
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  user data (auth context নিবেন)
  const user = {
    id: "user123",
    name: "Josim Uddin",
    email: "josim@example.com",
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get<Product[]>("/products.json");
        const found = res.data.find((p) => p.id === productId);
        setProduct(found || null);
        // setProduct(res.data) //api call
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!product)
    return <p className="p-6 text-center text-red-500">Product not found!</p>;

  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="flex-1">
          <Image
            height={600}
            width={600}
            src={product.img}
            alt={product.title}
            className="w-full h-auto rounded-2xl object-cover shadow-md"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase text-gray-500 mb-1">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>

          {/* Price + Button */}
          <div className="flex items-center gap-6 mt-4">
            <p className="text-2xl font-bold text-teal-600">
              ${product.price}{" "}
              <span className="text-gray-400 line-through text-lg">
                ${product.price + 50}
              </span>
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#009688] hover:bg-teal-600 text-white px-6 py-2 rounded-xl text-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <BuyNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userID={user.id}
        productID={String(product.id)}
        name={user.name}
        email={user.email}
        img={product.img}
        title={product.title}
        price={product.price}
      />
    </div>
  );
};

export default ProductDetails;

"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BuyNowModal from "@/components/BuyNowModal";
import axios from "axios";
import Image from "next/image";
import { ProductType } from "@/types/productsTypes";
import { useSession } from "next-auth/react";
import { FaShoppingCart, FaHeart, FaShareAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineRollback } from "react-icons/ai";
import { BiShield } from "react-icons/bi";

const ProductDetails: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const { data: session, status } = useSession();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get<ProductType>(
          `http://localhost:3000/api/products/${productId}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId && status === "authenticated") fetchProduct();
  }, [productId, status]);

  if (status === "loading" || loading)
    return (
      <p className="p-6 text-center text-gray-500 text-lg font-medium">
        Loading...
      </p>
    );

  if (!product)
    return (
      <p className="p-6 text-center text-red-500 text-lg font-medium">
        Product not found!
      </p>
    );

  if (!session) return null;

  console.log(session);

  const user = {
    id: session.user?.id || "",
    name: session.user?.name || "",
    email: session.user?.email || "",
  };

  return (
    <div className="w-10/12 mx-auto py-30">
      <div className="flex flex-col md:flex-row gap-12 md:gap-20">
        {/* Product Image */}
        <div className="">
          <div className="relative w-full max-w-md md:max-w-lg rounded-3xl overflow-hidden shadow-2xl">
            <Image
              height={500}
              width={500}
              src={product.productImg}
              alt={product.productTitle}
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase text-gray-400 mb-3 tracking-widest">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-900">
              {product.productTitle}
            </h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#009688] flex items-center justify-center gap-3 hover:bg-teal-600 text-white px-8 py-2 rounded-md text-md md:text-xl  shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                <FaShoppingCart /> Buy Now
              </button>

              <button className="p-3 bg-white rounded-xl shadow hover:bg-gray-100 transition cursor-pointer">
                <FaHeart className="text-red-500" />
              </button>
              <button className="p-3 bg-white rounded-xl shadow hover:bg-gray-100 transition cursor-pointer">
                <FaShareAlt className="text-gray-600" />
              </button>
            </div>

            {/* Info Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow">
                <TbTruckDelivery className="text-teal-600 w-6 h-6" />
                <p className="text-sm text-gray-600 font-medium">
                  Free Shipping
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow">
                <BiShield className="text-teal-600 w-6 h-6" />
                <p className="text-sm text-gray-600 font-medium">
                  2 Year Warranty
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow">
                <AiOutlineRollback className="text-teal-600 w-6 h-6" />
                <p className="text-sm text-gray-600 font-medium">
                  Easy Returns
                </p>
              </div>
            </div>
          </div>

          {/* Price + Buy Now */}
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-teal-600">
              ${product.price}{" "}
              <span className="text-gray-400 line-through text-xl md:text-2xl">
                ${product.price + 100}
              </span>
            </p>
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
        img={product.productImg}
        title={product.productTitle}
        price={product.price}
      />
    </div>
  );
};

export default ProductDetails;

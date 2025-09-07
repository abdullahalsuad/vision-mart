"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BuyNowModal from "@/components/BuyNowModal";
import axios from "axios";
import Image from "next/image";
import { ProductType } from "@/types/productsTypes";
import { useSession } from "next-auth/react";
import { 
  FaShoppingCart, 
  FaHeart, 
  FaShareAlt, 
  FaArrowLeft,
  FaCheckCircle
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineRollback, AiOutlineShopping } from "react-icons/ai";
import { BiShield } from "react-icons/bi";
import { BsStarFill, BsArrowLeft } from "react-icons/bs";
import { toast, Toaster } from "sonner";

const ProductDetails: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const { data: session, status } = useSession();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<ProductType>(
          `/api/products/${productId}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product. Please try again.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId && status === "authenticated") {
      fetchProduct();
    }
  }, [productId, status]);


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.productTitle,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-500" />
          Link copied to clipboard!
        </div>
      );
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-10/12 mx-auto py-8 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-300 h-96 rounded-2xl"></div>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
            <div className="h-12 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-10/12 mx-auto py-8">
        <div className="bg-red-50 p-6 rounded-xl text-center">
          <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
          <button 
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 text-teal-600 hover:text-teal-700 mx-auto"
          >
            <BsArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-10/12 mx-auto py-8">
        <div className="bg-yellow-50 p-6 rounded-xl text-center">
          <p className="text-yellow-700 text-lg font-medium mb-4">Product not found!</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!session) return null;
  
  const user = {
    id: session.user?.id || "",
    name: session.user?.name || "",
    email: session.user?.email || "",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb and Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">Products</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">{product.category}</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium truncate">{product.productTitle}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-white p-6">
            <div className="relative aspect-square">
              <Image
                fill
                src={product.productImg}
                alt={product.productTitle}
                className="object-contain transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
            
            {/* Product badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                New
              </span>
              <span className="bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded">
                -$100
              </span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase text-teal-600 font-semibold mb-2 tracking-wide">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.productTitle}
              </h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <BsStarFill key={i} className="w-4 h-4" />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">(42 reviews)</span>
              </div>
              
              <p className="text-gray-700 truncate mb-6">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-teal-600">
                ${product.price}
              </span>
              <span className="text-xl text-gray-400 line-through">
                ${product.price + 100}
              </span>
              <span className="ml-2 text-sm bg-teal-100 text-teal-800 font-semibold px-2 py-1 rounded">
                Save $100
              </span>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <FaCheckCircle className="text-teal-500" />
                <span>In stock - Ready to ship</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaCheckCircle className="text-teal-500" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaCheckCircle className="text-teal-500" />
                <span>Free returns within 14 days</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-teal-600 hover:bg-teal-700 flex items-center justify-center gap-3 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all hover:shadow-lg cursor-pointer"
              >
                <FaShoppingCart /> Buy Now
              </button>
              
              <button className="flex-1 border border-teal-600 text-teal-600 hover:bg-teal-50 flex items-center justify-center gap-3 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer">
                <AiOutlineShopping /> Add to Cart
              </button>
            </div>
            
            {/* Secondary Actions */}
            <div className="flex items-center gap-4 mb-8">  
              <button 
                onClick={handleShare}
                className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md text-gray-600 transition-all cursor-pointer"
              >
                <FaShareAlt />
              </button>
              
              <span className="text-sm text-gray-500">Share this product</span>
            </div>

            {/* Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <TbTruckDelivery className="text-teal-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">Delivery in 2-3 days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <BiShield className="text-teal-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">2 Year Warranty</p>
                  <p className="text-xs text-gray-500">Full coverage</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <AiOutlineRollback className="text-teal-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="border-t border-gray-200 pt-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-7 whitespace-pre-line">
            {product.description}
          </p>
        </div>
      </div>

      {/* Modal */}
      <BuyNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userID={user.id}
        productID={String(product._id)}
        name={user.name}
        email={user.email}
        img={product.productImg}
        title={product.productTitle}
        price={product.price}
      />

      {/* Toaster */}
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default ProductDetails;
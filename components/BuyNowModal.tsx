"use client";

import Image from "next/image";

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
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const data = Object.fromEntries(formData.entries());
    // console.log(data);

    // try {
    //   const res = await fetch("/api/orders", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (!res.ok) {
    //     throw new Error("Failed to place order");
    //   }

    //   const result = await res.json();
    //   console.log("Order Success:", result);
    //   alert("Order placed successfully!");
    //   onClose();
    // } catch (error: unknown) {
    //   console.error("Order Error:", error);
    //   alert("Something went wrong!");
    // }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative animate-fadeIn">
        {/* Close Btn */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {/* Product Info */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-24 h-24 relative rounded-lg overflow-hidden shadow">
            <Image height={600} width={600} src={img} alt={title} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-teal-600 font-bold">${price}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Complete Your Order</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              readOnly
              className="w-full cursor-not-allowed mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full cursor-not-allowed mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Number */}
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="number"
              required
              placeholder="Enter your phone number"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              name="address"
              required
              placeholder="Enter your shipping address"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Hidden Fields */}
          <input type="hidden" name="userID" value={userID} />
          <input type="hidden" name="productID" value={productID} />

          {/* Submit Btn */}
          <button
            type="submit"
            className="w-full bg-[#009688] hover:bg-teal-600 text-white py-2 rounded-lg"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyNowModal;

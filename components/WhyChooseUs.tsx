"use client";
import React from "react";

import { FaShippingFast, FaHeadset, FaMoneyBillWave } from "react-icons/fa";

const reasons = [
  {
    id: 1,
    icon: <FaShippingFast className="text-[#009688] text-4xl mx-auto mb-4" />,
    title: "Fast Delivery",
    description:
      "Get your products delivered quickly and safely to your doorstep.",
  },

  {
    id: 2,
    icon: <FaHeadset className="text-[#009688] text-4xl mx-auto mb-4" />,
    title: "24/7 Support",
    description:
      "Our friendly support team is always ready to help you anytime.",
  },
  {
    id: 3,
    icon: <FaMoneyBillWave className="text-[#009688] text-4xl mx-auto mb-4" />,
    title: "Cash on Delivery",
    description: "Pay for your order when it arrives at your doorstep.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <div className=" py-8 ">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl p-4 text-center">Why Choose Us</h2>
        <p className="text-gray-600 mb-12">
          We provide the best quality products with excellent customer service.
          Here are a few reasons why our customers love us:
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              {reason.icon}
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-500">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

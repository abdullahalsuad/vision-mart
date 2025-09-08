"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaUsers,
  FaGlobe,
  FaAward,
  FaHeart,
  FaRocket,
  FaHandshake,
  FaLeaf,
  FaStar,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const features = [
    {
      icon: <FaShoppingBag className="w-8 h-8" />,
      title: "Premium Products",
      description:
        "Carefully curated selection of high-quality items from trusted brands worldwide.",
    },
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "Fast Delivery",
      description:
        "Lightning-fast shipping with tracking updates to get your orders to you quickly.",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Shopping",
      description:
        "Your data is protected with industry-leading security and encryption technology.",
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer service to help you with any questions or concerns.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: <FaUsers /> },
    { number: "100K+", label: "Products Sold", icon: <FaShoppingBag /> },
    { number: "25+", label: "Countries Served", icon: <FaGlobe /> },
    { number: "99.9%", label: "Customer Satisfaction", icon: <FaStar /> },
  ];

  const values = [
    {
      icon: <FaRocket className="w-12 h-12" />,
      title: "Innovation",
      description:
        "We continuously evolve our platform to bring you the latest in e-commerce technology and user experience.",
    },
    {
      icon: <FaHandshake className="w-12 h-12" />,
      title: "Trust",
      description:
        "Building lasting relationships with our customers through transparency, reliability, and exceptional service.",
    },
    {
      icon: <FaLeaf className="w-12 h-12" />,
      title: "Sustainability",
      description:
        "Committed to eco-friendly practices and supporting brands that care about our planet&apos;s future.",
    },
    {
      icon: <FaHeart className="w-12 h-12" />,
      title: "Community",
      description:
        "Creating a vibrant community where customers and sellers connect, share, and grow together.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1689193502060-4b78d318277e?w=300&h=300&fit=crop&crop=face",
      description:
        "Visionary leader with 10+ years in e-commerce and digital innovation.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://plus.unsplash.com/premium_photo-1666298858421-3765c17bcf80?w=400&h=400&fit=crop&crop=face",
      description:
        "Tech expert ensuring our platform delivers cutting-edge shopping experiences.",
    },
    {
      name: "Emma Davis",
      role: "Head of Customer Success",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description:
        "Dedicated to making every customer interaction exceptional and memorable.",
    },
    {
      name: "David Martinez",
      role: "Lead Designer",
      image:
        "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
      description:
        "Creative visionary crafting visually stunning and user-friendly designs for all our platforms.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-br from-teal-600 via-teal-700 to-blue-600 text-white py-20 mt-20 rounded-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              About Our Store
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-teal-100 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Transforming the way you shop online with innovative technology,
              premium products, and exceptional customer experiences.
            </motion.p>
            <motion.div className="flex justify-center" variants={itemVariants}>
              <FaAward className="w-16 h-16 text-yellow-300" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2020 with a simple mission: to create the most
                  customer-centric e-commerce platform in the world. What
                  started as a small team of passionate entrepreneurs has grown
                  into a thriving marketplace serving customers globally.
                </p>
                <p>
                  We believe that shopping online should be more than just a
                  transaction—it should be an experience. That&apos;s why
                  we&apos;ve invested heavily in technology, partnerships, and
                  customer service to ensure every interaction exceeds
                  expectations.
                </p>
                <p>
                  Today, we&apos;re proud to be the trusted choice for thousands
                  of customers worldwide, offering everything from the latest
                  electronics to fashion, home goods, and beyond.
                </p>
              </div>
            </motion.div>
            <motion.div className="relative" variants={itemVariants}>
              <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl p-1">
                <Image
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                  alt="Our Story"
                  width={900}
                  height={320}
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <FaHeart className="w-8 h-8 text-red-500" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Customer First
                    </p>
                    <p className="text-sm text-gray-600">Always</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-16"
            variants={itemVariants}
          >
            Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-teal-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl group-hover:shadow-lg transition-all">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-gray-50 rounded-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-16"
            variants={itemVariants}
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-teal-600 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-16"
            variants={itemVariants}
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-6 group"
                variants={itemVariants}
              >
                <div className="text-teal-600 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-20 bg-gray-50 rounded-2xl mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-16"
            variants={itemVariants}
          >
            Meet Our Leadership Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-teal-100 group-hover:border-teal-300 transition-colors"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-600/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-teal-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white mb-20 rounded-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            className="text-4xl font-bold mb-6"
            variants={itemVariants}
          >
            Ready to Start Shopping?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-teal-100"
            variants={itemVariants}
          >
            Join thousands of satisfied customers and discover why we&apos;re
            the preferred choice for online shopping.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link
              href={"/products"}
              className="px-8 py-4 bg-white text-teal-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Browse Products
            </Link>
            <Link
              href={"/"}
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300"
            >
              Go To Home
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;

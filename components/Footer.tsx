"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import {
  FaFacebook,
  FaHome,
  FaBox,
  FaShoppingCart,
  FaInfoCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import { Toaster } from "sonner";
import { useSession } from "next-auth/react";
import visionMartLogo from "@/app/VisionMartLogo.png";
import Newsletter from "./newsletter/Newsletter";
import { AiFillInstagram } from "react-icons/ai";
import { usePathname } from "next/navigation";

// Types
interface QuickLink {
  icon: React.ElementType;
  label: string;
  to: string;
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [year, setYear] = useState<number>(2025);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  if (!mounted) return null;

  // Dynamic quick links based on session
  const quickLinks: QuickLink[] = [
    { icon: FaHome, label: "Home", to: "/" },
    { icon: FaBox, label: "Products", to: "/products" },
    ...(session
      ? [{ icon: FaShoppingCart, label: "My Orders", to: "/myorders" }]
      : []),
    { icon: FaInfoCircle, label: "About", to: "/about" },
    { icon: FaEnvelope, label: "Contact Us", to: "/contact" },
  ];

  // Social media links
  const socialLinks: SocialLink[] = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: BsTwitter, href: "https://twitter.com", label: "Twitter" },
    {
      icon: AiFillInstagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
    { icon: BsLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.footer
      className="bg-gray-50 border-t border-gray-100 shadow-2xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section - All in One Line */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start"
        >
          {/* Brand Information */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="text-2xl font-bold flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 mb-4"
            >
              <div className="relative">
                <Image
                  src={visionMartLogo}
                  width={48}
                  height={48}
                  alt="Vision-Mart-Logo"
                />
              </div>
              <div>
                <span className="text-[#009688] text-3xl">Vision</span>
                <span className="text-gray-800 text-3xl">Mart</span>
              </div>
            </Link>

            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-sm">
              Your trusted partner for premium electronics and lifestyle
              products. Excellence in quality, service, and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#009688]"></div>
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link, index) => {
                const isActive = pathname === link.to;
                return (
                  <motion.li
                    key={`link-${index}`}
                    whileHover={{ x: 8, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.to}
                      className={`transition-all duration-300 flex items-center gap-1 text-base font-medium group cursor-pointer ${
                        isActive
                          ? "text-teal-600"
                          : "text-gray-600 hover:text-teal-600"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "bg-teal-100"
                            : "bg-white/10 group-hover:bg-teal-100"
                        }`}
                      >
                        <link.icon
                          size={18}
                          className={
                            isActive
                              ? "text-teal-600"
                              : "text-gray-400 group-hover:text-teal-600"
                          }
                        />
                      </div>
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-gray-800 mb-6 relative">
              Contact Us
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#009688]"></div>
            </h3>
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-700">
                <FaMapMarkerAlt className="text-[#009688] text-lg" />
                <Link
                  href="https://maps.app.goo.gl/9qUv5yTo5PpD5ThUA"
                  target="_blank"
                  className="text-sm font-medium hover:text-[#009688] transition-colors cursor-pointer"
                >
                  Dhaka, Bangladesh
                </Link>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <FaPhone className="text-[#009688] text-lg" />
                <Link
                  href="tel:+8801534567890"
                  className="text-sm font-medium hover:text-[#009688] transition-colors"
                >
                  +880 15345-67890
                </Link>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaEnvelope className="text-[#009688] text-lg" />
                <Link
                  href="mailto:visionmar-official@gmail.com"
                  className="text-sm font-medium hover:text-[#009688] transition-colors"
                >
                  visionmart-official@gmail.com
                </Link>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={`social-${index}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-100 rounded-full hover:bg-teal-600 transition-all duration-300 group"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 group-hover:text-white transition-colors duration-300 flex items-center justify-center p-3"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <social.icon size={18} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-gray-800 mb-6 relative">
              Stay Connected
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#009688]"></div>
            </h3>
            <Newsletter className="lg:col-span-1" />
          </div>
        </motion.div>

        {/* Map Section */}
        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-center flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6 relative">
            Find Us
            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#009688]"></div>
          </h3>

          <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.97303524848!2d90.33728816679567!3d23.780818635506645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1757363580553!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{
                border: "none",
                borderRadius: "12px",
              }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VisionMart Store Location - Mirpur, Dhaka"
              className="rounded-xl"
            />

            {/* Map Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
          </div>

          {/* Map Link */}
          <div className="mt-4">
            <Link
              href="https://maps.app.goo.gl/tJgQuhKeHdP4UAk46"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#009688] hover:text-[#007a6b] font-medium text-sm transition-colors duration-200 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <FaMapMarkerAlt size={14} />
              Open in Maps
              <FaExternalLinkAlt size={10} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-gray-200 bg-gray-100 text-center py-6"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-gray-600 text-sm">
              © {year} VisionMart. All rights reserved.
            </p>
            <span className="flex items-center gap-1 text-sm text-gray-600 font-extralight">
              Built with <span className="text-red-500">❤️</span> using Next.js
              & TypeScript
            </span>
          </div>
        </div>
      </motion.div>

      {/* Toast Notifications */}
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: "text-sm",
          style: {
            background: "white",
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
        }}
      />
    </motion.footer>
  );
};

export default Footer;

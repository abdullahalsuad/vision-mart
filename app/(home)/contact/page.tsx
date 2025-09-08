"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string;
}

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  info: string;
  gradient: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  animationDelay: number;
  duration: number;
  yOffset: number;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize particles only on the client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    
    const generateParticles = (): Particle[] => {
      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
      
      // Use deterministic values instead of Math.random() for SSR compatibility
      const seedValues = [
        0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.15,
        0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95, 0.12, 0.88
      ];
      
      return Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: seedValues[i] * windowWidth,
        y: seedValues[(i + 3) % seedValues.length] * windowHeight,
        animationDelay: seedValues[(i + 7) % seedValues.length] * 2,
        duration: seedValues[(i + 11) % seedValues.length] * 3 + 2,
        yOffset: seedValues[(i + 13) % seedValues.length] * -100,
      }));
    };

    // Use setTimeout to ensure this runs after initial render
    const timer = setTimeout(() => {
      setParticles(generateParticles());
    }, 100);

    // Regenerate particles on window resize
    const handleResize = () => {
      setParticles(generateParticles());
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call - replace with your actual email service
      await new Promise<void>((resolve) => setTimeout(resolve, 2000));
      
      // For demo purposes - replace with actual email sending logic
      console.log("Form Data:", formData);
      
      setIsSuccess(true);
      toast.success(`Thank you ${formData.name}! I'll get back to you soon.`, {
        description: "Your message has been sent successfully.",
        duration: 5000,
      });
      
      setFormData({ name: "", email: "", message: "", phone: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      const errorMessage = "Failed to send message. Please try again or contact directly via email.";
      setError(errorMessage);
      toast.error("Failed to send message", {
        description: errorMessage,
        duration: 5000,
      })
      console.log(err);
      ;
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      info: "Dhaka, Bangladesh",
      gradient: "from-teal-500 to-blue-500",
    },
    {
      icon: FaClock,
      title: "Available Time",
      info: "Saturday - Friday\n9:00am - 5:00pm",
      gradient: "from-teal-600 to-blue-600",
    },
    {
      icon: FaPhone,
      title: "Phone",
      info: "+88015345-67890",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      info: "visionmart-official@gmail.com",
      gradient: "from-teal-600 to-blue-700",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-16 bg-white text-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 right-1/2 w-56 h-56 bg-teal-600/10 rounded-full blur-3xl" />

        {/* Animated Particles - Only render on client after hydration */}
        {isClient && particles.length > 0 && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-teal-600/30 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [particle.y, particle.y + particle.yOffset],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.animationDelay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <HiSparkles className="text-teal-600" />
            <span className="text-teal-600 font-medium text-sm">
              Get In Touch
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-blue-600 bg-clip-text text-transparent">
              Connect
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Ready to bring your shopping dreams to life?
At Vision Mart, were here to make every purchase simple, smart, and satisfying.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Contact Info Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                >
                  <motion.div
                    className="relative bg-gray-50/70 backdrop-blur-sm border border-gray-200/50 p-6 rounded-2xl shadow-lg hover:border-teal-500/30 transition-all duration-300 h-full flex flex-col justify-center items-center text-center space-y-3"
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="text-white text-xl" />
                    </motion.div>

                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {item.info}
                    </p>

                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Social Icons Card */}
            <motion.div
              variants={itemVariants}
              className="group relative sm:col-span-2"
            >
              <motion.div
                className="relative bg-gradient-to-br from-gray-50/80 via-gray-100/80 to-white/80 backdrop-blur-lg border border-gray-200/30 p-8 rounded-3xl shadow-2xl overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header with icon */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 via-teal-700 to-blue-600 bg-clip-text text-transparent">
                      Let&apos;s Connect With Us
                    </h3>
                  </div>

                  {/* Social Icons Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    <motion.a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon relative flex items-center justify-center w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:rotate-3"
                      aria-label="LinkedIn"
                      whileHover={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLinkedinIn className="text-2xl text-blue-600 group-hover/icon:text-blue-700 transition-colors" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/20 rounded-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                    </motion.a>

                    <motion.a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon relative flex items-center justify-center w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-blue-700/20 to-blue-900/20 rounded-2xl border border-blue-600/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:-rotate-3"
                      aria-label="Facebook"
                      whileHover={{
                        backgroundColor: "rgba(29, 78, 216, 0.1)",
                        boxShadow: "0 0 30px rgba(29, 78, 216, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaFacebookF className="text-2xl text-blue-700 group-hover/icon:text-blue-800 transition-colors" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/20 rounded-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                    </motion.a>

                    <motion.a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon relative flex items-center justify-center w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-2xl border border-green-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:rotate-3"
                      aria-label="WhatsApp"
                      whileHover={{
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaWhatsapp className="text-2xl text-green-600 group-hover/icon:text-green-700 transition-colors" />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/20 rounded-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                    </motion.a>

                    <motion.a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon relative flex items-center justify-center w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-sky-600/20 to-sky-800/20 rounded-2xl border border-sky-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:-rotate-3"
                      aria-label="X Twitter"
                      whileHover={{
                        backgroundColor: "rgba(14, 165, 233, 0.1)",
                        boxShadow: "0 0 30px rgba(14, 165, 233, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTwitter className="text-2xl text-sky-600 group-hover/icon:text-sky-700 transition-colors" />
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/20 rounded-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                    </motion.a>
                  </div>

                  {/* Subtitle */}
                  <p className="text-gray-600 text-sm mt-6 text-center opacity-80">
                    Follow for updates and connect with Us
                  </p>
                </div>

                {/* Main hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-blue-500/5 to-teal-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-teal-600/20 blur-xl -z-10" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Enhanced Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gray-50/70 backdrop-blur-sm border border-gray-200/50 p-8 rounded-3xl shadow-xl">
              {/* Form Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-teal-600 via-teal-700 to-blue-600 rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <MdContactMail className="text-white text-xl" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send Us a Message
                </h2>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-green-600 text-xl" />
                    <div>
                      <p className="text-green-600 font-semibold">
                        Message Sent Successfully!
                      </p>
                      <p className="text-green-600/80 text-sm">
                        We&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                  >
                    <p className="text-red-600 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Your Name
                  </label>
                  <motion.input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-4 rounded-xl bg-white/70 text-gray-900 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-300 disabled:opacity-50"
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Your Email
                  </label>
                  <motion.input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your Email Address..."
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-4 rounded-xl bg-white/70 text-gray-900 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-300 disabled:opacity-50"
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                {/* Phone Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <motion.input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    disabled={isLoading}
                    className="w-full px-4 py-4 rounded-xl bg-white/70 text-gray-900 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-300 disabled:opacity-50"
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                {/* Message Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-1.5">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell Us about your problem!"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-4 rounded-xl bg-white/70 text-gray-900 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-300 resize-none disabled:opacity-50"
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 via-teal-700 to-blue-600 hover:from-teal-700 hover:via-teal-800 hover:to-blue-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-teal-500/25 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full opacity-50" />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-50/30 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Buy{" "}
              <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-blue-600 bg-clip-text text-transparent">
                Something Amazing?
              </span>
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              Got something specific in mind, or just browsing for inspiration?
At Vision Mart, we&apos;re here to help you find what you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:your-email@gmail.com"
                className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-600 hover:bg-teal-500/20 px-6 py-3 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <FaEnvelope />
                Direct Email Us
              </motion.a>
              <motion.a
                href="tel:+8801747144726"
                className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-600 hover:bg-blue-500/20 px-6 py-3 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <FaPhone />
                Call Us
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
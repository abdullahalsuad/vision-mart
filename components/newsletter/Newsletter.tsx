"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

// Types
interface NewsletterProps {
  className?: string;
}

interface FormState {
  email: string;
  isLoading: boolean;
}

const Newsletter: React.FC<NewsletterProps> = ({ className = "" }) => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    isLoading: false,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const { email } = formState;

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setFormState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Successfully subscribed to our newsletter!");
      setFormState({ email: "", isLoading: false });
    } catch (error) {
      console.log(error);
      toast.error("Failed to subscribe. Please try again.");
      setFormState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState((prev) => ({ ...prev, email: e.target.value }));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const inputVariants = {
    idle: { scale: 1 },
    focus: { scale: 1.02 },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`lg:col-span-2 ${className}`}
    >
      <p className="text-gray-600 text-sm mb-4">
        Subscribe to our newsletter for the latest updates, deals, and exclusive
        offers.
      </p>

      <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
        <motion.input
          type="email"
          value={formState.email}
          onChange={handleEmailChange}
          placeholder="Enter your email address"
          disabled={formState.isLoading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          variants={inputVariants}
          initial="idle"
          whileFocus="focus"
          aria-label="Email address"
          required
        />
        <motion.button
          type="submit"
          disabled={formState.isLoading}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          variants={buttonVariants}
          initial="idle"
          whileHover={formState.isLoading ? "idle" : "hover"}
          whileTap={formState.isLoading ? "idle" : "tap"}
          aria-label="Subscribe to newsletter"
        >
          {formState.isLoading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Subscribing...
            </>
          ) : (
            <>
              <FaPaperPlane size={14} />
              Subscribe
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Newsletter;

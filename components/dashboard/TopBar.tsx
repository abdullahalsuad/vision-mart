"use client";

import Link from "next/link";
import { FiHome, FiMenu } from "react-icons/fi";

interface TopBarProps {
  onToggle: () => void;
}

export default function TopBar({ onToggle }: TopBarProps) {
  return (
    <div className="bg-white border-b sticky top-0 z-50  border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
          onClick={onToggle}
        >
          <FiMenu size={24} />
        </button>

        {/* Home navigation button */}
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
        >
          <FiHome className="mr-1" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </div>

      {/* Centered page title */}
      <h2 className="text-xl font-semibold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
        Dashboard
      </h2>

      {/* Right side - placeholder for balance */}
      <div className="w-8"></div>
    </div>
  );
}

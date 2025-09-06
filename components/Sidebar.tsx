// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBox,
  FiPlusSquare,
  FiShoppingCart,
  FiHome,
  FiX,
} from "react-icons/fi";
import { RiImageAiLine } from "react-icons/ri";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "All Products", href: "/allproducts", icon: FiBox },
    { name: "Generate Img", href: "/img-gen", icon: RiImageAiLine },
    { name: "Add Products", href: "/add", icon: FiPlusSquare },
    { name: "Order Lists", href: "/orders", icon: FiShoppingCart },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static w-64 bg-gradient-to-b from-teal-600 to-teal-700 text-white p-6 shadow-lg z-30 min-h-screen
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold mt-2 flex items-center">
            <FiHome className="w-5 h-5 mr-2" />
            VisionMart
          </h1>
          <button
            className="lg:hidden p-1 rounded hover:bg-teal-500"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-lg transition-all flex items-center hover:bg-teal-500/30 ${
                  pathname === item.href
                    ? "bg-white/10 text-white font-medium shadow-md"
                    : "text-teal-100"
                }`}
                onClick={onClose}
              >
                <Icon
                  className={`w-5 h-5 mr-3 ${
                    pathname === item.href ? "text-white" : "text-teal-300"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
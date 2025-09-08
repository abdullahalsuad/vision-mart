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
import Logout from "../auth/Logout";
import { signOut } from "next-auth/react";

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
        className={`fixed top-0 lg:sticky lg:top-0 w-64 bg-gradient-to-b from-teal-600 to-teal-700 text-white p-6 shadow-lg z-30 h-screen transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top: Logo + Close Button */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <h1 className="text-2xl font-bold flex items-center">
              <FiHome className="w-5 h-5 mr-2" />
              VisionMart
            </h1>
          </Link>
          <button
            className="lg:hidden p-1 rounded hover:bg-teal-500"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Menu: scrollable if needed */}
        <nav className="flex-1 overflow-y-auto flex flex-col gap-2">
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

        {/* Bottom: Logout Button */}
        <div className="mt-4 w-full">
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
              onClose();
            }}
            className="w-full"
          >
            <Logout isDashboard={true} />
          </button>
        </div>
      </aside>
    </>
  );
}

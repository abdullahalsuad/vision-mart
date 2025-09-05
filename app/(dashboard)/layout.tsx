// app/dashboard/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { FiBox, FiPlusSquare, FiShoppingCart, FiHome, FiMenu, FiX } from "react-icons/fi";
import "../globals.css";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const menuItems = [
    { name: "All Products", href: "/allproducts", icon: FiBox },
    { name: "Add Products", href: "/add", icon: FiPlusSquare },
    { name: "Order Lists", href: "/orders", icon: FiShoppingCart },
  ];

  // Close sidebar when a link is clicked on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}>
        <div className="flex min-h-screen">
          {/* Mobile sidebar backdrop */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <aside className={`
            fixed lg:static w-64 bg-gradient-to-b from-teal-600 to-teal-700 text-white p-6 shadow-lg z-30 min-h-screen
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold mt-2 flex items-center">
                <FiHome className="w-5 h-5 mr-2" />
                VisionMart
              </h1>
              <button 
                className="lg:hidden p-1 rounded hover:bg-teal-500"
                onClick={() => setSidebarOpen(false)}
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
                    onClick={handleLinkClick}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${pathname === item.href ? "text-white" : "text-teal-300"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-h-screen overflow-auto bg-white flex flex-col">
            {/* Enhanced header with home navigation */}
            <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
                  onClick={() => setSidebarOpen(true)}
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
              <h2 className="text-xl font-semibold text-gray-800 absolute left-3/6 lg:ml-26 transform -translate-x-1/2">
                Dashboard
              </h2>
              
              {/* Right side - placeholder for balance */}
              <div className="w-8"></div>
            </div>
            
            {/* Content area - centered */}
            <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
              <div className="w-full max-w-2xl">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
// app/dashboard/layout.tsx
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}
      >
        <div className="flex min-h-screen">
          <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

          {/* Main content area with topbar */}
          <div className="flex-1 flex flex-col">
            <TopBar onToggle={handleSidebarToggle} />

            <main className="flex-1 overflow-auto bg-white">
              {/* Content area */}
              <div className="p-4 lg:p-8">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

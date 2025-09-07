"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

      <div className="flex-1 flex flex-col">
        <TopBar onToggle={handleSidebarToggle} />

        <main className="flex-1 overflow-auto bg-white">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

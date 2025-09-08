"use client";

import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { toast } from "sonner";

interface dashboardProps {
  isDashboard: boolean;
}
const Logout = ({ isDashboard }: dashboardProps) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login", redirect: true });
    toast.success("Logout successful ");
  };

  return (
    <span
      onClick={handleLogout}
      className={`font-semibold rounded-md transition cursor-pointer flex items-center gap-2 px-4 py-2 ${
        isDashboard
          ? "justify-center bg-white text-red-500 hover:bg-red-100"
          : " bg-red-300 text-indigo-950 hover:bg-red-400 "
      }`}
    >
      <CiLogout size={20} />
      Sign Out
    </span>
  );
};

export default Logout;

"use client";

import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { toast } from "sonner";

const Logout = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login", redirect: true });
    toast.success("Logout successful ");
  };

  return (
    <span
      onClick={handleLogout}
      className="px-4 py-2 bg-red-300 text-indigo-950 font-semibold rounded-md hover:bg-red-400 transition cursor-pointer flex items-center gap-2"
    >
      <CiLogout />
      Sign Out
    </span>
  );
};

export default Logout;

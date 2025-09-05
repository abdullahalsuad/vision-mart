"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const handleAuth = () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className="grid grid-cols-1">
      <button
        onClick={handleAuth}
        className="flex items-center justify-center gap-2 py-2.5 
                                    border border-gray-600 
                                    rounded-lg  bg-gray-700 
                                    text-white text-sm font-medium 
                                    hover:bg-gray-600 
                                    transition-colors duration-200 cursor-pointer"
      >
        <FcGoogle className="w-4 h-4" />
        Google
      </button>
    </div>
  );
};

export default SocialLogin;

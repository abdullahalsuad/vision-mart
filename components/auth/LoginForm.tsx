"use client";

import { login } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // handle login
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);

      const response = await login(formData);

      if (!!response.error) {
        setError(response.error);
        toast.error(error);
      } else {
        toast.success("Login successful");
        router.push("/");
      }
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError(errMessage);
      toast.error("Email or password mismatch");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      {/* Email */}
      <div className="relative">
        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-10 text-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
        </button>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;

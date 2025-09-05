"use client";

import SocialLogin from "./SocialLogin";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type AuthPageType = "login" | "register";

interface AuthLayoutProps {
  pageType: AuthPageType;
}

const AuthLayout = ({ pageType }: AuthLayoutProps) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  const isLogin = pageType === "login";

  return (
    <>
      <div className="flex justify-center min-h-screen flex-col bg-gray-100">
        {/* Main content (center card) */}
        <div className="flex items-center justify-center p-4 ">
          <div className="w-full max-w-md rounded-2xl bg-white/90 shadow-xl border border-gray-200 p-8">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              {isLogin ? "Welcome Back 👋" : "Create an Account ✨"}
            </h2>

            {/* Form */}
            {isLogin ? <LoginForm /> : <RegistrationForm />}

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="px-3 text-sm text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Auth Switcher */}
            <p className="my-6 text-center text-sm text-gray-600 ">
              {isLogin
                ? "Do not have an account ? "
                : "Already have an account ? "}
              <Link
                href={isLogin ? "/register" : "/login"}
                className="text-teal-600 font-semibold hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </Link>
            </p>

            {/* Social login */}
            <SocialLogin />
          </div>
        </div>

        {/* Bottom button outside the form */}
        <div>
          <div className="mt-4 flex justify-center">
            <Link
              href="/"
              className="rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-3 text-white font-semibold shadow-md hover:from-teal-700 hover:to-cyan-700 transition  "
            >
              <span className="flex items-center gap-4">
                <FaLongArrowAltLeft /> Shop Visit
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;

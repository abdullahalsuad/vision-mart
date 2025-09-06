"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Logout from "./auth/Logout";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Auth session
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span className="text-[#009688]">Vision</span>
          <span className="text-gray-700">Mart</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#009688]">
            Home
          </Link>
          <Link href="/products" className="hover:text-[#009688]">
            Products
          </Link>
          <Link href="/categories" className="hover:text-[#009688]">
            Categories
          </Link>
          <Link href="/about" className="hover:text-[#009688]">
            About
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Login (only if not authenticated) */}
          {status !== "authenticated" && (
            <Link
              href="/login"
              className="hidden md:block hover:text-[#009688]"
            >
              Log In
            </Link>
          )}

          {/* Profile & Logout (Desktop) */}
          {status === "authenticated" && (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-gray-700 text-sm font-medium">
                {session.user.name}
              </span>
              <Image
                src={session.user?.image || "https://via.placeholder.com/32"}
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border border-teal-400"
              />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-black/80 hover:text-red-500"
              >
                <Logout />
              </button>

              {/* Dashboard for admin */}
              {session.user.role === "admin" && (
                <Link href="/allproducts" className="hover:text-[#009688]">
                  <RxDashboard className="h-5 w-5" />
                </Link>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-5 py-6 text-gray-600 font-medium">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#009688]"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#009688]"
          >
            Products
          </Link>
          <Link
            href="/categories"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#009688]"
          >
            Categories
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#009688]"
          >
            About
          </Link>

          {/* Mobile Auth */}
          {status !== "authenticated" ? (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-[#009688] font-medium"
            >
              Log In
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <span className="text-gray-700 font-medium">
                {session.user?.name}
              </span>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="text-gray-700 hover:text-red-500"
              >
                <Logout />
              </button>

              {/* Dashboard for admin (Mobile) */}
              {session.user.role === "admin" && (
                <Link
                  href="/allproducts"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#009688]"
                >
                  <RxDashboard className="h-5 w-5" />
                </Link>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

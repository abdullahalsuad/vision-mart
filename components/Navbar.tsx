"use client";

import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Logout from "./auth/Logout";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // for auth
  const { data: session, status } = useSession();
  console.log(session);

  return (
    <header className=" top-0 left-0 w-full z-20">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span className="text-[#009688]">Vision</span>
          <span className="text-gray-700">Mart</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/about">About</Link>
        </nav>

        {/* Search + Icons */}
        <div className="flex items-center gap-4">
          {/* login  */}

          <div>
            <Link href="/login">Log In</Link>
          </div>

          {/* profile and logout */}
          {status === "authenticated" && (
            // Show profile image and logout when logged in
            <div className="flex items-center space-x-3">
              <h1>{session.user.name}</h1>
              <Image
                src={session.user?.image || "https://via.placeholder.com/32"}
                alt="Profile"
                width={600}
                height={600}
                className="w-8 h-8 rounded-full border border-teal-400 cursor-pointer"
              />

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-black/80 b  hover:text-red-500 cursor-pointer"
              >
                <Logout />
              </button>

              {/* Dashboard  Icon */}
              {session.user.role == "admin" && (
                <Link
                  href="/add"
                  className="relative cursor-pointer hidden sm:block"
                >
                  <RxDashboard className="h-5 w-5 text-gray-700" />
                </Link>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 text-xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gray-50 overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-4 py-4 text-gray-600 font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link href="/categories" onClick={() => setMenuOpen(false)}>
            Categories
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <div className=" cursor-pointer  ">
            <FaShoppingCart className="h-5 w-5 text-gray-700" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

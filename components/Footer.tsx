"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" ">
      <div className=" px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <Link href="/" className="text-2xl font-bold">
            <span className="text-[#009688]">Vision</span>
            <span className="text-gray-700">Mart</span>
          </Link>
          <p className="mt-3 text-gray-600 text-sm">
            Your trusted partner for premium electronics and lifestyle products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
            <li>
              <Link href="/">Shipping</Link>
            </li>
            <li>
              <Link href="/">Returns</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Categories
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link href="">Electronics</Link>
            </li>
            <li>
              <Link href="">Fashion</Link>
            </li>
            <li>
              <Link href="">Pet Supplies</Link>
            </li>
            <li>
              <Link href="">Beauty</Link>
            </li>
            <li>
              <Link href="">Sports</Link>
            </li>
            <li>
              <Link href="">Groceries </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link href="/">Help Center</Link>
            </li>
            <li>
              <Link href="/">Track Order</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" text-center py-4 text-gray-500 text-sm">
        © 2024 VisionMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

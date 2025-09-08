import Link from "next/link";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { CiInstagram } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Section */}
      <div className="w-11/12 max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <Link href="/" className="text-2xl font-bold">
            <span className="text-[#009688]">Vision</span>
            <span className="text-gray-700">Mart</span>
          </Link>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Your trusted partner for premium electronics and lifestyle products.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 mt-4">
            <Link
              href="/"
              className="text-gray-500 hover:text-teal-600 transition"
            >
              <FaFacebook size={20} />
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-teal-600 transition"
            >
              <BsTwitter size={20} />
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-teal-600 transition"
            >
              <CiInstagram size={20} />
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-teal-600 transition"
            >
              <BsLinkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link href="/" className="hover:text-teal-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-teal-600 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-teal-600 transition">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-teal-600 transition">
                Returns
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Categories
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              "Electronics",
              "Fashion",
              "Pet Supplies",
              "Beauty",
              "Sports",
              "Groceries",
            ].map((cat) => (
              <li key={cat}>
                <Link href="/" className="hover:text-teal-600 transition">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              "Help Center",
              "Track Order",
              "Privacy Policy",
              "Terms of Service",
            ].map((item) => (
              <li key={item}>
                <Link href="/" className="hover:text-teal-600 transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 text-center py-5 text-gray-500 text-sm">
        © {new Date().getFullYear()} VisionMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

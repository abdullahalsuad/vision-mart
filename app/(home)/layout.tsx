import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vision Mart",
  description:
    "This project is an E-commerce Web Application with AI image generation integration. It enables users to browse, search, and buy products, while admins can manage products, orders, and generate AI-based product images.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <SessionProvider>
          <header className="sticky top-0 border-b mb-2 w-11/12 mx-auto rounded-2xl border-[#009688] bg-white/70  z-20">
            <Navbar />
          </header>
          <main className="w-10/12 mx-auto">{children}</main>
          <footer className="border-t-2 border-[#009688]  w-full">
            <Footer />
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}

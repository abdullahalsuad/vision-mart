import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import DashboardWrapper from "@/components/dashboard/DashboardWraper";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    redirect("/");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}
      >
        {/* DashboardWrapper is client component for interactivity */}
        <SessionProvider>
          <DashboardWrapper>{children}</DashboardWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}

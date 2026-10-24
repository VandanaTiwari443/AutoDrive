"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreProvider from "./StoreProvider";
import AuthProvider from "../components/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthProvider>
            {!isAuthPage && <Navbar />}

            {children}

            {!isAuthPage && <Footer />}
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

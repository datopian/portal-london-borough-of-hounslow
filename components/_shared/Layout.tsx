import React from "react";
import Footer from "./Footer";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`bg-gradient-to-b from-gray-50 via-gray-50 to-[#65316c] ${inter.className}`} >
      {children}
      <Footer />
    </div>
  );
}

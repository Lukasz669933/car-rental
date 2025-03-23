import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedLoader from "@/components/AnimatedLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ojest - Car Rental Service",
  description: "Find, book, and rent a car in easy steps",
  generator: "Uzair S.",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {/* <AnimatedLoader /> */}
        {children}
      </body>
    </html>
  );
}

import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Owen Wilson - Wow",
  description: "Owen Wilson saying wow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
          <div className="flex flex-col w-4/6 p-10 justify-between mt-10 bg-white rounded-lg">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

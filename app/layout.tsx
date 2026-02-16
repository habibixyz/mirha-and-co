import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mirha & Co.",
  description: "Timeless objects for modern spaces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.className} "bg-white text-neutral-900`}>

        {/* Header */}
        <header className="flex justify-between items-center px-6 md:px-10 py-6 bg-white text-neutral-900">

          {/* Left */}
          <Link href="/" className="font-light">
            MIRHA & CO.
          </Link>

          {/* Right */}
          <nav className="flex gap-8 md:gap-8 font-light">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

        </header>

        {children}

         <footer className="text-sm text-neutral-800 text-center py-10 bg-white">
  © 2026 Mirha & Co. All rights reserved.
</footer>
      </body>
    </html>
  );
}

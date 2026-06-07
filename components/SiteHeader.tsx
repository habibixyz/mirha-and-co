"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useGlobalization } from "./GlobalizationContext";
import GlobalizationSwitcher from "./GlobalizationSwitcher";

export default function SiteHeader() {
  const { t } = useGlobalization();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header relative z-[100] border-b border-[#ded7cf] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Nav (Desktop only) */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-start">
          <Link href="/tools/ingredients" className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-[#8c857f] hover:text-[#c8473a] transition-colors">
            {t("nav.ingredients")}
          </Link>
          <Link href="/tools/hard-water" className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-[#8c857f] hover:text-[#c8473a] transition-colors">
            Hard Water Test
          </Link>
          <Link href="/tools/dupes" className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-[#8c857f] hover:text-[#c8473a] transition-colors">
            Dupe Finder
          </Link>
        </nav>

        {/* Mobile Left Spacer (to keep logo centered) */}
        <div className="md:hidden flex-1" />

        {/* LOGO */}
        <Link href="/" className="text-center flex-shrink-0 font-bebas text-2xl tracking-[0.08em] text-black">
          MIRHA &amp; CO.
        </Link>

        {/* Right Nav (Desktop only) */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-end">
          <Link href="/blog" className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-[#8c857f] hover:text-[#c8473a] transition-colors">
            {t("nav.blog")}
          </Link>
          <Link href="/about" className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-[#8c857f] hover:text-[#c8473a] transition-colors">
            {t("nav.about")}
          </Link>
          <Link href="/dashboard" className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-[#8c857f] hover:text-[#c8473a] transition-colors">
            {t("nav.dashboard")}
          </Link>
          <GlobalizationSwitcher />
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex items-center justify-end flex-1 text-black p-2 hover:text-[#c8473a] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 z-[99] flex flex-col"
          style={{
            background: "rgba(252, 251, 249, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid #ded7cf",
            padding: "2.25rem 1.75rem",
            boxShadow: "0 25px 50px -12px rgba(10, 10, 10, 0.12)",
            gap: "1.25rem"
          }}
        >
          <Link
            href="/tools/ingredients"
            className="hover:text-[#c8473a] transition-colors"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "600",
              color: "#2b2826",
              padding: "0.2rem 0",
              fontFamily: "var(--font-dm-sans), sans-serif"
            }}
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.ingredients")}
          </Link>
          <Link
            href="/tools/hard-water"
            className="hover:text-[#c8473a] transition-colors"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "600",
              color: "#2b2826",
              padding: "0.2rem 0",
              fontFamily: "var(--font-dm-sans), sans-serif"
            }}
            onClick={() => setMenuOpen(false)}
          >
            Hard Water Test
          </Link>
          <Link
            href="/tools/dupes"
            className="hover:text-[#c8473a] transition-colors"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "600",
              color: "#2b2826",
              padding: "0.2rem 0",
              fontFamily: "var(--font-dm-sans), sans-serif"
            }}
            onClick={() => setMenuOpen(false)}
          >
            Dupe Finder
          </Link>

          <div style={{ height: "1px", background: "#e5ded6", margin: "0.4rem 0" }} />

          <Link
            href="/blog"
            className="hover:text-[#c8473a] transition-colors"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "600",
              color: "#2b2826",
              padding: "0.2rem 0",
              fontFamily: "var(--font-dm-sans), sans-serif"
            }}
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.blog")}
          </Link>
          <Link
            href="/about"
            className="hover:text-[#c8473a] transition-colors"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "600",
              color: "#2b2826",
              padding: "0.2rem 0",
              fontFamily: "var(--font-dm-sans), sans-serif"
            }}
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.about")}
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-[#c8473a] transition-colors"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "600",
              color: "#2b2826",
              padding: "0.2rem 0",
              fontFamily: "var(--font-dm-sans), sans-serif"
            }}
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.dashboard")}
          </Link>

          <div style={{ height: "1px", background: "#e5ded6", margin: "0.4rem 0" }} />

          <div style={{ display: "flex", justifyContent: "flex-start", paddingTop: "0.4rem" }}>
            <GlobalizationSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}

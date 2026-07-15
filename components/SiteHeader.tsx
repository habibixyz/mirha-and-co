"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useGlobalization } from "./GlobalizationContext";
import GlobalizationSwitcher from "./GlobalizationSwitcher";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function SiteHeader() {
  const { t } = useGlobalization();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle: React.CSSProperties = {
    fontSize: "0.75rem", letterSpacing: "0.18em",
    textTransform: "uppercase", fontWeight: "600",
    color: "#2b2826", padding: "0.2rem 0",
    fontFamily: "var(--font-dm-sans), sans-serif",
  };

  return (
    <header className="site-header relative z-[200] border-b border-[#ded7cf] bg-white">
      <div className="site-header-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Left Nav — Desktop only */}
        <div className="site-header-left">
          <nav className="flex items-center gap-4">
            <Link href="/tools/ingredients" className="site-header-nav-link">{t("nav.ingredients")}</Link>
            <Link href="/tools/hard-water"  className="site-header-nav-link">Hard Water</Link>
            <Link href="/tools/dupes"       className="site-header-nav-link">Dupe Finder</Link>
            <Link href="/k-beauty"          className="site-header-nav-link site-header-nav-link--accent">K-Beauty</Link>
            <Link href="/mens-grooming"     className="site-header-nav-link site-header-nav-link--accent">Men</Link>
          </nav>
        </div>

        {/* Mobile spacer */}
        <div className="md:hidden flex-1 flex justify-start" />

        {/* Logo */}
        <div className="site-header-logo-wrapper">
          <Link href="/" className="site-header-logo">MIRHA &amp; CO.</Link>
        </div>

        {/* Right Nav — Desktop only */}
        <div className="site-header-right">
          <nav className="flex items-center gap-5">
            <Link href="/blog"      className="site-header-nav-link">{t("nav.blog")}</Link>
            <Link href="/pricing"   className="site-header-nav-link">{t("nav.pricing")}</Link>
            <Link href="/b2b"       className="site-header-nav-link">B2B SaaS</Link>
            <Link href="/about"     className="site-header-nav-link">{t("nav.about")}</Link>
            <Link href="/dashboard" className="site-header-nav-link">{t("nav.dashboard")}</Link>
            <a
              href="https://www.instagram.com/mirha_andco/"
              target="_blank"
              rel="noopener noreferrer"
              className="site-header-nav-link flex items-center justify-center"
              aria-label="Instagram"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <InstagramIcon size={15} />
            </a>
            <a
              href="https://www.linkedin.com/company/mirhaandco/"
              target="_blank"
              rel="noopener noreferrer"
              className="site-header-nav-link flex items-center justify-center"
              aria-label="LinkedIn"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <LinkedInIcon size={15} />
            </a>
            <GlobalizationSwitcher />
          </nav>
        </div>

        {/* Hamburger — Mobile */}
        <div className="md:hidden flex-1 flex items-center justify-end">
          {!menuOpen && (
            <button
              className="text-black hover:text-[#fc2779] transition-colors cursor-pointer"
              style={{ background: "transparent", border: "none", outline: "none", boxShadow: "none", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={() => setMenuOpen(true)}
              aria-label="Toggle Menu"
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="site-header-drawer-overlay"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100vw", height: "100vh", display: "flex", zIndex: 99999 }}
        >
          {/* Backdrop */}
          <div
            className="site-header-drawer-backdrop"
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer panel */}
          <div
            className="site-header-drawer-content"
            style={{ position: "relative", width: "280px", maxWidth: "85vw", height: "100%", backgroundColor: "#fcfbf9", borderRight: "1px solid #ded7cf", padding: "1.5rem 1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.1rem", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", overflowY: "auto", zIndex: 100000 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2 pb-4 border-b border-[#e5ded6]">
              <span className="font-bebas text-xl tracking-[0.08em] text-black" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                MIRHA &amp; CO.
              </span>
              <button onClick={() => setMenuOpen(false)} className="text-black hover:text-[#fc2779] transition-colors -mr-2 p-2 bg-transparent border-none outline-none cursor-pointer" aria-label="Close Menu">
                <X size={20} />
              </button>
            </div>

            {/* Tools nav */}
            <Link href="/tools/ingredients" onClick={() => setMenuOpen(false)} className="hover:text-[#fc2779] transition-colors" style={navLinkStyle}>{t("nav.ingredients")}</Link>
            <Link href="/tools/hard-water"  onClick={() => setMenuOpen(false)} className="hover:text-[#fc2779] transition-colors" style={navLinkStyle}>Hard Water Test</Link>
            <Link href="/tools/dupes"       onClick={() => setMenuOpen(false)} className="hover:text-[#fc2779] transition-colors" style={navLinkStyle}>Dupe Finder</Link>
            <Link href="/k-beauty"          onClick={() => setMenuOpen(false)} className="transition-colors" style={{ ...navLinkStyle, color: "#fc2779" }}>K-Beauty ✦</Link>
            <Link href="/mens-grooming"     onClick={() => setMenuOpen(false)} className="transition-colors" style={{ ...navLinkStyle, color: "#fc2779" }}>Men's Grooming ✦</Link>

            <div style={{ height: "1px", background: "#e5ded6" }} />

            {/* Main nav */}
            <Link href="/blog"      onClick={() => setMenuOpen(false)} className="hover:text-[#fc2779] transition-colors" style={navLinkStyle}>{t("nav.blog")}</Link>
            <Link href="/pricing"   onClick={() => setMenuOpen(false)} className="hover:text-[#fc2779] transition-colors" style={navLinkStyle}>{t("nav.pricing")}</Link>
            <Link href="/b2b"       onClick={() => setMenuOpen(false)} className="hover:text-[#fc2779] transition-colors" style={navLinkStyle}>B2B SaaS</Link>
            <Link href="/about"     onClick={() => setMenuOpen(false)} className="hover:text-[#fc2779] transition-colors" style={navLinkStyle}>{t("nav.about")}</Link>
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-[#fc2779] transition-colors" style={navLinkStyle}>{t("nav.dashboard")}</Link>

            <div style={{ height: "1px", background: "#e5ded6" }} />

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/mirha_andco/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 transition-colors hover:text-[#fc2779]"
                style={{ ...navLinkStyle, textTransform: "none", display: "flex", alignItems: "center" }}
              >
                <InstagramIcon size={16} />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/mirhaandco/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 transition-colors hover:text-[#fc2779]"
                style={{ ...navLinkStyle, textTransform: "none", display: "flex", alignItems: "center" }}
              >
                <LinkedInIcon size={16} />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* LinkedIn link */}
            <a
              href="https://www.linkedin.com/company/mirhaandco/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 transition-colors hover:text-[#fc2779]"
              style={{ ...navLinkStyle, textTransform: "none", display: "flex", alignItems: "center" }}
            >
              <LinkedInIcon size={16} />
              <span>LinkedIn</span>
            </a>

            <div style={{ height: "1px", background: "#e5ded6" }} />

            <div style={{ display: "flex", justifyContent: "flex-start", paddingTop: "0.4rem" }}>
              <GlobalizationSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

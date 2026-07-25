"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useGlobalization } from "./GlobalizationContext";
import GlobalizationSwitcher from "./GlobalizationSwitcher";
import { ThemeToggle } from "./ThemeToggle";

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

  return (
    <header className="site-header relative z-[200] border-b border-[#ded7cf] bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#121110]">
      <div className="site-header-container">

        {/* Left Section — Navigation links */}
        <div className="site-header-left">
          <nav className="site-header-nav">
            <Link href="/tools/ingredients" className="site-header-nav-link nav-hide-1024">{t("nav.ingredients")}</Link>
            <Link href="/tools/hard-water"  className="site-header-nav-link nav-hide-1024">Hard Water</Link>
            <Link href="/tools/dupes"       className="site-header-nav-link nav-hide-1024">Dupe Finder</Link>
            <Link href="/k-beauty"          className="site-header-nav-link site-header-nav-link--accent nav-hide-1100">K-Beauty</Link>
            <Link href="/mens-grooming"     className="site-header-nav-link nav-hide-1100">Men</Link>
            <Link href="/blog"              className="site-header-nav-link nav-hide-1200">{t("nav.blog")}</Link>
          </nav>
        </div>

        {/* Center Section — Brand Logo */}
        <div className="site-header-logo-wrapper">
          <Link href="/" className="site-header-logo text-black transition-colors dark:text-white">MIRHA &amp; CO.</Link>
        </div>

        {/* Right Section — Navigation controls */}
        <div className="site-header-right">
          <nav className="site-header-nav">
            <Link href="/b2b"       className="site-header-nav-link nav-hide-1200">B2B SaaS</Link>
            <Link href="/about"     className="site-header-nav-link nav-hide-1200">{t("nav.about")}</Link>
            <Link href="/pricing"   className="site-header-nav-link nav-hide-1200">{t("nav.pricing")}</Link>
            <Link href="/dashboard" className="site-header-nav-link nav-hide-1024">{t("nav.dashboard")}</Link>
            <a
              href="https://www.instagram.com/mirha_andco/"
              target="_blank"
              rel="noopener noreferrer"
              className="site-header-nav-link flex items-center justify-center nav-hide-1300"
              aria-label="Instagram"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <InstagramIcon size={15} />
            </a>
            <a
              href="https://www.linkedin.com/company/mirhaandco/"
              target="_blank"
              rel="noopener noreferrer"
              className="site-header-nav-link flex items-center justify-center nav-hide-1300"
              aria-label="LinkedIn"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <LinkedInIcon size={15} />
            </a>
            <div className="nav-hide-768 flex items-center">
              <GlobalizationSwitcher />
            </div>
            <div className="flex items-center">
              <ThemeToggle iconOnly />
            </div>
            <div className="menu-trigger flex items-center">
              {!menuOpen && (
                <button
                  className="flex cursor-pointer items-center justify-center p-1.5 text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Toggle Menu"
                >
                  <Menu size={22} />
                </button>
              )}
            </div>
          </nav>
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
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer panel */}
          <div
            className="site-header-drawer-content flex h-full w-[310px] max-w-[85vw] flex-col gap-4 border-r border-[#ded7cf] bg-[#fcfbf9] px-5 py-6 shadow-2xl transition-colors duration-300 dark:border-white/15 dark:bg-[#141312] dark:text-[#f7f5f2]"
            style={{ zIndex: 100000 }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#e5ded6] pb-4 dark:border-white/10">
              <span className="font-bebas text-2xl tracking-[0.08em] text-[#11100f] dark:text-white">
                MIRHA &amp; CO.
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer rounded-lg p-1.5 text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]"
                aria-label="Close Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tools nav */}
            <div className="flex flex-col gap-3 font-semibold uppercase tracking-[0.16em] text-xs">
              <Link href="/tools/ingredients" onClick={() => setMenuOpen(false)} className="text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]">{t("nav.ingredients")}</Link>
              <Link href="/tools/hard-water"  onClick={() => setMenuOpen(false)} className="text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]">Hard Water Test</Link>
              <Link href="/tools/dupes"       onClick={() => setMenuOpen(false)} className="text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]">Dupe Finder</Link>
              <Link href="/k-beauty"          onClick={() => setMenuOpen(false)} className="font-extrabold text-[#fc2779] transition-colors dark:text-[#ff4d94]">K-Beauty ✦</Link>
              <Link href="/mens-grooming"     onClick={() => setMenuOpen(false)} className="font-extrabold text-[#fc2779] transition-colors dark:text-[#ff4d94]">Men's Grooming ✦</Link>
            </div>

            <div className="my-1 h-px bg-[#e5ded6] dark:bg-white/10" />

            {/* Main nav */}
            <div className="flex flex-col gap-3 font-semibold uppercase tracking-[0.16em] text-xs">
              <Link href="/blog"      onClick={() => setMenuOpen(false)} className="text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]">{t("nav.blog")}</Link>
              <Link href="/b2b"       onClick={() => setMenuOpen(false)} className="text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]">B2B SaaS</Link>
              <Link href="/about"     onClick={() => setMenuOpen(false)} className="text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]">{t("nav.about")}</Link>
              <Link href="/pricing"   onClick={() => setMenuOpen(false)} className="text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]">{t("nav.pricing")}</Link>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]">{t("nav.dashboard")}</Link>
            </div>

            <div className="my-1 h-px bg-[#e5ded6] dark:bg-white/10" />

            {/* Social links */}
            <div className="flex flex-col gap-3 font-semibold tracking-[0.12em] text-xs">
              <a
                href="https://www.instagram.com/mirha_andco/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]"
              >
                <InstagramIcon size={16} />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/mirhaandco/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-[#2b2826] transition-colors hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:text-[#ff4d94]"
              >
                <LinkedInIcon size={16} />
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="my-1 h-px bg-[#e5ded6] dark:bg-white/10" />

            <div className="flex items-center justify-between pt-1">
              <GlobalizationSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useGlobalization } from "./GlobalizationContext";
import GlobalizationSwitcher from "./GlobalizationSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
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

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
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

        {/* Left Section — Tools, Categories & Content */}
        <div className="site-header-left">
          <nav className="site-header-nav">
            <Link href="/tools/ingredients" className="site-header-nav-link hidden lg:inline-flex nav-hide-1280">{t("nav.ingredients")}</Link>
            <Link href="/tools/hard-water"  className="site-header-nav-link hidden lg:inline-flex nav-hide-1280">{t("nav.hardwater")}</Link>
            <Link href="/tools/dupes"       className="site-header-nav-link hidden lg:inline-flex nav-hide-1350">{t("nav.dupes")}</Link>
            <Link href="/k-beauty"          className="site-header-nav-link hidden lg:inline-flex site-header-nav-link--accent nav-hide-1350">{t("nav.kbeauty")}</Link>
            <Link href="/mens-grooming"     className="site-header-nav-link hidden lg:inline-flex nav-hide-1400">{t("nav.men")}</Link>
            <Link href="/blog"              className="site-header-nav-link hidden lg:inline-flex nav-hide-1400">{t("nav.blog")}</Link>
          </nav>
        </div>

        {/* Center Section — Brand Logo (Protected) */}
        <div className="site-header-logo-wrapper notranslate">
          <Link href="/" className="site-header-logo notranslate text-black transition-colors dark:text-white">MIRHA &amp; CO.</Link>
        </div>

        {/* Right Section — Navigation, Portal & Controls */}
        <div className="site-header-right">
          <nav className="site-header-nav">
            <Link href="/b2b"       className="site-header-nav-link hidden lg:inline-flex nav-hide-1400">{t("nav.b2b")}</Link>
            <Link href="/about"     className="site-header-nav-link hidden lg:inline-flex nav-hide-1350">{t("nav.about")}</Link>
            <Link href="/pricing"   className="site-header-nav-link hidden lg:inline-flex nav-hide-1350">{t("nav.pricing")}</Link>
            <Link href="/dashboard" className="site-header-nav-link hidden lg:inline-flex nav-hide-1400">{t("nav.dashboard")}</Link>
            
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

      {/* Mobile & Full Navigation Drawer */}
      {menuOpen && (
        <div
          className="site-header-drawer-overlay"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100vw", height: "100vh", display: "flex", zIndex: 99999 }}
        >
          {/* Backdrop */}
          <div
            className="site-header-drawer-backdrop"
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer panel */}
          <div
            className="site-header-drawer-content flex h-full w-[340px] sm:w-[380px] max-w-[88vw] flex-col gap-6 border-r border-[#ded7cf] bg-[#fcfbf9] px-6 py-6 shadow-2xl transition-colors duration-300 dark:border-white/15 dark:bg-[#141312] dark:text-[#f7f5f2]"
            style={{ zIndex: 100000, overflowY: "auto" }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#e5ded6] pb-4 dark:border-white/10">
              <span className="font-bebas notranslate text-2xl tracking-[0.12em] text-[#11100f] dark:text-white">
                MIRHA &amp; CO.
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer rounded-xl p-2 text-[#2b2826] transition-colors hover:bg-black/5 hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
                aria-label="Close Menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Section 1: Tools & Intelligence */}
            <div className="flex flex-col gap-1.5">
              <div className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#fc2779] dark:text-[#ff4d94]">
                Tools &amp; Intelligence
              </div>
              <Link
                href="/tools/ingredients"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                {t("nav.ingredients")}
              </Link>
              <Link
                href="/tools/hard-water"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                Hard Water Intelligence
              </Link>
              <Link
                href="/tools/dupes"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                Dupe Finder
              </Link>
              <Link
                href="/k-beauty"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-[#fc2779] transition-all hover:bg-[#ffe6f0] dark:text-[#ff4d94] dark:hover:bg-white/10"
              >
                K-Beauty Picks
              </Link>
              <Link
                href="/mens-grooming"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                Men&apos;s Grooming
              </Link>
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                {t("nav.blog")}
              </Link>
            </div>

            {/* Separator */}
            <div className="border-t border-[#e5ded6] dark:border-white/10" />

            {/* Section 2: Company & Developers */}
            <div className="flex flex-col gap-1.5">
              <div className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#fc2779] dark:text-[#ff4d94]">
                Company &amp; Developers
              </div>
              <Link
                href="/b2b"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                B2B Telemetry API
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                {t("nav.pricing")}
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                {t("nav.dashboard")}
              </Link>
            </div>

            {/* Controls Toolbar — Positioned immediately after Company & Developers in upper-middle area */}
            <div className="border-t border-[#e5ded6] pt-4 pb-12 dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                {/* Language & Currency Pill */}
                <GlobalizationSwitcher />

                {/* Controls & Social Links Toolbar */}
                <div className="flex items-center gap-2">
                  <ThemeToggle iconOnly />
                  <div className="mx-1 h-4 w-[1px] bg-[#e5ded6] dark:bg-white/15" />
                  <a
                    href="https://www.instagram.com/mirha_andco/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="rounded-lg p-1.5 text-[#8c857f] transition-colors hover:text-[#fc2779] dark:text-[#827c75] dark:hover:text-[#ff4d94]"
                  >
                    <InstagramIcon size={19} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/mirhaandco/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="rounded-lg p-1.5 text-[#8c857f] transition-colors hover:text-[#fc2779] dark:text-[#827c75] dark:hover:text-[#ff4d94]"
                  >
                    <LinkedInIcon size={19} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

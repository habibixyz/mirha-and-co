"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const [isLaunching, setIsLaunching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Always close drawer, clear launching state, and ensure scrolling is unlocked on route transition
  useEffect(() => {
    setMenuOpen(false);
    setIsLaunching(false);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, [pathname]);

  // Reset mobile drawer & launch state if restored via mobile browser Back button (BFCache)
  useEffect(() => {
    const handlePageShow = () => {
      setMenuOpen(false);
      setIsLaunching(false);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open — lock both html + body for iOS/Android compatibility
  useEffect(() => {
    const html = document.documentElement;
    if (menuOpen) {
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  // Defer unmounting drawer links slightly so mobile tap/Next Link navigation isn't cancelled mid-click
  const handleNavClick = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setTimeout(() => setMenuOpen(false), 80);
  };

  // Native hard navigation across (marketing) -> (saas) root layouts avoids stale pre-auth Router Cache & RSC double-fetch
  const handleLaunchClick = () => {
    setIsLaunching(true);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  return (
    <header
      className="site-header relative z-[200] border-b border-[#ded7cf] transition-all duration-300 dark:border-white/10"
      style={{
        background: isScrolled
          ? isDark ? "rgba(18,17,16,0.88)" : "rgba(255,255,255,0.88)"
          : isDark ? "#121110" : "white",
        backdropFilter: isScrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(18px)" : "none",
        boxShadow: isScrolled
          ? isDark
            ? "0 1px 28px rgba(0,0,0,0.22)"
            : "0 1px 28px rgba(22,20,18,0.06)"
          : "none",
      }}
    >
      <div className="site-header-container">

        {/* Left — 4 balanced nav links: Diagnostics, K-Beauty, Men's Grooming, Blog */}
        <div className="site-header-left">
          <nav className="site-header-nav">
            <Link href="/tools" className="site-header-nav-link hidden lg:inline-flex">Diagnostics</Link>
            <Link href="/k-beauty" className="site-header-nav-link hidden lg:inline-flex">{t("nav.kbeauty")}</Link>
            <Link href="/mens-grooming" className="site-header-nav-link hidden lg:inline-flex">{t("nav.men")}</Link>
            <Link href="/blog" className="site-header-nav-link hidden lg:inline-flex">{t("nav.blog")}</Link>
          </nav>
        </div>

        {/* Center — Brand Logo (untouched) */}
        <div className="site-header-logo-wrapper notranslate">
          <Link href="/" className="site-header-logo notranslate text-black transition-colors dark:text-white">MIRHA &amp; CO.</Link>
        </div>

        {/* Right — 4 balanced items: Pricing, B2B API, About, Launch App CTA + Theme */}
        <div className="site-header-right">
          <nav className="site-header-nav">
            <Link href="/pricing" className="site-header-nav-link hidden lg:inline-flex">{t("nav.pricing")}</Link>
            <Link href="/b2b" className="site-header-nav-link hidden lg:inline-flex">B2B API</Link>
            <Link href="/about" className="site-header-nav-link hidden lg:inline-flex">{t("nav.about")}</Link>

            {/* Launch App / Dashboard CTA — fast client navigation with touch/hover prefetch */}
            <Link
              href="/dashboard"
              prefetch={false}
              onMouseEnter={() => router.prefetch("/dashboard")}
              onTouchStart={() => router.prefetch("/dashboard")}
              onClick={handleLaunchClick}
              className="hidden lg:inline-flex items-center gap-1 rounded-full bg-[#fc2779] px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-[#e01f69] hover:shadow-[0_4px_16px_rgba(252,39,121,0.3)]"
            >
              {isLaunching ? "Launching..." : "Launch App →"}
            </Link>

            <div className="flex items-center">
              <ThemeToggle iconOnly />
            </div>

            {/* Mobile hamburger */}
            <div className="menu-trigger flex items-center lg:hidden">
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
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100vw", height: "100vh", zIndex: 99999, display: "flex" }}
        >
          {/* Backdrop */}
          <div
            className="site-header-drawer-backdrop"
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            onClick={closeMenu}
          />

          {/* Drawer panel */}
          <div
            className="site-header-drawer-content flex h-full w-[340px] sm:w-[380px] max-w-[92vw] flex-col gap-3.5 border-r border-[#ded7cf] bg-[#fcfbf9] px-4.5 py-4.5 shadow-2xl transition-colors duration-300 sm:gap-5 sm:px-6 sm:py-6 dark:border-white/15 dark:bg-[#141312] dark:text-[#f7f5f2]"
            style={{ zIndex: 100000, overflowY: "auto", overflowX: "hidden" }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#e5ded6] pb-3 dark:border-white/10 shrink-0">
              <span className="font-bebas notranslate text-2xl tracking-[0.12em] text-[#11100f] dark:text-white">
                MIRHA &amp; CO.
              </span>
              <button
                onClick={closeMenu}
                className="cursor-pointer rounded-xl p-1.5 text-[#2b2826] transition-colors hover:bg-black/5 hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
                aria-label="Close Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Section 1: Tools & Intelligence */}
            <div className="flex flex-col gap-0.5">
              <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#fc2779] sm:text-[11px] dark:text-[#ff4d94]">
                Tools &amp; Intelligence
              </div>
              <Link
                href="/tools/analysis"
                onClick={handleNavClick}
                className="rounded-lg px-3 py-1.5 text-[13.5px] font-semibold text-[#fc2779] transition-all hover:bg-[#ffe6f0] dark:text-[#ff4d94] dark:hover:bg-white/10"
              >
                Free Daily Skin Scan (1/Day)
              </Link>
              <Link
                href="/tools"
                onClick={handleNavClick}
                className="rounded-lg px-3 py-1.5 text-[13.5px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                Diagnostic Tools
              </Link>
              <Link
                href="/blog"
                onClick={handleNavClick}
                className="rounded-lg px-3 py-1.5 text-[13.5px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                {t("nav.blog")}
              </Link>
            </div>

            {/* Separator */}
            <div className="border-t border-[#e5ded6] dark:border-white/10 shrink-0" />

            {/* Section 2: Curated Picks */}
            <div className="flex flex-col gap-0.5">
              <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#fc2779] sm:text-[11px] dark:text-[#ff4d94]">
                Curated Picks
              </div>
              <Link
                href="/k-beauty"
                onClick={handleNavClick}
                className="rounded-lg px-3 py-1.5 text-[13.5px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                K-Beauty Picks
              </Link>
              <Link
                href="/mens-grooming"
                onClick={handleNavClick}
                className="rounded-lg px-3 py-1.5 text-[13.5px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                Men&apos;s Grooming
              </Link>
            </div>

            {/* Separator */}
            <div className="border-t border-[#e5ded6] dark:border-white/10 shrink-0" />

            {/* Section 3: Company & Platform */}
            <div className="flex flex-col gap-0.5">
              <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#fc2779] sm:text-[11px] dark:text-[#ff4d94]">
                Platform
              </div>
              <Link
                href="/pricing"
                onClick={handleNavClick}
                className="rounded-lg px-3 py-1.5 text-[13.5px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                {t("nav.pricing")}
              </Link>
              <Link
                href="/b2b"
                onClick={handleNavClick}
                className="rounded-lg px-3 py-1.5 text-[13.5px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                B2B Telemetry API
              </Link>
              <Link
                href="/about"
                onClick={handleNavClick}
                className="rounded-lg px-3 py-1.5 text-[13.5px] font-semibold text-[#2b2826] transition-all hover:bg-[#ffe6f0] hover:text-[#fc2779] dark:text-[#f7f5f2] dark:hover:bg-white/10 dark:hover:text-[#ff4d94]"
              >
                {t("nav.about")}
              </Link>
            </div>

            {/* Launch App CTA — fast client navigation with touch/hover prefetch */}
            <Link
              href="/dashboard"
              prefetch={false}
              onMouseEnter={() => router.prefetch("/dashboard")}
              onTouchStart={() => router.prefetch("/dashboard")}
              onClick={() => {
                handleLaunchClick();
                handleNavClick();
              }}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#fc2779] px-4 py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-[#e01f69] active:scale-[0.98]"
            >
              {isLaunching ? "Launching App..." : "Launch App →"}
            </Link>

            {/* Controls Toolbar */}
            <div className="mt-auto border-t border-[#e5ded6] pt-3.5 pb-8 sm:pb-10 dark:border-white/10 shrink-0">
              <div className="flex items-center justify-between gap-1.5">
                {/* Language & Currency Pill */}
                <div className="shrink min-w-0">
                  <GlobalizationSwitcher align="left" direction="up" />
                </div>

                {/* Controls & Social Links Toolbar */}
                <div className="flex items-center gap-1 shrink-0 pr-0.5">
                  <ThemeToggle iconOnly />
                  <div className="mx-0.5 h-3.5 w-[1px] bg-[#e5ded6] dark:bg-white/15" />
                  <a
                    href="https://www.instagram.com/mirha_andco/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[#8c857f] transition-colors hover:text-[#fc2779] dark:text-[#827c75] dark:hover:text-[#ff4d94]"
                  >
                    <InstagramIcon size={16} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/mirhaandco/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[#8c857f] transition-colors hover:text-[#fc2779] dark:text-[#827c75] dark:hover:text-[#ff4d94]"
                  >
                    <LinkedInIcon size={16} />
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

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
 <div className="site-header-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
 {/* Left Nav Wrapper (Desktop only) */}
 <div className="site-header-left">
 <nav className="flex items-center gap-6">
 <Link href="/tools/ingredients" className="site-header-nav-link">
 {t("nav.ingredients")}
 </Link>
 <Link href="/tools/hard-water" className="site-header-nav-link">
 Hard Water Test
 </Link>
 <Link href="/tools/dupes" className="site-header-nav-link">
 Dupe Finder
 </Link>
 </nav>
 </div>

 {/* Mobile Left Spacer (to keep logo centered) */}
 <div className="md:hidden flex-1 flex justify-start"></div>

 {/* LOGO Wrapper */}
 <div className="site-header-logo-wrapper">
 <Link href="/" className="site-header-logo">
 MIRHA &amp; CO.
 </Link>
 </div>

 {/* Right Nav Wrapper (Desktop only) */}
 <div className="site-header-right">
 <nav className="flex items-center gap-6">
 <Link href="/blog" className="site-header-nav-link">
 {t("nav.blog")}
 </Link>
 <Link href="/pricing" className="site-header-nav-link">
 {t("nav.pricing")}
 </Link>
 <Link href="/about" className="site-header-nav-link">
 {t("nav.about")}
 </Link>
 <Link href="/dashboard" className="site-header-nav-link">
 {t("nav.dashboard")}
 </Link>
 <GlobalizationSwitcher />
 </nav>
 </div>

 {/* Mobile Hamburger Button Wrapper */}
 <div className="md:hidden flex-1 flex items-center justify-end">
 {!menuOpen && (
 <button
 className="text-black p-2 hover:text-[#c8473a] transition-colors bg-transparent border-none outline-none shadow-none cursor-pointer"
 onClick={() => setMenuOpen(true)}
 aria-label="Toggle Menu"
 >
 <Menu size={20} />
 </button>
 )}
 </div>
 </div>

 {/* Mobile Drawer Overlay */}
 {menuOpen && (
 <div 
 className="site-header-drawer-overlay"
 style={{
 position: "fixed",
 top: 0,
 left: 0,
 right: 0,
 bottom: 0,
 width: "100vw",
 height: "100vh",
 display: "flex",
 zIndex: 99999,
 }}
 >
 {/* Backdrop */}
 <div 
 className="site-header-drawer-backdrop" 
 style={{
 position: "absolute",
 top: 0,
 left: 0,
 right: 0,
 bottom: 0,
 width: "100%",
 height: "100%",
 backgroundColor: "rgba(0, 0, 0, 0.4)",
 backdropFilter: "blur(4px)",
 WebkitBackdropFilter: "blur(4px)",
 }}
 onClick={() => setMenuOpen(false)} 
 />
 
 {/* Drawer */}
 <div 
 className="site-header-drawer-content"
 style={{
 position: "relative",
 width: "280px",
 maxWidth: "85vw",
 height: "100%",
 backgroundColor: "#fcfbf9",
 borderRight: "1px solid #ded7cf",
 padding: "1.5rem 1.5rem 2rem",
 display: "flex",
 flexDirection: "column",
 gap: "1.25rem",
 boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
 overflowY: "auto",
 zIndex: 100000,
 }}
 >
 <div className="flex justify-between items-center mb-2 pb-4 border-b border-[#e5ded6]">
 <span 
 className="font-bebas text-xl tracking-[0.08em] text-black"
 style={{ fontFamily: "var(--font-bebas), sans-serif" }}
 >
 MIRHA &amp; CO.
 </span>
 <button 
 onClick={() => setMenuOpen(false)} 
 className="text-black hover:text-[#c8473a] transition-colors -mr-2 p-2 bg-transparent border-none outline-none cursor-pointer"
 aria-label="Close Menu"
 >
 <X size={20} />
 </button>
 </div>

 <Link
 href="/tools/ingredients"
 className="hover:text-[#c8473a] transition-colors"
 style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: "600", color: "#2b2826", padding: "0.2rem 0", fontFamily: "var(--font-dm-sans), sans-serif" }}
 onClick={() => setMenuOpen(false)}
 >
 {t("nav.ingredients")}
 </Link>
 <Link
 href="/tools/hard-water"
 className="hover:text-[#c8473a] transition-colors"
 style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: "600", color: "#2b2826", padding: "0.2rem 0", fontFamily: "var(--font-dm-sans), sans-serif" }}
 onClick={() => setMenuOpen(false)}
 >
 Hard Water Test
 </Link>
 <Link
 href="/tools/dupes"
 className="hover:text-[#c8473a] transition-colors"
 style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: "600", color: "#2b2826", padding: "0.2rem 0", fontFamily: "var(--font-dm-sans), sans-serif" }}
 onClick={() => setMenuOpen(false)}
 >
 Dupe Finder
 </Link>

 <div style={{ height: "1px", background: "#e5ded6", margin: "0.4rem 0" }} />

 <Link
 href="/blog"
 className="hover:text-[#c8473a] transition-colors"
 style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: "600", color: "#2b2826", padding: "0.2rem 0", fontFamily: "var(--font-dm-sans), sans-serif" }}
 onClick={() => setMenuOpen(false)}
 >
 {t("nav.blog")}
 </Link>
 <Link
 href="/pricing"
 className="hover:text-[#c8473a] transition-colors"
 style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: "600", color: "#2b2826", padding: "0.2rem 0", fontFamily: "var(--font-dm-sans), sans-serif" }}
 onClick={() => setMenuOpen(false)}
 >
 {t("nav.pricing")}
 </Link>
 <Link
 href="/about"
 className="hover:text-[#c8473a] transition-colors"
 style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: "600", color: "#2b2826", padding: "0.2rem 0", fontFamily: "var(--font-dm-sans), sans-serif" }}
 onClick={() => setMenuOpen(false)}
 >
 {t("nav.about")}
 </Link>
 <Link
 href="/dashboard"
 className="hover:text-[#c8473a] transition-colors"
 style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: "600", color: "#2b2826", padding: "0.2rem 0", fontFamily: "var(--font-dm-sans), sans-serif" }}
 onClick={() => setMenuOpen(false)}
 >
 {t("nav.dashboard")}
 </Link>

 <div style={{ height: "1px", background: "#e5ded6", margin: "0.4rem 0" }} />

 <div style={{ display: "flex", justifyContent: "flex-start", paddingTop: "0.4rem" }}>
 <GlobalizationSwitcher />
 </div>
 </div>
 </div>
 )}
 </header>
 );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Sparkles, BookOpen, Crown, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SaasSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/routines", label: "My Routines", icon: Sparkles },
    { href: "/dashboard/journal", label: "Skin Journal", icon: BookOpen },
    { href: "/dashboard/search", label: "Search Guide", icon: Search },
    { href: "/dashboard/subscription", label: "Subscription", icon: Crown },
  ];

  const sidebarContent = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <Link href="/dashboard" style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "2rem",
          letterSpacing: "0.08em",
          textDecoration: "none",
          color: "var(--black)",
        }}>
          MIRHA &amp; CO.
        </Link>
        <button 
          className="mobile-only"
          onClick={() => setIsOpen(false)}
          style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)" }}
        >
          <X size={24} />
        </button>
      </div>
      <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "3rem" }}>
        &larr; Back to Shop
      </Link>

      <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem", flex: 1 }}>
        {links.map(link => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              style={{
                textDecoration: "none",
                color: isActive ? "var(--rose)" : "var(--muted)",
                background: isActive ? "var(--sand)" : "transparent",
                fontWeight: isActive ? 600 : 500,
                fontSize: "0.95rem",
                padding: "0.8rem 1rem",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                transition: "all 0.2s"
              }}
            >
              <Icon size={18} color={isActive ? "var(--rose)" : "var(--muted)"} />
              {link.label}
              {link.badge && (
                <span style={{
                  marginLeft: "auto",
                  background: "var(--rose)",
                  color: "white",
                  fontSize: "0.6rem",
                  padding: "0.2rem 0.4rem",
                  borderRadius: "4px",
                  fontWeight: 700,
                  letterSpacing: "0.05em"
                }}>{link.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>


    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header" style={{
        display: "none",
        padding: "1rem 1.5rem",
        borderBottom: "1px solid var(--rule)",
        background: "var(--white)",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 40
      }}>
        <Link href="/dashboard" style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.8rem",
          letterSpacing: "0.08em",
          textDecoration: "none",
          color: "var(--black)",
        }}>
          MIRHA &amp; CO.
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)" }}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="desktop-sidebar" style={{
        width: "260px",
        borderRight: "1px solid var(--rule)",
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        background: "var(--white)",
        height: "100vh",
        position: "sticky",
        top: 0
      }}>
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 50
              }}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: "280px",
                background: "var(--white)",
                zIndex: 51,
                padding: "2rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: "20px 0 50px rgba(0,0,0,0.1)"
              }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}

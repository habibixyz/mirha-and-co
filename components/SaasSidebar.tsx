"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/(saas)/actions";
import { LogOut } from "lucide-react";

const NAV = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Overview", icon: <OverviewIcon /> },
      { href: "/dashboard/routines", label: "My Routines", icon: <RoutinesIcon /> },
      { href: "/dashboard/journal", label: "Skin Journal", icon: <JournalIcon /> },
    ],
  },
  {
    label: "Tools",
    items: [
      { href: "/dashboard/search", label: "Search Guide", icon: <SearchIcon /> },
      { href: "/dashboard/subscription", label: "Subscription", icon: <SubIcon /> },
    ],
  },
];

export function SaasSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dash-sidebar">
      {/* Brand */}
      <div className="dash-sidebar-brand">
        <Link href="/dashboard" className="dash-sidebar-brand-name">
          MIRHA &amp; CO.
        </Link>
        <Link href="/" className="dash-back-link">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 1.5L3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Shop
        </Link>
      </div>

      {/* Nav */}
      <nav className="dash-nav">
        {NAV.map((section) => (
          <div key={section.label}>
            <p className="dash-nav-label">{section.label}</p>
            {section.items.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`dash-nav-link${isActive ? " active" : ""}`}
                >
                  <span className="dash-nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer upgrade nudge + Sign Out */}
      <div className="dash-sidebar-footer" style={{ 
          paddingBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
      }}>
        <Link href="/dashboard/subscription" style={{
          display: "block",
          background: "var(--dash-accent)",
          color: "white",
          padding: "1rem",
          borderRadius: "18px",
          textDecoration: "none",
          fontSize: "0.85rem",
          fontWeight: 600,
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(200, 71, 58, 0.15)"
        }}>
          Upgrade to Pro
        </Link>

        <button 
          onClick={() => logoutAction()}
          style={{
            background: "transparent",
            border: "1px solid var(--dash-border)",
            borderRadius: "18px",
            padding: "0.8rem",
            color: "var(--dash-muted)",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.03)";
            e.currentTarget.style.color = "var(--dash-ink)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--dash-muted)";
          }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}

// ── ICONS ────────────────────────────────────────────────────────────────────
function OverviewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function RoutinesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8z" />
      <path d="M8 5v3l2 2" />
    </svg>
  );
}

function JournalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
      <path d="M5.5 5h5M5.5 8h5M5.5 11h3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

function SubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1l1.854 4.146L14 6l-3 2.854.708 4.146L8 11l-3.708 2L5 8.854 2 6l4.146-.854L8 1z" />
    </svg>
  );
}
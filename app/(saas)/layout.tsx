import "../globals.css";
import type { Metadata } from "next";
import { SaasSidebar } from "@/components/SaasSidebar";
import { DM_Sans, DM_Serif_Display, Bebas_Neue } from "next/font/google";
import { MobileMenuButton } from "@/components/MobileMenuButton";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Dashboard — Mirha & Co.",
  description: "Manage your personalized routines and skin journal.",
};

export default function SaasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmSerifDisplay.variable} ${bebasNeue.variable}`}
    >
      <body suppressHydrationWarning>
        <style>{`
  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }

  :root {
    --dash-bg: #F8F6F3;
    --dash-surface: #FFFFFF;
    --dash-border: #EFEEEB;
    --dash-ink: #1A1714;
    --dash-muted: #8A8480;
    --dash-accent: #C8473A;
    --dash-accent-soft: rgba(200, 71, 58, 0.08);
    --dash-sidebar-w: 240px;
    --dash-font-sans: var(--font-dm-sans), 'DM Sans', sans-serif;
    --dash-font-serif: var(--font-dm-serif), 'DM Serif Display', serif;
    
    /* Responsive font sizes */
    --font-h1: 3.2rem;
    --font-h2: 1.4rem;
  }

  @media (max-width: 768px) {
    :root {
      --font-h1: 2.2rem;
      --font-h2: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    :root {
      --font-h1: 1.85rem;
      --font-h2: 1.15rem;
    }
  }

  html, body {
    height: 100%;
    width: 100%;
    background: #E8E4DF;
  }

  body {
    color: var(--dash-ink);
    font-family: var(--dash-font-sans);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    padding: 16px;
    overflow: hidden;
  }

  /* ── LAYOUT SHELL ── */
  .dash-shell {
    display: grid;
    grid-template-columns: var(--dash-sidebar-w) 1fr;
    height: calc(100vh - 32px);
    background: var(--dash-bg);
    border-radius: 40px;
    overflow: hidden;
    box-shadow:
      0 30px 100px rgba(40, 28, 20, 0.12),
      inset 0 1px 0 rgba(255,255,255,0.6);
    border: 1px solid rgba(255,255,255,0.4);
  }

  /* ── SIDEBAR ── */
  .dash-sidebar {
    position: sticky;
    top: 0;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border-right: 1px solid var(--dash-border);
    display: flex;
    flex-direction: column;
    padding: 0 0 1rem;
    overflow: hidden;
    z-index: 40;
  }

  @media (max-width: 768px) {
    .dash-sidebar {
      height: 100vh;
      position: fixed;
    }
  }

  .dash-sidebar-brand {
    padding: 2rem 1.8rem;
    border-bottom: 1px solid var(--dash-border);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .dash-sidebar-brand-name {
    font-family: var(--font-bebas), 'Bebas Neue', sans-serif;
    font-size: 1.3rem;
    letter-spacing: 0.15em;
    color: var(--dash-ink);
    text-decoration: none;
    line-height: 1;
    font-weight: 700;
  }

  .dash-back-link {
    font-size: 0.75rem;
    color: var(--dash-muted);
    text-decoration: none;
    letter-spacing: 0.05em;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    transition: all 0.2s ease;
  }

  .dash-back-link:hover {
    color: var(--dash-accent);
    transform: translateX(-2px);
  }

  .dash-nav {
    padding: 1.5rem 0.8rem;
    flex: 1;
    overflow-y: auto;
  }

  .dash-nav-label {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--dash-muted);
    padding: 1rem 1rem 0.5rem;
    font-weight: 700;
    opacity: 0.6;
  }

  .dash-nav-link {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.85rem 1.2rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--dash-muted);
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 18px;
    margin-bottom: 4px;
  }

  .dash-nav-link:hover {
    color: var(--dash-ink);
    background: rgba(0, 0, 0, 0.03);
    transform: translateX(4px);
  }

  .dash-nav-link.active {
    color: var(--dash-accent);
    background: var(--dash-accent-soft);
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(200, 71, 58, 0.08);
  }

  .dash-nav-icon {
    width: 18px;
    height: 18px;
    opacity: 0.7;
    flex-shrink: 0;
  }

  .dash-nav-link.active .dash-nav-icon {
    opacity: 1;
  }

  .dash-sidebar-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--dash-border);
    flex-shrink: 0;
  }

  /* ── MAIN CONTENT ── */
  .dash-main {
    overflow-y: auto;
    overflow-x: hidden;
    background: transparent;
    height: 100%;
  }

  .dash-main-inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 4rem;
  }

  /* ── MOBILE ── */
  .mobile-menu-btn {
    display: none;
  }

  @media (max-width: 1024px) {
    .dash-main-inner {
      padding: 3rem 2rem;
    }
  }

  @media (max-width: 768px) {
    body {
      padding: 0;
    }

    .dash-shell {
      grid-template-columns: 1fr;
      height: 100vh;
      border-radius: 0;
      border: none;
    }

    .dash-sidebar {
      position: fixed;
      top: 0;
      left: -100%;
      width: 100%;
      max-width: 300px;
      height: 100vh;
      background: white;
      z-index: 9998;
      transition: left 0.4s cubic-bezier(0.19, 1, 0.22, 1);
      box-shadow: 30px 0 80px rgba(0, 0, 0, 0.1);
      border-radius: 0 40px 40px 0;
    }

    body.sidebar-open .dash-sidebar {
      left: 0;
    }

    .dash-main-inner {
      padding: 1.5rem 1.5rem 3rem;
    }

    .mobile-menu-btn {
      display: flex;
      position: fixed;
      top: 1.25rem;
      right: 1.25rem; /* MOVED TO RIGHT */
      width: 48px;
      height: 48px;
      border-radius: 18px;
      background: white;
      border: 1px solid var(--dash-border);
      align-items: center;
      justify-content: center;
      z-index: 9999;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .mobile-menu-btn:active {
      transform: scale(0.9);
    }

    body.sidebar-open .mobile-menu-btn {
      transform: rotate(90deg);
      border-color: var(--dash-accent);
      color: var(--dash-accent);
    }

    body.sidebar-open::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(26, 23, 20, 0.4);
      backdrop-filter: blur(4px);
      z-index: 9997;
      animation: fadeIn 0.3s ease;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 480px) {
    .dash-main-inner {
      padding: 1rem 1.2rem 2.5rem;
    }
    
    .dash-shell {
      height: 100vh;
    }
  }
`}</style>

        <div className="dash-shell">
          <SaasSidebar />
          <MobileMenuButton />
          <main className="dash-main">
            <div className="dash-main-inner">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
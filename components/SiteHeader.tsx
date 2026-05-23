"use client";

import Link from "next/link";
import { useGlobalization } from "./GlobalizationContext";
import GlobalizationSwitcher from "./GlobalizationSwitcher";

export default function SiteHeader() {
  const { t } = useGlobalization();

  return (
    <header className="site-header">
      <div className="nav-container">
        {/* LEFT */}
        <nav className="nav-left">
          <Link href="/tools/ingredients" className="nav-link">
            {t("nav.ingredients")}
          </Link>
        </nav>

        {/* LOGO */}
        <Link href="/" className="logo">
          MIRHA &amp; CO.
        </Link>

        {/* RIGHT */}
        <nav className="nav-right">
          <Link href="/blog" className="nav-link">
            {t("nav.blog")}
          </Link>
          <Link href="/about" className="nav-link">
            {t("nav.about")}
          </Link>
          <Link href="/dashboard" className="nav-link">
            {t("nav.dashboard")}
          </Link>
          <GlobalizationSwitcher />
        </nav>
      </div>
    </header>
  );
}

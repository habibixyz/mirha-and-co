"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { Search, ArrowRight, Layers } from "lucide-react";
import { useGlobalization } from "@/components/GlobalizationContext";

const SECTIONS = [
  { id: "all",            label: "All" },
  { id: "beard care",     label: "Beard Care" },
  { id: "skincare",       label: "Skincare" },
  { id: "hair care",      label: "Hair Care" },
  { id: "body care",      label: "Body Care" },
  { id: "fragrance",      label: "Fragrance & Deo" },
  { id: "perfume",        label: "Perfume" },
  { id: "grooming tools", label: "Tools & Kits" },
];

function MProductCard({ product }: { product: any }) {
  const global = useGlobalization();
  const price = product.price ? global.formatPrice(product.price) : null;
  const mrp   = product.mrp && product.mrp > product.price ? global.formatPrice(product.mrp) : null;
  const discount = product.mrp && product.mrp > product.price
    ? Math.round((1 - product.price / product.mrp) * 100)
    : null;

  return (
    <div className="mg-card">
      <Link href={`/product/${product.asin}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", flex: 1 }}>
        {product.badge && (
          <div className="mg-badge">{product.badge}</div>
        )}
        <div className="mg-card-img">
          <img src={product.image} alt={product.name} style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }} />
        </div>
        <div className="mg-card-body">
          <p className="mg-card-brand">{product.brand}</p>
          <h3 className="mg-card-name">{product.name}</h3>
          <p className="mg-card-desc">
            {product.description ? product.description.slice(0, 90) + "…" : ""}
          </p>
          <div className="mg-card-price-row">
            {price && <span className="mg-price">{price}</span>}
            {mrp   && <span className="mg-mrp">{mrp}</span>}
            {discount && <em className="mg-discount">{discount}% off</em>}
          </div>
        </div>
      </Link>
      <div className="mg-card-footer">
        <Link href={`/product/${product.asin}`} className="mg-btn-primary">Buy</Link>
        <Link href={`/dashboard/analysis?product=${product.asin}`} className="mg-btn-secondary">Analyse</Link>
      </div>
    </div>
  );
}

export default function MensGroomingPage() {
  const [activeSection, setActiveSection] = useState("all");
  const [activeBrand, setActiveBrand]     = useState("all");
  const [search, setSearch]               = useState("");

  const baseProducts = useMemo(() =>
    (PRODUCTS as any[]).filter((p) => p.tags?.includes("mens")),
  []);

  const brands = useMemo(() => {
    const seen = new Set<string>();
    const list: { id: string; label: string }[] = [{ id: "all", label: "All Brands" }];
    baseProducts.forEach((p) => {
      if (p.brand && !seen.has(p.brand.toLowerCase())) {
        seen.add(p.brand.toLowerCase());
        list.push({ id: p.brand.toLowerCase(), label: p.brand });
      }
    });
    return list;
  }, [baseProducts]);

  const filtered = useMemo(() =>
    baseProducts.filter((p: any) => {
      const bySection = activeSection === "all" || p.subcat?.toLowerCase() === activeSection;
      const byBrand   = activeBrand   === "all" || p.brand?.toLowerCase() === activeBrand;
      const q = search.toLowerCase();
      const bySearch  = !q || p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q);
      return bySection && byBrand && bySearch;
    }),
  [baseProducts, activeSection, activeBrand, search]);

  return (
    <>
      <style>{`
        /* ── Tokens ─────────────────────────────────── */
        :root {
          --parchment: #fbf7f1;
          --parchment2: #f4ede3;
          --border: #e6dcd2;
          --ink: #161412;
          --muted: #756b63;
          --rose: #fc2779;
          --rose-light: #fff0f5;
        }

        /* ── Page shell ─────────────────────────────── */
        .mg-page {
          background: var(--parchment);
          color: var(--ink);
          min-height: 100vh;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
        }

        /* ── Hero ───────────────────────────────────── */
        .mg-hero {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          min-height: 520px;
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }

        .mg-hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 48px 64px 0;
          max-width: 560px;
          margin-left: auto;
        }

        .mg-hero-eyebrow {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--rose);
          margin: 0 0 18px;
        }

        .mg-hero-h1 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(44px, 5.5vw, 76px);
          line-height: 1.0;
          font-weight: 600;
          margin: 0 0 20px;
          color: var(--ink);
        }

        .mg-hero-h1 em {
          font-style: italic;
          color: var(--rose);
        }

        .mg-hero-copy {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.75;
          margin: 0 0 32px;
          max-width: 420px;
        }

        .mg-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--ink);
          color: #fff;
          padding: 0 24px;
          height: 48px;
          border-radius: 8px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s;
          width: fit-content;
        }
        .mg-hero-cta:hover { background: #fc2779; }

        .mg-hero-trust {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 28px;
        }
        .mg-trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          color: #8d8178;
        }
        .mg-trust-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--rose); flex-shrink: 0;
        }

        .mg-hero-right {
          position: relative;
          overflow: hidden;
        }
        .mg-hero-right img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .mg-hero-right-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, var(--parchment) 0%, transparent 30%);
        }

        /* ── Shell ──────────────────────────────────── */
        .mg-shell {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Filters ────────────────────────────────── */
        .mg-filters-wrap {
          padding: 32px 0 0;
          border-bottom: 1px solid var(--border);
        }

        .mg-tabs {
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
          border-bottom: 1px solid var(--border);
          margin-bottom: 0;
        }
        .mg-tabs::-webkit-scrollbar { display: none; }

        .mg-tab {
          background: none; border: none;
          border-bottom: 2px solid transparent;
          padding: 10px 18px;
          font-size: 12px; letter-spacing: 0.08em;
          text-transform: uppercase; font-weight: 600;
          color: #9c9188;
          cursor: pointer; white-space: nowrap;
          font-family: inherit;
          transition: color 0.18s, border-color 0.18s;
          margin-bottom: -1px;
        }
        .mg-tab:hover { color: var(--rose); }
        .mg-tab.on {
          color: var(--rose);
          border-bottom-color: var(--rose);
          font-weight: 700;
        }

        .mg-filter-row {
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between;
          gap: 12px; padding: 16px 0;
        }

        .mg-pills {
          display: flex; flex-wrap: wrap; gap: 7px; align-items: center;
        }

        .mg-pill {
          border: 1px solid #ded3ca;
          background: #fffaf4;
          color: #756b63;
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 11px; font-weight: 600;
          cursor: pointer; transition: all 0.18s;
          font-family: inherit;
          white-space: nowrap;
        }
        .mg-pill:hover { border-color: var(--rose); color: var(--rose); }
        .mg-pill.on {
          border-color: var(--rose);
          background: var(--rose-light);
          color: var(--rose);
        }

        .mg-search {
          position: relative; width: 260px; flex-shrink: 0;
        }
        .mg-search-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%); color: #aaa; pointer-events: none;
        }
        .mg-search input {
          width: 100%; padding-left: 40px; padding-right: 14px;
          height: 40px; border: 1px solid #ded3ca;
          border-radius: 10px; font-size: 13px;
          background: #fffaf4; color: var(--ink);
          outline: none; font-family: inherit; box-sizing: border-box;
          transition: border-color 0.18s;
        }
        .mg-search input:focus { border-color: var(--rose); }

        /* ── Grid ───────────────────────────────────── */
        .mg-grid-section {
          padding: 32px 0 56px;
        }

        .mg-count {
          font-size: 10px; letter-spacing: 0.22em;
          text-transform: uppercase; color: #aaa; font-weight: 700;
          margin-bottom: 22px;
        }

        .mg-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          align-items: stretch;
        }

        /* ── Cards ──────────────────────────────────── */
        .mg-card {
          background: #fffaf4;
          border: 1px solid #e4d9cf;
          border-radius: 12px;
          overflow: hidden;
          display: flex; flex-direction: column;
          position: relative;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .mg-card:hover {
          transform: translateY(-3px);
          border-color: var(--rose);
          box-shadow: 0 18px 48px rgba(40,28,20,0.08);
        }

        .mg-badge {
          position: absolute; top: 10px; left: 10px;
          background: var(--rose); color: #fff;
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 4px; z-index: 5;
        }

        .mg-card-img {
          background: #fff;
          aspect-ratio: 1/1;
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid #eee5dd;
          padding: 18px;
        }

        .mg-card-body {
          padding: 14px 16px;
          display: flex; flex-direction: column; gap: 6px; flex: 1;
        }

        .mg-card-brand {
          font-size: 9px; letter-spacing: 0.18em;
          text-transform: uppercase; font-weight: 700;
          color: var(--rose); margin: 0;
        }

        .mg-card-name {
          font-size: 14px; line-height: 1.3; margin: 0;
          font-weight: 600; color: var(--ink);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .mg-card-desc {
          font-size: 12px; color: var(--muted);
          line-height: 1.55; margin: 0; flex: 1;
        }

        .mg-card-price-row {
          display: flex; align-items: baseline; gap: 8px;
          margin-top: 6px;
        }
        .mg-price {
          font-family: 'Bebas Neue', var(--font-bebas), sans-serif;
          font-size: 26px; letter-spacing: 0.02em; color: var(--ink);
        }
        .mg-mrp {
          font-size: 11px; color: #bbb; text-decoration: line-through;
        }
        .mg-discount {
          font-size: 11px; color: #2d8a5c; font-style: normal;
        }

        .mg-card-footer {
          border-top: 1px solid #eee5dd;
          padding: 10px 14px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
        }

        .mg-btn-primary, .mg-btn-secondary {
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase;
          font-weight: 700; border-radius: 6px; padding: 9px 8px;
          text-decoration: none; transition: all 0.18s;
        }
        .mg-btn-primary {
          background: var(--ink); color: #fff;
        }
        .mg-btn-primary:hover { background: var(--rose); }
        .mg-btn-secondary {
          border: 1px solid #d8cdc3; color: var(--ink);
          background: rgba(255,255,255,0.6);
        }
        .mg-btn-secondary:hover { border-color: var(--rose); color: var(--rose); }

        /* ── Empty state ─────────────────────────────── */
        .mg-empty {
          background: #fffaf4; border: 1px solid #e4d9cf;
          border-radius: 12px; padding: 56px 20px; text-align: center;
          grid-column: 1 / -1;
        }
        .mg-empty h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 28px; font-weight: 400; margin: 0 0 10px;
        }
        .mg-empty p { color: var(--muted); margin: 0 0 18px; font-size: 14px; }
        .mg-empty button {
          border: 1px solid var(--rose); color: var(--rose);
          background: var(--rose-light); border-radius: 999px;
          padding: 10px 20px; cursor: pointer; font-size: 12px; font-weight: 600;
          font-family: inherit;
        }

        /* ── Editorial ───────────────────────────────── */
        .mg-editorial {
          background: var(--ink); color: #fbf7f1;
          border-radius: 14px;
          padding: 40px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px; align-items: center;
          margin-bottom: 56px;
        }
        .mg-editorial h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 400; margin: 0 0 14px;
          line-height: 1.1;
        }
        .mg-editorial p {
          color: rgba(255,255,255,0.55);
          font-size: 14px; line-height: 1.75; margin: 0 0 20px;
          max-width: 480px;
        }
        .mg-editorial-steps { display: flex; flex-direction: column; gap: 0; }
        .mg-editorial-step {
          border: none; border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 14px 8px;
          display: flex; justify-content: space-between; align-items: center;
          color: rgba(255,255,255,0.8); transition: all 0.25s;
        }
        .mg-editorial-step:last-child { border-bottom: none; }
        .mg-editorial-step:hover { color: #fff; padding-left: 14px; background: rgba(255,255,255,0.02); }
        .mg-editorial-step small {
          display: block; color: var(--rose);
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          margin-bottom: 3px; font-weight: 700;
        }
        .mg-editorial-step b { font-size: 15px; font-weight: 500; }

        /* ── Responsive ──────────────────────────────── */
        @media (max-width: 980px) {
          .mg-hero { grid-template-columns: 1fr; min-height: auto; }
          .mg-hero-right { height: 320px; }
          .mg-hero-right-overlay { background: linear-gradient(180deg, var(--parchment) 0%, transparent 40%); }
          .mg-hero-left { padding: 48px 0 32px; margin-left: 0; max-width: 100%; }
          .mg-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .mg-editorial { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .mg-hero-left { padding: 36px 0 24px; }
          .mg-grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
          .mg-shell { padding: 0 16px; }
          .mg-search { width: 100%; }
          .mg-editorial { padding: 28px 20px; }
        }
      `}</style>

      <main className="mg-page">

        {/* ── HERO ── */}
        <div className="mg-shell">
          <section className="mg-hero">
            <div className="mg-hero-left">
              <p className="mg-hero-eyebrow">Men's Grooming Edit</p>
              <h1 className="mg-hero-h1">
                Built for the<br />
                <em>Modern Man.</em>
              </h1>
              <p className="mg-hero-copy">
                Honest reviews and curated grooming essentials — from beard care to skincare, 
                fragrance to tools. Products that actually work.
              </p>
              <a href="#mg-catalog" className="mg-hero-cta">
                Shop the Edit <ArrowRight size={14} />
              </a>
              <div className="mg-hero-trust">
                {["Honest Picks", "Affiliate Disclosed", "Expert Curated", "Real Brands"].map((t) => (
                  <span key={t} className="mg-trust-item">
                    <span className="mg-trust-dot" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mg-hero-right">
              <img src="/images/mens-hero.png" alt="Men's grooming essentials" />
              <div className="mg-hero-right-overlay" />
            </div>
          </section>
        </div>

        {/* ── CATALOG ── */}
        <div className="mg-shell" id="mg-catalog">
          <div className="mg-filters-wrap">
            {/* Category tabs */}
            <div className="mg-tabs">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`mg-tab${activeSection === s.id ? " on" : ""}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Brand pills + search */}
            <div className="mg-filter-row">
              <div className="mg-pills">
                {brands.slice(0, 8).map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setActiveBrand(b.id)}
                    className={`mg-pill${activeBrand === b.id ? " on" : ""}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              <div className="mg-search">
                <Search size={14} className="mg-search-icon" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search grooming essentials…"
                />
              </div>
            </div>
          </div>

          <div className="mg-grid-section">
            <p className="mg-count">Showing {filtered.length} products</p>
            <div className="mg-grid">
              {filtered.length === 0 ? (
                <div className="mg-empty">
                  <Layers size={32} style={{ color: "#ddd", margin: "0 auto 16px" }} />
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search term.</p>
                  <button onClick={() => { setActiveSection("all"); setActiveBrand("all"); setSearch(""); }}>
                    Reset Filters
                  </button>
                </div>
              ) : (
                filtered.map((p: any) => <MProductCard key={p.asin} product={p} />)
              )}
            </div>
          </div>
        </div>

        {/* ── EDITORIAL / ROUTINE ── */}
        <div className="mg-shell">
          <div className="mg-editorial">
            <div>
              <small style={{ display: "block", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", fontWeight: 700, marginBottom: "14px" }}>
                The Mirha Men's Desk
              </small>
              <h2>A routine that<br />works.</h2>
              <p>
                Most men's skincare aisles are overwhelming. We stripped it back to the 
                essentials — the four steps every man needs, with specific product recommendations 
                from brands that deliver real results at fair prices.
              </p>
              <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rose)", textDecoration: "none" }}>
                Read the Men's Guide <ArrowRight size={12} />
              </Link>
            </div>

            <div className="mg-editorial-steps">
              {[
                ["Step 01", "Cleanse", "A targeted face wash that clears oil without stripping."],
                ["Step 02", "Treat", "Beard oil or a targeted serum for your skin concern."],
                ["Step 03", "Moisturise", "A lightweight, fast-absorbing moisturiser. Non-negotiable."],
                ["Step 04", "Protect", "SPF. Every single day. Even indoors."],
              ].map(([step, title, desc]) => (
                <div key={step} className="mg-editorial-step">
                  <div>
                    <small>{step}</small>
                    <b>{title}</b>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", margin: "2px 0 0" }}>{desc}</p>
                  </div>
                  <ArrowRight size={14} style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </>
  );
}

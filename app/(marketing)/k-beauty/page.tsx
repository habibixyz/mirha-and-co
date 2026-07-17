"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { Search, ArrowRight, BookOpen, Droplet, Layers, ExternalLink } from "lucide-react";
import { useGlobalization } from "@/components/GlobalizationContext";

const CATALOG: { asin: string; section: string }[] = [
  { asin: "B09GP7K353", section: "hydration" },
  { asin: "B09GXFVMCM", section: "hydration" },
  { asin: "B06Y15D1LH",  section: "hydration" },
  { asin: "B0BSLFPGXT",  section: "hydration" },
  { asin: "B08ZXVVY8M",  section: "hydration" },
  { asin: "B0CYS32W5Q",  section: "hydration" },
  { asin: "B0FPLG687Q",  section: "hydration" },
  { asin: "B0CHVHGTDJ",  section: "hydration" },
  { asin: "B0B96L5S3B",  section: "barrier" },
  { asin: "B0966C6TRX",  section: "barrier" },
  { asin: "B09JBJDFHH",  section: "barrier" },
  { asin: "B0C5JFLMVT",  section: "barrier" },
  { asin: "B0CNT5D8J7",  section: "brightening" },
  { asin: "B09M8QG97L",  section: "brightening" },
  { asin: "B09TLFY4GP",  section: "brightening" },
  { asin: "B0DBJ5DBDW",  section: "pore" },
  { asin: "B0C8Y1TSKZ",  section: "pore" },
  { asin: "B0D1FNB4C2",  section: "pore" },
  { asin: "B0CWNH9SMY",  section: "cleansing" },
  { asin: "B07T5BN3P2",  section: "cleansing" },
  { asin: "B08TWHXNCD",  section: "aging" },
  { asin: "B0CFL7LS43",  section: "aging" },
  { asin: "B0B3G73VF5",  section: "sun" },
  { asin: "36PDT9JEXUMJP", section: "makeup" },
  { asin: "B0DSBYS8ZV",  section: "makeup" },
  { asin: "B08B16MD34",  section: "makeup" },
  { asin: "B0BT1D5J52",  section: "makeup" },
];

const SECTIONS = [
  { id: "all",        label: "All Products" },
  { id: "hydration",  label: "Glass Skin & Hydration" },
  { id: "barrier",    label: "Barrier Repair" },
  { id: "brightening",label: "Brightening" },
  { id: "pore",       label: "Pore Care & Oily Skin" },
  { id: "cleansing",  label: "Double Cleansing" },
  { id: "aging",      label: "Eye Care & Aging" },
  { id: "sun",        label: "Sun Protection" },
  { id: "makeup",     label: "Makeup & Lip Glow" },
];

const BRANDS = [
  { id: "all",     label: "All Brands" },
  { id: "TIRTIR",  label: "TIRTIR" },
  { id: "mixsoon", label: "Mixsoon" },
  { id: "SKIN1004",label: "SKIN1004" },
];

function KProductCard({ asin, section }: { asin: string; section: string }) {
  const global = useGlobalization();
  const product = PRODUCTS.find((p) => p.asin === asin) as any;
  if (!product) return null;

  const price = product.price ? global.formatPrice(product.price) : null;
  const mrp   = product.mrp && product.mrp > product.price ? global.formatPrice(product.mrp) : null;
  const affiliateUrl = global.getAffiliateUrl(asin, product.name, product.brand || "", product.link);

  return (
    <div
      className="kb-card"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        width: "100%",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.09)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <Link
        href={`/product/${asin}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Badge */}
        {product.badge && (
          <div style={{
            position: "absolute",
            top: 10, left: 10,
            background: "#fc2779", color: "#fff",
            fontSize: "0.5rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "3px 7px", borderRadius: "4px",
            zIndex: 10,
          }}>
            {product.badge}
          </div>
        )}

        {/* Image */}
        <div className="kb-card-img" style={{
          position: "relative",
          height: "200px",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
          />
        </div>

        {/* Body */}
        <div style={{ padding: "1rem 1.1rem", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Brand label */}
          <p style={{
            fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#fc2779", fontWeight: 700, marginBottom: "0.3rem",
          }}>
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="kb-card-name" style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "0.95rem", lineHeight: 1.35,
            fontWeight: 400,
            marginBottom: "0.5rem",
          }}>
            {product.name}
          </h3>

          {/* Concern chips */}
          {product.concerns?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "0.7rem" }}>
              {(product.concerns as string[]).slice(0, 2).map((c) => (
                <span key={c} style={{
                  background: "#f2f7fb", color: "#4576e8",
                  border: "1px solid #d9e5f8",
                  padding: "2px 6px", borderRadius: "4px",
                  fontSize: "0.55rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  {c}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="kb-card-desc" style={{
            fontSize: "0.75rem",
            lineHeight: 1.6, marginBottom: "0.9rem",
            flex: 1,
          }}>
            {product.description ? product.description.slice(0, 100) + "…" : ""}
          </p>

          {/* Price */}
          <div style={{ marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "0.7rem" }}>
              {price && (
                <span className="kb-card-price" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.15rem" }}>
                  {price}
                </span>
              )}
              {mrp && (
                <span style={{ fontSize: "0.7rem", color: "#bbb", textDecoration: "line-through" }}>
                  {mrp}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* CTAs */}
      <div style={{ padding: "0 1.1rem 1.1rem 1.1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
          <Link
            href={`/product/${asin}`}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase",
              fontWeight: 700, color: "#fff", background: "#fc2779",
              padding: "9px 8px", borderRadius: "6px",
              textDecoration: "none",
              boxShadow: "0 3px 10px rgba(252,39,121,0.15)",
            }}
          >
            Buy
          </Link>
          <Link
            href={`/dashboard/analysis?product=${asin}`}
            className="kb-btn-analyze"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase",
              fontWeight: 700,
              padding: "9px 8px", borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Analyze
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function KBeautyPage() {
  const [activeSection, setActiveSection] = useState("all");
  const [activeBrand, setActiveBrand]     = useState("all");
  const [search, setSearch]               = useState("");

  const baseProducts = useMemo(() =>
    CATALOG.map((c) => {
      const p = PRODUCTS.find((x) => x.asin === c.asin) as any;
      return p ? { ...p, section: c.section } : null;
    }).filter(Boolean),
  []);

  const filtered = useMemo(() =>
    baseProducts.filter((p: any) => {
      const bySection = activeSection === "all" || p.section === activeSection;
      const byBrand   = activeBrand   === "all" || p.brand?.toLowerCase() === activeBrand.toLowerCase();
      const q = search.toLowerCase();
      const bySearch  = !q || p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
      return bySection && byBrand && bySearch;
    }),
  [baseProducts, activeSection, activeBrand, search]);

  return (
    <>
      <style>{`
        .kb-tab { transition: color 0.18s, border-color 0.18s; white-space: nowrap; cursor: pointer; }
        .kb-tab:hover { color: #fc2779; }
        .kb-tab.on { color: #fc2779; border-bottom-color: #fc2779; font-weight: 600; }
        .kb-pill { transition: all 0.18s; cursor: pointer; }
        .kb-pill:hover { border-color: #fc2779; }
        .kb-pill.on { background: #fc2779; color: #fff; border-color: #fc2779; }
        .kb-tool { transition: box-shadow 0.2s, transform 0.2s; }
        .kb-tool:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .nobar::-webkit-scrollbar { display:none; }
        .nobar { -ms-overflow-style:none; scrollbar-width:none; }

        .kb-video-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 16/10;
          background: #111;
        }
        @media (min-width: 768px) {
          .kb-video-container {
            aspect-ratio: 16/7;
          }
        }

        .kb-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 65%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem 1.2rem;
        }
        @media (min-width: 768px) {
          .kb-video-overlay {
            padding: 2.5rem 3rem;
            background: linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 55%);
          }
        }

        .kb-video-title {
          color: #fff;
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          font-weight: 400;
          line-height: 1.25;
          max-width: 500px;
        }
        @media (min-width: 768px) {
          .kb-video-title {
            font-size: clamp(1.4rem, 2.5vw, 2rem);
          }
        }

        .kb-editorial-card {
          background: #fcf9f5;
          border: 1px solid #ebdcd0;
          border-radius: 16px;
          padding: 3rem;
        }
        @media (max-width: 768px) {
          .kb-editorial-card {
            padding: 1.5rem 1.1rem;
          }
        }

        .kb-editorial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .kb-editorial-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .kb-editorial-inner-card {
          background: #fff;
          border: 1px solid #ebdcd0;
          border-radius: 12px;
          padding: 2rem;
        }
        @media (max-width: 768px) {
          .kb-editorial-inner-card {
            padding: 1.5rem 1.1rem;
          }
        }
        .kb-main { min-height: 100vh; background: #fffcf8; color: #2b2826; }
        .kb-hero-sec { background: #fcf9f5; border-bottom: 1px solid #ebdcd0; padding: 5rem 1.5rem 4rem; text-align: center; }
        .kb-hero-h1 { font-family: 'DM Serif Display', serif; font-size: clamp(2.2rem, 5vw, 3.5rem); line-height: 1.15; color: #2b2826; font-weight: 400; margin-bottom: 1.2rem; }
        .kb-hero-p { font-size: 1rem; color: #5c544e; line-height: 1.75; max-width: 560px; margin: 0 auto; }
        .kb-card { background: #fff; border: 1px solid #e8e2d9; }
        .kb-card-img { background: #faf8f5; border-bottom: 1px solid #f0ebe4; }
        .kb-card-name { color: #1a1714; }
        .kb-card-desc { color: #6a635d; }
        .kb-card-price { color: #1a1714; }
        .kb-btn-analyze { background: #f4efe9; color: #1a1714; }
        .kb-search-input { background: #fff; color: #2b2826; border: 1px solid #e0d8d0; }

        html.dark .kb-main, .dark .kb-main { background: #0f0e0d !important; color: #f7f5f2 !important; }
        html.dark .kb-hero-sec, .dark .kb-hero-sec { background: #161514 !important; border-bottom-color: rgba(255, 255, 255, 0.12) !important; }
        html.dark .kb-hero-h1, .dark .kb-hero-h1 { color: #ffffff !important; }
        html.dark .kb-hero-p, .dark .kb-hero-p { color: #aba49d !important; }
        html.dark .kb-card, .dark .kb-card { background: #181716 !important; border-color: rgba(255, 255, 255, 0.12) !important; }
        html.dark .kb-card-img, .dark .kb-card-img { background: #141312 !important; border-bottom-color: rgba(255, 255, 255, 0.08) !important; }
        html.dark .kb-card-name, .dark .kb-card-name { color: #ffffff !important; }
        html.dark .kb-card-desc, .dark .kb-card-desc { color: #aba49d !important; }
        html.dark .kb-card-price, .dark .kb-card-price { color: #ffffff !important; }
        html.dark .kb-btn-analyze, .dark .kb-btn-analyze { background: rgba(255,255,255,0.08) !important; color: #ffffff !important; }
        html.dark .kb-search-input, .dark .kb-search-input { background: #181716 !important; border-color: rgba(255, 255, 255, 0.15) !important; color: #f7f5f2 !important; }
        html.dark .kb-editorial-card, .dark .kb-editorial-card { background: #161514 !important; border-color: rgba(255, 255, 255, 0.12) !important; }
        html.dark .kb-editorial-card h2, .dark .kb-editorial-card h2 { color: #ffffff !important; }
        html.dark .kb-editorial-card p, .dark .kb-editorial-card p { color: #aba49d !important; }
        html.dark .kb-editorial-inner-card, .dark .kb-editorial-inner-card { background: #1c1a18 !important; border-color: rgba(255, 255, 255, 0.12) !important; }
        html.dark .kb-editorial-inner-card h3, .dark .kb-editorial-inner-card h3 { color: #ffffff !important; }
        html.dark .kb-editorial-inner-card p, .dark .kb-editorial-inner-card p { color: #aba49d !important; }
        html.dark .kb-tool, .dark .kb-tool { background: #181716 !important; border-color: rgba(255, 255, 255, 0.12) !important; }
        html.dark .kb-tool h3, .dark .kb-tool h3 { color: #ffffff !important; }
        html.dark .kb-tool p, .dark .kb-tool p { color: #aba49d !important; }
      `}</style>

      <main className="kb-main">

        {/* ── HERO ── */}
        <section className="kb-hero-sec">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <span style={{
              display: "block", fontSize: "0.65rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "#8c857f", fontWeight: 700, marginBottom: "1rem",
            }}>
              Curated K-Beauty Destination
            </span>
            <h1 className="kb-hero-h1">
              The K-Beauty{" "}
              <em style={{ color: "#fc2779", fontStyle: "italic" }}>Phenomenon</em>
            </h1>
            <p className="kb-hero-p">
              Trade high-strength chemical actives for the South Korean philosophy of gentle,
              multi-layered hydration — designed to build and protect your skin barrier.
            </p>
          </div>
        </section>

        {/* ── VIDEO SHOWCASE ── */}
        <section style={{ background: "#1a1714", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <p style={{
                fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: "0.8rem",
              }}>Inside the ritual</p>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "#fff", fontWeight: 400, lineHeight: 1.3,
              }}>
                The art of the <em style={{ color: "#fc2779", fontStyle: "italic" }}>K-Beauty layer</em>
              </h2>
            </div>

            <div className="kb-video-container">
              <video
                src="/videos/kb-lady.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transform: "scale(1.15)", // Zoom slightly to crop out the corner watermark logo
                }}
              />
              <div className="kb-video-overlay">
                <p style={{
                  color: "#fc2779", fontSize: "0.6rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  fontWeight: 700, marginBottom: "0.5rem",
                }}>Skin Care Ritual</p>
                <p className="kb-video-title">
                  Gentle layering —<br />the South Korean way
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTERS ── */}
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 0" }}>


          {/* Category tabs */}
          <div
            className="nobar"
            style={{
              display: "flex", gap: "2rem",
              overflowX: "auto",
              borderBottom: "1px solid #ebdcd0",
              paddingBottom: "0",
              marginBottom: "1.5rem",
            }}
          >
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`kb-tab${activeSection === s.id ? " on" : ""}`}
                style={{
                  background: "none", border: "none",
                  borderBottom: "2px solid transparent",
                  padding: "0.75rem 0",
                  fontSize: "0.78rem", letterSpacing: "0.04em",
                  color: activeSection === s.id ? "#fc2779" : "#8c857f",
                  fontWeight: activeSection === s.id ? 600 : 500,
                  fontFamily: "inherit",
                  borderBottomColor: activeSection === s.id ? "#fc2779" : "transparent",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Brand pills + Search */}
          <div style={{
            display: "flex", flexWrap: "wrap",
            gap: "1rem", alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #f3ede8",
          }}>
            <div className="nobar" style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflowX: "auto" }}>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "#8c857f", whiteSpace: "nowrap" }}>
                Brand
              </span>
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBrand(b.id)}
                  className={`kb-pill${activeBrand === b.id ? " on" : ""}`}
                  style={{
                    background: activeBrand === b.id ? "#fc2779" : "#fff",
                    color: activeBrand === b.id ? "#fff" : "#2b2826",
                    border: `1px solid ${activeBrand === b.id ? "#fc2779" : "#e0d8d0"}`,
                    padding: "5px 13px", borderRadius: "999px",
                    fontSize: "0.68rem", fontWeight: 600,
                    whiteSpace: "nowrap", fontFamily: "inherit",
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: "relative", width: "240px", flexShrink: 0 }}>
              <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search catalog…"
                style={{
                  width: "100%", paddingLeft: "34px", paddingRight: "12px",
                  height: "36px", border: "1px solid #e0d8d0",
                  borderRadius: "999px", fontSize: "0.75rem",
                  background: "#fff", color: "#2b2826",
                  outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        </section>

        {/* ── PRODUCT GRID ── */}
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
          <p style={{
            fontSize: "0.65rem", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#aaa",
            fontWeight: 700, marginBottom: "1.5rem",
          }}>
            Showing {filtered.length} curated products
          </p>

          {filtered.length === 0 ? (
            <div style={{
              background: "#fff", border: "1px solid #ebdcd0",
              borderRadius: "12px", padding: "4rem 2rem",
              textAlign: "center",
            }}>
              <Layers size={28} style={{ color: "#ddd", margin: "0 auto 1rem" }} />
              <p style={{ fontSize: "0.9rem", color: "#999" }}>No products match your filters.</p>
              <button
                onClick={() => { setActiveSection("all"); setActiveBrand("all"); setSearch(""); }}
                style={{
                  marginTop: "1rem", background: "none", border: "none",
                  color: "#fc2779", fontSize: "0.7rem", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "1.5rem",
              alignItems: "stretch",
            }}>
              {filtered.map((p: any) => (
                <KProductCard key={p.asin} asin={p.asin} section={p.section} />
              ))}
            </div>
          )}
        </section>

        {/* ── EDITORIAL ── */}
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
          <div className="kb-editorial-card">
            <div className="kb-editorial-grid">
              <div>
                <span style={{
                  display: "block", fontSize: "0.6rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#fc2779", fontWeight: 700, marginBottom: "0.8rem",
                }}>
                  Editorial Analysis
                </span>
                <h2 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "2rem", color: "#2b2826",
                  fontWeight: 400, lineHeight: 1.25, marginBottom: "1rem",
                }}>
                  Gentle Layering vs. Active Stripping
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#5c544e", lineHeight: 1.75, marginBottom: "0.9rem" }}>
                  Traditional routines often push high-percentage chemical peels to force cell turnover.
                  For Indian skin — high in melanin, prone to hyperpigmentation — this triggers chronic inflammation.
                </p>
                <p style={{ fontSize: "0.85rem", color: "#5c544e", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  K-beauty rebuilds the moisture barrier with sequential lightweight layers: toners,
                  Centella ampoules, and barrier-recovery creams that let skin absorb hydration without distress.
                </p>
                <Link href="/blog/glass-skin-student-budget-k-beauty" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "#fc2779", textDecoration: "none",
                }}>
                  Read K-Beauty Guide <ArrowRight size={13} />
                </Link>
              </div>

              <div className="kb-editorial-inner-card">
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.2rem", color: "#2b2826",
                  fontWeight: 400, marginBottom: "1.5rem",
                }}>
                  Minimalist K-Beauty Routine
                </h3>
                {[
                  ["First Cleansing", "Oil-based cleanse dissolves SPF and makeup."],
                  ["Second Cleansing", "Water-based foam removes residue without stripping."],
                  ["Hydration Layering", "Toner → Essence → Ampoule in thin, absorbed layers."],
                  ["Seal & Protect", "SPF-rich serum or lightweight cream locks hydration in."],
                ].map(([title, desc], i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", marginBottom: i < 3 ? "1rem" : 0 }}>
                    <span style={{
                      width: "24px", height: "24px", borderRadius: "50%",
                      background: "#fdf5f2", color: "#fc2779",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.65rem", fontWeight: 700, flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <div>
                      <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#2b2826", marginBottom: "2px" }}>{title}</p>
                      <p style={{ fontSize: "0.72rem", color: "#8c857f", lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.8rem", color: "#2b2826",
            fontWeight: 400, textAlign: "center", marginBottom: "2.5rem",
          }}>
            Verify Before You Purchase
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                icon: <BookOpen size={18} />,
                iconBg: "#fdf5f2", iconColor: "#fc2779",
                title: "Ingredient Checker",
                desc: "Are your layered actives compatible? Scan for ingredient conflicts before adding to your routine.",
                cta: "Scan Compatibility",
                href: "/tools/ingredients",
              },
              {
                icon: <Droplet size={18} />,
                iconBg: "#f2f7fb", iconColor: "#4576e8",
                title: "Hard Water Quiz",
                desc: "High mineral water strips layered hydration. Find out your city's hard water skin impact.",
                cta: "Calculate Score",
                href: "/tools/hard-water",
              },
              {
                icon: <Layers size={18} />,
                iconBg: "#fdf5f2", iconColor: "#fc2779",
                title: "Dupe Finder",
                desc: "Imported K-Beauty out of budget? Find quality Indian drugstore alternatives instantly.",
                cta: "Find Dupes",
                href: "/tools/dupes",
              },
            ].map((tool) => (
              <div key={tool.href} className="kb-tool" style={{
                background: "#fff", border: "1px solid #ebdcd0",
                borderRadius: "12px", padding: "1.8rem",
                display: "flex", flexDirection: "column",
              }}>
                <div style={{
                  width: "40px", height: "40px",
                  background: tool.iconBg, color: tool.iconColor,
                  borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1rem",
                }}>
                  {tool.icon}
                </div>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.05rem", color: "#2b2826",
                  fontWeight: 400, marginBottom: "0.6rem",
                }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "#8c857f", lineHeight: 1.65, flex: 1, marginBottom: "1.5rem" }}>
                  {tool.desc}
                </p>
                <Link href={tool.href} style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  fontSize: "0.62rem", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#fc2779", textDecoration: "none",
                }}>
                  {tool.cta} <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}

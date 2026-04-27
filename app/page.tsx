"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcat: string;
  mrp: number;
  price: number;
  rating: number;
  reviews: string;
  asin: string;
  badge?: string;
  description: string;
  specs: Record<string, string | undefined>;
  tags: string[];
  image: string;
  link?: string;
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function fmtINR(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
function discount(mrp: number, price: number) {
  return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
}
function StarRow({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: "#F5A623", fontSize: 11, letterSpacing: 1 }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Skincare", "Makeup", "Hair Care", "Body Care", "Wellness"];
const CONCERNS = ["acne", "pigmentation", "dry skin", "oily skin", "anti-ageing", "sunscreen"];

const CATEGORY_ACCENT: Record<string, string> = {
  Skincare: "#00D1FF",
  Makeup: "#E05C3A",
  "Hair Care": "#C57BFF",
  "Body Care": "#4ECBA8",
  Wellness: "#F5A623",
  All: "#E05C3A",
};

// ─── MODAL ───────────────────────────────────────────────────────────────────
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const disc = discount(product.mrp, product.price);
  const accent = CATEGORY_ACCENT[product.category] ?? "#E05C3A";
  const affLink = product.link || `https://www.amazon.in/dp/${product.asin}?tag=skinwithtanvi-21`;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.8)",
        zIndex: 200, display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "16px",
        backdropFilter: "blur(4px)",
      }}
    >
      <div style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: 12,
        width: "100%", maxWidth: 560,
        maxHeight: "90vh", overflowY: "auto",
      }}>
        {/* Image */}
        <div style={{ background: "#fff", borderRadius: "12px 12px 0 0", padding: "24px", display: "flex", justifyContent: "center" }}>
          <img src={product.image} alt={product.name}
            style={{ height: 220, objectFit: "contain", maxWidth: "100%" }} />
        </div>

        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #1E1E1E", display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <span style={{
              display: "inline-block", background: `${accent}18`, border: `1px solid ${accent}33`,
              color: accent, fontFamily: "monospace", fontSize: 8, letterSpacing: 2,
              padding: "2px 8px", borderRadius: 2, marginBottom: 8,
            }}>
              {product.subcat.toUpperCase()}
            </span>
            <h2 style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 400,
              margin: "0 0 4px", lineHeight: 1.1, letterSpacing: 1, color: "#F0F0F0",
            }}>
              {product.name}
            </h2>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#555" }}>{product.brand}</div>
          </div>
          <button onClick={onClose} style={{
            background: "transparent", border: "1px solid #2A2A2A",
            color: "#666", borderRadius: 6, width: 32, height: 32,
            cursor: "pointer", fontSize: 16, flexShrink: 0,
          }}>×</button>
        </div>

        <div style={{ padding: "20px 24px 28px" }}>
          {/* Price Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
            {[
              { label: "Price", value: fmtINR(product.price), color: "#F0F0F0", big: true },
              { label: "MRP", value: fmtINR(product.mrp), color: "#444", strike: true },
              { label: "You Save", value: disc > 0 ? `${disc}% off` : "Best Price", color: "#4ECBA8" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#1A1A1A", border: "1px solid #222", borderRadius: 8, padding: "12px" }}>
                <div style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: 2, color: "#444", marginBottom: 4 }}>
                  {s.label.toUpperCase()}
                </div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: s.big ? 24 : 18,
                  color: s.color, textDecoration: s.strike ? "line-through" : "none", letterSpacing: 1,
                }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
            padding: "10px 14px", background: "#1A1A1A", border: "1px solid #222", borderRadius: 8,
          }}>
            <StarRow rating={product.rating} />
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "#777" }}>{product.rating} · {product.reviews} reviews</span>
            {product.badge && (
              <span style={{
                marginLeft: "auto", background: `${accent}18`, border: `1px solid ${accent}33`,
                color: accent, fontFamily: "monospace", fontSize: 8, letterSpacing: 1, padding: "2px 6px", borderRadius: 2,
              }}>{product.badge}</span>
            )}
          </div>

          {/* Description */}
          <p style={{ fontSize: 13, color: "#999", lineHeight: 1.75, margin: "0 0 16px" }}>
            {product.description}
          </p>

          {/* Specs */}
          <div style={{ marginBottom: 20 }}>
            {Object.entries(product.specs).map(([k, v]) => v ? (
              <div key={k} style={{
                display: "flex", justifyContent: "space-between", gap: 12,
                padding: "8px 0", borderBottom: "1px solid #1A1A1A",
              }}>
                <span style={{ fontSize: 12, color: "#555", flexShrink: 0 }}>{k}</span>
                <span style={{ fontSize: 12, color: "#BBB", textAlign: "right", fontWeight: 500 }}>{v}</span>
              </div>
            ) : null)}
          </div>

          {/* CTA */}
          <a href={affLink} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "#FF9900", borderRadius: 8, color: "#111",
            fontSize: 13, fontWeight: 700, padding: "14px 20px",
            textDecoration: "none", width: "100%",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View on Amazon India
          </a>
          <p style={{ textAlign: "center", fontFamily: "monospace", fontSize: 9, color: "#333", marginTop: 8 }}>
            ✦ Affiliate link · Prices may vary · Prime eligible on most items
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const disc = discount(product.mrp, product.price);
  const accent = CATEGORY_ACCENT[product.category] ?? "#E05C3A";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#141414",
        border: `1px solid ${hovered ? accent : "#1E1E1E"}`,
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 24px rgba(0,0,0,0.4)` : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent line */}
      <div style={{ height: 2, background: accent, opacity: hovered ? 1 : 0.3, transition: "opacity 0.2s" }} />

      {/* Image */}
      <div style={{
        width: "100%", aspectRatio: "1 / 1",
        background: "#fff", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12px",
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%", height: "100%",
            objectFit: "contain",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Subcat + Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: 2, color: "#444", textTransform: "uppercase" }}>
            {product.subcat}
          </span>
          {product.badge && (
            <span style={{
              background: `${accent}18`, border: `1px solid ${accent}28`,
              color: accent, fontFamily: "monospace", fontSize: 7,
              letterSpacing: 1, padding: "2px 6px", borderRadius: 2,
            }}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: "clamp(15px, 2vw, 18px)",
          fontWeight: 400, margin: "0 0 2px",
          lineHeight: 1.15, letterSpacing: 0.5,
          color: "#EFEFEF",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {product.name}
        </h3>

        {/* Brand */}
        <div style={{ fontFamily: "monospace", fontSize: 9, color: "#444", marginBottom: 8 }}>
          {product.brand}
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6, marginTop: "auto" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1, color: "#F0F0F0" }}>
            {fmtINR(product.price)}
          </span>
          {disc > 0 && (
            <>
              <span style={{ fontSize: 11, color: "#3A3A3A", textDecoration: "line-through" }}>
                {fmtINR(product.mrp)}
              </span>
              <span style={{ fontSize: 10, color: "#4ECBA8", fontFamily: "monospace", fontWeight: 600 }}>
                {disc}%
              </span>
            </>
          )}
        </div>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <StarRow rating={product.rating} />
          <span style={{ fontSize: 10, color: "#444", fontFamily: "monospace" }}>
            {product.rating} · {product.reviews}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1A1A1A",
        padding: "8px 14px",
        fontFamily: "monospace", fontSize: 9,
        color: hovered ? accent : "#333",
        letterSpacing: 1,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "color 0.2s",
      }}>
        <span>VIEW DETAILS</span>
        <span>→</span>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function BeautyShopPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return (PRODUCTS as any[]).filter((p) => {
      const normalize = (s: string) => s.toLowerCase().replace(/\s/g, "");
      const catMatch = activeCategory === "All" || normalize(p.category) === normalize(activeCategory);
      const concernMatch = !selectedConcern || p.concerns?.includes(selectedConcern);
      if (!q) return catMatch && concernMatch;
      return catMatch && concernMatch && (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.subcat.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t: string) => t.includes(q))
      );
    });
  }, [query, activeCategory, selectedConcern]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 2px; }
        ::placeholder { color: #333; }
        input:focus { outline: none; }

        /* ── GRID: 4 desktop, 3 tablet, 2 mobile ── */
        .shop-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 900px) {
          .shop-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
        }
        @media (max-width: 540px) {
          .shop-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        }

        /* ── SMART PICKS: 5 desktop, 5 tablet, 3 mobile ── */
        .picks-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }
        @media (max-width: 540px) {
          .picks-grid { grid-template-columns: repeat(3, 1fr); gap: 6px; }
        }

        /* ── HERO padding ── */
        .hero-wrap { padding: 32px 40px 24px; }
        .body-wrap { padding: 28px 40px 80px; }
        @media (max-width: 640px) {
          .hero-wrap { padding: 24px 16px 20px; }
          .body-wrap { padding: 20px 16px 60px; }
        }

        /* ── CATEGORY PILLS ── */
        .cat-scroll {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        @media (max-width: 540px) {
          .cat-scroll {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .cat-scroll::-webkit-scrollbar { display: none; }
        }

        /* ── CONCERN PILLS ── */
        .concern-scroll {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        @media (max-width: 540px) {
          .concern-scroll {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .concern-scroll::-webkit-scrollbar { display: none; }
        }
      `}</style>

      <div style={{ background: "#0A0A0A", minHeight: "100vh", color: "#F0F0F0", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>

        {/* ── HERO ── */}
        <div style={{ borderBottom: "1px solid #161616", maxWidth: 1200, margin: "0 auto" }} className="hero-wrap">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#E05C3A", letterSpacing: "3px", marginBottom: 10 }}>
                MIRHA &amp; CO. / BEAUTY SHOP
              </div>
              <h1 style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(44px, 7vw, 80px)",
                fontWeight: 400, lineHeight: 0.92,
                margin: 0, letterSpacing: 2, color: "#F0F0F0",
              }}>
                BEAUTY<br />
                <span style={{ color: "#E05C3A" }}>PICKS.</span>
              </h1>
            </div>
            <div style={{ maxWidth: 360 }}>
              <p style={{ color: "#555", fontSize: 14, lineHeight: 1.75, margin: "0 0 12px" }}>
                Hand-picked skincare, makeup, and hair care from Amazon India.
                Real prices, honest picks.
              </p>
              
              <div style={{ display: "flex", gap: 16, fontFamily: "monospace", fontSize: 9, color: "#2A2A2A" }}>
                <span>✦ CURATED</span>
                <span>✦ REAL PRICES</span>
                <span>✦ INDIA ONLY</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto" }} className="body-wrap">

          {/* Routine banner */}
          <div style={{
  border: "1px solid #1A1A1A",
  padding: "16px 18px",
  marginBottom: "24px",
  background: "#111",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "10px"
}}>
  <div>
    <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
      Not sure what works for your skin?
    </p>
    <p style={{ fontSize: 10, color: "#333", marginTop: 4, fontFamily: "monospace" }}>
      Get a personalized routine in seconds
    </p>
  </div>

  <a href="/tools/routine" style={{
    background: "#E05C3A",
    color: "#fff",
    padding: "8px 14px",
    fontSize: 10,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    textDecoration: "none",
    borderRadius: 4,
    fontFamily: "monospace",
  }}>
    Get your routine →
  </a>
</div>

          {/* Search */}
          <div style={{
            background: "#111", border: "1px solid #1E1E1E", borderRadius: 8,
            display: "flex", alignItems: "center", gap: 12, padding: "0 14px", marginBottom: 16,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — serum, moisturiser, kajal, hair oil..."
              style={{
                flex: 1, background: "transparent", border: "none",
                color: "#F0F0F0", fontSize: 13, padding: "14px 0",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{
                background: "none", border: "none", cursor: "pointer", color: "#333", fontSize: 20,
              }}>×</button>
            )}
          </div>

          {/* Category filters */}
          <div className="cat-scroll">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              const acc = CATEGORY_ACCENT[cat] ?? "#E05C3A";
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  background: active ? `${acc}18` : "transparent",
                  border: `1px solid ${active ? acc : "#1E1E1E"}`,
                  borderRadius: 4, padding: "6px 14px",
                  fontSize: 10, color: active ? acc : "#444",
                  cursor: "pointer", fontFamily: "monospace",
                  letterSpacing: 1, transition: "all 0.15s",
                  whiteSpace: "nowrap", flexShrink: 0,
                }}>
                  {cat.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Concern filters */}
          <div className="concern-scroll">
            {CONCERNS.map((c) => {
              const active = selectedConcern === c;
              return (
                <button key={c} onClick={() => setSelectedConcern(active ? null : c)} style={{
                  background: active ? "#7C3AED22" : "transparent",
                  border: `1px solid ${active ? "#7C3AED" : "#1E1E1E"}`,
                  borderRadius: 20, padding: "5px 12px",
                  fontSize: 10, color: active ? "#A78BFA" : "#444",
                  cursor: "pointer", fontFamily: "monospace",
                  whiteSpace: "nowrap", flexShrink: 0,
                  transition: "all 0.15s",
                }}>
                  {c}
                </button>
              );
            })}
            {selectedConcern && (
              <button onClick={() => setSelectedConcern(null)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 10, color: "#333", fontFamily: "monospace",
                flexShrink: 0,
              }}>
                ✕ clear
              </button>
            )}
          </div>

          {/* Smart Picks */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 2, color: "#2A2A2A", marginBottom: 10 }}>
              EDITOR'S PICKS
            </div>
            <div className="picks-grid">
              {(PRODUCTS as any[]).slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  style={{
                    background: "#fff", borderRadius: 8,
                    aspectRatio: "1/1", overflow: "hidden",
                    cursor: "pointer", border: "1px solid #1A1A1A",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "8px",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img src={p.image} alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Results header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 24,
              fontWeight: 400, letterSpacing: 2, color: "#F0F0F0", margin: 0,
            }}>
              {activeCategory === "All" ? "ALL PRODUCTS" : activeCategory.toUpperCase()}
              {selectedConcern && <span style={{ color: "#7C3AED", fontSize: 18, marginLeft: 8 }}>/ {selectedConcern.toUpperCase()}</span>}
            </h2>
            <span style={{ fontFamily: "monospace", fontSize: 10, color: "#2A2A2A", letterSpacing: 1 }}>
              {filtered.length} ITEM{filtered.length !== 1 ? "S" : ""}
            </span>
          </div>

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="shop-grid">
              {filtered.map((p: any) => (
                <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />
              ))}
            </div>
          ) : (
            <div style={{
              background: "#111", border: "1px solid #1A1A1A",
              borderRadius: 8, padding: "48px 24px", textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 3, color: "#1E1E1E", marginBottom: 8 }}>
                NO PRODUCTS FOUND
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: "#333" }}>
                Try a different keyword or filter
              </div>
              <button onClick={() => { setQuery(""); setActiveCategory("All"); setSelectedConcern(null); }} style={{
                marginTop: 16, background: "transparent", border: "1px solid #1E1E1E",
                borderRadius: 4, color: "#555", fontFamily: "monospace",
                fontSize: 10, letterSpacing: 2, padding: "8px 16px", cursor: "pointer",
              }}>
                ← CLEAR FILTERS
              </button>
            </div>
          )}

          {/* Footer */}
          <div style={{
            marginTop: 48, paddingTop: 20, borderTop: "1px solid #141414",
            fontFamily: "monospace", fontSize: 9, color: "#222", lineHeight: 1.8,
          }}>
            ✦ Affiliate links disclosed. Prices shown are approximate and may change on Amazon.
            Independent reviews — honest opinions only.
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct as Product} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
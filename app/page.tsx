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
    <span style={{ color: "#F5A623", fontSize: 13, letterSpacing: 1 }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}


// ─── CATEGORIES ──────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Skincare", "Makeup", "Hair Care", "Body Care", "Wellness"];

const CATEGORY_ACCENT: Record<string, string> = {
  Skincare: "#00D1FF",
  Makeup: "#E05C3A",
  "Hair Care": "#C57BFF",
  "Body Care": "#4ECBA8",
  Wellness: "#F5A623",
  All: "#E05C3A",
};

// ─── MODAL COMPONENT ─────────────────────────────────────────────────────────
function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const disc = discount(product.mrp, product.price);
  const accent = CATEGORY_ACCENT[product.category] ?? "#E05C3A";
  const affLink =
  product.link ||
  `https://www.amazon.in/dp/${product.asin}?tag=skinwithtanvi-21`;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#161616",
          border: "1px solid #2D2D2D",
          borderRadius: 6,
          width: "100%",
          maxWidth: 640,
          maxHeight: "88vh",
          overflowY: "auto",
        }}
      >
        <img
    src={product.image}
    alt={product.name}
    style={{
  width: "100%",
  maxHeight: 320,
  objectFit: "contain", // ✅ IMPORTANT
  background: "#fff"
}}
  />

        {/* Modal Header */}
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid #222",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "inline-block",
                background: `${accent}18`,
                border: `1px solid ${accent}33`,
                color: accent,
                fontFamily: "monospace",
                fontSize: 9,
                letterSpacing: 2,
                padding: "3px 10px",
                borderRadius: 2,
                marginBottom: 10,
              }}
            >
              {product.subcat.toUpperCase()}
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', 'Arial Narrow', Impact, sans-serif",
                fontSize: "clamp(22px, 4vw, 30px)",
                fontWeight: 400,
                margin: "0 0 4px",
                lineHeight: 1.1,
                letterSpacing: 1,
                color: "#F0F0F0",
              }}
            >
              {product.name}
            </h2>
            <div
              style={{ fontFamily: "monospace", fontSize: 11, color: "#666" }}
            >
              {product.brand}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid #333",
              color: "#666",
              borderRadius: 4,
              width: 34,
              height: 34,
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: "24px 28px 32px" }}>
          {/* Price Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              {
                label: "Price",
                value: fmtINR(product.price),
                color: "#F0F0F0",
                big: true,
              },
              {
                label: "MRP",
                value: fmtINR(product.mrp),
                color: "#555",
                strike: true,
              },
              {
                label: "You Save",
                value: disc > 0 ? `${disc}% off` : "Best Price",
                color: "#4ECBA8",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#1E1E1E",
                  border: "1px solid #2A2A2A",
                  borderRadius: 4,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    letterSpacing: 2,
                    color: "#555",
                    marginBottom: 6,
                  }}
                >
                  {s.label.toUpperCase()}
                </div>
                <div
                  style={{
                    fontFamily:
                      "'Bebas Neue', 'Arial Narrow', sans-serif",
                    fontSize: s.big ? 28 : 22,
                    color: s.color,
                    textDecoration: s.strike ? "line-through" : "none",
                    letterSpacing: 1,
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              padding: "12px 16px",
              background: "#1A1A1A",
              border: "1px solid #2A2A2A",
              borderRadius: 4,
            }}
          >
            <StarRow rating={product.rating} />
            <span
  style={{
    fontFamily: "monospace",
    fontSize: 12,
    color: "#888",
  }}
>
  {product.rating} ★ rating
</span>
            {product.badge && (
              <span
                style={{
                  marginLeft: "auto",
                  background: `${accent}18`,
                  border: `1px solid ${accent}33`,
                  color: accent,
                  fontFamily: "monospace",
                  fontSize: 9,
                  letterSpacing: 1,
                  padding: "3px 8px",
                  borderRadius: 2,
                }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: 2,
                color: "#555",
                marginBottom: 10,
                paddingBottom: 8,
                borderBottom: "1px solid #222",
              }}
            >
              ABOUT THIS PRODUCT
            </div>
            <p
              style={{
                fontSize: 14,
                color: "#AAA",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {product.description}
            </p>
          </div>

          {/* Specs */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: 2,
                color: "#555",
                marginBottom: 10,
                paddingBottom: 8,
                borderBottom: "1px solid #222",
              }}
            >
              KEY DETAILS
            </div>
            {Object.entries(product.specs).map(([k, v]) =>
  v ? (
    <div
      key={k}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        padding: "9px 0",
        borderBottom: "1px solid #1E1E1E",
      }}
    >
      <span
        style={{
          fontSize: 13,
          color: "#666",
          flexShrink: 0,
        }}
      >
        {k}
      </span>
      <span
        style={{
          fontSize: 13,
          color: "#CCC",
          textAlign: "right",
          fontWeight: 500,
        }}
      >
        {v}
      </span>
    </div>
  ) : null
)}

</div>

          {/* CTA */}
          <a
            href={affLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "#FF9900",
              border: "none",
              borderRadius: 4,
              color: "#111",
              fontSize: 15,
              fontWeight: 600,
              padding: "16px 24px",
              textDecoration: "none",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111"
              strokeWidth="2"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View on Amazon India
          </a>
                    <p
            style={{
              textAlign: "center",
              fontFamily: "monospace",
              fontSize: 10,
              color: "#444",
              marginTop: 10,
            }}
          >
            ✦ Affiliate link · Prices may vary · Prime eligible on most items
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  const disc = discount(product.mrp, product.price);
  const accent = CATEGORY_ACCENT[product.category] ?? "#E05C3A";
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      style={{
        background: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: 6,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.15s, transform 0.15s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        setHover(true);
        (e.currentTarget as HTMLDivElement).style.borderColor = accent;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        setHover(false);
        (e.currentTarget as HTMLDivElement).style.borderColor = "#2A2A2A";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {hover && (
        <div style={{ position: "absolute", inset: 0, background: "#111", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s ease" }}>
          <img src={product.image} />
        </div>
      )}

      {/* Card top accent bar */}
      <div style={{ height: 2, background: accent, opacity: 0.4 }} />
      {/* PRODUCT IMAGE */}
<div style={{ width: "100%", height: 180, overflow: "hidden", background: "#111" }}>
  <img
    src={product.image}
    alt={product.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      transition: "transform 0.3s ease",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
    }}
  />
</div>

      <div style={{ padding: "20px 20px 18px" }}>
        {/* Badge + Category */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 9,
              letterSpacing: 2,
              color: "#555",
              textTransform: "uppercase",
            }}
          >
            {product.subcat}
          </span>
          {product.badge && (
            <span
              style={{
                background: `${accent}18`,
                border: `1px solid ${accent}30`,
                color: accent,
                fontFamily: "monospace",
                fontSize: 8,
                letterSpacing: 1,
                padding: "2px 7px",
                borderRadius: 2,
              }}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          style={{
            fontFamily:
              "'Bebas Neue', 'Arial Narrow', Impact, sans-serif",
            fontSize: "clamp(18px, 2.5vw, 22px)",
            fontWeight: 400,
            margin: "0 0 4px",
            lineHeight: 1.15,
            letterSpacing: 1,
            color: "#F0F0F0",
          }}
        >
          {product.name}
        </h3>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#555",
            marginBottom: 14,
          }}
        >
          {product.brand}
        </div>

        {/* Description preview */}
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.6,
            margin: "0 0 18px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        {/* Price */}
        <div
          style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
              fontSize: 28,
              letterSpacing: 1,
              color: "#F0F0F0",
            }}
          >
            {fmtINR(product.price)}
          </span>
          {disc > 0 && (
            <>
              <span
                style={{ fontSize: 13, color: "#555", textDecoration: "line-through" }}
              >
                {fmtINR(product.mrp)}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#4ECBA8",
                  fontFamily: "monospace",
                  fontWeight: 600,
                }}
              >
                {disc}% off
              </span>
            </>
          )}
        </div>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StarRow rating={product.rating} />
          <span
            style={{
              fontSize: 12,
              color: "#555",
              fontFamily: "monospace",
            }}
          >
            {product.rating} · {product.reviews}
          </span>
        </div>
      </div>

      {/* View button */}
      <div
        style={{
          borderTop: "1px solid #222",
          padding: "12px 20px",
          fontFamily: "monospace",
          fontSize: 11,
          color: "#555",
          letterSpacing: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>VIEW DETAILS</span>
        <span style={{ color: accent }}>→</span>
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

  return PRODUCTS.filter((p) => {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/\s/g, "");

    const catMatch =
      activeCategory === "All" ||
      normalize(p.category) === normalize(activeCategory);

    const concernMatch =
      !selectedConcern ||
      p.concerns?.includes(selectedConcern);

    if (!q) return catMatch && concernMatch;

    return (
      catMatch &&
      concernMatch &&
      (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.subcat.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t: string) => t.includes(q))
      )
    );
  });
}, [query, activeCategory, selectedConcern]);

  return (
    <>
      {/* ── Google Font ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        ::placeholder { color: #444; }
        input:focus { outline: none; }
        .product-grid-inner { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
          gap: 16px; 
        }
      `}</style>

      <div
        style={{
          background: "#0F0F0F",
          minHeight: "100vh",
          fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
          color: "#F0F0F0",
        }}
      >
        {/* ── HERO ── */}
        <div
          style={{
            borderBottom: "1px solid #1E1E1E",
            padding: "32px 40px 24px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#E05C3A",
                  letterSpacing: "3px",
                  marginBottom: 14,
                }}
              >
                MIRHA &amp; CO. / BEAUTY SHOP
              </div>
              <h1
                style={{
                  fontFamily:
                    "'Bebas Neue', 'Arial Narrow', Impact, sans-serif",
                  fontSize: "clamp(52px, 8vw, 88px)",
                  fontWeight: 400,
                  lineHeight: 0.9,
                  margin: 0,
                  letterSpacing: 2,
                  color: "#F0F0F0",
                }}
              >
                BEAUTY
                <br />
                <span style={{ color: "#E05C3A" }}>PICKS.</span>
              </h1>
            </div>
            <div style={{ maxWidth: 400 }}>
              <p
                style={{
                  color: "#777",
                  fontSize: 15,
                  lineHeight: 1.75,
                  margin: "0 0 16px",
                }}
              >
                Hand-picked skincare, makeup, and hair care from Amazon India.
                Real prices, honest picks — every link takes you straight to the
                product.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "#444",
                }}
              >
                <span>✦ CURATED PICKS</span>
                <span>✦ REAL PRICES</span>
                <span>✦ INDIA ONLY</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "36px 40px 80px",
          }}
        >
          {/* ── SEARCH ── */}
          <div
            style={{
              background: "#1A1A1A",
              border: "1px solid #2D2D2D",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "0 16px",
              marginBottom: 20,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — serum, moisturiser, kajal, hair oil, sunscreen..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "#F0F0F0",
                fontSize: 15,
                padding: "18px 0",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#555",
                  fontSize: 22,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* ── CATEGORY FILTERS ── */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 32,
            }}
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              const accent = CATEGORY_ACCENT[cat] ?? "#E05C3A";
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: active ? `${accent}18` : "transparent",
                    border: `1px solid ${active ? accent : "#2D2D2D"}`,
                    borderRadius: 2,
                    padding: "8px 18px",
                    fontSize: 13,
                    color: active ? accent : "#666",
                    cursor: "pointer",
                    fontFamily: "monospace",
                    letterSpacing: 1,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        accent;
                      (e.currentTarget as HTMLButtonElement).style.color =
                        accent;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#2D2D2D";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#666";
                    }
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              );
            })}
          </div>
          
          {/* ── CONCERN FILTERS ── */}
<div
  style={{
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 24,
  }}
>
  {["acne","pigmentation","dry skin","oily skin","anti-ageing","sunscreen"].map((c) => {
    const active = selectedConcern === c;

    return (
      <button
        key={c}
        onClick={() => setSelectedConcern(c)}
        style={{
          background: active ? "#7C3AED22" : "transparent",
          border: `1px solid ${active ? "#7C3AED" : "#2D2D2D"}`,
          borderRadius: 20,
          padding: "6px 14px",
          fontSize: 12,
          color: active ? "#A78BFA" : "#666",
          cursor: "pointer",
        }}
      >
        {c}
      </button>
    );
  })}

  <button
    onClick={() => setSelectedConcern(null)}
    style={{
      marginLeft: 10,
      fontSize: 12,
      color: "#999",
    }}
  >
    Clear
  </button>
</div>
          {/* ── TOP PICKS ── */}
<div style={{ marginBottom: 28 }}>
  <h3 style={{
    fontFamily: "monospace",
    fontSize: 12,
    letterSpacing: 2,
    color: "#888",
    marginBottom: 12
  }}>
    EDITOR'S PICKS
  </h3>

  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
    {PRODUCTS.slice(0, 5).map((p) => (
      <div key={p.id} onClick={() => setSelectedProduct(p)}>
        <img src={p.image} style={{ width: "100%", borderRadius: 4 }} />
      </div>
    ))}
  </div>
</div>
          {/* ── RESULTS HEADER ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 20,
            }}
          >
            <h2
              style={{
                fontFamily:
                  "'Bebas Neue', 'Arial Narrow', sans-serif",
                fontSize: 28,
                fontWeight: 400,
                letterSpacing: 2,
                color: "#F0F0F0",
                margin: 0,
              }}
            >
              {activeCategory === "All" ? "ALL PRODUCTS" : activeCategory.toUpperCase()}
            </h2>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#555",
                letterSpacing: 1,
              }}
            >
              {filtered.length} PRODUCT{filtered.length !== 1 ? "S" : ""}
            </span>
          </div>

          {/* ── PRODUCT GRID ── */}
          {filtered.length > 0 ? (
            <div className="product-grid-inner">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={() => setSelectedProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                background: "#141414",
                border: "1px solid #1E1E1E",
                borderRadius: 4,
                padding: "60px 32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "'Bebas Neue', 'Arial Narrow', sans-serif",
                  fontSize: 22,
                  letterSpacing: 3,
                  color: "#2A2A2A",
                  marginBottom: 8,
                }}
              >
                NO PRODUCTS FOUND
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#444",
                }}
              >
                Try a different keyword or select a different category
              </div>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                style={{
                  marginTop: 20,
                  background: "transparent",
                  border: "1px solid #2D2D2D",
                  borderRadius: 2,
                  color: "#888",
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: 2,
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                ← CLEAR FILTERS
              </button>
            </div>
          )}

          {/* ── FOOTER NOTE ── */}
          <div
            style={{
              marginTop: 60,
              paddingTop: 24,
              borderTop: "1px solid #1E1E1E",
              fontFamily: "monospace",
              fontSize: 11,
              color: "#333",
              lineHeight: 1.8,
            }}
          >
            ✦ Affiliate links disclosed. Prices shown are approximate and may
            change on Amazon. Independent reviews — honest opinions only.
          </div>
        </div>
      </div>

      {/* ── PRODUCT MODAL ── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

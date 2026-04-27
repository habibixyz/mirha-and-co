"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

type Product = (typeof PRODUCTS)[number];

const CATEGORIES = ["All", "Skincare", "Makeup", "Hair Care", "Body Care", "Wellness"];
const CONCERNS = ["acne", "pigmentation", "dryness", "oily skin", "dullness", "sunscreen"];

const CATEGORY_ACCENT: Record<string, string> = {
  Skincare: "#E05C3A",
  Makeup: "#C57BFF",
  "Hair Care": "#4ECBA8",
  "Body Care": "#F5A623",
  Wellness: "#8EB7FF",
  All: "#E05C3A",
};

const concernAliases: Record<string, string[]> = {
  acne: ["acne", "breakout", "pimple", "pores", "congestion"],
  pigmentation: ["pigmentation", "dark spots", "acne marks", "brightening", "uneven tone"],
  dryness: ["dryness", "dry skin", "dehydration", "hydration", "barrier"],
  "oily skin": ["oily", "oily skin", "oiliness", "sebum", "pores"],
  dullness: ["dullness", "glow", "brightening", "uneven tone"],
  sunscreen: ["sunscreen", "spf", "uv", "no white cast"],
};

function fmtINR(n: number) {
  return "Rs " + Math.round(n).toLocaleString("en-IN");
}

function discount(mrp: number, price: number) {
  return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function getProductText(product: Product) {
  return [
    product.name,
    product.brand,
    product.category,
    product.subcat,
    product.description,
    ...(product.tags || []),
    ...((product as any).concerns || []),
    ...((product as any).skinTypes || []),
    ...((product as any).ingredients || []),
    ...((product as any).bestFor || []),
  ]
    .join(" ")
    .toLowerCase();
}

function productMatchesQuery(product: Product, query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return true;

  const searchText = getProductText(product);
  return q.split(" ").every((term) => searchText.includes(term));
}

function productMatchesConcern(product: Product, selectedConcern: string | null) {
  if (!selectedConcern) return true;

  const productText = getProductText(product);
  const aliases = concernAliases[selectedConcern] || [selectedConcern];

  return aliases.some((term) => productText.includes(term.toLowerCase()));
}

function ProductCard({ product }: { product: Product }) {
  const accent = CATEGORY_ACCENT[product.category] ?? "#E05C3A";
  const save = discount(product.mrp, product.price);
  const bestFor = ((product as any).bestFor || []).slice(0, 2);

  return (
    <Link href={`/product/${product.asin}`} className="product-card" style={{ ["--accent" as string]: accent }}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-body">
        <div className="product-meta-row">
          <span>{product.subcat}</span>
          {product.badge ? <b>{product.badge}</b> : null}
        </div>
        <h3>{product.name}</h3>
        <p className="brand">{product.brand}</p>
        <p className="best-for">{bestFor.length ? bestFor.join(" / ") : product.description}</p>
        <div className="price-row">
          <span>{fmtINR(product.price)}</span>
          {save > 0 ? <em>{save}% off</em> : null}
        </div>
      </div>
      <div className="product-footer">
        <span>View details</span>
        <ArrowRight size={13} />
      </div>
    </Link>
  );
}

function PickTile({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.asin}`} className="pick-tile">
      <img src={product.image} alt={product.name} />
      <span>{product.badge || product.subcat}</span>
    </Link>
  );
}

export default function BeautyShopPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const categoryMatch =
        activeCategory === "All" || normalize(product.category) === normalize(activeCategory);

      return (
        categoryMatch &&
        productMatchesConcern(product, selectedConcern) &&
        productMatchesQuery(product, query)
      );
    });
  }, [query, activeCategory, selectedConcern]);

  const editorPicks = PRODUCTS.slice(0, 5);

  return (
    <main className="shop-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .shop-page {
          min-height: 100vh;
          background: #090909;
          color: #f2f0ec;
          font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
        }

        .shop-shell {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }

        .hero {
          min-height: 460px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 440px;
          align-items: end;
          gap: 60px;
          padding-top: 72px;
          padding-bottom: 44px;
          border-bottom: 1px solid #181818;
        }

        .eyebrow {
          font-family: monospace;
          font-size: 10px;
          color: #e05c3a;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin: 0 0 14px;
        }

        .hero h1 {
          font-family: 'Bebas Neue', Impact, sans-serif;
          font-size: clamp(64px, 10vw, 122px);
          line-height: 0.84;
          letter-spacing: 2px;
          font-weight: 400;
          margin: 0;
        }

        .hero h1 span { color: #e05c3a; }

        .hero-copy {
          color: #68635e;
          font-size: 15px;
          line-height: 1.8;
          max-width: 390px;
          margin: 0 0 20px;
        }

        .trust-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          color: #333;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .start-hub {
          background: #101010;
          border: 1px solid #1c1c1c;
          border-radius: 10px;
          padding: 22px;
          margin: -22px 0 28px;
          position: relative;
          z-index: 2;
        }

        .start-head {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          flex-wrap: wrap;
        }

        .start-head h2 {
          font-family: 'Bebas Neue', Impact, sans-serif;
          font-size: clamp(34px, 5vw, 54px);
          line-height: 0.9;
          letter-spacing: 1.4px;
          font-weight: 400;
          margin: 0;
        }

        .start-head h2 span { color: #e05c3a; }

        .start-head p {
          color: #666;
          font-size: 13px;
          line-height: 1.7;
          max-width: 520px;
          margin: 10px 0 0;
        }

        .action-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .primary-link,
        .secondary-link {
          text-decoration: none;
          border-radius: 5px;
          padding: 12px 16px;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .primary-link {
          background: #e05c3a;
          color: #fff;
        }

        .secondary-link {
          background: transparent;
          color: #aaa;
          border: 1px solid #2a2a2a;
        }

        .shop-search {
          background: #0d0d0d;
          border: 1px solid #222;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 14px;
          margin-top: 18px;
        }

        .shop-search input {
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
          color: #f2f0ec;
          padding: 15px 0;
          font-size: 13px;
        }

        .shop-search button {
          background: none;
          border: 0;
          color: #666;
          cursor: pointer;
          font-size: 18px;
        }

        .filters-wrap {
          padding: 8px 0 24px;
        }

        .filter-label {
          font-family: monospace;
          color: #333;
          font-size: 9px;
          letter-spacing: 2px;
          margin: 0 0 10px;
          text-transform: uppercase;
        }

        .filter-row {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .filter-row button {
          background: transparent;
          border: 1px solid #202020;
          color: #555;
          border-radius: 999px;
          padding: 7px 13px;
          font-family: monospace;
          font-size: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-row button.active {
          border-color: #e05c3a;
          background: rgba(224,92,58,0.12);
          color: #e05c3a;
        }

        .section-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin: 24px 0 14px;
        }

        .section-head h2 {
          font-family: 'Bebas Neue', Impact, sans-serif;
          font-size: 30px;
          font-weight: 400;
          letter-spacing: 2px;
          margin: 0;
        }

        .section-head span {
          color: #333;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .picks-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 28px;
        }

        .pick-tile {
          background: #fff;
          border: 1px solid #1a1a1a;
          border-radius: 9px;
          min-height: 190px;
          padding: 14px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s, border-color 0.2s;
        }

        .pick-tile:hover {
          transform: translateY(-3px);
          border-color: #e05c3a;
        }

        .pick-tile img {
          width: 100%;
          height: 150px;
          object-fit: contain;
        }

        .pick-tile span {
          color: #111;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          opacity: 0.62;
        }

        .shop-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .product-card {
          --accent: #e05c3a;
          background: #141414;
          border: 1px solid #1f1f1f;
          border-radius: 10px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }

        .product-card:hover {
          border-color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.35);
        }

        .product-card::before {
          content: "";
          display: block;
          height: 2px;
          background: var(--accent);
          opacity: 0.55;
        }

        .product-image {
  background: #fff;
  aspect-ratio: 1 / 1;
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image img {
  width: 82%;
  height: 82%;
  max-width: 220px;
  max-height: 220px;
  object-fit: contain;
  object-position: center;
}


        .product-body {
          padding: 13px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .product-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-family: monospace;
          font-size: 8px;
          color: #444;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .product-meta-row b {
          color: var(--accent);
          font-weight: 600;
        }

        .product-body h3 {
          font-size: 16px;
          line-height: 1.25;
          margin: 0;
          color: #f2f0ec;
        }

        .brand {
          font-family: monospace;
          color: #444;
          font-size: 9px;
          margin: 0;
        }

        .best-for {
          color: #68635e;
          font-size: 11px;
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .price-row {
          margin-top: auto;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .price-row span {
          font-family: 'Bebas Neue', Impact, sans-serif;
          color: #f2f0ec;
          font-size: 24px;
          letter-spacing: 1px;
        }

        .price-row em {
          color: #4ecba8;
          font-size: 10px;
          font-style: normal;
          font-family: monospace;
        }

        .product-footer {
          border-top: 1px solid #1f1f1f;
          padding: 9px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #333;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .product-card:hover .product-footer {
          color: var(--accent);
        }

        .empty-state {
          background: #111;
          border: 1px solid #1f1f1f;
          border-radius: 10px;
          padding: 56px 24px;
          text-align: center;
        }

        .empty-state h3 {
          font-family: 'Bebas Neue', Impact, sans-serif;
          color: #2a2a2a;
          letter-spacing: 3px;
          font-size: 28px;
          margin: 0 0 8px;
        }

        .empty-state p {
          color: #444;
          margin: 0 0 18px;
        }

        .empty-state button {
          background: transparent;
          border: 1px solid #2a2a2a;
          color: #777;
          border-radius: 5px;
          padding: 10px 16px;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
        }

        .footer-note {
          margin-top: 48px;
          padding: 22px 0 0;
          border-top: 1px solid #151515;
          color: #2a2a2a;
          font-family: monospace;
          font-size: 9px;
          line-height: 1.8;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        @media (max-width: 980px) {
          .shop-shell { padding: 0 22px 64px; }
          .hero {
            grid-template-columns: 1fr;
            min-height: auto;
            gap: 28px;
            padding-top: 54px;
          }
          .picks-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .shop-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 620px) {
          .shop-shell { padding: 0 16px 56px; }
          .hero { padding-bottom: 36px; }
          .start-hub { margin-top: 0; padding: 16px; }
          .picks-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .shop-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
          .product-body h3 { font-size: 14px; }
          .section-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 4px;
            .product-image {
  padding: 14px;
}

.product-image img {
  width: 78%;
  height: 78%;
  max-width: 150px;
  max-height: 150px;
}
.product-card {
  min-height: 520px;
}

.product-body {
  min-height: 210px;
}

@media (max-width: 620px) {
  .product-card {
    min-height: 430px;
  }

  .product-body {
    min-height: 190px;
  }
}

          }
        }
      `}</style>

      <div className="shop-shell">
        <section className="hero">
          <div>
            <p className="eyebrow">Mirha & Co. / Beauty Intelligence</p>
            <h1>
              Beauty
              <br />
              <span>without guesswork.</span>
            </h1>
          </div>

          <div>
            <p className="hero-copy">
              Search products, build routines, and shop curated picks with ingredient context for Indian skin, Indian budgets, and Indian weather.
            </p>
            <div className="trust-row">
              <span>Curated</span>
              <span>Ingredient-led</span>
              <span>Affiliate disclosed</span>
            </div>
          </div>
        </section>

        <section className="start-hub">
          <div className="start-head">
            <div>
              <p className="eyebrow">Start here</p>
              <h2>
                Find what works.
                <br />
                <span>Skip what doesn&apos;t.</span>
              </h2>
              <p>
                Start with your concern, then let Mirha point you to the right routine, guide, or product.
              </p>

              <div className="action-row">
                <Link href="/search" className="primary-link">
                  Open Mirha Search <ArrowRight size={14} />
                </Link>
                <Link href="/tools/routine" className="secondary-link">
                  Build Routine
                </Link>
                <Link href="/blog" className="secondary-link">
                  Read Guides
                </Link>
              </div>
            </div>
          </div>

          <div className="shop-search">
            <Search size={16} color="#555" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Quick shop search - sunscreen, niacinamide, moisturiser..."
            />
            {query ? <button onClick={() => setQuery("")}>x</button> : null}
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Editor&apos;s Picks</h2>
            <span>Products worth starting with</span>
          </div>

          <div className="picks-grid">
            {editorPicks.map((product) => (
              <PickTile key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="filters-wrap" id="products">
          <p className="filter-label">Shop by category</p>
          <div className="filter-row">
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  className={active ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="filter-label">Shop by concern</p>
          <div className="filter-row">
            {CONCERNS.map((concern) => {
              const active = selectedConcern === concern;

              return (
                <button
                  key={concern}
                  className={active ? "active" : ""}
                  onClick={() => setSelectedConcern(active ? null : concern)}
                >
                  {concern}
                </button>
              );
            })}

            {selectedConcern ? (
              <button onClick={() => setSelectedConcern(null)}>clear</button>
            ) : null}
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>
              {activeCategory === "All" ? "All Products" : activeCategory}
              {selectedConcern ? <span style={{ color: "#E05C3A" }}> / {selectedConcern}</span> : null}
            </h2>
            <span>{filtered.length} item{filtered.length === 1 ? "" : "s"}</span>
          </div>

          {filtered.length ? (
            <div className="shop-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try a broader keyword or clear your filters.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                  setSelectedConcern(null);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <p className="footer-note">
          Affiliate links disclosed. Prices may change on Amazon. Mirha & Co. curates products using ingredient context, suitability, and real-world usefulness.
        </p>
      </div>
    </main>
  );
}

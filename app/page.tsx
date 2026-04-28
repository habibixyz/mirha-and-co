"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

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
  specs?: Record<string, string>;
  tags?: string[];
  concerns?: string[];
  skinTypes?: string[];
  ingredients?: string[];
  bestFor?: string[];
  notIdealFor?: string[];
  image: string;
  link?: string;
};

const PRODUCT_LIST = PRODUCTS as unknown as Product[];

const CATEGORIES = ["All", "Skincare", "Makeup", "Hair Care", "Body Care", "Wellness"];

const CONCERNS = [
  {
    id: "acne",
    label: "Acne",
    text: "Breakouts, congestion, acne marks, pore care.",
  },
  {
    id: "pigmentation",
    label: "Pigmentation",
    text: "Dark spots, uneven tone, brightening routines.",
  },
  {
    id: "oily skin",
    label: "Oily Skin",
    text: "Light textures, oil control, no heavy finish.",
  },
  {
    id: "dryness",
    label: "Dry / Sensitive",
    text: "Barrier support, hydration, gentler formulas.",
  },
  {
    id: "dullness",
    label: "Dullness",
    text: "Glow, texture, tired-looking skin.",
  },
  {
    id: "sunscreen",
    label: "Sunscreen",
    text: "Daily SPF picks for Indian weather.",
  },
];

const CONCERN_ALIASES: Record<string, string[]> = {
  acne: ["acne", "breakout", "pimple", "pores", "congestion", "blemish"],
  pigmentation: ["pigmentation", "dark spots", "acne marks", "brightening", "uneven tone", "melasma"],
  dryness: ["dryness", "dry skin", "dehydration", "hydration", "barrier", "sensitive", "fragrance-free"],
  "oily skin": ["oily", "oily skin", "oiliness", "sebum", "pores", "matte", "gel"],
  dullness: ["dullness", "glow", "brightening", "uneven tone", "vitamin c", "radiance"],
  sunscreen: ["sunscreen", "spf", "uv", "pa++++", "no white cast", "sun"],
};

const EDITOR_PICK_ASINS = [
  "B01CCGW4OE",
  "B09VLDY46B",
  "B0B45RB1RV",
  "B0DH88LZ11",
  "B095PRGHDX",
  "B00BQFTQW6",
];

function fmtINR(value: number) {
  return "Rs " + Math.round(value).toLocaleString("en-IN");
}

function discount(mrp: number, price: number) {
  return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function productText(product: Product) {
  return [
    product.name,
    product.brand,
    product.category,
    product.subcat,
    product.description,
    ...(product.tags || []),
    ...(product.concerns || []),
    ...(product.skinTypes || []),
    ...(product.ingredients || []),
    ...(product.bestFor || []),
    ...Object.values(product.specs || {}),
  ]
    .join(" ")
    .toLowerCase();
}

function matchesQuery(product: Product, query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = productText(product);
  return terms.every((term) => haystack.includes(term));
}

function matchesConcern(product: Product, concern: string | null) {
  if (!concern) return true;
  const haystack = productText(product);
  return (CONCERN_ALIASES[concern] || [concern]).some((term) =>
    haystack.includes(term.toLowerCase())
  );
}

function productReason(product: Product) {
  if (product.bestFor?.length) return product.bestFor.slice(0, 2).join(" / ");
  if (product.concerns?.length) return product.concerns.slice(0, 2).join(" / ");
  const skinType = product.specs?.["Skin Type"] || product.specs?.["Best For"];
  if (skinType) return skinType;
  return product.description;
}

function ProductCard({ product }: { product: Product }) {
  const save = discount(product.mrp, product.price);

  return (
    <Link href={`/product/${product.asin}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-body">
        <div className="product-kicker">
          <span>{product.subcat}</span>
          {product.badge ? <b>{product.badge}</b> : null}
        </div>
        <h3>{product.name}</h3>
        <p className="product-brand">{product.brand}</p>
        <p className="product-use">Best for: {productReason(product)}</p>
        <div className="product-price-row">
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

function EditorPick({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.asin}`} className="editor-pick">
      <img src={product.image} alt={product.name} />
      <span>{product.badge || product.subcat}</span>
    </Link>
  );
}

export default function BeautyShopPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeConcern, setActiveConcern] = useState<string | null>(null);

  const editorPicks = useMemo(() => {
    const picks = EDITOR_PICK_ASINS.map((asin) => PRODUCT_LIST.find((product) => product.asin === asin))
      .filter(Boolean) as Product[];
    return picks.length ? picks : PRODUCT_LIST.slice(0, 6);
  }, []);

  const filtered = useMemo(() => {
    return PRODUCT_LIST.filter((product) => {
      const categoryMatch =
        activeCategory === "All" || normalize(product.category) === normalize(activeCategory);

      return categoryMatch && matchesConcern(product, activeConcern) && matchesQuery(product, query);
    });
  }, [activeCategory, activeConcern, query]);

  return (
    <main className="mirha-home">
      <style>{`
        .mirha-home {
          background: #fbf7f1;
          color: #161412;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .home-shell {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .hero {
          min-height: 560px;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
          align-items: center;
          gap: 48px;
          padding: 74px 0 54px;
        }

        .eyebrow {
          color: #c8473a;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 18px;
        }

        .hero h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 0.96;
          letter-spacing: 0;
          font-weight: 400;
          max-width: 760px;
          margin: 0;
        }

        .hero h1 em {
          color: #c8473a;
          font-style: italic;
        }

        .hero-copy {
          max-width: 520px;
          color: #756b63;
          font-size: 16px;
          line-height: 1.8;
          margin: 22px 0 28px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn {
          min-height: 46px;
          border-radius: 8px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          text-decoration: none;
        }

        .primary-btn {
          background: #161412;
          color: #fff;
        }

        .secondary-btn {
          border: 1px solid #d8cdc3;
          color: #161412;
          background: rgba(255,255,255,0.42);
        }

        .hero-panel {
          background: #fffaf4;
          border: 1px solid #e3d8ce;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 24px 70px rgba(38, 28, 20, 0.08);
        }

        .hero-image {
          min-height: 280px;
          background:
            linear-gradient(180deg, rgba(22,20,18,0.1), rgba(22,20,18,0.38)),
            url('/images/hero-skincare.jpg');
          background-size: cover;
          background-position: center;
        }

        .hero-panel-body {
          padding: 24px;
        }

        .hero-panel-body h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          font-weight: 400;
          line-height: 1.1;
          margin: 0 0 10px;
        }

        .hero-panel-body p {
          color: #756b63;
          font-size: 13px;
          line-height: 1.7;
          margin: 0 0 18px;
        }

        .trust-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #ece2d9;
        }

        .trust-row span {
          padding: 14px 10px;
          text-align: center;
          color: #8d8178;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-right: 1px solid #ece2d9;
        }

        .trust-row span:last-child {
          border-right: 0;
        }

        .section {
          padding: 46px 0;
          border-top: 1px solid #e6dcd2;
        }

        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .section-head h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 400;
          margin: 0;
          line-height: 1.05;
        }

        .section-head p,
        .section-head span {
          color: #93877d;
          font-size: 12px;
          line-height: 1.7;
          margin: 0;
        }

        .concern-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .concern-card {
          background: #fffaf4;
          border: 1px solid #e2d7cd;
          border-radius: 12px;
          padding: 20px;
          min-height: 144px;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s, background 0.2s;
        }

        .concern-card:hover,
        .concern-card.active {
          transform: translateY(-2px);
          border-color: #c8473a;
          background: #fff4ec;
        }

        .concern-card small {
          color: #c8473a;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .concern-card h3 {
          margin: 14px 0 8px;
          font-size: 18px;
          line-height: 1.25;
        }

        .concern-card p {
          color: #776d65;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }

        .desk {
          background: #161412;
          color: #fbf7f1;
          border-radius: 14px;
          padding: 24px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 0.75fr);
          gap: 28px;
          align-items: center;
        }

        .desk h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.05;
          font-weight: 400;
          margin: 0 0 12px;
        }

        .desk p {
          color: rgba(255,255,255,0.58);
          font-size: 14px;
          line-height: 1.75;
          margin: 0;
          max-width: 600px;
        }

        .desk-actions {
          display: grid;
          gap: 10px;
        }

        .desk-actions a {
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 9px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          text-decoration: none;
        }

        .desk-actions small {
          display: block;
          color: #c8473a;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .desk-actions b {
          font-size: 15px;
        }

        .editor-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 12px;
        }

        .editor-pick {
          min-height: 194px;
          border-radius: 12px;
          background: #fff;
          border: 1px solid #e8ded4;
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          transition: transform 0.2s, border-color 0.2s;
        }

        .editor-pick:hover {
          transform: translateY(-2px);
          border-color: #c8473a;
        }

        .editor-pick img {
          width: 100%;
          height: 140px;
          object-fit: contain;
          object-position: center;
        }

        .editor-pick span {
          color: #8c8179;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-top: 10px;
        }

        .filters {
          display: grid;
          gap: 14px;
          margin-bottom: 24px;
        }

        .search-box {
          background: #fffaf4;
          border: 1px solid #ded3ca;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
        }

        .search-box input {
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
          color: #161412;
          padding: 16px 0;
          font-size: 14px;
          min-width: 0;
        }

        .search-box button {
          border: 0;
          background: transparent;
          color: #8c8179;
          cursor: pointer;
          font-size: 18px;
        }

        .filter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter-row button {
          border: 1px solid #ded3ca;
          background: #fffaf4;
          color: #756b63;
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-row button.active {
          border-color: #c8473a;
          background: #fff0e8;
          color: #c8473a;
        }

        .shop-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .product-card {
          background: #fffaf4;
          border: 1px solid #e4d9cf;
          border-radius: 12px;
          overflow: hidden;
          color: inherit;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          min-height: 492px;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }

        .product-card:hover {
          transform: translateY(-3px);
          border-color: #c8473a;
          box-shadow: 0 18px 48px rgba(40, 28, 20, 0.08);
        }

        .product-image {
          background: #fff;
          aspect-ratio: 1 / 1;
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-bottom: 1px solid #eee5dd;
        }

        .product-image img {
          width: 82%;
          height: 82%;
          max-width: 210px;
          max-height: 210px;
          object-fit: contain;
          object-position: center;
        }

        .product-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          flex: 1;
        }

        .product-kicker {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          color: #9c9188;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .product-kicker b {
          color: #c8473a;
          font-weight: 700;
        }

        .product-body h3 {
          font-size: 16px;
          line-height: 1.25;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-brand {
          margin: 0;
          color: #a2968c;
          font-size: 11px;
        }

        .product-use {
          margin: 0;
          color: #756b63;
          font-size: 12px;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-price-row {
          margin-top: auto;
          display: flex;
          align-items: baseline;
          gap: 9px;
        }

        .product-price-row span {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 0.02em;
        }

        .product-price-row em {
          color: #2d8a5c;
          font-size: 11px;
          font-style: normal;
        }

        .product-footer {
          border-top: 1px solid #eee5dd;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #9a8f86;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .empty-state {
          background: #fffaf4;
          border: 1px solid #e4d9cf;
          border-radius: 12px;
          padding: 46px 20px;
          text-align: center;
        }

        .empty-state h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          font-weight: 400;
          margin: 0 0 10px;
        }

        .empty-state p {
          color: #756b63;
          margin: 0 0 18px;
        }

        .empty-state button {
          border: 1px solid #c8473a;
          color: #c8473a;
          background: #fff0e8;
          border-radius: 999px;
          padding: 10px 16px;
          cursor: pointer;
        }

        .method-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid #e2d7cd;
          border-radius: 12px;
          overflow: hidden;
          background: #fffaf4;
        }

        .method-grid div {
          padding: 20px;
          border-right: 1px solid #e2d7cd;
        }

        .method-grid div:last-child {
          border-right: 0;
        }

        .method-grid small {
          color: #c8473a;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .method-grid p {
          color: #756b63;
          font-size: 13px;
          line-height: 1.65;
          margin: 12px 0 0;
        }

        @media (max-width: 980px) {
          .hero {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .concern-grid,
          .desk,
          .method-grid {
            grid-template-columns: 1fr 1fr;
          }

          .editor-grid,
          .shop-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .method-grid div:nth-child(2) {
            border-right: 0;
          }

          .method-grid div {
            border-bottom: 1px solid #e2d7cd;
          }

          .method-grid div:nth-child(3),
          .method-grid div:nth-child(4) {
            border-bottom: 0;
          }
        }

        @media (max-width: 640px) {

        .concern-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.concern-card {
  min-height: auto;
  padding: 13px 12px;
  border-radius: 10px;
}

.concern-card small {
  font-size: 8px;
  letter-spacing: 0.14em;
}

.concern-card h3 {
  font-size: 14px;
  margin: 8px 0 4px;
  line-height: 1.2;
}

.concern-card p {
  font-size: 11px;
  line-height: 1.35;
}

          .home-shell {
            padding: 0 16px;
          }

          .hero {
            padding: 44px 0 34px;
            gap: 28px;
          }

          .hero h1 {
            font-size: 44px;
          }

          .hero-copy {
            font-size: 14px;
          }

          .hero-actions {
  flex-direction: column;
}

.primary-btn,
.secondary-btn {
  width: 100%;
}

.filters {
  gap: 10px;
  margin-bottom: 18px;
}

.search-box input {
  padding: 14px 0;
  font-size: 13px;
}

.filter-row {
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 6px;
  margin-left: -2px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.filter-row::-webkit-scrollbar {
  display: none;
}

.filter-row button {
  width: auto;
  flex: 0 0 auto;
  white-space: nowrap;
  padding: 8px 13px;
}


          .hero-image {
            min-height: 220px;
          }

          .trust-row {
            grid-template-columns: 1fr;
          }

          .trust-row span {
            border-right: 0;
            border-bottom: 1px solid #ece2d9;
          }

          .trust-row span:last-child {
            border-bottom: 0;
          }

          .section {
            padding: 34px 0;
          }

          .section-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .concern-grid,
          .desk,
          .method-grid {
            grid-template-columns: 1fr;
          }

          .desk {
            padding: 20px;
          }

          .editor-grid,
          .shop-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .editor-pick {
            min-height: 164px;
          }

          .editor-pick img {
            height: 112px;
          }

          .product-card {
            min-height: 420px;
          }

          .product-image {
            padding: 14px;
          }

          .product-image img {
            width: 78%;
            height: 78%;
            max-width: 150px;
            max-height: 150px;
          }

          .product-body {
            padding: 13px;
          }

          .product-body h3 {
            font-size: 14px;
            -webkit-line-clamp: 3;
          }

          .product-price-row span {
            font-size: 23px;
          }

          .method-grid div {
            border-right: 0;
            border-bottom: 1px solid #e2d7cd;
          }

          .method-grid div:last-child {
            border-bottom: 0;
          }
        }
      `}</style>

      <div className="home-shell">
        <section className="hero">
          <div>
            <p className="eyebrow">Mirha & Co. / Beauty Guidance</p>
            <h1>
              Beauty picks for Indian skin, <em>made easier.</em>
            </h1>
            <p className="hero-copy">
              Honest skincare, makeup, hair care and wellness finds curated by concern,
              budget and routine. Start with what your skin needs, then shop with context.
            </p>
            <div className="hero-actions">
              <Link href="/tools/routine" className="primary-btn">
                Find My Routine <ArrowRight size={14} />
              </Link>
              <a href="#shop" className="secondary-btn">
                Browse Picks
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-image" />
            <div className="hero-panel-body">
              <h2>Start with your skin.</h2>
              <p>
                Choose your concern, build a simple AM/PM routine, then see products with
                a clear reason instead of a noisy product wall.
              </p>
            </div>
            <div className="trust-row">
              <span>India focused</span>
              <span>Budget aware</span>
              <span>Affiliate disclosed</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Concern Finder</p>
              <h2>What are you solving first?</h2>
            </div>
            <p>Tap a concern to filter the shop below. Keep it simple.</p>
          </div>

          <div className="concern-grid">
            {CONCERNS.map((concern, index) => (
              <button
                key={concern.id}
                className={`concern-card ${activeConcern === concern.id ? "active" : ""}`}
                onClick={() => setActiveConcern(activeConcern === concern.id ? null : concern.id)}
              >
                <small>{String(index + 1).padStart(2, "0")}</small>
                <h3>{concern.label}</h3>
                <p>{concern.text}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="desk">
            <div>
              <p className="eyebrow">Mirha Skin Desk</p>
              <h2>Do not browse randomly.</h2>
              <p>
                Use the routine finder for a full AM/PM structure, search when you know
                the concern, or read a guide when you want the why behind the pick.
              </p>
            </div>
            <div className="desk-actions">
              <Link href="/tools/routine">
                <span>
                  <small>01 / Routine</small>
                  <b>Build your 4-step routine</b>
                </span>
                <ArrowRight size={15} />
              </Link>
              <Link href="/search">
                <span>
                  <small>02 / Search</small>
                  <b>Search by concern or ingredient</b>
                </span>
                <ArrowRight size={15} />
              </Link>
              <Link href="/blog">
                <span>
                  <small>03 / Learn</small>
                  <b>Read beauty guides</b>
                </span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Editor&apos;s Picks</p>
              <h2>Products worth starting with.</h2>
            </div>
            <span>Only a few upfront. The rest sits below.</span>
          </div>

          <div className="editor-grid">
            {editorPicks.map((product) => (
              <EditorPick key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="section" id="shop">
          <div className="section-head">
            <div>
              <p className="eyebrow">Beauty Shop</p>
              <h2>
                {activeCategory === "All" ? "Curated picks" : activeCategory}
                {activeConcern ? ` / ${CONCERNS.find((c) => c.id === activeConcern)?.label}` : ""}
              </h2>
            </div>
            <span>{filtered.length} item{filtered.length === 1 ? "" : "s"}</span>
          </div>

          <div className="filters">
            <div className="search-box">
              <Search size={16} color="#9a8f86" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sunscreen, niacinamide, dry skin, kajal..."
              />
              {query ? <button onClick={() => setQuery("")}>x</button> : null}
            </div>

            <div className="filter-row">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
              {(activeConcern || query || activeCategory !== "All") ? (
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setActiveConcern(null);
                    setQuery("");
                  }}
                >
                  Clear all
                </button>
              ) : null}
            </div>
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
              <p>Try a broader keyword, or clear filters and start again.</p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveConcern(null);
                  setQuery("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Mirha Method</p>
              <h2>Why a product gets picked.</h2>
            </div>
          </div>
          <div className="method-grid">
            <div>
              <small>Ingredient context</small>
              <p>We look at actives, texture and routine fit before the label hype.</p>
            </div>
            <div>
              <small>Indian reality</small>
              <p>Humidity, sun, hard water, budget and availability matter here.</p>
            </div>
            <div>
              <small>Avoid-if notes</small>
              <p>Good picks still have limits. Product detail pages say who should skip.</p>
            </div>
            <div>
              <small>Clear disclosure</small>
              <p>Amazon links may earn commission at no extra cost. The pick still has to make sense.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

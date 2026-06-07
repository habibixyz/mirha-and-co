"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useGlobalization } from "@/components/GlobalizationContext";
import dynamic from "next/dynamic";

const WellnessAuraCanvas = dynamic(() => import("@/components/WellnessAuraCanvas"), {
  ssr: false,
});


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
  specs?: Record<string, string | undefined>;
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
  const { formatPrice, t, isRtl } = useGlobalization();
  const save = discount(product.mrp, product.price);

  return (
    <Link
      href={`/product/${product.asin}`}
      className="product-card"
      style={{
        direction: isRtl ? "rtl" : "ltr",
        textAlign: isRtl ? "right" : "left",
      }}
    >
      <div className="product-image">
        <Image src={product.image} alt={product.name} width={210} height={210} />
      </div>
      <div className="product-body">
        <div
          className="product-kicker"
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
        >
          <span>{product.subcat}</span>
          {product.badge ? <b>{product.badge}</b> : null}
        </div>
        <h3>{product.name}</h3>
        <p className="product-brand">{product.brand}</p>
        <p className="product-use">
          {t("product.bestfor")}: {productReason(product)}
        </p>
        <div
          className="product-price-row"
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: isRtl ? "flex-end" : "flex-start",
          }}
        >
          <span>{formatPrice(product.price)}</span>
          {save > 0 ? <em>{save}% {t("product.off")}</em> : null}
        </div>
      </div>
      <div
        className="product-footer"
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
        }}
      >
        <span>{t("product.viewdetails")}</span>
        <ArrowRight
          size={13}
          style={{
            transform: isRtl ? "rotate(180deg)" : "none",
          }}
        />
      </div>
    </Link>
  );
}

function EditorPick({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.asin}`} className="editor-pick">
      <Image src={product.image} alt={product.name} width={300} height={140} />
      <span>{product.badge || product.subcat}</span>
    </Link>
  );
}

export default function BeautyShopPage() {
  const { t, formatPrice, isRtl } = useGlobalization();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeConcern, setActiveConcern] = useState<string | null>(null);

  const CATEGORY_KEYS: Record<string, string> = {
    "All": "filter.category.all",
    "Skincare": "filter.category.skincare",
    "Makeup": "filter.category.makeup",
    "Hair Care": "filter.category.haircare",
    "Body Care": "filter.category.bodycare",
    "Wellness": "filter.category.wellness"
  };

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
          font-family: var(--font-playfair), serif;
          font-size: clamp(46px, 6.5vw, 84px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          font-weight: 600;
          max-width: 760px;
          margin: 0;
          background: linear-gradient(135deg, #161412 0%, #7d5e4b 25%, #bf857b 50%, #7d5e4b 75%, #161412 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShine 4.5s linear infinite;
        }

        @keyframes textShine {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: -200% center;
          }
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
          position: relative;
          z-index: 0;
          overflow: hidden;
        }
        
        .hero-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 40%, rgba(251, 247, 241, 0.45) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .hero-image img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
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
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          padding: 18px 12px;
          border-top: 1px solid #ece2d9;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #8d8178;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          font-family: var(--font-dm-sans), sans-serif;
        }

        .trust-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c8473a;
          flex-shrink: 0;
          display: inline-block;
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
          background: #ffffff;
          border: 1px solid #e8ded4;
          border-radius: 16px;
          padding: 28px 24px;
          min-height: 160px;
          display: flex;
          flex-direction: column;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(22, 20, 18, 0.03);
        }

        .concern-card:hover,
        .concern-card.active {
          transform: translateY(-4px);
          border-color: #c8473a;
          background: #fffaf4;
          box-shadow: 0 16px 32px rgba(200, 71, 58, 0.08);
        }

        .concern-card small {
          color: #c8473a;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 700;
          opacity: 0.8;
        }

        .concern-card h3 {
          margin: 16px 0 10px;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.2;
          color: #161412;
        }

        .concern-card p {
          color: #756b63;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
          margin-top: auto;
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
          width: 100%;
          height: auto;
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
          text-transform: none;
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
  min-height: 130px;
  padding: 18px 14px;
  border-radius: 12px;
}

.concern-card small {
  font-size: 9px;
  letter-spacing: 0.16em;
}

.concern-card h3 {
  font-size: 15px;
  margin: 12px 0 6px;
  line-height: 1.2;
}

.concern-card p {
  font-size: 12px;
  line-height: 1.4;
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
            flex-direction: column;
            gap: 12px;
            padding: 16px;
            align-items: center;
          }

          .section {
            padding: 34px 0;
          }

          .section-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

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

      <div
        className="home-shell"
        style={{
          direction: isRtl ? "rtl" : "ltr",
          textAlign: isRtl ? "right" : "left",
        }}
      >
        <section
          className="hero"
          style={{
            gridTemplateColumns: isRtl ? "minmax(320px, 0.95fr) minmax(0, 1.05fr)" : undefined,
          }}
        >
          <div style={{ order: isRtl ? 2 : 1 }}>
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1>
              {t("hero.title1")} {t("hero.title2")}
            </h1>
            <p className="hero-copy">{t("hero.copy")}</p>
            <div
              className="hero-actions"
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
              }}
            >
              <Link href="/tools/routine" className="primary-btn">
                Find My Routine{" "}
                <ArrowRight
                  size={14}
                  style={{
                    transform: isRtl ? "rotate(180deg)" : "none",
                  }}
                />
              </Link>
              <a href="#shop" className="secondary-btn">
                {t("hero.btn.primary")}
              </a>
            </div>
          </div>

          <div className="hero-panel" style={{ order: isRtl ? 1 : 2 }}>
            <div className="hero-image" style={{ background: "#fffaf4" }}>
              <WellnessAuraCanvas />
            </div>
            <div className="hero-panel-body">
              <h2>{t("hero.panel.title")}</h2>
              <p>{t("hero.panel.desc")}</p>
            </div>
            <div className="trust-row">
              <div className="trust-item">
                <span className="trust-bullet" />
                <span>{t("trust.independent")}</span>
              </div>
              <div className="trust-item">
                <span className="trust-bullet" />
                <span>{t("trust.backed")}</span>
              </div>
              <div className="trust-item">
                <span className="trust-bullet" />
                <span>{t("trust.zero")}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div
            className="section-head"
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <div>
              <p className="eyebrow">{t("section.concerns.title")}</p>
              <h2>{t("section.concerns.desc")}</h2>
            </div>
            <p>Tap a concern to filter the shop below. Keep it simple.</p>
          </div>

          <div className="concern-grid">
            {CONCERNS.map((concern, index) => (
              <button
                key={concern.id}
                className={`concern-card ${activeConcern === concern.id ? "active" : ""}`}
                onClick={() => setActiveConcern(activeConcern === concern.id ? null : concern.id)}
                style={{
                  textAlign: isRtl ? "right" : "left",
                }}
              >
                <small>{String(index + 1).padStart(2, "0")}</small>
                <h3>{concern.label}</h3>
                <p>{concern.text}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <div
            className="desk"
            style={{
              gridTemplateColumns: isRtl ? "minmax(320px, 0.75fr) minmax(0, 1fr)" : undefined,
            }}
          >
            <div style={{ order: isRtl ? 2 : 1 }}>
              <p className="eyebrow">Mirha Skin Desk</p>
              <h2>Do not browse randomly.</h2>
              <p>
                Use the routine finder for a full AM/PM structure, search when you know
                the concern, or read a guide when you want the why behind the pick.
              </p>
            </div>
            <div className="desk-actions" style={{ order: isRtl ? 1 : 2 }}>
              <Link
                href="/tools/routine"
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
              >
                <span style={{ textAlign: isRtl ? "right" : "left" }}>
                  <small>01 / Routine</small>
                  <b>Build your 4-step routine</b>
                </span>
                <ArrowRight
                  size={15}
                  style={{
                    transform: isRtl ? "rotate(180deg)" : "none",
                  }}
                />
              </Link>
              <Link
                href="/tools/hard-water"
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
              >
                <span style={{ textAlign: isRtl ? "right" : "left" }}>
                  <small>02 / Diagnostics</small>
                  <b>Hard Water Damage Risk Test</b>
                </span>
                <ArrowRight
                  size={15}
                  style={{
                    transform: isRtl ? "rotate(180deg)" : "none",
                  }}
                />
              </Link>
              <Link
                href="/tools/dupes"
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
              >
                <span style={{ textAlign: isRtl ? "right" : "left" }}>
                  <small>03 / Savings</small>
                  <b>Skincare Dupe & Savings Finder</b>
                </span>
                <ArrowRight
                  size={15}
                  style={{
                    transform: isRtl ? "rotate(180deg)" : "none",
                  }}
                />
              </Link>
              <Link
                href="/dashboard/search"
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
              >
                <span style={{ textAlign: isRtl ? "right" : "left" }}>
                  <small>04 / Expert Search</small>
                  <b>Access full expert search</b>
                </span>
                <ArrowRight
                  size={15}
                  style={{
                    transform: isRtl ? "rotate(180deg)" : "none",
                  }}
                />
              </Link>
              <Link
                href="/blog"
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
              >
                <span style={{ textAlign: isRtl ? "right" : "left" }}>
                  <small>05 / Learn</small>
                  <b>Read beauty guides</b>
                </span>
                <ArrowRight
                  size={15}
                  style={{
                    transform: isRtl ? "rotate(180deg)" : "none",
                  }}
                />
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div
            className="section-head"
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <div>
              <p className="eyebrow">{t("section.editor.title")}</p>
              <h2>{t("section.editor.desc")}</h2>
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
          <div
            className="section-head"
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <div>
              <p className="eyebrow">{t("section.shop.title")}</p>
              <h2>
                {activeCategory === "All" ? t("filter.category.all") : t(CATEGORY_KEYS[activeCategory] || activeCategory)}
                {activeConcern ? ` / ${CONCERNS.find((c) => c.id === activeConcern)?.label}` : ""}
              </h2>
            </div>
            <span>
              {filtered.length} item{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="filters">
            <div className="filter-row" style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {t(CATEGORY_KEYS[category] || category)}
                </button>
              ))}
              {activeConcern || query || activeCategory !== "All" ? (
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

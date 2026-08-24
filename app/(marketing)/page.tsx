import Link from "next/link";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import { ArrowRight, Layers, Droplet, Flower, Coins } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { cookies } from "next/headers";
import { Locale, DICTIONARY, RTL_LOCALES } from "@/lib/globalization";
import { prisma } from "@/lib/prisma";
import FaceScannerUI from "@/components/FaceScannerUI";
import heroIndianFace from "@/components/hero_indian_face.png";
// Client wrapper that lazy-loads ShopFilterClient with ssr:false (must live in a client component in Next.js 16)
import ShopFilterClientLazy from "@/components/ShopFilterClientLazy";

// Cache all homepage stats for 5 minutes — these are vanity metrics,
// not real-time data, so staleness is perfectly acceptable.
const getHomepageStats = unstable_cache(
  async () => {
    const [routinesCount, dbProductsCount, ingredientsCount, usersCount, b2bKeysCount, b2bCallsCount] =
      await Promise.all([
        prisma.routine.count().catch(() => 0),
        prisma.product.count().catch(() => 0),
        // Raw count of distinct comma-separated ingredient tokens is expensive;
        // use a fixed approximation that stays accurate enough for the ticker belt.
        prisma.product.count({ where: { ingredients: { not: "" } } }).catch(() => 0),
        prisma.user.count().catch(() => 0),
        prisma.b2BApiKey.count().catch(() => 0),
        prisma.b2BUsageLog.count().catch(() => 0),
      ]);

    // Approximate unique ingredients: each product has ~15–20 ingredients on average.
    // This avoids fetching every row just to count strings.
    const ingredientEstimate = ingredientsCount * 17;

    return { routinesCount, dbProductsCount, ingredientEstimate, usersCount, b2bKeysCount, b2bCallsCount };
  },
  ["homepage-stats-v2"],
  { revalidate: 300, tags: ["homepage-stats-v2"] }
);

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
  hideFromShop?: boolean;
};

const PRODUCT_LIST = (PRODUCTS as unknown as Product[]).filter((p) => !p.hideFromShop);

const EDITOR_PICK_ASINS = [
  "B01CCGW4OE",
  "B09VLDY46B",
  "B0B45RB1RV",
  "B0DH88LZ11",
  "B095PRGHDX",
  "B00BQFTQW6",
];

function EditorPick({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.asin}`} className="editor-pick">
      <div className="editor-pick-img-box">
        <Image src={product.image} alt={product.name} width={300} height={140} style={{ objectFit: 'contain' }} />
      </div>
      <span>{product.badge || product.subcat}</span>
    </Link>
  );
}

export default async function BeautyShopPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("mirha_locale")?.value || "en") as Locale;
  const isRtl = RTL_LOCALES.includes(locale);
  const t = (key: string) => DICTIONARY[locale]?.[key] || DICTIONARY.en[key] || key;

  // Fetch cached statistics — results revalidate every 5 minutes via unstable_cache
  const { routinesCount, dbProductsCount, ingredientEstimate, usersCount, b2bKeysCount, b2bCallsCount } =
    await getHomepageStats();

  const finalRoutinesCount = routinesCount || 12;
  const finalProductsCount = dbProductsCount || PRODUCT_LIST.length;
  const finalIngredientsCount = ingredientEstimate || 176;
  const finalUsersCount = usersCount || 5;
  const finalB2bKeysCount = b2bKeysCount || 0;
  const finalB2bCallsCount = b2bCallsCount || 0;


  const picks = EDITOR_PICK_ASINS.map((asin) => PRODUCT_LIST.find((product) => product.asin === asin))
    .filter(Boolean) as Product[];
  const editorPicks = picks.length ? picks : PRODUCT_LIST.slice(0, 6);

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
          color: #fc2779;
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

        .saas-loop {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          margin-top: 26px;
          max-width: 660px;
        }

        .saas-loop-item {
          border: 1px solid #e3d8ce;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
          padding: 12px;
        }

        .saas-loop-item small {
          display: block;
          color: #fc2779;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .saas-loop-item b {
          display: block;
          color: #161412;
          font-size: 12px;
          line-height: 1.35;
          font-weight: 700;
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

        .hero-visuals {
          position: relative;
          width: 100%;
          min-height: 540px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .ai-stack {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 20px;
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
          align-items: stretch;
        }

        .ai-stack-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
          order: 1;
        }

        .ai-card {
          box-sizing: border-box;
          position: relative;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,1);
          padding: 24px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s;
          cursor: pointer;
          width: 100%;
          text-decoration: none !important;
        }

        .ai-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 32px 70px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,1);
          z-index: 10;
        }

        .ai-card-scanner {
          order: 2;
          width: 100%;
          height: 100%;
          min-height: 440px;
          padding: 0;
          overflow: hidden;
        }

        .ai-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 0;
        }

        .ai-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(22, 20, 18, 0.08);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fc2779;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ai-card:hover .ai-icon {
          background: #fc2779;
          color: #ffffff;
          border-color: #fc2779;
          box-shadow: 0 8px 20px rgba(252, 39, 121, 0.25);
          transform: scale(1.05);
        }
        
        .ai-card h3 {
          font-family: var(--font-playfair), serif;
          font-size: 17px;
          font-weight: 600;
          margin: 0;
          color: #161412;
          letter-spacing: -0.01em;
        }
        
        .ai-card p {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 9px;
          color: #8d8178;
          margin: 3px 0 0;
          line-height: 1.2;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .trust-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          padding: 24px 12px 0;
          flex-wrap: wrap;
          width: 100%;
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
          background: #fc2779;
          flex-shrink: 0;
          display: inline-block;
        }

        /* ── Ticker belt ─────────────────────────── */
        .ticker-belt {
          border-top: 1px solid #e6dcd2;
          border-bottom: 1px solid #e6dcd2;
          overflow: hidden;
          background: #faf5ef;
          padding: 0;
          height: 38px;
          display: flex;
          align-items: center;
        }

        .ticker-track {
          display: flex;
          gap: 0;
          animation: ticker-scroll 32s linear infinite;
          white-space: nowrap;
          will-change: transform;
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 0 32px;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 700;
          color: #9b8f85;
          font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
        }

        .ticker-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #fc2779;
          flex-shrink: 0;
        }

        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Mobile ticker bleed correction */
        @media (max-width: 640px) {
          .ticker-belt-wrapper { margin: 0 -16px; }
          .ticker-item { padding: 0 20px; gap: 14px; }
          .ticker-belt { animation-duration: 22s; }
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
          border-color: #fc2779;
          background: #fffaf4;
          box-shadow: 0 16px 32px rgba(252, 39, 121, 0.08);
        }

        .concern-card small {
          color: #fc2779;
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
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .desk-actions a {
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0;
          padding: 16px 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .desk-actions a:last-child {
          border-bottom: none;
        }

        .desk-actions a:hover {
          color: #ffffff;
          padding-left: 16px;
          background: rgba(255, 255, 255, 0.02);
        }

        .desk-actions svg {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s;
          color: rgba(255, 255, 255, 0.35);
        }

        .desk-actions a:hover svg {
          transform: translateX(4px) !important;
          color: #fc2779;
        }

        .desk-actions small {
          display: block;
          color: #fc2779;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 4px;
          font-weight: 600;
        }

        .desk-actions b {
          font-size: 15px;
          font-weight: 500;
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
          border-color: #fc2779;
        }

        .editor-pick-img-box {
          background: #fff;
          border: 1px solid #e8ded4;
          border-radius: 8px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 110px;
          overflow: hidden;
        }

        .editor-pick-img-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
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
          border-color: #fc2779;
          background: #fff0e8;
          color: #fc2779;
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
          border-color: #fc2779;
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
          border-radius: 10px;
          margin: 12px 12px 0 12px;
          border: 1px solid #eee5dd;
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
          color: #fc2779;
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
          border: 1px solid #fc2779;
          color: #fc2779;
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
          color: #fc2779;
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
          .hide-on-mobile {
            display: none !important;
          }

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

          .saas-loop {
            grid-template-columns: 1fr 1fr;
            margin-top: 20px;
          }

          .hero-visuals {
            min-height: auto;
            margin-top: 24px;
          }
          
           .ai-stack {
            display: flex;
            flex-direction: column;
            gap: 16px;
            height: auto;
            align-items: center;
            width: 100%;
          }

          .ai-stack-left {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
            align-items: center;
            order: 2;
          }

          .ai-card {
            position: relative;
            width: 100% !important;
            max-width: 380px;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            transform: none !important;
          }

          .ai-card-scanner {
            height: 380px !important;
            order: 1;
            margin-bottom: 8px;
            width: 100% !important;
            max-width: 380px;
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

          /* Ticker: correct bleed margin on mobile (home-shell switches to 16px padding) */
          .ticker-belt {
            margin-left: -16px !important;
            margin-right: -16px !important;
          }

          /* Star rating: tighten on 2-col narrow cards */
          .product-star-row {
            font-size: 10px !important;
            letter-spacing: 0 !important;
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
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "20px",
                background: "rgba(252, 39, 121, 0.1)",
                border: "1px solid rgba(252, 39, 121, 0.25)",
                color: "#fc2779",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fc2779" }} />
              1 Free AI Skin Scan Per Day • 1 Photo Daily
            </div>
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
              <Link href="/tools/analysis" className="primary-btn" style={{ background: "#fc2779" }}>
                Try 1 Free Daily Scan{" "}
                <ArrowRight
                  size={14}
                  style={{
                    transform: isRtl ? "rotate(180deg)" : "none",
                  }}
                />
              </Link>
              <Link href="/register" className="secondary-btn">
                Create Free Profile
              </Link>
            </div>
            <div className="saas-loop">
              <div className="saas-loop-item">
                <small>01</small>
                <b>1 Free Photo Scan / Day</b>
              </div>
              <div className="saas-loop-item">
                <small>02</small>
                <b>Build and save routines</b>
              </div>
              <div className="saas-loop-item">
                <small>03</small>
                <b>Check conflicts & barrier</b>
              </div>
              <div className="saas-loop-item">
                <small>04</small>
                <b>Track progress monthly</b>
              </div>
            </div>
          </div>

          <div className="hero-visuals" style={{ order: isRtl ? 1 : 2 }}>
            <div className="ai-stack">
              <Link href="/tools/analysis" className="ai-card ai-card-scanner">
                <FaceScannerUI imageSrc={heroIndianFace} showMesh={false} />
              </Link>
              <div className="ai-stack-left">
                <Link href="/dashboard/routines" className="ai-card ai-card-routine">
                  <div className="ai-card-header">
                    <div className="ai-icon">
                      <Layers size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3>AI Routine Builder</h3>
                      <p>AM & PM Regimens</p>
                    </div>
                  </div>
                </Link>
                <Link href="/tools/hard-water" className="ai-card ai-card-water">
                  <div className="ai-card-header">
                    <div className="ai-icon">
                      <Droplet size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3>Hard Water Test</h3>
                      <p>City-based analysis</p>
                    </div>
                  </div>
                </Link>
                <Link href="/k-beauty" className="ai-card ai-card-kbeauty hide-on-mobile">
                  <div className="ai-card-header">
                    <div className="ai-icon">
                      <Flower size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3>K-Beauty Collection</h3>
                      <p>Korean Skincare Guide</p>
                    </div>
                  </div>
                </Link>
                <Link href="/tools/dupes" className="ai-card ai-card-dupes hide-on-mobile">
                  <div className="ai-card-header">
                    <div className="ai-icon">
                      <Coins size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3>Dupe Finder</h3>
                      <p>Calculate your savings</p>
                    </div>
                  </div>
                </Link>
              </div>
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

        {/* ── Ticker Belt — full bleed ─────────────────────────── */}
        <div className="ticker-belt" style={{ margin: "0 -24px" }}>
          <div className="ticker-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: "contents" }}>
                <div className="ticker-item"><span className="ticker-dot" />1 Free AI Skin Scan Per Day</div>
                <div className="ticker-item"><span className="ticker-dot" />{finalRoutinesCount.toLocaleString()} Routines Built</div>
                <div className="ticker-item"><span className="ticker-dot" />{finalProductsCount.toLocaleString()} Products Scanned</div>
                <div className="ticker-item"><span className="ticker-dot" />{finalIngredientsCount.toLocaleString()} Ingredients Analyzed</div>
                <div className="ticker-item"><span className="ticker-dot" />{finalUsersCount.toLocaleString()} B2C Skin Dashboards</div>
                <div className="ticker-item"><span className="ticker-dot" />B2B API Integration Ready</div>
                <div className="ticker-item"><span className="ticker-dot" />Climate-Aware Recommendations</div>
              </div>
            ))}
          </div>
        </div>

        <section className="section">
          <div
            className="desk"
            style={{
              gridTemplateColumns: isRtl ? "minmax(320px, 0.75fr) minmax(0, 1fr)" : undefined,
            }}
          >
            <div style={{ order: isRtl ? 2 : 1 }}>
              <p className="eyebrow">Mirha Skin Desk</p>
              <h2>Your skincare system, not another product list.</h2>
              <p>
                Start with a profile, turn it into an AM/PM routine, check every new
                product against your actives, and keep a journal so your routine improves
                with evidence instead of guesswork.
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
                  <b>Build and save your AM/PM routine</b>
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
                  <b>Check climate and hard-water risk</b>
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
                  <b>Find compatible dupes and savings</b>
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
                  <b>Ask Mirha Search with your context</b>
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
                  <b>Read the guide behind each choice</b>
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

        <ShopFilterClientLazy />

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

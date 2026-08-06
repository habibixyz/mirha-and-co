import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, BookOpen } from "lucide-react";
import { cookies } from "next/headers";
import { PRODUCTS } from "@/lib/products";
import {
 Locale,
 Currency,
 convertAndFormatPrice,
 getLocalAffiliateUrl,
 DICTIONARY,
 RTL_LOCALES,
} from "@/lib/globalization";
import AiProductTranslator from "@/components/AiProductTranslator";
import { getGuidesForProduct } from "@/lib/blog-utils";

function isCrueltyFree(product: any) {
 const cfBrands = ["minimalist", "the ordinary", "cosrx", "wishcare", "pilgrim", "dot & key", "mamaearth", "beardo", "aqualogica", "plum", "deconstruct", "derma co"];
 return cfBrands.includes(product.brand.toLowerCase()) || (product.tags || []).some((t: string) => t.toLowerCase() === "cruelty-free" || t.toLowerCase() === "cruelty free");
}

function isVegan(product: any) {
 const veganBrands = ["minimalist", "the ordinary", "wishcare", "pilgrim", "aqualogica", "plum", "deconstruct"];
 if (product.name.toLowerCase().includes("snail") || product.description.toLowerCase().includes("snail")) {
  return false;
 }
 return veganBrands.includes(product.brand.toLowerCase()) || (product.tags || []).some((t: string) => t.toLowerCase() === "vegan" || t.toLowerCase() === "veg");
}

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
 usage?: string;
 watchOuts?: string[];
 image: string;
 link?: string;
 notes?: string;
};

const PRODUCT_LIST = PRODUCTS as unknown as Product[];

const K_BEAUTY_ASINS = new Set([
  "B09GP7K353",
  "B09GXFVMCM",
  "B06Y15D1LH",
  "B0BSLFPGXT",
  "B08ZXVVY8M",
  "B0CYS32W5Q",
  "B0FPLG687Q",
  "B0CHVHGTDJ",
  "B0B96L5S3B",
  "B0966C6TRX",
  "B09JBJDFHH",
  "B0C5JFLMVT",
  "B0CNT5D8J7",
  "B09M8QG97L",
  "B09TLFY4GP",
  "B0DBJ5DBDW",
  "B0C8Y1TSKZ",
  "B0D1FNB4C2",
  "B0CWNH9SMY",
  "B07T5BN3P2",
  "B08TWHXNCD",
  "B0CFL7LS43",
  "B0B3G73VF5",
  "36PDT9JEXUMJP",
  "B0DSBYS8ZV",
  "B08B16MD34",
  "B0BT1D5J52",
]);

function discount(mrp: number, price: number) {
 return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
}

function toList(value?: string[] | string) {
 if (!value) return [];
 return Array.isArray(value) ? value : [value];
}

function findProduct(asin: string) {
 return PRODUCT_LIST.find((product) => product.asin === asin);
}

function getAmazonStoreName(currency: Currency) {
 switch (currency) {
 case "USD": return "Amazon US";
 case "EUR": return "Amazon Europe";
 case "GBP": return "Amazon UK";
 case "AED": return "Amazon UAE";
 case "SAR": return "Amazon Saudi";
 default: return "Amazon India";
 }
}

export function generateStaticParams() {
 return PRODUCT_LIST.map((product) => ({ asin: product.asin }));
}

export async function generateMetadata({ params }: { params: Promise<{ asin: string }> }) {
 const { asin } = await params;
 const product = findProduct(asin);

 if (!product) {
 return {
 title: "Product Not Found | Mirha & Co.",
 };
 }

 return {
 title: `${product.name} | Mirha & Co.`,
 description: product.description,
 alternates: {
 canonical: `https://www.mirhaandco.com/product/${product.asin}`,
 },
 openGraph: {
 title: `${product.name} | Mirha & Co.`,
 description: product.description,
 url: `https://www.mirhaandco.com/product/${product.asin}`,
 type: "website",
 images: [
 {
 url: product.image,
 alt: product.name,
 },
 ],
 },
 };
}

function InfoBlock({
 title,
 children,
}: {
 title: string;
 children: React.ReactNode;
}) {
 return (
 <div className="info-block">
 <h2>{title}</h2>
 {children}
 </div>
 );
}

export default async function ProductPage({ params }: { params: Promise<{ asin: string }> }) {
 const { asin } = await params;
 const product = findProduct(asin);

 if (!product) notFound();

 const isKBeauty = K_BEAUTY_ASINS.has(product.asin);
 const isMens = product.tags?.includes("mens") || product.category?.toLowerCase().includes("mens");
 const isVeg = isVegan(product);
 const isCF = isCrueltyFree(product);

 const cookieStore = await cookies();
 const locale = (cookieStore.get("mirha_locale")?.value || "en") as Locale;
 const currency = (cookieStore.get("mirha_currency")?.value || "INR") as Currency;
 const isRtl = RTL_LOCALES.includes(locale);

 const t = (key: string) => DICTIONARY[locale]?.[key] || DICTIONARY.en[key] || key;

 const affiliateUrl = getLocalAffiliateUrl(
 product.asin,
 currency,
 product.name,
 product.brand,
 product.link
 );
 const save = discount(product.mrp, product.price);

  // ── Smart Best For ──────────────────────────────────────────────────────────
  const bestFor: string[] = [
    ...toList(product.bestFor),
    ...toList(product.concerns).map((c: string) => {
      const m: Record<string, string> = {
        "acne": "Acne-prone skin",
        "dark circles": "Under-eye dark circles",
        "anti-ageing": "Fine lines & ageing skin",
        "pigmentation": "Hyperpigmentation & uneven tone",
        "dryness": "Dry & dehydrated skin",
        "oiliness": "Oily & combination skin",
        "sensitivity": "Sensitive or reactive skin",
        "pores": "Enlarged pores",
        "barrier": "Damaged skin barrier",
        "dullness": "Dull, tired-looking skin",
        "redness": "Redness & irritation",
        "mens": "Men's skin",
      };
      return m[c.toLowerCase()] || c;
    }),
    product.specs?.["Skin Type"] ? `${product.specs["Skin Type"]} skin` : null,
    product.specs?.["Best For"] ?? null,
    product.specs?.["Use"] ? `${product.specs["Use"]} routine step` : null,
  ].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 5) as string[];

  // ── Smart Avoid If ───────────────────────────────────────────────────────────
  const avoidIfRaw: string[] = [...toList(product.notIdealFor)];
  if (!avoidIfRaw.length) {
    const ptags = toList(product.tags).map((t: string) => t.toLowerCase());
    const pspecs = product.specs || {};
    if (ptags.includes("retinol") || ptags.includes("retinal") || ptags.includes("retinoid"))
      avoidIfRaw.push("Pregnant or breastfeeding", "Extremely sensitive or thin skin");
    if (ptags.some((t: string) => ["aha", "bha", "lactic acid", "glycolic", "salicylic"].includes(t)))
      avoidIfRaw.push("Active eczema or open wounds", "If already using a prescription acid");
    if (ptags.includes("benzoyl peroxide") || ptags.includes("bpo"))
      avoidIfRaw.push("Sensitive or dry skin (start slow)", "Before unprotected sun exposure");
    if (ptags.includes("vitamin c") || ptags.includes("ascorbic"))
      avoidIfRaw.push("If layering directly with Niacinamide (use at separate times)");
    if (ptags.includes("niacinamide"))
      avoidIfRaw.push("Avoid mixing directly with pure Vitamin C serums");
    if (ptags.includes("spf") || ptags.includes("sunscreen"))
      avoidIfRaw.push("As a substitute for reapplication every 2 hours outdoors");
    if (ptags.some((t: string) => ["snail", "bee venom", "honey"].includes(t)))
      avoidIfRaw.push("If you have allergies to animal-derived ingredients");
    if (ptags.some((t: string) => ["fragrance", "perfume", "parfum"].includes(t)))
      avoidIfRaw.push("Fragrance-sensitive skin or rosacea");
    if (pspecs["Skin Type"]?.toLowerCase().includes("oily"))
      avoidIfRaw.push("Very dry or dehydrated skin");
    if (pspecs["Skin Type"]?.toLowerCase().includes("dry"))
      avoidIfRaw.push("Very oily or acne-prone skin");
    if (!avoidIfRaw.length)
      avoidIfRaw.push("Patch test first if you have a reactive or compromised skin barrier");
  }
  const avoidIf = avoidIfRaw.filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);

  // ── Smart Ingredients ────────────────────────────────────────────────────────
  const KNOWN_ACTIVES = [
    "niacinamide","hyaluronic acid","retinol","retinal","vitamin c","vitamin k",
    "caffeine","ceramide","peptide","spf","aha","bha","salicylic acid","lactic acid",
    "glycolic acid","benzoyl peroxide","azelaic acid","zinc","kojic acid",
    "snail secretion filtrate","centella asiatica","cica","aloe vera",
    "tranexamic acid","arbutin","bakuchiol","squalane","glycerin",
    "allantoin","panthenol","vitamin e","ferulic acid","egcg","hydrocolloid",
  ];
  const toCleanActiveName = (str: string) => {
    const uppercaseSet = new Set(["spf", "aha", "bha", "egcg", "ala", "bpo", "uv"]);
    return str
      .toLowerCase()
      .split(/\s+/)
      .map((w) => (uppercaseSet.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
      .join(" ");
  };
  const ingredients: string[] = [
    ...toList(product.ingredients),
    ...(product.specs?.["Key Ingredient"]
      ? product.specs["Key Ingredient"].split(",").map((s: string) => s.trim())
      : []),
    ...toList(product.tags)
      .filter((t: string) => KNOWN_ACTIVES.includes(t.toLowerCase())),
  ]
    .filter(Boolean)
    .map((t: string) => toCleanActiveName(t))
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 6);

  // ── Smart Usage ──────────────────────────────────────────────────────────────
  const usageText: string = product.usage || product.specs?.["Use"]
    ? `${product.usage || product.specs?.["Use"]}`
    : (() => {
        const ptags = toList(product.tags).map((t: string) => t.toLowerCase());
        const sub = (product.subcat || "").toLowerCase();
        if (sub.includes("cleanser") || sub.includes("face wash"))
          return `Wet face, apply a small amount, work into a lather, rinse. Use ${product.specs?.["Use"] || "AM & PM"}.`;
        if (sub.includes("serum"))
          return `Apply ${product.specs?.["Use"] || "AM & PM"} post-cleanse. Use 2–3 drops, press in gently. Follow with moisturiser.`;
        if (sub.includes("moisturiser") || sub.includes("cream") || sub.includes("lotion"))
          return `Final hydration step ${product.specs?.["Use"] || "AM & PM"} — before SPF in AM, or as last step in PM.`;
        if (sub.includes("sunscreen") || ptags.includes("spf"))
          return "Apply generously 15 min before sun exposure. Reapply every 2 hours or after sweating/swimming.";
        if (sub.includes("eye"))
          return "Use ring finger to gently pat a rice-grain amount around the orbital bone. Never tug or drag.";
        if (sub.includes("toner"))
          return `Apply with a cotton pad or pat into skin post-cleanse. Use ${product.specs?.["Use"] || "AM & PM"}.`;
        if (sub.includes("mask"))
          return "Apply a thin, even layer to clean skin. Leave for the recommended time, then rinse thoroughly.";
        if (ptags.includes("pimple patch") || ptags.includes("hydrocolloid"))
          return "Cleanse and fully dry area. Apply patch directly on blemish. Leave overnight or for at least 6 hours.";
        return "Apply to clean skin and patch test first. Introduce one new product at a time.";
      })();

  // ── Smart Mirha Note ─────────────────────────────────────────────────────────
  const mirhaNoteText: string = product.notes || (() => {
    const ptags = toList(product.tags).map((t: string) => t.toLowerCase());
    const savePct = product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
    let note = `${product.brand}'s ${product.subcat} holds a ${product.rating}★ rating`;
    if (product.reviews) note += ` from ${product.reviews} reviews`;
    note += ".";
    if (savePct > 20) note += ` Currently ${savePct}% off MRP — solid value window.`;
    if (ptags.includes("dermat") || (product.badge || "").toLowerCase().includes("dermat"))
      note += " Dermatologist-recommended.";
    if (ptags.includes("fragrance-free") || product.description?.toLowerCase().includes("fragrance-free"))
      note += " Fragrance-free — safer for sensitive skin types.";
    if (isCF) note += " Brand is cruelty-free.";
    if (isVeg) note += " Formula is 100% vegan.";
    note += " Curated for ingredient quality, review reliability and category value. Not medical advice.";
    return note;
  })();

  const watchOuts = toList(product.watchOuts);
  const featuredInGuides = getGuidesForProduct(product.asin);
 
 const alternatives = PRODUCT_LIST.filter(
 (item) => item.asin !== product.asin && item.category === product.category
 ).slice(0, 4);
 const productImageUrl = product.image.startsWith("http")
 ? product.image
 : `https://www.mirhaandco.com${product.image}`;
 const productStructuredData = {
 "@context": "https://schema.org",
 "@type": "Product",
 name: product.name,
 brand: {
 "@type": "Brand",
 name: product.brand,
 },
 image: productImageUrl,
 description: product.description,
 sku: product.asin,
 category: product.category,
 aggregateRating: {
 "@type": "AggregateRating",
 ratingValue: product.rating,
 reviewCount: Number(String(product.reviews || "0").replace(/[^0-9]/g, "")) || 1,
 },
 offers: {
 "@type": "Offer",
 url: `https://www.mirhaandco.com/product/${product.asin}`,
 priceCurrency: "INR",
 price: product.price,
 availability: "https://schema.org/InStock",
 itemCondition: "https://schema.org/NewCondition",
 },
 };

 return (
 <main className="product-page">
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
 />
 <style>{`
 .product-page {
 background: #fbf7f1;
 color: #161412;
 min-height: 100vh;
 font-family: 'DM Sans', sans-serif;
 }

 .product-shell {
 max-width: 1120px;
 margin: 0 auto;
 padding: 34px 24px 72px;
 }

 .back-link {
 display: inline-flex;
 align-items: center;
 gap: 8px;
 color: #7d736b;
 font-size: 12px;
 margin-bottom: 24px;
 text-decoration: none;
 }

 .product-hero {
 display: grid;
 grid-template-columns: minmax(300px, 0.9fr) minmax(0, 1.1fr);
 gap: 34px;
 align-items: stretch;
 }

 .image-panel {
 background: #fff;
 border: 1px solid #e3d8ce;
 border-radius: 14px;
 padding: 36px;
 display: flex;
 align-items: center;
 justify-content: center;
 min-height: 480px;
 position: sticky;
 top: 88px;
 align-self: start;
 }

 .image-panel img {
 width: 82%;
 height: 82%;
 max-height: 380px;
 object-fit: contain;
 object-position: center;
 }

 .detail-panel {
 background: #fffaf4;
 border: 1px solid #e3d8ce;
 border-radius: 14px;
 padding: 30px;
 display: flex;
 flex-direction: column;
 }

 .kicker {
 color: #fc2779;
 font-size: 10px;
 letter-spacing: 0.22em;
 text-transform: uppercase;
 font-weight: 700;
 margin-bottom: 14px;
 }

 .detail-panel h1 {
 font-family: 'DM Serif Display', serif;
 font-size: clamp(34px, 5vw, 56px);
 line-height: 1.02;
 font-weight: 400;
 margin: 0 0 12px;
 }

 .brand {
 color: #968a80;
 font-size: 13px;
 margin: 0 0 20px;
 }

 .price-box {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 10px;
 margin: 8px 0 22px;
 }

 .price-box div {
 background: #fff;
 border: 1px solid #ece2d9;
 border-radius: 10px;
 padding: 14px;
 }

 .price-box small {
 display: block;
 color: #9d9188;
 font-size: 9px;
 letter-spacing: 0.16em;
 text-transform: uppercase;
 margin-bottom: 5px;
 }

 .price-box b {
 font-family: 'Bebas Neue', sans-serif;
 font-size: 28px;
 font-weight: 400;
 letter-spacing: 0.02em;
 }

 .price-box em {
 color: #2d8a5c;
 font-style: normal;
 font-weight: 700;
 }

 .description {
 color: #6f665f;
 line-height: 1.75;
 font-size: 14px;
 margin: 0 0 22px;
 }

 .cta {
 display: inline-flex;
 align-items: center;
 justify-content: center;
 gap: 10px;
 background: #161412;
 color: #fff;
 border-radius: 9px;
 padding: 15px 20px;
 text-decoration: none;
 font-size: 12px;
 letter-spacing: 0.16em;
 text-transform: uppercase;
 font-weight: 700;
 margin-top: auto;
 }

 .disclosure {
 text-align: center;
 color: #a2958b;
 font-size: 11px;
 line-height: 1.6;
 margin: 12px 0 0;
 }

 .info-grid {
 display: grid;
 grid-template-columns: repeat(2, minmax(0, 1fr));
 gap: 14px;
 margin-top: 28px;
 }

 .info-block {
 background: #fffaf4;
 border: 1px solid #e3d8ce;
 border-radius: 12px;
 padding: 22px;
 }

 .info-block h2 {
 font-family: 'DM Serif Display', serif;
 font-size: 24px;
 font-weight: 400;
 margin: 0 0 14px;
 }

 .info-block p,
 .info-block li {
 color: #6f665f;
 font-size: 14px;
 line-height: 1.75;
 }

 .info-block ul {
 margin: 0;
 padding-left: 18px;
 }

 .spec-list {
 display: grid;
 gap: 10px;
 }

 .spec-row {
 display: flex;
 justify-content: space-between;
 gap: 16px;
 border-bottom: 1px solid #eee5dd;
 padding-bottom: 9px;
 }

 .spec-row span:first-child {
 color: #968a80;
 font-size: 12px;
 }

 .spec-row span:last-child {
 color: #161412;
 font-size: 12px;
 text-align: right;
 font-weight: 600;
 }

 .related {
 margin-top: 34px;
 }

 .related h2 {
 font-family: 'DM Serif Display', serif;
 font-size: 32px;
 font-weight: 400;
 margin: 0 0 16px;
 }

 .related-grid {
 display: grid;
 grid-template-columns: repeat(4, minmax(0, 1fr));
 gap: 12px;
 }

 .related-card {
 background: #fff;
 border: 1px solid #e3d8ce;
 border-radius: 10px;
 padding: 14px;
 text-decoration: none;
 color: inherit;
 }

 .related-card img {
 width: 100%;
 height: 130px;
 object-fit: contain;
 margin-bottom: 12px;
 }

 .related-card b {
 display: -webkit-box;
 -webkit-line-clamp: 2;
 -webkit-box-orient: vertical;
 overflow: hidden;
 font-size: 13px;
 line-height: 1.35;
 margin-bottom: 7px;
 }

 .related-card span {
 color: #fc2779;
 font-size: 12px;
 font-weight: 700;
 }

 @media (max-width: 860px) {
 .product-hero,
 .info-grid {
 grid-template-columns: 1fr;
 }

 .image-panel {
 min-height: 360px;
 position: static;
 align-self: auto;
 }

 .related-grid {
 grid-template-columns: repeat(2, minmax(0, 1fr));
 }
 }

 @media (max-width: 540px) {
 .product-shell {
 padding: 24px 16px 54px;
 }

 .image-panel {
 min-height: 300px;
 padding: 24px;
 position: static;
 align-self: auto;
 }

 .detail-panel {
 padding: 22px;
 }

 .price-box {
 grid-template-columns: 1fr;
 }

 .related-card img {
 height: 110px;
 }
 }
 
  /* ─────────────────────────────────────────
     PRODUCT PAGE DARK MODE OVERRIDES
  ───────────────────────────────────────── */
  html.dark .product-page,
  .dark .product-page {
    background: #0f0e0d !important;
    color: #f7f5f2 !important;
  }

  html.dark .back-link,
  .dark .back-link {
    color: #aba49d !important;
  }
  html.dark .back-link:hover,
  .dark .back-link:hover {
    color: #ffffff !important;
  }

  html.dark .image-panel,
  .dark .image-panel {
    background: #ffffff !important;
    border-color: rgba(255, 255, 255, 0.08) !important;
    opacity: 0.95;
    filter: brightness(0.93) contrast(1.02);
  }

  html.dark .detail-panel,
  .dark .detail-panel {
    background: #121110 !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
  }

  html.dark .brand,
  .dark .brand {
    color: #aba49d !important;
  }

  html.dark .description,
  .dark .description {
    color: #aba49d !important;
  }

  html.dark .price-box div,
  .dark .price-box div {
    background: #181716 !important;
    border-color: rgba(255, 255, 255, 0.12) !important;
  }

  html.dark .price-box small,
  .dark .price-box small {
    color: #aba49d !important;
  }

  html.dark .price-box b,
  .dark .price-box b {
    color: #ffffff !important;
  }

  html.dark .price-box em,
  .dark .price-box em {
    color: #34d399 !important;
  }

  html.dark .cta,
  .dark .cta {
    background: #f7f5f2 !important;
    color: #0f0e0d !important;
  }
  html.dark .cta:hover,
  .dark .cta:hover {
    background: #e8e4df !important;
  }

  html.dark .disclosure,
  .dark .disclosure {
    color: #aba49d !important;
  }

  html.dark .info-block,
  .dark .info-block {
    background: #181716 !important;
    border-color: rgba(255, 255, 255, 0.12) !important;
  }

  html.dark .info-block h2,
  .dark .info-block h2 {
    color: #ffffff !important;
  }

  html.dark .info-block p,
  .dark .info-block p,
  html.dark .info-block li,
  .dark .info-block li {
    color: #aba49d !important;
  }

  html.dark .spec-row,
  .dark .spec-row {
    border-bottom-color: rgba(255, 255, 255, 0.08) !important;
  }

  html.dark .spec-row span:first-child,
  .dark .spec-row span:first-child {
    color: #aba49d !important;
  }

  html.dark .spec-row span:last-child,
  .dark .spec-row span:last-child {
    color: #ffffff !important;
  }

  html.dark .related-card,
  .dark .related-card {
    background: #181716 !important;
    border-color: rgba(255, 255, 255, 0.12) !important;
    color: #ffffff !important;
  }

  html.dark .related-card b,
  .dark .related-card b {
    color: #ffffff !important;
  }

  html.dark .related-card span,
  .dark .related-card span {
    color: #ff4d94 !important;
  }

  /* ─────────────────────────────────────────
     AI TRANSLATOR BAR (DARK MODE & SKELETONS)
  ───────────────────────────────────────── */
  .ai-translator-bar {
    background: #fff;
    border: 1px solid #e3d8ce;
    color: #161412;
  }
  .ai-translator-bar.translated {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
  }

  html.dark .ai-translator-bar,
  .dark .ai-translator-bar {
    background: #181716 !important;
    border-color: rgba(255, 255, 255, 0.12) !important;
    color: #aba49d !important;
  }
  html.dark .ai-translator-bar.translated,
  .dark .ai-translator-bar.translated {
    background: #112a1d !important;
    border-color: rgba(52, 211, 153, 0.25) !important;
    color: #a7f3d0 !important;
  }

  .translated-success {
    color: #166534;
  }
  html.dark .translated-success,
  .dark .translated-success {
    color: #34d399 !important;
  }

  .translator-reset-btn {
    color: #8c8179;
  }
  html.dark .translator-reset-btn,
  .dark .translator-reset-btn {
    color: #aba49d !important;
  }

  .skeleton-line {
    background: #eee;
  }
  html.dark .skeleton-line,
  .dark .skeleton-line {
    background: #2b2826 !important;
  }

  /* ─────────────────────────────────────────
     VEGAN & CRUELTY-FREE BADGES (DARK MODE)
  ───────────────────────────────────────── */
  .badge-vegan {
    background: #eef9f3;
    color: #2d8a5c;
    border: 1px solid rgba(45, 138, 92, 0.15);
  }
  html.dark .badge-vegan,
  .dark .badge-vegan {
    background: #112a1d !important;
    color: #34d399 !important;
    border-color: rgba(52, 211, 153, 0.25) !important;
  }

  .badge-cf {
    background: #fff0e8;
    color: #fc2779;
    border: 1px solid rgba(252, 39, 121, 0.15);
  }
  html.dark .badge-cf,
  .dark .badge-cf {
    background: #2b111e !important;
    color: #ff4d94 !important;
    border-color: rgba(255, 77, 148, 0.25) !important;
  }

  `}</style>

 <div
 className="product-shell"
 style={{
 direction: isRtl ? "rtl" : "ltr",
 textAlign: isRtl ? "right" : "left",
 }}
 >
 <Link
 href="/#shop"
 className="back-link"
 style={{
 flexDirection: isRtl ? "row-reverse" : "row",
 }}
 >
 <ArrowLeft
 size={14}
 style={{
 transform: isRtl ? "rotate(180deg)" : "none",
 }}
 />{" "}
 {t("product.back")}
 </Link>

 <section
 className="product-hero"
 style={{
 gridTemplateColumns: isRtl ? "minmax(0, 1.1fr) minmax(300px, 0.9fr)" : undefined,
 }}
 >
 <div className="image-panel" style={{ order: isRtl ? 2 : 1 }}>
 <Image 
  src={product.image} 
  alt={product.name} 
  width={400} 
  height={400} 
  priority 
  sizes="(max-width: 540px) 100vw, (max-width: 860px) 50vw, 400px" 
  style={{ width: '82%', height: '82%', maxHeight: '380px', objectFit: 'contain' }} 
  />
 </div>

 <div className="detail-panel" style={{ order: isRtl ? 1 : 2 }}>
 <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
  <p className="kicker" style={{ marginBottom: 0 }}>{product.category} / {product.subcat}</p>
  {isKBeauty && (
   <Link
    href="/k-beauty"
    style={{
     background: "#fc2779",
     color: "#fff",
     fontSize: "0.55rem",
     fontWeight: 700,
     letterSpacing: "0.14em",
     textTransform: "uppercase",
     padding: "3px 8px",
     borderRadius: "4px",
     textDecoration: "none",
     display: "inline-flex",
     alignItems: "center",
     boxShadow: "0 2px 6px rgba(252,39,121,0.2)",
    }}
   >
    K-Beauty Collection →
   </Link>
  )}
  {isMens && (
   <Link
    href="/mens-grooming"
    style={{
     background: "#161412",
     color: "#fff",
     fontSize: "0.55rem",
     fontWeight: 700,
     letterSpacing: "0.14em",
     textTransform: "uppercase",
     padding: "3px 8px",
     borderRadius: "4px",
     textDecoration: "none",
     display: "inline-flex",
     alignItems: "center",
     boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    }}
   >
    Men's Grooming Collection →
   </Link>
  )}
 </div>
  {(isVeg || isCF) && (
   <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px", marginBottom: "12px" }}>
    {isVeg && (
     <span className="badge-vegan" style={{
      fontSize: "0.55rem",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "3px 8px",
      borderRadius: "4px",
      display: "inline-flex",
      alignItems: "center"
     }}>
      🌱 {locale === "hi" ? "शाकाहारी / वीगन" : locale === "ar" ? "نباتي" : "100% Vegan"}
     </span>
    )}
    {isCF && (
     <span className="badge-cf" style={{
      fontSize: "0.55rem",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "3px 8px",
      borderRadius: "4px",
      display: "inline-flex",
      alignItems: "center"
     }}>
      🐰 {locale === "hi" ? "क्रूरता-मुक्त" : locale === "ar" ? "غير مجرب على الحيوانات" : "Cruelty-Free"}
     </span>
    )}
   </div>
  )}
 <h1>{product.name}</h1>
 <p className="brand">{product.brand} {product.badge ? `/ ${product.badge}` : ""}</p>

 <div className="price-box">
 <div>
 <small>{t("product.price")}</small>
 <b>{convertAndFormatPrice(product.price, currency)}</b>
 </div>
 <div>
 <small>{t("product.rating")}</small>
 <b>{product.rating}</b>
 </div>
 <div>
 <small>{t("product.saving")}</small>
 <em>{save > 0 ? `${save}% ${t("product.off")}` : "Check price"}</em>
 </div>
 </div>

  <AiProductTranslator
  description={product.description}
  bestFor={bestFor}
  avoidIf={avoidIf}
  usage={usageText}
  ingredients={ingredients}
  locale={locale}
  mirhaNotes={mirhaNoteText}
  />

  {featuredInGuides.length > 0 && (
    <section
      style={{
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "0 24px",
        marginBottom: "2.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <BookOpen size={15} color="#a27b5c" />
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#a27b5c",
            fontWeight: 700,
            margin: 0,
            fontFamily: "monospace",
          }}
        >
          As Seen In Our Guides
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {featuredInGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/blog/${guide.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem 1.1rem",
              background: "#fffaf4",
              border: "1px solid #e3d8ce",
              borderRadius: "10px",
              textDecoration: "none",
              gap: "0.4rem",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#161412",
                lineHeight: 1.3,
              }}
            >
              {guide.title}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.76rem",
                color: "#756b63",
                lineHeight: 1.5,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {guide.excerpt}
            </p>
            <span
              style={{
                fontSize: "0.68rem",
                color: "#a27b5c",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              Read guide → {guide.readTime}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )}

 <a
 href={affiliateUrl}
 className="cta"
 target="_blank"
 rel="noopener noreferrer sponsored"
 style={{
 display: "inline-flex",
 flexDirection: isRtl ? "row-reverse" : "row",
 marginTop: "24px",
 }}
 >
 {t("product.amazon_btn")} ({getAmazonStoreName(currency)}){" "}
 <ExternalLink
 size={14}
 style={{
 marginLeft: isRtl ? 0 : "6px",
 marginRight: isRtl ? "6px" : 0,
 }}
 />
 </a>
 <p className="disclosure">
 {t("product.disclosure")}
 </p>
 </div>
 </section>

 <section className="info-grid">
 <InfoBlock title={t("product.key_details")}>
 <div className="spec-list">
 {Object.entries(product.specs || {}).map(([key, value]) => (
 <div
 className="spec-row"
 key={key}
 style={{
 flexDirection: isRtl ? "row-reverse" : "row",
 }}
 >
 <span>{key}</span>
 <span>{value}</span>
 </div>
 ))}
 </div>
 </InfoBlock>
 </section>

 {alternatives.length ? (
 <section className="related">
 <h2>{t("product.related")}</h2>
 <div className="related-grid">
 {alternatives.map((item) => (
 <Link
 href={`/product/${item.asin}`}
 className="related-card"
 key={item.asin}
 style={{
 textAlign: isRtl ? "right" : "left",
 }}
 >
 <Image 
  src={item.image} 
  alt={item.name} 
  width={150} 
  height={130} 
  sizes="(max-width: 540px) 50vw, 150px" 
  style={{ width: '100%', height: '130px', objectFit: 'contain', marginBottom: '12px' }} 
  />
 <b>{item.name}</b>
 <span>{convertAndFormatPrice(item.price, currency)}</span>
 </Link>
 ))}
 </div>
 </section>
 ) : null}
 </div>
 </main>
 );
}

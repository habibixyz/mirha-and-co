import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
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
 
 const bestFor = [
 ...toList(product.bestFor),
 ...toList(product.concerns),
 product.specs?.["Skin Type"],
 product.specs?.["Best For"],
 ].filter(Boolean).slice(0, 4) as string[];
 
 const avoidIf = toList(product.notIdealFor);
 
 const ingredients = [
 ...toList(product.ingredients),
 product.specs?.["Key Ingredient"],
 ].filter(Boolean) as string[];
 
 const watchOuts = toList(product.watchOuts);
 
 const alternatives = PRODUCT_LIST.filter(
 (item) => item.asin !== product.asin && item.category === product.category
 ).slice(0, 4);

 return (
 <main className="product-page">
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
 usage={product.usage || product.specs?.["Use"] || "Use as directed on the product label. Introduce one new product at a time and patch test first."}
 ingredients={ingredients}
 locale={locale}
 mirhaNotes={product.notes}
 />

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
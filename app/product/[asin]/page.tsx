import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
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
  usage?: string;
  watchOuts?: string[];
  image: string;
  link?: string;
};

const PRODUCT_LIST = PRODUCTS as unknown as Product[];
const AFFILIATE_TAG = "skinwithtanvi-21";

function fmtINR(value: number) {
  return "Rs " + Math.round(value).toLocaleString("en-IN");
}

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

  const affiliateUrl =
    product.link || `https://www.amazon.in/dp/${product.asin}?tag=${AFFILIATE_TAG}`;
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
          color: #c8473a;
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
          color: #c8473a;
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

      <div className="product-shell">
        <Link href="/#shop" className="back-link">
          <ArrowLeft size={14} /> Back to picks
        </Link>

        <section className="product-hero">
          <div className="image-panel">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="detail-panel">
            <p className="kicker">{product.category} / {product.subcat}</p>
            <h1>{product.name}</h1>
            <p className="brand">{product.brand} {product.badge ? `/ ${product.badge}` : ""}</p>

            <div className="price-box">
              <div>
                <small>Price</small>
                <b>{fmtINR(product.price)}</b>
              </div>
              <div>
                <small>Rating</small>
                <b>{product.rating}</b>
              </div>
              <div>
                <small>Saving</small>
                <em>{save > 0 ? `${save}% off` : "Check price"}</em>
              </div>
            </div>

            <p className="description">{product.description}</p>

            <a href={affiliateUrl} className="cta" target="_blank" rel="noopener noreferrer sponsored">
              View on Amazon India <ExternalLink size={14} />
            </a>
            <p className="disclosure">
              Affiliate link. Mirha & Co. may earn commission at no extra cost to you. Prices may change on Amazon.
            </p>
          </div>
        </section>

        <section className="info-grid">
          <InfoBlock title="Best For">
            {bestFor.length ? (
              <ul>{bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
            ) : (
              <p>Use this when the product category and texture match your routine need.</p>
            )}
          </InfoBlock>

          <InfoBlock title="Avoid If">
            {avoidIf.length ? (
              <ul>{avoidIf.map((item) => <li key={item}>{item}</li>)}</ul>
            ) : (
              <p>Skip or patch test if your skin is irritated, compromised, or you react easily to new formulas.</p>
            )}
          </InfoBlock>

          <InfoBlock title="How To Use">
            <p>{product.usage || product.specs?.["Use"] || "Use as directed on the product label. Introduce one new product at a time and patch test first."}</p>
          </InfoBlock>

          <InfoBlock title="Mirha Notes">
            <p>
              This pick is shown for its category fit, price context, ingredient relevance and review signal. It is not medical advice.
            </p>
            {watchOuts.length ? <ul>{watchOuts.map((item) => <li key={item}>{item}</li>)}</ul> : null}
          </InfoBlock>
        </section>

        <section className="info-grid">
          <InfoBlock title="Key Details">
            <div className="spec-list">
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <div className="spec-row" key={key}>
                  <span>{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </InfoBlock>

          <InfoBlock title="Ingredients To Notice">
            {ingredients.length ? (
              <ul>{ingredients.map((item) => <li key={item}>{item}</li>)}</ul>
            ) : (
              <p>Check the product label and patch test if you are sensitive to fragrance, acids or actives.</p>
            )}
          </InfoBlock>
        </section>

        {alternatives.length ? (
          <section className="related">
            <h2>Related picks</h2>
            <div className="related-grid">
              {alternatives.map((item) => (
                <Link href={`/product/${item.asin}`} className="related-card" key={item.asin}>
                  <img src={item.image} alt={item.name} />
                  <b>{item.name}</b>
                  <span>{fmtINR(item.price)}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
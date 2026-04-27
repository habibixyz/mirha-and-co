import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

type PageProps = {
  params: Promise<{ asin: string }>;
};

function formatPrice(price: number) {
  return `Rs ${price.toLocaleString("en-IN")}`;
}

function discount(mrp: number, price: number) {
  return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ asin: product.asin }));
}

export async function generateMetadata({ params }: PageProps) {
  const { asin } = await params;
  const product = PRODUCTS.find((item) => item.asin === asin);

  if (!product) {
    return { title: "Product Not Found | Mirha & Co." };
  }

  return {
    title: `${product.name} | Mirha & Co.`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { asin } = await params;
  const product = PRODUCTS.find((item) => item.asin === asin);

  if (!product) notFound();

  const affiliateUrl = product.link || `https://www.amazon.in/dp/${product.asin}?tag=skinwithtanvi-21`;
  const savePercent = discount(product.mrp, product.price);

  return (
    <main style={{ minHeight: "100vh", background: "#faf8f5", color: "#111", padding: "48px 20px 80px" }}>
      <style>{`
        .product-detail-grid {
          display: grid;
          grid-template-columns: minmax(260px, 420px) 1fr;
          gap: 42px;
        }
        .product-info-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 760px) {
          .product-detail-grid, .product-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Link href="/search" style={{ color: "#8a7465", fontSize: 12, textDecoration: "none" }}>
          Back to Mirha Search
        </Link>

        <section className="product-detail-grid" style={{ marginTop: 28 }}>
          <div style={{ background: "#fff", border: "1px solid #e8e1d8", borderRadius: 12, padding: 28, alignSelf: "start" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain" }}
            />
          </div>

          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "#9b7e6b", margin: "0 0 12px" }}>
              {product.category} / {product.subcat}
            </p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(34px, 6vw, 58px)", fontWeight: 400, lineHeight: 1.05, margin: "0 0 14px" }}>
              {product.name}
            </h1>
            <p style={{ color: "#777", lineHeight: 1.8, fontSize: 15, margin: "0 0 24px", maxWidth: 650 }}>
              {product.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10, marginBottom: 24 }}>
              <Stat label="Price" value={formatPrice(product.price)} />
              <Stat label="Rating" value={`${product.rating} / 5`} />
              <Stat label="Value" value={savePercent > 0 ? `${savePercent}% off` : product.budgetTier.replace("_", " ")} />
            </div>

            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#111", color: "#fff", padding: "14px 22px", borderRadius: 8, textDecoration: "none", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              View on Amazon <ExternalLink size={15} />
            </a>
            <p style={{ color: "#aaa", fontSize: 11, marginTop: 10 }}>
              Affiliate link. We may earn a small commission at no extra cost to you.
            </p>
          </div>
        </section>

        <section className="product-info-grid" style={{ marginTop: 36 }}>
          <InfoBlock title="Best For" items={product.bestFor} />
          <InfoBlock title="Not Ideal For" items={product.notIdealFor} />
          <InfoBlock title="Ingredient Notes" items={product.ingredients} />
          <InfoBlock title="Watch Outs" items={product.watchOuts} />
        </section>

        <section style={{ background: "#111", color: "#fff", borderRadius: 12, padding: 24, marginTop: 16 }}>
          <p style={{ color: "#9b7e6b", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px" }}>
            How Mirha Reads This Product
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 26, margin: "0 0 10px" }}>
            Evidence level: {product.evidenceLevel}
          </h2>
          <p style={{ color: "#ddd", lineHeight: 1.7, margin: 0 }}>
            {product.usage || "Use according to the product label and introduce slowly if your skin is reactive."}
          </p>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e1d8", borderRadius: 10, padding: 14 }}>
      <p style={{ color: "#aaa", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 6px" }}>{label}</p>
      <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, margin: 0 }}>{value}</p>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e1d8", borderRadius: 12, padding: 22 }}>
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 23, margin: "0 0 12px" }}>
        {title}
      </h2>
      {items.length ? (
        <ul style={{ margin: 0, paddingLeft: 18, color: "#6f6963", lineHeight: 1.8, fontSize: 14 }}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#999", lineHeight: 1.7, margin: 0 }}>No specific notes yet.</p>
      )}
    </div>
  );
}

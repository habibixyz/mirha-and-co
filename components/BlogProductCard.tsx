"use client";

import { PRODUCTS } from "@/lib/products";

export default function BlogProductCard({ asin }: { asin: string }) {
  const product = PRODUCTS.find((p) => p.asin === asin);
  if (!product) return null;

  const affiliateUrl = product.link || `https://www.amazon.in/dp/${asin}?tag=skinwithtanvi-21`;
  const disc = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        background: "#faf8f5",
        border: "1px solid #e8e2d9",
        borderRadius: "12px",
        padding: "16px",
        textDecoration: "none",
        color: "inherit",
        margin: "24px 0",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          flexShrink: 0,
          background: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #ede8e0",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {product.badge && (
          <div
            style={{
              display: "inline-block",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#9b7e6b",
              background: "#f7f0e8",
              padding: "2px 8px",
              borderRadius: "3px",
              marginBottom: "6px",
            }}
          >
            {product.badge}
          </div>
        )}
        <p
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "15px",
            color: "#111",
            margin: "0 0 4px",
            lineHeight: 1.3,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </p>
        <p style={{ fontSize: "11px", color: "#999", margin: "0 0 8px" }}>
          {product.brand}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "17px", color: "#111" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {disc > 0 && (
            <>
              <span style={{ fontSize: "12px", color: "#bbb", textDecoration: "line-through" }}>
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  color: "#5a9e6f",
                  background: "#edf7f0",
                  padding: "2px 6px",
                  borderRadius: "3px",
                }}
              >
                {disc}% off
              </span>
            </>
          )}
        </div>
      </div>

      <div
        style={{
          flexShrink: 0,
          background: "#111",
          color: "#fff",
          fontSize: "11px",
          padding: "10px 16px",
          borderRadius: "6px",
          whiteSpace: "nowrap",
        }}
      >
        View →
      </div>
    </a>
  );
}

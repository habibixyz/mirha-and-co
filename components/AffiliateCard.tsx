"use client";

import { PRODUCTS } from "@/lib/products";

export function AffiliateCard(props) {
  const { asin, onClick } = props;

  const product = PRODUCTS.find((p) => p.asin === asin);

  // ✅ fallback support (THIS FIXES YOUR ISSUE)
  const title = product?.name || props.title;
  const description = product?.description || props.description;
  const price = product?.price
    ? `₹${product.price}`
    : props.price;
  const image = product?.image || props.imageUrl;
  const badge = product?.badge || props.badge;

  const affiliateUrl =
    product?.link ||
    `https://www.amazon.in/dp/${asin}?tag=skinwithtanvi-21`;

  return (
    <div
      onClick={() => onClick?.(product)}
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        border: "1px solid var(--rule)",
        background: "#fff",
        margin: "2rem 0",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            background: "var(--rose)",
            color: "#fff",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 500,
            padding: "0.3rem 0.7rem",
            zIndex: 2,
          }}
        >
          {badge}
        </div>
      )}

      {/* Image */}
      <div
        style={{
          background: "var(--sand)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "160px",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Body */}
      <div
        style={{
          padding: "1.5rem 1.8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderLeft: "1px solid var(--rule)",
        }}
      >
        {/* Label */}
        <p
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--rose)",
            fontWeight: 500,
            marginBottom: "0.5rem",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Found on Amazon
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.1rem",
            fontWeight: 400,
            lineHeight: 1.3,
            color: "var(--ink)",
            marginBottom: "0.6rem",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--muted)",
            lineHeight: 1.65,
            marginBottom: "1.2rem",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {description
            ? description.slice(0, 120) + "..."
            : ""}
        </p>

        {/* Price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "var(--ink)",
            }}
          >
            {price}
          </span>

          {/* CTA */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#fff",
              background: "var(--black)",
              textDecoration: "none",
              padding: "0.55rem 1.1rem",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            View on Amazon →
          </a>
        </div>

        {/* Disclaimer */}
        <p
          style={{
            fontSize: "0.58rem",
            color: "var(--muted)",
            marginTop: "0.8rem",
            opacity: 0.7,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          * Affiliate link — we may earn a small commission at no cost to you.
        </p>
      </div>
    </div>
  );
}
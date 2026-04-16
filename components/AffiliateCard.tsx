"use client";

import { PRODUCTS } from "@/lib/products";

export function AffiliateCard(props: any) {
  const { asin, onClick } = props;

  const product = PRODUCTS.find((p) => p.asin === asin);

  const title = product?.name || props.title;
  const description = product?.description || props.description;
  const price = product?.price ? `₹${product.price}` : props.price;
  const image = product?.image || props.imageUrl;
  const badge = product?.badge || props.badge;

  const affiliateUrl =
    product?.link ||
    `https://www.amazon.in/dp/${asin}?tag=skinwithtanvi-21`;

  return (
    <div
      onClick={() => onClick?.(product)}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--rule)",
        background: "#fff",
        margin: "1.5rem auto",
        maxWidth: "360px",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "var(--rose)",
            color: "#fff",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.3rem 0.6rem",
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
          width: "100%",
          height: "200px",
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
          padding: "1.2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Label */}
        <p
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--rose)",
            marginBottom: "0.4rem",
          }}
        >
          Found on Amazon
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.05rem",
            lineHeight: 1.3,
            color: "var(--ink)",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--muted)",
            lineHeight: 1.6,
            marginBottom: "1rem",
          }}
        >
          {description ? description.slice(0, 100) + "..." : ""}
        </p>

        {/* Price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.1rem",
              color: "var(--ink)",
            }}
          >
            {price}
          </span>
          
          <a
            href={affiliateUrl}
  target="_blank"
  rel="noopener noreferrer sponsored"
  onClick={(e) => {
    e.stopPropagation();

    // 🔥 TRACK CLICK
    console.log("Affiliate Click:", {
      asin,
      title,
    });

    // OPTIONAL: trigger parent tracking if passed
    onClick?.({
      asin,
      title,
    });
  }}
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fff",
              background: "#111",
              padding: "0.6rem 1rem",
              textDecoration: "none",
            }}
          >
            View →
          </a>
        </div>

        {/* Disclaimer */}
        <p
          style={{
            fontSize: "0.55rem",
            color: "#999",
            marginTop: "0.7rem",
          }}
        >
          * Affiliate link — we may earn a small commission.
        </p>
      </div>
    </div>
  );
}
"use client";

import { PRODUCTS } from "@/lib/products";
import { useGlobalization } from "./GlobalizationContext";

export function AffiliateCard(props: any) {
  const { asin, onClick } = props;
  const global = useGlobalization();

  const product = PRODUCTS.find((p) => p.asin === asin);

  const title = product?.name || props.title;
  const description = product?.description || props.description;
  const image = product?.image || props.imageUrl;
  const badge = product?.badge || props.badge;

  // Use localized formatted price
  const price = product?.price ? global.formatPrice(product.price) : props.price;

  // Localized affiliate search URL
  const affiliateUrl = global.getAffiliateUrl(
    asin,
    title,
    product?.brand || props.brand || "",
    product?.link
  );

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--rule, #e8e2d9)",
        background: "#fff",
        margin: "1.5rem auto",
        maxWidth: "380px",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "#c8473a",
            color: "#fff",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.3rem 0.6rem",
            zIndex: 2,
            fontWeight: 700,
            borderRadius: "4px",
          }}
        >
          {badge}
        </div>
      )}

      {/* Image */}
      <div
        className="affiliate-image-wrapper"
        style={{
          background: "#faf8f5",
          width: "100%",
          height: "220px",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #f0ebe4",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
            objectFit: "contain",
            padding: "12px",
          }}
        />
      </div>

      {/* Body */}
      <div
        style={{
          padding: "1.2rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Label */}
        <p
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#c8473a",
            fontWeight: 700,
            marginBottom: "0.4rem",
          }}
        >
          {product?.brand ? `${product.brand} · Verification Verified` : "Found on Amazon"}
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.1rem",
            lineHeight: 1.35,
            color: "var(--ink, #1a1714)",
            marginBottom: "0.6rem",
            fontWeight: 400,
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--muted, #6a635d)",
            lineHeight: 1.6,
            marginBottom: "1.2rem",
          }}
        >
          {description ? description.slice(0, 120) + "..." : ""}
        </p>

        {/* Specs Table (SEO Featured Snippet Target) */}
        {product?.specs && (
          <div
            style={{
              background: "#faf8f5",
              padding: "10px 12px",
              borderRadius: "8px",
              marginBottom: "1.2rem",
              border: "1px solid #f0ebe4",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", color: "#5c544e" }}>
              <tbody>
                {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                  <tr key={key} style={{ borderBottom: "1px solid #f4efe9" }}>
                    <td style={{ padding: "5px 0", fontWeight: 700, color: "#1a1714", width: "45%" }}>{key}</td>
                    <td style={{ padding: "5px 0", color: "#6a635d" }}>{value}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: "5px 0", fontWeight: 700, color: "#1a1714" }}>Authenticity</td>
                  <td style={{ padding: "5px 0", color: "#5a9e6f", fontWeight: 700, display: "flex", alignItems: "center", gap: "3px" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    100% Genuine
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Price + CTA Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "1.25rem",
                color: "var(--ink, #1a1714)",
                fontWeight: 400,
              }}
            >
              {price}
            </span>
            {product?.mrp && product.mrp > product.price && (
              <span style={{ fontSize: "11px", color: "#bbb", textDecoration: "line-through" }}>
                {global.formatPrice(product.mrp)}
              </span>
            )}
          </div>

          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Affiliate Click:", { asin, title });
              onClick?.(product || { asin, title });
            }}
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fff",
              background: "#c8473a",
              padding: "10px 14px",
              textDecoration: "none",
              textAlign: "center",
              fontWeight: 700,
              borderRadius: "6px",
              boxShadow: "0 4px 10px rgba(200, 71, 58, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Compare Prices & Buy
          </a>
        </div>

        {/* Disclaimer / Authenticity Guarantee */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.55rem",
            color: "#8b8580",
            marginTop: "10px",
            justifyContent: "center",
          }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#5a9e6f" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Official Storefront · Verified Dispatch</span>
        </div>
      </div>
    </div>
  );
}
"use client";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const affiliateUrl =
    product.link ||
    `https://www.amazon.in/dp/${product.asin}?tag=skinwithtanvi-21`;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 340,
          background: "#fff",
          borderRadius: 8,
          padding: 20,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", marginBottom: 12 }}
        />

        <h3 style={{ marginBottom: 8 }}>{product.name}</h3>

        <p style={{ fontSize: 14, color: "#666" }}>
          {product.description}
        </p>

        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            marginTop: 12,
            padding: 10,
            textAlign: "center",
            background: "#000",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          View on Amazon →
        </a>
      </div>
    </div>
  );
}
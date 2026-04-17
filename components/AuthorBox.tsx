"use client";

export default function AuthorBox() {
  return (
    <div
      style={{
        margin: "60px auto",
        padding: "30px",
        maxWidth: "720px",
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#999",
          marginBottom: "10px",
        }}
      >
        About this guide
      </p>

      <h3
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "20px",
          marginBottom: "12px",
        }}
      >
        Curated by Mirha & Co.
      </h3>

      <p
        style={{
          fontSize: "14px",
          color: "#666",
          lineHeight: 1.7,
        }}
      >
        We curate skincare products based on ingredient quality, real user
        reviews, and suitability for Indian skin and climate conditions.
        No paid placements — only products we genuinely believe are worth trying.
      </p>

      <p
        style={{
          fontSize: "11px",
          color: "#999",
          marginTop: "12px",
        }}
      >
        Affiliate links may earn us a commission at no extra cost to you.
      </p>
    </div>
  );
}
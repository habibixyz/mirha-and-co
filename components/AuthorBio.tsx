"use client";

export default function AuthorBio() {
  return (
    <div style={{
      marginTop: "60px",
      paddingTop: "20px",
      borderTop: "1px solid #eee"
    }}>
      <p style={{
        fontSize: "11px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#999"
      }}>
        Written by
      </p>

      <h4 style={{
        fontFamily: "'DM Serif Display', serif",
        margin: "6px 0",
        fontSize: "18px"
      }}>
        Tanvir Khan, Skincare Enthusiast
      </h4>

      <p style={{
        fontSize: "13px",
        color: "#666",
        lineHeight: 1.6
      }}>
        Former beauty retail buyer with experience in skincare product selection,
        ingredient analysis, and consumer trends in the Indian market.
      </p>

      <p style={{
        fontSize: "11px",
        color: "#999",
        marginTop: "8px"
      }}>
        Updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
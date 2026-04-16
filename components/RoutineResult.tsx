"use client";

import React from "react";
import { RotateCcw, ExternalLink } from "lucide-react";
import { RoutineRecommendation } from "@/lib/routineEngine";
import { PRODUCTS } from "@/lib/products";

const STEPS_ORDER = [
  {
    key: "cleanser",
    label: "Cleanser",
    step: "Step 1",
    icon: "○",
    description: "Start with a clean base. This removes excess oil, pollution, and product buildup without stripping your skin barrier.",
  },
  {
    key: "treatment",
    label: "Serum / Treatment",
    step: "Step 2",
    icon: "◇",
    description: "The active step. Targets your specific concern — acne, pigmentation, or oiliness — with clinically backed ingredients.",
  },
  {
    key: "moisturiser",
    label: "Moisturiser",
    step: "Step 3",
    icon: "△",
    description: "Locks in hydration and strengthens your skin barrier. Yes, even oily skin needs this.",
  },
  {
    key: "sunscreen",
    label: "Sunscreen",
    step: "Step 4",
    icon: "□",
    description: "Non-negotiable. Protects against UV damage, pigmentation, and premature ageing. Morning only.",
  },
];

interface RoutineResultProps {
  routine: RoutineRecommendation;
  onRestart: () => void;
}

function ProductCard({ asin, reason }: { asin: string; reason?: string }) {
  const product = PRODUCTS.find((p) => p.asin === asin);

  if (!product) return null;

  const affiliateUrl =
    product.link || `https://www.amazon.in/dp/${asin}?tag=skinwithtanvi-21`;

  const disc =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        background: "#fff",
        border: "1px solid #e8e2d9",
        borderRadius: "12px",
        padding: "16px",
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#111";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e8e2d9";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
      }}
    >
      {/* Product Image */}
      <div
        style={{
          width: "90px",
          height: "90px",
          flexShrink: 0,
          background: "#f7f4ef",
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: "6px",
          }}
        />
      </div>

      {/* Product Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Badge */}
        {product.badge && (
          <div
            style={{
              display: "inline-block",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#9b7e6b",
              background: "#f7f0e8",
              padding: "3px 8px",
              borderRadius: "3px",
              marginBottom: "6px",
            }}
          >
            {product.badge}
          </div>
        )}

        {/* Name */}
        <p
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "15px",
            color: "#111",
            lineHeight: 1.3,
            margin: "0 0 4px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </p>

        {/* Brand */}
        <p
          style={{
            fontSize: "11px",
            color: "#999",
            margin: "0 0 8px",
            letterSpacing: "0.05em",
          }}
        >
          {product.brand}
        </p>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "18px",
              color: "#111",
              fontWeight: 400,
            }}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {disc > 0 && (
            <>
              <span
                style={{
                  fontSize: "12px",
                  color: "#bbb",
                  textDecoration: "line-through",
                }}
              >
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  color: "#5a9e6f",
                  background: "#edf7f0",
                  padding: "2px 6px",
                  borderRadius: "3px",
                  fontWeight: 600,
                }}
              >
                {disc}% off
              </span>
            </>
          )}
        </div>
      </div>

      {/* CTA Arrow */}
      <div
        style={{
          flexShrink: 0,
          width: "36px",
          height: "36px",
          background: "#111",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ExternalLink size={14} color="#fff" />
      </div>
    </a>
  );
}

export default function RoutineResult({ routine, onRestart }: RoutineResultProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#faf8f5",
        paddingTop: "60px",
        paddingBottom: "80px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "680px", margin: "0 auto" }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#9b7e6b",
              marginBottom: "14px",
            }}
          >
            Mirha & Co. / Your Routine
          </p>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 400,
              color: "#111",
              margin: "0 0 16px",
              lineHeight: 1.1,
            }}
          >
            Your Recommended<br />
            <em style={{ fontStyle: "italic", color: "#9b7e6b" }}>4-Step Routine</em>
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#888",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Curated for your skin type and concerns. Every product is available on Amazon India with verified reviews.
          </p>
        </div>

        {/* ── STEPS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
          {STEPS_ORDER.map((step, index) => {
            const product = routine[step.key as keyof RoutineRecommendation];
            if (!product) return null;

            return (
              <div
                key={step.key}
                style={{
                  background: "#fff",
                  border: "1px solid #ede8e0",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                {/* Step Header */}
                <div
                  style={{
                    padding: "20px 24px 16px",
                    borderBottom: "1px solid #f0ebe3",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  {/* Step Number */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      flexShrink: 0,
                      border: "1px solid #ddd",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "monospace",
                      fontSize: "11px",
                      color: "#999",
                      marginTop: "2px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#bbb",
                        margin: "0 0 4px",
                      }}
                    >
                      {step.step}
                    </p>
                    <h2
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "22px",
                        fontWeight: 400,
                        color: "#111",
                        margin: "0 0 6px",
                        lineHeight: 1.2,
                      }}
                    >
                      {step.label}
                    </h2>
                    <p
  style={{
    fontSize: "13px",
    color: "#666",
    lineHeight: 1.6,
    margin: "0 0 6px",
  }}
>
  {product.reason}
</p>

<p
  style={{
    fontSize: "12px",
    color: "#aaa",
    lineHeight: 1.5,
    margin: 0,
  }}
>
  {step.description}
</p>
                  </div>
                </div>

                {/* Product Card */}
                <div style={{ padding: "16px 20px" }}>
                  <p
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#ccc",
                      margin: "0 0 10px",
                    }}
                  >
                    Recommended Product
                  </p>
                  <ProductCard asin={product.asin} reason={product.reason} />
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#ccc",
                      margin: "10px 0 0",
                      textAlign: "center",
                    }}
                  >
                    ✦ Affiliate link — we may earn a small commission at no extra cost to you
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── HOW TO USE ── */}
        <div
          style={{
            background: "#111",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "24px",
            color: "#fff",
          }}
        >
          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "20px",
              fontWeight: 400,
              margin: "0 0 20px",
              color: "#fff",
            }}
          >
            How to Use This Routine
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* AM */}
            <div>
              <p
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#9b7e6b",
                  margin: "0 0 12px",
                }}
              >
                Morning
              </p>
              {["Cleanser", "Treatment", "Moisturiser", "Sunscreen"].map((s, i) => (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      border: "1px solid #444",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      color: "#888",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "13px", color: "#ddd" }}>{s}</span>
                </div>
              ))}
            </div>

            {/* PM */}
            <div>
              <p
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#9b7e6b",
                  margin: "0 0 12px",
                }}
              >
                Evening
              </p>
              {["Cleanser", "Treatment", "Moisturiser"].map((s, i) => (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      border: "1px solid #444",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      color: "#888",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "13px", color: "#ddd" }}>{s}</span>
                </div>
              ))}
              <div style={{ marginTop: "8px", padding: "8px 0", borderTop: "1px solid #222" }}>
                <span style={{ fontSize: "11px", color: "#666" }}>No sunscreen at night</span>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid #222",
              fontSize: "12px",
              color: "#666",
              lineHeight: 1.6,
            }}
          >
            Visible results in 4–8 weeks with consistent daily use. Start slowly with actives — every other night for the first two weeks.
          </div>
        </div>

        {/* ── BUTTONS ── */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onRestart}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "14px 24px",
              background: "transparent",
              border: "1px solid #ddd",
              color: "#666",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "8px",
              transition: "all 0.2s",
              fontFamily: "monospace",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#111";
              (e.currentTarget as HTMLButtonElement).style.color = "#111";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#ddd";
              (e.currentTarget as HTMLButtonElement).style.color = "#666";
            }}
          >
            <RotateCcw size={14} />
            Retake Quiz
          </button>

          <a
            href="/"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 24px",
              background: "#111",
              color: "#fff",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "8px",
              border: "1px solid #111",
              transition: "all 0.2s",
              fontFamily: "monospace",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#333";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#111";
            }}
          >
            Explore All Products →
          </a>
        </div>

        {/* ── DISCLAIMER ── */}
        <p
          style={{
            fontSize: "11px",
            color: "#bbb",
            textAlign: "center",
            marginTop: "32px",
            lineHeight: 1.6,
            maxWidth: "480px",
            margin: "32px auto 0",
          }}
        >
          This routine provides general skincare suggestions and is not medical advice. Please consult a dermatologist for serious skin concerns.
        </p>
      </div>
    </div>
  );
}

// components/ShareableRoutineCard.tsx
// NEW FILE — Generates a shareable link + copy-paste text card for the user's routine.
// Drop this into the dashboard page.
//
// Usage:
//   import ShareableRoutineCard from "@/components/ShareableRoutineCard";
//   <ShareableRoutineCard />

"use client";

import { useState } from "react";

interface RoutineStep {
  step: string;
  product: string;
  asin?: string;
}

interface Routine {
  skinType: string;
  am: RoutineStep[];
  pm: RoutineStep[];
}

// In production: pull this from the user's saved routine in your DB
const SAMPLE: Routine = {
  skinType: "Oily / Acne-prone",
  am: [
    { step: "Cleanser", product: "Cetaphil Gentle Skin Hydrating Face Wash", asin: "B01CCGW4OE" },
    { step: "Serum", product: "Minimalist Niacinamide 10% + Zinc", asin: "B0DH88LZ11" },
    { step: "Sunscreen", product: "Deconstruct Gel Sunscreen SPF 50", asin: "B0B45RB1RV" },
  ],
  pm: [
    { step: "Cleanser", product: "Cetaphil Gentle Skin Hydrating Face Wash", asin: "B01CCGW4OE" },
    { step: "Exfoliant", product: "The Ordinary Glycolic Acid 7% Toner", asin: "B071914GGL" },
    { step: "Retinol", product: "Minimalist Retinol 0.3% + Squalane", asin: "B091JG3GJ5" },
    { step: "Moisturiser", product: "Cetaphil Moisturising Cream 250g", asin: "B099MJH88B" },
  ],
};

export default function ShareableRoutineCard({ routine = SAMPLE }: { routine?: Routine }) {
  const [copied, setCopied] = useState(false);

  const shareText = `My skincare routine — curated by Mirha & Co.
Skin type: ${routine.skinType}

☀️ Morning
${routine.am.map((s, i) => `${i + 1}. ${s.step}: ${s.product}`).join("\n")}

🌙 Evening
${routine.pm.map((s, i) => `${i + 1}. ${s.step}: ${s.product}`).join("\n")}

Built with Mirha & Co. — mirhaandco.com`;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/routine/share?skin=${encodeURIComponent(routine.skinType)}`
      : "https://mirhaandco.com/routine/share";

  async function copy() {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: "My Mirha Routine", text: shareText, url: shareUrl });
    } else {
      copy();
    }
  }

  return (
    <div
      style={{
        border: "1px solid #e8e8e8",
        borderRadius: 14,
        overflow: "hidden",
        fontFamily: "inherit",
      }}
    >
      {/* Card header */}
      <div
        style={{
          background: "#1a1a1a",
          color: "#fff",
          padding: "20px 24px",
        }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.6, marginBottom: 4 }}>
          My routine
        </p>
        <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Mirha Skin Desk</p>
        <p style={{ fontSize: 13, opacity: 0.6 }}>{routine.skinType}</p>
      </div>

      {/* Steps */}
      <div style={{ padding: "20px 24px" }}>
        {(["am", "pm"] as const).map((slot) => (
          <div key={slot} style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "#aaa",
                marginBottom: 10,
              }}
            >
              {slot === "am" ? "☀️ Morning" : "🌙 Evening"}
            </p>
            {routine[slot].map((s) => (
              <div
                key={s.product}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #f5f5f5",
                  gap: 12,
                }}
              >
                <div>
                  <span style={{ fontSize: 11, color: "#aaa", marginRight: 8 }}>{s.step}</span>
                  <span style={{ fontSize: 13 }}>{s.product}</span>
                </div>
                {s.asin && (
                  <a
                    href={`https://www.amazon.in/dp/${s.asin}?tag=YOUR_AFFILIATE_TAG`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 11,
                      color: "#888",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    Buy →
                  </a>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button
            onClick={copy}
            style={{
              flex: 1,
              padding: "10px 0",
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              background: "transparent",
              fontSize: 13,
              cursor: "pointer",
              color: "#333",
            }}
          >
            {copied ? "Copied!" : "Copy text"}
          </button>
          <button
            onClick={share}
            style={{
              flex: 1,
              padding: "10px 0",
              border: "1px solid #1a1a1a",
              borderRadius: 8,
              background: "#1a1a1a",
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Share routine
          </button>
        </div>

        <p
          style={{
            fontSize: 11,
            color: "#bbb",
            textAlign: "center",
            marginTop: 14,
          }}
        >
          mirhaandco.com
        </p>
      </div>
    </div>
  );
}

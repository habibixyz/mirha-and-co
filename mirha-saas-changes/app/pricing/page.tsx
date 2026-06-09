// app/pricing/page.tsx
// NEW FILE — Add a link to this page in your nav: <Link href="/pricing">Pro</Link>

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Mirha & Co.",
  description:
    "Upgrade to Mirha Pro for full ingredient analysis, routine tracking, and personalised skin insights.",
};

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    description: "Good for casual explorers.",
    features: [
      "3 ingredient checks / month",
      "Routine builder (1 saved routine)",
      "Basic dupe finder",
      "Blog & guides access",
    ],
    cta: "Get started",
    href: "/dashboard",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/ month",
    description: "For people serious about their skin.",
    features: [
      "Unlimited ingredient checks",
      "Full ingredient conflict checker",
      "Unlimited saved routines + history",
      "Hard water risk test (detailed report)",
      "Dupe finder with price comparison",
      "Expert search — full database",
      "Weekly skin check-in tracker",
      "Priority email support",
    ],
    cta: "Start 7-day free trial",
    href: "/api/auth/subscribe?plan=pro",
    highlight: true,
  },
  {
    name: "Annual Pro",
    price: "₹1,499",
    period: "/ year",
    description: "Save ₹889 vs monthly.",
    features: [
      "Everything in Pro",
      "2 months free",
      "Early access to new tools",
      "Shareable routine card (link)",
    ],
    cta: "Get Annual Pro",
    href: "/api/auth/subscribe?plan=annual",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "60px 24px",
        fontFamily: "inherit",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: 12,
          }}
        >
          Pricing
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 500,
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}
        >
          Skincare intelligence, properly priced.
        </h1>
        <p style={{ fontSize: 16, color: "#666", maxWidth: 480, margin: "0 auto" }}>
          Free tools to get started. Pro when you want the full picture.
        </p>
      </div>

      {/* Plans */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          alignItems: "start",
        }}
      >
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            style={{
              border: plan.highlight ? "2px solid #1a1a1a" : "1px solid #e5e5e5",
              borderRadius: 16,
              padding: "32px 28px",
              background: plan.highlight ? "#1a1a1a" : "#fff",
              color: plan.highlight ? "#fff" : "#1a1a1a",
              position: "relative",
            }}
          >
            {plan.highlight && (
              <span
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#1a1a1a",
                  border: "1px solid #444",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "3px 12px",
                  borderRadius: 99,
                  whiteSpace: "nowrap",
                }}
              >
                Most popular
              </span>
            )}

            <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.7 }}>
              {plan.name}
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 500 }}>{plan.price}</span>
              <span style={{ fontSize: 14, opacity: 0.6 }}>{plan.period}</span>
            </div>
            <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 24 }}>{plan.description}</p>

            <a
              href={plan.href}
              style={{
                display: "block",
                textAlign: "center",
                padding: "12px 0",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                marginBottom: 28,
                background: plan.highlight ? "#fff" : "#1a1a1a",
                color: plan.highlight ? "#1a1a1a" : "#fff",
              }}
            >
              {plan.cta}
            </a>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {plan.features.map((f) => (
                <li
                  key={f}
                  style={{
                    fontSize: 13,
                    padding: "7px 0",
                    borderBottom: `1px solid ${plan.highlight ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    opacity: 0.85,
                  }}
                >
                  <span style={{ flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 72, maxWidth: 640, margin: "72px auto 0" }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: 32 }}>Common questions</h2>
        {[
          {
            q: "Can I cancel anytime?",
            a: "Yes. Cancel from your dashboard at any time. You keep Pro access until the end of your billing period.",
          },
          {
            q: "What payment methods do you accept?",
            a: "UPI, cards (Visa / Mastercard / RuPay), and net banking via Razorpay.",
          },
          {
            q: "Is the free plan actually free?",
            a: "Yes, no credit card needed. The free plan stays free — we just limit the number of checks per month.",
          },
          {
            q: "Do affiliate links affect recommendations?",
            a: "No. Product picks are editorially independent. Affiliate links are disclosed on every page.",
          },
        ].map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid #f0f0f0" }}>
            <p style={{ fontWeight: 500, marginBottom: 6, fontSize: 15 }}>{q}</p>
            <p style={{ fontSize: 14, color: "#666", margin: 0 }}>{a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

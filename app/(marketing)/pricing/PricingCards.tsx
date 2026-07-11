"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";

export function PricingCards() {
  const [paymentRegion, setPaymentRegion] = useState<"INR" | "USD">("INR");

  // Automatically detect timezone to set default region
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && (tz.includes("Kolkata") || tz.includes("Calcutta") || tz.includes("Delhi") || tz.includes("Mumbai"))) {
        setPaymentRegion("INR");
      } else {
        setPaymentRegion("USD");
      }
    } catch (e) {
      console.warn("Timezone detection failed, defaulting to INR");
    }
  }, []);

  const getPlans = () => {
    if (paymentRegion === "USD") {
      return [
        {
          name: "Free",
          price: "$0",
          period: "",
          description: "Perfect for casual skincare explorers.",
          features: [
            "Create your skin profile",
            "Track up to 2 routines per day",
            "Basic Skin Journal logs",
            "Standard ingredient checker",
            "3 AI consultations/day",
            "Access to curated blog & guides",
          ],
          cta: "Get started",
          href: "/dashboard",
          highlight: false,
        },
        {
          name: "Pro",
          price: "$10.99",
          period: "/ month",
          description: "For people serious about their skin health.",
          features: [
            "Unlimited routines and journal logs",
            "Cross-product Ingredient Conflict Checker",
            "Journal photo uploads & AI skin analysis per photo",
            "Expert AI face scan — daily barrier, acne & redness scores",
            "AI Skin Trends — Mirha Brain analyses your journal history",
            "Mirha Search Brain Mode — 20 AI consultations/day",
          ],
          cta: "Upgrade to Pro",
          href: "/dashboard/subscription",
          highlight: true,
        },
        {
          name: "Annual Pro",
          price: "$99.99",
          period: "/ year",
          description: "Save over 20% compared to monthly billing.",
          features: [
            "Everything in Pro tier",
            "Equivalent to 2 months free",
            "Shareable routine card links",
            "Priority support via email",
          ],
          cta: "Get Annual Pro",
          href: "/dashboard/subscription",
          highlight: false,
        },
      ];
    }

    return [
      {
        name: "Free",
        price: "₹0",
        period: "",
        description: "Perfect for casual skincare explorers.",
        features: [
          "Create your skin profile",
          "Track up to 2 routines per day",
          "Basic Skin Journal logs",
          "Standard ingredient checker",
          "3 AI consultations/day",
          "Access to curated blog & guides",
        ],
        cta: "Get started",
        href: "/dashboard",
        highlight: false,
      },
      {
        name: "Pro",
        price: "₹199",
        period: "/ month",
        description: "For people serious about their skin health.",
        features: [
          "Unlimited routines and journal logs",
          "Cross-product Ingredient Conflict Checker",
          "Journal photo uploads & AI skin analysis per photo",
          "Expert AI face scan — daily barrier, acne & redness scores",
          "AI Skin Trends — Mirha Brain analyses your journal history",
          "Mirha Search Brain Mode — 20 AI consultations/day",
        ],
        cta: "Upgrade to Pro",
        href: "/dashboard/subscription",
        highlight: true,
      },
      {
        name: "Annual Pro",
        price: "₹1,499",
        period: "/ year",
        description: "Save ₹889 compared to monthly billing.",
        features: [
          "Everything in Pro tier",
          "Equivalent to 2 months free",
          "Shareable routine card links",
          "Priority support via email",
        ],
        cta: "Get Annual Pro",
        href: "/dashboard/subscription",
        highlight: false,
      },
    ];
  };

  const plans = getPlans();

  return (
    <div style={{ width: "100%" }}>
      {/* Dynamic Region Selector Toggle */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "3rem" }}>
        <button
          onClick={() => setPaymentRegion("USD")}
          style={{
            padding: "0.5rem 1.2rem",
            borderRadius: "99px",
            border: "1px solid " + (paymentRegion === "USD" ? "var(--rose)" : "var(--rule)"),
            background: paymentRegion === "USD" ? "var(--rose)" : "transparent",
            color: paymentRegion === "USD" ? "#fff" : "var(--ink)",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 600,
            transition: "all 0.3s ease",
            boxShadow: paymentRegion === "USD" ? "0 4px 12px rgba(252, 39, 121, 0.15)" : "none"
          }}
        >
          🇺🇸 Global (USD)
        </button>
        <button
          onClick={() => setPaymentRegion("INR")}
          style={{
            padding: "0.5rem 1.2rem",
            borderRadius: "99px",
            border: "1px solid " + (paymentRegion === "INR" ? "var(--rose)" : "var(--rule)"),
            background: paymentRegion === "INR" ? "var(--rose)" : "transparent",
            color: paymentRegion === "INR" ? "#fff" : "var(--ink)",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 600,
            transition: "all 0.3s ease",
            boxShadow: paymentRegion === "INR" ? "0 4px 12px rgba(252, 39, 121, 0.15)" : "none"
          }}
        >
          🇮🇳 India (INR)
        </button>
      </div>

      {/* Plans Grid */}
      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${plan.highlight ? "highlighted" : ""}`}
          >
            <div className="gloss-sheen" />
            {plan.highlight && <span className="popular-badge">Most Popular</span>}

            <p className="plan-name">{plan.name}</p>
            <div className="plan-price-row">
              <span className="plan-price">{plan.price}</span>
              <span className="plan-period">{plan.period}</span>
            </div>
            <p className="plan-desc">{plan.description}</p>

            <Link
              href={plan.href}
              className={`plan-cta ${
                plan.highlight ? "highlighted-cta" : "normal-cta"
              }`}
            >
              {plan.cta}
            </Link>

            <ul className="features-list">
              {plan.features.map((feature) => (
                <li key={feature} className="feature-item">
                  <span className="feature-icon-wrap">
                    <Check size={14} color="var(--rose)" strokeWidth={2.5} />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ScanFace,
  Layers,
  Droplet,
  FlaskConical,
  Flame,
  Code,
  Zap,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Flower,
  ShieldCheck,
  Palette,
} from "lucide-react";

type ToolCategory = "all" | "ai" | "shop" | "b2b";

interface ToolItem {
  id: string;
  category: "ai" | "shop" | "b2b";
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  ctaText: string;
  href: string;
  icon: typeof ScanFace;
  isPopular?: boolean;
}

const TOOLS: ToolItem[] = [
  {
    id: "batch-checker",
    category: "ai",
    badge: "40+ Brands",
    title: "Cosmetic Batch & Expiry Lab",
    subtitle: "Decode production dates, shelf life & PAO freshness",
    description:
      "Never put expired or oxidized actives on your barrier. Decode batch codes, calculate period after opening (PAO), and verify product freshness for MAC, Dior, Maybelline, and 40+ brands.",
    highlights: ["40+ Luxury & drugstore brands", "PAO period-after-opening calculator", "Preservative degradation risk guide"],
    ctaText: "Check Batch Code",
    href: "/tools/batch-checker",
    icon: ShieldCheck,
    isPopular: true,
  },
  {
    id: "color-studio",
    category: "shop",
    badge: "Color Theory",
    title: "Color Analysis & Harmony Studio",
    subtitle: "Seasonal palettes, lip/blush harmonies & shade converter",
    description:
      "Determine your seasonal color identity (Deep Autumn, Cool Winter, etc.), explore curated lip and cheek color swatches, and convert your foundation shade across MAC, Fenty, Huda, and L'Oréal.",
    highlights: ["Seasonal contrast & color identity", "Harmonious lip & blush swatches", "Universal cross-brand shade matrix"],
    ctaText: "Open Color Studio",
    href: "/tools/color-studio",
    icon: Palette,
    isPopular: true,
  },
  {
    id: "makeup",
    category: "ai",
    badge: "All-in-One Lab",
    title: "All-in-One Makeup Lab",
    subtitle: "Batch code expiry, AI look rater & 3-step routine",
    description:
      "Decode cosmetic batch codes for 70+ brands, audit your makeup look with private on-device AI vision, and get customized 3-step routines matched to your skin depth and undertone.",
    highlights: ["70+ Brand batch expiry decoder", "On-device AI look & harmony rater", "Custom 3-step daily routine"],
    ctaText: "Launch Makeup Lab",
    href: "/makeup",
    icon: Palette,
    isPopular: true,
  },
  {
    id: "scan",
    category: "ai",
    badge: "1 Free Scan Daily",
    title: "AI Facial Skin Scanner",
    subtitle: "Real-time computer vision & barrier diagnostics",
    description:
      "Assess skin barrier integrity, surface hydration, redness, and active breakout areas in 30 seconds using your browser camera. Privacy-first: zero photo uploads saved.",
    highlights: ["1 Free daily camera scan", "Zero photo uploads stored", "Instant clinical barrier score"],
    ctaText: "Launch Face Scanner",
    href: "/tools/analysis",
    icon: ScanFace,
    isPopular: true,
  },
  {
    id: "routine",
    category: "ai",
    badge: "Climate Calibrated",
    title: "Smart Routine Builder",
    subtitle: "AM & PM regimens tailored to your local humidity",
    description:
      "A clinical diagnostic engine assessing skin type, ambient weather, sensitivity triggers, and budget to assemble an exact morning and evening active sequence.",
    highlights: ["Weather & humidity calibrated", "Step-by-step AM/PM application order", "Clash-free active sequencing"],
    ctaText: "Build My Regimen",
    href: "/tools/routine",
    icon: Layers,
    isPopular: true,
  },
  {
    id: "water",
    category: "ai",
    badge: "25+ Indian Metros",
    title: "Hard Water & TDS Test",
    subtitle: "City tap water mineral impact on hair & skin",
    description:
      "Tap water mineral hardness varies dramatically across Indian cities. Enter your metro to calculate TDS, calcium carbonates, and chelating wash solutions.",
    highlights: ["Delhi, Mumbai, Bengaluru & 25+ cities", "Chelating cleanser recommendations", "Hairfall & scalp dryness prevention"],
    ctaText: "Check City Water",
    href: "/tools/hard-water",
    icon: Droplet,
  },
  {
    id: "ingredients",
    category: "ai",
    badge: "Collision Guard",
    title: "Ingredient Collision Checker",
    subtitle: "Cross-reference active skincare ingredients",
    description:
      "Layering active ingredients like Retinol, Glycolic Acid, and Vitamin C incorrectly compromises your barrier. Cross-reference formulas to identify clashing actives.",
    highlights: ["Barrier conflict prevention", "pH compatibility validation", "AM vs PM separation rules"],
    ctaText: "Verify Ingredients",
    href: "/tools/ingredients",
    icon: FlaskConical,
  },
  {
    id: "dupes",
    category: "shop",
    badge: "Save 70%+",
    title: "Luxury & K-Beauty Dupe Vault",
    subtitle: "Vetted affordable alternatives to viral formulations",
    description:
      "Stop overpaying for marketing hype. Find exact formulation dupes for expensive luxury serums and Korean cult favorites, matched by active percentages and ceramide ratios.",
    highlights: ["100+ active formula matches", "Side-by-side INCI breakdown", "Direct verified purchasing links"],
    ctaText: "Explore Dupe Vault",
    href: "/tools/dupes",
    icon: Flame,
    isPopular: true,
  },
  {
    id: "k-beauty",
    category: "shop",
    badge: "Curated Edits",
    title: "K-Beauty Collection",
    subtitle: "Formulations vetted for tropical & humid climates",
    description:
      "Korean glass-skin favorites curated specifically for Indian skin tones and seasonal humidity, avoiding heavy pore-clogging formulations.",
    highlights: ["Lightweight gel textures", "Fermented active ingredients", "Centella & heartleaf soothers"],
    ctaText: "View K-Beauty Picks",
    href: "/k-beauty",
    icon: Flower,
  },
  {
    id: "b2b-api",
    category: "b2b",
    badge: "Enterprise B2B",
    title: "Skincare Intelligence API & Widget",
    subtitle: "Headless recommendation engine & embeddable diagnostic quiz",
    description:
      "Power personalized routine recommendations and live environmental telemetry inside your e-commerce storefront with our headless REST API or 1-line drop-in widget.",
    highlights: ["Instant trial key sandbox", "Shopify, WooCommerce & custom REST API", "Sub-100ms edge response latency"],
    ctaText: "Explore B2B Solutions",
    href: "/b2b",
    icon: Code,
  },
  {
    id: "journal",
    category: "ai",
    badge: "Member Portal",
    title: "Skin Health Dashboard",
    subtitle: "Barrier recovery logging & routine tracking",
    description:
      "Save your AI camera scans, track skin barrier recovery week-over-week, log morning and nighttime routine adherence, and monitor product sensitivities.",
    highlights: ["Visual progress timeline", "Personal routine organizer", "Sensitivity conflict history"],
    ctaText: "Open Dashboard",
    href: "/dashboard",
    icon: BookOpen,
  },
];

export default function ToolsHubClient() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>("all");

  const filteredTools =
    selectedCategory === "all"
      ? TOOLS
      : TOOLS.filter((tool) => tool.category === selectedCategory);

  return (
    <div className="tools-hub-page">
      <style>{`
        .tools-hub-page {
          width: 100%;
          min-height: 100vh;
          padding: 48px 24px 80px;
          background: #fbf7f1;
          color: #161412;
          box-sizing: border-box;
          transition: background 0.3s ease, color 0.3s ease;
        }

        html.dark .tools-hub-page {
          background: #0e0d0c;
          color: #f7f5f2;
        }

        .tools-hub-shell {
          max-width: 1360px;
          width: 100%;
          margin: 0 auto !important;
          padding: 0 12px;
          box-sizing: border-box;
        }

        .tools-hero {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 40px !important;
        }

        .tools-eyebrow {
          display: inline-block;
          color: #fc2779;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .tools-title {
          font-family: var(--font-dm-serif), var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 50px);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #161412;
          margin: 0 0 14px 0;
        }

        html.dark .tools-title {
          color: #ffffff;
        }

        .tools-subtitle {
          font-size: 15px;
          line-height: 1.6;
          color: #6e6862;
          margin: 0 0 28px 0;
        }

        html.dark .tools-subtitle {
          color: #a09990;
        }

        .tools-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin: 0 auto;
        }

        .tools-filter-btn {
          padding: 9px 20px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid #ded7cf;
          background: #ffffff;
          color: #6e6862;
        }

        .tools-filter-btn:hover {
          border-color: #fc2779;
          color: #fc2779;
          transform: translateY(-1px);
        }

        .tools-filter-btn.active {
          background: #161412;
          color: #ffffff;
          border-color: #161412;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
        }

        html.dark .tools-filter-btn {
          background: #181614;
          border-color: rgba(255, 255, 255, 0.12);
          color: #a09990;
        }

        html.dark .tools-filter-btn:hover {
          border-color: #fc2779;
          color: #fc2779;
        }

        html.dark .tools-filter-btn.active {
          background: #ffffff;
          color: #0e0d0c;
          border-color: #ffffff;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.18);
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 24px;
          width: 100%;
          margin-bottom: 56px;
        }

        @media (max-width: 860px) {
          .tools-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .tool-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 28px 24px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid #e5ded6;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
          text-decoration: none !important;
          color: inherit !important;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
        }

        .tool-card:hover {
          transform: translateY(-6px);
          border-color: #fc2779;
          box-shadow: 0 20px 48px rgba(252, 39, 121, 0.12);
        }

        html.dark .tool-card {
          background: #181614;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }

        html.dark .tool-card:hover {
          border-color: #fc2779;
          box-shadow: 0 20px 48px rgba(252, 39, 121, 0.2);
        }

        .tool-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .tool-card-header-main {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
          flex: 1;
        }

        .tool-card-title-group {
          min-width: 0;
        }

        .tool-card-header-badge {
          flex-shrink: 0;
        }

        .tool-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fbf7f1;
          border: 1px solid #e8e2d8;
          color: #fc2779;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .tool-card:hover .tool-card-icon {
          background: #fc2779;
          border-color: #fc2779;
          color: #ffffff;
          transform: scale(1.05);
        }

        html.dark .tool-card-icon {
          background: #23201d;
          border-color: rgba(255, 255, 255, 0.12);
          color: #ff4d94;
        }

        .tool-card-badge {
          padding: 4px 11px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: #f4eee6;
          color: #6e6862;
          display: inline-block;
          white-space: nowrap;
        }

        html.dark .tool-card-badge {
          background: rgba(255, 255, 255, 0.08);
          color: #a09990;
        }

        .tool-card-popular {
          background: #fc2779;
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(252, 39, 121, 0.3);
          display: inline-block;
          white-space: nowrap;
        }

        .tool-card-title {
          font-family: var(--font-dm-serif), var(--font-playfair), 'Playfair Display', serif;
          font-size: 21px;
          font-weight: 600;
          line-height: 1.25;
          color: #161412;
          margin: 0 0 3px 0;
          transition: color 0.2s ease;
        }

        .tool-card:hover .tool-card-title {
          color: #fc2779;
        }

        html.dark .tool-card-title {
          color: #ffffff;
        }

        html.dark .tool-card:hover .tool-card-title {
          color: #ff4d94;
        }

        .tool-card-subtitle {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8c857f;
          margin: 0;
        }

        html.dark .tool-card-subtitle {
          color: #9e978f;
        }

        .tool-card-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: #55504a;
          margin: 0 0 16px 0;
        }

        html.dark .tool-card-desc {
          color: #b8b0a6;
        }

        .tool-card-bullets {
          list-style: none;
          padding: 12px 0 0;
          margin: 0 0 18px 0;
          border-top: 1px solid #f0eae1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        html.dark .tool-card-bullets {
          border-color: rgba(255, 255, 255, 0.08);
        }

        .tool-card-bullet-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 12.5px;
          font-weight: 500;
          color: #6e6862;
          line-height: 1.4;
        }

        html.dark .tool-card-bullet-item {
          color: #a09990;
        }

        .tool-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid #f0eae1;
          margin-top: auto;
          font-size: 12.5px;
          font-weight: 700;
          color: #161412;
          transition: color 0.2s ease;
        }

        .tool-card:hover .tool-card-footer {
          color: #fc2779;
        }

        html.dark .tool-card-footer {
          border-color: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        html.dark .tool-card:hover .tool-card-footer {
          color: #ff4d94;
        }

        .tool-arrow-icon {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tool-card:hover .tool-arrow-icon {
          transform: translateX(4px);
        }

        .persona-split {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        @media (max-width: 860px) {
          .persona-split {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .persona-card {
          padding: 36px 30px;
          border-radius: 20px;
          border: 1px solid #ded7cf;
          background: #ffffff;
          text-decoration: none !important;
          color: inherit !important;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
        }

        .persona-card:hover {
          transform: translateY(-5px);
          border-color: #fc2779;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
        }

        html.dark .persona-card {
          background: #181614;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }

        html.dark .persona-card:hover {
          border-color: #fc2779;
          box-shadow: 0 18px 44px rgba(252, 39, 121, 0.2);
        }

        .persona-tag {
          display: inline-block;
          border-radius: 9999px;
          padding: 5px 12px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .persona-title {
          font-family: var(--font-dm-serif), var(--font-playfair), 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 600;
          line-height: 1.3;
          color: #161412;
          margin: 0 0 8px 0;
          transition: color 0.2s ease;
        }

        .persona-card:hover .persona-title {
          color: #fc2779;
        }

        html.dark .persona-title {
          color: #ffffff;
        }

        html.dark .persona-card:hover .persona-title {
          color: #ff4d94;
        }

        .persona-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: #6e6862;
          margin: 0 0 18px 0;
        }

        html.dark .persona-desc {
          color: #a09990;
        }

        .persona-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: #fc2779;
        }

        html.dark .persona-link {
          color: #ff4d94;
        }

        /* ── Compact Mobile Layout (< 640px) ───────────────────────────── */
        @media (max-width: 640px) {
          .tools-hub-page {
            padding: 20px 14px 44px;
          }

          .tools-hub-shell {
            padding: 0;
          }

          .tools-hero {
            margin: 0 auto 20px !important;
            text-align: left;
          }

          .tools-eyebrow {
            font-size: 10px;
            letter-spacing: 0.16em;
            margin-bottom: 6px;
          }

          .tools-title {
            font-size: 26px;
            line-height: 1.2;
            margin: 0 0 6px 0;
          }

          .tools-subtitle {
            font-size: 13px;
            line-height: 1.5;
            margin: 0 0 16px 0;
          }

          /* Horizontally swipeable filter pill bar */
          .tools-filters {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-x pan-y;
            overscroll-behavior: auto;
            scrollbar-width: none;
            gap: 8px;
            margin: 0 -14px 18px;
            padding: 2px 14px 6px;
          }

          .tools-filters::-webkit-scrollbar {
            display: none;
          }

          .tools-filter-btn {
            flex-shrink: 0;
            white-space: nowrap;
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 600;
          }

          .tools-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 24px;
          }

          .tool-card {
            padding: 16px 14px;
            border-radius: 16px;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
          }

          .tool-card-header {
            gap: 10px;
            margin-bottom: 10px;
          }

          .tool-card-header-main {
            gap: 10px;
          }

          .tool-card-icon {
            width: 38px;
            height: 38px;
            border-radius: 10px;
          }

          .tool-card-title {
            font-size: 17.5px;
            margin: 0 0 2px 0;
            line-height: 1.25;
          }

          .tool-card-subtitle {
            font-size: 9.5px;
            letter-spacing: 0.06em;
          }

          .tool-card-badge {
            padding: 3px 8px;
            font-size: 8.5px;
            letter-spacing: 0.08em;
          }

          .tool-card-popular {
            font-size: 8px;
            padding: 3px 8px;
            letter-spacing: 0.08em;
          }

          .tool-card-desc {
            font-size: 12.5px;
            line-height: 1.48;
            margin: 0 0 10px 0;
          }

          .tool-card-bullets {
            padding: 8px 0 0;
            margin: 0 0 12px 0;
            gap: 6px;
          }

          .tool-card-bullet-item {
            font-size: 11.5px;
            gap: 7px;
            line-height: 1.35;
          }

          .tool-card-footer {
            padding-top: 10px;
            font-size: 12px;
          }

          .persona-split {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-top: 20px;
          }

          .persona-card {
            padding: 18px 16px;
            border-radius: 16px;
          }

          .persona-tag {
            font-size: 8.5px;
            padding: 3px 9px;
            margin-bottom: 8px;
          }

          .persona-title {
            font-size: 18px;
            margin: 0 0 6px 0;
          }

          .persona-desc {
            font-size: 12.5px;
            line-height: 1.48;
            margin: 0 0 12px 0;
          }

          .persona-link {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="tools-hub-shell">
        {/* Centered Hero Header */}
        <div className="tools-hero">
          <span className="tools-eyebrow">Clinical Diagnostics &amp; Intelligence</span>
          <h1 className="tools-title">All Diagnostic Tools &amp; Curations</h1>
          <p className="tools-subtitle">
            From real-time computer vision skin analysis and municipal water mineral tests to formulation dupes and headless recommendation APIs.
          </p>

          {/* Centered Filter Tabs */}
          <div
            className="tools-filters"
            onWheel={(e) => {
              const el = e.currentTarget;
              if (el.scrollWidth > el.clientWidth && e.deltaX === 0) {
                if (
                  (e.deltaY > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth - 1) ||
                  (e.deltaY < 0 && el.scrollLeft > 0)
                ) {
                  el.scrollLeft += e.deltaY;
                  e.preventDefault();
                }
              }
            }}
          >
            <button
              onClick={() => setSelectedCategory("all")}
              className={`tools-filter-btn ${selectedCategory === "all" ? "active" : ""}`}
            >
              All Tools ({TOOLS.length})
            </button>
            <button
              onClick={() => setSelectedCategory("ai")}
              className={`tools-filter-btn ${selectedCategory === "ai" ? "active" : ""}`}
            >
              AI &amp; Diagnostics ({TOOLS.filter((t) => t.category === "ai").length})
            </button>
            <button
              onClick={() => setSelectedCategory("shop")}
              className={`tools-filter-btn ${selectedCategory === "shop" ? "active" : ""}`}
            >
              Curations &amp; Dupes ({TOOLS.filter((t) => t.category === "shop").length})
            </button>
            <button
              onClick={() => setSelectedCategory("b2b")}
              className={`tools-filter-btn ${selectedCategory === "b2b" ? "active" : ""}`}
            >
              For Brands &amp; APIs ({TOOLS.filter((t) => t.category === "b2b").length})
            </button>
          </div>
        </div>

        {/* Spacious 3-Column Bento Grid */}
        <div className="tools-grid">
          {filteredTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link
                key={tool.id}
                href={tool.href}
                scroll={true}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                className="tool-card"
              >
                <div>
                  {/* Top Header: Icon, Titles & Badge */}
                  <div className="tool-card-header">
                    <div className="tool-card-header-main">
                      <div className="tool-card-icon">
                        <IconComponent size={22} strokeWidth={1.8} />
                      </div>
                      <div className="tool-card-title-group">
                        <h2 className="tool-card-title">{tool.title}</h2>
                        <p className="tool-card-subtitle">{tool.subtitle}</p>
                      </div>
                    </div>
                    <div className="tool-card-header-badge">
                      {tool.isPopular ? (
                        <span className="tool-card-popular">Popular</span>
                      ) : (
                        <span className="tool-card-badge">{tool.badge}</span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="tool-card-desc">{tool.description}</p>

                  {/* Bullet Highlights */}
                  <ul className="tool-card-bullets">
                    {tool.highlights.map((h, i) => (
                      <li key={i} className="tool-card-bullet-item">
                        <CheckCircle2 size={14} style={{ color: "#059669", flexShrink: 0 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="tool-card-footer">
                  <span>{tool.ctaText}</span>
                  <ArrowRight size={15} className="tool-arrow-icon" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Persona Split (Individuals vs Brands) */}
        <div className="persona-split">
          <Link
            href="/dashboard"
            scroll={true}
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
            className="persona-card"
          >
            <span
              className="persona-tag"
              style={{ background: "rgba(252, 39, 121, 0.12)", color: "#fc2779" }}
            >
              For Individuals
            </span>
            <h3 className="persona-title">Personal Skin Health Profile</h3>
            <p className="persona-desc">
              Save your AI camera scans, track redness and texture changes over time, and organize your daily regimens in your private portal.
            </p>
            <span className="persona-link">
              <span>Open Member Portal</span>
              <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            href="/b2b"
            scroll={true}
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
            className="persona-card"
          >
            <span
              className="persona-tag"
              style={{ background: "rgba(124, 58, 237, 0.12)", color: "#7c3aed" }}
            >
              For E-Commerce &amp; Brands
            </span>
            <h3 className="persona-title">Mirha Recommendation Engine</h3>
            <p className="persona-desc">
              Boost storefront conversion by offering hyper-personalized routines via our sub-100ms REST API or drop-in JavaScript widget.
            </p>
            <span className="persona-link">
              <span>View B2B Documentation</span>
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Check, HelpCircle, Star } from "lucide-react";

export const metadata: Metadata = {
 title: "Pricing — Mirha & Co.",
 description:
 "Upgrade to Mirha Pro for full ingredient analysis, custom conflict checking, routine sharing, and personalized skin insights.",
};

const PLANS = [
 {
 name: "Free",
 price: "₹0",
 period: "",
 description: "Perfect for casual skincare explorers.",
 features: [
 "Track up to 2 active routines",
 "Basic Skin Journal logs",
 "Standard ingredient checker",
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
 "Unlimited routines & logs",
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

export default function PricingPage() {
 return (
 <main className="pricing-page">
 <style>{`
 .pricing-page {
 --black: #0c0a09;
 --white: #fafaf8;
 --rose: #fc2779;
 --rose-light: #fbf7f2;
 --paper: #fffcf8;
 --ink: #2b2826;
 --muted: #8c8179;
 --rule: #e8ded6;
 background: var(--paper);
 color: var(--ink);
 font-family: var(--font-dm-sans), sans-serif;
 padding: 6rem 2.5rem;
 min-height: 80vh;
 }

 .pricing-header {
 text-align: center;
 max-width: 800px;
 margin: 0 auto 5rem;
 }

 .eyebrow {
 font-size: 0.65rem;
 letter-spacing: 0.25em;
 text-transform: uppercase;
 color: var(--rose);
 margin-bottom: 1.5rem;
 font-weight: 700;
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 8px;
 }

 .pricing-header h1 {
 font-family: var(--font-playfair), serif;
 font-size: clamp(2.5rem, 6vw, 4.5rem);
 line-height: 1.1;
 font-weight: 700;
 margin-bottom: 1.5rem;
 letter-spacing: -0.02em;
 }

 .pricing-header h1 span {
 color: var(--rose);
 display: block;
 font-style: normal;
 font-weight: 600;
 }

 .pricing-subtitle {
 font-size: 1.15rem;
 color: var(--muted);
 max-width: 520px;
 margin: 0 auto;
 line-height: 1.6;
 }

 .plans-grid {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
 gap: 2rem;
 max-width: 1140px;
 margin: 0 auto;
 align-items: start;
 }

 .plan-card {
 background: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(254, 251, 246, 0.95) 50%, rgba(255, 255, 255, 0.98) 100%);
 border: 1px solid rgba(162, 123, 92, 0.12);
 border-radius: 20px;
 padding: 2.5rem 1.75rem;
 position: relative;
 display: flex;
 flex-direction: column;
 box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 8px 30px rgba(40, 28, 20, 0.02);
 transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
 }

 .plan-card > *:not(.gloss-sheen):not(.popular-badge) {
 position: relative;
 z-index: 2;
 }

 .gloss-sheen {
 position: absolute;
 inset: 0;
 overflow: hidden;
 pointer-events: none;
 border-radius: inherit;
 z-index: 1;
 }

 .gloss-sheen::after {
 content: '';
 position: absolute;
 top: -50%;
 left: -60%;
 width: 130%;
 height: 200%;
 background: linear-gradient(
 to right,
 rgba(255, 255, 255, 0) 0%,
 rgba(255, 255, 255, 0.04) 35%,
 rgba(255, 255, 255, 0.22) 45%,
 rgba(255, 255, 255, 0.3) 48%,
 rgba(255, 255, 255, 0.22) 51%,
 rgba(255, 255, 255, 0.04) 65%,
 rgba(255, 255, 255, 0) 100%
 );
 transform: rotate(25deg);
 transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
 }

 .plan-card:hover {
 transform: translateY(-2px);
 box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 20px 40px rgba(162, 123, 92, 0.05);
 border-color: rgba(162, 123, 92, 0.25);
 }

 .plan-card:hover .gloss-sheen::after {
 transform: translate(110%, 40%) rotate(25deg);
 }

 .plan-card.highlighted {
 background: linear-gradient(135deg, #161413 0%, #0c0a09 100%);
 color: var(--white);
 border: 1px solid rgba(255, 255, 255, 0.08);
 box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.15);
 }

 .plan-card.highlighted .gloss-sheen::after {
 background: linear-gradient(
 to right,
 rgba(255, 255, 255, 0) 0%,
 rgba(255, 255, 255, 0.02) 35%,
 rgba(255, 255, 255, 0.12) 45%,
 rgba(255, 255, 255, 0.2) 48%,
 rgba(255, 255, 255, 0.12) 51%,
 rgba(255, 255, 255, 0.02) 65%,
 rgba(255, 255, 255, 0) 100%
 );
 }

 .plan-card.highlighted:hover {
 border-color: rgba(252, 39, 121, 0.35);
 box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 25px 50px rgba(0, 0, 0, 0.2);
 }

 .popular-badge {
 position: absolute;
 top: -11px;
 left: 50%;
 transform: translateX(-50%);
 background: var(--rose);
 color: #fff;
 font-size: 0.6rem;
 font-weight: 700;
 letter-spacing: 0.2em;
 text-transform: uppercase;
 padding: 4px 14px;
 border-radius: 99px;
 box-shadow: 0 4px 12px rgba(252, 39, 121, 0.15);
 border: 1px solid rgba(255, 255, 255, 0.15);
 }

 .plan-name {
 font-size: 0.72rem;
 font-weight: 700;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 color: var(--rose);
 margin-bottom: 0.75rem;
 }

 .plan-price-row {
 display: flex;
 align-items: baseline;
 gap: 4px;
 margin-bottom: 0.5rem;
 }

 .plan-price {
 font-family: var(--font-playfair), serif;
 font-size: 2.6rem;
 font-weight: 700;
 line-height: 1;
 }

 .plan-period {
 font-size: 0.88rem;
 color: var(--muted);
 }

 .highlighted .plan-period {
 color: rgba(255,255,255,0.5);
 }

 .plan-desc {
 font-size: 0.88rem;
 color: var(--muted);
 margin-bottom: 1.75rem;
 line-height: 1.45;
 }

 .highlighted .plan-desc {
 color: rgba(255,255,255,0.6);
 }

 .plan-cta {
 display: block;
 text-align: center;
 padding: 0.8rem 1.5rem;
 border-radius: 10px;
 font-size: 0.72rem;
 font-weight: 700;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 text-decoration: none;
 transition: all 0.3s ease;
 margin-bottom: 2rem;
 cursor: pointer;
 }

 .plan-cta.normal-cta {
 background: var(--black);
 color: #fff;
 }

 .plan-cta.normal-cta:hover {
 background: #000;
 }

 .plan-cta.highlighted-cta {
 background: #fff;
 color: var(--black);
 }

 .plan-cta.highlighted-cta:hover {
 background: var(--rose-light);
 }

 .features-list {
 list-style: none;
 padding: 0;
 margin: 0;
 display: flex;
 flex-direction: column;
 gap: 0.75rem;
 }

 .feature-item {
 display: flex;
 gap: 10px;
 font-size: 0.88rem;
 line-height: 1.45;
 align-items: flex-start;
 color: var(--ink);
 }

 .highlighted .feature-item {
 color: rgba(255,255,255,0.85);
 }

 .feature-icon-wrap {
 display: flex;
 align-items: center;
 justify-content: center;
 flex-shrink: 0;
 margin-top: 2px;
 }

 .faq-section {
 max-width: 720px;
 margin: 8rem auto 0;
 }

 .faq-section h2 {
 font-family: var(--font-playfair), serif;
 font-size: 2.2rem;
 font-weight: 700;
 text-align: center;
 margin-bottom: 4rem;
 }

 .faq-grid {
 display: flex;
 flex-direction: column;
 gap: 2rem;
 }

 .faq-item {
 background: #fff;
 border: 1px solid var(--rule);
 border-radius: 20px;
 padding: 2rem;
 }

 .faq-question {
 font-family: var(--font-playfair), serif;
 font-weight: 700;
 font-size: 1.25rem;
 margin-bottom: 0.75rem;
 display: flex;
 align-items: center;
 gap: 10px;
 }

 .faq-question-icon {
 color: var(--rose);
 flex-shrink: 0;
 }

 .faq-answer {
 font-size: 0.95rem;
 color: var(--muted);
 line-height: 1.6;
 }

 @media (max-width: 768px) {
 .pricing-page {
 padding: 4rem 1.5rem;
 }
 .plans-grid {
 grid-template-columns: 1fr;
 }
 }
 `}</style>

 {/* Header */}
 <div className="pricing-header">
 <p className="eyebrow">
 <Star size={14} /> Pricing Plans
 </p>
 <h1>
 Skincare intelligence,
 <span>properly priced.</span>
 </h1>
 <p className="pricing-subtitle">
 Free tools to get started. Pro when you want to take your skincare consistency and compatibility to the next level.
 </p>
 </div>

 {/* Plans */}
 <div className="plans-grid">
 {PLANS.map((plan) => (
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

 {/* FAQ */}
 <div className="faq-section">
 <h2>Common Questions</h2>
 <div className="faq-grid">
 {[
 {
 q: "Can I cancel my plan anytime?",
 a: "Yes, absolutely. You can cancel your subscription from your dashboard at any time. You will retain Pro features until the end of your current billing cycle.",
 },
 {
 q: "What payment options are supported?",
 a: "We support UPI, net banking, debit cards, and credit cards through Razorpay for instant activation.",
 },
 {
 q: "How does the Ingredient Conflict Checker work?",
 a: "It lets you paste raw ingredient lists of any two products. Our engine parses the ingredients and alerts you of potential conflicts (like layering multiple exfoliants or pH incompatibilities) to prevent skin barrier damage.",
 },
 {
 q: "Are the recommendations truly independent?",
 a: "Yes. Our AI Skin Analyst and formulation checker recommend products based purely on ingredients and suitability. We disclose affiliate commission tags transparently.",
 },
 ].map((faq) => (
 <div key={faq.q} className="faq-item">
 <h3 className="faq-question">
 <HelpCircle size={18} className="faq-question-icon" />
 {faq.q}
 </h3>
 <p className="faq-answer">{faq.a}</p>
 </div>
 ))}
 </div>
 </div>
 </main>
 );
}

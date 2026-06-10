import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, Heart, Star } from "lucide-react";

export const metadata: Metadata = {
 title: "Shared Skincare Routine — Mirha & Co.",
 description: "View this personalized skincare routine curated with Mirha & Co.",
};

interface SharePageProps {
 searchParams: Promise<{
 name?: string;
 steps?: string;
 skinType?: string;
 }>;
}

export default async function ShareRoutinePage({ searchParams }: SharePageProps) {
 const params = await searchParams;
 const routineName = params.name || "Skincare Routine";
 const skinType = params.skinType || "All Skin Types";

 let steps: string[] = [];
 try {
 if (params.steps) {
 steps = JSON.parse(params.steps);
 }
 } catch (e) {
 console.error("Failed to parse shared routine steps:", e);
 }

 if (steps.length === 0) {
 steps = [
 "Cleanser: Cetaphil Gentle Wash",
 "Serum: Niacinamide 10%",
 "Moisturiser: Ceramide Cream",
 "Sunscreen: SPF 50+ Gel",
 ];
 }

 return (
 <main className="share-routine-page">
 <style>{`
 .share-routine-page {
 --black: #0c0a09;
 --white: #fafaf8;
 --rose: #c8473a;
 --rose-light: #fbf7f2;
 --paper: #fffcf8;
 --ink: #2b2826;
 --muted: #8c8179;
 --rule: #e8ded6;
 background: var(--paper);
 color: var(--ink);
 font-family: var(--font-dm-sans), sans-serif;
 padding: 6rem 2.5rem;
 min-height: 85vh;
 display: flex;
 align-items: center;
 justify-content: center;
 }

 .share-card-container {
 background: #fff;
 border: 1px solid var(--rule);
 border-radius: 32px;
 box-shadow: 0 30px 70px rgba(40, 28, 20, 0.08);
 max-width: 580px;
 width: 100%;
 overflow: hidden;
 }

 .share-card-header {
 background: var(--black);
 color: var(--white);
 padding: 3rem 2.5rem;
 position: relative;
 }

 .share-card-header::before {
 content: '';
 position: absolute;
 inset: 0;
 background: radial-gradient(circle at top right, rgba(200, 71, 58, 0.15) 0%, transparent 60%);
 pointer-events: none;
 }

 .share-eyebrow {
 font-size: 0.65rem;
 letter-spacing: 0.2em;
 text-transform: uppercase;
 color: var(--rose);
 margin-bottom: 1rem;
 font-weight: 700;
 display: flex;
 align-items: center;
 gap: 6px;
 }

 .share-card-header h1 {
 font-family: var(--font-playfair), serif;
 font-size: 2.2rem;
 font-weight: 700;
 line-height: 1.1;
 margin-bottom: 0.75rem;
 letter-spacing: -0.01em;
 }

 .share-meta {
 display: flex;
 gap: 1.25rem;
 font-size: 0.85rem;
 color: rgba(255,255,255,0.6);
 }

 .share-meta-item {
 display: flex;
 align-items: center;
 gap: 6px;
 }

 .share-card-body {
 padding: 3rem 2.5rem;
 }

 .share-steps-title {
 font-size: 0.8rem;
 font-weight: 700;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 color: var(--rose);
 margin-bottom: 1.5rem;
 border-bottom: 1px solid var(--rule);
 padding-bottom: 0.75rem;
 }

 .share-steps-list {
 display: flex;
 flex-direction: column;
 gap: 1rem;
 margin-bottom: 3rem;
 }

 .share-step-item {
 display: flex;
 align-items: center;
 gap: 1.25rem;
 background: var(--rose-light);
 padding: 1.1rem 1.4rem;
 border-radius: 20px;
 border: 1px solid rgba(200, 71, 58, 0.05);
 }

 .share-step-number {
 font-family: var(--font-bebas), sans-serif;
 font-size: 1.2rem;
 color: var(--rose);
 width: 24px;
 text-align: center;
 }

 .share-step-text {
 font-size: 1rem;
 font-weight: 600;
 color: var(--ink);
 }

 .share-cta-section {
 text-align: center;
 border-top: 1px solid var(--rule);
 padding-top: 2rem;
 }

 .share-cta-text {
 font-size: 0.95rem;
 color: var(--muted);
 margin-bottom: 1.5rem;
 line-height: 1.5;
 }

 .share-cta-button {
 display: inline-flex;
 align-items: center;
 gap: 8px;
 background: var(--black);
 color: #fff;
 padding: 1rem 2.25rem;
 border-radius: 14px;
 text-decoration: none;
 font-size: 0.75rem;
 font-weight: 700;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 transition: all 0.3s;
 box-shadow: 0 10px 20px rgba(0,0,0,0.06);
 }

 .share-cta-button:hover {
 background: #000;
 transform: translateY(-2px);
 box-shadow: 0 15px 30px rgba(0,0,0,0.12);
 }
 `}</style>

 <div className="share-card-container">
 {/* Header */}
 <div className="share-card-header">
 <p className="share-eyebrow">
 <Star size={12} /> Mirha Skin Desk
 </p>
 <h1>{routineName}</h1>
 <div className="share-meta">
 <div className="share-meta-item">
 <User size={14} />
 <span>{skinType}</span>
 </div>
 <div className="share-meta-item">
 <Calendar size={14} />
 <span>Shared Routine</span>
 </div>
 </div>
 </div>

 {/* Steps */}
 <div className="share-card-body">
 <h3 className="share-steps-title">Routine Order</h3>
 <div className="share-steps-list">
 {steps.map((step, idx) => (
 <div key={idx} className="share-step-item">
 <span className="share-step-number">{idx + 1}</span>
 <span className="share-step-text">{step}</span>
 </div>
 ))}
 </div>

 {/* Call to Action */}
 <div className="share-cta-section">
 <p className="share-cta-text">
 Want to check ingredient conflicts, analyze your skin with AI, and track your daily consistency?
 </p>
 <Link href="/dashboard" className="share-cta-button">
 Create My Free Desk <Heart size={12} fill="white" />
 </Link>
 </div>
 </div>
 </div>
 </main>
 );
}

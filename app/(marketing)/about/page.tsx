import Image from "next/image";
import Link from "next/link";
import { Brain, BookOpen, Fingerprint, Star, Coins } from "lucide-react";
import FaceScannerUI from "@/components/FaceScannerUI";
import CollabForm from "@/components/CollabForm";

export const metadata = {
 title: "About | Mirha & Co.",
 description:
 "Mirha & Co. is an intelligent skincare guide for Indian consumers, blending curated ingredient context with AI-powered personalized advice.",
};

export default function AboutPage() {
 return (
 <main>
 <style>{`
 *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

 .about-page {
 --black: #0c0a09;
 --white: #fafaf8;
 --rose: #a27b5c;
 --rose-light: #fbf7f2;
 --paper: #fffcf8;
 --ink: #2b2826;
 --muted: #8c8179;
 --rule: #e8ded6;
 background: var(--paper);
 color: var(--ink);
 font-family: var(--font-dm-sans), sans-serif;
 overflow-x: hidden;
 }

 .img-wrap {
 border-radius: 24px;
 overflow: hidden;
 background: #fff;
 position: relative;
 }

 .hero-img {
 height: 650px;
 width: 100%;
 grid-column: span 2;
 margin-top: 5rem;
 box-shadow: 0 30px 60px rgba(0,0,0,0.15);
 }

 .side-img {
 height: 480px;
 width: 100%;
 margin-bottom: 2rem;
 box-shadow: 0 20px 40px rgba(0,0,0,0.04);
 }

 .img-wrap img {
 width: 100%;
 height: 100%;
 object-fit: cover;
 transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
 }

 .img-wrap:hover img {
 transform: scale(1.04);
 }

 .hero {
 background: var(--black);
 color: var(--white);
 padding: 8rem 2.5rem 0rem;
 position: relative;
 }

 .hero::before {
 content: '';
 position: absolute;
 top: 0; right: 0; width: 50vw; height: 50vw;
 background: radial-gradient(circle, rgba(162,123,92,0.1) 0%, transparent 70%);
 pointer-events: none;
 }

 .hero-inner {
 max-width: 1200px;
 margin: 0 auto;
 display: grid;
 grid-template-columns: 1.2fr 0.8fr;
 gap: 4rem;
 align-items: start;
 padding-bottom: 4rem;
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
 gap: 8px;
 }

 .hero h1 {
 font-family: var(--font-playfair), serif;
 font-size: clamp(2.8rem, 8vw, 5.5rem);
 line-height: 1.05;
 font-weight: 700;
 letter-spacing: -0.02em;
 word-break: normal;
 overflow-wrap: break-word;
 background: linear-gradient(135deg, #ffffff 0%, #d99a8f 50%, #e8d3b5 100%);
 background-size: 200% auto;
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 animation: shine 6s linear infinite;
 }

 .hero h1 span {
 color: #d99a8f;
 display: block;
 font-family: var(--font-playfair), serif;
 font-style: normal;
 font-weight: 600;
 font-size: clamp(2rem, 5.5vw, 3.8rem);
 letter-spacing: -0.02em;
 margin-top: 0.75rem;
 line-height: 1.1;
 -webkit-text-fill-color: initial;
 }

 @keyframes shine {
 0% { background-position: 0% center; }
 50% { background-position: 100% center; }
 100% { background-position: 0% center; }
 }

 .hero-copy {
 font-family: var(--font-playfair), serif;
 font-size: 1.35rem;
 line-height: 1.6;
 color: rgba(255,255,255,0.7);
 margin-bottom: 3rem;
 font-style: normal;
 }

 .strip {
 background: var(--rose);
 color: #fff;
 padding: 1.2rem 2rem;
 text-align: center;
 font-size: 0.75rem;
 letter-spacing: 0.25em;
 text-transform: uppercase;
 font-weight: 700;
 overflow: hidden;
 line-height: 1.6;
 }

 .section {
 padding: 8rem 2.5rem;
 }

 .section.dark {
 background: var(--black);
 color: var(--white);
 }

 .section.rose {
 background: var(--rose-light);
 color: var(--ink);
 }

 .inner {
 max-width: 1200px;
 margin: 0 auto;
 }

 .two-col {
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 6rem;
 align-items: center;
 }

 .section-title {
 font-family: var(--font-playfair), serif;
 font-size: clamp(2.5rem, 6vw, 3.8rem);
 line-height: 1.1;
 font-weight: 700;
 margin-bottom: 2rem;
 color: #111;
 }

 .section-title span {
 color: var(--rose);
 display: block;
 font-style: normal;
 }

 .body-copy p {
 font-size: 1.05rem;
 line-height: 1.8;
 color: var(--muted);
 margin-bottom: 1.8rem;
 }

 .dark .body-copy p {
 color: rgba(255,255,255,0.6);
 }

 .body-copy strong {
 color: var(--ink);
 font-weight: 600;
 }

 .dark .body-copy strong {
 color: var(--white);
 }

  .ecosystem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    margin-top: 4rem;
  }

 .ecosystem-card {
 background: #fff;
 border: 1px solid var(--rule);
 border-radius: 20px;
 padding: 2.5rem;
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 position: relative;
 overflow: hidden;
 }

 .ecosystem-card:hover {
 box-shadow: 0 20px 40px rgba(162, 123, 92, 0.05);
 border-color: rgba(162, 123, 92, 0.3);
 transform: translateY(-5px);
 }

 .eco-icon {
 background: var(--rose-light);
 color: var(--rose);
 width: 60px; height: 60px;
 border-radius: 16px;
 display: flex; align-items: center; justify-content: center;
 margin-bottom: 1.5rem;
 }

 .ecosystem-card h3 {
 font-family: var(--font-playfair), serif;
 font-weight: 700;
 font-size: 1.5rem;
 margin-bottom: 1rem;
 }

 .ecosystem-card p {
 color: var(--muted);
 line-height: 1.7;
 font-size: 0.95rem;
 }

 .honesty-list {
 display: flex;
 flex-direction: column;
 gap: 1.5rem;
 }

 .honesty-row {
 background: rgba(255,255,255,0.02);
 border: 1px solid rgba(255,255,255,0.06);
 border-radius: 16px;
 padding: 2rem;
 display: grid;
 grid-template-columns: 0.4fr 1fr;
 gap: 2rem;
 transition: all 0.3s;
 }

 .honesty-row:hover {
 background: rgba(255,255,255,0.04);
 border-color: rgba(255,255,255,0.12);
 }

 .honesty-row h3 {
 font-family: var(--font-playfair), serif;
 font-weight: 700;
 font-size: 1.4rem;
 color: var(--white);
 }

 .honesty-row p {
 color: rgba(255,255,255,0.6);
 line-height: 1.7;
 font-size: 1rem;
 }

 .cta {
 padding: 8rem 2.5rem;
 background: var(--rose);
 color: white;
 text-align: center;
 }

 .cta-box {
 max-width: 800px;
 margin: 0 auto;
 }

 .cta-box h2 {
 font-family: var(--font-playfair), serif;
 font-size: clamp(2.8rem, 8vw, 4.8rem);
 font-weight: 700;
 line-height: 1.1;
 margin-bottom: 1.5rem;
 }

 .cta-box p {
 color: rgba(255,255,255,0.85);
 font-size: 1.25rem;
 line-height: 1.6;
 margin-bottom: 3rem;
 font-family: var(--font-playfair), serif;
 font-style: normal;
 }

 .btn-row {
 display: flex;
 gap: 1rem;
 justify-content: center;
 flex-wrap: wrap;
 }

 .btn {
 display: inline-flex;
 align-items: center;
 gap: 8px;
 text-decoration: none;
 padding: 1.2rem 2.5rem;
 border-radius: 12px;
 font-size: 0.72rem;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 font-weight: 700;
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 }

 .btn.primary {
 background: #111;
 color: #fff;
 box-shadow: 0 10px 20px rgba(0,0,0,0.2);
 }

 .btn.primary:hover {
 background: #000;
 transform: translateY(-2px);
 box-shadow: 0 15px 30px rgba(0,0,0,0.3);
 }

 .btn.secondary {
 background: rgba(255,255,255,0.1);
 color: #fff;
 border: 1px solid rgba(255,255,255,0.2);
 }

 .btn.secondary:hover {
 background: rgba(255,255,255,0.2);
 transform: translateY(-2px);
 }

 @media (max-width: 900px) {
 .hero-inner,
 .two-col,
 .honesty-row {
 grid-template-columns: 1fr !important;
 gap: 2rem;
 }

 .hero { padding: 6rem 1.5rem 0rem; }
 .section, .cta { padding: 5rem 1.5rem; }

 .ecosystem-grid {
 grid-template-columns: 1fr;
 gap: 1.5rem;
 }

 .hero-img {
 grid-column: span 1 !important;
 height: 400px;
 margin-top: 2rem;
 }

 .side-img {
 height: 300px;
 margin-top: 2rem;
 }

 .btn-row {
 flex-direction: column;
 width: 100%;
 }
 .btn { width: 100%; justify-content: center; }
 }
 `}</style>

 <div className="about-page">
 {/* HERO */}
 <section className="hero">
 <div className="hero-inner">
 <div>
 <p className="eyebrow"><Star size={14}/> About Mirha & Co.</p>
 <h1>
 Intelligence
 <br />
 meets skincare.
 <span>In your climate.</span>
 </h1>
 </div>

 <div>
 <p className="hero-copy">
 The beauty industry is loud, crowded, and rarely explains how climate changes what your skin needs. We analyze skincare formulations to bring clarity back to your choices.
 </p>
 </div>

 <div className="img-wrap hero-img" style={{ position: "relative", overflow: "hidden", background: "radial-gradient(circle, #1a1615 0%, #080707 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
 <FaceScannerUI />
 </div>
 </div>
 </section>

 <div className="strip">
 No Hype • Deep Ingredient Research • Climate-Aware Curation • Simple Routines
 </div>

 {/* ECOSYSTEM */}
 <section className="section rose">
 <div className="inner">
 <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
 <p className="eyebrow" style={{ justifyContent: 'center' }}>The Ecosystem</p>
 <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
 Skincare shouldn't be a guessing game.<span>A clean database built for reality.</span>
 </h2>
 </div>

  <div className="ecosystem-grid">
    <div className="ecosystem-card">
      <div className="eco-icon"><Brain size={28} /></div>
      <h3>Curated Science Database</h3>
      <p>
        We compile clinical literature, formulation science, and user data into a clean, searchable index. You get straight, hype-free answers about what works, without marketing fluff.
      </p>
    </div>

    <div className="ecosystem-card">
      <div className="eco-icon"><BookOpen size={28} /></div>
      <h3>Climate-Aware Builder</h3>
      <p>
        A cream that works in dry winters will clog pores in tropical humidity. We build recommendations based on regional tap water hardness and seasonal climate realities.
      </p>
    </div>

    <div className="ecosystem-card">
      <div className="eco-icon"><Fingerprint size={28} /></div>
      <h3>Ingredient Checker</h3>
      <p>
        Layering active chemicals shouldn't be guesswork. Analyze conflicts instantly and generate structured, pH-balanced AM/PM routines to protect your skin barrier.
      </p>
    </div>

    <div className="ecosystem-card">
      <div className="eco-icon"><Coins size={28} /></div>
      <h3>Beauty Dupe Finder</h3>
      <p>
        Save on marketing, pay for active ingredients. Swap premium luxury products for their drugstore active-equivalents and calculate your annual savings.
      </p>
    </div>
  </div>
 </div>
 </section>

 {/* WHY THIS EXISTS */}
 <section className="section">
 <div className="inner two-col">
 <div className="body-copy">
 <p className="eyebrow">Why we built this</p>
 <h2 className="section-title">
 Skincare is noisy.
 <span>Buying shouldn't be.</span>
 </h2>
 <p>
 Every week there is a new active, a new ingredient trend, or a multi-step routine claiming to fix everything. But your skin doesn't need ten steps. It needs consistency.
 </p>
 <p>
 <strong>Mirha & Co. exists to slow that decision down.</strong> 
 </p>
 <p>
 We look at the formulation details, the price point, and the local environmental factors before curating any product. Our goal is to give you honest, straightforward facts, so you can make decisions that actually make sense for your skin.
 </p>
 </div>
 <div className="img-wrap side-img">
 <Image 
 src="/images/about-lifestyle.png" 
 alt="Personalized skincare routine" 
 fill 
 sizes="(max-width: 900px) 100vw, 40vw"
 />
 </div>
 </div>
 </section>

 {/* HONESTY & ETHICS */}
 <section className="section dark">
 <div className="inner two-col">
 <div>
 <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Our Baseline</p>
 <h2 className="section-title" style={{ color: '#fff' }}>
 Honest curation.
 <span style={{ color: 'var(--rose)' }}>No pretending.</span>
 </h2>
 <div className="img-wrap side-img" style={{ height: '350px', marginTop: '3rem' }}>
 <Image 
 src="/images/about-hand.png" 
 alt="Expertly curated products" 
 fill 
 sizes="100vw"
 />
 </div>
 </div>

 <div className="honesty-list">
 <div className="honesty-row">
 <h3>Real Curation, Not Fake Testing</h3>
 <p>
 We don't pretend to personally test thousands of bottles in a laboratory. Our picks are based on deep clinical literature, formulation analysis, and aggregate user reviews. We tell you exactly where the facts come from.
 </p>
 </div>

 <div className="honesty-row">
 <h3>Education, Not Medical Advice</h3>
 <p>
 We share skincare science and ingredient analysis to help you understand your products. But serious skin concerns, breakouts, or persistent irritation require a dermatologist. We are here to educate, not to diagnose.
 </p>
 </div>

 <div className="honesty-row">
 <h3>Transparent Affiliation</h3>
 <p>
 We use affiliate links to support the platform's hosting and maintenance costs. But our recommendations are completely unbiased. If a highly-rated sunscreen leaves a visible white cast or breaks people out, we say so.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* COLLABORATIONS / BRAND REGISTRATION */}
 <section className="section rose" style={{ borderTop: "1px solid var(--rule)" }}>
 <div className="inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
 <p className="eyebrow" style={{ justifyContent: "center" }}>Brand Partnerships</p>
 <h2 className="section-title">
 Partner With Us
 <span style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>Sell your brand on Mirha&nbsp;&amp;&nbsp;Co.</span>
 </h2>
 <p style={{ color: "var(--muted)", marginBottom: "3rem", fontSize: "1.05rem", lineHeight: "1.7" }}>
 Are you a skincare brand looking to reach a highly engaged audience? We partner with authentic brands to feature their products on our platform. Submit your brand details below to get started, or reach out directly at <strong style={{ color: "var(--rose)" }}>tanizcoldz@gmail.com</strong> / <strong style={{ color: "var(--rose)" }}>+91 9372159177</strong>.
 </p>
 <CollabForm />
 </div>
 </section>

 {/* CTA */}
 <section className="cta">
 <div className="cta-box">
 <h2>Your routine, simplified.</h2>
 <p>
 Stop guessing. Compare ingredients, understand formulations, and build a routine that actually matches your skin's needs.
 </p>

  <div className="btn-row">
    <Link href="/tools/routine" className="btn primary">
      Build a Routine
    </Link>
    <Link href="/tools/ingredients" className="btn secondary">
      Check Ingredients
    </Link>
    <Link href="/tools/dupes" className="btn secondary">
      Find Beauty Dupes
    </Link>
  </div>
 </div>
 </section>

 </div>
 </main>
 );
}

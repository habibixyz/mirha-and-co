import type { Metadata } from "next";
import { POSTS, getRelevantImage } from "@/lib/posts";
import MoleculeWrapper from "@/components/MoleculeWrapper";
import BlogSearchClient from "./BlogSearchClient";
import RegionalGuidesSelector from "@/components/RegionalGuidesSelector";
import { cookies, headers } from "next/headers";
import { getLocalizedContent, Currency } from "@/lib/globalization";


export const dynamic = "force-dynamic";

export const metadata: Metadata = {
 title: "Skincare Journal, Guides & Reviews | Mirha & Co.",
 description:
 "Honest, science-backed skincare guides, ingredient analyses, and budget-friendly beauty recommendations built specifically for Indian skin types and weather conditions.",
 openGraph: {
 title: "Skincare Journal, Guides & Reviews | Mirha & Co.",
 description:
 "Honest, science-backed skincare guides, ingredient analyses, and budget-friendly beauty recommendations built specifically for Indian skin types and weather conditions.",
 url: "https://www.mirhaandco.com/blog",
 siteName: "Mirha & Co.",
 type: "website",
 },
 twitter: {
 card: "summary_large_image",
 title: "Skincare Journal, Guides & Reviews | Mirha & Co.",
 description:
 "Honest, science-backed skincare guides, ingredient analyses, and budget-friendly beauty recommendations built specifically for Indian skin types and weather conditions.",
 },
};

const featured = {
 category: "BEAUTY" as const,
 title: "What Niacinamide Actually Does to Your Skin",
 excerpt: "The no-fluff India edition: oil control, acne marks, barrier support, and how to use it without overdoing your routine.",
 slug: "what-niacinamide-does-to-your-skin",
 readTime: "10 min",
 date: "March 2026",
 tag: "START HERE",
};

const catColors: Record<string, string> = {
 BEAUTY: "#a27b5c",
 WELLNESS: "#8c8179",
 LIFESTYLE: "#5f7161",
 SKINCARE: "#6d8b74",
 HAIR: "#7d8f99",
 MAKEUP: "#a27b5c",
};



const posts = POSTS.map((p) => {
 return {
 ...p,
 initials: p.thumbnail,
 imageSrc: getRelevantImage(p.slug, p.title, p.category)
 };
});

const paths = [
 { label: "Search", title: "Ask Mirha by concern", text: "Search oily skin, pigmentation, niacinamide, sunscreen, or budget.", href: "/dashboard/search" },
 { label: "Routine", title: "Build your 4-step routine", text: "Get cleanser, treatment, moisturiser, and sunscreen for your skin profile.", href: "/tools/routine" },
 { label: "Shop", title: "Browse curated picks", text: "See products with price, use case, ingredients, and honest context.", href: "/" },
];

export default async function BlogIndex() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const currency = (cookieStore.get("mirha_currency")?.value || headerStore.get("x-default-currency") || "INR") as Currency;
  const localizeContent = (text: string) => getLocalizedContent(text, currency);
 return (
 <main>
 <style>{`
 *, *::before, *::after { box-sizing: border-box; }
 .journal-page { 
 background-color: #faf8f5; 
 background-image: 
 radial-gradient(circle at 15% 5%, rgba(252, 39, 121,0.04) 0%, transparent 45%),
 radial-gradient(circle at 85% 30%, rgba(162,123,92,0.03) 0%, transparent 55%);
 color: #2b2826; 
 min-height: 100vh; 
 }
 .journal-hero {
 min-height: 620px;
 display: grid;
 grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
 border-bottom: 1px solid #ded7cf;
 }
 .journal-hero-copy {
 padding: 6rem 4.5rem 5rem;
 display: flex;
 flex-direction: column;
 justify-content: center;
 }
 .eyebrow {
 font-family: var(--font-dm-sans), sans-serif;
 font-size: 0.65rem;
 letter-spacing: 0.3em;
 text-transform: uppercase;
 color: #a27b5c;
 margin: 0 0 1.2rem;
 font-weight: 700;
 }
 .hero-title {
 font-family: var(--font-playfair), serif;
 font-size: clamp(2.8rem, 6vw, 5.2rem);
 line-height: 1.05;
 font-weight: 700;
 letter-spacing: -0.02em;
 margin: 0;
 max-width: 760px;
 background: linear-gradient(135deg, #111111 0%, #a27b5c 50%, #fc2779 100%);
 background-size: 200% auto;
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 animation: shine 6s linear infinite;
 }
 .hero-title span {
 display: inline;
 font-family: var(--font-playfair), serif;
 font-style: italic;
 font-weight: 600;
 }
 @keyframes shine {
 0% { background-position: 0% center; }
 50% { background-position: 100% center; }
 100% { background-position: 0% center; }
 }
 .hero-copy {
 max-width: 580px;
 color: #6f6963;
 line-height: 1.8;
 font-size: 1.05rem;
 margin: 1.5rem 0 2.5rem;
 }
 .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
 
 .primary-btn, .secondary-btn {
 display: inline-flex;
 align-items: center;
 justify-content: center;
 min-height: 48px;
 padding: 0 2rem;
 border-radius: 12px;
 font-family: var(--font-dm-sans), sans-serif;
 font-size: 0.72rem;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 font-weight: 700;
 text-decoration: none;
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 }
 .primary-btn {
 background: #111;
 color: #fff;
 border: 1px solid #111;
 box-shadow: 0 10px 20px rgba(0,0,0,0.06);
 }
 .primary-btn:hover {
 background: #000;
 transform: translateY(-2px);
 box-shadow: 0 15px 25px rgba(0,0,0,0.12);
 }
 .secondary-btn {
 color: #2b2826;
 border: 1px solid #e8ded6;
 background: #fff;
 }
 .secondary-btn:hover {
 background: #faf8f5;
 transform: translateY(-2px);
 }
 
 .journal-hero-visual {
 position: relative;
 min-height: 620px;
 background: radial-gradient(circle at 50% 50%, #fffbf8 0%, #f6f1ea 100%);
 border-left: 1px solid #ded7cf;
 display: flex;
 align-items: flex-end;
 padding: 3.5rem;
 overflow: hidden;
 }
 .visual-note {
 color: #2b2826;
 max-width: 380px;
 background: rgba(255, 255, 255, 0.5);
 backdrop-filter: blur(16px);
 -webkit-backdrop-filter: blur(16px);
 border: 1px solid rgba(255, 255, 255, 0.7);
 padding: 2.2rem;
 border-radius: 20px;
 box-shadow: 0 15px 35px rgba(162, 123, 92, 0.04);
 z-index: 10;
 }
 .visual-note h2 {
 font-family: var(--font-playfair), serif;
 font-size: 1.8rem;
 font-weight: 700;
 line-height: 1.25;
 margin: 0 0 0.8rem;
 color: #111;
 }
 .visual-note p {
 color: #6f6963;
 line-height: 1.7;
 margin: 0;
 font-size: 0.92rem;
 }
 .trust-strip {
 background: #111;
 color: #fff;
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 border-bottom: 1px solid #111;
 }
 .trust-item {
 padding: 1.2rem 1.4rem;
 border-right: 1px solid rgba(255,255,255,0.08);
 font-family: var(--font-dm-sans), sans-serif;
 font-size: 0.68rem;
 letter-spacing: 0.18em;
 text-transform: uppercase;
 color: rgba(255,255,255,0.6);
 text-align: center;
 }
 .path-section {
 max-width: 1200px;
 margin: 0 auto;
 padding: 5rem 2.5rem 3rem;
 }
 .section-kicker {
 font-family: var(--font-dm-sans), sans-serif;
 font-size: 0.65rem;
 letter-spacing: 0.25em;
 text-transform: uppercase;
 color: #a27b5c;
 margin: 0 0 0.8rem;
 font-weight: 700;
 }
 .section-title {
 font-family: var(--font-playfair), serif;
 font-size: clamp(2rem, 4vw, 3.2rem);
 line-height: 1.15;
 font-weight: 700;
 margin: 0;
 color: #111;
 }
 .path-grid {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 1.5rem;
 margin-top: 2.5rem;
 }
 .path-card {
 background: #fff;
 padding: 1.5rem;
 text-decoration: none;
 color: #111;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 border-radius: 12px;
 border: 1px solid rgba(162, 123, 92, 0.12);
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 position: relative;
 overflow: hidden;
 }
 .path-card::before {
 content: '';
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 3px;
 background: linear-gradient(90deg, #a27b5c, #fc2779);
 opacity: 0;
 transition: opacity 0.3s ease;
 }
 .path-card:hover { 
 transform: translateY(-2px);
 box-shadow: 0 12px 24px rgba(162, 123, 92, 0.04);
 border-color: rgba(162, 123, 92, 0.25);
 }
 .path-card:hover::before {
 opacity: 1;
 }
 .path-header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 0.75rem;
 }
 .path-label {
 color: #a27b5c;
 font-family: var(--font-dm-sans), sans-serif;
 font-size: 0.6rem;
 letter-spacing: 0.2em;
 text-transform: uppercase;
 font-weight: 700;
 margin: 0;
 }
 .path-arrow {
 font-size: 0.95rem;
 color: #a27b5c;
 transition: transform 0.3s ease;
 }
 .path-card:hover .path-arrow {
 transform: translateX(3px);
 }
 .path-card h3 {
 font-family: var(--font-playfair), serif;
 font-size: 1.2rem;
 font-weight: 700;
 line-height: 1.25;
 margin: 0 0 0.5rem;
 color: #111;
 }
 .path-card p {
 color: #6f6963;
 line-height: 1.5;
 font-size: 0.85rem;
 margin: 0;
 }
 .featured-band {
 max-width: 1200px;
 margin: 0 auto;
 padding: 2rem 2.5rem 1rem;
 }
 .featured-card {
 display: grid;
 grid-template-columns: 1.3fr 0.7fr;
 border: 1px solid #e8ded6;
 background: #fff;
 text-decoration: none;
 color: #111;
 border-radius: 16px;
 overflow: hidden;
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 box-shadow: 0 10px 30px rgba(0,0,0,0.01);
 }
 .featured-card:hover {
 transform: translateY(-2px);
 box-shadow: 0 15px 35px rgba(162, 123, 92, 0.04);
 border-color: rgba(162, 123, 92, 0.25);
 }
 .featured-main { 
 padding: 2.2rem 2.5rem; 
 display: flex;
 flex-direction: column;
 justify-content: center;
 }
 .featured-main h2 {
 font-family: var(--font-playfair), serif;
 font-size: clamp(1.4rem, 3vw, 2.2rem);
 font-weight: 700;
 line-height: 1.2;
 margin: 0 0 0.8rem;
 color: #111;
 }
 .featured-main p {
 color: #6f6963;
 line-height: 1.6;
 font-size: 0.92rem;
 max-width: 620px;
 margin: 0 0 1.5rem;
 }
 .featured-btn {
 display: inline-flex;
 align-items: center;
 gap: 0.4rem;
 font-family: var(--font-dm-sans), sans-serif;
 font-size: 0.7rem;
 font-weight: 700;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 color: #111;
 transition: all 0.3s ease;
 }
 .featured-card:hover .featured-btn {
  color: #a27b5c;
  }
  .featured-meta-mobile {
  display: none;
  font-size: 0.72rem;
  color: #9b8e83;
  margin-top: 1.25rem;
  padding-top: 0.8rem;
  border-top: 1px solid #f2ebe4;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
  }
 .featured-side {
 background: #1c1917;
 color: #fafaf9;
 padding: 2.2rem 2.5rem;
 display: flex;
 flex-direction: column;
 justify-content: center;
 border-left: 1px solid rgba(255,255,255,0.05);
 }
 .featured-side p {
 color: rgba(255,255,255,0.65);
 line-height: 1.6;
 margin: 0;
 font-size: 0.85rem;
 }
 .article-section {
 max-width: 1200px;
 margin: 0 auto;
 padding: 4rem 2.5rem 6rem;
 }
 .article-header {
 display: flex;
 justify-content: space-between;
 align-items: flex-end;
 gap: 1rem;
 border-bottom: 2px solid #111;
 padding-bottom: 1.5rem;
 margin-bottom: 2.5rem;
 }
 .article-grid {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 2rem;
 background: transparent;
 border: none;
 }
 .article-card {
 background: #fff;
 color: #111;
 text-decoration: none;
 padding: 1.5rem;
 min-height: 320px;
 border: 1px solid #e8ded6;
 border-radius: 20px;
 display: flex;
 flex-direction: column;
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 box-shadow: 0 5px 15px rgba(0,0,0,0.01);
 overflow: hidden;
 }
 .article-card:hover { 
 background: #fff; 
 transform: translateY(-4px);
 border-color: rgba(162, 123, 92, 0.3);
 box-shadow: 0 20px 40px rgba(162, 123, 92, 0.05);
 }
 .article-icon {
 width: 100%;
 height: 180px;
 border-radius: 12px;
 background: #fbf7f1;
 overflow: hidden;
 margin-bottom: 1.2rem;
 }
 .article-icon img {
 width: 100%;
 height: 100%;
 object-fit: cover;
 transition: transform 0.5s ease;
 }
 .article-card:hover .article-icon img {
 transform: scale(1.05);
 }
 .article-cat {
 font-family: var(--font-dm-sans), sans-serif;
 font-size: 0.6rem;
 letter-spacing: 0.25em;
 text-transform: uppercase;
 font-weight: 700;
 margin: 0 0 0.75rem;
 }
 .article-card h3 {
 font-family: var(--font-playfair), serif;
 font-size: 1.3rem;
 line-height: 1.3;
 font-weight: 700;
 margin: 0 0 0.8rem;
 color: #111;
 }
 .article-card p {
 color: #6f6963;
 font-size: 0.88rem;
 line-height: 1.7;
 margin: 0;
 }
 .article-meta {
 margin-top: auto;
 padding-top: 1.2rem;
 border-top: 1px solid #f2ebe4;
 display: flex;
 gap: 0.8rem;
 flex-wrap: wrap;
 color: #9b8e83;
 font-size: 0.65rem;
 letter-spacing: 0.1em;
 text-transform: uppercase;
 font-weight: 500;
 }
 .footer-cta {
 background: #111;
 color: #fff;
 text-align: center;
 padding: 5rem 1.5rem;
 }
 .footer-cta h2 {
 font-family: var(--font-playfair), serif;
 font-weight: 700;
 font-size: clamp(2rem, 4vw, 3rem);
 margin: 0 0 1.2rem;
 }
 .footer-cta p {
 color: rgba(255,255,255,0.65);
 line-height: 1.75;
 max-width: 560px;
 margin: 0 auto 2rem;
 font-size: 1.05rem;
 }
 .expert-guide-card {
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
 }
 .expert-guide-card:hover {
 transform: translateY(-4px);
 border-color: rgba(162, 123, 92, 0.35) !important;
 box-shadow: 0 15px 30px rgba(162, 123, 92, 0.06) !important;
 }
 @media (max-width: 980px) {
  .journal-hero { min-height: auto !important; }
  .journal-hero, .featured-card { grid-template-columns: 1fr; }
  .journal-hero-copy { padding: 4rem 2rem; }
  .journal-hero-visual { display: none !important; }
  .trust-strip, .path-grid, .article-grid { grid-template-columns: repeat(2, 1fr); }
  }
 @media (max-width: 640px) {
  .journal-hero-copy { padding: 2.2rem 1.25rem !important; }
  .journal-hero-copy .eyebrow { margin: 0 0 0.5rem !important; }
  .journal-hero-copy .hero-title { font-size: 2.2rem !important; }
  .journal-hero-copy .hero-copy { font-size: 0.92rem !important; margin: 0.8rem 0 1.5rem !important; line-height: 1.6 !important; }
  .journal-hero-copy .hero-actions { gap: 0.75rem !important; }
  .primary-btn, .secondary-btn { min-height: 42px !important; padding: 0 1.5rem !important; font-size: 0.68rem !important; border-radius: 8px !important; }
  .trust-strip {
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 0 !important;
  }
  .trust-item {
  padding: 0.8rem 0.5rem !important;
  border-right: 1px solid rgba(255,255,255,0.05) !important;
  border-bottom: 1px solid rgba(255,255,255,0.05) !important;
  font-size: 0.6rem !important;
  letter-spacing: 0.12em !important;
  }
  .trust-item:nth-child(2n) {
  border-right: none !important;
  }
  .trust-item:nth-child(3), .trust-item:nth-child(4) {
  border-bottom: none !important;
  }
  .path-grid, .article-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
  .path-section, .featured-band, .article-section { padding-left: 1.4rem; padding-right: 1.4rem; }
  .article-header { align-items: flex-start; flex-direction: column; }
  .path-card {
  padding: 1.25rem !important;
  }
  .path-card h3 {
  font-size: 1.1rem !important;
  }
  .path-card p {
  font-size: 0.8rem !important;
  }
  .featured-main {
  padding: 1.5rem !important;
  }
  .featured-main h2 {
  font-size: 1.35rem !important;
  }
  .featured-main p {
  font-size: 0.88rem !important;
  margin-bottom: 1.25rem !important;
  }
  .featured-side {
  display: none !important;
  }
  .featured-meta-mobile {
  display: block !important;
  }
  }
 `}</style>

 <div className="journal-page">
 <section className="journal-hero">
 <div className="journal-hero-copy">
 <p className="eyebrow">Mirha & Co. Journal</p>
 <h1 className="hero-title">
 Beauty advice with <span>receipts.</span>
 </h1>
  <p className="hero-copy">
  {localizeContent("Guides, comparisons, and routines for Indian skin: clear enough for beginners, useful enough for people who already know their actives.")}
  </p>
 <div className="hero-actions">
 <a href="/dashboard/search" className="primary-btn">Search Mirha</a>
 <a href="/tools/routine" className="secondary-btn">Build Routine</a>
 </div>
 </div>

 <div className="journal-hero-visual">
 <MoleculeWrapper />
 <div className="visual-note">
 <p className="eyebrow" style={{ color: "#a27b5c" }}>Start here</p>
 <h2>Find what works. Skip what does not.</h2>
 <p>
 Every guide points back to one thing: a routine you can actually use, buy, and stay consistent with.
 </p>
 </div>
 </div>
 </section>

 <div className="trust-strip">
 <div className="trust-item">{localizeContent("Indian skin + climate")}</div>
 <div className="trust-item">Ingredient reasoning</div>
 <div className="trust-item">Budget-aware picks</div>
 <div className="trust-item">Affiliate links disclosed</div>
 </div>

 <section className="path-section">
 <p className="section-kicker">Choose your path</p>
 <h2 className="section-title">Do not browse randomly. Start with the problem.</h2>
 <div className="path-grid">
 {paths.map((path) => (
 <a key={path.label} href={path.href} className="path-card">
 <div className="path-header">
 <span className="path-label">{path.label}</span>
 <span className="path-arrow">→</span>
 </div>
 <div>
 <h3>{path.title}</h3>
 <p>{path.text}</p>
 </div>
 </a>
 ))}
 </div>
 </section>

 <section className="featured-band">
 <a href={`/blog/${featured.slug}`} className="featured-card">
 <div className="featured-main">
  <p className="section-kicker">{featured.tag} / {featured.category}</p>
  <h2>{featured.title}</h2>
  <p>{featured.excerpt}</p>
  <span className="featured-btn">Read guide &rarr;</span>
  <div className="featured-meta-mobile">{featured.date} · {featured.readTime}</div>
  </div>
 <div className="featured-side">
 <p>{featured.date} / {featured.readTime}</p>
 <p style={{ marginTop: "1rem" }}>
 Best for anyone confused by serum claims, active percentages, acne marks, and oily-skin routines.
 </p>
 </div>
 </a>
 </section>

 <section className="article-section">
 <BlogSearchClient initialPosts={posts} catColors={catColors} currency={currency} />
 </section>

  <section 
  className="expert-guides-section" 
  style={{ 
  padding: "5rem 2.5rem 6rem", 
  maxWidth: "1200px", 
  margin: "0 auto", 
  borderTop: "1px solid #ded7cf"
  }}
  >
  <p 
  style={{ 
  color: "#a27b5c", 
  letterSpacing: "0.22em", 
  fontSize: "0.65rem", 
  textTransform: "uppercase", 
  fontWeight: 700, 
  marginBottom: "1rem",
  textAlign: "center"
  }}
  >
  Expert Buying Guides
  </p>
  <h2 
  style={{ 
  fontFamily: "var(--font-playfair), serif", 
  fontSize: "2.2rem", 
  fontWeight: 400, 
  marginBottom: "2.5rem",
  textAlign: "center",
  color: "var(--ink, #1a1714)"
  }}
  >
  Trending Skincare &amp; Hair Care Analyses
  </h2>
  
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1.5rem" }}>
  {[
    { title: "Best Niacinamide Serum in India", excerpt: "Ranked by concentration, formulation quality, and real-world performance for hyperpigmentation and oil control.", slug: "best-niacinamide-serum-india", category: "SKINCARE" },
    { title: "Hard Water Hair Loss in India", excerpt: "The definitive science-backed guide to preventing mineral buildup, hair fall, and dry scalp with chelating shampoos.", slug: "hard-water-hair-loss-india", category: "HAIR" },
    { title: "Korean Skincare for Humid Climate", excerpt: "How to adapt the famous glass-skin routine for intense humidity without clogging pores or triggering acne.", slug: "korean-skincare-humid-climate", category: "SKINCARE" },
    { title: "Best Sunscreen for Oily Skin", excerpt: "Zero white cast, non-comedogenic, matte finish sunscreens tested under peak Indian summer conditions.", slug: "best-sunscreen-for-oily-skin-india", category: "SKINCARE" },
    { title: "Minimalist vs The Ordinary", excerpt: "A head-to-head comparison of active ingredients, carrier formulations, pricing, and skin results.", slug: "minimalist-vs-the-ordinary", category: "SKINCARE" },
    { title: "Best Moisturizer under ₹500", excerpt: "Dermatologist-recommended budget moisturizers that repair your skin barrier without breaking the bank.", slug: "best-moisturizer-under-500", category: "SKINCARE" }
  ].map((guide) => (
  <a 
  key={guide.slug} 
  href={`/blog/${guide.slug}`}
  style={{
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "#fff",
  padding: "1.8rem",
  borderRadius: "16px",
  border: "1px solid #e8e2d9",
  boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
  textDecoration: "none"
  }}
  className="expert-guide-card"
  >
  <div>
  <span style={{ fontSize: "0.6rem", color: catColors[guide.category] || "#a27b5c", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>
  {guide.category}
  </span>
  <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.25rem", margin: "0.6rem 0 0.8rem", color: "#1a1714", fontWeight: 700, lineHeight: 1.3 }}>
  {guide.title}
  </h4>
  <p style={{ color: "#6f6963", fontSize: "0.85rem", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
  {guide.excerpt}
  </p>
  </div>
  <span style={{ fontSize: "0.72rem", color: "#fc2779", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.3rem" }}>
  Read Analysis &rarr;
  </span>
  </a>
  ))}
  </div>
  </section>

 <section 
 className="regional-guides-section" 
 style={{ 
 padding: "5rem 2.5rem 6rem", 
 maxWidth: "1100px", 
 margin: "0 auto", 
 borderTop: "1px solid #ded7cf"
 }}
 >
 <p 
 style={{ 
 color: "#a27b5c", 
 letterSpacing: "0.22em", 
 fontSize: "0.65rem", 
 textTransform: "uppercase", 
 fontWeight: 700, 
 marginBottom: "1rem",
 textAlign: "center"
 }}
 >
 Climate &amp; Location Guides
 </p>
 <h2 
 style={{ 
 fontFamily: "var(--font-playfair), serif", 
 fontSize: "2.2rem", 
 fontWeight: 400, 
 marginBottom: "2.5rem",
 textAlign: "center",
 color: "var(--ink, #1a1714)"
 }}
 >
 Climate-Specific Skincare by Region
 </h2 >
 
 <RegionalGuidesSelector currency={currency} />

 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
  {(currency === "INR" ? [
    { cityName: "Mumbai", citySlug: "mumbai", concernName: "Oily Skin", concernSlug: "oily-skin" },
    { cityName: "Delhi", citySlug: "delhi", concernName: "Dry Skin", concernSlug: "dry-skin" },
    { cityName: "Chennai", citySlug: "chennai", concernName: "Acne", concernSlug: "acne" },
    { cityName: "Bangalore", citySlug: "bangalore", concernName: "Hyperpigmentation", concernSlug: "hyperpigmentation" },
    { cityName: "Pune", citySlug: "pune", concernName: "Oily Skin", concernSlug: "oily-skin" },
    { cityName: "Hyderabad", citySlug: "hyderabad", concernName: "Dry Skin", concernSlug: "dry-skin" },
    { cityName: "Kolkata", citySlug: "kolkata", concernName: "Acne", concernSlug: "acne" },
    { cityName: "Jaipur", citySlug: "jaipur", concernName: "Hyperpigmentation", concernSlug: "hyperpigmentation" }
  ] : [
    { cityName: "New York", citySlug: "new-york", concernName: "Oily Skin", concernSlug: "oily-skin" },
    { cityName: "London", citySlug: "london", concernName: "Dry Skin", concernSlug: "dry-skin" },
    { cityName: "Dubai", citySlug: "dubai", concernName: "Acne", concernSlug: "acne" },
    { cityName: "Singapore", citySlug: "singapore", concernName: "Hyperpigmentation", concernSlug: "hyperpigmentation" },
    { cityName: "Sydney", citySlug: "sydney", concernName: "Oily Skin", concernSlug: "oily-skin" },
    { cityName: "Toronto", citySlug: "toronto", concernName: "Dry Skin", concernSlug: "dry-skin" },
    { cityName: "Los Angeles", citySlug: "los-angeles", concernName: "Acne", concernSlug: "acne" },
    { cityName: "Paris", citySlug: "paris", concernName: "Hyperpigmentation", concernSlug: "hyperpigmentation" }
  ]).map((guide) => (
 <a 
 key={`${guide.citySlug}-${guide.concernSlug}`} 
 href={`/blog/best-moisturizer-for-${guide.concernSlug}-in-${guide.citySlug}`}
 style={{
 display: "flex",
 flexDirection: "column",
 justifyContent: "space-between",
 background: "var(--dash-surface, #fff)",
 padding: "1.5rem",
 borderRadius: "12px",
 border: "1px solid var(--dash-border, #e8e2d9)",
 boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
 transition: "all 0.2s ease",
 textDecoration: "none"
 }}
 className="guide-link-card"
 >
 <div>
 <span style={{ fontSize: "0.58rem", color: "#a27b5c", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>
 {guide.cityName}
 </span>
 <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.1rem", margin: "0.5rem 0 1rem", color: "var(--dash-ink, #1a1714)", fontWeight: 400, lineHeight: 1.35 }}>
 Best Moisturizer for {guide.concernName} in {guide.cityName}
 </h4>
 </div>
 <span style={{ fontSize: "0.72rem", color: "#fc2779", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
 Read Guide &rarr;
 </span>
 </a>
 ))}
 </div>
 </section>

 <section className="footer-cta">
 <h2>Still confused? Let the routine finder do the sorting.</h2>
 <p>
 Answer a few questions and get a 4-step routine built around your skin type, concern, and budget.
 </p>
 <a href="/tools/routine" className="primary-btn" style={{ background: "#fff", color: "#111", borderColor: "#fff" }}>
 Get your routine
 </a>
 </section>
 </div>
 </main>
 );
}

"use client";

const featured = {
  category: "BEAUTY" as const,
  title: "What Niacinamide Actually Does to Your Skin",
  excerpt: "The no-fluff India edition: oil control, acne marks, barrier support, and how to use it without overdoing your routine.",
  slug: "what-niacinamide-does-to-your-skin",
  readTime: "10 min",
  date: "March 2026",
  tag: "START HERE",
};

const posts = [
  {
    category: "SKINCARE" as const,
    title: "Dark Circles Treatment for Indian Skin — What Actually Works",
    excerpt: "The honest guide to treating dark circles in India. Caffeine + EGCG for puffiness, what to use for pigmentation, and why most eye creams do nothing.",
    slug: "dark-circles-treatment-india",
    readTime: "10 min",
    date: "May 2026",
    productCount: 2,
    initials: "DC",
  },
  {
    category: "SKINCARE" as const,
    title: "How to Treat Active Acne Fast — Pimple Patches + Benzoyl Peroxide",
    excerpt: "A real protocol for active acne in India. Mighty Patch for overnight spot treatment, benzoyl peroxide for persistent breakouts.",
    slug: "active-acne-treatment-india",
    readTime: "9 min",
    date: "May 2026",
    productCount: 2,
    initials: "AA",
  },
  { category: "SKINCARE" as const, title: "The Indian Pigmentation Playbook", excerpt: "A complete guide to treating pigmentation in Indian skin using the right actives and routines.", slug: "pigmentation-guide", readTime: "12 min", date: "April 2026", productCount: 8, initials: "PI" },
  {
  category: "SKINCARE" as const,
  title: "Salicylic Acid for Indian Skin",
  excerpt: "The complete guide to treating acne, blackheads, and oily skin with salicylic acid.",
  slug: "salicylic-acid-guide-india",
  readTime: "12 min",
  date: "April 2026",
  productCount: 6,
  initials: "SA",
},
{
  category: "SKINCARE" as const,
  title: "Best Moisturisers for Oily vs Dry Skin in India",
  excerpt: "Gel vs cream vs lotion explained with the best picks for Indian climate.",
  slug: "best-moisturisers-india-2026",
  readTime: "11 min",
  date: "April 2026",
  productCount: 4,
  initials: "MO",
},
  { category: "BEAUTY" as const, title: "Why Your Skin Looks Dull Even After Skincare", excerpt: "Hard water, wrong layering, and skipping SPF: the real reasons skin stops glowing.", slug: "why-skin-looks-dull", readTime: "10 min", date: "April 2026", productCount: 6, initials: "GL" },
  { category: "BEAUTY" as const, title: "The Skincare Mistakes Costing You More Than Products", excerpt: "The habits that silently ruin your skincare results, and how to fix them.", slug: "skincare-mistakes", readTime: "9 min", date: "April 2026", productCount: 5, initials: "MI" },
  { category: "BEAUTY" as const, title: "Minimalist vs The Ordinary vs Dot & Key", excerpt: "A real comparison of India's most popular skincare brands, based on use case, not hype.", slug: "brand-comparison-india", readTime: "11 min", date: "April 2026", productCount: 7, initials: "VS" },
  { category: "HAIR" as const, title: "Why Your Hair Won't Stop Falling", excerpt: "The hard-water India guide to scalp buildup, shedding, and what actually helps.", slug: "hard-water-hair", readTime: "11 min", date: "April 2026", productCount: 8, initials: "HW" },
  { category: "BEAUTY" as const, title: "The Products That Actually Changed My Skin", excerpt: "After years of testing everything, these are the products still worth talking about.", slug: "skincare-products-that-changed-my-skin", readTime: "8 min", date: "March 2026", productCount: 12, initials: "PR" },
  { category: "WELLNESS" as const, title: "Morning Routines That Don't Require 2 Hours", excerpt: "Five things. Twenty minutes. A real difference.", slug: "morning-routines", readTime: "5 min", date: "March 2026", productCount: 5, initials: "AM" },
  { category: "BEAUTY" as const, title: "Amazon Skincare Finds Under 1500", excerpt: "Budget does not mean compromise. These picks prove it.", slug: "amazon-skincare-under-1500", readTime: "6 min", date: "March 2026", productCount: 8, initials: "BU" },
  { category: "LIFESTYLE" as const, title: "Gift Guides for the Woman Who Has Everything", excerpt: "She's impossible to shop for. We figured it out.", slug: "gift-guide-woman-who-has-everything", readTime: "7 min", date: "Feb 2026", productCount: 15, initials: "GI" },
  { category: "WELLNESS" as const, title: "The Supplements Worth Taking", excerpt: "Honest breakdown. No sponsorships. Just research and context.", slug: "supplements-worth-taking", readTime: "9 min", date: "Feb 2026", productCount: 10, initials: "SU" },
  { category: "BEAUTY" as const, title: "The Right Order to Apply Your Skincare", excerpt: "Layering matters. This is the sequence that actually works.", slug: "skincare-layering-order", readTime: "5 min", date: "Jan 2026", productCount: 6, initials: "OR" },
  { category: "LIFESTYLE" as const, title: "The Amazon Buys That Changed How I Live at Home", excerpt: "Small upgrades. Massive difference to daily life.", slug: "amazon-home-buys", readTime: "6 min", date: "Jan 2026", productCount: 8, initials: "HO" },
  { category: "BEAUTY" as const, title: "Best Sunscreens in India That Actually Work", excerpt: "No white cast. No greasy finish. Just sunscreens people actually use daily.", slug: "best-sunscreens-india-2026", readTime: "5 min", date: "March 2026", productCount: 9, initials: "SP" },
  { category: "BEAUTY" as const, title: "4-Step Indian Skincare Routine Under 2000", excerpt: "A simple routine built for Indian skin, Indian weather, and Indian budgets.", slug: "budget-skincare-routine-under-2000", readTime: "9 min", date: "April 2026", productCount: 9, initials: "RT" },
  { category: "BEAUTY" as const, title: "Niacinamide 5% vs 10%", excerpt: "What each concentration does differently, and which one your skin actually needs.", slug: "niacinamide-5-vs-10", readTime: "8 min", date: "April 2026", productCount: 3, initials: "N5" },
  { category: "BEAUTY" as const, title: "Niacinamide vs Vitamin C", excerpt: "What each ingredient does, which concern it targets, and how to layer them correctly.", slug: "niacinamide-vs-vitamin-c", readTime: "9 min", date: "April 2026", productCount: 3, initials: "NC" },
  { category: "BEAUTY" as const, title: "Niacinamide for Oily Skin in India", excerpt: "Why niacinamide works for Indian humidity, oil control, pores, and acne marks.", slug: "niacinamide-for-oily-skin", readTime: "10 min", date: "April 2026", productCount: 4, initials: "OI" },
  { category: "BEAUTY" as const, title: "Why SPF 50 Is Non-Negotiable in India", excerpt: "Why Indian skin needs SPF 50+ and how sunscreen protects every active in your routine.", slug: "best-sunscreen-india-spf50", readTime: "11 min", date: "April 2026", productCount: 5, initials: "50" },
  { category: "BEAUTY" as const, title: "Serums vs Essences vs Moisturisers", excerpt: "The honest breakdown of what each product does and what your skin actually needs.", slug: "serums-essences-moisturizers-guide", readTime: "10 min", date: "April 2026", productCount: 6, initials: "SE" },
  { category: "SKINCARE" as const, title: "Complete Skincare Routine for Every Skin Type", excerpt: "A 4-step routine map for oily, dry, combination, and sensitive skin.", slug: "skincare-routine-every-skin-type", readTime: "14 min", date: "April 2026", productCount: 12, initials: "RS" },
  {
  category: "BEAUTY" as const,
  title: "Beginner Makeup Kit Under ₹2000",
  excerpt: "A simple 5-product starter kit for Indian beginners without wasting money.",
  slug: "beginner-makeup-kit-india-under-2000",
  readTime: "7 min",
  date: "April 2026",
  productCount: 4,
  initials: "MK",
},
{
  category: "BEAUTY" as const,
  title: "Best Concealers for Indian Skin",
  excerpt: "Top concealers for dark circles, acne marks, and uneven tone in Indian skin.",
  slug: "best-concealers-indian-skin-dark-circles-acne-marks",
  readTime: "8 min",
  date: "April 2026",
  productCount: 5,
  initials: "CC",
},
{
  category: "BEAUTY" as const,
  title: "Oily Skin Makeup Routine (India)",
  excerpt: "A sweat-friendly everyday routine for oily skin in Indian humidity.",
  slug: "oily-skin-makeup-routine-india",
  readTime: "8 min",
  date: "April 2026",
  productCount: 4,
  initials: "OS",
}
];

const catColors: Record<string, string> = {
  BEAUTY: "#c0392b",
  WELLNESS: "#b7860b",
  LIFESTYLE: "#2d7a4f",
  SKINCARE: "#6d3fa0",
  HAIR: "#1a6e8e",
};

const paths = [
  { label: "Search", title: "Ask Mirha by concern", text: "Search oily skin, pigmentation, niacinamide, sunscreen, or budget.", href: "/dashboard/search" },
  { label: "Routine", title: "Build your 4-step routine", text: "Get cleanser, treatment, moisturiser, and sunscreen for your skin profile.", href: "/tools/routine" },
  { label: "Shop", title: "Browse curated picks", text: "See products with price, use case, ingredients, and honest context.", href: "/" },
];
import BlogGrid from "@/components/BlogGrid";
export default function BlogIndex() {
  return (
    <main>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .journal-page { background: #faf8f5; color: #111; min-height: 100vh; }
        .journal-hero {
          min-height: 620px;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
          border-bottom: 1px solid #ded7cf;
        }
        .journal-hero-copy {
          padding: 5rem 4.5rem 4rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #9b7e6b;
          margin: 0 0 1rem;
        }
        .hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(3rem, 6vw, 6.4rem);
          line-height: 0.92;
          font-weight: 400;
          letter-spacing: 0;
          margin: 0;
          max-width: 760px;
        }
        .hero-title span { color: #c0392b; font-style: italic; }
        .hero-copy {
          max-width: 610px;
          color: #6f6963;
          line-height: 1.75;
          font-size: 1rem;
          margin: 1.4rem 0 2rem;
        }
        .hero-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; }
        .primary-btn, .secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0.9rem 1.35rem;
          border-radius: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          text-decoration: none;
        }
        .primary-btn { background: #111; color: #fff; border: 1px solid #111; }
        .secondary-btn { color: #111; border: 1px solid #d8d0c7; background: #fff; }
        .journal-hero-visual {
          position: relative;
          min-height: 620px;
          background-image: linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.16)), url('/images/hero-skincare.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding: 3rem;
        }
        .visual-note {
          color: #fff;
          max-width: 360px;
        }
        .visual-note h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          font-weight: 400;
          line-height: 1.1;
          margin: 0 0 0.8rem;
        }
        .visual-note p {
          color: rgba(255,255,255,0.72);
          line-height: 1.65;
          margin: 0;
          font-size: 0.9rem;
        }
        .trust-strip {
          background: #111;
          color: #fff;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid #111;
        }
        .trust-item {
          padding: 1.1rem 1.4rem;
          border-right: 1px solid rgba(255,255,255,0.1);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.62);
          text-align: center;
        }
        .path-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4.5rem 2.5rem 2.5rem;
        }
        .section-kicker {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #9b7e6b;
          margin: 0 0 0.8rem;
        }
        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 1.05;
          font-weight: 400;
          margin: 0;
        }
        .path-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #ded7cf;
          border: 1px solid #ded7cf;
          margin-top: 2rem;
        }
        .path-card {
          background: #fff;
          padding: 1.7rem;
          text-decoration: none;
          color: #111;
          min-height: 210px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: background 0.2s;
        }
        .path-card:hover { background: #f5eee7; }
        .path-label {
          color: #c0392b;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          margin: 0 0 1.2rem;
        }
        .path-card h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.45rem;
          font-weight: 400;
          line-height: 1.15;
          margin: 0 0 0.7rem;
        }
        .path-card p {
          color: #777;
          line-height: 1.65;
          font-size: 0.86rem;
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
          border: 1px solid #ded7cf;
          background: #fff;
          text-decoration: none;
          color: #111;
        }
        .featured-main { padding: 2.4rem; }
        .featured-main h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.8rem, 4vw, 3.2rem);
          font-weight: 400;
          line-height: 1.08;
          margin: 0 0 1rem;
        }
        .featured-main p {
          color: #777;
          line-height: 1.75;
          max-width: 620px;
          margin: 0 0 1.5rem;
        }
        .featured-side {
          background: #111;
          color: #fff;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .featured-side p {
          color: rgba(255,255,255,0.58);
          line-height: 1.7;
          margin: 0;
        }
        .article-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3.5rem 2.5rem 6rem;
        }
        .article-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1rem;
          border-bottom: 2px solid #111;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }
        .article-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #e8e1d8;
          border-left: 1px solid #e8e1d8;
        }
        .article-card {
          background: #faf8f5;
          color: #111;
          text-decoration: none;
          padding: 1.6rem;
          min-height: 300px;
          border-right: 1px solid #e8e1d8;
          border-bottom: 1px solid #e8e1d8;
          display: flex;
          flex-direction: column;
          transition: background 0.2s;
        }
        .article-card:hover { background: #fff; }
        .article-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #111;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          margin-bottom: 1.2rem;
        }
        .article-cat {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 0.75rem;
        }
        .article-card h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          line-height: 1.3;
          font-weight: 400;
          margin: 0 0 0.8rem;
        }
        .article-card p {
          color: #827b75;
          font-size: 0.82rem;
          line-height: 1.7;
          margin: 0;
        }
        .article-meta {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid #eee6dd;
          display: flex;
          gap: 0.7rem;
          flex-wrap: wrap;
          color: #aaa;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .footer-cta {
          background: #111;
          color: #fff;
          text-align: center;
          padding: 4rem 1.5rem;
        }
        .footer-cta h2 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0 0 1rem;
        }
        .footer-cta p {
          color: rgba(255,255,255,0.62);
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto 1.6rem;
        }
        @media (max-width: 980px) {
          .journal-hero, .featured-card { grid-template-columns: 1fr; }
          .journal-hero-copy { padding: 4rem 2rem; }
          .journal-hero-visual { min-height: 420px; }
          .trust-strip, .path-grid, .article-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .journal-hero-copy { padding: 3rem 1.4rem; }
          .journal-hero-visual { min-height: 360px; padding: 1.5rem; }
          .trust-strip, .path-grid, .article-grid { grid-template-columns: 1fr; }
          .path-section, .featured-band, .article-section { padding-left: 1.4rem; padding-right: 1.4rem; }
          .article-header { align-items: flex-start; flex-direction: column; }
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
              Guides, comparisons, and routines for Indian skin: clear enough for beginners, useful enough for people who already know their actives.
            </p>
            <div className="hero-actions">
              <a href="/dashboard/search" className="primary-btn">Search Mirha</a>
              <a href="/tools/routine" className="secondary-btn">Build Routine</a>
            </div>
          </div>

          <div className="journal-hero-visual">
            <div className="visual-note">
              <p className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>Start here</p>
              <h2>Find what works. Skip what does not.</h2>
              <p>
                Every guide points back to one thing: a routine you can actually use, buy, and stay consistent with.
              </p>
            </div>
          </div>
        </section>

        <div className="trust-strip">
          <div className="trust-item">Indian skin + climate</div>
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
                <div>
                  <p className="path-label">{path.label}</p>
                  <h3>{path.title}</h3>
                  <p>{path.text}</p>
                </div>
                <span style={{ color: "#c0392b", marginTop: "1.2rem" }}>Open</span>
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
              <span className="primary-btn">Read guide</span>
            </div>
            <div className="featured-side">
              <p>{featured.date} / {featured.readTime}</p>
              <p>
                Best for anyone confused by serum claims, active percentages, acne marks, and oily-skin routines.
              </p>
            </div>
          </a>
        </section>

        <section className="article-section">
          <div className="article-header">
            <div>
              <p className="section-kicker">All guides</p>
              <h2 className="section-title">Read by concern.</h2>
            </div>
            <span style={{ color: "#aaa", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {posts.length} articles
            </span>
          </div>

          <div className="article-grid">
            {posts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="article-card">
                <div className="article-icon">{post.initials}</div>
                <p className="article-cat" style={{ color: catColors[post.category] }}>{post.category}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="article-meta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                  <span>{post.productCount} picks</span>
                </div>
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

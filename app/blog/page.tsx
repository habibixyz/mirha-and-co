"use client";

const AFFILIATE_TAG = "skinwithtanvi-21";

export default function BlogIndex() {
  const featured = {
    category: "BEAUTY" as const,
    title: "What Niacinamide Actually Does to Your Skin (India Edition)",
    excerpt:
      "The complete, no-fluff guide — written for Indian skin, Indian weather, and Indian budgets.",
    slug: "what-niacinamide-does-to-your-skin",
    readTime: "10 min",
    date: "March 2026",
    tag: "TRENDING",
  };

  const posts = [
    { category: "SKINCARE" as const, title: "The Indian Pigmentation Playbook (Dermat-Backed Guide)", excerpt: "A complete guide to treating pigmentation in Indian skin using the right actives and routines.", slug: "pigmentation-guide", readTime: "12 min", date: "April 2026", productCount: 8, thumbnail: "✨" },
    { category: "BEAUTY" as const, title: "Why Your Skin Looks Dull Even After Skincare", excerpt: "Hard water, wrong layering, and skipping SPF — the real reasons your skin isn't glowing.", slug: "why-skin-looks-dull", readTime: "10 min", date: "April 2026", productCount: 6, thumbnail: "✨" },
    { category: "BEAUTY" as const, title: "The ₹1000 Skincare Mistakes Costing You ₹10,000", excerpt: "The habits that silently ruin your skincare results — and how to fix them.", slug: "skincare-mistakes", readTime: "9 min", date: "April 2026", productCount: 5, thumbnail: "💸" },
    { category: "BEAUTY" as const, title: "Minimalist vs The Ordinary vs Dot & Key — What Actually Works?", excerpt: "A real comparison of India's most popular skincare brands — based on results, not hype.", slug: "brand-comparison-india", readTime: "11 min", date: "April 2026", productCount: 7, thumbnail: "⚖️" },
    { category: "HAIR" as const, title: "Why Your Hair Won't Stop Falling (Hard Water India Guide)", excerpt: "The hidden cause of hair fall in Indian cities — and the exact protocol to fix it.", slug: "hard-water-hair", readTime: "11 min", date: "April 2026", productCount: 8, thumbnail: "💧" },
    { category: "BEAUTY" as const, title: "The 12 Skincare Products That Actually Changed My Skin", excerpt: "After years of testing everything, these are the only products still on my shelf.", slug: "skincare-products-that-changed-my-skin", readTime: "8 min", date: "March 2026", productCount: 12, thumbnail: "🧴" },
    { category: "WELLNESS" as const, title: "Morning Routines That Don't Require 2 Hours", excerpt: "Five things. Twenty minutes. A real difference.", slug: "morning-routines", readTime: "5 min", date: "March 2026", productCount: 5, thumbnail: "☀️" },
    { category: "BEAUTY" as const, title: "Amazon Skincare Finds Under ₹1500 That Dermatologists Actually Use", excerpt: "Budget doesn't mean compromise. These prove it.", slug: "amazon-skincare-under-1500", readTime: "6 min", date: "March 2026", productCount: 8, thumbnail: "💰" },
    { category: "LIFESTYLE" as const, title: "Gift Guides for the Woman Who Has Everything", excerpt: "She's impossible to shop for. We figured it out.", slug: "gift-guide-woman-who-has-everything", readTime: "7 min", date: "Feb 2026", productCount: 15, thumbnail: "🎁" },
    { category: "WELLNESS" as const, title: "The Supplements Worth Taking (And the Ones That Are Just Hype)", excerpt: "Honest breakdown. No sponsorships. Just research.", slug: "supplements-worth-taking", readTime: "9 min", date: "Feb 2026", productCount: 10, thumbnail: "💊" },
    { category: "BEAUTY" as const, title: "The Right Order to Apply Your Skincare (Most People Get This Wrong)", excerpt: "Layering matters. This is the sequence that actually works.", slug: "skincare-layering-order", readTime: "5 min", date: "Jan 2026", productCount: 6, thumbnail: "⚗️" },
    { category: "LIFESTYLE" as const, title: "The 8 Amazon Buys That Changed How I Live at Home", excerpt: "Small upgrades. Massive difference to daily life.", slug: "amazon-home-buys", readTime: "6 min", date: "Jan 2026", productCount: 8, thumbnail: "🏠" },
    { category: "BEAUTY" as const, title: "Best Sunscreens in India (2026) That Actually Work", excerpt: "No white cast. No greasy finish. Just sunscreens that people actually use daily.", slug: "best-sunscreens-india-2026", readTime: "5 min", date: "March 2026", productCount: 9, thumbnail: "☀️" },
    { category: "BEAUTY" as const, title: "4-Step Indian Skincare Routine Under ₹2000 (That Actually Works)", excerpt: "A simple, no-fluff routine built for Indian skin, weather, and budgets.", slug: "budget-skincare-routine-under-2000", readTime: "9 min", date: "April 2026", productCount: 9, thumbnail: "🧴" },
    { category: "BEAUTY" as const, title: "Niacinamide 5% vs 10% — Which One Does Your Skin Actually Need?", excerpt: "The honest breakdown of what each concentration does differently — and which one is right for your skin type.", slug: "niacinamide-5-vs-10", readTime: "8 min", date: "April 2026", productCount: 3, thumbnail: "⚗️" },
    { category: "BEAUTY" as const, title: "Niacinamide vs Vitamin C — Which One Does Indian Skin Actually Need?", excerpt: "What each ingredient does, which concerns they target, and how to layer them correctly in Indian weather.", slug: "niacinamide-vs-vitamin-c", readTime: "9 min", date: "April 2026", productCount: 3, thumbnail: "🍊" },
    { category: "BEAUTY" as const, title: "Niacinamide for Oily Skin in India — How It Actually Controls Oil", excerpt: "Why niacinamide works for oily skin in Indian humidity, what concentration to use, and the full AM/PM routine.", slug: "niacinamide-for-oily-skin", readTime: "10 min", date: "April 2026", productCount: 4, thumbnail: "💧" },
    { category: "BEAUTY" as const, title: "Sunscreen in India — Why SPF 50 Is Non-Negotiable", excerpt: "Why Indian skin needs SPF 50+ and the best options available.", slug: "best-sunscreen-india-spf50", readTime: "11 min", date: "April 2026", productCount: 5, thumbnail: "☀️" },
    { category: "BEAUTY" as const, title: "Serums vs Essences vs Moisturisers — What You Actually Need", excerpt: "The honest breakdown of what each product does and what your skin actually needs.", slug: "serums-essences-moisturizers-guide", readTime: "10 min", date: "April 2026", productCount: 6, thumbnail: "🧪" },
    { category: "SKINCARE" as const, title: "Complete Skincare Routine for Every Skin Type", excerpt: "A science-backed 4-step routine for oily, dry, combination, and sensitive skin.", slug: "skincare-routine-every-skin-type", readTime: "14 min", date: "April 2026", productCount: 12, thumbnail: "🧴" },
  ];

  const catColors: Record<string, string> = {
    BEAUTY: "#c0392b",
    WELLNESS: "#b7860b",
    LIFESTYLE: "#2d7a4f",
    SKINCARE: "#6d3fa0",
    HAIR: "#1a6e8e",
  };

  return (
    <main>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── HERO ──────────────────────────────────────────────── */
        .blog-hero {
          display: grid;
          grid-template-columns: 5fr 3fr;
          border-bottom: 1px solid #d6d0c9;
          background: #faf8f5;
        }

        /* LEFT PANEL — no decorative borders, clean */
        .blog-hero-main {
          padding: 5rem 4.5rem 4.5rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 0;
          border-right: 1px solid #d6d0c9;
          background: #faf8f5;
        }

        .blog-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          font-weight: 600;
          color: #2c2826;
          margin-bottom: 1.4rem;
        }

        .eyebrow-pill {
          background: var(--rose, #c0392b);
          color: #fff;
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          font-weight: 700;
          padding: 0.28rem 0.65rem;
          border-radius: 2px;
        }

        .blog-featured-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.15;
          color: #111;
          margin-bottom: 1.2rem;
          font-weight: 400;
          max-width: 580px;
        }

        .blog-featured-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #6b6460;
          line-height: 1.8;
          margin-bottom: 2.5rem;
          max-width: 520px;
          font-weight: 400;
        }

        .featured-cta-row {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .blog-featured-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: #111;
          color: #fff;
          padding: 0.95rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid #111;
          transition: background 0.2s, color 0.2s;
        }
        .blog-featured-cta:hover {
          background: var(--rose, #c0392b);
          border-color: var(--rose, #c0392b);
        }

        .featured-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          color: #aaa;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* RIGHT PANEL — full bleed image, dark overlay */
        .blog-hero-side {
          position: relative;
          background-image: url('/images/hero-skincare.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 3.5rem;
          min-height: 480px;
          overflow: hidden;
        }

        /* Dark gradient overlay — consistent, no blur */
        .blog-hero-side::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.75) 0%,
            rgba(0,0,0,0.35) 50%,
            rgba(0,0,0,0.1) 100%
          );
          z-index: 0;
        }

        /* Fallback if image is missing */
        .blog-hero-side-fallback {
          position: absolute;
          inset: 0;
          background: #1a1410;
          z-index: -1;
        }

        .hero-side-content {
          position: relative;
          z-index: 1;
        }

        .hero-side-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.8rem;
        }

        .blog-hero-side h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          color: #fff;
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 0.9rem;
        }

        .blog-hero-side p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 300px;
        }

        .hero-side-steps {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 1.4rem;
          border-top: 1px solid rgba(255,255,255,0.15);
        }

        .hero-side-step {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.2s;
        }

        .hero-side-step:hover { color: #fff; }

        .step-num {
          font-family: 'DM Serif Display', serif;
          font-size: 0.75rem;
          color: var(--rose, #c0392b);
          width: 18px;
          flex-shrink: 0;
        }

        /* ─── DISCLOSURE STRIP ──────────────────────────────────── */
        .disclosure-strip {
          background: #fff;
          border-bottom: 1px solid #e8e4de;
          padding: 1.1rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
        }

        .disclosure-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--rose, #c0392b);
          flex-shrink: 0;
        }

        .disclosure-strip p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: #888;
          line-height: 1.6;
          max-width: 680px;
          text-align: center;
        }

        .disclosure-strip strong {
          color: #444;
          font-weight: 500;
        }

        /* ─── START HERE BAND ───────────────────────────────────── */
        .start-here-band {
          background: #111;
          padding: 2.8rem 2.5rem;
        }

        .start-here-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          align-items: center;
          gap: 3rem;
        }

        .start-here-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 0.5rem;
        }

        .start-here-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.5rem;
          color: #fff;
          font-weight: 400;
          line-height: 1.3;
        }

        .start-here-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .start-here-step {
          background: #111;
          padding: 1.4rem 1.6rem;
          text-decoration: none;
          transition: background 0.2s;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .start-here-step:hover { background: #1a1a1a; }

        .step-index {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--rose, #c0392b);
        }

        .step-title {
          font-family: 'DM Serif Display', serif;
          font-size: 0.95rem;
          color: #fff;
          font-weight: 400;
          line-height: 1.35;
        }

        .step-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.1em;
          margin-top: 0.2rem;
        }

        /* ─── GRID SECTION ──────────────────────────────────────── */
        .blog-grid-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2.5rem 6rem;
        }

        .grid-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-bottom: 1.2rem;
          border-bottom: 2px solid #111;
          margin-bottom: 3.5rem;
        }

        .grid-header-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.1em;
          color: #111;
          font-weight: 400;
        }

        .grid-header-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          color: #aaa;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }

        .blog-card {
          display: flex;
          flex-direction: column;
          padding: 2rem 2rem 2rem;
          text-decoration: none;
          color: #111;
          border-right: 1px solid #e8e4de;
          border-bottom: 1px solid #e8e4de;
          transition: background 0.2s;
          position: relative;
        }

        /* Remove right border on every 3rd card */
        .blog-card:nth-child(3n) {
          border-right: none;
        }

        .blog-card:hover {
          background: #faf8f5;
        }

        /* Rose top accent on hover */
        .blog-card::before {
          content: '';
          position: absolute;
          top: -1px; left: 0;
          width: 0;
          height: 2px;
          background: var(--rose, #c0392b);
          transition: width 0.3s ease;
        }

        .blog-card:hover::before { width: 100%; }

        .card-icon {
          font-size: 1.6rem;
          margin-bottom: 1rem;
          opacity: 0.75;
          line-height: 1;
        }

        .card-cat {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.56rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .cat-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          line-height: 1.35;
          color: #111;
          margin-bottom: 0.8rem;
          font-weight: 400;
          flex-grow: 1;
        }

        .card-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: #8a8480;
          line-height: 1.7;
          margin-bottom: 1.4rem;
        }

        .card-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          color: #aaa;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid #f0ece6;
        }

        .meta-sep {
          width: 1px; height: 10px;
          background: #e0dcd8;
          flex-shrink: 0;
        }

        .picks-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(192,57,43,0.07);
          color: var(--rose, #c0392b);
          padding: 0.2rem 0.55rem;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          font-weight: 600;
        }

        /* ─── FOOTER STRIP ──────────────────────────────────────── */
        .blog-footer-strip {
          border-top: 1px solid #e8e4de;
          padding: 3rem 2.5rem;
          text-align: center;
          background: #faf8f5;
        }

        .footer-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 0.6rem;
        }

        .footer-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          font-weight: 400;
          color: #111;
          margin-bottom: 0.8rem;
        }

        .footer-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: #888;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 0.6rem;
        }

        .footer-legal {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          color: #bbb;
        }

        /* ─── RESPONSIVE ────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .blog-hero { grid-template-columns: 1fr; }
          .blog-hero-main { border-right: none; border-bottom: 1px solid #d6d0c9; }
          .blog-hero-side { min-height: 360px; }
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
          .blog-card:nth-child(3n) { border-right: 1px solid #e8e4de; }
          .blog-card:nth-child(2n) { border-right: none; }
          .start-here-inner { grid-template-columns: 1fr; gap: 1.8rem; }
          .start-here-steps { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .blog-hero-main { padding: 3rem 1.5rem; }
          .blog-hero-side { padding: 2.5rem 1.5rem; min-height: 300px; }
          .blog-featured-title { font-size: clamp(1.6rem, 5vw, 2.2rem); }
          .featured-cta-row { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .blog-featured-cta { width: 100%; justify-content: center; }
          .start-here-steps { grid-template-columns: 1fr; }
          .blog-grid { grid-template-columns: 1fr; }
          .blog-card, .blog-card:nth-child(3n), .blog-card:nth-child(2n) { border-right: none; }
          .blog-grid-section { padding: 3rem 1.5rem 4rem; }
          .disclosure-strip { padding: 1rem 1.5rem; }
          .start-here-band { padding: 2rem 1.5rem; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="blog-hero">

        {/* LEFT */}
        <div className="blog-hero-main">
          <p className="blog-eyebrow">
            <span className="eyebrow-pill">{featured.tag}</span>
            <span style={{ color: catColors[featured.category] }}>{featured.category}</span>
          </p>
          <h1 className="blog-featured-title">{featured.title}</h1>
          <p className="blog-featured-excerpt">{featured.excerpt}</p>
          <div className="featured-cta-row">
            <a href={`/blog/${featured.slug}`} className="blog-featured-cta">
              Read the full guide <span>→</span>
            </a>
            <span className="featured-meta">{featured.date} · {featured.readTime} read</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="blog-hero-side">
          <div className="blog-hero-side-fallback" />
          <div className="hero-side-content">
            <p className="hero-side-label">Your Skincare Journey</p>
            <h2>Start Here. Glow There.</h2>
            <p>Three guided steps to transform your routine — from choosing the right sunscreen to building a complete regimen for Indian skin.</p>
            <div className="hero-side-steps">
              <a href="/blog/best-sunscreens-india-2026" className="hero-side-step">
                <span className="step-num">01</span>
                Pick your sunscreen
              </a>
              <a href="/blog/skincare-routine-every-skin-type" className="hero-side-step">
                <span className="step-num">02</span>
                Learn the full routine
              </a>
              <a href="/blog/budget-skincare-routine-under-2000" className="hero-side-step">
                <span className="step-num">03</span>
                Build on a budget
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ── DISCLOSURE ── */}
      <div className="disclosure-strip">
        <div className="disclosure-dot" />
        <p>
          <strong>Affiliate links ahead.</strong> Mirha &amp; Co. participates in the Amazon Associates Program. Some links earn a small commission — at no extra cost to you. Every product is chosen based on research and verified reviews.
        </p>
      </div>

      {/* ── START HERE BAND ── */}
      <div className="start-here-band">
        <div className="start-here-inner">
          <div>
            <p className="start-here-label">New to skincare?</p>
            <h3 className="start-here-title">Start with the basics. Get real results.</h3>
          </div>
          <div className="start-here-steps">
            <a href="/blog/best-sunscreens-india-2026" className="start-here-step">
              <span className="step-index">Step 01</span>
              <span className="step-title">Pick your sunscreen</span>
              <span className="step-meta">5 min read</span>
            </a>
            <a href="/blog/skincare-routine-every-skin-type" className="start-here-step">
              <span className="step-index">Step 02</span>
              <span className="step-title">Learn the full routine</span>
              <span className="step-meta">14 min read</span>
            </a>
            <a href="/blog/budget-skincare-routine-under-2000" className="start-here-step">
              <span className="step-index">Step 03</span>
              <span className="step-title">Build on a budget</span>
              <span className="step-meta">9 min read</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <section className="blog-grid-section">
        <div className="grid-header">
          <h2 className="grid-header-title">All Articles</h2>
          <span className="grid-header-count">{posts.length} articles</span>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="card-icon">{post.thumbnail}</div>
              <p className="card-cat" style={{ color: catColors[post.category] }}>
                <span className="cat-dot" style={{ backgroundColor: catColors[post.category] }} />
                {post.category}
              </p>
              <h3 className="card-title">{post.title}</h3>
              <p className="card-excerpt">{post.excerpt}</p>
              <div className="card-meta">
                <span>{post.date}</span>
                <div className="meta-sep" />
                <span>{post.readTime}</span>
                <div className="meta-sep" />
                <span className="picks-badge">📌 {post.productCount} picks</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div className="blog-footer-strip">
        <p className="footer-eyebrow">About this journal</p>
        <p className="footer-name">Mirha &amp; Co.</p>
        <p className="footer-desc">
          We curate skincare based on ingredient quality, real reviews, and suitability for Indian skin and climate conditions. No paid placements — only products worth your money.
        </p>
        <p className="footer-legal">Affiliate links may earn us a commission at no extra cost to you.</p>
      </div>

    </main>
  );
}

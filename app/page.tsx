export default function Home() {
  const featured = {
    category: "BEAUTY",
    title: "What Niacinamide Actually Does to Your Skin (India Edition)",
    excerpt:
      "Not 10 steps. Not a ₹15,000 routine. Three products, backed by dermatologists, that work on Indian skin in Indian weather.",
    slug: "what-niacinamide-does-to-your-skin",
    readTime: "6 min",
  };

  const posts = [
    {
      category: "WELLNESS",
      title: "Morning Routines That Don't Require 2 Hours",
      excerpt: "Five evidence-based habits. Twenty minutes. Real difference.",
      slug: "morning-routines",
      readTime: "5 min",
    },
    {
      category: "BEAUTY",
      title: "Best Niacinamide Serums in India Under ₹800 — Ranked by Ingredients",
      excerpt: "We read every label so you don't have to. Here's what actually has the right concentration.",
      slug: "best-niacinamide-serums-india",
      readTime: "6 min",
    },
    {
      category: "LIFESTYLE",
      title: "Gift Guide for the Woman Who Has Everything",
      excerpt: "Chosen for taste. All on Amazon India.",
      slug: "gift-guide-woman-who-has-everything",
      readTime: "7 min",
    },
    {
      category: "WELLNESS",
      title: "The Supplements Actually Worth Taking in India",
      excerpt: "What the research says. What dermatologists recommend. What to skip.",
      slug: "supplements-worth-taking",
      readTime: "9 min",
    },
  ];

  return (
    <main>
      <style>{`
        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 88vh;
          max-height: 700px;
        }
        .hero-left {
          background: var(--black);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 4rem;
          position: relative;
          overflow: hidden;
        }
        .hero-left::before {
          content: 'MIRHA';
          position: absolute;
          top: -2rem;
          left: -1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18rem;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          pointer-events: none;
          white-space: nowrap;
        }
        .hero-right {
          background: var(--rose);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 4rem;
          position: relative;
          overflow: hidden;
        }
        .hero-cat {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 1rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }
        .hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          color: var(--white);
          line-height: 1.15;
          margin-bottom: 1.2rem;
        }
        .hero-excerpt {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 400px;
          font-family: 'DM Sans', sans-serif;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: var(--rose);
          color: var(--white);
          padding: 0.9rem 1.8rem;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          width: fit-content;
          transition: background 0.2s;
        }
        .hero-cta:hover { background: #a83a2e; }
        .hero-right-label {
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 1rem;
        }
        .hero-right-stat {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 5rem;
          color: rgba(0,0,0,0.15);
          line-height: 1;
          margin-bottom: 0.3rem;
        }
        .hero-right-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.4rem;
          color: var(--white);
          font-style: italic;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .hero-right-sub {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.65;
          font-family: 'DM Sans', sans-serif;
          max-width: 280px;
        }
        .ticker {
          background: var(--rose);
          padding: 0.7rem 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .ticker-inner {
          display: inline-flex;
          gap: 4rem;
          animation: ticker 22s linear infinite;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: var(--white);
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .posts-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 2.5rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-top: 3px solid var(--black);
          padding-top: 1rem;
          margin-bottom: 3rem;
        }
        .section-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.05em;
        }
        .section-link {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          border-bottom: 1px solid var(--rule);
          padding-bottom: 0.1rem;
        }
        .section-link:hover { color: var(--rose); border-color: var(--rose); }
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }
        .post-card {
          border: 1px solid var(--rule);
          padding: 2.5rem;
          transition: background 0.2s;
          display: block;
          text-decoration: none;
          color: var(--ink);
        }
        .post-card:hover { background: var(--sand); }
        .post-card-cat {
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 0.8rem;
          font-family: 'DM Sans', sans-serif;
        }
        .post-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          line-height: 1.25;
          margin-bottom: 0.8rem;
        }
        .post-card-excerpt {
          font-size: 0.83rem;
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: 1.2rem;
          font-family: 'DM Sans', sans-serif;
        }
        .post-card-meta {
          font-size: 0.65rem;
          color: var(--muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .post-card-meta::before {
          content: '';
          width: 20px;
          height: 1px;
          background: var(--rose);
          display: inline-block;
        }
        .why-section {
          background: var(--sand);
          padding: 5rem 2.5rem;
          border-top: 2px solid var(--black);
          border-bottom: 2px solid var(--black);
        }
        .why-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 5rem;
          align-items: center;
        }
        .why-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4rem;
          line-height: 1;
          letter-spacing: 0.03em;
        }
        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .why-item-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1rem;
          margin-bottom: 0.4rem;
          font-style: italic;
        }
        .why-item-text {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.65;
          font-family: 'DM Sans', sans-serif;
        }
        .cta-strip {
          background: var(--black);
          padding: 6rem 2.5rem;
          text-align: center;
        }
        .cta-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 1.5rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }
        .cta-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 8vw, 7rem);
          letter-spacing: 0.04em;
          color: var(--white);
          line-height: 1;
          margin-bottom: 1.5rem;
        }
        .cta-sub {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1rem;
          color: rgba(255,255,255,0.45);
          max-width: 480px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: var(--rose);
          color: var(--white);
          padding: 1rem 2.5rem;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
        }
        .cta-btn:hover { background: #a83a2e; }
        @media (max-width: 768px) {
          .hero-section { grid-template-columns: 1fr; max-height: none; min-height: auto; }
          .hero-left, .hero-right { padding: 2.5rem 1.5rem; min-height: 50vh; }
          .posts-grid { grid-template-columns: 1fr; }
          .post-card { padding: 1.8rem 1.5rem; }
          .posts-section { padding: 3rem 1.5rem; }
          .why-inner { grid-template-columns: 1fr; gap: 2rem; }
          .why-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-left">
          <p className="hero-cat">{featured.category}</p>
          <h1 className="hero-title">{featured.title}</h1>
          <p className="hero-excerpt">{featured.excerpt}</p>
          <a href={`/blog/${featured.slug}`} className="hero-cta">
            Read Now →
          </a>
        </div>
        <div className="hero-right">
          <p className="hero-right-label">Why This Site Exists</p>
          <div className="hero-right-stat">₹0</div>
          <p className="hero-right-title">Paid for any recommendation. Ever.</p>
          <p className="hero-right-sub">
            Built by someone who spent years in Indian beauty retail.
            Every recommendation is based on ingredients, evidence,
            and what dermatologists actually say — not what brands pay to promote.
          </p>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {["Beauty Research", "Wellness Science", "Amazon India Finds", "Honest Ingredient Reviews", "Dermatologist Picks", "India Focused", "Beauty Research", "Wellness Science", "Amazon India Finds", "Honest Ingredient Reviews", "Dermatologist Picks", "India Focused"].map((t, i) => (
            <span key={i}>◆ {t}</span>
          ))}
        </div>
      </div>

      {/* WHY US */}
      <section className="why-section">
        <div className="why-inner">
          <h2 className="why-label">WHY TRUST US?</h2>
          <div className="why-grid">
            <div>
              <h3 className="why-item-title">Beauty Retail Background</h3>
              <p className="why-item-text">Built by someone who worked in Indian beauty retail. We know how products are made, priced, and marketed — and what that means for you.</p>
            </div>
            <div>
              <h3 className="why-item-title">Ingredient-First Approach</h3>
              <p className="why-item-text">We don't recommend by brand name or price tag. We read the label, check the concentration, and tell you what the science says.</p>
            </div>
            <div>
              <h3 className="why-item-title">India Specific</h3>
              <p className="why-item-text">Indian climate. Indian skin types. Indian budgets. Everything on this site is written for where you actually live, not a Western audience.</p>
            </div>
            <div>
              <h3 className="why-item-title">Affiliate Links, Always Disclosed</h3>
              <p className="why-item-text">Some links earn a commission. Always marked. The commission never decides what we recommend — the evidence does.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST POSTS */}
      <section className="posts-section">
        <div className="section-header">
          <h2 className="section-label">Latest Posts</h2>
          <a href="/blog" className="section-link">View All →</a>
        </div>
        <div className="posts-grid">
          {posts.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="post-card">
              <p className="post-card-cat" style={{ color: post.category === "BEAUTY" ? "var(--rose)" : post.category === "WELLNESS" ? "#4a7c6f" : "#7c6b4a" }}>
                {post.category}
              </p>
              <h3 className="post-card-title">{post.title}</h3>
              <p className="post-card-excerpt">{post.excerpt}</p>
              <p className="post-card-meta">{post.readTime} read</p>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <p className="cta-eyebrow">The Journal</p>
        <h2 className="cta-title">BEAUTY.<br />WELLNESS.<br />TRUTH.</h2>
        <p className="cta-sub">
          Research-backed guides for Indian women who want honest answers,
          not another sponsored post.
        </p>
        <a href="/blog" className="cta-btn">Start Reading →</a>
      </section>

    </main>
  );
}

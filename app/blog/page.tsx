const AFFILIATE_TAG = "skinwithtanvi-21";

export default function BlogIndex() {

  const featured = {
    category: "BEAUTY",
    title: "What Niacinamide Actually Does to Your Skin (India Edition)",
    excerpt: "The complete, no-fluff guide — written for Indian skin, Indian weather, and Indian budgets.",
    slug: "what-niacinamide-does-to-your-skin",
    readTime: "10 min",
    date: "March 2026",
  };

  const posts = [
    { category: "BEAUTY",    title: "The 12 Skincare Products That Actually Changed My Skin",              excerpt: "After years of testing everything, these are the only products still on my shelf.",   slug: "skincare-products-that-changed-my-skin",       readTime: "8 min",  date: "March 2026" },
    { category: "WELLNESS",  title: "Morning Routines That Don't Require 2 Hours",                         excerpt: "Five things. Twenty minutes. A real difference.",                                 slug: "morning-routines",                             readTime: "5 min",  date: "March 2026" },
    { category: "BEAUTY",    title: "Amazon Skincare Finds Under ₹1500 That Dermatologists Actually Use",  excerpt: "Budget doesn't mean compromise. These prove it.",                                slug: "amazon-skincare-under-1500",                   readTime: "6 min",  date: "March 2026" },
    { category: "LIFESTYLE", title: "Gift Guides for the Woman Who Has Everything",                        excerpt: "She's impossible to shop for. We figured it out.",                                slug: "gift-guide-woman-who-has-everything",           readTime: "7 min",  date: "Feb 2026"   },
    { category: "WELLNESS",  title: "The Supplements Worth Taking (And the Ones That Are Just Hype)",      excerpt: "Honest breakdown. No sponsorships. Just research.",                               slug: "supplements-worth-taking",                     readTime: "9 min",  date: "Feb 2026"   },
    { category: "BEAUTY",    title: "The Right Order to Apply Your Skincare (Most People Get This Wrong)", excerpt: "Layering matters. This is the sequence that actually works.",                     slug: "skincare-layering-order",                      readTime: "5 min",  date: "Jan 2026"   },
    { category: "LIFESTYLE", title: "The 8 Amazon Buys That Changed How I Live at Home",                   excerpt: "Small upgrades. Massive difference to daily life.",                               slug: "amazon-home-buys",                             readTime: "6 min",  date: "Jan 2026"   },
  ];

  const catColors: Record<string, string> = {
    BEAUTY:    "#c8473a",
    WELLNESS:  "#4a7c6f",
    LIFESTYLE: "#7c6b4a",
  };

  return (
    <main>
      <style>{`
        .blog-hero {
          border-bottom: 2px solid var(--black);
          display: grid;
          grid-template-columns: 5fr 3fr;
          min-height: 480px;
        }
        .blog-hero-main {
          border-right: 2px solid var(--black);
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: var(--sand);
          position: relative;
          overflow: hidden;
        }
        .blog-hero-main::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--rose);
        }
        .blog-hero-side {
          background: var(--black);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .blog-hero-side-label {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 2rem;
          font-family: 'DM Sans', sans-serif;
        }
        .blog-hero-issue {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 5rem;
          color: var(--white);
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .blog-hero-issue-sub {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: rgba(255,255,255,0.6);
          margin-bottom: 2.5rem;
        }
        .topic-list { display: flex; flex-direction: column; gap: 0.8rem; }
        .topic-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
          padding-bottom: 0.8rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          font-family: 'DM Sans', sans-serif;
        }
        .topic-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--rose);
          flex-shrink: 0;
        }
        .blog-eyebrow {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 1rem;
          font-family: 'DM Sans', sans-serif;
        }
        .blog-featured-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          line-height: 1.1;
          margin-bottom: 1.2rem;
          color: var(--ink);
        }
        .blog-featured-excerpt {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 520px;
          font-family: 'DM Sans', sans-serif;
        }
        .blog-featured-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--black);
          color: var(--white);
          padding: 0.8rem 1.6rem;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
          width: fit-content;
        }
        .blog-featured-cta:hover { background: var(--rose); }
        .blog-grid-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 4rem 2.5rem;
        }
        .blog-section-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 3px solid var(--black);
          padding-top: 0.8rem;
          margin-bottom: 3rem;
        }
        .blog-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.05em;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .blog-card {
          display: block;
          border-top: 2px solid var(--rule);
          padding-top: 1.5rem;
          text-decoration: none;
          color: var(--ink);
          transition: border-color 0.2s;
        }
        .blog-card:hover { border-color: var(--rose); }
        .blog-card-cat {
          font-size: 0.58rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 0.7rem;
          font-family: 'DM Sans', sans-serif;
        }
        .blog-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          line-height: 1.3;
          color: var(--ink);
          margin-bottom: 0.7rem;
        }
        .blog-card-excerpt {
          font-size: 0.8rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 1rem;
          font-family: 'DM Sans', sans-serif;
        }
        .blog-card-meta {
          font-size: 0.62rem;
          color: var(--muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
        }
        .affiliate-strip {
          background: #f0d5d2;
          border-top: 2px solid var(--rose);
          border-bottom: 2px solid var(--rose);
          padding: 1.5rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          text-align: center;
        }
        .affiliate-strip-text {
          font-size: 0.78rem;
          color: var(--ink);
          line-height: 1.6;
          max-width: 600px;
          font-family: 'DM Sans', sans-serif;
        }
        .affiliate-strip-text strong { font-weight: 500; }
        @media (max-width: 900px) {
          .blog-hero { grid-template-columns: 1fr; }
          .blog-hero-side { display: none; }
          .blog-grid { grid-template-columns: 1fr 1fr; }
          .blog-hero-main { padding: 2.5rem 1.5rem; }
        }
        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr; }
          .blog-grid-section { padding: 2.5rem 1.5rem; }
        }
      `}</style>

      {/* FEATURED HERO */}
      <section className="blog-hero">
        <div className="blog-hero-main">
          <p className="blog-eyebrow" style={{ color: catColors[featured.category] }}>
            {featured.category}
          </p>
          <h1 className="blog-featured-title">{featured.title}</h1>
          <p className="blog-featured-excerpt">{featured.excerpt}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <a href={`/blog/${featured.slug}`} className="blog-featured-cta">
              Read the full guide →
            </a>
            <span style={{ fontSize: "0.65rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif" }}>
              {featured.date} · {featured.readTime} read
            </span>
          </div>
        </div>
        <div className="blog-hero-side">
          <p className="blog-hero-side-label">This Month</p>
          <div className="blog-hero-issue">03</div>
          <p className="blog-hero-issue-sub">March 2026</p>
          <div className="topic-list">
            {["Niacinamide — the full breakdown", "Morning wellness habits", "Amazon India beauty finds", "Honest supplement guide"].map(t => (
              <div key={t} className="topic-item">
                <div className="topic-dot" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AFFILIATE DISCLOSURE */}
      <div className="affiliate-strip">
        <span style={{ fontSize: "1.2rem", color: "var(--rose)" }}>◆</span>
        <p className="affiliate-strip-text">
          <strong>Affiliate links ahead.</strong> Mirha & Co. participates in the Amazon Associates Program.
          Some links earn us a small commission — at no extra cost to you.
          Every product featured is based on ingredient research and verified reviews.
        </p>
      </div>

      {/* POST GRID */}
      <section className="blog-grid-section">
        <div className="blog-section-bar">
          <h2 className="blog-section-title">All Posts</h2>
          <span style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
            {posts.length} articles
          </span>
        </div>
        <div className="blog-grid">
          {posts.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <p className="blog-card-cat" style={{ color: catColors[post.category] || "var(--rose)" }}>
                {post.category}
              </p>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <p className="blog-card-meta">{post.date} · {post.readTime} read</p>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}

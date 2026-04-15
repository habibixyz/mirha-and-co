const AFFILIATE_TAG = "skinwithtanvi-21";

export default function BlogIndex() {
  const featured = {
    category: "BEAUTY" as const,
    title: "What Niacinamide Actually Does to Your Skin (India Edition)",
    excerpt: "The complete, no-fluff guide — written for Indian skin, Indian weather, and Indian budgets.",
    slug: "what-niacinamide-does-to-your-skin",
    readTime: "10 min",
    date: "March 2026",
    tag: "TRENDING",
  };

  const posts = [

    {
  category: "SKINCARE" as const,
  title: "The Indian Pigmentation Playbook (Dermat-Backed Guide)",
  excerpt: "A complete guide to treating pigmentation in Indian skin using the right actives and routines.",
  slug: "pigmentation-guide",
  readTime: "12 min",
  date: "April 2026",
  productCount: 8,
  thumbnail: "✨"
},

   {
  category: "HAIR" as const,
  title: "Why Your Hair Won’t Stop Falling (Hard Water India Guide)",
  excerpt: "The hidden cause of hair fall in Indian cities — and the exact protocol to fix it.",
  slug: "hard-water-hair",
  readTime: "11 min",
  date: "April 2026",
  productCount: 8,
  thumbnail: "💧"
},

    { 
      category: "BEAUTY" as const, 
      title: "The 12 Skincare Products That Actually Changed My Skin",
      excerpt: "After years of testing everything, these are the only products still on my shelf.",
      slug: "skincare-products-that-changed-my-skin",
      readTime: "8 min",
      date: "March 2026",
      productCount: 12,
      thumbnail: "🧴"
    },
    { 
      category: "WELLNESS" as const,
      title: "Morning Routines That Don't Require 2 Hours",
      excerpt: "Five things. Twenty minutes. A real difference.",
      slug: "morning-routines",
      readTime: "5 min",
      date: "March 2026",
      productCount: 5,
      thumbnail: "☀️"
    },
    { 
      category: "BEAUTY" as const,
      title: "Amazon Skincare Finds Under ₹1500 That Dermatologists Actually Use",
      excerpt: "Budget doesn't mean compromise. These prove it.",
      slug: "amazon-skincare-under-1500",
      readTime: "6 min",
      date: "March 2026",
      productCount: 8,
      thumbnail: "💰"
    },
    { 
      category: "LIFESTYLE" as const,
      title: "Gift Guides for the Woman Who Has Everything",
      excerpt: "She's impossible to shop for. We figured it out.",
      slug: "gift-guide-woman-who-has-everything",
      readTime: "7 min",
      date: "Feb 2026",
      productCount: 15,
      thumbnail: "🎁"
    },
    { 
      category: "WELLNESS" as const,
      title: "The Supplements Worth Taking (And the Ones That Are Just Hype)",
      excerpt: "Honest breakdown. No sponsorships. Just research.",
      slug: "supplements-worth-taking",
      readTime: "9 min",
      date: "Feb 2026",
      productCount: 10,
      thumbnail: "💊"
    },
    { 
      category: "BEAUTY" as const,
      title: "The Right Order to Apply Your Skincare (Most People Get This Wrong)",
      excerpt: "Layering matters. This is the sequence that actually works.",
      slug: "skincare-layering-order",
      readTime: "5 min",
      date: "Jan 2026",
      productCount: 6,
      thumbnail: "⚗️"
    },
    { 
      category: "LIFESTYLE" as const,
      title: "The 8 Amazon Buys That Changed How I Live at Home",
      excerpt: "Small upgrades. Massive difference to daily life.",
      slug: "amazon-home-buys",
      readTime: "6 min",
      date: "Jan 2026",
      productCount: 8,
      thumbnail: "🏠"
    },
    { 
      category: "BEAUTY" as const,
      title: "Best Sunscreens in India (2026) That Actually Work",
      excerpt: "No white cast. No greasy finish. Just sunscreens that people actually use daily.",
      slug: "best-sunscreens-india-2026",
      readTime: "5 min",
      date: "March 2026",
      productCount: 9,
      thumbnail: "☀️🧴"
    },
    {
  category: "BEAUTY" as const,
  title: "4-Step Indian Skincare Routine Under ₹2000 (That Actually Works)",
  excerpt: "A simple, no-fluff routine built for Indian skin, weather, and budgets.",
  slug: "budget-skincare-routine-under-2000",
  readTime: "9 min",
  date: "April 2026",
  productCount: 9,
  thumbnail: "🧴"
},
  ];

  const catColors = {
    BEAUTY:    "#c8473a",
    WELLNESS:  "#4a7c6f",
    LIFESTYLE: "#7c6b4a",
  };

  return (
    <main>
      <style>{`
        * { box-sizing: border-box; }
        
        /* === FEATURED HERO === */
        .blog-hero {
          border-bottom: 2px solid var(--black);
          display: grid;
          grid-template-columns: 5fr 3fr;
          min-height: 500px;
          background: linear-gradient(135deg, var(--sand) 0%, rgba(200, 71, 58, 0.03) 100%);
        }
        
        .blog-hero-main {
          border-right: 2px solid var(--black);
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          overflow: hidden;
        }
        
        .blog-hero-main::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 6px;
          height: 100%;
          background: var(--rose);
        }
        
        .blog-hero-main::after {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 150px; height: 150px;
          background: rgba(200, 71, 58, 0.05);
          border-radius: 50% 0 0 50%;
          pointer-events: none;
        }
        
        .blog-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 1rem;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        
        .eyebrow-badge {
          display: inline-block;
          background: var(--rose);
          color: white;
          padding: 0.3rem 0.6rem;
          font-size: 0.48rem;
          border-radius: 2px;
          font-weight: 700;
          letter-spacing: 0.2em;
        }
        
        .blog-featured-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.15;
          margin-bottom: 1.2rem;
          color: var(--ink);
          max-width: 650px;
        }
        
        .blog-featured-excerpt {
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.8;
          margin-bottom: 2.5rem;
          max-width: 580px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
        }
        
        .featured-cta-group {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        
        .blog-featured-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: var(--black);
          color: var(--white);
          padding: 1rem 2rem;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }
        
        .blog-featured-cta::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: var(--rose);
          transition: left 0.3s ease;
          z-index: -1;
        }
        
        .blog-featured-cta:hover::before {
          left: 0;
        }
        
        .cta-arrow {
          font-size: 1rem;
          transition: transform 0.3s ease;
        }
        
        .blog-featured-cta:hover .cta-arrow {
          transform: translateX(4px);
        }
        
        .featured-meta {
          font-size: 0.68rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-family: 'DM Sans', sans-serif;
        }
        
        /* === SIDEBAR === */
        .blog-hero-side {
          background: linear-gradient(135deg, #c8473a 0%, #8b4a4a 100%);
          padding: 3.5rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .blog-hero-side::before {
          content: '';
          position: absolute;
          top: -50%; right: -50%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        
        .blog-hero-side h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 2.2rem;
          color: white;
          margin-top: 0;
          margin-bottom: 1rem;
          line-height: 1.2;
          position: relative;
          z-index: 1;
        }
        
        .blog-hero-side p {
          font-size: 1rem;
          color: rgba(255,255,255,0.95);
          margin-bottom: 2rem;
          line-height: 1.7;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          z-index: 1;
        }
        
        .sidebar-cta {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.2);
          position: relative;
          z-index: 1;
        }
        
        .sidebar-cta-icon {
          font-size: 2.5rem;
        }
        
        .sidebar-cta-text {
          margin: 0;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.85);
          font-family: 'DM Sans', sans-serif;
          line-height: 1.4;
        }
        
        /* === AFFILIATE STRIP === */
        .affiliate-strip {
          background: linear-gradient(135deg, #f0d5d2 0%, rgba(200, 71, 58, 0.08) 100%);
          border-top: 2px solid var(--rose);
          border-bottom: 2px solid var(--rose);
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.8rem;
          text-align: center;
        }
        
        .affiliate-icon {
          font-size: 1.8rem;
          color: var(--rose);
          flex-shrink: 0;
        }
        
        .affiliate-strip-text {
          font-size: 0.8rem;
          color: var(--ink);
          line-height: 1.7;
          max-width: 700px;
          font-family: 'DM Sans', sans-serif;
        }
        
        .affiliate-strip-text strong {
          font-weight: 600;
          color: var(--rose);
        }

        /* === READING PATH === */
        .reading-path-section {
          max-width: 1200px;
          margin: 3rem auto;
          padding: 2.5rem;
          background: linear-gradient(135deg, #f5f1ed 0%, rgba(200, 71, 58, 0.05) 100%);
          border: 2px solid var(--black);
          border-radius: 2px;
        }
        
        .reading-path h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.4rem;
          color: var(--ink);
          margin: 0 0 1.5rem 0;
        }
        
        .reading-path ol {
          list-style: decimal;
          padding-left: 2rem;
          margin: 0;
        }
        
        .reading-path li {
          margin-bottom: 1rem;
          font-size: 1rem;
          color: var(--ink);
          line-height: 1.6;
          font-family: 'DM Sans', sans-serif;
        }
        
        .reading-path li a {
          color: var(--rose);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border-bottom: 2px solid var(--rose);
          padding-bottom: 0.2rem;
        }
        
        .reading-path li a:hover {
          color: var(--black);
          background: rgba(200, 71, 58, 0.1);
          padding: 0.2rem 0.4rem;
          border-bottom-color: var(--black);
        }
        
        .reading-path li span {
          color: var(--muted);
          font-size: 0.9rem;
          margin-left: 0.5rem;
          font-family: 'DM Sans', sans-serif;
        }
        
        @media (max-width: 768px) {
          .reading-path-section {
            padding: 1.5rem;
            margin: 2rem auto;
          }
          
          .reading-path h3 {
            font-size: 1.2rem;
          }
          
          .reading-path li {
            font-size: 0.95rem;
          }
        }
        
        /* === BLOG GRID SECTION === */
        .blog-grid-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2.5rem;
        }
        
        .blog-section-bar {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-top: 3px solid var(--black);
          padding-top: 1.2rem;
          margin-bottom: 3.5rem;
        }
        
        .blog-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.08em;
          font-weight: 700;
          color: var(--ink);
        }
        
        .post-count {
          font-size: 0.65rem;
          color: var(--muted);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
        }
        
        /* === BLOG GRID === */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        
        .blog-card {
          display: flex;
          flex-direction: column;
          border-top: 2px solid var(--rule);
          padding-top: 1.8rem;
          text-decoration: none;
          color: var(--ink);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          height: 100%;
        }
        
        .blog-card:hover {
          border-top-color: var(--rose);
        }
        
        .blog-card-icon {
          font-size: 2.5rem;
          margin-bottom: 0.8rem;
          opacity: 0.8;
        }
        
        .blog-card-cat {
          font-size: 0.59rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 0.8rem;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .cat-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          display: inline-block;
        }
        
        .blog-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.3rem;
          line-height: 1.35;
          color: var(--ink);
          margin-bottom: 0.9rem;
          flex-grow: 1;
        }
        
        .blog-card-excerpt {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 1.3rem;
          font-family: 'DM Sans', sans-serif;
        }
        
        .blog-card-meta {
          font-size: 0.63rem;
          color: var(--muted);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
        }
        
        .meta-divider {
          width: 1px;
          height: 12px;
          background: var(--rule);
        }
        
        .product-count {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(200, 71, 58, 0.08);
          padding: 0.3rem 0.7rem;
          border-radius: 2px;
          font-weight: 600;
          color: var(--rose);
        }
        
        /* === RESPONSIVE === */
        @media (max-width: 1024px) {
          .blog-hero {
            grid-template-columns: 1fr;
          }
          .blog-hero-side {
            border-top: 2px solid var(--black);
            border-right: none;
            padding: 3rem;
          }
          .blog-hero-main {
            border-right: none;
            padding: 3.5rem;
          }
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .blog-hero {
            min-height: auto;
          }
          .blog-hero-main {
            padding: 2.5rem 1.5rem;
          }
          .blog-hero-side {
            padding: 2.5rem 1.5rem;
          }
          .blog-featured-title {
            font-size: clamp(1.5rem, 5vw, 2.2rem);
          }
          .featured-cta-group {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .blog-featured-cta {
            width: 100%;
            justify-content: center;
          }
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .affiliate-strip {
            flex-direction: column;
            padding: 1.5rem;
            gap: 1rem;
          }
          .blog-grid-section {
            padding: 3rem 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .blog-section-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>

      {/* === FEATURED HERO === */}
      <section className="blog-hero">
        <div className="blog-hero-main">
          <p className="blog-eyebrow" style={{ color: catColors[featured.category] }}>
            <span className="eyebrow-badge">{featured.tag}</span>
            {featured.category}
          </p>
          <h1 className="blog-featured-title">{featured.title}</h1>
          <p className="blog-featured-excerpt">{featured.excerpt}</p>
          <div className="featured-cta-group">
            <a href={`/blog/${featured.slug}`} className="blog-featured-cta">
              <span>Read the full guide</span>
              <span className="cta-arrow">→</span>
            </a>
            <span className="featured-meta">{featured.date} · {featured.readTime} read</span>
          </div>
        </div>
        
        <div className="blog-hero-side">
          <h2>Your Skincare Journey</h2>
          <p>Three guided steps to transform your routine: from choosing the perfect sunscreen to building a complete beauty regimen that fits your budget and lifestyle.</p>
          <div className="sidebar-cta">
            <span className="sidebar-cta-icon">✨</span>
            <p className="sidebar-cta-text">Start with sunscreen. Master the routine. Build your glow-up.</p>
          </div>
        </div>
      </section>

      {/* === AFFILIATE DISCLOSURE === */}
      <div className="affiliate-strip">
        <span className="affiliate-icon">◆</span>
        <p className="affiliate-strip-text">
          <strong>Affiliate links ahead.</strong> Mirha & Co. participates in the Amazon Associates Program. 
          Some links earn us a small commission — at no extra cost to you. 
          Every product featured is based on research and verified customer reviews.
        </p>
      </div>

      {/* === READING PATH === */}
      <section className="reading-path-section">
        <div className="reading-path">
          <h3>✨ New to skincare? Start here:</h3>
          <ol>
            <li>
              <a href="/blog/best-sunscreens-india-2026">Pick your sunscreen</a>
              <span>(5 min read)</span>
            </li>
            <li>
              <a href="/blog/skincare-routine-complete-india">Learn the routine</a>
              <span>(12 min read)</span>
            </li>
            <li>
              <a href="/blog/budget-beauty-routine-2000">Build your routine</a>
              <span>(9 min read)</span>
            </li>
          </ol>
        </div>
      </section>

      {/* === POST GRID === */}
      <section className="blog-grid-section">
        <div className="blog-section-bar">
          <h2 className="blog-section-title">All Posts</h2>
          <span className="post-count">{posts.length} articles</span>
        </div>
        
        <div className="blog-grid">
          {posts.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-icon">{post.thumbnail}</div>
              
              <p className="blog-card-cat" style={{ color: catColors[post.category] }}>
                <span className="cat-dot" style={{ backgroundColor: catColors[post.category] }} />
                {post.category}
              </p>
              
              <h3 className="blog-card-title">{post.title}</h3>
              
              <p className="blog-card-excerpt">{post.excerpt}</p>
              
              <div className="blog-card-meta">
                <span>{post.date}</span>
                <div className="meta-divider" />
                <span>{post.readTime}</span>
                <div className="meta-divider" />
                <span className="product-count">
                  📌 {post.productCount} picks
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}

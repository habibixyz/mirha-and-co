import type { Metadata } from "next";
import { POSTS, getRelevantImage } from "@/lib/posts";
import MoleculeWrapper from "@/components/MoleculeWrapper";

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

export default function BlogIndex() {
  return (
    <main>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .journal-page { 
          background-color: #faf8f5; 
          background-image: 
            radial-gradient(circle at 15% 5%, rgba(200,71,58,0.04) 0%, transparent 45%),
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
          background: linear-gradient(135deg, #111111 0%, #a27b5c 50%, #c8473a 100%);
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
          gap: 2rem;
          background: transparent;
          border: none;
          margin-top: 2.5rem;
        }
        .path-card {
          background: #fff;
          padding: 2.2rem;
          text-decoration: none;
          color: #111;
          min-height: 230px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 16px;
          border: 1px solid #e8ded6;
        }
        .path-card:hover { 
          background: #fffdfb;
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(162, 123, 92, 0.05);
          border-color: rgba(162, 123, 92, 0.3);
        }
        .path-label {
          color: #a27b5c;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          margin: 0 0 1.2rem;
          font-weight: 700;
        }
        .path-card h3 {
          font-family: var(--font-playfair), serif;
          font-size: 1.45rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 0.7rem;
        }
        .path-card p {
          color: #6f6963;
          line-height: 1.65;
          font-size: 0.88rem;
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
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.01);
        }
        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px rgba(162, 123, 92, 0.06);
          border-color: rgba(162, 123, 92, 0.3);
        }
        .featured-main { padding: 3rem; }
        .featured-main h2 {
          font-family: var(--font-playfair), serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          margin: 0 0 1rem;
        }
        .featured-main p {
          color: #6f6963;
          line-height: 1.75;
          max-width: 620px;
          margin: 0 0 2rem;
        }
        .featured-side {
          background: #1c1917;
          color: #fafaf9;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .featured-side p {
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          margin: 0;
          font-size: 0.9rem;
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
        @media (max-width: 980px) {
          .journal-hero, .featured-card { grid-template-columns: 1fr; }
          .journal-hero-copy { padding: 4rem 2rem; }
          .journal-hero-visual { min-height: 420px; border-left: none; border-bottom: 1px solid #ded7cf; }
          .trust-strip, .path-grid, .article-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .journal-hero-copy { padding: 3rem 1.4rem; }
          .journal-hero-visual { min-height: 380px; padding: 1.5rem; }
          .trust-strip, .path-grid, .article-grid { grid-template-columns: 1fr; gap: 1rem; }
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
                <span style={{ color: "#a27b5c", marginTop: "1.2rem", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>Open</span>
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
              <p style={{ marginTop: "1rem" }}>
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
            <span style={{ color: "#9b8e83", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>
              {posts.length} articles
            </span>
          </div>

          <div className="article-grid">
            {posts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="article-card">
                <div className="article-icon">
                  <img src={post.imageSrc} alt={post.category} />
                </div>
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

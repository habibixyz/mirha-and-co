import type { Metadata } from "next";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "Mirha Skincare Portal: AI Analysis, Trackers & Routines",
  description: "Access the Mirha & Co. consumer dashboard. Scan your skin with AI, log daily progress in the skin journal, and run formulation compatibility checks.",
  openGraph: {
    title: "Mirha Skincare Portal: AI Analysis, Trackers & Routines",
    description: "Access the Mirha & Co. consumer dashboard. Scan your skin with AI, log daily progress in the skin journal, and run formulation compatibility checks.",
  },
};

export default function ConsumerDashboardBlogPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <style>{`
        .post-hdr { background: var(--black); color: #fff; padding: 5rem 2.5rem 4rem; text-align: center; }
        .post-hdr-inner { max-width: 800px; margin: 0 auto; }
        .post-badge { display: inline-block; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--rose); margin-bottom: 1.2rem; font-family: monospace; font-weight: 700; }
        .post-headline { font-family: 'DM Serif Display', serif; font-size: clamp(2.2rem, 6vw, 3.4rem); font-weight: 400; line-height: 1.1; margin: 0 0 1.5rem; letter-spacing: -0.01em; }
        .post-stand { font-size: 1.15rem; color: rgba(255,255,255,0.7); line-height: 1.8; margin-bottom: 2rem; font-family: 'DM Serif Display', serif; font-style: italic; }
        .post-meta { display: flex; align-items: center; justify-content: center; gap: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.12); font-size: 0.68rem; color: rgba(255,255,255,0.35); letter-spacing: 0.12em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; flex-wrap: wrap; }
        .post-body { max-width: 780px; margin: 0 auto; padding: 4rem 2.5rem 6rem; }
        .post-body p { font-size: 1rem; line-height: 1.9; color: #2c2826; margin-bottom: 1.6rem; font-family: 'DM Sans', sans-serif; }
        .post-body h2 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.05em; color: var(--black); margin: 3.5rem 0 1rem; padding-top: 3rem; border-top: 2px solid var(--rule); }
        .post-body h3 { font-family: 'DM Serif Display', serif; font-size: 1.3rem; font-style: italic; margin: 2rem 0 0.7rem; color: var(--ink); }
        .post-body ul { margin-bottom: 2rem; padding-left: 1.5rem; }
        .post-body li { font-size: 1rem; line-height: 1.9; color: #2c2826; font-family: 'DM Sans', sans-serif; margin-bottom: 0.5rem; }
        .highlight-box { background: var(--sand); border-left: 4px solid #7c6b4a; padding: 1.5rem 2rem; margin: 2rem 0; }
        .highlight-box p { margin-bottom: 0; font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.1rem; color: var(--ink); line-height: 1.6; }
        .nav-back { display: block; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; margin: 1.5rem 2.5rem; font-family: 'DM Sans', sans-serif; }
        .nav-back:hover { color: var(--rose); }
        
        .code-container { background: #0d0d0d; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; font-family: monospace; font-size: 0.85rem; color: #7ee787; overflow-x: auto; line-height: 1.5; border: 1px solid rgba(255,255,255,0.1); }
        .code-keyword { color: #ff7b72; }
        .code-string { color: #a5d6ff; }
        .code-comment { color: #8b949e; }
        .code-function { color: #d2a8ff; }
        
        .post-body .cta-box {
          background: var(--sand);
          border-radius: 20px;
          padding: 3rem 2.5rem;
          margin: 4.5rem 0;
          text-align: center;
          border: 1px solid rgba(162, 123, 92, 0.15);
          box-shadow: 0 10px 30px rgba(162, 123, 92, 0.03);
        }
        .post-body .cta-box .cta-title {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          font-weight: 400;
          margin: 0 0 1rem;
          color: var(--black) !important;
          line-height: 1.3;
        }
        .post-body .cta-box .cta-desc {
          font-size: 1rem;
          color: var(--muted) !important;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 580px;
          margin-left: auto;
          margin-right: auto;
        }
        .post-body .cta-box .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--black);
          color: var(--white);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 1rem 2.2rem;
          border-radius: 12px;
          text-decoration: none;
          transition: transform 0.2s, background-color 0.2s, color 0.2s;
          border: none;
        }
        .post-body .cta-box .cta-btn:hover {
          background: var(--rose);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Dark Mode overrides */
        html.dark main {
          background: #0c0a09 !important;
          color: #f5f2ed !important;
        }
        html.dark .post-hdr {
          background: #050404 !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        html.dark .post-stand {
          color: rgba(245, 242, 237, 0.8) !important;
        }
        html.dark .post-meta {
          color: rgba(245, 242, 237, 0.5) !important;
          border-top-color: rgba(255, 255, 255, 0.08) !important;
        }
        html.dark .post-headline,
        html.dark .post-body h2,
        html.dark .post-body h3,
        html.dark .post-body strong {
          color: #f5f2ed !important;
        }
        html.dark .post-body h2 {
          border-top-color: rgba(255, 255, 255, 0.08) !important;
        }
        html.dark .post-body p,
        html.dark .post-body li {
          color: #c4beb8 !important;
        }
        html.dark .nav-back {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        html.dark .nav-back:hover {
          color: var(--rose) !important;
        }
        html.dark .highlight-box {
          background: #161514 !important;
          border-left-color: var(--rose) !important;
        }
        html.dark .highlight-box p {
          color: #f5f2ed !important;
        }
        html.dark .code-container {
          background: #050404 !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
        }
        html.dark .post-body .cta-box {
          background: #161514;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        html.dark .post-body .cta-box .cta-title {
          color: #f5f2ed !important;
        }
        html.dark .post-body .cta-box .cta-desc {
          color: rgba(245, 242, 237, 0.7) !important;
        }
        html.dark .post-body .cta-box .cta-btn {
          background: #fcfbf9;
          color: #0a0a0a;
        }
        html.dark .post-body .cta-box .cta-btn:hover {
          background: var(--rose);
          color: #fff;
        }
        
        @media (max-width: 768px) { .post-hdr { padding: 3.5rem 1.5rem 2.5rem; } .post-body { padding: 2.5rem 1.5rem 4rem; } .nav-back { margin: 1rem 1.5rem; } }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Inside the Mirha & Co. Portal: AI Skin Analysis, Active Trackers, and Custom Routines",
            "image": [
              "https://mirha.co/blog-thumbs/blog_consumer_dashboard.jpg"
            ],
            "datePublished": "2026-08-04T09:00:00+08:00",
            "dateModified": "2026-08-04T09:00:00+08:00",
            "author": [{
              "@type": "Organization",
              "name": "Mirha & Co.",
              "url": "https://mirha.co/"
            }]
          })
        }}
      />

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">SaaS · Product Spotlight</span>
          <h1 className="post-headline">
            Inside the Mirha & Co. Portal: AI Skin Analysis, Active Trackers, and Custom Routines
          </h1>
          <p className="post-stand">
            skincare is a science, not a shopping spree. Take a look inside our consumer companion dashboard designed to track formulation compatibility and score your skin health in real-time.
          </p>
          <div className="post-meta">
            <span>August 2026</span>
            <span>5 min read</span>
            <span>Product Feature</span>
            <span>Consumer Portal</span>
          </div>
        </div>
      </header>

      <article className="post-body">
        <p>
          Getting consistent, healthy skin shouldn't be about buying whatever product is trending on social media. It requires tracking how your face responds to active ingredients, checking for formulation compatibility clashes, and adapting your routine as the seasons change.
        </p>
        <p>
          To make this scientific approach accessible, we created the **Mirha & Co. Consumer Companion Dashboard**—your central panel for formulation verification, AI-driven diagnostics, and daily tracking.
        </p>

        <h2>The Main Console: Core Features</h2>
        <p>
          When you sign in to your Mirha & Co. account, you are greeted by an intuitive sidebar that provides access to our core diagnostic utilities:
        </p>

        <h3>1. Overview & My Routines</h3>
        <p>
          A single dashboard space to review your morning and evening skincare regimens. Your routine is dynamically adjusted based on local weather telemetry (humidity, temperature) and water hardness PPM levels mapped to your city.
        </p>

        <h3>2. Skin Journal</h3>
        <p>
          Log your skin's daily progress. Log breakouts, redness, dryness, and barrier changes to isolate exactly which products are moving the needle and which ones are triggering irritation.
        </p>

        <h3>3. AI Skin Analyst</h3>
        <p>
          Perform automated facial analysis using our specialized computer-vision scanner. Receive regular, objective scores on hydration levels, fine lines, skin sensitivity, and barrier strength.
        </p>

        <h3>4. Search Guide & Curated Catalog</h3>
        <p>
          Browse our formulation list with transparent product annotations. See pricing, active ingredients, and suitability summaries without marketing clutter.
        </p>

        <h3>5. Active Ingredient Conflict Checker</h3>
        <p>
          The ultimate safeguard for your skin barrier. Paste the ingredient listings of any two serums or moisturizers, and our engine will cross-check for chemical compatibility (e.g. flagging pH crashes, or warnings against stacking multiple peeling acids like Glycolic and Salicylic acid in the same routine).
        </p>

        <h2>Unlocking Premium: Why Upgrade to Pro?</h2>
        <p>
          While the basic dashboard provides standard routine management and access to our active ingredient checker, upgrading to **Mirha Pro** unlocks the full telemetry engine:
        </p>
        <ul>
          <li>
            <strong>Unlimited Skin Logs:</strong> Keep a complete, historical journal of your skin barrier progress over months rather than being limited to a 7-day window.
          </li>
          <li>
            <strong>AI Face Scans:</strong> Access detailed face scans and objective skin scores.
          </li>
          <li>
            <strong>Increased AI Consultations:</strong> Grow your daily skin consultations from 3 sessions to 20 sessions for deeper diagnostics.
          </li>
          <li>
            <strong>Advanced Ingredient Diagnostics:</strong> Deep-dives into raw ingredient listings to identify potential allergen triggers.
          </li>
        </ul>

        <div className="highlight-box">
          <p>
            <strong>Pro Tiers:</strong> You can select the monthly Pro subscription or the Annual Pro Plan (saving over 25%) directly from your **Subscription** tab, handled securely using Razorpay.
          </p>
        </div>

        <div className="cta-box">
          <h3 className="cta-title">Start Your Skincare Companion Today</h3>
          <p className="cta-desc">
            Sign in to start tracking your skin journal and run your first formulation conflict check.
          </p>
          <a href="/login" className="cta-btn">
            Open the Portal
          </a>
        </div>

        <BlogFooterTools />
      </article>
    </main>
  );
}

import Link from "next/link";

export default function BlogFooterTools() {
  return (
    <aside className="bft-wrap">
      <style>{`
        .bft-wrap {
          margin-top: 4rem;
          background: #0c0a09;
          border-radius: 16px;
          padding: 2rem;
          font-family: var(--font-dm-sans), sans-serif;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        }

        /* ── Featured Promo Ad Banner ──────────────────────────── */
        .bft-ad-card {
          background: linear-gradient(135deg, #24161c 0%, #0f0c0e 100%);
          border: 1px solid rgba(252, 39, 121, 0.4);
          border-radius: 12px;
          padding: 1.6rem 1.8rem;
          margin-bottom: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          box-shadow: 0 8px 24px rgba(252, 39, 121, 0.12);
        }

        .bft-ad-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(252, 39, 121, 0.14);
          border: 1px solid rgba(252, 39, 121, 0.35);
          color: #fc2779;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 0.5rem;
        }

        .bft-ad-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #fc2779;
          display: inline-block;
        }

        .bft-ad-title {
          font-family: var(--font-playfair), serif;
          font-size: 1.3rem;
          color: #ffffff !important;
          margin: 0 0 0.4rem;
          font-weight: 600;
          line-height: 1.25;
        }

        .bft-ad-desc {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.7) !important;
          margin: 0;
          line-height: 1.6;
          max-width: 520px;
        }

        .bft-ad-btn {
          background: #fc2779;
          color: #ffffff;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(252, 39, 121, 0.4);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .bft-ad-btn:hover {
          background: #ff4d94;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(252, 39, 121, 0.6);
        }

        .bft-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          gap: 1rem;
          flex-wrap: wrap;
        }

        .bft-label {
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #fc2779;
          font-weight: 700;
        }

        .bft-tagline {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.45);
          font-style: italic;
        }

        .bft-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
          overflow: hidden;
        }

        .bft-tool {
          background: #0c0a09;
          padding: 1.1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          text-decoration: none;
          transition: background 0.2s ease;
          position: relative;
        }

        .bft-tool:hover {
          background: #161210;
        }

        .bft-tool-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          font-weight: 600;
        }

        .bft-tool-name {
          font-family: var(--font-playfair), serif;
          font-size: 0.98rem;
          color: #ffffff;
          font-weight: 400;
          line-height: 1.25;
        }

        .bft-tool-cta {
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fc2779;
          margin-top: 0.4rem;
          transition: letter-spacing 0.2s ease;
        }

        .bft-tool:hover .bft-tool-cta {
          letter-spacing: 0.18em;
        }

        @media (max-width: 900px) {
          .bft-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .bft-wrap {
            padding: 1.25rem 1.25rem;
            margin-top: 3rem;
          }
          .bft-ad-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.25rem;
          }
          .bft-ad-btn {
            width: 100%;
            text-align: center;
          }
          .bft-grid {
            grid-template-columns: 1fr;
          }
          .bft-tagline { display: none; }
        }
      `}</style>

      {/* ── Featured Free AI Skin Scan Ad Banner ──────────────────────────── */}
      <div className="bft-ad-card">
        <div>
          <div className="bft-ad-badge">
            <span className="bft-ad-dot" />
            1 Free Scan / Day • No Credit Card Required
          </div>
          <h4 className="bft-ad-title">
            Test Your Skin Barrier &amp; Acne Score Free
          </h4>
          <p className="bft-ad-desc">
            Upload 1 selfie to analyze moisture barrier health, active breakouts, redness sensitivity, and sebum balance in seconds with Mirha AI.
          </p>
        </div>
        <Link href="/tools/analysis" className="bft-ad-btn">
          Try Free Scan →
        </Link>
      </div>

      <div className="bft-top">
        <span className="bft-label">Interactive Tools</span>
        <span className="bft-tagline">From reading to doing — test your own skin.</span>
      </div>

      <div className="bft-grid">
        <Link href="/tools/analysis" className="bft-tool" style={{ background: "#150e12" }}>
          <span className="bft-tool-eyebrow" style={{ color: "#fc2779" }}>1 Scan / Day</span>
          <span className="bft-tool-name">AI Skin Scanner</span>
          <span className="bft-tool-cta">Try free scan →</span>
        </Link>

        <Link href="/tools/hard-water" className="bft-tool">
          <span className="bft-tool-eyebrow">Free Calculator</span>
          <span className="bft-tool-name">Hard Water Test</span>
          <span className="bft-tool-cta">Check your city →</span>
        </Link>

        <Link href="/tools/dupes" className="bft-tool">
          <span className="bft-tool-eyebrow">Savings Tool</span>
          <span className="bft-tool-name">Dupe Finder</span>
          <span className="bft-tool-cta">Find dupes →</span>
        </Link>

        <Link href="/tools/ingredients" className="bft-tool">
          <span className="bft-tool-eyebrow">Label Science</span>
          <span className="bft-tool-name">Ingredient Parser</span>
          <span className="bft-tool-cta">Analyse label →</span>
        </Link>
      </div>
    </aside>
  );
}

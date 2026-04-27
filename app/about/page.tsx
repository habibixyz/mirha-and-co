export const metadata = {
  title: "About | Mirha & Co.",
  description:
    "Mirha & Co. is an independent beauty guide for Indian consumers, built around ingredient context, routine clarity, honest disclosures, and practical product recommendations.",
};

export default function AboutPage() {
  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .about-page {
          --black: #090909;
          --white: #f4f1ed;
          --rose: #e05c3a;
          --paper: #faf8f5;
          --ink: #161311;
          --muted: #746b64;
          --rule: #ded7cf;
          background: var(--paper);
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
        }

        .hero {
          background: var(--black);
          color: var(--white);
          padding: 8rem 2.5rem 6rem;
        }

        .hero-inner {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 5rem;
          align-items: end;
        }

        .eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 1.4rem;
          font-weight: 600;
        }

        .hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 9vw, 9rem);
          line-height: 0.9;
          letter-spacing: 0.03em;
          font-weight: 400;
        }

        .hero h1 span {
          color: var(--rose);
          display: block;
        }

        .hero-copy {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.25rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.58);
          margin-bottom: 2rem;
        }

        .truth-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .truth-item {
          padding: 1.4rem 1.2rem 0 0;
          border-right: 1px solid rgba(255,255,255,0.1);
        }

        .truth-item:last-child { border-right: none; }

        .truth-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.6rem;
          color: var(--rose);
          line-height: 1;
        }

        .truth-label {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          line-height: 1.5;
        }

        .strip {
          background: var(--rose);
          color: #fff;
          padding: 0.95rem 2rem;
          text-align: center;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .section {
          padding: 7rem 2.5rem;
        }

        .section.dark {
          background: var(--black);
          color: var(--white);
        }

        .inner {
          max-width: 1120px;
          margin: 0 auto;
        }

        .two-col {
          display: grid;
          grid-template-columns: 0.75fr 1.25fr;
          gap: 5rem;
          align-items: start;
        }

        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 6vw, 5.2rem);
          line-height: 0.95;
          letter-spacing: 0.03em;
          font-weight: 400;
        }

        .section-title span {
          color: var(--rose);
        }

        .body-copy p {
          font-size: 1rem;
          line-height: 1.9;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }

        .dark .body-copy p {
          color: rgba(255,255,255,0.52);
        }

        .body-copy strong {
          color: var(--ink);
          font-weight: 600;
        }

        .dark .body-copy strong {
          color: var(--white);
        }

        .note-box {
          background: #fff;
          border: 1px solid var(--rule);
          padding: 1.4rem;
          margin-bottom: 2rem;
        }

        .note-box p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.75;
          color: var(--muted);
        }

        .pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .pillar {
          padding: 2.4rem;
          border-right: 1px solid rgba(255,255,255,0.1);
        }

        .pillar:last-child { border-right: none; }

        .num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4rem;
          color: rgba(255,255,255,0.08);
          line-height: 1;
          margin-bottom: -0.4rem;
        }

        .pillar h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.35rem;
          font-weight: 400;
          margin-bottom: 1rem;
        }

        .pillar p {
          color: rgba(255,255,255,0.48);
          line-height: 1.75;
          font-size: 0.88rem;
        }

        .method-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--ink);
        }

        .method {
          padding: 2.2rem;
          border-right: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
        }

        .method:nth-child(2n) { border-right: none; }
        .method:nth-child(3),
        .method:nth-child(4) { border-bottom: none; }

        .method small {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: var(--rose);
          opacity: 0.55;
        }

        .method h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          font-weight: 400;
          margin: 0.6rem 0;
        }

        .method p {
          color: var(--muted);
          line-height: 1.75;
          font-size: 0.88rem;
        }

        .honesty-list {
          display: grid;
          gap: 1px;
          background: var(--rule);
          border: 1px solid var(--rule);
        }

        .honesty-row {
          background: #fff;
          display: grid;
          grid-template-columns: 0.45fr 1fr;
          gap: 2rem;
          padding: 1.6rem;
        }

        .honesty-row h3 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
          font-size: 1.25rem;
        }

        .honesty-row p {
          color: var(--muted);
          line-height: 1.75;
          font-size: 0.9rem;
        }

        .name-section {
          background: var(--rose);
          color: #fff;
          text-align: center;
          padding: 7rem 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .name-section h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 11vw, 9rem);
          letter-spacing: 0.05em;
          line-height: 0.9;
          font-weight: 400;
          margin-bottom: 1.5rem;
        }

        .name-section p {
          max-width: 620px;
          margin: 0 auto;
          color: rgba(255,255,255,0.78);
          line-height: 1.8;
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.15rem;
        }

        .cta {
          padding: 6rem 2.5rem;
          background: var(--paper);
        }

        .cta-box {
          max-width: 1120px;
          margin: 0 auto;
          border: 1px solid var(--rule);
          background: #fff;
          padding: 2.5rem;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2rem;
          align-items: center;
        }

        .cta-box h2 {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
          font-size: clamp(1.8rem, 4vw, 2.7rem);
          margin-bottom: 0.6rem;
        }

        .cta-box p {
          color: var(--muted);
          line-height: 1.7;
          max-width: 620px;
        }

        .btn-row {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          padding: 0.95rem 1.4rem;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          white-space: nowrap;
        }

        .btn.primary {
          background: var(--black);
          color: #fff;
        }

        .btn.secondary {
          border: 1px solid var(--rule);
          color: var(--ink);
        }

        .contact {
          background: #fff;
          border-top: 1px solid var(--rule);
          padding: 3rem 2.5rem;
          text-align: center;
        }

        .contact p {
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 0.6rem;
        }

        .contact a {
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid var(--rule);
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
        }

        @media (max-width: 900px) {
          .hero-inner,
          .two-col,
          .cta-box {
            grid-template-columns: 1fr;
          }

          .hero {
            padding: 5rem 1.5rem 4rem;
          }

          .section,
          .cta,
          .name-section {
            padding: 5rem 1.5rem;
          }

          .pillars,
          .method-grid {
            grid-template-columns: 1fr;
          }

          .pillar,
          .method {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }

          .method {
            border-bottom: 1px solid var(--rule);
          }

          .method:nth-child(3) { border-bottom: 1px solid var(--rule); }
          .method:last-child { border-bottom: none; }

          .honesty-row {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }

          .truth-grid {
            grid-template-columns: 1fr;
          }

          .truth-item {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
        }
      `}</style>

      <div className="about-page">
        <section className="hero">
          <div className="hero-inner">
            <div>
              <p className="eyebrow">About Mirha & Co.</p>
              <h1>
                No hype.
                <br />
                No mystery.
                <span>Just context.</span>
              </h1>
            </div>

            <div>
              <p className="hero-copy">
                Mirha & Co. is an independent beauty guide built to help Indian consumers make better skincare, hair care, wellness, and beauty decisions.
              </p>

              <div className="truth-grid">
                <div className="truth-item">
                  <div className="truth-value">Clear</div>
                  <div className="truth-label">Ingredient context</div>
                </div>
                <div className="truth-item">
                  <div className="truth-value">India</div>
                  <div className="truth-label">Climate and budget aware</div>
                </div>
                <div className="truth-item">
                  <div className="truth-value">Open</div>
                  <div className="truth-label">Affiliate disclosure</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="strip">
          Independent guide / affiliate links disclosed / not medical advice
        </div>

        <section className="section">
          <div className="inner two-col">
            <div>
              <p className="eyebrow">Why this exists</p>
              <h2 className="section-title">
                Beauty is noisy.
                <br />
                <span>Buying should not be.</span>
              </h2>
            </div>

            <div className="body-copy">
              <div className="note-box">
                <p>
                  Mirha & Co. is not a dermatology clinic, and it does not replace medical advice. It is a practical research and shopping guide for people who want less confusion before buying.
                </p>
              </div>

              <p>
                The Indian beauty market is crowded. Every week there is a new serum, sunscreen, supplement, or routine promising better skin. Some products are genuinely useful. Some are over-marketed. Many are simply wrong for the person buying them.
              </p>

              <p>
                Mirha & Co. exists to slow that decision down. We look at the product type, ingredient list, use case, price, reviews, and suitability for Indian conditions before recommending anything.
              </p>

              <p>
                We do not claim that every product has been personally tested. When something is based on research, product information, public reviews, or ingredient analysis, we treat it as exactly that. <strong>No fake testing stories. No fake authority.</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="section dark">
          <div className="inner">
            <div style={{ marginBottom: "3rem" }}>
              <p className="eyebrow">Our filter</p>
              <h2 className="section-title">
                What we care about
                <br />
                <span>before we recommend.</span>
              </h2>
            </div>

            <div className="pillars">
              <div className="pillar">
                <div className="num">01</div>
                <h3>Use case first</h3>
                <p>
                  A good product for oily skin may be wrong for dry skin. A strong active may be wrong for beginners. We judge products by who they are actually useful for.
                </p>
              </div>

              <div className="pillar">
                <div className="num">02</div>
                <h3>Ingredient context</h3>
                <p>
                  We look at known actives, likely benefits, irritation risk, texture, and routine compatibility. Claims matter less than what the formula is trying to do.
                </p>
              </div>

              <div className="pillar">
                <div className="num">03</div>
                <h3>Indian reality</h3>
                <p>
                  Humidity, heat, pigmentation, sunscreen compliance, hard water, pricing, and availability matter. Advice should fit the place where it is used.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="inner">
            <div style={{ marginBottom: "3rem" }}>
              <p className="eyebrow">How we work</p>
              <h2 className="section-title">
                The method is simple.
                <br />
                <span>Not perfect. Honest.</span>
              </h2>
            </div>

            <div className="method-grid">
              <div className="method">
                <small>01</small>
                <h3>Product and ingredient review</h3>
                <p>
                  We read product claims, ingredient lists, textures, usage directions, and category fit before placing a product into a guide or routine.
                </p>
              </div>

              <div className="method">
                <small>02</small>
                <h3>Suitability mapping</h3>
                <p>
                  Products are grouped by skin type, concern, budget, routine step, and possible watch-outs so users can make faster decisions.
                </p>
              </div>

              <div className="method">
                <small>03</small>
                <h3>Review and availability checks</h3>
                <p>
                  Public buyer feedback, availability, pricing, and value are considered. We do not treat ratings as proof, but they help reveal patterns.
                </p>
              </div>

              <div className="method">
                <small>04</small>
                <h3>Clear disclosure</h3>
                <p>
                  Some links are affiliate links. If you buy through them, Mirha & Co. may earn a small commission at no extra cost to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="inner two-col">
            <div>
              <p className="eyebrow">No pretending</p>
              <h2 className="section-title">
                What we do
                <br />
                <span>and do not claim.</span>
              </h2>
            </div>

            <div className="honesty-list">
              <div className="honesty-row">
                <h3>We are not dermatologists.</h3>
                <p>
                  Serious acne, sudden pigmentation, burning, peeling, infection, eczema, rosacea, or medical concerns should be handled by a qualified dermatologist.
                </p>
              </div>

              <div className="honesty-row">
                <h3>We do not fake personal testing.</h3>
                <p>
                  If a recommendation is based on research, ingredients, product data, and public reviews, we will not pretend it came from months of personal use.
                </p>
              </div>

              <div className="honesty-row">
                <h3>We use affiliate links.</h3>
                <p>
                  Affiliate income helps support the site. It does not mean every product is perfect, and it does not remove the need for clear pros, cons, and watch-outs.
                </p>
              </div>

              <div className="honesty-row">
                <h3>We change our mind when needed.</h3>
                <p>
                  Product formulas, prices, availability, and user feedback change. Recommendations should improve over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="name-section">
          <h2>Mirha & Co.</h2>
          <p>
            Mirha is the name at the heart of this project. The standard is simple: would we feel comfortable recommending this to someone we care about?
          </p>
        </section>

        <section className="cta">
          <div className="cta-box">
            <div>
              <h2>Start with your skin concern.</h2>
              <p>
                Use Mirha Search, read the guides, or build a simple routine before buying another product.
              </p>
            </div>

            <div className="btn-row">
              <a href="/search" className="btn primary">Search Mirha</a>
              <a href="/tools/routine" className="btn secondary">Build Routine</a>
              <a href="/blog" className="btn secondary">Read Guides</a>
            </div>
          </div>
        </section>

        <section className="contact">
          <p>For partnerships, corrections, product data updates, or business enquiries:</p>
          <a href="mailto:mirhcobiz@gmail.com">mirhcobiz@gmail.com</a>
        </section>
      </div>
    </main>
  );
}

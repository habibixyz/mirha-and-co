export const metadata = {
  title: "About | Mirha & Co.",
  description: "The story behind Mirha & Co. — a research-driven beauty and wellness guide for Indian women, built with industry knowledge and zero fluff.",
};

export default function AboutPage() {
  return (
    <main>
      <style>{`
        .about-hero {
          background: var(--black);
          padding: 7rem 2.5rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .about-hero::before {
          content: 'MIRHA';
          position: absolute;
          bottom: -3rem;
          right: -2rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20rem;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          pointer-events: none;
        }
        .about-hero-inner {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .about-eyebrow {
          display: inline-block;
          background: var(--rose);
          color: #fff;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 0.3rem 0.8rem;
          margin-bottom: 2rem;
          font-family: 'DM Sans', sans-serif;
        }
        .about-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 9vw, 8rem);
          color: var(--white);
          line-height: 0.95;
          letter-spacing: 0.03em;
          margin-bottom: 2rem;
        }
        .about-headline em {
          color: var(--rose);
          font-style: normal;
        }
        .about-standfirst {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.2rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          max-width: 580px;
        }
        .about-body {
          max-width: 800px;
          margin: 0 auto;
          padding: 5rem 2.5rem;
        }
        .about-body p {
          font-size: 1rem;
          line-height: 1.9;
          color: #2c2826;
          margin-bottom: 1.6rem;
          font-family: 'DM Sans', sans-serif;
        }
        .about-body h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.4rem;
          letter-spacing: 0.04em;
          color: var(--black);
          margin: 4rem 0 1.2rem;
          padding-top: 3rem;
          border-top: 3px solid var(--black);
        }
        .nykaa-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--sand);
          border: 1px solid var(--rule);
          padding: 0.8rem 1.2rem;
          font-size: 0.78rem;
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 2rem;
        }
        .nykaa-badge strong { font-weight: 500; }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 2px solid var(--black);
          margin: 3rem 0;
        }
        .value-item {
          padding: 2rem;
          border-right: 1px solid var(--rule);
        }
        .value-item:last-child { border-right: none; }
        .value-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          color: var(--rose);
          line-height: 1;
          margin-bottom: 0.5rem;
          opacity: 0.5;
        }
        .value-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          color: var(--ink);
          margin-bottom: 0.6rem;
        }
        .value-text {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.65;
          font-family: 'DM Sans', sans-serif;
        }
        .mirha-section {
          background: var(--rose);
          padding: 5rem 2.5rem;
          text-align: center;
        }
        .mirha-initial {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 8rem;
          color: rgba(255,255,255,0.15);
          line-height: 1;
          margin-bottom: -2rem;
        }
        .mirha-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          color: var(--white);
          letter-spacing: 0.04em;
          line-height: 1;
          margin-bottom: 1.5rem;
        }
        .mirha-text {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: rgba(255,255,255,0.75);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .about-cta {
          background: var(--sand);
          padding: 5rem 2.5rem;
          text-align: center;
        }
        .about-cta h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          letter-spacing: 0.04em;
          margin-bottom: 1rem;
        }
        .about-cta p {
          font-size: 0.9rem;
          color: var(--muted);
          margin-bottom: 2rem;
          font-family: 'DM Sans', sans-serif;
        }
        .about-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--black);
          color: var(--white);
          padding: 0.9rem 2rem;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }
        .about-cta-btn:hover { background: var(--rose); }
        @media (max-width: 768px) {
          .about-hero { padding: 4rem 1.5rem 3rem; }
          .about-body { padding: 3rem 1.5rem; }
          .values-grid { grid-template-columns: 1fr; }
          .value-item { border-right: none; border-bottom: 1px solid var(--rule); }
          .value-item:last-child { border-bottom: none; }
          .mirha-section, .about-cta { padding: 3rem 1.5rem; }
        }
      `}</style>

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="about-eyebrow">About Mirha & Co.</span>
          <h1 className="about-headline">
            Built for<br />
            Indian<br />
            <em>Women.</em>
          </h1>
          <p className="about-standfirst">
            A research-driven beauty and wellness guide. No fake reviews.
            No paid opinions. Just honest information — from someone who
            spent years inside the Indian beauty industry.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="about-body">

        <div className="nykaa-badge">
          <span>◆</span>
          <span><strong>Industry background:</strong> Years of experience in beauty retail with Nykaa — understanding how products are made, marketed, and priced in India.</span>
        </div>

        <p>
          Mirha & Co. exists because the Indian beauty market is full of noise.
          Influencers pushing products they've never paid for. "Reviews" written
          by people who received the product as a gift two days ago. Affiliate
          blogs that recommend anything with a commission attached.
        </p>

        <p>
          We built something different. A guide written by someone who has worked
          inside beauty retail — who understands ingredient lists, knows how brands
          price their products, and has seen firsthand what sells because of marketing
          versus what sells because it actually works.
        </p>

        <p>
          Every post on this site is research-based. When we recommend a product,
          we tell you exactly why — the ingredients, the evidence, what
          dermatologists say, and what real customers report after extended use.
          We don't pretend to have personally tested everything. We do the research
          so you don't have to.
        </p>

        <h2>How We Work</h2>

        <p>
          Our recommendations are based on three things: ingredient science,
          dermatologist consensus, and verified long-term customer reviews.
          We cross-reference all three before recommending anything.
        </p>

        <p>
          We use affiliate links — Amazon India Associates. When you buy through
          our links, we earn a small commission at no extra cost to you. This is
          how the site sustains itself. Affiliate links are always disclosed and
          never the reason something gets recommended. That's the product's job.
        </p>

        <div className="values-grid">
          <div className="value-item">
            <div className="value-num">01</div>
            <h3 className="value-title">Industry Knowledge</h3>
            <p className="value-text">
              Built by someone with real experience in Indian beauty retail.
              We know how this industry works — from supply chain to shelf.
            </p>
          </div>
          <div className="value-item">
            <div className="value-num">02</div>
            <h3 className="value-title">Research First</h3>
            <p className="value-text">
              Every recommendation is backed by ingredient science, dermatologist
              guidance, and honest customer data. Never gut feel alone.
            </p>
          </div>
          <div className="value-item">
            <div className="value-num">03</div>
            <h3 className="value-title">India Focused</h3>
            <p className="value-text">
              Indian climate. Indian skin concerns. Indian price points.
              Everything on this site is relevant to where you actually live.
            </p>
          </div>
        </div>

        <h2>Why Mirha</h2>

        <p>
          Mirha is my daughter. This platform is being built in her name —
          as a legacy, as a resource, and as proof that you can build something
          honest in an industry that often isn't. Every post is written with
          the question: would I recommend this to her?
        </p>

        <p>
          If the answer is yes — it's on the site. If the answer is no —
          it isn't, regardless of the commission.
        </p>

      </section>

      {/* MIRHA SECTION */}
      <section className="mirha-section">
        <div className="mirha-initial">M</div>
        <h2 className="mirha-name">MIRHA & CO.</h2>
        <p className="mirha-text">
          "Would I recommend this to my daughter?" — the only filter that matters.
        </p>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Read The Journal</h2>
        <p>Research-backed beauty and wellness for Indian women. Honest, always.</p>
        <a href="/blog" className="about-cta-btn">Go to The Journal →</a>
      </section>

    </main>
  );
}

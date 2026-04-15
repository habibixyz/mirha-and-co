export const metadata = {
  title: "About | Mirha & Co.",
  description:
    "The story behind Mirha & Co. — a research-driven beauty and wellness guide built with industry knowledge, zero fluff, and honest opinions for everyone.",
};

export default function AboutPage() {
  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── RESET / BASE ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── HERO ── */
        .about-hero {
          background: var(--black);
          padding: 9rem 2.5rem 7rem;
          position: relative;
          overflow: hidden;
        }
        .about-hero::after {
          content: 'M';
          position: absolute;
          bottom: -6rem;
          right: -3rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38rem;
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: end;
          position: relative;
          z-index: 1;
        }
        .hero-left {}
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 2.2rem;
        }
        .hero-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 1px;
          background: var(--rose);
        }
        .hero-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4.5rem, 10vw, 9.5rem);
          color: var(--white);
          line-height: 0.92;
          letter-spacing: 0.02em;
        }
        .hero-headline em {
          color: var(--rose);
          font-style: normal;
          display: block;
        }
        .hero-right {
          padding-bottom: 0.5rem;
        }
        .hero-right p {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.25rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.75;
          margin-bottom: 2.5rem;
        }
        .hero-stat-row {
          display: flex;
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .hero-stat {
          flex: 1;
          padding: 1.8rem 0;
          border-right: 1px solid rgba(255,255,255,0.08);
          padding-right: 2rem;
          padding-left: 0;
        }
        .hero-stat:first-child { padding-left: 0; }
        .hero-stat:last-child { border-right: none; padding-right: 0; padding-left: 2rem; }
        .hero-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.8rem;
          color: var(--rose);
          line-height: 1;
          margin-bottom: 0.3rem;
          letter-spacing: 0.02em;
        }
        .hero-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        /* ── MARQUEE STRIP ── */
        .marquee-strip {
          background: var(--rose);
          padding: 0.9rem 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-inner {
          display: inline-block;
          animation: marquee 22s linear infinite;
        }
        .marquee-item {
          display: inline-block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.9);
          margin-right: 3rem;
        }
        .marquee-dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 3rem;
          margin-bottom: 2px;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── ORIGIN SECTION ── */
        .origin-section {
          background: #faf8f5;
          padding: 8rem 2.5rem;
        }
        .origin-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 8rem;
          align-items: start;
        }
        .origin-label {
          position: sticky;
          top: 6rem;
        }
        .section-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .section-tag::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 1px;
          background: var(--rose);
        }
        .origin-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3.2rem;
          color: var(--black);
          line-height: 0.95;
          letter-spacing: 0.02em;
        }
        .origin-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          line-height: 1.9;
          color: #2c2826;
          margin-bottom: 1.8rem;
        }
        .origin-body p:last-child { margin-bottom: 0; }
        .origin-body p strong {
          font-weight: 500;
          color: var(--black);
        }
        .industry-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          border: 1px solid #e0dcd6;
          padding: 1rem 1.4rem;
          margin-bottom: 2.5rem;
          background: #fff;
        }
        .industry-badge-icon {
          width: 32px;
          height: 32px;
          background: var(--rose);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.8rem;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.05em;
        }
        .industry-badge-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          line-height: 1.5;
          color: #2c2826;
        }
        .industry-badge-text strong { font-weight: 500; }

        /* ── PHILOSOPHY SECTION ── */
        .philosophy-section {
          background: var(--black);
          padding: 8rem 2.5rem;
          position: relative;
          overflow: hidden;
        }
        .philosophy-section::before {
          content: 'SKIN';
          position: absolute;
          top: -4rem;
          left: -2rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26rem;
          color: rgba(255,255,255,0.02);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .philosophy-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .philosophy-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 5rem;
          gap: 3rem;
          flex-wrap: wrap;
        }
        .philosophy-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          color: var(--white);
          line-height: 0.95;
          letter-spacing: 0.02em;
        }
        .philosophy-title em {
          color: var(--rose);
          font-style: normal;
        }
        .philosophy-intro {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          max-width: 320px;
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .pillar {
          padding: 3rem 2.5rem;
          border-right: 1px solid rgba(255,255,255,0.08);
          position: relative;
        }
        .pillar:last-child { border-right: none; }
        .pillar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--rose);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .pillar:hover::before { opacity: 1; }
        .pillar-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4.5rem;
          color: rgba(255,255,255,0.06);
          line-height: 1;
          margin-bottom: -1rem;
          letter-spacing: 0.02em;
        }
        .pillar-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.35rem;
          color: var(--white);
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .pillar-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.38);
          line-height: 1.75;
        }

        /* ── HOW WE WORK ── */
        .how-section {
          background: #faf8f5;
          padding: 8rem 2.5rem;
        }
        .how-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .how-header {
          margin-bottom: 5rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 3rem;
          flex-wrap: wrap;
        }
        .how-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          color: var(--black);
          line-height: 0.95;
          letter-spacing: 0.02em;
        }
        .how-sub {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1rem;
          color: #8a8278;
          max-width: 300px;
          line-height: 1.65;
        }
        .steps-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 2px solid var(--black);
        }
        .step {
          padding: 3rem;
          border-bottom: 1px solid #e0dcd6;
          border-right: 1px solid #e0dcd6;
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }
        .step:nth-child(2n) { border-right: none; }
        .step:nth-child(3), .step:nth-child(4) { border-bottom: none; }
        .step-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          color: var(--rose);
          line-height: 1;
          opacity: 0.4;
          flex-shrink: 0;
          width: 2.5rem;
        }
        .step-content {}
        .step-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          color: var(--black);
          margin-bottom: 0.7rem;
        }
        .step-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: #6a635d;
          line-height: 1.75;
        }

        /* ── AFFIL BANNER ── */
        .affil-banner {
          background: var(--black);
          border: 1px solid rgba(255,255,255,0.07);
          margin: 0 2.5rem;
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .affil-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.65;
          max-width: 620px;
        }
        .affil-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 0.4rem;
        }

        /* ── MIRHA SECTION ── */
        .mirha-section {
          background: var(--rose);
          padding: 9rem 2.5rem;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .mirha-section::before {
          content: 'MIRHA';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28vw;
          color: rgba(0,0,0,0.07);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .mirha-inner {
          position: relative;
          z-index: 1;
        }
        .mirha-overline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 2rem;
        }
        .mirha-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 10vw, 9rem);
          color: var(--white);
          letter-spacing: 0.04em;
          line-height: 0.95;
          margin-bottom: 2.5rem;
        }
        .mirha-rule {
          width: 40px;
          height: 2px;
          background: rgba(255,255,255,0.3);
          margin: 0 auto 2rem;
        }
        .mirha-quote {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          color: rgba(255,255,255,0.8);
          max-width: 560px;
          margin: 0 auto 3rem;
          line-height: 1.65;
        }
        .mirha-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.1em;
        }

        /* ── CTA ── */
        .cta-section {
          background: #faf8f5;
          padding: 8rem 2.5rem;
        }
        .cta-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .cta-left {}
        .cta-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .cta-label::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 1px;
          background: var(--rose);
        }
        .cta-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          color: var(--black);
          line-height: 0.95;
          letter-spacing: 0.02em;
          margin-bottom: 1.5rem;
        }
        .cta-headline em {
          color: var(--rose);
          font-style: normal;
        }
        .cta-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #6a635d;
          line-height: 1.8;
          margin-bottom: 2.5rem;
          max-width: 400px;
        }
        .cta-btn-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--black);
          color: var(--white);
          padding: 1rem 2.2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s;
        }
        .cta-btn-primary:hover { background: var(--rose); }
        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: transparent;
          color: var(--black);
          padding: 1rem 2.2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid #ccc;
          transition: border-color 0.2s, color 0.2s;
        }
        .cta-btn-secondary:hover { border-color: var(--rose); color: var(--rose); }
        .cta-right {}
        .press-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1px solid #e0dcd6;
        }
        .press-item {
          padding: 2.2rem 2rem;
          border-right: 1px solid #e0dcd6;
          border-bottom: 1px solid #e0dcd6;
        }
        .press-item:nth-child(2n) { border-right: none; }
        .press-item:nth-child(3), .press-item:nth-child(4) { border-bottom: none; }
        .press-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.8rem;
          color: var(--black);
          line-height: 1;
          margin-bottom: 0.3rem;
          letter-spacing: 0.02em;
        }
        .press-value span { color: var(--rose); }
        .press-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: #8a8278;
          line-height: 1.5;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
          .hero-right p { font-size: 1.05rem; }
          .origin-inner { grid-template-columns: 1fr; gap: 3rem; }
          .origin-label { position: static; }
          .pillars-grid { grid-template-columns: 1fr; }
          .pillar { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .pillar:last-child { border-bottom: none; }
          .steps-list { grid-template-columns: 1fr; }
          .step { border-right: none !important; border-bottom: 1px solid #e0dcd6 !important; }
          .step:last-child { border-bottom: none !important; }
          .cta-inner { grid-template-columns: 1fr; gap: 3rem; }
          .affil-banner { margin: 0 1.5rem; }
          .about-hero { padding: 5rem 1.5rem 4rem; }
          .origin-section, .philosophy-section, .how-section, .cta-section { padding: 5rem 1.5rem; }
          .mirha-section { padding: 5rem 1.5rem; }
        }
        @media (max-width: 580px) {
          .press-grid { grid-template-columns: 1fr 1fr; }
          .cta-btn-row { flex-direction: column; }
          .cta-btn-primary, .cta-btn-secondary { justify-content: center; }
          .philosophy-header { flex-direction: column; align-items: flex-start; }
          .how-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">About Mirha &amp; Co.</div>
            <h1 className="about-headline hero-headline">
              Built on
              <br />
              Honest
              <br />
              <em>Skin.</em>
            </h1>
          </div>
          <div className="hero-right">
            <p>
              A research-driven beauty and wellness guide. No paid opinions.
              No gifted-product reviews. Just honest information — from someone
              who spent years inside the Indian beauty industry.
            </p>
            <div className="hero-stat-row">
              <div className="hero-stat">
                <div className="hero-stat-num">5+</div>
                <div className="hero-stat-label">Years in beauty retail</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">100%</div>
                <div className="hero-stat-label">Independent opinions</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">0</div>
                <div className="hero-stat-label">Paid reviews. Ever.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-strip" aria-hidden="true">
        {[...Array(2)].map((_, i) => (
          <span className="marquee-inner" key={i}>
            {["SKINCARE", "WELLNESS", "HONEST REVIEWS", "INDIA FOCUSED", "ALL SKIN TYPES", "INGREDIENT SCIENCE", "NO FLUFF", "RESEARCH FIRST", "BEAUTY", "ZERO PAID OPINIONS"].map((item, j) => (
              <span key={j}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-dot" />
              </span>
            ))}
          </span>
        ))}
      </div>

      {/* ── ORIGIN ── */}
      <section className="origin-section">
        <div className="origin-inner">
          <div className="origin-label">
            <div className="section-tag">Our Story</div>
            <h2 className="origin-title">
              WHY<br />THIS<br />EXISTS.
            </h2>
          </div>
          <div className="origin-body">
            <div className="industry-badge">
              <div className="industry-badge-icon">N</div>
              <div className="industry-badge-text">
                <strong>Industry background:</strong> Years of experience in
                beauty retail with Nykaa — understanding how products are made,
                marketed, and priced in India.
              </div>
            </div>

            <p>
              Mirha &amp; Co. exists because the Indian beauty market is full of
              noise. Influencers pushing products they've never paid for.
              "Reviews" written by people who received the product as a gift two
              days ago. Affiliate blogs that recommend anything with a commission
              attached.
            </p>
            <p>
              We built something different. A guide written by someone who has
              worked inside beauty retail — who understands ingredient lists,
              knows how brands price their products, and has seen firsthand what
              sells because of marketing versus what sells because it{" "}
              <strong>actually works</strong>.
            </p>
            <p>
              Every post on this site is research-based. When we recommend a
              product, we tell you exactly why — the ingredients, the evidence,
              what dermatologists say, and what real customers report after
              extended use. We don't pretend to have personally tested
              everything. <strong>We do the research so you don't have to.</strong>
            </p>
            <p>
              And this isn't just for one type of person. Skin doesn't have a
              gender. Concerns about pigmentation, sun damage, barrier health,
              and ageing affect everyone. This site is built for all skin —
              every tone, every type, every concern.
            </p>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="philosophy-section">
        <div className="philosophy-inner">
          <div className="philosophy-header">
            <h2 className="philosophy-title">
              THREE<br />
              <em>PILLARS.</em>
            </h2>
            <p className="philosophy-intro">
              Everything published here is filtered through the same three
              principles. No exceptions.
            </p>
          </div>
          <div className="pillars-grid">
            <div className="pillar">
              <div className="pillar-num">01</div>
              <h3 className="pillar-title">Industry Knowledge</h3>
              <p className="pillar-text">
                Built by someone with real experience in Indian beauty retail.
                We know how this industry works — from supply chain to shelf,
                from formulation to marketing spin. That knowledge is the
                foundation of every recommendation.
              </p>
            </div>
            <div className="pillar">
              <div className="pillar-num">02</div>
              <h3 className="pillar-title">Research First</h3>
              <p className="pillar-text">
                Every recommendation is backed by ingredient science,
                dermatologist guidance, and long-term customer data. We
                cross-reference all three. We don't move on gut feel alone,
                and we don't rush to publish because something is trending.
              </p>
            </div>
            <div className="pillar">
              <div className="pillar-num">03</div>
              <h3 className="pillar-title">India Focused</h3>
              <p className="pillar-text">
                Indian climate. Indian skin concerns — pigmentation, sun
                damage, humidity, hard water. Indian price points. Everything
                on this site is relevant to where you actually live, not
                translated from a Western routine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="how-section">
        <div className="how-inner">
          <div className="how-header">
            <h2 className="how-title">
              HOW<br />
              WE WORK.
            </h2>
            <p className="how-sub">
              The process behind every product recommendation and editorial
              piece on this site.
            </p>
          </div>
          <div className="steps-list">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-content">
                <h3 className="step-title">Ingredient Analysis</h3>
                <p className="step-text">
                  We start with the INCI list. Every active ingredient is
                  checked for clinical evidence, concentration, and
                  compatibility. Marketing claims come second — always.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-content">
                <h3 className="step-title">Dermatologist Consensus</h3>
                <p className="step-text">
                  We cross-reference against published dermatologist guidance
                  and peer-reviewed research. If the science doesn't support
                  the claim, we say so.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-content">
                <h3 className="step-title">Long-Term Review Data</h3>
                <p className="step-text">
                  Short-term reviews lie. We look at verified purchase reviews
                  at 3, 6, and 12 months of use. Products that fail over time
                  don't make the cut.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-content">
                <h3 className="step-title">Honest Disclosure</h3>
                <p className="step-text">
                  We use Amazon India affiliate links. A commission is earned
                  when you buy through our links — at zero extra cost to you.
                  This is always disclosed. It is never the reason something
                  gets recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AFFILIATE NOTE ── */}
      <div className="affil-banner">
        <div>
          <div className="affil-label">Transparency Note</div>
          <p className="affil-text">
            This site uses Amazon India affiliate links. When you click and
            purchase, we earn a small commission at no additional cost to you.
            Affiliate income keeps the site independent — it never determines
            what gets featured. The product does that on its own merit.
          </p>
        </div>
        <div style={{ flexShrink: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
          Amazon<br />Associates
        </div>
      </div>

      {/* ── MIRHA ── */}
      <section className="mirha-section">
        <div className="mirha-inner">
          <div className="mirha-overline">The Name</div>
          <h2 className="mirha-name">MIRHA &amp; CO.</h2>
          <div className="mirha-rule" />
          <p className="mirha-quote">
            "Would I recommend this to my daughter?" — the only filter that
            matters.
          </p>
          <p className="mirha-sub">
            Mirha is our daughter. This platform is built in her name — as a
            legacy, and as proof that you can build something honest in an
            industry that often isn't.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-left">
            <div className="cta-label">Start Reading</div>
            <h2 className="cta-headline">
              THE<br />
              <em>JOURNAL.</em>
            </h2>
            <p className="cta-text">
              Research-backed beauty and wellness for every skin type.
              Honest opinions, ingredient breakdowns, and curated product
              picks — updated regularly.
            </p>
            <div className="cta-btn-row">
              <a href="/blog" className="cta-btn-primary">Go to The Journal →</a>
              <a href="/" className="cta-btn-secondary">Beauty Shop →</a>
            </div>
          </div>
          <div className="cta-right">
            <div className="press-grid">
              <div className="press-item">
                <div className="press-value">5<span>+</span></div>
                <div className="press-label">Years of beauty industry experience in India</div>
              </div>
              <div className="press-item">
                <div className="press-value">3<span>×</span></div>
                <div className="press-label">Sources cross-referenced per recommendation</div>
              </div>
              <div className="press-item">
                <div className="press-value">0<span>%</span></div>
                <div className="press-label">Products recommended because of commission alone</div>
              </div>
              <div className="press-item">
                <div className="press-value">All<span>.</span></div>
                <div className="press-label">Skin types, tones &amp; concerns covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUSINESS ENQUIRIES ── */}
<div style={{
  background: "#faf8f5",
  padding: "3rem 2.5rem",
  textAlign: "center",
  borderTop: "1px solid #e0dcd6"
}}>
  <p style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--rose)",
    marginBottom: "0.8rem"
  }}>
    Business Enquiries
  </p>

  <p style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    color: "#6a635d",
    marginBottom: "0.6rem"
  }}>
    For partnerships, collaborations, or brand enquiries:
  </p>

  <a
    href="mailto:mirhcobiz@gmail.com"
    style={{
      fontFamily: "'DM Serif Display', serif",
      fontSize: "1.1rem",
      color: "var(--black)",
      textDecoration: "none",
      borderBottom: "1px solid var(--rule)"
    }}
  >
    mirhcobiz@gmail.com
  </a>

  <p style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.7rem",
    color: "#8a8278",
    marginTop: "0.6rem"
  }}>
    We typically respond within 24–48 hours.
  </p>
</div>

    </main>
  );
}

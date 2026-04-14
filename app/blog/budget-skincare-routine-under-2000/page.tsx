"use client";

import { useState } from "react";
import { AffiliateCard } from "@/components/AffiliateCard";
import ProductModal from "@/components/ProductModal";

// ─── AFFILIATE TAG ───────────────────────────────────────────────────────────
const TAG = "skinwithtanvi-21";

export default function BudgetRoutinePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .blog-wrap * { box-sizing: border-box; }

        /* ── HERO ── */
        .blog-hero {
          background: var(--black, #111);
          padding: 7rem 2rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .blog-hero::after {
          content: '4';
          position: absolute;
          right: -2rem;
          bottom: -4rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32rem;
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .blog-hero-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .blog-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--rose, #c0392b);
          margin-bottom: 1.8rem;
        }
        .blog-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 1px;
          background: var(--rose, #c0392b);
        }
        .blog-hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 8vw, 6.5rem);
          color: #fff;
          line-height: 0.92;
          letter-spacing: 0.02em;
          margin: 0 0 2rem;
        }
        .blog-hero h1 em {
          color: var(--rose, #c0392b);
          font-style: normal;
        }
        .blog-hero-meta {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .blog-hero-meta span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .blog-hero-meta strong {
          color: rgba(255,255,255,0.55);
          font-weight: 500;
        }
        .hero-tag {
          background: rgba(192,57,43,0.15);
          border: 1px solid rgba(192,57,43,0.3);
          color: var(--rose, #c0392b);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
          border-radius: 2px;
        }

        /* ── BODY ── */
        .blog-body {
          max-width: 780px;
          margin: 0 auto;
          padding: 5rem 2rem 6rem;
        }

        /* ── STANDFIRST ── */
        .standfirst {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.25rem;
          color: #4a4340;
          line-height: 1.75;
          margin-bottom: 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 2px solid var(--black, #111);
        }

        /* ── PROSE ── */
        .blog-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          line-height: 1.9;
          color: #2c2826;
          margin-bottom: 1.6rem;
        }
        .blog-body p strong {
          font-weight: 500;
          color: #111;
        }
        .blog-body a {
          color: var(--rose, #c0392b);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── STEP HEADER ── */
        .step-header {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin: 4rem 0 1.8rem;
          padding-bottom: 1.5rem;
          border-bottom: 3px solid var(--black, #111);
        }
        .step-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 5rem;
          color: var(--rose, #c0392b);
          line-height: 0.85;
          opacity: 0.25;
          flex-shrink: 0;
          width: 3.5rem;
        }
        .step-header-text {}
        .step-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--rose, #c0392b);
          margin-bottom: 0.4rem;
        }
        .step-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          color: var(--black, #111);
          line-height: 0.95;
          letter-spacing: 0.02em;
          margin: 0;
        }

        /* ── SCIENCE CALLOUT ── */
        .science-box {
          background: #faf8f5;
          border-left: 3px solid var(--rose, #c0392b);
          border-radius: 0 4px 4px 0;
          padding: 1.4rem 1.6rem;
          margin: 2rem 0;
        }
        .science-box-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--rose, #c0392b);
          margin-bottom: 0.5rem;
        }
        .science-box p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem !important;
          line-height: 1.7 !important;
          color: #4a4340 !important;
          margin: 0 !important;
        }
        .science-box cite {
          display: block;
          font-size: 0.72rem;
          color: #999;
          margin-top: 0.6rem;
          font-style: normal;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── WARNING BOX ── */
        .warn-box {
          background: rgba(192,57,43,0.04);
          border: 1px solid rgba(192,57,43,0.2);
          border-radius: 4px;
          padding: 1.4rem 1.6rem;
          margin: 2rem 0;
        }
        .warn-box-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--rose, #c0392b);
          margin-bottom: 0.5rem;
        }
        .warn-box p {
          font-size: 0.88rem !important;
          color: #4a4340 !important;
          margin: 0 !important;
          line-height: 1.7 !important;
        }

        /* ── PRODUCT SECTION LABEL ── */
        .product-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #aaa;
          margin: 2.5rem 0 1rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .product-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e8e4de;
        }

        /* ── CARDS WRAPPER ── */
        .cards-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
          margin-bottom: 1.5rem;
        }

        /* ── SECTION DIVIDER ── */
        .section-rule {
          border: none;
          border-top: 1px solid #e8e4de;
          margin: 4rem 0;
        }

        /* ── H2 / H3 ── */
        .blog-body h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.04em;
          color: var(--black, #111);
          margin: 3.5rem 0 1.2rem;
          padding-top: 2.5rem;
          border-top: 2px solid var(--black, #111);
        }
        .blog-body h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          color: var(--black, #111);
          margin: 2rem 0 0.8rem;
        }

        /* ── ROUTINE TABLE ── */
        .routine-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 2px solid var(--black, #111);
          margin: 2rem 0 3rem;
        }
        .routine-col {
          padding: 2rem;
          border-right: 1px solid #e8e4de;
        }
        .routine-col:last-child { border-right: none; }
        .routine-col-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.05em;
          color: var(--black, #111);
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .routine-col-title span {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--rose, #c0392b);
          flex-shrink: 0;
        }
        .routine-step-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 0.7rem 0;
          border-bottom: 1px solid #f0ece6;
        }
        .routine-step-row:last-child { border-bottom: none; }
        .routine-step-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          color: var(--rose, #c0392b);
          opacity: 0.4;
          width: 1.4rem;
          flex-shrink: 0;
          line-height: 1.4;
        }
        .routine-step-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #2c2826;
          line-height: 1.5;
        }
        .routine-step-note {
          font-size: 0.75rem;
          color: #aaa;
          display: block;
        }

        /* ── TOTAL COST BOX ── */
        .total-box {
          background: var(--black, #111);
          padding: 2.5rem;
          margin: 3rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .total-box-left {}
        .total-box-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 0.5rem;
        }
        .total-box-amount {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4rem;
          color: #fff;
          line-height: 1;
          letter-spacing: 0.02em;
        }
        .total-box-amount span { color: var(--rose, #c0392b); }
        .total-box-right {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          max-width: 280px;
          line-height: 1.65;
        }

        /* ── FINAL CTA ── */
        .final-cta {
          background: var(--rose, #c0392b);
          padding: 3.5rem 2.5rem;
          margin: 3rem 0 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .final-cta::before {
          content: 'SKIN';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18rem;
          color: rgba(0,0,0,0.06);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .final-cta-inner { position: relative; z-index: 1; }
        .final-cta h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          color: #fff;
          letter-spacing: 0.03em;
          line-height: 0.95;
          margin: 0 0 1rem;
          border: none;
          padding: 0;
        }
        .final-cta p {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.7);
          max-width: 440px;
          margin: 0 auto 2rem;
          line-height: 1.65;
        }
        .final-cta-note {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.1em;
        }

        /* ── DISCLOSURE ── */
        .disclosure {
          margin-top: 4rem;
          padding: 1.4rem 1.6rem;
          border: 1px solid #e8e4de;
          border-radius: 4px;
        }
        .disclosure-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 0.5rem;
        }
        .disclosure p {
          font-size: 0.78rem !important;
          color: #bbb !important;
          margin: 0 !important;
          line-height: 1.65 !important;
        }

        @media (max-width: 600px) {
          .blog-hero { padding: 4rem 1.5rem 3rem; }
          .blog-body { padding: 3rem 1.5rem 4rem; }
          .routine-grid { grid-template-columns: 1fr; }
          .routine-col { border-right: none; border-bottom: 1px solid #e8e4de; }
          .routine-col:last-child { border-bottom: none; }
          .total-box { flex-direction: column; }
          .step-num { font-size: 3.5rem; }
        }
      `}</style>

      <div className="blog-wrap">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="blog-hero">
          <div className="blog-hero-inner">
            <div className="blog-eyebrow">Skincare · Routine Guides</div>
            <h1>
              4-Step Skincare<br />
              Routine Under<br />
              <em>₹2,000.</em>
            </h1>
            <div className="blog-hero-meta">
              <span><strong>Mirha &amp; Co.</strong></span>
              <span>2,200 words</span>
              <span>10 min read</span>
              <span className="hero-tag">Research-Backed</span>
              <span className="hero-tag">India Only</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            BODY
        ══════════════════════════════════════════ */}
        <main className="blog-body">

          {/* STANDFIRST */}
          <p className="standfirst">
            Most skincare advice online is written for someone in Seoul or Los Angeles.
            You're not that person. You're dealing with 40°C summers, 90% humidity, hard water,
            and pollution. This routine was built for that reality — four products, under ₹2,000 total,
            backed by dermatological research.
          </p>

          {/* INTRO */}
          <p>
            The Indian skincare market will tell you that you need twelve products, three serums,
            and a sheet mask every other night. You don't. The brands that push complicated routines
            benefit from complicated routines. Your skin doesn't.
          </p>

          <p>
            The four categories that actually move the needle for Indian skin are: a proper cleanser,
            a niacinamide serum, a lightweight moisturiser, and sunscreen. Everything else — toners,
            essences, eye creams, mists — is optional. Get these four right first.
          </p>

          <p>
            What follows is the science behind each step, what to look for, what to avoid, and
            the specific products that deliver real results at an honest price point. All links go
            directly to Amazon India.
          </p>

          <hr className="section-rule" />

          {/* ══ STEP 1 ══ */}
          <div className="step-header">
            <div className="step-num">01</div>
            <div className="step-header-text">
              <div className="step-label">Step One</div>
              <h2 className="step-title">Cleanser.<br />Clear the Slate.</h2>
            </div>
          </div>

          <p>
            Cleansing is the most underestimated step in a skincare routine. Most people in India
            are either over-cleansing — using harsh, foaming face washes multiple times a day —
            or under-cleansing, relying on micellar water that doesn't fully remove sunscreen and
            pollutants.
          </p>

          <p>
            Your cleanser has one job: remove what doesn't belong on your skin without disrupting
            what does. That means pollution particles, excess sebum, sunscreen residue, and
            sweat — without stripping your skin barrier.
          </p>

          <div className="science-box">
            <div className="science-box-label">The Science</div>
            <p>
              The skin barrier is maintained by a thin layer of lipids and natural moisturising
              factors. Surfactant-heavy cleansers (SLS, SLES) disrupt this barrier, leading to
              transepidermal water loss (TEWL). A 2019 study in the <em>Journal of Investigative
              Dermatology</em> found that even a single wash with high-surfactant cleansers
              caused a measurable increase in TEWL that persisted for 24 hours. For Indian skin
              that already deals with high UV exposure and humidity-driven barrier compromise,
              this matters.
            </p>
            <cite>Source: Fluhr JW, et al. J Invest Dermatol. 2019.</cite>
          </div>

          <p>
            What to look for in a cleanser for Indian skin: <strong>low-irritation surfactants</strong>
            {" "}(cocamidopropyl betaine, sodium cocoamphoacetate), <strong>pH between 4.5–5.5</strong>
            {" "}(matching skin's natural pH), and <strong>no fragrance</strong>. Fragrance is the
            #1 cause of contact dermatitis in Indian consumers, and it adds zero skincare benefit.
          </p>

          <div className="warn-box">
            <div className="warn-box-label">What to Avoid</div>
            <p>
              Avoid cleansers with Sodium Lauryl Sulfate (SLS) as the primary surfactant, any
              added fragrance or parfum, walnut or apricot scrub particles (they cause micro-tears),
              and anything marketed as "deep pore cleansing" — these are almost always too harsh
              for daily use.
            </p>
          </div>

          <p>
            The two products below represent the most recommended cleansers by Indian dermatologists
            for barrier-sensitive and acne-prone skin respectively. Both are available on Amazon India
            with Prime delivery.
          </p>

          <div className="product-section-label">Recommended Cleansers</div>
          <div className="cards-row">
            <AffiliateCard asin="B01CCGW4OE" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B09VLDY46B" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <p>
            The Cetaphil Gentle Skin Cleanser has been the dermatologist standard for sensitive and
            dry skin for decades. The Simple Kind to Skin Refreshing Facial Wash is the better choice
            if you have oily or combination skin — it's soap-free, contains zinc and vitamin B3, and
            costs less per ml than most premium cleansers.
          </p>

          <hr className="section-rule" />

          {/* ══ STEP 2 ══ */}
          <div className="step-header">
            <div className="step-num">02</div>
            <div className="step-header-text">
              <div className="step-label">Step Two</div>
              <h2 className="step-title">Niacinamide.<br />One Ingredient.<br />Many Problems.</h2>
            </div>
          </div>

          <p>
            If there is one ingredient that Indian dermatologists recommend more than any other
            for Indian skin concerns, it is niacinamide. Not vitamin C, not retinol, not hyaluronic
            acid — niacinamide. The reason is simple: it addresses the four most common skin concerns
            in the Indian population simultaneously.
          </p>

          <div className="science-box">
            <div className="science-box-label">What the Research Says</div>
            <p>
              Niacinamide (Vitamin B3) has been studied extensively for its effects on Indian and
              Asian skin phenotypes. A 12-week double-blind clinical trial published in the
              <em> British Journal of Dermatology</em> demonstrated that 5% niacinamide
              significantly reduced hyperpigmentation and improved skin tone evenness compared to
              vehicle control. A separate study showed 4% niacinamide reduced sebum excretion rate
              by 13% over 8 weeks. For post-inflammatory hyperpigmentation (PIH) — the dark marks
              left after acne, extremely common in Fitzpatrick types IV–VI prevalent in India —
              niacinamide inhibits melanosome transfer from melanocytes to keratinocytes, visibly
              fading marks over 8–12 weeks.
            </p>
            <cite>Bissett DL, et al. Br J Dermatol. 2004; Draelos ZD, et al. J Cosmet Dermatol. 2006.</cite>
          </div>

          <p>
            <strong>What niacinamide does for Indian skin specifically:</strong> It reduces excess
            oil production, which is exacerbated by Indian heat and humidity. It fades the dark
            marks that acne and sun damage leave behind — the PIH that most Indian skin is prone to.
            It minimises the appearance of enlarged pores, which widen in humid climates. It
            strengthens the skin barrier, reducing sensitivity and redness. And it does all of this
            gently enough to be used twice daily without purging.
          </p>

          <p>
            The concentration sweet spot for Indian skin is <strong>5–10% niacinamide</strong>.
            Below 2% shows minimal clinical effect. Above 10% can cause flushing in some individuals,
            though this is rare and temporary. The products below both sit in this range.
          </p>

          <div className="warn-box">
            <div className="warn-box-label">A Common Myth</div>
            <p>
              You may have read that niacinamide and vitamin C "cancel each other out." This is
              outdated. The nicotinic acid flushing concern only applies to niacinamide concentrations
              above 20% combined with very high vitamin C, and at temperatures that don't occur
              in product formulations. At standard usage, they are perfectly compatible and can be
              layered.
            </p>
          </div>

          <p>
            Apply niacinamide after cleansing on damp skin, before moisturiser. In the morning, it
            goes under sunscreen. At night, it goes under moisturiser. One pump is enough for the
            whole face.
          </p>

          <div className="product-section-label">Recommended Niacinamide Serums</div>
          <div className="cards-row">
            <AffiliateCard asin="B08F9MF314" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B07VVRXFWC" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <p>
            Minimalist's 10% Niacinamide + Zinc 1% is formulated specifically for Indian conditions —
            the zinc addition controls sebum at a separate pathway from niacinamide, making it
            particularly effective for oily and acne-prone skin. The Ordinary's version at the same
            concentration is the international benchmark and widely available on Amazon India.
            Both are fragrance-free, non-comedogenic, and clinically tested.
          </p>

          <hr className="section-rule" />

          {/* ══ STEP 3 ══ */}
          <div className="step-header">
            <div className="step-num">03</div>
            <div className="step-header-text">
              <div className="step-label">Step Three</div>
              <h2 className="step-title">Moisturiser.<br />Even If You're<br />Oily.</h2>
            </div>
          </div>

          <p>
            This is the step that oily-skinned people skip. It is also the reason their skin
            produces more oil.
          </p>

          <p>
            When the skin is dehydrated — not oily, but lacking water — it compensates by producing
            more sebum. This is a protective mechanism. If you skip moisturiser because you think
            your skin is already oily enough, you are triggering more oil production. The solution
            to oily skin is not less moisture. It is the right kind of moisture.
          </p>

          <div className="science-box">
            <div className="science-box-label">The Science of Dehydrated Oily Skin</div>
            <p>
              The skin has two types of hydration: oil content (sebum) and water content. These are
              independent systems. Oily skin refers to excess sebum; dehydrated skin refers to
              insufficient water in the stratum corneum. A 2018 meta-analysis in the
              <em> Journal of Clinical and Aesthetic Dermatology</em> confirmed that humectant-based
              moisturisers (containing glycerin, hyaluronic acid) applied to oily skin reduced
              transepidermal water loss without increasing sebum production, and in several cases
              reduced sebum secretion over 8 weeks through improved barrier function.
            </p>
            <cite>Loden M. J Clin Aesthet Dermatol. 2018.</cite>
          </div>

          <p>
            For Indian skin in Indian weather, the ideal moisturiser is <strong>gel-based</strong>,
            not cream-based. Creams are too occlusive for humid climates — they sit on top of the
            skin, feel heavy, and can contribute to congestion in warm months. A gel moisturiser
            absorbs quickly, delivers hydration without heaviness, and doesn't interfere with
            sunscreen application.
          </p>

          <p>
            Ingredients to look for: <strong>glycerin</strong> (the most effective humectant at
            budget price points), <strong>hyaluronic acid</strong> (draws water from the environment
            into the skin — effective in Indian humidity), and <strong>panthenol</strong> (vitamin B5,
            soothes and supports barrier repair). Ingredients to avoid: fragrance, lanolin (comedogenic
            for acne-prone skin), and heavy silicones as primary ingredients.
          </p>

          <div className="product-section-label">Recommended Moisturisers</div>
          <div className="cards-row">
            <AffiliateCard asin="B00BQFTQW6" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B099MJH88B" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <p>
            Pond's Super Light Gel is one of the most consistently recommended budget moisturisers
            for Indian oily skin — it's lightweight, non-comedogenic, and absorbs within seconds.
            For dry or normal skin, especially in winter or under air conditioning, Cetaphil's
            moisturising lotion provides longer-lasting barrier support with its ceramide-adjacent
            formulation.
          </p>

          <hr className="section-rule" />

          {/* ══ STEP 4 ══ */}
          <div className="step-header">
            <div className="step-num">04</div>
            <div className="step-header-text">
              <div className="step-label">Step Four — Non-Negotiable</div>
              <h2 className="step-title">Sunscreen.<br />If You Skip<br />This, Nothing<br />Else Matters.</h2>
            </div>
          </div>

          <p>
            India receives some of the highest UV radiation levels in the world. UV index readings
            of 8–12 (very high to extreme) are standard in most Indian cities for six or more months
            of the year. This is not a western concern that doesn't apply to Indian skin. It is, in
            fact, a more urgent concern for Indian skin.
          </p>

          <div className="science-box">
            <div className="science-box-label">UV Damage and Indian Skin: The Numbers</div>
            <p>
              A misconception persists that darker skin does not need sunscreen because melanin
              provides protection. Melanin does provide some UV protection — roughly equivalent
              to SPF 13. This is not sufficient. UV radiation causes DNA damage in melanocytes
              regardless of skin tone, leading to hyperpigmentation, photoageing, and in long-term
              exposure, increased skin cancer risk. A 2020 study in the <em>Indian Journal of
              Dermatology</em> found that 72% of cases of melasma — the most common pigmentation
              disorder affecting Indian women and men — were directly attributable to UV exposure
              without adequate sun protection. Sunscreen with SPF 30 or above blocks 97% of UVB.
              SPF 50 blocks 98%. The difference between wearing SPF 30 and SPF 50 is marginal.
              The difference between wearing SPF 30 and nothing is not.
            </p>
            <cite>Sarkar R, et al. Indian J Dermatol. 2020.</cite>
          </div>

          <p>
            For daily use in Indian conditions, the sunscreen you choose must meet three criteria:
            <strong> broad spectrum</strong> (blocking both UVA and UVB — look for PA++++ rating
            alongside SPF), <strong>no white cast</strong> (chemical or hybrid formulas work better
            for Indian skin tones than pure mineral sunscreens), and <strong>non-greasy texture
            </strong> (you will not wear a sunscreen that feels uncomfortable — texture compliance
            is a real issue in dermatology).
          </p>

          <p>
            Apply as the last step in your morning routine, after moisturiser. Use a full two
            finger-lengths (approximately 1/4 teaspoon for the face). Reapply every 2–3 hours
            if you are outdoors. Indoors near windows, once in the morning is sufficient.
          </p>

          <div className="warn-box">
            <div className="warn-box-label">The Reapplication Problem</div>
            <p>
              Most people apply enough sunscreen in the morning but never reapply. SPF protection
              degrades with UV exposure, sweat, and sebum over 2–3 hours. If you're commuting,
              outdoors, or near a window for significant time, a SPF setting powder or SPF mist
              for reapplication is practical. But for an office or indoor lifestyle, morning
              application of SPF 50 is sufficient.
            </p>
          </div>

          <div className="product-section-label">Recommended Sunscreens</div>
          <div className="cards-row">
            <AffiliateCard asin="B09FPS9D5T" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B0F2HF2PKQ" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B0CW1N7QRT" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <p>
            These three represent the best-reviewed, dermatologist-endorsed options at this price
            point on Amazon India. All are SPF 50 or above with PA++++ UVA protection, appropriate
            for Indian UV conditions, and have minimal to no white cast on medium to deep skin tones.
          </p>

          <hr className="section-rule" />

          {/* ══ ROUTINE ══ */}
          <h2>The Complete Routine</h2>

          <p>
            Four products. Two uses daily. The order matters — actives before occlusion, sunscreen
            last in the morning.
          </p>

          <div className="routine-grid">
            <div className="routine-col">
              <div className="routine-col-title"><span />Morning</div>
              <div className="routine-step-row">
                <div className="routine-step-num">1</div>
                <div className="routine-step-name">
                  Cleanser
                  <span className="routine-step-note">Gentle, low-surfactant. 30 sec, lukewarm water.</span>
                </div>
              </div>
              <div className="routine-step-row">
                <div className="routine-step-num">2</div>
                <div className="routine-step-name">
                  Niacinamide Serum
                  <span className="routine-step-note">On damp skin. 1 pump. Pat in, don't rub.</span>
                </div>
              </div>
              <div className="routine-step-row">
                <div className="routine-step-num">3</div>
                <div className="routine-step-name">
                  Moisturiser
                  <span className="routine-step-note">Wait 60 sec after serum. Gel formula morning.</span>
                </div>
              </div>
              <div className="routine-step-row">
                <div className="routine-step-num">4</div>
                <div className="routine-step-name">
                  Sunscreen
                  <span className="routine-step-note">Two finger-lengths. Last step always. Non-negotiable.</span>
                </div>
              </div>
            </div>
            <div className="routine-col">
              <div className="routine-col-title"><span />Night</div>
              <div className="routine-step-row">
                <div className="routine-step-num">1</div>
                <div className="routine-step-name">
                  Cleanser
                  <span className="routine-step-note">Double cleanse if you wore heavy SPF or makeup.</span>
                </div>
              </div>
              <div className="routine-step-row">
                <div className="routine-step-num">2</div>
                <div className="routine-step-name">
                  Niacinamide Serum
                  <span className="routine-step-note">Same as morning. Works overnight too.</span>
                </div>
              </div>
              <div className="routine-step-row">
                <div className="routine-step-num">3</div>
                <div className="routine-step-name">
                  Moisturiser
                  <span className="routine-step-note">Slightly richer formula at night is fine.</span>
                </div>
              </div>
              <div className="routine-step-row" style={{ opacity: 0.3 }}>
                <div className="routine-step-num">—</div>
                <div className="routine-step-name">
                  No sunscreen
                  <span className="routine-step-note">Never at night. UV protection is inactive.</span>
                </div>
              </div>
            </div>
          </div>

          {/* ══ TOTAL COST ══ */}
          <div className="total-box">
            <div className="total-box-left">
              <div className="total-box-label">Total Routine Cost</div>
              <div className="total-box-amount">Under <span>₹2,000</span></div>
            </div>
            <div className="total-box-right">
              At average usage, these four products last 2–3 months each. Monthly cost works out
              to approximately ₹600–700. Less than a single mid-tier serum at a pharmacy counter.
            </div>
          </div>

          {/* ══ EXPECTATIONS ══ */}
          <h2>Realistic Expectations</h2>

          <p>
            Skincare is not fast. Anyone telling you a product will transform your skin in 7 days
            is selling you something. Here is what the research actually says about timelines:
          </p>

          <p>
            <strong>2–4 weeks:</strong> Skin texture improves. Fewer new breakouts. Skin feels more
            comfortable and less reactive.
          </p>
          <p>
            <strong>6–8 weeks:</strong> Niacinamide begins visibly reducing existing dark marks and
            post-acne hyperpigmentation. Oil production reduces in humid conditions.
          </p>
          <p>
            <strong>12 weeks:</strong> Full benefits of barrier repair become visible — skin looks
            clearer, more even-toned, and responds better to environmental stress.
          </p>

          <p>
            The single most important variable is <strong>consistency</strong>. Using the right
            products three days a week delivers worse results than using average products every day.
            Start simple. Build the habit. Then optimise.
          </p>

          {/* ══ FINAL CTA ══ */}
          <div className="final-cta">
            <div className="final-cta-inner">
              <h2>Start Simple.<br />Stay Consistent.</h2>
              <p>
                Four products. Six to eight weeks. That is the entire brief.
                No 10-step routine. No expensive serums. Just the right basics — done daily.
              </p>
              <div className="final-cta-note">
                All products linked above · Amazon India · Affiliate links disclosed
              </div>
            </div>
          </div>

          {/* ══ DISCLOSURE ══ */}
          <div className="disclosure">
            <div className="disclosure-label">Affiliate Disclosure</div>
            <p>
              This post contains affiliate links to Amazon India (Store ID: skinwithtanvi-21).
              If you purchase through these links, Mirha &amp; Co. earns a small commission at
              no additional cost to you. This commission does not influence product selection —
              all recommendations are based on ingredient research, dermatologist guidance, and
              verified customer review data. Products are not gifted or sponsored.
            </p>
          </div>

        </main>
      </div>

      {/* ── MODAL ── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

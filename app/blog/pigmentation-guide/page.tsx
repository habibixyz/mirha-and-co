"use client";

import { useState } from "react";
import { AffiliateCard } from "@/components/AffiliateCard";
import ProductModal from "@/components/ProductModal";

const TAG = "skinwithtanvi-21";

export default function PigmentationGuidePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .pg-wrap * { box-sizing: border-box; }

        .pg-hero {
          background: var(--black, #111);
          padding: 8rem 2rem 6rem;
          position: relative;
          overflow: hidden;
        }
        .pg-hero::after {
          content: 'DARK';
          position: absolute;
          right: -3rem;
          bottom: -5rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28rem;
          color: rgba(255,255,255,0.022);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .pg-hero-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .pg-eyebrow {
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
        .pg-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 1px;
          background: var(--rose, #c0392b);
        }
        .pg-hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.2rem, 8vw, 7rem);
          color: #fff;
          line-height: 0.9;
          letter-spacing: 0.02em;
          margin: 0 0 2rem;
        }
        .pg-hero h1 em {
          color: var(--rose, #c0392b);
          font-style: normal;
          display: block;
        }
        .pg-hero-meta {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .pg-hero-meta span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .pg-hero-meta strong { color: rgba(255,255,255,0.55); font-weight: 500; }
        .pg-tag {
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

        /* ── INGREDIENT EXPLAINER STRIP ── */
        .ingredient-strip {
          background: var(--rose, #c0392b);
          padding: 0;
          overflow: hidden;
        }
        .ingredient-strip-inner {
          max-width: 780px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .ingredient-item {
          padding: 2rem 1.5rem;
          border-right: 1px solid rgba(255,255,255,0.15);
          text-align: center;
        }
        .ingredient-item:last-child { border-right: none; }
        .ingredient-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.08em;
          color: #fff;
          margin-bottom: 0.4rem;
        }
        .ingredient-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.4;
        }

        /* ── BODY ── */
        .pg-body {
          max-width: 780px;
          margin: 0 auto;
          padding: 5rem 2rem 6rem;
        }
        .standfirst {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.2rem;
          color: #4a4340;
          line-height: 1.75;
          margin-bottom: 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 2px solid var(--black, #111);
        }
        .pg-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          line-height: 1.9;
          color: #2c2826;
          margin-bottom: 1.6rem;
        }
        .pg-body p strong { font-weight: 500; color: #111; }

        /* ── SECTION HEADING ── */
        .section-block {
          margin: 4rem 0 2rem;
          padding-bottom: 1.4rem;
          border-bottom: 3px solid var(--black, #111);
          display: flex;
          align-items: flex-end;
          gap: 1.4rem;
        }
        .section-block-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4.5rem;
          color: var(--rose, #c0392b);
          line-height: 0.85;
          opacity: 0.2;
          flex-shrink: 0;
        }
        .section-block-text {}
        .section-block-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--rose, #c0392b);
          margin-bottom: 0.3rem;
        }
        .section-block h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: var(--black, #111);
          line-height: 0.95;
          letter-spacing: 0.02em;
          margin: 0;
          border: none;
          padding: 0;
        }

        /* ── CALLOUT BOXES ── */
        .science-box {
          background: #faf8f5;
          border-left: 3px solid var(--rose, #c0392b);
          padding: 1.4rem 1.6rem;
          margin: 2rem 0;
          border-radius: 0 4px 4px 0;
        }
        .box-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--rose, #c0392b);
          margin-bottom: 0.6rem;
        }
        .science-box p, .warn-box p, .tip-box p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem !important;
          line-height: 1.75 !important;
          color: #4a4340 !important;
          margin: 0 !important;
        }
        .science-box cite {
          display: block;
          font-size: 0.72rem;
          color: #aaa;
          margin-top: 0.6rem;
          font-style: normal;
          font-family: 'DM Sans', sans-serif;
        }
        .warn-box {
          background: rgba(192,57,43,0.04);
          border: 1px solid rgba(192,57,43,0.18);
          border-radius: 4px;
          padding: 1.4rem 1.6rem;
          margin: 2rem 0;
        }
        .tip-box {
          background: #f0f8f0;
          border: 1px solid #c3dfc3;
          border-radius: 4px;
          padding: 1.4rem 1.6rem;
          margin: 2rem 0;
        }
        .tip-box .box-label { color: #2e7d32; }

        /* ── INGREDIENT VS TABLE ── */
        .vs-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-family: 'DM Sans', sans-serif;
        }
        .vs-table th {
          background: var(--black, #111);
          color: #fff;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.9rem 1rem;
          text-align: left;
          font-weight: 500;
        }
        .vs-table td {
          font-size: 0.88rem;
          padding: 0.9rem 1rem;
          border-bottom: 1px solid #e8e4de;
          color: #2c2826;
          vertical-align: top;
          line-height: 1.55;
        }
        .vs-table tr:last-child td { border-bottom: none; }
        .vs-table tr:nth-child(even) td { background: #faf8f5; }
        .vs-table td:first-child {
          font-weight: 500;
          color: var(--rose, #c0392b);
          white-space: nowrap;
        }

        /* ── PRODUCT LABEL ── */
        .product-label {
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
        .product-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e8e4de;
        }
        .cards-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 14px;
          margin-bottom: 1.5rem;
        }

        /* ── ROUTINE TIMELINE ── */
        .timeline {
          margin: 2.5rem 0;
          border: 2px solid var(--black, #111);
        }
        .timeline-row {
          display: grid;
          grid-template-columns: 90px 1fr;
          border-bottom: 1px solid #e8e4de;
        }
        .timeline-row:last-child { border-bottom: none; }
        .timeline-week {
          background: var(--black, #111);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.2rem 0.8rem;
          text-align: center;
          line-height: 1.2;
        }
        .timeline-content {
          padding: 1.2rem 1.4rem;
        }
        .timeline-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1rem;
          color: var(--black, #111);
          margin-bottom: 0.3rem;
        }
        .timeline-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: #6a635d;
          line-height: 1.6;
        }

        /* ── SECTION RULE ── */
        .pg-rule { border: none; border-top: 1px solid #e8e4de; margin: 4rem 0; }

        /* ── FINAL CTA ── */
        .pg-cta {
          background: var(--rose, #c0392b);
          padding: 4rem 2.5rem;
          margin: 3rem 0 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .pg-cta::before {
          content: 'GLOW';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20rem;
          color: rgba(0,0,0,0.06);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .pg-cta-inner { position: relative; z-index: 1; }
        .pg-cta h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          color: #fff;
          line-height: 0.95;
          margin: 0 0 1rem;
          letter-spacing: 0.02em;
          border: none; padding: 0;
        }
        .pg-cta p {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.72);
          max-width: 420px;
          margin: 0 auto 1.5rem;
          line-height: 1.65;
        }
        .pg-cta-note {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.12em;
        }

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

        @media (max-width: 640px) {
          .pg-hero { padding: 4rem 1.5rem 3rem; }
          .pg-body { padding: 3rem 1.5rem 4rem; }
          .ingredient-strip-inner { grid-template-columns: 1fr 1fr; }
          .ingredient-item { border-bottom: 1px solid rgba(255,255,255,0.15); }
          .vs-table { font-size: 0.82rem; }
          .timeline-row { grid-template-columns: 70px 1fr; }
        }
      `}</style>

      <div className="pg-wrap" style={{ overflowX: "hidden" }}>

        {/* ── HERO ── */}
        <section className="pg-hero">
          <div className="pg-hero-inner">
            <div className="pg-eyebrow">Skincare · Pigmentation Guide</div>
            <h1>
              The Indian<br />
              Pigmentation<br />
              <em>Playbook.</em>
            </h1>
            <div className="pg-hero-meta">
              <span><strong>Mirha &amp; Co.</strong></span>
              <span>2,400 words</span>
              <span>12 min read</span>
              <span className="pg-tag">India-Specific</span>
              <span className="pg-tag">Dermat-Backed</span>
            </div>
          </div>
        </section>

        {/* ── INGREDIENT STRIP ── */}
        <div className="ingredient-strip">
          <div className="ingredient-strip-inner">
            {[
              { name: "Tranexamic Acid", role: "Blocks melanin signalling at the source" },
              { name: "Alpha Arbutin", role: "Inhibits tyrosinase, fades PIH gently" },
              { name: "Kojic Acid", role: "Natural melanin inhibitor, best for surface spots" },
              { name: "Azelaic Acid", role: "Targets abnormal melanocytes specifically" },
            ].map((i) => (
              <div className="ingredient-item" key={i.name}>
                <div className="ingredient-name">{i.name}</div>
                <div className="ingredient-role">{i.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <main className="pg-body">

          <p className="standfirst">
            India has one of the highest rates of facial hyperpigmentation in the world. The combination of
            high UV index, hormonal fluctuation, pollution, and Fitzpatrick skin types III–VI creates
            the perfect environment for stubborn dark spots. Most products don't work because they're
            not formulated for this specific biology. This guide is.
          </p>

          <p>
            If you've tried brightening serums that "didn't work," this is probably why: you were using
            the wrong ingredient for your type of pigmentation. There are three distinct types, each with
            a different mechanism, and each requiring a different active. Using a vitamin C serum on
            deep hormonal melasma is like treating a fungal infection with antibiotics — the wrong tool,
            regardless of quality.
          </p>
          <p>
            This guide breaks down the science, matches each pigmentation type to the correct ingredient,
            and gives you the specific products available on Amazon India that are formulated to work on
            Indian skin tones in Indian conditions.
          </p>

          <hr className="pg-rule" />

          {/* ── SECTION 1: Understanding ── */}
          <div className="section-block">
            <div className="section-block-num">01</div>
            <div className="section-block-text">
              <div className="section-block-label">The Foundation</div>
              <h2>Three Types of Pigmentation. Three Different Fixes.</h2>
            </div>
          </div>

          <p>
            <strong>Post-Inflammatory Hyperpigmentation (PIH)</strong> is the dark mark left after
            acne, waxing, rashes, or any skin trauma. It is the most common pigmentation type in
            Indian skin due to higher melanin reactivity. The good news: it responds well to topical
            treatment. The bad news: picking at it, or using the wrong actives, makes it significantly
            worse.
          </p>
          <p>
            <strong>Melasma</strong> presents as larger, symmetrical patches — typically on the forehead,
            cheeks, and upper lip. It is hormonally driven, often triggered by pregnancy, contraceptive
            pills, or thyroid irregularities, and consistently worsened by UV exposure. It is the most
            stubborn type and requires a multi-ingredient approach. For established melasma, a
            dermatologist should be part of the plan.
          </p>
          <p>
            <strong>Sun-induced dark spots</strong> (solar lentigines, tan patches) are caused directly
            by UV radiation triggering excess melanin in localised areas. These respond fastest to
            treatment, especially when combined with diligent SPF use.
          </p>

          <div className="science-box">
            <div className="box-label">Clinical Context</div>
            <p>
              A consensus review by India's Pigmentary Disorders Society (PDS) published in the
              <em> Indian Journal of Dermatology</em> identified melasma as affecting up to 40% of women
              in sun-exposed regions of India. The review noted that Fitzpatrick types IV–VI —
              dominant across the Indian subcontinent — have higher melanocyte reactivity, meaning
              any inflammatory trigger (acne, friction, UV, heat) produces more pigmentation than
              the same trigger would in lighter skin types. This is the biological basis for why
              Indian skin is disproportionately affected by PIH and melasma.
            </p>
            <cite>Sarkar R, et al. Pigmentary Disorders Society India Consensus. Indian J Dermatol. 2017.</cite>
          </div>

          <hr className="pg-rule" />

          {/* ── SECTION 2: Ingredients ── */}
          <div className="section-block">
            <div className="section-block-num">02</div>
            <div className="section-block-text">
              <div className="section-block-label">The Actives</div>
              <h2>Which Ingredient Works for Which Pigmentation.</h2>
            </div>
          </div>

          <p>
            The Indian skincare market is flooded with "brightening" products. Almost all of them
            contain some combination of vitamin C, niacinamide, and fruit extracts. These are fine
            for general maintenance but insufficient for established pigmentation. Here are the four
            actives backed by robust clinical evidence:
          </p>
          
          <div style={{ overflowX: "auto" }}>
  <table className="vs-table">
    <thead>
      <tr>
        <th>Ingredient</th>
        <th>Best For</th>
        <th>How It Works</th>
        <th>Timeline</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Tranexamic Acid 3–5%</td>
        <td>Melasma, hormonal pigmentation</td>
        <td>Blocks UV-induced melanocyte–keratinocyte signalling</td>
        <td>8–12 weeks</td>
      </tr>
      <tr>
        <td>Alpha Arbutin 1–2%</td>
        <td>PIH, acne marks</td>
        <td>Inhibits tyrosinase enzyme</td>
        <td>6–10 weeks</td>
      </tr>
      <tr>
        <td>Kojic Acid 1–2%</td>
        <td>Sun spots</td>
        <td>Reduces melanin synthesis</td>
        <td>4–8 weeks</td>
      </tr>
      <tr>
        <td>Azelaic Acid 10–20%</td>
        <td>PIH + acne</td>
        <td>Targets abnormal melanocytes</td>
        <td>8–12 weeks</td>
      </tr>
    </tbody>
  </table>
</div>

          <div className="science-box">
            <div className="box-label">The Research on Tranexamic Acid</div>
            <p>
              A 2020 study in the <em>Journal of Cosmetic Dermatology</em> compared topical tranexamic
              acid 5% against low-dose hydroquinone for melasma in Indian patients over 12 weeks.
              Tranexamic acid produced comparable reduction in MASI (Melasma Area Severity Index)
              scores while causing significantly fewer adverse effects, including zero cases of
              ochronosis (a permanent darkening paradox seen with prolonged hydroquinone use). The
              study authors concluded tranexamic acid is particularly suited to Indian skin due to
              its mechanism not relying on inflammation — a key concern given Indian skin's
              heightened melanocyte reactivity to inflammatory triggers.
            </p>
            <cite>Ebrahim HM, et al. J Cosmet Dermatol. 2020;19(12):3177–3182.</cite>
          </div>

          <div className="warn-box">
            <div className="box-label">The Hydroquinone Warning</div>
            <p>
              Hydroquinone is banned in several countries and carries a risk of ochronosis (paradoxical
              permanent darkening) with extended use, particularly in darker skin tones. Despite being
              available over the counter in India in low concentrations, dermatologists increasingly
              favour tranexamic acid, alpha arbutin, and azelaic acid as safer long-term alternatives.
              Avoid purchasing unbranded "whitening" creams that often contain undisclosed
              concentrations of hydroquinone or topical steroids.
            </p>
          </div>

          <hr className="pg-rule" />

          {/* ── SECTION 3: Products ── */}
          <div className="section-block">
            <div className="section-block-num">03</div>
            <div className="section-block-text">
              <div className="section-block-label">The Products</div>
              <h2>What to Buy. All on Amazon India.</h2>
            </div>
          </div>

          <p>
            Every product below is selected on three criteria: correct active ingredient at clinically
            relevant concentration, fragrance-free formulation (fragrance triggers PIH in sensitive
            Indian skin), and verified long-term reviews on Amazon India. None of these appear anywhere
            else on this site.
          </p>

          <p>
            <strong>For melasma and hormonal pigmentation</strong> — start with tranexamic acid.
            It is the only OTC ingredient with clinical evidence specifically for the hormonally
            driven melasma mechanism. Use it at night. Always follow with SPF in the morning.
          </p>

          <div className="product-label">Tranexamic Acid — For Melasma & Hormonal Pigmentation</div>
          <div className="cards-row">
            <AffiliateCard asin="B0D45NXZDZ" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B08XC5LQ7B" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <p>
            <strong>For PIH and post-acne marks</strong> — alpha arbutin is the gentler, more
            targeted option. It specifically inhibits tyrosinase in melanocytes without affecting
            surrounding skin. More stable than kojic acid in Indian humidity and heat. Combine with
            your existing niacinamide if you have it.
          </p>

          <div className="product-label">Alpha Arbutin — For PIH & Post-Acne Marks</div>
          <div className="cards-row">
            <AffiliateCard asin="B06XCZFCFZ" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B09W1JZ58K" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <p>
            <strong>For surface sun spots and tan patches</strong> — kojic acid works fastest on
            superficial melanin. It degrades quickly if not formulated properly (always choose
            opaque, airless packaging), but at 1–2% in a good base it delivers visible results
            in 4–6 weeks when paired with SPF.
          </p>

          <div className="product-label">Kojic Acid — For Sun Spots & Tanning</div>
          <div className="cards-row">
            <AffiliateCard asin="B0C4B98N79" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B09NDTG1NY" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <hr className="pg-rule" />

          {/* ── SECTION 4: The Routine ── */}
          <div className="section-block">
            <div className="section-block-num">04</div>
            <div className="section-block-text">
              <div className="section-block-label">The Protocol</div>
              <h2>How to Build the Routine Around These Actives.</h2>
            </div>
          </div>

          <p>
            Layering multiple pigmentation actives simultaneously sounds logical but frequently
            causes irritation — which in Indian skin triggers more PIH, making the problem worse.
            The correct approach is sequential: one active for 8 weeks, assess, then add if needed.
          </p>

          <div className="timeline">
            <div className="timeline-row">
              <div className="timeline-week">Weeks<br />1–2</div>
              <div className="timeline-content">
                <div className="timeline-title">Introduction Phase</div>
                <div className="timeline-text">Use your chosen active every other night only. This allows the skin barrier to adjust. Apply a thin layer after cleansing, before moisturiser. Morning: SPF 50 PA++++ without fail.</div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-week">Weeks<br />3–8</div>
              <div className="timeline-content">
                <div className="timeline-title">Active Phase</div>
                <div className="timeline-text">Increase to nightly use if no irritation in weeks 1–2. Do not layer multiple actives yet. At week 4, take a photograph in consistent lighting to compare against your starting point.</div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-week">Weeks<br />9–12</div>
              <div className="timeline-content">
                <div className="timeline-title">Assessment & Addition</div>
                <div className="timeline-text">If improvement is visible, continue. If PIH and melasma are both concerns, now add a second active on alternate nights. Never skip SPF — unprotected UV exposure resets weeks of progress in days.</div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-week">Week<br />12+</div>
              <div className="timeline-content">
                <div className="timeline-title">Maintenance</div>
                <div className="timeline-text">Once pigmentation is controlled, reduce active use to 2–3 nights weekly. Aggressive daily use of actives over extended periods can compromise the skin barrier. Maintenance, not escalation.</div>
              </div>
            </div>
          </div>

          <div className="tip-box">
            <div className="box-label">The Rule That Overrides Everything</div>
            <p>
              You can use every active on this list perfectly and still see zero improvement if
              you skip sunscreen. UV exposure directly reactivates melanocyte production and will
              undo the effect of your active within 48 hours of unprotected sun exposure.
              SPF 50 PA++++ applied every morning is not optional in this routine. It is the
              treatment. Everything else supports it.
            </p>
          </div>

          <hr className="pg-rule" />

          {/* ── WHAT NOT TO DO ── */}
          <div className="section-block">
            <div className="section-block-num">05</div>
            <div className="section-block-text">
              <div className="section-block-label">Common Mistakes</div>
              <h2>What Indian Skin Should Never Do for Pigmentation.</h2>
            </div>
          </div>

          <p>
            <strong>Don't use physical scrubs on PIH.</strong> Walnut, apricot, and sugar scrubs cause
            micro-tears in the skin and trigger inflammatory responses that produce more pigmentation.
            If you want exfoliation, use a low-percentage AHA (lactic acid 5%) as a chemical exfoliant
            once weekly.
          </p>
          <p>
            <strong>Don't start with retinol for pigmentation.</strong> Retinol is excellent for
            long-term skin renewal but causes significant purging and irritation in the first 6–8 weeks
            — both of which cause PIH in Indian skin. Establish your pigmentation actives first.
            Retinol can be introduced after 3 months of barrier stabilisation.
          </p>
          <p>
            <strong>Don't use lemon juice, turmeric, or raw potato on your face.</strong> These are
            cited in every home remedy list. Lemon juice at its natural pH (2–3) causes chemical burns.
            Turmeric stains. Uncontrolled acids on Indian skin trigger reactive pigmentation.
            There is no clinical evidence for any of these treatments and significant evidence of harm.
          </p>
          <p>
            <strong>Don't buy products marketed as "fairness" or "whitening."</strong> These terms
            are not regulated. The products often contain undisclosed topical steroids or high
            concentrations of kojic acid without barrier support, causing steroid-induced skin
            thinning and eventual rebound darkening.
          </p>

          {/* ── CTA ── */}
          <div className="pg-cta">
            <div className="pg-cta-inner">
              <h2>Consistent. Patient.<br />Sun-Protected.</h2>
              <p>
                Pigmentation doesn't vanish in a week. But with the right active for your specific type
                and SPF every morning — it fades, reliably.
              </p>
              <div className="pg-cta-note">All products linked above · Amazon India · skinwithtanvi-21</div>
            </div>
          </div>

          <div className="disclosure">
            <div className="disclosure-label">Affiliate Disclosure</div>
            <p>
              This post contains affiliate links to Amazon India (Store ID: skinwithtanvi-21). Purchases
              made through these links earn Mirha &amp; Co. a small commission at no extra cost to you.
              Product selection is based solely on ingredient science, dermatologist guidance, and
              verified Amazon India customer reviews. No products are gifted or sponsored.
            </p>
          </div>

        </main>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}

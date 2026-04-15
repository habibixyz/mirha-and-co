"use client";

import { useState } from "react";
import { AffiliateCard } from "@/components/AffiliateCard";
import ProductModal from "@/components/ProductModal";

const TAG = "skinwithtanvi-21";

export default function HardWaterHairPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .hw-wrap * { box-sizing: border-box; }

        /* ── HERO ── */
        .hw-hero {
          background: var(--black, #111);
          padding: 8rem 2rem 6rem;
          position: relative;
          overflow: hidden;
        }
        .hw-hero::after {
          content: 'HARD';
          position: absolute;
          right: -2rem;
          bottom: -5rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28rem;
          color: rgba(255,255,255,0.022);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .hw-hero-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .hw-eyebrow {
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
        .hw-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 1px;
          background: var(--rose, #c0392b);
        }
        .hw-hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.2rem, 8vw, 7rem);
          color: #fff;
          line-height: 0.9;
          letter-spacing: 0.02em;
          margin: 0 0 2rem;
        }
        .hw-hero h1 em { color: var(--rose, #c0392b); font-style: normal; display: block; }
        .hw-hero-meta {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .hw-hero-meta span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .hw-hero-meta strong { color: rgba(255,255,255,0.55); font-weight: 500; }
        .hw-tag {
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

        /* ── STATS STRIP ── */
        .stats-strip {
          background: var(--rose, #c0392b);
        }
        .stats-strip-inner {
          max-width: 780px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .stat-item {
          padding: 2.2rem 1.5rem;
          border-right: 1px solid rgba(255,255,255,0.15);
          text-align: center;
        }
        .stat-item:last-child { border-right: none; }
        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.8rem;
          color: #fff;
          line-height: 1;
          margin-bottom: 0.4rem;
          letter-spacing: 0.02em;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.4;
          letter-spacing: 0.05em;
        }

        /* ── BODY ── */
        .hw-body {
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
        .hw-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          line-height: 1.9;
          color: #2c2826;
          margin-bottom: 1.6rem;
        }
        .hw-body p strong { font-weight: 500; color: #111; }

        /* ── SECTION HEADING ── */
        .section-block {
          margin: 4rem 0 2rem;
          padding-bottom: 1.4rem;
          border-bottom: 3px solid var(--black, #111);
          display: flex;
          align-items: flex-end;
          gap: 1.4rem;
        }
        .section-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4.5rem;
          color: var(--rose, #c0392b);
          line-height: 0.85;
          opacity: 0.2;
          flex-shrink: 0;
        }
        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--rose, #c0392b);
          margin-bottom: 0.3rem;
        }
        .section-h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: var(--black, #111);
          line-height: 0.95;
          letter-spacing: 0.02em;
          margin: 0;
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
        .science-box p, .warn-box p, .tip-box p, .city-box p {
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
        .city-box {
          background: #111;
          border-radius: 4px;
          padding: 1.6rem 1.8rem;
          margin: 2rem 0;
        }
        .city-box .box-label { color: var(--rose, #c0392b); }
        .city-box p { color: rgba(255,255,255,0.5) !important; }
        .city-box strong { color: rgba(255,255,255,0.85) !important; font-weight: 500; }

        /* ── SYMPTOM CHECKLIST ── */
        .symptom-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0 2rem;
          border: 1px solid #e8e4de;
          border-radius: 4px;
          overflow: hidden;
        }
        .symptom-list li {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 1.2rem;
          border-bottom: 1px solid #e8e4de;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #2c2826;
          line-height: 1.5;
        }
        .symptom-list li:last-child { border-bottom: none; }
        .symptom-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--rose, #c0392b);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          font-size: 10px;
          color: #fff;
          font-weight: bold;
        }

        /* ── PROTOCOL STEPS ── */
        .protocol-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 2px solid var(--black, #111);
          margin: 2rem 0;
        }
        .protocol-item {
          padding: 2rem;
          border-right: 1px solid #e8e4de;
          border-bottom: 1px solid #e8e4de;
        }
        .protocol-item:nth-child(2n) { border-right: none; }
        .protocol-item:nth-child(3), .protocol-item:nth-child(4) { border-bottom: none; }
        .protocol-freq {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.12em;
          color: var(--rose, #c0392b);
          margin-bottom: 0.5rem;
        }
        .protocol-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
          color: var(--black, #111);
          margin-bottom: 0.6rem;
        }
        .protocol-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: #6a635d;
          line-height: 1.65;
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

        /* ── SECTION RULE ── */
        .hw-rule { border: none; border-top: 1px solid #e8e4de; margin: 4rem 0; }

        /* ── FINAL CTA ── */
        .hw-cta {
          background: var(--rose, #c0392b);
          padding: 4rem 2.5rem;
          margin: 3rem 0 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hw-cta::before {
          content: 'HAIR';
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
        .hw-cta-inner { position: relative; z-index: 1; }
        .hw-cta h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          color: #fff;
          line-height: 0.95;
          margin: 0 0 1rem;
          letter-spacing: 0.02em;
        }
        .hw-cta p {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.72);
          max-width: 420px;
          margin: 0 auto 1.5rem;
          line-height: 1.65;
        }
        .hw-cta-note {
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
          .hw-hero { padding: 4rem 1.5rem 3rem; }
          .hw-body { padding: 3rem 1.5rem 4rem; }
          .stats-strip-inner { grid-template-columns: 1fr; }
          .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.15); }
          .protocol-grid { grid-template-columns: 1fr; }
          .protocol-item { border-right: none !important; }
          .protocol-item:nth-child(3), .protocol-item:nth-child(4) { border-bottom: 1px solid #e8e4de !important; }
          .protocol-item:last-child { border-bottom: none !important; }
        }
      `}</style>

      <div className="hw-wrap">

        {/* ── HERO ── */}
        <section className="hw-hero">
          <div className="hw-hero-inner">
            <div className="hw-eyebrow">Hair Care · India Guide</div>
            <h1>
              Why Your Hair<br />
              Won't Stop<br />
              <em>Falling Out.</em>
            </h1>
            <div className="hw-hero-meta">
              <span><strong>Mirha &amp; Co.</strong></span>
              <span>2,300 words</span>
              <span>11 min read</span>
              <span className="hw-tag">Hard Water Specific</span>
              <span className="hw-tag">India Cities</span>
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <div className="stats-strip">
          <div className="stats-strip-inner">
            <div className="stat-item">
              <div className="stat-num">85%</div>
              <div className="stat-label">of Indian urban households receive hard water</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">3×</div>
              <div className="stat-label">higher mineral deposit rate vs soft water in 6 months</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">200+</div>
              <div className="stat-label">mg/L average calcium hardness in Delhi, Bengaluru, Chennai</div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <main className="hw-body">

          <p className="standfirst">
            If your hair has progressively become drier, duller, and more prone to breakage since you
            moved cities — or since you started washing it more often — there's a high probability the
            water is the problem. Hard water is India's most underdiagnosed hair care issue, and
            almost no mainstream product range is formulated to address it.
          </p>

          <p>
            Most hair fall guides focus on diet, stress, and hormones. These matter. But if you're
            doing everything right and still losing more hair than usual, the invisible culprit is
            almost certainly the mineral content of your tap water. This guide explains the chemistry,
            identifies the cities with the worst hard water profiles, and gives you a practical
            protocol with the specific products that actually chelate mineral buildup from Indian hair.
          </p>

          <div className="city-box">
            <div className="box-label">Hardness Levels in Major Indian Cities</div>
            <p>
              <strong>Very Hard (200–500+ mg/L):</strong> Delhi, Bengaluru, Chennai, Hyderabad, Jaipur, Ahmedabad — calcium and magnesium deposits form rapidly on hair and scalp.<br /><br />
              <strong>Moderately Hard (100–200 mg/L):</strong> Mumbai (varies by zone), Pune, Kolkata, Chandigarh — buildup is slower but cumulative over months.<br /><br />
              <strong>Relatively Soft (&lt;100 mg/L):</strong> Parts of Assam, Kerala, northeast states — less mineral concern, but chlorine and iron from municipal treatment still affect hair.
            </p>
          </div>

          <hr className="hw-rule" />

          {/* ── SECTION 1 ── */}
          <div className="section-block">
            <div className="section-num">01</div>
            <div>
              <div className="section-label">The Problem</div>
              <h2 className="section-h2">What Hard Water Actually Does to Your Hair.</h2>
            </div>
          </div>

          <p>
            Hard water contains elevated concentrations of calcium (Ca²⁺) and magnesium (Mg²⁺) ions.
            When water evaporates off your hair after washing, these ions don't evaporate — they stay
            behind, bonding to the negatively charged surface of the hair strand. Over weeks and months,
            this mineral film builds up in layers on the hair shaft and inside the scalp's follicle openings.
          </p>
          <p>
            The consequences are cumulative and progressively worse the longer the issue goes unaddressed:
          </p>

          <ul className="symptom-list">
            <li>
              <div className="symptom-check">✓</div>
              <div><strong>Hair feels rough and straw-like even after conditioning.</strong> Mineral deposits raise the hair cuticle, creating friction between strands. No amount of conditioner repairs this because the conditioner itself can't penetrate the mineral coating.</div>
            </li>
            <li>
              <div className="symptom-check">✓</div>
              <div><strong>Products stop working the way they used to.</strong> Serums, masks, and conditioners are blocked from reaching the hair cortex by the mineral film. If your hair care has become progressively less effective, buildup is likely why.</div>
            </li>
            <li>
              <div className="symptom-check">✓</div>
              <div><strong>Persistent dullness that washing doesn't fix.</strong> Mineral deposits scatter light rather than reflecting it, which is why hard water hair looks flat regardless of how clean it is.</div>
            </li>
            <li>
              <div className="symptom-check">✓</div>
              <div><strong>Increased hair fall and breakage at the mid-shaft.</strong> Calcium deposits make hair brittle by displacing moisture from within the strand. Breakage is different from root-level hair fall — if the hair snaps in the middle, not at the root, this is the profile.</div>
            </li>
            <li>
              <div className="symptom-check">✓</div>
              <div><strong>Scalp itch and flakiness that returns quickly after washing.</strong> Calcium and magnesium interact with shampoo surfactants to form scum (the same film you see on shower tiles) that deposits on the scalp and clogs follicle openings.</div>
            </li>
          </ul>

          <div className="science-box">
            <div className="box-label">The Research</div>
            <p>
              A 2016 study published in the <em>International Journal of Trichology</em> conducted a
              controlled comparison of hair samples from women using hard water (252 mg/L) versus
              distilled water over 30 days. Hair treated with hard water showed a statistically
              significant decrease in tensile strength — the force required to break the hair strand —
              and significantly increased surface roughness under scanning electron microscopy. The
              authors concluded that hard water exposure is a clinically relevant contributor to hair
              breakage and mechanical damage in populations with high mineral water exposure.
            </p>
            <cite>Srinivasan G, et al. Int J Trichology. 2016;8(3):99–103.</cite>
          </div>

          <hr className="hw-rule" />

          {/* ── SECTION 2 ── */}
          <div className="section-block">
            <div className="section-num">02</div>
            <div>
              <div className="section-label">The Solution</div>
              <h2 className="section-h2">Chelating: The Only Thing That Actually Removes Mineral Buildup.</h2>
            </div>
          </div>

          <p>
            Regular shampoos — even premium, sulphate-free ones — are not designed to remove mineral
            deposits. Their surfactants are formulated to remove sebum, dirt, and product residue.
            Calcium and magnesium ions require a different mechanism entirely: chelation.
          </p>
          <p>
            Chelating agents (from the Greek <em>chele</em>, meaning claw) work by binding to metal
            ions and lifting them off the hair surface, so they rinse away with water. The most
            effective chelating agents in hair care are <strong>EDTA (ethylenediaminetetraacetic acid)</strong>
            and its derivatives, <strong>citric acid</strong>, and <strong>gluconic acid</strong>.
            Look for these in the ingredient list of any shampoo marketed for hard water or clarifying use.
          </p>

          <div className="warn-box">
            <div className="box-label">Why Regular Clarifying Shampoos Aren't Enough</div>
            <p>
              Most clarifying shampoos use higher concentrations of sulphates (SLS/SLES) to remove
              product buildup. These will strip oil and surface residue but will not chelate mineral
              ions bonded to the hair surface. If your shampoo doesn't specifically list EDTA, citric
              acid, or gluconic acid as ingredients, it is not chelating hard water minerals from
              your hair — regardless of what the label says.
            </p>
          </div>

          <p>
            Chelating shampoos should be used <strong>once a week</strong> for maintenance, or
            twice weekly if you're in Delhi, Bengaluru, Chennai, or Hyderabad (very hard water zones).
            They are strong — using them daily strips the hair of all protective coating. Pair every
            chelating wash with a protein or moisture-rich conditioner to restore what the chelating
            process removes alongside the minerals.
          </p>

          <hr className="hw-rule" />

          {/* ── SECTION 3: Products ── */}
          <div className="section-block">
            <div className="section-num">03</div>
            <div>
              <div className="section-label">The Products</div>
              <h2 className="section-h2">The Complete Hard Water Hair Protocol. All on Amazon India.</h2>
            </div>
          </div>

          <p>
            The protocol has four components: a chelating shampoo for mineral removal, a
            protein-based or bonding conditioner to repair damage, a scalp treatment to address
            follicle congestion, and a lightweight leave-in or serum to seal the cuticle between
            washes. None of these brands appear elsewhere on this site.
          </p>

          <p>
            <strong>Step 1: The Chelating Shampoo.</strong> This is the foundation. Use it once
            or twice weekly. Let it sit on the scalp and lengths for 2–3 minutes before rinsing
            to allow the chelating agents to work. The rest of the week, use your regular shampoo.
          </p>

          <div className="product-label">Chelating Shampoos — Weekly Mineral Removal</div>
          <div className="cards-row">
            <AffiliateCard asin="B09M8NN8DQ" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B0DT76HL84" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <p>
            <strong>Step 2: The Repair Conditioner.</strong> After a chelating wash, the hair
            cuticle is fully open and briefly vulnerable. Apply a protein conditioner from mid-length
            to ends immediately. Do not skip this step — chelating without conditioning leaves hair
            drier than before you started.
          </p>

          <div className="product-label">Repair Conditioners — Use After Every Chelating Wash</div>
          <div className="cards-row">
            <AffiliateCard asin="B0BGKX6Z45" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B0FWKGNZRJ" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <p>
            <strong>Step 3: The Scalp Treatment.</strong> Hard water deposits clog the follicle
            openings on the scalp, contributing to scalp itch, flakiness, and hair fall at the
            root. A weekly scalp serum with salicylic acid or zinc pyrithione clears this congestion.
            Apply to the scalp (not the lengths) 30 minutes before your chelating shampoo wash.
          </p>

          <div className="product-label">Scalp Treatments — Weekly Pre-Wash Application</div>
          <div className="cards-row">
            <AffiliateCard asin="B08GG9M863" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B07NDR2J4K" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <p>
            <strong>Step 4: The Cuticle Sealer.</strong> A lightweight, silicone-free hair serum
            or leave-in conditioner applied to damp hair after washing seals the cuticle and
            creates a barrier that reduces the speed of new mineral adhesion. This doesn't prevent
            buildup — only chelating does — but it slows the rate, meaning your chelating wash
            doesn't need to work as hard each time.
          </p>

          <div className="product-label">Leave-In Serums — Daily Cuticle Protection</div>
          <div className="cards-row">
            <AffiliateCard asin="B07P7N1YM2" onClick={setSelectedProduct} tag={TAG} />
            <AffiliateCard asin="B093LMJFVH" onClick={setSelectedProduct} tag={TAG} />
          </div>

          <hr className="hw-rule" />

          {/* ── SECTION 4: Protocol ── */}
          <div className="section-block">
            <div className="section-num">04</div>
            <div>
              <div className="section-label">The Weekly Schedule</div>
              <h2 className="section-h2">How to Structure the Whole Protocol.</h2>
            </div>
          </div>

          <div className="protocol-grid">
            <div className="protocol-item">
              <div className="protocol-freq">Once Weekly (or Twice in Very Hard Water Cities)</div>
              <div className="protocol-title">Chelating Wash Day</div>
              <div className="protocol-text">
                Apply scalp treatment 30 min before washing. Shampoo with chelating shampoo, leave for 3 min. Follow immediately with repair conditioner on mid-lengths and ends. Air dry if possible — heat styling draws minerals deeper into the shaft.
              </div>
            </div>
            <div className="protocol-item">
              <div className="protocol-freq">Remaining Wash Days</div>
              <div className="protocol-title">Regular Wash Days</div>
              <div className="protocol-text">
                Use your normal gentle shampoo. Follow with a lightweight conditioner. Apply leave-in serum to damp hair before styling. Do not use the chelating shampoo daily — it is too strong for frequent use.
              </div>
            </div>
            <div className="protocol-item">
              <div className="protocol-freq">Monthly</div>
              <div className="protocol-title">Deep Treatment</div>
              <div className="protocol-text">
                Replace conditioner with a protein hair mask on chelating wash day. Apply to all lengths, cover with a shower cap for 20 minutes before rinsing. This addresses accumulated structural damage from months of mineral exposure.
              </div>
            </div>
            <div className="protocol-item">
              <div className="protocol-freq">Long-Term Investment</div>
              <div className="protocol-title">Shower Head Filter</div>
              <div className="protocol-text">
                The most effective intervention for very hard water cities. Inline shower filters (vitamin C or KDF type) reduce mineral content at the source. This is not a product recommendation — search Amazon India for "shower head filter hard water." It is the most efficient long-term fix available.
              </div>
            </div>
          </div>

          <div className="tip-box">
            <div className="box-label">The Vinegar Rinse — Free and Effective</div>
            <p>
              Apple cider vinegar (diluted 1:10 in water) used as a post-wash rinse chelates mild
              mineral deposits through acidity and helps restore hair's natural pH of 4.5–5.5, which
              seals the cuticle. It's not a substitute for a proper chelating shampoo on its own, but
              used alongside your regular wash days it meaningfully slows mineral buildup. Pour over
              hair after conditioning, leave 2 minutes, rinse thoroughly.
            </p>
          </div>

          <hr className="hw-rule" />

          {/* ── SECTION 5 ── */}
          <div className="section-block">
            <div className="section-num">05</div>
            <div>
              <div className="section-label">The Timeline</div>
              <h2 className="section-h2">What to Expect and When.</h2>
            </div>
          </div>

          <p>
            <strong>After 2–3 chelating washes:</strong> Hair feels noticeably lighter and softer.
            Products work better — conditioner actually absorbs rather than sitting on top. Shine
            returns. Scalp itch reduces.
          </p>
          <p>
            <strong>After 4–6 weeks:</strong> Hair fall from mid-shaft breakage reduces as tensile
            strength improves. Root-level hair fall may persist if the underlying cause is nutritional,
            hormonal, or stress-related — chelating addresses mineral damage but not those factors.
          </p>
          <p>
            <strong>After 3 months:</strong> Cumulative improvement in hair texture and density.
            At this point, you'll need to assess whether twice-weekly chelating is still necessary,
            or whether once-weekly maintenance is sufficient. Reassess based on how quickly dullness
            and roughness return between washes.
          </p>

          <div className="warn-box">
            <div className="box-label">When to See a Dermatologist</div>
            <p>
              If hair fall is significant (more than 150–200 strands daily), root-level shedding
              rather than mid-shaft breakage, or accompanied by scalp inflammation, patchy loss,
              or itching that doesn't respond to the protocol above — consult a dermatologist.
              Alopecia areata, androgenetic alopecia, scalp psoriasis, and telogen effluvium all
              present as hair fall but require medical intervention, not a chelating shampoo.
              Hard water is one cause among many — this guide addresses the one most frequently
              missed, not all of them.
            </p>
          </div>

          {/* ── CTA ── */}
          <div className="hw-cta">
            <div className="hw-cta-inner">
              <h2>Fix the Water.<br />Fix the Hair.</h2>
              <p>
                The issue isn't what you're putting on your hair. It's what the water has been
                leaving behind. One chelating wash weekly and the right conditioner changes the
                situation within three washes.
              </p>
              <div className="hw-cta-note">All products linked above · Amazon India · skinwithtanvi-21</div>
            </div>
          </div>

          <div className="disclosure">
            <div className="disclosure-label">Affiliate Disclosure</div>
            <p>
              This post contains affiliate links to Amazon India (Store ID: skinwithtanvi-21). Purchases
              made through these links earn Mirha &amp; Co. a small commission at no extra cost to you.
              Product selection is based on ingredient science, clinical research, and verified Amazon
              India customer reviews. No products are gifted or sponsored.
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

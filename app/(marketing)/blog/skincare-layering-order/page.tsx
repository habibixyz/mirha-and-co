"use client";

import { useState } from "react";
import { AffiliateCard } from "@/components/AffiliateCard";
import ProductModal from "@/components/ProductModal";

const AFFILIATE_TAG = "skinwithtanvi-21";

export default function SkincareOrderPost() {
  return (
    <main>
      <style>{`
        .post-hdr { background: var(--black); padding: 6rem 2.5rem 4rem; position: relative; overflow: hidden; }
        .post-hdr::before { content: 'BEAUTY'; position: absolute; bottom: -2rem; right: -1rem; font-family: 'Bebas Neue', sans-serif; font-size: 12rem; color: rgba(255,255,255,0.03); line-height: 1; pointer-events: none; }
        .post-hdr-inner { max-width: 780px; margin: 0 auto; position: relative; z-index: 1; }
        .post-badge { display: inline-block; background: var(--rose); color: #fff; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500; padding: 0.3rem 0.8rem; margin-bottom: 1.8rem; font-family: 'DM Sans', sans-serif; }
        .post-headline { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.6rem); color: var(--white); line-height: 1.08; margin-bottom: 1.5rem; }
        .post-stand { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.05rem; color: rgba(255,255,255,0.55); line-height: 1.75; margin-bottom: 2rem; max-width: 620px; }
        .post-meta { display: flex; align-items: center; gap: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.12); font-size: 0.68rem; color: rgba(255,255,255,0.35); letter-spacing: 0.12em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; flex-wrap: wrap; }
        .post-body { max-width: 780px; margin: 0 auto; padding: 4rem 2.5rem 6rem; }
        .post-body p { font-size: 1rem; line-height: 1.9; color: #2c2826; margin-bottom: 1.6rem; font-family: 'DM Sans', sans-serif; }
        .post-body h2 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.05em; color: var(--black); margin: 3.5rem 0 1rem; padding-top: 3rem; border-top: 2px solid var(--rule); }
        .post-body h3 { font-family: 'DM Serif Display', serif; font-size: 1.3rem; font-style: italic; margin: 2rem 0 0.7rem; color: var(--ink); }
        .highlight-box { background: var(--sand); border-left: 4px solid var(--rose); padding: 1.5rem 2rem; margin: 2rem 0; }
        .highlight-box p { margin-bottom: 0; font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.1rem; color: var(--ink); line-height: 1.6; }
        .step-grid { display: grid; gap: 0; margin: 2rem 0; border: 1px solid var(--rule); }
        .step-row { display: grid; grid-template-columns: 4rem 1fr; border-bottom: 1px solid var(--rule); }
        .step-row:last-child { border-bottom: none; }
        .step-row.highlight-row { background: var(--black); }
        .step-n { display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; color: var(--rose); border-right: 1px solid var(--rule); padding: 1.2rem; }
        .step-row.highlight-row .step-n { color: var(--rose); border-right-color: rgba(255,255,255,0.1); }
        .step-info { padding: 1.2rem 1.5rem; }
        .step-title { font-family: 'DM Serif Display', serif; font-size: 1rem; color: var(--ink); margin-bottom: 0.3rem; }
        .step-row.highlight-row .step-title { color: var(--white); }
        .step-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.6; font-family: 'DM Sans', sans-serif; }
        .step-row.highlight-row .step-desc { color: rgba(255,255,255,0.55); }
        .step-tag { display: inline-block; background: var(--rose); color: #fff; font-size: 0.52rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.15rem 0.5rem; margin-bottom: 0.4rem; font-family: 'DM Sans', sans-serif; }
        .verdict-box { background: var(--black); padding: 2.5rem; margin: 2.5rem 0; }
        .verdict-label { font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; letter-spacing: 0.1em; color: var(--rose); margin-bottom: 1rem; }
        .verdict-text { font-size: 0.95rem; color: rgba(255,255,255,0.75); line-height: 1.8; font-family: 'DM Sans', sans-serif; }
        .nav-back { display: block; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; margin: 1.5rem 2.5rem; font-family: 'DM Sans', sans-serif; }
        .nav-back:hover { color: var(--rose); }
        @media (max-width: 768px) { .post-hdr { padding: 3.5rem 1.5rem 2.5rem; } .post-body { padding: 2.5rem 1.5rem 4rem; } .nav-back { margin: 1rem 1.5rem; } .step-row { grid-template-columns: 3rem 1fr; } }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">Beauty · Skincare</span>
          <h1 className="post-headline">
            The Right Order to Apply Your Skincare<br />(Most People Get This Wrong)
          </h1>
          <p className="post-stand">
            Layering skincare in the wrong order means your most expensive products
            never actually absorb. Here's the correct sequence — and the logic behind it.
          </p>
          <div className="post-meta">
            <span>Jan 2026</span>
            <span>5 min read</span>
            <span>Research-based</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">

        <p>
          The most common skincare mistake in India isn't buying the wrong product —
          it's applying the right products in the wrong order. A thick moisturiser
          applied before a serum creates a physical barrier the serum can't penetrate.
          You're essentially applying an expensive product to the outside of your
          moisturiser, not your skin.
        </p>

        <p>
          The rule is simple and applies to every routine regardless of how many
          products you use: <strong>thinnest texture first, thickest last.</strong>
          Lighter products need direct contact with skin to absorb. Heavier ones
          seal everything in.
        </p>

        <div className="highlight-box">
          <p>
            Sequence matters more than the number of products. A three-step routine
            in the right order outperforms a ten-step routine applied randomly.
          </p>
        </div>

        <h2>The Complete Order</h2>

        <div className="step-grid">
          <div className="step-row">
            <div className="step-n">1</div>
            <div className="step-info">
              <p className="step-title">Cleanser</p>
              <p className="step-desc">
                Morning: a gentle, non-stripping cleanser or just water if your skin
                isn't oily. Evening: if you've worn SPF or makeup, double cleanse —
                oil cleanser first to dissolve it, then a water-based cleanser to clear
                the rest. Starting with dirty skin means everything after absorbs less effectively.
              </p>
            </div>
          </div>
          <div className="step-row">
            <div className="step-n">2</div>
            <div className="step-info">
              <p className="step-title">Toner (if you use one)</p>
              <p className="step-desc">
                Optional — but if you use one, it goes here. Hydrating toners add
                a layer of moisture before serums. Exfoliating toners (AHA/BHA) go
                here too, but not at the same time as other actives. Keep it simple:
                if your routine has strong actives, skip the toner.
              </p>
            </div>
          </div>
          <div className="step-row">
            <div className="step-n">3</div>
            <div className="step-info">
              <p className="step-title">Serums — thinnest first</p>
              <p className="step-desc">
                If using multiple serums, apply the most watery texture first. Vitamin C
                in the morning (antioxidant protection before sun exposure). Niacinamide
                can go morning or night. Retinol and AHAs strictly at night. Wait
                30–60 seconds between serums for proper absorption.
              </p>
            </div>
          </div>
          <div className="step-row">
            <div className="step-n">4</div>
            <div className="step-info">
              <p className="step-title">Eye Cream</p>
              <p className="step-desc">
                Goes before moisturiser — the eye area needs targeted treatment before
                a heavier product seals it. Pat gently with your ring finger. Never rub.
                The skin around the eyes is the thinnest on your face.
              </p>
            </div>
          </div>
          <div className="step-row">
            <div className="step-n">5</div>
            <div className="step-info">
              <p className="step-title">Moisturiser</p>
              <p className="step-desc">
                Seals everything applied underneath it. Choose the texture based on
                your skin type — gel or gel-cream for oily skin (particularly important
                in Indian summers), cream for dry or normal skin. Don't skip this even
                if your skin is oily — dehydrated oily skin produces more sebum to compensate.
              </p>
            </div>
          </div>
          <div className="step-row highlight-row">
            <div className="step-n">6</div>
            <div className="step-info">
              <div className="step-tag">Morning only — Never skip</div>
              <p className="step-title">SPF — Always Last in the Morning</p>
              <p className="step-desc">
                SPF goes on last, every single morning, regardless of whether you're
                going outside. UV rays come through windows. They're present on cloudy
                days. The Indian UV index is high year-round. SPF is the single most
                evidence-backed anti-ageing and pigmentation-prevention step in any
                routine — more impactful than any serum you can buy.
              </p>
            </div>
          </div>
        </div>

        <h2>The One Product Worth Getting Right</h2>

        <p>
          Of every step in the morning routine, SPF is the one where the product
          choice matters most. A good SPF should feel comfortable enough that you'll
          actually wear it every day — because a perfect SPF you skip is worthless.
          In India, that means no white cast, no greasiness, and something lightweight
          enough for humid weather.
        </p>

        <AffiliateCard
          title="La Roche-Posay Anthelios SPF 50+ UV Fluid"
          description="Dermatologist-recommended SPF 50+ in a fluid texture — no white cast, absorbs quickly, and works as a light moisturiser base. Developed specifically for sensitive skin and suitable for the Indian climate year-round. Goes on last every morning. The SPF most Indian dermatologists actually recommend to patients."
          price="₹1,850"
          asin="B0BWSJGBHW"
          affiliateTag={AFFILIATE_TAG}
          badge="Last Step, Every Day"
        />

        <h2>Common Mistakes</h2>

        <h3>Applying SPF before moisturiser</h3>
        <p>
          SPF always goes last in the morning. Applying anything over it dilutes
          the UV filter and reduces its efficacy. Moisturiser first, SPF after —
          every time.
        </p>

        <h3>Not waiting between layers</h3>
        <p>
          30–60 seconds between each product is enough for most formulas to begin
          absorbing. Stacking products immediately means they mix on the surface
          rather than penetrating separately. Particularly important between
          vitamin C and niacinamide.
        </p>

        <h3>Using too many actives at once</h3>
        <p>
          Retinol + AHA + niacinamide + vitamin C in the same routine is too much.
          Actives work better in a focused routine. Two actives maximum in any
          single session. Save the rest for a different time of day or alternate nights.
        </p>

        <div className="verdict-box">
          <p className="verdict-label">The Routine That Works</p>
          <p className="verdict-text">
            <strong style={{color:"var(--white)"}}>Morning:</strong> Cleanser (optional) → Vitamin C serum → Moisturiser → SPF<br /><br />
            <strong style={{color:"var(--white)"}}>Evening:</strong> Oil cleanser → Water cleanser → Niacinamide or Retinol → Moisturiser<br /><br />
            That's it. Six products across two routines. In the right order.
            Everything else is optional once this is consistent.
          </p>
        </div>

      </article>

      <div style={{
  marginTop: "60px",
  padding: "20px 0",
  borderTop: "1px solid #eee",
  borderBottom: "1px solid #eee",
  textAlign: "center"
}}>
  <p style={{
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#999"
  }}>
    About this guide
  </p>

  <h4 style={{
    fontFamily: "'DM Serif Display', serif",
    margin: "8px 0",
    fontSize: "18px",
    fontWeight: 400
  }}>
    Curated by Mirha & Co.
  </h4>

  <p style={{
    fontSize: "13px",
    color: "#666",
    lineHeight: 1.6,
    maxWidth: "520px",
    margin: "0 auto"
  }}>
    We curate skincare products based on ingredient quality, real user reviews,
    and suitability for Indian skin and climate conditions. No paid placements —
    only products we genuinely believe are worth trying.
  </p>

  <p style={{
    fontSize: "11px",
    color: "#999",
    marginTop: "10px"
  }}>
    Affiliate links may earn us a commission at no extra cost to you.
  </p>
</div>
    </main>
  );
}

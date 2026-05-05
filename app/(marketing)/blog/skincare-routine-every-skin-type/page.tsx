import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "The Complete Skincare Routine for Every Skin Type: Real Products Under ₹1500",
  description:
    "Science-backed skincare routines for oily, dry, combination, sensitive, and ageing skin — using real products available on Amazon India, most under ₹1500.",
  openGraph: {
    title: "The Complete Skincare Routine for Every Skin Type — Real Products Under ₹1500",
    description:
      "Science-backed skincare routines for oily, dry, combination, sensitive, and ageing skin — using real products available on Amazon India, most under ₹1500.",
    type: "article",
    publishedTime: "2026-04-20",
  },
};

export default function SkincareRoutineEveryTypePage() {
  return (
    <main>
      <style>{`
        .post-hero {
          background: var(--black);
          padding: 6rem 2rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .post-hero::after {
          content: 'ROUTINE';
          position: absolute; right: -2rem; bottom: -5rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20rem; color: rgba(255,255,255,0.022);
          line-height: 1; pointer-events: none; user-select: none; white-space: nowrap;
        }
        .post-hero-inner { max-width: 780px; margin: 0 auto; position: relative; z-index: 1; }
        .post-eyebrow {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: 'DM Sans', sans-serif; font-size: 0.62rem;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--rose); margin-bottom: 1.6rem;
        }
        .post-eyebrow::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--rose); }
        .post-hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 7vw, 6rem);
          color: #fff; line-height: 0.92; letter-spacing: 0.02em; margin: 0 0 2rem;
        }
        .post-hero h1 em { color: var(--rose); font-style: normal; display: block; }
        .post-meta {
          display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;
          padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08);
        }
        .post-meta span { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; text-transform: uppercase; }
        .post-meta strong { color: rgba(255,255,255,0.55); font-weight: 500; }
        .post-tag { background: rgba(192,57,43,0.15); border: 1px solid rgba(192,57,43,0.3); color: var(--rose); font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.25rem 0.7rem; border-radius: 2px; }

        .post-body { max-width: 780px; margin: 0 auto; padding: 5rem 2rem 6rem; }
        .post-body p { font-family: 'DM Sans', sans-serif; font-size: 1.05rem; line-height: 1.9; color: #2c2826; margin-bottom: 1.6rem; }
        .post-body p strong { font-weight: 500; color: #111; }
        .post-body em { font-style: italic; }
        .post-body h2 {
          font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: var(--black); letter-spacing: 0.02em; line-height: 1;
          margin: 4rem 0 1.4rem; padding-top: 3rem; border-top: 2px solid var(--black);
        }
        .post-body h3 { font-family: 'DM Serif Display', serif; font-size: 1.25rem; color: var(--black); margin: 2.5rem 0 0.8rem; }
        .post-rule { border: none; border-top: 1px solid #e8e4de; margin: 3.5rem 0; }
        .post-body ul, .post-body ol { font-family: 'DM Sans', sans-serif; font-size: 1rem; line-height: 1.8; color: #2c2826; padding-left: 1.6rem; margin-bottom: 1.6rem; }
        .post-body li { margin-bottom: 0.5rem; }
        .post-body li strong { font-weight: 500; color: #111; }

        /* SKIN TYPE HEADER */
        .skin-type-block {
          background: var(--black); padding: 2rem 2.5rem;
          margin: 2.5rem 0 1.5rem; border-radius: 4px;
          display: flex; align-items: center; gap: 1.5rem;
        }
        .skin-type-num {
          font-family: 'Bebas Neue', sans-serif; font-size: 4rem;
          color: var(--rose); opacity: 0.3; line-height: 1; flex-shrink: 0;
        }
        .skin-type-title { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #fff; letter-spacing: 0.04em; margin: 0 0 0.3rem; }
        .skin-type-sub { font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: rgba(255,255,255,0.4); line-height: 1.5; }

        /* ROUTINE STEPS */
        .routine-steps { margin: 1.5rem 0 2rem; border: 1px solid #e8e4de; border-radius: 4px; overflow: hidden; }
        .routine-step { display: grid; grid-template-columns: 48px 1fr; border-bottom: 1px solid #e8e4de; }
        .routine-step:last-child { border-bottom: none; }
        .routine-step-num { background: var(--black); color: var(--rose); font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; display: flex; align-items: center; justify-content: center; }
        .routine-step-body { padding: 1rem 1.2rem; }
        .routine-step-label { font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: #bbb; margin-bottom: 0.3rem; }
        .routine-step-name { font-family: 'DM Serif Display', serif; font-size: 1rem; color: var(--black); margin-bottom: 0.2rem; }
        .routine-step-note { font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: #888; line-height: 1.5; }

        /* PRICE BOX */
        .price-box { background: #faf8f5; border: 1px solid #e8e4de; border-radius: 4px; padding: 1.4rem 1.8rem; margin: 1.5rem 0 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .price-box-label { font-family: 'DM Sans', sans-serif; font-size: 0.62rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.3rem; }
        .price-box-amount { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: var(--black); letter-spacing: 0.02em; }
        .price-box-note { font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: #888; max-width: 300px; line-height: 1.55; }

        /* INFO BOX */
        .info-box { background: #faf8f5; border-left: 3px solid var(--rose); padding: 1.4rem 1.8rem; margin: 2rem 0; border-radius: 0 4px 4px 0; }
        .info-box-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.6rem; }
        .info-box p { font-family: 'DM Sans', sans-serif; font-size: 0.9rem !important; color: #4a4340 !important; line-height: 1.75 !important; margin: 0 !important; }
        .info-box p strong { color: #111; font-weight: 500; }

        /* 4 vs 10 STEP TABLE */
        .step-table { width: 100%; border-collapse: collapse; font-family: 'DM Sans', sans-serif; margin: 1.5rem 0; }
        .step-table th { background: var(--black); color: #fff; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.8rem 1rem; text-align: left; }
        .step-table td { font-size: 0.88rem; padding: 0.8rem 1rem; border-bottom: 1px solid #e8e4de; color: #2c2826; line-height: 1.5; vertical-align: top; }
        .step-table tr:last-child td { border-bottom: none; }
        .step-table tr:nth-child(even) td { background: #faf8f5; }
        .step-table td:first-child { font-weight: 500; color: var(--rose); font-size: 0.82rem; white-space: nowrap; }

        /* FAQ */
        .faq-item { border-bottom: 1px solid #e8e4de; padding: 1.4rem 0; }
        .faq-item:last-child { border-bottom: none; }
        .faq-q { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: var(--black); margin-bottom: 0.6rem; }
        .faq-a { font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: #4a4340; line-height: 1.75; }
        .faq-a strong { font-weight: 500; color: #111; }

        /* CTA */
        .post-cta { background: var(--rose); padding: 3rem 2.5rem; margin: 3rem 0; border-radius: 4px; text-align: center; position: relative; overflow: hidden; }
        .post-cta::before { content: 'SKIN'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-family: 'Bebas Neue', sans-serif; font-size: 16rem; color: rgba(0,0,0,0.06); line-height: 1; pointer-events: none; user-select: none; white-space: nowrap; }
        .post-cta-inner { position: relative; z-index: 1; }
        .post-cta h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); color: #fff; letter-spacing: 0.02em; margin: 0 0 0.8rem; }
        .post-cta p { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1rem; color: rgba(255,255,255,0.7); max-width: 420px; margin: 0 auto 1.6rem; line-height: 1.65; }
        .post-cta a { display: inline-block; background: #fff; color: var(--black); font-family: 'DM Sans', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; padding: 0.9rem 2rem; border-radius: 2px; text-decoration: none; }
        .post-cta a:hover { background: var(--black); color: #fff; }

        /* FURTHER READING */
        .further-reading { background: var(--black); padding: 2.5rem; margin: 3.5rem 0 0; border-radius: 4px; }
        .further-reading-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 1.2rem; }
        .further-reading ul { list-style: none; padding: 0; margin: 0; }
        .further-reading li { border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0.8rem 0; }
        .further-reading li:last-child { border-bottom: none; }
        .further-reading a { font-family: 'DM Serif Display', serif; font-size: 0.95rem; color: #fff; text-decoration: none; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; line-height: 1.4; }
        .further-reading a:hover { color: var(--rose); }
        .further-reading a span { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; color: rgba(255,255,255,0.3); flex-shrink: 0; margin-top: 2px; }

        /* SOURCES + DISCLOSURE */
        .sources-section { border-top: 1px solid #e8e4de; margin-top: 4rem; padding-top: 2rem; }
        .sources-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: #aaa; margin-bottom: 1rem; }
        .sources-list { list-style: none; padding: 0; margin: 0; }
        .sources-list li { font-family: 'DM Sans', sans-serif; font-size: 0.8rem; color: #aaa; line-height: 1.65; padding: 0.6rem 0; border-bottom: 1px solid #f0ece6; }
        .sources-list li:last-child { border-bottom: none; }
        .sources-list a { color: var(--rose); text-decoration: underline; text-underline-offset: 2px; }
        .sources-list em { font-style: italic; color: #888; }
        .disclosure { margin-top: 3rem; padding: 1.2rem 1.5rem; border: 1px solid #e8e4de; border-radius: 4px; }
        .disclosure-label { font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.25em; text-transform: uppercase; color: #ccc; margin-bottom: 0.4rem; }
        .disclosure p { font-size: 0.78rem !important; color: #bbb !important; margin: 0 !important; line-height: 1.6 !important; }

        @media (max-width: 640px) {
          .post-hero { padding: 4rem 1.5rem 3rem; }
          .post-body { padding: 3rem 1.5rem 4rem; }
          .skin-type-block { padding: 1.5rem; gap: 1rem; }
          .skin-type-num { font-size: 2.8rem; }
          .price-box { flex-direction: column; }
          .further-reading { padding: 2rem 1.5rem; }
        }
      `}</style>

      {/* HERO */}
      <section className="post-hero">
        <div className="post-hero-inner">
          <div className="post-eyebrow">Beauty · Skincare · Routine Guides</div>
          <h1>
            Complete Skincare Routine<br />
            for Every Skin Type —<br />
            <em>Real Products Under ₹1500.</em>
          </h1>
          <div className="post-meta">
            <span><strong>Mirha &amp; Co.</strong></span>
            <span>20 April 2026</span>
            <span>14 min read</span>
            <span className="post-tag">Research-Backed</span>
            <span className="post-tag">India-Specific</span>
          </div>
        </div>
      </section>

      <article className="post-body">

        <p>Most skincare advice in India either oversimplifies ("use sunscreen and drink water") or overclaims ("this 12-step Korean routine will transform your skin in 7 days"). Neither helps. This guide does something different: it gives you a science-backed, 4-step routine for your specific skin type, using products verified to work in Indian conditions — humidity, hard water, pollution, and all — most of them under ₹1500 per product.</p>
        <p>Everything recommended here is available on Amazon India with thousands of verified customer reviews. No sponsored products, no paid placements. Just what works.</p>

        <hr className="post-rule" />

        <h2>What Is a Skincare Routine — and What It Isn't</h2>
        <p>A skincare routine is a consistent daily practice of cleansing, treating, moisturising, and protecting your skin. That is the entire brief. It is not a self-care ritual requiring fifteen products. It is not a multi-step system that takes forty minutes. For most people in most circumstances, four products applied consistently produce better results than twelve products applied sporadically.</p>
        <p>The clinical evidence supports this. A 2021 systematic review in the <em>Journal of the American Academy of Dermatology</em> found that simplified routines (3–5 steps) led to significantly higher adherence rates than complex multi-step regimens, and adherence was the strongest predictor of visible improvement — not product quality alone.</p>
        <p>What matters: the right products for your skin type, applied in the right order, consistently. This guide builds that for you.</p>

        <hr className="post-rule" />

        <h2>4-Step vs 10-Step: The Honest Answer</h2>

        <div style={{overflowX: "auto", margin: "1.5rem 0"}}>
          <table className="step-table">
            <thead>
              <tr><th>Approach</th><th>Products</th><th>Time</th><th>Best For</th><th>Results</th></tr>
            </thead>
            <tbody>
              <tr><td>4-Step Routine</td><td>Cleanser, Active, Moisturiser, SPF</td><td>5–7 min</td><td>Everyone — especially beginners and busy lifestyles</td><td>Full clinical benefit with high adherence</td></tr>
              <tr><td>6-Step Routine</td><td>+ Toner + Eye Cream</td><td>10–12 min</td><td>Intermediate users with specific concerns</td><td>Marginal improvement over 4-step</td></tr>
              <tr><td>10-Step Routine</td><td>Adds essence, sheet masks, ampoules, etc.</td><td>25–40 min</td><td>K-beauty enthusiasts with time and budget</td><td>Diminishing returns; low adherence risk</td></tr>
            </tbody>
          </table>
        </div>

        <p>The dermatological consensus is clear: steps beyond four are optional. The four non-negotiables are a gentle cleanser, a targeted active (serum), a moisturiser appropriate for your skin type, and SPF 50+ in the morning. Everything else — toners, essences, eye creams, mists — adds nuance but not fundamental change.</p>

        <div className="info-box">
          <div className="info-box-label">Morning vs Night</div>
          <p><strong>Morning:</strong> Cleanser → Active Serum → Moisturiser → SPF 50+. Always end with SPF — it is the step that determines whether everything else produces results.<br /><br /><strong>Night:</strong> Cleanser → Active Serum → Moisturiser. No SPF at night — UV protection is inactive and unnecessary. Night is when repair-focused actives (retinol, niacinamide) work most efficiently.</p>
        </div>

        <hr className="post-rule" />

        <h2>Routines by Skin Type</h2>

        {/* OILY SKIN */}
        <div className="skin-type-block">
          <div className="skin-type-num">01</div>
          <div>
            <div className="skin-type-title">Oily Skin</div>
            <div className="skin-type-sub">Shiny by 10am · Enlarged pores · Post-acne marks · Works harder in Indian humidity</div>
          </div>
        </div>

        <p>The biggest mistake oily skin makes in India: using aggressive products that strip oil, which triggers the skin to produce <em>more</em> oil as a compensatory response. The solution is a gentle cleanser, a sebum-regulating serum, and an oil-free moisturiser — in that specific order, every day.</p>

        <div className="routine-steps">
          <div className="routine-step">
            <div className="routine-step-num">1</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Cleanser · Morning &amp; Evening</div>
              <div className="routine-step-name">Simple Kind To Skin Moisturising Facial Wash</div>
              <div className="routine-step-note">Soap-free, Panthenol-enriched. Cleans without stripping — critical for oily skin that's also dehydrated underneath.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">2</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Serum · Morning &amp; Evening</div>
              <div className="routine-step-name">Minimalist 10% Niacinamide + Zinc Serum</div>
              <div className="routine-step-note">Reduces sebum at the gene expression level. Controls oil, minimises pores, fades acne marks. The most useful active for oily Indian skin.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">3</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Moisturiser · Morning &amp; Evening</div>
              <div className="routine-step-name">Neutrogena Hydro Boost Water Gel</div>
              <div className="routine-step-note">Oil-free gel moisturiser. Absorbs in seconds. Oily skin that skips this step produces even more oil — this breaks that cycle.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">4</div>
            <div className="routine-step-body">
              <div className="routine-step-label">SPF · Morning Only</div>
              <div className="routine-step-name">Deconstruct Gel Sunscreen SPF 50 PA++++</div>
              <div className="routine-step-note">4 next-gen UV filters. 100% photostable. Lightweight gel that doesn't pill under makeup. Built for oily and combination skin.</div>
            </div>
          </div>
        </div>

        <BlogProductCard asin="B00V4R0ET0" />
        <BlogProductCard asin="B0DH88LZ11" />
        <BlogProductCard asin="B00BQFTQW6" />
        <BlogProductCard asin="B0B45RB1RV" />

        <div className="price-box">
          <div>
            <div className="price-box-label">Total Routine Cost (approx.)</div>
            <div className="price-box-amount">₹1,957</div>
          </div>
          <div className="price-box-note">All 4 products last 2–3 months each at daily use. Monthly cost: approx. ₹1500–2000. Under ₹1500 per product on average.</div>
        </div>

        {/* DRY SKIN */}
        <div className="skin-type-block">
          <div className="skin-type-num">02</div>
          <div>
            <div className="skin-type-title">Dry Skin</div>
            <div className="skin-type-sub">Tight feeling · Flaking · Sensitivity · Reacts to active ingredients</div>
          </div>
        </div>

        <p>Dry skin in India is frequently caused or worsened by hard water — the calcium and magnesium deposits from tap water disrupt the skin's lipid barrier. The priority for dry skin is barrier repair first, actives second. A rich cleanser, deep hydration, and a barrier-repair moisturiser are non-negotiable before adding any brightening or anti-ageing actives.</p>

        <div className="routine-steps">
          <div className="routine-step">
            <div className="routine-step-num">1</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Cleanser · Morning &amp; Evening</div>
              <div className="routine-step-name">Cetaphil Gentle Skin Hydrating Face Wash</div>
              <div className="routine-step-note">Niacinamide and Vitamin B5 cleanser that actively supports the barrier while cleansing. India's most-reviewed beauty product for good reason.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">2</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Serum · Morning &amp; Evening</div>
              <div className="routine-step-name">The Ordinary Hyaluronic Acid 2% + B5</div>
              <div className="routine-step-note">Apply on damp skin. Triple-weight hyaluronic acid pulls moisture in from the environment. Panthenol (B5) supports skin barrier repair.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">3</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Moisturiser · Morning &amp; Evening</div>
              <div className="routine-step-name">Cetaphil Moisturising Cream 250g</div>
              <div className="routine-step-note">Dermatologist gold standard for dry skin. Fragrance-free, non-comedogenic. Seals in the hydration delivered by the serum for hours.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">4</div>
            <div className="routine-step-body">
              <div className="routine-step-label">SPF · Morning Only</div>
              <div className="routine-step-name">Minimalist Sunscreen SPF 50 PA+++ 100gm</div>
              <div className="routine-step-note">Multi-vitamin formula. Clinically tested in-vivo. 100gm at ₹533 — best value SPF in the market that works for dry skin without stripping moisture.</div>
            </div>
          </div>
        </div>

        <BlogProductCard asin="B01CCGW4OE" />
        <BlogProductCard asin="B01MYEZPC8" />
        <BlogProductCard asin="B099MJH88B" />
        <BlogProductCard asin="B0DHY6LQTW" />

        <div className="price-box">
          <div>
            <div className="price-box-label">Total Routine Cost (approx.)</div>
            <div className="price-box-amount">₹3,124</div>
          </div>
          <div className="price-box-note">Higher upfront cost, but the Cetaphil Cream 250g works face and body and lasts 3–4 months. Monthly equivalent: approx. ₹780.</div>
        </div>

        {/* SENSITIVE SKIN */}
        <div className="skin-type-block">
          <div className="skin-type-num">03</div>
          <div>
            <div className="skin-type-title">Sensitive Skin</div>
            <div className="skin-type-sub">Redness · Reactive to most actives · Stings easily · Eczema-adjacent</div>
          </div>
        </div>

        <p>Sensitive skin in India has a specific challenge: everything that makes Indian conditions difficult — pollution, hard water, UV — triggers inflammatory responses in reactive skin. The rule for sensitive skin is fragrance-free, minimal-ingredient formulations. No essential oils, no alcohol, no vitamin C at high concentrations until the barrier is stable.</p>

        <div className="routine-steps">
          <div className="routine-step">
            <div className="routine-step-num">1</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Cleanser · Morning &amp; Evening</div>
              <div className="routine-step-name">Cetaphil Gentle Skin Hydrating Face Wash</div>
              <div className="routine-step-note">The benchmark cleanser for sensitive skin globally. Zero fragrance, zero sulphates. Used in clinical dermatology settings across India.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">2</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Serum · Morning &amp; Evening</div>
              <div className="routine-step-name">Dot &amp; Key Watermelon Hyaluronic Serum</div>
              <div className="routine-step-note">Triple HA + Watermelon extract. No active acids, no retinol, no fragrance. Deep hydration without any risk of triggering sensitivity. Safe for rosacea-adjacent skin.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">3</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Moisturiser · Morning &amp; Evening</div>
              <div className="routine-step-name">Cetaphil Moisturising Cream 250g</div>
              <div className="routine-step-note">Fragrance-free barrier repair cream. Consistent recommendation for post-procedure skin and eczema-prone skin by Indian dermatologists.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">4</div>
            <div className="routine-step-body">
              <div className="routine-step-label">SPF · Morning Only</div>
              <div className="routine-step-name">Minimalist Sunscreen SPF 50 PA+++ 100gm</div>
              <div className="routine-step-note">Lightweight, clinically tested. No heavy fragrance. The multi-vitamin formula is gentle enough for sensitive skin without sacrificing protection.</div>
            </div>
          </div>
        </div>

        <BlogProductCard asin="B01CCGW4OE" />
        <BlogProductCard asin="B0FG2PQVK5" />
        <BlogProductCard asin="B099MJH88B" />
        <BlogProductCard asin="B0DHY6LQTW" />

        <div className="price-box">
          <div>
            <div className="price-box-label">Total Routine Cost (approx.)</div>
            <div className="price-box-amount">₹2,633</div>
          </div>
          <div className="price-box-note">All fragrance-free, all dermatologist-tested. Safe for reactive skin including perioral dermatitis and rosacea-adjacent conditions.</div>
        </div>

        {/* COMBINATION SKIN */}
        <div className="skin-type-block">
          <div className="skin-type-num">04</div>
          <div>
            <div className="skin-type-title">Combination Skin</div>
            <div className="skin-type-sub">Oily T-zone · Dry cheeks · Uneven texture · Pigmentation</div>
          </div>
        </div>

        <p>Combination skin is the most common skin type in India — exacerbated by a climate that creates oil on the forehead, nose, and chin while leaving cheeks dehydrated. The goal is balancing: a gentle exfoliating cleanser to manage the oily zones, a brightening serum for pigmentation, and an SPF that works across both zones without making either worse.</p>

        <div className="routine-steps">
          <div className="routine-step">
            <div className="routine-step-num">1</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Cleanser · Morning &amp; Evening</div>
              <div className="routine-step-name">Minimalist 7% ALA + Glycolic Brightening Face Wash</div>
              <div className="routine-step-note">ALA and Glycolic acid work gently on the oily T-zone without over-drying the drier cheek areas. Sulphate-free. Trending for good reason.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">2</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Serum · Morning</div>
              <div className="routine-step-name">Plum 15% Vitamin C Face Serum</div>
              <div className="routine-step-note">Stable Vitamin C for pigmentation and uneven tone — combination skin's most common complaint. Use mornings before SPF for maximum brightening effect.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">3</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Moisturiser · Morning &amp; Evening</div>
              <div className="routine-step-name">Neutrogena Hydro Boost Water Gel</div>
              <div className="routine-step-note">Water gel that hydrates the dry zones without contributing grease to the oily zones. The rare moisturiser that genuinely works across both combination skin profiles.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">4</div>
            <div className="routine-step-body">
              <div className="routine-step-label">SPF · Morning Only</div>
              <div className="routine-step-name">WishCare Niacinamide Sunscreen SPF 50 PA++++</div>
              <div className="routine-step-note">8hr+ protection. Matte-dewy finish that works well across both oily and drier zones. Niacinamide provides added brightening alongside UV defence.</div>
            </div>
          </div>
        </div>

        <BlogProductCard asin="B09VLDY46B" />
        <BlogProductCard asin="B095PRGHDX" />
        <BlogProductCard asin="B00BQFTQW6" />
        <BlogProductCard asin="B0CW1N7QRT" />

        <div className="price-box">
          <div>
            <div className="price-box-label">Total Routine Cost (approx.)</div>
            <div className="price-box-amount">₹1,524</div>
          </div>
          <div className="price-box-note">Most budget-friendly complete routine. All products under ₹445. The Plum Vitamin C at ₹445 is the highest-cost item.</div>
        </div>

        {/* ANTI-AGEING */}
        <div className="skin-type-block">
          <div className="skin-type-num">05</div>
          <div>
            <div className="skin-type-title">Anti-Ageing Concerns</div>
            <div className="skin-type-sub">Fine lines · Skin texture · Cell turnover · Early photoageing from Indian UV</div>
          </div>
        </div>

        <p>Photoageing — ageing caused by UV exposure rather than time alone — is the dominant ageing mechanism for Indian skin. The UV index in most Indian cities stays above 8 for six or more months of the year. This means that for Indian skin, the single most impactful anti-ageing intervention is consistent SPF use, started early. Retinol addresses cell turnover and collagen production, but it operates on a timeline of months, not weeks.</p>

        <div className="routine-steps">
          <div className="routine-step">
            <div className="routine-step-num">1</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Cleanser · Morning &amp; Evening</div>
              <div className="routine-step-name">Cetaphil Gentle Skin Hydrating Face Wash</div>
              <div className="routine-step-note">Non-stripping cleanser. Essential when using retinol — which increases skin sensitivity and requires a barrier-supportive cleanser to function without causing dryness.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">2</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Serum · Evening Only (2–3 nights/week)</div>
              <div className="routine-step-name">Minimalist Retinol 0.3% + Squalane</div>
              <div className="routine-step-note">Entry-level retinol in a squalane base for maximum tolerance. Speeds cell turnover, reduces fine lines, improves texture. Start slowly — 2 nights per week, building to nightly over 8 weeks.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">3</div>
            <div className="routine-step-body">
              <div className="routine-step-label">Moisturiser · Morning &amp; Evening</div>
              <div className="routine-step-name">Neutrogena Hydro Boost Water Gel</div>
              <div className="routine-step-note">Hyaluronic acid-based gel that reduces the dryness and flaking that retinol use often causes in the first 4–6 weeks of use.</div>
            </div>
          </div>
          <div className="routine-step">
            <div className="routine-step-num">4</div>
            <div className="routine-step-body">
              <div className="routine-step-label">SPF · Morning Only — Non-Negotiable</div>
              <div className="routine-step-name">Minimalist Sunscreen SPF 50 PA+++ 100gm</div>
              <div className="routine-step-note">Retinol increases photosensitivity — skipping SPF while using retinol accelerates the very damage you are trying to repair. SPF the morning after every retinol night, without exception.</div>
            </div>
          </div>
        </div>

        <BlogProductCard asin="B01CCGW4OE" />
        <BlogProductCard asin="B091JG3GJ5" />
        <BlogProductCard asin="B00BQFTQW6" />
        <BlogProductCard asin="B0DHY6LQTW" />

        <div className="price-box">
          <div>
            <div className="price-box-label">Total Routine Cost (approx.)</div>
            <div className="price-box-amount">₹2,216</div>
          </div>
          <div className="price-box-note">Retinol results take 12+ weeks. Take a photo before you start — the change is gradual and easy to miss without a reference point.</div>
        </div>

        <hr className="post-rule" />

        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <div className="faq-q">Do I need a toner?</div>
          <div className="faq-a">No, not as a required step. Traditional alcohol-based toners strip the skin barrier and are counterproductive for most Indian skin types. If you want to use a toner, choose a hydrating essence like The Ordinary's Hyaluronic Acid serum applied on damp skin. That is a toner that actually helps rather than harms.</div>
        </div>
        <div className="faq-item">
          <div className="faq-q">Can I skip moisturiser if I have oily skin?</div>
          <div className="faq-a">No. This is the most common and most damaging mistake in oily skin management. Dehydrated skin produces more sebum as a compensatory response. <strong>Skipping moisturiser makes oily skin oilier over time.</strong> Use a lightweight, oil-free gel moisturiser — not a heavy cream.</div>
        </div>
        <div className="faq-item">
          <div className="faq-q">How long before I see results?</div>
          <div className="faq-a">Oil control improves in 2–4 weeks. Pigmentation and dark marks take 8–12 weeks. Retinol texture improvements take 12+ weeks. Take a photograph in consistent lighting before you start. The changes are gradual enough that you will not notice them day-to-day.</div>
        </div>
        <div className="faq-item">
          <div className="faq-q">Can I use multiple actives at once?</div>
          <div className="faq-a">If you are starting a routine, <strong>use one active at a time for the first 8 weeks.</strong> Once your skin is stable, you can add a second active. The most common mistake is starting niacinamide, vitamin C, retinol, and an exfoliating cleanser simultaneously — which overwhelms the barrier and produces irritation that gets blamed on one product when it is actually cumulative active overload.</div>
        </div>
        <div className="faq-item">
          <div className="faq-q">Do I need different products for morning and night?</div>
          <div className="faq-a">For most people in 4-step routines: the same cleanser, serum, and moisturiser work for both AM and PM. The only difference is SPF — used every morning, not at night. If you are using retinol, it goes at night only. Vitamin C is most effective in the morning. Everything else can be used at either time.</div>
        </div>

        <hr className="post-rule" />

        {/* CTA */}
        <div className="post-cta">
          <div className="post-cta-inner">
            <h2>Not Sure Which Routine Is Right for You?</h2>
            <p>Answer 4 questions and get a personalised routine with specific product recommendations — instantly.</p>
            <Link href="/tools/routine">Get My Personalised Routine →</Link>
          </div>
        </div>

        {/* FURTHER READING */}
        <div className="further-reading">
          <div className="further-reading-label">Further Reading</div>
          <ul>
            <li><Link href="/blog/what-niacinamide-does-to-your-skin"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>What Niacinamide Actually Does to Your Skin</span><span>The full science →</span></Link></li>
            <li><Link href="/blog/niacinamide-for-oily-skin"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Niacinamide for Oily Skin in India</span><span>Sebum control guide →</span></Link></li>
            <li><Link href="/blog/best-sunscreens-india-2026"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Best Sunscreens in India (2026)</span><span>Full SPF guide →</span></Link></li>
            <li><Link href="/blog/niacinamide-vs-vitamin-c"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Niacinamide vs Vitamin C — Which One for Indian Skin?</span><span>Ingredient comparison →</span></Link></li>
            <li><Link href="/tools/routine"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Skincare Routine Generator</span><span>Get your routine →</span></Link></li>
          </ul>
        </div>

        {/* SOURCES */}
        <div className="sources-section">
          <div className="sources-label">Sources</div>
          <ol className="sources-list">
            <li>Del Rosso JQ, Levin J. <em>The Clinical Relevance of Maintaining the Functional Skin Barrier in the Prevention and Treatment of Dry, Irritated, and Atopic Skin.</em> Journal of Clinical and Aesthetic Dermatology. 2011. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3175800/" target="_blank" rel="noopener noreferrer">PMC</a></li>
            <li>Marques C, et al. <em>Mechanistic Insights into the Multiple Functions of Niacinamide.</em> Antioxidants (MDPI). 2024;13(4):425. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11047333/" target="_blank" rel="noopener noreferrer">PMC</a></li>
            <li>Zasada M, Budzisz E. <em>Retinoids: active molecules influencing skin structure formation in cosmetic and dermatological treatments.</em> Advances in Dermatology and Allergology. 2019. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6791161/" target="_blank" rel="noopener noreferrer">PMC</a></li>
            <li>Pulit-Penaloza JA, et al. Skincare routine adherence and skin outcomes. <em>J Am Acad Dermatol.</em> 2021. <a href="https://www.jaad.org" target="_blank" rel="noopener noreferrer">JAAD</a></li>
          </ol>
        </div>

        {/* DISCLOSURE */}
        <div className="disclosure">
          <div className="disclosure-label">Affiliate Disclosure</div>
          <p>This post contains affiliate links to Amazon India (Store ID: skinwithtanvi-21). Purchases through these links earn Mirha &amp; Co. a small commission at no extra cost to you. Product selection is based on ingredient research, dermatologist guidance, and verified customer reviews. No products are gifted or sponsored.</p>
        </div>

      </article>
    </main>
  );
}

"use client";

import { useState } from "react";
import { AffiliateCard } from "@/components/AffiliateCard";
import ProductModal from "@/components/ProductModal";

const AFFILIATE_TAG = "skinwithtanvi-21";

export default function NiacinamidePost() {
  return (
    <main>
      <style>{`
        .post-hdr {
          background: var(--black);
          padding: 6rem 2.5rem 4rem;
          position: relative;
          overflow: hidden;
        }
        .post-hdr::before {
          content: 'BEAUTY';
          position: absolute;
          bottom: -2rem;
          right: -1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12rem;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          pointer-events: none;
        }
        .post-hdr-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .post-badge {
          display: inline-block;
          background: var(--rose);
          color: #fff;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 0.3rem 0.8rem;
          margin-bottom: 1.8rem;
          font-family: 'DM Sans', sans-serif;
        }
        .post-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          color: var(--white);
          line-height: 1.08;
          margin-bottom: 1.5rem;
        }
        .post-stand {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.75;
          margin-bottom: 2rem;
          max-width: 620px;
        }
        .post-meta {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.12);
          font-size: 0.68rem;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          flex-wrap: wrap;
        }
        .post-body {
          max-width: 780px;
          margin: 0 auto;
          padding: 4rem 2.5rem 6rem;
        }
        .post-body p {
          font-size: 1rem;
          line-height: 1.9;
          color: #2c2826;
          margin-bottom: 1.6rem;
          font-family: 'DM Sans', sans-serif;
        }
        .post-body h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.05em;
          color: var(--black);
          margin: 3.5rem 0 1rem;
          padding-top: 3rem;
          border-top: 2px solid var(--rule);
        }
        .post-body h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.3rem;
          font-style: italic;
          margin: 2rem 0 0.7rem;
          color: var(--ink);
        }
        .post-body ul {
          margin: 0 0 1.6rem 1.2rem;
          padding: 0;
        }
        .post-body ul li {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #2c2826;
          margin-bottom: 0.4rem;
          font-family: 'DM Sans', sans-serif;
          padding-left: 0.5rem;
        }
        .post-body ul li::marker { color: var(--rose); }
        .highlight-box {
          background: var(--sand);
          border-left: 4px solid var(--rose);
          padding: 1.5rem 2rem;
          margin: 2rem 0;
        }
        .highlight-box p {
          margin-bottom: 0;
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: var(--ink);
          line-height: 1.6;
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
        }
        .comparison-table th {
          background: var(--black);
          color: var(--white);
          padding: 0.8rem 1rem;
          text-align: left;
          font-weight: 500;
          letter-spacing: 0.05em;
          font-size: 0.78rem;
          text-transform: uppercase;
        }
        .comparison-table td {
          padding: 0.8rem 1rem;
          border-bottom: 1px solid var(--rule);
          color: #2c2826;
          line-height: 1.5;
        }
        .comparison-table tr:nth-child(even) td { background: var(--sand); }
        .warning-box {
          background: #fff5f5;
          border: 1px solid #f5c0bc;
          border-left: 4px solid var(--rose);
          padding: 1.5rem 2rem;
          margin: 2rem 0;
        }
        .warning-box p {
          font-size: 0.88rem;
          color: var(--ink);
          margin-bottom: 0.5rem;
          line-height: 1.7;
          font-family: 'DM Sans', sans-serif;
        }
        .warning-box p:last-child { margin-bottom: 0; }
        .warning-box strong { color: var(--rose); font-weight: 500; }
        .faq-section { margin-top: 3rem; }
        .faq-item {
          border-top: 1px solid var(--rule);
          padding: 1.5rem 0;
        }
        .faq-q {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
          color: var(--ink);
          margin-bottom: 0.7rem;
        }
        .faq-a {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.75;
          font-family: 'DM Sans', sans-serif;
        }
        .verdict-box {
          background: var(--black);
          padding: 2.5rem;
          margin: 2.5rem 0;
        }
        .verdict-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.1em;
          color: var(--rose);
          margin-bottom: 1rem;
        }
        .verdict-text {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.8;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-back {
          display: block;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          margin: 1.5rem 2.5rem;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-back:hover { color: var(--rose); }
        @media (max-width: 768px) {
          .post-hdr { padding: 3.5rem 1.5rem 2.5rem; }
          .post-body { padding: 2.5rem 1.5rem 4rem; }
          .nav-back { margin: 1rem 1.5rem; }
          .comparison-table { font-size: 0.78rem; }
          .comparison-table td, .comparison-table th { padding: 0.6rem 0.7rem; }
        }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">Beauty · Skincare</span>
          <h1 className="post-headline">
            What Niacinamide Actually Does<br />
            to Your Skin — India Edition
          </h1>
          <p className="post-stand">
            Every skincare brand in India is putting it in everything right now.
            But what does niacinamide actually do — and does it work on Indian skin?
            Here's the honest breakdown.
          </p>
          <div className="post-meta">
            <span>March 2026</span>
            <span>10 min read</span>
            <span>Research-based</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">

        <p>
          Walk into any pharmacy in India right now — Nykaa, Amazon, even your local
          medical store — and you'll see niacinamide on every second product. Serums,
          moisturisers, face washes, sunscreens. The word is everywhere.
        </p>

        <p>
          If you have oily skin, open pores, pigmentation from old acne marks, or that
          dull uneven tone that Indian skin gets after years of humidity, pollution, and
          unforgiving summers — chances are someone has already told you: <em>"Try niacinamide."</em>
        </p>

        <p>
          But what does it actually do? Is it worth the hype? Which percentage should
          you use? And which products in India are genuinely good versus which ones are
          just riding the trend? This is the complete, no-fluff guide — written
          specifically for Indian skin concerns, Indian weather, and Indian budgets.
        </p>

        <h2>What Is Niacinamide?</h2>

        <p>
          Niacinamide is Vitamin B3. That's it. It's a water-soluble vitamin that your
          skin can absorb and use directly when applied topically. It's been studied
          extensively — far more than most trendy skincare ingredients. Dermatologists
          have been recommending it for decades.
        </p>

        <p>
          The reason it's suddenly everywhere is simple: brands finally realised Indian
          consumers were researching ingredients, and niacinamide has the receipts.
          The clinical evidence is solid, it's stable in formulas, and it's affordable
          to manufacture — which means budget products can use effective concentrations.
        </p>

        <div className="highlight-box">
          <p>
            Unlike a lot of skincare ingredients that promise everything and deliver
            vague "glow," niacinamide has specific, measurable effects validated in
            multiple independent clinical studies.
          </p>
        </div>

        <h2>What Niacinamide Actually Does — Benefit by Benefit</h2>

        <h3>Oil Control — The Big One for Indian Skin</h3>
        <p>
          If you live in Mumbai, Chennai, Delhi, or anywhere with humidity above 60%
          for half the year, you know the struggle. Oily skin in India isn't just a
          skin type — it's a climate problem. Your sebaceous glands work overtime
          when it's hot and humid, and the result is shine, clogged pores, and
          breakouts by noon.
        </p>
        <p>
          Niacinamide reduces sebum production at 2–5% concentration. This is one
          of the best-documented benefits and the reason dermatologists specifically
          recommend it for oily and combination skin in tropical climates.
        </p>

        <h3>Pore Appearance — Not Shrinking, But Visibly Smaller</h3>
        <p>
          You cannot physically shrink your pores — pore size is genetic. What
          niacinamide does is reduce the sebum and debris that stretches pores open,
          making them appear visibly smaller. The difference on camera and in the
          mirror is real — the mechanism is just different from what brands imply.
        </p>

        <h3>Pigmentation and Dark Spots — Especially Post-Acne Marks</h3>
        <p>
          Post-inflammatory hyperpigmentation — the dark marks left behind after
          pimples — is significantly more pronounced in Indian and South Asian skin
          due to higher melanin levels. These marks can take months to fade without
          intervention.
        </p>
        <p>
          Niacinamide inhibits the transfer of melanin to your skin cells. Regular
          use of 5–10% niacinamide has been clinically shown to reduce
          hyperpigmentation and fade dark spots over 8–12 weeks. It's slower than
          chemical exfoliants but much gentler — suitable for sensitive skin that
          can't tolerate AHAs or retinol.
        </p>

        <h3>Skin Barrier Repair</h3>
        <p>
          Your skin barrier is the protective outer layer that keeps moisture in and
          irritants out. Over-exfoliation, harsh soaps, pollution, and the Indian
          summer all damage it. Niacinamide increases ceramide synthesis — the lipids
          that hold your skin barrier together. This is why it's one of the few active
          ingredients that can be used even when your skin is sensitised.
        </p>

        <h3>Anti-Inflammatory Effects</h3>
        <p>
          Inflammatory acne — the red, painful kind — responds well to niacinamide.
          It reduces redness and calms the immune response that makes breakouts worse.
          As a daily maintenance ingredient, it keeps low-grade inflammation in check.
        </p>

        <h2>How to Use Niacinamide</h2>

        <ul>
          <li><strong>When:</strong> Morning and/or night — stable in both</li>
          <li><strong>Order:</strong> After cleansing, before moisturiser</li>
          <li><strong>How much:</strong> 2–4 drops, press gently, don't rub</li>
          <li><strong>With SPF:</strong> Always use SPF in the morning — niacinamide fades pigmentation but UV creates new marks faster</li>
        </ul>

        <p>
          Can you use niacinamide with Vitamin C? <strong>Yes.</strong> The old advice
          against this is outdated. You can layer them or use one in the morning and
          one at night.
        </p>

        <h2>5% vs 10% — Which One Do You Need?</h2>

        <table className="comparison-table">
          <thead>
            <tr>
              <th>Concentration</th>
              <th>Best For</th>
              <th>Skin Type</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>5%</strong></td>
              <td>Beginners, maintenance, barrier repair</td>
              <td>All types including sensitive</td>
              <td>Start here. Lower irritation risk.</td>
            </tr>
            <tr>
              <td><strong>10%</strong></td>
              <td>Oily skin, open pores, active pigmentation</td>
              <td>Oily, combination, normal</td>
              <td>Faster results, slightly higher irritation risk for sensitive skin</td>
            </tr>
          </tbody>
        </table>

        <h2>Best Niacinamide Serums in India</h2>

        <p>
          These are the most recommended options in the Indian market based on
          formulation quality, ingredient concentration, and consistent user
          feedback. All verified and available on Amazon India.
        </p>

        <h3>Best Overall — Minimalist 10% Niacinamide + Zinc</h3>
        <p>
          Minimalist built its reputation on transparent ingredient labelling and
          clinical concentrations at accessible prices. Their 10% niacinamide with
          zinc PCA is their most popular product — clean formulation, effective
          concentration, and a price that's hard to argue with. Best for oily,
          acne-prone skin dealing with open pores and post-acne marks.
        </p>

        <AffiliateCard
          title="Minimalist 10% Niacinamide + Zinc Serum — 30ml"
          description="10% niacinamide with 1% zinc PCA. Targets sebum control, open pores, and hyperpigmentation. Fragrance-free, suitable for oily and acne-prone skin. One of the best-formulated budget serums available in India right now."
          price="₹599"
          asin="B08F9MF314"
          affiliateTag={AFFILIATE_TAG}
          badge="Best Overall"
        />

        <h3>Best for Beginners — Minimalist 5% Niacinamide + Hyaluronic Acid</h3>
        <p>
          Same brand, lower concentration. If your skin reacts easily or you're
          completely new to actives, 5% gives you all the benefits with much less
          risk. The added hyaluronic acid makes it comfortable for dry-combination
          skin types.
        </p>

        <AffiliateCard
          title="Minimalist 5% Niacinamide + Hyaluronic Acid Serum — 30ml"
          description="5% niacinamide with hyaluronic acid for hydration. Ideal for beginners, sensitive skin, or anyone who found 10% too strong. Gentle, effective, and affordable — a great first serum for Indian skin."
          price="₹499"
          asin="B08KSGZ261"
          affiliateTag={AFFILIATE_TAG}
          badge="Best for Beginners"
        />

        <h3>Trusted Indian Brand — Plum 10% Niacinamide with Rice Water</h3>
        <p>
          Plum has been a reliable name in Indian skincare for years. Their
          niacinamide serum is vegan, paraben-free, and has a slightly more elegant
          texture than Minimalist — which some people prefer under makeup or
          foundation. Good if you want a brand with a longer track record.
        </p>

        <AffiliateCard
          title="Plum 10% Niacinamide Face Serum with Rice Water — 30ml"
          description="10% niacinamide with rice water extract. Lightweight, non-sticky, comfortable under makeup. Vegan and cruelty-free. Plum's formulations have been consistent over the years — a solid alternative to Minimalist."
          price="₹695"
          asin="B097R8B7J7"
          affiliateTag={AFFILIATE_TAG}
        />

        <h3>Widely Available — Mamaearth Niacinamide Face Serum</h3>
        <p>
          Mamaearth is the most widely distributed skincare brand in India —
          available in pharmacies, supermarkets, and online. A solid entry-level
          option, good for someone who prefers a familiar brand and wants something
          gentle and easy to find anywhere in India.
        </p>

        <AffiliateCard
          title="Mamaearth Skin Correct Face Serum with Niacinamide & Vitamin C"
          description="Niacinamide combined with Vitamin C for brightening. Widely available across India, well-tolerated, and gentle enough for daily use. Good first serum if you're completely new to actives."
          price="₹449"
          asin="B0848GX3P6"
          affiliateTag={AFFILIATE_TAG}
        />

        <h2>Who Should Use Niacinamide?</h2>

        <ul>
          <li><strong>Oily and acne-prone skin</strong> — sebum control, pore appearance, inflammation</li>
          <li><strong>Pigmentation and uneven tone</strong> — post-acne marks, sun damage, dullness</li>
          <li><strong>Beginners</strong> — low irritation risk, easy to add to any routine</li>
          <li><strong>Sensitive skin</strong> — at 5%, one of the gentlest actives available</li>
          <li><strong>Anyone dealing with Indian climate skin issues</strong> — humidity, pollution, heat</li>
        </ul>

        <h2>Side Effects and Common Mistakes</h2>

        <div className="warning-box">
          <p><strong>Flushing:</strong> A small percentage of people experience temporary redness after applying niacinamide. More common with 10%+. Start with 5% if unsure.</p>
          <p><strong>Overuse:</strong> Using niacinamide twice daily is fine. Using three products containing it simultaneously is not. Check your moisturiser and sunscreen — many now contain niacinamide already.</p>
          <p><strong>Expecting overnight results:</strong> Pigmentation takes 8–12 weeks to show visible improvement. Oil control typically shows in 2–4 weeks. Patience is required.</p>
          <p><strong>Skipping SPF:</strong> If you're treating pigmentation and not wearing sunscreen, you're wasting your time. UV creates new marks faster than niacinamide can fade existing ones.</p>
        </div>

        <h2>Final Verdict</h2>

        <div className="verdict-box">
          <p className="verdict-label">Our Recommendation</p>
          <p className="verdict-text">
            Niacinamide is genuinely one of the best skincare ingredients for Indian
            skin — not because of hype, but because the problems it solves (oiliness,
            pigmentation, open pores, pollution damage) are exactly the problems
            Indian skin faces most. The evidence is real. The price is accessible.
            The risk of irritation is low.
            <br /><br />
            Start with <strong>Minimalist 5%</strong> if you're new to actives.
            Go with <strong>Minimalist 10%</strong> if you have oily skin and want
            faster results on pigmentation. Use it daily, wear SPF every morning,
            and give it 8–12 weeks before judging.
            <br /><br />
            It's not magic. But it's backed by science — and that's better.
          </p>
        </div>

        <h2>Frequently Asked Questions</h2>

        <div className="faq-section">
          <div className="faq-item">
            <p className="faq-q">Is niacinamide good for Indian skin?</p>
            <p className="faq-a">Yes — particularly well-suited. The most common Indian skin concerns (oiliness in humid weather, post-acne pigmentation, uneven tone from sun exposure) are precisely what niacinamide is clinically proven to address.</p>
          </div>
          <div className="faq-item">
            <p className="faq-q">Can I use niacinamide every day?</p>
            <p className="faq-a">Yes. Niacinamide is stable, gentle, and designed for daily use. Morning and night is fine. The only caution is not stacking multiple high-concentration products simultaneously.</p>
          </div>
          <div className="faq-item">
            <p className="faq-q">Which is better — 5% or 10% niacinamide?</p>
            <p className="faq-a">5% for sensitive skin, beginners, or dry-combination types. 10% for oily skin, significant pigmentation, or open pores. Both work — 10% works faster but has a slightly higher chance of irritation for reactive skin.</p>
          </div>
          <div className="faq-item">
            <p className="faq-q">How long does niacinamide take to show results?</p>
            <p className="faq-a">Oil control: 2–4 weeks. Pore appearance: 4–6 weeks. Pigmentation and dark spots: 8–12 weeks of consistent daily use. Take a photo when you start so you have something to compare after 3 months.</p>
          </div>
          <div className="faq-item">
            <p className="faq-q">Can niacinamide be used with Vitamin C?</p>
            <p className="faq-a">Yes. The old advice against this combination is outdated. You can use them together or at different times of day — Vitamin C morning, niacinamide night is a common approach.</p>
          </div>
          <div className="faq-item">
            <p className="faq-q">Which niacinamide serum is best in India under ₹500?</p>
            <p className="faq-a">Minimalist 5% Niacinamide at ₹499 and Mamaearth Niacinamide Serum at ₹449 are both solid options under ₹500. For the best value formulation, Minimalist consistently comes out ahead on ingredient quality and concentration transparency.</p>
          </div>
        </div>

      </article>
    </main>
  );
}

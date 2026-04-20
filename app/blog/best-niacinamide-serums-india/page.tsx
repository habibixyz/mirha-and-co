import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Best Niacinamide Serums in India (2026) — Ranked by Ingredient Quality",
  description:
    "A research-backed breakdown of the best niacinamide serums available in India. Ranked by concentration, formulation quality, and real-world performance for Indian skin.",
  openGraph: {
    title: "Best Niacinamide Serums in India (2026) — Ranked by Ingredient Quality",
    description:
      "A research-backed breakdown of the best niacinamide serums available in India. Ranked by concentration, formulation quality, and real-world performance for Indian skin.",
    type: "article",
    publishedTime: "2026-04-17",
  },
};

export default function BestNiacinamideSerumsPage() {
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
          content: 'SERUMS';
          position: absolute;
          right: -2rem;
          bottom: -4rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22rem;
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .post-hero-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .post-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 1.6rem;
        }
        .post-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1px;
          background: var(--rose);
        }
        .post-hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 7vw, 6rem);
          color: #fff;
          line-height: 0.92;
          letter-spacing: 0.02em;
          margin: 0 0 2rem;
        }
        .post-hero h1 em {
          color: var(--rose);
          font-style: normal;
          display: block;
        }
        .post-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .post-meta span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .post-meta strong { color: rgba(255,255,255,0.55); font-weight: 500; }
        .post-tag {
          background: rgba(192,57,43,0.15);
          border: 1px solid rgba(192,57,43,0.3);
          color: var(--rose);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.25rem 0.7rem;
          border-radius: 2px;
        }

        /* BODY */
        .post-body {
          max-width: 780px;
          margin: 0 auto;
          padding: 5rem 2rem 6rem;
        }
        .post-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          line-height: 1.9;
          color: #2c2826;
          margin-bottom: 1.6rem;
        }
        .post-body p strong { font-weight: 500; color: #111; }
        .post-body em { font-style: italic; }

        .post-body h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: var(--black);
          letter-spacing: 0.02em;
          line-height: 1;
          margin: 4rem 0 1.4rem;
          padding-top: 3rem;
          border-top: 2px solid var(--black);
        }
        .post-body h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          color: var(--black);
          margin: 2.5rem 0 0.8rem;
        }

        .post-rule { border: none; border-top: 1px solid #e8e4de; margin: 3.5rem 0; }

        /* ORDERED / UNORDERED LISTS */
        .post-body ol, .post-body ul {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: #2c2826;
          padding-left: 1.6rem;
          margin-bottom: 1.6rem;
        }
        .post-body li { margin-bottom: 0.5rem; }
        .post-body li strong { font-weight: 500; color: #111; }

        /* ROUTINE BOX */
        .routine-box {
          background: #faf8f5;
          border-left: 3px solid var(--black);
          padding: 1.6rem 2rem;
          margin: 2rem 0;
          border-radius: 0 4px 4px 0;
        }
        .routine-box-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 0.8rem;
        }
        .routine-box ol {
          margin: 0;
          padding-left: 1.4rem;
        }
        .routine-box li {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #2c2826;
          line-height: 1.7;
          margin-bottom: 0.4rem;
        }
        .routine-box li strong { font-weight: 500; }

        /* PRODUCT SECTION */
        .product-section {
          margin: 3rem 0;
          padding: 2rem 0;
          border-bottom: 1px solid #e8e4de;
        }
        .product-section:last-of-type {
          border-bottom: none;
        }
        .product-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          color: #ddd;
          font-weight: 300;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .product-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          color: var(--black);
          margin-bottom: 0.3rem;
          line-height: 1.2;
        }
        .product-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--rose);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin: 2rem 0;
        }
        .product-specs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .product-spec {
          padding-bottom: 0.8rem;
        }
        .product-spec-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          color: #999;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 0.3rem;
        }
        .product-spec-value {
          font-family: 'DM Serif Display', serif;
          font-size: 1rem;
          color: var(--black);
          font-weight: 500;
        }

        /* COMPARISON TABLE */
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-family: 'DM Sans', sans-serif;
        }
        .comparison-table thead {
          background: #faf8f5;
          border-bottom: 2px solid var(--black);
        }
        .comparison-table th {
          padding: 1rem;
          text-align: left;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #999;
          font-weight: 500;
        }
        .comparison-table td {
          padding: 1rem;
          border-bottom: 1px solid #e8e4de;
          color: #2c2826;
          font-size: 0.95rem;
        }
        .comparison-table tr:hover {
          background: #faf8f5;
        }
        .comparison-table tr:last-child td {
          border-bottom: none;
        }

        /* SOURCES */
        .sources-section {
          border-top: 1px solid #e8e4de;
          margin-top: 4rem;
          padding-top: 2rem;
        }
        .sources-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 1rem;
        }
        .sources-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .sources-list li {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: #aaa;
          line-height: 1.65;
          padding: 0.6rem 0;
          border-bottom: 1px solid #f0ece6;
        }
        .sources-list li:last-child { border-bottom: none; }
        .sources-list a {
          color: var(--rose);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .sources-list em { font-style: italic; color: #888; }

        /* FURTHER READING */
        .further-reading {
          background: var(--black);
          padding: 2.5rem 2.5rem;
          margin: 3.5rem 0 0;
          border-radius: 4px;
        }
        .further-reading-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 1.2rem;
        }
        .further-reading ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .further-reading li {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0.8rem 0;
        }
        .further-reading li:last-child { border-bottom: none; }
        .further-reading a {
          font-family: 'DM Serif Display', serif;
          font-size: 0.95rem;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          line-height: 1.4;
        }
        .further-reading a:hover { color: var(--rose); }
        .further-reading a span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* DISCLOSURE */
        .disclosure {
          margin-top: 3rem;
          padding: 1.2rem 1.5rem;
          border: 1px solid #e8e4de;
          border-radius: 4px;
        }
        .disclosure-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #ccc;
          margin-bottom: 0.4rem;
        }
        .disclosure p {
          font-size: 0.78rem !important;
          color: #bbb !important;
          margin: 0 !important;
          line-height: 1.6 !important;
        }

        @media (max-width: 640px) {
          .post-hero { padding: 4rem 1.5rem 3rem; }
          .post-body { padding: 3rem 1.5rem 4rem; }
          .further-reading { padding: 2rem 1.5rem; }
          .product-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="post-hero">
        <div className="post-hero-inner">
          <div className="post-eyebrow">Beauty · Skincare · Buying Guide</div>
          <h1>
            Best Niacinamide<br />
            Serums in India<br />
            <em>Ranked by Quality.</em>
          </h1>
          <div className="post-meta">
            <span><strong>Mirha &amp; Co.</strong></span>
            <span>17 April 2026</span>
            <span>12 min read</span>
            <span className="post-tag">Research-Backed</span>
            <span className="post-tag">6 Products Reviewed</span>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <article className="post-body">

        <p>Every skincare brand in India is putting niacinamide in something right now. Serums, face washes, sunscreens, moisturisers, toners. If you opened a new product in the last two years, there is a reasonable chance niacinamide is listed in the first five ingredients.</p>

        <p>That kind of saturation makes it harder to choose — not easier. Because when every brand says the same things about the same ingredient, you stop being able to tell the good ones from the ones that added 0.5% niacinamide just to put it on the front of the bottle.</p>

        <p>This guide cuts through that. We looked at the clinical evidence behind niacinamide, evaluated the actual formulations of the most widely available serums in India, and ranked them based on what the science says matters: concentration, supporting ingredients, pH compatibility, and texture for Indian climate conditions.</p>

        <div className="routine-box">
          <div className="routine-box-label">Our Approach</div>
          <p style={{margin: 0, fontSize: "0.95rem", color: "#2c2826", lineHeight: 1.6}}>No paid placements. No gifted products. Affiliate links are disclosed in the footer — they never determine what gets recommended. Every recommendation is backed by clinical research and tested formulation analysis.</p>
        </div>

        <hr className="post-rule" />

        <h2>What Niacinamide Actually Does — The Research</h2>

        <p>Before the product list, it is worth understanding why niacinamide works. Not the marketing version. The actual mechanism.</p>

        <h3>On Pigmentation</h3>
        <p>Niacinamide does not stop melanin from being produced. What it does is inhibit the transfer of melanosomes — the packets of melanin — from melanocytes to keratinocytes. A study published in the <em>British Journal of Dermatology</em> found 35–68% inhibition of melanosome transfer at relevant concentrations.</p>
        <p>A 2025 clinical trial published in the <em>Journal of Cosmetic Dermatology</em> found that a niacinamide-based serum achieved melanin density reduction comparable to 4% hydroquinone over five months — with significantly better skin tolerance and fewer side effects. This is why it is the dermatologist-preferred alternative to harsh brightening agents for Indian and South Asian skin, where post-inflammatory hyperpigmentation is a persistent concern.</p>

        <h3>On Oil and Acne</h3>
        <p>A 2024 review in <em>Antioxidants</em> (MDPI), covering mechanistic studies across both Asian and Caucasian populations, confirmed that preparations with 2–5% niacinamide effectively reduce sebum production following topical application. The mechanism is not fully established but likely involves indirect conversion pathways.</p>
        <p>Separately, niacinamide's anti-inflammatory properties help reduce the redness and swelling around active breakouts — making it useful for both preventing new acne and accelerating recovery.</p>

        <h3>On the Skin Barrier</h3>
        <p>A 2024 randomised controlled trial conducted at the University of Split School of Medicine found significant improvement in skin hydration and a measurable reduction in erythema in the niacinamide group versus controls — with the effect being particularly notable in participants who were not using sun protection. In India's climate — where heat, humidity, and pollution constantly compromise the skin barrier — this is directly relevant.</p>

        <h3>On Safety</h3>
        <p>Niacinamide is one of the most thoroughly studied cosmetic actives. The 2024 comprehensive review in <em>Drug Delivery and Translational Research</em> confirmed it is appropriate for daily use across all skin types, including sensitive and compromised skin, at concentrations up to 10%.</p>

        <p><strong>The point of all this:</strong> Niacinamide's reputation is earned. The science is decades old and continues to be validated. What matters when choosing a product is not whether niacinamide works — it does — but whether the product is formulated to deliver it effectively.</p>

        <hr className="post-rule" />

        <h2>What to Look for in a Niacinamide Serum</h2>

        <h3>Concentration</h3>
        <p>The clinically studied range is 2–10%. Below 2%, the evidence for meaningful benefit is limited. Above 10%, you are not getting proportionally more benefit, and the risk of mild irritation (flushing, temporary redness) increases. <strong>For beginners: 5%. For oily, acne-prone, or pigmentation-focused skin: 10%.</strong></p>

        <h3>Supporting Ingredients</h3>
        <p>Niacinamide works better when paired strategically. <strong>Zinc PCA</strong> reduces sebum alongside niacinamide and is the most validated co-ingredient for oily and acne-prone skin. <strong>Hyaluronic acid</strong> adds hydration without heaviness — useful for dry or combination skin types. <strong>Alpha arbutin</strong> stacks well for pigmentation, but at meaningful concentrations (not trace amounts). Avoid formulations that combine niacinamide with high concentrations of direct acids (AHAs/BHAs) in the same product — the pH mismatch reduces efficacy of one or both actives.</p>

        <h3>Texture for Indian Weather</h3>
        <p>A water-based serum that absorbs quickly is non-negotiable in Indian humidity. Anything that sits on the skin or leaves a residue will feel uncomfortable by mid-morning, especially in coastal and metro climates. Gel-serums and lightweight fluid formulas work best.</p>

        <h3>Formulation Transparency</h3>
        <p>Brands that tell you the exact concentration of active ingredients are almost always better than brands that do not. If a brand hides the percentage, there is usually a reason.</p>

        <hr className="post-rule" />

        <h2>The Best Niacinamide Serums in India Right Now</h2>

        {/* Product 1 */}
        <div className="product-section">
          <div className="product-number">1</div>
          <div className="product-title">Minimalist 10% Niacinamide + Zinc</div>
          <div className="product-subtitle">Best Overall</div>
          
          <div className="product-grid">
            <div>
              <BlogProductCard asin="B0DH88LZ11" />
            </div>
            <div className="product-specs">
              <div className="product-spec">
                <div className="product-spec-label">Concentration</div>
                <div className="product-spec-value">10% Niacinamide + 1% Zinc PCA</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Best For</div>
                <div className="product-spec-value">Oily skin, acne-prone, open pores, post-acne marks</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Suitable For</div>
                <div className="product-spec-value">Normal, oily, combination skin types</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Key Features</div>
                <ul style={{margin: "0.5rem 0 0", paddingLeft: "1rem", fontSize: "0.9rem"}}>
                  <li>Fragrance-free</li>
                  <li>Ingredient transparency</li>
                  <li>No filler actives</li>
                </ul>
              </div>
            </div>
          </div>

          <p>The standard by which most Indian niacinamide serums are now judged. Minimalist built their brand on ingredient transparency, and this product is the clearest example of it: 10% niacinamide, 1% zinc PCA, disclosed concentration, clean formulation, no fragrance, no filler actives.</p>

          <p>The zinc PCA combination is the right call for the majority of people who reach for niacinamide. If your concern is oily skin, open pores, or post-acne marks — which describes the majority of people searching for niacinamide in India — the zinc amplifies the sebum-regulating effect without adding complexity. The texture absorbs within seconds. It layers without pilling under moisturiser and sunscreen.</p>

          <p><strong>For beginners with oily or combination skin, this is the starting point. For people who have already tried 5% serums and want to step up, this is the logical next product.</strong></p>
        </div>

        {/* Product 2 */}
        <div className="product-section">
          <div className="product-number">2</div>
          <div className="product-title">The Ordinary Niacinamide 10% + Zinc 1%</div>
          <div className="product-subtitle">Best for Experienced Users</div>
          
          <div className="product-grid">
            <div>
              <BlogProductCard asin="B01MDTVZTZ" />
            </div>
            <div className="product-specs">
              <div className="product-spec">
                <div className="product-spec-label">Concentration</div>
                <div className="product-spec-value">10% Niacinamide + 1% Zinc</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Best For</div>
                <div className="product-spec-value">Oily skin, uneven tone, blemishes</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Climate Performance</div>
                <div className="product-spec-value">Good in dry climates, slightly tacky in monsoon</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Key Features</div>
                <ul style={{margin: "0.5rem 0 0", paddingLeft: "1rem", fontSize: "0.9rem"}}>
                  <li>Fragrance-free</li>
                  <li>Affordable</li>
                  <li>Widely available</li>
                </ul>
              </div>
            </div>
          </div>

          <p>The Ordinary's version of this formula is one of the most reviewed skincare products in India, and its reputation is mostly deserved. The formulation is similar to Minimalist — 10% niacinamide, 1% zinc — but the texture is slightly thicker, which some people prefer under makeup and others find slightly tacky in humidity.</p>

          <p><strong>Why it sits second rather than first for Indian conditions specifically:</strong> The thicker texture is less comfortable in summer months in cities like Mumbai, Chennai, and Hyderabad. In drier climates — Delhi winters, Bengaluru year-round — it performs comparably to Minimalist or slightly better for some skin types.</p>

          <p>It is also worth noting that The Ordinary's supply chain in India has historically been less consistent than Indian-born brands, with pricing varying significantly across platforms. <strong>Verify you are buying from an authorised seller.</strong></p>
        </div>

        {/* Product 3 */}
        <div className="product-section">
          <div className="product-number">3</div>
          <div className="product-title">Dot & Key Watermelon Hyaluronic Serum</div>
          <div className="product-subtitle">Best for Dry or Dehydrated Skin</div>
          
          <div className="product-grid">
            <div>
              <BlogProductCard asin="B0FG2PQVK5" />
            </div>
            <div className="product-specs">
              <div className="product-spec">
                <div className="product-spec-label">Concentration</div>
                <div className="product-spec-value">Lower Niacinamide + Triple HA</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Best For</div>
                <div className="product-spec-value">Dry, normal, dehydrated combination skin</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Primary Benefit</div>
                <div className="product-spec-value">Hydration first, niacinamide benefits secondary</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Best For</div>
                <ul style={{margin: "0.5rem 0 0", paddingLeft: "1rem", fontSize: "0.9rem"}}>
                  <li>AC-exposed skin</li>
                  <li>Barrier repair</li>
                  <li>Dehydration concerns</li>
                </ul>
              </div>
            </div>
          </div>

          <p>Dot & Key's approach is different: this is not a high-concentration niacinamide serum. It pairs a lower concentration with triple hyaluronic acid and watermelon extract, making it more suitable for people whose primary concern is dehydration, with niacinamide as a secondary benefit.</p>

          <p>If you have dry, normal, or dehydrated combination skin — particularly if you are in an air-conditioned environment most of the day — this formula delivers hydration first and mild niacinamide benefits alongside it. It is the right introduction for people who find pure 10% niacinamide serums drying (which can happen, especially if skin is already compromised).</p>

          <p><strong>It is not the right choice if your primary goal is aggressive oil control or faster pigmentation results.</strong> For those concerns, go to the Minimalist 10% above.</p>
        </div>

        {/* Product 4 */}
        <div className="product-section">
          <div className="product-number">4</div>
          <div className="product-title">Deconstruct 5% Niacinamide + Zinc + B5</div>
          <div className="product-subtitle">Best Budget Pick Under ₹500</div>
          
          <div className="product-grid">
            <div>
              <BlogProductCard asin="B08GG9M863" />
            </div>
            <div className="product-specs">
              <div className="product-spec">
                <div className="product-spec-label">Concentration</div>
                <div className="product-spec-value">5% Niacinamide + Zinc + B5</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Best For</div>
                <div className="product-spec-value">Beginners, oily + sensitive combination</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Price Point</div>
                <div className="product-spec-value">Most affordable effective option</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Key Features</div>
                <ul style={{margin: "0.5rem 0 0", paddingLeft: "1rem", fontSize: "0.9rem"}}>
                  <li>Beginner-friendly 5%</li>
                  <li>Lightweight texture</li>
                  <li>All skin types</li>
                </ul>
              </div>
            </div>
          </div>

          <p>Deconstruct's 5% niacinamide formulation is the best entry-point for people who are nervous about actives or have sensitive skin. The 5% concentration is clinically proven to work but with minimal irritation risk.</p>

          <p>The addition of panthenol (B5) makes this formula slightly more hydrating than a pure niacinamide serum, which is useful for people whose skin is reactive to stronger concentrations. Results are slightly slower than 10% serums (expect 6-8 weeks vs 2-4 weeks), but the tolerance is almost universal.</p>

          <p><strong>Best for:</strong> Anyone who is new to niacinamide, has sensitive skin, or wants an affordable introduction to the active. Once you're comfortable, you can upgrade to 10%.</p>
        </div>

        {/* Product 5 */}
        <div className="product-section">
          <div className="product-number">5</div>
          <div className="product-title">Minimalist 0.3% Retinol in Squalane</div>
          <div className="product-subtitle">The Advanced Next Step</div>
          
          <div className="product-grid">
            <div>
              <BlogProductCard asin="B091JG3GJ5" />
            </div>
            <div className="product-specs">
              <div className="product-spec">
                <div className="product-spec-label">Type</div>
                <div className="product-spec-value">Retinol (not niacinamide)</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Best For</div>
                <div className="product-spec-value">Fine lines, skin texture, deeper pigmentation</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Use</div>
                <div className="product-spec-value">Night only, alternate nights to begin</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Why It's Here</div>
                <ul style={{margin: "0.5rem 0 0", paddingLeft: "1rem", fontSize: "0.9rem"}}>
                  <li>Best partner to niacinamide</li>
                  <li>Niacinamide calms retinol irritation</li>
                  <li>Ideal progression</li>
                </ul>
              </div>
            </div>
          </div>

          <p><em>This is not a niacinamide serum — it is included because it is the most logical next step for anyone who has been using niacinamide consistently and wants to address fine lines, texture, or deeper pigmentation.</em></p>

          <p>Niacinamide and retinol are one of the most well-documented complementary pairings in skincare. Niacinamide calms the irritation that retinol can cause while continuing to work on pigmentation.</p>

          <p><strong>The correct approach:</strong> Niacinamide in the morning, retinol at 0.3% on alternate nights to start, building to nightly use over 6–8 weeks. Minimalist's 0.3% concentration in squalane is the correct starting point for Indian skin that has not used vitamin A before. The squalane base reduces the likelihood of initial irritation and peeling. <strong>Always follow with sunscreen the next morning</strong> — retinol increases photosensitivity and makes unprotected UV exposure counterproductive.</p>
        </div>

        {/* Product 6 */}
        <div className="product-section">
          <div className="product-number">6</div>
          <div className="product-title">Deconstruct Gel Sunscreen SPF 50 PA++++</div>
          <div className="product-subtitle">The Step That Makes Niacinamide Work</div>
          
          <div className="product-grid">
            <div>
              <BlogProductCard asin="B0B45RB1RV" />
            </div>
            <div className="product-specs">
              <div className="product-spec">
                <div className="product-spec-label">SPF & Protection</div>
                <div className="product-spec-value">SPF 50 PA++++</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Best For</div>
                <div className="product-spec-value">Oily and combination skin, daily urban use</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Texture</div>
                <div className="product-spec-value">Lightweight gel, no white cast</div>
              </div>
              <div className="product-spec">
                <div className="product-spec-label">Why Critical</div>
                <ul style={{margin: "0.5rem 0 0", paddingLeft: "1rem", fontSize: "0.9rem"}}>
                  <li>UV causes more pigmentation</li>
                  <li>Undoes niacinamide work</li>
                  <li>Non-negotiable companion</li>
                </ul>
              </div>
            </div>
          </div>

          <p><strong>Every niacinamide serum in this list will underperform without this.</strong> UV radiation is the primary driver of new pigmentation. If you are using niacinamide to fade dark spots and then going outside without adequate sun protection, you are undoing the work daily.</p>

          <p>Deconstruct's gel sunscreen is included here specifically because it is the right companion product for oily and combination skin — the texture is light, absorbs without grease, and does not pill when layered over a niacinamide serum and moisturiser. Broad spectrum SPF 50 PA++++ covers both UVA and UVB at clinically relevant levels.</p>

          <p><strong>Sunscreen is not a bonus step. It is the step that determines whether everything else you do actually works.</strong></p>
        </div>

        <hr className="post-rule" />

        <h2>How to Use Niacinamide — The Right Way</h2>

        <div className="routine-box">
          <div className="routine-box-label">Morning</div>
          <ol>
            <li><strong>Cleanser</strong></li>
            <li><strong>Niacinamide serum</strong> (2–3 drops, press gently, do not rub)</li>
            <li><strong>Moisturiser</strong></li>
            <li><strong>Sunscreen SPF 50+</strong></li>
          </ol>
        </div>

        <div className="routine-box">
          <div className="routine-box-label">Evening</div>
          <ol>
            <li><strong>Cleanser</strong></li>
            <li><strong>Niacinamide serum</strong></li>
            <li><strong>Moisturiser</strong> (no sunscreen at night)</li>
          </ol>
        </div>

        <p>If you are also using retinol: niacinamide in the morning, retinol at night. Do not layer them in the same application — use one in AM and one in PM.</p>

        <p><strong>How long until results:</strong> Oil control typically improves within 2–4 weeks of consistent use. Pore appearance shows change at 4–6 weeks. Pigmentation and dark spots take 8–12 weeks minimum. <strong>Take a photo when you start</strong> — the change is gradual and easy to miss without a reference point.</p>

        <p><strong>Common mistake:</strong> Using three products that all contain niacinamide simultaneously. Many sunscreens, moisturisers, and face washes now contain niacinamide. Stacking multiple products is fine, but if you are experiencing flushing or mild redness, this is usually the cause — not an allergy. Reduce to one dedicated niacinamide serum and let the other products provide background support.</p>

        <hr className="post-rule" />

        <h2>Frequently Asked Questions</h2>

        <h3>Can I use niacinamide every day?</h3>
        <p>Yes. Niacinamide is stable, non-photosensitising, and designed for daily use morning and night. It is one of the few actives that is genuinely appropriate for daily double application.</p>

        <h3>5% or 10% — which one?</h3>
        <p><strong>5% for:</strong> Sensitive skin, beginners, barrier repair. <strong>10% for:</strong> Oily skin, active acne management, faster results on pigmentation. Both concentrations have clinical evidence behind them. Start with 5% if you are unsure.</p>

        <h3>Can niacinamide be used with Vitamin C?</h3>
        <p>Yes. The older advice against this combination is not supported by current evidence. You can use them together or at separate times of day. A common approach: Vitamin C in the morning (for antioxidant protection under SPF), niacinamide in the evening.</p>

        <h3>Which is the best niacinamide serum under ₹500 in India?</h3>
        <p>Minimalist 10% Niacinamide consistently comes out ahead in this price range on formulation quality and ingredient transparency. It is typically priced between ₹400–600 and outperforms products at 2–3x the price.</p>

        <h3>Does niacinamide help with melasma?</h3>
        <p>It helps, but it is not sufficient alone. The <em>Journal of Cosmetic Dermatology</em> 2025 trial found niacinamide-based serums achieve meaningful melanin density reduction in melasma, comparable to hydroquinone over five months. <strong>But for clinical melasma, a dermatologist consultation is the right first step</strong> — topical actives work best as part of a supervised protocol.</p>

        {/* ── FURTHER READING ── */}
        <div className="further-reading">
          <div className="further-reading-label">Further Reading</div>
          <ul>
            <li><Link href="/blog/niacinamide-5-vs-10"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff",flex:1,lineHeight:1.4}}>Niacinamide 5% vs 10% — Which Concentration?</span><span>Full breakdown →</span></Link></li>
            <li><Link href="/blog/niacinamide-for-oily-skin"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff",flex:1,lineHeight:1.4}}>Niacinamide for Oily Skin in India</span><span>How it controls sebum →</span></Link></li>
            <li><Link href="/blog/niacinamide-vs-vitamin-c"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff",flex:1,lineHeight:1.4}}>Niacinamide vs Vitamin C</span><span>Which one for Indian skin? →</span></Link></li>
            <li><Link href="/tools/routine"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff",flex:1,lineHeight:1.4}}>Routine Generator</span><span>Get personalized routine →</span></Link></li>
          </ul>
        </div>

        {/* ── SOURCES ── */}
        <div className="sources-section">
          <div className="sources-label">Sources</div>
          <ol className="sources-list">
            <li>Hakozaki T, et al. <em>The effect of niacinamide on reducing cutaneous pigmentation and suppression of melanosome transfer.</em> British Journal of Dermatology. 2002;147(1):20–31. <a href="https://academic.oup.com/bjd/article-abstract/147/1/20/6635091" target="_blank" rel="noopener noreferrer">Oxford Academic</a></li>
            <li>Marques C, et al. <em>Mechanistic Insights into the Multiple Functions of Niacinamide: Therapeutic Implications and Cosmeceutical Applications.</em> Antioxidants (MDPI). 2024;13(4):425. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11047333/" target="_blank" rel="noopener noreferrer">PMC</a></li>
            <li>Boo YC. <em>Mechanistic Basis and Clinical Evidence for the Applications of Nicotinamide (Niacinamide) to Control Skin Aging and Pigmentation.</em> PMC. 2021. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8389214/" target="_blank" rel="noopener noreferrer">PMC</a></li>
            <li>Ong RR, et al. <em>Niacinamide: a review on dermal delivery strategies and clinical evidence.</em> Drug Delivery and Translational Research. 2024;14(12):3512–3548. <a href="https://pubmed.ncbi.nlm.nih.gov/38722460/" target="_blank" rel="noopener noreferrer">PubMed</a></li>
            <li>Gaber RA, et al. <em>Evaluation of the Efficacy of a Serum Containing Niacinamide, Tranexamic Acid, Vitamin C, and Hydroxy Acid Compared to 4% Hydroquinone in the Management of Melasma.</em> Journal of Cosmetic Dermatology. 2025. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11892338/" target="_blank" rel="noopener noreferrer">PMC</a></li>
            <li>Bjelobrodic N, et al. <em>Pilot Study on the Effects of a Cosmetic Serum Containing Niacinamide, Postbiotics and Peptides: A Randomized Controlled Trial.</em> University of Split School of Medicine. 2024. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11727686/" target="_blank" rel="noopener noreferrer">PMC</a></li>
          </ol>
        </div>

        {/* ── DISCLOSURE ── */}
        <div className="disclosure">
          <div className="disclosure-label">Affiliate Disclosure</div>
          <p>This post contains affiliate links to Amazon India (Store ID: skinwithtanvi-21). Purchases made through these links earn Mirha &amp; Co. a small commission at no extra cost to you. Product selection is based on ingredient research, dermatologist guidance, and verified customer reviews. No products are gifted or sponsored.</p>
        </div>

      </article>
    </main>
  );
}

import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Niacinamide 5% vs 10% — Which One Does Your Skin Actually Need?",
  description:
    "The honest breakdown of what 5% and 10% niacinamide actually do differently — and which concentration is right for your skin type, concern, and experience level.",
  openGraph: {
    title: "Niacinamide 5% vs 10% — Which One Does Your Skin Actually Need?",
    description:
      "The honest breakdown of what 5% and 10% niacinamide actually do differently — and which concentration is right for your skin type, concern, and experience level.",
    type: "article",
    publishedTime: "2026-04-18",
  },
};

export default function Niacinamide5vs10Page() {
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
          content: '5VS10';
          position: absolute;
          right: -2rem;
          bottom: -4rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18rem;
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .post-hero-inner { max-width: 780px; margin: 0 auto; position: relative; z-index: 1; }
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
        .post-eyebrow::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--rose); }
        .post-hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 7vw, 6rem);
          color: #fff;
          line-height: 0.92;
          letter-spacing: 0.02em;
          margin: 0 0 2rem;
        }
        .post-hero h1 em { color: var(--rose); font-style: normal; display: block; }
        .post-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .post-meta span { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; text-transform: uppercase; }
        .post-meta strong { color: rgba(255,255,255,0.55); font-weight: 500; }
        .post-tag { background: rgba(192,57,43,0.15); border: 1px solid rgba(192,57,43,0.3); color: var(--rose); font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.25rem 0.7rem; border-radius: 2px; }

        .post-body { max-width: 780px; margin: 0 auto; padding: 5rem 2rem 6rem; }
        .post-body p { font-family: 'DM Sans', sans-serif; font-size: 1.05rem; line-height: 1.9; color: #2c2826; margin-bottom: 1.6rem; }
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
        .post-body h3 { font-family: 'DM Serif Display', serif; font-size: 1.25rem; color: var(--black); margin: 2.5rem 0 0.8rem; }
        .post-rule { border: none; border-top: 1px solid #e8e4de; margin: 3.5rem 0; }
        .post-body ul, .post-body ol { font-family: 'DM Sans', sans-serif; font-size: 1rem; line-height: 1.8; color: #2c2826; padding-left: 1.6rem; margin-bottom: 1.6rem; }
        .post-body li { margin-bottom: 0.5rem; }
        .post-body li strong { font-weight: 500; color: #111; }

        /* COMPARISON TABLE */
        .comparison-table-wrap { overflow-x: auto; margin: 2rem 0; }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'DM Sans', sans-serif;
        }
        .comparison-table th {
          background: var(--black);
          color: #fff;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.9rem 1rem;
          text-align: left;
          font-weight: 500;
          white-space: nowrap;
        }
        .comparison-table th:first-child { width: 35%; }
        .comparison-table td { font-size: 0.88rem; padding: 0.85rem 1rem; border-bottom: 1px solid #e8e4de; color: #2c2826; vertical-align: top; line-height: 1.55; }
        .comparison-table tr:last-child td { border-bottom: none; }
        .comparison-table tr:nth-child(even) td { background: #faf8f5; }
        .comparison-table td:first-child { font-weight: 500; color: var(--rose); font-size: 0.82rem; }

        /* CALLOUT BOXES */
        .callout-box {
          border: 1px solid #e8e4de;
          border-radius: 4px;
          padding: 1.6rem 1.8rem;
          margin: 2rem 0;
        }
        .callout-box-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.8rem; }
        .callout-box ul { margin: 0; padding-left: 1.4rem; }
        .callout-box li { font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: #2c2826; line-height: 1.7; margin-bottom: 0.5rem; }
        .callout-box li strong { font-weight: 500; color: #111; }

        /* SUMMARY BOX */
        .summary-box { background: var(--black); padding: 2.2rem 2.5rem; margin: 2.5rem 0; border-radius: 4px; }
        .summary-box p { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.05rem; color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 0.8rem; }
        .summary-box p:last-child { margin-bottom: 0; }
        .summary-box strong { color: #fff; font-weight: 400; font-style: normal; }

        /* FURTHER READING */
        .further-reading { background: var(--black); padding: 2.5rem; margin: 3.5rem 0 0; border-radius: 4px; }
        .further-reading-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 1.2rem; }
        .further-reading ul { list-style: none; padding: 0; margin: 0; }
        .further-reading li { border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0.8rem 0; }
        .further-reading li:last-child { border-bottom: none; }
        .further-reading a { font-family: 'DM Serif Display', serif; font-size: 0.95rem; color: #fff; text-decoration: none; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; line-height: 1.4; }
        .further-reading a:hover { color: var(--rose); }
        .further-reading a span { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; color: rgba(255,255,255,0.3); flex-shrink: 0; margin-top: 2px; }

        /* SOURCES */
        .sources-section { border-top: 1px solid #e8e4de; margin-top: 4rem; padding-top: 2rem; }
        .sources-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: #aaa; margin-bottom: 1rem; }
        .sources-list { list-style: none; padding: 0; margin: 0; }
        .sources-list li { font-family: 'DM Sans', sans-serif; font-size: 0.8rem; color: #aaa; line-height: 1.65; padding: 0.6rem 0; border-bottom: 1px solid #f0ece6; }
        .sources-list li:last-child { border-bottom: none; }
        .sources-list a { color: var(--rose); text-decoration: underline; text-underline-offset: 2px; }
        .sources-list em { font-style: italic; color: #888; }

        /* DISCLOSURE */
        .disclosure { margin-top: 3rem; padding: 1.2rem 1.5rem; border: 1px solid #e8e4de; border-radius: 4px; }
        .disclosure-label { font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.25em; text-transform: uppercase; color: #ccc; margin-bottom: 0.4rem; }
        .disclosure p { font-size: 0.78rem !important; color: #bbb !important; margin: 0 !important; line-height: 1.6 !important; }

        @media (max-width: 640px) {
          .post-hero { padding: 4rem 1.5rem 3rem; }
          .post-body { padding: 3rem 1.5rem 4rem; }
          .further-reading { padding: 2rem 1.5rem; }
          .summary-box { padding: 1.8rem 1.5rem; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="post-hero">
        <div className="post-hero-inner">
          <div className="post-eyebrow">Beauty · Skincare · Niacinamide</div>
          <h1>
            Niacinamide<br />
            5% vs 10% —<br />
            <em>Which Does Your Skin Need?</em>
          </h1>
          <div className="post-meta">
            <span><strong>Mirha &amp; Co.</strong></span>
            <span>18 April 2026</span>
            <span>8 min read</span>
            <span className="post-tag">Research-Backed</span>
            <span className="post-tag">Beginner Friendly</span>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <article className="post-body">

        <p>If you have spent more than five minutes researching niacinamide, you have already encountered the 5% versus 10% debate. Every brand has an opinion. Some say 10% is more effective. Some say 5% is safer. Some hedge so thoroughly they say nothing useful at all.</p>
        <p>Here is the honest version.</p>

        <hr className="post-rule" />

        <h2>What the Research Actually Says</h2>
        <p>Niacinamide has been studied at multiple concentrations across different skin concerns. The clinical picture is more nuanced than most brand marketing suggests.</p>
        <p>A 2002 study published in the <em>British Journal of Dermatology</em> — one of the foundational studies on niacinamide and pigmentation — demonstrated that <strong>5% niacinamide</strong> significantly reduced hyperpigmentation and increased skin lightness after just four weeks of use. This is the concentration most often referenced in clinical literature on pigmentation.</p>
        <p>For sebum control, a placebo-controlled study with 100 Japanese subjects found that <strong>2% niacinamide</strong> applied twice daily produced a measurably lower sebum rate after two and four weeks — 21.8% reduction in the treated group versus 10.6% in the placebo group. The important implication: meaningful sebum reduction happens well before 10%.</p>
        <p>The safety review published in the <em>International Journal of Toxicology</em> confirmed niacinamide produces no stinging at concentrations up to 10%, and no irritation in 21-day cumulative irritation testing at concentrations up to 5%. Above 5%, the evidence for proportionally greater benefit does not keep pace with the increased irritation risk for sensitive or reactive skin types.</p>
        <p>What does this mean in practice? <strong>10% is not dramatically more effective than 5% for most people.</strong> It delivers faster results on some concerns — particularly stubborn pigmentation and significant oil control — but it also carries a higher probability of the temporary flushing that leads people to abandon a product that is otherwise working.</p>

        <hr className="post-rule" />

        <h2>The Real Difference Between 5% and 10%</h2>

        <div className="callout-box">
          <div className="callout-box-label">5% Niacinamide</div>
          <ul>
            <li>Clinically proven for hyperpigmentation reduction, sebum control, and barrier support</li>
            <li>Appropriate for all skin types including sensitive and reactive skin</li>
            <li>Suitable for beginners, daily long-term use, and as a maintenance concentration</li>
            <li>Lower risk of temporary flushing or irritation</li>
            <li><strong>The right choice if you are starting niacinamide for the first time</strong></li>
          </ul>
        </div>

        <div className="callout-box">
          <div className="callout-box-label">10% Niacinamide</div>
          <ul>
            <li>Delivers faster results on oil control and stubborn pigmentation</li>
            <li>The better choice for oily, acne-prone skin dealing with significant post-acne marks</li>
            <li>A slightly higher probability of mild flushing in sensitive skin — temporary, usually resolves within a few weeks</li>
            <li>Not necessary for dry, sensitive, or barrier-compromised skin</li>
            <li><strong>The right choice if oily or acne-prone skin is your profile</strong></li>
          </ul>
        </div>

        <p>The honest summary: if you have oily or acne-prone skin and your primary concerns are active breakouts, open pores, and dark marks — start with 10%. If you have dry, sensitive, or combination skin, or you are new to actives entirely — 5% is clinically effective and significantly more forgiving.</p>

        <hr className="post-rule" />

        <h2>Who Should Use 5%</h2>
        <p><strong>Beginners.</strong> If you have never used a niacinamide serum before, 5% gives you all the documented benefits with less risk. You will see oil control improve within two to four weeks. You will see pigmentation begin to shift within eight weeks. The difference versus 10% in terms of final results over three months is marginal for most skin types.</p>
        <p><strong>Sensitive and dry skin.</strong> Niacinamide at 5% actively supports skin barrier function — it increases ceramide synthesis, which is the structural lipid that holds your barrier together. At 10%, this benefit continues, but the formula is less suitable for skin that is already sensitised, over-exfoliated, or reactive.</p>
        <p><strong>Anyone layering multiple actives.</strong> If you are already using a Vitamin C serum in the morning and a retinol at night, a 5% niacinamide sits neatly in either slot without pushing your overall active load too high. Stacking 10% niacinamide on top of multiple other actives increases the probability of irritation — not because niacinamide is the problem, but because cumulative active load matters.</p>

        <BlogProductCard asin="B095PRGHDX" />

        <hr className="post-rule" />

        <h2>Who Should Use 10%</h2>
        <p><strong>Oily and acne-prone skin.</strong> This is the primary use case for 10%. The combination with zinc PCA — as used in Minimalist and The Ordinary's formulations — targets sebum production and open pores more aggressively. If you are producing enough oil to shine by 10am regardless of your cleanser, 10% is the right starting concentration.</p>
        <p><strong>Persistent post-acne marks.</strong> If you have dark marks from old breakouts that have not shifted with lower-concentration products, 10% applied consistently morning and night will show visible improvement within 8 to 12 weeks. The higher concentration accelerates melanosome transfer inhibition.</p>
        <p><strong>People who have already used 5% without reaction.</strong> If you have been using a 5% niacinamide daily for eight or more weeks without any irritation, stepping up to 10% is a logical move if you want faster results on pigmentation or oil control.</p>

        <BlogProductCard asin="B0DH88LZ11" />
        <BlogProductCard asin="B01MDTVZTZ" />

        <hr className="post-rule" />

        <h2>The Flushing Question</h2>
        <p>Some people experience temporary redness or a warm sensation after applying 10% niacinamide. This is often confused with an allergic reaction — it is not. It is a mild, transient vascular response that typically resolves within the first two to three weeks of use as the skin adjusts.</p>
        <p>If you experience this, reduce to once-daily application for the first two weeks before moving to twice daily. Do not switch products. The flushing means the ingredient is present at an active concentration — it is not a signal to stop.</p>
        <p>If you experience sustained redness, itching, or visible irritation beyond three weeks, your skin may be genuinely reactive to niacinamide. In that case, 5% is the more appropriate choice — and if irritation continues at 5%, a dermatologist consultation is the right next step.</p>

        <hr className="post-rule" />

        <h2>Common Mistakes With Both Concentrations</h2>
        <p><strong>Expecting results in two weeks.</strong> Oil control improves within two to four weeks. Pigmentation takes a minimum of eight weeks, often twelve. Take a photo before you start.</p>
        <p><strong>Using three products that all contain niacinamide.</strong> Many sunscreens, face washes, and moisturisers now include niacinamide in their formulations. This is fine — but if you are applying a dedicated 10% serum on top, check your other products. Cumulative niacinamide overload is usually what causes the flushing that gets blamed on the serum alone.</p>
        <p><strong>Switching concentrations before giving either one adequate time.</strong> Eight weeks minimum. This is the standard timeline across all clinical studies on niacinamide efficacy. Switching at week three because you have not seen results yet means you will never know whether the product was working.</p>

        <hr className="post-rule" />

        <h2>The Short Answer</h2>
        <div className="summary-box">
          <p>Start with <strong>5%</strong> if you are new to niacinamide, have sensitive or dry skin, or are layering multiple actives.</p>
          <p>Go to <strong>10%</strong> if you have oily or acne-prone skin, significant post-acne pigmentation, or you have already used 5% without issue and want faster results.</p>
          <p>Both concentrations work. The difference is speed and suitability — not fundamental efficacy.</p>
        </div>

        {/* ── FURTHER READING ── */}
        <div className="further-reading">
          <div className="further-reading-label">Further Reading</div>
          <ul>
            <li><Link href="/blog/best-niacinamide-serums-india"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Best Niacinamide Serums in India (2026)</span><span>Full ranked list →</span></Link></li>
            <li><Link href="/blog/what-niacinamide-does-to-your-skin"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>What Niacinamide Actually Does to Your Skin</span><span>The full science →</span></Link></li>
            <li><Link href="/blog/budget-skincare-routine-under-2000"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>4-Step Indian Skincare Routine Under ₹2000</span><span>Where it fits →</span></Link></li>
            <li><Link href="/blog/niacinamide-vs-vitamin-c"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Niacinamide vs Vitamin C — Which One for Indian Skin?</span><span>How to choose →</span></Link></li>
          </ul>
        </div>

        {/* ── SOURCES ── */}
        <div className="sources-section">
          <div className="sources-label">Sources</div>
          <ol className="sources-list">
            <li>Hakozaki T, et al. <em>The effect of niacinamide on reducing cutaneous pigmentation and suppression of melanosome transfer.</em> British Journal of Dermatology. 2002;147(1):20–31. <a href="https://academic.oup.com/bjd/article-abstract/147/1/20/6635091" target="_blank" rel="noopener noreferrer">Oxford Academic</a></li>
            <li>Smiels K, et al. <em>The effect of 2% niacinamide on facial sebum production.</em> Journal of Dermatological Treatment. 2006. <a href="https://www.researchgate.net/publication/7017890_The_effect_of_2_niacinamide_on_facial_sebum_production" target="_blank" rel="noopener noreferrer">ResearchGate</a></li>
            <li>Cosmetic Ingredient Review Expert Panel. <em>Final Report of the Safety Assessment of Niacinamide and Niacin.</em> International Journal of Toxicology. 2005. <a href="https://journals.sagepub.com/doi/pdf/10.1080/10915810500434183" target="_blank" rel="noopener noreferrer">SAGE Journals</a></li>
            <li>Marques C, et al. <em>Mechanistic Insights into the Multiple Functions of Niacinamide.</em> Antioxidants (MDPI). 2024;13(4):425. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11047333/" target="_blank" rel="noopener noreferrer">PMC</a></li>
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

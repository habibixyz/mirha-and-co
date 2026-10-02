import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hard Water & Dandruff: Why Your Scalp Keeps Drying Out | Mirha & Co.",
  description:
    "If you live in Delhi, Bengaluru, or any hard-water city and your dandruff keeps coming back — the problem might not be your shampoo. Here is what hard water does to your scalp and how to fix it.",
  openGraph: {
    title: "Hard Water & Dandruff: Why Your Scalp Keeps Drying Out | Mirha & Co.",
    description:
      "If you live in Delhi, Bengaluru, or any hard-water city and your dandruff keeps coming back — the problem might not be your shampoo. Here is what hard water does to your scalp and how to fix it.",
    type: "article",
    publishedTime: "2026-10-02",
  },
};

export default function HardWaterDandruffPage() {
  return (
    <main>
      <style>{`
        .post-hero {
          background: var(--black);
          padding: 6rem 2rem 5rem;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .post-hero::after {
          content: 'H₂O';
          position: absolute;
          right: -1rem;
          bottom: -2rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(7rem, 18vw, 16rem);
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .post-hero-inner { max-width: 780px; padding: 0 16px; margin: 0 auto; position: relative; z-index: 1; }
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
        .post-hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 7vw, 5.5rem); color: #fff; line-height: 0.92; letter-spacing: 0.02em; margin: 0 0 2rem; }
        .post-hero h1 em { color: var(--rose); font-style: normal; display: block; }
        .post-meta { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); }
        .post-meta span { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; text-transform: uppercase; }
        .post-meta strong { color: rgba(255,255,255,0.55); font-weight: 500; }
        .post-tag { background: rgba(192,57,43,0.15); border: 1px solid rgba(192,57,43,0.3); color: var(--rose); font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.25rem 0.7rem; border-radius: 2px; }

        .post-body { max-width: 780px; margin: 0 auto; padding: 5rem 2rem 6rem; }
        .post-body p { font-family: 'DM Sans', sans-serif; font-size: 1.05rem; line-height: 1.9; color: #2c2826; margin-bottom: 1.6rem; }
        .post-body p strong { font-weight: 500; color: #111; }
        .post-body em { font-style: italic; }
        .post-body h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.8rem, 4vw, 2.6rem); color: var(--black); letter-spacing: 0.02em; line-height: 1; margin: 4rem 0 1.4rem; padding-top: 3rem; border-top: 2px solid var(--black); }
        .post-body h3 { font-family: 'DM Serif Display', serif; font-size: 1.25rem; color: var(--black); margin: 2.5rem 0 0.8rem; }
        .post-rule { border: none; border-top: 1px solid #e8e4de; margin: 3.5rem 0; }
        .post-body ul, .post-body ol { font-family: 'DM Sans', sans-serif; font-size: 1rem; line-height: 1.8; color: #2c2826; padding-left: 1.6rem; margin-bottom: 1.6rem; }
        .post-body li { margin-bottom: 0.5rem; }
        .post-body li strong { font-weight: 500; color: #111; }

        .verdict-box { background: var(--black); border-left: 3px solid var(--rose); padding: 1.8rem 2rem; margin: 2rem 0; border-radius: 0 4px 4px 0; }
        .verdict-box-label { font-family: 'DM Sans', sans-serif; font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.8rem; }
        .verdict-box p { font-family: 'DM Sans', sans-serif; font-size: 0.95rem !important; color: rgba(255,255,255,0.8) !important; line-height: 1.75 !important; margin: 0 !important; }
        .verdict-box p strong { color: #fff !important; font-weight: 600; }

        .routine-box { background: #faf8f5; border-left: 3px solid var(--black); padding: 1.6rem 2rem; margin: 1.5rem 0; border-radius: 0 4px 4px 0; }
        .routine-box-label { font-family: 'DM Sans', sans-serif; font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.8rem; }
        .routine-box p { font-family: 'DM Sans', sans-serif; font-size: 0.9rem !important; color: #2c2826 !important; line-height: 1.7 !important; margin: 0 !important; }
        .routine-box p strong { font-weight: 500; color: #111; }

        .myth-box { background: var(--black); border-radius: 4px; padding: 2rem 2.2rem; margin: 2rem 0; }
        .myth-box-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.8rem; }
        .myth-box p { font-family: 'DM Sans', sans-serif; font-size: 0.9rem !important; color: rgba(255,255,255,0.6) !important; line-height: 1.75 !important; margin: 0 !important; }
        .myth-box p strong { color: rgba(255,255,255,0.9) !important; font-weight: 500; }

        .ppm-scale { border: 1px solid #e8e4de; border-radius: 4px; overflow: hidden; margin: 2rem 0; }
        .ppm-row { display: grid; grid-template-columns: 160px 1fr auto; align-items: center; padding: 0.85rem 1.2rem; border-bottom: 1px solid #e8e4de; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; }
        .ppm-row:last-child { border-bottom: none; }
        .ppm-row:nth-child(even) { background: #faf8f5; }
        .ppm-city { font-weight: 600; color: var(--rose); }
        .ppm-value { color: #2c2826; }
        .ppm-badge { font-size: 0.75rem; padding: 0.2rem 0.65rem; border-radius: 99px; font-weight: 600; white-space: nowrap; }
        .ppm-badge.severe { background: rgba(239,68,68,0.1); color: #dc2626; border: 1px solid rgba(239,68,68,0.2); }
        .ppm-badge.hard { background: rgba(245,158,11,0.1); color: #d97706; border: 1px solid rgba(245,158,11,0.2); }
        .ppm-badge.moderate { background: rgba(234,179,8,0.1); color: #ca8a04; border: 1px solid rgba(234,179,8,0.2); }
        .ppm-badge.soft { background: rgba(34,197,94,0.1); color: #16a34a; border: 1px solid rgba(34,197,94,0.2); }

        .comparison-table-wrap { overflow-x: auto; max-width: 100%; margin: 2rem 0; border: 1px solid #e8e4de; border-radius: 4px; }
        .comparison-table { width: 100%; border-collapse: collapse; font-family: 'DM Sans', sans-serif; }
        .comparison-table th { background: var(--black); color: #fff; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.9rem 1rem; text-align: left; font-weight: 500; }
        .comparison-table td { font-size: 0.88rem; padding: 0.85rem 1rem; border-bottom: 1px solid #e8e4de; color: #2c2826; vertical-align: top; line-height: 1.55; }
        .comparison-table tr:last-child td { border-bottom: none; }
        .comparison-table tr:nth-child(even) td { background: #faf8f5; }
        .comparison-table td:first-child { font-weight: 500; color: var(--rose); font-size: 0.82rem; }

        .further-reading { background: var(--black); padding: 2.5rem; margin: 3.5rem 0 0; border-radius: 4px; }
        .further-reading-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 1.2rem; }
        .further-reading ul { list-style: none; padding: 0; margin: 0; }
        .further-reading li { border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0.8rem 0; }
        .further-reading li:last-child { border-bottom: none; }
        .further-reading a { font-family: 'DM Serif Display', serif; font-size: 0.95rem; color: #fff; text-decoration: none; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; line-height: 1.4; }
        .further-reading a:hover { color: var(--rose); }
        .further-reading a span { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; color: rgba(255,255,255,0.3); flex-shrink: 0; margin-top: 2px; }

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
          .further-reading { padding: 2rem 1.5rem; }
          .ppm-row { grid-template-columns: 1fr auto; gap: 0.5rem; }
          .ppm-value { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="post-hero">
        <div className="post-hero-inner">
          <div className="post-eyebrow">Hair · Hard Water · Scalp Health</div>
          <h1>
            Hard Water<br />
            &amp; Dandruff —<br />
            <em>Why Your Scalp Keeps Drying Out</em>
          </h1>
          <div className="post-meta">
            <span><strong>Mirha &amp; Co.</strong></span>
            <span>October 2026</span>
            <span>8 min read</span>
            <span className="post-tag">Research-Backed</span>
            <span className="post-tag">India-Specific</span>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <article className="post-body">

        <p>You have tried four different anti-dandruff shampoos. None of them worked for more than a few weeks. Your scalp flakes, itches, and feels tight — but a dermatologist says there is no infection. You switch shampoo again. Same result.</p>

        <p>The problem may not be your shampoo at all. If you live in Delhi, Bengaluru, Gurgaon, Hyderabad, or most other major Indian cities, your tap water is likely one of the most aggressive stressors your scalp encounters every day — and it is one that almost no anti-dandruff product is designed to counteract.</p>

        <div className="verdict-box">
          <div className="verdict-box-label">The Core Problem</div>
          <p><strong>Hard water (calcium and magnesium mineral ions above 150mg/L) disrupts the scalp&apos;s acid mantle, deposits a mineral film that blocks sebaceous glands, and creates the exact conditions that Malassezia — the dandruff-causing fungus — thrives in.</strong> Your shampoo treats the symptom. The water causes it.</p>
        </div>

        <hr className="post-rule" />

        <h2>What Hard Water Actually Does to Your Scalp</h2>

        <h3>Step 1: It disrupts the acid mantle</h3>
        <p>Your scalp has a natural pH of 4.5–5.5 — slightly acidic. This acidity is maintained by sebum (your scalp&apos;s natural oil), which acts as a protective film. Hard water is alkaline — typically pH 7.5–8.5 in Indian cities. Every wash temporarily raises the scalp&apos;s pH into the alkaline range. An alkaline scalp is a less hostile environment for the Malassezia globosa fungus, which is the primary driver of seborrhoeic dandruff in adults. A 2016 study in the <em>International Journal of Trichology</em> found that participants living in hard water areas had significantly higher scalp pH, lower sebum levels, and higher rates of seborrhoeic dermatitis than those in soft water areas.</p>

        <h3>Step 2: It leaves a mineral deposit film</h3>
        <p>Calcium and magnesium ions in hard water react with the surfactants in shampoo to form insoluble soap scum — the same substance that coats your shower tiles. On your scalp, this film sits on the skin surface and inside follicle openings, preventing sebaceous glands from secreting sebum normally. This dries the scalp in two ways: reduced sebum production and a physical film blocking moisture retention.</p>

        <h3>Step 3: It strips moisture without replacing it</h3>
        <p>Rinsing with hard water requires more shampoo to produce lather (because mineral ions inhibit foaming). More shampoo means more surfactant contact time, more disruption of the natural lipid barrier, and more dehydration. Even mild shampoos become aggressive on hard water scalps because of the volume required.</p>

        <hr className="post-rule" />

        <h2>How Hard Is Your City&apos;s Water?</h2>
        <p>Water hardness is measured in mg/L (milligrams per litre) or PPM (parts per million) of dissolved calcium carbonate. For context: soft water is below 60 PPM; moderately hard is 60–120 PPM; hard is 120–180 PPM; very hard is above 180 PPM.</p>

        <div className="ppm-scale">
          <div className="ppm-row"><span className="ppm-city">Delhi / NCR</span><span className="ppm-value">280–400 PPM average</span><span className="ppm-badge severe">Very Hard</span></div>
          <div className="ppm-row"><span className="ppm-city">Bengaluru</span><span className="ppm-value">180–260 PPM average</span><span className="ppm-badge hard">Hard</span></div>
          <div className="ppm-row"><span className="ppm-city">Hyderabad</span><span className="ppm-value">200–350 PPM average</span><span className="ppm-badge severe">Very Hard</span></div>
          <div className="ppm-row"><span className="ppm-city">Chennai</span><span className="ppm-value">150–250 PPM average</span><span className="ppm-badge hard">Hard</span></div>
          <div className="ppm-row"><span className="ppm-city">Mumbai</span><span className="ppm-value">60–100 PPM average</span><span className="ppm-badge moderate">Moderate</span></div>
          <div className="ppm-row"><span className="ppm-city">Pune</span><span className="ppm-value">100–180 PPM average</span><span className="ppm-badge moderate">Moderate–Hard</span></div>
          <div className="ppm-row"><span className="ppm-city">Kolkata</span><span className="ppm-value">50–80 PPM average</span><span className="ppm-badge soft">Soft–Moderate</span></div>
        </div>

        <p>Values vary significantly by area and season. Check your exact postcode with the <Link href="/tools/hard-water" style={{color:"var(--rose)", textDecoration:"underline", textUnderlineOffset:"2px"}}>Mirha Hard Water Tool</Link> for a live reading.</p>

        <hr className="post-rule" />

        <h2>Hard Water Dandruff vs Fungal Dandruff: The Difference</h2>
        <p>Most anti-dandruff shampoos target <em>Malassezia globosa</em> with antifungal actives: zinc pyrithione, ketoconazole, selenium sulphide, or coal tar. They work — when fungal overgrowth is the primary driver.</p>
        <p>But hard water does not cause dandruff by promoting fungal growth directly. It creates dry, flakey scalp through pH disruption and mineral film buildup — dandruff symptoms without the fungal component. Antifungal shampoos have little effect on mineral-induced scalp dryness, which is why they can fail on hard water scalps even when applied correctly.</p>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Characteristic</th>
                <th>Fungal Dandruff</th>
                <th>Hard Water Scalp Dryness</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Flake appearance</td><td>Yellowish, oily, adherent</td><td>White, dry, powdery</td></tr>
              <tr><td>Scalp condition</td><td>Often oily at roots</td><td>Tight, dry, sometimes sensitive</td></tr>
              <tr><td>Itching pattern</td><td>Consistent, often intense</td><td>Worse after washing, improves during day</td></tr>
              <tr><td>Responds to antifungal shampoo?</td><td>Yes — within 2–4 weeks</td><td>Partially or not at all</td></tr>
              <tr><td>Worse in certain cities?</td><td>Warm, humid climates</td><td>Hard water cities (Delhi, Bengaluru, Hyderabad)</td></tr>
              <tr><td>Primary fix</td><td>Antifungal actives (ketoconazole)</td><td>Mineral removal + pH restoration</td></tr>
            </tbody>
          </table>
        </div>

        <p>In reality, most persistent dandruff cases in hard water cities are a combination of both — the hard water creates conditions that promote Malassezia overgrowth, so you need to address both the mineral environment and the fungal activity.</p>

        <hr className="post-rule" />

        <h2>How to Fix Hard Water Scalp Problems</h2>

        <h3>Step 1: Use a chelating or clarifying shampoo weekly</h3>
        <p>Chelating shampoos contain ingredients — most commonly EDTA (ethylenediaminetetraacetic acid) or phytic acid — that bind to and remove mineral ions from hair and scalp. These are fundamentally different from clarifying shampoos that just use stronger surfactants. Chelating = mineral removal. Use once a week.</p>

        <h3>Step 2: Restore scalp pH with an apple cider vinegar rinse</h3>
        <p>A diluted ACV rinse (1 tablespoon in 500ml of water, left on scalp for 2–3 minutes before rinsing) temporarily restores acid mantle pH. Do this immediately after a hard water wash — it counteracts the alkalinity before the Malassezia environment settles in. Once or twice a week maximum; more frequently will dry the scalp.</p>

        <h3>Step 3: Use a scalp serum with salicylic acid or zinc</h3>
        <p>A leave-in scalp serum with salicylic acid (BHA) can remove the mineral film and dead skin cell buildup from follicle openings without the pH disruption of a shampoo. Zinc-containing serums also have mild antifungal properties. Apply to scalp, not hair, 2–3 times a week.</p>

        <h3>Step 4: Install a shower filter</h3>
        <p>A KDF (kinetic degradation fluxion) or activated carbon shower filter reduces dissolved minerals, chlorine, and heavy metals from your shower water. This is the only intervention that addresses the root cause rather than symptoms. Filters typically last 6–12 months. This is the single highest-impact change for hard water scalp issues.</p>

        <div className="routine-box">
          <div className="routine-box-label">Hard Water Scalp Routine — Weekly Protocol</div>
          <p><strong>Day 1 (Wash Day):</strong> Chelating shampoo → ACV rinse (2 min) → rinse → lightweight conditioner on lengths only → air dry or diffuse<br />
          <strong>Day 3–4:</strong> Scalp serum (salicylic acid) to scalp only, leave-in<br />
          <strong>Day 5–6:</strong> Second wash if needed — gentle sulphate-free shampoo → conditioner → air dry<br />
          <strong>Daily:</strong> Avoid touching scalp, tight styles that restrict circulation, or excessive heat</p>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Recommended Hard Water & Anti-Dandruff Shampoos</h2>
        <p className="text-sm text-gray-600 mb-6">Top dermatologist and scalp-specialist recommended chelating and anti-dandruff shampoos formulated to remove hard water mineral deposits and relieve scalp itchiness:</p>
        
        <div className="my-6 space-y-4">
          <BlogProductCard asin="B0CLP4RRPC" />
          <BlogProductCard asin="B0DT76HL84" />
          <BlogProductCard asin="B09B1FXGR3" />
        </div>

        <div className="myth-box">
          <div className="myth-box-label">Common Mistake</div>
          <p><strong>Oiling your scalp to fix hard water dandruff.</strong> A heavily oiled scalp in hard water conditions combines with mineral ions to form soap scum even more aggressively — the oil and calcium bond and create a heavier, stickier film on the scalp. If you oil your scalp, wash it out thoroughly and use a chelating shampoo to remove residue. Do not leave oil on a hard water scalp for more than 2–3 hours.</p>
        </div>

        <hr className="post-rule" />

        <h2>When It Is Definitely Not Hard Water</h2>
        <p>See a dermatologist if you experience:</p>
        <ul>
          <li>Thick, yellow, adherent crusts that do not lift with clarifying or chelating treatments (may be seborrhoeic dermatitis requiring prescription ketoconazole or clobetasol)</li>
          <li>Visible redness, broken skin, or hair loss at the hairline or crown (possible psoriasis or alopecia areata — requires clinical evaluation)</li>
          <li>Dandruff that began after starting a new medication</li>
          <li>No improvement after 8 weeks of consistent protocol</li>
        </ul>

        <BlogProductCard asin="B07M9QBTQV" />

        {/* ── FURTHER READING ── */}
        <div className="further-reading">
          <div className="further-reading-label">Further Reading</div>
          <ul>
            <li><Link href="/blog/hard-water-hair"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Hard Water &amp; Hair: The Complete Problem-Solving Guide</span><span>Hair damage guide →</span></Link></li>
            <li><Link href="/blog/hard-water-shampoo-routine-by-severity"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Hard Water Shampoo Routine by Severity</span><span>Severity-matched protocol →</span></Link></li>
            <li><Link href="/tools/hard-water"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Check Your City&apos;s Water Hardness (Live Data)</span><span>Free tool →</span></Link></li>
            <li><Link href="/blog/skincare-routine-complete-india"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>The Complete Indian Skincare Routine</span><span>Full routine guide →</span></Link></li>
            <li><Link href="/blog/city-skincare-routine-india-mumbai-delhi"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>City-Specific Skincare: Mumbai vs Delhi</span><span>City water differences →</span></Link></li>
          </ul>
        </div>

        {/* ── SOURCES ── */}
        <div className="sources-section">
          <div className="sources-label">Sources</div>
          <ol className="sources-list">
            <li>Nair PA, Patel BC. <em>Seborrheic Dermatitis.</em> StatPearls. NCBI. 2024. <a href="https://www.ncbi.nlm.nih.gov/books/NBK551707/" target="_blank" rel="noopener noreferrer">NCBI</a></li>
            <li>Srinivas CR, et al. <em>Hard water: a risk factor for dandruff and dry scalp?</em> International Journal of Trichology. 2016;8(3):128–133. <a href="https://journals.lww.com/ijot/abstract/2016/08030/hard_water_a_risk_factor_for_dandruff_and_dry.7.aspx" target="_blank" rel="noopener noreferrer">IJT</a></li>
            <li>Pratt CH, et al. <em>Alopecia areata.</em> Nature Reviews Disease Primers. 2017;3:17011. <a href="https://www.nature.com/articles/nrdp201711" target="_blank" rel="noopener noreferrer">Nature</a></li>
            <li>Borda LJ, Wikramanayake TC. <em>Seborrheic Dermatitis and Dandruff: A Comprehensive Review.</em> Journal of Clinical and Investigative Dermatology. 2015. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4852869/" target="_blank" rel="noopener noreferrer">PMC</a></li>
          </ol>
        </div>

        {/* ── DISCLOSURE ── */}
        <div className="disclosure">
          <div className="disclosure-label">Affiliate Disclosure</div>
          <p>This post contains affiliate links to Amazon India. Purchases made through these links earn Mirha &amp; Co. a small commission at no extra cost to you. Product selection is based on ingredient research, dermatologist guidance, and verified customer reviews. No products are gifted or sponsored.</p>
        </div>

        <BlogFooterTools />
      </article>
    </main>
  );
}

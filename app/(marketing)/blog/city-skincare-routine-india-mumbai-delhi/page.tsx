import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Mumbai Monsoon vs Delhi Pollution: How Your Skincare Routine Should Actually Differ",
  description:
    "'Best skincare for Indian skin' treats the whole country like one climate. It isn't. What your skin fights in monsoon Mumbai is almost the opposite of what it fights in pollution-heavy Delhi.",
  openGraph: {
    title: "Mumbai Monsoon vs Delhi Pollution: How Your Skincare Routine Should Actually Differ",
    description:
      "'Best skincare for Indian skin' treats the whole country like one climate. It isn't. What your skin fights in monsoon Mumbai is almost the opposite of what it fights in pollution-heavy Delhi.",
    type: "article",
    publishedTime: "2026-06-29",
  },
};

export default function CitySkincareRoutinePage() {
  return (
    <main>
      <style>{`
        .post-hero { background: var(--black); padding: 6rem 2rem 5rem; position: relative; overflow: hidden; }
        .post-hero::after { content: 'CITY'; position: absolute; right: -1rem; bottom: -4rem; font-family: 'Bebas Neue', sans-serif; font-size: 16rem; color: rgba(255,255,255,0.025); line-height: 1; pointer-events: none; user-select: none; white-space: nowrap; }
        .post-hero-inner { max-width: 780px; margin: 0 auto; position: relative; z-index: 1; }
        .post-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; font-family: 'DM Sans', sans-serif; font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--rose); margin-bottom: 1.6rem; }
        .post-eyebrow::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--rose); }
        .post-hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 7vw, 6rem); color: #fff; line-height: 0.92; letter-spacing: 0.02em; margin: 0 0 2rem; }
        .post-hero h1 em { color: var(--rose); font-style: normal; display: block; }
        .post-meta { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); }
        .post-meta span { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; text-transform: uppercase; }
        .post-meta strong { color: rgba(255,255,255,0.55); font-weight: 500; }
        .post-tag { background: rgba(192,57,43,0.15); border: 1px solid rgba(192,57,43,0.3); color: var(--rose); font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.25rem 0.7rem; border-radius: 2px; }
        .post-body { max-width: 780px; margin: 0 auto; padding: 5rem 2rem 6rem; }
        .post-body p { font-family: 'DM Sans', sans-serif; font-size: 1.05rem; line-height: 1.9; color: #2c2826; margin-bottom: 1.6rem; }
        .post-body p:not(.summary-box p) strong { font-weight: 500; color: #111; }
        .post-body h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.8rem, 4vw, 2.6rem); color: var(--black); letter-spacing: 0.02em; line-height: 1; margin: 4rem 0 1.4rem; padding-top: 3rem; border-top: 2px solid var(--black); }
        .post-body h3 { font-family: 'DM Serif Display', serif; font-size: 1.25rem; color: var(--black); margin: 2.5rem 0 0.8rem; }
        .post-rule { border: none; border-top: 1px solid #e8e4de; margin: 3.5rem 0; }
        .post-body ul, .post-body ol { font-family: 'DM Sans', sans-serif; font-size: 1rem; line-height: 1.8; color: #2c2826; padding-left: 1.6rem; margin-bottom: 1.6rem; }
        .post-body li { margin-bottom: 0.5rem; }
        .post-body li strong { font-weight: 500; color: #111; }
        .city-block { border-radius: 6px; padding: 2rem; margin: 2rem 0; }
        .city-block.mumbai { background: #f0f4ff; border-left: 4px solid #3b82f6; }
        .city-block.delhi { background: #fff8e8; border-left: 4px solid #f59e0b; }
        .city-block.bengaluru { background: #f0faf0; border-left: 4px solid #22c55e; }
        .city-block.chennai { background: #fdf4ff; border-left: 4px solid #a855f7; }
        .city-block-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 700; margin-bottom: 0.4rem; }
        .city-block.mumbai .city-block-label { color: #2563eb; }
        .city-block.delhi .city-block-label { color: #d97706; }
        .city-block.bengaluru .city-block-label { color: #16a34a; }
        .city-block.chennai .city-block-label { color: #9333ea; }
        .city-block h3 { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: var(--black); margin: 0 0 1rem; }
        .city-block ul { margin: 0; padding-left: 1.4rem; }
        .city-block li { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; color: #2c2826; line-height: 1.75; margin-bottom: 0.5rem; }
        .quick-ref-wrap { overflow-x: auto; margin: 2rem 0; }
        .quick-ref { width: 100%; border-collapse: collapse; font-family: 'DM Sans', sans-serif; }
        .quick-ref th { background: var(--black); color: #fff; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.8rem 1rem; text-align: left; }
        .quick-ref td { font-size: 0.88rem; padding: 0.8rem 1rem; border-bottom: 1px solid #e8e4de; color: #2c2826; line-height: 1.55; }
        .quick-ref tr:last-child td { border-bottom: none; }
        .quick-ref tr:nth-child(even) td { background: #faf8f5; }
        .quick-ref td:first-child { font-weight: 600; color: var(--rose); }
        .summary-box { background: var(--black); padding: 2.2rem 2.5rem; margin: 2.5rem 0; border-radius: 4px; }
        .summary-box p { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.05rem; color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 0.8rem; }
        .summary-box p:last-child { margin-bottom: 0; }
        .summary-box strong { color: #fff; font-weight: 400; font-style: normal; }
        .further-reading { background: var(--black); padding: 2.5rem; margin: 3.5rem 0 0; border-radius: 4px; }
        .further-reading-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 1.2rem; }
        .further-reading ul { list-style: none; padding: 0; margin: 0; }
        .further-reading li { border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0.8rem 0; }
        .further-reading li:last-child { border-bottom: none; }
        .further-reading a { font-family: 'DM Serif Display', serif; font-size: 0.95rem; color: #fff; text-decoration: none; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; line-height: 1.4; }
        .further-reading a:hover { color: var(--rose); }
        .further-reading a span { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; color: rgba(255,255,255,0.3); flex-shrink: 0; margin-top: 2px; }
        .disclosure { margin-top: 3rem; padding: 1.2rem 1.5rem; border: 1px solid #e8e4de; border-radius: 4px; }
        .disclosure-label { font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.25em; text-transform: uppercase; color: #ccc; margin-bottom: 0.4rem; }
        .disclosure p { font-size: 0.78rem !important; color: #bbb !important; margin: 0 !important; line-height: 1.6 !important; }
        .back-to-journal { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.4); text-decoration: none; margin-bottom: 2.2rem; letter-spacing: 0.15em; text-transform: uppercase; transition: color 0.2s ease; display: block; width: max-content; }
        .back-to-journal:hover { color: var(--rose); }
        @media (max-width: 640px) {
          .post-hero { padding: 4rem 1.5rem 3rem; }
          .back-to-journal { margin-bottom: 1.5rem; }
          .post-body { padding: 3rem 1.5rem 4rem; }
          .further-reading { padding: 1.5rem 1.25rem !important; }
          .further-reading a { flex-direction: column !important; align-items: flex-start !important; gap: 0.35rem !important; }
          .further-reading a span { white-space: normal !important; display: block !important; width: 100% !important; }
          .further-reading a span:first-child { font-size: 0.9rem !important; line-height: 1.35 !important; }
          .further-reading a span:last-child { font-size: 0.72rem !important; color: var(--rose) !important; margin-top: 0.1rem !important; }
        }
      `}</style>

      <section className="post-hero">
        <div className="post-hero-inner">
          <Link href="/blog" className="back-to-journal">
            ← Back to Journal
          </Link>
          <div className="post-eyebrow">Beauty · Skincare · City-Specific Routines</div>
          <h1>
            Mumbai Monsoon<br />
            vs Delhi Pollution —<br />
            <em>Your Routine Should Differ</em>
          </h1>
          <div className="post-meta">
            <span><strong>Mirha & Co.</strong></span>
            <span>29 June 2026</span>
            <span>7 min read</span>
            <span className="post-tag">City Guide</span>
            <span className="post-tag">Indian Climate</span>
          </div>
        </div>
      </section>

      <article className="post-body">

        <p>"Best skincare routine for Indian skin" treats the whole country like one climate. It isn't. What your skin fights in monsoon-soaked Mumbai is almost the opposite of what it fights in pollution-heavy Delhi, and a routine built for one will underperform in the other.</p>
        <p>Here's how to adjust based on where you actually live.</p>

        <hr className="post-rule" />

        <h2>Mumbai & Coastal Cities: Humidity Is the Main Enemy</h2>

        <div className="city-block mumbai">
          <div className="city-block-label">Mumbai / Coastal Monsoon</div>
          <h3>Heavy rain, high humidity, low-30s°C</h3>
          <ul>
            <li><strong>Cleanser:</strong> Go gel-based with salicylic acid (if acne-prone) to cut through humidity-driven oil without over-stripping.</li>
            <li><strong>Serum:</strong> Niacinamide is your single most useful active here — it regulates sebum directly, which matters more in Mumbai's climate than almost anywhere else.</li>
            <li><strong>Moisturiser:</strong> Lightweight, gel-based, oil-free. Heavy creams will feel suffocating and can contribute to monsoon breakouts.</li>
            <li><strong>Sunscreen:</strong> Non-greasy, matte-finish formulas. UV index stays high even on overcast monsoon days — skipping SPF because it's raining is a mistake.</li>
            <li><strong>Hair:</strong> Monsoon rain can be acidic and carry pollutants — balance frequent washing against not over-stripping with a gentle daily shampoo.</li>
          </ul>
        </div>

        <BlogProductCard asin="B08F9MF314" />
        <BlogProductCard asin="B09JVNZVH3" />

        <hr className="post-rule" />

        <h2>Delhi & North Indian Cities: Pollution and Extreme Dryness</h2>

        <div className="city-block delhi">
          <div className="city-block-label">Delhi / North India</div>
          <h3>Punishing dry heat in summer, severe air pollution in autumn/winter, hard water</h3>
          <ul>
            <li><strong>Cleanser:</strong> Double cleanse in the evening if you're out in heavy pollution — an oil or balm cleanser first to lift particulate buildup, then a gentle water-based one.</li>
            <li><strong>Serum:</strong> Vitamin C earns its place here more than anywhere else — it's your main defence against pollution-driven oxidative stress and dullness. Pair with niacinamide for barrier support.</li>
            <li><strong>Moisturiser:</strong> Richer than what Mumbai needs. Delhi's dry heat and seasonal cold both pull moisture out of skin — look for ceramide-based creams rather than gel formulas.</li>
            <li><strong>Sunscreen:</strong> Still daily, still non-negotiable. You can go for slightly more hydrating formulas than the strictly-matte ones suited to Mumbai.</li>
            <li><strong>Hair:</strong> Delhi has some of the hardest water in the country — see our <Link href="/blog/hard-water-shampoo-routine-by-severity" style={{color:"var(--rose)"}}>hard water routine guide</Link> and treat it as a baseline assumption.</li>
          </ul>
        </div>

        <BlogProductCard asin="B07DSC6CWP" />
        <BlogProductCard asin="B07VP5JFRB" />

        <hr className="post-rule" />

        <h2>Bengaluru & Pune: Mild Climate, Seasonal Trap</h2>

        <div className="city-block bengaluru">
          <div className="city-block-label">Bengaluru / Pune / Moderate Cities</div>
          <h3>Milder year-round with seasonal variation</h3>
          <ul>
            <li>Treat it as a hybrid: lighter, oil-control-leaning routine April through September; slightly richer moisturiser October through February.</li>
            <li>Don't skip SPF just because the city "feels" cooler — UV exposure is about altitude and latitude more than how hot it feels on your skin.</li>
          </ul>
        </div>

        <hr className="post-rule" />

        <h2>Chennai, Hyderabad & Southern Coastal Cities</h2>

        <div className="city-block chennai">
          <div className="city-block-label">Chennai / Hyderabad / Southern Coastal</div>
          <h3>Similar humidity profile to Mumbai, often paired with harder water and more intense heat</h3>
          <ul>
            <li>Follow the Mumbai oil-control logic for cleanser and moisturiser.</li>
            <li>Follow the Delhi hard-water logic for hair care — Chennai and Hyderabad both see significant hard water issues, and the damage compounds with heat-driven sweat and more frequent washing.</li>
          </ul>
        </div>

        <BlogProductCard asin="B0CLP4RRPC" />

        <hr className="post-rule" />

        <h2>Quick Reference</h2>
        <div className="quick-ref-wrap">
          <table className="quick-ref">
            <thead>
              <tr><th>City Type</th><th>Main Enemy</th><th>Key Adjustment</th></tr>
            </thead>
            <tbody>
              <tr><td>Mumbai / Coastal Monsoon</td><td>Humidity, oil, breakouts</td><td>Gel everything, niacinamide-led</td></tr>
              <tr><td>Delhi / North India</td><td>Pollution, dryness, hard water</td><td>Double cleanse, vitamin C-led, richer moisturiser</td></tr>
              <tr><td>Bengaluru / Pune</td><td>Mild but seasonal</td><td>Hybrid routine, don't skip SPF</td></tr>
              <tr><td>Chennai / Hyderabad</td><td>Heat + hard water</td><td>Mumbai skincare logic + Delhi hair-care logic</td></tr>
            </tbody>
          </table>
        </div>

        <hr className="post-rule" />

        <h2>The One Rule That Doesn't Change by City</h2>
        <div className="summary-box">
          <p><strong>Sunscreen, every single day, regardless of weather, season, or how the sky looks.</strong></p>
          <p>UV damage doesn't pause for monsoon clouds or winter chill, and it's the single biggest controllable factor in pigmentation, premature ageing, and undoing whatever your brightening serum is trying to do.</p>
        </div>

        <div className="further-reading">
          <div className="further-reading-label">Further Reading</div>
          <ul>
            <li><Link href="/blog/humidity-skincare-india"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Everything Indian Humidity Does to Your Skin</span><span>Full humidity guide →</span></Link></li>
            <li><Link href="/blog/hard-water-shampoo-routine-by-severity"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Hard Water Hair Damage: Routine by Severity</span><span>Shampoo picks →</span></Link></li>
            <li><Link href="/blog/why-skincare-routine-stops-working-indian-summer"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Why Your Routine Stops Working in Indian Summer</span><span>Season guide →</span></Link></li>
            <li><Link href="/dashboard/routines"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>AI Routine Builder — Personalised for Your City & Skin Type</span><span>Try it free →</span></Link></li>
          </ul>
        </div>

        <div className="disclosure">
          <div className="disclosure-label">Affiliate Disclosure</div>
          <p>This post contains affiliate links to Amazon India (Store ID: skinwithtanvi-21). Mirha & Co. may earn a commission at no extra cost to you. Product selection is based on ingredient research, not sponsorship.</p>
        </div>

        <BlogFooterTools />
      </article>
    </main>
  );
}

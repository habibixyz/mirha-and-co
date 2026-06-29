import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Vitamin C, Niacinamide & Retinol Layering Order — A No-Guesswork Guide",
  description:
    "The most common skincare mistake isn't picking the wrong product — it's layering the right products in the wrong order. Here's the exact sequence for Indian skin and humidity.",
  openGraph: {
    title: "Vitamin C, Niacinamide & Retinol Layering Order — A No-Guesswork Guide",
    description:
      "The most common skincare mistake isn't picking the wrong product — it's layering the right products in the wrong order. Here's the exact sequence for Indian skin and humidity.",
    type: "article",
    publishedTime: "2026-06-29",
  },
};

export default function LayeringOrderPage() {
  return (
    <main>
      <style>{`
        .post-hero { background: var(--black); padding: 6rem 2rem 5rem; position: relative; overflow: hidden; }
        .post-hero::after { content: 'ORDER'; position: absolute; right: -1rem; bottom: -4rem; font-family: 'Bebas Neue', sans-serif; font-size: 14rem; color: rgba(255,255,255,0.025); line-height: 1; pointer-events: none; user-select: none; white-space: nowrap; }
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
        .routine-block { background: #faf8f5; border-left: 3px solid var(--rose); padding: 1.4rem 1.8rem; margin: 2rem 0; font-family: 'DM Mono', monospace; font-size: 0.9rem; color: #2c2826; line-height: 1.8; border-radius: 0 4px 4px 0; }
        .week-table-wrap { overflow-x: auto; margin: 2rem 0; }
        .week-table { width: 100%; border-collapse: collapse; font-family: 'DM Sans', sans-serif; }
        .week-table th { background: var(--black); color: #fff; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.8rem 1rem; text-align: left; font-weight: 500; }
        .week-table td { font-size: 0.88rem; padding: 0.75rem 1rem; border-bottom: 1px solid #e8e4de; color: #2c2826; line-height: 1.5; }
        .week-table tr:last-child td { border-bottom: none; }
        .week-table tr:nth-child(even) td { background: #faf8f5; }
        .week-table td:first-child { font-weight: 600; color: var(--rose); font-size: 0.82rem; }
        .callout-box { border: 1px solid #e8e4de; border-radius: 4px; padding: 1.6rem 1.8rem; margin: 2rem 0; }
        .callout-box-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.8rem; }
        .callout-box ul { margin: 0; padding-left: 1.4rem; }
        .callout-box li { font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: #2c2826; line-height: 1.7; margin-bottom: 0.5rem; }
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
          <div className="post-eyebrow">Beauty · Skincare · Routine Science</div>
          <h1>
            Vitamin C, Niacinamide<br />
            & Retinol —<br />
            <em>The Right Layering Order</em>
          </h1>
          <div className="post-meta">
            <span><strong>Mirha & Co.</strong></span>
            <span>29 June 2026</span>
            <span>7 min read</span>
            <span className="post-tag">No-Guesswork Guide</span>
            <span className="post-tag">Indian Humidity</span>
          </div>
        </div>
      </section>

      <article className="post-body">

        <p>The most common skincare mistake we see isn't picking the wrong product. It's layering the right products in the wrong order, or on the wrong nights, and wondering why nothing's working.</p>
        <p>Here's the order that actually holds up — for Indian skin and Indian humidity.</p>

        <hr className="post-rule" />

        <h2>The Golden Rule First</h2>
        <p><strong>Never use vitamin C and retinol in the same routine, and never use retinol two nights in a row when you're starting out.</strong> Everything else below builds around this one rule.</p>

        <hr className="post-rule" />

        <h2>Morning Routine: Vitamin C Goes Here</h2>
        <div className="routine-block">
          Cleanser → Vitamin C serum → Niacinamide (optional) → Moisturiser → Sunscreen
        </div>
        <p>Vitamin C is a morning active. It works as an antioxidant against UV and pollution damage, so it makes sense alongside your sunscreen rather than at night when you're not exposed to either. Apply it to clean, dry skin, wait 2–3 minutes for it to absorb, then move to your next step.</p>
        <p><strong>On the "vitamin C + niacinamide cancel each other out" myth</strong> — this comes from old research on unstable, high-temperature lab conditions using pure ascorbic acid. In modern stabilised formulations at skin temperature, the interaction is negligible, and most dermatologists now consider the two compatible. If your skin tolerates both, using them in the same morning routine is fine.</p>

        <BlogProductCard asin="B08F9MF314" />

        <hr className="post-rule" />

        <h2>Night Routine: Retinol and Niacinamide Go Here</h2>
        <div className="routine-block">
          Cleanser → Niacinamide (on non-retinol nights) → Retinol (2–3x a week to start) → Moisturiser
        </div>
        <p>Retinol is the one active that genuinely needs a slow introduction. Start once or twice a week, see how your skin responds over 2 weeks, then increase frequency gradually. Most people land at every-other-night within 6–8 weeks. Apply it to fully dry skin — wet skin increases absorption and irritation — wait a few minutes, then moisturise.</p>
        <p>On nights you're not using retinol, niacinamide fits well here instead — it's gentle enough for daily use and helps offset any dryness retinol causes on the nights in between.</p>

        <BlogProductCard asin="B01MDTVZTZ" />

        <hr className="post-rule" />

        <h2>Why Not All Three Together</h2>
        <p>It's not that combining them is dangerous. It's that doing so usually causes more irritation than benefit, especially in Indian humidity where the skin barrier is already working overtime against sweat, pollution, and sun. Spacing actives across AM/PM and across the week means each one gets to do its job without your skin staging a protest.</p>

        <hr className="post-rule" />

        <h2>A Simple Weekly Template</h2>
        <div className="week-table-wrap">
          <table className="week-table">
            <thead>
              <tr><th>Day</th><th>AM</th><th>PM</th></tr>
            </thead>
            <tbody>
              <tr><td>Mon</td><td>Vitamin C + Niacinamide</td><td>Retinol</td></tr>
              <tr><td>Tue</td><td>Vitamin C + Niacinamide</td><td>Niacinamide</td></tr>
              <tr><td>Wed</td><td>Vitamin C + Niacinamide</td><td>Retinol</td></tr>
              <tr><td>Thu</td><td>Vitamin C + Niacinamide</td><td>Niacinamide</td></tr>
              <tr><td>Fri</td><td>Vitamin C + Niacinamide</td><td>Retinol</td></tr>
              <tr><td>Sat</td><td>Vitamin C + Niacinamide</td><td>Niacinamide</td></tr>
              <tr><td>Sun</td><td>Vitamin C + Niacinamide</td><td>Niacinamide</td></tr>
            </tbody>
          </table>
        </div>
        <p>This is a starting template, not a rule carved in stone — once your skin is used to retinol, you can move toward nightly use if there's no irritation.</p>

        <hr className="post-rule" />

        <h2>Salicylic Acid — Where Does It Fit?</h2>
        <p>If you're also using a salicylic acid (BHA) for acne or congestion, treat it like retinol: it's an exfoliant, so it competes for the same "one strong active per night" slot. Alternate BHA nights with retinol nights rather than stacking them, especially in your first 8 weeks.</p>

        <hr className="post-rule" />

        <h2>Common Layering Mistakes We See</h2>
        <div className="callout-box">
          <div className="callout-box-label">Mistakes to Avoid</div>
          <ul>
            <li><strong>Applying retinol on wet skin</strong> — increases irritation without improving results. Always pat skin fully dry first.</li>
            <li><strong>Skipping sunscreen the morning after a retinol night</strong> — retinol increases sun sensitivity. Non-negotiable, every single day.</li>
            <li><strong>Going straight to daily retinol</strong> — the single biggest cause of "retinol didn't work for me" stories. Slow ramp-up isn't optional.</li>
            <li><strong>Adding new actives before giving existing ones 2 weeks</strong> — you'll never know what's working or causing irritation.</li>
          </ul>
        </div>

        <hr className="post-rule" />

        <h2>The Bottom Line</h2>
        <div className="summary-box">
          <p><strong>Vitamin C in the morning, retinol at night a few times a week, niacinamide filling the gaps.</strong> That's the whole system.</p>
          <p>Consistency over months matters far more than how many actives you can fit into one routine.</p>
        </div>

        <div className="further-reading">
          <div className="further-reading-label">Further Reading</div>
          <ul>
            <li><Link href="/blog/niacinamide-vs-vitamin-c"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Niacinamide vs Vitamin C — Which One for Indian Skin?</span><span>How to choose →</span></Link></li>
            <li><Link href="/blog/minimalist-vs-ordinary-niacinamide"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Minimalist vs The Ordinary — Which Niacinamide Wins?</span><span>Head-to-head →</span></Link></li>
            <li><Link href="/blog/skincare-layering-order"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>The Right Order to Apply Your Skincare</span><span>Full sequence →</span></Link></li>
            <li><Link href="/blog/salicylic-acid-guide-india"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Salicylic Acid Guide for Indian Skin</span><span>BHA deep dive →</span></Link></li>
          </ul>
        </div>

        <div className="disclosure">
          <div className="disclosure-label">Affiliate Disclosure</div>
          <p>This post contains affiliate links to Amazon India (Store ID: skinwithtanvi-21). Purchases made through these links earn Mirha & Co. a small commission at no extra cost to you. Product selection is based on ingredient research, not sponsorship.</p>
        </div>

        <BlogFooterTools />
      </article>
    </main>
  );
}

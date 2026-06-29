import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Hard Water Hair Damage: The Right Shampoo & Routine, By Severity",
  description:
    "Run our Hard Water Test and got a result? Here's what to actually do about it, matched to how bad your water really is — mild, moderate, or severe buildup.",
  openGraph: {
    title: "Hard Water Hair Damage: The Right Shampoo & Routine, By Severity",
    description:
      "Run our Hard Water Test and got a result? Here's what to actually do about it, matched to how bad your water really is — mild, moderate, or severe buildup.",
    type: "article",
    publishedTime: "2026-06-29",
  },
};

export default function HardWaterShampooPage() {
  return (
    <main>
      <style>{`
        .post-hero { background: var(--black); padding: 6rem 2rem 5rem; position: relative; overflow: hidden; }
        .post-hero::after { content: 'H2O'; position: absolute; right: -1rem; bottom: -4rem; font-family: 'Bebas Neue', sans-serif; font-size: 16rem; color: rgba(255,255,255,0.025); line-height: 1; pointer-events: none; user-select: none; }
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
        .severity-block { border-radius: 6px; padding: 2rem; margin: 2rem 0; }
        .severity-block.mild { background: #f0faf0; border-left: 4px solid #4caf50; }
        .severity-block.moderate { background: #fff8e1; border-left: 4px solid #ffc107; }
        .severity-block.severe { background: #fdf1f0; border-left: 4px solid var(--rose); }
        .severity-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 0.5rem; font-weight: 600; }
        .severity-block.mild .severity-label { color: #2e7d32; }
        .severity-block.moderate .severity-label { color: #f57c00; }
        .severity-block.severe .severity-label { color: var(--rose); }
        .severity-block h3 { font-family: 'DM Serif Display', serif; font-size: 1.15rem; color: var(--black); margin: 0 0 0.8rem; }
        .severity-block p { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; color: #2c2826; line-height: 1.75; margin-bottom: 0.6rem; }
        .severity-block p:last-child { margin-bottom: 0; }
        .callout-box { border: 1px solid #e8e4de; border-radius: 4px; padding: 1.6rem 1.8rem; margin: 2rem 0; }
        .callout-box-label { font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--rose); margin-bottom: 0.8rem; }
        .callout-box ol { margin: 0; padding-left: 1.4rem; }
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
          <div className="post-eyebrow">Hair Care · Hard Water · Shampoo Guide</div>
          <h1>
            Hard Water Hair Damage —<br />
            <em>The Right Routine, By Severity</em>
          </h1>
          <div className="post-meta">
            <span><strong>Mirha & Co.</strong></span>
            <span>29 June 2026</span>
            <span>7 min read</span>
            <span className="post-tag">Severity-Matched</span>
            <span className="post-tag">Product Pairing</span>
          </div>
        </div>
      </section>

      <article className="post-body">

        <p>Run our <Link href="/tools/hard-water" style={{color:"var(--rose)"}}>Hard Water Test</Link> and got a result back? Here's what to actually do about it, matched to how bad your water really is.</p>
        <p>Hard water affects the vast majority of Indian homes, and the damage it does — dryness, breakage, dullness, colour fading — is consistently reversible with the right shampoo and routine. It just needs to match your severity level, not a generic "best of" list.</p>

        <hr className="post-rule" />

        <h2>How Hard Water Actually Damages Hair</h2>
        <p>Calcium and magnesium minerals in hard water don't rinse away cleanly. Instead they bind to the hair shaft, blocking moisture from penetrating and making regular shampoos and conditioners far less effective. Indian cities including Delhi, Jaipur, Bengaluru, Noida, Gurugram, Chennai, and Hyderabad regularly see water hardness levels up to 700 mg/L — well above the 200 mg/L limit the Bureau of Indian Standards recommends.</p>

        <hr className="post-rule" />

        <h2>Match Your Routine to Your Severity</h2>

        <div className="severity-block mild">
          <div className="severity-label">Mild Buildup</div>
          <h3>Occasional dryness, slightly rough texture</h3>
          <p><strong>What to use:</strong> A gentle clarifying or chelating shampoo once a week, alongside your normal shampoo the rest of the time.</p>
          <p><strong>Why:</strong> At this stage you don't need an aggressive daily fix — over-clarifying strips natural oils and makes things worse. A weekly reset is enough to stop buildup before it compounds.</p>
        </div>

        <BlogProductCard asin="B07HB2L7QD" />
        <BlogProductCard asin="B07YWM9WLX" />

        <div className="severity-block moderate">
          <div className="severity-label">Moderate Buildup</div>
          <h3>Frizz, tangling, hair feels coarse even right after washing</h3>
          <p><strong>What to use:</strong> A dedicated hard-water shampoo as your primary wash — not just a weekly add-on — plus a leave-in conditioner or hair serum for daily protection between washes.</p>
          <p><strong>Why:</strong> At this level the mineral coating is consistent enough that a once-a-week clarifying step isn't catching up. You need a chelating formula doing the daily work.</p>
        </div>

        <BlogProductCard asin="B0CLP4RRPC" />
        <BlogProductCard asin="B0H11ZXLMZ" />

        <div className="severity-block severe">
          <div className="severity-label">Severe Buildup</div>
          <h3>Visible dullness, breakage, colour fading faster than expected, scalp irritation</h3>
          <p><strong>What to use:</strong> Salon-grade pH-correcting or anti-metal shampoo, used consistently, plus a bond-repair treatment weekly, and ideally a shower filter to address the root cause.</p>
          <p><strong>Why:</strong> At this stage, shampoo alone is managing symptoms, not solving the underlying problem. Treating the water itself — even just for your final rinse — meaningfully reduces how much damage accumulates between washes.</p>
        </div>

        <BlogProductCard asin="B09B1FXGR3" />
        <BlogProductCard asin="B07CH18R7Y" />
        <BlogProductCard asin="B0FWKGNZRJ" />

        <hr className="post-rule" />

        <h2>The Maintenance Routine — Whatever Your Severity</h2>
        <div className="callout-box">
          <div className="callout-box-label">4 Rules for All Hard Water Users</div>
          <ol>
            <li><strong>Don't over-wash.</strong> Hard water minerals build up faster with frequent washing — every alternate day is usually enough for most hair types.</li>
            <li><strong>Always follow shampoo with conditioner</strong>, even on clarifying-shampoo days. Clarifying formulas are deliberately stripping; skipping conditioner afterward leaves hair more vulnerable.</li>
            <li><strong>Cool or lukewarm water for the final rinse</strong>, not hot — heat opens the hair cuticle further, letting more minerals settle in.</li>
            <li><strong>Re-clarify monthly even after damage improves.</strong> Hard water buildup is ongoing, not a one-time fix — this is maintenance, not a cure.</li>
          </ol>
        </div>

        <hr className="post-rule" />

        <h2>What Doesn't Actually Help</h2>
        <div className="summary-box">
          <p>Switching shampoo brands repeatedly without addressing mineral buildup directly is the most common mistake. <strong>People blame the product when the real issue is what's coming out of the tap.</strong></p>
          <p>If you've tried 3–4 "good" shampoos and nothing's sticking, the water is very likely the actual problem — not your product choices.</p>
        </div>

        <div className="further-reading">
          <div className="further-reading-label">Further Reading</div>
          <ul>
            <li><Link href="/tools/hard-water"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Take the Hard Water Test</span><span>Find your severity →</span></Link></li>
            <li><Link href="/blog/hard-water-hair"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>How Hard Water Causes Hair Fall in Indian Cities</span><span>Root causes →</span></Link></li>
            <li><Link href="/blog/city-skincare-routine-india-mumbai-delhi"><span style={{fontFamily:"'DM Serif Display',serif",fontSize:"0.95rem",color:"#fff"}}>Mumbai Monsoon vs Delhi Pollution — City-Specific Routines</span><span>By city →</span></Link></li>
          </ul>
        </div>

        <div className="disclosure">
          <div className="disclosure-label">Affiliate Disclosure</div>
          <p>This post contains affiliate links to Amazon India (Store ID: skinwithtanvi-21). Mirha & Co. may earn a commission at no extra cost to you.</p>
        </div>

        <BlogFooterTools />
      </article>
    </main>
  );
}

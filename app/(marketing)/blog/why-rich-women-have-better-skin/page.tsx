import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Rich Women Have Better Skin (And It's Not The Products) | Mirha & Co.",
  description:
    "It's not La Mer. It's sleep, stress management, consistent preventative care, and time — the four things money actually buys when it comes to your complexion.",
  openGraph: {
    title: "Why Rich Women Have Better Skin (And It's Not The Products)",
    description:
      "It's not La Mer. It's sleep, stress management, and time — the four things money actually buys when it comes to your skin.",
  },
};

export default function WhyRichWomenBlog() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>
          ← Back to Journal
        </Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>
          Lifestyle · Beauty Intelligence · Skin Science
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          Why Rich Women Have Better Skin
          <br /><em style={{ color: "var(--rose)", fontStyle: "italic" }}>And It's Not The Products</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          You've noticed it. The woman in the boardroom whose skin is luminous without seeming to try. The 50-year-old who looks 38 and credits it to "water and good genes." The truth is more structural — and more fixable — than you think.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>June 2026</span><span>·</span><span>8 min read</span><span>·</span><span>Lifestyle</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        <section style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            The skincare industry wants you to believe that the gap between your skin and hers is a product gap. It isn't. The most expensive creams in the world cannot undo chronic sleep deprivation, sustained cortisol elevation, or a decade of skipped SPF. What wealthy women actually buy — what money actually purchases in the beauty department — falls into four categories that have very little to do with a serum's active ingredient list.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            1. Sleep — The Original Skin Treatment
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            During deep sleep, your body releases human growth hormone (HGH), which triggers cell repair, collagen synthesis, and skin barrier restoration. This is not a metaphor — it's a measurable physiological process. Dermatologists often call sleep the only truly anti-aging "product" with peer-reviewed evidence behind it.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The wealth connection is simple: financial security reduces the anxiety that interrupts sleep. Not having to mentally calculate rent while lying in bed, not fielding 11 PM client messages, not commuting for 3 hours — these are sleep privileges that compound over years. A woman consistently getting 7.5 hours of quality sleep will have measurably better skin at 45 than one getting 5.5, regardless of their product spend.
          </p>
          <div style={{ background: "var(--surface, #faf8f5)", border: "1px solid var(--rule)", borderRadius: 12, padding: "1.5rem", margin: "1.5rem 0" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "var(--ink)" }}>The fix:</strong> Sleep hygiene is the cheapest premium skincare you will ever access. Consistent sleep and wake times, a dark room, and magnesium glycinate 30 minutes before bed will do more for your skin's long-term appearance than a ₹15,000 retinol.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            2. Stress — The Cortisol Tax on Your Face
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Cortisol, the primary stress hormone, is directly and measurably destructive to skin. It breaks down collagen, increases sebum production (causing adult acne), worsens conditions like eczema, psoriasis, and rosacea, and slows wound healing. Sustained financial or professional stress creates what researchers now call "allostatic load" — the cumulative physical burden of chronic stress exposure.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Wealthy women aren't necessarily less stressed — many are extremely stressed — but they have access to outlets: therapy, gym memberships, sabbaticals, delegation, household help. These aren't indulgences. They are cortisol management tools that directly translate to lower baseline inflammation, which is the single most deterministic factor in skin aging.
          </p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            3. Time — The Most Finite Luxury
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Preventative skincare isn't expensive. A broad-spectrum SPF 50 and a basic moisturiser cost under ₹800 combined. But applying them consistently, twice a day, every single day, for 20 years? That requires time. Time to cook instead of eating from a stall. Time to exercise. Time for a 4-minute morning routine. Time to drink 2 litres of water.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The structural reality is that women who are working two jobs, commuting 3 hours daily, or primarily responsible for household labour have dramatically less discretionary time for personal care routines. That gap is a time gap, not a product gap. And it shows on the skin over decades.
          </p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            4. Preventative Care — Starting Early Enough to Matter
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The most powerful skincare intervention is the one you don't see — damage prevention, not correction. SPF applied daily in your 20s prevents the hyperpigmentation, fine lines, and textural changes that would otherwise require expensive treatments in your 40s. Retinol started at 28 is worth significantly more than retinol started at 42.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Access to dermatology — the ability to see a good dermatologist in your 20s and get ahead of concerns before they become visible — is one of the clearest wealth-and-skin correlations that exists. But prevention is also the area most accessible to everyone willing to be consistent, because the tools are genuinely cheap.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Practical Takeaway
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            You cannot buy your way out of chronic stress. You cannot purchase consistent sleep. You cannot outsource discipline. But you can restructure your priorities around the four variables that actually drive long-term skin quality — and none of them require a luxury budget. The most expensive skincare decision you will ever make is ignoring your sleep, your cortisol, and your SPF.
          </p>
          <ul style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 2, paddingLeft: "1.5rem" }}>
            <li>Prioritise 7.5 hours of sleep over a ₹5,000 serum</li>
            <li>Treat cortisol management as skincare (exercise, therapy, boundaries)</li>
            <li>Apply SPF every morning — this is the highest ROI action in all of skincare</li>
            <li>Start your routine in your 20s, not your 40s</li>
            <li>Consistency over novelty, every single time</li>
          </ul>
        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>Build Your Routine the Right Way</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>Answer five questions and get a personalised 4-step routine built around your skin type, concerns, and budget. Science-backed, India-specific.</p>
          <a href="/tools/routine" style={{ display: "inline-block", background: "#fff", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "monospace" }}>Build My Routine →</a>
        </section>

      </article>
    </main>
  );
}

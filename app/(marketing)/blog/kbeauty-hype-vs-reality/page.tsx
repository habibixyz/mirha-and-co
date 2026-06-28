import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "K-Beauty Hype vs. Reality: Worth it for Indian Skin? | Mirha & Co.",
  description:
    "We separate the internet hype from the humid reality. Discover which viral Korean products are actually worth your money, and which ones will clog your pores.",
  openGraph: {
    title: "K-Beauty Hype vs. Reality: Worth it for Indian Skin?",
    description:
      "A critical, honest guide matching viral K-Beauty products to Indian skin types, climate, and sebum profiles.",
  },
};

export default function KBeautyHypeRealityPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link
          href="/blog"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
            textDecoration: "none",
            fontFamily: "monospace",
          }}
        >
          ← Back to Journal
        </Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>
          Analysis · K-Beauty · Honest Reviews
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          K-Beauty Hype vs. Reality:
          <br />
          <em style={{ color: "var(--rose)", fontStyle: "italic" }}>Which Viral Korean Products Actually Work in India?</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          Scroll through Instagram or TikTok for ten minutes, and you'll find glowing creators claiming a single Korean bottle cured their acne, cleared their hyperpigmentation, and gave them glass skin. But when those products land in Mumbai, Delhi, or Bangalore, the results can be radically different. Here is the science-backed, climate-filtered truth.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>June 2026</span><span>·</span><span>8 min read</span><span>·</span><span>Editorial Audit</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* SECTION 1: THE VIRAL TRAP */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Virality Trap: Why Korean Skin is Different
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            When a product goes viral globally, it is usually tested by creators living in temperate, low-humidity climates. Furthermore, East Asian skin genetics are baseline different from South Asian (Indian) skin. Indian skin typically has active melanin production, larger pore size, and higher oil production in tropical heat. 
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            A product designed to form a thick protective seal over dry skin in a freezing Seoul winter might trigger painful closed comedones, sweating, or fungal breakouts in India's hot and humid weather.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 2: PRODUCT BREAKDOWN */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Honest Breakdown of Viral K-Beauty Favorites
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            We analyze five of the most hyped Korean skincare products and evaluate whether they are a match for Indian skin and climate.
          </p>

          {/* ITEM 1: COSRX Snail Mucin */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.4rem" }}>
              1. COSRX Advanced Snail 96 Mucin Power Essence
            </h3>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "0.6rem", fontFamily: "monospace", fontWeight: 700 }}>
              Verdict: Hyped but conditional
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong>The Hype:</strong> A gooey, intensive essence that plumps wrinkles, heals acne scars, and provides intense hydration.
              <br />
              <strong>The Indian Reality:</strong> Snail mucin is a stellar humectant, but it is heavy. In monsoon or peak summer humidity, it can feel like a suffocating, sticky mask. More importantly, those with dust mite allergies often experience tiny breakouts from snail filtrate. 
              <br />
              <em>Recommendation:</em> If you have oily/acne-prone skin, skip this in summer. If you have dry skin, apply it strictly to damp skin at night.
            </p>
            <BlogProductCard asin="B00PBX3L7K" />
          </div>

          {/* ITEM 2: TIRTIR Milk Skin Toner */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.4rem" }}>
              2. TIRTIR Milk Skin Toner (Original vs. Light)
            </h3>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4576e8", marginBottom: "0.6rem", fontFamily: "monospace", fontWeight: 700 }}>
              Verdict: Get the right version
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong>The Hype:</strong> A rich, milky toner that replaces moisturizer and gives an instant, glassy glow.
              <br />
              <strong>The Indian Reality:</strong> The original Milk Skin Toner is highly moisturizing but too rich for oily skin under humid weather. It can lead to clogged pores on the forehead. Thankfully, TIRTIR released the <strong>Milk Skin Toner Light</strong> containing 4% Niacinamide. It is lightweight, non-greasy, and perfectly controls oil while providing that coveted glow.
            </p>
            <BlogProductCard asin="B0D1FNB4C2" />
          </div>

          {/* ITEM 3: Beauty of Joseon Relief Sun vs. SKIN1004 Sun Serum */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.4rem" }}>
              3. Beauty of Joseon Relief Sun vs. SKIN1004 Sun Serum
            </h3>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "0.6rem", fontFamily: "monospace", fontWeight: 700 }}>
              Verdict: SKIN1004 Wins for Summer
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong>The Hype:</strong> The global standard for white-cast-free chemical sun protection.
              <br />
              <strong>The Indian Reality:</strong> Beauty of Joseon is wonderful for dry skin, but its thick cream texture can induce heavy sweating in 30°C+ heat. For Indian summers, the <strong>SKIN1004 Hyalu-Cica Water-Fit Sun Serum</strong> is the far superior choice. It has a watery, weightless serum consistency that leaves a natural, non-greasy dewy finish.
            </p>
            <BlogProductCard asin="B0B3G73VF5" />
          </div>

          {/* ITEM 4: mixsoon Bean Essence */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.4rem" }}>
              4. mixsoon Bean Essence
            </h3>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4576e8", marginBottom: "0.6rem", fontFamily: "monospace", fontWeight: 700 }}>
              Verdict: Real, but requires work
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong>The Hype:</strong> A vegan alternative to snail mucin that gently rolls away blackheads and dead skin as you massage it.
              <br />
              <strong>The Indian Reality:</strong> It is highly effective, but <em>only</em> if you use it correctly. If you just pat it on like a serum, it's a decent hydrator. To get the exfoliation benefits, you must massage 3–4 pumps onto dry skin for 3–5 minutes until sebum plugs roll off. 
            </p>
            <BlogProductCard asin="B08ZXVVY8M" />
          </div>

          {/* ITEM 5: SKIN1004 Centella Ampoule */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.4rem" }}>
              5. SKIN1004 Madagascar Centella Ampoule
            </h3>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4576e8", marginBottom: "0.6rem", fontFamily: "monospace", fontWeight: 700 }}>
              Verdict: 100% Real
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong>The Hype:</strong> Calms acne, heals redness, and restores a broken skin barrier overnight.
              <br />
              <strong>The Indian Reality:</strong> This completely lives up to the hype. Containing 100% pure Centella Asiatica extract from Madagascar, it has a water-like texture that absorbs instantly. It has zero fragrances or fillers, making it the perfect soothing serum for polluted, hot, and congested Indian urban skin.
            </p>
            <BlogProductCard asin="B06Y15D1LH" />
          </div>
        </section>

        <BlogFooterTools />
      </article>
    </main>
  );
}

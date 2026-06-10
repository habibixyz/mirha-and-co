import type { Metadata } from "next";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "The Founder Face: What Startup Stress Does to Your Appearance | Mirha & Co.",
  description: "Poor sleep, elevated cortisol, blue light exposure, skipped meals, constant travel — how the founder lifestyle accelerates visible aging and what to do about it.",
  openGraph: {
    title: "The Founder Face: What Startup Stress Does to Your Appearance",
    description: "Cortisol, sleep deprivation, blue light, travel — the science of how building a company ages your face.",
  },
};

export default function TheFounderFaceBlog() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>← Back to Journal</Link>
      </div>
      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>Wellness · Founder Health · Cortisol · Skin Science</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          The Founder Face
          <br /><em style={{ color: "var(--rose)", fontStyle: "italic" }}>What Startup Stress Does to Your Appearance</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>There's a look. Founders, operators, and high-output builders develop it around year 2 or 3. Dull skin. Persistent under-eye circles. Stress acne around the jaw. A general appearance of being 4–6 years older than you are. This is not a personality trait. It's a physiological consequence of the founder lifestyle — and most of it is preventable.</p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>June 2026</span><span>·</span><span>9 min read</span><span>·</span><span>Wellness</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        <section style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>The startup world fetishises sacrifice. Early mornings, late nights, skipped meals, 80-hour weeks — these are worn as badges of honour. What nobody tells you is the accumulated cost of that sacrifice is paid, first and most visibly, by your face. The founder lifestyle creates a perfect storm of appearance-accelerating stressors that compound faster than most people expect.</p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>1. Cortisol: The Primary Accelerant</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Cortisol is your body's primary stress hormone. Under normal circumstances, it spikes in the morning and declines through the day — helping you wake up, focus, and respond to challenges. Under founder circumstances — runway anxiety, team problems, investor pressure, constant context-switching — cortisol remains chronically elevated. This is called allostatic overload, and it has very specific effects on skin.</p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Elevated cortisol: breaks down collagen and elastin (the structural proteins that keep skin firm and bouncy), increases sebum production causing adult hormonal acne (specifically along the jaw and chin), delays wound healing so breakouts take longer to resolve, and triggers inflammation that worsens any existing skin conditions. It also increases blood glucose levels which glycates proteins — a process that makes skin look sallow and accelerates the formation of fine lines.</p>
          <div style={{ background: "var(--surface, #faf8f5)", border: "1px solid var(--rule)", borderRadius: 12, padding: "1.5rem", margin: "1.5rem 0" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}><strong style={{ color: "var(--ink)" }}>The evidence:</strong> A 2021 study published in the Journal of the European Academy of Dermatology and Venereology found a direct correlation between self-reported stress scores and objective measures of skin aging in working adults. High-stress individuals showed measurably more collagen degradation than low-stress counterparts of the same age.</p>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>2. Sleep Deprivation: The Visible Accelerant</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>The founder sleep pattern — 5–6 hours on weekdays, an attempted catch-up on weekends — doesn't work physiologically. Sleep debt is not reversible with a long Saturday sleep. Chronic partial sleep deprivation produces: reduced HGH secretion (meaning less nightly skin repair), elevated inflammatory cytokines (making skin reactive and puffy), increased transepidermal water loss (skin becomes dehydrated regardless of moisturiser use), and impaired skin barrier function.</p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>The under-eye area is particularly sensitive. The skin here is the thinnest on the body (0.5mm). Fluid redistribution during poor sleep causes puffiness. Reduced collagen production causes the area to become darker as blood vessels become more visible through thinning skin. Founders chronically show accelerated periorbital aging — the under-eye and crow's feet area ages fastest under sleep stress.</p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>3. Blue Light and Screen Exposure</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>The average founder spends 10–14 hours daily in front of screens. Blue light (HEV light) from screens penetrates deeper into the skin than UVB radiation and has been shown in recent research to generate reactive oxygen species — free radicals that damage cellular DNA, break down collagen, and increase melanin production (causing hyperpigmentation).</p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>The hyperpigmentation caused by HEV light is particularly problematic for Indian skin — which already has higher melanin activity — and tends to produce irregular brown patches that are difficult to treat. Antioxidant serums (Vitamin C in the morning, niacinamide throughout the day) are currently the best topical protection against HEV-generated oxidative stress.</p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>4. Travel: The Compound Dehydrator</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Founders who travel frequently for fundraising, conferences, or client meetings face an underappreciated skin threat: cabin humidity. Aircraft cabin air has 10–20% relative humidity — compared to the 30–65% considered comfortable for skin. Even a 3-hour flight causes measurable transepidermal water loss and skin dehydration. Frequent flyers show accelerated fine line formation, a rough and uneven skin texture, and persistent dullness.</p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>The compounding factor: travel disrupts sleep, increases cortisol from logistical stress, changes dietary patterns (airport food, restaurant meals), and exposes skin to different climates — all simultaneously. A week of investor meetings in a different city can visibly age your skin by several months.</p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>The Founder Skincare Protocol</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>This is the minimum effective protocol that works with a chaotic schedule, not against it:</p>
          <ul style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 2.2, paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li><strong style={{ color: "var(--ink)" }}>Morning (90 seconds):</strong> Cleanser → Vitamin C serum → SPF 50+. The antioxidant + SPF combination protects against cortisol-generated and UV-generated oxidative damage simultaneously.</li>
            <li><strong style={{ color: "var(--ink)" }}>Night (60 seconds):</strong> Cleanser → Niacinamide serum → Moisturiser. Niacinamide reduces the sebum overproduction caused by cortisol, fades any hyperpigmentation, and supports the barrier.</li>
            <li><strong style={{ color: "var(--ink)" }}>Weekly:</strong> A retinol or retinaldehyde treatment 2–3 nights per week to counter collagen loss. This is the single most evidence-backed anti-aging intervention in topical skincare.</li>
            <li><strong style={{ color: "var(--ink)" }}>Travel:</strong> A barrier oil or occlusive layer on the plane (squalane works). Avoid alcohol on flights. Hydrating mist during the flight. These are not indulgences — they are maintenance against measurable dehydration.</li>
          </ul>
          <div style={{ background: "var(--surface, #faf8f5)", border: "1px solid var(--rule)", borderRadius: 12, padding: "1.5rem" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}><strong style={{ color: "var(--ink)" }}>The systemic fix that matters most:</strong> Sleep. A founder who consistently protects 7 hours of sleep — treats it as a non-negotiable deliverable — will have measurably better skin, sharper cognition, and better hormonal regulation than one who "optimises" sleep away. This is not a wellness platitude. It's a performance position with a decade of sleep research behind it.</p>
          </div>
        </section>

        <BlogFooterTools />
      </article>
    </main>
  );
}

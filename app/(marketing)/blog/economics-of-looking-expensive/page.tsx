import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Economics of Looking Expensive | Mirha & Co.",
  description: "Breaking down exactly what makes someone look expensive — hair texture, teeth alignment, skin clarity, clothing fit, and posture decoded.",
  openGraph: {
    title: "The Economics of Looking Expensive",
    description: "Hair, teeth, skin, clothing fit, posture — what actually makes someone look expensive.",
  },
};

export default function EconomicsOfLookingExpensiveBlog() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>← Back to Journal</Link>
      </div>
      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>Lifestyle · Beauty Intelligence · Grooming</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>The Economics of Looking Expensive</h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>What separates someone who looks expensive from someone who doesn't is rarely the price tag. It's a hierarchy of specific signals — skin, hair, teeth, fit, posture — that the eye reads as polish in milliseconds.</p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>June 2026</span><span>·</span><span>9 min read</span><span>·</span><span>Lifestyle</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <section style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>Looking expensive is a perception problem, not a money problem. The brain processes appearance signals in milliseconds and renders a verdict based on a hierarchy of cues. Understanding that hierarchy lets you invest strategically. Here is the breakdown, ranked by visual impact.</p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>1. Skin — The Highest Signal</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Clear, even, hydrated skin reads as health and privilege faster than any garment. You can wear a ₹500 kurta and look expensive if your skin is luminous. You can wear a ₹15,000 blazer and look unwell if your skin is dull and uneven.</p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Investment hierarchy: consistent SPF (prevents 90% of visible aging), a basic barrier-supporting routine, and treating hyperpigmentation. Total monthly spend: under ₹600. Return: higher than any garment in your wardrobe.</p>
          <div style={{ background: "var(--surface, #faf8f5)", border: "1px solid var(--rule)", borderRadius: 12, padding: "1.5rem", margin: "1.5rem 0" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}><strong style={{ color: "var(--ink)" }}>High-ROI skin investments:</strong> Daily SPF 50+ · Niacinamide serum · Basic cleanser + moisturiser · Consistent sleep.</p>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>2. Hair Texture and Condition</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Hair that is visibly healthy — shiny, not frizzy, with a defined texture — signals care and resources. Frizz, breakage, and limp volume read as neglect regardless of cut. The most impactful interventions: addressing hard water damage with a chelating shampoo weekly, using a protein treatment monthly, and protecting hair from heat.</p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>A silk or satin pillowcase reduces friction breakage overnight — a one-time purchase with permanent return.</p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>3. Teeth — The Underestimated Luxury Signal</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Dental aesthetics are one of the most reliable markers of long-term healthcare access. Visibly clean, relatively aligned teeth signal privilege. Teeth whitening (at-home strips used correctly) and keeping up with scaling twice a year are the minimums with the highest return.</p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>This column often gets left out of beauty writing because it feels uncomfortable. But if you want the honest breakdown: teeth are a luxury signal, and improving yours modestly has documented effects on how others assess competence and warmth.</p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>4. Clothing Fit — More Than Brand</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>A ₹500 white shirt that fits perfectly looks more expensive than a ₹5,000 designer shirt that doesn't. Fit is the single highest-leverage clothing intervention. Tailoring trouser hems and taking in a blazer shoulder costs ₹200–500 at any local tailor. The transformation in perceived quality is disproportionate to the cost.</p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>5. Posture — The Free Luxury Accessory</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Posture changes how every garment drapes, how your jaw reads in profile, and how others assess your confidence. Chin parallel to ground, shoulders back without tension, core lightly engaged. Costs nothing. Pays consistent returns.</p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>The Investment Priority Ranking</h2>
          <ol style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 2.2, paddingLeft: "1.5rem" }}>
            <li><strong style={{ color: "var(--ink)" }}>Skin clarity and evenness</strong> — under ₹600/month, highest visible return</li>
            <li><strong style={{ color: "var(--ink)" }}>Clothing fit</strong> — get two staple pieces tailored</li>
            <li><strong style={{ color: "var(--ink)" }}>Hair condition</strong> — not length or colour, condition</li>
            <li><strong style={{ color: "var(--ink)" }}>Posture</strong> — free, immediate, highly visible</li>
            <li><strong style={{ color: "var(--ink)" }}>Dental hygiene</strong> — scaling + basic whitening</li>
          </ol>
        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>Start With Your Skin</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>The highest-return appearance investment you can make. Build a personalised 4-step routine for your skin type and budget.</p>
          <a href="/tools/routine" style={{ display: "inline-block", background: "#fff", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "monospace" }}>Build My Routine →</a>
        </section>
      </article>
    </main>
  );
}

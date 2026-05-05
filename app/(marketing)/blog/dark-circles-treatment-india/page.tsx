import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dark Circles Treatment for Indian Skin — What Actually Works (2026) | Mirha & Co.",
  description: "Caffeine, EGCG, Retinal, Vitamin K — the honest breakdown of what reduces dark circles for Indian skin, why most eye creams fail, and the right protocol for puffiness vs pigmentation.",
  openGraph: {
    title: "Dark Circles Treatment for Indian Skin — What Actually Works",
    description: "The honest guide to treating dark circles in India. Caffeine + EGCG for puffiness, what to use for pigmentation, and why most eye creams do nothing.",
  },
};

export default function DarkCirclesPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>← Back to Journal</Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>Beauty · Eye Care · Skincare</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          Dark Circles — What Actually Works for Indian Skin
          <br /><em style={{ color: "var(--rose)", fontStyle: "italic" }}>And Why Most Eye Creams Don't</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          Dark circles are one of the most searched skincare concerns in India. They are also one of the most misunderstood. Most eye creams are formulated for puffiness — not pigmentation. And most Indian dark circles are pigmentation. Understanding the difference is the only way to buy the right product.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>May 2026</span><span>·</span><span>10 min read</span><span>·</span><span>Eye care guide</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Puffiness vs Pigmentation — Two Different Problems
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The most important thing to understand about dark circles: there are two completely different causes that require completely different treatments. Using the wrong approach for your type will produce zero results regardless of how expensive the product is.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { type: "Puffiness / Vascular", signs: "Looks worse in the morning, improves through the day. Bluish or purplish tint under the eye. Better when you press gently on the area.", cause: "Fluid retention and dilated blood vessels under the thin under-eye skin. Sleep deprivation, allergies, and salt intake are major triggers.", fix: "Caffeine (vasoconstrictor — tightens blood vessels). Cold compress. Elevation while sleeping." },
              { type: "Pigmentation / Structural", signs: "Present all day, does not improve with sleep. Brown or dark tint rather than blue. Does not change when you press on the area.", cause: "Higher melanin density in the under-eye area — common in Indian and South Asian skin. Sun exposure worsens it. Often genetic.", fix: "Vitamin K, niacinamide, kojic acid. SPF. Very slow improvement — months, not weeks." },
            ].map((item) => (
              <div key={item.type} style={{ border: "1px solid var(--rule)", borderRadius: 8, padding: "1.2rem", background: "var(--sand)" }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.6rem", fontFamily: "monospace" }}>{item.type}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--ink)", lineHeight: 1.6, margin: "0 0 0.5rem" }}><strong>Signs:</strong> {item.signs}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, margin: "0 0 0.5rem" }}><strong style={{ color: "var(--ink)" }}>Cause:</strong> {item.cause}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}><strong style={{ color: "var(--ink)" }}>Treatment:</strong> {item.fix}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            Most Indian dark circles are a combination of both. But the pigmentation component is almost always dominant — which is why the caffeine eye creams that Western influencers recommend often disappoint Indian users who expect the same result.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Ordinary Caffeine Solution 5% + EGCG — For Puffiness
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Caffeine is a vasoconstrictor — it temporarily tightens blood vessels. Applied to the under-eye area, it reduces the visible dilation that creates the bluish-purple puffiness and shadow. The 5% concentration in The Ordinary's formula is clinically relevant. The EGCG (Epigallocatechin Gallatyl Glucoside) from green tea adds antioxidant activity that reduces oxidative stress in the delicate under-eye skin.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>Honest expectation-setting:</strong> this serum visibly reduces puffiness and gives the area a more awake appearance within weeks of consistent use. It will not eliminate structural pigmentation — the brown discolouration from melanin. What it does do is reduce the shadow created by puffiness, which makes the overall under-eye look significantly better even when the pigmentation is still present.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Apply cold. Store the serum in the fridge — the cold temperature amplifies the depuffing effect and feels considerably better on tired morning eyes. Apply a small amount to the orbital bone (not directly on the eyelid), pat gently with your ring finger, and allow to absorb before moisturiser.
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>ASIN: B01MUZVE1C — The Ordinary Caffeine 5% + EGCG 30ml</p>
          <BlogProductCard asin="B01MUZVE1C" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Minimalist Vitamin K + Retinal 0.1% Eye Cream — For Pigmentation
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            While caffeine handles the puffiness, structural pigmentation needs a different approach. The Minimalist Vitamin K + Retinal 0.1% cream is formulated specifically for the complex causes of Indian dark circles. Vitamin K works on the vascular component (blood pooling that causes dark shadows), while Retinal — the most potent over-the-counter retinoid — accelerates cell turnover to fade melanin deposits and thicken the delicate under-eye skin.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            This formula also includes caffeine, making it an excellent all-rounder, but its true strength lies in the Retinal 0.1%. Because retinal is highly active, it stimulates collagen production, which literally thickens the 0.5mm skin under your eyes. Thicker skin means the blood vessels underneath are less visible, naturally reducing the appearance of dark circles over time.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Use it strictly in your PM routine, as retinoids degrade in sunlight and can increase sun sensitivity. Apply a grain-of-rice-sized amount to the orbital bone. If you are new to retinoids, start by using it every alternate night to prevent dryness and peeling.
          </p>
          <BlogProductCard asin="MINIMALISTK" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Complete Under-Eye Protocol
          </h2>
          {[
            { time: "Morning", steps: ["Apply Caffeine 5% + EGCG (cold from fridge) — pat gently with ring finger on orbital bone.", "Wait 60 seconds. Apply your regular moisturiser over the rest of the face.", "SPF 50+ on the full face including orbital area. UV exposure is the primary cause of progressive under-eye darkening."] },
            { time: "Night", steps: ["Cleanse. Apply niacinamide serum to the full face — it helps with pigmentation including under-eye.", "Apply Minimalist Vitamin K + Retinal Eye Cream to the under-eye area. Pat gently, do not rub.", "Apply your regular moisturiser to the rest of the face."] },
          ].map((item) => (
            <div key={item.time} style={{ border: "1px solid var(--rule)", borderRadius: 8, padding: "1.3rem 1.5rem", marginBottom: "1rem", background: "var(--sand)" }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>{item.time}</p>
              <ol style={{ paddingLeft: "1.2rem", margin: 0, fontSize: "0.9rem", color: "var(--muted)", lineHeight: 2 }}>
                {item.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          ))}
          <div style={{ background: "var(--sand)", border: "1px solid var(--rule)", borderRadius: 8, padding: "1.2rem 1.4rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.5rem", fontFamily: "monospace" }}>Realistic Timeline</p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.7, margin: 0 }}>Puffiness reduction: visible within 2–4 weeks. Pigmentation improvement: 8–16 weeks minimum with consistent SPF. Dark circles are one of the slowest-improving skin concerns — patience and SPF compliance are the two most important variables.</p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>Frequently Asked Questions</h2>
          {[
            { q: "Can dark circles be permanently removed?", a: "Structural pigmentation — the kind from melanin density — cannot be permanently removed with topical products alone. It can be significantly reduced over time. Clinical treatments (laser, chemical peels under dermatologist supervision) can produce more dramatic results. Topical products manage the concern rather than cure it." },
            { q: "Are dark circles genetic?", a: "Partly. Indian and South Asian skin has genetically higher melanin density in the under-eye area, which predisposes it to visible pigmentation. This is why the concern is more prevalent and more difficult to treat in Indian skin compared to lighter skin tones. Lifestyle, sleep, and sun exposure determine how much the genetic predisposition expresses itself." },
            { q: "Does sleeping more fix dark circles?", a: "For puffiness-type dark circles, yes — significantly. For pigmentation-type, sleep is necessary but not sufficient on its own. Most Indian dark circles involve both components, so adequate sleep improves the puffiness element while topical treatment addresses the pigmentation." },
            { q: "Why does the caffeine serum feel warm on my eyes?", a: "Caffeine causes mild vasodilation initially before the vasoconstriction effect kicks in. The brief warmth or tingling is normal. If it causes sustained burning, stinging, or redness, your skin may be reacting to another ingredient in the formula — patch test first on the inner arm." },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "1.2rem 0" }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.05rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>{item.q}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>Build Your Full Skincare Routine</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>Take our skin quiz and get a personalised routine — including the right eye care for your specific concerns.</p>
          <a href="/tools/routine" style={{ display: "inline-block", background: "#fff", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "monospace" }}>Get My Routine →</a>
        </section>

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
          Affiliate links disclosed. Mirha & Co. participates in the Amazon Associates Program. We earn a small commission on qualifying purchases at no additional cost to you. This post is for informational purposes only.
        </p>
      </article>
    </main>
  );
}

import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Beginner Skincare Routine for India (2026) — 3 Products, Real Results | Mirha & Co.",
  description:
    "You do not need 10 steps. You need 3 right products used consistently. The complete beginner skincare routine for Indian skin — cleanser, moisturiser, sunscreen. That is it.",
  openGraph: {
    title: "Best Beginner Skincare Routine for India (2026) — 3 Products, Real Results",
    description:
      "Everyone online has a 10-step routine. Here is the honest minimum viable skincare routine for Indian skin — with product picks under ₹1500 total.",
  },
};

export default function BeginnerRoutinePage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>
          ← Back to Journal
        </Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>
          Beauty · Beginner Guide · Indian Skincare
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          The Beginner Skincare Routine for India
          <br /><em style={{ color: "var(--rose)", fontStyle: "italic" }}>3 Products. Under ₹1500. Actually Works.</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          You have seen the 10-step routines. The serums stacked seven high. The influencer who spends ₹8,000 a month on skincare and still has breakouts. This guide is the opposite of that. Three products. Used consistently. Built specifically for what Indian skin and Indian conditions actually require.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>May 2026</span><span>·</span><span>12 min read</span><span>·</span><span>Beginner guide</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* WHY 3 STEPS */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Why Indian Skin Needs Less, Not More
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The 10-step K-beauty routine was designed for a specific climate, skin type, and cultural context. Korea. Not Mumbai in June. Not Delhi in October. Not Chennai year-round.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Indian skin operates in conditions that make excessive layering actively counterproductive. High humidity means multiple product layers sit on the skin rather than absorbing. Hard water in most metro cities (Delhi, Mumbai, Bengaluru, Hyderabad) leaves a mineral film that blocks absorption. Pollution from vehicular exhaust mixes with excess product on the skin surface and clogs pores.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            Three products done correctly will outperform seven products done inconsistently in Indian conditions. This is not minimalism for its own sake — it is the approach that clinical evidence and Indian dermatologists consistently recommend for beginners.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* THE FRAMEWORK */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Framework
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { time: "Morning — 2 minutes", steps: ["Cleanser", "Moisturiser", "Sunscreen SPF 50"] },
              { time: "Night — 2 minutes", steps: ["Cleanser", "Moisturiser"] },
            ].map((item) => (
              <div key={item.time} style={{ background: "var(--sand)", border: "1px solid var(--rule)", borderRadius: 8, padding: "1.2rem" }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>{item.time}</p>
                <ol style={{ paddingLeft: "1.1rem", margin: 0, fontSize: "0.88rem", color: "var(--ink)", lineHeight: 2 }}>
                  {item.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75 }}>
            That is the complete routine. Sunscreen is morning only — no UV to block at night. Everything else is identical AM and PM. The power is in the consistency, not the complexity.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* STEP 1: CLEANSER */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--rose)", background: "rgba(200,71,58,0.08)", padding: "0.3rem 0.7rem", borderRadius: 3 }}>STEP 1</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", margin: 0 }}>Cleanser</h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The cleanser is doing more work than most beginners realise. It is not just removing dirt. It is removing the hard water mineral residue, the pollution particulate, and the sebum that accumulated since the last wash — all without disrupting the pH and lipid balance that keeps your skin barrier functional.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The wrong cleanser — specifically a sulphate-heavy, high-foam face wash that strips every trace of natural oil — sets everything else up to fail. Stripped skin overproduces oil within two hours. The moisturiser cannot compensate for a destroyed barrier. And you end up oilier at noon than if you had not washed at all.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            What you need: sulphate-free, pH-balanced (around 5.5), fragrance-free. Cetaphil's Gentle Skin Face Wash is the cleanser that Indian dermatologists recommend most consistently across skin types. It does not produce a satisfying foam. This is not a flaw — it means it is not stripping your skin.
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>For all skin types including sensitive</p>
          <BlogProductCard asin="B01CCGW4OE" />
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "monospace" }}>For oily and acne-prone skin — gentle exfoliating formula</p>
          <BlogProductCard asin="B09VLDY46B" />
          <div style={{ background: "var(--sand)", border: "1px solid var(--rule)", borderRadius: 8, padding: "1.2rem 1.5rem", marginTop: "1.5rem" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.5rem", fontFamily: "monospace" }}>How to use</p>
            <p style={{ fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.7, margin: 0 }}>Wet face with lukewarm water. Apply a coin-sized amount. Massage 20–30 seconds — not longer. Rinse. Pat dry with a clean towel. Do not rub. Never use hot water — it strips the barrier.</p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* STEP 2: MOISTURISER */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--rose)", background: "rgba(200,71,58,0.08)", padding: "0.3rem 0.7rem", borderRadius: 3 }}>STEP 2</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", margin: 0 }}>Moisturiser</h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The most common mistake Indian beginners make is skipping moisturiser because they have oily skin. This makes oily skin worse, not better. When skin is dehydrated — from harsh cleansers, air conditioning, pollution, or sun exposure — sebaceous glands compensate by producing more oil. You end up with dehydrated oily skin. A lightweight gel moisturiser breaks this cycle by giving the skin what it needs without adding the heavy emollients that cause breakouts.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            For most Indian skin types: a water-based gel or gel-cream. For genuinely dry skin: a cream with ceramides. Apply to slightly damp skin immediately after cleansing — the hydration seals in the residual moisture from washing.
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>For oily and combination skin — oil-free water gel</p>
          <BlogProductCard asin="B00BQFTQW6" />
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "monospace" }}>For dry and sensitive skin — ceramide-rich cream</p>
          <BlogProductCard asin="B099MJH88B" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* STEP 3: SUNSCREEN */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--rose)", background: "rgba(200,71,58,0.08)", padding: "0.3rem 0.7rem", borderRadius: 3 }}>STEP 3</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", margin: 0 }}>Sunscreen — The Non-Negotiable</h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            If there is one thing a dermatologist in India will tell every patient regardless of skin type, budget, or concern: wear sunscreen. Every day. It prevents 80% of visible aging. It stops acne marks from darkening. It prevents the hyperpigmentation that takes months of active treatment to reverse. In India's UV conditions — Very High to Extreme index year-round in most cities — it is the highest-return-per-rupee product you will ever buy.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Morning only. Applied after moisturiser as the final step. A quarter teaspoon for the full face — most people apply a quarter of the necessary amount and wonder why they are still tanning. PA++++ is the rating to look for in India — it indicates UVA protection, which is the wavelength that creates pigmentation.
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>For oily and acne-prone skin</p>
          <BlogProductCard asin="B0DHY6LQTW" />
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "monospace" }}>Budget pick — no white cast, PA++++</p>
          <BlogProductCard asin="B0B45RB1RV" />
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "monospace" }}>For oily-dehydrated skin — hydrating + SPF</p>
          <BlogProductCard asin="B0C9JPWLR4" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* AFTER 6 WEEKS */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            After 6 Weeks — What to Add (and When)
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Six weeks of consistent three-step routine. No new products. No changes. After that, if your skin is stable and you want to address a specific concern, add one product — only one — and wait four more weeks before evaluating.
          </p>
          {[
            { concern: "Oily skin + pores + post-acne marks", product: "10% Niacinamide serum", timing: "After cleanser, before moisturiser. AM and PM.", asin: "B0DH88LZ11" },
            { concern: "Dullness + uneven tone + dark spots", product: "Vitamin C serum (15%)", timing: "Morning only. Before moisturiser. Always followed by SPF.", asin: "B095PRGHDX" },
            { concern: "Active acne + blackheads + oily T-zone", product: "Salicylic acid face wash or leave-on", timing: "PM only. 2–3x per week initially.", asin: "B0C3PCJ6SD" },
          ].map((item) => (
            <div key={item.concern} style={{ border: "1px solid var(--rule)", borderRadius: 8, padding: "1.3rem 1.5rem", marginBottom: "1.2rem", background: "var(--sand)" }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.4rem", fontFamily: "monospace" }}>{item.concern}</p>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.3rem" }}>{item.product}</p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, margin: "0 0 1rem" }}>{item.timing}</p>
              <BlogProductCard asin={item.asin} />
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* MISTAKES */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            The 6 Mistakes That Keep Beginners Stuck
          </h2>
          {[
            { mistake: "Adding too many products at once", why: "You cannot know what is working or what caused the breakout. One product every four weeks is the only way to build a routine you can actually trust." },
            { mistake: "Switching products before giving them time to work", why: "Skin cells cycle every 28 days. Four to six weeks minimum before any product shows its full effect. Switching at week two means you never know if it was working." },
            { mistake: "Skipping moisturiser for oily skin", why: "Dehydration triggers compensatory sebum production. You end up oilier by noon than if you had moisturised. Use a lightweight gel — not a cream." },
            { mistake: "Using hot water to cleanse", why: "Hot water disrupts the lipid barrier that holds skin cells together. Lukewarm. Always." },
            { mistake: "Skipping sunscreen indoors", why: "UVA penetrates glass. If you sit near a window, you are receiving pigmentation-causing UV exposure without knowing it. Sunscreen is every morning, not every outdoor morning." },
            { mistake: "Expecting visible results in 10 days", why: "Skin improvement is gradual and non-linear. Take a photo on day one and compare at week eight. The day-to-day is invisible. The eight-week comparison is usually significant." },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "1rem 0", display: "flex", gap: "1rem" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--rose)", flexShrink: 0, paddingTop: "0.15rem" }}>0{i + 1}</span>
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.3rem" }}>{item.mistake}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.why}</p>
              </div>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FAQ */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: "Do I need to use different products for morning and night?", a: "Not as a beginner. Same cleanser and moisturiser AM and PM is completely appropriate. The only AM-only product is sunscreen. You can eventually use a slightly richer moisturiser at night, but it is not necessary in the beginning." },
            { q: "Can I mix products from different brands?", a: "Yes. Brand loyalty in skincare is mostly marketing. A Cetaphil cleanser with a Minimalist moisturiser and Deconstruct sunscreen is a perfectly coherent routine. What matters is the ingredient profile, not the brand." },
            { q: "How long until I see results?", a: "Four to six weeks for improvement in texture and oiliness. Eight to twelve weeks for meaningful change in pigmentation or acne frequency. Skin cells turn over every 28 days. Results that matter require at least two full cell cycles." },
            { q: "My skin got worse in the first two weeks. Should I stop?", a: "Possibly a purge — skin adjusting to a new routine by surfacing congestion that was already forming. If the breakouts are small and in areas where you typically break out, stay the course for four weeks. If you are experiencing stinging, unusual redness, or breakouts in areas where you never break out, stop the newest product you added." },
            { q: "Do I need to exfoliate as a beginner?", a: "No. Exfoliation is one of the most over-recommended beginner steps and one of the most common causes of barrier damage. Get the three-step routine solid for at least three months before considering a gentle chemical exfoliant." },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "1.2rem 0" }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.05rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>{item.q}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>Further Reading</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { href: "/blog/what-niacinamide-does-to-your-skin", label: "What Niacinamide Actually Does to Your Skin" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
              { href: "/blog/best-sunscreens-india-2026", label: "Best Sunscreens in India (2026)" },
              { href: "/blog/barrier-repair-protocol", label: "How to Repair a Damaged Skin Barrier" },
              { href: "/blog/skincare-layering-order", label: "The Right Order to Apply Your Skincare" },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: "0.9rem", color: "var(--rose)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: "0.6rem" }}>{link.label} →</a>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>Not Sure What Your Skin Actually Needs?</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>Take our 4-question skin quiz and get a personalised routine matched to your skin type, concerns, and budget.</p>
          <a href="/tools/routine" style={{ display: "inline-block", background: "#fff", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "monospace" }}>Get My Routine →</a>
        </section>

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
          Affiliate links disclosed. Mirha \u0026 Co. participates in the Amazon Associates Program. We earn a small commission on qualifying purchases at no additional cost to you. Product recommendations are based on ingredient quality and verified customer reviews — not commission rates.
        </p>
      </article>
    </main>
  );
}

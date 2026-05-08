import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Repair a Damaged Skin Barrier — The 4-Week Protocol for Indian Skin | Mirha & Co.",
  description:
    "Burning from products that never used to sting. Oily and dry at the same time. Constant breakouts. This is barrier damage — and here is exactly how to fix it.",
  openGraph: {
    title: "How to Repair a Damaged Skin Barrier — The 4-Week Protocol",
    description: "Stripping your skin with actives is easy. Repairing the damage is a 4-week commitment. Here is the honest protocol for Indian skin.",
  },
};

export default function BarrierRepairPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>
          ← Back to Journal
        </Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>
          Beauty · Skincare · Barrier Repair
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          How to Repair a Damaged Skin Barrier
          <br /><em style={{ color: "var(--rose)", fontStyle: "italic" }}>The 4-Week Protocol for Indian Skin</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          If your skincare is suddenly burning. If your face feels tight and dehydrated despite moisturising twice a day. If you are breaking out with products that worked perfectly six months ago — your skin barrier is damaged. This is fixable. Most people repair it in four weeks with the right protocol.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>May 2026</span><span>·</span><span>10 min read</span><span>·</span><span>Protocol guide</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* WHAT IS THE BARRIER */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            What the Skin Barrier Actually Is
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The stratum corneum — the outermost layer of skin — functions like a brick wall. Skin cells are the bricks. Lipids (ceramides, cholesterol, fatty acids) are the mortar. When the mortar is intact, moisture stays in and irritants stay out. When it is compromised, both directions reverse simultaneously: water escapes and bacteria, allergens, and pollution enter.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The clinical term for moisture escaping is transepidermal water loss (TEWL). It is measurable, and elevated TEWL is the objective marker of a damaged barrier. The subjective experience: skin that feels both dry and oily, burns on contact with products, breaks out unpredictably, and looks dull regardless of hydration.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            In India specifically, hard water, pollution, and the whiplash between outdoor heat and indoor air conditioning create constant barrier stress even without an active routine. Add over-exfoliation, too many actives, or a harsh cleanser to that baseline stress, and barrier damage happens faster than most people realise.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SIGNS */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            How to Know If Your Barrier Is Damaged
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Not every bad skin day is barrier damage. These are the specific signals that indicate the barrier — not just the skin condition — is compromised:
          </p>
          {[
            { sign: "Stinging from products that never stung before", why: "Compromised barrier allows ingredients to penetrate deeper and trigger nerve endings." },
            { sign: "Skin feels simultaneously tight and oily", why: "Dehydration underneath, compensatory sebum on top. The barrier is not regulating either direction." },
            { sign: "Sudden breakouts that do not respond to your usual acne routine", why: "Bacteria and irritants are entering through barrier gaps. This is not the same as hormonal or comedogenic acne." },
            { sign: "Products pilling or sitting on top of skin instead of absorbing", why: "Damaged skin cannot absorb product normally — the surface texture changes." },
            { sign: "General redness or flushing that was not there before", why: "Inflammatory response to the irritants now freely entering the skin." },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "1rem 0" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.3rem" }}>{item.sign}</p>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.why}</p>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* WEEK 1 */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--rose)", background: "rgba(200,71,58,0.08)", padding: "0.3rem 0.7rem", borderRadius: 3 }}>WEEK 1</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", margin: 0 }}>Strip Everything Down</h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Stop all actives. No salicylic acid. No retinol. No AHAs. No vitamin C. No niacinamide serum. No exfoliation of any kind. The barrier cannot repair itself while it is still being stressed. The protocol for week one is deliberately boring.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Morning and night: gentle cleanser → moisturiser → SPF (morning only). That is the complete routine. Nothing else.
          </p>

          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>Cleanser — Gentle, sulphate-free, fragrance-free</p>
          <BlogProductCard asin="B01CCGW4OE" />

          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "monospace" }}>Moisturiser — Ceramide-rich, fragrance-free</p>
          <BlogProductCard asin="B099MJH88B" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* WEEK 2 */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--rose)", background: "rgba(200,71,58,0.08)", padding: "0.3rem 0.7rem", borderRadius: 3 }}>WEEK 2</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", margin: 0 }}>Add Hydration Back</h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            If week one brought noticeable improvement — less stinging, less tightness — add a hydrating toner or essence to your routine. No acids. No actives. Just humectants: hyaluronic acid, glycerin, panthenol.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Apply the hydrating layer on damp skin immediately after cleansing. The classic advice: within 60 seconds of patting dry. Humectants draw moisture from the environment — on damp skin, there is existing water to work with. On dry skin in a dry room, they can draw from deeper layers and worsen dehydration.
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>Hydration serum — apply to damp skin before moisturiser</p>
          <BlogProductCard asin="B0FG2PQVK5" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* WEEK 3 */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--rose)", background: "rgba(200,71,58,0.08)", padding: "0.3rem 0.7rem", borderRadius: 3 }}>WEEK 3</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", margin: 0 }}>Reintroduce Niacinamide</h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Niacinamide is the gentlest active you can reintroduce during repair. At 10%, it has documented evidence for improving skin barrier function through increased ceramide synthesis — it actively assists the repair process rather than simply not hindering it. A 2024 randomised controlled trial confirmed significant improvement in skin hydration and barrier integrity in niacinamide-treated groups versus controls.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Add it after your hydrating toner, before your moisturiser. One active. Nothing else added this week.
          </p>
          <BlogProductCard asin="B0DH88LZ11" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* WEEK 4 */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--rose)", background: "rgba(200,71,58,0.08)", padding: "0.3rem 0.7rem", borderRadius: 3 }}>WEEK 4+</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", margin: 0 }}>Reintroduce Actives — Slowly</h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            If your skin is no longer stinging, no longer tight, and the unexpected breakouts have calmed — the barrier has recovered enough to tolerate actives again. Reintroduce one at a time, in this order, with at least two weeks between additions.
          </p>
          {[
            { step: "First", what: "Vitamin C serum — antioxidant, low irritation risk at stable concentrations" },
            { step: "Then", what: "Salicylic acid 1–2% — two to three times per week, not daily initially" },
            { step: "Last", what: "Retinol — 0.025% or 0.1% to start, alternating nights, never with other actives" },
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", gap: "1rem", padding: "0.7rem 0", borderBottom: "1px solid var(--rule)" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--rose)", flexShrink: 0, width: "48px" }}>{item.step}</span>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.what}</p>
            </div>
          ))}
          <p style={{ fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.75, marginTop: "1rem", fontStyle: "italic" }}>
            Do not rush this. The barrier took time to damage. Rushing the reintroduction restarts the cycle.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FAQ */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: "How long does barrier repair actually take?", a: "Skin cells turn over every 28 days. Mild barrier damage resolves in two to four weeks with the right protocol. Severe damage — from months of over-exfoliation or prescription-strength actives — can take eight to twelve weeks. If you see no improvement after four weeks of the stripped-down routine, see a dermatologist. You may have rosacea, perioral dermatitis, or contact dermatitis rather than general barrier damage." },
            { q: "Can I wear makeup during barrier repair?", a: "Yes. Use a gentle oil-based makeup remover to cleanse (it removes makeup without the stripping action of foam cleansers), and avoid heavy foundations that require aggressive removal. Tinted moisturiser or light BB products are fine." },
            { q: "Is niacinamide good for barrier repair or does it stress the skin?", a: "Niacinamide actively supports barrier repair through increased ceramide synthesis. It is one of the few actives appropriate to use during the repair phase rather than after it. Start with it in week three of the protocol — not week one." },
            { q: "My skin is both oily and dry during barrier repair. What moisturiser should I use?", a: "This is classic barrier damage presenting as dehydrated-oily skin. Use a lightweight gel-cream — not a rich cream that sits on top — and layer it over a hydrating toner. The Neutrogena Hydro Boost or Cetaphil Moisturising Cream work for different ends of this spectrum depending on your climate." },
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
              { href: "/blog/niacinamide-5-vs-10", label: "Niacinamide 5% vs 10% — Which Concentration?" },
              { href: "/blog/skincare-layering-order", label: "The Right Order to Apply Your Skincare" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
              { href: "/blog/why-skin-looks-dull", label: "Why Your Skin Looks Dull Even After Skincare" },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: "0.9rem", color: "var(--rose)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: "0.6rem" }}>{link.label} →</a>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>Build a Routine That Does Not Break Your Barrier</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>Take our skin quiz and get a gentle, beginner-safe routine that actually works for your skin type.</p>
          <a href="/tools/routine" style={{ display: "inline-block", background: "#fff", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "monospace" }}>Get My Routine →</a>
        </section>

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
          Affiliate links disclosed. Mirha & Co. participates in the Amazon Associates Program. We earn a small commission on qualifying purchases at no additional cost to you. This post is for informational purposes. Persistent barrier damage or skin conditions should be assessed by a dermatologist.
        </p>
      </article>
    </main>
  );
}

import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Treat Active Acne Fast — Pimple Patches + Benzoyl Peroxide India Guide | Mirha & Co.",
  description: "A real protocol for active acne in India. Mighty Patch for overnight spot treatment, benzoyl peroxide for persistent breakouts. What to use, when, and in what order.",
  openGraph: {
    title: "How to Treat Active Acne Fast — The Protocol That Works for Indian Skin",
    description: "Pimple patches. Benzoyl peroxide. The right order. No fluff — just what actually clears active acne faster for Indian skin.",
  },
};

export default function ActiveAcnePage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>← Back to Journal</Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>Beauty · Acne · Spot Treatment</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          How to Treat Active Acne Fast
          <br /><em style={{ color: "var(--rose)", fontStyle: "italic" }}>The Protocol That Actually Works for Indian Skin</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          A pimple appears. Most people either squeeze it (bad) or slather on a random spot cream and hope for the best (slow). There is a faster, more intelligent approach — and it uses two products that work through entirely different mechanisms. Together, they resolve active acne significantly quicker than either alone.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>May 2026</span><span>·</span><span>9 min read</span><span>·</span><span>Spot treatment guide</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Why Active Acne Needs a Two-Step Approach
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Active acne — the inflamed, raised kind — is not a surface problem. It involves a blocked pore, bacterial activity, and an inflammatory response all happening simultaneously. A single product targeting only one of these pathways will always be slower than a combination that targets all three.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The two-step protocol: a <strong style={{ color: "var(--ink)" }}>hydrocolloid pimple patch</strong> to physically draw out the contents and protect the spot from contamination, and <strong style={{ color: "var(--ink)" }}>benzoyl peroxide</strong> for the broader breakout area to kill the bacteria and reduce inflammation at the source. They serve different purposes and work best used in rotation.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            This protocol is particularly relevant for Indian skin because of how the climate contributes to breakouts. Humidity increases sebum production and keeps surface bacteria active. Pollution particles mix with sebum to clog pores faster. Touching the face in the heat of commuting spreads bacteria. Active acne treatment in India needs to be efficient and non-irritating — because an inflamed pimple that becomes a dark mark is a six-week problem, not a two-day one.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Step 1 — Pimple Patch: Overnight Spot Treatment
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Mighty Patch by Hero Cosmetics is the most consistent performer in this category. It uses hydrocolloid technology — the same material used in wound dressings — to create a moist healing environment over the spot while drawing out sebum, pus, and bacteria through osmotic pressure.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The patch does three things simultaneously: it physically extracts the contents of a whitehead without squeezing (which prevents scarring), it blocks bacteria on your pillow, fingers, and phone from reaching the open spot, and it accelerates healing by maintaining the right moisture level for skin repair.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>When the patch turns white and opaque, it has done its job.</strong> That is absorbed sebum and fluid — not a sign of infection. Change it every six to eight hours, or at minimum morning and night.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            The patch works on surface whiteheads and papules. It will not work on deep cystic acne — those have no surface exit point for the hydrocolloid to draw from. For cysts, benzoyl peroxide and patience are the correct approach.
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>For surface acne and whiteheads</p>
          <BlogProductCard asin="MIGHTYPATCH" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Step 2 — Benzoyl Peroxide: The Bacteria Killer
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Benzoyl peroxide (BPO) is one of the few OTC ingredients with decades of clinical evidence behind it. The 2024 American Academy of Dermatology acne guidelines give it a <strong style={{ color: "var(--ink)" }}>strong recommendation</strong> — the highest level — for acne treatment. It works by releasing oxygen into the pore, which kills <em>Cutibacterium acnes</em> (the bacteria responsible for inflammatory acne) on contact. Bacteria cannot develop resistance to it, unlike antibiotics.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Start with 2.5%. Despite what intuition suggests, 2.5% BPO is clinically equivalent in antibacterial effect to 5% and 10%, with significantly less irritation, dryness, and peeling. In India's heat and humidity, starting with a lower concentration reduces the risk of over-drying the skin barrier, which makes breakouts worse.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>Critical warning:</strong> BPO bleaches fabric on contact. It will bleach pillowcases, towels, and shirt collars if it transfers. Use a white towel. Switch to a white pillowcase or apply BPO well before lying down.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Apply a thin layer to the affected area only — not the entire face. Leave on for two minutes initially, building to five and then to overnight as your skin tolerates it. Always follow with a non-comedogenic moisturiser and SPF the next morning.
          </p>
          <div style={{ background: "var(--sand)", border: "1px solid var(--rule)", borderRadius: 8, padding: "1.2rem 1.4rem", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.5rem", fontFamily: "monospace" }}>Available in India as</p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.7, margin: 0 }}>Persol AC 2.5% Gel, Benzac AC 2.5%, and Sebamed Gel — all available at pharmacies and on Amazon India. Persol and Benzac are the most widely stocked.</p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Protocol — Morning and Night
          </h2>
          {[
            { time: "Night — When a Pimple Appears", steps: ["Cleanse face gently, pat completely dry.", "Apply a thin layer of BPO 2.5% to the breakout area. Wait 5 minutes.", "Place Mighty Patch over the whitehead. The patch goes on top — BPO underneath, patch on top.", "Leave overnight. Do not touch."] },
            { time: "Morning", steps: ["Remove patch. Note the white colour — that is extracted fluid.", "Cleanse. Apply niacinamide serum to the spot area to calm inflammation.", "Moisturise. Apply SPF 50+ as the final step — non-negotiable when using BPO.", "If the spot still has contents, apply a fresh patch during the day if needed."] },
          ].map((item) => (
            <div key={item.time} style={{ border: "1px solid var(--rule)", borderRadius: 8, padding: "1.3rem 1.5rem", marginBottom: "1rem", background: "var(--sand)" }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>{item.time}</p>
              <ol style={{ paddingLeft: "1.2rem", margin: 0, fontSize: "0.9rem", color: "var(--muted)", lineHeight: 2 }}>
                {item.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            After the Acne Clears — Treating the Dark Mark
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Indian skin's higher melanin content means post-inflammatory hyperpigmentation (PIH) — the dark mark left after a pimple heals — is almost inevitable without active prevention. The mark is not a scar. It fades on its own in eight to twelve weeks. But the right routine cuts that timeline significantly.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Once the active pimple is gone: switch from BPO to a 10% niacinamide serum on the spot. Niacinamide inhibits melanosome transfer — the process that creates the dark mark — and fades existing PIH alongside it. SPF every morning without exception. UV exposure is the primary reason dark marks take longer to fade than they should.
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>Switch to this once acne clears</p>
          <BlogProductCard asin="B0DH88LZ11" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>Frequently Asked Questions</h2>
          {[
            { q: "Can I use the pimple patch and benzoyl peroxide at the same time?", a: "Yes — apply BPO to the area first, wait five minutes, then apply the patch on top of the whitehead. The patch goes over, not instead of, the BPO application." },
            { q: "Do pimple patches work on cystic acne?", a: "No. Hydrocolloid patches require a surface opening to extract from. Cystic acne is deep under the skin with no surface exit point. For cysts, BPO and niacinamide are the correct approach. A dermatologist can administer an intralesional steroid injection for stubborn cysts." },
            { q: "Can I use benzoyl peroxide every day?", a: "Build up to it. Start with alternate nights for two weeks, then nightly. Daily BPO on un-adapted Indian skin in humid conditions can cause dryness and barrier disruption. The barrier damage then worsens acne — the opposite of what you want." },
            { q: "Why does my skin look darker after a pimple heals?", a: "Post-inflammatory hyperpigmentation — PIH. Not a scar. Indian skin produces more melanin in response to inflammation, leaving a dark mark. It fades in eight to twelve weeks on its own. Niacinamide and SPF together cut this timeline significantly." },
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
              { href: "/blog/salicylic-acid-guide-india", label: "Salicylic Acid Guide for Indian Skin — Acne, Blackheads, Oily Skin" },
              { href: "/blog/best-niacinamide-serums-india", label: "Best Niacinamide Serums in India (2026)" },
              { href: "/blog/niacinamide-for-oily-skin", label: "Niacinamide for Oily Skin in India" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: "0.9rem", color: "var(--rose)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: "0.6rem" }}>{link.label} →</a>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>Not Sure Which Routine Fits Your Skin?</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>Take our 4-question quiz and get a personalised routine with curated product picks for Indian skin.</p>
          <a href="/tools/routine" style={{ display: "inline-block", background: "#fff", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "monospace" }}>Get My Routine →</a>
        </section>

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
          Affiliate links disclosed. Mirha & Co. participates in the Amazon Associates Program. We earn a small commission on qualifying purchases at no additional cost to you. This post is for informational purposes only and does not constitute medical advice. Consult a dermatologist for persistent or severe acne.
        </p>
      </article>
    </main>
  );
}

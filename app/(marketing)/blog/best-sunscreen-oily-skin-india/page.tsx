import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Sunscreen for Oily Skin in India (2026) — No Grease, No White Cast | Mirha & Co.",
  description:
    "The honest guide to finding a sunscreen that works for oily, acne-prone Indian skin. Lightweight formulas, no white cast, no noon grease. Real picks with real prices.",
  openGraph: {
    title: "Best Sunscreen for Oily Skin in India (2026) — No Grease, No White Cast",
    description:
      "No more skipping SPF because it makes you look like a ghost. The sunscreens that actually work for oily Indian skin.",
  },
};

export default function SunscreenOilySkinPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>
          ← Back to Journal
        </Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>
          Beauty · Sunscreen · Oily Skin
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          Best Sunscreen for Oily Skin in India
          <br />
          <em style={{ color: "var(--rose)", fontStyle: "italic" }}>No Grease. No White Cast. No Excuses.</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          If you have oily skin, you have probably tried a sunscreen that made your face look like a wax museum exhibit by 11am. So you stopped wearing it. This guide exists to fix that. The right sunscreen for oily Indian skin is out there — it is just not the one your aunty recommends.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>May 2026</span><span>·</span><span>8 min read</span><span>·</span><span>Research-based</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* WHY SPF */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Why Skipping Sunscreen Is a Bigger Problem Than Oily Skin
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            India sits between 8° and 37° North latitude. The UV index in most Indian cities peaks between 9 and 11 — classified as Very High to Extreme — for the majority of the year, not just summer. This is not a seasonal concern. It is a daily one.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            UV radiation is the primary driver of hyperpigmentation, uneven skin tone, and premature collagen breakdown. For Indian skin specifically, where post-inflammatory hyperpigmentation from acne is already a persistent issue, every day without SPF is UV damage actively darkening whatever marks are already there.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The argument "sunscreen makes oily skin worse" is accurate for the wrong sunscreens. A heavy cream SPF formulated for dry skin will absolutely worsen oily skin. A lightweight gel SPF formulated for oily skin will do the opposite — some users report improved oil control because the barrier protection reduces the reactive sebum production triggered by UV damage.
          </p>
          <div style={{ background: "var(--sand)", border: "1px solid var(--rule)", borderRadius: 8, padding: "1.2rem 1.5rem" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.5rem", fontFamily: "monospace" }}>The short version</p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.7, margin: 0 }}>SPF 30 blocks 97% of UVB. SPF 50 blocks 98%. In Indian conditions, the extra 1% matters less than consistent daily application. Use whichever SPF you will actually apply every morning without fail.</p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* WHAT TO LOOK FOR */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            What to Actually Look for in a Sunscreen for Oily Skin
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Ignore the marketing. These are the four things that matter.
          </p>
          {[
            { label: "Gel or gel-cream texture", desc: "The only textures that work in Indian humidity without sitting on top of oily skin. Water-based, not oil-based. Absorbs rather than coats." },
            { label: "No heavy silicones or mineral oil", desc: "Dimethicone in small amounts is fine. But sunscreens that list silicone-heavy ingredients prominently will feel suffocating on already-oily skin by midday." },
            { label: "PA++++ rating", desc: "The PA rating measures UVA protection — the wavelength that causes pigmentation and aging. PA++++ is the highest available. Non-negotiable for Indian skin dealing with pigmentation concerns." },
            { label: "Fragrance-free if acne-prone", desc: "Fragrance is one of the most common contact irritants in skincare. If you break out easily, fragrance in your sunscreen is a suspect you should eliminate." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem", padding: "0.8rem 0", borderBottom: "1px solid var(--rule)" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--rose)", flexShrink: 0, paddingTop: "0.1rem" }}>0{i + 1}</span>
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.3rem" }}>{item.label}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* PICKS */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.5rem" }}>
            The Picks
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6, margin: "0 0 2rem" }}>
            All verified on Amazon India. Prices current at time of writing — check links for live pricing.
          </p>

          {/* Pick 1 */}
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.5rem" }}>
            Minimalist SPF 50 PA+++ — The Daily Driver
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "0.5rem" }}>
            The most consistently recommended Indian sunscreen for oily skin in this price range. Genuinely lightweight — not just "lightweight" as a marketing claim. No white cast. Sets to a natural matte. Layers under moisturiser and over serums without pilling.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "1.2rem" }}>
            At 100gm, the value is excellent. The niacinamide addition means it is doing double duty — UV protection and mild sebum regulation simultaneously. Best for: daily AM routine, oily to combination skin, office and commuting use.
          </p>
          <BlogProductCard asin="B0DHY6LQTW" />

          {/* Pick 2 */}
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 0.5rem" }}>
            Aqualogica Radiance+ Dewy Sunscreen — For Oily-Dehydrated Skin
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "0.5rem" }}>
            Oily skin that is simultaneously dehydrated is more common than most people realise — especially in air-conditioned environments. This sunscreen is the correct call for that profile: it provides hydration through hyaluronic acid and watermelon extract while remaining light enough for oily skin in Indian humidity.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "1.2rem" }}>
            The APF (Anti-Pollution Factor) technology is relevant for daily commuters in Indian metros. Blue light protection is increasingly relevant for people who work on screens all day. PA++++ rating. No white cast. Best for: oily-dehydrated skin, urban pollution, screen-heavy days.
          </p>
          <BlogProductCard asin="B0C9JPWLR4" />

          {/* Pick 3 */}
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 0.5rem" }}>
            WishCare Niacinamide Sunscreen SPF 50 PA++++ — Value Pick
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "0.5rem" }}>
            8-hour SPF protection claim backed by in-vivo testing. Niacinamide, Zinc PCA, CICA, and ceramides in a single SPF formula — this is unusually comprehensive for the price. The matte finish holds reasonably well through a typical office day without reapplication.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "1.2rem" }}>
            The 4.5 star rating at 5.2k reviews is a meaningful signal. Smaller brands with fewer reviews tend to have more authentic feedback. Best for: budget-conscious, oily to combination skin, those looking to add niacinamide without a separate serum.
          </p>
          <BlogProductCard asin="B0CW1N7QRT" />

          {/* Pick 4 */}
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 0.5rem" }}>
            Deconstruct Gel Sunscreen SPF 50 PA++++ — Best Texture
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "0.5rem" }}>
            Four next-generation UV filters. 100% photostable. The "airy gel" texture claim is accurate — this is the most genuinely weightless formula in this roundup. If everything else has felt heavy on your skin, start here.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "1.2rem" }}>
            In-vivo tested. Appropriate for oily, combination, and normal skin. Best for: first-time SPF wearers who have always found sunscreens intolerable, very oily skin, humid coastal climates.
          </p>
          <BlogProductCard asin="B0B45RB1RV" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* HOW TO APPLY */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Application — The Part Most People Get Wrong
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            SPF ratings are tested at 2mg/cm² — approximately a quarter teaspoon for the full face. Most people apply a fraction of that amount, which means they are getting a fraction of the stated protection. If you are applying a thin veil and wondering why you are still tanning, this is why.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The correct order: cleanser → serum(s) → moisturiser → sunscreen. Sunscreen is always last in the morning routine, applied after everything else has absorbed. Wait two to three minutes before going into direct sun.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Reapplication: every two hours if you are outdoors. If you are indoors near windows, once in the morning is adequate. Sweat and water reduce effectiveness significantly — reapply after swimming or heavy sweating regardless of the two-hour window.
          </p>
          <div style={{ background: "var(--sand)", border: "1px solid var(--rule)", borderRadius: 8, padding: "1.2rem 1.5rem" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.5rem", fontFamily: "monospace" }}>For oily skin specifically</p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.7, margin: 0 }}>Blot your face before applying sunscreen if you tend to be visibly oily in the morning. Applying SPF over existing oil reduces how evenly it spreads and accelerates the greasy feeling. Clean, slightly dry skin gives the best result.</p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FAQ */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: "Do I need sunscreen if I'm staying indoors?", a: "UVA rays — the wavelength responsible for pigmentation and photoaging — penetrate glass. If you sit near a window, you are receiving UVA exposure. For most indoor workers with no window proximity, a single morning application is sufficient. For those seated near windows, it matters." },
            { q: "Chemical or mineral sunscreen — which is better for oily skin?", a: "For oily skin in Indian humidity, chemical (organic filter) sunscreens almost always perform better. They absorb into skin rather than sitting on top, which means less of the white cast and heavy feel associated with mineral (zinc oxide/titanium dioxide) formulas. Mineral sunscreens are the better choice for highly sensitive or reactive skin." },
            { q: "My sunscreen pills under makeup. How do I fix this?", a: "Pilling happens when products are not fully absorbed before the next layer goes on. Wait two to three minutes after sunscreen before applying makeup. Also reduce the amount — excess product pills faster. Less is more with gel sunscreens." },
            { q: "How much does SPF actually cost per month?", a: "A 50ml tube used correctly (quarter teaspoon daily) lasts approximately 30–40 days. At ₹280–₹533 for the products above, that is ₹7–18 per day. UV damage correction — laser, chemical peels, hyperpigmentation treatments — costs substantially more." },
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
              { href: "/blog/best-niacinamide-serums-india", label: "Best Niacinamide Serums in India (2026)" },
              { href: "/blog/niacinamide-for-oily-skin", label: "Niacinamide for Oily Skin in India" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
              { href: "/blog/salicylic-acid-guide-india", label: "Salicylic Acid Guide for Indian Skin" },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: "0.9rem", color: "var(--rose)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: "0.6rem" }}>{link.label} →</a>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>Not Sure Which Routine Fits Your Skin?</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>Take our 4-question quiz and get a personalised routine with the right SPF for your skin type.</p>
          <a href="/tools/routine" style={{ display: "inline-block", background: "#fff", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "monospace" }}>Get My Routine →</a>
        </section>

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
          Affiliate links disclosed. Mirha & Co. participates in the Amazon Associates Program. We earn a small commission on qualifying purchases at no additional cost to you. Product recommendations are based on ingredient quality and verified customer reviews — not commission rates.
        </p>
      </article>
    </main>
  );
}

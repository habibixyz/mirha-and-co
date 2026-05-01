import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Moisturisers for Oily vs Dry Skin in India (2026 Guide) | Mirha & Co.",
  description:
    "Gel, cream, or lotion? The honest breakdown of the best moisturisers for oily, dry, and combination Indian skin — including why your current moisturiser might not be working.",
  openGraph: {
    title: "Best Moisturisers for Oily vs Dry Skin in India (2026 Guide)",
    description:
      "The complete India-specific moisturiser guide — textures explained, top picks by skin type, and the most common mistake that's making your skin worse.",
  },
};

export default function MoisturiserPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "var(--font-mono, monospace)" }}>
          ← Back to Journal
        </Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "var(--font-mono, monospace)" }}>
          Beauty · Skincare
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          Best Moisturisers for Oily vs Dry Skin in India
          <br />
          <em style={{ color: "var(--rose)", fontStyle: "italic" }}>2026 Guide</em>
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--muted)", lineHeight: 1.75, margin: "0 0 1.5rem" }}>
          The moisturiser is the step most people get wrong — either skipping it
          entirely (oily skin) or using a formula that is too heavy for Indian humidity.
          This guide cuts through the texture confusion and tells you exactly what works
          for your skin type and climate.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "var(--font-mono, monospace)" }}>
          <span>April 2026</span><span>·</span><span>11 min read</span><span>·</span><span>Skin type guide</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* WHY MOISTURISER */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Why Moisturiser Is Non-Negotiable — Even for Oily Skin
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The most persistent myth in Indian skincare is that oily skin does not need a
            moisturiser. The logic seems sound — why add moisture to already-oily skin?
            The reality is the opposite of what the logic suggests.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Sebum (oil) and water are different things. Sebum is produced by sebaceous
            glands as a protective barrier. When the skin becomes dehydrated — which
            happens from harsh cleansers, air conditioning, pollution, and sun exposure —
            it signals the sebaceous glands to produce more oil to compensate.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--ink)" }}>The result: oily skin that is also
            dehydrated.</strong> Using a lightweight moisturiser breaks this cycle. Hydrated
            skin has no reason to overproduce sebum. Most people who switch from
            skipping moisturiser to using a gel moisturiser report less midday oiliness
            within three to four weeks — not more.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* TEXTURE GUIDE */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Gel vs Lotion vs Cream — What the Textures Mean
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            The texture of a moisturiser determines how it feels on skin and who it is
            appropriate for. In Indian conditions — heat, humidity, and heavy air
            conditioning — texture choice matters more than ingredient list.
          </p>

          {[
            {
              type: "Gel / Water Gel",
              skin: "Oily, combination, acne-prone",
              feel: "Absorbs immediately, no residue, no white cast. The only format that works for oily skin in Indian summers.",
              when: "Year-round for oily skin. For combination skin in monsoon and summer months.",
            },
            {
              type: "Lotion",
              skin: "Normal, combination",
              feel: "Lighter than cream, some residue, moderate hydration. Works well in moderate climates and AC environments.",
              when: "Delhi winter for combination skin. Coastal climates for normal skin year-round.",
            },
            {
              type: "Cream",
              skin: "Dry, very dry, sensitive",
              feel: "Rich, occlusive, stays on skin. Prevents transepidermal water loss. Can feel heavy in humidity.",
              when: "Dry skin year-round. All skin types in AC-heavy environments or winter months.",
            },
          ].map((item) => (
            <div key={item.type} style={{ border: "1px solid var(--rule)", borderRadius: 8, padding: "1.3rem 1.5rem", marginBottom: "1rem", background: "var(--sand)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", margin: 0 }}>{item.type}</h3>
                <span style={{ fontSize: "0.75rem", color: "var(--rose)", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.1em" }}>{item.skin}</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 0.4rem" }}>{item.feel}</p>
              <p style={{ fontSize: "0.82rem", color: "var(--ink)", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>When: {item.when}</p>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* OILY SKIN */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            For Oily and Acne-Prone Skin
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The criteria for oily skin: oil-free, non-comedogenic, absorbs in seconds,
            no residue, and ideally contains hyaluronic acid rather than heavy emollients.
            In Indian humidity, anything with mineral oil, petrolatum, or silicones as
            primary ingredients will feel suffocating by midday.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Neutrogena Hydro Boost Water Gel is the clearest example of what oily skin
            actually needs: 98% water-based, absorbs without trace, hyaluronic acid as
            the primary active, dermatologist-approved across clinical settings. It is
            used as a reference product by dermatologists in India precisely because it
            functions without compromising oily skin.
          </p>
          <BlogProductCard asin="B00BQFTQW6" />

          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginTop: "1.5rem" }}>
            <strong style={{ color: "var(--ink)" }}>Amount to use:</strong> a five-paise
            coin-sized amount for the full face. Oily skin needs hydration, not layers of
            product. Over-applying a gel moisturiser on oily skin leads to pilling when
            you apply SPF on top.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* DRY SKIN */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            For Dry and Sensitive Skin
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Dry skin needs a moisturiser that does two things: delivers hydration
            (humectants like hyaluronic acid and glycerin) and seals it in (occlusives
            like petrolatum, shea butter, ceramides). A product that only delivers
            hydration without sealing it loses water to evaporation — this is why
            lightweight serums alone do not fix dry skin.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            For dry skin in India, the priorities are fragrance-free (fragrance is the
            most common allergen in Indian beauty products and dry skin is more permeable),
            ceramide-containing where possible, and rich enough to provide an occlusive
            seal. Cetaphil Moisturising Cream meets all three criteria and remains the
            first recommendation of most Indian dermatologists for consistently dry or
            eczema-adjacent skin.
          </p>
          <BlogProductCard asin="B099MJH88B" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* COMBINATION */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            For Combination Skin
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Combination skin — oily T-zone, normal to dry cheeks — is the hardest to
            moisturise because both zones have different needs. The practical solution is
            to use a lightweight gel moisturiser across the full face (which handles the
            T-zone) and apply a small additional amount of a slightly richer product
            on the cheeks only.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            In Indian humidity, a gel moisturiser is almost always sufficient for both
            zones. In winter or heavy AC environments, the cheeks may need a brief
            additional layer.
          </p>
          <BlogProductCard asin="B00BQFTQW6" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* WHY NOT WORKING */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Why Your Moisturiser Is Not Working
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>You are applying it on dry skin.</strong>{" "}
            Humectants — hyaluronic acid, glycerin — draw moisture from the environment
            into the skin. On dry skin in low-humidity conditions (air conditioning,
            winter), there is nothing to draw from. Apply moisturiser on slightly damp
            skin — within 60 seconds of cleansing — to lock in existing water.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>You are using the wrong texture for your climate.</strong>{" "}
            A cream moisturiser in Mumbai's monsoon will feel suffocating and pill under
            SPF. A gel moisturiser in Delhi's January will leave skin feeling tight within
            an hour. Match your moisturiser texture to your current climate, not just your
            skin type.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>You are skipping SPF.</strong> UV
            exposure causes transepidermal water loss — the technical term for your skin
            losing moisture through its surface. If you moisturise every morning and then
            go out without SPF, you are undoing the hydration within an hour. Moisturiser
            without SPF is incomplete in India year-round.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--ink)" }}>Your cleanser is too harsh.</strong>{" "}
            Sulphate-based face washes strip the skin barrier, which prevents any
            moisturiser from working effectively because moisture escapes through the
            compromised barrier as fast as it is applied. The moisturiser problem is
            often actually a cleanser problem.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FAQ */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            Frequently Asked Questions
          </h2>
          {[
            {
              q: "Do I need a separate day and night moisturiser?",
              a: "No. The difference between AM and PM moisturisers is largely marketing. A good lightweight gel moisturiser (AM and PM for oily skin) or a cream (PM for dry skin, gel AM) is sufficient. The one valid distinction: your AM moisturiser should be followed by SPF. Your PM moisturiser can be slightly richer if your skin is dry.",
            },
            {
              q: "Should I moisturise if I have active acne?",
              a: "Yes — especially if you are using acne treatments (salicylic acid, retinol, benzoyl peroxide) that dry the skin. Active acne does not mean your skin does not need hydration. Use an oil-free, non-comedogenic gel moisturiser. Skipping it while using drying actives is one of the fastest ways to damage your skin barrier.",
            },
            {
              q: "Can I use a body lotion on my face?",
              a: "Generally not recommended. Body lotions are formulated for the thicker, less sensitive skin of the body and often contain fragrances and heavier emollients that can clog facial pores. Use a face-specific formula.",
            },
            {
              q: "What order does moisturiser go in the routine?",
              a: "After your serum(s) and before SPF in the morning. After your serum(s) as the final step in the evening. The rule is thinnest to thickest — serums before moisturiser, moisturiser before SPF.",
            },
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
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
              { href: "/blog/skincare-layering-order", label: "The Right Order to Apply Your Skincare" },
              { href: "/blog/best-sunscreens-india-2026", label: "Best Sunscreens in India (2026)" },
              { href: "/blog/niacinamide-for-oily-skin", label: "Niacinamide for Oily Skin in India" },
              { href: "/blog/salicylic-acid-guide-india", label: "Salicylic Acid Guide for Indian Skin" },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: "0.9rem", color: "var(--rose)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: "0.6rem" }}>
                {link.label} →
              </a>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.6rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>
            Not Sure Which Routine Fits Your Skin?
          </h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
            Take our 4-question skin quiz and get a personalised routine with curated product picks.
          </p>
          <a href="/tools/routine" style={{
            display: "inline-block", background: "#fff", color: "var(--ink)",
            fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "var(--font-mono, monospace)",
          }}>Get My Routine →</a>
        </section>

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
          Affiliate links disclosed. Mirha & Co. participates in the Amazon Associates Program.
          We earn a small commission on qualifying purchases at no additional cost to you.
        </p>
      </article>
    </main>
  );
}
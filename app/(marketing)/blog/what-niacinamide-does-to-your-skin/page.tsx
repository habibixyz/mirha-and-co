import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "What Niacinamide Actually Does to Your Skin (India Edition) | Mirha & Co.",
  description:
    "The no-fluff India-specific guide to niacinamide: oil control, open pores, acne marks, skin barrier support, and the best serums under ₹700.",
  openGraph: {
    title: "What Niacinamide Actually Does to Your Skin (India Edition) | Mirha & Co.",
    description:
      "The no-fluff India-specific guide to niacinamide: oil control, open pores, acne marks, skin barrier support, and the best serums under ₹700.",
  },
};

export default function NiacinamidePost() {
  return (
    <main
      style={{
        background: "var(--bg)",
        color: "var(--ink)",
        minHeight: "100vh",
        fontFamily: "var(--font-sans), sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          padding: "34px 22px 76px",
        }}
      >
        <Link
          href="/blog"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
            textDecoration: "none",
            fontFamily: "var(--font-mono, monospace)",
          }}
        >
          ← Back to Journal
        </Link>

        {/* HEADER */}
        <header
          style={{
            padding: "54px 0 34px",
            borderBottom: "1px solid var(--rule)",
            marginBottom: "34px",
          }}
        >
          <p
            style={{
              color: "var(--rose)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 700,
              margin: "0 0 16px",
            }}
          >
            BEAUTY · SKINCARE
          </p>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(32px, 7vw, 54px)",
              lineHeight: "1.1",
              fontWeight: 400,
              margin: "0 0 16px",
              color: "var(--ink)",
            }}
          >
            What Niacinamide Actually Does to Your Skin — India Edition
          </h1>
          <div
            style={{
              color: "var(--muted)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <span>March 2026</span>
            <span>10 min read</span>
            <span>Research-backed</span>
          </div>
        </header>

        {/* CONTENT */}
        <section
          style={{
            fontSize: "1rem",
            lineHeight: "1.8",
            color: "var(--ink)",
          }}
        >
          <p style={{ marginBottom: "1.5rem" }}>
            Walk into any pharmacy in India right now — Nykaa, Amazon, even your local
            medical store — and you'll see niacinamide on every second product. Serums,
            moisturisers, face washes, sunscreens. The word is everywhere.
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            If you have oily skin, open pores, pigmentation from old acne marks, or that
            dull uneven tone that Indian skin gets after years of humidity, pollution, and
            unforgiving summers — chances are someone has already told you: <em>"Try niacinamide."</em>
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            But what does it actually do? Is it worth the hype? Which percentage should
            you use? And which products in India are genuinely good versus which ones are
            just riding the trend? This is the complete, no-fluff guide — written
            specifically for Indian skin concerns, Indian weather, and Indian budgets.
          </p>

          <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              margin: "2.5rem 0 1.2rem",
              color: "var(--ink)",
            }}
          >
            What Is Niacinamide?
          </h2>

          <p style={{ marginBottom: "1.5rem" }}>
            Niacinamide is Vitamin B3. That's it. It's a water-soluble vitamin that your
            skin can absorb and use directly when applied topically. It's been studied
            extensively — far more than most trendy skincare ingredients. Dermatologists
            have been recommending it for decades.
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            The reason it's suddenly everywhere is simple: brands finally realised Indian
            consumers were researching ingredients, and niacinamide has the receipts.
            The clinical evidence is solid, it's stable in formulas, and it's affordable
            to manufacture — which means budget products can use effective concentrations.
          </p>

          <div
            style={{
              background: "var(--sand)",
              borderLeft: "4px solid var(--rose)",
              padding: "1.5rem",
              margin: "2rem 0",
            }}
          >
            Unlike a lot of skincare ingredients that promise everything and deliver
            vague "glow," niacinamide has specific, measurable effects validated in
            multiple independent clinical studies.
          </div>

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              margin: "2.5rem 0 1.2rem",
              color: "var(--ink)",
            }}
          >
            What Niacinamide Actually Does — Benefit by Benefit
          </h2>

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            Oil Control — The Big One for Indian Skin
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            If you live in Mumbai, Chennai, Delhi, or anywhere with humidity above 60%
            for half the year, you know the struggle. Oily skin in India isn't just a
            skin type — it's a climate problem. Your sebaceous glands work overtime
            when it's hot and humid, and the result is shine, clogged pores, and
            breakouts by noon.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            Niacinamide reduces sebum production at 2–5% concentration. This is one
            of the best-documented benefits and the reason dermatologists specifically
            recommend it for oily and combination skin in tropical climates.
          </p>

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            Pore Appearance — Not Shrinking, But Visibly Smaller
          </h3>
          <p style={{ marginBottom: "1.5rem" }}>
            You cannot physically shrink your pores — pore size is genetic. What
            niacinamide does is reduce the sebum and debris that stretches pores open,
            making them appear visibly smaller. The difference on camera and in the
            mirror is real — the mechanism is just different from what brands imply.
          </p>

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            Pigmentation and Dark Spots — Especially Post-Acne Marks
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            Post-inflammatory hyperpigmentation — the dark marks left behind after
            pimples — is significantly more pronounced in Indian and South Asian skin
            due to higher melanin levels. These marks can take months to fade without
            intervention.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            Niacinamide inhibits the transfer of melanin to your skin cells. Regular
            use of 5–10% niacinamide has been clinically shown to reduce
            hyperpigmentation and fade dark spots over 8–12 weeks. It's slower than
            chemical exfoliants but much gentler — suitable for sensitive skin that
            can't tolerate AHAs or retinol.
          </p>

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            Skin Barrier Repair
          </h3>
          <p style={{ marginBottom: "1.5rem" }}>
            Your skin barrier is the protective outer layer that keeps moisture in and
            irritants out. Over-exfoliation, harsh soaps, pollution, and the Indian
            summer all damage it. Niacinamide increases ceramide synthesis — the lipids
            that hold your skin barrier together. This is why it's one of the few active
            ingredients that can be used even when your skin is sensitised.
          </p>

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            Anti-Inflammatory Effects
          </h3>
          <p style={{ marginBottom: "1.5rem" }}>
            Inflammatory acne — the red, painful kind — responds well to niacinamide.
            It reduces redness and calms the immune response that makes breakouts worse.
            As a daily maintenance ingredient, it keeps low-grade inflammation in check.
          </p>

          <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              margin: "2.5rem 0 1.2rem",
              color: "var(--ink)",
            }}
          >
            How to Use Niacinamide
          </h2>

          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li><strong>When:</strong> Morning and/or night — stable in both</li>
            <li><strong>Order:</strong> After cleansing, before moisturiser</li>
            <li><strong>How much:</strong> 2–4 drops, press gently, don't rub</li>
            <li><strong>With SPF:</strong> Always use SPF in the morning — niacinamide fades pigmentation but UV creates new marks faster</li>
          </ul>

          <p style={{ marginBottom: "1.5rem" }}>
            Can you use niacinamide with Vitamin C? <strong>Yes.</strong> The old advice
            against this is outdated. You can layer them or use one in the morning and
            one at night.
          </p>

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              margin: "2.5rem 0 1.2rem",
              color: "var(--ink)",
            }}
          >
            5% vs 10% — Which One Do You Need?
          </h2>

          <div style={{ overflowX: "auto", margin: "2rem 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "var(--sand)", borderBottom: "2px solid var(--rule)" }}>
                  <th style={{ padding: "0.8rem", textAlign: "left", fontWeight: 600 }}>Concentration</th>
                  <th style={{ padding: "0.8rem", textAlign: "left", fontWeight: 600 }}>Best For</th>
                  <th style={{ padding: "0.8rem", textAlign: "left", fontWeight: 600 }}>Skin Type</th>
                  <th style={{ padding: "0.8rem", textAlign: "left", fontWeight: 600 }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--rule)" }}>
                  <td style={{ padding: "0.8rem" }}><strong>5%</strong></td>
                  <td style={{ padding: "0.8rem" }}>Beginners, maintenance, barrier repair</td>
                  <td style={{ padding: "0.8rem" }}>All types including sensitive</td>
                  <td style={{ padding: "0.8rem" }}>Start here. Lower irritation risk.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--rule)" }}>
                  <td style={{ padding: "0.8rem" }}><strong>10%</strong></td>
                  <td style={{ padding: "0.8rem" }}>Oily skin, open pores, active pigmentation</td>
                  <td style={{ padding: "0.8rem" }}>Oily, combination, normal</td>
                  <td style={{ padding: "0.8rem" }}>Faster results, slightly higher irritation risk for sensitive skin</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              margin: "2.5rem 0 1.2rem",
              color: "var(--ink)",
            }}
          >
            Best Niacinamide Serums in India
          </h2>

          <p style={{ marginBottom: "1.5rem" }}>
            These are the most recommended options in the Indian market based on
            formulation quality, ingredient concentration, and consistent user
            feedback. All verified and available on Amazon India.
          </p>

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            Best Overall — Minimalist 10% Niacinamide + Zinc
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            Minimalist built its reputation on transparent ingredient labelling and
            clinical concentrations at accessible prices. Their 10% niacinamide with
            zinc PCA is their most popular product — clean formulation, effective
            concentration, and an accessible price. Best for oily,
            acne-prone skin dealing with open pores and post-acne marks.
          </p>
          <BlogProductCard asin="B08F9MF314" />

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            Best for Beginners — Minimalist 5% Niacinamide + Hyaluronic Acid
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            Same brand, lower concentration. If your skin reacts easily or you're
            completely new to actives, 5% gives you all the benefits with much less
            risk. The added hyaluronic acid makes it comfortable for dry-combination
            skin types.
          </p>
          <BlogProductCard asin="B08KSGZ261" />

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            Trusted Indian Brand — Plum 10% Niacinamide with Rice Water
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            Plum has been a reliable name in Indian skincare for years. Their
            niacinamide serum is vegan, paraben-free, and has a slightly more elegant
            texture than Minimalist — which some people prefer under makeup or
            foundation. Good if you want a brand with a longer track record.
          </p>
          <BlogProductCard asin="B097R8B7J7" />

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            Widely Available — Mamaearth Niacinamide Face Serum
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            Mamaearth is the most widely distributed skincare brand in India —
            available in pharmacies, supermarkets, and online. A solid entry-level
            option, good for someone who prefers a familiar brand and wants something
            gentle and easy to find anywhere in India.
          </p>
          <BlogProductCard asin="B0848GX3P6" />
        </section>

        {/* ── WARNINGS & COMMON MISTAKES ── */}
        <section style={{ marginTop: "3rem" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1.5rem",
              borderTop: "2px solid var(--rule)",
              paddingTop: "2.5rem",
            }}
          >
            Side Effects and Common Mistakes
          </h2>

          <div
            style={{
              background: "#fff5f5",
              border: "1px solid #f5c0bc",
              borderLeft: "4px solid var(--rose)",
              padding: "1.5rem",
              borderRadius: "4px",
            }}
          >
            <p style={{ fontSize: "0.9rem", color: "var(--ink)", margin: "0 0 1rem" }}>
              <strong>🔴 Flushing:</strong> A small percentage of people experience temporary redness after applying niacinamide. More common with 10%+. Start with 5% if unsure.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink)", margin: "0 0 1rem" }}>
              <strong>🔴 Overuse:</strong> Using niacinamide twice daily is fine. Using three products containing it simultaneously is not. Check your moisturiser and sunscreen — many now contain niacinamide already.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink)", margin: "0 0 1rem" }}>
              <strong>🔴 Expecting overnight results:</strong> Pigmentation takes 8–12 weeks to show visible improvement. Oil control typically shows in 2–4 weeks. Patience is required.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink)", margin: 0 }}>
              <strong>🔴 Skipping SPF:</strong> If you're treating pigmentation and not wearing sunscreen, you're wasting your time. UV creates new marks faster than niacinamide can fade existing ones.
            </p>
          </div>
        </section>

        {/* ── FAQ SECTION ── */}
        <section style={{ marginTop: "3rem" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1.5rem",
              borderTop: "2px solid var(--rule)",
              paddingTop: "2.5rem",
            }}
          >
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "Is niacinamide good for Indian skin?",
              a: "Yes — particularly well-suited. The most common Indian skin concerns (oiliness in humid weather, post-acne pigmentation, uneven tone from sun exposure) are precisely what niacinamide is clinically proven to address.",
            },
            {
              q: "Can I use niacinamide every day?",
              a: "Yes. Niacinamide is stable, gentle, and designed for daily use. Morning and night is fine. The only caution is not stacking multiple high-concentration products simultaneously.",
            },
            {
              q: "Which is better — 5% or 10% niacinamide?",
              a: "5% for sensitive skin, beginners, or dry-combination types. 10% for oily skin, significant pigmentation, or open pores. Both work — 10% works faster but has a slightly higher chance of irritation for reactive skin.",
            },
            {
              q: "How long does niacinamide take to show results?",
              a: "Oil control: 2–4 weeks. Pore appearance: 4–6 weeks. Pigmentation and dark spots: 8–12 weeks of consistent daily use. Take a photo when you start so you have something to compare after 3 months.",
            },
            {
              q: "Can niacinamide be used with Vitamin C?",
              a: "Yes. The old advice against this combination is outdated. You can use them together or at different times of day — Vitamin C morning, niacinamide night is a common approach.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                borderTop: "1px solid var(--rule)",
                padding: "1.2rem 0",
              }}
            >
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.05rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                  margin: "0 0 0.6rem",
                }}
              >
                {item.q}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
                {item.a}
              </p>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* ── FURTHER READING ── */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            Further Reading
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { href: "/blog/best-niacinamide-serums-india", label: "Best Niacinamide Serums in India (2026)" },
              { href: "/blog/skincare-routine-complete-india", label: "The Complete Skincare Routine for Indian Climate (2026)" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2,000" },
              { href: "/blog/salicylic-acid-guide-india", label: "Salicylic Acid for Indian Skin Guide" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.9rem",
                  color: "var(--rose)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--rule)",
                  paddingBottom: "0.6rem",
                }}
              >
                {link.label} →
              </a>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <BlogFooterTools />

        {/* ── DISCLAIMER ── */}
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--muted)",
            lineHeight: 1.6,
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--rule)",
          }}
        >
          Affiliate links disclosed. Mirha & Co. participates in the Amazon Associates
          Program. We earn a small commission on qualifying purchases at no additional
          cost to you. Product recommendations are based on ingredient quality and
          verified customer reviews — not commission rates.
        </p>
      </div>
    </main>
  );
}

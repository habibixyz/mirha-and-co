import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Salicylic Acid Guide for Indian Skin — Acne, Blackheads, Oily Skin (2026) | Mirha & Co.",
  description:
    "The complete salicylic acid guide for Indian skin. What concentration to use, how to layer it, what to avoid, and the best products available in India by budget.",
  openGraph: {
    title: "Salicylic Acid Guide for Indian Skin — Acne, Blackheads, Oily Skin",
    description:
      "Everything Indian skin needs to know about salicylic acid — concentrations, layering, product picks by budget, and what dermatologists actually recommend.",
  },
};

export default function SalicylicAcidPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>

      {/* ── BACK ── */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{
          fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase",
          color: "var(--muted)", textDecoration: "none", fontFamily: "var(--font-mono, monospace)",
        }}>← Back to Journal</Link>
      </div>

      {/* ── HERO ── */}
      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{
          fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase",
          color: "var(--rose)", marginBottom: "1rem", fontFamily: "var(--font-mono, monospace)",
        }}>Beauty · Skincare · Acne</p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400,
          lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem",
        }}>
          Salicylic Acid for Indian Skin
          <br />
          <em style={{ color: "var(--rose)", fontStyle: "italic" }}>
            Acne, Blackheads, Oily Skin — The Complete Guide
          </em>
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--muted)", lineHeight: 1.75, margin: "0 0 1.5rem" }}>
          Niacinamide gets all the attention. Salicylic acid does the actual work when
          it comes to active acne, blackheads, and chronically congested pores. Here is
          everything Indian skin needs to know — concentrations, layering, timing, and
          the products worth buying.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "var(--font-mono, monospace)" }}>
          <span>April 2026</span><span>·</span><span>12 min read</span><span>·</span><span>Research-based</span>
        </div>
      </header>

      {/* ── BODY ── */}
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* WHAT IS IT */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            What Salicylic Acid Actually Is
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Salicylic acid is a beta-hydroxy acid — a BHA. Unlike alpha-hydroxy acids
            (glycolic, lactic), which are water-soluble and work on the skin's surface,
            salicylic acid is <strong style={{ color: "var(--ink)" }}>oil-soluble</strong>.
            It penetrates the lipid-rich environment inside pores rather than staying on top of
            skin. This is what makes it uniquely effective for oily, acne-prone, and
            blackhead-prone Indian skin.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            It works through four mechanisms simultaneously: it dissolves the intercellular
            cement that holds dead skin cells together inside pores (comedolytic action),
            it exfoliates the follicular wall to prevent new blockages (keratolytic effect),
            it reduces inflammation around active breakouts, and it has mild antimicrobial
            activity against <em>Cutibacterium acnes</em> — the bacteria responsible for
            inflammatory acne.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            A 2025 prospective clinical trial published in the <em>Journal of Cosmetic
            Dermatology</em> demonstrated that a salicylic acid gel applied twice daily
            for 21 days reduced sebum levels by 23.65% and increased skin hydration by
            40.5% — challenging the assumption that BHAs only strip and dry. The skin
            barrier improved alongside the exfoliation.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* WHY INDIAN SKIN */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Why Indian Skin Benefits Specifically
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Three factors make salicylic acid particularly relevant for India.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>Sebum production.</strong> Indian skin
            — particularly in oily and combination types — tends to produce higher volumes of
            sebum, especially in tropical and humid climates. High sebum output combined with
            pollution particulates creates ideal conditions for pore congestion and acne.
            Salicylic acid is the only OTC exfoliant that can physically penetrate and clear
            the oil inside a pore.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>Post-inflammatory hyperpigmentation (PIH).</strong>{" "}
            Indian skin has higher melanin density, which means any inflammation — including
            acne — is more likely to leave a dark mark. Salicylic acid's anti-inflammatory
            action reduces the severity of the initial breakout, which directly reduces the
            likelihood of the dark mark that follows. It also mildly exfoliates the surface
            pigment once the spot is healing.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--ink)" }}>Hard water and pollution.</strong> Most
            major Indian cities have hard water with high mineral content. This creates a
            residue on skin that mixes with sebum and pollution to accelerate pore blockage.
            Regular salicylic acid use prevents the buildup from becoming a recurring
            congestion problem.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* CONCENTRATIONS */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Which Concentration — 0.5%, 1%, or 2%?
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            The clinically active range for salicylic acid is 0.5% to 2%. Higher
            concentrations exist in professional peels (15–30%) but are not relevant for
            daily home use. Here is how to choose.
          </p>

          {[
            {
              pct: "0.5%",
              who: "Beginners, sensitive skin, daily cleansers",
              what: "Effective for mild congestion, blackheads, and as a preventive measure for oily skin. The right starting concentration if you have never used a BHA before. Well tolerated on combination and sensitive skin.",
              format: "Best used in a face wash or gentle toner — the brief contact time reduces irritation risk.",
            },
            {
              pct: "1%",
              who: "Oily, acne-prone, or combination skin with moderate blackheads",
              what: "The most versatile concentration. Effective for active breakouts, persistent blackheads, and pore congestion without the dryness risk of 2%. Ideal for daily or every-other-day use as a leave-on.",
              format: "Available in both rinse-off and leave-on formats. Leave-on gives more contact time and better results.",
            },
            {
              pct: "2%",
              who: "Established BHA users, oily skin with frequent breakouts or significant blackheads",
              what: "The most effective OTC concentration for clearing active acne and deep pore congestion. Use two to three times per week initially — not daily. Build frequency slowly over six to eight weeks.",
              format: "Leave-on serum or toner. Do not use alongside other exfoliants (AHAs, retinol) on the same night.",
            },
          ].map((item) => (
            <div key={item.pct} style={{
              border: "1px solid var(--rule)", borderRadius: 8, padding: "1.4rem 1.5rem", marginBottom: "1rem",
              background: "var(--sand)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.6rem" }}>
                <span style={{
                  fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", color: "var(--rose)",
                }}>{item.pct}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--ink)", fontWeight: 500 }}>{item.who}</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 0.5rem" }}>{item.what}</p>
              <p style={{ fontSize: "0.82rem", color: "var(--ink)", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                {item.format}
              </p>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* BEGINNER vs ADVANCED */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Beginner vs Advanced Usage
          </h2>

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.15rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.8rem" }}>
            If You Are New to Salicylic Acid
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Start with a 0.5–1% face wash used once daily in the evening. This gives your
            skin contact time with the acid without the sustained exposure of a leave-on
            product. Run this for four weeks before adding a leave-on.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            The face wash step: wet face, apply, leave for 30 to 60 seconds while you
            wash the rest of your face, then rinse. This is enough contact time to get
            meaningful exfoliation without the irritation of overnight contact.
          </p>

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.15rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.8rem" }}>
            If You Are Ready for a Leave-On
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Apply a 1–2% leave-on serum or toner after cleansing, before moisturiser.
            Start two to three nights per week. Do not use it on the same night as
            retinol. Do not use it the same night as an AHA. Give it eight weeks before
            evaluating results.
          </p>

          <p
            style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "var(--font-mono, monospace)" }}
          >
            Recommended — Face Wash with SA
          </p>
          <BlogProductCard asin="B09VLDY46B" />

          <p
            style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "var(--font-mono, monospace)" }}
          >
            For Leave-On Treatment — The Ordinary 2% SA
          </p>
          <BlogProductCard asin="B0C3PCJ6SD" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* WHAT TO PAIR */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            What to Pair — and What to Avoid
          </h2>

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.8rem" }}>
            Good Pairings
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>Niacinamide</strong> — the ideal
            partner. Niacinamide calms the inflammation that salicylic acid surfaces, reduces
            sebum alongside it, and fades the PIH marks that acne leaves behind. Use
            niacinamide in the morning, salicylic acid at night.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>Hyaluronic acid</strong> — applied
            after your salicylic acid leave-on to restore hydration. BHAs can be drying,
            particularly at 2%. Following with a hyaluronic acid serum and a lightweight
            moisturiser prevents the over-drying that causes many people to abandon BHAs
            prematurely.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            <strong style={{ color: "var(--ink)" }}>SPF 50+ every morning</strong> —
            non-negotiable. Salicylic acid increases photosensitivity. Unprotected UV
            exposure while using a BHA not only risks sunburn but actively creates new
            pigmentation that undermines the acne-fading work you are doing.
          </p>

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.8rem" }}>
            What to Avoid Combining
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>AHAs on the same night</strong> — using
            glycolic or lactic acid alongside salicylic acid on the same application
            dramatically increases the risk of barrier damage and irritation. Alternate:
            BHA one night, AHA the next if you use both.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>Retinol on the same night</strong> — both
            increase cell turnover and barrier stress. The 2024 AAD acne guidelines recommend
            combining topical therapies with different mechanisms of action but advise against
            layering multiple actives in a single application. Alternate nights.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--ink)" }}>Vitamin C in the same PM routine</strong> —
            pH incompatibility. Vitamin C (L-Ascorbic Acid) requires a low pH of 2.5–3.5 to
            remain stable. Salicylic acid at its active pH can destabilise Vitamin C. Use
            Vitamin C in the morning, salicylic acid at night.
          </p>

          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "var(--font-mono, monospace)" }}>
            Pair with this — Niacinamide for Morning
          </p>
          <BlogProductCard asin="B0DH88LZ11" />

          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "var(--font-mono, monospace)" }}>
            And this SPF — Non-Negotiable
          </p>
          <BlogProductCard asin="B0DHY6LQTW" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* PRODUCT PICKS BY BUDGET */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Product Picks by Budget
          </h2>

          {[
            { label: "Under ₹400 — Plum Green Tea Toner (Glycolic + BHA)", asin: "B00OCJ5M6C" },
            { label: "Under ₹600 — The Ordinary Salicylic Acid 2% Solution", asin: "B0C3PCJ6SD" },
            { label: "Face Wash — Minimalist 7% ALA + Glycolic (BHA + AHA Combo)", asin: "B09VLDY46B" },
          ].map((item) => (
            <div key={item.asin}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "var(--font-mono, monospace)" }}>
                {item.label}
              </p>
              <BlogProductCard asin={item.asin} />
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FAQ */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            Frequently Asked Questions
          </h2>
          {[
            {
              q: "Can I use salicylic acid every day?",
              a: "At 0.5–1% in a face wash, yes — daily use is well tolerated by most oily and combination skin types. At 2% leave-on, start two to three times per week and increase gradually. Daily 2% leave-on is appropriate once your skin has adjusted, typically after six to eight weeks.",
            },
            {
              q: "Is salicylic acid safe for Indian skin tones?",
              a: "Yes. Unlike physical exfoliants or harsh chemical peels, correctly-dosed salicylic acid does not cause hypopigmentation or post-inflammatory darkening when used appropriately. The anti-inflammatory action actually reduces PIH risk from acne. Always follow with SPF.",
            },
            {
              q: "Can I use salicylic acid and niacinamide together?",
              a: "Yes — this is one of the most effective combinations for oily acne-prone Indian skin. Use niacinamide in the morning after cleansing, salicylic acid at night. They address acne through different mechanisms and the combination is synergistic.",
            },
            {
              q: "How long before salicylic acid clears my blackheads?",
              a: "Blackheads are oxidised sebum plugs — they respond to BHAs over four to eight weeks of consistent use. You will notice texture improvement first, then visible blackhead reduction. The pore itself does not shrink permanently, but consistent BHA use prevents refilling.",
            },
            {
              q: "Can I use salicylic acid if I have dry skin?",
              a: "With caution. Dry skin can tolerate 0.5% in a rinse-off format. Leave-on BHAs at any concentration increase dryness and barrier stress on already-dry skin. Pair with a hyaluronic acid serum and a richer moisturiser, and start at maximum once or twice per week.",
            },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "1.2rem 0" }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.05rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>
                {item.q}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* INTERNAL LINKS */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Further Reading
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { href: "/blog/what-niacinamide-does-to-your-skin", label: "What Niacinamide Actually Does to Your Skin" },
              { href: "/blog/best-niacinamide-serums-india", label: "Best Niacinamide Serums in India (2026)" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
              { href: "/blog/best-sunscreens-india-2026", label: "Best Sunscreens in India (2026)" },
              { href: "/blog/beginner-retinol-guide-india", label: "Beginner Retinol Guide for Indian Skin" },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: "0.9rem", color: "var(--rose)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: "0.6rem" }}>
                {link.label} →
              </a>
            ))}
          </div>
        </section>

        {/* SOURCES */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>Sources</h2>
          {[
            { text: "Liu Y, et al. Clinical Efficacy of a Salicylic Acid–Containing Gel on Acne Management and Skin Barrier Function: A 21-Day Prospective Study. Journal of Cosmetic Dermatology. 2025.", href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12274963/" },
            { text: "Zaenglein AL, et al. 2024 AAD Guidelines of Care for the Management of Acne Vulgaris. Journal of the American Academy of Dermatology. 2024.", href: "https://pubmed.ncbi.nlm.nih.gov/38300170/" },
            { text: "Pullar JM, et al. Clinical Evidence on the Efficacy and Safety of Optimized 1.5% Salicylic Acid Cream in Treatment of Facial Acne. PubMed. 2013.", href: "https://pubmed.ncbi.nlm.nih.gov/23331850/" },
          ].map((s, i) => (
            <p key={i} style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "0.6rem" }}>
              {i + 1}. {s.text}{" "}
              <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--rose)" }}>Link</a>
            </p>
          ))}
        </section>

        {/* CTA */}
        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.6rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>
            Build Your Acne Routine
          </h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
            Browse our full curated product list — filtered by skin concern, type, and budget.
          </p>
          <a href="/" style={{
            display: "inline-block", background: "#fff", color: "var(--ink)",
            fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4,
            fontFamily: "var(--font-mono, monospace)",
          }}>Browse All Products →</a>
        </section>

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
          Affiliate links disclosed. Mirha & Co. participates in the Amazon Associates Program.
          We earn a small commission on qualifying purchases at no additional cost to you.
        </p>
      </article>
    </main>
  );
}
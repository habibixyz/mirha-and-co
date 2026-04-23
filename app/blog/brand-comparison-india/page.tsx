'use client';

import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export default function BrandComparisonPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      {/* ── BACK ── */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
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
      </div>

      {/* ── HERO ── */}
      <header
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "3rem 1.5rem 2.5rem",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--rose)",
            marginBottom: "1rem",
            fontFamily: "var(--font-mono, monospace)",
          }}
        >
          Beauty · Skincare · Comparison
        </p>
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "var(--ink)",
            margin: "0 0 1.2rem",
          }}
        >
          Minimalist vs The Ordinary vs Dot & Key
          <br />
          <em style={{ color: "var(--rose)", fontStyle: "italic" }}>What Actually Works in India?</em>
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--muted)", lineHeight: 1.75, margin: "0 0 1.5rem" }}>
          Three brands. All affordable. All widely recommended. But they are not
          equal — and which one is right for you depends on your skin type,
          your city's climate, and what you are actually trying to treat.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontFamily: "var(--font-mono, monospace)",
          }}
        >
          <span>April 2026</span>
          <span>·</span>
          <span>11 min read</span>
          <span>·</span>
          <span>Brand comparison</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* CONTEXT */}
        <section style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            This is not a sponsored comparison. None of these brands have paid for
            placement. The analysis is based on formulation transparency, clinical evidence
            for key ingredients, user feedback across Indian platforms, and specific
            performance considerations for Indian climate conditions.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            We are comparing three things: niacinamide serums (the most purchased product
            from each brand in India), their Vitamin C offerings, and their sunscreens
            where available.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* BRAND OVERVIEWS */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1.5rem",
            }}
          >
            The Brands at a Glance
          </h2>

          {/* Minimalist */}
          <div
            style={{
              border: "1px solid var(--rule)",
              borderRadius: "8px",
              padding: "1.5rem",
              marginBottom: "1rem",
              background: "var(--sand)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                Minimalist
              </h3>
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--rose)",
                  fontFamily: "var(--font-mono, monospace)",
                  background: "rgba(200,71,58,0.1)",
                  padding: "3px 8px",
                  borderRadius: "3px",
                }}
              >
                India-born
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 0.8rem" }}>
              Indian brand built on one principle: ingredient transparency. Every product
              lists the exact percentage of active ingredient on the bottle. No proprietary
              blend language. No hiding concentrations behind "complex" branding.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "var(--ink)" }}>Price range:</strong> ₹350–₹950.
              Available on Amazon India, Nykaa, and their own website.
            </p>
          </div>

          {/* The Ordinary */}
          <div
            style={{
              border: "1px solid var(--rule)",
              borderRadius: "8px",
              padding: "1.5rem",
              marginBottom: "1rem",
              background: "var(--sand)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                The Ordinary
              </h3>
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  fontFamily: "var(--font-mono, monospace)",
                  background: "rgba(0,0,0,0.06)",
                  padding: "3px 8px",
                  borderRadius: "3px",
                }}
              >
                Canadian
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 0.8rem" }}>
              The brand that started the ingredient-transparency movement globally.
              DECIEM's flagship skincare line. Strong clinical credibility, excellent
              ingredient quality. The India supply chain has historically been less
              consistent — verify authorised sellers carefully.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "var(--ink)" }}>Price range:</strong> ₹550–₹2,200 in India.
              Primarily available on Nykaa and Amazon India (check seller credentials).
            </p>
          </div>

          {/* Dot & Key */}
          <div
            style={{
              border: "1px solid var(--rule)",
              borderRadius: "8px",
              padding: "1.5rem",
              background: "var(--sand)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                Dot & Key
              </h3>
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--rose)",
                  fontFamily: "var(--font-mono, monospace)",
                  background: "rgba(200,71,58,0.1)",
                  padding: "3px 8px",
                  borderRadius: "3px",
                }}
              >
                India-born
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 0.8rem" }}>
              Indian brand with a more cosmetically elegant approach — better textures,
              more sensorial formulas, and aesthetically considered packaging. Less
              clinical in its positioning than Minimalist or The Ordinary, but
              consistently well-formulated for Indian skin and climate.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "var(--ink)" }}>Price range:</strong> ₹349–₹995.
              Available on Amazon India, Nykaa, and their own website.
            </p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* NIACINAMIDE COMPARISON */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            Niacinamide Serums — Head to Head
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Niacinamide is the most purchased serum category in India. All three brands
            offer it. Here is how they compare on what actually matters.
          </p>

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.1rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "1.5rem 0 0.8rem",
            }}
          >
            Verdict: Minimalist for Oily Skin. Dot & Key for Dry Skin.
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Minimalist and The Ordinary are formulation equals on niacinamide — same
            concentration, same zinc percentage, similar pH. The difference is texture.
            Minimalist's formula absorbs faster in Indian humidity, which matters when
            you are layering under a moisturiser and SPF before leaving the house.
          </p>

          <BlogProductCard asin="B0DH88LZ11" />
          <BlogProductCard asin="B01MDTVZTZ" />
          <BlogProductCard asin="B0FG2PQVK5" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* VITAMIN C */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            Vitamin C — Who Handles Indian Heat Best?
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            This is where Indian conditions create a meaningful product difference.
            L-Ascorbic Acid — the most potent Vitamin C form — degrades rapidly in heat.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            <strong style={{ color: "var(--ink)" }}>Minimalist</strong> uses a stable derivative. Less potent in clinical terms,
            but more practically effective in Indian conditions because it remains
            active for longer after opening.
          </p>

          <BlogProductCard asin="B095PRGHDX" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SUNSCREEN */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            Sunscreens — The Category That Matters Most
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Minimalist's SPF 50 with niacinamide is the most consistently recommended
            Indian-formulated sunscreen. For SPF, Minimalist is the clear winner
            among the three comparison brands.
          </p>
          <BlogProductCard asin="B0DHY6LQTW" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FINAL VERDICT */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1.5rem",
            }}
          >
            The Verdict by Skin Type
          </h2>

          {[
            {
              type: "Oily, Acne-Prone Skin",
              winner: "Minimalist",
              reason: "Best texture in humidity. Highest formulation transparency. Niacinamide + Zinc is clinically validated for sebum control.",
            },
            {
              type: "Dry or Dehydrated Skin",
              winner: "Dot & Key",
              reason: "The watermelon hyaluronic serum is formulated with texture in mind. More comfortable for dry skin.",
            },
            {
              type: "Combination Skin",
              winner: "Minimalist",
              reason: "Minimalist 10% niacinamide morning and evening addresses the full pathway at accessible cost.",
            },
            {
              type: "Sensitive or Reactive Skin",
              winner: "The Ordinary",
              reason: "Their lower-concentration options are gentler for reactive skin when stored properly.",
            },
          ].map((v, i) => (
            <div
              key={i}
              style={{
                border: "1px solid var(--rule)",
                borderRadius: "8px",
                padding: "1.3rem 1.5rem",
                marginBottom: "1rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  fontFamily: "var(--font-mono, monospace)",
                  margin: "0 0 0.4rem",
                }}
              >
                {v.type}
              </p>
              <p
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1rem",
                  color: "var(--rose)",
                  margin: "0 0 0.5rem",
                }}
              >
                {v.winner}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
                {v.reason}
              </p>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FAQ */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1.5rem",
            }}
          >
            Frequently Asked Questions
          </h2>
          {[
            {
              q: "Is Minimalist better than The Ordinary?",
              a: "For Indian skin, Minimalist's texture performs better in humidity. The Ordinary's formulations are equal in quality but suit drier conditions.",
            },
            {
              q: "Can I use products from different brands together?",
              a: "Yes. Mixing Minimalist niacinamide with Plum Vitamin C and Deconstruct SPF is a rational routine based on what works for your skin.",
            },
            {
              q: "Which brand has the best sunscreen?",
              a: "Minimalist is the only one with a clinically tested SPF 50 PA++++ formula available in India at accessible price.",
            },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "1.2rem 0" }}>
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

        {/* INTERNAL LINKS */}
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
              { href: "/blog/skincare-routine-every-skin-type", label: "Complete Skincare Routine for Every Skin Type" },
              { href: "/blog/best-sunscreens-india-2026", label: "Best Sunscreens in India (2026)" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Skincare Routine Under ₹2000" },
              { href: "/blog/niacinamide-benefits", label: "What Niacinamide Actually Does" },
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

        {/* CTA */}
        <section
          style={{
            background: "var(--ink)",
            borderRadius: "12px",
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.6rem",
              fontWeight: 400,
              color: "#fff",
              margin: "0 0 0.8rem",
            }}
          >
            All Three Brands. All in One Place.
          </h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
            Browse the full curated selection with direct Amazon India affiliate links.
          </p>
          <a
            href="/"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "var(--ink)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.9rem 2rem",
              textDecoration: "none",
              borderRadius: "4px",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            Browse All Products →
          </a>
        </section>

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
          cost to you.
        </p>
      </article>
    </main>
  );
}

import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "The Complete Skincare Routine for Indian Climate (2026) | Mirha & Co.",
  description:
    "Indian summers, humidity, and monsoon require a specific skincare approach. A dermatologist-backed, simple 3-step routine designed specifically for Indian climate conditions.",
  openGraph: {
    title: "The Complete Skincare Routine for Indian Climate (2026)",
    description:
      "Indian summers, humidity, and monsoon require a specific skincare approach. A dermatologist-backed, simple 3-step routine designed specifically for Indian climate conditions.",
  },
};

export default function SkincareRoutineGuide() {
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
            BEAUTY
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
            The Complete Skincare Routine for Indian Climate (2026)
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
            <span>12 min read</span>
            <span>6 products picked</span>
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
            skincare routines are not one-size-fits-all. A routine that works in London or Seoul will fail miserably in Delhi's dry heat or Mumbai's extreme humidity.
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            The Indian climate presents unique challenges: high UV index throughout the year, intense humidity that triggers excess sebum, and seasonal shifts (monsoon breakouts are real).
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            You do not need a complicated 10-step routine. In fact, layering too many products in hot weather leads to clogged pores and breakouts. A simple, consistent 3-step foundation is all you need.
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
            The Core 3-Step Routine
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
            Step 1: Cleanse (Morning & Night)
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            In Indian cities, you have to deal with sweat, sebum, and heavy air pollution. A gentle face wash that cleanses without stripping your skin barrier is essential.
          </p>
          <BlogProductCard asin="B00V4R0ET0" />

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            Step 2: Hydrate & Treat (Night Only)
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            The secret: Use a lightweight hydrating serum at night instead of a heavy cream. Serums absorb into your skin, whereas thick creams can sit on top and clog pores. Niacinamide is the ultimate active for Indian skin because it controls sebum and fades dark acne marks.
          </p>
          <BlogProductCard asin="B0DH88LZ11" />

          <p style={{ marginBottom: "1.5rem" }}>
            Apply this serum to damp skin at night. The moisture locks in, and your skin stays hydrated without feeling greasy.
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
            Step 3: Protect (Morning Only)
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            Sunscreen is non-negotiable. The sun in India is intense, and even 30 minutes of unprotected exposure leads to long-term sun damage and pigmentation.
          </p>
          <BlogProductCard asin="B0B45RB1RV" />

          <div
            style={{
              background: "var(--sand)",
              borderLeft: "4px solid var(--rose)",
              padding: "1.5rem",
              margin: "2rem 0",
            }}
          >
            <strong>☀️ Critical:</strong> Use SPF 50 PA++++ (4 plus signs). Anything less won't give you enough protection in India's intense UV climate. Reapply every 2 hours if you are outdoors for long periods.
          </div>

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
            Add-Ons Based on Your Skin Type
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
            If You Have Acne or Oily Skin (Add 2-3x a week at Night)
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            A gentle exfoliating cleanser with Glycolic Acid or ALA will keep blackheads away and ensure your pores stay clear during humid months.
          </p>
          <BlogProductCard asin="B09VLDY46B" />

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              margin: "2rem 0 0.8rem",
              color: "var(--ink)",
            }}
          >
            If You Have Dry Skin (Add at Night)
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            If you have dry skin or sleep in an air-conditioned room, seal in your niacinamide serum with a rich, nourishing moisturizer.
          </p>
          <BlogProductCard asin="B099MJH88B" />
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
              q: "How does humidity affect skincare products?",
              a: "Humidity increases sweat and sebum production, which makes heavy creams sit on the skin and clog pores. Lightweight gel formulas, serums, and fluid sunscreens work much better in humid Indian climates.",
            },
            {
              q: "Can I skip moisturiser in the summer?",
              a: "If you have oily skin, your sunscreen might double as a light moisturiser in the daytime. However, dehydrated skin actually produces more oil to compensate, so a lightweight hydrating serum at night is still highly recommended.",
            },
            {
              q: "Why is niacinamide recommended for the Indian climate?",
              a: "Niacinamide is uniquely suited for the Indian climate because it controls sebum production (great for humidity) and inhibits melanosome transfer, which helps fade the stubborn hyperpigmentation caused by intense sun exposure.",
            },
            {
              q: "How do I deal with hard water skin irritation?",
              a: "Hard water leaves mineral deposits that dry out the skin and compromise the barrier. Use a gentle, pH-balanced cleanser and consider using filtered water for your final face rinse.",
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
              { href: "/blog/best-sunscreens-india-2026", label: "Best Sunscreens in India (2026) That Actually Work" },
              { href: "/blog/skincare-layering-order", label: "The Right Order to Apply Your Skincare" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2,000" },
              { href: "/blog/what-niacinamide-does-to-your-skin", label: "What Niacinamide Actually Does to Your Skin" },
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

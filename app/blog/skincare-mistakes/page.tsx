'use client';

import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export default function SkincaresMistakesPage() {
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
          Beauty · Skincare
        </p>
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "var(--ink)",
            margin: "0 0 1.2rem",
          }}
        >
          The ₹1000 Skincare Mistakes
          <br />
          <em style={{ color: "var(--rose)", fontStyle: "italic" }}>Costing You ₹10,000</em>
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--muted)",
            lineHeight: 1.75,
            margin: "0 0 1.5rem",
          }}
        >
          The Indian skincare market grew 14% last year. Skincare results did not grow
          at the same rate. The gap between spend and outcome is almost always habit,
          not product. Here is what is actually happening.
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
          <span>9 min read</span>
          <span>·</span>
          <span>Honest take</span>
        </div>
      </header>

      {/* ── BODY ── */}
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* INTRO */}
        <section style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            A ₹2,500 Vitamin C serum applied after a heavy night cream. A ₹1,800
            hyaluronic acid serum used on dry skin without anything to seal it in.
            A ₹1,200 retinol used every night by someone who just started actives
            and is wondering why their skin is peeling.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            None of these are product failures. They are application failures. And they
            are costing people significantly more than the products themselves — in wasted
            product, in skin damage that requires correction, and in the cost of
            replacement products bought because "that serum didn't work."
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* MISTAKE 1 */}
        <section style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--rose)",
              fontFamily: "var(--font-mono, monospace)",
              marginBottom: "0.5rem",
            }}
          >
            Mistake 01
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            Applying Hyaluronic Acid on Dry Skin
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Hyaluronic acid is a humectant — it draws moisture from the environment into
            the skin. In humid Indian climates like Mumbai and Chennai, this works as
            intended. In dry air — Delhi winters, heavily air-conditioned offices, flights
            — HA on dry skin draws moisture from the deeper skin layers instead of the
            environment, and deposits it on the surface where it evaporates. Your skin
            ends up drier than before.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            <strong style={{ color: "var(--ink)" }}>The fix:</strong> Apply hyaluronic acid serum on slightly damp skin — within
            30 seconds of washing your face — and immediately seal it with a moisturiser.
            The moisturiser traps the moisture that HA has drawn in. Without this step,
            the benefit is significantly reduced.
          </p>
          <BlogProductCard asin="B0FG2PQVK5" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* MISTAKE 2 */}
        <section style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--rose)",
              fontFamily: "var(--font-mono, monospace)",
              marginBottom: "0.5rem",
            }}
          >
            Mistake 02
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            Storing Vitamin C on the Bathroom Shelf
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            L-Ascorbic Acid — the most potent form of Vitamin C — oxidises on contact
            with light, heat, and air. In India's climate, a Vitamin C serum stored in a
            bathroom that reaches 35°C can become significantly degraded within four to
            six weeks of opening. When it turns orange or yellow and starts stinging more
            than usual, it has oxidised. You are applying a degraded product that provides
            less of the benefit and more of the irritation.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            <strong style={{ color: "var(--ink)" }}>The fix:</strong> Refrigerate your Vitamin C serum. Use it consistently
            and quickly — do not let a bottle sit for four months. Or choose a stable
            derivative: Ascorbyl Glucoside, Sodium Ascorbyl Phosphate, or
            Tetrahexyldecyl Ascorbate are significantly more heat-stable, though slightly
            less potent.
          </p>
          <BlogProductCard asin="B095PRGHDX" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* MISTAKE 3 */}
        <section style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--rose)",
              fontFamily: "var(--font-mono, monospace)",
              marginBottom: "0.5rem",
            }}
          >
            Mistake 03
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            Skipping SPF and Wondering Why Pigmentation is Not Fading
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Niacinamide fades dark spots in eight to twelve weeks. Vitamin C fades
            them in six to ten weeks. UV radiation creates new ones in minutes.
            If you are treating pigmentation without wearing sunscreen every morning,
            you are in a losing race.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            India's UV index peaks at 11 in summer — classified as Extreme. Even in
            winter, the UV index in southern and coastal cities rarely drops below 6.
            UVA — the wavelength that causes pigmentation — penetrates glass. If you
            work near a window, you are receiving active UVA exposure indoors without
            sunscreen.
          </p>
          <BlogProductCard asin="B0DHY6LQTW" />
          <BlogProductCard asin="B0CW1N7QRT" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* MISTAKE 4 */}
        <section style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--rose)",
              fontFamily: "var(--font-mono, monospace)",
              marginBottom: "0.5rem",
            }}
          >
            Mistake 04
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            Using Too Many Products at Once
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            A 10-step routine means that when something works, you do not know what it
            was. When something causes a reaction, you do not know what caused it. You
            cannot optimise something you cannot isolate.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            In Indian humidity, layering six to eight products also means most of them
            are sitting on top of each other rather than being absorbed. The skin has
            a finite capacity for product uptake in a given application window.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--ink)" }}>The fix:</strong> Four products. Cleanser, one active serum, moisturiser, SPF.
            Run this for eight weeks before adding anything else. You will know exactly
            what is working and have a stable baseline to build from.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* MISTAKE 5 */}
        <section style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--rose)",
              fontFamily: "var(--font-mono, monospace)",
              marginBottom: "0.5rem",
            }}
          >
            Mistake 05
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            Switching Products Before Giving Them Time to Work
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The clinical timelines for active skincare ingredients are measured in weeks
            and months, not days. Niacinamide for pigmentation: eight to twelve weeks.
            Retinol for texture: twelve to sixteen weeks. Vitamin C for brightening:
            six to ten weeks. These are not marketing estimates — they are the timelines
            used in the clinical trials that established the ingredients as effective.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            Switching serums at the three-week mark because "nothing is happening" is
            the most expensive skincare habit in India. You pay for a product, abandon
            it before it works, pay for a replacement, and repeat. The original product
            was almost certainly fine.
          </p>
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
              q: "How do I know if my skincare routine is actually working?",
              a: "Take a photo in natural light before you start and again at eight weeks. Skin changes are gradual — the difference day to day is invisible but the eight-week comparison is often significant. If there is no change after twelve weeks of consistent use, the product may genuinely not be right for your skin.",
            },
            {
              q: "Is Indian tap water really bad for skin?",
              a: "In most major Indian cities, yes. Delhi, Mumbai, Bengaluru, and Hyderabad all have high TDS (total dissolved solids) water. The mineral residue disrupts skin pH and blocks product absorption. A sulphate-free cleanser and a toner significantly mitigate the impact.",
            },
            {
              q: "What is the minimum effective routine for Indian skin?",
              a: "Cleanser, niacinamide serum, lightweight moisturiser, SPF 50+. Four products. This addresses oiliness, pigmentation, hydration, and sun damage — the four primary Indian skin concerns — without overcomplicating layering or spending beyond what is necessary.",
            },
            {
              q: "Can I use hyaluronic acid in summer?",
              a: "Yes — Indian summer humidity actually makes HA more effective, as there is abundant environmental moisture for it to draw from. Apply on damp skin and follow with a gel moisturiser. Skip heavy creams — a gel or water-gel moisturiser is sufficient in 75%+ humidity.",
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
              { href: "/blog/skincare-layering-order", label: "The Right Order to Apply Your Skincare" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
              { href: "/blog/best-sunscreens-india-2026", label: "Best Sunscreens in India (2026)" },
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
            Better Habits. Same Products.
          </h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
            The products on your shelf are probably fine. Fix how you use them first.
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
            Browse Curated Products →
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

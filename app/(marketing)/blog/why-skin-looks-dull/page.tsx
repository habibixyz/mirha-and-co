import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Your Skin Looks Dull Even After Skincare (India Edition) | Mirha & Co.",
  description:
    "Using products but still looking dull? Hard water, wrong layering, and skipping SPF are the real culprits. Here's the honest breakdown for Indian skin.",
  openGraph: {
    title: "Why Your Skin Looks Dull Even After Skincare (India Edition)",
    description:
      "Using products but still looking dull? Hard water, wrong layering, and skipping SPF are the real culprits.",
  },
};

export default function DullSkinPage() {
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
          Why Your Skin Looks Dull Even After Skincare
          <br />
          <em style={{ color: "var(--rose)", fontStyle: "italic" }}>India Edition</em>
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--muted)",
            lineHeight: 1.75,
            margin: "0 0 1.5rem",
            fontFamily: "var(--font-sans, sans-serif)",
          }}
        >
          You are cleansing twice a day, applying serum, moisturising. And yet — dull,
          uneven, tired-looking skin. The problem is almost never the products. It is
          almost always one of four things that nobody tells you about.
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
          <span>10 min read</span>
          <span>·</span>
          <span>Research-based</span>
        </div>
      </header>

      {/* ── BODY ── */}
      <article
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "3rem 1.5rem 5rem",
        }}
      >

        {/* ── SECTION 1: THE REAL PROBLEM ── */}
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
            The Problem Is Not Your Products
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Most people who struggle with persistent dullness are not using the wrong products.
            They are using the right products incorrectly — or they are doing something
            upstream that cancels out everything they apply.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            In India specifically, there are four root causes that account for the majority
            of skincare failures: <strong style={{ color: "var(--ink)" }}>hard water, wrong layering order, skipping SPF, and over-exfoliation.</strong> Fix
            any one of them and you will see more improvement than switching to a more
            expensive serum.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            Fix all four and your existing routine — whatever it is — will perform
            significantly better.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* ── SECTION 2: HARD WATER ── */}
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
            Cause 1 — Hard Water Is Ruining Your Cleanser
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Over 70% of Indian cities have hard water — water with high concentrations of
            calcium and magnesium minerals. When hard water mixes with your face wash, it
            forms a soap scum that does not rinse clean. This residue sits on your skin,
            blocks active ingredients from penetrating, and disrupts the pH of your skin
            barrier.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The visible result: persistent dullness that does not respond to brightening
            serums, because the serums cannot get through the film.
          </p>

          <div
            style={{
              background: "var(--sand)",
              border: "1px solid var(--rule)",
              borderRadius: "8px",
              padding: "1.2rem 1.4rem",
              margin: "1.5rem 0",
            }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--rose)",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              The Fix
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.7, margin: 0 }}>
              Switch to a sulphate-free, low-pH cleanser that does not interact with mineral
              ions. Micellar water as a first cleanse before your face wash significantly
              reduces hard water residue. Finish with a toner to restore skin pH.
            </p>
          </div>

          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              margin: "1.5rem 0 0.8rem",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            Recommended Cleanser
          </p>
          <BlogProductCard asin="B01CCGW4OE" />
        </section>
        {/* ── INTERNAL LINKS ── */}
<section style={{
  margin: "3rem 0",
  padding: "1.5rem",
  background: "var(--sand)",
  border: "1px solid var(--rule)",
  borderRadius: "8px"
}}>
  <p style={{
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--rose)",
    marginBottom: "0.8rem"
  }}>
    Continue Reading
  </p>

  <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.8 }}>
    <li><Link href="/blog/skincare-routine-every-skin-type">Complete Skincare Routine →</Link></li>
    <li><Link href="/blog/serums-essences-moisturizers-guide">Serums vs Essences →</Link></li>
    <li><Link href="/blog/best-sunscreen-india-spf50">Why SPF 50 Matters →</Link></li>
  </ul>
</section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* ── SECTION 3: LAYERING ── */}
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
            Cause 2 — Wrong Layering Order
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Skincare is applied in order of molecular weight — thinnest to thickest.
            Water-based serums first, then gel moisturisers, then creams, then oils.
            Applying a heavy moisturiser before your Vitamin C serum means the serum
            cannot penetrate the skin. You are applying it on top of a layer of product
            and rinsing it off the next morning without it ever reaching the cells
            it was meant to treat.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            This is the most common reason brightening serums "do not work." They are
            working — but on top of your moisturiser, not on your skin.
          </p>

          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.2rem",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "0 0 0.8rem",
            }}
          >
            The Correct Order
          </h3>
          <ol
            style={{
              paddingLeft: "1.2rem",
              margin: "0 0 1.5rem",
              fontSize: "0.9rem",
              color: "var(--muted)",
              lineHeight: 2,
            }}
          >
            <li>Cleanser</li>
            <li>Toner (optional)</li>
            <li>Vitamin C serum <em>(thinnest active)</em></li>
            <li>Hyaluronic acid serum <em>(water-based hydration)</em></li>
            <li>Niacinamide serum <em>(if separate)</em></li>
            <li>Moisturiser</li>
            <li>SPF 50+ <em>(morning only, always last)</em></li>
          </ol>

          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              margin: "1.5rem 0 0.8rem",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            For Hydration — Apply Before Moisturiser
          </p>
          <BlogProductCard asin="B0FG2PQVK5" />

          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              margin: "1.5rem 0 0.8rem",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            For Brightening — Apply Before Moisturiser
          </p>
          <BlogProductCard asin="B095PRGHDX" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* ── SECTION 4: SPF ── */}
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
            Cause 3 — No SPF. The One That Cancels Everything Else.
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            UV radiation is the single largest contributor to dullness, uneven skin tone,
            and hyperpigmentation in Indian skin. India's UV index sits between 8 and 11
            — classified as Very High to Extreme — for most of the year across all major
            cities.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            If you are using a Vitamin C serum to fade pigmentation and not wearing
            sunscreen every morning, UV exposure is creating new pigmentation faster
            than the serum can fade the old. You are moving backwards.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            This is not hypothetical. A 2025 study in the Journal of Cosmetic Dermatology
            found that consistent SPF use reduced hyperpigmentation by measurable margins
            within 12 weeks — independent of any active treatment. SPF alone produces
            visible brightening over time. No serum does.
          </p>

          <div
            style={{
              background: "var(--sand)",
              border: "1px solid var(--rule)",
              borderRadius: "8px",
              padding: "1.2rem 1.4rem",
              margin: "1.5rem 0",
            }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--rose)",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              Non-Negotiable
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.7, margin: 0 }}>
              SPF 50 PA++++ every morning. Indoors and outdoors. UVA rays — responsible
              for pigmentation — penetrate glass. If you sit near a window, you are
              receiving UV exposure. Apply sunscreen as the final step of your morning
              routine, every day, without exception.
            </p>
          </div>

          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              margin: "1.5rem 0 0.8rem",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            For Oily Skin — No White Cast
          </p>
          <BlogProductCard asin="B0DHY6LQTW" />

          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              margin: "1.5rem 0 0.8rem",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            For Dry or Combination Skin
          </p>
          <BlogProductCard asin="B0C9JPWLR4" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* ── SECTION 5: OVER-EXFOLIATION ── */}
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
            Cause 4 — Over-Exfoliation Is Damaging Your Barrier
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Exfoliation removes dead skin cells and reveals the fresher skin underneath.
            Daily exfoliation removes so many layers that the skin barrier cannot regenerate.
            The result is not glowing skin — it is sensitised, reactive skin that looks
            red, feels tight, and becomes more prone to pigmentation because the barrier
            is compromised.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>In Indian humidity, the barrier is under additional stress</strong> from pollution,
            heat, and hard water. Over-exfoliating in this environment creates a cycle:
            damaged barrier triggers more oil, more oil gets blamed on skin type,
            more exfoliation is used to strip it, barrier gets worse.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            The correct frequency: AHAs (glycolic, lactic) two to three times per week
            maximum. BHAs (salicylic) two to three times per week. Never both on the same
            night. Always follow with a barrier-supporting moisturiser.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* ── CTA BLOCK ── */}
<section style={{
  margin: "3rem 0",
  padding: "2rem",
  border: "2px solid var(--black)",
  textAlign: "center",
  background: "linear-gradient(135deg, #f5f1ed 0%, rgba(200, 71, 58, 0.05) 100%)"
}}>
  <h3 style={{
    fontFamily: "'DM Serif Display', serif",
    fontSize: "1.5rem",
    marginBottom: "0.8rem"
  }}>
    Build Your Routine the Right Way
  </h3>

  <p style={{
    fontSize: "0.95rem",
    color: "var(--muted)",
    marginBottom: "1.5rem"
  }}>
    Stop guessing. Use products that actually work for Indian skin.
  </p>

  <Link href="/blog/skincare-routine-every-skin-type"
    style={{
      display: "inline-block",
      background: "var(--black)",
      color: "white",
      padding: "0.8rem 1.6rem",
      textDecoration: "none",
      fontSize: "0.7rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase"
    }}
  >
    View Full Routine →
  </Link>
</section>

        {/* ── FAQ ── */}
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
              q: "Why does my skin look dull even after using Vitamin C?",
              a: "Almost always one of two reasons: the Vitamin C serum is oxidised (Indian heat degrades L-Ascorbic Acid quickly — store it in the refrigerator), or you are not wearing SPF after applying it. UV exposure undoes brightening gains faster than any serum can reverse.",
            },
            {
              q: "Can hard water actually affect skincare results?",
              a: "Yes. Hard water leaves a mineral film on skin that blocks active ingredient absorption. If you live in Delhi, Mumbai, Bengaluru, or Hyderabad — all hard water cities — this is likely contributing to your dullness. A sulphate-free cleanser and pH-balancing toner help significantly.",
            },
            {
              q: "How long does it take to see results once I fix these issues?",
              a: "SPF results show within four to six weeks of consistent daily use. Correcting layering order shows improvement in two to three weeks. Barrier repair from over-exfoliation takes four to eight weeks depending on how compromised it is.",
            },
            {
              q: "Is it okay to use Vitamin C and SPF together?",
              a: "Not only okay — recommended. Vitamin C enhances the antioxidant protection of sunscreen. Apply Vitamin C serum first, let it absorb for two to three minutes, then apply SPF. This is the most effective morning routine for pigmentation and dullness in Indian conditions.",
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

        {/* ── INTERNAL LINKS ── */}
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
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
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
            Fix the Fundamentals First
          </h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
            Correct layering, SPF every morning, and a gentler cleanser will do more for
            your skin in 30 days than any new serum purchase.
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
        {/* ── FAQ ── */}
<section style={{ marginTop: "3rem" }}>
  <h2 style={{
    fontFamily: "'DM Serif Display', serif",
    fontSize: "1.6rem",
    marginBottom: "1rem"
  }}>
    Frequently Asked Questions
  </h2>

  <div style={{ lineHeight: 1.8, color: "var(--muted)" }}>
    <p><strong>Why does my skin look dull even after skincare?</strong><br />
    Usually due to hard water, incorrect layering, lack of SPF, or over-exfoliation.</p>

    <p><strong>How long does it take to fix dull skin?</strong><br />
    With the right routine, results appear in 3–6 weeks.</p>

    <p><strong>Is Vitamin C enough?</strong><br />
    No. Without sunscreen, results will not last.</p>
  </div>
</section>
      </article>
    </main>
  );
}
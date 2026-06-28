import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "Glass Skin on a Student Budget: The K-Beauty Routine Under ₹3,000 | Mirha & Co.",
  description:
    "Glass skin doesn't have to mean a 12-step routine that costs more than your rent. Here's a real K-beauty routine under ₹3,000 that actually works.",
  openGraph: {
    title: "Glass Skin on a Student Budget: The K-Beauty Routine Under ₹3,000",
    description:
      "A complete, dermatologist-friendly Korean skincare routine built with high-quality budget products for Indian skin.",
  },
};

export default function GlassSkinStudentBudgetPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link
          href="/blog"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
            textDecoration: "none",
            fontFamily: "monospace",
          }}
        >
          ← Back to Journal
        </Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>
          Skincare · Budget Beauty · K-Beauty
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          Glass Skin on a Student Budget:
          <br />
          <em style={{ color: "var(--rose)", fontStyle: "italic" }}>The K-Beauty Routine That Doesn't Need a Part-Time Job</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          Let's be honest about what happened. You watched one (1) K-drama, saw one (1) actor with skin that looks like it's never experienced stress, and now you have 14 tabs open trying to figure out what an "ampoule" is and whether you need one. Glass skin doesn't have to mean a 12-step routine that costs more than your rent. Here is a real K-beauty routine under ₹3,000 that actually works.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>June 2026</span><span>·</span><span>7 min read</span><span>·</span><span>Budget Skincare</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* SECTION 1: THE MYTH OF THE 10-STEP ROUTINE */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Myth of the 10-Step Korean Routine
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The beauty industry wants you to believe that achieving clear, luminous skin requires ten different products applied twice a day. They call it the traditional Korean skin routine. But here's the truth: Korean skincare is a philosophy, not a count of bottles. It is about layering lightweight hydration and focusing on barrier health rather than stripping your skin with harsh, high-percentage acids.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            If you are a student, you don't need a drawer full of ₹4,000 creams. You need a few core products with high-efficacy, gentle ingredients that stack together perfectly. By stripping out the redundancies (like separate essences and luxury emulsions), we can build an elite, dermatologist-approved K-Beauty stack for a fraction of the cost.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 2: THE BUDGET GLASS SKIN PROTOCOL */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Budget Glass Skin Protocol
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Here is the step-by-step routine using affordable K-Beauty formulations that provide premium results without breaking the bank.
          </p>

          {/* STEP 1: GENTLE CLEANSING */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>
              Step 1: The Non-Stripping Wash
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Glass skin starts with a clean slate. However, if your cleanser leaves your face feeling tight, squeaky-clean, or dry, it has stripped your natural lipids and damaged your barrier. Look for a pH-balanced, soothing cleanser. The SKIN1004 Madagascar Centella Ampoule Foam is infused with 33% Centella Asiatica extract to soothe while lifting sebum and dirt.
            </p>
            <BlogProductCard asin="B09JBJDFHH" />
          </div>

          {/* STEP 2: HYDRATING TONER */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>
              Step 2: The Cult Milk Prep
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              A toner shouldn't feel like rubbing alcohol; it should prep the skin to drink up hydration. TIRTIR's legendary Milk Skin Toner has a rich milky consistency packed with 2% Niacinamide, rice bran, and ceramides. Buy the 50ml version to fit a student budget—it lasts a long time because you only need 3–4 drops patted into your skin.
            </p>
            <BlogProductCard asin="B0CHVHGTDJ" />
          </div>

          {/* STEP 3: HYDRATION AMPLE/SERUM */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>
              Step 3: The Deep-Hydration Glacier Punch
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Hyaluronic Acid is the king of water-binding molecules. The mixsoon Glacier Water Hyaluronic Acid Serum blends pure glacier water with multiple molecular weights of Hyaluronic Acid to hydrate both superficial and deep skin layers without a sticky residue.
            </p>
            <BlogProductCard asin="B09GP7K353" />
          </div>

          {/* STEP 4: BARRIER REPAIR & SOOTHING */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>
              Step 4: The 100% Cica Barrier Shield
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              If your skin suffers from redness, acne flare-ups, or dullness, Centella Asiatica is your best friend. The SKIN1004 Madagascar Centella Ampoule is a single-ingredient powerhouse containing 100% pure Centella extract to soothe inflammation and restore the barrier.
            </p>
            <BlogProductCard asin="B06Y15D1LH" />
          </div>

          {/* STEP 5: SUNSCREEN */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>
              Step 5: The Weightless Water Sunscreen
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Never skip sunscreen, especially when trying to maintain even skin tone and glow. The SKIN1004 Hyalu-Cica Water-Fit Sun Serum behaves like a lightweight moisturizing serum rather than a thick sunblock. It leaves zero white cast, absorbs in seconds, and provides SPF 50+ PA++++ chemical UV filters.
            </p>
            <BlogProductCard asin="B0B3G73VF5" />
          </div>

          {/* STEP 6: WEEKLY SHEET MASK */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>
              Step 6: The Sunday Barrier Boost
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Treat your skin on the weekends. The mixsoon Bifida Sheet Mask uses fermented Bifida Lysate and ceramides to repair micro-tears in the skin barrier, boosting natural elasticity and leaving a premium glass-like glow.
            </p>
            <BlogProductCard asin="B09GXFVMCM" />
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 3: THE COST COMPARISON */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            How to Make it Even Cheaper: Tips & Hacks
          </h2>
          <ul style={{ paddingLeft: "1.2rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li style={{ marginBottom: "0.6rem" }}>
              <strong>Pat, don't use cotton pads:</strong> Cotton pads absorb and waste half of your toners and essences. Pour 3 drops directly onto your palms and press them into your face.
            </li>
            <li style={{ marginBottom: "0.6rem" }}>
              <strong>Damp Skin Application:</strong> Hyaluronic acid works by grabbing moisture. Apply your mixsoon Glacier Water Serum to damp skin (right after rinsing or toning) to lock in the water.
            </li>
            <li style={{ marginBottom: "0.6rem" }}>
              <strong>Multi-tasking:</strong> Your TIRTIR Milk Skin Toner is so rich it can replace your morning moisturizer completely during hot, humid Indian weather.
            </li>
          </ul>
        </section>

        <BlogFooterTools />
      </article>
    </main>
  );
}

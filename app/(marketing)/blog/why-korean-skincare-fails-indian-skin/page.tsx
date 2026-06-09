import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Korean Skincare Fails for Some Indian Skin Types | Mirha & Co.",
  description:
    "The 10-step glass skin routine was designed for Seoul winters, not Mumbai summers. Here is a science-backed look at Indian vs Korean skincare, and why K-beauty might be breaking you out.",
  openGraph: {
    title: "Why Korean Skincare Fails for Some Indian Skin Types",
    description:
      "A deep dive into why layering 7 toners and heavy snail mucin in 80% humidity causes closed comedones—and how to actually adapt Korean skincare for oily skin in India.",
  },
};

export default function KoreanSkincareIndiaPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>
          ← Back to Journal
        </Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>
          Beauty · K-Beauty · Climate Science
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          Why Your Korean Skincare Routine Is Breaking You Out in India
          <br /><em style={{ color: "var(--rose)", fontStyle: "italic" }}>The Climate Mismatch Between Seoul and Mumbai</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          You bought the viral snail mucin. You started the 10-step routine. You layered the essences. But instead of the promised "glass skin", you got a shiny, suffocated face and tiny flesh-coloured bumps on your forehead. When examining Korean skincare in India, the problem is rarely the formulation—it is the geography.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>June 2026</span><span>·</span><span>8 min read</span><span>·</span><span>Routine Guide</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* SECTION 1: THE CLIMATE MISMATCH */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Climate Mismatch: Seoul Winters vs. Indian Summers
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The foundation of the Korean "glass skin" routine was built for a specific environment. South Korea experiences long, harsh, dry winters where temperatures plunge below freezing. In that climate, the skin barrier is constantly stripped of moisture. 
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            To survive that environment, K-beauty relies heavily on the <strong>layering technique</strong>: multiple thin layers of hydration (essences, ampoules, thick toners) sealed with an occlusive barrier cream. In a dry, freezing climate, this is a brilliant mechanism to prevent Transepidermal Water Loss (TEWL).
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Now, transport that exact routine to Mumbai, Chennai, or Delhi during the monsoon. The temperature is 35°C and the humidity is 80%. Your skin is already producing excess sebum due to the heat. When you apply 5-7 layers of hydrating products and seal it with a cream, you are essentially wrapping your skin in cling film. The sweat and sebum have nowhere to go. The result? <strong>Closed comedones</strong> (small, clogged pores) and fungal acne triggers.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 2: INDIAN VS KOREAN SKINCARE GOALS */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Indian vs Korean Skincare: Different Genetic Baselines
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Beyond climate, Indian and East Asian skin have different structural characteristics and primary concerns.
          </p>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { type: "Korean Skincare Focus", works: "Hydration, soothing (Centella), barrier repair, and gentle brightening. Formulations often avoid strong active acids (AHAs/BHAs are strictly regulated in Korea) in favour of slow, gentle botanical extracts." },
              { type: "Indian Skin Needs", works: "Sebum regulation, hyperpigmentation treatment (melasma, dark spots), and active acne control. Indian skin (Fitzpatrick type III-V) produces more melanin and requires stronger actives like Salicylic Acid or higher-percentage Niacinamide to clear congestion." },
            ].map((item) => (
              <div key={item.type} style={{ border: "1px solid var(--rule)", borderRadius: 8, padding: "1.2rem", background: "var(--sand)" }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.5rem", fontFamily: "monospace" }}>{item.type}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{item.works}</p>
              </div>
            ))}
          </div>
          
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Because Korean regulations cap salicylic acid at 0.5% in OTC products, relying solely on a K-beauty routine for active Indian acne or severe hyperpigmentation often leads to frustration. The products are simply too gentle to push through the thicker sebum profile of Indian skin in summer.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 3: HOW TO ADAPT FOR OILY SKIN */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            How to Adapt Korean Skincare for Oily Skin in India
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            You do not need to abandon K-beauty. You just need to stop importing their winter habits into our tropical climate. Here is the framework for making Korean skincare work in India:
          </p>
          
          {[
            { rule: "1. Stop the 7-Skin Method", desc: "Layering toner 7 times is a recipe for congestion in humidity. Use one layer of a watery (not viscous) toner. Look for Green Tea or Mugwort rather than thick Hyaluronic Acid toners." },
            { rule: "2. The Snail Mucin Caveat", desc: "Snail mucin is a fantastic humectant, but it can feel incredibly sticky in monsoon. If you use it, apply it strictly at night, on damp skin, and skip the heavy moisturiser afterward. Let the mucin be your hydration layer." },
            { rule: "3. Steal Their Sunscreens, Skip Their Creams", desc: "Korean chemical sunscreens are cosmetically elegant, lightweight, and perfect for Indian skin because they leave zero white cast. However, their barrier creams (containing heavy ceramides and shea butter) are often too occlusive for our weather. Stick to their SPF." },
          ].map((item, i) => (
             <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "1rem 0" }}>
               <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.4rem" }}>{item.rule}</p>
               <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
             </div>
          ))}
          
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 4: K-BEAUTY PRODUCTS THAT ACTUALLY WORK IN INDIA */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Best K-Beauty Products for the Indian Climate
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            When shopping for Korean skincare in India, filter for watery textures, green tea, centella asiatica (cica), and lightweight gel sunscreens.
          </p>

          <div style={{ marginBottom: "2rem" }}>
             <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>The Watery Toner (Oily Skin Savior)</h3>
             <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Instead of thick, sticky essences, opt for Isntree's Green Tea Fresh Toner. Green tea is naturally astringent and helps control sebum production throughout the sweaty Indian day without stripping the skin.</p>
             {/* Using generic ASIN from previous templates as placeholder for Isntree Green Tea Toner */}
             <BlogProductCard asin="B0D44T7RW9" /> 
          </div>

          <div style={{ marginBottom: "2rem" }}>
             <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>The Perfect Sunscreen for Brown Skin</h3>
             <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Korean sunscreens excel at chemical filters that leave zero white cast on melanin-rich skin. The Beauty of Joseon Relief Sun is an elite choice for our UV index.</p>
             <BlogProductCard asin="B09JVNZVH3" />
          </div>
          
          <div style={{ marginBottom: "2rem" }}>
             <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>The Soothing Barrier Repair</h3>
             <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>If your skin is irritated by pollution or sun exposure, the SeoulCeuticals Snail Mucin Serum combines 97.5% mucin with Centella Asiatica for hot weather soothing without the heavy cream feel.</p>
             <BlogProductCard asin="B08XV3KZ84" />
          </div>

        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>Stop Guessing Your Routine</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>Curious if your Korean skincare is actually suited for your Indian skin type? Use our AI Skin Analysis tool to scan your skin and get science-backed routine mapping instantly.</p>
          <a href="/dashboard/analysis" style={{ display: "inline-block", background: "#fff", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "monospace" }}>Launch AI Scanner →</a>
        </section>

      </article>
    </main>
  );
}

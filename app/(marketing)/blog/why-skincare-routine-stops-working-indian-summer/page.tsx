import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "Why Your Skincare Routine Stops Working in Indian Summer | Mirha & Co.",
  description:
    "Your routine did not change. Your environment did. A science-backed breakdown of why products behave differently in India's heat and humidity — and exactly what to switch.",
  openGraph: {
    title: "Why Your Skincare Routine Stops Working in Indian Summer",
    description:
      "It is not the products. It is the 40°C heat, 80% humidity, and UV index of 11. Here is what actually happens to your skincare in Indian summer — and how to fix it.",
  },
};

export default function SummerSkincareFailPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>
          ← Back to Journal
        </Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>
          Beauty · Summer Skincare · Indian Climate
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          Why Your Skincare Routine Stops Working in Indian Summer
          <br /><em style={{ color: "var(--rose)", fontStyle: "italic" }}>And What to Actually Do About It</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          March arrives and suddenly your reliable Vitamin C serum is stinging. Your moisturiser is sitting on top of your face instead of absorbing. Your sunscreen is gone by 10am. Your skin is simultaneously oilier and more dehydrated than it has ever been. The products did not change. India did.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>May 2026</span><span>·</span><span>11 min read</span><span>·</span><span>Seasonal guide</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* SECTION 1: WHY PRODUCTS BEHAVE DIFFERENTLY */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Why Products Behave Differently in Heat and Humidity
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            India's summer is not just warm weather. In May and June, Delhi reaches 45°C. Mumbai and Chennai sit at 38°C with humidity above 70%. The UV index across most of the country peaks between 9 and 11 — classified as Extreme, meaning unprotected skin can start showing UV damage in 15 minutes of midday exposure.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            This environment changes skincare chemistry in ways that most product advice — written for European or North American climates — completely ignores.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>Vitamin C (L-Ascorbic Acid) degrades in heat.</strong> This is not a theory — it is photochemistry. L-Ascorbic Acid is inherently unstable and oxidises on contact with heat, light, and air. A Vitamin C serum stored on a bathroom shelf in Delhi in May loses meaningful potency within four to six weeks of opening. By the time you apply it to your face, you may be applying a fraction of the stated concentration — plus oxidation byproducts that can irritate already heat-stressed skin.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>Humidity changes how humectants behave.</strong> Hyaluronic acid works by drawing moisture from the environment into the skin. In coastal cities like Mumbai and Chennai, where ambient humidity is 70–80%, this mechanism is highly effective. But here is what nobody tells you: in air-conditioned offices and homes (where most people spend their day), the indoor humidity drops to 30–40%. The humectant in your serum then draws moisture from deeper skin layers to the surface — where it evaporates. You end up more dehydrated than when you started.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--ink)" }}>High temperatures increase skin permeability.</strong> Heat causes vasodilation and increases transepidermal water loss (TEWL). Your skin becomes more permeable in summer — which means actives penetrate faster and deeper than in cooler months. At the same concentration, a 2% BHA in June is more aggressive on the skin barrier than the same product in November. This is why over-exfoliation becomes a serious issue in Indian summers even for people who used the same products all winter without issue.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 2: TOO MANY ACTIVES */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The "Too Many Actives" Mistake in Indian Summer
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The most common cause of summer skincare breakdown is not a bad product. It is the same routine used in a significantly more demanding climate. Retinol, AHAs, BHAs, and Vitamin C all increase skin sensitivity — and in summer, that baseline sensitivity is already elevated from heat, UV exposure, and barrier stress.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The result: sudden stinging from products that never stung. Redness that was not there in January. Breakouts in areas where you do not usually break out. This is not purging — it is barrier damage from actives that are penetrating too deeply into already-stressed skin.
          </p>
          <div style={{ background: "var(--sand)", border: "1px solid var(--rule)", borderRadius: 8, padding: "1.3rem 1.5rem", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>What to reduce in Indian summer</p>
            {[
              { item: "Strong AHAs (glycolic acid at 8%+)", action: "Reduce to once a week maximum. Switch to lactic acid (gentler) if needed." },
              { item: "Retinol", action: "Drop to twice per week. Never skip SPF the next morning. Consider pausing entirely in peak summer if skin is reactive." },
              { item: "L-Ascorbic Acid Vitamin C above 15%", action: "Switch to a stable derivative (Sodium Ascorbyl Phosphate, Ethyl Ascorbic Acid) or refrigerate and use within 4 weeks." },
              { item: "Physical scrubs", action: "Eliminate entirely in summer. Heat-stressed skin does not need the mechanical insult." },
            ].map((i, idx) => (
              <div key={idx} style={{ display: "flex", gap: "0.8rem", marginBottom: "0.8rem", paddingBottom: "0.8rem", borderBottom: idx < 3 ? "1px solid var(--rule)" : "none" }}>
                <span style={{ color: "var(--rose)", fontSize: "0.8rem", flexShrink: 0, fontFamily: "monospace", paddingTop: "0.1rem" }}>—</span>
                <div>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.2rem" }}>{i.item}</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{i.action}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 3: MOISTURISER IN SUMMER */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Why Moisturiser Still Matters in Summer (Maybe More Than Winter)
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The instinct in summer is to drop the moisturiser. You are already producing more oil. Your face feels suffocated. Adding more product sounds counterintuitive.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Here is what is actually happening: the combination of increased sweating, hard water contact, air conditioning, and elevated UV exposure means your TEWL (transepidermal water loss) is at its annual high. Your skin is losing moisture faster than in any other season. The sebum on the surface is not hydration — it is your skin's emergency response to a dehydrated barrier. Skipping moisturiser in response to the oiliness accelerates the dehydration, which accelerates the oil production.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            The solution is not less moisturiser. It is a <strong style={{ color: "var(--ink)" }}>different moisturiser</strong> — specifically a water-based gel formula that delivers hydration without the heavy emollients that feel suffocating in humidity.
          </p>

          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>Summer switch — oil-free water gel</p>
          <BlogProductCard asin="B00BQFTQW6" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 4: GEL VS CREAM */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Gel vs Cream — The Texture Decision That Changes Everything
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            In winter, a cream moisturiser forms a semi-occlusive layer that traps heat and moisture — useful when ambient temperature is pulling moisture from the skin surface. In Indian summer, that same occlusive layer traps sweat, bacteria, and sebum against the skin. Pores congest. Breakouts happen. The product that worked beautifully in December becomes actively problematic in May.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { type: "Gel / Water Gel", when: "Indian summer — primary choice", works: "Absorbs immediately. No occlusion. Delivers hydration without trapping heat. The only texture that makes sense for oily skin above 35°C." },
              { type: "Cream", when: "Winter / heavy AC / dry skin types", works: "Rich emollients and occlusives trap moisture effectively in dry, cool conditions. Wrong call for summer oily skin in India." },
            ].map((item) => (
              <div key={item.type} style={{ border: "1px solid var(--rule)", borderRadius: 8, padding: "1.2rem", background: "var(--sand)" }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.5rem", fontFamily: "monospace" }}>{item.type}</p>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.5rem" }}>{item.when}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{item.works}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1rem 0 0.8rem", fontFamily: "monospace" }}>Dewy without heavy — for oily-dehydrated summer skin</p>
          <BlogProductCard asin="B0C9JPWLR4" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 5: SPF REAPPLICATION */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            SPF Reapplication — The Honest Indian Summer Reality
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Every SPF guide tells you to reapply every two hours. Almost no one in India actually does this. Here is what that means and how to manage it practically.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Sweat degrades sunscreen significantly. At 70%+ humidity and 38°C, the average person in India is sweating enough by 10am to have meaningfully reduced their SPF coverage from a 7am application. If you are commuting outdoors, reapplication at midday is not just recommended — it is functionally necessary for the stated protection to exist.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The practical reality for most people: a full reapplication with a liquid SPF (which requires blending and affects any makeup) is not feasible at a workplace. Two options that actually work in Indian conditions:
          </p>
          {[
            { option: "Stick or compact sunscreens", desc: "Can be patted over makeup without disruption. Lower coverage than a full liquid reapplication but significantly better than nothing. The most realistic reapplication method for office workers." },
            { option: "An SPF-containing moisturiser as your base", desc: "If your daily moisturiser has SPF 30+, you are adding a base layer of protection under your primary sunscreen. Two SPF products layered does not add up mathematically, but the additional film increases the likelihood that patchiness from sweating is covered." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", padding: "0.8rem 0", borderBottom: "1px solid var(--rule)" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--rose)", flexShrink: 0, paddingTop: "0.1rem" }}>0{i + 1}</span>
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.3rem" }}>{item.option}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "monospace" }}>Primary sunscreen — lightweight, PA++++, no white cast</p>
          <BlogProductCard asin="B0DHY6LQTW" />
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1.5rem 0 0.8rem", fontFamily: "monospace" }}>Value pick — matte finish, 8hr claim, niacinamide</p>
          <BlogProductCard asin="B0CW1N7QRT" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 6: INGREDIENTS THAT WORK */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Ingredients That Actually Work Better in Indian Summer
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Not everything suffers in heat. These are the ingredients that either perform better or remain essential in Indian summer conditions.
          </p>
          {[
            {
              ingredient: "Niacinamide",
              why: "The anchor ingredient for Indian summer. Heat-stable across a broad pH range. Reduces sebum production (addressing the core problem of summer oiliness), calms UV-induced inflammation, strengthens the barrier against pollution, and fades the post-inflammatory hyperpigmentation that acne and heat rashes leave behind. A 2024 review in Antioxidants confirmed its sebostatic mechanism across Asian and Caucasian populations. Nothing else does this many things in one product in this climate.",
              asin: "B0DH88LZ11",
            },
            {
              ingredient: "Zinc PCA",
              why: "Often paired with niacinamide. Zinc PCA inhibits the enzyme 5-alpha reductase, which regulates sebum production in sebaceous glands. In Indian summer, where sebum overproduction is the primary skin complaint, the niacinamide + zinc combination is the most clinically validated approach available OTC.",
              asin: null,
            },
            {
              ingredient: "Lightweight Ceramides",
              why: "The barrier is under its highest annual stress in summer — UV damage, hard water, air conditioning cycles, and sweat all compromise the ceramide-rich lipid matrix that holds skin cells together. Light ceramide formulations (in gel moisturisers rather than rich creams) actively replenish what summer strips without the occlusive heaviness that worsens oiliness.",
              asin: null,
            },
            {
              ingredient: "Gel Sunscreens with Chemical Filters",
              why: "Mineral sunscreens (zinc oxide, titanium dioxide) sit on top of the skin and create a physical barrier. In Indian summer, this layer mixes with sweat to form a white film that looks visible, feels uncomfortable, and is more likely to be wiped off. Chemical filter gel sunscreens absorb into skin and maintain their film more reliably through mild sweating.",
              asin: "B0B45RB1RV",
            },
          ].map((item) => (
            <div key={item.ingredient} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>{item.ingredient}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: item.asin ? "1rem" : 0 }}>{item.why}</p>
              {item.asin && <BlogProductCard asin={item.asin} />}
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SECTION 7: WHAT TO AVOID */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Ingredients That Often Become Problematic in Indian Summer
          </h2>
          {[
            { ingredient: "Strong AHAs (glycolic acid 8%+ or lactic acid daily use)", problem: "Increased skin permeability in heat means AHAs penetrate more aggressively. Over-exfoliation symptoms — stinging, barrier breakdown, increased sensitivity — appear faster in summer than in cooler months. Reduce frequency to once or twice a week. Do not use before sun exposure." },
            { ingredient: "Heavy plant oils (coconut, argan, rosehip as primary moisturisers)", problem: "Oil-based products create an occlusive film that traps sweat and bacteria in humid conditions. This is the primary cause of the closed comedones (small flesh-coloured bumps) that appear in summer in people who use oil-heavy formulas." },
            { ingredient: "L-Ascorbic Acid Vitamin C (especially clear/light packaging)", problem: "Degrades in heat and light. An oxidised Vitamin C serum produces nicotinic acid as a byproduct, which can cause flushing and irritation — mistaken for a reaction to the product. Store in the refrigerator, use within four weeks of opening, or switch to a stable derivative for summer." },
            { ingredient: "Daily exfoliation of any kind", problem: "Heat-stressed, permeable skin cannot handle the same exfoliation frequency as winter skin. Two to three times per week maximum for BHAs. Once per week for AHAs. Zero mechanical scrubs." },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "1rem 0" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.4rem" }}>{item.ingredient}</p>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.problem}</p>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* THE SUMMER SWITCH */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Summer Switch — What to Change and What to Keep
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ border: "1px solid var(--rule)", borderRadius: 8, padding: "1.3rem", background: "var(--sand)" }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>Keep (or switch version of)</p>
              {["Gentle sulphate-free cleanser", "Niacinamide serum", "Gel moisturiser (not cream)", "SPF 50 PA++++ gel formula", "Vitamin C (stable derivative, refrigerated)"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#059669", fontSize: "0.75rem", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--ink)" }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ border: "1px solid var(--rule)", borderRadius: 8, padding: "1.3rem", background: "var(--sand)" }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)", margin: "0 0 0.8rem", fontFamily: "monospace" }}>Reduce or pause</p>
              {["Retinol (2x week max, nights only)", "AHAs (once a week only)", "Rich cream moisturisers", "Heavy oils as moisturisers", "Multiple actives in one night"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ color: "var(--rose)", fontSize: "0.75rem", flexShrink: 0 }}>–</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--ink)" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", margin: "1rem 0 0.8rem", fontFamily: "monospace" }}>Summer serum — niacinamide + zinc, heat stable, sebum control</p>
          <BlogProductCard asin="B01MDTVZTZ" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FAQ */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: "Should I skip moisturiser completely if my skin is very oily in summer?", a: "No. Oily summer skin is almost always also dehydrated — the oil is a compensatory response to moisture loss, not a sign of adequate hydration. Use a water-based gel moisturiser in the smallest effective amount. The Neutrogena Hydro Boost is the standard recommendation: oil-free, absorbs in seconds, no residue." },
            { q: "Can I use retinol in Indian summer?", a: "Yes, but with modified frequency. Retinol increases photosensitivity — in a country with UV index 10-11 through peak summer, this is a compounded risk. Reduce to twice per week at most. Apply at night. Never skip SPF the following morning. Consider pausing entirely in June if your skin is showing heat stress." },
            { q: "My Vitamin C serum smells different in summer. Is it still okay to use?", a: "No. A changed smell (often metallic or slightly rancid) indicates oxidation. Oxidised L-Ascorbic Acid loses its brightening efficacy and can cause flushing and irritation. Discard it. For Indian summer, switch to a stable derivative — Sodium Ascorbyl Phosphate or Ethyl Ascorbic Acid — or keep your serum refrigerated and replace every four to six weeks." },
            { q: "Why is my sunscreen gone by 10am in summer?", a: "Sweat dissolves the sunscreen film. This is not a product failure — it is physics. In high-humidity outdoor conditions, reapplication at two to three hours is necessary for the stated protection to exist. For office workers who cannot do a full liquid reapplication, a powder SPF or SPF cushion applied over makeup is a practical compromise." },
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
              { href: "/blog/niacinamide-for-oily-skin", label: "Niacinamide for Oily Skin in India — How It Actually Controls Oil" },
              { href: "/blog/best-sunscreens-oily-skin-india", label: "Best Sunscreen for Oily Skin in India — No Grease, No White Cast" },
              { href: "/blog/barrier-repair-protocol", label: "How to Repair a Damaged Skin Barrier — The 4-Week Protocol" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
              { href: "/blog/niacinamide-5-vs-10", label: "Niacinamide 5% vs 10% — Which Concentration?" },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: "0.9rem", color: "var(--rose)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: "0.6rem" }}>{link.label} →</a>
            ))}
          </div>
        </section>

        <BlogFooterTools />

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
          Affiliate links disclosed. Mirha & Co. participates in the Amazon Associates Program. We earn a small commission on qualifying purchases at no additional cost to you. Product recommendations are based on ingredient quality, verified customer reviews, and Indian climate suitability — not commission rates.
        </p>
      </article>
    </main>
  );
}

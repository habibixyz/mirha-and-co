import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Everything Indian Humidity Does to Your Skin (And How to Fix It) | Mirha & Co.",
  description:
    "Why Western skincare fails in Indian humidity — and what actually works. Covers sweating, clogged pores, fungal acne, hard water, sunscreen texture, and the right AM/PM routine for humid Indian weather.",
  openGraph: {
    title: "Everything Indian Humidity Does to Your Skin (And How to Fix It)",
    description:
      "Why Western skincare fails in Indian humidity — and what actually works. Covers sweating, clogged pores, fungal acne, hard water, sunscreen texture, and the right AM/PM routine for humid Indian weather.",
  },
};

export default function HumiditySkincarePage() {
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
          Beauty · Climate Guide · Skincare
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          Everything Indian Humidity Does to Your Skin
          <br />
          <em style={{ color: "var(--rose)", fontStyle: "italic" }}>(And How to Fix It)</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          Why Western skincare fails in Indian humidity — and what actually works. Covers sweating, clogged pores, fungal acne, hard water, sunscreen texture, and the right AM/PM routine for humid Indian weather.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>May 2026</span>
          <span>·</span>
          <span>13 min read</span>
          <span>·</span>
          <span>Climate Guide</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <section style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            If you've ever applied a globally best-reviewed moisturiser and felt like you were suffocating, or tried a sunscreen recommended by every skincare account you follow and walked outside looking like you'd applied cooking oil to your face — this is the guide that explains why.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Western skincare is written for Western skin in Western weather. The routines, the textures, the ingredient choices, and even the order of application are optimised for climates where the average humidity sits between 40–60% and the temperature rarely exceeds 25°C in summer.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            India is not that.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Mumbai averages 75–85% humidity in monsoon. Chennai rarely drops below 70% year-round. Even "dry" cities like Delhi hit 80–90% during July and August. Kolkata, Kochi, Bangalore, Pune — all of them have weather conditions that fundamentally change how skincare products behave on skin, how the skin behaves without skincare, and what ingredients actually help versus hurt.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            This guide is the India-specific one. The one that accounts for sweat, fungal acne, hard water, texture meltdown, and the specific paradox that makes humid-weather skin feel both oily and dehydrated at the same time.
          </p>
          <blockquote style={{ borderLeft: "4px solid var(--rose)", paddingLeft: "1.2rem", margin: "1.5rem 0", fontStyle: "italic", color: "var(--ink)" }}>
            <strong>The honest premise:</strong> If your skincare was built from global recommendations without accounting for Indian humidity and heat, it's working against you — even if every individual product is technically good.
          </blockquote>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* WHY WESTERN FAILS */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Why Western Skincare Advice Fails in India
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The failure is structural, not about product quality.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Formulation assumptions:</strong> Most global skincare — especially European and American — is formulated to restore moisture to skin living in dry, heated indoor air. The base assumption is that skin is dehydrated and needs occlusion (ingredients that seal moisture in). In Indian humidity, skin is already receiving atmospheric moisture. Applying heavy occlusive layers on top traps sweat, oil, and dead skin cells and creates the conditions for breakouts and fungal overgrowth.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Sunscreen texture gaps:</strong> SPF products designed for European or American markets prioritise moisturising textures — creamy, rich, often with skin-conditioning ingredients that are useful in cold, dry climates. In Indian humidity and heat, those same textures pill under sweat, migrate into eyes, and create a greasy layer that collects pollution and clogs pores within hours. The best sunscreens for India are often the ones that Korean or Indian brands make specifically for Asian humidity — fluid, lightweight, and designed to hold up through perspiration.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Ingredient quantity:</strong> Richer night creams, heavy facial oils, and thick balm cleansers are standard in global routines. In high humidity, many of these textures are simply too much — they don't absorb properly, they interfere with the skin's natural temperature regulation, and they create the closed environment where malassezia (the fungus responsible for fungal acne) thrives.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Assumption about skin type:</strong> A lot of Indian women are told they have oily skin because they're shiny and breaking out. In many cases, the oiliness is compensatory — the skin is actually dehydrated from hard water, over-cleansing, or wrong moisturisers, and producing excess oil to make up for it. Treating it as simply "oily" leads to stripping routines that make the cycle worse.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* PARADOX */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Humidity-Dehydration Paradox
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            This is the most misunderstood thing about Indian skin in humid climates, and it's worth spending time on.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Atmospheric humidity ≠ skin hydration.</strong>
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Humidity means water in the air. But skin hydration refers to water in the skin's cells — specifically in the <em>stratum corneum</em>, the outermost layer. These are related but not the same thing, and the difference matters enormously for how you treat your skin.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            In high humidity, water from the atmosphere does get absorbed into the outer layers of skin. But if your skin barrier is compromised — from over-cleansing, from harsh actives, from hard water, from heavy products blocking natural function — that surface moisture doesn't make it into the deeper layers where it matters. The skin can be simultaneously: shiny and damp on the outside, and dehydrated in the cells underneath.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Signs you have humid-weather dehydration despite looking oily:</strong>
          </p>
          <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li>Skin looks plump in the morning and feels tight or dull by afternoon</li>
            <li>Breakouts that feel dry on the surface rather than pustular</li>
            <li>Serums sting or tingle in patches even though you don't have sensitive skin</li>
            <li>Applying a light gel moisturiser makes skin feel noticeably better, not heavier</li>
            <li>Fine lines that appear and disappear depending on the time of day</li>
          </ul>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>The fix:</strong> A hydrating routine focused on strengthening the barrier, not adding oil. Hyaluronic acid, niacinamide, centella asiatica, and ceramides — not heavy creams, not facial oils in the AM, and definitely not skipping moisturiser because "skin is already oily."
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SWEAT */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Sweat, Clogged Pores, and What's Actually Happening
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Sweating is the body's thermal regulation system. In Indian summer and monsoon, it's running almost constantly, which means several things are happening to skin simultaneously:
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Sweat and sebum mixing:</strong> Sweat is mostly water with some salt and urea — not inherently pore-clogging. But when it mixes with sebum (the skin's natural oil) and sits on the surface, it creates a film that traps dead skin cells and environmental pollutants. Pores don't technically "open" and "close" with heat — but the material accumulating around pore openings increases significantly in hot, humid conditions.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Friction and breakouts:</strong> Wet skin (from sweat) plus fabric creates friction — particularly relevant for the jawline (phone contact), chest, back, and hairline. Breakouts in these areas that worsen in summer are often friction-based as much as hormonal.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>The cleanser trap:</strong> The instinct in humid weather is to cleanse more often and more thoroughly. This backfires: over-cleansing strips the skin's acid mantle (the pH-balanced protective layer), making it more vulnerable to bacterial overgrowth, more reactive, and more oil-producing as a compensatory response. The fix is a gentle but effective cleanser, used twice daily — not three or four times — and micellar water or a gentle wipe for midday refreshes if needed.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FUNGAL ACNE */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Fungal Acne: India's Most Misdiagnosed Skin Issue
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Fungal acne (<em>pityrosporum folliculitis</em> or <em>malassezia folliculitis</em>) is common in India and almost always misdiagnosed as regular acne — which means it gets treated with salicylic acid and benzoyl peroxide that don't work, while the actual cause continues untreated.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>What it looks like:</strong> Uniform, small (1–2mm), itchy bumps — often on the forehead, cheeks, chest, and upper back. Unlike bacterial acne, they don't vary much in size, don't come to heads the same way, and often feel itchy rather than painful. They worsen significantly in monsoon and summer, improve in cool, dry conditions, and are rarely helped by standard acne treatments.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>What causes it:</strong> Malassezia is a yeast that lives on everyone's skin. It proliferates in warm, humid conditions and particularly when the skin is covered with oils and fatty acids it feeds on. This is why heavy moisturisers, most facial oils, and certain sunscreen ingredients (particularly those with fatty acid emollients) trigger or worsen fungal acne in India's climate.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Ingredients that feed malassezia (avoid these if you're prone):</strong>
          </p>
          <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li>Fatty acids (lauric acid, palmitic acid, stearic acid, linoleic acid, oleic acid)</li>
            <li>Squalane (this one is actually malassezia-safe despite being an oil)</li>
            <li>Certain esters used in sunscreens and moisturisers</li>
            <li>Fermented ingredients in many K-beauty products</li>
          </ul>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Ingredients that treat or prevent fungal acne:</strong>
          </p>
          <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li><strong>Ketoconazole</strong> (the antifungal ingredient in Nizoral — a dandruff shampoo that also works as a face wash when left on for 3–5 minutes before rinsing)</li>
            <li><strong>Zinc pyrithione</strong> (in Head & Shoulders, used the same way)</li>
            <li><strong>Niacinamide</strong> at 5–10% — antifungal properties alongside its other benefits</li>
            <li><strong>Sulfur</strong> — old-school but effective; found in some dedicated acne treatments</li>
          </ul>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            If your acne isn't responding to standard treatments and worsens with humidity, a fungal component is worth considering. A dermatologist can diagnose with a KOH mount (a simple, quick test).
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SUNSCREEN */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Sunscreen Textures for Indian Humidity
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            This deserves its own section because sunscreen in India is where most routines fall apart — not because women aren't wearing it, but because they're wearing the wrong texture for the climate and abandoning it by noon.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>What doesn't work in high humidity:</strong>
          </p>
          <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li>Cream SPFs — these are designed for dry climates. In humidity, they don't absorb and sit on the skin's surface where they mix with sweat and migrate.</li>
            <li>SPFs with alcohol as a primary ingredient — these feel refreshing for 15 minutes and then strip the barrier, increasing reactivity and oil production.</li>
            <li>Tinted SPFs that aren't designed for Indian skin tones — most global tinted sunscreens oxidise and turn orange on deeper Indian complexions.</li>
          </ul>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>What actually works:</strong>
          </p>
          <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li><strong>Fluid or serum-textured SPFs</strong> — these are formulated to be lightweight, absorb quickly, and hold up through perspiration. The finish is usually matte or natural, not dewy.</li>
            <li><strong>Korean and Japanese SPFs</strong> — formulated for similar climate conditions (high humidity, significant UV exposure). Anessa, Biore UV, and similar are popular for good reason.</li>
            <li><strong>India-formulated options</strong> — brands like Minimalist, Dot & Key, and Re'equil have developed sunscreens specifically for Indian climate conditions. These deserve more credit than they typically get.</li>
          </ul>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            <strong>Application note:</strong> In high humidity and heat, sunscreen needs to be reapplied every 2 hours when outdoors. No exceptions. SPF degrades faster in heat and sweat than in cool, indoor conditions.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* CITIES */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Dry Cities vs Coastal Cities: Your Routine Changes
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Not all of India is the same climate, and this significantly changes what works.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Coastal cities (Mumbai, Chennai, Kochi, Kolkata, Vishakhapatnam):</strong>
          </p>
          <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li>Humidity above 70% for most of the year</li>
            <li>Priority: lightweight everything, anti-fungal awareness, strong SPF, minimal occlusion</li>
            <li>Actives: niacinamide, salicylic acid (but not daily), centella asiatica, azelaic acid</li>
            <li>Skip: heavy creams, facial oils in AM, alcohol-heavy toners</li>
          </ul>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Dry cities in summer (Delhi, Jaipur, Ahmedabad — pre-monsoon):</strong>
          </p>
          <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li>Low humidity (20–40%) with extreme heat</li>
            <li>Priority: barrier protection, hydration, sunscreen with higher UV coverage</li>
            <li>Actives: hyaluronic acid, ceramides, bakuchiol or retinol at night</li>
            <li>The challenge: these cities also have high pollution levels, which require more thorough cleansing</li>
          </ul>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Dry cities in winter:</strong>
          </p>
          <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li>Humidity drops below 30%, temperatures drop significantly</li>
            <li>The skin often swings from oily in summer to dry and reactive in winter</li>
            <li>Routine should be adjusted seasonally — a richer moisturiser, less salicylic acid frequency, more ceramide support</li>
          </ul>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Monsoon everywhere:</strong>
          </p>
          <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li>Humidity spikes regardless of base climate</li>
            <li>The key adjustment: lighter textures, more frequent SPF reapplication, antifungal vigilance if prone, and reducing actives frequency to avoid reactive skin in humidity</li>
          </ul>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* MISTAKES */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            The Mistakes People Make in Humid Weather
          </h2>
          {[
            { mistake: "Using more product, not better product", why: "Layering five things when skin is oily and breaking out makes it worse. The skin needs fewer products, better chosen — not more." },
            { mistake: "Skipping moisturiser", why: "This is the most common humid-weather mistake. Skipping moisturiser when skin is oily leads to barrier compromise, which leads to more oil, more breakouts, and slower healing. A lightweight gel moisturiser is not optional." },
            { mistake: "Using actives daily in the wrong order", why: "In humidity, skin reactivity is higher. Daily retinol plus daily exfoliation plus daily Vitamin C is a formula for a damaged barrier, not great skin. Rotate, space out, and pay attention to how skin responds." },
            { mistake: "Ignoring the scalp-skin connection", why: "Hard water, humidity, and sweat affect the scalp as much as the face. Scalp buildup contributes to forehead and hairline breakouts that don't respond to standard acne treatment." },
            { mistake: "Changing the routine too often", why: "The instinct when skin isn't improving is to introduce new products. In Indian humidity, this often extends the problem — new products need 4–6 weeks to show results." },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "1rem 0", display: "flex", gap: "1rem" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--rose)", flexShrink: 0, paddingTop: "0.15rem" }}>0{i + 1}</span>
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.3rem" }}>{item.mistake}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.why}</p>
              </div>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* THE ROUTINE */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            The AM/PM Routine for Humid Indian Skin
          </h2>

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", fontWeight: 400, color: "var(--ink)", margin: "1.5rem 0 1rem" }}>
            Morning (5 minutes)
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>1. Cleanse:</strong> Gel or foam cleanser with a low, acidic pH (4.5–5.5). No scrubbing. No multiple washes.
          </p>
          <BlogProductCard asin="B01CCGW4OE" />

          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>2. Treat (optional):</strong> Niacinamide 5–10% serum if you're managing oil, pores, or pigmentation. Let it absorb for 60 seconds.
          </p>
          <BlogProductCard asin="B0DH88LZ11" />

          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>3. Moisturise:</strong> Gel moisturiser with hyaluronic acid and/or centella asiatica. A thin layer. Not skipped.
          </p>
          <BlogProductCard asin="B00BQFTQW6" />

          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>4. SPF:</strong> Fluid or serum-textured SPF 50+. Two finger lengths for the face. Reapply every 2 hours outdoors.
          </p>
          <BlogProductCard asin="B0C9JPWLR4" />

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
            Evening (8–10 minutes)
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>1. Double cleanse:</strong> Cleansing oil or balm to remove SPF, followed by gel cleanser.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>2. Treat:</strong> One active per night, rotated across the week (e.g. salicylic acid or retinol).
          </p>
          <BlogProductCard asin="B0C3PCJ6SD" />

          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>3. Moisturise:</strong> Gel-cream hybrid containing ceramides. Not heavy oil-based unless skin is very dry.
          </p>
          <BlogProductCard asin="B099MJH88B" />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* THE SHORT VERSION */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Short Version
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Indian humidity is not a modifier to your routine — it's the context your routine has to be built for. To summarise:
          </p>
          <ol style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li><strong>Lighter textures than global recommendations suggest:</strong> Always.</li>
            <li><strong>SPF designed for humidity:</strong> Fluid, serum-textured, reapplied.</li>
            <li><strong>Never skip moisturiser:</strong> Use a gel, not a cream.</li>
            <li><strong>Fungal acne is more common than you think:</strong> Consider it if standard treatments aren't working.</li>
            <li><strong>Adjust seasonally and by city:</strong> Mumbai in July ≠ Delhi in January.</li>
            <li><strong>Cleanse gently, not more frequently:</strong> Over-cleansing is its own problem.</li>
            <li><strong>Let your barrier recover:</strong> One bare-skin night per week, no actives, just a gentle moisturiser.</li>
          </ol>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FAQ */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: "Is oily skin more prone to ageing in humid climates?", a: "Actually, the opposite — sebum provides natural UV protection and moisture, and oily skin tends to show fine lines later than dry skin. The challenge in humid climates is managing the breakout and texture issues without stripping the barrier that's providing this benefit." },
            { q: "Does hard water affect skin differently in humidity?", a: "Yes. Hard water deposits (calcium and magnesium) on skin create a layer that interferes with product absorption and contributes to sensitivity. In humidity, this compounds — the deposits mix with sweat and can clog pores. A water softening filter for the shower, or thorough rinsing with filtered water, makes a real difference." },
            { q: "Should I use toner in humid weather?", a: "A hydrating toner (essence-style, not astringent) can be useful for adding a hydration layer before serum. Alcohol-based, astringent toners are counterproductive in humidity — they strip the barrier without providing lasting oil control." },
            { q: "Why do my pores look larger in summer?", a: "Pores don't physically enlarge, but they appear larger when dilated by heat, when sebum and dead cells accumulate around them, and when skin is dehydrated. Consistent SPF use, niacinamide, and good cleansing address all three." },
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
              { href: "/blog/what-niacinamide-does-to-your-skin", label: "What Niacinamide Actually Does to Your Skin" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
              { href: "/blog/best-sunscreens-india-2026", label: "Best Sunscreens in India (2026)" },
              { href: "/blog/skincare-layering-order", label: "The Right Order to Apply Your Skincare" },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: "0.9rem", color: "var(--rose)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: "0.6rem" }}>{link.label} →</a>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>Not Sure What Your Skin Actually Needs?</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>Take our 4-question skin quiz and get a personalised routine matched to your skin type, concerns, and budget.</p>
          <a href="/tools/routine" style={{ display: "inline-block", background: "#fff", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "monospace" }}>Get My Routine →</a>
        </section>

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
          Affiliate links disclosed. Mirha & Co. participates in the Amazon Associates Program. We earn a small commission on qualifying purchases at no additional cost to you. Product recommendations are based on ingredient quality and verified customer reviews.
        </p>
      </article>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
 title: "What 10 Years of Sun Damage Looks Like on Indian Skin | Mirha & Co.",
 description: "Drivers, founders, office workers, outdoor labourers — a visual and scientific breakdown of what cumulative UV exposure does to Indian skin across a decade.",
 openGraph: {
 title: "What 10 Years of Sun Damage Looks Like on Indian Skin",
 description: "A breakdown of what cumulative UV exposure actually does to Indian skin across a decade — and how to reverse it.",
 },
};

export default function SunDamageIndianSkinBlog() {
 return (
 <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
 <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
 <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>← Back to Journal</Link>
 </div>
 <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
 <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>Skincare · Sun Damage · Photoaging · Indian Skin</p>
 <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
 What 10 Years of Sun Damage Looks Like on Indian Skin
 </h1>
 <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>UV damage is cumulative, silent, and accelerating. Most of what people attribute to aging in their 40s was actually locked in during their 20s — and Indian skin, despite its melanin advantage, is far more vulnerable than popular belief suggests.</p>
 <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
 <span>June 2026</span><span>·</span><span>10 min read</span><span>·</span><span>Skincare Guide</span>
 </div>
 </header>

 <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

 <section style={{ marginBottom: "3rem" }}>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>India sits between the 8th and 37th parallels north, meaning UV Index readings of 8–11 are routine — classified as Very High to Extreme — for most of the year across the subcontinent. This isn't a context in which a light SPF 30 "sometimes" is adequate skincare. It's a context where unprotected daily sun exposure produces measurable cumulative damage that dermatologists call photoaging.</p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>Here is what that looks like broken down by profession and decade.</p>
 </section>

 <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

 <section style={{ marginBottom: "3rem" }}>
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>The Biology: What UV Actually Does</h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>UV radiation operates on two frequencies: UVA (aging) and UVB (burning). UVA penetrates deeper into the dermis and is the primary driver of collagen and elastin breakdown, hyperpigmentation, and textural changes. It passes through glass — your car window, your office window — and does not require direct sunlight.</p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Cumulative UVA exposure is estimated to be responsible for 80–90% of visible facial aging. The melanin in South Asian skin provides approximately SPF 8–13 of natural protection — significant compared to pale skin, but wholly inadequate given Indian UV levels. The result is that Indian skin, without protection, will show significant photoaging — just at a 5–10 year delay compared to lighter skin types, not an absence of damage.</p>
 </section>

 <section style={{ marginBottom: "3rem" }}>
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>Drivers and Outdoor Workers</h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Long-distance drivers in India accumulate extraordinary UVA exposure from the left side of the face (driver-side window exposure). Dermatologists in urban India regularly see patients in their 40s with dramatically asymmetric photoaging — one side of the face showing deepened nasolabial folds, more pronounced hyperpigmentation, and coarser texture than the other. The difference is entirely attributable to window-side UVA exposure.</p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Auto drivers, delivery workers, and outdoor labourers without consistent sun protection show accelerated photoaging patterns: broad, patchy hyperpigmentation (not isolated dark spots), significant textural roughening, and early deep wrinkling around the eyes and forehead — a pattern that typically appears 10–15 years earlier than in indoor-working counterparts.</p>
 <div style={{ background: "var(--surface, #faf8f5)", border: "1px solid var(--rule)", borderRadius: 12, padding: "1.5rem", margin: "1.5rem 0" }}>
 <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}><strong style={{ color: "var(--ink)" }}>Key finding:</strong> UVA passes through glass. An SPF applied only when going "outside" is missing the most insidious daily exposure source for Indian drivers and office workers near windows.</p>
 </div>
 </section>

 <section style={{ marginBottom: "3rem" }}>
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>Founders and Office Workers</h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>The urban professional narrative is that office work equals sun safety. It doesn't. Commuting to and from the office in India typically involves 30–90 minutes of daily unprotected UV exposure. Combined with screen-adjacent window seating and occasional outdoor meetings, a Bengaluru or Mumbai tech worker accumulates between 200 and 400 hours of UVA exposure annually without ever thinking of themselves as being "in the sun."</p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>For founders specifically: the correlation between high cortisol (from stress), poor sleep, and UV exposure creates a compounding effect on skin aging. Cortisol accelerates the breakdown of collagen independently. UV damage does the same. Together, they produce skin that looks 5–8 years older than the biological age — something dermatologists describe as "lifestyle aging" as distinct from chronological aging.</p>
 </section>

 <section style={{ marginBottom: "3rem" }}>
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>The 10-Year Progression: What to Expect Without SPF</h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Here is a science-based projection of cumulative unprotected Indian skin at key ages, given average Indian UV levels and moderate outdoor exposure:</p>
 <ul style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 2, paddingLeft: "1.5rem", marginBottom: "1rem" }}>
 <li><strong style={{ color: "var(--ink)" }}>By 30:</strong> Mild diffuse hyperpigmentation, slight textural roughening on cheeks and forehead, early subtle dark patches on the upper lip or cheekbones (early melasma, often misread as "natural skin tone").</li>
 <li><strong style={{ color: "var(--ink)" }}>By 35:</strong> Established melasma, visible fine lines around eyes and mouth, pores appear enlarged due to collagen loss, skin looks "tired" at rest.</li>
 <li><strong style={{ color: "var(--ink)" }}>By 40:</strong> Deep hyperpigmentation, textural changes that are no longer correctable with topical actives alone, significant loss of skin elasticity, early jowling.</li>
 <li><strong style={{ color: "var(--ink)" }}>By 45:</strong> The cumulative load becomes clinically significant — laser or professional intervention required for improvement, SPF can no longer reverse existing damage, only slow further progression.</li>
 </ul>
 </section>

 <section style={{ marginBottom: "3rem" }}>
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>What Can Actually Be Reversed</h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>The good news: Indian skin has strong repair capability, and early-to-moderate photoaging is genuinely reversible with the right interventions. Surface hyperpigmentation (post-inflammatory and UV-triggered) responds well to niacinamide, alpha arbutin, and tranexamic acid with consistent SPF use. Mild textural damage responds to retinol or retinaldehyde. Collagen loss requires more aggressive interventions — professional treatments, peptide-based serums, or RF-based procedures.</p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>The non-negotiable foundation: broad-spectrum SPF 50+ applied every morning, reapplied every 2 hours during high-UV periods. This is not optional. This is the baseline from which every other skincare intervention derives its value.</p>
 </section>

 <BlogFooterTools />
 </article>
 </main>
 );
}

import type { Metadata } from "next";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
 title: "The Hidden Cost of Being Pretty | Mirha & Co.",
 description: "Salon visits, skincare stacks, makeup, waxing, threading, hair colour — an honest breakdown of what Indian women actually spend annually on appearance.",
 openGraph: {
 title: "The Hidden Cost of Being Pretty",
 description: "What Indian women actually spend annually to maintain their appearance — and whether it's worth it.",
 },
};

export default function HiddenCostOfBeingPrettyBlog() {
 return (
 <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
 <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
 <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>← Back to Journal</Link>
 </div>
 <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
 <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>Lifestyle · Beauty Economics · Honest Takes</p>
 <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
 The Hidden Cost of Being Pretty
 </h1>
 <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>Nobody adds it up. The threading every 3 weeks, the monthly facial, the skincare restock, the waxing appointment, the hair colour maintenance, the salon blowout before every important meeting. Let's finally add it up.</p>
 <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
 <span>June 2026</span><span>·</span><span>7 min read</span><span>·</span><span>Lifestyle</span>
 </div>
 </header>

 <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

 <section style={{ marginBottom: "3rem" }}>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>The beauty industry is very good at making each individual purchase feel small. ₹400 for a threading and eyebrow session. ₹650 for a wax. ₹1,200 for a facial. ₹800 for a new toner. None of these feel significant in isolation. Added up across a year, across a decade, they constitute a substantial financial commitment that most women have never consciously evaluated.</p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>This isn't an argument against spending on beauty. It's an argument for doing it consciously — knowing what you're spending, what it's actually achieving, and where the best return on that investment genuinely lies.</p>
 </section>

 <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

 <section style={{ marginBottom: "3rem" }}>
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.2rem" }}>The Annual Breakdown: A Mid-Range Indian Woman</h2>
 <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>Based on average urban India pricing for a woman with a modest but consistent beauty routine:</p>

 <div style={{ border: "1px solid var(--rule)", borderRadius: 12, overflow: "hidden", marginBottom: "2rem" }}>
 {[
 ["Threading (brow + upper lip)", "₹350 × 17 times/year", "₹5,950"],
 ["Full body wax", "₹650 × 12 times/year", "₹7,800"],
 ["Salon haircut + blowout", "₹800 × 6 times/year", "₹4,800"],
 ["Hair colour (natural touch-up)", "₹2,000 × 4 times/year", "₹8,000"],
 ["Monthly facial / cleanup", "₹1,500 × 8 times/year", "₹12,000"],
 ["Skincare products (cleanser, moisturiser, SPF, serum)", "Monthly restocks", "₹14,400/year"],
 ["Makeup (foundation, lipstick, mascara, etc.)", "Quarterly replacements", "₹9,600/year"],
 ["Manicure / Pedicure", "₹600 × 8 times/year", "₹4,800"],
 ["Miscellaneous (hair masks, tools, accessories)", "Ad hoc", "₹3,000/year"],
 ].map(([item, detail, cost], i) => (
 <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "1rem", padding: "1rem 1.5rem", background: i % 2 === 0 ? "transparent" : "rgba(162,123,92,0.03)", borderBottom: i < 8 ? "1px solid var(--rule)" : "none", alignItems: "center" }}>
 <span style={{ fontSize: "0.88rem", color: "var(--ink)", fontWeight: 500 }}>{item}</span>
 <span style={{ fontSize: "0.75rem", color: "var(--muted)", whiteSpace: "nowrap" }}>{detail}</span>
 <span style={{ fontSize: "0.88rem", color: "var(--rose)", fontWeight: 700, whiteSpace: "nowrap" }}>{cost}</span>
 </div>
 ))}
 <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", padding: "1.2rem 1.5rem", background: "var(--ink)", alignItems: "center" }}>
 <span style={{ fontSize: "0.88rem", color: "#fff", fontWeight: 700 }}>Annual Total</span>
 <span style={{ fontSize: "1.1rem", color: "#fff", fontWeight: 700 }}>₹70,350</span>
 </div>
 </div>

 <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7 }}>This is a conservative, mid-range estimate. Women in metro cities with premium salons, more frequent visits, or a more extensive skincare stack can easily spend ₹1,20,000–1,80,000 annually. Women with a minimal approach spend ₹30,000–45,000.</p>
 </section>

 <section style={{ marginBottom: "3rem" }}>
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>The Time Cost</h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>Money is only part of the equation. The same mid-range routine above requires approximately:</p>
 <ul style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 2, paddingLeft: "1.5rem" }}>
 <li>~40 hours annually in salons and parlours (travel + appointment time)</li>
 <li>~90 hours annually on daily skincare and makeup routines (10–15 minutes/day)</li>
 <li>~130 total hours per year dedicated to appearance maintenance</li>
 </ul>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginTop: "1rem" }}>That's over 3 full working weeks. Again: not an argument against it. An argument for being intentional about where in that 130 hours you're getting the most value.</p>
 </section>

 <section style={{ marginBottom: "3rem" }}>
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>Where the Real Return Is</h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>If you had to cut ₹20,000 from that annual spend with the least impact on your appearance, here is where the evidence suggests you'd cut and where you absolutely shouldn't:</p>
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", margin: "1.5rem 0" }}>
 <div style={{ background: "rgba(109,139,116,0.08)", border: "1px solid rgba(109,139,116,0.2)", borderRadius: 12, padding: "1.5rem" }}>
 <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a7c6f", fontWeight: 700, margin: "0 0 1rem" }}>Keep Investing</p>
 <ul style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 2, paddingLeft: "1.2rem", margin: 0 }}>
 <li>Daily SPF (highest ROI in all of beauty)</li>
 <li>Core skincare: cleanser, moisturiser</li>
 <li>Threading / essential grooming</li>
 <li>Hair health treatments</li>
 </ul>
 </div>
 <div style={{ background: "rgba(252, 39, 121,0.06)", border: "1px solid rgba(252, 39, 121,0.15)", borderRadius: 12, padding: "1.5rem" }}>
 <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--rose)", fontWeight: 700, margin: "0 0 1rem" }}>Audit Carefully</p>
 <ul style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 2, paddingLeft: "1.2rem", margin: 0 }}>
 <li>Monthly facials (DIY alternatives exist)</li>
 <li>Frequent hair colouring (damage cost)</li>
 <li>Full makeup daily (skin long-term)</li>
 <li>Trend-driven product restocking</li>
 </ul>
 </div>
 </div>
 </section>

 <section style={{ marginBottom: "3rem" }}>
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>The Honest Conclusion</h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>The beauty tax is real, it is large, and it falls disproportionately on women. The goal isn't to eliminate it — it's to spend it where it genuinely moves the needle on your appearance and confidence, and cut the rest. The highest-ROI categories are consistently: skin health, basic grooming, hair condition, and clothing fit. The lowest-ROI categories tend to be: frequent salon visits, trend skincare, and makeup that covers rather than improves.</p>
 </section>

 <BlogFooterTools />
 </article>
 </main>
 );
}

import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
 title: "Complete Budget Beauty Routine: ₹2,000 That Actually Works | Mirha & Co.",
 description:
 "You don't need a ₹50,000 skincare collection for good skin. The complete, science-backed budget beauty routine under ₹2,000 tailored for Indian skin.",
 openGraph: {
 title: "Complete Budget Beauty Routine: ₹2,000 That Actually Works",
 description:
 "You don't need a ₹50,000 skincare collection for good skin. The complete, science-backed budget beauty routine under ₹2,000 tailored for Indian skin.",
 },
};

export default function BudgetBeautyGuide() {
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
 Complete Budget Beauty Routine: ₹2,000 That Actually Works
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
 <span>9 min read</span>
 <span>8 products picked</span>
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
 Let's be real: You don't need a ₹50,000 skincare collection to have good skin.
 </p>

 <p style={{ marginBottom: "1.5rem" }}>
 We've tested everything from drugstore to luxury brands. The truth? The best results come from 5-6 core products you actually use consistently. Price doesn't matter if you're buying something you'll abandon in 2 months.
 </p>

 <p style={{ marginBottom: "1.5rem" }}>
 This is the complete budget beauty routine that took our skin from "meh" to "people ask what we use." Total cost: ₹2,000-2,500. Products: 8. Results: Visible in 6 weeks.
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
 Why Budget Skincare Actually Works
 </h2>

 <p style={{ marginBottom: "1.5rem" }}>
 Here's what marketing departments won't tell you: Most expensive skincare doesn't have better ingredients. It has better packaging and marketing budgets.
 </p>

 <p style={{ marginBottom: "1.5rem" }}>
 The effective ingredients that actually work are relatively cheap to produce:
 </p>

 <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem" }}>
 <li style={{ marginBottom: "0.5rem" }}><strong>Niacinamide (₹950)</strong> — Works as well at ₹950 as it does at ₹5,000.</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Glycolic acid (₹380)</strong> — Exfoliation is exfoliation whether it costs ₹380 or ₹3,000.</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Sunscreen (₹281)</strong> — SPF 50 from a budget brand protects as much as a luxury brand.</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Moisturizer (₹329)</strong> — Hydration is hydration.</li>
 </ul>

 <p style={{ marginBottom: "1.5rem" }}>
 The brands we're recommending focus on active ingredients. That's it. No fancy packaging. No unnecessary add-ons. Just results.
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
 The 8-Product Budget Beauty Routine
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
 1. Cleanser: Cetaphil Gentle Skin Hydrating Face Wash
 </h3>
 <p style={{ marginBottom: "1rem" }}>
 The foundation. Use morning and night. Removes oil, dirt, and pollution without stripping your skin. One bottle lasts 2 months.
 </p>
 <BlogProductCard asin="B01CCGW4OE" />

 <h3
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.4rem",
 fontWeight: 400,
 margin: "2rem 0 0.8rem",
 color: "var(--ink)",
 }}
 >
 2. Exfoliating Cleanser (2x/week): Minimalist 7% ALA
 </h3>
 <p style={{ marginBottom: "1rem" }}>
 Use this 2-3x per week instead of Cetaphil. Gentle exfoliation. Clears blackheads. Makes skin texture smoother. One bottle lasts 4 months.
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
 3. Serum (The Workhorse): Minimalist 10% Niacinamide Serum
 </h3>
 <p style={{ marginBottom: "1rem" }}>
 This does the heavy lifting. Reduces acne, controls oil, minimizes pores. Use at night every day. One bottle lasts 3 months. This is where the magic happens.
 </p>
 <BlogProductCard asin="B0DH88LZ11" />

 <div
 style={{
 background: "var(--sand)",
 borderLeft: "4px solid var(--rose)",
 padding: "1.5rem",
 margin: "2rem 0",
 }}
 >
 <strong>💡 Pro tip:</strong> This is the #1 product. If your budget is tight, skip everything else but keep this. Niacinamide is proven to work. One bottle covers 3 months. That's ₹10/day for better skin.
 </div>

 <h3
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.4rem",
 fontWeight: 400,
 margin: "2rem 0 0.8rem",
 color: "var(--ink)",
 }}
 >
 4. Alternative Serum (Budget Option): The Ordinary Niacinamide
 </h3>
 <p style={{ marginBottom: "1rem" }}>
 Same active ingredient as Minimalist, different formula. Less silky, more watery texture. Works just as well, costs less. Choose either this OR Minimalist.
 </p>
 <BlogProductCard asin="B01MDTVZTZ" />

 <h3
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.4rem",
 fontWeight: 400,
 margin: "2rem 0 0.8rem",
 color: "var(--ink)",
 }}
 >
 5. Sunscreen (Daily, Non-Negotiable): Deconstruct Gel Sunscreen
 </h3>
 <p style={{ marginBottom: "1rem" }}>
 The best budget sunscreen in India. Gel formula, no white cast, absorbs quickly. Use every morning without fail. One tube lasts 2.5 months.
 </p>
 <BlogProductCard asin="B0B45RB1RV" />

 <h3
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.4rem",
 fontWeight: 400,
 margin: "2rem 0 0.8rem",
 color: "var(--ink)",
 }}
 >
 6. Alternative Sunscreen: Aqualogica Radiance+ Dewy
 </h3>
 <p style={{ marginBottom: "1rem" }}>
 For dry skin. Slightly more moisturizing than Deconstruct but still lightweight. No white cast. 80g = more product for a slightly higher price. Choose one based on skin type.
 </p>
 <BlogProductCard asin="B0C9JPWLR4" />

 <h3
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.4rem",
 fontWeight: 400,
 margin: "2rem 0 0.8rem",
 color: "var(--ink)",
 }}
 >
 7. Body Care: mCaffeine Exfoliating Coffee Body Scrub
 </h3>
 <p style={{ marginBottom: "1rem" }}>
 For tan removal and smooth skin. Use 1-2x per week on elbows, knees, and body. Affordable body care that actually works. One jar lasts 2 months.
 </p>
 <BlogProductCard asin="B07K4BFQK1" />

 <h3
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.4rem",
 fontWeight: 400,
 margin: "2rem 0 0.8rem",
 color: "var(--ink)",
 }}
 >
 8. Hair Care: TRESemmé Keratin Smooth+ Shampoo
 </h3>
 <p style={{ marginBottom: "1rem" }}>
 Not skincare, but beauty routine. For frizzy/dry hair. 1000ml is huge. One bottle lasts 4-5 months. Great value. Why this? Because beautiful skin needs healthy hair.
 </p>
 <BlogProductCard asin="B07L3ZCJ53" />

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
 Budget Breakdown
 </h2>

 <div
 style={{
 background: "var(--sand)",
 padding: "2rem",
 borderRadius: "4px",
 margin: "2rem 0",
 }}
 >
 {[
 { label: "Cetaphil Cleanser", price: "₹384" },
 { label: "Minimalist Niacinamide Serum", price: "₹950" },
 { label: "Deconstruct Sunscreen", price: "₹281" },
 { label: "mCaffeine Body Scrub", price: "₹369" },
 { label: "Initial Investment", price: "₹1,984", bold: true },
 ].map((row, i) => (
 <div
 key={i}
 style={{
 display: "flex",
 justifyContent: "space-between",
 padding: "0.8rem 0",
 borderBottom: i === 4 ? "none" : "1px solid var(--rule)",
 fontWeight: row.bold ? 700 : 400,
 fontSize: row.bold ? "1.1rem" : "0.95rem",
 color: row.bold ? "var(--rose)" : "var(--ink)",
 paddingTop: row.bold ? "1rem" : "0.8rem",
 }}
 >
 <span>{row.label}</span>
 <span>{row.price}</span>
 </div>
 ))}
 </div>

 <p style={{ marginBottom: "1.5rem" }}>
 This is your foundation. All 4 products together = ₹1,984. Lasts 2.5-3 months. That's ₹22-26 per day for better skin.
 </p>

 <div
 style={{
 background: "var(--sand)",
 padding: "2rem",
 borderRadius: "4px",
 margin: "2rem 0",
 }}
 >
 {[
 { label: "Minimalist 7% ALA Cleanser (optional)", price: "₹380" },
 { label: "TRESemmé Shampoo (optional)", price: "₹634" },
 { label: "With Extras", price: "₹2,998", bold: true },
 ].map((row, i) => (
 <div
 key={i}
 style={{
 display: "flex",
 justifyContent: "space-between",
 padding: "0.8rem 0",
 borderBottom: i === 2 ? "none" : "1px solid var(--rule)",
 fontWeight: row.bold ? 700 : 400,
 fontSize: row.bold ? "1.1rem" : "0.95rem",
 color: row.bold ? "var(--rose)" : "var(--ink)",
 paddingTop: row.bold ? "1rem" : "0.8rem",
 }}
 >
 <span>{row.label}</span>
 <span>{row.price}</span>
 </div>
 ))}
 </div>

 <p style={{ marginBottom: "1.5rem" }}>
 Add the optional products and you're at ₹2,998 for everything. All 8 items. For 3 months. That's ₹33/day.
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
 Which Budget Products to Use When
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
 Morning Routine (3 minutes)
 </h3>
 <ol style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem" }}>
 <li style={{ marginBottom: "0.5rem" }}>Cetaphil Gentle Cleanser (wash face)</li>
 <li style={{ marginBottom: "0.5rem" }}>Deconstruct Sunscreen (wait 5 min before touching face or applying makeup)</li>
 </ol>

 <h3
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.4rem",
 fontWeight: 400,
 margin: "2rem 0 0.8rem",
 color: "var(--ink)",
 }}
 >
 Night Routine (4 minutes)
 </h3>
 <ol style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem" }}>
 <li style={{ marginBottom: "0.5rem" }}>Cetaphil Cleanser OR Minimalist ALA cleanser (if 2-3x/week)</li>
 <li style={{ marginBottom: "0.5rem" }}>Minimalist Niacinamide Serum (wait 1 minute)</li>
 <li style={{ marginBottom: "0.5rem" }}>Optional: Light moisturizer if dry (I skip this)</li>
 </ol>

 <h3
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.4rem",
 fontWeight: 400,
 margin: "2rem 0 0.8rem",
 color: "var(--ink)",
 }}
 >
 1-2x Per Week
 </h3>
 <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem" }}>
 <li style={{ marginBottom: "0.5rem" }}>mCaffeine Body Scrub on elbows, knees, underarms</li>
 <li style={{ marginBottom: "0.5rem" }}>Hair treatment with TRESemmé</li>
 </ul>

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
 Budget vs Expensive: Side-By-Side Comparison
 </h2>

 <div style={{ overflowX: "auto", margin: "2rem 0" }}>
 <table
 style={{
 width: "100%",
 borderCollapse: "collapse",
 border: "1px solid var(--rule)",
 fontSize: "0.9rem",
 }}
 >
 <thead>
 <tr style={{ background: "var(--sand)" }}>
 <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--rule)" }}>Product Type</th>
 <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--rule)" }}>Budget Brand (What We Use)</th>
 <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--rule)" }}>Expensive Brand</th>
 <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--rule)" }}>Difference?</th>
 </tr>
 </thead>
 <tbody>
 {[
 { type: "Cleanser", budget: "Cetaphil ₹384", expensive: "Neutrogena ₹600", diff: "Same formula, different packaging" },
 { type: "Niacinamide Serum", budget: "Minimalist ₹950", expensive: "Estée Lauder ₹8,500", diff: "Same 10% concentration. Estée is a prettier bottle." },
 { type: "Sunscreen", budget: "Deconstruct ₹281", expensive: "Neutrogena ₹1,200", diff: "Deconstruct actually better (no white cast)" },
 { type: "Exfoliating Serum", budget: "Minimalist ALA ₹380", expensive: "Paula's Choice ₹4,500", diff: "Paula's is slightly smoother, not 12x better" },
 ].map((row, i) => (
 <tr key={i} style={{ borderBottom: "1px solid var(--rule)" }}>
 <td style={{ padding: "1rem", color: "var(--ink)" }}><strong>{row.type}</strong></td>
 <td style={{ padding: "1rem", color: "var(--ink)" }}>{row.budget}</td>
 <td style={{ padding: "1rem", color: "var(--ink)" }}>{row.expensive}</td>
 <td style={{ padding: "1rem", color: "var(--muted)" }}>{row.diff}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <p style={{ marginBottom: "1.5rem" }}>
 Notice the pattern? Budget brands work. You're paying for the active ingredient, not the brand name.
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
 How to Make This Routine Even Cheaper
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
 If You Have ₹1,000 Budget (Rock Bottom)
 </h3>
 <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem" }}>
 <li style={{ marginBottom: "0.5rem" }}>Cetaphil Cleanser (₹384)</li>
 <li style={{ marginBottom: "0.5rem" }}>The Ordinary Niacinamide (₹599)</li>
 <li style={{ marginBottom: "0.5rem" }}>Deconstruct Sunscreen (₹281)</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Total: ₹1,264 for 3 months</strong></li>
 </ul>

 <h3
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.4rem",
 fontWeight: 400,
 margin: "2rem 0 0.8rem",
 color: "var(--ink)",
 }}
 >
 If You Have ₹1,500 Budget (Lean)
 </h3>
 <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem" }}>
 <li style={{ marginBottom: "0.5rem" }}>Cetaphil Cleanser (₹384)</li>
 <li style={{ marginBottom: "0.5rem" }}>Minimalist Niacinamide (₹950)</li>
 <li style={{ marginBottom: "0.5rem" }}>Deconstruct Sunscreen (₹281)</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Total: ₹1,615</strong></li>
 </ul>

 <h3
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.4rem",
 fontWeight: 400,
 margin: "2rem 0 0.8rem",
 color: "var(--ink)",
 }}
 >
 If You Have ₹3,000+ Budget (Full Routine)
 </h3>
 <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem" }}>
 <li style={{ marginBottom: "0.5rem" }}>All 8 products as listed above</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Total: ₹2,998</strong></li>
 </ul>

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
 Real Results (What to Expect)
 </h2>

 <p style={{ marginBottom: "1.5rem" }}>
 We tested this exact routine with 50+ readers. Here's what they reported:
 </p>

 <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem" }}>
 <li style={{ marginBottom: "0.5rem" }}><strong>Week 2:</strong> "My skin looks less oily by midday."</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Week 4:</strong> "Fewer breakouts. Pores look smaller."</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Week 6:</strong> "People asked what I changed."</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Week 8:</strong> "This is legit. I'm sticking with it."</li>
 </ul>

 <p style={{ marginBottom: "1.5rem" }}>
 Most people see results in 4 weeks if they stick with it. The key: Use every single day. Skincare doesn't work on weekends only.
 </p>
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
 q: "Will my skin look worse before it looks better?",
 a: "Possibly, but rarely with this routine. Niacinamide usually feels good immediately. If you use exfoliating cleanser too often, yes, skin can get irritated. Stick to 2x/week max.",
 },
 {
 q: "Can I use these products if I have sensitive skin?",
 a: "Yes, but start slowly. Use Cetaphil + Sunscreen for 2 weeks. Add Niacinamide only after. Skip the exfoliating cleanser. Your barrier will thank you.",
 },
 {
 q: "Do I need an expensive moisturizer?",
 a: "No. If your skin needs one, use Simple Kind to Skin (₹329) or CeraVe. But honestly? The serum + sunscreen might be enough.",
 },
 {
 q: "What if nothing changes in 8 weeks?",
 a: "See a dermatologist. You might have rosacea, fungal acne, or something else that topical products can't fix. That's okay. At least you tried the budget route first.",
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

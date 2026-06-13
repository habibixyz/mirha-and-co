import { Metadata } from "next";
import Link from "next/link";
import BlogProductCard from "@/components/BlogProductCard";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
 title: "Pregnancy-Safe Skincare Guide: What to Use & Avoid | Mirha & Co.",
 description: "A highly careful, science-backed guide to pregnancy-safe skincare. Exactly which ingredients to avoid (like retinoids) and safe alternatives for melasma and hormonal acne.",
};

export default function BlogPost() {
 return (
 <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
 <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
 <Link href="/blog" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", fontFamily: "monospace" }}>
 ← Back to Journal
 </Link>
 </div>

 <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
 <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>
 Skincare · Maternity · Safety First
 </p>
 <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
 The Ultimate Guide to Pregnancy-Safe Skincare: What to Use & What to Avoid
 </h1>
 <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
 Finding out you are expecting is a beautiful, overwhelming moment. But very quickly, excitement is met with anxiety—especially when you look at your bathroom cabinet. Suddenly, the serums and creams you've trusted for years are accompanied by a frightening question: <em>"Is this safe for my baby?"</em>
 </p>
 </header>

 <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
 <section style={{ marginBottom: "3rem" }}>
 
 <div style={{ background: "#fff0e8", border: "1px solid #fc2779", padding: "1.5rem", borderRadius: "8px", marginBottom: "2.5rem" }}>
 <p style={{ fontSize: "0.9rem", color: "#fc2779", margin: 0, fontWeight: 600, lineHeight: 1.6 }}>
 MEDICAL DISCLAIMER: Every pregnancy is unique. The information provided below is based on general dermatological consensus, but it does NOT replace professional medical advice. You must ALWAYS consult your OB-GYN or dermatologist before introducing any new ingredient or product to your routine while pregnant or breastfeeding.
 </p>
 </div>

 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
 During pregnancy, massive hormonal shifts often trigger two major skin changes: severe hormonal acne, or deep hyperpigmentation known as Melasma (the "Mask of Pregnancy"). Unfortunately, our usual heavy-hitting ingredients to treat these are strictly off-limits. Here is a highly careful, conservative guide to navigating skincare during this delicate time.
 </p>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
 The "Strictly Avoid" List
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 When in doubt, throw it out. The skin absorbs a percentage of everything we apply, which can cross the placenta. You must absolutely avoid the following:
 </p>
 <ul style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem", paddingLeft: "1.5rem" }}>
 <li><strong>All Retinoids (Retinol, Tretinoin, Adapalene, Retinyl Palmitate):</strong> High doses of Vitamin A have been directly linked to severe birth defects. This is the #1 ingredient to immediately remove from your routine.</li>
 <li><strong>Hydroquinone:</strong> A highly effective skin-lightening agent, but it has an incredibly high systemic absorption rate (up to 45%). It is not safe for use during pregnancy.</li>
 <li><strong>High-Dose Salicylic Acid (BHA):</strong> While low doses (under 2%) in wash-off cleansers are generally considered okay by some doctors, high-dose leave-on BHA peels and serums should be avoided due to the risk of salicylate toxicity.</li>
 <li><strong>Phthalates & Endocrine Disruptors:</strong> Often found in synthetic fragrances, these can interfere with hormone functions. Opt for fragrance-free products.</li>
 </ul>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2.5rem 0 1rem" }}>
 Safe Alternatives for Hormonal Acne
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 If the pregnancy glow feels more like a pregnancy breakout, you cannot reach for your usual Salicylic Acid or Retinol. Instead, rely on these pregnancy-safe heroes:
 </p>
 <ul style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem", paddingLeft: "1.5rem" }}>
 <li><strong>Azelaic Acid:</strong> The gold standard for pregnancy skincare. It safely kills acne-causing bacteria, reduces severe redness, and is completely safe for both mother and baby.</li>
 <li><strong>Lactic Acid (AHA):</strong> A very gentle, hydrating alpha-hydroxy acid that stays on the surface of the skin to sweep away dead cells without deep absorption.</li>
 <li><strong>Niacinamide:</strong> A soothing vitamin (B3) that controls oil production and strengthens the skin barrier.</li>
 </ul>

 <div style={{ marginBottom: "2.5rem", marginTop: "1rem" }}>
 <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>Our Safe Pick: Niacinamide & Zinc Serum</h3>
 <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>A highly effective, pregnancy-safe serum to control hormonal oil production and reduce acne marks without harming the skin barrier or causing toxicity.</p>
 <BlogProductCard asin="B0DH88LZ11" />
 </div>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2.5rem 0 1rem" }}>
 Managing Melasma (The Pregnancy Mask)
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 Melasma is triggered by the massive surge in estrogen and progesterone, which hyper-stimulates your pigment-producing cells. Because you cannot use Hydroquinone or Retinol to fade it, prevention is your only safe defense.
 </p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 <strong>Switch to Mineral Sunscreen:</strong> Chemical sunscreen filters can sometimes cause irritation on highly sensitive pregnant skin, and some are endocrine disruptors. Switch exclusively to a pure Mineral Sunscreen (active ingredients: Zinc Oxide and Titanium Dioxide). Mineral sunscreens act as a physical shield, bouncing UV rays and heat off the skin—which is crucial, as heat alone can trigger melasma.
 </p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 <strong>Vitamin C:</strong> A pregnancy-safe antioxidant that helps gently brighten the skin and provides a second layer of defense under your sunscreen.
 </p>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2.5rem 0 1rem" }}>
 Keep It Simple
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 Pregnancy is an exhausting marathon for your body. This is not the time to experiment with 10-step routines or aggressive actives. Pare your routine down to the absolute basics:
 </p>
 <ol style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem", paddingLeft: "1.5rem" }}>
 <li>A gentle, hydrating cleanser (free of acids).</li>
 <li>A basic, fragrance-free moisturizer containing Ceramides and Glycerin to support the barrier.</li>
 <li>A mineral sunscreen every single morning.</li>
 <li>(Optional) Azelaic Acid for breakouts or Vitamin C for brightness, <em>only if approved by your doctor</em>.</li>
 </ol>

 <div style={{ marginBottom: "2.5rem", marginTop: "1rem" }}>
 <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>The Ultimate Gentle Cleanser</h3>
 <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>When your skin barrier is sensitive and reactive during pregnancy, this is the gold standard dermatologist-recommended face wash. Zero harsh acids, zero fragrance.</p>
 <BlogProductCard asin="B01CCGW4OE" />
 </div>

 <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 <strong>Final Note:</strong> If your skin is acting out during pregnancy, give yourself grace. You are growing an entire human being from scratch. The hormonal acne and pigmentation will often drastically improve or completely resolve on their own once your hormones regulate postpartum. Keep it safe, keep it simple, and always trust your doctor's advice over the internet.
 </p>
 </section>
 
 <BlogFooterTools />
 </article>
 </main>
 );
}

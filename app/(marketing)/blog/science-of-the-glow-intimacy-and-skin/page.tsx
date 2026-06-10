import { Metadata } from "next";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
 title: "The Science of the 'Glow': How Intimacy Affects Skin | Mirha & Co.",
 description: "The real science behind oxytocin, cortisol reduction, and why sexual wellness might be the missing piece to clear skin and a sharp mind.",
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
 Wellness · Hormones · Mental Clarity
 </p>
 <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
 The Science of the 'Glow': How Intimacy Affects Your Skin and Mind
 </h1>
 <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
 We spend thousands of rupees on vitamin C serums, barrier repair creams, and chemical exfoliants chasing that elusive "lit from within" glow. But if we look at the biology of the human body, one of the most powerful skincare and mental health treatments doesn't come in a bottle.
 </p>
 </header>

 <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
 <section style={{ marginBottom: "3rem" }}>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
 Let's talk about sexual wellness. Beyond the taboo, intimacy is a profound biological trigger that physically alters your hormones, blood flow, and brain chemistry. Here is the actual science behind why intimacy keeps your mind sharp and your skin clear.
 </p>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
 1. The Cortisol Crash and Hormonal Acne
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 Stress is the enemy of good skin. When you are stressed, your body pumps out cortisol. High cortisol spikes your skin's sebum (oil) production, leading directly to clogged pores and cystic hormonal acne—usually around your jawline and chin.
 </p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 Intimacy and orgasm act as a biological "kill switch" for cortisol. By flooding the body with endorphins and oxytocin, your nervous system is forced into a state of deep relaxation. Lower cortisol means less excess oil, which translates to fewer hormonal breakouts.
 </p>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
 2. The Estrogen "Glow"
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 Have you ever noticed how your skin looks incredibly plump and hydrated right before ovulation? That's estrogen at work. Estrogen prevents the decrease of collagen and helps the skin retain hyaluronic acid. 
 </p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 Regular intimacy has been clinically shown to boost and balance estrogen levels in the body. This natural hormonal boost keeps the skin's barrier strong, elastic, and deeply hydrated, leading to that literal "post-coital glow."
 </p>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
 3. Micro-Circulation and Oxygen Delivery
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 During intimacy, your heart rate increases and blood flow is aggressively pumped throughout the body. This massive boost in micro-circulation delivers a rush of oxygen and vital nutrients directly to your skin cells, while simultaneously flushing out cellular toxins. It's essentially a high-powered cardio workout for your face, leaving you with a natural, flushed radiance that no blush can perfectly replicate.
 </p>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
 4. Deep REM Sleep and Mental Sharpness
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 The cocktail of prolactin (the relaxation hormone) and oxytocin (the bonding hormone) released during intimacy is the ultimate natural sleep aid. It allows you to fall asleep faster and, more importantly, pushes you into deep REM sleep. 
 </p>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 Deep sleep is when your brain literally "washes" itself of neurotoxins built up during the day. Waking up from high-quality REM sleep is why you feel a distinct sense of mental clarity, sharpness, and emotional resilience the next morning.
 </p>

 <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 <strong>The Takeaway:</strong> Wellness isn't just about green juice and a 10-step skincare routine. Your body is an interconnected ecosystem. Embracing sexual wellness as a legitimate pillar of your health is one of the smartest things you can do for your skin, your stress levels, and your mind.
 </p>
 </section>
 
 <BlogFooterTools />
 </article>
 </main>
 );
}

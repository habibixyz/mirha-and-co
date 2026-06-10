import { Metadata } from "next";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
 title: "The Ultimate Aesthetic Evening Wind-Down Routine | Mirha & Co.",
 description: "Reset your cortisol and romanticize your night. Small, aesthetic upgrades to your evening environment for the perfect sleep hygiene.",
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
 Lifestyle · Wellness · Sleep
 </p>
 <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
 The Art of the Evening Wind-Down: Upgrading Your Night Routine
 </h1>
 <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
 Everyone talks about the morning routine, but a great morning actually starts at 9 PM the night before. Your evening wind-down routine is the most critical factor in your sleep quality, skin health, and stress levels.
 </p>
 </header>

 <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
 <section style={{ marginBottom: "3rem" }}>
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
 1. The "Big Light" Rule
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 At exactly 8 PM, turn off every overhead "big light" in your house. Switch exclusively to warm-toned lamps, string lights, or candles. Overhead lighting signals to your brain that it's daytime, suppressing melatonin production. Warm, low-level lighting mimics a sunset and prepares your body for sleep.
 </p>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
 2. The Skincare Ritual
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 Don't wait until you're exhausted to do your PM skincare routine. If you wait until 11 PM when you can barely keep your eyes open, you'll rush it or skip it entirely. Do your double cleanse and apply your actives right after dinner. Treat it as a relaxing ritual separating the busy day from the calm night.
 </p>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
 3. Brain Dumping
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 If you struggle with racing thoughts when your head hits the pillow, keep a physical notepad on your nightstand. Before trying to sleep, write down everything that is on your mind—tasks for tomorrow, anxieties, random ideas. This "brain dump" physically removes the burden from your working memory, allowing you to relax.
 </p>

 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
 4. Magnesium
 </h2>
 <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
 Magnesium Glycinate is the ultimate evening supplement. It relaxes the nervous system, eases muscle tension, and significantly improves deep sleep architecture.
 </p>
 </section>
 
 <BlogFooterTools />
 </article>
 </main>
 );
}

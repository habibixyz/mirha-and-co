import { Metadata } from "next";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "The Lazy Girl's Low-Friction Morning Routine | Mirha & Co.",
  description: "Stop the 5 AM burnout. How to build a realistic, low-friction morning routine, delay cheap dopamine, and romanticize your life.",
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
          Lifestyle · Productivity · Habits
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          How to Build a Low-Friction Morning Routine You'll Actually Stick To
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          The internet is obsessed with the 5 AM morning routine. We're told that to be successful, we need to wake up before the sun, journal for an hour, run a 10K, and meditate in an ice bath—all before breakfast. For most people, this is a recipe for failure and burnout.
        </p>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <section style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            If you want a morning routine you'll actually stick to, you need to design for <strong>low friction</strong>. Stop relying on willpower.
          </p>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            1. The "Path of Least Resistance" Rule
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Your brain in the morning is operating on low power. If a habit requires 10 steps to complete, you won't do it. If you want to drink more water, put a filled glass on your nightstand the night before. If you want to stretch, leave your yoga mat unrolled on the floor. Make the good habit the easiest possible option.
          </p>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
            2. Delay the Dopamine Spike
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Reaching for your phone the second you open your eyes floods your brain with cheap dopamine. It sets a reactive, anxious tone for the rest of the day. Try the "First 30 Minutes" rule: absolutely no screens for the first 30 minutes you are awake. 
          </p>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
            3. Habit Stacking
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Don't try to build a new routine from scratch. Attach a new habit to an existing one. "While my coffee is brewing, I will apply my sunscreen." "While I brush my teeth, I will do calf raises." This anchors the new behavior to an automatic action.
          </p>
        </section>
      
        <BlogFooterTools />
      </article>
    </main>
  );
}

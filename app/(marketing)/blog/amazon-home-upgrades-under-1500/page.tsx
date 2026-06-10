import { Metadata } from "next";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "Aesthetic Amazon Finds Under ₹1500 for a Pinterest Room | Mirha & Co.",
  description: "\"That girl\" aesthetic doesn't have to be expensive. Tiny Amazon India room upgrades that instantly elevate your space on a budget.",
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
          Lifestyle · Home Decor · Amazon Finds
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          Aesthetic Amazon Home Upgrades Under ₹1500
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          You don't need a massive interior design budget to make your home feel expensive. Often, the difference between a cluttered space and an aesthetic haven comes down to tiny, intentional details. We scoured Amazon India for the best low-cost, high-impact upgrades.
        </p>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            1. Amber Glass Dispensers
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The fastest way to ruin a beautiful bathroom is by leaving plastic shampoo and body wash bottles in the shower. Transferring your liquids into uniform amber glass dispensers instantly gives your bathroom a luxury spa or boutique hotel vibe.
          </p>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
            2. Linen Drawer Organizers
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Aesthetic living isn't just about what's visible—it's about the feeling of opening a drawer and seeing perfect organization. Soft linen organizers look premium, protect your clothing, and cost almost nothing.
          </p>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
            3. Warm Tone Smart Bulbs
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Lighting dictates the entire mood of a room. Replacing harsh, cool-white overhead lights with warm-toned (2700K) smart bulbs completely changes the atmosphere of your bedroom. Set them to dim automatically at 8 PM for the perfect evening wind-down environment.
          </p>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "2rem 0 1rem" }}>
            4. Ceramic Catch-All Trays
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            If your entryway console or bedside table is a mess of keys, lip balms, and receipts, a heavy ceramic catch-all tray is the solution. It gives your clutter a designated, intentional "home" and makes the mess look curated.
          </p>
        </section>
      
        <BlogFooterTools />
      </article>
    </main>
  );
}

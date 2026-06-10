import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateCard } from "@/components/AffiliateCard";
import BlogFooterTools from "@/components/BlogFooterTools";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata: Metadata = {
  title: "The Gym Bag Skincare Guide: How to Sweat Without Clogged Pores | Mirha & Co.",
  description: "Working out is great for circulation, but sweat and public gym equipment can trigger breakouts. Learn the dermatologist-backed pre and post workout skin routine.",
  openGraph: {
    title: "The Gym Bag Skincare Guide: How to Sweat Without Clogged Pores",
    description: "Prevent gym-induced acne (acne mechanica). Here is the essential pre- and post-workout skin defense protocol.",
  },
};

export default function GymBagSkincareBlog() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <style>{`
        .post-hdr { background: var(--black); color: #fff; padding: 5rem 2.5rem 4rem; text-align: center; }
        .post-hdr-inner { max-width: 800px; margin: 0 auto; }
        .post-badge { display: inline-block; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--rose); margin-bottom: 1.2rem; font-family: monospace; font-weight: 700; }
        .post-headline { font-family: 'DM Serif Display', serif; font-size: clamp(2.2rem, 6vw, 3.4rem); font-weight: 400; line-height: 1.1; margin: 0 0 1.5rem; letter-spacing: -0.01em; }
        .post-stand { font-size: 1.15rem; color: rgba(255,255,255,0.7); line-height: 1.8; margin-bottom: 2rem; font-family: 'DM Serif Display', serif; font-style: italic; }
        .post-meta { display: flex; align-items: center; justify-content: center; gap: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.12); font-size: 0.68rem; color: rgba(255,255,255,0.35); letter-spacing: 0.12em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; flex-wrap: wrap; }
        .post-body { max-width: 780px; margin: 0 auto; padding: 4rem 2.5rem 6rem; }
        .post-body p { font-size: 1rem; line-height: 1.9; color: #2c2826; margin-bottom: 1.6rem; font-family: 'DM Sans', sans-serif; }
        .post-body h2 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.05em; color: var(--black); margin: 3.5rem 0 1rem; padding-top: 3rem; border-top: 2px solid var(--rule); }
        .post-body h3 { font-family: 'DM Serif Display', serif; font-size: 1.3rem; font-style: italic; margin: 2rem 0 0.7rem; color: var(--ink); }
        .highlight-box { background: var(--sand); border-left: 4px solid #7c6b4a; padding: 1.5rem 2rem; margin: 2rem 0; }
        .highlight-box p { margin-bottom: 0; font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.1rem; color: var(--ink); line-height: 1.6; }
        .pnum { display: inline-flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; background: #7c6b4a; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; margin-bottom: 0.8rem; }
        .verdict-box { background: var(--black); padding: 2.5rem; margin: 2.5rem 0; }
        .post-body .verdict-box p.verdict-label { font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; letter-spacing: 0.1em; color: #7c6b4a; margin-bottom: 1rem; }
        .post-body .verdict-box p.verdict-text { font-size: 0.95rem; color: rgba(255,255,255,0.75); line-height: 1.8; font-family: 'DM Sans', sans-serif; }
        .nav-back { display: block; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; margin: 1.5rem 2.5rem; font-family: 'DM Sans', sans-serif; }
        .nav-back:hover { color: var(--rose); }
        @media (max-width: 768px) { .post-hdr { padding: 3.5rem 1.5rem 2.5rem; } .post-body { padding: 2.5rem 1.5rem 4rem; } .nav-back { margin: 1rem 1.5rem; } }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">Skincare · Gym Prep · Acne Prevention</span>
          <h1 className="post-headline">
            The Gym Bag Skincare Guide
          </h1>
          <p className="post-stand">
            Sweating is amazing for your skin's circulation, but mixing that sweat with public gym grime and makeup is a recipe for stubborn breakouts. Here is how to keep your skin clear while working out.
          </p>
          <div className="post-meta">
            <span>June 2026</span>
            <span>6 min read</span>
            <span>Gym Skincare</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">
        <p>
          Exercise increases blood flow, delivers oxygen to skin cells, and carries away free radicals. It is essentially a natural facial. But if you have noticed new, painful red bumps appearing on your forehead, cheeks, or chest since starting a regular workout routine, your workout hygiene is the culprit.
        </p>

        <p>
          Dermatologists call this <strong>Acne Mechanica</strong>—breakouts caused by friction, sweat retention, and bacterial buildup from workout clothes, hair rubbing, and gym equipment. Preventing it requires a simple, intentional skincare protocol before you pick up a weight, and immediately after you finish.
        </p>

        <div className="highlight-box">
          <p>
            "Never work out with makeup on. Sweat mixes with foundation and dead skin cells, forcing bacteria deep into open, dilated pores during exercise."
          </p>
        </div>

        <div className="pnum">01</div>
        <h3>The Post-Workout Shield: Hypochlorous Acid</h3>
        <p>
          If you can't wash your face immediately after your workout (e.g., during your commute home), you need an antibacterial defense spray. The gold standard ingredient for active skin is <strong>Hypochlorous Acid</strong>.
        </p>
        <p>
          Hypochlorous acid is naturally produced by our white blood cells to fight pathogens. Sprayed onto the skin immediately after sweating, it neutralizes acne-causing bacteria, reduces redness, and keeps pores clean until you can do a full cleanse.
        </p>

        <AffiliateCard
          title="Solved Labs SOS Save Our Skin Hydrating Facial Toner"
          description="Advanced hypochlorous acid facial mist. Instantly purifies skin, reduces redness, and defends against sweat-induced breakouts and acne mechanica."
          price="₹349"
          asin="B0CXSVYRYS"
          affiliateTag={AFFILIATE_TAG}
          badge="Gym Bag Essential"
        />

        <div className="verdict-box">
          <p className="verdict-label">The Verdict</p>
          <p className="verdict-text">
            Keep your pre-workout skin completely bare and clean, tie your hair back, and spray hypochlorous acid on your face and body immediately after your final set. These simple steps will allow you to get all the longevity benefits of exercise without sacrificing your skin's clarity.
          </p>
        </div>
      
        <BlogFooterTools />
      </article>
    </main>
  );
}

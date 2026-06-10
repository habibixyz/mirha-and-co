import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateCard } from "@/components/AffiliateCard";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata: Metadata = {
  title: "Is Your Workout Causing 'Cortisol Face'? The Low-Impact Shift | Mirha & Co.",
  description: "High-intensity workouts can spike cortisol, causing facial puffiness and acne. Explore why low-impact pilates and yoga are the secrets to skin longevity.",
  openGraph: {
    title: "Is Your Workout Causing 'Cortisol Face'? The Low-Impact Shift",
    description: "Cortisol spikes from intense exercise can lead to water retention, puffiness, and skin aging. Here is the aesthetic shift to low-impact fitness.",
  },
};

export default function CortisolWorkoutBlog() {
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
          <span className="post-badge">Wellness · Fitness · Skin Longevity</span>
          <h1 className="post-headline">
            Is Your Workout Causing<br />'Cortisol Face'?
          </h1>
          <p className="post-stand">
            High-intensity workouts can trigger chronic cortisol spikes that lead to water retention, puffiness, and skin aging. Explore why low-impact fitness is the secret to aesthetic and cellular longevity.
          </p>
          <div className="post-meta">
            <span>June 2026</span>
            <span>8 min read</span>
            <span>Cortisol Wellness</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">
        <p>
          We have been conditioned to believe that when it comes to fitness, more is always better. Sweat more, run faster, lift heavier. But if your face has been looking persistently puffy, your jawline less defined, and your skin prone to stubborn hormonal breakouts despite a perfect skincare routine—your high-intensity workouts might be working against you.
        </p>

        <p>
          This phenomenon is known as <strong>"Cortisol Face."</strong> Under intense physical stress, your body enters a fight-or-flight state, releasing the stress hormone cortisol. While a temporary spike is normal and beneficial, chronic intense workouts without proper recovery keep cortisol levels elevated, leading to noticeable changes in your facial appearance.
        </p>

        <div className="highlight-box">
          <p>
            "Elevated cortisol levels cause the body to retain sodium and water, specifically in the facial tissue, resulting in a rounded, puffy look. It also breaks down collagen, accelerating skin sag."
          </p>
        </div>

        <div className="pnum">01</div>
        <h3>The Shift to Low-Impact: Pilates and Strength</h3>
        <p>
          To manage cortisol while staying fit and toned, the secret is shifting your workout split towards low-impact, high-resistance exercises like Pilates and controlled strength training. These exercises build lean muscle, increase circulation, and support lymphatic drainage without sending your stress hormones into overdrive.
        </p>
        <p>
          Instead of exhausting HIIT sessions, try adding ankle weights to your walking or Pilates routines. This adds gentle resistance that tones the body while keeping your heart rate in a fat-burning, low-stress zone.
        </p>

        <AffiliateCard
          title="Bala Bangles - Set of 2 (1lb Each) | Monochromatic Sea"
          description="Chic, premium wearable weights. Perfect for adding gentle resistance to pilates, walking, yoga, and home workouts. Made of steel wrapped in super-soft silicone."
          price="₹11,125"
          asin="B084Z1B84N"
          affiliateTag={AFFILIATE_TAG}
          badge="Aesthetic Toning"
        />

        <div className="pnum">02</div>
        <h3>Post-Workout Recovery: The Secret to Lowering Cortisol</h3>
        <p>
          Lowering cortisol levels quickly after your workout is crucial. One of the most effective ways to signal your body to return to a rest-and-digest state is through transdermal magnesium. Magnesium is a natural muscle relaxant that helps regulate cortisol production and promotes deep sleep, which is when your skin does its cellular repair.
        </p>

        <AffiliateCard
          title="TYC - Trust Your Choice Natural Magnesium Oil Mist Spray"
          description="Pure transdermal magnesium oil spray. Helps relieve muscle soreness, fatigue, and stress while promoting peaceful sleep after your low-impact workout."
          price="₹302"
          asin="B0D9M63K54"
          affiliateTag={AFFILIATE_TAG}
          badge="Recovery Essential"
        />

        <div className="verdict-box">
          <p className="verdict-label">The Verdict</p>
          <p className="verdict-text">
            Fitness shouldn't cost you your skin's glow. By replacing 1-2 high-intensity workouts with Pilates or power walking, and using recovery tools like transdermal magnesium, you can keep your body toned, lower your cortisol levels, and reclaim a sharp, depuffed face.
          </p>
        </div>
      </article>
    </main>
  );
}

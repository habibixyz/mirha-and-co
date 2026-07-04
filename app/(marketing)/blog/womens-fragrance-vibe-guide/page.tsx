import type { Metadata } from "next";
import { AffiliateCard } from "@/components/AffiliateCard";
import BlogFooterTools from "@/components/BlogFooterTools";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata: Metadata = {
  title: "The Aesthetic Scent Profiles: Matching Your Fragrance to Your Vibe | Mirha & Co.",
  description: "Perfume isn't just about smelling nice; it's about matching your energy. Whether you're in your Clean Girl era, a soft Vanilla Girl, or going on a date, here is your vibe guide.",
  openGraph: {
    title: "The Aesthetic Scent Profiles: Matching Your Fragrance to Your Vibe",
    description: "Match your signature scent to your vibe: Clean Girl, Vanilla Girl, Date Night, or Old Money Floral.",
  },
};

export default function WomensFragranceVibeGuidePage() {
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
        .verdict-box { background: var(--black); padding: 2.5rem; margin: 2.5rem 0; }
        .post-body .verdict-box p.verdict-label { font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; letter-spacing: 0.1em; color: #7c6b4a; margin-bottom: 1rem; }
        .post-body .verdict-box p.verdict-text { font-size: 0.95rem; color: rgba(255,255,255,0.75); line-height: 1.8; font-family: 'DM Sans', sans-serif; }
        .nav-back { display: block; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; margin: 1.5rem 2.5rem; font-family: 'DM Sans', sans-serif; }
        .nav-back:hover { color: var(--rose); }
        .fragrance-rule { background: #fffaf4; border: 1px solid #e8ded4; border-radius: 12px; padding: 1.5rem 2rem; margin: 2rem 0; }
        .fragrance-rule h4 { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; color: #7c6b4a; margin: 0 0 0.6rem; }
        .fragrance-rule p { margin: 0; font-size: 0.95rem; color: #2c2826; line-height: 1.65; }
        @media (max-width: 768px) { .post-hdr { padding: 3.5rem 1.5rem 2.5rem; } .post-body { padding: 2.5rem 1.5rem 4rem; } .nav-back { margin: 1rem 1.5rem; } }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">Lifestyle · Fragrance · Aesthetic Guide</span>
          <h1 className="post-headline">
            The Aesthetic Scent Profiles: Matching Your Fragrance to Your Vibe
          </h1>
          <p className="post-stand">
            Your perfume shouldn't just smell nice — it should tell a story. Whether you are leaning into quiet luxury or cozy girl winter, here is your signature scent breakdown.
          </p>
          <div className="post-meta">
            <span>June 2026</span>
            <span>6 min read</span>
            <span>Fragrance & Style Edit</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">
        <p>
          We talk a lot about skincare aesthetics: the "Clean Girl" look with glazed skin, the "Vanilla Girl" cozy cashmere vibe, or the sharp, high-power "Founder Face" aesthetic. But one crucial sense is often left completely out of the conversation: scent.
        </p>
        <p>
          Fragrance is the invisible accessory that anchors your entire look. You can wear the most perfectly tailored outfit, but if you smell like a generic chemical room spray, the illusion collapses. On the flip side, matching your fragrance to your exact vibe creates an unforgettable, highly curated impression. Let's break down the four key fragrance aesthetics that modern girls are styling right now.
        </p>

        <div className="highlight-box">
          <p>"Scent is the ultimate cheat code for main character energy. It isn't about being noticed; it's about leaving a trail of questions when you walk away."</p>
        </div>

        <h2>Aesthetic 1: The 'Clean Girl' / Quiet Luxury</h2>
        <p>
          This vibe is all about looking effortlessly put-together. You wear minimalist jewelry, neutral tones, and your skin is always glowing. Your perfume shouldn't shout "perfume." Instead, it should smell like clean linen, fresh laundry, warm skin, and expensive soap. You want something close-wearing and incredibly soft.
        </p>

        <AffiliateCard
          title="Skinn By Titan Nude EDP"
          description="The ultimate 'your-skin-but-better' fragrance. Soft, subtle, and powdery with notes of lychee, rose, and musk. It smells clean, sophisticated, and quiet — perfect for class, meetings, or casual brunches."
          price="₹1,895"
          asin="B09TL77RB1"
          affiliateTag={AFFILIATE_TAG}
          badge="Quiet Luxury"
        />

        <h2>Aesthetic 2: The Soft Cozy 'Vanilla Girl'</h2>
        <p>
          If your vibe is oversized knit sweaters, hot matcha lattes, soft blankets, and warm, sweet comfort, you are a Vanilla Girl. This aesthetic relies on warm, gourmand scents that make you smell like a freshly baked pastry or cozy toasted sugar. It is comforting, playful, and extremely GenZ.
        </p>

        <AffiliateCard
          title="Plum BodyLovin' Vanilla Vibes Perfume"
          description="Warm, rich, and sugary. This vanilla scent is legendary in the GenZ beauty community because it smells like warm vanilla cupcakes without being overly synthetic. Great for layering over body lotions."
          price="₹299"
          asin="B07FQVZR7T"
          affiliateTag={AFFILIATE_TAG}
          badge="GenZ Favorite"
        />

        <h2>Aesthetic 3: The 'Main Character' Date Night</h2>
        <p>
          For late nights, romantic dinners, or when you are wearing your favorite slip dress, you need something bold, magnetic, and sweet. Clean linen won't cut it. You want dark berries, rich amber, jasmine, and warm musk that draw people closer as the evening cools down.
        </p>

        <AffiliateCard
          title="Bella Vita Luxury Date Woman EDP"
          description="A sophisticated, fruity-floral blend of red fruits, jasmine, and vanilla. It is warm, sweet, and projects beautifully in evening air. Smells incredibly expensive while being highly budget-friendly."
          price="₹299"
          asin="B08XCPMB7V"
          affiliateTag={AFFILIATE_TAG}
          badge="Date Night"
        />

        <h2>Aesthetic 4: The 'Old Money' Floral / Rich Girl</h2>
        <p>
          This is the vibe of high-quality fabrics, clean wellness, hair that smells like expensive salons, and fresh-cut flowers. The fragrance profile is crisp, natural, and botanical — like walking through a damp, blooming garden in the early morning. It feels fresh, regal, and premium.
        </p>

        <AffiliateCard
          title="Forest Essentials Nargis Body Mist"
          description="A luxurious body mist infused with pure steam-distilled Nargis (daffodil) essential oil. It is fresh, floral, and smells like botanical luxury. Perfect for spraying right out of the shower."
          price="₹1,495"
          asin="B0CC2XFD87"
          affiliateTag={AFFILIATE_TAG}
          badge="Luxury Mist"
        />

        <h2>The Secret to Longevity: The Hydration Trap</h2>

        <div className="fragrance-rule">
          <h4>How to Make It Last</h4>
          <p>
            Fragrance molecules cling to oil and moisture. If your skin is dry, it will drink up the alcohol carrier, and your perfume will fade within two hours. Always prep your pulse points (wrists, behind the ears, base of the neck) with a light dab of fragrance-free lotion or petroleum jelly (like Vaseline) before spraying. This creates a barrier that holds the fragrance oils, doubling your perfume's wear time.
          </p>
        </div>

        <div className="verdict-box">
          <p className="verdict-label">The Vibe Check</p>
          <p className="verdict-text">
            Don't limit yourself to one signature perfume for life. Style your scent like you style your clothes. Keep a clean skin-scent like Titan Nude for daytime meetings, a cozy gourmand like Vanilla Vibes for casual hangouts, and save Bella Vita Date for when you want to feel like the main character.
          </p>
        </div>

        <BlogFooterTools />
      </article>
    </main>
  );
}

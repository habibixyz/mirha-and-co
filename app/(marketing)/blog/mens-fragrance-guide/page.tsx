import type { Metadata } from "next";
import { AffiliateCard } from "@/components/AffiliateCard";
import BlogFooterTools from "@/components/BlogFooterTools";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata: Metadata = {
  title: "Your Cologne Game Is Holding You Back — Here's the Fix | Mirha & Co.",
  description: "Fragrance is the one thing people remember about you after you leave the room. The guide to picking a daytime scent, an evening scent, and using them correctly.",
  openGraph: {
    title: "Your Cologne Game Is Holding You Back — Here's the Fix",
    description: "Pick a daytime scent, a date-night scent, and keep a body spray for top-ups. Three products, properly used.",
  },
};

export default function FragranceDateNightGuidePage() {
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
          <span className="post-badge">Men's Grooming · Fragrance · Date Night</span>
          <h1 className="post-headline">
            Your Cologne Game Is Holding You Back
          </h1>
          <p className="post-stand">
            You can have the fit, the fade, the confidence — and still get overlooked because your scent game is an afterthought. Here's how to actually do it right.
          </p>
          <div className="post-meta">
            <span>June 2026</span>
            <span>5 min read</span>
            <span>Men's Grooming Edit</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">
        <p>
          Imagine this: You’ve ironed the shirt, matched the shoes, and cleaned up your beard. You step into the elevator, feeling like a million bucks. Ten seconds later, someone else walks in, takes one breath, and takes a step back. 
        </p>
        <p>
          You didn't smell bad in the traditional sense. You smelled like a walking chemical spill of cheap, gas-heavy deodorant sprayed directly onto dry sweat, hoping it would cover up a humid commute. It didn’t. In fact, it just broadcasted the panic. Scent is the most primal, direct path to human memory. If you aren't thinking about your fragrance strategy, you're leaving your first impression completely up to chance.
        </p>

        <div className="highlight-box">
          <p>"Scent shouldn’t announce you from across the street. It should be a discovery made when someone leans in. The rule is simple: be remembered, not survived."</p>
        </div>

        <h2>Daytime / The Daily Commute &amp; Office Run</h2>
        <p>
          The morning routine demands tact. When the sun is beating down and you are sitting in a conference room or classroom, you do not want to be wearing a heavy, cloying scent. Your body temperature rises throughout the day, which cooks the fragrance molecules and projects them. If you are wearing something heavy, you become a biohazard.
        </p>
        <p>
          For the daytime, you need crisp, aquatic, citrus, or clean linen profiles. Think of it as a clean white shirt in a bottle. You want notes that feel fresh, wake you up, and play well with a warm climate.
        </p>

        <AffiliateCard
          title="Wild Stone Edge Perfume"
          description="Built for daily wear. Compact size, balanced masculine fragrance. Won't announce yourself from across the hall — perfect for meetings or classrooms."
          price="₹204"
          asin="B07KS1ZKV3"
          affiliateTag={AFFILIATE_TAG}
          badge="Best Value"
        />

        <AffiliateCard
          title="Wild Stone Hydra Energy EDP"
          description="A bit more presence for daily wear. Energetic, fresh, aquatic profile. Works as well at the gym as it does at lunch. Long-lasting."
          price="₹349"
          asin="B06XVC9PN3"
          affiliateTag={AFFILIATE_TAG}
          badge="Top Seller"
        />

        <h2>Date Night / The Twilight Switch</h2>
        <p>
          Once the sun goes down, the rules change entirely. Date night calls for intimacy, warmth, and depth. Clean citrus doesn't work here — it feels too business-like, too detached. You want sweet tobacco, rich spices, amber, and warm woody notes.
        </p>
        <p>
          These are scents that don't shout. They linger on the skin, drawing people in. If a daytime scent is a clean shirt, an evening scent is a dark blazer. It's moody, interesting, and best experienced close up.
        </p>

        <AffiliateCard
          title="Beardo Whisky Smoke EDP"
          description="Spicy, woody, oudh-forward. Not a 'spray and hope' fragrance — this is a 'walk into the room and own it' fragrance. Built for long-lasting evening wear."
          price="₹480"
          asin="B096XV4HR4"
          affiliateTag={AFFILIATE_TAG}
          badge="Date Night"
        />

        <AffiliateCard
          title="Bombay Shaving Co. Mexico Perfume"
          description="Woody, long-lasting EDP that punches above its price point. The kind of scent people ask you about. Great depth for formal occasions and evenings."
          price="₹279"
          asin="B09KTNPSZL"
          affiliateTag={AFFILIATE_TAG}
          badge="Woody & Bold"
        />

        <h2>The Tactical Top-Up</h2>
        <p>
          Let’s be realistic: even the best fragrances lose their fight against heat and a long commute by 4 PM. Instead of spraying another heavy layer of perfume (which will just mix poorly with dust and sweat), use a light, no-gas body spray to reset. It’s light, clean, and acts as a cooling canvas rather than a scent bomb.
        </p>

        <AffiliateCard
          title="Beardo Don Most Wanted Body Spray"
          description="No-gas deo with aqua and citrus musk notes. Perfect as a midday top-up without clashing with whatever you sprayed in the morning."
          price="₹129"
          asin="B09KHF2BVD"
          affiliateTag={AFFILIATE_TAG}
          badge="Budget Pick"
        />

        <h2>The Rule Nobody Tells You</h2>

        <div className="fragrance-rule">
          <h4>The Layering Formula</h4>
          <p>
            Never apply fragrance to dry skin — it absorbs the oils and the scent fades in an hour. Apply a fragrance-free lotion first to lock it in. Spray on your pulse points (wrists, sides of the neck) from 6 inches away. Do not rub your wrists together — it breaks the top notes and ruins the scent profile. Just spray, let it dry, and walk out.
          </p>
        </div>

        <div className="verdict-box">
          <p className="verdict-label">Bottom Line</p>
          <p className="verdict-text">
            Stop treating fragrance like an afterthought you grab on your way out the door. Pick a daytime scent, pick an evening scent, and keep a body spray in your bag for top-ups. Three products, properly used, will outperform one expensive bottle sprayed wrong every single time.
          </p>
        </div>

        <BlogFooterTools />
      </article>
    </main>
  );
}

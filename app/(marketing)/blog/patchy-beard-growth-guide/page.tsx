import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateCard } from "@/components/AffiliateCard";
import BlogFooterTools from "@/components/BlogFooterTools";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata: Metadata = {
  title: "Patchy Beard? Here's How to Actually Fix It | Mirha & Co.",
  description: "Most beard patchiness isn't permanent — it's a circulation and follicle-health issue. The no-BS breakdown of beard growth oils that actually work, and the 4-step routine that moves the needle.",
  openGraph: {
    title: "Patchy Beard? Here's How to Actually Fix It",
    description: "Beard growth isn't magic, it's maintenance. The stack, the routine, and the minimum 90-day commitment explained.",
  },
};

export default function BeardGrowthGuidePage() {
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
        .routine-steps { list-style: none; margin: 1.5rem 0 2rem; padding: 0; display: flex; flex-direction: column; gap: 1rem; }
        .routine-step { display: flex; gap: 1rem; align-items: flex-start; padding: 1rem 1.2rem; background: #fffaf4; border: 1px solid #e8ded4; border-radius: 10px; }
        .routine-step-num { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; color: #7c6b4a; line-height: 1; min-width: 2rem; }
        .routine-step p { margin: 0; font-size: 0.95rem; color: #2c2826; line-height: 1.6; }
        .routine-step strong { display: block; font-weight: 700; margin-bottom: 0.2rem; }
        @media (max-width: 768px) { .post-hdr { padding: 3.5rem 1.5rem 2.5rem; } .post-body { padding: 2.5rem 1.5rem 4rem; } .nav-back { margin: 1rem 1.5rem; } }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">Men's Grooming · Beard Care · Growth Guide</span>
          <h1 className="post-headline">
            Patchy Beard? Here's How to Actually Fix It
          </h1>
          <p className="post-stand">
            Most patchiness isn't permanent — it's a circulation and follicle-health issue. The no-BS breakdown of beard growth oils that work, and the routine that moves the needle.
          </p>
          <div className="post-meta">
            <span>June 2026</span>
            <span>7 min read</span>
            <span>Men's Grooming Edit</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">
        <p>
          Let’s be honest. A patchy beard doesn’t make you look "rugged." It makes you look like you forgot to finish shaving, or like a lawn that’s missing half its grass. If you’ve spent weeks checking the mirror every morning, waiting for those bare spots on your cheeks to magically connect, you know the frustration. 
        </p>
        <p>
          But before you blame your genetics and shave it all off, you need to understand the science of hair growth. Unless you have actual scarring, those bare patches aren't "empty" space. They are filled with **dormant follicles** — tiny hair factories that are currently sleeping due to poor local blood flow, clogged pores, or a lack of nutrients. 
        </p>
        <p>
          Oils alone won't create hair where there is no follicle (only surgery can do that), but the right growth-focused oil, combined with a daily stimulation routine, can wake those sleeping follicles up. Here is the no-BS guide to fixing the patch.
        </p>

        <h2>The Growth Stack</h2>
        <p>You don't need a shelf full of products. You need one solid active oil and the discipline to commit to a 90-day routine.</p>

        <h3>1. The Growth Active (Redensyl-Forward)</h3>
        <p>
          If you want actual thickness, do not buy a generic grooming oil that only contains coconut or argan oil. Those are conditioners — they make existing hair soft, but they do nothing to stimulate new growth. Look for **Redensyl** (a compound clinically shown to boost hair density) mixed with carrier oils like Jojoba that mimic your skin's natural oils.
        </p>

        <AffiliateCard
          title="Ustraa Beard Growth Oil"
          description="Redensyl + 8 natural oils including jojoba and Vitamin E. Formulated for growth density, not just conditioning. Dermatologically tested."
          price="₹277"
          asin="B07CKPWJ6X"
          affiliateTag={AFFILIATE_TAG}
          badge="With Redensyl"
        />

        <h3>2. For Everyday Strength &amp; Volume</h3>
        <p>
          For general maintenance and strengthening the hair you already have, natural growth boosters like Amla, Almond oil, and Vitamin E are your go-to. They coat the hair shaft, making it look thicker and preventing the breakage that makes patchiness look worse.
        </p>

        <AffiliateCard
          title="Beardo Beard &amp; Hair Growth Oil"
          description="50ml growth oil with argan, jojoba, and vitamin E. Natural actives only. Promotes faster, thicker beard growth from the follicle up."
          price="₹492"
          asin="B01C8FM764"
          affiliateTag={AFFILIATE_TAG}
          badge="Bestseller"
        />

        <h3>3. Targeting Problem Zones</h3>
        <p>
          If you have one specific spot (like the connection between your mustache and chin) that refuses to grow, look for thyme-infused oils. Thyme is a natural circulation booster that warms the skin and draws blood flow directly to the surface.
        </p>

        <AffiliateCard
          title="The Man Company Beard Oil"
          description="Almond & thyme oil blend. Nourishes and strengthens patchy, uneven beards. Lightweight, non-greasy finish designed for problem zones."
          price="₹264"
          asin="B01J1KFWQG"
          affiliateTag={AFFILIATE_TAG}
          badge="Natural Formula"
        />

        <h3>4. The Onion Oil Option</h3>
        <p>
          It sounds strange, but onion oil is high in sulfur, which is a key building block of hair keratin. It’s highly effective for increasing follicle density, particularly for Indian skin types.
        </p>

        <AffiliateCard
          title="Bombay Shaving Co. Onion Beard Oil"
          description="10X nourishing oils in a Made-in-India formula. Onion oil is clinically associated with improved hair density. Great for Indian climate and skin type."
          price="₹248"
          asin="B07V4SQP9M"
          affiliateTag={AFFILIATE_TAG}
          badge="Trending"
        />

        <h3>5. Volume &amp; Shine</h3>
        <p>
          If you want a pleasant scent (like musk) without compromising on the nutrient density, look for multi-oil blends that include rosemary and jojoba.
        </p>

        <AffiliateCard
          title="Man Arden 7X Beard Oil"
          description="7 premium oils in one bottle. Good growth support, musk scent that doesn't smell like your dad's cabinet. No compromise on either front."
          price="₹399"
          asin="B077ZVQHCL"
          affiliateTag={AFFILIATE_TAG}
          badge="7 Premium Oils"
        />

        <h2>The 90-Day Routine</h2>
        <p>
          Beard growth is slow. Hair grows at a rate of roughly 1.25 cm per month. If you try an oil for a week and shave it off because "nothing happened," you wasted your money. You must commit to a 90-day window.
        </p>

        <ul className="routine-steps">
          <li className="routine-step">
            <span className="routine-step-num">01</span>
            <p><strong>Cleanse first</strong> — Apply oil only to a clean, damp beard. Damp skin absorbs product much better than dry, dusty skin.</p>
          </li>
          <li className="routine-step">
            <span className="routine-step-num">02</span>
            <p><strong>The Massage (Crucial)</strong> — Rub 4-6 drops of oil between your palms and massage it deeply into the skin of your cheeks and jaw. Do not just rub it on the surface hair. You need to stimulate blood flow to the follicles beneath.</p>
          </li>
          <li className="routine-step">
            <span className="routine-step-num">03</span>
            <p><strong>Brush it down</strong> — Use a wooden beard comb or a boar-bristle brush to distribute the oil evenly and keep the hairs pointing in the right direction. This also exfoliates the skin, removing dead cells that clog follicles.</p>
          </li>
          <li className="routine-step">
            <span className="routine-step-num">04</span>
            <p><strong>Be patient</strong> — Do not trim or shape the beard for the first 4 weeks. Let it grow wild so you can see exactly where your natural lines and patch boundaries are.</p>
          </li>
        </ul>

        <div className="verdict-box">
          <p className="verdict-label">The Real Takeaway</p>
          <p className="verdict-text">
            Nobody is born with a perfect beard. Most guys with full coverages just out-lasted the patchy phase. Pick one high-quality oil, do the massage step daily, and don't judge your face until you've hit 12 weeks of consistent routine.
          </p>
        </div>

        <BlogFooterTools />
      </article>
    </main>
  );
}

import { AffiliateCard } from "@/components/AffiliateCard";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata = {
  title: "Best Sunscreens in India (2026) | No-BS Guide for Indian Skin",
  description:
    "A realistic, India-focused guide to sunscreens that actually work. No hype. Just what makes sense for oily, dry, and acne-prone skin.",
};

export default function SunscreenPost() {
  return (
    <main>

      <style>{`
        .post-hdr { background: var(--black); padding: 6rem 2.5rem 4rem; }
        .post-hdr-inner { max-width: 780px; margin: 0 auto; }
        .post-badge { background: #c8473a; color: #fff; font-size: 0.6rem; letter-spacing: 0.2em; padding: 0.3rem 0.8rem; margin-bottom: 1.5rem; display:inline-block; }
        .post-headline { font-family: 'DM Serif Display', serif; font-size: 3rem; color: white; line-height: 1.1; }
        .post-stand { color: rgba(255,255,255,0.6); margin-top: 1rem; max-width: 600px; }
        .post-meta { margin-top: 1.5rem; font-size: 0.7rem; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; }

        .post-body { max-width: 780px; margin: 0 auto; padding: 4rem 2.5rem; }
        .post-body p { line-height: 1.9; margin-bottom: 1.5rem; color: #2c2826; }

        .highlight-box { background: var(--sand); padding: 1.5rem; border-left: 4px solid #c8473a; margin: 2rem 0; font-style: italic; }

        .pnum { background: #c8473a; color: white; width: 3rem; height: 3rem; display:flex; align-items:center; justify-content:center; margin:2rem 0 0.5rem; font-family: 'Bebas Neue', sans-serif; }

        .verdict-box { background: var(--black); color: white; padding: 2rem; margin-top: 3rem; }

        .nav-back { display: block; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; margin: 1.5rem 2.5rem; }
        .nav-back:hover { color: var(--rose); }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">BEAUTY</span>
          <h1 className="post-headline">
            Best Sunscreens in India (2026)<br />That Actually Make Sense
          </h1>
          <p className="post-stand">
            Not the most hyped. Not the most expensive. Just sunscreens that actually work in Indian weather.
          </p>
          <div className="post-meta">
            March 2026 · 6 min read · Contains affiliate links
          </div>
        </div>
      </header>

      <article className="post-body">

        {/* INTRO */}
        <p>
          Let’s get one thing clear — Indian skin doesn’t burn easily.  
          But that doesn’t mean it’s protected.
        </p>

        <p>
          The real issue isn’t sunburn. It’s pigmentation.  
          Acne marks that don’t fade. Uneven tone that keeps coming back.
        </p>

        <p>
          And in Indian weather — where UV exposure is almost constant —  
          this adds up faster than most people realise.
        </p>

        <div className="highlight-box">
          Sunscreen won’t transform your skin overnight — but it will stop things from getting worse.
        </div>

        <h2>The Picks (What Actually Works)</h2>

        {/* 1 */}
        <div className="pnum">01</div>
        <h3>UV Doux Silicone Sunscreen — If You Have Oily Skin</h3>

        <p>
          Most sunscreens fail for oily skin because they feel heavy.  
          This one doesn’t.
        </p>

        <p>
          It has a silicone-gel texture, sits matte on the skin, and doesn’t clog pores easily.  
          That’s why dermatologists in India recommend it a lot.
        </p>

        <AffiliateCard
          title="UV Doux Silicone Sunscreen Gel SPF 50"
          asin="B01FS8F19S"
          affiliateTag={AFFILIATE_TAG}
          price="₹700"
          badge="Oily Skin"
        />

        <p>
          If your sunscreen makes you greasy by noon — this is probably the fix.
        </p>

        {/* 2 */}
        <div className="pnum">02</div>
        <h3>Bioderma Photoderm — If Your Skin Feels Dry</h3>

        <p>
          Dry skin and sunscreen usually don’t get along.  
          Either it pills, or it feels tight.
        </p>

        <p>
          This one leans more hydrating — and works better for normal to dry skin types.
        </p>

        <AffiliateCard
          title="Bioderma Photoderm SPF 50+"
          asin="B001COZ48G"
          affiliateTag={AFFILIATE_TAG}
          price="₹1200+"
          badge="Dry Skin"
        />

        <p>
          It’s not lightweight — but that’s exactly why dry skin tends to prefer it.
        </p>

        {/* 3 */}
        <div className="pnum">03</div>
        <h3>Heliocare 360 — If Pigmentation Is Your Main Concern</h3>

        <p>
          If your issue is dark spots or uneven tone — regular sunscreen sometimes isn’t enough.
        </p>

        <p>
          This one is more targeted towards pigmentation control and higher protection coverage.
        </p>

        <AffiliateCard
          title="Heliocare 360 Pigment Solution SPF 50+"
          asin="B089DCX619"
          affiliateTag={AFFILIATE_TAG}
          price="₹2000+"
          badge="Pigmentation"
        />

        <p>
          Expensive — but makes more sense if you’re actively dealing with melasma or marks.
        </p>

        {/* 4 */}
        <div className="pnum">04</div>
        <h3>Dot & Key Vitamin C Sunscreen — If You Want a Glow</h3>

        <p>
          Not everyone wants a matte finish.  
          Some people want their sunscreen to actually look good on skin.
        </p>

        <p>
          This one gives a slight glow and feels more like skincare than sunscreen.
        </p>

        <AffiliateCard
          title="Dot & Key Vitamin C Sunscreen"
          asin="B0BLK4YRSN"
          affiliateTag={AFFILIATE_TAG}
          price="₹500"
          badge="Glow"
        />

        <p>
          Good everyday option if you don’t like “sunscreen feel”.
        </p>

        {/* 5 */}
        <div className="pnum">05</div>
        <h3>Lacto Calamine Sunscreen — Budget, But Works</h3>

        <p>
          You don’t need to spend ₹1500 to use sunscreen daily.
        </p>

        <p>
          This is simple, affordable, and works well for oily skin.
        </p>

        <AffiliateCard
          title="Lacto Calamine Sunscreen SPF 50"
          asin="B0CTTQQ8BT"
          affiliateTag={AFFILIATE_TAG}
          price="₹300"
          badge="Budget"
        />

        <p>
          Not perfect — but consistent use matters more than perfection.
        </p>

        {/* END */}
        <div className="verdict-box">
          Sunscreen isn’t about finding the “best” one.  
          It’s about finding one you won’t skip.
        </div>

      </article>
    </main>
  );
}
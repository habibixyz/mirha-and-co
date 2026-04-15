"use client";

import { useState } from "react";
import { AffiliateCard } from "@/components/AffiliateCard";
import ProductModal from "@/components/ProductModal";

const AFFILIATE_TAG = "skinwithtanvi-21";


export default function GiftGuidePost() {
  return (
    <main>
      <style>{`
        .post-hdr { background: var(--black); padding: 6rem 2.5rem 4rem; position: relative; overflow: hidden; }
        .post-hdr::before { content: 'GIFTS'; position: absolute; bottom: -2rem; right: -1rem; font-family: 'Bebas Neue', sans-serif; font-size: 12rem; color: rgba(255,255,255,0.03); line-height: 1; pointer-events: none; }
        .post-hdr-inner { max-width: 780px; margin: 0 auto; position: relative; z-index: 1; }
        .post-badge { display: inline-block; background: #7c6b4a; color: #fff; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500; padding: 0.3rem 0.8rem; margin-bottom: 1.8rem; font-family: 'DM Sans', sans-serif; }
        .post-headline { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.6rem); color: var(--white); line-height: 1.08; margin-bottom: 1.5rem; }
        .post-stand { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.05rem; color: rgba(255,255,255,0.55); line-height: 1.75; margin-bottom: 2rem; max-width: 620px; }
        .post-meta { display: flex; align-items: center; gap: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.12); font-size: 0.68rem; color: rgba(255,255,255,0.35); letter-spacing: 0.12em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; flex-wrap: wrap; }
        .post-body { max-width: 780px; margin: 0 auto; padding: 4rem 2.5rem 6rem; }
        .post-body p { font-size: 1rem; line-height: 1.9; color: #2c2826; margin-bottom: 1.6rem; font-family: 'DM Sans', sans-serif; }
        .post-body h2 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.05em; color: var(--black); margin: 3.5rem 0 1rem; padding-top: 3rem; border-top: 2px solid var(--rule); }
        .post-body h3 { font-family: 'DM Serif Display', serif; font-size: 1.3rem; font-style: italic; margin: 2rem 0 0.7rem; color: var(--ink); }
        .highlight-box { background: var(--sand); border-left: 4px solid #7c6b4a; padding: 1.5rem 2rem; margin: 2rem 0; }
        .highlight-box p { margin-bottom: 0; font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.1rem; color: var(--ink); line-height: 1.6; }
        .pnum { display: inline-flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; background: #7c6b4a; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; margin-bottom: 0.8rem; }
        .verdict-box { background: var(--black); padding: 2.5rem; margin: 2.5rem 0; }
        .verdict-label { font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; letter-spacing: 0.1em; color: #7c6b4a; margin-bottom: 1rem; }
        .verdict-text { font-size: 0.95rem; color: rgba(255,255,255,0.75); line-height: 1.8; font-family: 'DM Sans', sans-serif; }
        .nav-back { display: block; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; margin: 1.5rem 2.5rem; font-family: 'DM Sans', sans-serif; }
        .nav-back:hover { color: var(--rose); }
        @media (max-width: 768px) { .post-hdr { padding: 3.5rem 1.5rem 2.5rem; } .post-body { padding: 2.5rem 1.5rem 4rem; } .nav-back { margin: 1rem 1.5rem; } }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">Lifestyle · Gift Guide</span>
          <h1 className="post-headline">
            Gift Guide for the Woman<br />Who Has Everything
          </h1>
          <p className="post-stand">
            She already owns everything practical. The solution isn't spending
            more — it's choosing something she wants but would never justify
            buying for herself. All on Amazon India.
          </p>
          <div className="post-meta">
            <span>Feb 2026</span>
            <span>7 min read</span>
            <span>Curated picks</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">

        <p>
          You know the one. She has good taste. She already owns the candles,
          the skincare, the nice stationery. She'll politely love whatever you
          give her and quietly never use it. Shopping for her feels impossible
          because anything obvious she's already bought for herself.
        </p>

        <p>
          The trick isn't to spend more. It's to find the thing she genuinely
          wants but keeps putting off — because it feels indulgent, or she
          can't justify the price, or she just never gets around to it. These
          three gifts all fit that brief. All available on Amazon India.
          All chosen for women with actual taste.
        </p>

        <div className="highlight-box">
          <p>
            The best gift is the one she wanted but wouldn't buy for herself.
            That's the only brief that matters.
          </p>
        </div>

        <h2>The Picks</h2>

        <div className="pnum">01</div>
        <h3>The Upgrade She Keeps Putting Off — Silk Pillowcase</h3>
        <p>
          Every woman with any interest in skincare or haircare has thought
          about switching to a silk pillowcase. Almost none of them have done
          it, because it feels like an extravagance they can't justify for
          themselves. This is exactly why it makes a perfect gift.
        </p>
        <p>
          The benefits are real — silk reduces friction on hair (less breakage,
          fewer tangles overnight) and causes fewer sleep creases on skin
          compared to cotton. It's also cooler in Indian summers. The experience
          of sleeping on silk is noticeably different within the first night.
          She'll use this every single day.
        </p>

        <AffiliateCard
          title="Silk Pillowcase — Both Sides Mulberry Silk"
          description="Mulberry silk pillowcase with envelope closure. Reduces hair breakage and friction overnight. Cooler than cotton in Indian summers. One of those upgrades that sounds like a luxury and turns out to be genuinely functional. Available in multiple colours on Amazon India."
          price="₹1,299"
          asin="B0F2T5FS7Q"
          affiliateTag={AFFILIATE_TAG}
          badge="Top Pick"
        />

        <div className="pnum">02</div>
        <h3>The Ritual Object — Rose Quartz Gua Sha</h3>
        <p>
          Gua sha has moved firmly from trend to mainstream — and for good
          reason. Used correctly for 3–5 minutes after applying facial oil
          or serum, it reduces puffiness (especially in the morning), releases
          jaw and facial tension, and improves circulation. The rose quartz
          stays cool to the touch, which is particularly nice in Indian summers.
        </p>
        <p>
          It's also simply a beautiful object. It looks intentional on a
          bathroom shelf. For someone who takes their skincare seriously,
          this is a tool they'll actually use — not a decoration.
        </p>

        <AffiliateCard
          title="Rose Quartz Gua Sha Facial Tool"
          description="Natural rose quartz gua sha with smooth contoured edges for facial massage. Reduces puffiness, improves circulation, and releases facial tension. Use with 2–3 drops of facial oil in upward strokes for 3–5 minutes. Comes in a gift-ready box — one of the best sub-₹1000 beauty gifts available."
          price="₹599"
          asin="B0CPSK868C"
          affiliateTag={AFFILIATE_TAG}
          badge="Best Under ₹600"
        />

        <div className="pnum">03</div>
        <h3>The Classic She Deserves — L'Occitane Shea Hand Cream</h3>
        <p>
          L'Occitane's Shea Butter Hand Cream is one of those rare products
          that has maintained its reputation for decades without needing
          reinvention. 20% shea butter. A scent that is universally loved.
          Packaging that feels luxurious without being excessive. It's been
          a gifting staple globally for years — and for good reason.
        </p>
        <p>
          In India especially, where frequent handwashing and air conditioning
          dry hands out significantly, a genuinely good hand cream is something
          most women appreciate but rarely prioritise for themselves. This is
          the one worth giving.
        </p>

        <AffiliateCard
          title="L'Occitane Shea Butter Hand Cream — 30ml"
          description="20% shea butter hand cream with a signature Provence scent. Intensely nourishing without being greasy. The 30ml size is perfect for a handbag — she'll use it every day. One of the most consistently loved luxury hand creams available on Amazon India. A classic for a reason."
          price="₹1,450"
          asin="B002U0KUTE"
          affiliateTag={AFFILIATE_TAG}
          badge="Timeless Gift"
        />

        <h2>The Gifting Principle</h2>

        <p>
          Notice what these three have in common — they're all things she uses
          every day (pillow, skincare ritual, hand cream), all things she's
          probably thought about but not bought for herself, and none of them
          require knowing her exact taste in clothes or her perfume preferences.
          They're universally appreciated by women who care about how they
          take care of themselves.
        </p>

        <div className="verdict-box">
          <p className="verdict-label">The Rule for Gifting Well</p>
          <p className="verdict-text">
            Find the thing she wants but won't justify buying for herself.
            Not the thing she needs — she's already bought that. The indulgence
            she keeps skipping because something more practical always comes first.
            That's the gift. These three all qualify.
          </p>
        </div>

      </article>
    </main>
  );
}

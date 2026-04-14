"use client";

import { useState } from "react";
import { AffiliateCard } from "@/components/AffiliateCard";
import ProductModal from "@/components/ProductModal";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata = {
  title: "8 Amazon India Buys That Changed How I Live at Home | Mirha & Co.",
  description: "Small home upgrades under ₹1500 that make a real difference to daily life. All curated and available on Amazon India.",
};

export default function AmazonHomeBuysPost() {
  return (
    <main>
      <style>{`
        .post-hdr { background: var(--black); padding: 6rem 2.5rem 4rem; position: relative; overflow: hidden; }
        .post-hdr::before { content: 'HOME'; position: absolute; bottom: -2rem; right: -1rem; font-family: 'Bebas Neue', sans-serif; font-size: 14rem; color: rgba(255,255,255,0.03); line-height: 1; pointer-events: none; }
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
          <span className="post-badge">Lifestyle · Home</span>
          <h1 className="post-headline">
            8 Amazon India Buys That Changed<br />How I Live at Home
          </h1>
          <p className="post-stand">
            Small upgrades. Massive difference to daily life.
            None of them cost a fortune — all available on Amazon India.
          </p>
          <div className="post-meta">
            <span>Jan 2026</span>
            <span>6 min read</span>
            <span>Curated picks</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">

        <p>
          The best home upgrades are the ones you stop noticing within a week —
          not because they stopped working, but because they've become the new
          normal. Your baseline shifts. You genuinely can't remember what it
          was like before.
        </p>

        <p>
          These four things crossed that threshold. None are expensive. All are
          on Amazon India. All solve small daily frictions that add up more
          than you'd expect across a week, a month, a year.
        </p>

        <div className="highlight-box">
          <p>
            A small friction removed every morning compounds across a year
            into something that genuinely changes how your day starts.
          </p>
        </div>

        <h2>The Picks</h2>

        <div className="pnum">01</div>
        <h3>The Organiser That Ended Morning Chaos</h3>
        <p>
          If your bedside table or desk currently has your phone, charger,
          glasses, lip balm, a book, and several things you can't immediately
          name — a bamboo organiser tray is the fastest way to introduce order.
          Everything gets a defined place. The morning search for your glasses
          before you can even see properly stops immediately. Bamboo looks
          genuinely clean and doesn't warp in Indian humidity like cheaper
          materials do.
        </p>

        <AffiliateCard
          title="Bamboo Desk & Bedside Organiser Tray"
          description="Multi-compartment bamboo tray for bedside table, desk, or bathroom counter. Keeps daily essentials visible and organised — phone, charger, skincare, keys, whatever you reach for first. Moisture-resistant, durable, and neutral enough to fit any room."
          price="₹649"
          asin="B0CG6CVRXR"
          affiliateTag={AFFILIATE_TAG}
          badge="Most Underrated"
        />

        <div className="pnum">02</div>
        <h3>The Frother That Makes Home Coffee Worth It</h3>
        <p>
          If you drink chai or coffee at home every morning, a handheld milk
          frother changes the experience entirely. Frothed milk takes 15 seconds.
          The result is noticeably better — creamier, more café-like, and
          genuinely more enjoyable to drink. It costs less than two coffee
          shop visits and lasts for years. Worth getting a rechargeable one
          over battery-operated — a dead battery at 7am is not the problem
          you want.
        </p>

        <AffiliateCard
          title="Handheld Electric Milk Frother — Rechargeable"
          description="Rechargeable handheld frother for chai, coffee, matcha, and protein shakes. Creates thick, café-quality foam in under 20 seconds. Compact, easy to clean, and one charge lasts weeks. One of the highest-rated kitchen tools under ₹1000 on Amazon India."
          price="₹599"
          asin="B0C8JC595G"
          affiliateTag={AFFILIATE_TAG}
          badge="Daily Use"
        />

        <div className="pnum">03</div>
        <h3>Linen Pillowcases — The Upgrade You Feel Immediately</h3>
        <p>
          Linen breathes significantly better than cotton — cooler in summer,
          warmer in winter, and it softens with every wash rather than going
          rough. In Indian summers especially, the temperature difference when
          you first put your head down is immediately noticeable. This sounds
          indulgent until you try it, after which it seems completely obvious.
          Also genuinely good for hair — less friction overnight than cotton.
        </p>

        <AffiliateCard
          title="Linen Pillowcase Set of 2 — 100% Natural Linen"
          description="Pure linen pillowcases that get softer with every wash. Breathes better than cotton — stays cooler through Indian summers. Standard size, set of 2. One of those upgrades that improves sleep quality without requiring any effort or habit change."
          price="₹1,299"
          asin="B0F2T5FS7Q"
          affiliateTag={AFFILIATE_TAG}
          badge="Sleep Upgrade"
        />

        <div className="pnum">04</div>
        <h3>Chalkboard Labels — The 20-Minute Kitchen Transformation</h3>
        <p>
          Label your pantry jars. It sounds trivial. It isn't. When everything
          is labelled, you actually put things back where they belong because
          the place is clearly defined. The kitchen stays organised because the
          system is visible and self-enforcing. Chalkboard labels with a white
          chalk marker look clean, stick reliably on glass and ceramic, and are
          fully rewritable. Takes 20 minutes once and lasts indefinitely.
        </p>

        <AffiliateCard
          title="Chalkboard Labels with White Chalk Marker — 45 Pack"
          description="Waterproof chalkboard sticker labels with white chalk marker included. Stick to glass jars, containers, baskets, and bottles. Fully erasable and rewritable — change labels anytime without leaving residue. The simplest possible pantry organisation system."
          price="₹349"
          asin="B07Z3S4D58"
          affiliateTag={AFFILIATE_TAG}
        />

        <div className="verdict-box">
          <p className="verdict-label">The Pattern</p>
          <p className="verdict-text">
            Every item here removes a small daily friction. The frother means
            your morning drink is better without extra effort. The tray means
            you stop starting every day searching for something. The pillowcases
            mean you sleep cooler without doing anything differently. The labels
            mean your kitchen stays tidy because the system enforces itself.
            Small individually — but cumulative across every single day.
          </p>
        </div>

      </article>
    </main>
  );
}

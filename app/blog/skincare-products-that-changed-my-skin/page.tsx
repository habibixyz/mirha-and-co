import { AffiliateCard } from "@/components/AffiliateCard";

const AFFILIATE_TAG = "mirhaandco-20"; // ← replace with your Amazon Associates tag

export const metadata = {
  title: "The 12 Skincare Products That Actually Changed My Skin | Mirha & Co.",
  description:
    "After years of testing everything, these are the only products still on my shelf. All available on Amazon.",
};

export default function SkincarePost() {
  return (
    <main>
      <style>{`
        .post-header {
          background: var(--black);
          padding: 6rem 2.5rem 4rem;
          position: relative;
          overflow: hidden;
        }
        .post-header::before {
          content: 'BEAUTY';
          position: absolute;
          bottom: -2rem;
          right: -1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14rem;
          color: rgba(255,255,255,0.04);
          line-height: 1;
          pointer-events: none;
        }
        .post-header-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .post-cat {
          display: inline-block;
          background: var(--rose);
          color: var(--white);
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 0.3rem 0.8rem;
          margin-bottom: 1.8rem;
        }
        .post-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 5vw, 3.8rem);
          color: var(--white);
          line-height: 1.08;
          margin-bottom: 1.5rem;
        }
        .post-standfirst {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.75;
          margin-bottom: 2rem;
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          max-width: 600px;
        }
        .post-meta-bar {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.12);
          font-size: 0.68rem;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .post-meta-bar span + span::before {
          content: '·';
          margin-right: 2rem;
        }

        .post-body {
          max-width: 780px;
          margin: 0 auto;
          padding: 4rem 2.5rem 6rem;
        }
        .post-body p {
          font-size: 1rem;
          line-height: 1.9;
          color: #2c2826;
          margin-bottom: 1.6rem;
        }
        .post-body h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          letter-spacing: 0.05em;
          color: var(--black);
          margin: 3.5rem 0 1rem;
          padding-top: 3.5rem;
          border-top: 2px solid var(--rule);
        }
        .post-body h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.4rem;
          font-style: italic;
          margin: 2.5rem 0 0.8rem;
          color: var(--ink);
        }
        .post-body blockquote {
          background: var(--sand);
          border-left: 4px solid var(--rose);
          margin: 2.5rem 0;
          padding: 1.5rem 2rem;
        }
        .post-body blockquote p {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          font-style: italic;
          color: var(--ink);
          margin-bottom: 0;
          line-height: 1.5;
        }
        .product-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: var(--rose);
          color: var(--white);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }
        .verdict-box {
          background: var(--sand);
          border: 1px solid var(--rule);
          padding: 1.5rem 2rem;
          margin: 2rem 0;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .verdict-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .verdict-text {
          font-size: 0.85rem;
          color: var(--ink);
          line-height: 1.6;
        }
        .verdict-text strong { font-weight: 500; }

        .nav-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          transition: color 0.2s;
          margin: 1.5rem 2.5rem;
          display: block;
        }
        .nav-back:hover { color: var(--rose); }

        @media (max-width: 768px) {
          .post-header { padding: 3.5rem 1.5rem 2.5rem; }
          .post-body { padding: 2.5rem 1.5rem 4rem; }
          .nav-back { margin: 1rem 1.5rem; }
        }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      {/* HEADER */}
      <header className="post-header">
        <div className="post-header-inner">
          <span className="post-cat">Beauty</span>
          <h1 className="post-headline">
            The 12 Skincare Products<br />
            That Actually Changed My Skin
          </h1>
          <p className="post-standfirst">
            After years of testing everything, these are the only products still on my shelf.
            All available on Amazon. All worth every rupee.
          </p>
          <div className="post-meta-bar">
            <span>March 2026</span>
            <span>8 min read</span>
            <span>By Mirha</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      {/* BODY */}
      <article className="post-body">

        <p>
          I have spent an embarrassing amount of money on skincare. Serums that promised everything
          and delivered nothing. Moisturisers that felt incredible for a week and then broke me out.
          SPFs that left a white cast so severe I looked like I was auditioning for a period drama.
        </p>

        <p>
          This list is what survived. These are the products that made it through two years of
          daily use, moved with me twice, and still earn their space on a very small bathroom shelf.
          Everything is on Amazon. Everything is linked. The prices are what I actually paid.
        </p>

        <blockquote>
          <p>
            Good skincare is not about having twelve steps. It's about having the right three.
          </p>
        </blockquote>

        {/* ── PRODUCT 1 ── */}
        <h2>Cleansers</h2>

        <div className="product-number">01</div>
        <h3>The Oil Cleanser That Doesn't Strip</h3>

        <p>
          Oil cleansing changed everything for me. I was using a foaming cleanser that left
          my skin squeaky clean — which, as it turns out, is exactly the problem. Squeaky clean
          means stripped. This oil cleanser removes sunscreen, makeup, and pollution without
          touching your moisture barrier.
        </p>

        <AffiliateCard
          title="Banila Co Clean It Zero Cleansing Balm"
          description="A cult Korean cleansing balm that melts into an oil on contact. Removes even waterproof SPF without tugging. Rinses clean with water. Fragrance-free version available. I've repurchased this four times."
          price="₹1,299"
          asin="B00QDCVWUU"
          affiliateTag={AFFILIATE_TAG}
          badge="Editor's Pick"
        />

        <div className="verdict-box">
          <span className="verdict-icon">✓</span>
          <p className="verdict-text">
            <strong>Verdict:</strong> Use this as your first cleanse (the one that removes makeup and SPF),
            followed by a gentle water-based cleanser. The double cleanse sounds like extra work —
            it takes 90 seconds and it's worth it.
          </p>
        </div>

        {/* ── PRODUCT 2 ── */}
        <h2>Serums</h2>

        <div className="product-number">02</div>
        <h3>The Vitamin C That Actually Works</h3>

        <p>
          Vitamin C is the one serum category where price genuinely correlates with efficacy.
          Cheap vitamin C oxidises fast, stings, and can cause more inflammation than it solves.
          The formulation matters enormously — the percentage, the form of vitamin C, and the pH.
          This one gets all three right.
        </p>

        <AffiliateCard
          title="TruSkin Vitamin C Serum"
          description="15% Vitamin C with hyaluronic acid and vitamin E. Stable formulation that doesn't oxidise quickly. Brightens in 3–4 weeks of consistent use. Apply in the morning before SPF. Widely available on Amazon India."
          price="₹2,100"
          asin="B01M0XNEKZ"
          affiliateTag={AFFILIATE_TAG}
          badge="Best Value"
        />

        <div className="verdict-box">
          <span className="verdict-icon">✓</span>
          <p className="verdict-text">
            <strong>Verdict:</strong> Morning only. SPF after. Store in a cool, dark place.
            If it turns orange, it's oxidised — replace it. A bottle lasts me about 3 months.
          </p>
        </div>

        {/* ── PRODUCT 3 ── */}
        <div className="product-number">03</div>
        <h3>The Niacinamide That Fixed My Pores</h3>

        <p>
          Niacinamide (vitamin B3) is the most evidence-backed ingredient in skincare after
          retinol and SPF. It minimises the appearance of pores, regulates sebum, fades
          hyperpigmentation, and strengthens the skin barrier. It's also one of the most
          affordable actives you can buy. This is the one I recommend to everyone starting out.
        </p>

        <AffiliateCard
          title="The Ordinary Niacinamide 10% + Zinc 1%"
          description="The gold-standard niacinamide serum. 10% concentration with zinc to control sebum. Fragrance-free, suitable for all skin types. Apply after cleansing, before heavier serums. One of the best value skincare products ever made."
          price="₹699"
          asin="B06WZJKJSW"
          affiliateTag={AFFILIATE_TAG}
          badge="Most Affordable"
        />

        <p>
          I'll publish the remaining 9 products across the next few weeks — including the
          retinol I swear by, the SPF I've finally stopped resenting, and the eye cream
          that actually does something.
        </p>

        <p>
          In the meantime: start with these three. Cleanser. Vitamin C. Niacinamide.
          That's a complete routine that will do more than most 10-step systems.
        </p>

      </article>
    </main>
  );
}

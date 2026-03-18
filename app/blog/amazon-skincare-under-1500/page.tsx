import { AffiliateCard } from "@/components/AffiliateCard";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata = {
  title: "Best Skincare Products Under ₹1500 on Amazon India | Mirha & Co.",
  description: "Dermatologist-approved skincare finds under ₹1500 on Amazon India. Budget doesn't mean compromise — these products prove it.",
};

export default function AmazonSkincarePost() {
  return (
    <main>
      <style>{`
        .post-hdr { background: var(--black); padding: 6rem 2.5rem 4rem; position: relative; overflow: hidden; }
        .post-hdr::before { content: 'BEAUTY'; position: absolute; bottom: -2rem; right: -1rem; font-family: 'Bebas Neue', sans-serif; font-size: 12rem; color: rgba(255,255,255,0.03); line-height: 1; pointer-events: none; }
        .post-hdr-inner { max-width: 780px; margin: 0 auto; position: relative; z-index: 1; }
        .post-badge { display: inline-block; background: var(--rose); color: #fff; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500; padding: 0.3rem 0.8rem; margin-bottom: 1.8rem; font-family: 'DM Sans', sans-serif; }
        .post-headline { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.6rem); color: var(--white); line-height: 1.08; margin-bottom: 1.5rem; }
        .post-stand { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.05rem; color: rgba(255,255,255,0.55); line-height: 1.75; margin-bottom: 2rem; max-width: 620px; }
        .post-meta { display: flex; align-items: center; gap: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.12); font-size: 0.68rem; color: rgba(255,255,255,0.35); letter-spacing: 0.12em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; flex-wrap: wrap; }
        .post-body { max-width: 780px; margin: 0 auto; padding: 4rem 2.5rem 6rem; }
        .post-body p { font-size: 1rem; line-height: 1.9; color: #2c2826; margin-bottom: 1.6rem; font-family: 'DM Sans', sans-serif; }
        .post-body h2 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.05em; color: var(--black); margin: 3.5rem 0 1rem; padding-top: 3rem; border-top: 2px solid var(--rule); }
        .post-body h3 { font-family: 'DM Serif Display', serif; font-size: 1.3rem; font-style: italic; margin: 2rem 0 0.7rem; color: var(--ink); }
        .post-body ul { margin: 0 0 1.6rem 1.2rem; padding: 0; }
        .post-body ul li { font-size: 0.95rem; line-height: 1.8; color: #2c2826; margin-bottom: 0.4rem; font-family: 'DM Sans', sans-serif; padding-left: 0.5rem; }
        .post-body ul li::marker { color: var(--rose); }
        .highlight-box { background: var(--sand); border-left: 4px solid var(--rose); padding: 1.5rem 2rem; margin: 2rem 0; }
        .highlight-box p { margin-bottom: 0; font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.1rem; color: var(--ink); line-height: 1.6; }
        .pnum { display: inline-flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; background: var(--rose); color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; margin-bottom: 0.8rem; }
        .verdict-box { background: var(--black); padding: 2.5rem; margin: 2.5rem 0; }
        .verdict-label { font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; letter-spacing: 0.1em; color: var(--rose); margin-bottom: 1rem; }
        .verdict-text { font-size: 0.95rem; color: rgba(255,255,255,0.75); line-height: 1.8; font-family: 'DM Sans', sans-serif; }
        .nav-back { display: block; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; margin: 1.5rem 2.5rem; font-family: 'DM Sans', sans-serif; }
        .nav-back:hover { color: var(--rose); }
        @media (max-width: 768px) { .post-hdr { padding: 3.5rem 1.5rem 2.5rem; } .post-body { padding: 2.5rem 1.5rem 4rem; } .nav-back { margin: 1rem 1.5rem; } }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">Beauty · Skincare</span>
          <h1 className="post-headline">
            Best Skincare Finds Under ₹1500<br />on Amazon India
          </h1>
          <p className="post-stand">
            Budget doesn't mean compromise. These are the dermatologist-recommended
            products that prove effective skincare doesn't need a luxury price tag.
          </p>
          <div className="post-meta">
            <span>March 2026</span>
            <span>6 min read</span>
            <span>Research-based</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">

        <p>
          There's a persistent myth in Indian skincare that effective products
          have to be expensive. Walk into any Nykaa or browse Amazon and you'll
          find ₹4,000 serums sitting next to ₹500 ones with nearly identical
          active ingredients. The difference is usually packaging, brand markup,
          and marketing — not efficacy.
        </p>

        <p>
          The products on this list were chosen based on one criterion: does the
          ingredient list justify the recommendation? All three are under ₹1500,
          all are available on Amazon India, and all are consistently recommended
          by dermatologists for Indian skin concerns.
        </p>

        <div className="highlight-box">
          <p>
            The most effective skincare routine is the one you can afford to
            do every single day, without exception. Consistency beats luxury.
          </p>
        </div>

        <h2>The Budget Picks</h2>

        <div className="pnum">01</div>
        <h3>Best Serum for Oily & Acne-Prone Skin</h3>
        <p>
          Niacinamide 10% with Zinc is the gold-standard combination for oily,
          acne-prone skin — and this is one of the cleanest formulations
          available in India at this price point. Controls sebum, minimises
          pores, fades post-acne marks, and strengthens the skin barrier.
          Fragrance-free and suitable for daily use.
        </p>

        <AffiliateCard
          title="Niacinamide 10% + Zinc 1% Brightening Serum — 30ml"
          description="10% niacinamide with zinc — the most clinically backed combination for oily and blemish-prone Indian skin. Targets sebum control, open pores, and post-acne pigmentation. Fragrance-free, lightweight, and absorbs quickly. One of the best-value active serums on Amazon India right now."
          price="₹549"
          asin="B0GR1FZ3GN"
          affiliateTag={AFFILIATE_TAG}
          badge="Best for Oily Skin"
        />

        <div className="pnum">02</div>
        <h3>Best Moisturiser for Oily & Combination Skin</h3>
        <p>
          CeraVe is one of the most dermatologist-recommended skincare brands
          globally — and their Oil Control Gel Cream is specifically formulated
          for oily and combination skin. Three essential ceramides, hyaluronic
          acid, and niacinamide in a lightweight gel texture that doesn't feel
          heavy in Indian humidity. Non-comedogenic, fragrance-free, and
          developed with dermatologists.
        </p>

        <AffiliateCard
          title="CeraVe Oil Control Gel Cream — 52ml"
          description="Lightweight gel moisturiser with ceramides, hyaluronic acid, and niacinamide. Specifically formulated for oily and combination skin — absorbs fast, no greasy residue, and works in Indian heat and humidity. Dermatologist-developed and one of the most recommended moisturisers for acne-prone skin."
          price="₹899"
          asin="B0CTTV91Z6"
          affiliateTag={AFFILIATE_TAG}
          badge="Dermatologist Pick"
        />

        <div className="pnum">03</div>
        <h3>Best for Dark Spots & Pigmentation</h3>
        <p>
          Alpha Arbutin is one of the most effective brightening ingredients
          available — gentler than hydroquinone, more stable than Vitamin C,
          and well-tolerated by sensitive skin. The Ordinary's 2% formula
          combined with hyaluronic acid targets dark spots, post-acne marks,
          and sun damage. Particularly effective on Indian skin where
          hyperpigmentation from acne and sun exposure is common.
        </p>

        <AffiliateCard
          title="The Ordinary Alpha Arbutin 2% + HA — 30ml"
          description="2% alpha arbutin with hyaluronic acid. Targets dark spots, post-acne marks, and hyperpigmentation. Gentler and more stable than most brightening actives. Fragrance-free and suitable for all skin types including sensitive. Apply in the evening before moisturiser for best results."
          price="₹1,199"
          asin="B06XCZFCFZ"
          affiliateTag={AFFILIATE_TAG}
          badge="Best for Dark Spots"
        />

        <h2>How to Use These Together</h2>

        <p>
          These three products work as a complete routine for oily, acne-prone
          skin with pigmentation concerns — which describes a large majority of
          Indian skin types:
        </p>

        <ul>
          <li><strong>Morning:</strong> Niacinamide serum → CeraVe gel cream → SPF (non-negotiable)</li>
          <li><strong>Evening:</strong> Cleanse → Alpha Arbutin serum → CeraVe gel cream</li>
          <li><strong>Total cost:</strong> Under ₹2,650 for a complete AM + PM routine</li>
          <li><strong>Time:</strong> 3 minutes morning, 3 minutes evening</li>
        </ul>

        <div className="verdict-box">
          <p className="verdict-label">The Bottom Line</p>
          <p className="verdict-text">
            You do not need to spend ₹5,000 on a serum for it to work.
            These three products cover the most common Indian skin concerns —
            oiliness, acne marks, and pigmentation — with ingredients that
            have real clinical evidence behind them. All under ₹1500 each.
            All on Amazon India with fast delivery.
          </p>
        </div>

      </article>
    </main>
  );
}

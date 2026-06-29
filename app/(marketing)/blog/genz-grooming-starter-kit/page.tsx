import type { Metadata } from "next";
import { AffiliateCard } from "@/components/AffiliateCard";
import BlogFooterTools from "@/components/BlogFooterTools";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata: Metadata = {
  title: "The GenZ Grooming Starter Kit: 8 Products, Zero Overthinking | Mirha & Co.",
  description: "Not a 12-step routine. Not soap-only advice. The practical grooming middle ground — 8 products that each do one job well for guys who want to look put-together.",
  openGraph: {
    title: "The GenZ Grooming Starter Kit: 8 Products, Zero Overthinking",
    description: "5-6 products, each doing one job well, used consistently. That's the whole secret.",
  },
};

export default function GenZGroomingStarterKitPage() {
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
        @media (max-width: 768px) { .post-hdr { padding: 3.5rem 1.5rem 2.5rem; } .post-body { padding: 2.5rem 1.5rem 4rem; } .nav-back { margin: 1rem 1.5rem; } }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">Men's Grooming · Starter Kit · GenZ Edit</span>
          <h1 className="post-headline">The GenZ Grooming Starter Kit: 8 Products, Zero Overthinking</h1>
          <p className="post-stand">
            Not a 12-step Korean routine you'll quit by Thursday. Not "just use soap bro." The practical middle ground — products that each do one job well.
          </p>
          <div className="post-meta">
            <span>June 2026</span>
            <span>6 min read</span>
            <span>Men's Grooming Edit</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">
        <p>
          If you open TikTok or Instagram, grooming advice for guys falls into two extreme, equally bad camps. On one side, you have the "clinical maximalists" telling you to buy a ₹5,000 copper peptide serum, a sonic exfoliator, and do a 15-step glass skin routine before bed. On the other side, you have the "blue soap" guys who wash their hair, face, and car with the same bar of generic soap.
        </p>
        <p>
          Both are wrong. Nobody has time for a chemistry degree before work, and nobody's skin thrives on floor cleaner. Here is the realistic middle ground: a starter kit of 8 products that do one job well, cost less than a weekend out, and take exactly 3 minutes of your day.
        </p>

        <h2>Step 1: Clean the Slate</h2>
        <p>
          The skin on your face is thinner and has more oil glands than the skin on your back or shoulders. If you wash your face with body soap or shampoo, you are stripping away the protective moisture layer, forcing your skin to over-produce oil to compensate. Result? Breakouts and a greasy forehead by noon. 
        </p>
        <p>
          Wash your face twice a day — once in the morning to clean off sweat, once at night to remove the day's pollution and grime.
        </p>

        <AffiliateCard
          title="Garnier Men Anti-Pimple Face Wash"
          description="The entry point. Cheap, effective, repairs skin and balances oil without stripping it. Trusted by millions of Indian men. Best value face wash in the market."
          price="₹187"
          asin="B007921JYI"
          affiliateTag={AFFILIATE_TAG}
          badge="Budget Pick"
        />

        <AffiliateCard
          title="Nivea Men Oil Control Face Wash"
          description="Cooling menthol kick, unclogs pores without the tight dried-out feeling. Controls excess oil and prevents acne. For oily or acne-prone skin."
          price="₹242"
          asin="B00X9UOCEI"
          affiliateTag={AFFILIATE_TAG}
          badge="Oil Control"
        />

        <h2>Step 2: Sunscreen is Non-Negotiable</h2>

        <div className="highlight-box">
          <p>"The single best anti-aging product on Earth is sunscreen. If you don't wear it, no serum or face wash will save your skin from dark spots and early wrinkles."</p>
        </div>
        <p>
          A lot of guys skip sunscreen because they hate the greasy feeling or the white chalky film (the 'ghost look') it leaves behind. Modern gel sunscreens feel like water, dry matte in seconds, and don't stick to facial hair. Put it on every morning, even if it's cloudy.
        </p>

        <AffiliateCard
          title="Aqualogica Glow+ Dewy Sunscreen"
          description="No white cast, no greasy film. In-vivo tested, broad spectrum protection that holds up through a full workday. Best lightweight SPF for oily Indian skin."
          price="₹359"
          asin="B09TPFTJNN"
          affiliateTag={AFFILIATE_TAG}
          badge="SPF 50+ PA++++"
        />

        <h2>Step 3: Hair Maintenance</h2>
        <p>
          Stop using cheap, high-alcohol hair gels that dry hard like cement. They choke the hair follicles, cause buildup, and flake off, looking like dandruff by 3 PM. Swap them for a nourishing cream wax that holds style naturally while allowing your hair to breathe.
        </p>

        <AffiliateCard
          title="Ustraa Anti Hair Fall Shampoo"
          description="Clinically tested to cut hair fall by 64%. Apple cider vinegar cleans the scalp, not just the strands. Sulphate-free and dermatologically tested."
          price="₹259"
          asin="B07PVBXJFT"
          affiliateTag={AFFILIATE_TAG}
          badge="64% Less Fall"
        />

        <AffiliateCard
          title="The Man Company Hair Cream Wax"
          description="12-hour strong hold, matte finish. No shine, no stickiness. A style that survives your entire day. Enriched with Vitamin E and almond oil."
          price="₹234"
          asin="B07BLXWJNJ"
          affiliateTag={AFFILIATE_TAG}
          badge="Strong Hold"
        />

        <h2>Step 4: Body &amp; Scent</h2>
        <p>
          Smelling good isn't about masking sweat; it's about starting clean. Ditch the harsh chemical bar soap for a body wash that hydrates your skin. Follow it up with a reliable, fresh deodorant that prevents odor rather than just trying to overwhelm it with a loud fragrance.
        </p>

        <AffiliateCard
          title="The Man Company Matcha Body Wash"
          description="Green tea and moringa leaf actually do something for your skin while you shower. SLS-free, toxin-free. Not just a scented substitute for soap."
          price="₹234"
          asin="B0BKPQNB9G"
          affiliateTag={AFFILIATE_TAG}
          badge="Glowing Skin"
        />

        <AffiliateCard
          title="Nivea Men Fresh Ocean Deo Spray"
          description="48-hour actual odour protection. Aqua and sandalwood notes. Fights odour-causing bacteria rather than masking them. The deo you stop worrying about."
          price="₹149"
          asin="B01DYEKGWA"
          affiliateTag={AFFILIATE_TAG}
          badge="48H Protection"
        />

        <div className="verdict-box">
          <p className="verdict-label">The Bottom Line</p>
          <p className="verdict-text">
            Grooming is maintenance, not vanity — same as charging your phone or changing your car’s oil. You don't need 20 products and a 45-minute routine. You need 5-6 products that each do one job well, used consistently. That's the whole secret nobody wants to admit because it doesn't sell a 12-step routine.
          </p>
        </div>

        <BlogFooterTools />
      </article>
    </main>
  );
}

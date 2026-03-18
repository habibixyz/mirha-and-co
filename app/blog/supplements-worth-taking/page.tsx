import { AffiliateCard } from "@/components/AffiliateCard";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata = {
  title: "The Supplements Actually Worth Taking in India | Mirha & Co.",
  description: "Honest breakdown of which supplements have real evidence behind them — and which ones are just expensive hype. India-specific guide.",
};

export default function SupplementsPost() {
  return (
    <main>
      <style>{`
        .post-hdr { background: var(--black); padding: 6rem 2.5rem 4rem; position: relative; overflow: hidden; }
        .post-hdr::before { content: 'WELLNESS'; position: absolute; bottom: -2rem; right: -1rem; font-family: 'Bebas Neue', sans-serif; font-size: 10rem; color: rgba(255,255,255,0.03); line-height: 1; pointer-events: none; }
        .post-hdr-inner { max-width: 780px; margin: 0 auto; position: relative; z-index: 1; }
        .post-badge { display: inline-block; background: #4a7c6f; color: #fff; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500; padding: 0.3rem 0.8rem; margin-bottom: 1.8rem; font-family: 'DM Sans', sans-serif; }
        .post-headline { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.6rem); color: var(--white); line-height: 1.08; margin-bottom: 1.5rem; }
        .post-stand { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.05rem; color: rgba(255,255,255,0.55); line-height: 1.75; margin-bottom: 2rem; max-width: 620px; }
        .post-meta { display: flex; align-items: center; gap: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.12); font-size: 0.68rem; color: rgba(255,255,255,0.35); letter-spacing: 0.12em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; flex-wrap: wrap; }
        .post-body { max-width: 780px; margin: 0 auto; padding: 4rem 2.5rem 6rem; }
        .post-body p { font-size: 1rem; line-height: 1.9; color: #2c2826; margin-bottom: 1.6rem; font-family: 'DM Sans', sans-serif; }
        .post-body h2 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.05em; color: var(--black); margin: 3.5rem 0 1rem; padding-top: 3rem; border-top: 2px solid var(--rule); }
        .post-body h3 { font-family: 'DM Serif Display', serif; font-size: 1.3rem; font-style: italic; margin: 2rem 0 0.7rem; color: var(--ink); }
        .post-body ul { margin: 0 0 1.6rem 1.2rem; padding: 0; }
        .post-body ul li { font-size: 0.95rem; line-height: 1.8; color: #2c2826; margin-bottom: 0.5rem; font-family: 'DM Sans', sans-serif; padding-left: 0.5rem; }
        .post-body ul li::marker { color: #4a7c6f; }
        .highlight-box { background: var(--sand); border-left: 4px solid #4a7c6f; padding: 1.5rem 2rem; margin: 2rem 0; }
        .highlight-box p { margin-bottom: 0; font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.1rem; color: var(--ink); line-height: 1.6; }
        .pnum { display: inline-flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; background: #4a7c6f; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; margin-bottom: 0.8rem; }
        .hype-box { background: #fff5f5; border: 1px solid #f5c0bc; border-left: 4px solid var(--rose); padding: 1.5rem 2rem; margin: 1.5rem 0; }
        .hype-box-label { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.1em; color: var(--rose); margin-bottom: 0.8rem; }
        .hype-box p { font-size: 0.88rem; color: var(--ink); line-height: 1.7; margin-bottom: 0.5rem; font-family: 'DM Sans', sans-serif; }
        .hype-box p:last-child { margin-bottom: 0; }
        .verdict-box { background: var(--black); padding: 2.5rem; margin: 2.5rem 0; }
        .verdict-label { font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; letter-spacing: 0.1em; color: #4a7c6f; margin-bottom: 1rem; }
        .verdict-text { font-size: 0.95rem; color: rgba(255,255,255,0.75); line-height: 1.8; font-family: 'DM Sans', sans-serif; }
        .faq-section { margin-top: 3rem; }
        .faq-item { border-top: 1px solid var(--rule); padding: 1.5rem 0; }
        .faq-q { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: var(--ink); margin-bottom: 0.7rem; }
        .faq-a { font-size: 0.9rem; color: var(--muted); line-height: 1.75; font-family: 'DM Sans', sans-serif; }
        .nav-back { display: block; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; margin: 1.5rem 2.5rem; font-family: 'DM Sans', sans-serif; }
        .nav-back:hover { color: var(--rose); }
        @media (max-width: 768px) { .post-hdr { padding: 3.5rem 1.5rem 2.5rem; } .post-body { padding: 2.5rem 1.5rem 4rem; } .nav-back { margin: 1rem 1.5rem; } }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">Wellness</span>
          <h1 className="post-headline">
            The Supplements Actually Worth<br />Taking in India
          </h1>
          <p className="post-stand">
            The supplement industry is worth billions and largely unregulated.
            Most of it is noise. Here's what the research actually says —
            and what's worth your money in India.
          </p>
          <div className="post-meta">
            <span>Feb 2026</span>
            <span>9 min read</span>
            <span>Research-based</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">

        <p>
          Walk into any pharmacy or scroll through Amazon India and you'll find
          hundreds of supplements promising everything from glowing skin to
          better sleep to sharper focus. Most of them are expensive placebos
          dressed up in clinical-looking packaging.
        </p>

        <p>
          But some supplements have genuine, robust evidence behind them — the
          kind that holds up across multiple independent studies, not just one
          enthusiastic trial funded by the manufacturer. This guide covers only
          those. No hype. No affiliate-driven padding. Just what the science
          actually supports for Indian adults.
        </p>

        <div className="highlight-box">
          <p>
            Two supplements with real evidence are worth more than ten with
            impressive marketing. Start with the basics — they're also the
            cheapest and most impactful.
          </p>
        </div>

        <h2>Worth Taking</h2>

        <div className="pnum">01</div>
        <h3>Vitamin D3 + K2 — The Most Common Deficiency in India</h3>

        <p>
          This one surprises most people: despite living in one of the sunniest
          countries in the world, Vitamin D deficiency is extremely common in
          India. Studies consistently show that 70–90% of urban Indians are
          deficient. The reasons are straightforward — most of us spend our
          days indoors, we cover up to avoid sun damage, and Indian skin
          requires more sun exposure than lighter skin to produce the same
          amount of Vitamin D.
        </p>

        <p>
          The effects of deficiency are significant: fatigue, low immunity,
          poor bone density, mood issues, and slower muscle recovery. Most
          people attribute these symptoms to stress or poor sleep without
          realising the underlying cause.
        </p>

        <p>
          Why D3 specifically, and why combined with K2? D3 is the form your
          body actually uses (D2 is less effective). K2 in MK-7 form ensures
          the calcium that D3 helps absorb goes to your bones — not your
          arteries. The combination is significantly more beneficial than D3
          alone. Take with a meal that contains fat for best absorption.
        </p>

        <AffiliateCard
          title="Carbamide Forte Vitamin D3 + K2 MK-7 — 120 Veg Tablets"
          description="Lichen-sourced Vitamin D3 (vegetarian) with K2 in MK-7 form — the most bioavailable combination. 120 tablets, manufactured in India, lab-tested for purity. Carbamide Forte is one of the most trusted supplement brands on Amazon India with consistently strong verified reviews. Take one daily with your largest meal."
          price="₹699"
          asin="B097DFLDB8"
          affiliateTag={AFFILIATE_TAG}
          badge="Most Important"
        />

        <ul>
          <li><strong>Who needs it:</strong> Almost everyone in urban India</li>
          <li><strong>When to take:</strong> Morning or afternoon with a meal containing fat</li>
          <li><strong>How long to see results:</strong> Energy and mood: 4–6 weeks. Blood levels: 3 months</li>
          <li><strong>Note:</strong> Get your Vitamin D levels tested before starting if possible — a simple blood test (25-OH Vitamin D) tells you exactly where you stand</li>
        </ul>

        <div className="pnum">02</div>
        <h3>Magnesium Glycinate — The Sleep Supplement That Actually Works</h3>

        <p>
          Magnesium is involved in over 300 enzymatic reactions in the body.
          It's also one of the most common nutritional deficiencies in India
          — depleted by stress, poor soil quality in mass-produced vegetables,
          and caffeine consumption (chai and coffee both increase magnesium
          excretion).
        </p>

        <p>
          The form matters enormously here. Magnesium oxide — the cheapest
          and most common form — has very low absorption and primarily acts
          as a laxative. Magnesium glycinate is chelated (bound to the amino
          acid glycine), which dramatically improves absorption and adds a
          mild calming effect from the glycine itself. This is the form
          consistently used in sleep and anxiety research.
        </p>

        <p>
          The effects most people notice first: deeper sleep, less waking
          in the night, reduced muscle tension and cramps, and a general
          reduction in that background low-level anxiety that most of us
          have normalised. Take it 30–45 minutes before bed.
        </p>

        <AffiliateCard
          title="Carbamide Forte Chelated Magnesium Glycinate — 120 Veg Tablets"
          description="Pure magnesium glycinate — chelated form for maximum absorption. No laxative effect unlike magnesium oxide. Supports deep sleep, reduces muscle tension, and helps manage stress response. Take 1–2 tablets 30 minutes before bed. One of the highest-rated magnesium supplements on Amazon India with verified long-term reviews."
          price="₹799"
          asin="B08CZ916RD"
          affiliateTag={AFFILIATE_TAG}
          badge="Best for Sleep"
        />

        <ul>
          <li><strong>Who needs it:</strong> Anyone with poor sleep, muscle tension, high stress, or frequent caffeine intake</li>
          <li><strong>When to take:</strong> 30–45 minutes before bed</li>
          <li><strong>How long to see results:</strong> Sleep quality: within 1–2 weeks. Muscle tension: 2–3 weeks</li>
          <li><strong>Dosage:</strong> Start with 200mg and work up to 400mg — too much too fast can cause loose stools even with glycinate</li>
        </ul>

        <h2>Skip These — The Hype List</h2>

        <div className="hype-box">
          <p className="hype-box-label">❌ Collagen Supplements</p>
          <p>Your digestive system breaks collagen into amino acids before it reaches your skin. There is no reliable evidence that oral collagen supplements improve skin appearance. Eat adequate protein instead — same amino acids, far cheaper.</p>
        </div>

        <div className="hype-box">
          <p className="hype-box-label">❌ Detox Teas and Liver Cleanse Supplements</p>
          <p>Your liver detoxes your body. It does not need tea, charcoal, or a supplement to do so. There is no clinical evidence for any "detox" supplement. The category exists purely as a marketing concept.</p>
        </div>

        <div className="hype-box">
          <p className="hype-box-label">❌ Biotin for Hair Growth</p>
          <p>Biotin supplementation only helps with hair loss if you are biotin deficient — which is rare in people eating a normal diet. The before/after transformation photos attached to biotin marketing are not evidence. If you're experiencing significant hair loss, see a dermatologist; the cause is almost never biotin deficiency.</p>
        </div>

        <div className="hype-box">
          <p className="hype-box-label">❌ Most "Immunity Booster" Supplements</p>
          <p>Vitamin C at very high doses, zinc lozenges during illness, and a few others have modest evidence. Most products marketed as "immunity boosters" have no clinical backing. Sleep, exercise, and Vitamin D will do more for your immune system than any supplement in this category.</p>
        </div>

        <h2>The Practical Starting Point</h2>

        <p>
          If you're going to add any supplements, start with these two in this
          order. D3+K2 first — it addresses the most common deficiency in India
          and the effects are wide-ranging. Magnesium glycinate second — if you
          have sleep issues, stress, or muscle tension, this is the highest
          evidence-to-cost ratio supplement available.
        </p>

        <p>
          Combined monthly cost: under ₹1,500. Combined evidence base: decades
          of peer-reviewed research. Everything else can wait until you've been
          consistent with these two for 3 months.
        </p>

        <div className="verdict-box">
          <p className="verdict-label">The Short Version</p>
          <p className="verdict-text">
            D3 + K2 — most urban Indians are deficient and don't know it.
            Take daily with food.<br /><br />
            Magnesium Glycinate — not magnesium oxide. Take before bed.
            Your sleep will thank you within two weeks.<br /><br />
            Everything else: research it before you buy it. If the evidence
            comes from the brand selling it, that's not evidence.
          </p>
        </div>

        <h2>Frequently Asked Questions</h2>

        <div className="faq-section">
          <div className="faq-item">
            <p className="faq-q">Can I take D3 and magnesium together?</p>
            <p className="faq-a">Yes — they work well together and there are no negative interactions. Many people take D3 in the morning with breakfast and magnesium at night before bed, which is a sensible split.</p>
          </div>
          <div className="faq-item">
            <p className="faq-q">How do I know if I'm Vitamin D deficient?</p>
            <p className="faq-a">A 25-OH Vitamin D blood test is the standard way to check. It costs ₹400–800 at most diagnostic labs in India. Normal levels are 30–100 ng/mL — most urban Indians test between 10–20 ng/mL without supplementation.</p>
          </div>
          <div className="faq-item">
            <p className="faq-q">Will magnesium make me drowsy during the day?</p>
            <p className="faq-a">Not if taken at night. Magnesium glycinate improves sleep quality rather than causing sedation — you wake up feeling more rested, not groggy. Taking it during the day at high doses may cause some people to feel relaxed, which is why bedtime dosing is recommended.</p>
          </div>
          <div className="faq-item">
            <p className="faq-q">Are Indian supplement brands reliable?</p>
            <p className="faq-a">Quality varies significantly. Carbamide Forte is one of the more trustworthy Indian brands — they publish third-party testing results and their Amazon reviews are consistently verified. Always check for FSSAI registration on any Indian supplement and look for brands that are transparent about their testing.</p>
          </div>
        </div>

      </article>
    </main>
  );
}

import { AffiliateCard } from "@/components/AffiliateCard";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata = {
  title: "Morning Routines That Don't Require 2 Hours | Mirha & Co.",
  description: "Five evidence-based morning habits. Twenty minutes. A real difference to your day — without the 5am alarm or cold plunge.",
};

export default function MorningRoutinesPost() {
  return (
    <main>
      <style>{`
        .post-hdr {
          background: var(--black);
          padding: 6rem 2.5rem 4rem;
          position: relative;
          overflow: hidden;
        }
        .post-hdr::before {
          content: 'WELLNESS';
          position: absolute;
          bottom: -2rem;
          right: -1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 10rem;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          pointer-events: none;
        }
        .post-hdr-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .post-badge {
          display: inline-block;
          background: #4a7c6f;
          color: #fff;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 0.3rem 0.8rem;
          margin-bottom: 1.8rem;
          font-family: 'DM Sans', sans-serif;
        }
        .post-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          color: var(--white);
          line-height: 1.08;
          margin-bottom: 1.5rem;
        }
        .post-stand {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.75;
          margin-bottom: 2rem;
          max-width: 620px;
        }
        .post-meta {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.12);
          font-size: 0.68rem;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          flex-wrap: wrap;
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
          font-family: 'DM Sans', sans-serif;
        }
        .post-body h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.05em;
          color: var(--black);
          margin: 3.5rem 0 1rem;
          padding-top: 3rem;
          border-top: 2px solid var(--rule);
        }
        .post-body h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.3rem;
          font-style: italic;
          margin: 2rem 0 0.7rem;
          color: var(--ink);
        }
        .post-body ul {
          margin: 0 0 1.6rem 1.2rem;
          padding: 0;
        }
        .post-body ul li {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #2c2826;
          margin-bottom: 0.4rem;
          font-family: 'DM Sans', sans-serif;
          padding-left: 0.5rem;
        }
        .post-body ul li::marker { color: #4a7c6f; }
        .highlight-box {
          background: var(--sand);
          border-left: 4px solid #4a7c6f;
          padding: 1.5rem 2rem;
          margin: 2rem 0;
        }
        .highlight-box p {
          margin-bottom: 0;
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: var(--ink);
          line-height: 1.6;
        }
        .step-block {
          display: grid;
          grid-template-columns: 3.5rem 1fr;
          gap: 1.5rem;
          margin: 2.5rem 0;
          align-items: start;
        }
        .step-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.8rem;
          color: #4a7c6f;
          line-height: 1;
          opacity: 0.6;
        }
        .step-content h3 {
          margin-top: 0.3rem;
          margin-bottom: 0.6rem;
        }
        .step-content p {
          margin-bottom: 0.8rem;
        }
        .verdict-box {
          background: var(--black);
          padding: 2.5rem;
          margin: 2.5rem 0;
        }
        .verdict-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.1em;
          color: #4a7c6f;
          margin-bottom: 1rem;
        }
        .verdict-text {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.8;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-back {
          display: block;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          margin: 1.5rem 2.5rem;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-back:hover { color: var(--rose); }
        @media (max-width: 768px) {
          .post-hdr { padding: 3.5rem 1.5rem 2.5rem; }
          .post-body { padding: 2.5rem 1.5rem 4rem; }
          .nav-back { margin: 1rem 1.5rem; }
          .step-block { grid-template-columns: 2.5rem 1fr; gap: 1rem; }
        }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">Wellness</span>
          <h1 className="post-headline">
            Morning Routines That Don't<br />Require 2 Hours
          </h1>
          <p className="post-stand">
            The wellness industry wants your morning to be complicated. It doesn't have to be.
            Five evidence-based habits. Twenty minutes. A day that actually starts well.
          </p>
          <div className="post-meta">
            <span>March 2026</span>
            <span>5 min read</span>
            <span>Research-based</span>
            <span>Contains affiliate links</span>
          </div>
        </div>
      </header>

      <article className="post-body">

        <p>
          Somewhere between the cold plunge influencers and the 75-step morning routine
          content, the simple truth got lost: a good morning doesn't need to be a performance.
          It needs to be consistent.
        </p>

        <p>
          The most effective morning routines are the ones you actually do every day —
          not the aspirational ones you attempt twice and abandon. These five habits take
          under twenty minutes combined, have real evidence behind them, and make a
          measurable difference to how the rest of your day goes.
        </p>

        <div className="highlight-box">
          <p>
            The best morning routine is the one you'll do tomorrow. Not the aspirational one —
            the real one.
          </p>
        </div>

        <h2>The Five Habits</h2>

        {/* STEP 1 */}
        <div className="step-block">
          <div className="step-num">01</div>
          <div className="step-content">
            <h3>Water Before Anything Else</h3>
            <p>
              Before coffee, before your phone, before you open a single app — drink a
              full glass of water. You've been horizontal for 7–8 hours. You're mildly
              dehydrated. This takes 30 seconds and the difference in energy and focus
              by 10am is noticeable. Keep a glass or bottle next to your bed the night
              before so there's zero friction.
            </p>
            <AffiliateCard
              title="Glass Water Carafe with Lid — Bedside Bottle"
              description="Fill it the night before, leave it on your bedside table. No plastic taste, no cap to fumble with half-asleep. Glass feels intentional — and that matters when you're trying to build a habit. Keeping water visible is the single easiest way to actually drink it first thing."
              price="₹699"
              asin="B0GN3H3RTQ"
              affiliateTag={AFFILIATE_TAG}
              badge="Habit Builder"
            />
          </div>
        </div>

        {/* STEP 2 */}
        <div className="step-block">
          <div className="step-num">02</div>
          <div className="step-content">
            <h3>Five Minutes of Something Physical</h3>
            <p>
              Not a workout. Not exercise you need to change clothes for. Just movement —
              five minutes of stretching, a short walk around your home, or ten minutes
              of a yoga video you've done so many times you don't need to watch the screen.
              The point is to get out of your head and into your body before the day
              starts demanding things from you. Research consistently shows that even
              brief morning movement improves mood and cognitive performance for hours after.
            </p>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="step-block">
          <div className="step-num">03</div>
          <div className="step-content">
            <h3>Skincare in Under Four Minutes</h3>
            <p>
              Your morning skincare routine should not be an event. Cleanser (optional
              if you cleansed at night), one serum, moisturiser, SPF. Four products.
              Two to three minutes. Everything else is optional and can wait for evening.
            </p>
            <p>
              The non-negotiable: SPF every single morning. In India especially — UV
              index is high year-round, and skipping SPF undoes any pigmentation work
              you're doing with serums. This is the one product where there is no
              substitute and no excuse.
            </p>
            <AffiliateCard
              title="La Roche-Posay Anthelios SPF 50+ UV Fluid"
              description="Dermatologist-recommended SPF 50+ with a lightweight fluid texture. No white cast, no greasiness — wearable under makeup or alone. Developed for sensitive skin, suitable for Indian climate and year-round daily use. The SPF most dermatologists in India actually recommend to their patients."
              price="₹1,850"
              asin="B0BWSJGBHW"
              affiliateTag={AFFILIATE_TAG}
              badge="Non-Negotiable"
            />
          </div>
        </div>

        {/* STEP 4 */}
        <div className="step-block">
          <div className="step-num">04</div>
          <div className="step-content">
            <h3>One Thing You're Looking Forward To</h3>
            <p>
              Before you check email or messages, identify one thing in the day you're
              genuinely looking forward to. It can be small — a good lunch, a task you
              find satisfying, a call with someone you like. This is a cognitive reframe,
              not a spiritual practice. It takes fifteen seconds and changes how you
              enter your inbox. Studies on positive anticipation show measurable effects
              on motivation and stress response throughout the day.
            </p>
          </div>
        </div>

        {/* STEP 5 */}
        <div className="step-block">
          <div className="step-num">05</div>
          <div className="step-content">
            <h3>Coffee or Tea, Made Properly</h3>
            <p>
              Not grabbed on the way out the door. Not drunk while scrolling. A proper
              cup, made how you like it, consumed without a screen for at least five
              minutes. This is the most effective mindfulness practice for people who
              don't meditate — and it's one you'll actually do because it involves
              something you already want.
            </p>
            <p>
              If you drink coffee and have never tried pour-over, it changes the
              experience entirely. The process itself — boiling water, slow pour,
              watching the bloom — becomes the five minutes of calm. The coffee is
              also significantly better than most machines produce.
            </p>
            <AffiliateCard
              title="Hario V60 Pour-Over Coffee Dripper"
              description="The most widely used pour-over brewer in the world — simple, durable, and produces exceptional coffee. The slow pour process takes about 3–4 minutes and becomes a genuine morning ritual rather than a task. Available in plastic (lighter, travel-friendly) and ceramic versions on Amazon India."
              price="₹1,299"
              asin="B0BWHJJTMP"
              affiliateTag={AFFILIATE_TAG}
            />
          </div>
        </div>

        <h2>The Point</h2>

        <p>
          Twenty minutes. Five things. None of them require a 5am alarm, a cold shower,
          or any form of suffering. The only rule: do them in the same order, every day.
          Consistency is what makes a routine — not the individual habits themselves.
        </p>

        <p>
          Start with one. Add another when the first one feels automatic. That's
          the entire system. Everything else is noise.
        </p>

        <div className="verdict-box">
          <p className="verdict-label">The Short Version</p>
          <p className="verdict-text">
            Water first. Move briefly. Apply SPF (always). Find one thing to look
            forward to. Make something warm and drink it slowly. Twenty minutes.
            Do it again tomorrow.
          </p>
        </div>

      </article>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "Your Brain Wasn't Built for Infinite Scroll | Mirha & Co.",
  description: "Dopamine loops, notification fatigue, AI overload — how modern apps are quietly hijacking your attention, and a 5-step digital reset to take it back.",
  openGraph: {
    title: "Your Brain Wasn't Built for Infinite Scroll",
    description: "A deep but clean piece on dopamine loops, notification fatigue, and how to reclaim your attention.",
    type: "article",
  },
};

export default function InfiniteScrollPage() {
  return (
    <main className="blog-post-page">
      <style>{`
        .blog-post-page {
          --ink: #1a1a18;
          --ink-soft: #4a4a44;
          --ink-muted: #8a8a82;
          --surface: #faf9f6;
          --surface-warm: #f4f1eb;
          --accent: #b8a99a;
          --accent-deep: #8c6e5a;
          --rule: #e0dbd3;
          --drop: #c4b5a8;
          --serif: var(--font-dm-serif), 'DM Serif Display', Georgia, serif;
          --sans: var(--font-dm-sans), 'DM Sans', system-ui, sans-serif;
          --max: 680px;
          --col: 540px;

          background: var(--surface);
          color: var(--ink);
          line-height: 1.75;
          font-family: var(--sans);
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        /* HERO */
        .blog-post-page .hero {
          max-width: var(--max);
          margin: 0 auto;
          padding: 4.5rem 2rem 3rem;
          text-align: center;
        }
        .blog-post-page .category-tag {
          display: inline-block;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-deep);
          background: var(--surface-warm);
          padding: 0.35rem 0.9rem;
          border-radius: 100px;
          margin-bottom: 1.75rem;
          border: 0.5px solid var(--drop);
        }
        .blog-post-page .hero h1 {
          font-family: var(--serif);
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin-bottom: 1.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 400;
        }
        .blog-post-page .hero-lede {
          font-size: 1.1rem;
          color: var(--ink-soft);
          max-width: 520px;
          margin: 0 auto 2rem;
          line-height: 1.8;
          font-weight: 300;
        }
        .blog-post-page .meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.78rem;
          color: var(--ink-muted);
          letter-spacing: 0.04em;
        }
        .blog-post-page .meta-sep { color: var(--rule); }

        /* RULE DIVIDER */
        .blog-post-page .ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin: 3rem auto;
          max-width: var(--col);
          padding: 0 2rem;
          color: var(--drop);
        }
        .blog-post-page .ornament::before, .blog-post-page .ornament::after {
          content: '';
          flex: 1;
          height: 0.5px;
          background: var(--rule);
        }
        .blog-post-page .ornament-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--drop);
        }

        /* ARTICLE BODY */
        .blog-post-page article {
          max-width: var(--col);
          margin: 0 auto;
          padding: 0 2rem 5rem;
        }

        .blog-post-page article p {
          font-size: 1rem;
          line-height: 1.85;
          color: var(--ink-soft);
          margin-bottom: 1.5rem;
          font-weight: 300;
        }
        .blog-post-page article p strong {
          font-weight: 500;
          color: var(--ink);
        }

        /* DROP CAP */
        .blog-post-page .drop-cap::first-letter {
          font-family: var(--serif);
          font-size: 3.5rem;
          line-height: 0.85;
          float: left;
          margin-right: 0.1em;
          margin-top: 0.08em;
          color: var(--ink);
        }

        /* SECTION HEADINGS */
        .blog-post-page .section-label {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-deep);
          margin-bottom: 0.5rem;
          display: block;
        }
        .blog-post-page h2 {
          font-family: var(--serif);
          font-size: 1.55rem;
          line-height: 1.2;
          color: var(--ink);
          margin-bottom: 1.25rem;
          margin-top: 3.5rem;
          font-weight: 400;
        }

        /* PULL QUOTE */
        .blog-post-page .pull-quote {
          border-left: 2px solid var(--accent-deep);
          padding: 0.5rem 0 0.5rem 1.5rem;
          margin: 2.5rem 0;
        }
        .blog-post-page .pull-quote p {
          font-family: var(--serif);
          font-size: 1.25rem;
          line-height: 1.5;
          color: var(--ink);
          font-style: italic;
          margin-bottom: 0;
        }

        /* STAT CARD */
        .blog-post-page .stat-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1px;
          background: var(--rule);
          border: 0.5px solid var(--rule);
          border-radius: 8px;
          overflow: hidden;
          margin: 2.5rem 0;
        }
        .blog-post-page .stat-card {
          background: var(--surface);
          padding: 1.25rem 1.5rem;
          text-align: center;
        }
        .blog-post-page .stat-num {
          font-family: var(--serif);
          font-size: 2rem;
          color: var(--ink);
          display: block;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .blog-post-page .stat-label {
          font-size: 0.75rem;
          color: var(--ink-muted);
          letter-spacing: 0.04em;
          line-height: 1.4;
        }

        /* NUMBERED LIST (5-STEP) */
        .blog-post-page .reset-list { list-style: none; margin: 2rem 0; }
        .blog-post-page .reset-list li {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          padding: 1.25rem 0;
          border-bottom: 0.5px solid var(--rule);
        }
        .blog-post-page .reset-list li:first-child { border-top: 0.5px solid var(--rule); }
        .blog-post-page .step-num {
          font-family: var(--serif);
          font-size: 1.4rem;
          color: var(--drop);
          min-width: 1.5rem;
          line-height: 1.3;
        }
        .blog-post-page .step-content h3 {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 0.35rem;
        }
        .blog-post-page .step-content p {
          font-size: 0.88rem;
          color: var(--ink-muted);
          margin-bottom: 0;
          line-height: 1.65;
        }

        /* HIGHLIGHT BOX */
        .blog-post-page .callout {
          background: var(--surface-warm);
          border: 0.5px solid var(--drop);
          border-radius: 8px;
          padding: 1.5rem 1.75rem;
          margin: 2.5rem 0;
        }
        .blog-post-page .callout .callout-head {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-deep);
          margin-bottom: 0.75rem;
          display: block;
        }
        .blog-post-page .callout p {
          font-size: 0.9rem;
          color: var(--ink-soft);
          margin-bottom: 0;
          line-height: 1.7;
        }

        /* RELATED */
        .blog-post-page .related {
          background: var(--surface-warm);
          padding: 3rem 2rem;
          text-align: center;
          border-top: 0.5px solid var(--rule);
        }
        .blog-post-page .related-head {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 1.5rem;
          display: block;
        }
        .blog-post-page .related-title {
          font-family: var(--serif);
          font-size: 1.35rem;
          color: var(--ink);
          max-width: 480px;
          margin: 0 auto 1.25rem;
          line-height: 1.3;
        }
        .blog-post-page .read-more {
          display: inline-block;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-deep);
          border-bottom: 0.5px solid var(--drop);
          padding-bottom: 0.15rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .blog-post-page .read-more:hover { color: var(--ink); }

        .blog-post-page .back-link-container {
          max-width: var(--col);
          margin: 0 auto;
          padding: 2.5rem 2rem 0;
        }
        .blog-post-page .back-link {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .blog-post-page .back-link:hover {
          color: var(--ink);
        }

        @media (max-width: 600px) {
          .blog-post-page .hero { padding: 3rem 1.25rem 2rem; }
          .blog-post-page article { padding: 0 1.25rem 4rem; }
          .blog-post-page h2 { margin-top: 2.5rem; }
          .blog-post-page .back-link-container { padding: 2rem 1.25rem 0; }
        }
      `}</style>

      {/* ── BACK ── */}
      <div className="back-link-container">
        <Link href="/blog" className="back-link">
          ← Back to Journal
        </Link>
      </div>

      <header className="hero">
        <span className="category-tag">Wellness · Digital Health</span>
        <h1>Your Brain Wasn't Built for Infinite Scroll</h1>
        <p className="hero-lede">Dopamine loops, notification fatigue, AI overload — how modern apps are quietly hijacking your attention, and what to actually do about it.</p>
        <div className="meta">
          <span>Mirha & Co. Editorial</span>
          <span className="meta-sep">—</span>
          <span>May 2026</span>
          <span className="meta-sep">—</span>
          <span>8 min read</span>
        </div>
      </header>

      <div className="ornament">
        <span className="ornament-dot"></span><span className="ornament-dot"></span><span className="ornament-dot"></span>
      </div>

      <article>
        <p className="drop-cap">You open Instagram to check one notification. Twenty minutes later, you're watching a video of someone organising their fridge and you have no memory of how you got there. Sound familiar? This isn't a willpower problem. It's a design problem — and your brain is losing.</p>

        <p>The architecture of modern apps was not built for your wellbeing. It was built for <strong>engagement</strong>, which is a polite word for compulsive use. And after years of smartphones, social feeds, and now AI-generated content that never runs out, we are starting to feel the cost — in our concentration, our sleep, our mood, and our capacity to be bored (which, it turns out, is essential for creative thought).</p>

        <p>This piece is about why that happens neurologically, and what a genuinely useful reset looks like. Not the kind that asks you to delete all your apps and move to the hills. The kind that actually works for people living real, connected lives.</p>

        <div className="stat-row">
          <div className="stat-card">
            <span className="stat-num">47%</span>
            <span className="stat-label">of waking hours spent thinking about something other than what we're doing</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">23 min</span>
            <span className="stat-label">average time to regain full focus after a single digital interruption</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">4.5 hrs</span>
            <span className="stat-label">average daily phone screen time globally, up from 2.5 hrs in 2019</span>
          </div>
        </div>

        <span className="section-label">Part One</span>
        <h2>The "always online" nervous system</h2>

        <p>Your nervous system was calibrated for a world where information was scarce and novelty meant something important had changed — a predator, a stranger, a shift in weather. When something new happened, your brain released a small amount of dopamine, the neurotransmitter associated with anticipation and reward. This was useful. It kept your ancestors alive.</p>

        <p>The problem is that smartphones deliver novelty at a rate your nervous system was never designed to process. Every ping, every refresh, every new post is a low-grade novelty signal. Individually, each one barely registers. Collectively, they keep your dopaminergic system in a state of <strong>constant, low-level activation</strong> — like leaving your car engine running all day and wondering why you're running out of fuel by 3pm.</p>

        <p>What this looks like in practice: you feel vaguely restless when not checking your phone. Silence becomes uncomfortable. You reach for your device in queues, in lifts, before you've even gotten out of bed. These aren't personality traits. They're conditioned responses — and they can be reconditioned.</p>

        <div className="pull-quote">
          <p>"The goal of app designers is not to help you feel good. It is to maximise the time between you opening the app and the moment you feel satisfied enough to put it down — ideally, that moment never comes."</p>
        </div>

        <span className="section-label">Part Two</span>
        <h2>Why infinite scroll feels impossible to stop</h2>

        <p>Infinite scroll was invented in 2006 by Aza Raskin, a designer who has since publicly apologised for it. The mechanic is elegantly vicious: remove the natural stopping point. A book has chapters. A TV show ends. A newspaper runs out. But a feed is designed to never run out — and your brain, which uses visual and spatial cues to decide when it's "done," gets no signal to stop.</p>

        <p>This is compounded by <strong>variable reward scheduling</strong>, the same mechanism that makes slot machines so compelling. Most posts you scroll past are unremarkable. But occasionally, something genuinely interesting or funny or emotionally resonant appears. Because you can't predict when, your brain keeps scrolling — just one more, just one more — in anticipation of the next hit.</p>

        <p>The neurological effect is similar to that of other intermittent reward systems: it trains compulsive checking behaviour, reduces your baseline tolerance for slow, non-stimulating activities (like reading long articles or sitting quietly), and gradually erodes your ability to sustain attention on anything that doesn't reward you immediately.</p>

        <div className="callout">
          <span className="callout-head">Worth knowing</span>
          <p>Multiple studies have linked heavy social media use to reduced grey matter density in the prefrontal cortex — the area responsible for decision-making, impulse control, and long-term planning. The good news: the brain is plastic. These effects are reversible with consistent, intentional behaviour change.</p>
        </div>

        <span className="section-label">Part Three</span>
        <h2>The AI productivity paradox</h2>

        <p>Here is a tension that is not discussed enough: the same generation of workers adopting AI tools to become more productive is also the generation most at risk of cognitive overload from digital saturation. We are attempting to process more information than any generation in history, with brains that evolved to handle the cognitive load of a small village.</p>

        <p>AI assistants, in theory, reduce effort. In practice, many users report a new kind of fatigue — the constant context-switching between tools, the need to evaluate AI outputs critically, the low-grade anxiety of not being sure whether something is real, the pressure to use every efficiency gain to simply do more. <strong>Faster tools don't automatically mean quieter minds.</strong></p>

        <p>This is the AI productivity paradox: the technology designed to free up cognitive capacity is, for many people, adding a new layer of cognitive noise. The solution isn't to abandon AI tools. It's to build deliberate recovery time into your relationship with all of them — including this one.</p>

        <span className="section-label">Part Four</span>
        <h2>Cognitive debt from multitasking</h2>

        <p>Multitasking is a myth in the way most people use the term. What the brain actually does is task-switch — rapidly toggling attention between inputs — and every switch carries a small cognitive cost called a <strong>switching penalty</strong>. Research from the American Psychological Association suggests that heavy multitaskers are, on average, slower and less accurate at each individual task than people who focus on one thing at a time.</p>

        <p>The cumulative effect of thousands of micro-switches per day is what some researchers have started calling <strong>cognitive debt</strong>: a growing deficit between the mental capacity you have and the mental capacity your lifestyle assumes. It shows up as difficulty finishing tasks, chronic low-level mental fatigue, increased irritability, and the strange sensation of being busy all day without having done anything that actually matters.</p>

        <p>For founders, developers, and remote workers — people whose entire value is their thinking — cognitive debt is a professional crisis dressed up as a personal quirk.</p>

        <span className="section-label">Part Five</span>
        <h2>A 5-step digital reset routine</h2>

        <p>This is not a dopamine fast. Those have their place, but they're unsustainable as a long-term strategy and they ignore the structural reasons most people over-consume digital media. This is a practical, evidence-influenced reset you can actually stick to.</p>

        <ul className="reset-list">
          <li>
            <span className="step-num">01</span>
            <div className="step-content">
              <h3>Audit your notification architecture</h3>
              <p>Turn off every notification that doesn't require a same-day response from you. Most people have 60–100 active notification sources. You realistically need fewer than ten. Go to Settings → Notifications and delete anything that isn't a direct message from a real person or a time-sensitive operational alert.</p>
            </div>
          </li>
          <li>
            <span className="step-num">02</span>
            <div className="step-content">
              <h3>Create a phone-free morning window</h3>
              <p>The first 30–60 minutes after waking are neurologically your most cognitively plastic period of the day. Flooding them with information — even interesting information — crowds out the consolidation and planning your brain is trying to do. Keep your phone out of the bedroom. Buy an alarm clock. This is the single highest-leverage change most people can make.</p>
            </div>
          </li>
          <li>
            <span className="step-num">03</span>
            <div className="step-content">
              <h3>Work in closed-loop blocks</h3>
              <p>Close every tab that isn't relevant to the task in front of you. Use full-screen mode. Set a visible timer for 45–90 minutes. The physical act of closing tabs and starting a timer signals to your brain that you're entering a different mode — one that doesn't expect novelty to arrive at random intervals.</p>
            </div>
          </li>
          <li>
            <span className="step-num">04</span>
            <div className="step-content">
              <h3>Schedule your scroll time</h3>
              <p>Rather than banning social media, contain it. Designate two 15-minute windows per day — maybe late morning and after 6pm — and only check feeds during those windows. This preserves connection and information access while removing the ambient checking habit that does most of the damage.</p>
            </div>
          </li>
          <li>
            <span className="step-num">05</span>
            <div className="step-content">
              <h3>Invest in deliberate boredom</h3>
              <p>Carry nothing to look at on your daily commute, at least twice a week. Sit with the discomfort. Boredom is not wasted time — it is the state in which your default mode network activates, generating new connections, processing emotion, and producing the kind of loose-associative thinking that most creative breakthroughs emerge from. You cannot think your best thoughts while looking at a screen.</p>
            </div>
          </li>
        </ul>

        <div className="callout">
          <span className="callout-head">The real measure</span>
          <p>Attention is not just a productivity metric. It is how you experience your own life. The quality of your attention determines the quality of your conversations, your relationships, your creative work, and your felt sense of being present. It is, in this way, the foundation of everything that matters. Protecting it is not a wellness trend. It is maintenance.</p>
        </div>

        <p>The internet is not going anywhere. Neither are the algorithms. But the relationship you have with them is yours to define — and it is worth the effort of defining it deliberately, rather than letting the defaults decide for you.</p>
      
        <BlogFooterTools />
      </article>

      <div className="ornament">
        <span className="ornament-dot"></span><span className="ornament-dot"></span><span className="ornament-dot"></span>
      </div>

      <section className="related">
        <span className="related-head">Read next</span>
        <p className="related-title">The Indian Girl's Night Routine That Actually Improves Sleep</p>
        <Link href="/blog/indian-night-routine-better-sleep" className="read-more">
          Continue reading →
        </Link>
      </section>
    </main>
  );
}

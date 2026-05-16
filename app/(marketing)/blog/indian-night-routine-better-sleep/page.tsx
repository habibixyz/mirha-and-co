import type { Metadata } from "next";
import BlogProductCard from "@/components/BlogProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Indian Girl's Night Routine That Actually Improves Sleep | Mirha & Co.",
  description:
    "A realistic Indian girl's night routine for better sleep — magnesium glycinate, low-light habits, shower timing, skincare that doesn't feel like a second job. No 5am alarm required.",
  openGraph: {
    title: "The Indian Girl's Night Routine That Actually Improves Sleep",
    description:
      "A realistic Indian girl's night routine for better sleep — magnesium glycinate, low-light habits, shower timing, skincare that doesn't feel like a second job. No 5am alarm required.",
  },
};

export default function IndianNightRoutinePage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link
          href="/blog"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
            textDecoration: "none",
            fontFamily: "monospace",
          }}
        >
          ← Back to Journal
        </Link>
      </div>

      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 2.5rem", borderBottom: "1px solid var(--rule)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "1rem", fontFamily: "monospace" }}>
          Beauty · Wellness · Sleep Guide
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 400, lineHeight: 1.12, color: "var(--ink)", margin: "0 0 1.2rem" }}>
          The Indian Girl's Night Routine That Actually Improves Sleep
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          A realistic Indian girl's night routine for better sleep — magnesium glycinate, low-light habits, shower timing, skincare that doesn't feel like a second job. No 5am alarm required.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          <span>May 2026</span>
          <span>·</span>
          <span>11 min read</span>
          <span>·</span>
          <span>Wellness</span>
        </div>
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <section style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The wellness content algorithm wants you exhausted by your own routine. Five-step morning rituals at 5am. Cold plunges. Journaling in ambient candlelight while somehow also meal-prepping and lifting weights. And then — somehow — sleeping eight pristine hours.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The real picture: most Indian women are sleeping badly, working late, dealing with temperatures that make even the idea of a cool bedroom feel like a fantasy, and carrying a guilt hangover from all the routines they started and abandoned.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            This isn't that kind of guide.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            What actually improves sleep is far simpler than the wellness industry suggests — and far more achievable. The version below takes under 30 minutes, uses things that have real evidence or real texture to them, and was built around the specific conditions of living in India: humidity, hard water, stress loads that don't respect work-life balance, and rooms that rarely get below 28°C without help.
          </p>
          <blockquote style={{ borderLeft: "4px solid var(--rose)", paddingLeft: "1.2rem", margin: "1.5rem 0", fontStyle: "italic", color: "var(--ink)" }}>
            <strong>The honest premise:</strong> Most "self-care" routines fail because they add complexity to a life that's already complex. The ones that work reduce friction, feel genuinely pleasant, and are short enough to actually do when you're tired.
          </blockquote>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* WHY FAIL */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            Why Most Sleep Routines Don't Work for Indian Women
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Before the routine itself, it helps to understand what's actually disrupting sleep — because the solutions become obvious once you know the cause.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>The thermal problem:</strong> India's average temperatures mean the body struggles to do what it needs to do to initiate sleep: drop its core temperature by roughly 1–1.5°C. In a room that's 30°C, that process is fighting uphill. This is why sleep hygiene advice from Western sources often misses the mark — they're writing for people with central air conditioning and mild evenings.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>The light problem:</strong> Blue light from phones suppresses melatonin production, but the issue isn't just screens. Indian evenings often involve bright overhead tube lights, which emit the same disruptive spectrum. Switching to a warmer, dimmer light source after 9pm makes a physiological difference that most people underestimate.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>The stimulation problem:</strong> WhatsApp group chats, Instagram reels, work emails that arrive at 11pm — the average Indian woman's nervous system doesn't get a wind-down window. The brain is still processing at full speed when the body is expected to sleep.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>The skincare guilt problem:</strong> Night routines have become a second job. If your routine takes 25 steps and 45 minutes, you're either doing it resentfully or skipping it entirely. Both outcomes leave you worse off.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The routine below addresses all four.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* 30 MIN RESET */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            The 30-Minute Reset: Start to Finish
          </h2>

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)", margin: "1.5rem 0 0.8rem" }}>
            9:00–9:15 PM | Change the Light First
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Dim your lights or switch to a lamp with a warm, amber-toned bulb after 9pm. If you can't dim your overheads, a salt lamp or a simple bedside lamp is enough. The goal is to reduce blue and cool-white light exposure in the 90 minutes before you want to sleep.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            This is not aesthetic — it's physiological. Melatonin production is triggered by darkness and suppressed by blue light.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>The no-phone rule (and what to replace it with):</strong> A full phone ban is unrealistic. The more achievable version: no scrolling in bed. Charge your phone across the room. Use a physical alarm. The difference between "phone on the nightstand" and "phone across the room" is significant — the visual presence of it creates a low-grade pull that disrupts sleep quality.
          </p>

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)", margin: "1.8rem 0 0.8rem" }}>
            9:15 PM | Magnesium Glycinate
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Magnesium glycinate has become the supplement most consistently recommended by sleep researchers and by dermatologists who see the skin consequences of chronic sleep deprivation. The glycinate form specifically — not oxide, not citrate — is better absorbed and gentler on digestion.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            What it does: magnesium plays a role in regulating the nervous system and activating GABA receptors, the same pathway that sleep medications work on. It won't knock you out, but it makes the transition from alert to drowsy noticeably smoother.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Dose:</strong> 200–400mg elemental magnesium glycinate, 45–60 minutes before bed.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Indian context:</strong> Most Indians are mildly magnesium deficient. If you've been waking at 3am, getting leg cramps at night, or feeling wired-and-tired in the evenings, low magnesium is often a contributing factor.
          </p>

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)", margin: "1.8rem 0 0.8rem" }}>
            9:20 PM | Shower Timing (The Science Part)
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            A warm shower 1–2 hours before bed is one of the most evidence-backed sleep interventions that almost nobody talks about.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Here's why it works: a warm shower raises your body's surface temperature. When you step out and cool down in the air, your core temperature drops faster than it would otherwise. That temperature drop is the signal your body uses to initiate sleep.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The water temperature matters: warm to hot, not cold. Cold showers feel invigorating — which is the opposite of what you want before sleep.
          </p>

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)", margin: "1.8rem 0 0.8rem" }}>
            9:30 PM | The Calming Tea Moment
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Calming teas work through two mechanisms: the compounds in the tea itself, and the ritual of making and drinking something warm without a screen.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            <strong>Ashwagandha + chamomile blends:</strong> Ashwagandha is an adaptogen with genuine evidence for reducing cortisol and improving sleep quality, particularly deep sleep. Chamomile contains apigenin, which binds to GABA receptors. Together they are more effective than either alone.
          </p>
          <BlogProductCard asin="B01DQV8BIM" />

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)", margin: "1.8rem 0 0.8rem" }}>
            9:40 PM | Night Skincare That Feels Like Something, Not Like Work
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The goal for a night routine that actually gets done is: therapeutic enough to feel like a reward, short enough that you do it when you're exhausted.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Step 1 — Gentle cleanser:</strong> Single wash with a gentle gel cleanser.
          </p>
          <BlogProductCard asin="B01CCGW4OE" />

          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Step 2 — One treatment:</strong> Minimalist Retinol 0.3% + Squalane Serum. Speed up cell turnover and renew your skin while you sleep.
          </p>
          <BlogProductCard asin="B099MJH88B" />

          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Step 3 — Nourishing moisturiser:</strong> Ceramide cream or a rich gel-cream hybrid to seal everything in.
          </p>
          <BlogProductCard asin="B091JG3GJ5" />

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)", margin: "1.8rem 0 0.8rem" }}>
            9:50 PM | The Silk Pillowcase (Non-Negotiable Upgrade)
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Cotton pillowcases create significant friction against both skin and hair overnight, absorbing the moisture you just applied and contributing to sleep lines over time.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Silk and satin pillowcases reduce friction, leading to less hair breakage and ensuring your skin keeps its hydration.
          </p>

          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)", margin: "1.8rem 0 0.8rem" }}>
            10:00 PM | Lights Out With One Final Check
          </h3>
          <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li>Room as dark as possible (blackout curtains or an eye mask)</li>
            <li>Temperature as low as feasible</li>
            <li>Phone across the room, not on the nightstand</li>
            <li>Magnesium taken 45 minutes ago, working</li>
          </ul>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* CHANGES */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            What Better Sleep Actually Changes
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            The changes aren't immediate, but they are predictable.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Skin:</strong> Deep sleep is when skin cell repair and turnover peaks. Chronic poor sleep shows up as dullness, slower healing of breakouts, and accelerated fine lines. Two weeks of consistent good sleep produces visible changes in skin texture.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Hair:</strong> Hair follicles are affected by cortisol. Elevated night-time cortisol is a documented contributor to telogen effluvium — the diffuse hair fall that Indian women often chalk up to hard water.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Stress response:</strong> The prefrontal cortex is significantly impaired by even one week of mild sleep deprivation. The anxiety that feels inherent and constant often has a large sleep debt component.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>Hunger and cravings:</strong> Two nights of poor sleep measurably reduces leptin and increases ghrelin. If you find yourself craving sugar and carbohydrates in the afternoon, poor sleep is almost always a contributing factor.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* SHORT VERSION */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>
            The Short Version
          </h2>
          <ol style={{ paddingLeft: "1.2rem", margin: "0 0 1.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <li><strong>Warm light after 9pm:</strong> Change the light before anything else.</li>
            <li><strong>Magnesium glycinate:</strong> 200–400mg, 45 minutes before bed.</li>
            <li><strong>Warm shower:</strong> 1–2 hours before sleep. Let the cool-down do the work.</li>
            <li><strong>Calming tea:</strong> Chamomile, passionflower, or ashwagandha blend. No screen while drinking it.</li>
            <li><strong>Three-step skincare max:</strong> Make it slow and pleasant, not efficient.</li>
            <li><strong>Silk pillowcase:</strong> Worth it.</li>
            <li><strong>Phone across the room:</strong> Not negotiable.</li>
            <li><strong>Consistent timing:</strong> Sleep and wake at the same time, even on weekends.</li>
          </ol>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        {/* FAQ */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.65rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1.5rem" }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: "Does magnesium glycinate work immediately?", a: "Most people notice a difference within 3–7 days, with fuller effects at 2–3 weeks. It's not a sedative — the effect builds with consistent use." },
            { q: "What if I can't avoid my phone entirely?", a: "The minimum viable rule: no phone in bed. If you read on your phone, use night mode with warm colour shift enabled, screen brightness at minimum, and stop 20 minutes before you want to sleep." },
            { q: "Is a silk pillowcase worth it for hair fall specifically?", a: "For breakage at the hair shaft — yes, directly. For root-level hair fall, the mechanism is different and requires addressing the underlying cause (deficiency, hormones, stress)." },
            { q: "Can I do just parts of this routine?", a: "Yes. The highest-leverage individual changes are: the light change, the magnesium, and the phone-away-from-bed rule. If you only do three things, do those." },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "1.2rem 0" }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.05rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 0.6rem" }}>{item.q}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "2.5rem 0" }} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 1rem" }}>Further Reading</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { href: "/blog/what-niacinamide-does-to-your-skin", label: "What Niacinamide Actually Does to Your Skin" },
              { href: "/blog/budget-skincare-routine-under-2000", label: "4-Step Indian Skincare Routine Under ₹2000" },
              { href: "/blog/best-sunscreens-india-2026", label: "Best Sunscreens in India (2026)" },
              { href: "/blog/skincare-layering-order", label: "The Right Order to Apply Your Skincare" },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: "0.9rem", color: "var(--rose)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: "0.6rem" }}>{link.label} →</a>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--ink)", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0 0 0.8rem" }}>Not Sure What Your Skin Actually Needs?</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>Take our 4-question skin quiz and get a personalised routine matched to your skin type, concerns, and budget.</p>
          <a href="/tools/routine" style={{ display: "inline-block", background: "#fff", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", borderRadius: 4, fontFamily: "monospace" }}>Get My Routine →</a>
        </section>

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
          Affiliate links disclosed. Mirha & Co. participates in the Amazon Associates Program. We earn a small commission on qualifying purchases at no additional cost to you. Product recommendations are based on ingredient quality and verified customer reviews.
        </p>
      </article>
    </main>
  );
}

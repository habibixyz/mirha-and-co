export const metadata = {
  title: "About | Mirha & Co.",
  description:
    "Mirha & Co. is an intelligent skincare guide for Indian consumers, blending curated ingredient context with AI-powered personalized advice.",
};

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Brain, BookOpen, Fingerprint } from "lucide-react";

export default function AboutPage() {
  return (
    <main>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .about-page {
          --black: #0c0a09;
          --white: #fafaf8;
          --rose: #c8473a;
          --rose-light: #fff5f4;
          --paper: #fffcf8;
          --ink: #1c1917;
          --muted: #8c8179;
          --rule: #e8ded6;
          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-dm-sans), sans-serif;
          overflow-x: hidden;
        }

        .img-wrap {
          border-radius: 24px;
          overflow: hidden;
          background: #fff;
          position: relative;
        }

        .hero-img {
          height: 650px;
          width: 100%;
          grid-column: span 2;
          margin-top: 5rem;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .side-img {
          height: 480px;
          width: 100%;
          margin-bottom: 2rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .img-wrap:hover img {
          transform: scale(1.04);
        }

        .hero {
          background: var(--black);
          color: var(--white);
          padding: 8rem 2.5rem 0rem;
          position: relative;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0; right: 0; width: 50vw; height: 50vw;
          background: radial-gradient(circle, rgba(200,71,58,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          align-items: start;
          padding-bottom: 4rem;
        }

        .eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hero h1 {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(2.8rem, 8vw, 6.2rem);
          line-height: 0.95;
          letter-spacing: 0.02em;
          font-weight: 400;
          word-break: normal;
          overflow-wrap: break-word;
        }

        .hero h1 span {
          color: var(--rose);
          display: block;
          font-family: var(--font-dm-serif), serif;
          font-style: italic;
          font-size: clamp(2rem, 5.5vw, 4.2rem);
          letter-spacing: -0.02em;
          margin-top: 0.75rem;
          line-height: 1.1;
        }

        .hero-copy {
          font-family: var(--font-dm-serif), serif;
          font-size: 1.35rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.7);
          margin-bottom: 3rem;
        }

        .strip {
          background: var(--rose);
          color: #fff;
          padding: 1.2rem 2rem;
          text-align: center;
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 700;
          overflow: hidden;
          line-height: 1.6;
        }

        .section {
          padding: 8rem 2.5rem;
        }

        .section.dark {
          background: var(--black);
          color: var(--white);
        }

        .section.rose {
          background: var(--rose-light);
          color: var(--ink);
        }

        .inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        .section-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(3.5rem, 7vw, 6rem);
          line-height: 0.9;
          letter-spacing: 0.03em;
          font-weight: 400;
          margin-bottom: 2rem;
        }

        .section-title span {
          color: var(--rose);
          display: block;
        }

        .body-copy p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--muted);
          margin-bottom: 1.8rem;
        }

        .dark .body-copy p {
          color: rgba(255,255,255,0.6);
        }

        .body-copy strong {
          color: var(--ink);
          font-weight: 600;
        }

        .dark .body-copy strong {
          color: var(--white);
        }

        .ecosystem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 4rem;
        }

        .ecosystem-card {
          background: #fff;
          border: 1px solid var(--rule);
          border-radius: 20px;
          padding: 2.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .ecosystem-card:hover {
          box-shadow: 0 20px 40px rgba(200,71,58,0.06);
          border-color: rgba(200,71,58,0.3);
          transform: translateY(-5px);
        }

        .eco-icon {
          background: var(--rose-light);
          color: var(--rose);
          width: 60px; height: 60px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
        }

        .ecosystem-card h3 {
          font-family: var(--font-dm-serif), serif;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .ecosystem-card p {
          color: var(--muted);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .honesty-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .honesty-row {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 2rem;
          display: grid;
          grid-template-columns: 0.4fr 1fr;
          gap: 2rem;
          transition: background 0.3s;
        }

        .honesty-row:hover {
          background: rgba(255,255,255,0.06);
        }

        .honesty-row h3 {
          font-family: var(--font-dm-serif), serif;
          font-weight: 400;
          font-size: 1.4rem;
          color: var(--white);
        }

        .honesty-row p {
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          font-size: 1rem;
        }

        .cta {
          padding: 8rem 2.5rem;
          background: var(--rose);
          color: white;
          text-align: center;
        }

        .cta-box {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-box h2 {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(3.5rem, 8vw, 6rem);
          line-height: 0.9;
          margin-bottom: 1.5rem;
        }

        .cta-box p {
          color: rgba(255,255,255,0.8);
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 3rem;
          font-family: var(--font-dm-serif), serif;
          font-style: italic;
        }

        .btn-row {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          padding: 1.2rem 2.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          transition: all 0.3s;
        }

        .btn.primary {
          background: #111;
          color: #fff;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .btn.primary:hover {
          background: #000;
          transform: translateY(-2px);
        }

        .btn.secondary {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .btn.secondary:hover {
          background: rgba(255,255,255,0.2);
        }

        @media (max-width: 900px) {
          .hero-inner,
          .two-col,
          .honesty-row {
            grid-template-columns: 1fr !important;
            gap: 2rem;
          }

          .hero { padding: 6rem 1.5rem 0rem; }
          .section, .cta { padding: 5rem 1.5rem; }

          .ecosystem-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .hero-img {
            height: 400px;
            margin-top: 2rem;
            grid-column: span 1;
          }

          .side-img {
            height: 300px;
            margin-top: 2rem;
          }

          .btn-row {
            flex-direction: column;
            width: 100%;
          }
          .btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="about-page">
        {/* HERO */}
        <section className="hero">
          <div className="hero-inner">
            <div>
              <p className="eyebrow"><Sparkles size={14}/> About Mirha & Co.</p>
              <h1>
                Intelligence
                <br />
                meets skincare.
                <span>For Indian skin.</span>
              </h1>
            </div>

            <div>
              <p className="hero-copy">
                The beauty industry is loud, crowded, and rarely built for our climate. We combined deep ingredient research with a personalized AI engine to bring clarity back to your routine.
              </p>
            </div>

            <div className="img-wrap hero-img">
              <Image 
                src="/images/about-skincare.png" 
                alt="Aesthetic skincare setup" 
                fill 
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </section>

        <div className="strip">
          No Hype • Data-Driven • Climate Aware • AI Powered
        </div>

        {/* ECOSYSTEM */}
        <section className="section rose">
          <div className="inner">
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <p className="eyebrow" style={{ justifyContent: 'center' }}>The Ecosystem</p>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                More than a guide.<br/>A complete intelligence layer.
              </h2>
            </div>

            <div className="ecosystem-grid">
              <div className="ecosystem-card">
                <div className="eco-icon"><Brain size={28} /></div>
                <h3>Mirha Brain</h3>
                <p>
                  Our proprietary AI RAG engine. Trained on our curated database of products and routines, Mirha acts as your warm, highly knowledgeable skincare consultant—filtering out the noise and giving you exact answers for your skin type.
                </p>
              </div>

              <div className="ecosystem-card">
                <div className="eco-icon"><BookOpen size={28} /></div>
                <h3>Climate-Aware Context</h3>
                <p>
                  A heavy cream loved globally might wreck your skin in Mumbai's humidity. We research and categorize every product based on Indian weather realities, hard water, and local skin concerns like stubborn pigmentation.
                </p>
              </div>

              <div className="ecosystem-card">
                <div className="eco-icon"><Fingerprint size={28} /></div>
                <h3>The Skin Journal</h3>
                <p>
                  Skincare requires consistency and observation. Our built-in digital journal lets you track daily routines, log photo updates, and receive AI-driven analysis on what's working and what's causing breakouts over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY THIS EXISTS */}
        <section className="section">
          <div className="inner two-col">
            <div className="body-copy">
              <p className="eyebrow">The Origin</p>
              <h2 className="section-title">
                Beauty is noisy.
                <br />
                <span>Buying shouldn't be.</span>
              </h2>
              <p>
                Every week there is a new serum, sunscreen, or "miracle" routine promising better skin. While some products are genuinely useful, the vast majority are over-marketed and completely wrong for the person buying them.
              </p>
              <p>
                <strong>Mirha & Co. exists to slow that decision down.</strong> 
              </p>
              <p>
                We look at the chemical formulation, the intended use case, the price point, and the suitability for Indian conditions before adding anything to our database. When you search, Mirha Brain synthesizes all of this to give you a clear, hype-free answer.
              </p>
            </div>
            <div className="img-wrap side-img">
              <Image 
                src="/images/about-lifestyle.png" 
                alt="Personalized skincare routine" 
                fill 
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
          </div>
        </section>

        {/* HONESTY & ETHICS */}
        <section className="section dark">
          <div className="inner two-col">
            <div>
              <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Our Baseline</p>
              <h2 className="section-title" style={{ color: '#fff' }}>
                Honest beauty.
                <br />
                <span style={{ color: 'var(--rose)' }}>No pretending.</span>
              </h2>
              <div className="img-wrap side-img" style={{ height: '350px', marginTop: '3rem' }}>
                <Image 
                  src="/images/about-hand.png" 
                  alt="Expertly curated products" 
                  fill 
                  sizes="100vw"
                />
              </div>
            </div>

            <div className="honesty-list">
              <div className="honesty-row">
                <h3>Data, Not Fake Authority</h3>
                <p>
                  We do not fake personal testing. If a recommendation is based on ingredient analysis, scientific consensus, and aggregate public reviews, we treat it exactly as that. 
                </p>
              </div>

              <div className="honesty-row">
                <h3>We Are Not Doctors</h3>
                <p>
                  Mirha Brain is highly intelligent, but it does not replace a dermatologist. Serious acne, burning, eczema, or medical concerns should always be handled by a qualified professional.
                </p>
              </div>

              <div className="honesty-row">
                <h3>Transparent Affiliation</h3>
                <p>
                  We use affiliate links to support the platform's AI infrastructure. However, affiliate status never dictates our recommendations. If a product has a terrible white cast, we will tell you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta-box">
            <h2>Your routine, decoded.</h2>
            <p>
              Stop guessing. Let Mirha analyze your skin concerns and build a hyper-personalized routine using our curated database.
            </p>

            <div className="btn-row">
              <Link href="/dashboard/search" className="btn primary">
                <Sparkles size={16} /> Ask Mirha Brain
              </Link>
              <Link href="/tools/routine" className="btn secondary">
                Build a Routine
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

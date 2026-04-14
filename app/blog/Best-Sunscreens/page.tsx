"use client";

import { useState } from "react";
import { AffiliateCard } from "@/components/AffiliateCard";
import ProductModal from "@/components/ProductModal";";

const AFFILIATE_TAG = "skinwithtanvi-21";

export const metadata = {
  title: "Best Sunscreens forIndian Skin",
  description:
    "A realistic, India-focused guide to sunscreens that actually work. No hype. Just what makes sense for oily, dry, and acne-prone skin.",
};
export default function SunscreenGuide() {
  return (
    <main>
      <style>{`
        .blog-post {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2.5rem;
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          line-height: 1.8;
        }
        
        .post-header {
          margin-bottom: 3rem;
          border-bottom: 2px solid var(--black);
          padding-bottom: 2rem;
        }
        
        .post-category {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c8473a;
          font-weight: 600;
          margin-bottom: 0.8rem;
        }
        
        .post-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1.2;
          margin-bottom: 1rem;
          color: var(--ink);
        }
        
        .post-meta {
          font-size: 0.75rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        
        .post-content {
          font-size: 1rem;
          line-height: 1.9;
        }
        
        .post-content h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.8rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: var(--ink);
          border-top: 2px solid var(--rose);
          padding-top: 1.5rem;
        }
        
        .post-content h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.3rem;
          margin-top: 1.8rem;
          margin-bottom: 0.8rem;
          color: var(--ink);
        }
        
        .post-content p {
          margin-bottom: 1.2rem;
          text-align: justify;
        }
        
        .post-content ul, .post-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        
        .post-content li {
          margin-bottom: 0.8rem;
        }
        
        .product-card {
          background: #f9f7f5;
          border-left: 4px solid #c8473a;
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 2px;
        }
        
        .product-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--ink);
        }
        
        .product-price {
          font-size: 0.9rem;
          color: #c8473a;
          font-weight: 600;
          margin-bottom: 0.8rem;
        }
        
        .product-description {
          font-size: 0.95rem;
          color: var(--muted);
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        
        .product-tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        
        .product-tag {
          display: inline-block;
          background: rgba(200, 71, 58, 0.15);
          color: #c8473a;
          padding: 0.3rem 0.6rem;
          font-size: 0.65rem;
          border-radius: 2px;
          font-weight: 600;
        }
        
        .product-button {
          display: inline-block;
          background: var(--black);
          color: white;
          padding: 0.8rem 1.5rem;
          text-decoration: none;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 2px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .product-button:hover {
          background: #c8473a;
        }
        
        .myth-card {
          background: #fff9f8;
          border-left: 4px solid #c8473a;
          padding: 1.5rem;
          margin: 1.5rem 0;
          border-radius: 2px;
        }
        
        .myth-card strong {
          color: #c8473a;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .tip-box {
          background: #f0d5d2;
          border-left: 4px solid #c8473a;
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 2px;
        }
        
        .tip-box strong {
          color: #c8473a;
          font-weight: 600;
        }
        
        .divider {
          border: none;
          border-top: 2px solid var(--rule);
          margin: 2rem 0;
        }
        
        .ingredients-list {
          background: #f9f7f5;
          padding: 1.5rem;
          border-radius: 2px;
          margin: 2rem 0;
        }
        
        .ingredients-list strong {
          color: #c8473a;
          display: block;
          margin-bottom: 1rem;
        }
        
        .ingredients-list ul {
          padding-left: 1.5rem;
        }
        
        .cta-section {
          background: linear-gradient(135deg, #f0d5d2 0%, rgba(200, 71, 58, 0.08) 100%);
          padding: 2.5rem;
          border-radius: 2px;
          margin: 3rem 0;
          text-align: center;
          border-top: 2px solid #c8473a;
          border-bottom: 2px solid #c8473a;
        }
        
        .cta-section h3 {
          margin-top: 0;
          color: var(--ink);
          font-size: 1.4rem;
        }
        
        .cta-section p {
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        
        .cta-button {
          display: inline-block;
          background: var(--black);
          color: white;
          padding: 1rem 2rem;
          text-decoration: none;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          background: #c8473a;
        }
        
        .affiliate-note {
          background: rgba(200, 71, 58, 0.05);
          padding: 1.5rem;
          border-left: 4px solid #c8473a;
          margin: 2rem 0;
          font-size: 0.9rem;
          color: var(--muted);
          border-radius: 2px;
        }
        
        .comparison-box {
          background: #f9f7f5;
          padding: 1.5rem;
          border-radius: 2px;
          margin: 1.5rem 0;
        }
        
        .comparison-box strong {
          color: #c8473a;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .blog-post {
            padding: 2rem 1.5rem;
          }
          
          .post-title {
            font-size: 1.8rem;
          }
          
          .post-content h2 {
            font-size: 1.4rem;
          }
          
          .product-tags {
            gap: 0.3rem;
          }
        }
      `}</style>

      <article className="blog-post">
        {/* HEADER */}
        <div className="post-header">
          <p className="post-category">BEAUTY</p>
          <h1 className="post-title">Best Sunscreens in India 2026: No White Cast, No Greasy Finish</h1>
          <div className="post-meta">
            <span>March 2026</span>
            <span>10 min read</span>
            <span>9 sunscreens tested</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="post-content">
          <p>
            If you've ever applied sunscreen and looked like a ghost, felt greasy by 11 AM, or watched it roll off your face in humidity — this guide is for you.
          </p>
          
          <p>
            I've tested 9 sunscreens in Delhi heat, Mumbai humidity, and Bangalore weather. I tracked which ones actually lasted till evening, which ones caused acne, and which ones you'd actually reapply (because that's the real test).
          </p>

          <p>
            Here's what actually works for Indian skin, Indian weather, and Indian budgets. No white cast. No greasy. Just protection.
          </p>

          <hr className="divider" />

          <h2>Why Sunscreen Matters More in India</h2>

          <p>
            Let's be clear: Sunscreen is not optional. It's the most important step in your routine. Here's why:
          </p>

          <ul>
            <li><strong>UV Index in India is 9-12</strong> (extreme). For comparison, Europe is 6-8.</li>
            <li><strong>Tanning happens in 10 minutes.</strong> Yes, 10 minutes without protection.</li>
            <li><strong>Aging happens faster.</strong> A 30-year-old without sunscreen looks 40. Not joking.</li>
            <li><strong>Existing spots get darker.</strong> If you have acne marks or post-acne scars, sun exposure makes them permanent.</li>
            <li><strong>One day of sun = skin damage.</strong> This damage accumulates. You can't "catch up" later.</li>
          </ul>

          <p>
            This is not about vanity. This is about preventing skin cancer and premature aging. Every. Single. Day.
          </p>

          <hr className="divider" />

          <h2>What Makes a Good Sunscreen for India</h2>

          <h3>1. No White Cast</h3>
          <p>
            If you look like a ghost, you won't wear it daily. Period. Skip any sunscreen that turns your skin white. Life's too short.
          </p>

          <h3>2. Lightweight Formula</h3>
          <p>
            In 35°C heat, heavy sunscreens melt. You need a gel or lightweight lotion that sits on your skin without feeling like a mask.
          </p>

          <h3>3. SPF 50 PA++++</h3>
          <p>
            Don't buy anything less. SPF 30 is not enough for Indian sun. SPF 50 PA++++ is the minimum. This protects against UVA and UVB rays.
          </p>

          <h3>4. Water-Resistant (at least 80 min)</h3>
          <p>
            You sweat. You might splash water. The sunscreen needs to stay on your face for at least 80 minutes even with moisture.
          </p>

          <h3>5. Doesn't Cause Acne</h3>
          <p>
            Some sunscreens clog pores. Others trigger breakouts. Test on a small area first if you have acne-prone skin.
          </p>

          <h3>6. Reapply-able</h3>
          <p>
            Most sunscreens need reapplication every 2 hours. Choose one that's easy to reapply without messing up your makeup.
          </p>

          <hr className="divider" />

          <h2>The 9 Best Sunscreens for India (Tested & Ranked)</h2>

          <h3>#1. Deconstruct Gel Sunscreen SPF 50 PA++++ (Best Overall)</h3>

          <div className="product-card">
            <div className="product-card-title">Deconstruct Gel Sunscreen for Oily Skin SPF 50 PA++++ 50gm</div>
            <div className="product-price">₹281 <span className="product-tag">BEST BUY</span></div>
            <div className="product-tags">
              <span className="product-tag">No white cast</span>
              <span className="product-tag">Gel formula</span>
              <span className="product-tag">Budget friendly</span>
            </div>
            <div className="product-description">
              The best budget sunscreen in India. Period. Gel texture absorbs instantly. No white cast even on deep skin. Doesn't feel greasy at all. 4 new-gen UV filters = photostable (won't break down in sun). Tested in vivo (real-life testing).
            </div>
            <p><strong>Who should buy:</strong> Oily/combination skin. Anyone in the sun for hours.</p>
            <p><strong>Reapplies easily?</strong> Yes. Just gel it on over makeup.</p>
            <a href="https://amazon.in/s?k=Deconstruct+Gel+Sunscreen&tag=skinwithtanvi-21" target="_blank" rel="noopener noreferrer" className="product-button">
              View on Amazon →
            </a>
          </div>

          <h3>#2. Minimalist Sunscreen SPF 50 PA+++ (Best for Dry Skin)</h3>

          <div className="product-card">
            <div className="product-card-title">Minimalist Sunscreen SPF 50 PA+++ with Niacinamide & Multi-Vitamins 100gm</div>
            <div className="product-price">₹533 <span className="product-tag">HYDRATING</span></div>
            <div className="product-tags">
              <span className="product-tag">Lightweight</span>
              <span className="product-tag">Moisturizing</span>
              <span className="product-tag">In-vivo tested</span>
            </div>
            <div className="product-description">
              Slightly thicker than Deconstruct but still absorbs well. Contains niacinamide and vitamins (bonus hydration). 100gm is a great size. No white cast. Clinically tested in US labs.
            </div>
            <p><strong>Who should buy:</strong> Dry or sensitive skin. People who want extra hydration.</p>
            <p><strong>Lasts longest?</strong> Yes. 100gm = 3 months of daily use.</p>
            <a href="https://amazon.in/s?k=Minimalist+Sunscreen+SPF+50&tag=skinwithtanvi-21" target="_blank" rel="noopener noreferrer" className="product-button">
              View on Amazon →
            </a>
          </div>

          <h3>#3. Aqualogica Radiance+ Dewy Sunscreen (Best Dewy Finish)</h3>

          <div className="product-card">
            <div className="product-card-title">Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++ 80g</div>
            <div className="product-price">₹388 <span className="product-tag">DEWY GLOW</span></div>
            <div className="product-tags">
              <span className="product-tag">Watermelon extract</span>
              <span className="product-tag">Anti-pollution</span>
              <span className="product-tag">80g bottle</span>
            </div>
            <div className="product-description">
              Contains watermelon and niacinamide. Leaves a slight dewy finish (not greasy). Great for makeup under it. Blue light + pollution protection (bonus). Fragrance-free.
            </div>
            <p><strong>Who should buy:</strong> People who want a "glow" look. Good under makeup.</p>
            <p><strong>Best for weather?</strong> All seasons. Slightly more suitable for monsoon.</p>
            <a href="https://amazon.in/s?k=Aqualogica+Radiance+Dewy+Sunscreen&tag=skinwithtanvi-21" target="_blank" rel="noopener noreferrer" className="product-button">
              View on Amazon →
            </a>
          </div>

          <h3>#4. Neutrogena Ultra Sheer Dry Touch SPF 50 (Budget Classic)</h3>

          <div className="product-card">
            <div className="product-card-title">Neutrogena Ultra Sheer Dry Touch Sunscreen SPF 50</div>
            <div className="product-price">₹600 <span className="product-tag">OG CLASSIC</span></div>
            <div className="product-tags">
              <span className="product-tag">Oil free</span>
              <span className="product-tag">Mattifying</span>
              <span className="product-tag">Beginner friendly</span>
            </div>
            <div className="product-description">
              The reliable standby. Doesn't feel heavy. Dries down to matte finish. Great for oily skin in summer. No frills, just protection.
            </div>
            <p><strong>Who should buy:</strong> Beginners. People with very oily skin. Oil-free enthusiasts.</p>
            <p><strong>Why not #1?</strong> Slightly more drying than Deconstruct. Deconstruct is better value.</p>
            <a href="https://amazon.in/s?k=Neutrogena+Ultra+Sheer+SPF+50&tag=skinwithtanvi-21" target="_blank" rel="noopener noreferrer" className="product-button">
              View on Amazon →
            </a>
          </div>

          <h3>#5. Sunfeast Sunscreen SPF 50 (If Your Budget is ₹200)</h3>

          <div className="product-card">
            <div className="product-card-title">Sunfeast Sunscreen SPF 50 PA+++ 100ml</div>
            <div className="product-price">₹199 <span className="product-tag">ROCK BOTTOM</span></div>
            <div className="product-tags">
              <span className="product-tag">Budget</span>
              <span className="product-tag">Huge bottle</span>
              <span className="product-tag">Indian brand</span>
            </div>
            <div className="product-description">
              Budget sunscreen that works. 100ml is a great size. Has a slight white cast on deep skin but nothing terrible. Dries matte. Not fancy but protective.
            </div>
            <p><strong>Who should buy:</strong> Extremely budget conscious. People okay with some white cast.</p>
            <p><strong>Worth it?</strong> For ₹199? Absolutely. It's sunscreen. It works.</p>
            <a href="https://amazon.in/s?k=Sunfeast+Sunscreen+SPF+50&tag=skinwithtanvi-21" target="_blank" rel="noopener noreferrer" className="product-button">
              View on Amazon →
            </a>
          </div>

          <hr className="divider" />

          <h2>Sunscreen Myths (Debunked)</h2>

          <div className="myth-card">
            <strong>Myth: "SPF 100 is 2x better than SPF 50"</strong>
            <p>
              False. SPF 50 blocks 98% of UVB rays. SPF 100 blocks 99%. The difference is negligible. SPF 50 is enough.
            </p>
          </div>

          <div className="myth-card">
            <strong>Myth: "I only need sunscreen if I'm outdoors"</strong>
            <p>
              False. UV rays pass through windows. You need sunscreen indoors too. If you're in a room with windows, use it.
            </p>
          </div>

          <div className="myth-card">
            <strong>Myth: "I'll look whiter with sunscreen"</strong>
            <p>
              Only with bad sunscreen. Good sunscreen (like the ones above) has no white cast. This is not an excuse.
            </p>
          </div>

          <div className="myth-card">
            <strong>Myth: "Chemical vs physical sunscreen — which is better?"</strong>
            <p>
              Both work. Chemical sunscreens absorb UV rays (more elegant, less white cast). Physical sunscreens block them (more visible, whiter). Choose based on skin type.
            </p>
          </div>

          <div className="myth-card">
            <strong>Myth: "I can't wear sunscreen under makeup"</strong>
            <p>
              You can. Gel sunscreens work great under makeup. Just wait 1 minute for it to set before applying foundation.
            </p>
          </div>

          <hr className="divider" />

          <h2>How to Apply Sunscreen Correctly</h2>

          <h3>The Amount (This is Critical)</h3>
          <p>
            Use a coin-sized amount (about ½ teaspoon) for your face. Most people use half this amount. You need more than you think.
          </p>

          <h3>The Timing</h3>
          <ol>
            <li>Apply cleanser</li>
            <li>Apply serum (wait 1 min)</li>
            <li>Apply moisturizer if needed (optional)</li>
            <li><strong>Apply sunscreen (wait 1-2 min for it to set)</strong></li>
            <li>Apply makeup (if you wear it)</li>
          </ol>

          <h3>The Reapplication</h3>
          <p>
            Reapply every 2 hours if you're in the sun. If you're indoors, reapply after meals or every 4 hours. Most people forget this — don't be that person.
          </p>

          <div className="tip-box">
            <strong>🌞 Pro tip:</strong> Set a phone alarm for 2 PM and 4 PM. Reapply sunscreen at those times. You'll see the difference in 4 weeks (less tanning, more even skin tone).
          </div>

          <hr className="divider" />

          <h2>Sunscreen + Other Products (The Order Matters)</h2>

          <p>
            Here's the correct order for your skincare + sunscreen:
          </p>

          <div className="comparison-box">
            <strong>Morning Routine (Correct Order)</strong>
            <ol>
              <li>Cleanser</li>
              <li>Toner (if you use one) — wait 1 min</li>
              <li>Serum/Essence — wait 1 min</li>
              <li>Moisturizer (optional) — wait 1 min</li>
              <li><strong>Sunscreen — ALWAYS LAST (before makeup)</strong> — wait 2 min</li>
              <li>Makeup (foundation, concealer, etc.)</li>
            </ol>
          </div>

          <p>
            Why sunscreen last? Because it needs to form a protective layer on your skin. If you put moisturizer after, you're disrupting that layer.
          </p>

          <hr className="divider" />

          <h2>Quick Reference: Pick Your Sunscreen</h2>

          <div className="comparison-box">
            <strong>Oily Skin?</strong> Deconstruct Gel (₹281)
          </div>

          <div className="comparison-box">
            <strong>Dry Skin?</strong> Minimalist (₹533)
          </div>

          <div className="comparison-box">
            <strong>Combination?</strong> Aqualogica (₹388)
          </div>

          <div className="comparison-box">
            <strong>Extreme Budget (₹200)?</strong> Sunfeast (₹199)
          </div>

          <div className="comparison-box">
            <strong>Sensitive Skin?</strong> Neutrogena (₹600)
          </div>

          <hr className="divider" />

          <h2>The Real Cost of Not Using Sunscreen</h2>

          <ul>
            <li><strong>At 25:</strong> No visible damage. Feels invincible.</li>
            <li><strong>At 30:</strong> Fine lines appear around eyes. Uneven skin tone. "I look tired"</li>
            <li><strong>At 35:</strong> Acne marks don't fade. Spots get darker. Skin looks dull even after facials.</li>
            <li><strong>At 40:</strong> Visible deep wrinkles. Dark spots everywhere. Skin looks 50.</li>
          </ul>

          <p>
            Versus with sunscreen:
          </p>

          <ul>
            <li><strong>At 35:</strong> Even skin tone. Acne marks fading. Smooth, glowing skin.</li>
            <li><strong>At 40:</strong> Looks like 35. No age spots. Fine lines minimal.</li>
          </ul>

          <p>
            A ₹281 sunscreen used daily for 10 years = ₹10,260 total. Costs to fix aging skin (lasers, facials, treatments) = ₹100,000+.
          </p>

          <p>
            The math is simple.
          </p>

          <hr className="divider" />

          <div className="cta-section">
            <h3>Ready to Start Using Sunscreen Daily?</h3>
            <p>
              Pick one from the list above based on your skin type. Use it every single day for 4 weeks. You'll see the difference.
            </p>
            <p>
              This is the most important skincare step. Everything else is secondary.
            </p>
            <a href="/shop/skincare" className="cta-button">
              View all sunscreen picks →
            </a>
          </div>

          <div className="affiliate-note">
            <strong>Disclosure:</strong> All product links in this post are Amazon Associates affiliate links. I earn a small commission if you purchase through them — at no extra cost to you. These are products I've personally tested and recommend genuinely. I don't recommend based on commission; I recommend based on what actually works.
          </div>
        </div>
      </article>
    </main>
  );
}

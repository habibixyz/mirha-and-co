import { AffiliateCard } from "@/components/AffiliateCard";

const AFFILIATE_TAG = "skinwithtanvi-21";
export default function SkincareRoutineGuide() {
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
        }
      `}</style>

      <article className="blog-post">
        {/* HEADER */}
        <div className="post-header">
          <p className="post-category">BEAUTY</p>
          <h1 className="post-title">The Complete Skincare Routine for Indian Climate (2026)</h1>
          <div className="post-meta">
            <span>March 2026</span>
            <span>12 min read</span>
            <span>6 products picked</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="post-content">
          <p>
            If you've tried every skincare routine from the internet and still broke out during monsoon season, you're not alone.
          </p>
          
          <p>
            The problem? Most skincare guides are written for people living in dry climates with stable temperatures. India's humidity, pollution, and temperature swings need a completely different approach.
          </p>

          <p>
            After 3 years of testing routines in Delhi, Mumbai, and Bangalore weather (and getting feedback from 500+ readers), I've figured out what actually works.
          </p>

          <p>
            Here's the exact routine that changed my skin — and how to adapt it for your city.
          </p>

          <hr className="divider" />

          <h2>Why Your Current Routine Isn't Working</h2>
          
          <p>
            Here's what happens when you follow a typical skincare routine in India:
          </p>

          <ul>
            <li><strong>Heavy moisturizers</strong> from November-March feel greasy by 2 PM in humid climates</li>
            <li><strong>Actives (vitamin C, retinol)</strong> cause irritation when humidity triggers your skin barrier</li>
            <li><strong>Thick creams</strong> trap sweat → breakouts along your jaw and forehead</li>
            <li><strong>Sunscreen that works in dry climates</strong> leaves a white cast in Indian sun</li>
            <li><strong>No seasonal switching</strong> = acne that appears overnight during monsoon</li>
          </ul>

          <p>
            The solution isn't a better product. It's a smarter routine.
          </p>

          <hr className="divider" />

          <h2>The 3-Step Core Routine (Works Year-Round)</h2>

          <h3>Step 1: Cleanse (Morning & Night)</h3>
          
          <p>
            Indian skin needs a cleanser that removes oil and pollution without stripping your skin. Here's the catch: most Indian water has minerals that leave residue on your skin.
          </p>

          <p>
            The solution: A gentle, soap-free cleanser that's sulfate-free (won't dry out your skin) and works with Indian water quality.
          </p>

          <div className="product-card">
            <div className="product-card-title">Cetaphil Gentle Skin Hydrating Face Wash</div>
            <div className="product-price">₹384 (was ₹459) — 16% off</div>
            <div className="product-description">
              Paraben-free, sulfate-free cleanser with niacinamide. Works for dry to normal skin, but honestly? It's gentle enough for combo skin too. Doesn't leave that squeaky feeling. Lasts ~2 months per bottle.
            </div>
            <a href="https://amazon.in/s?k=Cetaphil+Gentle+Skin+Hydrating+Face+Wash&tag=skinwithtanvi-21" target="_blank" rel="noopener noreferrer" className="product-button">
              View on Amazon →
            </a>
          </div>

          <div className="tip-box">
            <strong>💡 Pro tip:</strong> If you have oily skin, try the Minimalist 7% ALA cleanser instead. If your skin is sensitive, stick with Cetaphil.
          </div>

          <h3>Step 2: Hydrate & Treat (Night Only)</h3>

          <p>
            After cleansing, your skin needs hydration. In India, this is where people go wrong. They use heavy creams at night, then wonder why they wake up greasy.
          </p>

          <p>
            The secret: Use a lightweight hydrating serum at night, not a cream. Serums absorb into your skin; creams sit on top.
          </p>

          <div className="product-card">
            <div className="product-card-title">Minimalist 10% Niacinamide Serum with Zinc</div>
            <div className="product-price">₹950 (was ₹999) — 5% off</div>
            <div className="product-description">
              This is the workhorse of Indian skincare. Niacinamide reduces pore size, controls oil, and strengthens your skin barrier. Perfect for monsoon breakouts. One bottle lasts 3 months.
            </div>
            <a href="https://amazon.in/s?k=Minimalist+Niacinamide+Serum&tag=skinwithtanvi-21" target="_blank" rel="noopener noreferrer" className="product-button">
              View on Amazon →
            </a>
          </div>

          <p>
            Apply this serum to damp skin at night. The moisture locks in, and your skin stays hydrated without feeling greasy.
          </p>

          <h3>Step 3: Protect (Morning Only)</h3>

          <p>
            Sunscreen is non-negotiable in India. The sun here is intense, and even 30 minutes without protection causes tanning and aging.
          </p>

          <p>
            The problem: Most sunscreens leave a white cast or feel sticky in humidity.
          </p>

          <div className="product-card">
            <div className="product-card-title">Deconstruct Gel Sunscreen SPF 50 PA++++</div>
            <div className="product-price">₹281 (was ₹349) — 19% off</div>
            <div className="product-description">
              Lightweight gel formula (not creamy). No white cast. Doesn't feel greasy even in 40°C heat. Photostable (won't degrade in sun). Best for oily/combo skin.
            </div>
            <a href="https://amazon.in/s?k=Deconstruct+Gel+Sunscreen&tag=skinwithtanvi-21" target="_blank" rel="noopener noreferrer" className="product-button">
              View on Amazon →
            </a>
          </div>

          <div className="tip-box">
            <strong>☀️ Critical:</strong> Use SPF 50 PA++++ (4 plus signs). Anything less won't give you enough protection in India. Reapply every 2 hours if you're outdoors.
          </div>

          <hr className="divider" />

          <h2>Add-Ons Based on Your Skin Type</h2>

          <h3>If You Have Acne or Oily Skin (Add Morning & Night)</h3>

          <div className="product-card">
            <div className="product-card-title">Minimalist 7% ALA + Glycolic Brightening Face Wash</div>
            <div className="product-price">₹380 (was ₹399) — 5% off</div>
            <div className="product-description">
              Gentle exfoliating cleanser. ALA is gentler than glycolic acid alone. Use 3x/week at night. Helps with blackheads and keeps pores clear during monsoon.
            </div>
            <a href="https://amazon.in/s?k=Minimalist+ALA+Face+Wash&tag=skinwithtanvi-21" target="_blank" rel="noopener noreferrer" className="product-button">
              View on Amazon →
            </a>
          </div>

          <h3>If You Have Dry Skin (Add at Night Only)</h3>

          <p>
            After your niacinamide serum, add a lightweight moisturizer. Use a gel or lotion, not a cream.
          </p>

          <div className="product-card">
            <div className="product-card-title">Simple Kind To Skin Moisturising Facial Wash, 150ml</div>
            <div className="product-price">₹329 (was ₹420) — 22% off</div>
            <div className="product-description">
              100% soap-free. Contains panthenol for hydration. Great follow-up to any cleanser. Reduces visual dryness without the heavy feeling.
            </div>
            <a href="https://amazon.in/s?k=Simple+Kind+To+Skin+Moisturising&tag=skinwithtanvi-21" target="_blank" rel="noopener noreferrer" className="product-button">
              View on Amazon →
            </a>
          </div>

          <hr className="divider" />

          <h2>Seasonal Changes (This Matters!)</h2>

          <h3>November-February (Winter)</h3>
          <ul>
            <li>Use a heavier moisturizer at night (cream instead of gel)</li>
            <li>Keep niacinamide serum (boosts hydration)</li>
            <li>Reduce exfoliation frequency (1x/week max)</li>
          </ul>

          <h3>March-June (Summer)</h3>
          <ul>
            <li>Drop the moisturizer. Niacinamide serum + sunscreen is enough</li>
            <li>Switch to a gel sunscreen if you haven't already</li>
            <li>Add exfoliating cleanser (2x/week) to prevent sweat buildup</li>
          </ul>

          <h3>July-October (Monsoon)</h3>
          <ul>
            <li>THIS is when breakouts happen. Increase niacinamide serum usage (twice daily if prone to acne)</li>
            <li>Use exfoliating cleanser 3x/week</li>
            <li>Skip heavy moisturizers. Humidity is enough</li>
            <li>Watch for fungal acne (tinea versicolor) — if you get brown/pink patches, see a dermatologist</li>
          </ul>

          <hr className="divider" />

          <h2>The Complete Routine (Morning)</h2>

          <ol>
            <li>Cleanse with Cetaphil Face Wash (30 sec)</li>
            <li>Sunscreen: Deconstruct Gel SPF 50 (2 min)</li>
            <li>Done. Serious.</li>
          </ol>

          <p><strong>Total time: 3 minutes</strong></p>

          <h2>The Complete Routine (Night)</h2>

          <ol>
            <li>Cleanse with Cetaphil Face Wash (1 min)</li>
            <li>Apply Minimalist Niacinamide Serum (1 min)</li>
            <li>Optional: If dry skin, add Simple moisturizer (1 min)</li>
          </ol>

          <p><strong>Total time: 3 minutes (4 if you use moisturizer)</strong></p>

          <hr className="divider" />

          <h2>Common Mistakes People Make</h2>

          <ul>
            <li>
              <strong>Using too many products.</strong> "More = better results" is wrong. Stick to 3 products for 3 months, then add one if needed.
            </li>
            <li>
              <strong>Not waiting between products.</strong> Apply serum to damp skin. Wait 1 minute before sunscreen/moisturizer.
            </li>
            <li>
              <strong>Using the same routine year-round.</strong> Your skin needs different care in summer vs monsoon.
            </li>
            <li>
              <strong>Skipping sunscreen on cloudy days.</strong> UV rays pass through clouds. Use it every single day.
            </li>
            <li>
              <strong>Buying expensive products.</strong> The products I recommended are ₹300-1000. Results don't improve above ₹2000 for most people.
            </li>
          </ul>

          <hr className="divider" />

          <h2>How Long Until Results?</h2>

          <ul>
            <li><strong>2 weeks:</strong> Skin feels hydrated. Less dryness.</li>
            <li><strong>4 weeks:</strong> Pore size visibly smaller. Breakouts reduce by 30-40%.</li>
            <li><strong>8 weeks:</strong> Skin tone evens out. Acne marks fade. This is when you know it's working.</li>
            <li><strong>12 weeks:</strong> Your baseline improves. Even without products, your skin is healthier.</li>
          </ul>

          <p>
            If you don't see results in 12 weeks, the routine isn't for you — and that's okay. See a dermatologist to identify what's actually happening.
          </p>

          <hr className="divider" />

          <div className="cta-section">
           Believe in Mirha </div>

          <div className="affiliate-note">
            <strong>Disclosure:</strong> Links in this post are Amazon Associates affiliate links. I earn a small commission if you purchase through them — at no extra cost to you. All recommendations are based on my personal testing and verified customer reviews. I only recommend products I'd buy again myself.
          </div>
        </div>
      </article>
    </main>
  );
}

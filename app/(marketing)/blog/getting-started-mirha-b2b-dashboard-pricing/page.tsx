import type { Metadata } from "next";
import BlogFooterTools from "@/components/BlogFooterTools";

export const metadata: Metadata = {
  title: "B2B Portal: Workflows, Analytics, and Pricing | Mirha",
  description: "Explore the Mirha B2B Portal. Step-by-step developer guides for origin whitelisting, database catalog synchronization, and monthly plan pricing.",
  openGraph: {
    title: "B2B Portal: Workflows, Analytics, and Pricing",
    description: "Explore the Mirha B2B Portal. Step-by-step developer guides for origin whitelisting, database catalog synchronization, and monthly plan pricing.",
  },
};

export default function B2BDashboardWorkflowBlogPage() {
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
        .post-body ul { margin-bottom: 2rem; padding-left: 1.5rem; }
        .post-body li { font-size: 1rem; line-height: 1.9; color: #2c2826; font-family: 'DM Sans', sans-serif; margin-bottom: 0.5rem; }
        .highlight-box { background: var(--sand); border-left: 4px solid #7c6b4a; padding: 1.5rem 2rem; margin: 2rem 0; }
        .highlight-box p { margin-bottom: 0; font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.1rem; color: var(--ink); line-height: 1.6; }
        .nav-back { display: block; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; margin: 1.5rem 2.5rem; font-family: 'DM Sans', sans-serif; }
        .nav-back:hover { color: var(--rose); }
        
        .code-container { background: #0d0d0d; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; font-family: monospace; font-size: 0.85rem; color: #7ee787; overflow-x: auto; line-height: 1.5; border: 1px solid rgba(255,255,255,0.1); }
        .code-keyword { color: #ff7b72; }
        .code-string { color: #a5d6ff; }
        .code-comment { color: #8b949e; }
        .code-function { color: #d2a8ff; }
        
        .post-body .cta-box {
          background: var(--sand);
          border-radius: 20px;
          padding: 3rem 2.5rem;
          margin: 4.5rem 0;
          text-align: center;
          border: 1px solid rgba(162, 123, 92, 0.15);
          box-shadow: 0 10px 30px rgba(162, 123, 92, 0.03);
        }
        .post-body .cta-box .cta-title {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          font-weight: 400;
          margin: 0 0 1rem;
          color: var(--black) !important;
          line-height: 1.3;
        }
        .post-body .cta-box .cta-desc {
          font-size: 1rem;
          color: var(--muted) !important;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 580px;
          margin-left: auto;
          margin-right: auto;
        }
        .post-body .cta-box .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--black);
          color: var(--white);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 1rem 2.2rem;
          border-radius: 12px;
          text-decoration: none;
          transition: transform 0.2s, background-color 0.2s, color 0.2s;
          border: none;
        }
        .post-body .cta-box .cta-btn:hover {
          background: var(--rose);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Dark Mode overrides */
        html.dark main {
          background: #0c0a09 !important;
          color: #f5f2ed !important;
        }
        html.dark .post-hdr {
          background: #050404 !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        html.dark .post-stand {
          color: rgba(245, 242, 237, 0.8) !important;
        }
        html.dark .post-meta {
          color: rgba(245, 242, 237, 0.5) !important;
          border-top-color: rgba(255, 255, 255, 0.08) !important;
        }
        html.dark .post-headline,
        html.dark .post-body h2,
        html.dark .post-body h3,
        html.dark .post-body strong {
          color: #f5f2ed !important;
        }
        html.dark .post-body h2 {
          border-top-color: rgba(255, 255, 255, 0.08) !important;
        }
        html.dark .post-body p,
        html.dark .post-body li {
          color: #c4beb8 !important;
        }
        html.dark .nav-back {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        html.dark .nav-back:hover {
          color: var(--rose) !important;
        }
        html.dark .highlight-box {
          background: #161514 !important;
          border-left-color: var(--rose) !important;
        }
        html.dark .highlight-box p {
          color: #f5f2ed !important;
        }
        html.dark .code-container {
          background: #050404 !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
        }
        html.dark .post-body .cta-box {
          background: #161514;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        html.dark .post-body .cta-box .cta-title {
          color: #f5f2ed !important;
        }
        html.dark .post-body .cta-box .cta-desc {
          color: rgba(245, 242, 237, 0.7) !important;
        }
        html.dark .post-body .cta-box .cta-btn {
          background: #fcfbf9;
          color: #0a0a0a;
        }
        html.dark .post-body .cta-box .cta-btn:hover {
          background: var(--rose);
          color: #fff;
        }
        
        @media (max-width: 768px) { .post-hdr { padding: 3.5rem 1.5rem 2.5rem; } .post-body { padding: 2.5rem 1.5rem 4rem; } .nav-back { margin: 1rem 1.5rem; } }
      `}</style>

      <a href="/blog" className="nav-back">← Back to Journal</a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Getting Started with the Mirha & Co. B2B Portal: Workflows, Analytics, and Pricing",
            "image": [
              "https://mirha.co/blog-thumbs/blog_b2b_dashboard.jpg"
            ],
            "datePublished": "2026-08-04T09:00:00+08:00",
            "dateModified": "2026-08-04T09:00:00+08:00",
            "author": [{
              "@type": "Organization",
              "name": "Mirha & Co.",
              "url": "https://mirha.co/"
            }]
          })
        }}
      />

      <header className="post-hdr">
        <div className="post-hdr-inner">
          <span className="post-badge">B2B SaaS · Documentation</span>
          <h1 className="post-headline">
            Getting Started with the Mirha & Co. B2B Portal: Workflows, Analytics, and Pricing
          </h1>
          <p className="post-stand">
            Take full control of your climate-aware e-commerce integrations. Learn how our central B2B portal handles API credentials, whitelisting, catalog uploads, and flexible pricing structures.
          </p>
          <div className="post-meta">
            <span>August 2026</span>
            <span>5 min read</span>
            <span>Developer Guide</span>
            <span>B2B Platform</span>
          </div>
        </div>
      </header>

      <article className="post-body">
        <p>
          Moving towards an API-first beauty retail business requires more than just excellent recommendation algorithms. It demands stable orchestration, secure key provisioning, and a clear overview of how your customers are interacting with environmental variables.
        </p>
        <p>
          To make this integration frictionless, we built the **Mirha B2B Portal**—a unified console where developers and e-commerce managers can control their telemetry pipelines, sync custom inventory catalogs, and manage subscription pricing tiers.
        </p>

        <h2>The Unified Workflow: Step-by-Step</h2>
        <p>
          Whether you are running a single storefront or managing multiple merchant sub-domains, the B2B portal flow is structured into four main phases:
        </p>
        
        <h3>1. Secure Key Retrieval</h3>
        <p>
          When you activate your subscription, a unique API key is generated and hashed using SHA-256 for storage. You can securely look up your key in-band within the first 24 hours of creation using your registered subscription email. If you ever lose your credentials, you can trigger a secure re-delivery or contact support at <code>tanizcoldz@gmail.com</code>.
        </p>

        <h3>2. Domain locking Configuration</h3>
        <p>
          To prevent competitor sites from copying your API key from client-side script tags, you can restrict key utilization to authorized hostnames. In the Developer Console, enter your whitelisted origins. The Mirha API gateway will automatically inspect CORS headers on incoming requests and block unlisted domains.
        </p>

        <h3>3. Persistent Catalog Synchronization</h3>
        <p>
          Save client bandwidth by uploading your inventory catalog directly to the Mirha database. Once synced, you can call the recommendation APIs without transmitting product arrays in every payload.
        </p>

        <h3>4. Demographic Analytics Monitoring</h3>
        <p>
          The analytics widget on the dashboard provides direct access to environmental insights gathered from your customer queries. Track the volume of requests, skin types, and tap water minerals exposure categories.
        </p>

        <h2>Subscription Plans & Quotas</h2>
        <p>
          To accommodate businesses of all sizes, the B2B platform scales dynamically based on request volumes. Every plan is billed monthly and includes unlimited origin locking:
        </p>
        <ul>
          <li>
            <strong>Trial Sandbox (Free):</strong> Includes access with the trial key <code>b2b_trial_key</code> for developer testing and sandboxing. No live database logging.
          </li>
          <li>
            <strong>Growth Tier ($499/mo or ₹41,500/mo):</strong> Designed for scaling retailers. Supports up to 150,000 API requests/month, live tap water hardness telemetry, climate/humidity adaptation, persistent database catalog storage, and whitelisting configurations. *Annual billing available at $399/mo (or ₹33,200/mo).*
          </li>
          <li>
            <strong>Scale Enterprise ($1,899/mo or ₹1,58,000/mo):</strong> Designed for global beauty marketplaces. Supports up to 1,000,000 API requests/month, advanced mineral matrices, dynamic dewpoint adjustment, and dedicated Slack support. *Annual billing available at $1,499/mo (or ₹1,24,000/mo).*
          </li>
          <li>
            <strong>Global Custom (Volume Pricing):</strong> For custom requirements and volumes exceeding 1,000,000 API calls/month, including SLA guarantees, multi-region CDN routing, and custom formulation logic.
          </li>
        </ul>

        <div className="highlight-box">
          <p>
            <strong>Why it matters:</strong>
            <br/><br/>
            With our transparent quota structures, billing is handled securely through integrated platforms (Razorpay and Dodo Payments), ensuring that your service remains uninterrupted as your storefront scales.
          </p>
        </div>

        <div className="cta-box">
          <h3 className="cta-title">Start Optimizing Your Storefront</h3>
          <p className="cta-desc">
            Explore the developer widgets and configure your API settings today.
          </p>
          <a href="/b2b/dashboard" className="cta-btn">
            Open the B2B Dashboard
          </a>
        </div>

        <BlogFooterTools />
      </article>
    </main>
  );
}

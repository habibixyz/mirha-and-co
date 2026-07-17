import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Privacy Policy | Mirha & Co.",
 description: "Privacy policy detailing how Mirha & Co. collects, protects, and handles your personal skin log and account data.",
};

export default function PrivacyPage() {
 return (
 <main>
 <style>{`
 .policy-page {
 --paper: #fffcf8;
 --ink: #2b2826;
 --muted: #8c8179;
 --rule: #e8ded6;
 --rose: #a27b5c;
 --rose-light: #fbf7f2;
 background: var(--paper);
 color: var(--ink);
 font-family: var(--font-dm-sans), sans-serif;
 padding: 8rem 20px 6rem;
 min-height: 100vh;
 }

 .policy-container {
 max-width: 780px;
 margin: 0 auto;
 }

 .policy-header {
 margin-bottom: 4rem;
 border-bottom: 1px solid var(--rule);
 padding-bottom: 2rem;
 }

 .policy-header h1 {
 font-family: var(--font-playfair), serif;
 font-size: clamp(2.5rem, 5vw, 3.5rem);
 font-weight: 700;
 color: #111;
 margin-bottom: 1rem;
 }

 .last-updated {
 font-family: var(--font-mono, monospace);
 font-size: 0.75rem;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 color: var(--rose);
 }

 .policy-content {
 line-height: 1.8;
 font-size: 1.05rem;
 }

 .policy-content h2 {
 font-family: var(--font-playfair), serif;
 font-size: 1.6rem;
 margin: 2.5rem 0 1rem;
 color: #111;
 font-weight: 600;
 }

 .policy-content p {
 color: var(--muted);
 margin-bottom: 1.5rem;
 }

 .policy-content ul {
 margin-bottom: 1.5rem;
 padding-left: 1.5rem;
 color: var(--muted);
 }

 .policy-content li {
 margin-bottom: 0.5rem;
 }

   .policy-content strong {
  color: var(--ink);
  font-weight: 600;
  }

  html.dark .policy-page,
  .dark .policy-page {
    --paper: #0f0e0d !important;
    --ink: #f7f5f2 !important;
    --muted: #aba49d !important;
    --rule: rgba(255, 255, 255, 0.1) !important;
    --rose: #ff4d94 !important;
    --rose-light: #2b111e !important;
    background: var(--paper) !important;
    color: var(--ink) !important;
  }

  html.dark .policy-header h1,
  .dark .policy-header h1,
  html.dark .policy-content h2,
  .dark .policy-content h2 {
    color: #ffffff !important;
  }

  html.dark .policy-content strong,
  .dark .policy-content strong {
    color: var(--ink) !important;
  }
 `}</style>

 <div className="policy-page">
 <div className="policy-container">
 <header className="policy-header">
 <span className="last-updated">Last Updated: June 7, 2026</span>
 <h1>Privacy Policy</h1>
 </header>

 <article className="policy-content">
 <p>
 At <strong>Mirha & Co.</strong>, we take your privacy and the security of your personal data seriously. This Privacy Policy describes how we collect, use, store, and share your personal information when you visit or make a purchase on <strong>https://mirhaandco.com</strong> (the "Site").
 </p>

 <h2>1. Information We Collect</h2>
 <p>
 We collect information to provide a better, more personalized experience on our Platform:
 </p>
 <ul>
 <li><strong>Account Credentials</strong>: Email address, username, and authentication details when you sign up.</li>
 <li><strong>Routine and Journal Data</strong>: Skincare routines you save, product ingredients you search, and skin observations, notes, and photos you upload to your personal skin journal.</li>
 <li><strong>Usage Data</strong>: Device details, browser version, IP address, timezone, and pages visited on the Site.</li>
 </ul>

 <h2>2. How We Use Your Information</h2>
 <p>
 We use the collected information for the following purposes:
 </p>
 <ul>
 <li>To provide and maintain the features of our Platform, including your customized routine logs.</li>
 <li>To analyze ingredient compatibility, answer queries via our AI Consultant, and run skin photo analyses.</li>
 <li>To process payments and manage Pro Plan subscriptions through our billing partners.</li>
 <li>To send service-related notifications, security updates, and newsletters (where opted in).</li>
 </ul>

 <h2>3. Information Sharing and Payments</h2>
 <p>
 We do not sell, rent, or lease your personal information. We only share data with trusted third-party services necessary for our Platform's operations:
 </p>
 <ul>
 <li><strong>Payment Processing</strong>: We do not store credit card numbers. All payment transactions are handled securely by PCI-compliant payment gateways, including <strong>Paddle</strong> and <strong>Razorpay</strong>.</li>
 <li><strong>Database and Hosting</strong>: Your account metadata and skin log records are securely hosted using cloud storage partners (such as Supabase).</li>
 </ul>

 <h2>4. Security and Data Retention</h2>
 <p>
 We implement industry-standard security measures to protect your account and skin logs. We retain your personal data for as long as your account remains active. If you wish to delete your account and associated skin data permanently, you may request deletion at any time.
 </p>

 <h2>5. Your Rights (GDPR & International Users)</h2>
 <p>
 Depending on your location, you may have specific rights regarding your personal information under the General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA). These include:
 </p>
 <ul>
 <li>The right to access the personal information we hold about you.</li>
 <li>The right to correct or update any inaccurate data.</li>
 <li>The right to request the complete deletion of your account and personal records ("Right to be Forgotten").</li>
 </ul>
 <p>
 To exercise any of these rights, please reach out to us at <strong>tanizcoldz@gmail.com</strong>.
 </p>

 <h2>6. Changes to this Policy</h2>
 <p>
 We may update this Privacy Policy from time to time to reflect changes in our practices or operational, legal, or regulatory guidelines. The "Last Updated" date at the top of this page will be adjusted accordingly.
 </p>
 </article>
 </div>
 </div>
 </main>
 );
}

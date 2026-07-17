import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Terms of Service | Mirha & Co.",
 description: "Terms and conditions governing the use of the Mirha & Co. platform, tools, and SaaS subscription services.",
};

export default function TermsPage() {
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
 <h1>Terms of Service</h1>
 </header>

 <article className="policy-content">
 <p>
 Welcome to <strong>Mirha & Co.</strong> (the "Platform", "we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of our website located at <strong>https://mirhaandco.com</strong>, including any tools, skincare analyses, digital logs, search features, and subscription services provided on or through the Platform.
 </p>
 <p>
 By accessing, browsing, registering for an account, or purchasing a subscription on Mirha & Co., you agree to be bound by these Terms. If you do not agree, please do not use the Platform.
 </p>

 <h2>1. Educational Purpose Only</h2>
 <p>
 The Platform provides active skincare ingredient compatibility checking, cosmetic product suggestions, and AI-driven skincare consultation for <strong>educational and informational purposes only</strong>. 
 </p>
 <p>
 <strong>We do not provide medical advice, diagnosis, or treatment.</strong> The content on this website is not intended to substitute for professional medical advice from a qualified dermatologist or medical practitioner. Always seek the advice of your physician with any questions you may have regarding a skin condition or starting a new skincare regimen.
 </p>

 <h2>2. Accounts and Security</h2>
 <p>
 To access certain features, including saving routines, managing a skin journal, or subscribing to our Pro services, you must register for an account. You agree to:
 </p>
 <ul>
 <li>Provide accurate, current, and complete information during registration.</li>
 <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
 <li>Notify us immediately if you discover or suspect any security breaches related to the Platform or your account.</li>
 </ul>

 <h2>3. Subscriptions and Billing</h2>
 <p>
 Certain services on the Platform require a paid subscription ("Pro Plan") or micro-payment access keys.
 </p>
 <ul>
 <li><strong>Billing</strong>: Subscriptions are billed on a recurring monthly or annual basis, or as one-off transaction fees, depending on the plan chosen.</li>
 <li><strong>Payment Processors</strong>: We use secure third-party payment processors (such as Paddle and Razorpay) to handle transaction billing. By initiating a payment, you agree to comply with the terms of our billing partners.</li>
 <li><strong>Auto-Renewal</strong>: Subscriptions will automatically renew at the end of each billing period unless cancelled through your dashboard subscription settings before the renewal date.</li>
 </ul>

 <h2>4. Acceptable Use Policy</h2>
 <p>
 You agree not to use the Platform to:
 </p>
 <ul>
 <li>Violate any local, national, or international laws or regulations.</li>
 <li>Submit false or misleading skin information, photos, or email credentials.</li>
 <li>Attempt to scrape, reverse engineer, copy, or distribute database schemas, active ingredient rules, or codebase contents without express written consent.</li>
 </ul>

 <h2>5. Intellectual Property</h2>
 <p>
 All components of the Platform, including but not limited to text, design, graphics, custom compatibility checking logic, product catalogs, software, and brand assets, are the exclusive property of Mirha & Co. and are protected by international copyright, trademark, and intellectual property laws.
 </p>

 <h2>6. Limitation of Liability</h2>
 <p>
 To the fullest extent permitted by applicable law, in no event shall Mirha & Co. or its creators be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform or products purchased through affiliate links.
 </p>

 <h2>7. Affiliate Link Disclosure</h2>
 <p>
 Mirha & Co. contains links to external retail platforms (including Amazon India). Purchases made through these affiliate links earn us a referral commission at no additional cost to you. Product suggestions are provided based on ingredient compatibility logic and objective data analysis.
 </p>

 <h2>8. Contact Us</h2>
 <p>
 If you have any questions or clarifications regarding these Terms, please contact us at: <strong>tanizcoldz@gmail.com</strong>.
 </p>
 </article>
 </div>
 </div>
 </main>
 );
}

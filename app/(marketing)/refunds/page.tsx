import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Cancellation Policy | Mirha & Co.",
 description: "Learn about subscription cancellations, renewals, and our refund-free policy for Mirha & Co. Pro plans.",
};

export default function RefundsPage() {
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
 <h1>Cancellation &amp; Refund Policy</h1>
 </header>

 <article className="policy-content">
 <p>
 Please read this policy carefully before purchasing a Pro subscription or unlocking digital features on <strong>Mirha &amp; Co.</strong> (the "Site", "we", "us", or "our").
 </p>

 <h2>1. Strict No-Refunds Policy</h2>
 <p>
 Due to the digital nature of our services—including immediate database access, cosmetic product lists, active compatibility checks, and instant AI-generated skin analysis—<strong>we do not offer refunds or credits for any purchases, micro-payments, or subscription renewals under any circumstances</strong>. 
 </p>
 <p>
 Once a transaction is processed, the sale is final. By completing your checkout, you agree to these terms.
 </p>

 <h2>2. Subscription Cancellations</h2>
 <p>
 You may cancel your recurring subscription at any time.
 </p>
 <ul>
 <li><strong>How to Cancel</strong>: You can cancel your subscription renewal directly inside your account dashboard by navigating to the <code>/dashboard/subscription</code> tab, or by emailing our support team at <strong>tanizcoldz@gmail.com</strong>.</li>
 <li><strong>Access Post-Cancellation</strong>: After cancelling, your premium access features will remain active until the end of your current paid billing cycle. No further automatic renewal charges will be made to your payment method.</li>
 <li><strong>No Prorated Credits</strong>: We do not provide prorated credits or refunds for any unused days remaining in your active billing period after cancellation.</li>
 </ul>

 <h2>3. Billing Discrepancies &amp; Duplicate Charges</h2>
 <p>
 If you experience an accidental duplicate charge or technical error during checkout, please notify our support team at <strong>tanizcoldz@gmail.com</strong> within 7 business days with your invoice details. Verified duplicate payments will be promptly reversed.
 </p>

 <h2>4. Contact Us</h2>
 <p>
 If you have any questions or require assistance managing your subscription cancellation, please reach out to us at: <strong>tanizcoldz@gmail.com</strong>.
 </p>
 </article>
 </div>
 </div>
 </main>
 );
}

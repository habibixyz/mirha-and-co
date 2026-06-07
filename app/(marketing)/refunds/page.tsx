import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Mirha & Co.",
  description: "Learn about subscription cancellations, renewals, and our 14-day refund policy for Mirha & Co. Pro plans.",
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
      `}</style>

      <div className="policy-page">
        <div className="policy-container">
          <header className="policy-header">
            <span className="last-updated">Last Updated: June 7, 2026</span>
            <h1>Refund Policy</h1>
          </header>

          <article className="policy-content">
            <p>
              We want you to be completely satisfied with your experience on <strong>Mirha & Co.</strong> Our products are digital goods delivered instantly via subscription. This Refund Policy describes the terms under which refunds may be granted for our SaaS subscription services.
            </p>

            <h2>1. 14-Day Refund Guarantee</h2>
            <p>
              If you are not satisfied with your purchase of our Pro Plan subscription, you are eligible to request a full refund within <strong>14 days</strong> of your initial purchase date.
            </p>
            <p>
              To request a refund within this period, please email us at <strong>support@mirhaandco.com</strong> with your account email address and transaction ID. We process all valid refund requests within 3 to 5 business days, and the funds will return to your original payment method.
            </p>

            <h2>2. Renewals and Subsequent Billing</h2>
            <p>
              Our subscription plans are set to automatically renew at the end of each billing period (monthly or annual). 
            </p>
            <ul>
              <li><strong>Cancellation</strong>: You can cancel your subscription renewal at any time through your dashboard setting at <code>/dashboard/subscription</code>. Your premium features will remain active until the end of your current paid period.</li>
              <li><strong>Renewals</strong>: We do not offer refunds for automatic renewals once they are processed. It is your responsibility to cancel your subscription before the next billing date if you no longer wish to use the service.</li>
            </ul>

            <h2>3. Refund Policy Exclusions</h2>
            <p>
              Refunds will not be issued in the following scenarios:
            </p>
            <ul>
              <li>Requests made more than 14 days after the initial transaction.</li>
              <li>Accounts that have been suspended or terminated due to violations of our Terms of Service (e.g., scraping, database abuse, or account sharing).</li>
              <li>Excessive usage of the AI Consultant or Photo Analysis APIs prior to requesting a refund (monitored to prevent trial abuse).</li>
            </ul>

            <h2>4. Processing Partner Refunds</h2>
            <p>
              If your payment was processed through <strong>Paddle</strong>, you may also request refunds or manage billing issues directly via the Paddle support portal or the receipt link sent to your email.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have any questions, concerns, or wish to submit a refund request, please contact us at: <strong>support@mirhaandco.com</strong>.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}

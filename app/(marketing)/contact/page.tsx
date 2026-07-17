import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Mirha & Co.",
  description:
    "Get in touch with the Mirha & Co. team. We'd love to hear from you — whether it's a question, a B2B collaboration, or just a hello.",
  alternates: {
    canonical: "https://www.mirhaandco.com/contact",
  },
  openGraph: {
    title: "Contact | Mirha & Co.",
    description:
      "Get in touch with the Mirha & Co. team. We'd love to hear from you — whether it's a question, a B2B collaboration, or just a hello.",
    url: "https://www.mirhaandco.com/contact",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirha & Co. Contact Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Mirha & Co.",
    description: "Get in touch with the Mirha & Co. team.",
    images: ["/og-image.png"],
  },
};

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mirha & Co.",
  url: "https://www.mirhaandco.com",
  contactPoint: {
    "@type": "ContactPoint",
    email: "tanizcoldz@gmail.com",
    contactType: "customer support",
    availableLanguage: "English"
  }
};

export default function ContactPage() {
  return (
    <main className="contact-page min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />
      {/* Hero */}
      <section className="contact-hero">
        <p className="contact-eyebrow">
          Get In Touch
        </p>
        <h1 className="contact-title">
          CONTACT US
        </h1>
        <p className="contact-desc">
          Have a question about our tools, a B2B enquiry, or just want to say
          hello? We're happy to help.
        </p>
      </section>

      {/* Cards */}
      <section className="contact-grid">
        {/* General enquiries */}
        <div className="contact-card">
          <p className="card-eyebrow">
            General Enquiries
          </p>
          <h2 className="card-title">
            Say Hello
          </h2>
          <p className="card-desc">
            Questions about our ingredient checker, dupe finder, or anything
            else? Drop us a line.
          </p>
          <a href="mailto:tanizcoldz@gmail.com" className="card-link">
            tanizcoldz@gmail.com →
          </a>
        </div>

        {/* B2B / Partnership */}
        <div className="contact-card">
          <p className="card-eyebrow">
            B2B &amp; Partnerships
          </p>
          <h2 className="card-title">
            Work With Us
          </h2>
          <p className="card-desc">
            Interested in our API for your brand? Head to our B2B page or reach
            out directly for enterprise enquiries.
          </p>
          <Link href="/b2b" className="card-link">
            View B2B Plans →
          </Link>
        </div>

        {/* Support */}
        <div className="contact-card">
          <p className="card-eyebrow">
            Support
          </p>
          <h2 className="card-title">
            Need Help?
          </h2>
          <p className="card-desc">
            Account issues, API questions, or billing? Email our support team
            and we'll get back to you within 24 hours.
          </p>
          <a
            href="mailto:tanizcoldz@gmail.com?subject=Support%20Request"
            className="card-link"
          >
            tanizcoldz@gmail.com →
          </a>
        </div>
      </section>

      {/* Social */}
      <section className="contact-social">
        <p className="contact-social-eyebrow">
          Follow Along
        </p>
        <div className="social-links-container">
          <a
            href="https://www.instagram.com/mirha_andco/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            Instagram ↗
          </a>
          <a
            href="https://www.linkedin.com/company/mirhaandco/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>
    </main>
  );
}

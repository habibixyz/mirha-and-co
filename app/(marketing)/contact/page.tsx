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
    <main className="min-h-screen bg-[#fcfbf9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />
      {/* Hero */}
      <section
        style={{
          borderBottom: "1px solid #ded7cf",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#9c8f85",
            marginBottom: "1rem",
          }}
        >
          Get In Touch
        </p>
        <h1
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            letterSpacing: "0.04em",
            color: "#1a1714",
            lineHeight: 1,
            marginBottom: "1.5rem",
          }}
        >
          CONTACT US
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "1rem",
            color: "#6b5f57",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Have a question about our tools, a B2B enquiry, or just want to say
          hello? We're happy to help.
        </p>
      </section>

      {/* Cards */}
      <section
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "4rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* General enquiries */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #ded7cf",
            borderRadius: "4px",
            padding: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9c8f85",
              marginBottom: "0.75rem",
            }}
          >
            General Enquiries
          </p>
          <h2
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "1.6rem",
              letterSpacing: "0.05em",
              color: "#1a1714",
              marginBottom: "0.5rem",
            }}
          >
            Say Hello
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.88rem",
              color: "#6b5f57",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
            }}
          >
            Questions about our ingredient checker, dupe finder, or anything
            else? Drop us a line.
          </p>
          <a
            href="mailto:tanizcoldz@gmail.com"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#fc2779",
              textDecoration: "none",
              borderBottom: "1px solid #fc2779",
              paddingBottom: "2px",
            }}
          >
            tanizcoldz@gmail.com →
          </a>
        </div>

        {/* B2B / Partnership */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #ded7cf",
            borderRadius: "4px",
            padding: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9c8f85",
              marginBottom: "0.75rem",
            }}
          >
            B2B &amp; Partnerships
          </p>
          <h2
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "1.6rem",
              letterSpacing: "0.05em",
              color: "#1a1714",
              marginBottom: "0.5rem",
            }}
          >
            Work With Us
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.88rem",
              color: "#6b5f57",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
            }}
          >
            Interested in our API for your brand? Head to our B2B page or reach
            out directly for enterprise enquiries.
          </p>
          <Link
            href="/b2b"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#fc2779",
              textDecoration: "none",
              borderBottom: "1px solid #fc2779",
              paddingBottom: "2px",
            }}
          >
            View B2B Plans →
          </Link>
        </div>

        {/* Support */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #ded7cf",
            borderRadius: "4px",
            padding: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9c8f85",
              marginBottom: "0.75rem",
            }}
          >
            Support
          </p>
          <h2
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "1.6rem",
              letterSpacing: "0.05em",
              color: "#1a1714",
              marginBottom: "0.5rem",
            }}
          >
            Need Help?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.88rem",
              color: "#6b5f57",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
            }}
          >
            Account issues, API questions, or billing? Email our support team
            and we'll get back to you within 24 hours.
          </p>
          <a
            href="mailto:tanizcoldz@gmail.com?subject=Support%20Request"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#fc2779",
              textDecoration: "none",
              borderBottom: "1px solid #fc2779",
              paddingBottom: "2px",
            }}
          >
            tanizcoldz@gmail.com →
          </a>
        </div>
      </section>

      {/* Social */}
      <section
        style={{
          borderTop: "1px solid #ded7cf",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9c8f85",
            marginBottom: "1rem",
          }}
        >
          Follow Along
        </p>
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
          <a
            href="https://www.instagram.com/mirha_andco/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#2b2826",
              textDecoration: "none",
            }}
          >
            Instagram ↗
          </a>
          <a
            href="https://www.linkedin.com/company/mirhaandco/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#2b2826",
              textDecoration: "none",
            }}
          >
            LinkedIn ↗
          </a>
        </div>
      </section>
    </main>
  );
}

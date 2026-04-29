import Link from "next/link";

type Section = {
  title: string;
  body: string[];
};

export function SeoBlogPost({
  category,
  title,
  description,
  date,
  readTime,
  sections,
  children,
}: {
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  sections: Section[];
  children?: React.ReactNode;
}) {
  return (
    <main className="seo-post">
      <style>{`
        .seo-post {
          background: #fbf7f1;
          color: #161412;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .post-shell {
          max-width: 780px;
          margin: 0 auto;
          padding: 34px 22px 76px;
        }

        .back-link {
          color: #8b8178;
          font-size: 12px;
          text-decoration: none;
        }

        .post-hero {
          padding: 54px 0 34px;
          border-bottom: 1px solid #e3d8ce;
          margin-bottom: 34px;
        }

        .eyebrow {
          color: #c8473a;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 16px;
        }

        .post-hero h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(38px, 7vw, 66px);
          line-height: 1.02;
          font-weight: 400;
          margin: 0 0 16px;
          letter-spacing: 0;
        }

        .post-description {
          color: #6f665f;
          font-size: 17px;
          line-height: 1.8;
          margin: 0 0 20px;
        }

        .post-meta {
          color: #9a8f86;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .trust-box {
          background: #fffaf4;
          border: 1px solid #e3d8ce;
          border-radius: 12px;
          padding: 18px;
          margin: 0 0 30px;
        }

        .trust-box h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          font-weight: 400;
          margin: 0 0 10px;
        }

        .trust-box p {
          color: #756b63;
          font-size: 13px;
          line-height: 1.7;
          margin: 0;
        }

        .post-section {
          margin: 34px 0;
        }

        .post-section h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 31px;
          line-height: 1.12;
          font-weight: 400;
          margin: 0 0 14px;
        }

        .post-section p {
          color: #2c2826;
          font-size: 16px;
          line-height: 1.9;
          margin: 0 0 18px;
        }

        .post-section ul {
          margin: 0 0 18px;
          padding-left: 20px;
        }

        .post-section li {
          color: #2c2826;
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 8px;
        }

        .verdict {
          background: #161412;
          color: #fbf7f1;
          border-radius: 12px;
          padding: 24px;
          margin: 36px 0;
        }

        .verdict h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 26px;
          font-weight: 400;
          margin: 0 0 10px;
        }

        .verdict p {
          color: rgba(255,255,255,0.68);
          line-height: 1.75;
          margin: 0;
        }

        .post-footer {
          border-top: 1px solid #e3d8ce;
          margin-top: 42px;
          padding-top: 26px;
          color: #756b63;
          font-size: 13px;
          line-height: 1.75;
        }

        .post-footer a {
          color: #c8473a;
          text-decoration: none;
          font-weight: 700;
        }

        @media (max-width: 620px) {
          .post-shell {
            padding: 24px 16px 56px;
          }

          .post-hero {
            padding: 38px 0 28px;
          }

          .post-description {
            font-size: 15px;
          }

          .post-section h2 {
            font-size: 26px;
          }

          .post-section p {
            font-size: 15px;
          }
        }
      `}</style>

      <div className="post-shell">
        <Link href="/blog" className="back-link">
          Back to Journal
        </Link>

        <header className="post-hero">
          <p className="eyebrow">{category}</p>
          <h1>{title}</h1>
          <p className="post-description">{description}</p>
          <div className="post-meta">
            Updated {date} / {readTime} read / Affiliate links disclosed
          </div>
        </header>

        <div className="trust-box">
          <h2>How this guide was written</h2>
          <p>
            Mirha & Co. reviews product fit by looking at ingredient context,
            texture, Indian weather, price, review signals and routine usefulness.
            This is beauty guidance, not medical advice.
          </p>
        </div>

        {sections.map((section) => (
          <section className="post-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        {children}

        <div className="post-footer">
          <p>
            Product prices and availability can change on Amazon. Patch test makeup
            and skincare when your skin is reactive. For acne, melasma, severe hair
            fall or persistent irritation, speak to a qualified dermatologist.
          </p>
          <p>
            Next: <Link href="/tools/routine">build a simple routine</Link> or{" "}
            <Link href="/search">search by concern</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}

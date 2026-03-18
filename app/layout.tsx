import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mirha & Co. — Beauty, Wellness & The Good Life",
  description:
    "Honest reviews, curated finds, and the products worth your money. Beauty and wellness for women who know what they want.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          .nav-link {
            color: var(--muted);
            transition: color 0.2s;
            text-decoration: none;
          }
          .nav-link:hover { color: var(--rose); }

          .footer-link {
            font-size: 0.85rem;
            color: rgba(255,255,255,0.6);
            text-decoration: none;
            transition: color 0.2s;
          }
          .footer-link:hover { color: var(--rose); }
        `}</style>
      </head>
      <body>

        {/* Top bar */}
        <div style={{
          background: "var(--black)",
          color: "var(--white)",
          textAlign: "center",
          padding: "0.5rem 1rem",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
        }}>
          Independent reviews. Honest opinions. Affiliate links disclosed.
        </div>

        {/* Header */}
        <header style={{
          borderBottom: "2px solid var(--black)",
          background: "var(--white)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2.5rem",
            height: "64px",
            borderBottom: "1px solid var(--rule)",
            position: "relative",
          }}>

            {/* Left nav */}
            <nav style={{
              display: "flex",
              gap: "2rem",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              <Link href="/blog/category/beauty" className="nav-link">Beauty</Link>
              <Link href="/blog/category/wellness" className="nav-link">Wellness</Link>
              <Link href="/blog/category/lifestyle" className="nav-link">Lifestyle</Link>
            </nav>

            {/* Centred wordmark */}
            <Link href="/" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2rem",
              letterSpacing: "0.08em",
              color: "var(--black)",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textDecoration: "none",
            }}>
              MIRHA & CO.
            </Link>

            {/* Right nav */}
            <nav style={{
              display: "flex",
              gap: "2rem",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              <Link href="/blog" className="nav-link">All Posts</Link>
              <Link href="/about" className="nav-link">About</Link>
            </nav>

          </div>
        </header>

        {children}

        {/* Footer */}
        <footer style={{
          background: "var(--black)",
          color: "var(--white)",
          padding: "4rem 2.5rem 2.5rem",
        }}>
          <div style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            marginBottom: "2rem",
          }}>

            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.8rem",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}>MIRHA & CO.</div>
              <p style={{
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                maxWidth: "240px",
              }}>
                Honest reviews, curated Amazon finds, and the products actually worth your money.
              </p>
            </div>

            <div>
              <p style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1rem",
              }}>Topics</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["Beauty", "Skincare", "Wellness", "Lifestyle", "Gift Guides"].map((t) => (
                  <Link
                    key={t}
                    href={`/blog/category/${t.toLowerCase()}`}
                    className="footer-link"
                  >{t}</Link>
                ))}
              </div>
            </div>

            <div>
              <p style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1rem",
              }}>Disclosure</p>
              <p style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
              }}>
                Mirha & Co. is a participant in the Amazon Associates Program. We earn from
                qualifying purchases at no extra cost to you. We only recommend products we
                genuinely believe in.
              </p>
            </div>

          </div>

          <div style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.3)",
          }}>
            <span>© 2026 Mirha & Co. All rights reserved.</span>
            <span>Beauty · Wellness · Lifestyle</span>
          </div>
        </footer>

      </body>
    </html>
  );
}

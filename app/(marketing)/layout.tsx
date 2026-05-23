import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "../globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Playfair_Display, Bebas_Neue } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

import { cookies } from "next/headers";
import { Locale, Currency } from "@/lib/globalization";
import { GlobalizationProvider } from "@/components/GlobalizationContext";
import SiteHeader from "@/components/SiteHeader";

export async function generateMetadata() {
  return {
    title: "Mirha & Co. — Beauty, Wellness & The Good Life",
    description:
      "Honest reviews, curated finds, and the products worth your money. Beauty and wellness for women who know what they want.",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("mirha_locale")?.value || "en") as Locale;
  const currency = (cookieStore.get("mirha_currency")?.value || "INR") as Currency;
  const isRtl = locale === "ar";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className={`${dmSans.variable} ${dmSerifDisplay.variable} ${playfairDisplay.variable} ${bebasNeue.variable}`}>
      <body>
        <Script strategy="afterInteractive" src="https://www.dwin1.com/2904237.js" />

        <GlobalizationProvider initialLocale={locale} initialCurrency={currency}>
          {/* Top bar */}
          <div style={{
            background: "var(--black)",
            color: "var(--white)",
            textAlign: "center",
            padding: "0.5rem 1rem",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
          }}>
            Independent reviews. Honest opinions. Affiliate links disclosed.
          </div>

          <SiteHeader />

          {children}
        </GlobalizationProvider>

        {/* Footer */}
        <footer style={{
          background: "var(--black)",
          color: "var(--white)",
          padding: "4rem 2.5rem 2.5rem",
        }}>
          <div
            className="footer-grid"
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "3rem",
              paddingBottom: "3rem",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "2rem",
            }}
          >
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.8rem",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}>MIRHA &amp; CO.</div>
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
                {["Beauty", "Skincare", "Hair", "Wellness", "Lifestyle", "Makeup"].map((t) => (
                  <Link
                    key={t}
                    href={`/blog/category/${t.toLowerCase().replace(" ", "-")}`}
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
                Mirha &amp; Co. is a participant in the Amazon Associates Program. We earn from
                qualifying purchases at no extra cost to you. We only recommend products we
                genuinely believe in.
              </p>
            </div>
          </div>

          <div
            className="footer-bottom"
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            <span>© 2026 Mirha &amp; Co. All rights reserved.</span>
            <span>Beauty · Skincare · Wellness · Lifestyle</span>
          </div>
        </footer>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

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
import NewsletterForm from "@/components/NewsletterForm";

export async function generateMetadata() {
  return {
    title: "Mirha & Co. — Beauty, Wellness & The Good Life",
    description:
      "Honest reviews, curated finds, and the products worth your money. Beauty and wellness for women who know what they want.",
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-verification-code-here",
    },
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
 {/* Top disclosure bar */}
 <div 
 style={{
 background: "#f6f4f2", // Warm premium sand
 color: "#8d8178", // Muted editorial taupe
 textAlign: "center",
 padding: "0.55rem 1rem",
 fontSize: "0.62rem",
 letterSpacing: "0.22em",
 textTransform: "uppercase",
 fontWeight: 600,
 fontFamily: "var(--font-dm-sans), sans-serif",
 borderBottom: "1px solid #ded7cf",
 }}
 >
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
 className="footer-newsletter-row"
 style={{
 maxWidth: "1100px",
 margin: "0 auto 3rem",
 paddingBottom: "3rem",
 borderBottom: "1px solid rgba(255,255,255,0.1)",
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 flexWrap: "wrap",
 gap: "2rem",
 }}
 >
 <div style={{ flex: "1 1 450px" }}>
 <h3 style={{
 fontFamily: "var(--font-playfair), serif",
 fontSize: "1.6rem",
 marginBottom: "0.5rem",
 color: "var(--white)",
 fontWeight: 400,
 }}>Subscribe to the Mirha Skin Desk</h3>
 <p style={{
 fontSize: "0.82rem",
 color: "rgba(255,255,255,0.5)",
 margin: 0,
 lineHeight: 1.6,
 }}>Weekly science-backed skincare breakdowns. No marketing fluff, no sponsored bias.</p>
 </div>
 <div style={{ flex: "1 1 350px", maxWidth: "420px" }}>
 <NewsletterForm />
 </div>
 </div>

 <div
 className="footer-grid"
 style={{
 maxWidth: "1100px",
 margin: "0 auto",
 display: "grid",
 gridTemplateColumns: "1.2fr 1fr 1fr 1.2fr",
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
 }}>Company</p>
 <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
 <Link href="/about" className="footer-link">About Us</Link>
 <Link href="/pricing" className="footer-link">Pricing Plans</Link>
 <Link href="/blog" className="footer-link">Our Blog</Link>
 <Link href="/tools/ingredients" className="footer-link">Ingredient Checker</Link>
 <Link href="/tools/hard-water" className="footer-link">Hard Water Test</Link>
 <Link href="/tools/dupes" className="footer-link">Dupe Finder</Link>
 </div>
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
 flexWrap: "wrap",
 }}
 >
 <span>© 2026 Mirha &amp; Co. All rights reserved.</span>
 <div style={{ display: "flex", gap: "1.5rem" }}>
 <Link href="/terms" className="footer-link" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</Link>
 <Link href="/privacy" className="footer-link" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link>
 <Link href="/refunds" className="footer-link" style={{ color: "inherit", textDecoration: "none" }}>Refund Policy</Link>
 </div>
 <span>Beauty · Skincare · Wellness · Lifestyle</span>
 </div>
 </footer>
 <SpeedInsights />
 <Analytics />
 </body>
 </html>
 );
}

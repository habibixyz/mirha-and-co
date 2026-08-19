import type { Metadata } from "next";
import Script from "next/script";
import FreeAnalysisToolClient from "./FreeAnalysisToolClient";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Free Daily AI Skin Scan | Mirha & Co.",
  description:
    "Upload one selfie for an instant read on moisture barrier strength, congestion, redness, and oil levels — built for quick cosmetic guidance.",
  alternates: {
    canonical: "https://www.mirhaandco.com/tools/analysis",
  },
  openGraph: {
    title: "Free Daily AI Skin Scan | Mirha & Co.",
    description:
      "Get 1 free AI dermatological skin scan every 24 hours. Analyze moisture barrier, acne, redness, and sebum with personalized ingredient routines.",
    url: "https://www.mirhaandco.com/tools/analysis",
    siteName: "Mirha & Co.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Daily AI Skin Scan | Mirha & Co.",
    description: "1 Free AI face scan per day per user/IP. Instant skin analysis & science-backed routine recommendations.",
  },
};

export default async function FreeSkinAnalysisToolPage() {
  const session = await getSession();
  const isLoggedIn = !!session?.userId;

  const siteUrl = "https://www.mirhaandco.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mirha & Co. Free Daily AI Skin Analyzer",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/tools/analysis`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description: "1 Free AI skin scan per day per user/IP. 1 photo upload per scan.",
    },
    description:
      "Instant AI dermatological face scanner analyzing moisture barrier health, acne congestion, redness sensitivity, and sebum oiliness.",
  };

  return (
    <>
      <Script
        id="free-skin-scan-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="mirha-tool-page relative min-h-screen pb-24 bg-[#faf6f0] text-[#161412] dark:bg-[#0c0a09] dark:text-[#f7f5f2]">
        <div style={{ maxWidth: "1120px", width: "100%", marginLeft: "auto", marginRight: "auto", paddingLeft: "20px", paddingRight: "20px", paddingTop: "32px" }}>
          <FreeAnalysisToolClient isLoggedIn={isLoggedIn} />
        </div>
      </main>
    </>
  );
}

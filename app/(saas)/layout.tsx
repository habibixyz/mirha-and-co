import "../globals.css";
import type { Metadata } from "next";
import { SaasSidebar } from "@/components/SaasSidebar";
import { DM_Sans, DM_Serif_Display, Bebas_Neue } from "next/font/google";

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

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Dashboard - Mirha & Co.",
  description: "Manage your personalized routines and skin journal.",
};

export default function SaasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${dmSerifDisplay.variable} ${bebasNeue.variable}`}>
      <body suppressHydrationWarning>
          <div className="saas-layout" style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background: "var(--white)",
            color: "var(--ink)",
            fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif"
          }}>
            <div style={{ display: "flex", flex: 1 }}>
              <SaasSidebar />
              
              <main style={{ flex: 1, padding: "2.5rem 5%", overflowY: "auto", maxWidth: "100vw" }}>
                {children}
              </main>
            </div>

            <style>{`
              @media (min-width: 769px) {
                .saas-layout > div {
                  flex-direction: row;
                }
              }
              @media (max-width: 768px) {
                .saas-layout > div {
                  flex-direction: column;
                }
                main {
                  padding: 1.5rem !important;
                }
              }
            `}</style>
          </div>
      </body>
    </html>
  );
}

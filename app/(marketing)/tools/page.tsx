import type { Metadata } from "next";
import ToolsHubClient from "./ToolsHubClient";

export const metadata: Metadata = {
  title: "Skincare Intelligence Suite & AI Diagnostic Tools | Mirha & Co.",
  description:
    "Explore the complete Mirha & Co. intelligence suite: free AI face skin scanner, climate-calibrated routine builder, city hard water analysis, ingredient collision checker, and B2B recommendation APIs.",
  alternates: {
    canonical: "https://mirha.co/tools",
  },
  openGraph: {
    title: "Skincare Intelligence Suite & AI Diagnostic Tools | Mirha & Co.",
    description:
      "Explore the complete Mirha & Co. intelligence suite: free AI face skin scanner, routine quiz, hard water intelligence, and B2B APIs.",
    url: "https://mirha.co/tools",
    type: "website",
  },
};

export default function ToolsHubPage() {
  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#161412] dark:bg-[#121110] dark:text-[#f7f5f2] transition-colors">
      <ToolsHubClient />
    </main>
  );
}

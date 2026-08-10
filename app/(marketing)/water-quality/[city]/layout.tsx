import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

const CITY_DATA_MIN: Record<string, { name: string; ppm: number; category: string }> = {
  bengaluru: { name: "Bengaluru", ppm: 780, category: "Very Hard" },
  delhi: { name: "Delhi NCR", ppm: 880, category: "Very Hard" },
  mumbai: { name: "Mumbai", ppm: 85, category: "Soft" },
  london: { name: "London", ppm: 260, category: "Very Hard" },
  "new-york": { name: "New York", ppm: 50, category: "Soft" },
  paris: { name: "Paris", ppm: 280, category: "Very Hard" },
  dubai: { name: "Dubai", ppm: 140, category: "Moderately Hard" },
  "los-angeles": { name: "Los Angeles", ppm: 210, category: "Hard" },
};

function getCityData(slug: string) {
  const normalized = slug.toLowerCase().trim();
  if (CITY_DATA_MIN[normalized]) {
    return CITY_DATA_MIN[normalized];
  }

  const cityName = normalized
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash << 5) - hash + normalized.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const calculatedPpm = 80 + (absHash % 420);
  const category = calculatedPpm > 300 ? "Very Hard" : calculatedPpm > 180 ? "Hard" : calculatedPpm > 100 ? "Moderately Hard" : "Soft";

  return {
    name: cityName,
    ppm: calculatedPpm,
    category,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const data = getCityData(city);

  return {
    title: `${data.name} Tap Water & Skin Health Report | Mirha & Co.`,
    description: `Detailed analysis of municipal tap water hardness (${data.ppm} PPM, ${data.category}) and geological minerals in ${data.name}. Learn how it impacts your skin barrier.`,
    alternates: {
      canonical: `https://www.mirhaandco.com/water-quality/${city}`,
    },
    openGraph: {
      title: `${data.name} Tap Water & Skin Health Report | Mirha & Co.`,
      description: `Detailed analysis of municipal tap water hardness (${data.ppm} PPM, ${data.category}) and geological minerals in ${data.name}. Learn how it impacts your skin barrier.`,
      url: `https://www.mirhaandco.com/water-quality/${city}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} Tap Water & Skin Health Report | Mirha & Co.`,
      description: `Detailed analysis of municipal tap water hardness (${data.ppm} PPM, ${data.category}) and geological minerals in ${data.name}. Learn how it impacts your skin barrier.`,
    },
  };
}

export default function CityWaterQualityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

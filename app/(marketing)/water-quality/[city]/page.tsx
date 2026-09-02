import { Metadata } from "next";
import { CITIES, GLOBAL_CITIES } from "@/lib/programmatic-posts";
import CityWaterQualityClient from "./CityWaterQualityClient";
import { getCityData } from "@/lib/water-data";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export function generateStaticParams() {
  const defaultSlugs = [
    "delhi",
    "mumbai",
    "london",
    "new-york",
    "paris",
    "dubai",
    "los-angeles",
    "bengaluru",
  ];
  const citySlugs = [
    ...defaultSlugs,
    ...CITIES.map((c) => c.slug),
    ...GLOBAL_CITIES.map((c) => c.slug),
  ];
  const uniqueCitySlugs = Array.from(new Set(citySlugs));
  return uniqueCitySlugs.map((slug) => ({ city: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const data = getCityData(city);
  const ogImage = "https://www.mirhaandco.com/opengraph-image.png";
  const pageUrl = `https://www.mirhaandco.com/water-quality/${city}`;

  return {
    title: `${data.name} Tap Water Hardness & Skin Audit (${data.ppm} PPM) | Mirha & Co.`,
    description: `Independent tap water telemetry for ${data.name}. Mineral hardness: ${data.ppm} PPM (${data.category}). Calcium, magnesium analysis & neutralizing skincare routine.`,
    keywords: `${data.name} tap water hardness, ${data.name} water ppm, hard water acne ${data.name}, skincare for hard water`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${data.name} Tap Water Quality & Hardness Audit (${data.ppm} PPM)`,
      description: `Live tap water telemetry for ${data.name}, ${data.country}. Mineral hardness: ${data.ppm} PPM (${data.category}). pH & dermatological skin barrier impact.`,
      url: pageUrl,
      type: "website",
      siteName: "Mirha & Co.",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${data.name} Water Hardness Audit`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} Tap Water Hardness Audit (${data.ppm} PPM)`,
      description: `Mineral telemetry and skin barrier routine for ${data.name}.`,
      images: [ogImage],
    },
  };
}

export default async function WaterQualityCityPage({ params }: PageProps) {
  const { city } = await params;
  const citySlug = city || "london";
  const data = getCityData(citySlug);

  return <CityWaterQualityClient data={data} citySlug={citySlug} />;
}

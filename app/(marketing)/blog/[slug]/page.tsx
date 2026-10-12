import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SeoBlogPost } from "@/components/SeoBlogPost";
import { POSTS } from "@/lib/posts";
import { getAllProgrammaticSlugs, getProgrammaticPostBySlug } from "@/lib/programmatic-posts";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const editorialSlugs = POSTS.map((p) => p.slug);
  const programmaticSlugs = getAllProgrammaticSlugs();
  const allSlugs = Array.from(new Set([...editorialSlugs, ...programmaticSlugs]));
  return allSlugs.map((slug) => ({ slug }));
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getProgrammaticPostBySlug(slug);
  
  if (!post) {
    return {};
  }

  const thumb = (post as any).thumbnail;
  const ogImage = thumb
    ? (thumb.startsWith("http") ? thumb : `https://www.mirhaandco.com${thumb}`)
    : "https://www.mirhaandco.com/opengraph-image.png";

  let isoDate = new Date().toISOString();
  try {
    if (post.date) {
      const parsed = new Date(`${post.date} 01:00:00 UTC`);
      if (!isNaN(parsed.getTime())) {
        isoDate = parsed.toISOString();
      }
    }
  } catch {
    // fallback
  }

  return {
    title: `${post.title} | Mirha & Co.`,
    description: post.description,
    keywords: (post as any).tags ? (post as any).tags.join(", ") : post.category,
    authors: [
      { name: "Mirha & Co. Research Team", url: "https://www.mirhaandco.com/about" }
    ],
    creator: "Mirha & Co.",
    publisher: "Mirha & Co.",
    alternates: {
      canonical: `https://www.mirhaandco.com/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${post.title} | Mirha & Co.`,
      description: post.description,
      url: `https://www.mirhaandco.com/blog/${slug}`,
      type: "article",
      siteName: "Mirha & Co.",
      locale: "en_IN",
      publishedTime: isoDate,
      modifiedTime: isoDate,
      section: post.category,
      tags: (post as any).tags || [],
      authors: ["https://www.mirhaandco.com/about"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      site: "@mirhaandco",
      creator: "@mirhaandco",
      images: [ogImage],
    },
  };
}

export default async function ProgrammaticBlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getProgrammaticPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Views are tracked & incremented client-side via GlobalBlogViewTracker.
  // Reading from DB here added a round-trip to every ISR revalidation with no
  // meaningful benefit (count shown on load is cosmetic). Removed to cut latency.
  const views = 0;

  return (
    <SeoBlogPost
      category={post.category}
      title={post.title}
      description={post.description}
      date={post.date}
      readTime={post.readTime}
      sections={post.sections}
      views={views}
      slug={slug}
      tags={(post as any).tags}
      asins={post.asins}
      thumbnail={(post as any).thumbnail}
    />
  );
}

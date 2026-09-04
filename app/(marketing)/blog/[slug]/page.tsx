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

  const ogImage = "https://www.mirhaandco.com/opengraph-image.png";

  return {
    title: `${post.title} | Mirha & Co.`,
    description: post.description,
    keywords: (post as any).tags ? (post as any).tags.join(", ") : post.category,
    authors: [{ name: "Mirha & Co. Skincare Research Lab", url: "https://www.mirhaandco.com/about" }],
    publisher: "Mirha & Co.",
    alternates: {
      canonical: `https://www.mirhaandco.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.mirhaandco.com/blog/${slug}`,
      type: "article",
      siteName: "Mirha & Co.",
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
    />
  );
}

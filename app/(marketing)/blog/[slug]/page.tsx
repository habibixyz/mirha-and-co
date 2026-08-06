import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SeoBlogPost } from "@/components/SeoBlogPost";
import { getProgrammaticPostBySlug, getAllProgrammaticSlugs } from "@/lib/programmatic-posts";
import { cookies, headers } from "next/headers";
import { getLocalizedContent, Currency } from "@/lib/globalization";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getProgrammaticPostBySlug(slug);
  
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Mirha & Co.`,
    description: post.description,
    alternates: {
      canonical: `https://www.mirhaandco.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.mirhaandco.com/blog/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function ProgrammaticBlogPost({ params }: PageProps) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const currency = (cookieStore.get("mirha_currency")?.value || headerStore.get("x-default-currency") || "INR") as Currency;
  const localizeContent = (text: string) => getLocalizedContent(text, currency);
  const { slug } = await params;
  const post = getProgrammaticPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Increment and fetch views
  let views = 0;
  try {
    const updated = await prisma.blogPostView.upsert({
      where: { slug },
      update: { views: { increment: 1 } },
      create: { slug, views: 1 },
    });
    views = updated.views;
  } catch (error) {
    console.error("Error updating view count:", error);
  }

  return (
    <SeoBlogPost
      category={post.category}
      title={localizeContent(post.title)}
      description={localizeContent(post.description)}
      date={post.date}
      readTime={post.readTime}
      sections={post.sections}
      views={views}
      slug={slug}
      tags={(post as any).tags}
    />
  );
}

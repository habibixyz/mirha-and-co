import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SeoBlogPost } from "@/components/SeoBlogPost";
import { AffiliateCard } from "@/components/AffiliateCard";
import { getProgrammaticPostBySlug, getAllProgrammaticSlugs } from "@/lib/programmatic-posts";
import { cookies, headers } from "next/headers";
import { getLocalizedContent, Currency } from "@/lib/globalization";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProgrammaticSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

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

  return (
    <SeoBlogPost
      category={post.category}
      title={localizeContent(post.title)}
      description={localizeContent(post.description)}
      date={post.date}
      readTime={post.readTime}
      sections={post.sections}
    >
      <section className="post-section">
        <h2>Dermatologist-Recommended Skincare Picks</h2>
        <p>
          These products are selected for their texture, ingredients, and ability to handle regional climate challenges.
        </p>
        <div className="cards-row">
          {post.asins.map((asin) => (
            <AffiliateCard key={asin} asin={asin} />
          ))}
        </div>
      </section>
    </SeoBlogPost>
  );
}

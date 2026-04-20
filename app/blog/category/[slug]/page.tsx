import Link from "next/link";

/* =========================
   POSTS DATA (SYNC WITH FOLDERS)
========================= */

const allPosts = [
  // BEAUTY
  {
    category: "beauty",
    title: "What Niacinamide Actually Does to Your Skin (India Edition)",
    excerpt: "The complete no-fluff guide for Indian skin.",
    slug: "what-niacinamide-does-to-your-skin",
    readTime: "10 min",
    date: "March 2026",
  },
  {
    category: "beauty",
    title: "Amazon Skincare Under ₹1500 That Actually Works",
    excerpt: "Budget doesn’t mean compromise.",
    slug: "amazon-skincare-under-1500",
    readTime: "6 min",
    date: "March 2026",
  },
  {
    category: "beauty",
    title: "Best Sunscreens in India (2026)",
    excerpt: "No white cast. Just results.",
    slug: "best-sunscreens-india-2026",
    readTime: "7 min",
    date: "April 2026",
  },
  {
    category: "beauty",
    title: "Budget Beauty Routine Under ₹2000",
    excerpt: "Affordable routine that works.",
    slug: "budget-beauty-routine-2000",
    readTime: "6 min",
    date: "April 2026",
  },
  {
    category: "beauty",
    title: "Budget Skincare Routine Under ₹2000",
    excerpt: "Complete skincare under budget.",
    slug: "budget-skincare-routine-under-2000",
    readTime: "6 min",
    date: "April 2026",
  },
  {
    category: "beauty",
    title: "How to Fix Pigmentation",
    excerpt: "Real solutions that work.",
    slug: "pigmentation-guide",
    readTime: "8 min",
    date: "March 2026",
  },
  {
    category: "beauty",
    title: "Correct Skincare Layering Order",
    excerpt: "Most people get this wrong.",
    slug: "skincare-layering-order",
    readTime: "5 min",
    date: "Jan 2026",
  },
  {
    category: "beauty",
    title: "Skincare Products That Changed My Skin",
    excerpt: "Tried, tested, worth it.",
    slug: "skincare-products-that-changed-my-skin",
    readTime: "6 min",
    date: "Feb 2026",
  },
  {
    category: "beauty",
    title: "Complete Skincare Routine for Indian Skin",
    excerpt: "Everything you actually need.",
    slug: "skincare-routine-complete-india",
    readTime: "8 min",
    date: "Feb 2026",
  },
  {
  category: "beauty",
  title: "Best Niacinamide Serums in India (2026)",
  excerpt: "Ranked by ingredient quality and real results.",
  slug: "best-niacinamide-serums-india",
  readTime: "12 min",
  date: "April 2026",
},
{
  category: "beauty",
  title: "Niacinamide 5% vs 10%",
  excerpt: "Which concentration actually works better.",
  slug: "niacinamide-5-vs-10",
  readTime: "8 min",
  date: "April 2026",
},
{
  category: "beauty",
  title: "Niacinamide for Oily Skin India",
  excerpt: "How it controls oil in Indian humidity.",
  slug: "niacinamide-for-oily-skin",
  readTime: "10 min",
  date: "April 2026",
},
{
  category: "beauty",
  title: "Niacinamide vs Vitamin C",
  excerpt: "Which one your skin actually needs.",
  slug: "niacinamide-vs-vitamin-c",
  readTime: "9 min",
  date: "April 2026",
},

  // WELLNESS
  {
    category: "wellness",
    title: "Morning Routines That Don’t Take 2 Hours",
    excerpt: "Simple, realistic habits.",
    slug: "morning-routines",
    readTime: "5 min",
    date: "March 2026",
  },
  {
    category: "wellness",
    title: "Supplements Worth Taking",
    excerpt: "What works vs hype.",
    slug: "supplements-worth-taking",
    readTime: "9 min",
    date: "Feb 2026",
  },

  // LIFESTYLE
  {
    category: "lifestyle",
    title: "Amazon Buys That Changed My Home",
    excerpt: "Small upgrades. Big impact.",
    slug: "amazon-home-buys",
    readTime: "6 min",
    date: "Jan 2026",
  },
  {
    category: "lifestyle",
    title: "Gift Guide for the Woman Who Has Everything",
    excerpt: "Perfect picks.",
    slug: "gift-guide-woman-who-has-everything",
    readTime: "7 min",
    date: "Feb 2026",
  },
  {
    category: "lifestyle",
    title: "Hard Water is Ruining Your Hair",
    excerpt: "Fix it like this.",
    slug: "hard-water-hair",
    readTime: "6 min",
    date: "March 2026",
  },
];

const catMeta = {
  beauty: {
    label: "Beauty",
    color: "#c8473a",
    description:
      "Skincare, routines, and products that actually work on Indian skin.",
  },
  wellness: {
    label: "Wellness",
    color: "#4a7c6f",
    description:
      "Habits, routines, and supplements that make a real difference.",
  },
  lifestyle: {
    label: "Lifestyle",
    color: "#7c6b4a",
    description:
      "Amazon finds, upgrades, and smart lifestyle improvements.",
  },
};

/* =========================
   STATIC PARAMS
========================= */

export async function generateStaticParams() {
  return Object.keys(catMeta).map((slug) => ({ slug }));
}

/* =========================
   PAGE COMPONENT (SERVER)
========================= */

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug?.toLowerCase?.() as keyof typeof catMeta;

  const meta = catMeta[slug];

  if (!meta) {
  return (
    <main style={{ padding: "6rem", textAlign: "center" }}>
      <h1>Category Not Found</h1>
      <Link href="/blog">← Blog</Link>
    </main>
  );
}

  const posts = allPosts.filter((p) => p.category === slug);

  return (
    <main>
  <section className="cat-hero">
    <Link href="/blog" className="cat-back">
      ← Blog
    </Link>

    <h1 className="cat-title" style={{ color: meta.color }}>
      {meta.label}
    </h1>

    <p className="cat-desc">{meta.description}</p>
  </section>

  {/* FEATURED POST */}
  {posts[0] && (
    <section className="cat-featured">
      <Link href={`/blog/${posts[0].slug}`} className="featured-card">
        <h2>{posts[0].title}</h2>
        <p>{posts[0].excerpt}</p>
        <span>{posts[0].date} · {posts[0].readTime}</span>
      </Link>
    </section>
  )}

  {/* GRID */}
  <section className="cat-grid">
    {posts.slice(1).map((post) => (
      <Link key={post.slug} href={`/blog/${post.slug}`} className="cat-card">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span>{post.date} · {post.readTime}</span>
      </Link>
    ))}
  </section>

  <style>{`
    main {
      background: var(--white);
    }

    /* HERO */
    .cat-hero {
      max-width: 1100px;
      margin: 0 auto;
      padding: 5rem 2rem 3rem;
      border-bottom: 1px solid #eee;
    }

    .cat-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(3rem, 7vw, 6rem);
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }

    .cat-desc {
      font-family: 'DM Serif Display', serif;
      font-size: 1.1rem;
      color: #777;
      max-width: 500px;
      line-height: 1.6;
    }

    .cat-back {
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #999;
      display: inline-block;
      margin-bottom: 2rem;
      text-decoration: none;
    }

    /* FEATURED */
    .cat-featured {
      max-width: 1100px;
      margin: 0 auto;
      padding: 3rem 2rem;
      border-bottom: 1px solid #eee;
    }

    .featured-card {
      text-decoration: none;
      color: black;
      display: block;
    }

    .featured-card h2 {
      font-family: 'DM Serif Display', serif;
      font-size: 2rem;
      line-height: 1.3;
      margin-bottom: 1rem;
    }

    .featured-card p {
      color: #666;
      margin-bottom: 1rem;
      max-width: 600px;
    }

    .featured-card span {
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #999;
    }

    /* GRID */
    .cat-grid {
      max-width: 1100px;
      margin: 0 auto;
      padding: 3rem 2rem 5rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
    }

    .cat-card {
      text-decoration: none;
      color: black;
      border-top: 1px solid #eee;
      padding-top: 1.5rem;
      transition: 0.2s;
    }

    .cat-card:hover {
      border-color: ${meta.color};
    }

    .cat-card h3 {
      font-family: 'DM Serif Display', serif;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .cat-card p {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.8rem;
    }

    .cat-card span {
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #999;
    }

    /* MOBILE */
    @media (max-width: 768px) {
      .cat-grid {
        grid-template-columns: 1fr;
      }

      .featured-card h2 {
        font-size: 1.5rem;
      }
    }
  `}</style>
</main>
  );
}
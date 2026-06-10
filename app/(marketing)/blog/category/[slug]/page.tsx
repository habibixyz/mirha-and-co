import Link from "next/link";
import { POSTS, getRelevantImage } from "@/lib/posts";

/* =========================
 CATEGORY METADATA
========================= */

const catMeta = {
 beauty: {
 label: "Beauty",
 color: "#c8473a",
 description:
 "Skincare, routines, and products that actually work on Indian skin.",
 },
 skincare: {
 label: "Skincare",
 color: "#6d3fa0",
 description:
 "Deep dives into active ingredients, barrier repair, and proven protocols.",
 },
 hair: {
 label: "Hair",
 color: "#1a6e8e",
 description:
 "Guides on hard water, hair fall, and scalp care in Indian climates.",
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
 makeup: {
 label: "Makeup",
 color: "#b7860b",
 description:
 "Sweat-friendly routines, concealers, and starter kits for Indian skin.",
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
 <main style={{ padding: "6rem", textAlign: "center", background: "#faf8f5", minHeight: "100vh" }}>
 <h1 style={{ fontFamily: "var(--font-playfair), serif" }}>Category Not Found</h1>
 <Link href="/blog" style={{ color: "#a27b5c", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.75rem", fontFamily: "monospace", textDecoration: "none" }}>← Back to Journal</Link>
 </main>
 );
 }



 const posts = POSTS.filter((p) => p.category.toLowerCase() === slug).map((p) => ({
 ...p,
 imageSrc: getRelevantImage(p.slug, p.title, p.category)
 }));

 const featured = posts[0];
 const gridPosts = posts.slice(1);

 return (
 <main className="journal-page">
 <style>{`
 *, *::before, *::after { box-sizing: border-box; }
 .journal-page { 
 background-color: #faf8f5; 
 background-image: 
 radial-gradient(circle at 15% 5%, rgba(200,71,58,0.04) 0%, transparent 45%),
 radial-gradient(circle at 85% 30%, rgba(162,123,92,0.03) 0%, transparent 55%);
 color: #2b2826; 
 min-height: 100vh; 
 }
 
 .cat-hero {
 max-width: 1200px;
 margin: 0 auto;
 padding: 6rem 2.5rem 3rem;
 border-bottom: 1px solid #ded7cf;
 }

 .cat-title {
 font-family: var(--font-playfair), serif;
 font-size: clamp(3rem, 6vw, 5.2rem);
 line-height: 1.05;
 font-weight: 700;
 letter-spacing: -0.02em;
 margin: 0 0 1.2rem;
 }

 .cat-desc {
 max-width: 580px;
 color: #6f6963;
 line-height: 1.8;
 font-size: 1.05rem;
 margin: 0;
 }

 .cat-back {
 font-family: var(--font-dm-sans), sans-serif;
 font-size: 0.65rem;
 letter-spacing: 0.3em;
 text-transform: uppercase;
 color: #a27b5c;
 margin-bottom: 2rem;
 font-weight: 700;
 display: inline-block;
 text-decoration: none;
 }

 .featured-band {
 max-width: 1200px;
 margin: 0 auto;
 padding: 4rem 2.5rem 1rem;
 }

 .featured-card {
 display: grid;
 grid-template-columns: 1fr 1fr;
 border: 1px solid #e8ded6;
 background: #fff;
 text-decoration: none;
 color: #111;
 border-radius: 24px;
 overflow: hidden;
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 box-shadow: 0 10px 30px rgba(0,0,0,0.01);
 min-height: 400px;
 }

 .featured-card:hover {
 transform: translateY(-4px);
 box-shadow: 0 25px 50px rgba(162, 123, 92, 0.06);
 border-color: rgba(162, 123, 92, 0.3);
 }

 .featured-image {
 width: 100%;
 height: 100%;
 background: #fbf7f1;
 }
 
 .featured-image img {
 width: 100%;
 height: 100%;
 object-fit: cover;
 }

 .featured-main { padding: 3.5rem; display: flex; flex-direction: column; justify-content: center; }
 
 .featured-main h2 {
 font-family: var(--font-playfair), serif;
 font-size: clamp(1.8rem, 4vw, 2.5rem);
 font-weight: 700;
 line-height: 1.15;
 margin: 0 0 1rem;
 }

 .featured-main p {
 color: #6f6963;
 line-height: 1.75;
 margin: 0 0 2rem;
 font-size: 0.95rem;
 }
 
 .featured-meta {
 color: #9b8e83;
 font-size: 0.7rem;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 font-weight: 600;
 }

 .article-section {
 max-width: 1200px;
 margin: 0 auto;
 padding: 3rem 2.5rem 6rem;
 }

 .article-grid {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 2rem;
 }

 .article-card {
 background: #fff;
 color: #111;
 text-decoration: none;
 padding: 1.5rem;
 min-height: 320px;
 border: 1px solid #e8ded6;
 border-radius: 20px;
 display: flex;
 flex-direction: column;
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 box-shadow: 0 5px 15px rgba(0,0,0,0.01);
 overflow: hidden;
 }

 .article-card:hover { 
 background: #fff; 
 transform: translateY(-4px);
 border-color: rgba(162, 123, 92, 0.3);
 box-shadow: 0 20px 40px rgba(162, 123, 92, 0.05);
 }

 .article-icon {
 width: 100%;
 height: 180px;
 border-radius: 12px;
 background: #fbf7f1;
 overflow: hidden;
 margin-bottom: 1.2rem;
 }

 .article-icon img {
 width: 100%;
 height: 100%;
 object-fit: cover;
 transition: transform 0.5s ease;
 }

 .article-card:hover .article-icon img {
 transform: scale(1.05);
 }

 .article-cat {
 font-family: var(--font-dm-sans), sans-serif;
 font-size: 0.6rem;
 letter-spacing: 0.25em;
 text-transform: uppercase;
 font-weight: 700;
 margin: 0 0 0.75rem;
 }

 .article-card h3 {
 font-family: var(--font-playfair), serif;
 font-size: 1.3rem;
 line-height: 1.3;
 font-weight: 700;
 margin: 0 0 0.8rem;
 color: #111;
 }

 .article-card p {
 color: #6f6963;
 font-size: 0.88rem;
 line-height: 1.7;
 margin: 0;
 }

 .article-meta {
 margin-top: auto;
 padding-top: 1.2rem;
 border-top: 1px solid #f2ebe4;
 display: flex;
 gap: 0.8rem;
 flex-wrap: wrap;
 color: #9b8e83;
 font-size: 0.65rem;
 letter-spacing: 0.1em;
 text-transform: uppercase;
 font-weight: 500;
 }

 @media (max-width: 980px) {
 .featured-card { grid-template-columns: 1fr; }
 .featured-image { height: 250px; }
 .article-grid { grid-template-columns: repeat(2, 1fr); }
 }

 @media (max-width: 640px) {
 .article-grid { grid-template-columns: 1fr; gap: 1rem; }
 .cat-hero, .featured-band, .article-section { padding-left: 1.4rem; padding-right: 1.4rem; }
 .featured-main { padding: 2rem 1.5rem; }
 }
 `}</style>

 <section className="cat-hero">
 <Link href="/blog" className="cat-back">
 ← Back to Journal
 </Link>
 <h1 className="cat-title" style={{ color: meta.color }}>
 {meta.label}
 </h1>
 <p className="cat-desc">{meta.description}</p>
 </section>

 {featured && (
 <section className="featured-band">
 <Link href={`/blog/${featured.slug}`} className="featured-card">
 <div className="featured-image">
 <img src={featured.imageSrc} alt={featured.title} />
 </div>
 <div className="featured-main">
 <h2>{featured.title}</h2>
 <p>{featured.excerpt}</p>
 <div className="featured-meta">
 <span>{featured.date}</span> · <span>{featured.readTime}</span>
 </div>
 </div>
 </Link>
 </section>
 )}

 {gridPosts.length > 0 && (
 <section className="article-section">
 <div className="article-grid">
 {gridPosts.map((post) => (
 <Link key={post.slug} href={`/blog/${post.slug}`} className="article-card">
 <div className="article-icon">
 <img src={post.imageSrc} alt={post.category} />
 </div>
 <p className="article-cat" style={{ color: meta.color }}>{meta.label}</p>
 <h3>{post.title}</h3>
 <p>{post.excerpt}</p>
 <div className="article-meta">
 <span>{post.date}</span>
 <span>{post.readTime}</span>
 </div>
 </Link>
 ))}
 </div>
 </section>
 )}
 </main>
 );
}
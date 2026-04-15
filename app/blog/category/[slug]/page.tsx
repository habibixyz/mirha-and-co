  const allPosts = [
    { category: "beauty",    title: "What Niacinamide Actually Does to Your Skin (India Edition)",            excerpt: "The complete, no-fluff guide — written for Indian skin, Indian weather, and Indian budgets.",  slug: "what-niacinamide-does-to-your-skin",            readTime: "10 min", date: "March 2026" },
    { category: "beauty",    title: "Amazon Skincare Finds Under ₹1500 That Dermatologists Actually Use",      excerpt: "Budget doesn't mean compromise. These prove it.",                                          slug: "amazon-skincare-under-1500",                    readTime: "6 min",  date: "March 2026" },
    { category: "beauty",    title: "The Right Order to Apply Your Skincare (Most People Get This Wrong)",     excerpt: "Layering matters. This is the sequence that actually works.",                              slug: "skincare-layering-order",                       readTime: "5 min",  date: "Jan 2026"   },
    { category: "wellness",  title: "Morning Routines That Don't Require 2 Hours",                             excerpt: "Five things. Twenty minutes. A real difference.",                                         slug: "morning-routines",                              readTime: "5 min",  date: "March 2026" },
    { category: "wellness",  title: "The Supplements Worth Taking (And the Ones That Are Just Hype)",          excerpt: "Honest breakdown. No sponsorships. Just research.",                                       slug: "supplements-worth-taking",                      readTime: "9 min",  date: "Feb 2026"   },
    { category: "lifestyle", title: "Gift Guides for the Woman Who Has Everything",                            excerpt: "She's impossible to shop for. We figured it out.",                                        slug: "gift-guide-woman-who-has-everything",            readTime: "7 min",  date: "Feb 2026"   },
    { category: "lifestyle", title: "The 8 Amazon Buys That Changed How I Live at Home",                      excerpt: "Small upgrades. Massive difference to daily life.",                                       slug: "amazon-home-buys",                              readTime: "6 min",  date: "Jan 2026"   },
  ];

  const catMeta: Record<string, { label: string; color: string; description: string }> = {
    beauty:        { label: "Beauty",      color: "#c8473a", description: "Skincare reviews, ingredient guides, and honest product recommendations for Indian skin." },
    wellness:      { label: "Wellness",    color: "#4a7c6f", description: "Evidence-based wellness — routines, supplements, and habits that make a real difference." },
    lifestyle:     { label: "Lifestyle",   color: "#7c6b4a", description: "Amazon finds, gift guides, and the small upgrades worth your money." },
    skincare:      { label: "Skincare",    color: "#c8473a", description: "Everything skincare — ingredients, routines, and the products that actually work on Indian skin." },
    "gift-guides": { label: "Gift Guides", color: "#7c6b4a", description: "Curated gifts for every occasion — chosen for taste, all on Amazon India." },
  };

  export async function generateStaticParams() {
    return ["beauty", "wellness", "lifestyle", "skincare", "gift-guides"].map((slug) => ({ slug }));
  }

  export default async function CategoryPage({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {
    const { slug: rawSlug } = await params;
    const slug = rawSlug.toLowerCase();
    const meta = catMeta[slug];

    const posts =
      slug === "skincare"
        ? allPosts.filter((p) => p.category === "beauty")
        : slug === "gift-guides"
        ? allPosts.filter((p) => p.category === "lifestyle")
        : allPosts.filter((p) => p.category === slug);

    if (!meta) {
      return (
        <main style={{ padding: "6rem 2.5rem", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", marginBottom: "1rem" }}>
            Category Not Found
          </h1>
          <a href="/blog" style={{ color: "var(--rose)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
            ← Back to all posts
          </a>
        </main>
      );
    }

    return (
      <main>
        <style>{`
          .cat-hero { padding: 6rem 2.5rem 4rem; border-bottom: 2px solid var(--black); position: relative; overflow: hidden; background: var(--white); }
          .cat-hero::before { content: attr(data-label); position: absolute; bottom: -3rem; right: -1rem; font-family: 'Bebas Neue', sans-serif; font-size: 16rem; color: rgba(0,0,0,0.04); line-height: 1; pointer-events: none; text-transform: uppercase; }
          .cat-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
          .cat-back { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); text-decoration: none; font-family: 'DM Sans', sans-serif; margin-bottom: 2rem; transition: color 0.2s; }
          .cat-back:hover { color: var(--rose); }
          .cat-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(4rem, 10vw, 9rem); line-height: 0.9; letter-spacing: 0.03em; margin-bottom: 1.5rem; }
          .cat-desc { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.1rem; color: var(--muted); max-width: 500px; line-height: 1.65; }
          .cat-grid-section { max-width: 1100px; margin: 0 auto; padding: 4rem 2.5rem 6rem; }
          .cat-bar { display: flex; justify-content: space-between; align-items: baseline; border-top: 3px solid var(--black); padding-top: 0.8rem; margin-bottom: 3rem; }
          .cat-bar-label { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; letter-spacing: 0.05em; }
          .cat-bar-count { font-size: 0.65rem; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; }
          .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
          .cat-card { display: block; border-top: 2px solid var(--rule); padding-top: 1.5rem; text-decoration: none; color: var(--ink); transition: border-color 0.2s; }
          .cat-card:hover { border-color: var(--rose); }
          .cat-card-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; line-height: 1.3; margin-bottom: 0.7rem; }
          .cat-card-excerpt { font-size: 0.82rem; color: var(--muted); line-height: 1.65; margin-bottom: 1rem; font-family: 'DM Sans', sans-serif; }
          .cat-card-meta { font-size: 0.62rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; }
          .cat-empty { grid-column: 1 / -1; text-align: center; padding: 4rem; }
          .cat-empty h2 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; margin-bottom: 0.8rem; }
          .cat-empty p { font-size: 0.9rem; color: var(--muted); font-family: 'DM Sans', sans-serif; }
          @media (max-width: 900px) { .cat-grid { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 600px) { .cat-hero { padding: 3rem 1.5rem; } .cat-grid { grid-template-columns: 1fr; } .cat-grid-section { padding: 2.5rem 1.5rem 4rem; } }
        `}</style>

        <section className="cat-hero" data-label={meta.label}>
          <div className="cat-hero-inner">
            <a href="/blog" className="cat-back">← All Posts</a>
            <h1 className="cat-title" style={{ color: meta.color }}>{meta.label}</h1>
            <p className="cat-desc">{meta.description}</p>
          </div>
        </section>

        <section className="cat-grid-section">
          <div className="cat-bar">
            <span className="cat-bar-label">{meta.label} Posts</span>
            <span className="cat-bar-count">{posts.length} article{posts.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="cat-grid">
            {posts.length > 0 ? posts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="cat-card">
                <h2 className="cat-card-title">{post.title}</h2>
                <p className="cat-card-excerpt">{post.excerpt}</p>
                <p className="cat-card-meta">{post.date} · {post.readTime} read</p>
              </a>
            )) : (
              <div className="cat-empty">
                <h2>Coming Soon</h2>
                <p>More {meta.label.toLowerCase()} posts are on the way.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

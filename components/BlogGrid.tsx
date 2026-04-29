import Link from "next/link";

export default function BlogGrid({ posts, featured }: any) {
  return (
    <div className="journal-shell">
      
      <section className="hero">
        <div>
          <p className="eyebrow">Mirha Journal</p>
          <h1>Beauty advice with context.</h1>
          <p>
            SEO-friendly, people-first guides for Indian skin.
          </p>
        </div>

        {featured ? (
          <Link href={`/blog/${featured.slug}`} className="featured-card">
            <div>
              <small>Featured / {featured.category}</small>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
            </div>
            <p>{featured.date} / {featured.readTime}</p>
          </Link>
        ) : null}
      </section>

      <section>
        <div className="grid-head">
          <h2>Latest guides</h2>
          <span>{posts.length} articles</span>
        </div>

        <div className="post-grid">
          {posts.map((post: any) => (
            <Link href={`/blog/${post.slug}`} className="post-card" key={post.slug}>
              <small>{post.category}</small>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="meta">
                {post.date} / {post.readTime}
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
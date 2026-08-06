import { POSTS, Post } from "./posts";
import { HIGH_INTENT_POSTS, HighIntentPost } from "./high-intent-posts";

// ─── Types ──────────────────────────────────────────────────────────────────

export type RelatedPost = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  overlap: number;
};

export type GuideReference = {
  title: string;
  excerpt: string;
  slug: string;
  readTime: string;
  category: string;
};

export type KnowledgeSnippet = {
  blogTitle: string;
  blogSlug: string;
  sectionTitle: string;
  content: string;
};

// ─── Feature 1: Related Posts by Tag Overlap ────────────────────────────────
// Used in: SeoBlogPost.tsx, manual blog pages
// Logic: Count how many tags two posts share → rank by overlap → take top N

export function getRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  limit = 3
): RelatedPost[] {
  const normalizedCurrentTags = currentTags.map((t) => t.toLowerCase().trim());

  return POSTS.filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const postTags = (post.tags || []).map((t) => t.toLowerCase().trim());
      const overlap = postTags.filter((tag) =>
        normalizedCurrentTags.includes(tag)
      ).length;
      return { ...post, overlap };
    })
    .filter((post) => post.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit);
}

// ─── Feature 2: Guides That Feature a Specific Product (ASIN) ───────────────
// Used in: product/[asin]/page.tsx
// Logic: Search HIGH_INTENT_POSTS.asins[] for a given ASIN

export function getGuidesForProduct(asin: string): GuideReference[] {
  return HIGH_INTENT_POSTS.filter((post) =>
    post.asins.includes(asin)
  ).map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    readTime: post.readTime,
    category: post.category,
  }));
}

// ─── Feature 3 & 4: Posts Matching a Skin Concern + Skin Type ───────────────
// Used in: /api/v1/recommend (B2B), DashboardReadingList
// Logic: Filter by tag match on concern or skin type, rank by specificity

export function getPostsForConcern(
  mainConcern: string,
  skinType?: string,
  limit = 3
): GuideReference[] {
  const concern = mainConcern.toLowerCase().trim();
  const skin = (skinType || "").toLowerCase().trim();

  // Synonym expansion — maps API/quiz values to blog tags
  const CONCERN_SYNONYMS: Record<string, string[]> = {
    acne: ["acne", "pimple", "breakout", "salicylic", "benzoyl peroxide", "spot treatment", "active acne"],
    pigmentation: ["pigmentation", "dark spots", "hyperpigmentation", "acne marks", "vitamin c", "niacinamide", "melasma", "tan"],
    dullness: ["dull", "glow", "brightening", "vitamin c", "exfoliant", "skin texture"],
    dehydration: ["dehydration", "dry", "hyaluronic", "ceramide", "moisture", "barrier", "squalane"],
    oily: ["oily", "sebum", "pores", "niacinamide", "salicylic", "oil control"],
    dry: ["dry", "ceramide", "hyaluronic acid", "squalane", "moisture", "barrier"],
    sensitive: ["sensitive", "barrier", "ceramide", "fragrance-free", "cica", "gentle"],
    combination: ["combination", "niacinamide", "lightweight", "oily", "dry"],
  };

  const concernTerms = CONCERN_SYNONYMS[concern] || [concern];
  const skinTerms = CONCERN_SYNONYMS[skin] || [skin];
  const allTerms = [...new Set([...concernTerms, ...skinTerms])];

  return POSTS.filter((post) => {
    const postTags = (post.tags || []).map((t) => t.toLowerCase().trim());
    return allTerms.some((term) => postTags.includes(term));
  })
    .sort((a, b) => {
      // Prioritize posts where concern is a direct tag match
      const aScore = (a.tags || []).filter((t) =>
        concernTerms.includes(t.toLowerCase())
      ).length;
      const bScore = (b.tags || []).filter((t) =>
        concernTerms.includes(t.toLowerCase())
      ).length;
      return bScore - aScore;
    })
    .slice(0, limit)
    .map((post) => ({
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      readTime: post.readTime,
      category: post.category,
    }));
}

// ─── Feature 5: AI Agent Knowledge Base Query ───────────────────────────────
// Used in: lib/agents/conciergeAgent.ts
// Logic: Full-text search through section titles + body of HIGH_INTENT_POSTS
// Returns short, quotable snippets so the AI can cite real content

export function queryKnowledgeBase(
  concern: string,
  skinType?: string,
  limit = 2
): KnowledgeSnippet[] {
  const terms = [concern, skinType].filter(Boolean).map((t) =>
    t!.toLowerCase()
  );

  const matches: Array<KnowledgeSnippet & { score: number }> = [];

  for (const post of HIGH_INTENT_POSTS) {
    for (const section of post.sections) {
      let score = 0;

      const titleLower = section.title.toLowerCase();
      const bodyText = section.body.join(" ").toLowerCase();

      for (const term of terms) {
        if (titleLower.includes(term)) score += 3;
        if (bodyText.includes(term)) score += 1;
      }

      if (score > 0) {
        // Take first sentence of the section as a quotable snippet
        const firstSentence = section.body[0]?.split(/\.\s+/)[0] + "." || "";
        matches.push({
          blogTitle: post.title,
          blogSlug: post.slug,
          sectionTitle: section.title,
          content: firstSentence,
          score,
        });
      }
    }
  }

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score: _score, ...rest }) => rest);
}

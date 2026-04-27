import { SEARCH_INDEX, SearchItem } from "@/lib/searchIndex";

export type SearchResult = SearchItem & {
  score: number;
  matchedTerms: string[];
};

const SYNONYMS: Record<string, string[]> = {
  pimple: ["acne", "breakout"],
  pimples: ["acne", "breakouts"],
  marks: ["pigmentation", "dark spots", "acne marks"],
  spot: ["pigmentation", "dark spots"],
  spots: ["pigmentation", "dark spots"],
  glow: ["dullness", "brightening", "vitamin c"],
  glowing: ["dullness", "brightening", "vitamin c"],
  oily: ["oily skin", "oiliness", "pores"],
  dry: ["dry skin", "dryness", "dehydration"],
  sensitive: ["sensitive skin", "barrier repair"],
  sunscreen: ["spf", "spf 50", "uv"],
  antiaging: ["anti-ageing", "retinol", "fine lines"],
  antiageing: ["anti-ageing", "retinol", "fine lines"],
  cheap: ["budget", "under_500", "under 500"],
  affordable: ["budget", "under_500", "under 500"],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/₹/g, "rs ")
    .replace(/[^a-z0-9%+ ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function expandTerms(query: string) {
  const rawTerms = normalize(query).split(" ").filter(Boolean);
  const expanded = new Set(rawTerms);

  for (const term of rawTerms) {
    for (const synonym of SYNONYMS[term] || []) {
      normalize(synonym).split(" ").forEach((part) => expanded.add(part));
      expanded.add(normalize(synonym));
    }
  }

  if (query.includes("500")) expanded.add("under_500");
  if (query.includes("1000")) expanded.add("under_1000");
  if (query.includes("2000")) expanded.add("under_2000");

  return [...expanded].filter((term) => term.length > 1);
}

function scoreItem(item: SearchItem, terms: string[]) {
  const title = normalize(item.title);
  const description = normalize(item.description);
  const tags = item.tags.map(normalize);
  const haystack = [title, description, ...tags].join(" ");
  let score = 0;
  const matchedTerms: string[] = [];

  for (const term of terms) {
    if (title === term) score += 80;
    if (title.includes(term)) score += 40;
    if (tags.some((tag) => tag === term || tag.includes(term))) score += 30;
    if (description.includes(term)) score += 12;
    if (haystack.includes(term)) matchedTerms.push(term);
  }

  if (item.type === "routine") score += 8;
  if (item.type === "product" && terms.some((term) => ["buy", "product", "under_500", "under_1000"].includes(term))) {
    score += 10;
  }
  if (item.type === "guide" && terms.some((term) => ["why", "how", "guide", "learn"].includes(term))) {
    score += 10;
  }

  return { score, matchedTerms: [...new Set(matchedTerms)] };
}

export function searchMirha(query: string, limit = 24): SearchResult[] {
  const terms = expandTerms(query);
  if (!terms.length) return [];

  return SEARCH_INDEX.map((item) => {
    const result = scoreItem(item, terms);
    return { ...item, ...result };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

import { SEARCH_INDEX } from "@/lib/searchIndex";

const SYNONYMS: Record<string, string[]> = {
  acne: ["acne", "breakout", "pimple", "pores"],
  pigmentation: ["pigmentation", "dark spots", "acne marks", "brightening"],
  oily: ["oily", "oil control", "sebum", "matte"],
  dry: ["dry", "dryness", "dehydration", "hydration", "barrier"],
  sunscreen: ["sunscreen", "spf", "uv"],
  makeup: ["makeup", "concealer", "compact", "mascara", "lipstick"],
};

function expandTerms(query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const expanded = new Set(terms);

  terms.forEach((term) => {
    (SYNONYMS[term] || []).forEach((synonym) => expanded.add(synonym));
  });

  return Array.from(expanded);
}

export function searchMirha(query: string) {
  const terms = expandTerms(query);
  if (!terms.length) return SEARCH_INDEX.slice(0, 24);

  const results = SEARCH_INDEX.map((item) => {
    const title = item.title.toLowerCase();
    const text = [item.title, item.description, ...item.tags].join(" ").toLowerCase();

    let score = 0;

    terms.forEach((term) => {
      if (title === term) score += 10;
      else if (title.includes(term)) score += 6;
      else if (text.includes(term)) score += 3;
    });

    score += terms.filter((t) => text.includes(t)).length * 2;

    return { item, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item)
    .slice(0, 36);

  return results.length ? results : SEARCH_INDEX.slice(0, 12);
}
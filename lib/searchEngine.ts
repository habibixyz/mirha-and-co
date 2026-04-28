import { SEARCH_INDEX, SearchItem } from "@/lib/searchIndex";

const SYNONYMS: Record<string, string[]> = {
  pimples: ["acne", "breakout", "pimple"],
  acne: ["acne", "breakout", "pimple", "pores"],
  marks: ["pigmentation", "dark spots", "acne marks"],
  pigmentation: ["pigmentation", "dark spots", "uneven tone", "brightening"],
  oily: ["oily", "oil control", "sebum", "matte"],
  dry: ["dry", "dryness", "dehydration", "hydration", "barrier"],
  glow: ["glow", "dullness", "brightening", "vitamin c"],
  sunscreen: ["sunscreen", "spf", "uv", "no white cast"],
};

function expandTerms(query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const expanded = new Set<string>(terms);

  terms.forEach((term) => {
    (SYNONYMS[term] || []).forEach((synonym) => expanded.add(synonym));
  });

  return Array.from(expanded);
}

function itemText(item: SearchItem) {
  return [item.title, item.description, ...item.tags].join(" ").toLowerCase();
}

export function searchMirha(query: string) {
  const terms = expandTerms(query);
  if (!terms.length) return SEARCH_INDEX.slice(0, 24);

  return SEARCH_INDEX
    .map((item) => {
      const haystack = itemText(item);
      const title = item.title.toLowerCase();
      let score = 0;

      terms.forEach((term) => {
        if (title.includes(term)) score += 6;
        if (haystack.includes(term)) score += 2;
      });

      if (item.type === "routine") score += 1;
      if (item.type === "product" && query.length > 2) score += 1;

      return { item, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item)
    .slice(0, 36);
}

"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Search, Crown, Sparkles, BookOpen, ShoppingBag, Droplets, ExternalLink } from "lucide-react";
import { searchMirha } from "@/lib/searchIndex";
import { SEARCH_INDEX, SearchItem } from "@/lib/searchIndex";
import { getAISearchAdvice } from "@/app/(saas)/actions";

const QUICK = [
  "oily skin sunscreen",
  "pigmentation routine",
  "niacinamide acne marks",
  "dry sensitive cleanser",
  "beginner skincare routine",
  "retinol night serum",
];

function labelFor(type: SearchItem["type"]) {
  if (type === "product") return "Products";
  if (type === "guide") return "Guides";
  if (type === "routine") return "Routine";
  return "Ingredients";
}

function iconFor(type: SearchItem["type"]) {
  if (type === "product") return <ShoppingBag size={24} color="var(--rose)" />;
  if (type === "guide") return <BookOpen size={24} color="var(--rose)" />;
  if (type === "routine") return <Sparkles size={24} color="var(--rose)" />;
  return <Droplets size={24} color="var(--rose)" />;
}

function ResultCard({ item, isAiRecommended, isBest }: { item: SearchItem; isAiRecommended?: boolean; isBest?: boolean }) {
  return (
    <Link href={item.url} className={`result-card ${isBest ? 'is-best' : ''} ${item.image ? 'with-image' : ''}`}>
      {item.image && (
        <div className="result-image">
          <img src={item.image} alt={item.title} />
        </div>
      )}
      
      <div className="card-content">
        <div style={{ display: 'flex', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
          {isBest && <span className="mirha-choice-badge">✨ Mirha Choice</span>}
          <span className="type-badge">{labelFor(item.type)}</span>
          {isAiRecommended && <span className="ai-badge">AI Recommended</span>}
        </div>
        
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        
        {item.price && (
          <div style={{ marginTop: '12px' }}>
            <span style={{ color: '#c8473a', fontWeight: 700, fontSize: '0.8rem' }}>₹{item.price.toLocaleString("en-IN")}</span>
          </div>
        )}
      </div>
      
      <ArrowRight size={14} className="result-arrow" />
    </Link>
  );
}

export function SearchClient({ isPro }: { isPro: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [aiAdvice, setAiAdvice] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Sync query state with URL param and update URL on change
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q !== query) setQuery(q);
  }, [searchParams]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set("q", val);
    else params.delete("q");
    router.replace(`/dashboard/search?${params.toString()}`);
  };

  const results = useMemo(() => searchMirha(query), [query]);
  const groups = useMemo(() => {
    const recommendedIds = aiAdvice?.recommendedIds || [];
    
    return results.reduce<Record<string, SearchItem[]>>((acc, item) => {
      acc[item.type] ||= [];
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [results, aiAdvice]);

  // Sort groups to put AI recommended items first
  const sortedGroups = useMemo(() => {
    const recommendedIds = aiAdvice?.recommendedIds || [];
    const sorted: Record<string, SearchItem[]> = {};
    
    Object.entries(groups).forEach(([type, items]) => {
      sorted[type] = [...items].sort((a, b) => {
        const aRec = recommendedIds.includes(a.id);
        const bRec = recommendedIds.includes(b.id);
        if (aRec && !bRec) return -1;
        if (!aRec && bRec) return 1;
        return 0;
      });
    });
    
    return sorted;
  }, [groups, aiAdvice]);

  useEffect(() => {
    if (query.length < 5) {
      setAiAdvice(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsAiLoading(true);
      try {
        const advice = await getAISearchAdvice(query);
        setAiAdvice(advice);
      } catch (err) {
        console.error("AI Advice failed", err);
      } finally {
        setIsAiLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, isPro]);

  return (
    <main style={{ minHeight: '100%' }}>
      <style>{`

        .search-shell {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 0 80px;
        }

        .eyebrow {
          color: #c8473a;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 16px;
        }

        h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 8vw, 64px);
          line-height: 1.05;
          font-weight: 400;
          margin: 0 0 18px;
          max-width: 760px;
          word-break: break-word;
        }

        .intro {
          color: var(--dash-muted);
          font-size: 1rem;
          line-height: 1.6;
          max-width: 620px;
          margin: 0 0 30px;
        }

        .search-box {
          background: #fff;
          border: 1px solid var(--dash-border);
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 20px;
          margin-bottom: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: all 0.2s ease;
        }
        
        .search-box:focus-within {
          border-color: var(--rose);
          box-shadow: 0 8px 24px rgba(200, 71, 58, 0.08);
        }

        .search-box input {
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
          color: #161412;
          padding: 20px 0;
          font-size: 16px;
          min-width: 0;
        }

        .search-box button {
          border: 0;
          background: transparent;
          color: #8c8179;
          cursor: pointer;
          font-size: 18px;
        }

        .quick-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 42px;
        }

        .quick-row button {
          border: 1px solid #ded3ca;
          background: #fffaf4;
          color: #756b63;
          border-radius: 999px;
          padding: 9px 13px;
          font-size: 12px;
          cursor: pointer;
        }

        .group {
          margin-bottom: 38px;
        }

        .group-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--rule);
        }

        .group-head h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(24px, 5vw, 30px);
          font-weight: 400;
          margin: 0;
        }

        .group-head span {
          color: #988d84;
          font-size: 12px;
        }

        .result-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .mirha-choice-badge {
          background: #c8473a;
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 4px;
          width: fit-content;
          margin-bottom: 8px;
          box-shadow: 0 2px 8px rgba(200, 71, 58, 0.3);
        }

        .result-card.is-best {
          border: 2px solid #c8473a22;
          background: #fffdfc;
          transform: scale(1.02);
        }

        .result-card {
          position: relative;
          background: #fff;
          border: 1px solid var(--dash-border);
          border-radius: 16px;
          padding: 20px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 18px;
          gap: 14px;
          color: inherit;
          text-decoration: none;
          min-height: 140px;
          transition: all 0.2s ease;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .result-card.with-image {
          grid-template-columns: 88px minmax(0, 1fr) 18px;
        }

        .result-card:hover {
          border-color: #c8473a;
        }

        .result-image {
          background: #fff;
          border: 1px solid #eee5dd;
          border-radius: 9px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .result-image img {
          width: 80%;
          height: 80%;
          object-fit: contain;
        }

        .result-card small {
          color: #c8473a;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .type-badge {
          background: #f4f0ec;
          color: #8c8179;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ai-badge {
          background: #fff1f0;
          color: #c8473a;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .result-card h3 {
          font-size: 17px;
          line-height: 1.3;
          margin: 8px 0 7px;
          color: #1a1a1a;
        }

        .result-card p {
          color: #756b63;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .result-arrow {
          margin-top: 4px;
          color: #a89c92;
        }

        .result-card.ai-highlight {
          border-color: #c8473a33;
          background: #fff9f8;
        }
        .ai-reco-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .ai-reco-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (max-width: 600px) {
          .ai-reco-grid {
            grid-template-columns: 1fr;
          }
        }

        .ai-reco-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          color: white;
          transition: all 0.2s;
        }

        .ai-reco-item:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .pro-upsell-card {
          background: #1c1917;
          border-radius: 12px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #fafaf8;
          text-decoration: none;
          min-height: 130px;
          transition: transform 0.2s;
        }

        .pro-upsell-card:hover {
          transform: translateY(-2px);
        }

        .pro-upsell-card h3 {
          font-size: 16px;
          margin: 8px 0 4px;
          font-weight: 500;
        }

        .pro-upsell-card p {
          color: #a39b94;
          font-size: 13px;
          margin: 0;
        }

        .ai-badge {
          position: absolute;
          top: -10px;
          right: 12px;
          background: #c8473a;
          color: white;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 4px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 10px rgba(200, 71, 58, 0.2);
          z-index: 2;
        }

        .brain-card {
          background: #1c1917;
          border-radius: 24px;
          padding: 2rem;
          margin-bottom: 3rem;
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .brain-bg-icon {
          position: absolute;
          top: -20px;
          right: -20px;
          opacity: 0.1;
        }

        @media (max-width: 760px) {
          .search-shell {
            padding: 20px 0 60px;
          }

          .result-grid {
            grid-template-columns: 1fr;
          }

          .result-card,
          .result-card.with-image {
            grid-template-columns: 70px minmax(0, 1fr);
          }

          .result-card:not(.with-image) {
            grid-template-columns: minmax(0, 1fr);
          }

          .result-arrow {
            display: none;
          }

          .result-image {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>

      <div className="search-shell">
        <p className="eyebrow">Mirha Search</p>
        <h1>Ask for what your skin needs.</h1>
        <p className="intro">
          Search products, routines, ingredients and guides. It is rule-based,
          fast and accurate. Find exactly what solves your issue.
        </p>

        <div className="search-box">
          <Search size={18} color="#9a8f86" />
          <input
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Try oily skin sunscreen, pigmentation, niacinamide..."
            autoFocus
          />
          {query ? <button onClick={() => handleQueryChange("")}>x</button> : null}
        </div>

        <div className="quick-row">
          {QUICK.map((item) => (
            <button key={item} onClick={() => handleQueryChange(item)}>
              {item}
            </button>
          ))}
        </div>

        {/* ✅ AI BRAIN ADVICE */}
        {(isAiLoading || aiAdvice) && (
          <div className="brain-card">
            <div className="brain-bg-icon">
              <Sparkles size={120} color="white" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
              <Sparkles size={20} color="#c8473a" />
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#c8473a" }}>Mirha Brain Mode</span>
            </div>
            
            {isAiLoading ? (
              <div style={{ padding: '1rem 0' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.6, fontStyle: "italic" }}>Mirha Brain is analyzing your request...</p>
                <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '1rem', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '30%', background: '#c8473a', borderRadius: '2px', animation: 'loadingMove 1.5s infinite linear' }}></div>
                </div>
                <style>{`
                  @keyframes loadingMove {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(400%); }
                  }
                `}</style>
              </div>
            ) : (
              <>
                <p style={{ margin: "0 0 1.5rem", fontSize: "1.1rem", lineHeight: 1.6, fontFamily: "var(--dash-font-serif)" }}>{aiAdvice?.advice}</p>
                
                {/* Embedded Recommendations */}
                {aiAdvice?.recommendedIds?.length > 0 && (
                  <div className="ai-reco-box">
                    <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem", opacity: 0.7 }}>Recommended for you:</p>
                    <div className="ai-reco-grid">
                      {aiAdvice.recommendedIds.map((id: string) => {
                        const item = SEARCH_INDEX.find(i => i.id === id);
                        if (!item) return null;
                        return (
                          <Link key={id} href={item.url} className="ai-reco-item">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {iconFor(item.type)}
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>View {labelFor(item.type)}</div>
                              </div>
                            </div>
                            <ExternalLink size={14} style={{ opacity: 0.5 }} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {(["routine", "ingredient", "guide", "product"] as const).map((type) => {
          const items = sortedGroups[type] || [];
          if (!items.length) return null;

          // 🔓 TEST MODE: Showing all items for developer testing
          const visibleItems = items; // isPro ? items : items.slice(0, 2);
          const hasHiddenItems = false; // !isPro && items.length > 2;

          return (
            <section className="group" key={type}>
              <div className="group-head">
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {iconFor(type)}
                  <h2>{labelFor(type)}</h2>
                </div>
                <span>{items.length} match{items.length === 1 ? "" : "es"}</span>
              </div>
              <div className="result-grid">
                {visibleItems.map((item, index) => (
                  <ResultCard 
                    key={item.id} 
                    item={item} 
                    isAiRecommended={aiAdvice?.recommendedIds?.includes(item.id)}
                    isBest={results.indexOf(item) === 0}
                  />
                ))}
                
                {/* Pro Upsell Removed - Search is now free for all users */}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

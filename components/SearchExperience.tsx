"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { searchMirha } from "@/lib/searchIndex";
import { SearchItem } from "@/lib/searchIndex";

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

function ResultCard({ item }: { item: SearchItem }) {
 return (
 <Link href={item.url} className={`result-card ${item.image ? "with-image" : ""}`}>
 {item.image ? (
 <div className="result-image">
 <img src={item.image} alt={item.title} />
 </div>
 ) : null}
 <div>
 <small>{item.type}{item.price ? ` / Rs ${item.price.toLocaleString("en-IN")}` : ""}</small>
 <h3>{item.title}</h3>
 <p>{item.description}</p>
 </div>
 <ArrowRight size={14} className="result-arrow" />
 </Link>
 );
}

export default function SearchExperience() {
 const [query, setQuery] = useState("");
 const inputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
   const handleKeyDown = (e: KeyboardEvent) => {
     const target = e.target as HTMLElement;
     const isTyping = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
     if (e.key === "/" && !isTyping) {
       e.preventDefault();
       inputRef.current?.focus();
     }
     if (e.key === "Escape" && document.activeElement === inputRef.current) {
       setQuery("");
       inputRef.current?.blur();
     }
   };
   window.addEventListener("keydown", handleKeyDown);
   return () => window.removeEventListener("keydown", handleKeyDown);
 }, []);

  const results = useMemo(() => searchMirha(query), [query]);
  const hasResults = results.length > 0;
  const groups = useMemo(() => {
    return results.reduce<Record<string, SearchItem[]>>((acc, item) => {
      acc[item.type] ||= [];
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [results]);

  return (
    <main className="search-page">
      <style>{`
        .search-page {
          min-height: 100vh;
          background: #fbf7f1;
          color: #161412;
          font-family: 'DM Sans', sans-serif;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Dark Mode Overrides */
        .dark .search-page {
          background: #0c0a09;
          color: #f7f5f2;
        }

        .search-shell {
          max-width: 1080px;
          margin: 0 auto;
          padding: 70px 24px 80px;
        }

        .eyebrow {
          color: #fc2779;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 16px;
          transition: color 0.3s;
        }
        
        .dark .eyebrow {
          color: #ff4d94;
        }

        h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(42px, 7vw, 78px);
          line-height: 0.98;
          font-weight: 400;
          margin: 0 0 18px;
          max-width: 760px;
        }

        .intro {
          color: #756b63;
          font-size: 15px;
          line-height: 1.8;
          max-width: 620px;
          margin: 0 0 30px;
          transition: color 0.3s;
        }
        
        .dark .intro {
          color: #aba49d;
        }

        .search-box {
          background: #fffaf4;
          border: 1px solid #ded3ca;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 18px;
          margin-bottom: 14px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .dark .search-box {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .search-box:focus-within {
          border-color: #fc2779;
          box-shadow: 0 0 0 4px rgba(252, 39, 121, 0.15);
          background: #ffffff;
        }
        
        .dark .search-box:focus-within {
          border-color: #ff4d94;
          box-shadow: 0 0 0 4px rgba(255, 77, 148, 0.2);
          background: rgba(255, 255, 255, 0.06);
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
          transition: color 0.3s;
        }
        
        .dark .search-box input {
          color: #f7f5f2;
        }

        .search-box button {
          border: 0;
          background: transparent;
          color: #8c8179;
          cursor: pointer;
          font-size: 18px;
          transition: color 0.2s;
        }
        
        .search-box button:hover {
          color: #fc2779;
        }
        
        .dark .search-box button:hover {
          color: #ff4d94;
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
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .dark .quick-row button {
          border-color: rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.02);
          color: #aba49d;
        }

        .quick-row button:hover {
          background: #fc2779;
          color: #ffffff;
          border-color: #fc2779;
          transform: translateY(-1px);
        }
        
        .dark .quick-row button:hover {
          background: #ff4d94;
          color: #ffffff;
          border-color: #ff4d94;
        }

        .group {
          margin-bottom: 38px;
        }

        .group-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 18px;
          margin-bottom: 14px;
        }

        .group-head h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 30px;
          font-weight: 400;
          margin: 0;
        }

        .group-head span {
          color: #988d84;
          font-size: 12px;
          transition: color 0.3s;
        }
        
        .dark .group-head span {
          color: #aba49d;
        }

        .result-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .result-card {
          position: relative;
          background: #fffaf4;
          border: 1px solid #e2d7cd;
          border-radius: 12px;
          padding: 18px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 18px;
          gap: 14px;
          color: inherit;
          text-decoration: none;
          min-height: 130px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .dark .result-card {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .result-card.with-image {
          grid-template-columns: 88px minmax(0, 1fr) 18px;
        }

        .result-card:hover {
          border-color: #fc2779;
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(252, 39, 121, 0.08);
        }
        
        .dark .result-card:hover {
          border-color: #ff4d94;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 12px 30px rgba(255, 77, 148, 0.08);
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
          transition: border-color 0.3s;
        }
        
        .dark .result-image {
          background: #141312;
          border-color: rgba(255, 255, 255, 0.08);
        }

        .result-image img {
          width: 80%;
          height: 80%;
          object-fit: contain;
        }

        .result-card small {
          color: #fc2779;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          transition: color 0.3s;
        }
        
        .dark .result-card small {
          color: #ff4d94;
        }

        .result-card h3 {
          font-size: 17px;
          line-height: 1.3;
          margin: 8px 0 7px;
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
          transition: color 0.3s;
        }
        
        .dark .result-card p {
          color: #aba49d;
        }

        .result-arrow {
          margin-top: 4px;
          color: #a89c92;
          transition: all 0.2s ease;
        }
        
        .result-card:hover .result-arrow {
          transform: translateX(3px);
          color: #fc2779;
        }
        
        .dark .result-card:hover .result-arrow {
          color: #ff4d94;
        }

        /* Empty state styling */
        .no-results {
          text-align: center;
          padding: 64px 24px;
          background: #fffaf4;
          border: 1px dashed #ded3ca;
          border-radius: 16px;
          margin-top: 20px;
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .dark .no-results {
          background: rgba(255, 255, 255, 0.01);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .no-results-icon {
          font-size: 40px;
          margin-bottom: 18px;
        }

        .no-results h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          margin: 0 0 10px;
        }

        .no-results p {
          color: #756b63;
          font-size: 14px;
          max-width: 480px;
          margin: 0 auto 24px;
          line-height: 1.65;
        }
        
        .dark .no-results p {
          color: #aba49d;
        }

        .clear-search-btn {
          background: #fc2779;
          color: #ffffff;
          border: none;
          padding: 11px 24px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clear-search-btn:hover {
          background: #e01b65;
          transform: translateY(-1px);
        }
        
        .dark .clear-search-btn {
          background: #ff4d94;
        }
        
        .dark .clear-search-btn:hover {
          background: #e03b7e;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 760px) {
          .search-shell {
            padding: 46px 16px 60px;
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

          .search-kbd-hint {
            display: none;
          }

          .quick-row button {
            padding: 10px 14px;
            font-size: 12.5px;
          }
        }
      `}</style>

      <div className="search-shell">
        <p className="eyebrow">Mirha Search</p>
        <h1>Ask for what your skin needs.</h1>
        <p className="intro">
          Search products, routines, ingredients and guides. It is rule-based,
          fast and free to run, with no AI API needed.
        </p>

        <div className="search-box">
          <Search size={18} color="#9a8f86" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try oily skin sunscreen, pigmentation, niacinamide..."
            autoFocus
          />
          {query ? (
            <button onClick={() => setQuery("")} style={{ fontSize: "14px", lineHeight: 1 }}>×</button>
          ) : (
            <span className="search-kbd-hint" style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "#c2b8b1",
              fontFamily: "var(--font-dm-sans, sans-serif)",
              whiteSpace: "nowrap",
              userSelect: "none",
              padding: "3px 7px",
              border: "1px solid #e2d7cd",
              borderRadius: "5px",
            }}>
              Press /
            </span>
          )}
        </div>

        <div className="quick-row">
          {QUICK.map((item) => (
            <button key={item} onClick={() => setQuery(item)}>
              {item}
            </button>
          ))}
        </div>

        {/* Empty State when no results found */}
        {!hasResults && query && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No results for "{query}"</h3>
            <p>We couldn't find any products, ingredients, or guides matching your search. Try adjusting your spelling or try one of the quick terms below.</p>
            <button className="clear-search-btn" onClick={() => setQuery("")}>Clear Search</button>
          </div>
        )}

        {hasResults && (["routine", "ingredient", "guide", "product"] as const).map((type) => {
          const items = groups[type] || [];
          if (!items.length) return null;

          return (
            <section className="group" key={type}>
              <div className="group-head">
                <h2>{labelFor(type)}</h2>
                <span>{items.length} match{items.length === 1 ? "" : "es"}</span>
              </div>
              <div className="result-grid">
                {items.slice(0, type === "product" ? 8 : 4).map((item) => (
                  <ResultCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

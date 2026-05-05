"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Crown, Sparkles, BookOpen, ShoppingBag, Droplets } from "lucide-react";
import { searchMirha } from "@/lib/searchEngine";
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

function iconFor(type: SearchItem["type"]) {
  if (type === "product") return <ShoppingBag size={24} color="var(--rose)" />;
  if (type === "guide") return <BookOpen size={24} color="var(--rose)" />;
  if (type === "routine") return <Sparkles size={24} color="var(--rose)" />;
  return <Droplets size={24} color="var(--rose)" />;
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

export function SearchClient({ isPro }: { isPro: boolean }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchMirha(query), [query]);
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

        .search-shell {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: 40px 0 80px;
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
          color: #756b63;
          font-size: 15px;
          line-height: 1.8;
          max-width: 620px;
          margin: 0 0 30px;
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
          transition: border-color 0.2s;
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
        }

        .result-arrow {
          margin-top: 4px;
          color: #a89c92;
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
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try oily skin sunscreen, pigmentation, niacinamide..."
            autoFocus
          />
          {query ? <button onClick={() => setQuery("")}>x</button> : null}
        </div>

        <div className="quick-row">
          {QUICK.map((item) => (
            <button key={item} onClick={() => setQuery(item)}>
              {item}
            </button>
          ))}
        </div>

        {(["routine", "ingredient", "guide", "product"] as const).map((type) => {
          const items = groups[type] || [];
          if (!items.length) return null;

          // Freemium logic: Limit free users to 2 items per category
          const visibleItems = isPro ? items : items.slice(0, 2);
          const hasHiddenItems = !isPro && items.length > 2;

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
                {visibleItems.map((item) => (
                  <ResultCard key={item.id} item={item} />
                ))}
                
                {hasHiddenItems && (
                  <Link href="/dashboard/subscription" className="pro-upsell-card">
                    <Crown size={24} color="#c8473a" />
                    <h3>Unlock {items.length - 2} more {labelFor(type)}</h3>
                    <p>Upgrade to Pro (₹199/mo) for full search access</p>
                  </Link>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

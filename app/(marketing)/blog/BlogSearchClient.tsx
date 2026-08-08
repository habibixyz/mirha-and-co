"use client";

import { useState, useMemo } from "react";
import { Search, X, AlertCircle } from "lucide-react";
import { getLocalizedContent, Currency } from "@/lib/globalization";

type BlogSearchClientProps = {
 initialPosts: Array<{
 category: string;
 title: string;
 excerpt: string;
 slug: string;
 readTime: string;
 date: string;
 productCount: number;
 initials: string;
 imageSrc: string;
 tags: string[];
 views?: number;
 }>;
 catColors: Record<string, string>;
 currency: Currency;
};

const CATEGORIES = ["ALL", "SKINCARE", "BEAUTY", "WELLNESS", "LIFESTYLE", "HAIR", "MAKEUP"];

const POPULAR_TAGS = ["K-Beauty", "Glass Skin", "Sunscreen", "Niacinamide", "Oily Skin", "Hard Water", "Acne", "Cortisol"];

export default function BlogSearchClient({ initialPosts, catColors, currency }: BlogSearchClientProps) {
  const localizeContent = (text: string) => getLocalizedContent(text, currency);
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("ALL");

 const filteredPosts = useMemo(() => {
 return initialPosts.filter((post) => {
 const matchesCategory =
 selectedCategory === "ALL" || post.category.toUpperCase() === selectedCategory;

 if (!matchesCategory) return false;

 if (!searchQuery) return true;

 const q = searchQuery.toLowerCase();
 return (
 post.title.toLowerCase().includes(q) ||
 post.excerpt.toLowerCase().includes(q) ||
 post.category.toLowerCase().includes(q) ||
 post.tags.some((t) => t.toLowerCase().includes(q))
 );
 });
 }, [initialPosts, searchQuery, selectedCategory]);

 return (
 <div>
 <style>{`
 .search-section-inner {
 margin-bottom: 3rem;
 }
 .search-box-wrapper {
 position: relative;
 max-width: 640px;
 margin: 0 auto 1.5rem;
 }
 .search-input {
 width: 100%;
 padding: 1rem 1.5rem 1rem 3.2rem;
 font-size: 1.05rem;
 border-radius: 100px;
 border: 1px solid #e8ded6;
 background: #fff;
 color: #2b2826;
 outline: none;
 box-shadow: 0 4px 20px rgba(162, 123, 92, 0.04);
 transition: all 0.3s ease;
 }
 .search-input:focus {
 border-color: #a27b5c;
 box-shadow: 0 4px 25px rgba(162, 123, 92, 0.12);
 }
 .search-icon-left {
 position: absolute;
 left: 1.25rem;
 top: 50%;
 transform: translateY(-50%);
 color: #9b8e83;
 pointer-events: none;
 }
 .clear-btn-right {
 position: absolute;
 right: 1.25rem;
 top: 50%;
 transform: translateY(-50%);
 background: none;
 border: none;
 color: #9b8e83;
 cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 0.2rem;
 border-radius: 50%;
 transition: background-color 0.2s;
 }
 .clear-btn-right:hover {
 background-color: #f2ebe4;
 color: #2b2826;
 }
 .quick-tags {
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 0.6rem;
 flex-wrap: wrap;
 margin-bottom: 2.5rem;
 }
 .quick-tag-label {
 font-size: 0.72rem;
 color: #9b8e83;
 font-weight: 500;
 text-transform: uppercase;
 letter-spacing: 0.05em;
 }
 .quick-tag-btn {
 font-size: 0.75rem;
 padding: 0.35rem 0.8rem;
 border-radius: 100px;
 border: 1px solid #e8ded6;
 background: #fff;
 color: #6f6963;
 cursor: pointer;
 transition: all 0.2s ease;
 }
 .quick-tag-btn:hover {
 border-color: #a27b5c;
 color: #a27b5c;
 background: #fffdfb;
 }
 .cat-tabs {
 display: flex;
 justify-content: center;
 gap: 0.5rem;
 margin-bottom: 2.5rem;
 flex-wrap: wrap;
 border-bottom: 1px solid #e8ded6;
 padding-bottom: 1.2rem;
 }
 .cat-tab-btn {
 font-family: var(--font-dm-sans), sans-serif;
 font-size: 0.75rem;
 font-weight: 700;
 letter-spacing: 0.12em;
 text-transform: uppercase;
 padding: 0.6rem 1.2rem;
 border-radius: 8px;
 border: 1px solid transparent;
 background: transparent;
 color: #9b8e83;
 cursor: pointer;
 transition: all 0.3s ease;
 }
 .cat-tab-btn:hover {
 color: #2b2826;
 }
 .cat-tab-btn.active {
 background: #111;
 color: #fff;
 border-color: #111;
 }
 .empty-state {
 text-align: center;
 padding: 4rem 2rem;
 background: #fff;
 border: 1px solid #e8ded6;
 border-radius: 20px;
 max-width: 600px;
 margin: 2rem auto 0;
 }
 .empty-state h3 {
 font-family: var(--font-playfair), serif;
 font-size: 1.5rem;
 font-weight: 700;
 color: #111;
 margin: 0 0 0.8rem;
 }
 .empty-state p {
 color: #6f6963;
 font-size: 0.95rem;
 margin: 0 0 1.5rem;
 }
 .reset-btn {
 display: inline-flex;
 align-items: center;
 gap: 0.5rem;
 background: #111;
 color: #fff;
 border: none;
 padding: 0.6rem 1.2rem;
 border-radius: 8px;
 font-size: 0.8rem;
 font-weight: 600;
 cursor: pointer;
 transition: background-color 0.2s;
 }
 .reset-btn:hover {
 background: #000;
 }
 @media (max-width: 640px) {
 .cat-tabs {
 gap: 0.25rem;
 }
 .cat-tab-btn {
 padding: 0.5rem 0.8rem;
 font-size: 0.7rem;
 }
 }

 html.dark .search-input, .dark .search-input { background: #181716; color: #f7f5f2; border-color: rgba(255,255,255,0.15); }
 html.dark .quick-tag-btn, .dark .quick-tag-btn { background: #181716; color: #aba49d; border-color: rgba(255,255,255,0.15); }
 html.dark .quick-tag-btn:hover, .dark .quick-tag-btn:hover { background: #22201e; color: #ff4d94; border-color: #ff4d94; }
 html.dark .cat-tab-btn, .dark .cat-tab-btn { color: #aba49d; }
 html.dark .cat-tab-btn:hover, .dark .cat-tab-btn:hover { color: #ffffff; }
 html.dark .cat-tab-btn.active, .dark .cat-tab-btn.active { background: #ff4d94; color: #ffffff; border-color: #ff4d94; }
 html.dark .empty-state, .dark .empty-state { background: #181716; border-color: rgba(255,255,255,0.12); color: #f7f5f2; }
 html.dark .empty-state h3, .dark .empty-state h3 { color: #ffffff; }
 html.dark .empty-state p, .dark .empty-state p { color: #aba49d; }
 `}</style>

 <div className="search-section-inner">
 {/* Search Bar */}
 <div className="search-box-wrapper">
 <Search className="search-icon-left" size={20} />
 <input
 type="text"
 className="search-input"
 placeholder="Search articles by concern, ingredient, or title..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 />
 {searchQuery && (
 <button className="clear-btn-right" onClick={() => setSearchQuery("")}>
 <X size={16} />
 </button>
 )}
 </div>

 {/* Quick Suggestion Tags */}
 <div className="quick-tags">
 <span className="quick-tag-label">Popular searches:</span>
 {POPULAR_TAGS.map((tag) => (
 <button
 key={tag}
 className="quick-tag-btn"
 onClick={() => setSearchQuery(tag)}
 >
 {tag}
 </button>
 ))}
 </div>

 {/* Category Tabs */}
 <div className="cat-tabs">
 {CATEGORIES.map((cat) => (
 <button
 key={cat}
 className={`cat-tab-btn ${selectedCategory === cat ? "active" : ""}`}
 onClick={() => setSelectedCategory(cat)}
 >
 {cat}
 </button>
 ))}
 </div>
 </div>

 {/* Articles Header / Grid */}
 <div className="article-header">
 <div>
 <p className="section-kicker">
 {selectedCategory === "ALL" ? "All guides" : `${selectedCategory.toLowerCase()} guides`}
 </p>
 <h2 className="section-title">
 {searchQuery ? `Search results for "${searchQuery}"` : "Read by concern."}
 </h2>
 </div>
 <span style={{ color: "#9b8e83", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>
 {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
 </span>
 </div>

 {filteredPosts.length > 0 ? (
 <div className="article-grid">
 {filteredPosts.map((post) => (
 <a key={post.slug} href={`/blog/${post.slug}`} className="article-card">
 <div className="article-icon">
 <img src={post.imageSrc} alt={post.category} />
 </div>
 <p className="article-cat" style={{ color: catColors[post.category] || "#a27b5c" }}>
 {post.category}
 </p>
 <h3>{localizeContent(post.title)}</h3>
 <p>{localizeContent(post.excerpt)}</p>
 <div className="article-meta">
 <span>{post.date}</span>
 <span>{post.readTime}</span>
 <span>{post.productCount} picks</span>
 {post.views !== undefined && post.views > 0 && (
   <span>{post.views.toLocaleString()} reads</span>
 )}
 </div>
 </a>
 ))}
 </div>
 ) : (
 <div className="empty-state">
 <AlertCircle style={{ margin: "0 auto 1rem", color: "#a27b5c" }} size={36} />
 <h3>No articles found</h3>
 <p>We couldn't find any articles matching your search criteria. Try a different search term or reset filters.</p>
 <button
 className="reset-btn"
 onClick={() => {
 setSearchQuery("");
 setSelectedCategory("ALL");
 }}
 >
 Clear Filters
 </button>
 </div>
 )}
 </div>
 );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { useGlobalization } from "@/components/GlobalizationContext";
import { PRODUCTS } from "@/lib/products";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcat: string;
  mrp: number;
  price: number;
  rating: number;
  reviews: string;
  asin: string;
  badge?: string;
  description: string;
  specs?: Record<string, string | undefined>;
  tags?: string[];
  concerns?: string[];
  skinTypes?: string[];
  ingredients?: string[];
  bestFor?: string[];
  notIdealFor?: string[];
  image: string;
  link?: string;
  hideFromShop?: boolean;
};

const PRODUCT_LIST = (PRODUCTS as unknown as Product[]).filter((p) => !p.hideFromShop);

const CATEGORIES = ["All", "Skincare", "Makeup", "Hair Care", "Body Care", "Wellness", "Men's Grooming", "Fragrance"];

export const CONCERNS = [
  {
    id: "acne",
    label: "Acne",
    text: "Breakouts, congestion, acne marks, pore care.",
  },
  {
    id: "pigmentation",
    label: "Pigmentation",
    text: "Dark spots, uneven tone, brightening routines.",
  },
  {
    id: "oily skin",
    label: "Oily Skin",
    text: "Light textures, oil control, no heavy finish.",
  },
  {
    id: "dryness",
    label: "Dry / Sensitive",
    text: "Barrier support, hydration, gentler formulas.",
  },
  {
    id: "dullness",
    label: "Dullness",
    text: "Glow, texture, tired-looking skin.",
  },
  {
    id: "sunscreen",
    label: "Sunscreen",
    text: "Daily SPF picks for Indian weather.",
  },
];

const CONCERN_ALIASES: Record<string, string[]> = {
  acne: ["acne", "breakout", "pimple", "pores", "congestion", "blemish"],
  pigmentation: ["pigmentation", "dark spots", "acne marks", "brightening", "uneven tone", "melasma"],
  dryness: ["dryness", "dry skin", "dehydration", "hydration", "barrier", "sensitive", "fragrance-free"],
  "oily skin": ["oily", "oily skin", "oiliness", "sebum", "pores", "matte", "gel"],
  dullness: ["dullness", "glow", "brightening", "uneven tone", "vitamin c", "radiance"],
  sunscreen: ["sunscreen", "spf", "uv", "pa++++", "no white cast", "sun"],
};

export const CATEGORY_KEYS: Record<string, string> = {
  "All": "filter.category.all",
  "Skincare": "filter.category.skincare",
  "Makeup": "filter.category.makeup",
  "Hair Care": "filter.category.haircare",
  "Body Care": "filter.category.bodycare",
  "Wellness": "filter.category.wellness",
  "Men's Grooming": "filter.category.mensgrooming",
  "Fragrance": "filter.category.fragrance"
};

function discount(mrp: number, price: number) {
  return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

export function isCrueltyFree(product: any) {
  const cfBrands = ["minimalist", "the ordinary", "cosrx", "wishcare", "pilgrim", "dot & key", "mamaearth", "beardo", "aqualogica", "plum", "deconstruct", "derma co"];
  return cfBrands.includes(product.brand.toLowerCase()) || (product.tags || []).some((t: string) => t.toLowerCase() === "cruelty-free" || t.toLowerCase() === "cruelty free");
}

export function isVegan(product: any) {
  const veganBrands = ["minimalist", "the ordinary", "wishcare", "pilgrim", "aqualogica", "plum", "deconstruct"];
  if (product.name.toLowerCase().includes("snail") || product.description.toLowerCase().includes("snail")) {
    return false;
  }
  return veganBrands.includes(product.brand.toLowerCase()) || (product.tags || []).some((t: string) => t.toLowerCase() === "vegan" || t.toLowerCase() === "veg");
}

function productText(product: Product) {
  return [
    product.name,
    product.brand,
    product.category,
    product.subcat,
    product.description,
    ...(product.tags || []),
    ...(product.concerns || []),
    ...(product.skinTypes || []),
    ...(product.ingredients || []),
    ...(product.bestFor || []),
    ...Object.values(product.specs || {}),
  ]
    .join(" ")
    .toLowerCase();
}

function matchesQuery(product: Product, query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = productText(product);
  return terms.every((term) => haystack.includes(term));
}

function matchesConcern(product: Product, concern: string | null) {
  if (!concern) return true;
  const haystack = productText(product);
  return (CONCERN_ALIASES[concern] || [concern]).some((term) =>
    haystack.includes(term.toLowerCase())
  );
}

function productReason(product: Product) {
  if (product.bestFor?.length) return product.bestFor.slice(0, 2).join(" / ");
  if (product.concerns?.length) return product.concerns.slice(0, 2).join(" / ");
  const skinType = product.specs?.["Skin Type"] || product.specs?.["Best For"];
  if (skinType) return skinType;
  return product.description;
}

function ProductCard({ product }: { product: Product }) {
  const { formatPrice, t, isRtl } = useGlobalization();
  const save = discount(product.mrp, product.price);

  return (
    <Link
      href={`/product/${product.asin}`}
      className="product-card"
      style={{
        direction: isRtl ? "rtl" : "ltr",
        textAlign: isRtl ? "right" : "left",
      }}
    >
      <div className="product-image">
        <Image 
          src={product.image} 
          alt={product.name} 
          width={210} 
          height={210} 
          sizes="(max-width: 640px) 50vw, 210px"
        />
      </div>
      <div className="product-body">
        <div
          className="product-kicker"
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
        >
          <span>{product.subcat}</span>
          {product.badge ? <b>{product.badge}</b> : null}
        </div>
        <h3>{product.name}</h3>
        <p className="product-brand">{product.brand}</p>
        <p className="product-use">
          {t("product.bestfor")}: {productReason(product)}
        </p>
        <div
          className="product-price-row"
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: isRtl ? "flex-end" : "flex-start",
          }}
        >
          <span>{formatPrice(product.price)}</span>
          {save > 0 ? <em>{save}% {t("product.off")}</em> : null}
        </div>
      </div>
      <div
        className="product-footer"
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
        }}
      >
        <span>{t("product.viewdetails")}</span>
        <ArrowRight
          size={13}
          style={{
            transform: isRtl ? "rotate(180deg)" : "none",
          }}
        />
      </div>
    </Link>
  );
}

export default function ShopFilterClient({ activeConcernProp }: { activeConcernProp?: string | null }) {
  const { t, isRtl } = useGlobalization();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeConcern, setActiveConcern] = useState<string | null>(activeConcernProp || null);
  const [veganOnly, setVeganOnly] = useState(false);
  const [crueltyFreeOnly, setCrueltyFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCT_LIST.filter((product) => {
      const categoryMatch =
        activeCategory === "All" ||
        (activeCategory === "Men's Grooming"
          ? (product.tags || []).includes("mens") || product.category.toLowerCase().startsWith("mens")
          : activeCategory === "Fragrance"
            ? normalize(product.category) === "fragrance" ||
              normalize(product.category) === "mensperfume" ||
              product.subcat.toLowerCase() === "perfume" ||
              product.subcat.toLowerCase() === "body mist" ||
              (product.tags || []).some((t) => ["fragrance", "perfume", "deo", "deodorant"].includes(t.toLowerCase()))
            : normalize(product.category) === normalize(activeCategory));

      const veganMatch = !veganOnly || isVegan(product);
      const crueltyFreeMatch = !crueltyFreeOnly || isCrueltyFree(product);

      return categoryMatch && veganMatch && crueltyFreeMatch && matchesConcern(product, activeConcern) && matchesQuery(product, query);
    });
  }, [activeCategory, activeConcern, query, veganOnly, crueltyFreeOnly]);

  return (
    <>
      <style>{`
        /* COMPACT CONCERN BADGES / CHIPS */
        .concern-grid {
          display: grid !important;
          grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
          gap: 10px !important;
          margin-bottom: 32px !important;
        }

        .concern-card {
          min-height: auto !important;
          height: 48px !important;
          padding: 0 16px !important;
          border-radius: 30px !important;
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          background: #ffffff !important;
          border: 1px solid #e8ded4 !important;
          box-shadow: 0 2px 8px rgba(22, 20, 18, 0.02) !important;
          transition: all 0.2s ease !important;
          cursor: pointer !important;
          width: 100% !important;
        }

        .concern-card small {
          margin: 0 !important;
          color: #fc2779 !important;
          font-weight: 700 !important;
          font-size: 11px !important;
        }

        .concern-card h3 {
          margin: 0 !important;
          font-size: 13.5px !important;
          font-weight: 600 !important;
          color: #161412 !important;
          font-family: 'DM Sans', sans-serif !important;
        }

        .concern-card p {
          display: none !important; /* Hide description to save space */
        }

        .concern-card:hover,
        .concern-card.active {
          transform: translateY(-2px) !important;
          border-color: #fc2779 !important;
          background: #fffaf4 !important;
          box-shadow: 0 8px 16px rgba(252, 39, 121, 0.08) !important;
        }

        @media (max-width: 980px) {
          .concern-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 640px) {
          .concern-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 8px !important;
          }
          
          .concern-card {
            height: 42px !important;
            padding: 0 12px !important;
            border-radius: 20px !important;
          }

          .concern-card h3 {
            font-size: 12.5px !important;
          }
        }

        /* SECTION HEAD RESPONSIVE RESET */
        .section-head {
          display: flex !important;
          flex-direction: row !important;
          align-items: flex-end !important;
          justify-content: space-between !important;
          gap: 16px !important;
          margin-bottom: 22px !important;
          width: 100% !important;
        }

        .section-head[data-rtl="true"] {
          flex-direction: row-reverse !important;
        }

        .section-head > div {
          flex: 1 !important;
        }

        .section-subtitle {
          color: #93877d !important;
          font-size: 12px !important;
          line-height: 1.7 !important;
          margin: 0 !important;
          max-width: 320px !important;
          text-align: right !important;
        }

        .section-head[data-rtl="true"] .section-subtitle {
          text-align: left !important;
        }

        @media (max-width: 768px) {
          .section-head {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
            margin-bottom: 16px !important;
          }

          .section-head[data-rtl="true"] {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .section-subtitle {
            text-align: left !important;
            max-width: 100% !important;
            margin-top: 4px !important;
          }

          .section-head[data-rtl="true"] .section-subtitle {
            text-align: right !important;
          }
        }

        /* SEARCH BAR CONTROLS */
        .shop-filter-controls {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
          width: 100%;
        }

        .filters {
          margin-bottom: 0 !important;
          display: block !important;
        }

        .search-bar-container {
          flex: 1;
          max-width: 360px;
        }

        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          color: #93877d;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 11px 16px 11px 44px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          border: 1px solid #ded3ca;
          border-radius: 30px;
          background: #ffffff;
          color: #161412;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          border-color: #fc2779;
          box-shadow: 0 0 0 3px rgba(252, 39, 121, 0.06);
          background: #ffffff;
        }

        .search-clear-btn {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          color: #93877d;
          cursor: pointer;
          font-size: 11px;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-clear-btn:hover {
          color: #fc2779;
        }

        @media (max-width: 768px) {
          .shop-filter-controls {
            flex-direction: column-reverse;
            align-items: stretch;
            gap: 12px;
          }

          .search-bar-container {
            max-width: 100%;
          }
          
          .filters {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          
          .filter-row {
            display: flex;
            flex-wrap: nowrap !important;
            padding-bottom: 6px;
            padding-left: 4px !important;
            padding-right: 20px !important;
            width: max-content;
          }
          
          .filter-row button {
            white-space: nowrap;
          }
        }
      `}</style>

      <section className="section">
        <div className="section-head" data-rtl={isRtl ? "true" : "false"}>
          <div>
            <p className="eyebrow">{t("section.concerns.title")}</p>
            <h2>{t("section.concerns.desc")}</h2>
          </div>
          <p className="section-subtitle">Tap a concern to filter the shop below. Keep it simple.</p>
        </div>

        <div className="concern-grid">
          {CONCERNS.map((concern, index) => (
            <button
              key={concern.id}
              className={`concern-card ${activeConcern === concern.id ? "active" : ""}`}
              onClick={() => setActiveConcern(activeConcern === concern.id ? null : concern.id)}
              style={{
                textAlign: isRtl ? "right" : "left",
              }}
            >
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h3>{concern.label}</h3>
              <p>{concern.text}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="section" id="shop">
        <div className="section-head" data-rtl={isRtl ? "true" : "false"}>
          <div>
            <p className="eyebrow">{t("section.shop.title")}</p>
            <h2>
              {activeCategory === "All" ? t("filter.category.all") : t(CATEGORY_KEYS[activeCategory] || activeCategory)}
              {activeConcern ? ` / ${CONCERNS.find((c) => c.id === activeConcern)?.label}` : ""}
            </h2>
          </div>
          <span className="section-subtitle">
            {filtered.length} item{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="shop-filter-controls">
          <div className="filters">
            <div className="filter-row" style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {t(CATEGORY_KEYS[category] || category)}
                </button>
              ))}
              {activeConcern || query || activeCategory !== "All" || veganOnly || crueltyFreeOnly ? (
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setActiveConcern(null);
                    setQuery("");
                    setVeganOnly(false);
                    setCrueltyFreeOnly(false);
                  }}
                >
                  Clear all
                </button>
              ) : null}
            </div>
          </div>

          <div className="search-bar-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder={t("search.placeholder") || "Search products..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
              {query && (
                <button className="search-clear-btn" onClick={() => setQuery("")}>
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="extra-filters" style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap", justifyContent: isRtl ? "flex-end" : "flex-start" }}>
          <button
            className={`extra-filter-chip ${veganOnly ? "active" : ""}`}
            onClick={() => setVeganOnly(!veganOnly)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              border: veganOnly ? "1px solid #2d8a5c" : "1px solid #ded3ca",
              background: veganOnly ? "#eef9f3" : "#ffffff",
              color: veganOnly ? "#2d8a5c" : "#756b63",
              cursor: "pointer",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease"
            }}
          >
            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#2d8a5c" }} />
            {t("filter.vegan")}
          </button>
          <button
            className={`extra-filter-chip ${crueltyFreeOnly ? "active" : ""}`}
            onClick={() => setCrueltyFreeOnly(!crueltyFreeOnly)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              border: crueltyFreeOnly ? "1px solid #fc2779" : "1px solid #ded3ca",
              background: crueltyFreeOnly ? "#fff0e8" : "#ffffff",
              color: crueltyFreeOnly ? "#fc2779" : "#756b63",
              cursor: "pointer",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease"
            }}
          >
            🐰 {t("filter.crueltyfree")}
          </button>
        </div>

        {filtered.length ? (
          <div className="shop-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try a broader keyword, or clear filters and start again.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setActiveConcern(null);
                setQuery("");
                setVeganOnly(false);
                setCrueltyFreeOnly(false);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}

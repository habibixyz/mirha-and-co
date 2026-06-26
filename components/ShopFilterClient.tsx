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

const CATEGORIES = ["All", "Skincare", "Makeup", "Hair Care", "Body Care", "Wellness"];

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
  "Wellness": "filter.category.wellness"
};

function discount(mrp: number, price: number) {
  return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
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

  const filtered = useMemo(() => {
    return PRODUCT_LIST.filter((product) => {
      const categoryMatch =
        activeCategory === "All" || normalize(product.category) === normalize(activeCategory);

      return categoryMatch && matchesConcern(product, activeConcern) && matchesQuery(product, query);
    });
  }, [activeCategory, activeConcern, query]);

  return (
    <>
      <section className="section">
        <div
          className="section-head"
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
        >
          <div>
            <p className="eyebrow">{t("section.concerns.title")}</p>
            <h2>{t("section.concerns.desc")}</h2>
          </div>
          <p>Tap a concern to filter the shop below. Keep it simple.</p>
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
        <div
          className="section-head"
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
        >
          <div>
            <p className="eyebrow">{t("section.shop.title")}</p>
            <h2>
              {activeCategory === "All" ? t("filter.category.all") : t(CATEGORY_KEYS[activeCategory] || activeCategory)}
              {activeConcern ? ` / ${CONCERNS.find((c) => c.id === activeConcern)?.label}` : ""}
            </h2>
          </div>
          <span>
            {filtered.length} item{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

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
            {activeConcern || query || activeCategory !== "All" ? (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveConcern(null);
                  setQuery("");
                }}
              >
                Clear all
              </button>
            ) : null}
          </div>
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

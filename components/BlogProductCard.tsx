"use client";

import { PRODUCTS } from "@/lib/products";
import { useGlobalization } from "./GlobalizationContext";

export default function BlogProductCard({ asin }: { asin: string }) {
  const global = useGlobalization();
  const product = PRODUCTS.find((p) => p.asin === asin);
  if (!product) return null;

  const isRtl = global.isRtl;

  // Localized affiliate search URL
  const affiliateUrl = global.getAffiliateUrl(
    asin,
    product.name,
    product.brand,
    product.link
  );

  const price = global.formatPrice(product.price);

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="aff-compact"
    >
      <style>{`
        .aff-compact {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: #fff;
          border: 1px solid #eae4dc;
          border-radius: 10px;
          text-decoration: none;
          transition: box-shadow 0.2s, border-color 0.2s;
          width: 100%;
          box-sizing: border-box;
          max-width: 100%;
          min-width: 0;
          margin: 1.25rem 0;
          direction: ${isRtl ? "rtl" : "ltr"};
          text-align: ${isRtl ? "right" : "left"};
        }
        .aff-compact:hover {
          border-color: #d1c8bb;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .aff-compact-img {
          width: 52px;
          height: 52px;
          object-fit: contain;
          border-radius: 6px;
          background: #faf8f5;
          flex-shrink: 0;
          padding: 4px;
          border: 1px solid #f0eae0;
        }
        .aff-compact-info {
          flex: 1;
          min-width: 0;
        }
        .aff-compact-brand {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a27b5c;
          display: block;
          margin-bottom: 2px;
        }
        .aff-compact-name {
          font-family: 'DM Serif Display', serif;
          font-size: 13px;
          color: #1a1714;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-width: 0;
        }
        .aff-compact-price {
          font-size: 12px;
          font-weight: 700;
          color: #1a1714;
          margin-top: 2px;
          display: block;
        }
        .aff-compact-btn {
          flex-shrink: 0;
          background: #1a1714;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 14px;
          border-radius: 6px;
          white-space: nowrap;
        }
        @media (max-width: 520px) {
          .aff-compact { gap: 10px; padding: 9px 12px; }
          .aff-compact-img { width: 44px; height: 44px; }
          .aff-compact-name { font-size: 12px; }
          .aff-compact-btn { padding: 6px 10px; font-size: 9px; letter-spacing: 0.06em; }
        }
        html.dark .aff-compact, .dark .aff-compact {
          background: #141824 !important;
          border-color: #283044 !important;
        }
        html.dark .aff-compact-img, .dark .aff-compact-img {
          background: #ffffff !important;
          border-color: #283044 !important;
        }
        html.dark .aff-compact-name, .dark .aff-compact-name,
        html.dark .aff-compact-price, .dark .aff-compact-price {
          color: #f8fafc !important;
        }
        html.dark .aff-compact-btn, .dark .aff-compact-btn {
          background: #fc2779 !important;
          color: #ffffff !important;
        }
      `}</style>
      <img className="aff-compact-img" src={product.image} alt={product.name} />
      <div className="aff-compact-info">
        <span className="aff-compact-brand">{product.brand}</span>
        <span className="aff-compact-name">{product.name}</span>
        <span className="aff-compact-price">{price}</span>
      </div>
      <span className="aff-compact-btn">Shop →</span>
    </a>
  );
}

"use client";

import { PRODUCTS } from "@/lib/products";
import { useGlobalization } from "./GlobalizationContext";
import Link from "next/link";

export function AffiliateCard(props: any) {
  const { asin, onClick, compact } = props;
  const global = useGlobalization();

  const product = PRODUCTS.find((p) => p.asin === asin) as any;

  const title = props.title || product?.name;
  const image = product?.image || props.imageUrl;
  const badge = product?.badge || props.badge;

  const isFragrance =
    product?.category?.toLowerCase().includes("fragrance") ||
    product?.category?.toLowerCase().includes("perfume") ||
    props.isFragrance;

  const displayDesc = props.description || (product?.description ? (product.description.length > 150 ? product.description.slice(0, 150) + "..." : product.description) : "");

  // Use localized formatted price
  const price = product?.price ? global.formatPrice(product.price) : props.price;

  // Localized affiliate search URL
  const affiliateUrl = global.getAffiliateUrl(
    asin,
    title,
    product?.brand || props.brand || "",
    product?.link
  );

  return true ? (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="aff-compact"
      onClick={(e) => { e.stopPropagation(); onClick?.(product || { asin, title }); }}
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
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
        @media (max-width: 480px) {
          .aff-compact-name { font-size: 12px; }
          .aff-compact-btn { padding: 7px 10px; font-size: 9px; }
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
      <img className="aff-compact-img" src={image} alt={title} />
      <div className="aff-compact-info">
        <span className="aff-compact-brand">{product?.brand || "Pick"}</span>
        <span className="aff-compact-name">{title}</span>
        <span className="aff-compact-price">{price}</span>
      </div>
      <span className="aff-compact-btn">Shop →</span>
    </a>
  ) : (
    <div className="editorial-affiliate-card-wrapper">
      <style>{`
        .editorial-affiliate-card-wrapper {
          container-type: inline-size;
          width: 100%;
          margin: 1.75rem 0;
        }
        .editorial-affiliate-card {
          display: flex;
          flex-direction: row;
          border: 1px solid #ede8e0;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          position: relative;
        }
        .editorial-affiliate-card:hover {
          border-color: #d6ceb8;
          box-shadow: 0 12px 30px rgba(162, 123, 92, 0.04);
          transform: translateY(-2px);
        }
        .editorial-img-container {
          width: 130px;
          background: #faf8f5;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #ede8e0;
          padding: 1rem;
          flex-shrink: 0;
          position: relative;
        }
        .editorial-img-container img {
          max-width: 70px;
          max-height: 70px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .editorial-affiliate-card:hover .editorial-img-container img {
          transform: scale(1.03);
        }
        .editorial-badge-pill {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #faf6f0;
          color: #8c725c;
          border: 1px solid #e6decb;
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 8px;
          font-weight: 700;
          border-radius: 4px;
          z-index: 10;
        }
        .editorial-body {
          flex: 1;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .editorial-meta-brand {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8c8179;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }
        .editorial-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.05rem;
          line-height: 1.3;
          color: #1a1714;
          margin: 0 0 0.5rem 0;
          font-weight: 400;
        }
        .editorial-desc {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 0.78rem;
          color: #6f6963;
          line-height: 1.5;
          margin: 0 0 0.6rem 0;
        }
        .editorial-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 0.6rem;
        }
        .editorial-tag {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .editorial-tag-skintype {
          background: #fdf5f2;
          color: #d96f43;
          border: 1px solid #f8decb;
        }
        .editorial-tag-concern {
          background: #f2f6fb;
          color: #438cd9;
          border: 1px solid #cbdcf8;
        }
        .editorial-specs-box {
          background: #faf8f5;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #ede8e0;
          margin-bottom: 0.6rem;
        }
        .editorial-specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.72rem;
          color: #6a635d;
        }
        .editorial-specs-table td {
          padding: 4px 0;
          border-bottom: 1px solid #f5f1ed;
        }
        .editorial-specs-table tr:last-child td {
          border-bottom: none;
        }
        .editorial-price-section {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 0.6rem;
        }
        .editorial-price-current {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          color: #1a1714;
        }
        .editorial-price-mrp {
          font-size: 0.75rem;
          color: #b2aba4;
          text-decoration: line-through;
        }
        .editorial-actions {
          display: block;
        }
        .editorial-btn-buy {
          background: #1a1714;
          color: #ffffff;
          border: 1px solid #1a1714;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 10px;
          border-radius: 6px;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .editorial-btn-buy:hover {
          background: #000000;
          border-color: #000000;
        }
        .editorial-btn-analyze {
          background: #ffffff;
          color: #1a1714;
          border: 1px solid #dcd5cc;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 10px;
          border-radius: 6px;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .editorial-btn-analyze:hover {
          background: #faf8f5;
          border-color: #c8bfae;
        }
        .editorial-disclosure {
          text-align: center;
          font-size: 0.58rem;
          color: #9c9188;
          margin-top: 1rem;
          font-style: italic;
        }

        @media (max-width: 680px) {
          .editorial-affiliate-card {
            flex-direction: column;
          }
          .editorial-img-container {
            width: 100%;
            height: 140px;
            border-right: none;
            border-bottom: 1px solid #ede8e0;
          }
          .editorial-body {
            padding: 1rem 1.25rem;
          }
        }
        @container (max-width: 550px) {
          .editorial-affiliate-card {
            flex-direction: column;
          }
          .editorial-img-container {
            width: 100%;
            height: 140px;
            border-right: none;
            border-bottom: 1px solid #ede8e0;
          }
          .editorial-body {
            padding: 1rem 1.25rem;
          }
        }
        html.dark .editorial-affiliate-card, .dark .editorial-affiliate-card {
          background: #141824 !important;
          border-color: #283044 !important;
        }
        html.dark .editorial-img-container, .dark .editorial-img-container {
          background: #ffffff !important;
          border-right-color: rgba(255, 255, 255, 0.1) !important;
          border-bottom-color: rgba(255, 255, 255, 0.1) !important;
        }
        html.dark .editorial-title, .dark .editorial-title,
        html.dark .editorial-price-current, .dark .editorial-price-current {
          color: #f8fafc !important;
        }
        html.dark .editorial-meta-brand, .dark .editorial-meta-brand {
          color: #38bdf8 !important;
        }
        html.dark .editorial-desc, .dark .editorial-desc {
          color: #94a3b8 !important;
        }
        html.dark .editorial-specs-box, .dark .editorial-specs-box {
          background: #1e293b !important;
          border-color: #334155 !important;
        }
        html.dark .editorial-specs-table, .dark .editorial-specs-table {
          color: #cbd5e1 !important;
        }
        html.dark .editorial-specs-table td, .dark .editorial-specs-table td {
          border-bottom-color: #334155 !important;
        }
        html.dark .editorial-btn-buy, .dark .editorial-btn-buy {
          background: #fc2779 !important;
          color: #ffffff !important;
          border-color: #fc2779 !important;
        }
        html.dark .editorial-btn-analyze, .dark .editorial-btn-analyze {
          background: #1e293b !important;
          color: #f8fafc !important;
          border-color: #334155 !important;
        }
      `}</style>

      <div className="editorial-affiliate-card">

      {/* Image Block */}
      <div className="editorial-img-container">
        {badge && <div className="editorial-badge-pill">{badge}</div>}
        <img src={image} alt={title} />
      </div>

      {/* Content Block */}
      <div className="editorial-body">
        <div>
          <div className="editorial-meta-brand">
            {product?.brand || props.brand || "Curated Recommendation"}
          </div>

          <h3 className="editorial-title">{title}</h3>

          {/* Tags */}
          {(product?.skinTypes || product?.concerns) && (
            <div className="editorial-tag-row">
              {product?.skinTypes?.slice(0, 2).map((st: string) => (
                <span key={st} className="editorial-tag editorial-tag-skintype">
                  {st}
                </span>
              ))}
              {product?.concerns?.slice(0, 2).map((c: string) => (
                <span key={c} className="editorial-tag editorial-tag-concern">
                  {c}
                </span>
              ))}
            </div>
          )}

          <p className="editorial-desc">
            {displayDesc}
          </p>

          {/* Specs Table */}
          {product?.specs && (
            <div className="editorial-specs-box">
              <table className="editorial-specs-table">
                <tbody>
                  {Object.entries(product.specs).slice(0, 3).map(([key, val]: any) => (
                    <tr key={key}>
                      <td style={{ fontWeight: 700, color: "#1a1714", width: "45%" }}>{key}</td>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          {/* Price */}
          <div className="editorial-price-section">
            <span className="editorial-price-current">{price}</span>
            {product?.mrp && product.mrp > product.price && (
              <span className="editorial-price-mrp">
                {global.formatPrice(product.mrp)}
              </span>
            )}
          </div>

          {/* CTAs */}
          <div className="editorial-actions">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(product || { asin, title });
              }}
              className="editorial-btn-buy"
            >
              Shop Product
            </a>
          </div>

          <div className="editorial-disclosure">
            *Independent review. We may receive a partner commission at no cost to you.
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
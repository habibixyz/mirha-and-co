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

  const disc = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <div className="editorial-product-card">
      <style>{`
        .editorial-product-card {
          background: #ffffff;
          border: 1px solid #ede8e0;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 2.5rem 0;
          direction: ${isRtl ? "rtl" : "ltr"};
          text-align: ${isRtl ? "right" : "left"};
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .editorial-product-card:hover {
          border-color: #d6ceb8;
          box-shadow: 0 12px 30px rgba(162, 123, 92, 0.04);
          transform: translateY(-2px);
        }
        .editorial-prod-row {
          display: flex;
          gap: 20px;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        .editorial-prod-img-box {
          width: 90px;
          height: 90px;
          flex-shrink: 0;
          background: #faf8f5;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #ede8e0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }
        .editorial-prod-img-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .editorial-prod-info {
          flex: 1;
          min-width: 0;
        }
        .editorial-prod-badge {
          display: inline-block;
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8c725c;
          background: #faf6f0;
          border: 1px solid #e6decb;
          padding: 2px 8px;
          border-radius: 4px;
          fontWeight: 700;
          margin-bottom: 6px;
        }
        .editorial-prod-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          color: #1a1714;
          margin: 0 0 4px;
          line-height: 1.35;
          font-weight: 400;
          overflow: hidden;
          display: -webkit-box;
          WebkitLineClamp: 2;
          WebkitBoxOrient: "vertical";
        }
        .editorial-prod-brand {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 0.65rem;
          color: #8c8179;
          fontWeight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 8px;
        }
        .editorial-prod-price-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .editorial-prod-price {
          font-family: 'DM Serif Display', serif;
          font-size: 1.3rem;
          color: #1a1714;
        }
        .editorial-prod-mrp {
          font-size: 0.75rem;
          color: #b2aba4;
          text-decoration: line-through;
        }
        .editorial-prod-discount {
          font-size: 0.58rem;
          color: #5a9e6f;
          background: #edf7f0;
          border: 1px solid #cce8d4;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .editorial-specs-divider {
          margin-top: 1.2rem;
          border-top: 1px solid #ede8e0;
          padding-top: 1rem;
        }
        .editorial-specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.75rem;
          color: #6a635d;
        }
        .editorial-specs-table td {
          padding: 6px 0;
          border-bottom: 1px solid #f5f1ed;
        }
        .editorial-specs-table tr:last-child td {
          border-bottom: none;
        }
        .editorial-btn-group {
          display: flex;
          gap: 12px;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .editorial-btn-primary {
          flex: 1 1 200px;
          background: #1a1714;
          color: #ffffff;
          border: 1px solid #1a1714;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 12px 16px;
          border-radius: 6px;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .editorial-btn-primary:hover {
          background: #000000;
          border-color: #000000;
        }
        .editorial-btn-secondary {
          flex: 1 1 200px;
          background: #ffffff;
          color: #1a1714;
          border: 1px solid #dcd5cc;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 12px 16px;
          border-radius: 6px;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .editorial-btn-secondary:hover {
          background: #faf8f5;
          border-color: #c8bfae;
        }
        .editorial-disclaimer {
          text-align: center;
          font-size: 0.58rem;
          color: #9c9188;
          margin-top: 1rem;
          font-style: italic;
        }
        @media (max-width: 580px) {
          .editorial-prod-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .editorial-prod-img-box {
            width: 100%;
            height: 120px;
          }
        }

        .editorial-specs-table td.spec-key {
          font-weight: 700;
          color: #1a1714;
        }

        html.dark .editorial-product-card,
        .dark .editorial-product-card {
          background: #181716 !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4) !important;
        }

        html.dark .editorial-product-card:hover,
        .dark .editorial-product-card:hover {
          border-color: #ff4d94 !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6) !important;
        }

        html.dark .editorial-prod-img-box,
        .dark .editorial-prod-img-box {
          background: #242220 !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
        }

        html.dark .editorial-prod-badge,
        .dark .editorial-prod-badge {
          color: #ff4d94 !important;
          background: rgba(255, 77, 148, 0.12) !important;
          border-color: rgba(255, 77, 148, 0.25) !important;
        }

        html.dark .editorial-prod-title,
        .dark .editorial-prod-title {
          color: #ffffff !important;
        }

        html.dark .editorial-prod-brand,
        .dark .editorial-prod-brand {
          color: #aba49d !important;
        }

        html.dark .editorial-prod-price,
        .dark .editorial-prod-price {
          color: #ffffff !important;
        }

        html.dark .editorial-prod-mrp,
        .dark .editorial-prod-mrp {
          color: #8c8179 !important;
        }

        html.dark .editorial-prod-discount,
        .dark .editorial-prod-discount {
          color: #5a9e6f !important;
          background: rgba(90, 158, 111, 0.12) !important;
          border-color: rgba(90, 158, 111, 0.2) !important;
        }

        html.dark .editorial-specs-divider,
        .dark .editorial-specs-divider {
          border-color: rgba(255, 255, 255, 0.12) !important;
        }

        html.dark .editorial-specs-table,
        .dark .editorial-specs-table {
          color: #aba49d !important;
        }

        html.dark .editorial-specs-table td,
        .dark .editorial-specs-table td {
          border-bottom-color: rgba(255, 255, 255, 0.06) !important;
        }

        html.dark .editorial-specs-table td.spec-key,
        .dark .editorial-specs-table td.spec-key {
          color: #ffffff !important;
        }

        html.dark .editorial-btn-primary,
        .dark .editorial-btn-primary {
          background: #ffffff !important;
          color: #0f0e0d !important;
          border-color: #ffffff !important;
        }

        html.dark .editorial-btn-primary:hover,
        .dark .editorial-btn-primary:hover {
          background: #e8e4df !important;
          border-color: #e8e4df !important;
        }

        html.dark .editorial-btn-secondary,
        .dark .editorial-btn-secondary {
          background: transparent !important;
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.24) !important;
        }

        html.dark .editorial-btn-secondary:hover,
        .dark .editorial-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
        }

        html.dark .editorial-disclaimer,
        .dark .editorial-disclaimer {
          color: #8c8179 !important;
        }
      `}</style>

      {/* Header Product Row */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="editorial-prod-row"
      >
        <div className="editorial-prod-img-box">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="editorial-prod-info">
          {product.badge && <span className="editorial-prod-badge">{product.badge}</span>}
          <h4 className="editorial-prod-title">{product.name}</h4>
          <p className="editorial-prod-brand">{product.brand}</p>
          
          <div className="editorial-prod-price-box">
            <span className="editorial-prod-price">
              {global.formatPrice(product.price)}
            </span>
            {disc > 0 && (
              <>
                <span className="editorial-prod-mrp">
                  {global.formatPrice(product.mrp)}
                </span>
                <span className="editorial-prod-discount">
                  {disc}% {global.t("product.off")}
                </span>
              </>
            )}
          </div>
        </div>
      </a>

      {/* Specs Table */}
      {product.specs && (
        <div className="editorial-specs-divider">
          <table className="editorial-specs-table">
            <tbody>
              {Object.entries(product.specs).map(([key, value]) => (
                <tr key={key}>
                  <td className="spec-key" style={{ width: "40%" }}>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Action Buttons */}
      <div className="editorial-btn-group">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="editorial-btn-primary"
        >
          Check Price &amp; Storefront
        </a>

        <a
          href={global.getBrandStorefrontUrl(product.brand)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="editorial-btn-secondary"
        >
          Official Brand Store
        </a>
      </div>

      <div className="editorial-disclaimer">
        *Verified partner link. Dispatched from official brand authorized warehouse.
      </div>
    </div>
  );
}

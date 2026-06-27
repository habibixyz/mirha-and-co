"use client";

import { PRODUCTS } from "@/lib/products";
import { useGlobalization } from "./GlobalizationContext";
import Link from "next/link";
import Image from "next/image";

export function ComparisonTable({ asins }: { asins: string[] }) {
  const global = useGlobalization();
  const products = asins
    .map((asin) => PRODUCTS.find((p) => p.asin === asin))
    .filter(Boolean) as any[];

  if (!products.length) return null;

  return (
    <div className="comparison-wrap">
      <style>{`
        .comparison-wrap {
          margin: 3rem 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .comp-table {
          width: 100%;
          min-width: 600px;
          border-collapse: collapse;
          background: #fff;
          border: 1px solid #e8e2d9;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          font-family: var(--font-dm-sans), sans-serif;
        }

        .comp-table th, .comp-table td {
          padding: 1.25rem 1rem;
          text-align: left;
          border-bottom: 1px solid #f0ebe4;
          border-right: 1px solid #f0ebe4;
          vertical-align: top;
        }

        .comp-table th:last-child, .comp-table td:last-child {
          border-right: none;
        }

        .comp-table tr:last-child td {
          border-bottom: none;
        }

        .comp-feature {
          background: #faf8f5;
          width: 140px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #5c544e;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .comp-product-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }
        
        .comp-product-img {
          width: 100px;
          height: 100px;
          object-fit: contain;
        }

        .comp-product-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
          color: #1a1714;
          margin: 0;
          line-height: 1.2;
        }
        
        .comp-product-brand {
          font-size: 0.65rem;
          color: #fc2779;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .comp-val {
          font-size: 0.9rem;
          color: #4a4541;
          line-height: 1.6;
        }

        .comp-price {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          color: #1a1714;
        }

        .comp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #fc2779;
          color: #fff;
          padding: 10px 14px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 10px;
          width: 100%;
        }
      `}</style>
      <table className="comp-table">
        <thead>
          <tr>
            <th className="comp-feature" style={{ borderBottom: "1px solid #e8e2d9" }}>Vs.</th>
            {products.map((p) => (
              <th key={p.asin} style={{ borderBottom: "1px solid #e8e2d9" }}>
                <div className="comp-product-header">
                  <img src={p.image} alt={p.name} className="comp-product-img" />
                  <div>
                    <div className="comp-product-brand">{p.brand}</div>
                    <h3 className="comp-product-title">{p.name}</h3>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="comp-feature">Price</td>
            {products.map((p) => (
              <td key={p.asin} className="comp-val">
                <span className="comp-price">{global.formatPrice(p.price)}</span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="comp-feature">Skin Type</td>
            {products.map((p) => (
              <td key={p.asin} className="comp-val">
                {p.skinTypes?.join(", ") || "All Skin Types"}
              </td>
            ))}
          </tr>
          <tr>
            <td className="comp-feature">Key Active</td>
            {products.map((p) => (
              <td key={p.asin} className="comp-val">
                {p.ingredients?.[0] || "Proprietary Blend"}
              </td>
            ))}
          </tr>
          <tr>
            <td className="comp-feature">Best For</td>
            {products.map((p) => (
              <td key={p.asin} className="comp-val">
                {p.bestFor?.[0] || "Daily use"}
              </td>
            ))}
          </tr>
          <tr>
            <td className="comp-feature">Action</td>
            {products.map((p) => {
              const url = global.getAffiliateUrl(p.asin, p.name, p.brand, p.link);
              return (
                <td key={p.asin}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="comp-btn">
                    Check Price
                  </a>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

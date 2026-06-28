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
 <div
 style={{
 background: "#faf8f5",
 border: "1px solid #e8e2d9",
 borderRadius: "16px",
 padding: "20px",
 margin: "28px 0",
 direction: isRtl ? "rtl" : "ltr",
 textAlign: isRtl ? "right" : "left",
 boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
 }}
 >
 {/* 1. Header Product Row */}
 <a
 href={affiliateUrl}
 target="_blank"
 rel="noopener noreferrer"
 style={{
 display: "flex",
 gap: "16px",
 alignItems: "center",
 textDecoration: "none",
 color: "inherit",
 cursor: "pointer",
 }}
 >
 <div
 className="affiliate-image-wrapper"
 style={{
 width: "80px",
 height: "80px",
 flexShrink: 0,
 background: "#fff",
 borderRadius: "10px",
 overflow: "hidden",
 border: "1px solid #ede8e0",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 }}
 >
 <img
 src={product.image}
 alt={product.name}
 style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }}
 />
 </div>

 <div style={{ flex: 1, minWidth: 0 }}>
 {product.badge && (
 <span
 style={{
 display: "inline-block",
 fontSize: "9px",
 letterSpacing: "0.15em",
 textTransform: "uppercase",
 color: "#fc2779",
 background: "rgba(252, 39, 121, 0.08)",
 padding: "2px 8px",
 borderRadius: "99px",
 fontWeight: 700,
 marginBottom: "6px",
 }}
 >
 {product.badge}
 </span>
 )}
 <h4
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "16px",
 color: "#111",
 margin: "0 0 4px",
 lineHeight: 1.35,
 fontWeight: 400,
 overflow: "hidden",
 display: "-webkit-box",
 WebkitLineClamp: 2,
 WebkitBoxOrient: "vertical",
 }}
 >
 {product.name}
 </h4>
 <p style={{ fontSize: "11px", color: "#8b8580", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px" }}>
 {product.brand}
 </p>
 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: isRtl ? 'flex-end' : 'flex-start' }}>
 <span style={{ fontSize: "18px", color: "#111", fontWeight: 700 }}>
 {global.formatPrice(product.price)}
 </span>
 {disc > 0 && (
 <>
 <span style={{ fontSize: "13px", color: "#bbb", textDecoration: "line-through" }}>
 {global.formatPrice(product.mrp)}
 </span>
 <span
 style={{
 fontSize: "10px",
 color: "#5a9e6f",
 background: "#edf7f0",
 padding: "2px 6px",
 borderRadius: "4px",
 fontWeight: 700,
 }}
 >
 {disc}% {global.t("product.off")}
 </span>
 </>
 )}
 </div>
 </div>
 </a>

 {/* 2. Structured Specs Table (SEO Featured Snippet Target) */}
 {product.specs && (
 <div style={{ marginTop: "16px", borderTop: "1px solid #ede8e0", paddingTop: "14px" }}>
 <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", color: "#4a4540" }}>
 <thead>
 <tr style={{ borderBottom: "1px solid #f4efe9" }}>
 <th style={{ textAlign: "left", padding: "6px 0", fontWeight: 600, color: "#8b8580", textTransform: "uppercase", fontSize: "10px", letterSpacing: "0.05em", width: "40%" }}>Attribute</th>
 <th style={{ textAlign: "left", padding: "6px 0", fontWeight: 600, color: "#8b8580", textTransform: "uppercase", fontSize: "10px", letterSpacing: "0.05em" }}>Specification</th>
 </tr>
 </thead>
 <tbody>
 {Object.entries(product.specs).map(([key, value]) => (
 <tr key={key} style={{ borderBottom: "1px solid #f4efe9" }}>
 <td style={{ padding: "8px 0", fontWeight: 600, color: "#1a1714" }}>{key}</td>
 <td style={{ padding: "8px 0", color: "#5c544e" }}>{value}</td>
 </tr>
 ))}
 <tr style={{ borderBottom: "1px solid #f4efe9" }}>
 <td style={{ padding: "8px 0", fontWeight: 600, color: "#1a1714" }}>Authenticity Check</td>
 <td style={{ padding: "8px 0", color: "#5a9e6f", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 }}>
 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12"></polyline>
 </svg>
 100% Genuine (Official Brand Storefront)
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 )}

 {/* 3. Action Buttons with Cookie Dropping Intent */}
 <div style={{ display: "flex", gap: "10px", marginTop: "18px", flexWrap: "wrap" }}>
 <a
 href={affiliateUrl}
 target="_blank"
 rel="noopener noreferrer"
 style={{
 flex: "1 1 200px",
 background: "#fc2779",
 color: "#fff",
 fontSize: "12px",
 fontWeight: 700,
 textDecoration: "none",
 padding: "12px 16px",
 borderRadius: "8px",
 textAlign: "center",
 display: "inline-flex",
 alignItems: "center",
 justifyContent: "center",
 gap: "6px",
 boxShadow: "0 4px 12px rgba(252, 39, 121, 0.15)",
 transition: "all 0.2s",
 cursor: "pointer",
 }}
 >
 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
 </svg>
 Compare Prices & Check 
 </a>

 <a
 href={global.getBrandStorefrontUrl(product.brand)}
 target="_blank"
 rel="noopener noreferrer"
 style={{
 flex: "1 1 200px",
 background: "#fff",
 color: "#1a1714",
 fontSize: "12px",
 fontWeight: 700,
 textDecoration: "none",
 padding: "12px 16px",
 borderRadius: "8px",
 textAlign: "center",
 border: "1px solid #dcd5cc",
 display: "inline-flex",
 alignItems: "center",
 justifyContent: "center",
 gap: "6px",
 transition: "all 0.2s",
 cursor: "pointer",
 }}
 >
 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
 </svg>
 Check Official Brand Storefront
 </a>
 </div>

 <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: "#8b8580", marginTop: "10px", justifyContent: "center" }}>
 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5a9e6f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12"></polyline>
 </svg>
 <span>Verified authentic link. Direct dispatch from brand warehouse or authorized seller.</span>
 </div>
 </div>
 );
}

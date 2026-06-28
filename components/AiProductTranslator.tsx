"use client";

import { useState } from "react";
import { Locale, LANGUAGE_NAMES } from "@/lib/globalization";
import { Check, Loader2, Star } from "lucide-react";

interface AiProductTranslatorProps {
 description: string;
 bestFor: string[];
 avoidIf: string[];
 usage: string;
 ingredients: string[];
 locale: Locale;
}

export default function AiProductTranslator({
 description,
 bestFor,
 avoidIf,
 usage,
 ingredients,
 locale,
}: AiProductTranslatorProps) {
 const [translatedData, setTranslatedData] = useState<{
 description: string;
 bestFor: string[];
 avoidIf: string[];
 usage: string;
 ingredients: string[];
 } | null>(null);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 // Translate details on click
 const handleTranslate = async () => {
 setIsLoading(true);
 setError(null);

 const dataToTranslate = {
 description,
 bestFor,
 avoidIf,
 usage,
 ingredients,
 };

 try {
 const response = await fetch("/api/translate", {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify({
 text: JSON.stringify(dataToTranslate),
 targetLanguage: LANGUAGE_NAMES[locale],
 }),
 });

 if (!response.ok) {
 throw new Error("Failed to translate details");
 }

 const resBody = await response.json();
 const parsed = JSON.parse(resBody.translation);
 
 setTranslatedData({
 description: parsed.description || description,
 bestFor: Array.isArray(parsed.bestFor) ? parsed.bestFor : bestFor,
 avoidIf: Array.isArray(parsed.avoidIf) ? parsed.avoidIf : avoidIf,
 usage: parsed.usage || usage,
 ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients : ingredients,
 });
 } catch (err: any) {
 console.error(err);
 setError("AI Translation failed. Please try again.");
 } finally {
 setIsLoading(false);
 }
 };

 const isTranslated = !!translatedData;
 const isEnglish = locale === "en";

 // Active texts based on state
 const activeDesc = translatedData?.description || description;
 const activeBestFor = translatedData?.bestFor || bestFor;
 const activeAvoidIf = translatedData?.avoidIf || avoidIf;
 const activeUsage = translatedData?.usage || usage;
 const activeIngredients = translatedData?.ingredients || ingredients;

 // Don't show translation trigger if language is English
 if (isEnglish) {
 return (
 <>
 <p className="description">{description}</p>
 
 {/* Info Grid 1 */}
 <section className="info-grid">
 <div className="info-block">
 <h2>Best For</h2>
 {bestFor.length ? (
 <ul>{bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
 ) : (
 <p>Use this when the product category and texture match your routine need.</p>
 )}
 </div>

 <div className="info-block">
 <h2>Avoid If</h2>
 {avoidIf.length ? (
 <ul>{avoidIf.map((item) => <li key={item}>{item}</li>)}</ul>
 ) : (
 <p>Skip or patch test if your skin is irritated, compromised, or you react easily to new formulas.</p>
 )}
 </div>

 <div className="info-block">
 <h2>How To Use</h2>
 <p>{usage}</p>
 </div>

 <div className="info-block">
 <h2>Mirha Notes</h2>
 <p>This pick is chosen for its category fit, price context, ingredient relevance and review signal. It is not medical advice.</p>
 </div>
 </section>

 {/* Info Grid 2 */}
 <section className="info-grid" style={{ marginTop: "14px" }}>
 <div className="info-block">
 <h2>Ingredients To Notice</h2>
 {ingredients.length ? (
 <ul>{ingredients.map((item) => <li key={item}>{item}</li>)}</ul>
 ) : (
 <p>Check the product label and patch test if you are sensitive to fragrance, acids or actives.</p>
 )}
 </div>
 </section>
 </>
 );
 }

 return (
 <div style={{ marginTop: "14px" }}>
 {/* Translation bar */}
 <div
 className="ai-translator-bar"
 style={{
 display: "flex",
 alignItems: "center",
 gap: "12px",
 marginBottom: "20px",
 padding: "10px 14px",
 background: isTranslated ? "#f0fdf4" : "#fff",
 border: isTranslated ? "1px solid #bbf7d0" : "1px solid #e3d8ce",
 borderRadius: "10px",
 fontSize: "13px",
 }}
 >
 {!isTranslated ? (
 <>
 <span>Translate this page details to {LANGUAGE_NAMES[locale]}?</span>
 <button
 onClick={handleTranslate}
 disabled={isLoading}
 style={{
 display: "inline-flex",
 alignItems: "center",
 gap: "6px",
 background: "linear-gradient(135deg, #fc2779, #b3392d)",
 color: "#fff",
 border: 0,
 borderRadius: "6px",
 padding: "6px 12px",
 fontSize: "11px",
 fontWeight: 600,
 cursor: "pointer",
 boxShadow: "0 2px 8px rgba(252, 39, 121, 0.2)",
 marginLeft: "auto",
 transition: "opacity 0.2s",
 }}
 onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
 onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
 >
 {isLoading ? (
 <>
 <Loader2 size={12} className="animate-spin" />
 Translating...
 </>
 ) : (
 <>
 <Star size={12} />
 Translate with AI ⭐
 </>
 )}
 </button>
 </>
 ) : (
 <>
 <span style={{ color: "#166534", display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 500 }}>
 <Check size={14} />
 Translated to {LANGUAGE_NAMES[locale]} with AI
 </span>
 <button
 onClick={() => setTranslatedData(null)}
 style={{
 background: "transparent",
 border: 0,
 color: "#8c8179",
 fontSize: "11px",
 cursor: "pointer",
 marginLeft: "auto",
 textDecoration: "underline",
 }}
 >
 Reset to original
 </button>
 </>
 )}
 </div>

 {error && (
 <p style={{ color: "var(--rose)", fontSize: "12px", marginTop: "-12px", marginBottom: "12px" }}>
 {error}
 </p>
 )}

 {/* Description */}
 {isLoading ? (
 <div style={{ display: "grid", gap: "8px", marginBottom: "22px" }}>
 <div style={{ height: "16px", background: "#eee", borderRadius: "4px", width: "95%", animation: "pulse 1.5s infinite" }} />
 <div style={{ height: "16px", background: "#eee", borderRadius: "4px", width: "90%", animation: "pulse 1.5s infinite" }} />
 <div style={{ height: "16px", background: "#eee", borderRadius: "4px", width: "70%", animation: "pulse 1.5s infinite" }} />
 </div>
 ) : (
 <p className="description">{activeDesc}</p>
 )}

 {/* Info Grid 1 */}
 <section className="info-grid">
 <div className="info-block">
 <h2>Best For</h2>
 {isLoading ? (
 <div style={{ height: "40px", background: "#eee", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
 ) : activeBestFor.length ? (
 <ul>{activeBestFor.map((item) => <li key={item}>{item}</li>)}</ul>
 ) : (
 <p>Use this when the product category and texture match your routine need.</p>
 )}
 </div>

 <div className="info-block">
 <h2>Avoid If</h2>
 {isLoading ? (
 <div style={{ height: "40px", background: "#eee", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
 ) : activeAvoidIf.length ? (
 <ul>{activeAvoidIf.map((item) => <li key={item}>{item}</li>)}</ul>
 ) : (
 <p>Skip or patch test if your skin is irritated, compromised, or you react easily to new formulas.</p>
 )}
 </div>

 <div className="info-block">
 <h2>How To Use</h2>
 {isLoading ? (
 <div style={{ height: "45px", background: "#eee", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
 ) : (
 <p>{activeUsage}</p>
 )}
 </div>

 <div className="info-block">
 <h2>Mirha Notes</h2>
 <p>This pick is chosen for its category fit, price context, ingredient relevance and review signal. It is not medical advice.</p>
 </div>
 </section>

 {/* Info Grid 2 */}
 <section className="info-grid" style={{ marginTop: "14px" }}>
 <div className="info-block">
 <h2>Ingredients To Notice</h2>
 {isLoading ? (
 <div style={{ height: "40px", background: "#eee", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
 ) : activeIngredients.length ? (
 <ul>{activeIngredients.map((item) => <li key={item}>{item}</li>)}</ul>
 ) : (
 <p>Check the product label and patch test if you are sensitive to fragrance, acids or actives.</p>
 )}
 </div>
 </section>

 <style>{`
 @keyframes pulse {
 0% { opacity: 0.6; }
 50% { opacity: 0.3; }
 100% { opacity: 0.6; }
 }
 `}</style>
 </div>
 );
}

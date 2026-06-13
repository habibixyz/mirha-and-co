"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Droplet, MapPin, Share2, Check, Mail, ArrowLeft, Star } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import Image from "next/image";
import { submitLeadAction } from "@/app/(saas)/actions";

// Predefined water hardness data for major Indian cities (ppm / TDS)
const INDIAN_CITIES = [
 { name: "Bengaluru", tds: 780, hardness: "Very Hard", description: "High calcium carbonates leading to severe hair fall and scalp dryness." },
 { name: "New Delhi", tds: 880, hardness: "Extremely Hard", description: "High heavy metal & mineral deposits causing itchy skin and dry scalp." },
 { name: "Mumbai", tds: 120, hardness: "Soft", description: "Generally soft lake water. Skin concerns are mostly humidity-related, not mineral-based." },
 { name: "Hyderabad", tds: 720, hardness: "Very Hard", description: "Groundwater mixing leads to hard saline deposits, causing frizzy hair." },
 { name: "Chennai", tds: 840, hardness: "Extremely Hard / Saline", description: "Very high mineral and salt content. Speeds up hair color fading and hair breakage." },
 { name: "Pune", tds: 380, hardness: "Moderately Hard", description: "Mixed sources. Requires mild chelating or softeners to prevent scalp scaling." },
 { name: "Gurugram", tds: 950, hardness: "Extremely Hard", description: "High salinity and heavy calcium/magnesium salts causing immediate scalp buildup and hair fall." },
 { name: "Noida", tds: 1050, hardness: "Extremely Hard", description: "High sulfate and chloride salts leading to skin barrier degradation and scalp itchiness." },
 { name: "Kolkata", tds: 150, hardness: "Soft", description: "Generally soft water, but high iron content can stain hair and leave it feeling stiff." },
 { name: "Jaipur", tds: 980, hardness: "Extremely Hard", description: "Highly alkaline ground water leading to dry hair shaft damage and skin flaking." },
 { name: "Ahmedabad", tds: 750, hardness: "Very Hard", description: "Moderate to high mineral levels that leave salt deposits on hair, leading to frizz and tangles." },
 { name: "Kochi", tds: 110, hardness: "Soft", description: "Very soft water. Hair and skin issues are usually due to high humidity and sweat build-up, not hard water minerals." },
];

export default function HardWaterCalculator() {
 const [step, setStep] = useState<1 | 2 | 3>(1);
 const [selectedCity, setSelectedCity] = useState<string>("");
 const [customTds, setCustomTds] = useState<string>("");
 const [useCustomTds, setUseCustomTds] = useState<boolean>(false);
 
 // Concerns
 const [hairConcerns, setHairConcerns] = useState<string[]>([]);
 const [skinConcerns, setSkinConcerns] = useState<string[]>([]);
 
 // Lead Capture
 const [email, setEmail] = useState<string>("");
 const [emailStatus, setEmailStatus] = useState<"idle" | "submitting" | "success">("idle");

 const toggleHairConcern = (id: string) => {
 setHairConcerns(prev => 
 prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
 );
 };

 const toggleSkinConcern = (id: string) => {
 setSkinConcerns(prev => 
 prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
 );
 };

 // Get current TDS for calculations
 const getTds = () => {
 if (useCustomTds && customTds) {
 return parseInt(customTds) || 100;
 }
 const city = INDIAN_CITIES.find(c => c.name === selectedCity);
 return city ? city.tds : 300;
 };

 // Calculate damage score & risks
 const getResults = () => {
 const tds = getTds();
 let baseScore = 15; // default base
 
 if (tds < 150) baseScore = 15;
 else if (tds < 350) baseScore = 45;
 else if (tds < 700) baseScore = 75;
 else baseScore = 90;

 // Add weights for symptoms
 const symptomsCount = hairConcerns.length + skinConcerns.length;
 const additionalScore = symptomsCount * 4;
 const finalScore = Math.min(baseScore + additionalScore, 99);

 let riskLevel = "Low";
 let riskColor = "#2d8a5c"; // Green
 if (finalScore >= 75) {
 riskLevel = "Extreme";
 riskColor = "#fc2779"; // Red/Rose
 } else if (finalScore >= 45) {
 riskLevel = "Moderate to High";
 riskColor = "#e67e22"; // Orange
 }

 return {
 score: finalScore,
 level: riskLevel,
 color: riskColor,
 tds,
 };
 };

 const results = getResults();

 // Recommendations matching with our actual products database
 const getHardWaterRecommendations = () => {
 const detoxieCombo = PRODUCTS.find(p => p.asin === "B0CLP4RRPC"); // Detoxie Hard Water Combo
 const detoxiePower = PRODUCTS.find(p => p.asin === "B0H11ZXLMZ"); // Detoxie Power Cleanse
 const lorealMetal = PRODUCTS.find(p => p.asin === "B09B1FXGR3"); // L'Oréal Metal DX
 const cream = PRODUCTS.find(p => p.asin === "B099MJH88B"); // Cetaphil barrier cream

 return {
 chelatingCombo: detoxieCombo || {
 name: "Detoxie Hard Water Repair Combo",
 brand: "Detoxie",
 description: "Chelating shampoo + conditioner that removes calcium & magnesium deposits. Reduces hairfall and softens brittle strands. Safe for daily use.",
 price: 499, mrp: 599,
 image: "https://m.media-amazon.com/images/I/71vrYex5sYL._SL300_.jpg",
 link: "https://amzn.to/3SfrSE5"
 },
 chelatingPro: lorealMetal || {
 name: "L'Oréal Professionnel Metal DX Shampoo",
 brand: "L'Oréal Professionnel",
 description: "Professional-grade chelating shampoo. Neutralises copper, iron, and calcium embedded in hair by hard water. Ideal for colour-treated hair.",
 price: 1320, mrp: 1490,
 image: "https://m.media-amazon.com/images/I/61WbDYJgnpL._SL300_.jpg",
 link: "https://amzn.to/4odVqOk"
 },
 dailyMaintain: detoxiePower || {
 name: "Detoxie Power Cleanse Shampoo",
 brand: "Detoxie",
 description: "Daily-use detox shampoo with Amla, Bhringraj & Shikakai. Fights sweat, pollution, and hard water buildup every wash.",
 price: 249, mrp: 299,
 image: "https://m.media-amazon.com/images/I/61uVXRviVgL._SL300_.jpg",
 link: "https://amzn.to/4dZVe1K"
 },
 barrierCream: cream || {
 name: "Cetaphil Moisturising Cream 250g",
 brand: "Cetaphil",
 description: "Intense moisture barrier support. Hydrates and repairs skin dried out by hard water mineral salts.",
 price: 1317, mrp: 1349,
 image: "/products/Cetaphil-Moisturisingz.jpg",
 link: "https://amzn.to/3NYBSQA"
 },
 };
 };

 const recs = getHardWaterRecommendations();


 // Share result to WhatsApp
 const handleShareWhatsApp = () => {
 const text = `I just calculated my Hard Water Hair & Skin Damage risk: it is ${results.score}% (${results.level} Risk) in ${useCustomTds ? "my area" : selectedCity}! Find your damage score and get a free recovery routine here:`;
 const url = "https://mirha-and-co.vercel.app/tools/hard-water";
 window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
 };

 // Submit email for PDF
 const handleEmailSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!email) return;
 setEmailStatus("submitting");
 try {
 const leadData = {
 city: selectedCity || "Custom TDS",
 score: results.score,
 level: results.level,
 tds: results.tds,
 };
 await submitLeadAction(email, "hardwater", JSON.stringify(leadData));
 setEmailStatus("success");
 
 // Store locally as fallback
 try {
 const leads = JSON.parse(localStorage.getItem("hardwater_leads") || "[]");
 if (!leads.includes(email)) {
 leads.push({ email, ...leadData, date: new Date().toISOString() });
 localStorage.setItem("hardwater_leads", JSON.stringify(leads));
 }
 } catch (err) {
 console.error(err);
 }
 } catch (err) {
 console.error(err);
 setEmailStatus("idle");
 }
 };

 return (
 <main className="hard-water-page">
 <style>{`
 .hard-water-page {
 background: #fbf7f1;
 color: #161412;
 min-height: 100vh;
 font-family: 'DM Sans', sans-serif;
 padding: 60px 24px 100px;
 }
 .shell {
 max-width: 800px;
 margin: 0 auto;
 }
 .back-link {
 display: inline-flex;
 align-items: center;
 gap: 8px;
 color: #756b63;
 font-size: 0.85rem;
 margin-bottom: 30px;
 text-decoration: none;
 font-weight: 500;
 transition: color 0.2s;
 }
 .back-link:hover {
 color: #fc2779;
 }
 .quiz-card {
 background: #fff;
 border: 1px solid #e8ded4;
 border-radius: 20px;
 padding: 40px;
 box-shadow: 0 12px 36px rgba(38, 28, 20, 0.04);
 }
 @media (max-width: 640px) {
 .hard-water-page {
 padding: 24px 16px 80px;
 }
 .quiz-card {
 padding: 24px 20px;
 border-radius: 16px;
 }
 .quiz-title {
 font-size: 1.6rem !important;
 }
 .score-circle {
 width: 130px;
 height: 130px;
 border-radius: 65px;
 }
 .score-num {
 font-size: 50px;
 }
 .results-summary-text {
 font-size: 0.95rem;
 }
 .action-row {
 flex-direction: column;
 align-items: stretch;
 }
 .share-btn {
 justify-content: center;
 }
 }
 .quiz-title {
 font-family: 'DM Serif Display', serif;
 font-size: clamp(28px, 4.5vw, 40px);
 font-weight: 400;
 line-height: 1.15;
 margin: 0 0 10px;
 }
 .quiz-subtitle {
 color: #756b63;
 font-size: 1rem;
 line-height: 1.6;
 margin: 0 0 30px;
 }
 .step-indicator {
 display: flex;
 align-items: center;
 gap: 6px;
 margin-bottom: 24px;
 }
 .step-dot {
 height: 6px;
 flex: 1;
 background: #ece2d9;
 border-radius: 3px;
 transition: background 0.3s;
 }
 .step-dot.active {
 background: #fc2779;
 }
 .city-grid {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 12px;
 margin-bottom: 20px;
 }
 @media (max-width: 640px) {
 .city-grid {
 grid-template-columns: repeat(2, 1fr);
 }
 }
 .city-btn {
 border: 1px solid #d8cdc3;
 background: #fffaf4;
 color: #161412;
 border-radius: 12px;
 padding: 18px 12px;
 font-size: 0.95rem;
 font-weight: 500;
 cursor: pointer;
 transition: all 0.2s;
 display: flex;
 flex-direction: column;
 align-items: center;
 gap: 8px;
 }
 .city-btn:hover {
 border-color: #fc2779;
 background: #fff0e8;
 }
 .city-btn.selected {
 border-color: #fc2779;
 background: #fff0e8;
 box-shadow: 0 0 0 2px rgba(252, 39, 121, 0.15);
 }
 .toggle-tds {
 display: block;
 margin: 20px auto 0;
 background: none;
 border: none;
 color: #fc2779;
 font-size: 0.85rem;
 font-weight: 600;
 cursor: pointer;
 text-decoration: underline;
 }
 .custom-tds-input {
 max-width: 280px;
 margin: 20px auto 0;
 display: flex;
 flex-direction: column;
 gap: 8px;
 }
 .custom-tds-input input {
 border: 1px solid #d8cdc3;
 background: #fffaf4;
 border-radius: 8px;
 padding: 12px;
 font-size: 1rem;
 outline: none;
 text-align: center;
 }
 .custom-tds-input input:focus {
 border-color: #fc2779;
 }
 .concern-section-title {
 font-size: 0.85rem;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 color: #fc2779;
 font-weight: 700;
 margin: 0 0 16px;
 }
 .symptom-grid {
 display: grid;
 grid-template-columns: repeat(2, 1fr);
 gap: 10px;
 margin-bottom: 24px;
 }
 @media (max-width: 640px) {
 .symptom-grid {
 grid-template-columns: 1fr;
 }
 }
 .symptom-card {
 border: 1px solid #e8ded4;
 border-radius: 12px;
 padding: 16px;
 text-align: left;
 cursor: pointer;
 transition: all 0.2s;
 background: #fff;
 display: flex;
 align-items: center;
 gap: 12px;
 }
 .symptom-card:hover {
 border-color: #fc2779;
 background: #fffaf4;
 }
 .symptom-card.selected {
 border-color: #fc2779;
 background: #fff0e8;
 }
 .symptom-checkbox {
 width: 18px;
 height: 18px;
 border: 1px solid #d8cdc3;
 border-radius: 4px;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-shrink: 0;
 background: #fff;
 }
 .symptom-card.selected .symptom-checkbox {
 background: #fc2779;
 border-color: #fc2779;
 color: #fff;
 }
 .next-btn {
 width: 100%;
 background: #161412;
 color: #fff;
 border: none;
 border-radius: 10px;
 padding: 16px;
 font-size: 1rem;
 font-weight: 600;
 cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 8px;
 transition: background 0.2s;
 margin-top: 30px;
 }
 .next-btn:hover {
 background: #2b2826;
 }
 .next-btn:disabled {
 opacity: 0.5;
 cursor: not-allowed;
 }
 /* Results Section */
 .results-header {
 text-align: center;
 margin-bottom: 40px;
 }
 .score-circle {
 width: 160px;
 height: 160px;
 border-radius: 80px;
 margin: 0 auto 20px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 color: #fff;
 box-shadow: 0 10px 30px rgba(0,0,0,0.06);
 position: relative;
 }
 .score-num {
 font-family: 'Bebas Neue', sans-serif;
 font-size: 64px;
 line-height: 1;
 }
 .score-lbl {
 font-size: 0.75rem;
 letter-spacing: 0.12em;
 text-transform: uppercase;
 font-weight: 700;
 opacity: 0.9;
 }
 .results-summary-text {
 font-size: 1.1rem;
 line-height: 1.6;
 max-width: 600px;
 margin: 0 auto 24px;
 }
 .action-row {
 display: flex;
 justify-content: center;
 gap: 12px;
 flex-wrap: wrap;
 margin-bottom: 40px;
 }
 .share-btn {
 border: 1px solid #d8cdc3;
 border-radius: 8px;
 padding: 12px 20px;
 font-size: 0.85rem;
 font-weight: 700;
 cursor: pointer;
 display: inline-flex;
 align-items: center;
 gap: 8px;
 background: #fff;
 color: #161412;
 }
 .share-btn:hover {
 background: #fbf7f1;
 }
 .whatsapp-btn {
 background: #25d366;
 color: #fff;
 border-color: #25d366;
 }
 .whatsapp-btn:hover {
 background: #20ba5a;
 }
 .science-section {
 border-top: 1px solid #ece2d9;
 padding-top: 30px;
 margin-top: 40px;
 text-align: left;
 }
 .science-section h3 {
 font-family: 'DM Serif Display', serif;
 font-size: 22px;
 font-weight: 400;
 margin-bottom: 18px;
 }
 .science-grid {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 16px;
 }
 @media (max-width: 640px) {
 .science-grid {
 grid-template-columns: 1fr;
 }
 }
 .science-card {
 background: #fffaf4;
 border: 1px solid #eee5dd;
 padding: 16px;
 border-radius: 12px;
 }
 .science-card h4 {
 font-size: 0.95rem;
 font-weight: 600;
 margin-bottom: 6px;
 }
 .science-card p {
 font-size: 0.8rem;
 color: #756b63;
 line-height: 1.5;
 }
 /* Lead capture panel */
 .lead-panel {
 background: #161412;
 color: #fff;
 border-radius: 16px;
 padding: 32px;
 margin-top: 40px;
 text-align: center;
 }
 .lead-panel h3 {
 font-family: 'DM Serif Display', serif;
 font-size: 24px;
 margin: 0 0 8px;
 }
 .lead-panel p {
 color: rgba(255,255,255,0.6);
 font-size: 0.9rem;
 line-height: 1.6;
 margin: 0 0 24px;
 }
 .lead-form {
 display: flex;
 gap: 8px;
 max-width: 480px;
 margin: 0 auto;
 }
 @media (max-width: 640px) {
 .lead-form {
 flex-direction: column;
 }
 }
 .lead-form input {
 flex: 1;
 border: 1px solid rgba(255,255,255,0.15);
 background: rgba(255,255,255,0.06);
 border-radius: 8px;
 padding: 12px 16px;
 color: #fff;
 font-size: 0.9rem;
 outline: none;
 }
 .lead-form input:focus {
 border-color: #fc2779;
 }
 .lead-form button {
 background: #fc2779;
 color: #fff;
 border: none;
 border-radius: 8px;
 padding: 12px 24px;
 font-size: 0.9rem;
 font-weight: 600;
 cursor: pointer;
 }
 .lead-form button:hover {
 background: #b23b2f;
 }
 /* Recs grid */
 .recs-section {
 margin-top: 40px;
 text-align: left;
 }
 .recs-section h3 {
 font-family: 'DM Serif Display', serif;
 font-size: 24px;
 font-weight: 400;
 margin-bottom: 20px;
 }
 .recs-grid {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 16px;
 }
 @media (max-width: 768px) {
 .recs-grid {
 grid-template-columns: 1fr;
 }
 }
 .rec-card {
 background: #fff;
 border: 1px solid #e8ded4;
 border-radius: 12px;
 padding: 20px;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 }
 .rec-badge {
 align-self: flex-start;
 background: #fff0e8;
 color: #fc2779;
 font-size: 0.7rem;
 letter-spacing: 0.1em;
 text-transform: uppercase;
 font-weight: 700;
 padding: 4px 8px;
 border-radius: 4px;
 margin-bottom: 12px;
 }
 .rec-name {
 font-weight: 600;
 font-size: 1rem;
 margin-bottom: 4px;
 line-height: 1.3;
 }
 .rec-brand {
 font-size: 0.75rem;
 color: #9c9188;
 margin-bottom: 10px;
 }
 .rec-desc {
 font-size: 0.8rem;
 color: #756b63;
 line-height: 1.5;
 margin-bottom: 20px;
 flex-grow: 1;
 }
 .rec-price-row {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-top: auto;
 border-top: 1px solid #f6f4f2;
 padding-top: 12px;
 }
 .rec-price {
 font-size: 1.1rem;
 font-weight: 700;
 }
 .rec-link {
 background: #161412;
 color: #fff;
 padding: 8px 12px;
 border-radius: 6px;
 font-size: 0.75rem;
 font-weight: 700;
 text-decoration: none;
 }
 `}</style>

 <div className="shell">
 <Link href="/" className="back-link">
 <ArrowLeft size={16} /> Back to Shop
 </Link>

 <div className="quiz-card">
 {step === 1 && (
 <div>
 <div className="step-indicator">
 <div className="step-dot active"></div>
 <div className="step-dot"></div>
 <div className="step-dot"></div>
 </div>
 <h1 className="quiz-title">Where do you wash your hair and skin?</h1>
 <p className="quiz-subtitle">
 Water mineral concentration in India varies heavily by geography. Let's find your baseline.
 </p>

 {!useCustomTds ? (
 <div>
 <div className="city-grid">
 {INDIAN_CITIES.map(city => (
 <button
 key={city.name}
 className={`city-btn ${selectedCity === city.name ? "selected" : ""}`}
 onClick={() => setSelectedCity(city.name)}
 >
 <MapPin size={18} style={{ color: selectedCity === city.name ? "#fc2779" : "#8c857f" }} />
 <span>{city.name}</span>
 </button>
 ))}
 </div>
 <button 
 onClick={() => { setUseCustomTds(true); setSelectedCity(""); }} 
 className="toggle-tds"
 >
 I know my area's TDS meter reading
 </button>
 </div>
 ) : (
 <div>
 <div className="custom-tds-input">
 <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#756b63" }}>Enter TDS (Total Dissolved Solids) in ppm</label>
 <input
 type="number"
 placeholder="e.g. 500"
 value={customTds}
 onChange={(e) => setCustomTds(e.target.value)}
 />
 </div>
 <button 
 onClick={() => { setUseCustomTds(false); setCustomTds(""); }} 
 className="toggle-tds"
 >
 Select from major cities instead
 </button>
 </div>
 )}

 <button
 className="next-btn"
 onClick={() => setStep(2)}
 disabled={!selectedCity && !customTds}
 >
 Continue to Symptoms <ArrowRight size={16} />
 </button>
 </div>
 )}

 {step === 2 && (
 <div>
 <div className="step-indicator">
 <div className="step-dot active"></div>
 <div className="step-dot active"></div>
 <div className="step-dot"></div>
 </div>
 <h1 className="quiz-title">What are you experiencing?</h1>
 <p className="quiz-subtitle">
 Hard water minerals block hydration and react with soaps. Check all that apply to you.
 </p>

 <div className="concern-section-title">Hair & Scalp Symptoms</div>
 <div className="symptom-grid">
 {[
 { id: "hairfall", label: "Increased hair fall / breakage" },
 { id: "dryhair", label: "Rough, dry, straw-like hair texture" },
 { id: "itchyscalp", label: "Itchy, flaky, or scaling scalp" },
 { id: "fadedcolor", label: "Dullness or fast-fading hair color" },
 ].map(item => (
 <div
 key={item.id}
 className={`symptom-card ${hairConcerns.includes(item.id) ? "selected" : ""}`}
 onClick={() => toggleHairConcern(item.id)}
 >
 <div className="symptom-checkbox">
 {hairConcerns.includes(item.id) && <Check size={12} />}
 </div>
 <span>{item.label}</span>
 </div>
 ))}
 </div>



 <div style={{ display: "flex", gap: "12px", marginTop: "30px" }}>
 <button
 className="next-btn"
 style={{ background: "transparent", border: "1px solid #d8cdc3", color: "#161412", flex: 1, marginTop: 0 }}
 onClick={() => setStep(1)}
 >
 Back
 </button>
 <button
 className="next-btn"
 style={{ flex: 2, marginTop: 0 }}
 onClick={() => setStep(3)}
 >
 Analyze My Water Risk <Star size={16} />
 </button>
 </div>
 </div>
 )}

 {step === 3 && (
 <div>
 <div className="results-header">
 <div className="score-circle" style={{ backgroundColor: results.color }}>
 <span className="score-num">{results.score}%</span>
 <span className="score-lbl">Damage Index</span>
 </div>
 <h1 className="quiz-title" style={{ fontSize: "2.2rem" }}>
 Your water is {results.tds} ppm. Risk is <span style={{ color: results.color }}>{results.level}</span>.
 </h1>
 <p className="results-summary-text">
 {results.score >= 75
 ? "Your hair and skin are fighting a losing battle against heavy calcium and magnesium carbonates. Minerals are building up, creating an invisible, moisture-blocking layer."
 : results.score >= 45
 ? "Your water has moderate mineral hardness. It's enough to cause frizz and mild dryness over time, but minor changes in your routine can completely reverse it."
 : "Great news! Your water has a low mineral load. Skin or hair symptoms you are experiencing are likely caused by product buildup, weather, or routine incompatibility, rather than hard water."}
 </p>
 
 <div className="action-row">
 <button onClick={handleShareWhatsApp} className="share-btn whatsapp-btn">
 <Share2 size={16} /> Share on WhatsApp
 </button>
 <button onClick={() => setStep(1)} className="share-btn">
 Retake Quiz
 </button>
 </div>
 </div>

 {/* Recommendations */}
 {results.score >= 45 && (
 <div className="recs-section">
 <h3>Your Hard Water Rescue Routine</h3>
 <div className="recs-grid">

 {/* Step 1: Weekly Chelating Combo */}
 <div className="rec-card">
 <img
 src={recs.chelatingCombo.image}
 alt={recs.chelatingCombo.name}
 style={{ width: "100%", height: "140px", objectFit: "contain", borderRadius: "8px", marginBottom: "12px", background: "#f9f5f0" }}
 />
 <div>
 <div className="rec-badge">Step 1 · Weekly Chelate</div>
 <h4 className="rec-name">{recs.chelatingCombo.name}</h4>
 <div className="rec-brand">By {recs.chelatingCombo.brand}</div>
 <p className="rec-desc">{recs.chelatingCombo.description}</p>
 </div>
 <div className="rec-price-row">
 <span className="rec-price">₹{recs.chelatingCombo.price}</span>
 <a href={recs.chelatingCombo.link} target="_blank" rel="noopener noreferrer" className="rec-link">Shop →</a>
 </div>
 </div>

 {/* Step 2: Daily Maintain */}
 <div className="rec-card">
 <img
 src={recs.dailyMaintain.image}
 alt={recs.dailyMaintain.name}
 style={{ width: "100%", height: "140px", objectFit: "contain", borderRadius: "8px", marginBottom: "12px", background: "#f9f5f0" }}
 />
 <div>
 <div className="rec-badge">Step 2 · Daily Wash</div>
 <h4 className="rec-name">{recs.dailyMaintain.name}</h4>
 <div className="rec-brand">By {recs.dailyMaintain.brand}</div>
 <p className="rec-desc">{recs.dailyMaintain.description}</p>
 </div>
 <div className="rec-price-row">
 <span className="rec-price">₹{recs.dailyMaintain.price}</span>
 <a href={recs.dailyMaintain.link} target="_blank" rel="noopener noreferrer" className="rec-link">Shop →</a>
 </div>
 </div>

 {/* Step 3: Barrier Cream */}
 <div className="rec-card">
 <img
 src={recs.barrierCream.image}
 alt={recs.barrierCream.name}
 style={{ width: "100%", height: "140px", objectFit: "contain", borderRadius: "8px", marginBottom: "12px", background: "#f9f5f0" }}
 />
 <div>
 <div className="rec-badge">Step 3 · Skin Barrier</div>
 <h4 className="rec-name">{recs.barrierCream.name}</h4>
 <div className="rec-brand">By {recs.barrierCream.brand}</div>
 <p className="rec-desc">{recs.barrierCream.description}</p>
 </div>
 <div className="rec-price-row">
 <span className="rec-price">₹{recs.barrierCream.price}</span>
 <a href={recs.barrierCream.link} target="_blank" rel="noopener noreferrer" className="rec-link">Shop →</a>
 </div>
 </div>

 {/* Upgrade rec: Pro salon shampoo, only for extreme risk */}
 {results.score >= 75 && (
 <div className="rec-card" style={{ borderColor: "rgba(252, 39, 121,0.3)", background: "#fffaf8" }}>
 <img
 src={recs.chelatingPro.image}
 alt={recs.chelatingPro.name}
 style={{ width: "100%", height: "140px", objectFit: "contain", borderRadius: "8px", marginBottom: "12px", background: "#f9f5f0" }}
 />
 <div>
 <div className="rec-badge" style={{ background: "#fc2779", color: "#fff" }}>Extreme Risk Upgrade</div>
 <h4 className="rec-name">{recs.chelatingPro.name}</h4>
 <div className="rec-brand">By {recs.chelatingPro.brand}</div>
 <p className="rec-desc">{recs.chelatingPro.description}</p>
 </div>
 <div className="rec-price-row">
 <span className="rec-price">₹{recs.chelatingPro.price}</span>
 <a href={recs.chelatingPro.link} target="_blank" rel="noopener noreferrer" className="rec-link">Shop →</a>
 </div>
 </div>
 )}

 </div>
 </div>
 )}

 {/* Science Breakdown */}
 <div className="science-section">
 <h3>The Science of Hard Water Damage</h3>
 <div className="science-grid">
 <div className="science-card">
 <h4>1. Mineral Scum</h4>
 <p>Calcium and magnesium minerals react with standard foaming agents to create insoluble "scum." This scum clogs skin pores and forms a layer on the scalp.</p>
 </div>
 <div className="science-card">
 <h4>2. Keratin Crystallization</h4>
 <p>Minerals crystallize inside the hair shafts, making hair fibers stiff, brittle, and highly prone to breaking under tension (like brushing).</p>
 </div>
 <div className="science-card">
 <h4>3. pH Alkalinity</h4>
 <p>Hard water is highly alkaline (pH &gt; 8). Healthy skin needs an acidic environment (pH ~5.5) to keep bacteria out and moisture in. High pH leads to barrier failure.</p>
 </div>
 </div>
 </div>

 {/* Lead Capture - Hidden from front end but kept in stack */}
 {/* <div className="lead-panel">
 <h3>Get Your Custom 12-Page Hard Water Guide</h3>
 <p>We'll email you a customized routine guide, mineral breakdowns for your city, and a list of chelating ingredients to look for in drugstore products.</p>
 {emailStatus === "success" ? (
 <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(45, 138, 92, 0.15)", color: "#2d8a5c", padding: "12px 24px", borderRadius: "8px", fontSize: "0.95rem" }}>
 <Check size={18} /> Check your inbox! Your report has been dispatched.
 </div>
 ) : (
 <form onSubmit={handleEmailSubmit} className="lead-form">
 <input
 type="email"
 placeholder="Enter your email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 />
 <button type="submit" disabled={emailStatus === "submitting"}>
 {emailStatus === "submitting" ? "Sending..." : "Send My Guide"}
 </button>
 </form>
 )}
 </div> */}
 </div>
 )}
 </div>
 </div>
 </main>
 );
}

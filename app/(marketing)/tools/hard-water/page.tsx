"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Droplet, MapPin, Share2, Check, Mail, ArrowLeft, Star, Search, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import Image from "next/image";
import { submitLeadAction } from "@/app/(saas)/actions";
import { useGlobalization } from "@/components/GlobalizationContext";

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

// Predefined water hardness data for all Indian States & Union Territories (ppm / TDS averages)
const INDIAN_STATES = [
  { name: "Andhra Pradesh", tds: 650, hardness: "Very Hard", description: "High levels of fluoride and mineral hardness causing dry scalp and frizzy hair." },
  { name: "Arunachal Pradesh", tds: 120, hardness: "Soft", description: "Mainly soft natural river water. Skin and hair issues are rarely mineral-bound." },
  { name: "Assam", tds: 280, hardness: "Moderately Hard", description: "Generally moderate mineral levels, but high natural iron content can cause hair stiffness." },
  { name: "Bihar", tds: 450, hardness: "Hard", description: "High calcium and iron concentration causing scalp itchiness and product buildup." },
  { name: "Chhattisgarh", tds: 320, hardness: "Moderately Hard", description: "Moderate hardness requiring mild chelating shampoo to maintain scalp health." },
  { name: "Goa", tds: 90, hardness: "Soft", description: "Soft coastal water. Hair and skin issues are usually humidity-related rather than mineral-based." },
  { name: "Gujarat", tds: 550, hardness: "Hard", description: "High mineral salinity leading to dry hair shaft damage and frizzy textures." },
  { name: "Haryana", tds: 620, hardness: "Very Hard", description: "Very high mineral and salinity content. Speeds up hair breakage and dry scalp." },
  { name: "Himachal Pradesh", tds: 140, hardness: "Soft", description: "Soft mountain water. Very low mineral content, gentle on hair and skin." },
  { name: "Jharkhand", tds: 300, hardness: "Moderately Hard", description: "Moderate hardness. Iron contamination in some pockets can make hair feel stiff." },
  { name: "Karnataka", tds: 520, hardness: "Hard", description: "Saline and calcium ground water causing dry scalp and hair fall." },
  { name: "Kerala", tds: 110, hardness: "Soft", description: "Generally soft water. Hair and skin issues are usually due to high humidity and sweat." },
  { name: "Madhya Pradesh", tds: 480, hardness: "Hard", description: "Hard groundwater minerals causing scalp buildup and skin barrier dryness." },
  { name: "Maharashtra", tds: 340, hardness: "Moderately Hard", description: "Varies by source. Surface water is soft, but borewell mixing causes moderate hardness." },
  { name: "Manipur", tds: 100, hardness: "Soft", description: "Soft water with low mineral concentration. Safe for daily hair washing." },
  { name: "Meghalaya", tds: 80, hardness: "Soft", description: "Very soft rainwater-fed sources. Extremely gentle on skin and scalp." },
  { name: "Mizoram", tds: 90, hardness: "Soft", description: "Soft water. Hair and skin issues are likely routine or climate-based." },
  { name: "Nagaland", tds: 110, hardness: "Soft", description: "Soft water with negligible mineral buildup. Minimal risk of hard water damage." },
  { name: "Odisha", tds: 360, hardness: "Moderately Hard", description: "Moderate hardness with localized iron content causing dry hair texture." },
  { name: "Punjab", tds: 580, hardness: "Hard", description: "Hard groundwater from intensive agriculture area. Causes scalp dryness and frizz." },
  { name: "Rajasthan", tds: 760, hardness: "Very Hard", description: "Extremely high TDS ground water. Highly saline and alkaline, causing severe dryness." },
  { name: "Sikkim", tds: 90, hardness: "Soft", description: "Pristine soft mountain water. Very gentle on hair and skin barrier." },
  { name: "Tamil Nadu", tds: 610, hardness: "Very Hard", description: "High mineral and salt levels in groundwater, leading to hair fall and skin flaking." },
  { name: "Telangana", tds: 580, hardness: "Hard", description: "High carbonate salts leading to scalp scaling, hair fall, and dry skin." },
  { name: "Tripura", tds: 140, hardness: "Soft", description: "Soft water. High iron content in some sources might cause hair stiffening." },
  { name: "Uttar Pradesh", tds: 490, hardness: "Hard", description: "High mineral levels in Gangetic plains groundwater. Leads to dry scalp and frizzy hair." },
  { name: "Uttarakhand", tds: 160, hardness: "Soft / Moderately Hard", description: "Mainly soft to moderate water. Gentle on skin and hair." },
  { name: "West Bengal", tds: 260, hardness: "Moderately Hard", description: "Moderate hardness. Elevated iron levels in ground water can coat and stiffen hair strands." },
  { name: "Andaman and Nicobar Islands", tds: 120, hardness: "Soft", description: "Soft water with low mineral concentration." },
  { name: "Chandigarh", tds: 290, hardness: "Moderately Hard", description: "Moderate mineral content. Minimal risk of severe hard water buildup." },
  { name: "Dadra and Nagar Haveli and Daman and Diu", tds: 340, hardness: "Moderately Hard", description: "Moderate hardness in groundwater sources." },
  { name: "Delhi NCR", tds: 650, hardness: "Very Hard", description: "High mineral salinity leading to scalp scaling and hair breakage." },
  { name: "Jammu and Kashmir", tds: 170, hardness: "Soft / Moderately Hard", description: "Low to moderate mineral content. Generally gentle on skin." },
  { name: "Ladakh", tds: 140, hardness: "Soft", description: "Pristine glacier-fed soft water. Very gentle on skin and hair." },
  { name: "Lakshadweep", tds: 320, hardness: "Moderately Hard", description: "Coral limestone island geology leads to moderate calcium hardness." },
  { name: "Puducherry", tds: 480, hardness: "Hard", description: "Coastal saline ground water causing hair stiffness and scalp dryness." }
];


// Predefined water hardness data for major global cities
const GLOBAL_CITIES = [
  { name: "New York City", tds: 50, hardness: "Soft", description: "Generally soft surface water. Minimal risk of mineral damage; focus on hydration." },
  { name: "London", tds: 300, hardness: "Hard", description: "Chalk and limestone aquifers create hard water. High risk of scale buildup, frizz, and dry scalp." },
  { name: "Dubai", tds: 420, hardness: "Very Hard", description: "Desalinated water has high mineral salinity. Can dry out hair shafts and lead to scalp flaking." },
  { name: "Singapore", tds: 75, hardness: "Soft", description: "Soft water with low mineral levels. Hair dryness is likely due to high humidity and sweat, not minerals." },
  { name: "Sydney", tds: 60, hardness: "Soft", description: "Generally very soft water. Skin irritation is typically due to climate drafts rather than minerals." },
  { name: "Toronto", tds: 120, hardness: "Soft / Moderately Hard", description: "Moderately soft water. Requires light moisture barrier support during seasonal dry swings." },
  { name: "Los Angeles", tds: 260, hardness: "Moderately Hard", description: "Mixed sources. Causes noticeable hard water buildup and styling resistance over time." },
  { name: "Paris", tds: 280, hardness: "Hard", description: "High calcium carbonates. Can disrupt the skin's pH balance, making it feel tight and dry after washing." },
  { name: "Riyadh", tds: 580, hardness: "Very Hard", description: "High ground mineral and salinity levels. Speeds up color fading and hair breakage." }
];

// Predefined water hardness data for major global countries
const GLOBAL_COUNTRIES = [
  { name: "United States", tds: 220, hardness: "Moderately Hard", description: "Varies heavily. Midwest and Southwest have very hard aquifer water; Northwest is soft." },
  { name: "United Kingdom", tds: 260, hardness: "Hard", description: "Southern & Eastern England are very hard; Scotland, Wales, and Northern England are soft." },
  { name: "Canada", tds: 150, hardness: "Soft / Moderately Hard", description: "Generally soft in major cities (Vancouver, Toronto), but hard in Prairie provinces." },
  { name: "Australia", tds: 140, hardness: "Soft / Moderately Hard", description: "Soft surface water in most capitals, but Adelaide and regional ground water are hard." },
  { name: "Germany", tds: 320, hardness: "Hard", description: "High calcium carbonates in central/southern regions causing scalp flaking and dry hair." },
  { name: "United Arab Emirates", tds: 380, hardness: "Hard", description: "Desalinated water mixed with local groundwater causes high mineral salinity." },
  { name: "Saudi Arabia", tds: 540, hardness: "Very Hard", description: "High natural groundwater salinity and TDS causing brittle hair strands." },
  { name: "France", tds: 270, hardness: "Hard", description: "High calcium content in Paris basin and central areas, causing skin tightness." },
  { name: "Singapore", tds: 75, hardness: "Soft", description: "Soft tap water source. Safe for daily washing." },
  { name: "Japan", tds: 60, hardness: "Soft", description: "Soft mountain water. Extremely gentle on skin and hair." }
];

export default function HardWaterCalculator() {
  const { currency, formatPrice, getAffiliateUrl } = useGlobalization();
  const [regionMode, setRegionMode] = useState<"in" | "global">("in");
  useEffect(() => {
    setRegionMode(currency === "INR" ? "in" : "global");
  }, [currency]);
  const activeCities = regionMode === "in" ? INDIAN_CITIES : GLOBAL_CITIES;
  const activeStates = regionMode === "in" ? INDIAN_STATES : GLOBAL_COUNTRIES;
 const [step, setStep] = useState<1 | 2 | 3>(1);
 const [stateSearch, setStateSearch] = useState<string>("");
 const [isStateDropdownOpen, setIsStateDropdownOpen] = useState<boolean>(false);

 useEffect(() => {
   const handleClickOutside = (event: MouseEvent) => {
     const target = event.target as HTMLElement;
     if (!target.closest(".autocomplete-container")) {
       setIsStateDropdownOpen(false);
     }
   };
   document.addEventListener("mousedown", handleClickOutside);
   return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

 const filteredStates = activeStates.filter(state =>
   state.name.toLowerCase().includes(stateSearch.toLowerCase())
 );
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
 const city = activeCities.find(c => c.name === selectedCity);
 if (city) return city.tds;
 const state = activeStates.find(s => s.name === selectedCity);
 return state ? state.tds : 300;
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

  const getHardWaterRecommendations = () => {
    const isGlobal = regionMode === "global";

    if (isGlobal) {
      const malibuCombo = PRODUCTS.find(p => p.asin === "B01N23J5C1");
      const lorealMetal = PRODUCTS.find(p => p.asin === "B09B1FXGR3");
      const cream = PRODUCTS.find(p => p.asin === "B099MJH88B");
      const malibuRemedy = PRODUCTS.find(p => p.asin === "B07L9VXQN2");

      return {
        chelatingCombo: malibuCombo || {
          asin: "B01N23J5C1",
          name: "Malibu C Hard Water Wellness Shampoo",
          brand: "Malibu C",
          description: "The industry standard for hard water. Removes copper, iron, calcium, and chlorine. Restores volume, shine, and manageability.",
          price: 1799, mrp: 2199,
          image: "/products/B01N23J5C1.JPG",
          link: "https://link.amazon/B01RUwEae"
        },
        chelatingPro: malibuRemedy || {
          asin: "B07L9VXQN2",
          name: "Malibu C Hard Water Wellness Remedy",
          brand: "Malibu C",
          description: "Patented crystal packets that instantly remove hard water mineral build-up and surface discoloration. Ideal for extreme hardness.",
          price: 1499, mrp: 1899,
          image: "/products/B07L9VXQN2.JPG",
          link: "https://link.amazon/B0h1MCcCr"
        },
        dailyMaintain: lorealMetal || {
          asin: "B09B1FXGR3",
          name: "L'Oréal Professionnel Metal DX Shampoo",
          brand: "L'Oréal Professionnel",
          description: "Professional-grade chelating shampoo. Neutralises copper, iron, and calcium embedded in hair by hard water. Ideal for color-treated hair.",
          price: 1320, mrp: 1490,
          image: "https://m.media-amazon.com/images/I/61WbDYJgnpL._SL300_.jpg",
          link: "https://amzn.to/4odVqOk"
        },
        barrierCream: cream || {
          asin: "B099MJH88B",
          name: "Cetaphil Moisturising Cream 250g",
          brand: "Cetaphil",
          description: "Intense moisture barrier support. Hydrates and repairs skin dried out by hard water mineral salts.",
          price: 1317, mrp: 1349,
          image: "/products/Cetaphil-Moisturisingz.jpg",
          link: "https://amzn.to/3NYBSQA"
        },
      };
    }

    const detoxieCombo = PRODUCTS.find(p => p.asin === "B0CLP4RRPC"); // Detoxie Hard Water Combo
    const detoxiePower = PRODUCTS.find(p => p.asin === "B0H11ZXLMZ"); // Detoxie Power Cleanse
    const lorealMetal = PRODUCTS.find(p => p.asin === "B09B1FXGR3"); // L'Oréal Metal DX
    const cream = PRODUCTS.find(p => p.asin === "B099MJH88B"); // Cetaphil barrier cream

    return {
      chelatingCombo: detoxieCombo || {
        asin: "B0CLP4RRPC",
        name: "Detoxie Hard Water Repair Combo",
        brand: "Detoxie",
        description: "Chelating shampoo + conditioner that removes calcium & magnesium deposits. Reduces hairfall and softens brittle strands. Safe for daily use.",
        price: 499, mrp: 599,
        image: "https://m.media-amazon.com/images/I/71vrYex5sYL._SL300_.jpg",
        link: "https://amzn.to/3SfrSE5"
      },
      chelatingPro: lorealMetal || {
        asin: "B09B1FXGR3",
        name: "L'Oréal Professionnel Metal DX Shampoo",
        brand: "L'Oréal Professionnel",
        description: "Professional-grade chelating shampoo. Neutralises copper, iron, and calcium embedded in hair by hard water. Ideal for colour-treated hair.",
        price: 1320, mrp: 1490,
        image: "https://m.media-amazon.com/images/I/61WbDYJgnpL._SL300_.jpg",
        link: "https://amzn.to/4odVqOk"
      },
      dailyMaintain: detoxiePower || {
        asin: "B0H11ZXLMZ",
        name: "Detoxie Power Cleanse Shampoo",
        brand: "Detoxie",
        description: "Daily-use detox shampoo with Amla, Bhringraj & Shikakai. Fights sweat, pollution, and hard water buildup every wash.",
        price: 249, mrp: 299,
        image: "https://m.media-amazon.com/images/I/61uVXRviVgL._SL300_.jpg",
        link: "https://amzn.to/4dZVe1K"
      },
      barrierCream: cream || {
        asin: "B099MJH88B",
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
 const url = "https://mirhaandco.com/tools/hard-water";
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
 .state-dropdown-item:hover {
 background: #fff0e8 !important;
 color: #fc2779 !important;
 }
 .state-search-input:focus {
 border-color: #fc2779 !important;
 box-shadow: 0 0 0 3px rgba(252, 39, 121, 0.1) !important;
 background: #fff !important;
 }
 `}</style>

 <div className="shell">
  <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", border: 0 }}>
    Hard Water Hair & Skin Damage Calculator
  </h1>
 {step > 1 ? (
   <button 
     onClick={() => setStep(1)} 
     className="back-link" 
     style={{ background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", padding: 0, outline: "none" }}
   >
     <ArrowLeft size={16} /> Back to Hard Water Test
   </button>
 ) : (
   <Link href="/" className="back-link">
     <ArrowLeft size={16} /> Back to Shop
   </Link>
 )}

 <div className="quiz-card">
 {step === 1 && (
 <div>
 <div className="step-indicator">
 <div className="step-dot active"></div>
 <div className="step-dot"></div>
 <div className="step-dot"></div>
 </div>
 <h2 className="quiz-title">Where in the world do you wash?</h2>
 <p className="quiz-subtitle">
 {(regionMode === "in") ? "Water mineral concentration in India varies heavily by geography. Let's find your baseline." : "Water mineral concentration varies heavily by geography. Let's find your baseline."}
 </p>
  <div style={{
    display: "inline-flex",
    background: "#f5ece2",
    borderRadius: "99px",
    padding: "4px",
    marginBottom: "24px",
    border: "1px solid #e5ded6",
    alignItems: "center",
    gap: "2px"
  }}>
    <button
      onClick={() => {
        setRegionMode("in");
        setSelectedCity("");
        setStateSearch("");
      }}
      style={{
        padding: "8px 18px",
        borderRadius: "99px",
        fontSize: "0.82rem",
        fontWeight: 700,
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s",
        background: regionMode === "in" ? "#fc2779" : "transparent",
        color: regionMode === "in" ? "#fff" : "#756b63",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px"
      }}
    >
      🇮🇳 India
    </button>
    <button
      onClick={() => {
        setRegionMode("global");
        setSelectedCity("");
        setStateSearch("");
      }}
      style={{
        padding: "8px 18px",
        borderRadius: "99px",
        fontSize: "0.82rem",
        fontWeight: 700,
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s",
        background: regionMode === "global" ? "#fc2779" : "transparent",
        color: regionMode === "global" ? "#fff" : "#756b63",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px"
      }}
    >
      🌍 Worldwide
    </button>
  </div>

 {!useCustomTds ? (
 <div>
 <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#756b63", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
 {(regionMode === "in") ? "Quick Select Major Cities" : "Quick Select Global Cities"}
 </div>
 <div className="city-grid">
 {activeCities.map(city => (
 <button
 key={city.name}
 className={`city-btn ${selectedCity === city.name ? "selected" : ""}`}
 onClick={() => { setSelectedCity(city.name); setStateSearch(""); }}
 >
 <MapPin size={18} style={{ color: selectedCity === city.name ? "#fc2779" : "#8c857f" }} />
 <span>{city.name}</span>
 </button>
 ))}
 </div>

 {/* Searchable State Selector */}
 <div className="state-autocomplete-wrapper" style={{ marginTop: "24px", position: "relative" }}>
 <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#756b63", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
 {(regionMode === "in") ? "Or Search / Select Your State" : "Or Search / Select Your Country"}
 </label>
 <div className="autocomplete-container" style={{ position: "relative" }}>
 <div style={{ position: "relative" }}>
 <MapPin size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#8c857f", pointerEvents: "none" }} />
 <input
 type="text"
 placeholder={(regionMode === "in") ? "Type to search state (e.g. Rajasthan, Goa...)" : "Type to search country (e.g. United Kingdom, Germany...)"}
 value={stateSearch}
  onChange={(e) => {
  setStateSearch(e.target.value);
  setIsStateDropdownOpen(true);
  }}
  onFocus={() => setIsStateDropdownOpen(true)}
  style={{
  width: "100%",
  border: "1px solid #d8cdc3",
  background: "#fffaf4",
  color: "#161412",
  borderRadius: "12px",
  padding: "16px 44px 16px 44px",
  fontSize: "0.95rem",
  fontWeight: 500,
  outline: "none",
  transition: "all 0.2s",
  boxSizing: "border-box"
  }}
  className="state-search-input"
  />
  <ChevronDown
  size={18}
  onClick={(e) => {
  e.stopPropagation();
  setIsStateDropdownOpen(!isStateDropdownOpen);
  }}
  style={{
  position: "absolute",
  right: "16px",
  top: "50%",
  color: "#8c857f",
  cursor: "pointer",
  transformOrigin: "center",
  transition: "transform 0.2s",
  transform: isStateDropdownOpen ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)"
  }}
  />
  </div>
  
  {isStateDropdownOpen && (
  <div style={{
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  background: "#fff",
  border: "1px solid #e8ded4",
  borderRadius: "12px",
  marginTop: "8px",
  maxHeight: "240px",
  overflowY: "auto",
  zIndex: 50,
  boxShadow: "0 10px 30px rgba(38, 28, 20, 0.08)",
  padding: "6px"
  }}>
  {filteredStates.length > 0 ? (
  filteredStates.map(state => (
  <div
  key={state.name}
  onClick={() => {
  setSelectedCity(state.name);
  setUseCustomTds(false);
  setStateSearch(state.name);
  setIsStateDropdownOpen(false);
  }}
  style={{
  padding: "12px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "0.95rem",
  fontWeight: 500,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "background 0.2s",
  background: selectedCity === state.name ? "#fff0e8" : "transparent",
  color: selectedCity === state.name ? "#fc2779" : "#161412"
  }}
  className="state-dropdown-item"
  >
  <span>{state.name}</span>
  <span style={{ fontSize: "0.8rem", color: selectedCity === state.name ? "#fc2779" : "#8c857f", background: "#f6ede4", padding: "2px 8px", borderRadius: "12px" }}>
  ~{state.tds} ppm
  </span>
  </div>
  ))
  ) : (
  <div style={{ padding: "16px", color: "#8c857f", textAlign: "center", fontSize: "0.9rem" }}>
  {(regionMode === "in") ? "No states or UTs found" : "No countries found"}
  </div>
  )}
  </div>
  )}
  </div>
  </div>

  <button 
  onClick={() => { setUseCustomTds(true); setSelectedCity(""); setStateSearch(""); }} 
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
 <h2 className="quiz-title">What are you experiencing?</h2>
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
 
 {/* Premium SVG Radial Gauge */}
 <div className="gauge-container" style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto 24px" }}>
 <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: "rotate(-90deg)" }}>
 <circle
 cx="80"
 cy="80"
 r="70"
 fill="transparent"
 stroke="#ece2d9"
 strokeWidth="10"
 />
 <circle
 cx="80"
 cy="80"
 r="70"
 fill="transparent"
 stroke={results.color}
 strokeWidth="10"
 strokeDasharray={2 * Math.PI * 70}
 strokeDashoffset={2 * Math.PI * 70 - (results.score / 100) * 2 * Math.PI * 70}
 strokeLinecap="round"
 style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
 />
 </svg>
 <div style={{
 position: "absolute",
 top: 0,
 left: 0,
 width: "160px",
 height: "160px",
 display: "flex",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center"
 }}>
 <span className="score-num" style={{ fontSize: "48px", fontWeight: 700, color: "#161412", lineHeight: 1 }}>
 {results.score}%
 </span>
 <span className="score-lbl" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#756b63", marginTop: "4px" }}>
 Damage Index
 </span>
 </div>
 </div>

 <h2 className="quiz-title" style={{ fontSize: "2.2rem" }}>
 Your water is {results.tds} ppm. Risk is <span style={{ color: results.color }}>{results.level}</span>.
 </h2>
 
 {/* Location Profile Detail Card */}
 {selectedCity && !useCustomTds && (
 <div className="location-profile-card" style={{
 background: "rgba(255, 255, 255, 0.7)",
 backdropFilter: "blur(12px)",
 border: "1px solid #e8ded4",
 borderRadius: "16px",
 padding: "24px",
 maxWidth: "550px",
 margin: "24px auto 30px",
 textAlign: "left",
 boxShadow: "0 8px 24px rgba(38, 28, 20, 0.03)"
 }}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
 <MapPin size={18} style={{ color: "#fc2779" }} />
 <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#161412" }}>{selectedCity}</span>
 </div>
 <span className="hardness-badge" style={{
 backgroundColor: results.score >= 75 ? "#fff0e8" : results.score >= 45 ? "#fff6ee" : "#eaf7f0",
 color: results.color,
 fontSize: "0.75rem",
 fontWeight: 700,
 textTransform: "uppercase",
 padding: "4px 10px",
 borderRadius: "99px"
 }}>
 {
 activeCities.find(c => c.name === selectedCity)?.hardness ||
 activeStates.find(s => s.name === selectedCity)?.hardness ||
 "Unknown"
 } Hardness
 </span>
 </div>
 <p style={{ margin: 0, fontSize: "0.9rem", color: "#4f4741", lineHeight: 1.5 }}>
 {
 activeCities.find(c => c.name === selectedCity)?.description ||
 activeStates.find(s => s.name === selectedCity)?.description
 }
 </p>
 </div>
 )}

 {useCustomTds && (
 <div className="location-profile-card" style={{
 background: "rgba(255, 255, 255, 0.7)",
 backdropFilter: "blur(12px)",
 border: "1px solid #e8ded4",
 borderRadius: "16px",
 padding: "24px",
 maxWidth: "550px",
 margin: "24px auto 30px",
 textAlign: "left",
 boxShadow: "0 8px 24px rgba(38, 28, 20, 0.03)"
 }}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
 <Droplet size={18} style={{ color: "#fc2779" }} />
 <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#161412" }}>Custom TDS Reading</span>
 </div>
 <span className="hardness-badge" style={{
 backgroundColor: results.score >= 75 ? "#fff0e8" : results.score >= 45 ? "#fff6ee" : "#eaf7f0",
 color: results.color,
 fontSize: "0.75rem",
 fontWeight: 700,
 textTransform: "uppercase",
 padding: "4px 10px",
 borderRadius: "99px"
 }}>
 {results.tds >= 500 ? "Very Hard" : results.tds >= 300 ? "Hard" : results.tds >= 150 ? "Moderately Hard" : "Soft"} Hardness
 </span>
 </div>
 <p style={{ margin: 0, fontSize: "0.9rem", color: "#4f4741", lineHeight: 1.5 }}>
 You entered a custom reading of <strong>{results.tds} ppm</strong>. {
 results.tds >= 500
 ? "This represents extremely mineral-dense water. Calcium and magnesium carbonates are likely coating your hair fibers, preventing moisture absorption and causing barrier irritation on your skin."
 : results.tds >= 300
 ? "This represents moderately hard water. It's enough to cause persistent frizz, stiffness, and slow soap lathering."
 : "Your water is well within the soft to ideal range. Any hair or skin issues are likely due to lifestyle, products, or climatic conditions."
 }
 </p>
 </div>
 )}

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
 {regionMode === "global" && (
 <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(252,39,121,0.06)", border: "1px solid rgba(252,39,121,0.15)", borderRadius: "99px", padding: "6px 16px", fontSize: "0.78rem", fontWeight: 700, color: "#fc2779", marginTop: "16px" }}>
 🌍 Showing globally available products for your region
 </div>
 )}
 </div>

 {/* Recommendations */}
 {results.score >= 45 && (
 <div className="recs-section">
 <h3>{regionMode === "global" ? "Your Global Hard Water Rescue Routine" : "Your Hard Water Rescue Routine"}</h3>
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
 <span className="rec-price">{formatPrice(recs.chelatingCombo.price)}</span>
 <a href={getAffiliateUrl(recs.chelatingCombo.asin || "B0CLP4RRPC", recs.chelatingCombo.name, recs.chelatingCombo.brand, recs.chelatingCombo.link)} target="_blank" rel="noopener noreferrer" className="rec-link">Shop →</a>
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
 <span className="rec-price">{formatPrice(recs.dailyMaintain.price)}</span>
 <a href={getAffiliateUrl(recs.dailyMaintain.asin || "B0H11ZXLMZ", recs.dailyMaintain.name, recs.dailyMaintain.brand, recs.dailyMaintain.link)} target="_blank" rel="noopener noreferrer" className="rec-link">Shop →</a>
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
 <span className="rec-price">{formatPrice(recs.barrierCream.price)}</span>
 <a href={getAffiliateUrl(recs.barrierCream.asin || "B099MJH88B", recs.barrierCream.name, recs.barrierCream.brand, recs.barrierCream.link)} target="_blank" rel="noopener noreferrer" className="rec-link">Shop →</a>
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
 <span className="rec-price">{formatPrice(recs.chelatingPro.price)}</span>
 <a href={getAffiliateUrl(recs.chelatingPro.asin || "B09B1FXGR3", recs.chelatingPro.name, recs.chelatingPro.brand, recs.chelatingPro.link)} target="_blank" rel="noopener noreferrer" className="rec-link">Shop →</a>
 </div>
 </div>
 )}

 </div>
 </div>
 )}

 {/* Science Breakdown */}
 <div className="science-section">
 <h3>The Global Science of Hard Water Damage</h3>
 <div className="science-grid">
 <div className="science-card">
 <h4>1. Mineral Scum</h4>
 <p>Calcium and magnesium react with soaps to form insoluble "scum" — a universal problem from London to Dubai to Delhi. It coats the scalp and clogs pores.</p>
 </div>
 <div className="science-card">
 <h4>2. Keratin Crystallization</h4>
 <p>Minerals crystallize inside the hair shaft, making fibers stiff, brittle, and prone to breakage — regardless of your climate or hair type.</p>
 </div>
 <div className="science-card">
 <h4>3. pH Alkalinity</h4>
 <p>Hard water is alkaline (pH &gt; 8). Healthy skin needs pH ~5.5. Alkaline water disrupts this everywhere — it's chemistry, not geography.</p>
 </div>
 </div>
 </div>

 {/* Lead Capture */}
 <div className="lead-panel">
 <h3>Get Your Personalised Hard Water Guide</h3>
 <p>We'll email you a free routine guide with chelating ingredients, product picks for your region, and a water hardness breakdown for your area.</p>
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
 </div>
 </div>
 )}
 </div>
 </div>
 </main>
 );
}

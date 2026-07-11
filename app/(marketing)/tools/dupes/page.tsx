"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Share2, Check, ArrowLeft, TrendingDown, Star, Search, X } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { submitLeadAction } from "@/app/(saas)/actions";
import { useGlobalization } from "@/components/GlobalizationContext";

// Define the luxury products and their matching drugstore dupes
const DUPES_DATABASE = [
  // SKINCARE (6 items)
  {
    id: "estee-lauder-anr",
    category: "Skincare",
    luxury: {
      name: "Advanced Night Repair Synchronized Multi-Recovery Complex",
      brand: "Estée Lauder",
      price: 5900,
      size: "30ml",
      actives: "Bifida Ferment Lysate, Tripeptide-32, Hyaluronic Acid",
      rating: 4.6,
    },
    dupe: {
      name: "Minimalist 10% Niacinamide Serum with Zinc",
      brand: "Minimalist",
      price: 599,
      asin: "B0DH88LZ11",
      actives: "Bifida Ferment Lysate, Niacinamide, Zinc PCA",
      description: "Uses a high concentration of Bifida Ferment Lysate combined with Niacinamide to repair skin barrier, soothe irritation, and boost cellular turnover just like the luxury equivalent.",
      image: "/products/Niacinamide-Serum.jpg",
      link: "https://amzn.to/4ceFxl5",
    }
  },
  {
    id: "clinique-moisture-surge",
    category: "Skincare",
    luxury: {
      name: "Moisture Surge 100H Auto-Replenishing Hydrator",
      brand: "Clinique",
      price: 3500,
      size: "50ml",
      actives: "Aloe Bio-ferment, Hyaluronic Acid, Squalane",
      rating: 4.5,
    },
    dupe: {
      name: "Neutrogena Hydro Boost Water Gel Moisturiser",
      brand: "Neutrogena",
      price: 730,
      asin: "B00BQFTQW6",
      actives: "Hyaluronic Acid, Glycerin, Olive Extract",
      description: "A legendary gel-water formula that matches Clinique's weightless hydration drop-for-drop. Delivers instant moisture surge, controls excess sebum, and keeps oily/combination skin bouncy.",
      image: "/products/Neutrogena-Hydro.jpg",
      link: "https://amzn.to/3Qa5pau",
    }
  },
  {
    id: "paulas-choice-bha",
    category: "Skincare",
    luxury: {
      name: "2% BHA Liquid Exfoliant",
      brand: "Paula's Choice",
      price: 2700,
      size: "118ml",
      actives: "2% Salicylic Acid, Green Tea Extract",
      rating: 4.6,
    },
    dupe: {
      name: "The Ordinary Salicylic Acid 2% Solution 30ml",
      brand: "The Ordinary",
      price: 599,
      asin: "B0C3PCJ6SD",
      actives: "Salicylic Acid, Witch Hazel, Citric Acid",
      description: "A highly effective leave-on BHA solution that clears congested pores, reduces acne, and smooths uneven skin texture without paying Paula's Choice's premium price.",
      image: "/products/Ordinary-Salicylic- Acid.jpg",
      link: "https://amzn.to/4sQOxDx",
    }
  },
  {
    id: "skinceuticals-ce-ferulic",
    category: "Skincare",
    luxury: {
      name: "C E Ferulic Combination Antioxidant Treatment",
      brand: "SkinCeuticals",
      price: 14500,
      size: "30ml",
      actives: "15% Pure Vitamin C (L-Ascorbic Acid), 1% Vitamin E, 0.5% Ferulic Acid",
      rating: 4.7,
    },
    dupe: {
      name: "Plum 15% Vitamin C Face Serum",
      brand: "Plum",
      price: 445,
      asin: "B095PRGHDX",
      actives: "15% Ethyl Ascorbic Acid, Vitamin E, Rosehip Oil, Mandarin Peel",
      description: "Matches the clinical concentration of 15% Vitamin C combined with stabilizing antioxidants. Rapidly brightens dark spots, boosts collagen, and protects against UV free radicals.",
      image: "/products/Plum-15.jpg",
      link: "https://amzn.to/4t7YmO1",
    }
  },
  {
    id: "tatcha-water-cream",
    category: "Skincare",
    luxury: {
      name: "The Water Cream Moisturizer",
      brand: "Tatcha",
      price: 6800,
      size: "50ml",
      actives: "Japanese Wild Rose, Hadasei-3 Complex, Leopard Lily",
      rating: 4.6,
    },
    dupe: {
      name: "Dot & Key CICA Calming Skin Renewing Night Gel (60ml)",
      brand: "Dot & Key",
      price: 345,
      asin: "B09HC3QNLG",
      actives: "Cica (Centella), Niacinamide, Green Tea, Hyaluronic Acid",
      description: "An oil-free, water-burst gel moisturizer that delivers lightweight, cooling hydration. Mimics Tatcha's pore-refining and clarifying botanical benefits with soothing Cica and redness-reducing Niacinamide.",
      image: "/products/B09HC3QNLG.JPG",
      link: "https://amzn.to/4fOwj2F",
    }
  },
  {
    id: "drunk-elephant-protini",
    category: "Skincare",
    luxury: {
      name: "Protini Polypeptide Cream",
      brand: "Drunk Elephant",
      price: 6500,
      size: "50ml",
      actives: "Signal Peptides, Growth Factors, Pygmy Waterlily",
      rating: 4.6,
    },
    dupe: {
      name: "Minimalist Multi-Peptide Night Face Serum 30ml",
      brand: "Minimalist",
      price: 629,
      asin: "B08MVD6T8V",
      actives: "Matrixyl 3000, Argireline, Peptides",
      description: "While one is a cream and one is a serum, both deliver a massive dose of signal peptides to boost collagen production, firm the skin, and repair the barrier for anti-aging without the premium markup.",
      image: "/products/Minimalist-Multi-Peptide.jpg",
      link: "https://amzn.to/41R6Jlq",
    }
  },

  // MAKEUP (4 items)
  {
    id: "dior-backstage-foundation",
    category: "Makeup",
    luxury: {
      name: "Backstage Face & Body Foundation",
      brand: "Dior",
      price: 4500,
      size: "50ml",
      actives: "Micro-pigments, Dimethicone, Silica",
      rating: 4.4,
    },
    dupe: {
      name: "Maybelline Fit Me Matte+Poreless Foundation",
      brand: "Maybelline",
      price: 324,
      asin: "B087XFYCDQ",
      actives: "Matte Micro-powders, Dimethicone",
      description: "Matches Dior's lightweight fluid coverage and soft-focus blurring effect. Controls oil and sweat through high Indian humidity and holds beautifully for everyday wear.",
      image: "/products/Maybelline-New.jpg",
      link: "https://amzn.to/4tCP38S",
    }
  },
  {
    id: "nars-creamy-concealer",
    category: "Makeup",
    luxury: {
      name: "Radiant Creamy Concealer",
      brand: "NARS",
      price: 3200,
      size: "6ml",
      actives: "Mineral Tone Balancing Powder, Dimethicone",
      rating: 4.7,
    },
    dupe: {
      name: "Maybelline New York Fit Me Concealer 25 Medium",
      brand: "Maybelline",
      price: 347,
      asin: "B0046VGJJA",
      actives: "Glycerin, Titanium Dioxide, Silica",
      description: "The classic holy-grail drugstore match. Offers medium buildable coverage with a natural satin-matte finish that mimics NARS' radiant creamy texture without creasing under the eyes.",
      image: "/products/product-40.jpg",
      link: "https://www.amazon.in/dp/B0046VGJJA?tag=skinwithtanvi-21",
    }
  },
  {
    id: "mac-matte-lipstick",
    category: "Makeup",
    luxury: {
      name: "Matte Lipstick (Mehr / Nudes)",
      brand: "MAC",
      price: 2200,
      size: "3g",
      actives: "Castor Seed Oil, Silica, Matte Waxes",
      rating: 4.5,
    },
    dupe: {
      name: "Lakme 9 To 5 Primer + Matte Lip Color Blushing Nude",
      brand: "Lakme",
      price: 620,
      asin: "B076PV1SQM",
      actives: "Primer Gel, Matte Pigments, Vitamin E",
      description: "A comfortable, primer-infused matte lipstick that lasts all day. Delivers the exact same soft blushing nude undertone as MAC's famous shades, keeping lips hydrated and smooth.",
      image: "/products/product-43.jpg",
      link: "https://www.amazon.in/dp/B076PV1SQM?tag=skinwithtanvi-21",
    }
  },
  {
    id: "hourglass-caution-mascara",
    category: "Makeup",
    luxury: {
      name: "Caution Extreme Lash Mascara",
      brand: "Hourglass",
      price: 2900,
      size: "9.4g",
      actives: "Lash-lifting polymers, Panthenol",
      rating: 4.4,
    },
    dupe: {
      name: "Maybelline New York Lash Sensational Sky High Mascara",
      brand: "Maybelline",
      price: 479,
      asin: "B08H46YXYH",
      actives: "Bamboo Extract, Extension Fibers",
      description: "Matches the intense length, volume, and lightweight hold of Hourglass' high-end brush. Stays waterproof and smudge-proof through long Indian work days and humid summer afternoons.",
      image: "/products/product-42.jpg",
      link: "https://www.amazon.in/dp/B08H46YXYH?tag=skinwithtanvi-21",
    }
  },

  // HAIR CARE (2 items)
  {
    id: "olaplex-no3-perfector",
    category: "Hair Care",
    luxury: {
      name: "No. 3 Hair Perfector",
      brand: "Olaplex",
      price: 3200,
      size: "100ml",
      actives: "Bis-Aminopropyl Diglycol Dimaleate",
      rating: 4.5,
    },
    dupe: {
      name: "Minimalist Maleic Bond Repair Complex 05% Hair Mask",
      brand: "Minimalist",
      price: 649,
      asin: "B0FWKGNZRJ",
      actives: "5% Maleic Acid, Transglutaminase, Ceramides",
      description: "Uses a patent-pending active bond repair complex designed to mimic Olaplex's disulfide bond rebuilding science. Repairs severe split ends, heat damage, and color treatment lines from within.",
      image: "/products/minimalist-bond-repair.jpg",
      link: "https://www.amazon.in/dp/B0FWKGNZRJ?tag=skinwithtanvi-21",
    }
  },
  {
    id: "olaplex-no4-shampoo",
    category: "Hair Care",
    luxury: {
      name: "No. 4 Bond Maintenance Shampoo",
      brand: "Olaplex",
      price: 3200,
      size: "250ml",
      actives: "Bis-Aminopropyl Diglycol Dimaleate, Mild Surfactants",
      rating: 4.6,
    },
    dupe: {
      name: "TRESemmé Keratin Smooth+ Shampoo 1000ml",
      brand: "TRESemmé",
      price: 634,
      asin: "B07L3ZCJ53",
      actives: "Keratin Protein, Argan Oil, Mild Surfactants",
      description: "Provides salon-grade bond-smoothing and keratin care. Tames frizzy hair flyaways, protects hair fibers, and locks in moisture under harsh Indian tap water.",
      image: "/products/TRESemmé-Keratin.jpg",
      link: "https://amzn.to/3Q6pAWQ",
    }
  },

  // BODY CARE (2 items)
  {
    id: "sol-de-janeiro-bum-bum",
    category: "Body Care",
    luxury: {
      name: "Brazilian Bum Bum Cream",
      brand: "Sol de Janeiro",
      price: 3600,
      size: "150ml",
      actives: "Guaraná Extract (Caffeine), Cupuaçu Butter, Açaí Oil",
      rating: 4.7,
    },
    dupe: {
      name: "Dot & Key Vitamin C + E Super Bright Body Lotion",
      brand: "Dot & Key",
      price: 316,
      asin: "B0CHJTCGS3",
      actives: "Vitamin C, Vitamin E, Niacinamide, Shea Butter",
      description: "A rich, deeply nourishing lotion that brightens uneven skin tone and smooths body texture. Pairs a massive boost of antioxidants with hydrating lipids, offering a sweet tropical fragrance without the luxury price tag.",
      image: "/products/Dot-Key-Vitamin.jpg",
      link: "https://amzn.to/4t7Wq8d",
    }
  },
  {
    id: "laneige-lip-sleeping-mask",
    category: "Body Care",
    luxury: {
      name: "Lip Sleeping Mask Berry",
      brand: "Laneige",
      price: 1450,
      size: "20g",
      actives: "Shea Butter, Berry Fruit Complex, Vitamin C",
      rating: 4.7,
    },
    dupe: {
      name: "Minimalist Vitamin K + Retinal 01% Under Eye Cream",
      brand: "Minimalist",
      price: 474,
      asin: "MINIMALISTK",
      actives: "Shea Butter, Vitamin K, Retinal 0.1%",
      description: "While marketed for eyes, its ultra-rich Shea Butter and Vitamin K base behaves identically on highly dry areas, offering cellular repair and deep occlusive hydration for a fraction of the cost.",
      image: "/products/minimalist-eye.jpg",
      link: "https://amzn.to/42eKwxO",
    }
  }
];

export default function DupeFinderPage() {
  const { formatPrice, getAffiliateUrl, currency } = useGlobalization();
  const amazonLabel = currency === "INR" ? "Amazon.in" : currency === "GBP" ? "Amazon.co.uk" : currency === "EUR" ? "Amazon.de" : currency === "AED" ? "Amazon.ae" : currency === "SAR" ? "Amazon.sa" : "Amazon.com";
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [purchasesPerYear, setPurchasesPerYear] = useState<Record<string, number>>({});
  
  // Search and Category states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Lead capture
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "submitting" | "success">("idle");

  const categories = ["All", "Skincare", "Makeup", "Hair Care", "Body Care"];

  // Filtered list based on search and category tab
  const filteredDatabase = useMemo(() => {
    return DUPES_DATABASE.filter(item => {
      const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
      
      const query = searchQuery.toLowerCase().trim();
      const searchMatch = !query || 
        item.luxury.brand.toLowerCase().includes(query) ||
        item.luxury.name.toLowerCase().includes(query) ||
        item.luxury.actives.toLowerCase().includes(query) ||
        item.dupe.brand.toLowerCase().includes(query) ||
        item.dupe.name.toLowerCase().includes(query) ||
        item.dupe.actives.toLowerCase().includes(query);
        
      return categoryMatch && searchMatch;
    });
  }, [searchQuery, selectedCategory]);

  // Compute counts for badges dynamically under active search query
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: DUPES_DATABASE.length };
    
    categories.forEach(cat => {
      if (cat !== "All") counts[cat] = 0;
    });
    
    DUPES_DATABASE.forEach(item => {
      const query = searchQuery.toLowerCase().trim();
      const searchMatch = !query || 
        item.luxury.brand.toLowerCase().includes(query) ||
        item.luxury.name.toLowerCase().includes(query) ||
        item.luxury.actives.toLowerCase().includes(query) ||
        item.dupe.brand.toLowerCase().includes(query) ||
        item.dupe.name.toLowerCase().includes(query) ||
        item.dupe.actives.toLowerCase().includes(query);
        
      if (searchMatch) {
        if (counts[item.category] !== undefined) {
          counts[item.category]++;
        }
      }
    });

    // If search is active, recalculate "All" matches count
    if (searchQuery) {
      let totalMatch = 0;
      categories.forEach(cat => {
        if (cat !== "All") {
          totalMatch += counts[cat];
        }
      });
      counts["All"] = totalMatch;
    }
    
    return counts;
  }, [searchQuery]);

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter(item => item !== id);
      } else {
        if (!purchasesPerYear[id]) {
          setPurchasesPerYear(counts => ({ ...counts, [id]: 2 }));
        }
        return [...prev, id];
      }
    });
  };

  const handleCountChange = (id: string, count: number) => {
    setPurchasesPerYear(prev => ({
      ...prev,
      [id]: Math.max(1, count)
    }));
  };

  // Math calculations based on ALL selected items (even if filtered out)
  const math = useMemo(() => {
    let luxuryTotal = 0;
    let dupeTotal = 0;

    selectedItems.forEach(id => {
      const item = DUPES_DATABASE.find(d => d.id === id);
      if (item) {
        const count = purchasesPerYear[id] || 2;
        luxuryTotal += item.luxury.price * count;
        dupeTotal += item.dupe.price * count;
      }
    });

    const savings = luxuryTotal - dupeTotal;
    const percentage = luxuryTotal > 0 ? Math.round((savings / luxuryTotal) * 100) : 0;

    return {
      luxuryTotal,
      dupeTotal,
      savings,
      percentage
    };
  }, [selectedItems, purchasesPerYear]);

  const handleShareWhatsApp = () => {
    const text = `I just used the Skincare Dupe Finder & calculated that swapping luxury items for drugstore dupes will save me ${formatPrice(math.savings)}/year! Find your dupes here:`;
    const url = "https://mirhaandco.com/tools/dupes";
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailStatus("submitting");
    const leadData = {
      savings: math.savings,
      percentage: math.percentage,
      luxuryTotal: math.luxuryTotal,
      dupeTotal: math.dupeTotal,
    };
    
    try {
      const leads = JSON.parse(localStorage.getItem("dupe_leads") || "[]");
      if (!leads.includes(email)) {
        leads.push({ email, ...leadData, date: new Date().toISOString() });
        localStorage.setItem("dupe_leads", JSON.stringify(leads));
      }
    } catch (err) {
      console.error(err);
    }

    try {
      await submitLeadAction(email, "dupe", JSON.stringify(leadData));
    } catch (err) {
      console.error("Non-blocking server-side lead submit failed:", err);
    }
    
    setEmailStatus("success");
  };

  return (
    <main className="dupe-finder-page">
      <style>{`
        .dupe-finder-page {
          background: #fbf7f1;
          color: #161412;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          padding: 48px 20px 120px;
        }
        .shell {
          max-width: 1160px;
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
        }
        .back-link:hover {
          color: #fc2779;
        }
        .header {
          margin-bottom: 48px;
          text-align: center;
        }
        .header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 400;
          line-height: 1.1;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
        }
        .header p {
          color: #756b63;
          font-size: 1.05rem;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(252, 39, 121, 0.08);
          color: #fc2779;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 99px;
          margin-bottom: 20px;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .grid-layout {
            grid-template-columns: 1fr;
          }
          .calculator-sidebar {
            display: none !important;
          }
          .mobile-savings-bar {
            display: flex !important;
          }
        }
        .search-container {
          margin-bottom: 16px;
          position: relative;
        }
        .search-input {
          width: 100%;
          padding: 14px 44px 14px 44px;
          border: 1.5px solid #ede5dc;
          border-radius: 14px;
          background: #fff;
          color: #161412;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: all 0.2s ease;
        }
        .search-input:focus {
          border-color: #fc2779;
          box-shadow: 0 4px 12px rgba(252, 39, 121, 0.05);
        }
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #8c8179;
          pointer-events: none;
        }
        .clear-search-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #8c8179;
          cursor: pointer;
          font-size: 0.85rem;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .clear-search-btn:hover {
          color: #fc2779;
        }
        .category-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .category-pill {
          background: #fff;
          border: 1.5px solid #ede5dc;
          color: #756b63;
          padding: 8px 16px;
          border-radius: 99px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .category-pill:hover {
          border-color: #fc2779;
          color: #fc2779;
        }
        .category-pill.active {
          background: #fc2779;
          border-color: #fc2779;
          color: #fff;
        }
        .category-count {
          background: rgba(117, 107, 99, 0.1);
          padding: 2px 6px;
          border-radius: 99px;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .category-pill.active .category-count {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
        }
        .luxury-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .list-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8c8179;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #ede5dc;
        }
        .luxury-card {
          background: #fff;
          border: 1.5px solid #ede5dc;
          border-radius: 18px;
          padding: 18px 20px;
          cursor: pointer;
          transition: all 0.18s ease;
          display: grid;
          grid-template-columns: 24px 1fr auto;
          align-items: center;
          gap: 14px;
        }
        .luxury-card:hover {
          border-color: #fc2779;
          box-shadow: 0 6px 20px rgba(252, 39, 121, 0.06);
          transform: translateY(-1px);
        }
        .luxury-card.selected {
          border-color: #fc2779;
          background: #fffaf8;
          box-shadow: 0 6px 20px rgba(252, 39, 121, 0.08);
        }
        .luxury-details {
          min-width: 0;
        }
        .luxury-brand {
          font-size: 0.68rem;
          color: #fc2779;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .luxury-name {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 5px;
          line-height: 1.35;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 640px) {
          .luxury-name { font-size: 0.95rem; white-space: normal; }
        }
        .luxury-meta {
          font-size: 0.75rem;
          color: #a89c92;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .luxury-price {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          color: #161412;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .checkbox {
          width: 22px;
          height: 22px;
          min-width: 22px;
          border: 2px solid #d8cdc3;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          transition: all 0.18s;
        }
        .luxury-card.selected .checkbox {
          background: #fc2779;
          border-color: #fc2779;
          color: #fff;
        }
        .calculator-sidebar {
          background: #fff;
          border: 1.5px solid #ede5dc;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 16px 48px rgba(38, 28, 20, 0.06);
          position: sticky;
          top: 100px;
        }
        .mobile-savings-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
          border-top: 1px solid #ede5dc;
          padding: 14px 20px;
          z-index: 50;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 -8px 24px rgba(0,0,0,0.08);
        }
        .mobile-savings-label {
          font-size: 0.75rem;
          color: #8c8179;
          font-weight: 600;
        }
        .mobile-savings-amount {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          color: #fc2779;
          line-height: 1;
        }
        .mobile-savings-pct {
          font-size: 0.75rem;
          color: #2d8a5c;
          font-weight: 700;
        }
        .calc-header {
          border-bottom: 1px solid #f6f4f2;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .calc-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 4px;
        }
        .savings-stat {
          text-align: center;
          background: #fff0e8;
          border: 1px dashed rgba(252, 39, 121, 0.3);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .savings-amt {
          font-family: 'DM Serif Display', serif;
          font-size: 44px;
          color: #fc2779;
          line-height: 1.1;
          margin-top: 6px;
        }
        .savings-pct {
          font-size: 0.85rem;
          font-weight: 700;
          color: #2d8a5c;
          margin-top: 4px;
        }
        .calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 12px;
        }
        .calc-row.total {
          border-top: 1px solid #f6f4f2;
          padding-top: 16px;
          font-weight: 700;
          font-size: 1.05rem;
        }
        .comparison-section {
          margin-top: 48px;
        }
        .dupe-comparison-card {
          background: #fff;
          border: 1.5px solid #ede5dc;
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 16px;
          box-shadow: 0 4px 18px rgba(38, 28, 20, 0.03);
        }
        .comparison-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 400;
          margin-bottom: 20px;
          margin-top: 52px;
        }
        .comparison-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid #f6f4f2;
          flex-wrap: wrap;
          gap: 10px;
        }
        .comparison-label {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          color: #fc2779;
        }
        .purchases-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #756b63;
        }
        .purchases-selector input {
          width: 52px;
          border: 1px solid #d8cdc3;
          border-radius: 6px;
          padding: 5px 8px;
          text-align: center;
          outline: none;
          font-size: 0.9rem;
        }
        .split-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        @media (max-width: 600px) {
          .split-row { grid-template-columns: 1fr; gap: 0; }
          .split-col.luxury-side { border-right: 0; border-bottom: 1px solid #f0ebe4; padding-right: 0; padding-bottom: 20px; margin-bottom: 20px; }
        }
        .split-col { display: flex; flex-direction: column; }
        .split-col.luxury-side { opacity: 0.7; border-right: 1px solid #f0ebe4; padding-right: 24px; }
        .col-header { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: #8c8179; margin-bottom: 8px; font-weight: 700; }
        .split-price { font-family: 'DM Serif Display', serif; font-size: 1.6rem; margin-top: 10px; }
        .actives-label { font-size: 0.75rem; font-weight: 700; margin-top: 12px; color: #161412; }
        .actives-list { font-size: 0.8rem; color: #756b63; line-height: 1.5; margin-top: 3px; }
        .shop-dupe-btn {
          background: #161412;
          color: #fff;
          border-radius: 10px;
          padding: 11px 18px;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          margin-top: 16px;
          transition: background 0.15s;
        }
        .shop-dupe-btn:hover {
          background: #2b2826;
        }
        .next-btn {
          background: #fc2779;
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 14px 28px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .next-btn:hover {
          background: #e0226c;
          transform: translateY(-1px);
        }
        @media (max-width: 480px) {
          .dupe-finder-page { padding: 36px 16px 140px; }
          .calculator-sidebar { display: none; }
          .mobile-savings-bar { display: flex; }
        }
        .dupe-lead-panel {
          background: #0c0a09;
          border-radius: 16px;
          padding: 24px;
          margin-top: 20px;
          text-align: center;
        }
        .dupe-lead-panel h4 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          font-weight: 400;
          color: #fff;
          margin: 0 0 6px;
        }
        .dupe-lead-panel p {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
          margin: 0 0 16px;
          line-height: 1.5;
        }
        .dupe-lead-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dupe-lead-form input {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 11px 14px;
          color: #fff;
          font-size: 0.85rem;
          outline: none;
        }
        .dupe-lead-form input:focus {
          border-color: #fc2779;
        }
        .dupe-lead-form button {
          background: #fc2779;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 11px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dupe-lead-form button:hover {
          background: #e0226c;
        }
        .dupe-lead-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(45, 138, 92, 0.12);
          color: #2d8a5c;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
        }
      `}</style>

      <div className="shell">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="header">
          <div className="header-badge">
            <Star size={12} /> Free Worldwide Tool — No Sign Up Required
          </div>
          <h1>Global Beauty Dupe Finder &amp; Savings Calculator</h1>
          <p>
            Stop overpaying for marketing. Match luxury products (Estée Lauder, Drunk Elephant, Olaplex, MAC) with science-equivalent drugstore dupes — and see exactly how much you save yearly, in your local currency.
          </p>
        </div>

        <div className="grid-layout">
          <div>
            {/* Search Input Container */}
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                className="search-input"
                placeholder="Search luxury brands, products, or actives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Pills Filtering */}
            <div className="category-pills">
              {categories.map(cat => {
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                    <span className="category-count">{count}</span>
                  </button>
                );
              })}
            </div>

            <p className="list-label">Select the luxury products you use</p>

            {filteredDatabase.length > 0 ? (
              <div className="luxury-list">
                {filteredDatabase.map(item => {
                  const isSelected = selectedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`luxury-card ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleSelect(item.id)}
                    >
                      <div className="checkbox">
                        {isSelected && <Check size={13} />}
                      </div>
                      <div className="luxury-details">
                        <div className="luxury-brand">{item.luxury.brand}</div>
                        <h3 className="luxury-name">{item.luxury.name}</h3>
                        <div className="luxury-meta">
                          <span style={{ color: "#fc2779", fontWeight: 600 }}>{item.category.toUpperCase()}</span>
                          <span>·</span>
                          <span>{item.luxury.size}</span>
                          <span>·</span>
                          <span style={{ fontStyle: "italic" }}>Actives: {item.luxury.actives.split(",")[0]}…</span>
                        </div>
                      </div>
                      <div className="luxury-price">{formatPrice(item.luxury.price)}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "48px 24px", color: "#8c8179", background: "#fff", border: "1.5px dashed #ede5dc", borderRadius: "18px" }}>
                <TrendingDown size={36} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#161412", marginBottom: "4px" }}>No Matches Found</h4>
                <p style={{ fontSize: "0.9rem", margin: "0 0 16px", lineHeight: 1.5 }}>We couldn't find any luxury products matching "{searchQuery}" under "{selectedCategory}".</p>
                <button
                  type="button"
                  className="next-btn"
                  style={{ padding: "8px 16px", fontSize: "0.85rem", background: "#fc2779", color: "#fff", margin: "0 auto" }}
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear Filters &amp; Search
                </button>
              </div>
            )}
          </div>

          <div>
            <div className="calculator-sidebar">
              <div className="calc-header">
                <h3 className="calc-title">Savings Summary</h3>
                <p style={{ fontSize: "0.8rem", color: "#8c8179", margin: 0 }}>Based on your selections</p>
              </div>

              {selectedItems.length > 0 ? (
                <div>
                  <div className="savings-stat">
                    <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#756b63" }}>Estimated Annual Savings</span>
                    <div className="savings-amt">{formatPrice(math.savings)}</div>
                    <div className="savings-pct">Save {math.percentage}% on this routine</div>
                  </div>

                  <div className="calc-row">
                    <span>Luxury Total (Annual):</span>
                    <span>{formatPrice(math.luxuryTotal)}</span>
                  </div>
                  <div className="calc-row">
                    <span>Dupe Total (Annual):</span>
                    <span>{formatPrice(math.dupeTotal)}</span>
                  </div>
                  <div className="calc-row total">
                    <span>Net Annual Savings:</span>
                    <span style={{ color: "#fc2779" }}>{formatPrice(math.savings)}</span>
                  </div>

                  <button
                    onClick={handleShareWhatsApp}
                    className="next-btn"
                    style={{ background: "#25d366", color: "#fff", display: "flex", gap: "8px", justifyContent: "center", width: "100%", padding: "14px", marginTop: "20px" }}
                  >
                    <Share2 size={16} /> Share Savings on WhatsApp
                  </button>

                  {/* Lead Capture */}
                  <div className="dupe-lead-panel">
                    <h4>Email Your Savings Report</h4>
                    <p>Get your personalized dupes catalog and savings breakdown sent to your inbox.</p>
                    {emailStatus === "success" ? (
                      <div className="dupe-lead-success">
                        <Check size={14} /> Check your inbox!
                      </div>
                    ) : (
                      <form onSubmit={handleEmailSubmit} className="dupe-lead-form">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <button type="submit" disabled={emailStatus === "submitting"}>
                          {emailStatus === "submitting" ? "Sending..." : "Send My Report"}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0", color: "#8c8179" }}>
                  <TrendingDown size={36} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                  <p style={{ fontSize: "0.9rem", margin: 0, lineHeight: 1.5 }}>Select at least one luxury product on the left to see comparisons and estimate your annual savings.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile sticky savings bar */}
        <div className="mobile-savings-bar">
          <div>
            <div className="mobile-savings-label">Annual Savings</div>
            <div className="mobile-savings-amount">{formatPrice(math.savings)}</div>
            {math.percentage > 0 && <div className="mobile-savings-pct">Save {math.percentage}%</div>}
          </div>
          {math.savings > 0 && (
            <button
              onClick={handleShareWhatsApp}
              style={{ background: "#25d366", color: "#fff", border: "none", borderRadius: "12px", padding: "12px 20px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
            >
              <Share2 size={15} /> Share
            </button>
          )}
        </div>

        {/* Mobile lead capture (visible when sidebar hidden) */}
        {selectedItems.length > 0 && math.savings > 0 && (
          <div className="dupe-lead-panel" style={{ marginTop: "24px" }}>
            <h4>Email Your Savings Report</h4>
            <p>Get your personalized dupes catalog and savings breakdown sent to your inbox.</p>
            {emailStatus === "success" ? (
              <div className="dupe-lead-success">
                <Check size={14} /> Check your inbox!
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="dupe-lead-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={emailStatus === "submitting"}>
                  {emailStatus === "submitting" ? "Sending..." : "Send My Report"}
                </button>
              </form>
            )}
          </div>
        )}

        {selectedItems.length > 0 && (
          <div className="comparison-section">
            <h2 className="comparison-title">Formula Compatibility &amp; Science Breakdown</h2>
            
            {selectedItems.map(id => {
              const item = DUPES_DATABASE.find(d => d.id === id);
              if (!item) return null;
              const matchingProduct = PRODUCTS.find(p => p.asin === item.dupe.asin);
              const affiliateUrl = getAffiliateUrl(item.dupe.asin, item.dupe.name, item.dupe.brand, matchingProduct?.link || item.dupe.link);

              const count = purchasesPerYear[id] || 2;
              const savings = (item.luxury.price - item.dupe.price) * count;

              return (
                <div key={item.id} className="dupe-comparison-card">
                  <div className="comparison-header">
                    <span className="comparison-label">{item.category} Equivalency Profile</span>
                    <div className="purchases-selector">
                      <span>Purchases per year:</span>
                      <input
                        type="number"
                        min="1"
                        value={count}
                        onChange={(e) => handleCountChange(item.id, parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>

                  <div className="split-row">
                    <div className="split-col luxury-side">
                      <span className="col-header">High-End Luxury</span>
                      <span style={{ fontSize: "0.8rem", color: "#fc2779", fontWeight: 700 }}>{item.luxury.brand}</span>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 600, margin: "2px 0 6px" }}>{item.luxury.name}</h4>
                      <span className="actives-label">Key Actives:</span>
                      <p className="actives-list">{item.luxury.actives}</p>
                      <div className="split-price">{formatPrice(item.luxury.price)}</div>
                    </div>

                    <div className="split-col">
                      <span className="col-header" style={{ color: "#2d8a5c", display: "flex", alignItems: "center", gap: "4px" }}>
                        Active Dupe Match <Check size={12} />
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "#756b63", fontWeight: 700 }}>{item.dupe.brand}</span>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 600, margin: "2px 0 6px" }}>{item.dupe.name}</h4>
                      <p style={{ fontSize: "0.82rem", color: "#756b63", lineHeight: 1.5, margin: "8px 0" }}>
                        {item.dupe.description}
                      </p>
                      <span className="actives-label">Dupe Actives:</span>
                      <p className="actives-list">{item.dupe.actives}</p>
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "auto" }}>
                        <div className="split-price" style={{ color: "#2d8a5c" }}>{formatPrice(item.dupe.price)}</div>
                        <span style={{ fontSize: "0.78rem", color: "#2d8a5c", fontWeight: 600 }}>Save {formatPrice(savings)}/yr</span>
                      </div>

                      <a href={affiliateUrl} target="_blank" rel="noopener noreferrer" className="shop-dupe-btn">
                        Shop Dupe on {amazonLabel} <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

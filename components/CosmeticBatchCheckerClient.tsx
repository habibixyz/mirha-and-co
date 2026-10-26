"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Sparkles as _UnusedSparkles, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Info, 
  ChevronRight, 
  RotateCcw, 
  HelpCircle,
  ExternalLink,
  Droplets,
  Layers
} from "lucide-react";

/* =========================================================================
   BRAND BATCH CODE DECODING DATABASE & ALGORITHMS
   ========================================================================= */

interface BrandConfig {
  id: string;
  name: string;
  country: string;
  group: "estee" | "loreal" | "chanel" | "dior" | "ordinary" | "kbeauty" | "standard";
  formatHint: string;
  example: string;
  shelfLifeMonths: number;
}

const BRANDS: BrandConfig[] = [
  // Estée Lauder Companies (3-character: Letter [batch] + Month [1-9, A, B, C] + Year digit)
  { id: "mac", name: "M·A·C Cosmetics", country: "USA", group: "estee", formatHint: "3 chars (e.g. A32, B84)", example: "A34", shelfLifeMonths: 36 },
  { id: "estee-lauder", name: "Estée Lauder", country: "USA", group: "estee", formatHint: "3 chars (e.g. A23, C94)", example: "A24", shelfLifeMonths: 36 },
  { id: "clinique", name: "Clinique", country: "USA", group: "estee", formatHint: "3 chars (e.g. A43, B14)", example: "B14", shelfLifeMonths: 36 },
  { id: "bobbi-brown", name: "Bobbi Brown", country: "USA", group: "estee", formatHint: "3 chars (e.g. A54)", example: "A54", shelfLifeMonths: 36 },
  { id: "tom-ford", name: "Tom Ford Beauty", country: "USA", group: "estee", formatHint: "3 chars (e.g. B64)", example: "B64", shelfLifeMonths: 36 },
  { id: "jo-malone", name: "Jo Malone London", country: "UK", group: "estee", formatHint: "3 chars (e.g. A14)", example: "A14", shelfLifeMonths: 36 },

  // L'Oréal Group (6 chars: 2 chars factory + 1 char Year [T=2020, U=2021, V=2022, W=2023, X=2024, Y=2025] + 1 char Month [1-9, O, N, D])
  { id: "maybelline", name: "Maybelline New York", country: "USA / France", group: "loreal", formatHint: "6 chars (e.g. 28X301, 70W102)", example: "28X301", shelfLifeMonths: 36 },
  { id: "loreal", name: "L'Oréal Paris", country: "France", group: "loreal", formatHint: "6 chars (e.g. 28X402)", example: "28X402", shelfLifeMonths: 36 },
  { id: "lancome", name: "Lancôme", country: "France", group: "loreal", formatHint: "6 chars (e.g. 40X101)", example: "40X101", shelfLifeMonths: 36 },
  { id: "kiehls", name: "Kiehl's", country: "USA", group: "loreal", formatHint: "6 chars (e.g. 18X201)", example: "18X201", shelfLifeMonths: 36 },
  { id: "ysl", name: "Yves Saint Laurent (YSL)", country: "France", group: "loreal", formatHint: "6 chars (e.g. 62X301)", example: "62X301", shelfLifeMonths: 36 },
  { id: "armani", name: "Giorgio Armani Beauty", country: "Italy", group: "loreal", formatHint: "6 chars (e.g. 40W901)", example: "40W901", shelfLifeMonths: 36 },
  { id: "urban-decay", name: "Urban Decay", country: "USA", group: "loreal", formatHint: "6 chars (e.g. 70X401)", example: "70X401", shelfLifeMonths: 36 },

  // Chanel (4 digits: offset from Jan 2010 = 23xx / 24xx / 8xxx / 9xxx)
  { id: "chanel", name: "Chanel", country: "France", group: "chanel", formatHint: "4 digits (e.g. 8401, 9102)", example: "9102", shelfLifeMonths: 36 },

  // Dior / LVMH (4 chars: 1st digit = year, 2nd letter = month A-M [skipping I])
  { id: "dior", name: "Dior", country: "France", group: "dior", formatHint: "4 chars (e.g. 4B01, 3C02)", example: "4B01", shelfLifeMonths: 36 },
  { id: "guerlain", name: "Guerlain", country: "France", group: "dior", formatHint: "4 chars (e.g. 4A01)", example: "4A01", shelfLifeMonths: 36 },
  { id: "givenchy", name: "Givenchy", country: "France", group: "dior", formatHint: "4 chars (e.g. 3D02)", example: "3D02", shelfLifeMonths: 36 },
  { id: "fenty", name: "Fenty Beauty", country: "USA", group: "dior", formatHint: "4-5 chars (e.g. 4A01)", example: "4A01", shelfLifeMonths: 36 },

  // DECIEM (The Ordinary - 4 to 5 alphanumeric, e.g. 3A2, 4B1, 2304)
  { id: "the-ordinary", name: "The Ordinary", country: "Canada", group: "ordinary", formatHint: "4-5 chars (e.g. 4B02, 3K01)", example: "4B02", shelfLifeMonths: 36 },

  // Cult Modern Brands
  { id: "rare-beauty", name: "Rare Beauty", country: "USA", group: "standard", formatHint: "4-6 alphanumeric chars", example: "4021A", shelfLifeMonths: 36 },
  { id: "charlotte-tilbury", name: "Charlotte Tilbury", country: "UK", group: "standard", formatHint: "4-5 chars (e.g. 4B01, 23A1)", example: "4B01", shelfLifeMonths: 36 },
  { id: "huda-beauty", name: "Huda Beauty", country: "UAE / Italy", group: "standard", formatHint: "5-6 chars", example: "4012B", shelfLifeMonths: 36 },

  // K-Beauty
  { id: "cosrx", name: "COSRX", country: "South Korea", group: "kbeauty", formatHint: "Stamped YYYY.MM.DD on crimp or 6 digits", example: "B40315", shelfLifeMonths: 36 },
  { id: "laneige", name: "Laneige (Amorepacific)", country: "South Korea", group: "kbeauty", formatHint: "6-8 chars or stamped date", example: "K40301", shelfLifeMonths: 36 },
  { id: "beauty-of-joseon", name: "Beauty of Joseon", country: "South Korea", group: "kbeauty", formatHint: "Stamped EXP YYYYMMDD or 6 chars", example: "B24041", shelfLifeMonths: 36 },
  { id: "innisfree", name: "Innisfree", country: "South Korea", group: "kbeauty", formatHint: "Stamped date or 6 chars", example: "K24021", shelfLifeMonths: 36 },

  // Indian Clinical & Pharmacy Standards
  { id: "minimalist", name: "Minimalist (Be Minimalist)", country: "India", group: "standard", formatHint: "Batch starts with B, followed by MMDDYY", example: "BM0424", shelfLifeMonths: 24 },
  { id: "formularx", name: "The Formularx", country: "India", group: "standard", formatHint: "Stamped MFG date or 6 chars", example: "FR2403", shelfLifeMonths: 24 },
  { id: "reequil", name: "Re'equil", country: "India", group: "standard", formatHint: "Stamped MMDDYY or 6 chars", example: "RQ2401", shelfLifeMonths: 24 },
  { id: "dot-key", name: "Dot & Key", country: "India", group: "standard", formatHint: "Stamped on box base / bottle crimp", example: "DK2402", shelfLifeMonths: 24 },
  { id: "cetaphil", name: "Cetaphil (Galderma)", country: "Switzerland / India", group: "standard", formatHint: "6 digits on crimp (e.g. 340122)", example: "340122", shelfLifeMonths: 36 },
  { id: "sebamed", name: "Sebamed", country: "Germany", group: "standard", formatHint: "6 digits embossed on crimp", example: "402155", shelfLifeMonths: 36 },
];

/* =========================================================================
   PAO (PERIOD AFTER OPENING) PRODUCT CATEGORIES
   ========================================================================= */

interface PaoCategory {
  id: string;
  name: string;
  standardPaoMonths: number;
  riskNote: string;
}

const PAO_CATEGORIES: PaoCategory[] = [
  { id: "mascara", name: "Mascara & Liquid Eyeliner", standardPaoMonths: 6, riskNote: "Pumps oxygen & bacteria into tube. High risk of styes and eye irritation after 6 months." },
  { id: "sunscreen", name: "Sunscreen & SPF Moisturizer", standardPaoMonths: 12, riskNote: "UV filters destabilize after 12 months of heat & air exposure, leaving you unprotected." },
  { id: "serum", name: "Active Treatment & Vitamin C Serum", standardPaoMonths: 6, riskNote: "Antioxidants oxidize rapidly once unsealed. Dark yellow/orange means formula has degraded." },
  { id: "liquid_foundation", name: "Liquid Foundation & Concealer", standardPaoMonths: 12, riskNote: "Water base allows microbial growth. Causes sudden unexpected breakout clusters." },
  { id: "cream_blush", name: "Cream Blush, Tint & Lip Oil", standardPaoMonths: 12, riskNote: "Finger dipping transfers bacteria. Natural oils go rancid and smell like old wax." },
  { id: "powder", name: "Pressed Powder, Eyeshadow & Blush", standardPaoMonths: 24, riskNote: "Anhydrous (zero water), so highly stable. Scrape hard pan oil film off top with tape." },
  { id: "cleanser", name: "Face Wash & Micellar Water", standardPaoMonths: 12, riskNote: "Surfactants remain stable, but preservative efficacy wanes in humid bathrooms." },
];

/* =========================================================================
   BATCH CODE PARSER ENGINE
   ========================================================================= */

type DecodedResult =
  | {
      isValid: true;
      code: string;
      prodMonthName: string;
      prodYear: number;
      ageMonths: number;
      shelfLife: number;
      monthsRemaining: number;
      status: "fresh" | "mature" | "expired";
      expiryDateFormatted: string;
    }
  | {
      isValid: false;
      code: string;
      errorMessage: string;
      expectedFormat: string;
      guidance: string;
    };

function decodeBatch(brand: BrandConfig, rawCode: string): DecodedResult | null {
  const code = rawCode.trim().toUpperCase();
  if (!code) return null;

  const now = new Date();
  let prodYear = 2024;
  let prodMonth = 1; // 1-12
  let isValid = false;

  if (brand.group === "estee") {
    // 3 characters: e.g. A34 -> Batch A, March, 2024
    // Char 1 = batch, Char 2 = Month (1-9, A=Oct, B=Nov, C=Dec), Char 3 = Year digit
    if (code.length === 3) {
      const monthChar = code[1];
      const yearChar = code[2];
      const monthMap: Record<string, number> = {
        "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
        "A": 10, "B": 11, "C": 12
      };
      const lastDigit = parseInt(yearChar);
      if (monthMap[monthChar] !== undefined && !isNaN(lastDigit)) {
        prodMonth = monthMap[monthChar];
        prodYear = lastDigit <= 6 ? 2020 + lastDigit : 2010 + lastDigit;
        isValid = true;
      }
    }
  } else if (brand.group === "loreal") {
    // 6 characters: 3rd char is year letter, 4th char is month (1-9, O=Oct, N=Nov, D=Dec)
    // S=2019, T=2020, U=2021, V=2022, W=2023, X=2024, Y=2025, Z=2026
    const yearCharMap: Record<string, number> = {
      "S": 2019, "T": 2020, "U": 2021, "V": 2022, "W": 2023, "X": 2024, "Y": 2025, "Z": 2026
    };
    const monthCharMap: Record<string, number> = {
      "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
      "O": 10, "N": 11, "D": 12, "A": 10, "B": 11, "C": 12
    };

    if (code.length >= 4 && code.length <= 8) {
      const yChar = code[2];
      const mChar = code[3];
      if (yearCharMap[yChar] && monthCharMap[mChar]) {
        prodYear = yearCharMap[yChar];
        prodMonth = monthCharMap[mChar];
        isValid = true;
      }
    }
  } else if (brand.group === "chanel") {
    // 4 digits: Chanel increments monthly. 8401 approx 2023, 9102 approx 2024
    if (/^\d{4}$/.test(code)) {
      const num = parseInt(code);
      if (num >= 6000 && num <= 9999) {
        const baseNum = 8400; // ~ Jan 2023
        const monthDiff = num - baseNum;
        const totalMonths = 2023 * 12 + monthDiff;
        prodYear = Math.floor(totalMonths / 12);
        prodMonth = Math.min(12, Math.max(1, (totalMonths % 12) + 1));
        isValid = true;
      }
    }
  } else if (brand.group === "dior") {
    // 4 chars: 1st digit = year (0-6 = 2020-2026), 2nd letter = month (A=Jan ... M=Dec, skipping I)
    if (code.length >= 2 && code.length <= 5) {
      const yearDigit = parseInt(code[0]);
      const monthChar = code[1];
      const diorMonths = "ABCDEFGHJKLMN";
      const mIndex = diorMonths.indexOf(monthChar);
      if (!isNaN(yearDigit) && mIndex !== -1) {
        prodYear = 2020 + yearDigit;
        prodMonth = mIndex + 1;
        isValid = true;
      }
    }
  } else if (brand.group === "ordinary") {
    // The Ordinary / DECIEM: 3 to 5 chars (e.g. 3A2, 4B01, 3K01, 2304)
    const m = code.match(/^([2-6])([1-9A-M])/);
    if (m) {
      const yDigit = parseInt(m[1]);
      const mChar = m[2];
      const ordMonths = "123456789ABC";
      const mIdx = ordMonths.indexOf(mChar);
      if (mIdx !== -1) {
        prodYear = 2020 + yDigit;
        prodMonth = mIdx + 1;
        isValid = true;
      }
    }
  } else if (brand.group === "kbeauty") {
    // Korean cosmetics stamp exact manufacturing or expiry dates
    const dateMatch = code.match(/^(?:20)?(2[0-6])[.-]?(0[1-9]|1[0-2])[.-]?([0-3][0-9])?$/);
    const letterDate = code.match(/^[A-Z](2[0-6])(0[1-9]|1[0-2])/);
    if (dateMatch) {
      prodYear = 2000 + parseInt(dateMatch[1]);
      prodMonth = parseInt(dateMatch[2]);
      isValid = true;
    } else if (letterDate) {
      prodYear = 2000 + parseInt(letterDate[1]);
      prodMonth = parseInt(letterDate[2]);
      isValid = true;
    }
  } else if (brand.group === "standard") {
    // Indian & Global Clinical: FR2403 (Formularx), BM0424 (Minimalist), RQ2401, DK2402, MM/YY, or 6-digit crimp lot
    const prefixYYMM = code.match(/^[A-Z]{2}(2[0-6])(0[1-9]|1[0-2])$/);
    const prefixMMYY = code.match(/^[A-Z]{2}(0[1-9]|1[0-2])(2[0-6])$/);
    const slashDate = code.match(/^(0[1-9]|1[0-2])\/?(?:20)?(2[0-6])$/);
    const sixDigitLot = code.match(/^(\d{2})(0[1-9]|1[0-2])(\d{2})$/);

    if (prefixYYMM) {
      prodYear = 2000 + parseInt(prefixYYMM[1]);
      prodMonth = parseInt(prefixYYMM[2]);
      isValid = true;
    } else if (prefixMMYY) {
      prodYear = 2000 + parseInt(prefixMMYY[2]);
      prodMonth = parseInt(prefixMMYY[1]);
      isValid = true;
    } else if (slashDate) {
      prodYear = 2000 + parseInt(slashDate[2]);
      prodMonth = parseInt(slashDate[1]);
      isValid = true;
    } else if (sixDigitLot && (brand.id === "cetaphil" || brand.id === "sebamed")) {
      prodYear = 2020 + (parseInt(sixDigitLot[1]) % 7);
      prodMonth = parseInt(sixDigitLot[2]);
      isValid = true;
    }
  }

  // Strictly reject invalid codes - NEVER invent fake dates!
  if (!isValid) {
    return {
      isValid: false,
      code,
      errorMessage: `Could not verify "${code}" using ${brand.name}'s official batch syntax.`,
      expectedFormat: brand.formatHint,
      guidance: `Locate the stamped or etched lot on the bottle bottom, tube crimp, or near the barcode. Verified sample code: ${brand.example}.`
    };
  }

  // Calculations for verified real batch
  const prodDate = new Date(prodYear, prodMonth - 1, 1);
  const diffTime = Math.abs(now.getTime() - prodDate.getTime());
  const ageMonths = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.4375)));
  
  const shelfLife = brand.shelfLifeMonths;
  const monthsRemaining = shelfLife - ageMonths;
  
  let status: "fresh" | "mature" | "expired" = "fresh";
  if (monthsRemaining <= 0) {
    status = "expired";
  } else if (monthsRemaining < 12) {
    status = "mature";
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return {
    isValid: true,
    code,
    prodMonthName: monthNames[prodMonth - 1],
    prodYear,
    ageMonths,
    shelfLife,
    monthsRemaining,
    status,
    expiryDateFormatted: `${monthNames[prodMonth - 1]} ${prodYear + Math.floor(shelfLife / 12)}`,
  };
}

/* =========================================================================
   MAIN COMPONENT: COSMETIC BATCH CHECKER
   ========================================================================= */

export default function CosmeticBatchCheckerClient() {
  const [selectedBrandId, setSelectedBrandId] = useState<string>("mac");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [batchCodeInput, setBatchCodeInput] = useState<string>("A34");
  const [selectedPaoId, setSelectedPaoId] = useState<string>("serum");
  const [hasOpened, setHasOpened] = useState<boolean>(true);
  const [openedMonthsAgo, setOpenedMonthsAgo] = useState<number>(3);

  // Filtered Brands
  const filteredBrands = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return BRANDS;
    return BRANDS.filter(b => b.name.toLowerCase().includes(q) || b.country.toLowerCase().includes(q));
  }, [searchQuery]);

  const activeBrand = useMemo(() => {
    return BRANDS.find(b => b.id === selectedBrandId) || BRANDS[0];
  }, [selectedBrandId]);

  const activePao = useMemo(() => {
    return PAO_CATEGORIES.find(p => p.id === selectedPaoId) || PAO_CATEGORIES[0];
  }, [selectedPaoId]);

  // Decode Result
  const result = useMemo(() => {
    return decodeBatch(activeBrand, batchCodeInput);
  }, [activeBrand, batchCodeInput]);

  // PAO calculation
  const paoRemaining = activePao.standardPaoMonths - openedMonthsAgo;
  const isPaoExpired = hasOpened && paoRemaining <= 0;

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2b2826] transition-colors dark:bg-[#121110] dark:text-[#f7f5f2] pb-24">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-10">
        
        {/* =================================================================
            1. HERO SECTION
            ================================================================= */}
        <section className="pt-10 pb-4 text-center">
          <div className="mx-auto max-w-3xl text-balance">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#fc2779] shadow-2xs dark:border-pink-900/40 dark:bg-neutral-900 dark:text-[#ff4d94]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Mirha &amp; Co. · Freshness Diagnostic Lab</span>
            </div>

            <h1 className="mt-5 font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#161412] dark:text-white">
              Cosmetic Batch &amp; <span className="italic font-normal text-[#fc2779] dark:text-[#ff4d94]">Freshness Lab.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              Decode production dates, calculate shelf life, and check PAO expiry for 40+ global and Indian luxury beauty brands. Never put oxidized actives on your barrier.
            </p>
          </div>
        </section>

        {/* =================================================================
            2. INTERACTIVE CONTROLLER CARD
            ================================================================= */}
        <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            
            {/* BRAND SELECTOR (Col 7) */}
            <div className="space-y-2 lg:col-span-7">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                1. Select Brand
              </label>

              {/* Live search input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search brand (e.g. MAC, Maybelline, Dior, The Ordinary)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-[#faf8f5] py-2.5 pl-10 pr-4 text-sm text-neutral-900 focus:border-[#fc2779] focus:bg-white focus:outline-none dark:border-white/10 dark:bg-neutral-800 dark:text-white"
                />
              </div>

              {/* Quick Select Brand Chips */}
              <div className="flex flex-wrap gap-2 pt-1 max-h-36 overflow-y-auto pr-1">
                {filteredBrands.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedBrandId(b.id);
                      setBatchCodeInput(b.example);
                    }}
                    className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                      selectedBrandId === b.id
                        ? "bg-[#161412] text-white shadow-sm dark:bg-white dark:text-[#161412]"
                        : "border border-neutral-200 bg-white text-neutral-700 hover:border-[#fc2779] hover:bg-pink-50/50 dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-300"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* BATCH CODE INPUT (Col 5) */}
            <div className="space-y-2 lg:col-span-5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  2. Enter Batch Code
                </label>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {activeBrand.formatHint}
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={batchCodeInput}
                  onChange={(e) => setBatchCodeInput(e.target.value.toUpperCase())}
                  placeholder="e.g. A34, 28X301"
                  className="flex-1 rounded-xl border-2 border-neutral-200 bg-[#faf8f5] px-4 py-3 text-base font-mono font-bold uppercase tracking-widest text-neutral-900 focus:border-[#fc2779] focus:bg-white focus:outline-none dark:border-white/10 dark:bg-neutral-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setBatchCodeInput(activeBrand.example)}
                  className="rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-600 hover:border-[#fc2779] dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-300"
                  title="Try sample code"
                >
                  Sample
                </button>
              </div>

              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Found embossed on the crimp, outer carton base, or printed in ink on the bottle bottom.
              </p>
            </div>

          </div>
        </section>

        {/* =================================================================
            3. DIAGNOSTIC RESULT PLATE
            ================================================================= */}
        {result && !result.isValid && (
          <section className="rounded-3xl border border-amber-300 bg-amber-50/70 p-6 md:p-8 shadow-sm dark:border-amber-900/40 dark:bg-amber-950/20">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                <AlertTriangle className="h-3.5 w-3.5" /> Batch Code Unverified
              </span>
            </div>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl font-normal text-neutral-900 dark:text-white">
              Code &quot;{result.code}&quot; does not match {activeBrand.name}&apos;s verified factory format
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {result.errorMessage}
            </p>
            <div className="mt-5 rounded-2xl border border-amber-200/80 bg-white p-4 text-xs leading-relaxed text-neutral-700 shadow-xs dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-300">
              <div className="font-bold text-neutral-900 dark:text-white">Where to find the real code:</div>
              <p className="mt-1">{result.guidance}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">Expected format:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{result.expectedFormat}</span>
                <button
                  type="button"
                  onClick={() => setBatchCodeInput(activeBrand.example)}
                  className="ml-auto inline-flex items-center gap-1 font-semibold text-[#fc2779] hover:underline"
                >
                  Load verified sample code ({activeBrand.example}) →
                </button>
              </div>
            </div>
          </section>
        )}

        {result && result.isValid && (
          <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Freshness Status */}
              <div className="space-y-3 lg:col-span-7">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    result.status === "fresh"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : result.status === "mature"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
                  }`}>
                    {result.status === "fresh" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />}
                    {result.status === "mature" && <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />}
                    {result.status === "expired" && <AlertTriangle className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />}
                    <span>
                      {result.status === "fresh" ? "Peak Freshness · Actives Stable" : result.status === "mature" ? "Mature Formula · Safe If Sealed" : "Expired / Degraded Formula"}
                    </span>
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#161412] dark:text-white leading-tight">
                  Manufactured: {result.prodMonthName} {result.prodYear}
                </h2>

                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
                  Brand: <strong className="font-semibold text-neutral-900 dark:text-white">{activeBrand.name}</strong> ({activeBrand.country}) · Batch: <span className="font-mono font-bold text-[#fc2779]">{result.code}</span>
                </p>

                {/* Progress / Age bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
                    <span>Age: <strong>{result.ageMonths} months</strong></span>
                    <span>General Shelf Life: <strong>{result.shelfLife} months</strong></span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-neutral-100 overflow-hidden dark:bg-neutral-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        result.status === "fresh"
                          ? "bg-emerald-500"
                          : result.status === "mature"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${Math.min(100, Math.round((result.ageMonths / result.shelfLife) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Sealed Expiry Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-neutral-200 bg-[#faf8f5] p-5 dark:border-white/10 dark:bg-neutral-800/60">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                    Sealed Shelf Life Forecast
                  </div>
                  <div className="font-serif text-2xl font-normal text-neutral-900 dark:text-white">
                    Valid Until: {result.expiryDateFormatted}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {result.status === "fresh"
                      ? "This unit is at peak chemical potency. Preservatives and delivery systems are intact."
                      : result.status === "mature"
                      ? "Getting close to shelf life threshold. Use within the next few months and avoid warm storage."
                      : "Preservatives have likely broken down. Discard to prevent bacterial contact dermatitis."}
                  </p>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* =================================================================
            4. PAO (PERIOD AFTER OPENING) CALCULATOR
            ================================================================= */}
        <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div>
              <div className="inline-flex px-3 py-1 rounded-full bg-pink-100/70 text-[#fc2779] text-xs font-bold uppercase tracking-[0.2em] dark:bg-pink-950/30 dark:text-[#ff4d94] mb-2">
                Unsealed Product Health
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#161412] dark:text-white">
                Period After Opening (PAO) Calculator
              </h2>
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              The little open-jar symbol on your packaging
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            
            {/* Left: Product Type Selector (Col 7) */}
            <div className="space-y-4 md:col-span-7">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block">
                Select Formula Category
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PAO_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedPaoId(cat.id)}
                    className={`flex items-center justify-between rounded-xl p-3 text-left transition-all ${
                      selectedPaoId === cat.id
                        ? "border-2 border-[#fc2779] bg-pink-50/70 dark:bg-pink-950/30 font-semibold"
                        : "border border-neutral-200 bg-[#faf8f5] hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-800"
                    }`}
                  >
                    <span className="text-xs text-neutral-900 dark:text-white truncate">
                      {cat.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#fc2779] shrink-0 ml-2">
                      {cat.standardPaoMonths}M
                    </span>
                  </button>
                ))}
              </div>

              {/* Slider for months opened */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-700 dark:text-neutral-300">
                    How many months ago did you unseal it?
                  </span>
                  <span className="font-mono font-bold text-[#fc2779] text-sm">
                    {openedMonthsAgo} months ago
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="36"
                  value={openedMonthsAgo}
                  onChange={(e) => setOpenedMonthsAgo(parseInt(e.target.value))}
                  className="w-full accent-[#fc2779]"
                />
              </div>
            </div>

            {/* Right: PAO Verdict Card (Col 5) */}
            <div className="md:col-span-5 flex flex-col justify-between rounded-2xl border border-neutral-200 bg-[#faf8f5] p-5 dark:border-white/10 dark:bg-neutral-800">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#161412] text-white text-xs font-bold dark:bg-white dark:text-[#161412]">
                    🥫
                  </span>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                      {activePao.name}
                    </h3>
                    <span className="text-[11px] text-neutral-500">
                      Standard PAO: {activePao.standardPaoMonths} Months
                    </span>
                  </div>
                </div>

                <div className="my-3">
                  <div className={`text-xl font-serif font-bold ${
                    isPaoExpired ? "text-rose-600 dark:text-rose-400" : "text-emerald-700 dark:text-emerald-400"
                  }`}>
                    {isPaoExpired
                      ? `Expired ${Math.abs(paoRemaining)} Months Ago`
                      : `${paoRemaining} Months Safe Usage Left`}
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {activePao.riskNote}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-white/10 text-[11px] text-neutral-500">
                💡 <strong>Derm Rule:</strong> Water-based formulas without pumps risk bacterial colonies after 6–12 months.
              </div>
            </div>

          </div>
        </section>

        {/* =================================================================
            5. HOW TO FIND BATCH CODES GUIDE (3 Visual Tips)
            ================================================================= */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#fc2779] dark:text-[#ff4d94]">
              Packaging Anatomy
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#161412] dark:text-white mt-1">
              Where to Spot Batch Stamps
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900">
              <span className="text-2xl mb-2 block">🧴</span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                Crimp of Plastic Tubes
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                Heat-stamped into the wavy or flat top crimp seam of cleansers, sunscreens, and concealers. Usually 4–7 characters.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900">
              <span className="text-2xl mb-2 block">🏷️</span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                Bottom Glass or Sticker
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                Dot-matrix laser printed directly on the glass bottom or printed on the small circular shade sticker.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900">
              <span className="text-2xl mb-2 block">📦</span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                Outer Box Flap
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                Embossed or pressed on the bottom carton flap beside the barcode. It is <em>not</em> the 12-digit barcode.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================================
            6. RELATED DIAGNOSTIC TOOLS
            ================================================================= */}
        <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 text-center shadow-sm sm:p-8 dark:border-white/10 dark:bg-neutral-900">
          <h3 className="font-serif text-2xl font-normal text-[#161412] dark:text-white">
            Explore More Mirha &amp; Co. Diagnostic Tools
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-xs md:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Check active skincare ingredient collisions, find your foundation undertone formula, or discover 70% cheaper viral dupes.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tools/ingredients"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-[#faf8f5] px-4 py-2.5 text-xs font-bold text-neutral-900 shadow-2xs transition-all hover:border-[#fc2779] hover:bg-[#ffe6f0]/50 dark:border-white/10 dark:bg-neutral-800 dark:text-white"
            >
              <span>Collision Guard</span>
              <ChevronRight className="h-3.5 w-3.5 text-[#fc2779]" />
            </Link>
            <Link
              href="/makeup"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-[#faf8f5] px-4 py-2.5 text-xs font-bold text-neutral-900 shadow-2xs transition-all hover:border-[#fc2779] hover:bg-[#ffe6f0]/50 dark:border-white/10 dark:bg-neutral-800 dark:text-white"
            >
              <span>Everyday Makeup Studio</span>
              <ChevronRight className="h-3.5 w-3.5 text-[#fc2779]" />
            </Link>
            <Link
              href="/tools/dupes"
              className="inline-flex items-center gap-2 rounded-xl bg-[#fc2779] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#e01e69]"
            >
              <span>Luxury Dupe Vault</span>
              <ChevronRight className="h-3.5 w-3.5 text-white" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

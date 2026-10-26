"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Palette, 
  Sparkles as _NoSparkles,
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  RotateCcw, 
  Heart, 
  Droplets, 
  Check, 
  ArrowRight,
  HelpCircle,
  XCircle,
  Lightbulb,
  Search,
  X,
  ChevronDown,
  Globe2,
  Camera
} from "lucide-react";
import MakeupVibeAuditor from "@/components/MakeupVibeAuditor";

/* =========================================================================
   1. BATCH CHECKER ENGINE (STRICT & REAL)
   ========================================================================= */

interface BrandItem {
  id: string;
  name: string;
  country?: string;
  category?: "luxury" | "kbeauty" | "indian" | "clinical" | "everyday";
  aliases?: string[];
  group: "estee" | "loreal" | "chanel" | "dior" | "ordinary" | "kbeauty" | "standard" | "coty" | "shiseido" | "universal";
  hint: string;
  example: string;
  shelfMonths: number;
}

const BRANDS: BrandItem[] = [
  // --- Estée Lauder Group ---
  { id: "mac", name: "M·A·C Cosmetics", country: "USA", category: "luxury", aliases: ["mac", "m.a.c"], group: "estee", hint: "3 chars (e.g. A34)", example: "A34", shelfMonths: 36 },
  { id: "estee-lauder", name: "Estée Lauder", country: "USA", category: "luxury", aliases: ["estee", "lauder", "el"], group: "estee", hint: "3 chars (e.g. A24)", example: "A24", shelfMonths: 36 },
  { id: "clinique", name: "Clinique", country: "USA", category: "clinical", aliases: ["clinique"], group: "estee", hint: "3 chars (e.g. B84)", example: "B84", shelfMonths: 36 },
  { id: "bobbi-brown", name: "Bobbi Brown", country: "USA", category: "luxury", aliases: ["bobbi brown", "bb"], group: "estee", hint: "3 chars (e.g. A54)", example: "A54", shelfMonths: 36 },
  { id: "tom-ford", name: "Tom Ford Beauty", country: "USA", category: "luxury", aliases: ["tom ford", "tf"], group: "estee", hint: "3 chars (e.g. B64)", example: "B64", shelfMonths: 36 },
  { id: "jo-malone", name: "Jo Malone London", country: "UK", category: "luxury", aliases: ["jo malone", "jomalone"], group: "estee", hint: "3 chars (e.g. A14)", example: "A14", shelfMonths: 36 },
  { id: "smashbox", name: "Smashbox", country: "USA", category: "luxury", aliases: ["smashbox"], group: "estee", hint: "3 chars (e.g. A44)", example: "A44", shelfMonths: 36 },
  { id: "too-faced", name: "Too Faced", country: "USA", category: "luxury", aliases: ["too faced", "toofaced"], group: "estee", hint: "3 chars (e.g. B24)", example: "B24", shelfMonths: 36 },
  { id: "origins", name: "Origins", country: "USA", category: "clinical", aliases: ["origins"], group: "estee", hint: "3 chars (e.g. A34)", example: "A34", shelfMonths: 36 },
  { id: "aveda", name: "Aveda", country: "USA", category: "clinical", aliases: ["aveda"], group: "estee", hint: "3 chars (e.g. A14)", example: "A14", shelfMonths: 36 },

  // --- L'Oréal Group ---
  { id: "maybelline", name: "Maybelline New York", country: "USA / France", category: "everyday", aliases: ["maybelline", "fit me", "fitme"], group: "loreal", hint: "6 chars (e.g. 28X301)", example: "28X301", shelfMonths: 36 },
  { id: "loreal", name: "L'Oréal Paris", country: "France", category: "everyday", aliases: ["loreal", "l'oreal"], group: "loreal", hint: "6 chars (e.g. 28X402)", example: "28X402", shelfMonths: 36 },
  { id: "lancome", name: "Lancôme", country: "France", category: "luxury", aliases: ["lancome", "lancôme"], group: "loreal", hint: "6 chars (e.g. 40X101)", example: "40X101", shelfMonths: 36 },
  { id: "kiehls", name: "Kiehl's", country: "USA", category: "clinical", aliases: ["kiehls", "kiehl's"], group: "loreal", hint: "6 chars (e.g. 18X201)", example: "18X201", shelfMonths: 36 },
  { id: "ysl", name: "Yves Saint Laurent (YSL)", country: "France", category: "luxury", aliases: ["ysl", "yves saint laurent", "saint laurent"], group: "loreal", hint: "6 chars (e.g. 62X301)", example: "62X301", shelfMonths: 36 },
  { id: "armani", name: "Giorgio Armani Beauty", country: "Italy", category: "luxury", aliases: ["armani", "giorgio armani"], group: "loreal", hint: "6 chars (e.g. 40W901)", example: "40W901", shelfMonths: 36 },
  { id: "urban-decay", name: "Urban Decay", country: "USA", category: "luxury", aliases: ["urban decay", "naked"], group: "loreal", hint: "6 chars (e.g. 70X401)", example: "70X401", shelfMonths: 36 },
  { id: "nyx", name: "NYX Professional Makeup", country: "USA", category: "everyday", aliases: ["nyx", "nyx cosmetics"], group: "loreal", hint: "6 chars (e.g. 28X201)", example: "28X201", shelfMonths: 36 },
  { id: "cerave", name: "CeraVe", country: "USA / France", category: "clinical", aliases: ["cerave"], group: "loreal", hint: "6 chars (e.g. 54X101)", example: "54X101", shelfMonths: 36 },
  { id: "la-roche-posay", name: "La Roche-Posay", country: "France", category: "clinical", aliases: ["la roche-posay", "laroche posay", "lrp"], group: "loreal", hint: "6 chars (e.g. 54X201)", example: "54X201", shelfMonths: 36 },
  { id: "garnier", name: "Garnier", country: "France", category: "everyday", aliases: ["garnier"], group: "loreal", hint: "6 chars (e.g. 28X101)", example: "28X101", shelfMonths: 36 },
  { id: "it-cosmetics", name: "IT Cosmetics", country: "USA", category: "clinical", aliases: ["it cosmetics", "itcosmetics"], group: "loreal", hint: "6 chars (e.g. 70X301)", example: "70X301", shelfMonths: 36 },

  // --- Chanel ---
  { id: "chanel", name: "Chanel", country: "France", category: "luxury", aliases: ["chanel", "coco"], group: "chanel", hint: "4 digits (e.g. 9102)", example: "9102", shelfMonths: 36 },

  // --- Dior & LVMH ---
  { id: "dior", name: "Dior", country: "France", category: "luxury", aliases: ["dior", "christian dior"], group: "dior", hint: "4 chars (e.g. 4B01)", example: "4B01", shelfMonths: 36 },
  { id: "guerlain", name: "Guerlain", country: "France", category: "luxury", aliases: ["guerlain"], group: "dior", hint: "4 chars (e.g. 4A01)", example: "4A01", shelfMonths: 36 },
  { id: "givenchy", name: "Givenchy", country: "France", category: "luxury", aliases: ["givenchy"], group: "dior", hint: "4 chars (e.g. 3D02)", example: "3D02", shelfMonths: 36 },
  { id: "fenty", name: "Fenty Beauty", country: "USA", category: "luxury", aliases: ["fenty", "rihanna", "fenty beauty"], group: "dior", hint: "4 chars (e.g. 4A01)", example: "4A01", shelfMonths: 36 },
  { id: "benefit", name: "Benefit Cosmetics", country: "USA", category: "everyday", aliases: ["benefit", "benefit cosmetics"], group: "dior", hint: "4 chars (e.g. 4B01)", example: "4B01", shelfMonths: 36 },
  { id: "makeup-forever", name: "Make Up For Ever", country: "France", category: "luxury", aliases: ["make up for ever", "mufe"], group: "dior", hint: "4 chars (e.g. 4A01)", example: "4A01", shelfMonths: 36 },
  { id: "fresh", name: "Fresh Beauty", country: "USA", category: "clinical", aliases: ["fresh"], group: "dior", hint: "4 chars (e.g. 4C01)", example: "4C01", shelfMonths: 36 },

  // --- Shiseido Group ---
  { id: "shiseido", name: "Shiseido", country: "Japan", category: "luxury", aliases: ["shiseido"], group: "shiseido", hint: "4 chars (e.g. 4052)", example: "4052", shelfMonths: 36 },
  { id: "nars", name: "NARS Cosmetics", country: "USA / Japan", category: "luxury", aliases: ["nars"], group: "shiseido", hint: "4 chars (e.g. 4032)", example: "4032", shelfMonths: 36 },
  { id: "drunk-elephant", name: "Drunk Elephant", country: "USA / Japan", category: "clinical", aliases: ["drunk elephant"], group: "shiseido", hint: "4 chars (e.g. 4021)", example: "4021", shelfMonths: 36 },
  { id: "laura-mercier", name: "Laura Mercier", country: "USA / Japan", category: "luxury", aliases: ["laura mercier"], group: "shiseido", hint: "4 chars (e.g. 4015)", example: "4015", shelfMonths: 36 },

  // --- Coty Group ---
  { id: "gucci", name: "Gucci Beauty", country: "Italy / France", category: "luxury", aliases: ["gucci", "gucci beauty"], group: "coty", hint: "4 digits (e.g. 4045)", example: "4045", shelfMonths: 36 },
  { id: "burberry", name: "Burberry Beauty", country: "UK", category: "luxury", aliases: ["burberry"], group: "coty", hint: "4 digits (e.g. 4060)", example: "4060", shelfMonths: 36 },
  { id: "rimmel", name: "Rimmel London", country: "UK", category: "everyday", aliases: ["rimmel", "rimmel london"], group: "coty", hint: "4 digits (e.g. 4045)", example: "4045", shelfMonths: 36 },
  { id: "covergirl", name: "CoverGirl", country: "USA", category: "everyday", aliases: ["covergirl", "cover girl"], group: "coty", hint: "4 digits (e.g. 4050)", example: "4050", shelfMonths: 36 },
  { id: "max-factor", name: "Max Factor", country: "USA / UK", category: "everyday", aliases: ["max factor"], group: "coty", hint: "4 digits (e.g. 4045)", example: "4045", shelfMonths: 36 },

  // --- DECIEM ---
  { id: "the-ordinary", name: "The Ordinary", country: "Canada", category: "clinical", aliases: ["the ordinary", "ordinary", "deciem"], group: "ordinary", hint: "4 chars (e.g. 4B02)", example: "4B02", shelfMonths: 36 },

  // --- Modern Cult Brands ---
  { id: "rare-beauty", name: "Rare Beauty", country: "USA", category: "luxury", aliases: ["rare beauty", "selena gomez", "rare"], group: "standard", hint: "4-6 chars (e.g. 4021A)", example: "4021A", shelfMonths: 36 },
  { id: "charlotte-tilbury", name: "Charlotte Tilbury", country: "UK", category: "luxury", aliases: ["charlotte tilbury", "ct"], group: "standard", hint: "4-5 chars (e.g. 4B01)", example: "4B01", shelfMonths: 36 },
  { id: "huda-beauty", name: "Huda Beauty", country: "UAE / Italy", category: "luxury", aliases: ["huda beauty", "huda", "hudabeauty"], group: "standard", hint: "5-6 chars (e.g. 4012B)", example: "4012B", shelfMonths: 36 },
  { id: "glossier", name: "Glossier", country: "USA", category: "everyday", aliases: ["glossier", "boy brow"], group: "standard", hint: "4-5 chars (e.g. 4021A)", example: "4021A", shelfMonths: 36 },
  { id: "anastasia", name: "Anastasia Beverly Hills", country: "USA", category: "luxury", aliases: ["anastasia", "abh", "anastasia beverly hills"], group: "standard", hint: "4-5 chars (e.g. 4B01)", example: "4B01", shelfMonths: 36 },
  { id: "tarte", name: "Tarte Cosmetics", country: "USA", category: "luxury", aliases: ["tarte", "shape tape"], group: "standard", hint: "5-6 chars (e.g. 4021A)", example: "4021A", shelfMonths: 36 },
  { id: "rhode", name: "Rhode Skin (Hailey Bieber)", country: "USA", category: "everyday", aliases: ["rhode", "rhode skin", "hailey bieber"], group: "standard", hint: "Stamped batch or date (e.g. 2403A)", example: "2403A", shelfMonths: 24 },
  { id: "sol-de-janeiro", name: "Sol de Janeiro", country: "USA / Brazil", category: "luxury", aliases: ["sol de janeiro", "sdj", "cheirosa", "bum bum"], group: "standard", hint: "Stamped lot (e.g. 2404A)", example: "2404A", shelfMonths: 36 },
  { id: "paulas-choice", name: "Paula's Choice", country: "USA", category: "clinical", aliases: ["paula's choice", "paulas choice"], group: "standard", hint: "Stamped lot (e.g. 2402A)", example: "2402A", shelfMonths: 36 },

  // --- K-Beauty & J-Beauty ---
  { id: "cosrx", name: "COSRX", country: "South Korea", category: "kbeauty", aliases: ["cosrx", "snail mucin"], group: "kbeauty", hint: "Stamped EXP date or 6 chars", example: "B40315", shelfMonths: 36 },
  { id: "laneige", name: "Laneige", country: "South Korea", category: "kbeauty", aliases: ["laneige", "lip sleeping mask", "amorepacific"], group: "kbeauty", hint: "6-8 chars or stamped date", example: "K40301", shelfMonths: 36 },
  { id: "beauty-of-joseon", name: "Beauty of Joseon", country: "South Korea", category: "kbeauty", aliases: ["beauty of joseon", "boj"], group: "kbeauty", hint: "Stamped date or 6 chars", example: "B24041", shelfMonths: 36 },
  { id: "innisfree", name: "Innisfree", country: "South Korea", category: "kbeauty", aliases: ["innisfree"], group: "kbeauty", hint: "Stamped date or 6 chars", example: "K24021", shelfMonths: 36 },
  { id: "etude-house", name: "Etude House", country: "South Korea", category: "kbeauty", aliases: ["etude", "etude house"], group: "kbeauty", hint: "Stamped date or 6 chars", example: "E24031", shelfMonths: 36 },
  { id: "sulwhasoo", name: "Sulwhasoo", country: "South Korea", category: "kbeauty", aliases: ["sulwhasoo"], group: "kbeauty", hint: "Stamped date or 6 chars", example: "S24011", shelfMonths: 36 },
  { id: "torriden", name: "Torriden", country: "South Korea", category: "kbeauty", aliases: ["torriden", "dive in"], group: "kbeauty", hint: "Stamped date or 6 chars", example: "T24031", shelfMonths: 36 },
  { id: "anua", name: "Anua", country: "South Korea", category: "kbeauty", aliases: ["anua", "heartleaf"], group: "kbeauty", hint: "Stamped date or 6 chars", example: "A24021", shelfMonths: 36 },
  { id: "skin1004", name: "SKIN1004", country: "South Korea", category: "kbeauty", aliases: ["skin1004", "centella"], group: "kbeauty", hint: "Stamped date or 6 chars", example: "S24041", shelfMonths: 36 },
  { id: "round-lab", name: "Round Lab", country: "South Korea", category: "kbeauty", aliases: ["round lab", "dokdo"], group: "kbeauty", hint: "Stamped date or 6 chars", example: "R24011", shelfMonths: 36 },
  { id: "hada-labo", name: "Hada Labo", country: "Japan", category: "kbeauty", aliases: ["hada labo", "hadalabo", "rohto"], group: "standard", hint: "Stamped 4-6 chars (e.g. 2403A)", example: "2403A", shelfMonths: 36 },
  { id: "biore", name: "Bioré", country: "Japan", category: "everyday", aliases: ["biore", "bioré", "kao"], group: "standard", hint: "4-6 digits or lot (e.g. 2401)", example: "2401", shelfMonths: 36 },

  // --- Indian Pharmacy, Clinical & D2C Brands ---
  { id: "minimalist", name: "Minimalist (Be Minimalist)", country: "India", category: "indian", aliases: ["minimalist", "be minimalist"], group: "standard", hint: "Batch code on base (e.g. BM0424)", example: "BM0424", shelfMonths: 24 },
  { id: "formularx", name: "The Formularx", country: "India", category: "indian", aliases: ["formularx", "the formularx"], group: "standard", hint: "Stamped on tube crimp (e.g. FR2403)", example: "FR2403", shelfMonths: 24 },
  { id: "reequil", name: "Re'equil", country: "India", category: "indian", aliases: ["reequil", "re'equil"], group: "standard", hint: "Stamped on tube crimp (e.g. RQ2401)", example: "RQ2401", shelfMonths: 24 },
  { id: "dot-key", name: "Dot & Key", country: "India", category: "indian", aliases: ["dot & key", "dot and key", "dotkey"], group: "standard", hint: "Stamped on bottle base (e.g. DK2402)", example: "DK2402", shelfMonths: 24 },
  { id: "plum", name: "Plum Goodness", country: "India", category: "indian", aliases: ["plum", "plum goodness"], group: "standard", hint: "Stamped on crimp (e.g. PL2401)", example: "PL2401", shelfMonths: 24 },
  { id: "mamaearth", name: "Mamaearth", country: "India", category: "indian", aliases: ["mamaearth", "honasa"], group: "standard", hint: "Stamped MM/YY or lot (e.g. ME2402)", example: "ME2402", shelfMonths: 24 },
  { id: "derma-co", name: "The Derma Co", country: "India", category: "indian", aliases: ["derma co", "the derma co"], group: "standard", hint: "Stamped lot (e.g. DC2403)", example: "DC2403", shelfMonths: 24 },
  { id: "aqualogica", name: "Aqualogica", country: "India", category: "indian", aliases: ["aqualogica"], group: "standard", hint: "Stamped lot (e.g. AQ2401)", example: "AQ2401", shelfMonths: 24 },
  { id: "nykaa", name: "Nykaa Cosmetics", country: "India", category: "indian", aliases: ["nykaa", "nykaa cosmetics"], group: "standard", hint: "Stamped on bottom (e.g. NY2403)", example: "NY2403", shelfMonths: 36 },
  { id: "kay-beauty", name: "Kay Beauty (Katrina Kaif)", country: "India", category: "indian", aliases: ["kay beauty", "kay", "katrina kaif"], group: "standard", hint: "Stamped batch on box/base (e.g. KB2402)", example: "KB2402", shelfMonths: 36 },
  { id: "sugar", name: "Sugar Cosmetics", country: "India", category: "indian", aliases: ["sugar", "sugar cosmetics"], group: "standard", hint: "Stamped on base (e.g. SG2401)", example: "SG2401", shelfMonths: 36 },
  { id: "foxtale", name: "Foxtale", country: "India", category: "indian", aliases: ["foxtale"], group: "standard", hint: "Stamped on crimp (e.g. FX2402)", example: "FX2402", shelfMonths: 24 },
  { id: "pilgrim", name: "Pilgrim", country: "India", category: "indian", aliases: ["pilgrim", "discover pilgrim"], group: "standard", hint: "Stamped on base (e.g. PG2401)", example: "PG2401", shelfMonths: 24 },

  // --- Pharmacy & Dermatological Standards ---
  { id: "cetaphil", name: "Cetaphil", country: "Switzerland / India", category: "clinical", aliases: ["cetaphil", "galderma"], group: "standard", hint: "6 digits on crimp (e.g. 340122)", example: "340122", shelfMonths: 36 },
  { id: "sebamed", name: "Sebamed", country: "Germany", category: "clinical", aliases: ["sebamed"], group: "standard", hint: "6 digits embossed on crimp", example: "402155", shelfMonths: 36 },
  { id: "bioderma", name: "Bioderma", country: "France", category: "clinical", aliases: ["bioderma", "sensibio"], group: "standard", hint: "5-6 chars on base (e.g. 24031)", example: "24031", shelfMonths: 36 },
  { id: "avene", name: "Avène", country: "France", category: "clinical", aliases: ["avene", "avène", "eau thermale avene"], group: "standard", hint: "6 chars on crimp (e.g. 240301)", example: "240301", shelfMonths: 36 },
  { id: "neutrogena", name: "Neutrogena", country: "USA", category: "everyday", aliases: ["neutrogena", "hydro boost"], group: "standard", hint: "6-8 digits on crimp (e.g. 240311)", example: "240311", shelfMonths: 36 },
  { id: "eucerin", name: "Eucerin", country: "Germany", category: "clinical", aliases: ["eucerin", "beiersdorf"], group: "standard", hint: "8 digits or EXP stamped", example: "24031102", shelfMonths: 36 },
  { id: "nivea", name: "Nivea", country: "Germany", category: "everyday", aliases: ["nivea"], group: "standard", hint: "8 digits stamped on base", example: "24031150", shelfMonths: 36 }
];

type BatchResult =
  | {
      isValid: true;
      madeDate: string;
      expDate: string;
      isExpired: boolean;
      monthsRemaining: number;
      freshnessPct: number;
    }
  | {
      isValid: false;
      errorMessage: string;
    };

function decodeBatchCode(brand: BrandItem, rawCode: string): BatchResult | null {
  const code = rawCode.trim().toUpperCase();
  if (!code) return null;

  let prodYear = 2024;
  let prodMonth = 1;
  let valid = false;

  if (brand.group === "estee" && code.length === 3) {
    const monthChar = code[1];
    const yearChar = code[2];
    const mmap: Record<string, number> = { "1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"A":10,"B":11,"C":12 };
    const yDigit = parseInt(yearChar);
    if (mmap[monthChar] && !isNaN(yDigit)) {
      prodMonth = mmap[monthChar];
      prodYear = yDigit <= 6 ? 2020 + yDigit : 2010 + yDigit;
      valid = true;
    }
  } else if (brand.group === "loreal" && code.length >= 4 && code.length <= 8) {
    const yChar = code[2];
    const mChar = code[3];
    const ymap: Record<string, number> = { "S": 2019, "T": 2020, "U": 2021, "V": 2022, "W": 2023, "X": 2024, "Y": 2025, "Z": 2026 };
    const mmap: Record<string, number> = { "1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"O":10,"N":11,"D":12,"A":10,"B":11,"C":12 };
    if (ymap[yChar] && mmap[mChar]) {
      prodYear = ymap[yChar];
      prodMonth = mmap[mChar];
      valid = true;
    }
  } else if (brand.group === "dior" && code.length >= 2 && code.length <= 5) {
    const yDigit = parseInt(code[0]);
    const mChar = code[1];
    const dMonths = "ABCDEFGHJKLMN";
    const mIdx = dMonths.indexOf(mChar);
    if (!isNaN(yDigit) && mIdx !== -1) {
      prodYear = 2020 + yDigit;
      prodMonth = mIdx + 1;
      valid = true;
    }
  } else if (brand.group === "chanel" && /^\d{4}$/.test(code)) {
    const num = parseInt(code);
    if (num >= 6000 && num <= 9999) {
      const baseNum = 8400;
      const monthDiff = num - baseNum;
      const total = 2023 * 12 + monthDiff;
      prodYear = Math.floor(total / 12);
      prodMonth = Math.min(12, Math.max(1, (total % 12) + 1));
      valid = true;
    }
  } else if (brand.group === "coty" && /^\d{4}$/.test(code)) {
    const yDigit = parseInt(code[0]);
    const dayOfYear = parseInt(code.slice(1));
    if (!isNaN(yDigit) && dayOfYear >= 1 && dayOfYear <= 366) {
      prodYear = yDigit <= 6 ? 2020 + yDigit : 2010 + yDigit;
      const calcDate = new Date(prodYear, 0, dayOfYear);
      prodMonth = calcDate.getMonth() + 1;
      valid = true;
    }
  } else if (brand.group === "shiseido" && (code.length === 4 || code.length === 5)) {
    const yDigit = parseInt(code[0]);
    if (!isNaN(yDigit)) {
      prodYear = yDigit <= 6 ? 2020 + yDigit : 2010 + yDigit;
      const secondChar = code[1];
      const mmap: Record<string, number> = { "1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"A":10,"B":11,"C":12,"D":1,"E":2,"F":3,"G":4,"H":5,"J":6,"K":7,"L":8,"M":9,"N":10,"P":11,"R":12 };
      if (mmap[secondChar]) {
        prodMonth = mmap[secondChar];
        valid = true;
      } else {
        prodMonth = Math.min(12, Math.max(1, parseInt(code.slice(1, 3)) || 1));
        valid = true;
      }
    }
  } else if (brand.group === "ordinary") {
    const m = code.match(/^([2-6])([1-9A-M])/);
    if (m) {
      const yDigit = parseInt(m[1]);
      const mChar = m[2];
      const ordMonths = "123456789ABC";
      const mIdx = ordMonths.indexOf(mChar);
      if (mIdx !== -1) {
        prodYear = 2020 + yDigit;
        prodMonth = mIdx + 1;
        valid = true;
      }
    }
  } else if (brand.group === "kbeauty") {
    const dateMatch = code.match(/^(?:20)?(2[0-6])[.-]?(0[1-9]|1[0-2])[.-]?([0-3][0-9])?$/);
    const letterDate = code.match(/^[A-Z](2[0-6])(0[1-9]|1[0-2])/);
    if (dateMatch) {
      prodYear = 2000 + parseInt(dateMatch[1]);
      prodMonth = parseInt(dateMatch[2]);
      valid = true;
    } else if (letterDate) {
      prodYear = 2000 + parseInt(letterDate[1]);
      prodMonth = parseInt(letterDate[2]);
      valid = true;
    }
  } else if (brand.group === "standard") {
    const prefixYYMM = code.match(/^[A-Z]{2}(2[0-6])(0[1-9]|1[0-2])$/);
    const prefixMMYY = code.match(/^[A-Z]{2}(0[1-9]|1[0-2])(2[0-6])$/);
    const slashDate = code.match(/^(0[1-9]|1[0-2])\/?(?:20)?(2[0-6])$/);
    const sixDigitLot = code.match(/^(\d{2})(0[1-9]|1[0-2])(\d{2})$/);

    if (prefixYYMM) {
      prodYear = 2000 + parseInt(prefixYYMM[1]);
      prodMonth = parseInt(prefixYYMM[2]);
      valid = true;
    } else if (prefixMMYY) {
      prodYear = 2000 + parseInt(prefixMMYY[2]);
      prodMonth = parseInt(prefixMMYY[1]);
      valid = true;
    } else if (slashDate) {
      prodYear = 2000 + parseInt(slashDate[2]);
      prodMonth = parseInt(slashDate[1]);
      valid = true;
    } else if (sixDigitLot && (brand.id === "cetaphil")) {
      prodYear = 2020 + (parseInt(sixDigitLot[1]) % 7);
      prodMonth = parseInt(sixDigitLot[2]);
      valid = true;
    }
  } else if (brand.group === "universal") {
    // Universal auto-detection for ANY brand
    const expMMYY = code.match(/^(?:EXP[.:\s]*)?(0[1-9]|1[0-2])[\/.-]?(20)?(2[4-9]|3[0-5])$/);
    const expYYMM = code.match(/^(?:EXP[.:\s]*)?(?:20)?(2[4-9]|3[0-5])[\/.-]?(0[1-9]|1[0-2])(?:[\/.-]?[0-3][0-9])?$/);
    const mfgMMYY = code.match(/^(?:MFG|MFD|MFR)[.:\s]*(0[1-9]|1[0-2])[\/.-]?(20)?(1[8-9]|2[0-6])$/);

    if (expMMYY) {
      const eMonth = parseInt(expMMYY[1]);
      const eYear = 2000 + parseInt(expMMYY[3]);
      const expDate = new Date(eYear, eMonth - 1, 1);
      const now = new Date();
      const isExpired = now > expDate;
      const monthsRemaining = Math.max(0, Math.round((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30.4)));
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const prodYearCalc = eYear - Math.floor(brand.shelfMonths / 12);
      return {
        isValid: true,
        madeDate: `Approx. ${monthNames[eMonth - 1]} ${prodYearCalc}`,
        expDate: `${monthNames[eMonth - 1]} ${eYear}`,
        isExpired,
        monthsRemaining,
        freshnessPct: isExpired ? 0 : Math.min(100, Math.round((monthsRemaining / brand.shelfMonths) * 100))
      };
    } else if (expYYMM) {
      const eYear = 2000 + parseInt(expYYMM[1]);
      const eMonth = parseInt(expYYMM[2]);
      const expDate = new Date(eYear, eMonth - 1, 1);
      const now = new Date();
      const isExpired = now > expDate;
      const monthsRemaining = Math.max(0, Math.round((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30.4)));
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const prodYearCalc = eYear - Math.floor(brand.shelfMonths / 12);
      return {
        isValid: true,
        madeDate: `Approx. ${monthNames[eMonth - 1]} ${prodYearCalc}`,
        expDate: `${monthNames[eMonth - 1]} ${eYear}`,
        isExpired,
        monthsRemaining,
        freshnessPct: isExpired ? 0 : Math.min(100, Math.round((monthsRemaining / brand.shelfMonths) * 100))
      };
    } else if (mfgMMYY) {
      prodMonth = parseInt(mfgMMYY[1]);
      prodYear = 2000 + parseInt(mfgMMYY[3]);
      valid = true;
    } else if (code.length === 3) {
      const mmap: Record<string, number> = { "1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"A":10,"B":11,"C":12 };
      const yDigit = parseInt(code[2]);
      if (mmap[code[1]] && !isNaN(yDigit)) {
        prodMonth = mmap[code[1]];
        prodYear = yDigit <= 6 ? 2020 + yDigit : 2010 + yDigit;
        valid = true;
      }
    } else if (code.length === 4 && /^\d{4}$/.test(code)) {
      const yDigit = parseInt(code[0]);
      const day = parseInt(code.slice(1));
      if (day >= 1 && day <= 366) {
        prodYear = yDigit <= 6 ? 2020 + yDigit : 2010 + yDigit;
        const d = new Date(prodYear, 0, day);
        prodMonth = d.getMonth() + 1;
        valid = true;
      }
    } else if (code.length >= 4 && code.length <= 8) {
      const prefixYYMM = code.match(/^[A-Z]{2}(2[0-6])(0[1-9]|1[0-2])/);
      const prefixMMYY = code.match(/^[A-Z]{2}(0[1-9]|1[0-2])(2[0-6])/);
      const ymap: Record<string, number> = { "S": 2019, "T": 2020, "U": 2021, "V": 2022, "W": 2023, "X": 2024, "Y": 2025, "Z": 2026 };
      const mmap: Record<string, number> = { "1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"O":10,"N":11,"D":12,"A":10,"B":11,"C":12 };

      if (prefixYYMM) {
        prodYear = 2000 + parseInt(prefixYYMM[1]);
        prodMonth = parseInt(prefixYYMM[2]);
        valid = true;
      } else if (prefixMMYY) {
        prodYear = 2000 + parseInt(prefixMMYY[2]);
        prodMonth = parseInt(prefixMMYY[1]);
        valid = true;
      } else if (code.length >= 6 && ymap[code[2]] && mmap[code[3]]) {
        prodYear = ymap[code[2]];
        prodMonth = mmap[code[3]];
        valid = true;
      }
    }
  }

  if (!valid) {
    return {
      isValid: false,
      errorMessage: `"${code}" does not match ${brand.name}'s official batch syntax. Expected: ${brand.hint}.`
    };
  }

  const now = new Date();
  const prodDate = new Date(prodYear, prodMonth - 1, 1);
  const expDate = new Date(prodYear, prodMonth - 1 + brand.shelfMonths, 1);
  const isExpired = now > expDate;
  const monthsRemaining = Math.max(0, Math.round((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30.4)));

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    isValid: true,
    madeDate: `${monthNames[prodMonth - 1]} ${prodYear}`,
    expDate: `${monthNames[expDate.getMonth()]} ${expDate.getFullYear()}`,
    isExpired,
    monthsRemaining,
    freshnessPct: isExpired ? 0 : Math.min(100, Math.round((monthsRemaining / brand.shelfMonths) * 100))
  };
}

/* =========================================================================
   2. EVERYDAY ROUTINE DATA (NORMIE FRIENDLY)
   ========================================================================= */

const TONES = [
  { id: "fair", name: "Fair", swatch: "#f8e5d0", base: "Fit Me 110 / MAC NC15" },
  { id: "light", name: "Light", swatch: "#edd0b2", base: "Fit Me 120 / MAC NC20" },
  { id: "medium", name: "Medium", swatch: "#d8aa7e", base: "Fit Me 220 / MAC NC30" },
  { id: "tan", name: "Tan", swatch: "#b87c53", base: "Fit Me 310 / MAC NC42" },
  { id: "deep", name: "Deep", swatch: "#6b442b", base: "Fit Me 360 / MAC NC50" }
];

const UNDERTONES = [
  { id: "warm", name: "Warm (Golden)", hint: "Greenish wrist veins · Gold jewelry flatters" },
  { id: "neutral", name: "Neutral (Balanced)", hint: "Blue-green veins · Gold & Silver both work" },
  { id: "cool", name: "Cool (Rosy)", hint: "Blue/purplish veins · Silver jewelry flatters" }
];

const VIBES = [
  { id: "rush", name: "5-Min Rush", time: "5 mins", desc: "Awake & fresh for work or class" },
  { id: "clean", name: "Clean Girl", time: "10 mins", desc: "Hydrated, glowing real skin look" },
  { id: "glam", name: "Dinner Glam", time: "20 mins", desc: "Polished dimension & statement lips" }
];

/* =========================================================================
   3. COLOR HARMONY DATA (LIPS, BLUSH, FOUNDATION)
   ========================================================================= */

interface ColorProfile {
  name: string;
  seasonTag: string;
  bestLips: { name: string; hex: string; benchmark: string }[];
  bestBlush: { name: string; hex: string; note: string };
  goldenRule: string;
  avoidTip: string;
}

const COLOR_PROFILES: Record<string, ColorProfile> = {
  warm: {
    name: "Warm Golden Harmony",
    seasonTag: "Autumn / Warm Spring",
    bestLips: [
      { name: "Caramel Nude", hex: "#b87554", benchmark: "MAC Velvet Teddy" },
      { name: "Spiced Terracotta", hex: "#b85338", benchmark: "MAC Chili" },
      { name: "Peachy Coral", hex: "#d96b43", benchmark: "Maybelline Nude Nuance" }
    ],
    bestBlush: { name: "Warm Honey Amber / Peach", hex: "#d48356", note: "Tap high on cheekbones & lightly over nose bridge." },
    goldenRule: "Warm yellow, bronze, and peach tones create a seamless lit-from-within glow.",
    avoidTip: "Avoid icy baby pinks or frosty lilacs—they create an ashy, chalky cast on warm undertones."
  },
  neutral: {
    name: "Universal Balanced Harmony",
    seasonTag: "Soft Autumn / Summer",
    bestLips: [
      { name: "Dusty Rosewood", hex: "#af616c", benchmark: "Maybelline Touch of Spice" },
      { name: "Warm Rose Mauve", hex: "#a65b54", benchmark: "Nykaa Madras Kaapi" },
      { name: "Universal True Red", hex: "#942c36", benchmark: "Fenty The MVP" }
    ],
    bestBlush: { name: "Soft Muted Rose", hex: "#b86f78", note: "Blend on the apples of your cheeks for an effortless flush." },
    goldenRule: "Neutral undertones can easily wear both soft berries and warm nudes.",
    avoidTip: "Avoid overly orange or ultra-ashy foundations—look for balanced 'N' shade codes."
  },
  cool: {
    name: "Cool Rose & Berry Harmony",
    seasonTag: "Winter / Cool Summer",
    bestLips: [
      { name: "Classic Blue-Red", hex: "#b3001b", benchmark: "MAC Ruby Woo" },
      { name: "Deep Berry Wine", hex: "#681a34", benchmark: "Maybelline Divine Wine" },
      { name: "Cool Rosebud Mauve", hex: "#9e6b7a", benchmark: "Charlotte Tilbury Pillow Talk Medium" }
    ],
    bestBlush: { name: "Crisp Cool Pink / Berry", hex: "#c75d7a", note: "Sweep high toward temples for an instant lifting effect." },
    goldenRule: "Berry, crimson, and cool mauve illuminate cool skin and brighten the whites of your eyes.",
    avoidTip: "Avoid warm yellow bronzers and mustard tones—they fight against your natural rosy undertone."
  }
};

/* =========================================================================
   MAIN COMPONENT: ALL-IN-ONE MAKEUP LAB
   ========================================================================= */

export default function MakeupLabClient() {
  // Single active tool tab
  const [activeTab, setActiveTab] = useState<"expiry" | "vibes" | "routine" | "colors">("expiry");

  // --- Tab 1 State (Expiry) ---
  const [selectedBrandId, setSelectedBrandId] = useState("mac");
  const [customBrand, setCustomBrand] = useState<BrandItem | null>(null);
  const [brandSearchQuery, setBrandSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "luxury" | "kbeauty" | "indian" | "clinical" | "everyday">("all");
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [batchCodeInput, setBatchCodeInput] = useState("A34");
  const brandDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target as Node)) {
        setIsBrandDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredBrands = useMemo(() => {
    let list = BRANDS;
    if (selectedCategory !== "all") {
      list = list.filter(b => b.category === selectedCategory);
    }
    const q = brandSearchQuery.toLowerCase().trim();
    if (!q) return list;
    return list.filter(b => 
      b.name.toLowerCase().includes(q) || 
      (b.country && b.country.toLowerCase().includes(q)) ||
      (b.aliases && b.aliases.some(a => a.toLowerCase().includes(q)))
    );
  }, [brandSearchQuery, selectedCategory]);

  const selectedBrand = useMemo(() => {
    if (selectedBrandId === "custom" && customBrand) return customBrand;
    return BRANDS.find(b => b.id === selectedBrandId) || BRANDS[0];
  }, [selectedBrandId, customBrand]);

  const batchResult = useMemo(() => decodeBatchCode(selectedBrand, batchCodeInput), [selectedBrand, batchCodeInput]);

  const handleSelectCustomBrand = (rawName: string) => {
    const clean = rawName.trim();
    if (!clean) return;
    const newCustom: BrandItem = {
      id: "custom",
      name: clean,
      country: "Custom Brand",
      group: "universal",
      hint: "Stamped EXP date (e.g. EXP 05/26), Lot, or 3-6 char code",
      example: "EXP 05/26",
      shelfMonths: 36
    };
    setCustomBrand(newCustom);
    setSelectedBrandId("custom");
    setBatchCodeInput("EXP 05/26");
    setBrandSearchQuery("");
    setIsBrandDropdownOpen(false);
  };

  // --- Tab 2 State (Routine) ---
  const [skinTone, setSkinTone] = useState("medium");
  const [undertone, setUndertone] = useState<"warm" | "neutral" | "cool">("warm");
  const [vibe, setVibe] = useState<"rush" | "clean" | "glam">("clean");

  const currentTone = TONES.find(t => t.id === skinTone) || TONES[2];
  const activeColorProfile = COLOR_PROFILES[undertone];

  return (
    <main className="min-h-screen bg-[#faf8f5] px-3 pb-20 pt-5 text-neutral-900 transition-colors sm:px-6 sm:pt-8 lg:px-8 dark:bg-[#121110] dark:text-[#f7f5f2]">
      <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8 lg:max-w-6xl">
        
        {/* ================================================================= */}
        {/* HERO & UNIFIED TAB SWITCHER */}
        {/* ================================================================= */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#fc2779] shadow-xs sm:px-3.5 sm:py-1.5 sm:text-xs dark:border-white/10 dark:bg-neutral-900">
            <Heart className="h-3.5 w-3.5" /> All-in-One Makeup Lab
          </div>
          <h1 className="mt-2.5 font-serif text-2xl font-normal tracking-tight text-neutral-950 dark:text-white sm:mt-3 sm:text-4xl lg:text-5xl">
            Everyday beauty, <span className="italic text-[#fc2779]">made simple.</span>
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
            Everything in one place: check product expiry, audit your makeup look with on-device AI vision, get your 3-step morning routine, or find your most flattering shades.
          </p>

          {/* 4-TAB UNIFIED PILL SWITCHER */}
          <div role="tablist" aria-label="Makeup Lab Tools" className="mt-5 grid grid-cols-2 gap-1.5 rounded-2xl border border-black/10 bg-white p-1.5 shadow-xs sm:mt-6 sm:inline-flex sm:flex-wrap sm:justify-center sm:rounded-full dark:border-white/10 dark:bg-neutral-900">
            
            <button
              id="tab-expiry"
              type="button"
              role="tab"
              aria-selected={activeTab === "expiry"}
              onClick={() => setActiveTab("expiry")}
              className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-bold transition sm:min-h-0 sm:gap-2 sm:rounded-full sm:px-5 sm:py-2.5 sm:text-xs ${
                activeTab === "expiry"
                  ? "bg-[#fc2779] text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span>1. <span className="hidden sm:inline">Check </span>Expiry</span>
            </button>

            <button
              id="tab-vibes"
              type="button"
              role="tab"
              aria-selected={activeTab === "vibes"}
              onClick={() => setActiveTab("vibes")}
              className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-bold transition sm:min-h-0 sm:gap-2 sm:rounded-full sm:px-5 sm:py-2.5 sm:text-xs ${
                activeTab === "vibes"
                  ? "bg-[#fc2779] text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              }`}
            >
              <Camera className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span>2. AI Look<span className="hidden sm:inline"> Rater</span></span>
            </button>

            <button
              id="tab-routine"
              type="button"
              role="tab"
              aria-selected={activeTab === "routine"}
              onClick={() => setActiveTab("routine")}
              className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-bold transition sm:min-h-0 sm:gap-2 sm:rounded-full sm:px-5 sm:py-2.5 sm:text-xs ${
                activeTab === "routine"
                  ? "bg-[#fc2779] text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span>3. <span className="hidden sm:inline">Daily </span>Routine</span>
            </button>

            <button
              id="tab-colors"
              type="button"
              role="tab"
              aria-selected={activeTab === "colors"}
              onClick={() => setActiveTab("colors")}
              className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-bold transition sm:min-h-0 sm:gap-2 sm:rounded-full sm:px-5 sm:py-2.5 sm:text-xs ${
                activeTab === "colors"
                  ? "bg-[#fc2779] text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              }`}
            >
              <Palette className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span>4. Best Colors</span>
            </button>

          </div>
        </section>

        {/* ================================================================= */}
        {/* TAB 1: CHECK PRODUCT EXPIRY */}
        {/* ================================================================= */}
        {activeTab === "expiry" && (
          <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-neutral-900 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fc2779]">
                <ShieldCheck className="h-4 w-4" /> Freshness & Safety Engine
              </div>
              <h2 className="mt-1 font-serif text-2xl font-normal text-neutral-950 dark:text-white">
                Check any makeup or skincare product
              </h2>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Search across 70+ global & Indian brands, or type any unlisted brand to decode factory dates instantly.
              </p>
            </div>

            {/* Inputs Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              
              {/* Brand Search Combobox */}
              <div ref={brandDropdownRef} className="relative">
                <div className="flex items-center justify-between">
                  <label htmlFor="brand-search-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Search Brand
                  </label>
                  <span className="truncate max-w-[200px] text-[11px] font-bold text-[#fc2779]">
                    Active: {selectedBrand.name}
                  </span>
                </div>

                {/* Category quick filter pills */}
                <div className="mt-2 flex overflow-x-auto no-scrollbar gap-1 pb-1 sm:flex-wrap sm:pb-0">
                  {(["all", "luxury", "kbeauty", "indian", "clinical", "everyday"] as const).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsBrandDropdownOpen(true);
                      }}
                      className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-semibold capitalize transition sm:px-2 sm:py-0.5 sm:text-[10px] ${
                        selectedCategory === cat
                          ? "bg-[#fc2779] text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                      }`}
                    >
                      {cat === "all" ? "All" : cat === "kbeauty" ? "K-Beauty" : cat}
                    </button>
                  ))}
                </div>

                <div className="relative mt-2">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                  <input
                    id="brand-search-input"
                    type="text"
                    value={brandSearchQuery}
                    onChange={(e) => {
                      setBrandSearchQuery(e.target.value);
                      setIsBrandDropdownOpen(true);
                    }}
                    onFocus={() => setIsBrandDropdownOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (filteredBrands.length > 0) {
                          const first = filteredBrands[0];
                          setSelectedBrandId(first.id);
                          setBatchCodeInput(first.example);
                          setBrandSearchQuery("");
                          setIsBrandDropdownOpen(false);
                        } else if (brandSearchQuery.trim()) {
                          handleSelectCustomBrand(brandSearchQuery);
                        }
                      }
                    }}
                    placeholder={`Search any brand (e.g. Dior, Rare, CeraVe, Sugar)...`}
                    className="h-11 w-full rounded-xl border border-black/10 bg-neutral-50 pl-10 pr-10 text-base font-semibold text-neutral-900 focus:border-[#fc2779] focus:bg-white focus:outline-none sm:text-xs dark:border-white/10 dark:bg-neutral-800 dark:text-white"
                  />
                  {brandSearchQuery ? (
                    <button
                      type="button"
                      onClick={() => {
                        setBrandSearchQuery("");
                        setIsBrandDropdownOpen(false);
                      }}
                      className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center text-neutral-400 hover:text-neutral-600"
                      aria-label="Clear brand search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                      className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center text-neutral-400 hover:text-neutral-600"
                      aria-label="Toggle brand dropdown"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Dropdown list of matching brands */}
                {isBrandDropdownOpen && (
                  <div className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-2xl border border-black/10 bg-white p-2 shadow-xl dark:border-white/15 dark:bg-neutral-900">
                    
                    {/* Instant custom brand trigger if user typed a query */}
                    {brandSearchQuery.trim().length > 0 && (
                      <button
                        type="button"
                        onClick={() => handleSelectCustomBrand(brandSearchQuery)}
                        className="mb-1.5 flex w-full items-center gap-2 rounded-xl border border-dashed border-[#fc2779]/40 bg-[#fff5f8] px-3 py-2 text-left text-xs font-semibold text-[#fc2779] transition hover:bg-[#ffeaf1] dark:bg-neutral-800/80 dark:hover:bg-neutral-800"
                      >
                        <Search className="h-3.5 w-3.5 shrink-0 text-[#fc2779]" />
                        <span className="flex-1 truncate">
                          Decode <strong>&quot;{brandSearchQuery.trim()}&quot;</strong> (Universal Engine)
                        </span>
                        <ArrowRight className="h-3 w-3 text-[#fc2779]" />
                      </button>
                    )}

                    {filteredBrands.length > 0 ? (
                      filteredBrands.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setSelectedBrandId(b.id);
                            setBatchCodeInput(b.example);
                            setBrandSearchQuery("");
                            setIsBrandDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                            selectedBrandId === b.id
                              ? "bg-[#fff5f8] font-bold text-[#fc2779] dark:bg-neutral-800"
                              : "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800/60"
                          }`}
                        >
                          <div>
                            <span className="font-semibold">{b.name}</span>
                            {b.country && <span className="ml-1.5 text-[10px] text-neutral-400">({b.country})</span>}
                          </div>
                          <span className="text-[10px] font-mono text-neutral-400">{b.hint}</span>
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-center space-y-2">
                        <p className="text-xs text-neutral-400">
                          &quot;{brandSearchQuery}&quot; is not in our pre-indexed list.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleSelectCustomBrand(brandSearchQuery)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#fc2779] px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#e01a69]"
                        >
                          <Search className="h-3.5 w-3.5" /> Decode as custom brand
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="batch-code-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Stamped Batch Code
                  </label>
                  <span className="text-[11px] text-neutral-400">Format: {selectedBrand.hint}</span>
                </div>
                <div className="relative mt-1.5">
                  <input
                    id="batch-code-input"
                    type="text"
                    value={batchCodeInput}
                    onChange={(e) => setBatchCodeInput(e.target.value.toUpperCase())}
                    placeholder="e.g. A34, 28X301"
                    className="h-11 w-full rounded-xl border border-black/10 bg-neutral-50 px-3 font-mono text-base font-bold tracking-wider text-neutral-900 uppercase focus:border-[#fc2779] focus:outline-none sm:text-sm dark:border-white/10 dark:bg-neutral-800 dark:text-white"
                  />
                  {batchCodeInput && (
                    <button
                      type="button"
                      onClick={() => setBatchCodeInput("")}
                      className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600"
                      title="Clear code"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Quick Test Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] text-neutral-500">Quick tests:</span>
              <button type="button" onClick={() => { setSelectedBrandId("mac"); setBatchCodeInput("A34"); }} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300">M·A·C (A34)</button>
              <button type="button" onClick={() => { setSelectedBrandId("maybelline"); setBatchCodeInput("28X301"); }} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300">Maybelline (28X301)</button>
              <button type="button" onClick={() => { setSelectedBrandId("dior"); setBatchCodeInput("4B01"); }} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300">Dior (4B01)</button>
              <button type="button" onClick={() => { setSelectedBrandId("cerave"); setBatchCodeInput("54X101"); }} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300">CeraVe (54X101)</button>
              <button type="button" onClick={() => { setSelectedBrandId("formularx"); setBatchCodeInput("FR2403"); }} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300">The Formularx (FR2403)</button>
              <button type="button" onClick={() => { setSelectedBrandId("minimalist"); setBatchCodeInput("BM0424"); }} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300">Minimalist (BM0424)</button>
              <button type="button" onClick={() => { setSelectedBrandId("gucci"); setBatchCodeInput("4045"); }} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300">Gucci (4045)</button>
            </div>

            {/* Result Card: Unverified State */}
            {batchResult && !batchResult.isValid && (
              <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-5 text-xs text-neutral-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-neutral-200">
                <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
                  <AlertTriangle className="h-4 w-4" /> Batch Code Unverified
                </div>
                <p className="mt-1.5 leading-relaxed">
                  {batchResult.errorMessage}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-amber-200/80 pt-2 text-[11px] text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                  <span>Look on bottom of bottle, tube crimp, or near barcode.</span>
                  <button
                    type="button"
                    onClick={() => setBatchCodeInput(selectedBrand.example)}
                    className="font-bold text-[#fc2779] hover:underline"
                  >
                    Try sample {selectedBrand.example} →
                  </button>
                </div>
              </div>
            )}

            {/* Result Card: Genuine Verified State */}
            {batchResult && batchResult.isValid && (
              <div className={`rounded-2xl border p-5 transition ${
                batchResult.isExpired 
                  ? "border-rose-200 bg-rose-50/50 dark:border-rose-900/40 dark:bg-rose-950/20" 
                  : "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20"
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {batchResult.isExpired ? (
                      <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <span className={`text-sm font-bold uppercase tracking-wider ${batchResult.isExpired ? "text-rose-700 dark:text-rose-300" : "text-emerald-800 dark:text-emerald-300"}`}>
                      {batchResult.isExpired ? "Expired / Past Safe Date" : "Fresh & Safe to Use"}
                    </span>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-neutral-800 shadow-xs dark:bg-neutral-800 dark:text-neutral-200">
                    {batchResult.monthsRemaining} months shelf life left
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                  <div className="rounded-xl bg-white/80 p-3 shadow-xs dark:bg-neutral-900/80">
                    <span className="text-[10px] font-bold uppercase text-neutral-400">Manufactured</span>
                    <div className="mt-0.5 font-bold text-neutral-900 dark:text-white">{batchResult.madeDate}</div>
                  </div>
                  <div className="rounded-xl bg-white/80 p-3 shadow-xs dark:bg-neutral-900/80">
                    <span className="text-[10px] font-bold uppercase text-neutral-400">Unopened Expiry</span>
                    <div className="mt-0.5 font-bold text-neutral-900 dark:text-white">{batchResult.expDate}</div>
                  </div>
                  <div className="col-span-2 rounded-xl bg-white/80 p-3 shadow-xs sm:col-span-1 dark:bg-neutral-900/80">
                    <span className="text-[10px] font-bold uppercase text-neutral-400">Once Unsealed (PAO)</span>
                    <div className="mt-0.5 font-medium text-neutral-800 dark:text-neutral-200">Mascara: 6m · Creams: 12m</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-[11px] font-medium text-neutral-500">
                    <span>Freshness Life</span>
                    <span>{batchResult.freshnessPct}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                    <div 
                      className={`h-full transition-all duration-500 ${batchResult.isExpired ? "bg-rose-500" : "bg-emerald-500"}`} 
                      style={{ width: `${batchResult.freshnessPct}%` }}
                    />
                  </div>
                </div>

              </div>
            )}

            {!batchResult && (
              <div className="rounded-2xl border-2 border-dashed border-black/10 p-5 text-center text-xs text-neutral-500 dark:border-white/10">
                Enter a code stamped on the bottle or crimp to see instant results.
              </div>
            )}

          </section>
        )}

        {/* ================================================================= */}
        {/* TAB 2: AI LOOK RATER & MAKEUP VIBES */}
        {/* ================================================================= */}
        {activeTab === "vibes" && <MakeupVibeAuditor />}

        {/* ================================================================= */}
        {/* TAB 3: EVERYDAY ROUTINE GUIDE */}
        {/* ================================================================= */}
        {activeTab === "routine" && (
          <section className="space-y-6">
            
            {/* Quick 3-Tap Selector */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900 space-y-5">
              
              {/* Tone */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">1. Select Skin Depth</span>
                <div className="mt-2 grid grid-cols-5 gap-1.5 sm:gap-2">
                  {TONES.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSkinTone(t.id)}
                      className={`flex flex-col items-center rounded-xl border p-1.5 text-center transition sm:p-2 ${
                        skinTone === t.id 
                          ? "border-[#fc2779] bg-[#fff5f8] dark:border-[#fc2779] dark:bg-neutral-800" 
                          : "border-black/5 hover:border-black/20 dark:border-white/5"
                      }`}
                    >
                      <span className="h-5 w-5 rounded-full border border-black/10 shadow-xs sm:h-6 sm:w-6" style={{ backgroundColor: t.swatch }} />
                      <span className="mt-1 text-[11px] font-semibold text-neutral-900 sm:text-xs dark:text-white">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Undertone */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">2. Select Undertone</span>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5">
                  {UNDERTONES.map(u => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUndertone(u.id as "warm" | "neutral" | "cool")}
                      className={`rounded-xl border p-2.5 text-left transition sm:p-3 ${
                        undertone === u.id 
                          ? "border-[#fc2779] bg-[#fff5f8] dark:border-[#fc2779] dark:bg-neutral-800" 
                          : "border-black/5 hover:border-black/20 dark:border-white/5"
                      }`}
                    >
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">{u.name}</div>
                      <div className="mt-0.5 text-[10px] text-neutral-500 sm:text-[11px]">{u.hint}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vibe */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">3. Select Daily Routine Goal</span>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5">
                  {VIBES.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVibe(v.id as "rush" | "clean" | "glam")}
                      className={`flex items-center justify-between rounded-xl border p-2.5 text-left transition sm:p-3 ${
                        vibe === v.id 
                          ? "border-[#fc2779] bg-[#fff5f8] dark:border-[#fc2779] dark:bg-neutral-800" 
                          : "border-black/5 hover:border-black/20 dark:border-white/5"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-white">{v.name}</div>
                        <div className="text-[10px] text-neutral-500 sm:text-[11px]">{v.desc}</div>
                      </div>
                      <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                        {v.time}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Compact Result Card */}
            <div className="rounded-3xl border-2 border-[#fc2779]/30 bg-white p-5 shadow-sm sm:p-6 dark:border-[#fc2779]/40 dark:bg-neutral-900 space-y-5">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/5 pb-4 dark:border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#fc2779]">Your Customized Formula</span>
                  <h3 className="font-serif text-xl font-normal text-neutral-950 dark:text-white">
                    {currentTone.name} Skin · {undertone.toUpperCase()} Undertone
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  <span>Base Reference:</span>
                  <strong className="text-neutral-900 dark:text-white">{currentTone.base}</strong>
                </div>
              </div>

              {/* 3-Step Quick Order */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  The {vibe === "rush" ? "5-Minute" : vibe === "clean" ? "10-Minute" : "20-Minute"} Application Order:
                </span>
                
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-start gap-2.5 rounded-xl bg-neutral-50 p-3 dark:bg-neutral-800/40">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fc2779] text-[10px] font-bold text-white">1</span>
                    <div>
                      <strong className="text-neutral-900 dark:text-white">Spot Conceal Only:</strong>
                      <span className="ml-1 text-neutral-600 dark:text-neutral-300">Skip thick full-face foundation. Dab lightweight concealer under inner eye corners and on red spots only. Let natural skin show.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl bg-neutral-50 p-3 dark:bg-neutral-800/40">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fc2779] text-[10px] font-bold text-white">2</span>
                    <div>
                      <strong className="text-neutral-900 dark:text-white">Tap Cream Blush:</strong>
                      <span className="ml-1 text-neutral-600 dark:text-neutral-300">Dab 2 dots of cream blush high on cheekbones and blend upward toward hairline with fingertips for an instant lift.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl bg-neutral-50 p-3 dark:bg-neutral-800/40">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fc2779] text-[10px] font-bold text-white">3</span>
                    <div>
                      <strong className="text-neutral-900 dark:text-white">Brush Brows & Tint Lips:</strong>
                      <span className="ml-1 text-neutral-600 dark:text-neutral-300">Brush brow hairs up with clear gel, then swipe on your matching lip tint. Ready in under {vibe === "rush" ? "5" : "10"} minutes!</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Dos & Don'ts */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/40 p-3.5 text-xs dark:bg-emerald-950/20">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" /> What to DO
                  </div>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                    Let sunscreen sink in for 2 full minutes before applying makeup so it won&apos;t roll or peel off.
                  </p>
                </div>
                <div className="rounded-xl border border-rose-500/20 bg-rose-50/40 p-3.5 text-xs dark:bg-rose-950/20">
                  <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-300">
                    <XCircle className="h-4 w-4" /> What NOT to do
                  </div>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                    Don&apos;t powder your whole face—only tap powder on the sides of your nose to keep natural glow on your cheekbones.
                  </p>
                </div>
              </div>

            </div>

          </section>
        )}

        {/* ================================================================= */}
        {/* TAB 4: MY BEST COLORS */}
        {/* ================================================================= */}
        {activeTab === "colors" && (
          <section className="space-y-6">
            
            {/* Undertone Selector for Colors */}
            <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-neutral-900 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#fc2779]">Seasonal Color Harmonizer</span>
                <h2 className="mt-1 font-serif text-2xl font-normal text-neutral-950 dark:text-white">
                  Discover your most flattering shades
                </h2>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Select your undertone to see curated lip colors, blush placement, and what to avoid.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5">
                {UNDERTONES.map(u => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUndertone(u.id as "warm" | "neutral" | "cool")}
                    className={`rounded-2xl border p-2.5 text-left transition sm:p-3 ${
                      undertone === u.id 
                        ? "border-[#fc2779] bg-[#fff5f8] shadow-xs dark:border-[#fc2779] dark:bg-neutral-800" 
                        : "border-black/5 hover:border-black/20 dark:border-white/5"
                    }`}
                  >
                    <div className="text-xs font-bold text-neutral-900 dark:text-white">{u.name}</div>
                    <div className="mt-0.5 text-[10px] text-neutral-500 sm:text-[11px]">{u.hint}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Display */}
            <div className="rounded-3xl border-2 border-[#fc2779]/30 bg-white p-6 shadow-sm dark:border-[#fc2779]/40 dark:bg-neutral-900 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/5 pb-4 dark:border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#fc2779]">
                    {activeColorProfile.seasonTag}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-neutral-950 dark:text-white">
                    {activeColorProfile.name}
                  </h3>
                </div>
                <span className="rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  {currentTone.name} Depth
                </span>
              </div>

              {/* Best Lip Swatches */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Top 3 Harmonic Lip Colors:
                </span>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {activeColorProfile.bestLips.map((lip, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-2xl bg-[#faf8f5] p-3.5 dark:bg-neutral-800/50">
                      <span className="h-8 w-8 shrink-0 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: lip.hex }} />
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-white">{lip.name}</div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{lip.benchmark}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Blush & Rule */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                
                <div className="rounded-2xl bg-[#faf8f5] p-4 text-xs dark:bg-neutral-800/50">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: activeColorProfile.bestBlush.hex }} />
                    <span className="font-bold text-neutral-900 dark:text-white">Best Blush: {activeColorProfile.bestBlush.name}</span>
                  </div>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    {activeColorProfile.bestBlush.note}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#faf8f5] p-4 text-xs dark:bg-neutral-800/50">
                  <div className="font-bold text-neutral-900 dark:text-white">Golden Undertone Rule:</div>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                    {activeColorProfile.goldenRule}
                  </p>
                  <p className="mt-2 font-medium text-rose-600 dark:text-rose-400">
                    💡 {activeColorProfile.avoidTip}
                  </p>
                </div>

              </div>

              {/* Cross-Brand Shade Reference */}
              <div className="rounded-2xl border border-black/5 bg-neutral-50/70 p-4 text-xs dark:border-white/5 dark:bg-neutral-800/30">
                <span className="font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Cross-Brand Foundation Reference for {currentTone.name} Skin:
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 font-medium text-neutral-800 dark:text-neutral-200">
                  <div>Maybelline: <strong>{currentTone.base.split('/')[0]}</strong></div>
                  <div>M·A·C: <strong>{currentTone.base.split('/')[1] || "NC30"}</strong></div>
                  <div>Fenty: <strong>Shade {currentTone.id === "fair" ? "120" : currentTone.id === "light" ? "180" : currentTone.id === "medium" ? "240" : currentTone.id === "tan" ? "330" : "420"}</strong></div>
                  <div>NARS: <strong>{currentTone.id === "fair" ? "Mont Blanc" : currentTone.id === "light" ? "Deauville" : currentTone.id === "medium" ? "Stromboli" : currentTone.id === "tan" ? "Barcelona" : "Macao"}</strong></div>
                </div>
              </div>

            </div>

          </section>
        )}

      </div>
    </main>
  );
}

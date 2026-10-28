"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Palette, 
  Sparkles as _UnusedSparkles, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Heart, 
  ExternalLink,
  Layers,
  Sun,
  Moon,
  Compass
} from "lucide-react";

/* =========================================================================
   SEASONAL COLOR ANALYSIS DATA
   ========================================================================= */

type Undertone = "warm" | "cool" | "neutral" | "olive";
type Contrast = "high" | "medium" | "soft";
type Depth = "fair" | "wheatish" | "tan" | "deep";

interface PaletteProfile {
  season: string;
  tagline: string;
  paletteDescription: string;
  bestLips: { name: string; hex: string; benchmark: string }[];
  bestBlush: { name: string; hex: string; benchmark: string }[];
  bestEyes: { name: string; hex: string; desc: string }[];
  avoidColors: { name: string; hex: string; reason: string }[];
  clothingTones: { name: string; hex: string }[];
}

const SEASONAL_PROFILES: Record<string, PaletteProfile> = {
  "deep-autumn": {
    season: "Deep Autumn (Warm & Rich)",
    tagline: "Spiced, opulent, and velvety earth tones that bring instant glow.",
    paletteDescription: "Your features have warm depth and rich intensity. Muted or icy pastels will wash you out, while deep terracotta, burnt chili, and warm bronze awaken your complexion.",
    bestLips: [
      { name: "Spiced Terracotta", hex: "#B85338", benchmark: "MAC Chili / Marrakesh" },
      { name: "Warm Chestnut Nude", hex: "#8A4F3D", benchmark: "Maybelline Touch of Spice" },
      { name: "Rich Brick Red", hex: "#882D17", benchmark: "Fenty Beauty The MVP (Warm)" },
      { name: "Burnt Plum", hex: "#6E3539", benchmark: "Charlotte Tilbury Walk of No Shame" },
    ],
    bestBlush: [
      { name: "Toasted Peach", hex: "#D97D64", benchmark: "Rare Beauty Joy" },
      { name: "Spiced Apricot", hex: "#C76949", benchmark: "Swiss Beauty Apricot" },
      { name: "Deep Rose Bronze", hex: "#9E504A", benchmark: "NARS Taj Mahal / Exhibit A" },
    ],
    bestEyes: [
      { name: "Antique Bronze", hex: "#7A5230", desc: "Metallic warmth that makes dark eyes pop" },
      { name: "Burnished Copper", hex: "#9E4A28", desc: "Instant golden hour definition" },
      { name: "Espresso Noir", hex: "#2E1C14", desc: "Softer and richer than stark carbon black" },
    ],
    avoidColors: [
      { name: "Icy Baby Pink", hex: "#F7C8DA", reason: "Creates an ashy, chalky cast over warm depth" },
      { name: "Chalky Lilac", hex: "#C8A2C8", reason: "Clashes with golden and olive pigments" },
      { name: "Stark Cool Silver", hex: "#C0C0C0", reason: "Dulls your natural facial warmth" },
    ],
    clothingTones: [
      { name: "Forest Olive", hex: "#4A5D3E" },
      { name: "Burnt Ochre", hex: "#C87D2A" },
      { name: "Deep Espresso", hex: "#3B271E" },
      { name: "Warm Merlot", hex: "#631B2B" },
    ]
  },
  "warm-autumn": {
    season: "Warm Autumn (Golden & Earthy)",
    tagline: "Golden amber, cinnamon, and warm nude harmonies.",
    paletteDescription: "Your skin radiates when paired with warm golden and yellow-based tones. Golden honey, caramel, and peach create an effortless lit-from-within harmony.",
    bestLips: [
      { name: "Warm Caramel Nude", hex: "#B87554", benchmark: "MAC Velvet Teddy" },
      { name: "Golden Peach Coral", hex: "#D96B43", benchmark: "L'Oréal Worth It Intense" },
      { name: "Spiced Cinnamon", hex: "#9E4E36", benchmark: "Maybelline Nude Nuance" },
      { name: "Warm Rosewood", hex: "#A65B54", benchmark: "Nykaa Madras Kaapi" },
    ],
    bestBlush: [
      { name: "Warm Honey Amber", hex: "#D48356", benchmark: "Milani Luminoso" },
      { name: "Soft Rust Rose", hex: "#B55A46", benchmark: "Maybelline Fit Me Peach" },
      { name: "Golden Terracotta", hex: "#BD6245", benchmark: "Rare Beauty Love" },
    ],
    bestEyes: [
      { name: "Champagne Gold", hex: "#D4AF37", desc: "Illuminates eyelids with soft sunlight" },
      { name: "Warm Sienna", hex: "#8E3D24", desc: "Velvety crease contour" },
      { name: "Dark Chocolate", hex: "#382218", desc: "Smudge-proof lashline liner" },
    ],
    avoidColors: [
      { name: "Frosty Blue", hex: "#87CEEB", reason: "Stark clash against warm golden skin" },
      { name: "Cool Fuchsia", hex: "#D60270", reason: "Accentuate sallowness or redness" },
      { name: "Ash Grey", hex: "#808080", reason: "Drains vitality from your undertone" },
    ],
    clothingTones: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Moss Green", hex: "#556B2F" },
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Mustard Gold", hex: "#D4AF37" },
    ]
  },
  "cool-winter": {
    season: "Cool Winter (Clear & Dramatic)",
    tagline: "Jewel tones, crisp contrast, and striking berry pigments.",
    paletteDescription: "High-contrast features paired with cool rosy or blue undertones. You look phenomenal in pure jewel tones, royal sapphire, crimson ruby, and berry fuchsia.",
    bestLips: [
      { name: "Classic Blue-Red", hex: "#B3001B", benchmark: "MAC Ruby Woo / Russian Red" },
      { name: "Deep Berry Wine", hex: "#681A34", benchmark: "Maybelline Divine Wine" },
      { name: "Cool Plum Rose", hex: "#8C3C58", benchmark: "Charlotte Tilbury Love Liberty" },
      { name: "Cool Mauve Nude", hex: "#9E6B7A", benchmark: "Maybelline Touch of Nude" },
    ],
    bestBlush: [
      { name: "Crisp Cool Rose", hex: "#C75D7A", benchmark: "Rare Beauty Happy" },
      { name: "Plum Nectar", hex: "#8C435E", benchmark: "MAC Breath of Plum" },
      { name: "Soft Icy Mauve", hex: "#A8728A", benchmark: "Clinique Pansy Pop" },
    ],
    bestEyes: [
      { name: "Icy Silver Shimmer", hex: "#C9D1D9", desc: "Brightens the inner eye corner" },
      { name: "Smoky Charcoal", hex: "#36454F", desc: "Editorial cool definition" },
      { name: "Midnight Onyx", hex: "#0F0F12", desc: "Precision tightlining" },
    ],
    avoidColors: [
      { name: "Mustard Yellow", hex: "#FFDB58", reason: "Makes cool skin look pale and sickly" },
      { name: "Orange Coral", hex: "#FF6F59", reason: "Severe color mismatch against blue/pink veins" },
      { name: "Warm Camel", hex: "#C19A6B", reason: "Muddies your clean contrast" },
    ],
    clothingTones: [
      { name: "Cobalt Blue", hex: "#0047AB" },
      { name: "Emerald", hex: "#097969" },
      { name: "Pure Ruby", hex: "#9B111E" },
      { name: "True Black", hex: "#0A0A0A" },
    ]
  },
  "soft-summer": {
    season: "Soft Summer (Muted & Ethereal)",
    tagline: "Dusty rose, smoky lavender, and soft velvet neutrals.",
    paletteDescription: "Low contrast and cool undertones with gentle, diffused elegance. Soft rose, smoky mauve, and dove greys feel luxurious and natural on you.",
    bestLips: [
      { name: "Dusty Rose Pink", hex: "#B8707E", benchmark: "MAC Mehr / Twig" },
      { name: "Smoky Nude Mauve", hex: "#9E7582", benchmark: "Charlotte Tilbury Pillow Talk" },
      { name: "Muted Soft Berry", hex: "#854A5A", benchmark: "Maybelline Lead the Way" },
      { name: "Rose Chiffon", hex: "#C48A96", benchmark: "Rare Beauty Humble" },
    ],
    bestBlush: [
      { name: "Dusty Rose", hex: "#C27B88", benchmark: "Rare Beauty Hope" },
      { name: "Soft Mauve", hex: "#A86D7C", benchmark: "MAC Blushbaby" },
      { name: "Petal Pink", hex: "#D495A2", benchmark: "NARS Behave" },
    ],
    bestEyes: [
      { name: "Cool Taupe", hex: "#8B8589", desc: "Sophisticated everyday crease wash" },
      { name: "Smoky Mauve", hex: "#675965", desc: "Romantic diffused contour" },
      { name: "Soft Slate", hex: "#484E5A", desc: "Gentle eye definition" },
    ],
    avoidColors: [
      { name: "Neon Tangerine", hex: "#FF5800", reason: "Overwhelms your soft, gentle coloring" },
      { name: "Harsh Carbon Black", hex: "#000000", reason: "Can look too stark and severe" },
      { name: "Golden Honey", hex: "#D4AF37", reason: "Clashes with cool pink pigments" },
    ],
    clothingTones: [
      { name: "Slate Blue", hex: "#5B7C99" },
      { name: "Dove Grey", hex: "#7E848C" },
      { name: "Muted Lavender", hex: "#8E7D9B" },
      { name: "Dusty Sage", hex: "#7D8C7C" },
    ]
  }
};

/* =========================================================================
   FOUNDATION SHADE CROSS-CONVERTER DATABASE
   ========================================================================= */

interface FoundationCrossMatch {
  macCode: string;
  depthLabel: string;
  matches: {
    brand: string;
    line: string;
    shade: string;
  }[];
}

const SHADE_CONVERTER_DB: FoundationCrossMatch[] = [
  {
    macCode: "NC15 / NC20",
    depthLabel: "Fair to Light Neutral Warm",
    matches: [
      { brand: "Maybelline", line: "Fit Me Matte", shade: "115 / 118" },
      { brand: "L'Oréal", line: "True Match", shade: "1.5N / 2N" },
      { brand: "Fenty Beauty", line: "Pro Filt'r", shade: "140 / 150" },
      { brand: "Huda Beauty", line: "#FauxFilter", shade: "130G / 140G" },
      { brand: "Rare Beauty", line: "Liquid Touch", shade: "140C / 170W" },
    ]
  },
  {
    macCode: "NC25 / NC30",
    depthLabel: "Medium / Wheatish Golden Warm",
    matches: [
      { brand: "Maybelline", line: "Fit Me Matte", shade: "128 / 220" },
      { brand: "L'Oréal", line: "True Match", shade: "3N / 3.5N" },
      { brand: "Fenty Beauty", line: "Pro Filt'r", shade: "210 / 230" },
      { brand: "Huda Beauty", line: "#FauxFilter", shade: "210B / 220N" },
      { brand: "Rare Beauty", line: "Liquid Touch", shade: "210N / 230N" },
    ]
  },
  {
    macCode: "NC35 / NC40",
    depthLabel: "Medium-Deep / Warm Caramel",
    matches: [
      { brand: "Maybelline", line: "Fit Me Matte", shade: "228 / 310" },
      { brand: "L'Oréal", line: "True Match", shade: "4N / 5N" },
      { brand: "Fenty Beauty", line: "Pro Filt'r", shade: "290 / 300" },
      { brand: "Huda Beauty", line: "#FauxFilter", shade: "300N / 310G" },
      { brand: "Rare Beauty", line: "Liquid Touch", shade: "280N / 300C" },
    ]
  },
  {
    macCode: "NC42 / NC45",
    depthLabel: "Tan to Bronze Deep Warm",
    matches: [
      { brand: "Maybelline", line: "Fit Me Matte", shade: "330 / 332" },
      { brand: "L'Oréal", line: "True Match", shade: "6N / 7N" },
      { brand: "Fenty Beauty", line: "Pro Filt'r", shade: "330 / 350" },
      { brand: "Huda Beauty", line: "#FauxFilter", shade: "340G / 400G" },
      { brand: "Rare Beauty", line: "Liquid Touch", shade: "340C / 380W" },
    ]
  },
  {
    macCode: "NC50 / NW50",
    depthLabel: "Rich Mocha & Espresso Deep",
    matches: [
      { brand: "Maybelline", line: "Fit Me Matte", shade: "355 / 360" },
      { brand: "L'Oréal", line: "True Match", shade: "8N / 9N" },
      { brand: "Fenty Beauty", line: "Pro Filt'r", shade: "420 / 440" },
      { brand: "Huda Beauty", line: "#FauxFilter", shade: "450G / 500G" },
      { brand: "Rare Beauty", line: "Liquid Touch", shade: "460W / 500N" },
    ]
  }
];

/* =========================================================================
   MAIN COMPONENT: COLOR STUDIO CLIENT
   ========================================================================= */

export default function ColorStudioClient() {
  const [undertone, setUndertone] = useState<Undertone>("warm");
  const [contrast, setContrast] = useState<Contrast>("medium");
  const [depth, setDepth] = useState<Depth>("wheatish");
  const [selectedBenchmark, setSelectedBenchmark] = useState<string>("NC25 / NC30");

  // Determine Palette
  const currentSeason = useMemo(() => {
    if (undertone === "cool") {
      return contrast === "high" ? SEASONAL_PROFILES["cool-winter"] : SEASONAL_PROFILES["soft-summer"];
    } else {
      return depth === "tan" || depth === "deep" || contrast === "high"
        ? SEASONAL_PROFILES["deep-autumn"]
        : SEASONAL_PROFILES["warm-autumn"];
    }
  }, [undertone, contrast, depth]);

  const activeCrossMatch = useMemo(() => {
    return SHADE_CONVERTER_DB.find(s => s.macCode === selectedBenchmark) || SHADE_CONVERTER_DB[1];
  }, [selectedBenchmark]);

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2b2826] transition-colors dark:bg-[#121110] dark:text-[#f7f5f2] pb-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-10">
        
        {/* =================================================================
            1. HERO SECTION
            ================================================================= */}
        <section className="pt-10 pb-4 text-center">
          <div className="mx-auto max-w-3xl text-balance">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#fc2779] shadow-2xs dark:border-pink-900/40 dark:bg-neutral-900 dark:text-[#ff4d94]">
              <Palette className="h-3.5 w-3.5" />
              <span>Mirha &amp; Co. · Color &amp; Harmony Studio</span>
            </div>

            <h1 className="mt-5 font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#161412] dark:text-white">
              Color Analysis &amp; <span className="italic font-normal text-[#fc2779] dark:text-[#ff4d94]">Harmony Studio.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              Discover your seasonal palette, curated lip &amp; cheek harmonies, and cross-brand foundation shade equivalents with clinical color theory.
            </p>
          </div>
        </section>

        {/* =================================================================
            2. COLOR ATTRIBUTE CONTROLLERS
            ================================================================= */}
        <section className="space-y-6">
          
          {/* STEP 1: UNDERTONE */}
          <div className="rounded-3xl border border-black/5 bg-white/70 p-5 md:p-6 shadow-sm backdrop-blur-xs dark:border-white/10 dark:bg-neutral-900/70">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fc2779] text-xs font-bold text-white">
                  1
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#161412] dark:text-white">
                  Undertone Identity
                </span>
              </div>
              <span className="text-xs text-neutral-500">
                Veins &amp; jewelry test
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: "warm", label: "Warm (Golden)", cue: "Greenish veins · Gold jewelry glows" },
                { id: "cool", label: "Cool (Rosy)", cue: "Blue/purple veins · Silver jewelry pops" },
                { id: "neutral", label: "Neutral", cue: "Mix of blue & green · Balanced tones" },
                { id: "olive", label: "Olive (Greenish)", cue: "Muted green undertone · Warm bases turn orange" },
              ].map((u) => {
                const active = undertone === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUndertone(u.id as Undertone)}
                    className={`flex flex-col justify-between rounded-2xl p-4 text-left transition-all ${
                      active
                        ? "border-2 border-[#fc2779] bg-pink-50/70 dark:bg-pink-950/20 shadow-sm font-semibold"
                        : "border border-neutral-200 bg-white hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-neutral-900"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-neutral-900 dark:text-white">{u.label}</span>
                      {active && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#fc2779] text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {u.cue}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: CONTRAST & DEPTH */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Contrast Level */}
            <div className="rounded-3xl border border-black/5 bg-white/70 p-5 md:p-6 shadow-sm backdrop-blur-xs dark:border-white/10 dark:bg-neutral-900/70">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fc2779] text-xs font-bold text-white">
                    2
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#161412] dark:text-white">
                    Facial Contrast
                  </span>
                </div>
                <span className="text-xs text-neutral-500">
                  Hair vs skin depth
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: "high", label: "High Contrast", desc: "Dark hair / deep eyes paired with lighter skin" },
                  { id: "medium", label: "Medium Contrast", desc: "Balanced natural variation between hair and complexion" },
                  { id: "soft", label: "Soft / Monochromatic", desc: "Gentle blended coloring with subtle tonal shifts" },
                ].map((c) => {
                  const active = contrast === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setContrast(c.id as Contrast)}
                      className={`flex w-full items-center justify-between rounded-xl p-3 text-left transition-all ${
                        active
                          ? "border-2 border-[#fc2779] bg-pink-50/70 dark:bg-pink-950/20 font-semibold"
                          : "border border-neutral-200 bg-white hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-white">{c.label}</div>
                        <div className="text-[11px] text-neutral-500">{c.desc}</div>
                      </div>
                      {active && <Check className="h-4 w-4 text-[#fc2779] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skin Depth */}
            <div className="rounded-3xl border border-black/5 bg-white/70 p-5 md:p-6 shadow-sm backdrop-blur-xs dark:border-white/10 dark:bg-neutral-900/70">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fc2779] text-xs font-bold text-white">
                    3
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#161412] dark:text-white">
                    Skin Depth
                  </span>
                </div>
                <span className="text-xs text-neutral-500">
                  Base tone intensity
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: "fair", label: "Fair / Porcelain", swatch: "#F6E0CE" },
                  { id: "wheatish", label: "Medium / Wheatish", swatch: "#E2B38A" },
                  { id: "tan", label: "Tan / Bronze", swatch: "#BE865B" },
                  { id: "deep", label: "Rich / Espresso", swatch: "#6F4024" },
                ].map((d) => {
                  const active = depth === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDepth(d.id as Depth)}
                      className={`flex items-center gap-2.5 rounded-xl p-3 text-left transition-all ${
                        active
                          ? "border-2 border-[#fc2779] bg-pink-50/70 dark:bg-pink-950/20 font-semibold"
                          : "border border-neutral-200 bg-white hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900"
                      }`}
                    >
                      <span
                        className="h-6 w-6 shrink-0 rounded-full shadow-inner ring-1 ring-black/10"
                        style={{ backgroundColor: d.swatch }}
                      />
                      <span className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {d.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </section>

        {/* =================================================================
            3. SEASONAL PALETTE BLUEPRINT
            ================================================================= */}
        <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900">
          <div className="space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full bg-pink-100/70 text-[#fc2779] text-xs font-bold uppercase tracking-[0.2em] dark:bg-pink-950/30 dark:text-[#ff4d94]">
              Your Seasonal Color Identity
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#161412] dark:text-white leading-tight">
                  {currentSeason.season}
                </h2>
                <p className="mt-2 text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                  {currentSeason.paletteDescription}
                </p>
              </div>

              {/* Best Clothing Capsule */}
              <div className="rounded-2xl border border-neutral-200 bg-[#faf8f5] p-4 dark:border-white/10 dark:bg-neutral-800 shrink-0">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-2">
                  Best Wardrobe Neutrals
                </span>
                <div className="flex gap-2">
                  {currentSeason.clothingTones.map((c, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="h-9 w-9 rounded-full shadow-sm ring-1 ring-black/10 mb-1"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                      <span className="text-[10px] text-neutral-500 block truncate max-w-[42px]">
                        {c.name.split(" ")[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =================================================================
            4. LIP & BLUSH HARMONIC SWATCHES
            ================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* BEST LIP HARMONIZERS */}
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-xl">💄</span>
                <h3 className="font-serif text-2xl font-normal text-[#161412] dark:text-white">
                  Signature Lip Harmonies
                </h3>
              </div>
              <span className="text-xs text-neutral-500">Curated swatches</span>
            </div>

            <div className="space-y-3 pt-1">
              {currentSeason.bestLips.map((lip, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-neutral-100 bg-[#faf8f5] p-3.5 transition-all hover:border-[#fc2779] dark:border-white/5 dark:bg-neutral-800"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-9 w-9 shrink-0 rounded-full shadow-md ring-2 ring-white dark:ring-neutral-700"
                      style={{ backgroundColor: lip.hex }}
                    />
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">
                        {lip.name}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Benchmark: {lip.benchmark}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#fc2779]">
                    {lip.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BEST BLUSH & CHEEK TONES */}
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fc2779] inline-block"></span>
                <h3 className="font-serif text-2xl font-normal text-[#161412] dark:text-white">
                  Cheek &amp; Blush Harmonies
                </h3>
              </div>
              <span className="text-xs text-neutral-500">Lifting radiance</span>
            </div>

            <div className="space-y-3 pt-1">
              {currentSeason.bestBlush.map((blush, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-neutral-100 bg-[#faf8f5] p-3.5 transition-all hover:border-[#fc2779] dark:border-white/5 dark:bg-neutral-800"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-9 w-9 shrink-0 rounded-full shadow-md ring-2 ring-white dark:ring-neutral-700"
                      style={{ backgroundColor: blush.hex }}
                    />
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">
                        {blush.name}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Benchmark: {blush.benchmark}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#fc2779]">
                    {blush.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* =================================================================
            5. COLORS TO AVOID (ANTI-CLASH ADVICE)
            ================================================================= */}
        <section className="rounded-3xl border border-rose-200/80 bg-rose-50/60 p-6 md:p-8 shadow-sm dark:border-rose-900/40 dark:bg-rose-950/20">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white text-xs font-bold">
              ✕
            </span>
            <h3 className="font-serif text-2xl font-normal text-rose-950 dark:text-rose-200">
              Shades to Avoid (Why Faces Turn Ashy or Drained)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentSeason.avoidColors.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-rose-200 bg-white/80 p-4 dark:border-rose-900/30 dark:bg-neutral-900"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="h-6 w-6 rounded-full shadow-inner ring-1 ring-black/10"
                    style={{ backgroundColor: item.hex }}
                  />
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    {item.name}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-rose-950 dark:text-rose-200">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================
            6. UNIVERSAL FOUNDATION SHADE CROSS-CONVERTER
            ================================================================= */}
        <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div>
              <div className="inline-flex px-3 py-1 rounded-full bg-pink-100/70 text-[#fc2779] text-xs font-bold uppercase tracking-[0.2em] dark:bg-pink-950/30 dark:text-[#ff4d94] mb-2">
                Universal Shade Matrix
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#161412] dark:text-white">
                Cross-Brand Foundation Converter
              </h2>
            </div>
            <span className="text-xs text-neutral-500">
              Select your benchmark reference shade
            </span>
          </div>

          {/* Benchmark Shade Selector */}
          <div className="flex flex-wrap gap-2.5">
            {SHADE_CONVERTER_DB.map((db) => (
              <button
                key={db.macCode}
                type="button"
                onClick={() => setSelectedBenchmark(db.macCode)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                  selectedBenchmark === db.macCode
                    ? "bg-[#161412] text-white shadow-sm dark:bg-white dark:text-[#161412]"
                    : "border border-neutral-200 bg-[#faf8f5] text-neutral-700 hover:border-[#fc2779] dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-300"
                }`}
              >
                {db.macCode}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-neutral-100 bg-[#faf8f5] p-5 dark:border-white/5 dark:bg-neutral-800/60">
            <div className="text-xs font-bold uppercase tracking-wider text-[#fc2779] dark:text-[#ff4d94] mb-3">
              Equivalent Matches for {activeCrossMatch.macCode} ({activeCrossMatch.depthLabel})
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {activeCrossMatch.matches.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-200 bg-white p-3.5 shadow-2xs dark:border-white/10 dark:bg-neutral-900"
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {m.brand}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                    {m.line}
                  </div>
                  <div className="mt-2 text-sm font-bold text-neutral-900 dark:text-white">
                    Shade: {m.shade}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            7. RELATED ECOSYSTEM TOOLS
            ================================================================= */}
        <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 text-center shadow-sm sm:p-8 dark:border-white/10 dark:bg-neutral-900">
          <h3 className="font-serif text-2xl font-normal text-[#161412] dark:text-white">
            Complete Your Daily Routine
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-xs md:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Get your step-by-step 5-minute routine in the Everyday Makeup Studio or verify shelf life in the Batch Lab.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/makeup"
              className="inline-flex items-center gap-2 rounded-xl bg-[#fc2779] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#e01e69]"
            >
              <span>Everyday Makeup Studio</span>
              <ChevronRight className="h-3.5 w-3.5 text-white" />
            </Link>
            <Link
              href="/tools/batch-checker"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-[#faf8f5] px-4 py-2.5 text-xs font-bold text-neutral-900 shadow-2xs transition-all hover:border-[#fc2779] hover:bg-[#ffe6f0]/50 dark:border-white/10 dark:bg-neutral-800 dark:text-white"
            >
              <span>Batch &amp; Expiry Lab</span>
              <ChevronRight className="h-3.5 w-3.5 text-[#fc2779]" />
            </Link>
            <Link
              href="/tools/dupes"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-[#faf8f5] px-4 py-2.5 text-xs font-bold text-neutral-900 shadow-2xs transition-all hover:border-[#fc2779] hover:bg-[#ffe6f0]/50 dark:border-white/10 dark:bg-neutral-800 dark:text-white"
            >
              <span>Luxury Dupe Vault</span>
              <ChevronRight className="h-3.5 w-3.5 text-[#fc2779]" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

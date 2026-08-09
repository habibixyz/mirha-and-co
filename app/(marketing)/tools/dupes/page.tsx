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
    },
    // Globally: The Ordinary Buffet covers the peptide + bifida angle
    globalDupe: {
      name: "The Ordinary \"Buffet\" Multi-Technology Peptide Serum",
      brand: "The Ordinary",
      price: 1800,
      asin: "B01NAXDKSE",
      actives: "Matrixyl 3000, Argireline, Leuphasyl, Hyaluronic Acid, Bifida Ferment Lysate",
      description: "The Ordinary's flagship 'Buffet' stacks multiple peptide technologies with Bifida Ferment Lysate — the exact same active in Estée Lauder ANR — to repair skin barrier and boost collagen. Available worldwide via DECIEM.com and major global retailers.",
      image: "/products/Niacinamide-Serum.jpg",
      link: "https://deciem.com/en-us/theordinary/the-ordinary-buffet-30ml-100449900.html",
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
    // Neutrogena Hydro Boost is available worldwide — no globalDupe needed
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
    // The Ordinary is available worldwide — no globalDupe needed
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
    },
    // Plum is India-only — global users get The Ordinary Vitamin C alternative
    globalDupe: {
      name: "The Ordinary Ascorbyl Glucoside Solution 12%",
      brand: "The Ordinary",
      price: 1500,
      asin: "B07QDC77XC",
      actives: "12% Ascorbyl Glucoside (Vitamin C derivative), Propanediol",
      description: "A stable, non-irritating Vitamin C derivative that brightens skin tone, fades hyperpigmentation, and boosts antioxidant defence. Available globally at DECIEM.com, Sephora, and major international retailers.",
      image: "/products/Plum-15.jpg",
      link: "https://deciem.com/en-us/theordinary/the-ordinary-ascorbyl-glucoside-solution-12-30ml.html",
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
    },
    // Dot & Key is India-only — global users get a widely available alternative
    globalDupe: {
      name: "Neutrogena Hydro Boost Gel Cream for Extra-Dry Skin",
      brand: "Neutrogena",
      price: 2200,
      asin: "B00BQFTQW4",
      actives: "Hyaluronic Acid, Glycerin, Dimethicone, Panthenol",
      description: "A gel-cream hybrid that delivers the same lightweight, water-burst texture as Tatcha's Water Cream — with clinically proven 24-hour hydration. Available at every major pharmacy and supermarket worldwide.",
      image: "/products/Neutrogena-Hydro.jpg",
      link: "https://www.neutrogena.com/skin/moisturizers/hydro-boost-gel-cream-for-extra-dry-skin/6811040.html",
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
    },
    // Minimalist has limited global availability — global users get The Ordinary alternative
    globalDupe: {
      name: "The Ordinary \"Buffet\" + Copper Peptides 1%",
      brand: "The Ordinary",
      price: 2500,
      asin: "B07QH4JY49",
      actives: "Copper Peptides, Matrixyl 3000, Argireline, Growth Factor Analogs",
      description: "The closest global dupe to Drunk Elephant Protini. Stacks copper peptides with signal peptides that directly stimulate collagen synthesis and skin renewal. Available at DECIEM.com, Sephora, Cult Beauty, and major retailers worldwide.",
      image: "/products/Minimalist-Multi-Peptide.jpg",
      link: "https://deciem.com/en-us/theordinary/the-ordinary-buffet-copper-peptides-1-30ml.html",
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
      description: "Matches Dior's lightweight fluid coverage and soft-focus blurring effect. Controls oil and sweat and holds beautifully for everyday wear.",
      image: "/products/Maybelline-New.jpg",
      link: "https://amzn.to/4tCP38S",
    }
    // Maybelline is global — no globalDupe needed
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
    // Maybelline is global — no globalDupe needed
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
    },
    // Lakme is India-only — global users get Milani or e.l.f.
    globalDupe: {
      name: "e.l.f. Cosmetics Velvet Matte Lipstick",
      brand: "e.l.f. Cosmetics",
      price: 1200,
      asin: "B09P3LB5KT",
      actives: "Castor Oil, Vitamin E, Shea Butter, Matte Pigments",
      description: "e.l.f.'s velvet matte formula gives the same rich, creamy matte finish as MAC at a fraction of the cost. Available at Target, Ulta, Boots UK, and major retailers across the US, UK, Canada, and Australia.",
      image: "/products/product-43.jpg",
      link: "https://www.elfcosmetics.com/velvet-matte-lipstick/83699.html",
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
      description: "Matches the intense length, volume, and lightweight hold of Hourglass' high-end brush. Stays waterproof and smudge-proof through long work days.",
      image: "/products/product-42.jpg",
      link: "https://www.amazon.in/dp/B08H46YXYH?tag=skinwithtanvi-21",
    }
    // Maybelline Sky High is a massive global hit — no globalDupe needed
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
    },
    // Minimalist has limited global reach — global users get the Bondi Boost or Aussie alternative
    globalDupe: {
      name: "Aussie SOS Bond Repair Mask",
      brand: "Aussie",
      price: 1800,
      asin: "B0C1P4HY7Y",
      actives: "Maleic Acid (Bond Repair), Australian Jojoba Oil, Glycerin",
      description: "Aussie's bond repair formula uses the same maleic acid bond-repair technology as Olaplex, rebuilding broken disulfide bonds in just 3 minutes. Available at Walmart, Boots, Priceline, and major supermarkets across the US, UK, Canada, and Australia.",
      image: "/products/minimalist-bond-repair.jpg",
      link: "https://www.walmart.com/search?q=Aussie+SOS+Bond+Repair+Hair+Mask",
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
      description: "Provides salon-grade bond-smoothing and keratin care. Tames frizzy hair flyaways, protects hair fibers, and locks in moisture.",
      image: "/products/TRESemmé-Keratin.jpg",
      link: "https://amzn.to/3Q6pAWQ",
    }
    // TRESemmé is sold in 30+ countries — no globalDupe needed
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
      description: "A rich, deeply nourishing lotion that brightens uneven skin tone and smooths body texture. Pairs antioxidants with hydrating lipids, with a sweet tropical fragrance.",
      image: "/products/Dot-Key-Vitamin.jpg",
      link: "https://amzn.to/4t7Wq8d",
    },
    // Dot & Key is India-only — global users get Soap & Glory or St. Ives
    globalDupe: {
      name: "Palmer's Cocoa Butter Formula Body Lotion",
      brand: "Palmer's",
      price: 1200,
      asin: "B00014E46I",
      actives: "Cocoa Butter, Vitamin E, Shea Butter, Collagen",
      description: "Palmer's rich cocoa butter delivers the same deep body nourishment and glow as Sol de Janeiro, with a warm tropical scent. Available in virtually every country at supermarkets, pharmacies, and Amazon worldwide.",
      image: "/products/Dot-Key-Vitamin.jpg",
      link: "https://www.palmers.com/products/cocoa-butter-formula-body-lotion",
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
    },
    // Minimalist has limited global reach — global users get a lip-focused global dupe
    globalDupe: {
      name: "CeraVe Healing Ointment",
      brand: "CeraVe",
      price: 1000,
      asin: "B00TTD9BRC",
      actives: "Petrolatum, Ceramides (1, 3, 6-II), Hyaluronic Acid",
      description: "CeraVe's healing ointment is the dermatologist-favourite lip overnight treatment. Applied as a lip mask, it creates the same occlusive, barrier-restoring effect as Laneige — healing chapped lips overnight. Available at every drugstore worldwide.",
      image: "/products/minimalist-eye.jpg",
      link: "https://www.cerave.com/face-skincare/healing-ointment",
    }
  },
  {
    id: "charlotte-tilbury-flawless-filter",
    category: "Makeup",
    luxury: {
      name: "Hollywood Flawless Filter",
      brand: "Charlotte Tilbury",
      price: 4000,
      size: "30ml",
      actives: "Finely milled mica, Squalane, Hyaluronic Acid",
      rating: 4.6,
    },
    dupe: {
      name: "e.l.f. Cosmetics Halo Glow Liquid Filter",
      brand: "e.l.f. Cosmetics",
      price: 850,
      asin: "B0B94P4X82",
      actives: "Squalane, Hyaluronic Acid, Finely Milled Powder",
      description: "A viral skin booster that replicates Charlotte Tilbury's glow drop-for-drop. Works as a primer, highlighter, or sheer foundation to give a soft-focus dewy finish.",
      image: "/products/True-Match.jpg",
      link: "https://www.amazon.in/dp/B0B94P4X82",
    }
  },
  {
    id: "glow-recipe-dew-drops",
    category: "Skincare",
    luxury: {
      name: "Watermelon Glow Niacinamide Dew Drops",
      brand: "Glow Recipe",
      price: 3400,
      size: "40ml",
      actives: "Niacinamide, Hyaluronic Acid, Watermelon Fruit Extract",
      rating: 4.5,
    },
    dupe: {
      name: "L'Oreal Paris Glycolic Bright Skin Brightening Serum",
      brand: "L'Oreal Paris",
      price: 699,
      asin: "B09RGL7JSP",
      actives: "1% Glycolic Acid, 2% Niacinamide, Glycerin",
      description: "Delivers the same intense brightening and glassy reflection. Pairs Niacinamide with Glycolic Acid to simultaneously fade dark spots and leave a glossy skin barrier.",
      image: "/products/L'Oréal-Paris.jpg",
      link: "https://amzn.to/3Qw5mN2",
    },
    globalDupe: {
      name: "e.l.f. Jelly Pop Dew Primer",
      brand: "e.l.f. Cosmetics",
      price: 1100,
      asin: "B089DMQQ4B",
      actives: "Hyaluronic Acid, Niacinamide, Watermelon Extract",
      description: "An ultra-dewy sticky gel primer that mimics Glow Recipe's signature watermelon glow and glassy texture while locking makeup in place. Available globally at Ulta, Target, and major international retailers.",
      image: "/products/L'Oréal-Paris.jpg",
      link: "https://www.elfcosmetics.com/jelly-pop-dew-primer/81577.html",
    }
  },
  {
    id: "charlotte-tilbury-blush-wand",
    category: "Makeup",
    luxury: {
      name: "Matte Beauty Blush Wand",
      brand: "Charlotte Tilbury",
      price: 3800,
      size: "12ml",
      actives: "Liquid Blush Pigments, Silica, Squalane",
      rating: 4.4,
    },
    dupe: {
      name: "e.l.f. Cosmetics Halo Glow Beauty Wand Blush",
      brand: "e.l.f. Cosmetics",
      price: 850,
      asin: "B0BYPF5K4L",
      actives: "Squalane, Silica, Vitamin E",
      description: "A cushion-tip liquid blush that matches Charlotte Tilbury's texture, pigment payoff, and easy blendability. Gives a natural flushed look with zero patchiness.",
      image: "/products/product-43.jpg",
      link: "https://www.amazon.in/dp/B0BYPF5K4L",
    }
  },
  {
    id: "too-faced-bts-mascara",
    category: "Makeup",
    luxury: {
      name: "Better Than Sex Mascara",
      brand: "Too Faced",
      price: 2450,
      size: "8ml",
      actives: "Hourglass Brush, Film-forming Polymers, Acacia Senegal Tree Extract",
      rating: 4.5,
    },
    dupe: {
      name: "L'Oreal Paris Voluminous Lash Paradise Mascara",
      brand: "L'Oreal Paris",
      price: 799,
      asin: "B071FPMH2H",
      actives: "Hourglass Fiber Brush, Castor Oil, Carnauba Wax",
      description: "Replicates the famous hourglass brush and whipped volumizing formula. Thickens and lengths lashes with soft, feather-like volume without any clumping or flaking.",
      image: "/products/product-42.jpg",
      link: "https://amzn.to/3vPZ5x9",
    }
  },
  {
    id: "k18-molecular-hair-mask",
    category: "Hair Care",
    luxury: {
      name: "Leave-In Molecular Repair Hair Mask",
      brand: "K18",
      price: 5200,
      size: "50ml",
      actives: "K18Peptide, Hydrolyzed Wheat Protein",
      rating: 4.6,
    },
    dupe: {
      name: "L'Oreal Professionnel Absolut Repair Molecular Mask",
      brand: "L'Oreal Professionnel",
      price: 1899,
      asin: "B0CI2H3XZS",
      actives: "Peptides Bonder, 5 Amino Acids",
      description: "A professional molecular mask that repairs hair structure at the peptide link level. Works to restore elasticity and shine to severely heat-damaged and color-processed locks.",
      image: "/products/TRESemmé-Keratin.jpg",
      link: "https://amzn.to/4n3Kmqw",
    },
    globalDupe: {
      name: "Elizavecca CER-100 Collagen Coating Hair Protein Treatment",
      brand: "Elizavecca",
      price: 950,
      asin: "B01I2ZQ7A2",
      actives: "Ceramide NP, Hydrolyzed Collagen, Soy Protein, Allantoin",
      description: "The viral global hair treatment that repairs protein bonds in damaged hair. Rebuilds cuticle smoothness and elasticity on bleached and color-treated hair at a fifth of the price. Available worldwide on Amazon, iHerb, and YesStyle.",
      image: "/products/TRESemmé-Keratin.jpg",
      link: "https://www.iherb.com/pr/elizavecca-cer-100-collagen-coating-hair-protein-treatment-100-ml/72244",
    }
  },
  {
    id: "la-mer-creme",
    category: "Skincare",
    luxury: {
      name: "Crème de la Mer Moisturizer",
      brand: "La Mer",
      price: 18000,
      size: "30ml",
      actives: "Fermented Sea Kelp, Mineral Oil, Petrolatum, Glycerin",
      rating: 4.3,
    },
    dupe: {
      name: "Nivea Crème (Classic Blue Tin)",
      brand: "Nivea",
      price: 150,
      asin: "B00E4MKYCY",
      actives: "Mineral Oil, Petrolatum, Glycerin, Panthenol",
      description: "Shares the exact same occlusive, rich base formulation (mineral oil, petrolatum, glycerin, and microcrystalline wax) as the ultra-expensive La Mer. Heals dry skin and creates a protective barrier for a fraction of the price.",
      image: "/products/Vaseline-cream.jpg",
      link: "https://amzn.to/3SjM8D7",
    }
  },
  {
    id: "fenty-beauty-gloss-bomb",
    category: "Makeup",
    luxury: {
      name: "Gloss Bomb Universal Lip Luminizer",
      brand: "Fenty Beauty",
      price: 2500,
      size: "9ml",
      actives: "Shea Butter, Hyaluronic Acid, Pearlescent Pigments",
      rating: 4.7,
    },
    dupe: {
      name: "Maybelline New York Lifter Gloss",
      brand: "Maybelline",
      price: 699,
      asin: "B08D6TKLY7",
      actives: "Hyaluronic Acid, Coconut Oil, Shimmer Waxes",
      description: "Delivers the same high-shine finish, large wand applicator, and smoothing hydration as Fenty Gloss Bomb. Keeps lips looking plump and glossy without feeling sticky.",
      image: "/products/product-40.jpg",
      link: "https://amzn.to/4t7T9G8",
    }
  },
  {
    id: "laneige-cream-skin",
    category: "Skincare",
    luxury: {
      name: "Cream Skin Cerapeptide Toner & Moisturizer",
      brand: "Laneige",
      price: 2000,
      size: "150ml",
      actives: "Cerapeptide, White Leaf Tea Water, Meadowfoam Seed Oil",
      rating: 4.6,
    },
    dupe: {
      name: "TonyMoly Wonder Ceramide Mochi Toner",
      brand: "TonyMoly",
      price: 950,
      asin: "B079F48BKM",
      actives: "5000ppb Ceramide, Centella Asiatica, Panthenol",
      description: "A cult K-Beauty toner that matches Laneige's rich, milky hydration. Packed with ceramides and hyaluronic acid to build a bouncy, mochi-like skin barrier. You get 500ml of product — more than triple the Laneige volume.",
      image: "/products/Simple-Moisturising.jpg",
      link: "https://amzn.to/4vPZX2j",
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
      
      const activeDupe = currency !== "INR" && item.globalDupe ? item.globalDupe : item.dupe;
      
      const query = searchQuery.toLowerCase().trim();
      const searchMatch = !query || 
        item.luxury.brand.toLowerCase().includes(query) ||
        item.luxury.name.toLowerCase().includes(query) ||
        item.luxury.actives.toLowerCase().includes(query) ||
        activeDupe.brand.toLowerCase().includes(query) ||
        activeDupe.name.toLowerCase().includes(query) ||
        activeDupe.actives.toLowerCase().includes(query);
        
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
      const activeDupe = currency !== "INR" && item.globalDupe ? item.globalDupe : item.dupe;
      const query = searchQuery.toLowerCase().trim();
      const searchMatch = !query || 
        item.luxury.brand.toLowerCase().includes(query) ||
        item.luxury.name.toLowerCase().includes(query) ||
        item.luxury.actives.toLowerCase().includes(query) ||
        activeDupe.brand.toLowerCase().includes(query) ||
        activeDupe.name.toLowerCase().includes(query) ||
        activeDupe.actives.toLowerCase().includes(query);
        
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
        const activeDupe = currency !== "INR" && item.globalDupe ? item.globalDupe : item.dupe;
        const count = purchasesPerYear[id] || 2;
        luxuryTotal += item.luxury.price * count;
        dupeTotal += activeDupe.price * count;
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
  }, [selectedItems, purchasesPerYear, currency]);

  const handleShareWhatsApp = () => {
    const text = `I just used the Skincare Dupe Finder & calculated that swapping luxury items for drugstore dupes will save me ${formatPrice(math.savings)}/year! Find your dupes here:`;
    const url = "https://mirhaandco.com/tools/dupes";
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailStatus("submitting");
    const recommendations = selectedItems.map(id => {
      const item = DUPES_DATABASE.find(d => d.id === id);
      if (!item) return null;
      
      const activeDupe = currency !== "INR" && item.globalDupe ? item.globalDupe : item.dupe;
      const matchingProduct = PRODUCTS.find(p => p.asin === activeDupe.asin);
      const affiliateUrl = getAffiliateUrl(activeDupe.asin, activeDupe.name, activeDupe.brand, matchingProduct?.link || activeDupe.link);
      const count = purchasesPerYear[id] || 2;
      const itemSavings = (item.luxury.price - activeDupe.price) * count;

      return {
        luxuryBrand: item.luxury.brand,
        luxuryName: item.luxury.name,
        dupeBrand: activeDupe.brand,
        dupeName: activeDupe.name,
        price: formatPrice(activeDupe.price),
        savings: formatPrice(itemSavings),
        link: affiliateUrl
      };
    }).filter(Boolean);

    const leadData = {
      savings: math.savings,
      formattedSavings: formatPrice(math.savings),
      percentage: math.percentage,
      luxuryTotal: math.luxuryTotal,
      dupeTotal: math.dupeTotal,
      recommendations
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
      const res = await submitLeadAction(email, "dupe", JSON.stringify(leadData));
      if (res && res.error) {
        alert(res.error);
        setEmailStatus("idle");
        return;
      }
    } catch (err) {
      console.error("Non-blocking server-side lead submit failed:", err);
    }
    
    setEmailStatus("success");
  };

  return (
    <main className="dupe-finder-page">
      <style>{`
        .dupe-finder-page {
          background: var(--bg);
          color: var(--ink);
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          padding: 48px 20px 120px;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .shell {
          max-width: 1160px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          font-size: 0.85rem;
          margin-bottom: 30px;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .back-link:hover {
          color: var(--rose);
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
          color: var(--ink);
        }
        .header p {
          color: var(--muted);
          font-size: 1.05rem;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--rose-light, rgba(252, 39, 121, 0.08));
          color: var(--rose);
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
          border: 1.5px solid var(--rule);
          border-radius: 14px;
          background: var(--surface, #fff);
          color: var(--ink);
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: all 0.2s ease;
        }
        .search-input:focus {
          border-color: var(--rose);
          box-shadow: 0 4px 12px var(--rose-light, rgba(252, 39, 121, 0.05));
        }
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
        }
        .clear-search-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          font-size: 0.85rem;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .clear-search-btn:hover {
          color: var(--rose);
        }
        .category-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .category-pill {
          background: var(--surface, #fff);
          border: 1.5px solid var(--rule);
          color: var(--muted);
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
          border-color: var(--rose);
          color: var(--rose);
        }
        .category-pill.active {
          background: var(--rose);
          border-color: var(--rose);
          color: #fff;
        }
        .category-count {
          background: rgba(120, 120, 120, 0.12);
          color: var(--ink);
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
          color: var(--muted);
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--rule);
        }
        .luxury-card {
          background: var(--surface, #fff);
          border: 1.5px solid var(--rule);
          border-radius: 18px;
          padding: 18px 20px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: grid;
          grid-template-columns: 24px 1fr auto;
          align-items: center;
          gap: 14px;
        }
        .luxury-card:hover {
          border-color: var(--rose);
          box-shadow: 0 6px 20px var(--rose-light, rgba(252, 39, 121, 0.06));
          transform: translateY(-2px);
        }
        .luxury-card.selected {
          border-color: var(--rose);
          background: var(--rose-light, #fffaf8);
          box-shadow: 0 6px 20px var(--rose-light, rgba(252, 39, 121, 0.08));
        }
        .luxury-details {
          min-width: 0;
        }
        .luxury-brand {
          font-size: 0.68rem;
          color: var(--rose);
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
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 640px) {
          .luxury-name { font-size: 0.95rem; white-space: normal; }
        }
        .luxury-meta {
          font-size: 0.75rem;
          color: var(--muted);
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .luxury-price {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          color: var(--ink);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .checkbox {
          width: 22px;
          height: 22px;
          min-width: 22px;
          border: 2px solid var(--rule);
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg, #fff);
          transition: all 0.18s;
        }
        .luxury-card.selected .checkbox {
          background: var(--rose);
          border-color: var(--rose);
          color: #fff;
        }
        .calculator-sidebar {
          background: var(--surface, #fff);
          border: 1.5px solid var(--rule);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.04);
          position: sticky;
          top: 100px;
          color: var(--ink);
        }
        .mobile-savings-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--surface, #fff);
          border-top: 1px solid var(--rule);
          padding: 14px 20px;
          z-index: 50;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 -8px 24px rgba(0,0,0,0.08);
          color: var(--ink);
        }
        .mobile-savings-label {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 600;
        }
        .mobile-savings-amount {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          color: var(--rose);
          line-height: 1;
        }
        .mobile-savings-pct {
          font-size: 0.75rem;
          color: #10b981;
          font-weight: 700;
        }
        .calc-header {
          border-bottom: 1px solid var(--rule);
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
          background: var(--rose-light, #fff0e8);
          border: 1px dashed var(--rose);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .savings-amt {
          font-family: 'DM Serif Display', serif;
          font-size: 44px;
          color: var(--rose);
          line-height: 1.1;
          margin-top: 6px;
        }
        .savings-pct {
          font-size: 0.85rem;
          font-weight: 700;
          color: #10b981;
          margin-top: 4px;
        }
        .calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 12px;
          color: var(--ink);
        }
        .calc-row.total {
          border-top: 1px solid var(--rule);
          padding-top: 16px;
          font-weight: 700;
          font-size: 1.05rem;
        }
        .comparison-section {
          margin-top: 48px;
        }
        .dupe-comparison-card {
          background: var(--surface, #fff);
          border: 1.5px solid var(--rule);
          border-radius: 20px;
          padding: 0;
          margin-bottom: 24px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
          overflow: hidden;
          color: var(--ink);
        }
        .comparison-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 400;
          margin-bottom: 20px;
          margin-top: 52px;
          color: var(--ink);
        }
        .comparison-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0;
          padding: 20px 28px;
          background: var(--sand, #f6f4f2);
          border-bottom: 1px solid var(--rule);
          flex-wrap: wrap;
          gap: 10px;
        }
        .comparison-label {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--rose);
        }
        .purchases-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--muted);
        }
        .purchases-selector input {
          width: 52px;
          border: 1px solid var(--rule);
          background: var(--surface, #fff);
          color: var(--ink);
          border-radius: 6px;
          padding: 5px 8px;
          text-align: center;
          outline: none;
          font-size: 0.9rem;
        }
        .split-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        @media (max-width: 600px) {
          .split-row { grid-template-columns: 1fr; gap: 0; }
          .split-col.luxury-side {
            border-right: 0 !important;
            border-bottom: 1px solid var(--rule) !important;
          }
        }
        .split-col {
          display: flex;
          flex-direction: column;
          padding: 28px;
        }
        .split-col.luxury-side {
          border-right: 1px solid var(--rule);
          background: rgba(252, 39, 121, 0.015);
        }
        .split-col.dupe-side {
          background: rgba(16, 185, 129, 0.015);
        }
        .col-header {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 8px;
          font-weight: 700;
        }
        .split-price {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          margin-top: 10px;
          color: var(--ink);
        }
        .actives-label {
          font-size: 0.75rem;
          font-weight: 700;
          margin-top: 12px;
          color: var(--ink);
        }
        .actives-list {
          font-size: 0.8rem;
          color: var(--muted);
          line-height: 1.5;
          margin-top: 3px;
        }
        .dupe-brand {
          color: #10b981;
        }
        .dupe-savings {
          color: #10b981;
          font-weight: 700;
          font-size: 0.95rem;
        }
        .shop-dupe-btn {
          background: var(--rose);
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
          margin-top: 20px;
          transition: background 0.15s, transform 0.15s;
        }
        .shop-dupe-btn:hover {
          background: var(--rose);
          opacity: 0.9;
          transform: scale(1.02);
        }
        .next-btn {
          background: var(--rose);
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
          background: var(--rose);
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .mobile-lead-panel {
          display: none !important;
        }
        @media (max-width: 480px) {
          .dupe-finder-page { padding: 36px 16px 140px; }
          .calculator-sidebar { display: none; }
          .mobile-savings-bar { display: flex; }
          .mobile-lead-panel { display: block !important; }
        }
        .dupe-lead-panel {
          background: var(--black, #0c0a09);
          border-radius: 16px;
          padding: 24px;
          margin-top: 20px;
          text-align: center;
          border: 1px solid var(--rule);
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
          border-color: var(--rose);
        }
        .dupe-lead-form button {
          background: var(--rose);
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
          background: var(--rose);
          opacity: 0.9;
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
        /* Inline card expansion styles */
        .card-expanded-content {
          grid-column: span 3;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--rule);
          display: flex;
          flex-direction: column;
          gap: 16px;
          cursor: default;
        }
        .inline-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1px solid var(--rule);
          border-radius: 12px;
          overflow: hidden;
        }
        @media (max-width: 600px) {
          .inline-comparison {
            grid-template-columns: 1fr;
          }
          .inline-col.luxury-side {
            border-right: none !important;
            border-bottom: 1px solid var(--rule);
          }
        }
        .inline-col {
          display: flex;
          flex-direction: column;
          padding: 16px;
          gap: 6px;
        }
        .inline-col.luxury-side {
          border-right: 1px solid var(--rule);
          background: rgba(252, 39, 121, 0.015);
        }
        .inline-col.dupe-side {
          background: rgba(16, 185, 129, 0.015);
        }
        .inline-col-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          font-weight: 700;
        }
        .inline-price {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          color: var(--ink);
        }
        .inline-col.dupe-side .inline-price {
          color: #10b981;
        }
        .inline-actives {
          font-size: 0.78rem;
          color: var(--muted);
          line-height: 1.4;
        }
        .inline-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 4px;
        }
        .purchases-stepper {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
          color: var(--muted);
          font-weight: 600;
        }
        .stepper-controls {
          display: flex;
          align-items: center;
          border: 1px solid var(--rule);
          border-radius: 8px;
          overflow: hidden;
          background: var(--surface, #fff);
        }
        .stepper-controls button {
          border: none;
          background: none;
          color: var(--ink);
          padding: 4px 10px;
          font-size: 0.9rem;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.15s;
        }
        .stepper-controls button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .stepper-controls button:hover:not(:disabled) {
          background: var(--rule);
        }
        .stepper-controls span {
          padding: 0 8px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--ink);
        }
        .stepper-savings {
          color: #10b981;
          font-weight: 700;
        }
        .inline-shop-btn {
          background: var(--rose);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }
        .inline-shop-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
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
                  const activeDupe = currency !== "INR" && item.globalDupe ? item.globalDupe : item.dupe;
                  const matchingProduct = PRODUCTS.find(p => p.asin === activeDupe.asin);
                  const affiliateUrl = getAffiliateUrl(activeDupe.asin, activeDupe.name, activeDupe.brand, matchingProduct?.link || activeDupe.link);
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

                      {isSelected && (
                        <div className="card-expanded-content" onClick={(e) => e.stopPropagation()}>
                          <div className="inline-comparison">
                            <div className="inline-col luxury-side">
                              <span className="inline-col-label">High-End Luxury</span>
                              <div className="inline-price">{formatPrice(item.luxury.price)}</div>
                              <div className="inline-actives"><strong>Actives:</strong> {item.luxury.actives}</div>
                            </div>
                            <div className="inline-col dupe-side">
                              <span className="inline-col-label" style={{ color: "#10b981", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                Active Dupe Match <Check size={11} />
                              </span>
                              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--ink)", marginTop: "2px" }}>
                                {activeDupe.brand} — {activeDupe.name}
                              </div>
                              <p style={{ fontSize: "0.78rem", color: "var(--muted)", margin: "4px 0", lineHeight: 1.45 }}>
                                {activeDupe.description}
                              </p>
                              <div className="inline-actives"><strong>Actives:</strong> {activeDupe.actives}</div>
                              <div className="inline-price" style={{ marginTop: "auto", paddingTop: "8px" }}>
                                {formatPrice(activeDupe.price)}
                              </div>
                            </div>
                          </div>

                          <div className="inline-footer">
                            <div className="purchases-stepper">
                              <span>Purchases per year:</span>
                              <div className="stepper-controls">
                                <button
                                  type="button"
                                  onClick={() => handleCountChange(item.id, (purchasesPerYear[item.id] || 2) - 1)}
                                  disabled={(purchasesPerYear[item.id] || 2) <= 1}
                                >-</button>
                                <span>{purchasesPerYear[item.id] || 2}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCountChange(item.id, (purchasesPerYear[item.id] || 2) + 1)}
                                >+</button>
                              </div>
                              <span className="stepper-savings">
                                Saves {formatPrice((item.luxury.price - activeDupe.price) * (purchasesPerYear[item.id] || 2))}/yr
                              </span>
                            </div>

                            <a
                              href={affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-shop-btn"
                            >
                              Shop Dupe on {amazonLabel} <ArrowRight size={13} />
                            </a>
                          </div>
                        </div>
                      )}
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

          <div className="calculator-sidebar">
            <div className="calc-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 className="calc-title">Savings Summary</h3>
                <p style={{ fontSize: "0.8rem", color: "#8c8179", margin: 0 }}>Based on your selections</p>
              </div>
              {selectedItems.length > 0 && (
                <button
                  onClick={() => setSelectedItems([])}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--rose)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--rose-light)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                >
                  Clear All
                </button>
              )}
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

        {/* Mobile sticky savings bar */}
        <div className="mobile-savings-bar">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="mobile-savings-label">Annual Savings</div>
              {selectedItems.length > 0 && (
                <button
                  onClick={() => setSelectedItems([])}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--rose)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: "2px 6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}
                >
                  Clear All
                </button>
              )}
            </div>
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
          <div className="dupe-lead-panel mobile-lead-panel" style={{ marginTop: "24px" }}>
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


      </div>
    </main>
  );
}

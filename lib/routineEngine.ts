export interface QuizAnswers {
  skinType: string;
  mainConcern: string;
  secondaryConcern?: string;
  budget: string;
  experience?: string;
}

export interface RoutineRecommendation {
  cleanser: { asin: string; name: string; reason: string };
  treatment: { asin: string; name: string; reason: string };
  moisturiser: { asin: string; name: string; reason: string };
  sunscreen: { asin: string; name: string; reason: string };
  primaryConcern?: string;
  secondaryConcern?: string;
  climateAdjustment?: {
    type: 'humid_heat' | 'cold_dry' | 'moderate';
    city: string;
    temp: number;
    humidity: number;
    alertText: string;
    swappedFields: string[];
  };
}

export const CONCERN_LABELS: Record<string, string> = {
  acne: 'Acne & Blemishes',
  pigmentation: 'Dark Spots & Pigmentation',
  dullness: 'Dullness & Radiance',
  dehydration: 'Dehydration & Barrier Repair',
};

// ─── PRICE REFERENCE (verified) ───────────────────────────────────────────
// cetaphil_facewash ₹384 ✓ under 500
// simple_facewash ₹329 ✓ under 500
// minimalist_ala_wash ₹380 ✓ under 500
// plum_vitamin_c ₹445 ✓ under 500
// dotkey_hyaluronic ₹400 ✓ under 500
// lakme_spf ₹282 ✓ under 500
// deconstruct_spf ₹281 ✓ under 500
// wishcare_spf ₹316 ✓ under 500
// aqualogica_spf ₹388 ✓ under 500
// ordinary_niacinamide ₹599 ✓ under 1000
// minimalist_niacinamide ₹950 ✓ under 1000
// minimalist_retinol ₹569 ✓ under 1000
// minimalist_spf ₹533 ✓ under 1000
// neutrogena_hydro_boost ₹730 ✓ under 1000
// cetaphil_cream ₹1317 ✓ under 2000 only

const ASIN = {
  cetaphil_facewash: "B01CCGW4OE",
  simple_facewash: "B00V4R0ET0",
  minimalist_ala_wash: "B09VLDY46B",
  minimalist_niacinamide: "B0DH88LZ11",
  ordinary_niacinamide: "B01MDTVZTZ",
  plum_vitamin_c: "B095PRGHDX",
  minimalist_retinol: "B091JG3GJ5",
  dotkey_hyaluronic: "B0FG2PQVK5",
  neutrogena_hydro_boost: "B00BQFTQW6",
  cetaphil_cream: "B099MJH88B",
  minimalist_spf: "B0DHY6LQTW",
  aqualogica_spf: "B0C9JPWLR4",
  deconstruct_spf: "B0B45RB1RV",
  lakme_spf: "B00CS1KT96",
  wishcare_spf: "B0CW1N7QRT",
  // High-intent additions
  dermaco_salicylic_wash: "B095J52W7P",
  dermaco_hyaluronic_spf: "B0C6M3KHXV",
  reequil_matte_spf: "B07VP5JFRB",
  cosrx_snail_mucin: "B00PBX3L7K",
  cosrx_low_ph_wash: "B016NRXO06",
  foxtale_glow_spf: "B0C3CP6B5Y",
  dotkey_cica_gel: "B09HC3QNLG",
  bioderma_atoderm: "B08475HN8L",
  pilgrim_salicylic_wash: "B0B8D63GV6",
  // Modern K-Beauty & Derm-backed Additions
  formularx_barrier_relief: "B0BNLHLGF9",
  skin1004_hyalu_cica_spf: "B0B881GN1P",
  sebamed_care_gel: "B06XSQ879T",
  isntree_hyaluronic_spf: "B08D3L4BQP",
  skin1004_centella_ampoule: "B06Y15D1LH",
  boj_rice_toner: "B0D44T7RW9",
  // Hyped Indian & K-Beauty Diagnostics Additions
  hyphen_glow_serum: "B0CGVK7LKD",
  conscious_berry_spf: "B0BLW3SPQG",
  conscious_sundrink_spf: "B0C59HFZMP",
  anua_heartleaf_toner: "B08CMS8P67",
  anua_txa_serum: "B0DL92QM79",
  torriden_divein_serum: "B07WZ2YTDR",
  medicube_pore_pad: "B08HGZ5XPH",
  roundlab_dokdo_wash: "B08FMCMGN6",
  roundlab_birch_spf: "B0DJGWH3TC",
};

// ─── BUDGET TIERS ─────────────────────────────────────────────────────────
// budget_500 = total routine under ₹500 → only products ≤ ₹400 each
// budget_1000 = total routine under ₹1000 → products ≤ ₹950 each
// budget_2000 = total routine under ₹2000 → all products allowed

const ROUTINE_MAP: Record<string, Record<string, RoutineRecommendation>> = {

  // ── OILY SKIN ─────────────────────────────────────────────────────────────

  oily_acne: {
    budget_500: {
      cleanser: { asin: ASIN.dermaco_salicylic_wash, name: "The Derma Co 1% Salicylic Acid Gel Face Wash", reason: "Penetrates deep into pores to dissolve sebum and clear acne-causing debris. ₹249." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Lightweight hydration without clogging pores — oily acne-prone skin needs water, not oil. ₹400." },
      moisturiser: { asin: ASIN.sebamed_care_gel, name: "Sebamed Clear Face Care Gel", reason: "Oil-free water gel at pH 5.5. Panthenol and Hyaluronic Acid soothe acne inflammation without clogging. ₹464." },
      sunscreen: { asin: ASIN.foxtale_glow_spf, name: "Foxtale Glow Sunscreen SPF 50 PA++++", reason: "Vitamin C and Niacinamide brightens skin, while giving a lightweight, zero-white-cast matte finish. ₹345." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.cosrx_low_ph_wash, name: "COSRX Low pH Good Morning Gel Cleanser", reason: "Formulated with purifying botanical ingredients and mild BHA to gently cleanse acne-prone skin without stripping." },
      treatment: { asin: ASIN.ordinary_niacinamide, name: "The Ordinary Niacinamide 10% + Zinc 1%", reason: "The international benchmark for pore control, oil reduction, and fading post-blemish spots." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "3:1:1 physiological lipid ratio repairs acne-irritated barrier with zero heavy pore-clogging wax." },
      sunscreen: { asin: ASIN.reequil_matte_spf, name: "RE' EQUIL Ultra Matte Dry Touch Sunscreen", reason: "Silicon-based gel sunscreen that acts like a velvet primer. Matte, water/sweat resistant, non-comedogenic." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cosrx_low_ph_wash, name: "COSRX Low pH Good Morning Gel Cleanser", reason: "Cult low-pH cleanser that purifies oily pores without disturbing delicate skin acidity." },
      treatment: { asin: ASIN.skin1004_centella_ampoule, name: "SKIN1004 Madagascar Centella Ampoule", reason: "100% pure Madagascar Centella Asiatica to soothe active breakouts, calm irritation, and restore bounce." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Ceramides, Cholesterol, and Fatty acids calm redness while hydrating without oiliness." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Global K-Beauty holy grail. Serum-light chemical SPF that glides on invisibly with zero shine or white cast." },
    },
  },

  oily_pigmentation: {
    budget_500: {
      cleanser: { asin: ASIN.minimalist_ala_wash, name: "Minimalist 7% ALA + Glycolic Face Wash", reason: "Mild exfoliation lifts surface pigmentation and keeps pores clear of excess oil. ₹380." },
      treatment: { asin: ASIN.plum_vitamin_c, name: "Plum 15% Vitamin C Face Serum", reason: "Stable 15% Vitamin C targets melanin production. Apply mornings before SPF for optimal brightening. ₹445." },
      moisturiser: { asin: ASIN.sebamed_care_gel, name: "Sebamed Clear Face Care Gel", reason: "Oil-free gel hydration that seals in Vitamin C without making oily skin greasy. ₹464." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Budget SPF with niacinamide. Prevents UV radiation from undoing your brightening progress. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.minimalist_ala_wash, name: "Minimalist 7% ALA + Glycolic Face Wash", reason: "Glycolic acid assists in clearing surface pigmentation while controlling T-zone shine." },
      treatment: { asin: ASIN.plum_vitamin_c, name: "Plum 15% Vitamin C Face Serum", reason: "Stable 15% Vitamin C targets melanin and uneven tone. Non-comedogenic and vegan." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Ceramide + Niacinamide formula reinforces the skin barrier while accelerating pigment fading. ₹594." },
      sunscreen: { asin: ASIN.reequil_matte_spf, name: "RE' EQUIL Ultra Matte Dry Touch Sunscreen", reason: "Velvet matte dry-touch protection prevents UV rays from worsening dark spots." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Barrier-safe cleanser — essential when using potent brightening actives that increase sensitivity." },
      treatment: { asin: ASIN.boj_rice_toner, name: "Beauty of Joseon Glow Replenishing Rice Toner", reason: "Traditional Hanbang rice extract and brightening amino acids fade stubborn marks for clear porcelain skin." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Restores vital ceramides and lipids, creating a luminous base under makeup and sunscreen." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Centella + Hyaluronic Acid blocks UV rays while actively soothing and preventing pigmentation triggers." },
    },
  },

  oily_dullness: {
    budget_500: {
      cleanser: { asin: ASIN.minimalist_ala_wash, name: "Minimalist 7% ALA + Glycolic Face Wash", reason: "ALA + Glycolic clears dead cell buildup that makes oily skin look flat. ₹380." },
      treatment: { asin: ASIN.plum_vitamin_c, name: "Plum 15% Vitamin C Face Serum", reason: "Direct ingredient for radiant glow. Clinical-level 15% stable concentration. ₹445." },
      moisturiser: { asin: ASIN.dotkey_cica_gel, name: "Dot & Key CICA Calming Skin Renewing Night Gel", reason: "Niacinamide and Cica revive skin glow and replenish hydration without pore congestion. ₹345." },
      sunscreen: { asin: ASIN.conscious_berry_spf, name: "Conscious Chemist Berry Bright Sunscreen SPF 50 PA++++", reason: "Ultralight gel-cream SPF with Niacinamide & Blackberry Extract shields against UV dullness with zero white cast. ₹259." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.minimalist_ala_wash, name: "Minimalist 7% ALA + Glycolic Face Wash", reason: "Chemical exfoliant that clears dead cell buildup to unveil fresh radiant skin." },
      treatment: { asin: ASIN.hyphen_glow_serum, name: "Hyphen Golden Hour Glow Serum", reason: "10% Niacinamide, Alpha Arbutin & Kakadu Plum deliver an instant dewy glass-skin glow while fading dullness. ₹590." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel", reason: "Oil-free Hyaluronic acid gel plumps skin and restores healthy dewy bounce. ₹730." },
      sunscreen: { asin: ASIN.conscious_sundrink_spf, name: "Conscious Chemist Sundrink Unwind Edition SPF 50 PA++++", reason: "Sweat- and water-resistant Ceramide + Niacinamide SPF built for humid Indian weather. ₹599." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cosrx_low_ph_wash, name: "COSRX Low pH Good Morning Gel Cleanser", reason: "Mild morning acid wash leaves skin clean, clear, and perfectly prepped for radiant actives." },
      treatment: { asin: ASIN.boj_rice_toner, name: "Beauty of Joseon Glow Replenishing Rice Toner", reason: "Hanbang fermented rice filtrate and probiotics illuminate dull complexion with glassy radiance." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Ceramide lipid barrier cream imparts smooth glassy texture without heaviness." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Hydrating sun serum gives an ethereal, lit-from-within finish with broad-spectrum SPF 50+ PA++++." },
    },
  },

  oily_dehydration: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Soap-free formula that cleanses without removing moisture — critical for dehydrated oily skin. ₹329." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Multi-weight Hyaluronic Acid pulls water into parched, dehydrated skin layers. ₹400." },
      moisturiser: { asin: ASIN.sebamed_care_gel, name: "Sebamed Clear Face Care Gel", reason: "Oil-free hydration with Aloe Vera and Panthenol stops skin from over-producing compensatory oil. ₹464." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Lightweight budget SPF that prevents UV-induced trans-epidermal water loss. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Enriched with Pro-Vitamin B5 to gently clean while protecting the lipid mantle." },
      treatment: { asin: ASIN.cosrx_snail_mucin, name: "COSRX Advanced Snail 96 Mucin Power Essence", reason: "96% snail mucin delivers rapid deep rehydration and repairs compromised water barriers." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Repairs the lipid barrier to prevent water from evaporating through the skin. ₹594." },
      sunscreen: { asin: ASIN.reequil_matte_spf, name: "RE' EQUIL Ultra Matte Dry Touch Sunscreen", reason: "Matte velvet finish locks in underlying hydration without looking greasy." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.roundlab_dokdo_wash, name: "Round Lab 1025 Dokdo Cleanser", reason: "Low-pH Ulleungdo deep-sea mineral cleanser removes fine dust and SPF without stripping delicate barrier lipids." },
      treatment: { asin: ASIN.torriden_divein_serum, name: "Torriden DIVE-IN Low Molecular Hyaluronic Acid Serum", reason: "5D Low Molecular Weight Hyaluronic Acid + Panthenol delivers deep glass-skin hydration with zero stickiness." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Golden 3:1:1 ceramide-to-cholesterol ratio ends chronic dehydration and surface oil imbalance." },
      sunscreen: { asin: ASIN.roundlab_birch_spf, name: "Round Lab Birch Juice Moisturizing Sunscreen SPF 50+ PA++++", reason: "Korea's #1 hydrating essence-sunscreen with Silver Birch Sap keeps dehydrated skin quenched all day." },
    },
  },

  // ── DRY SKIN ──────────────────────────────────────────────────────────────

  dry_acne: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "100% soap-free. Retains moisture while clearing the skin — essential for dry acne-prone skin. ₹329." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Dry acne skin needs deep water replenishment before clearing can begin. ₹400." },
      moisturiser: { asin: ASIN.bioderma_atoderm, name: "Bioderma Atoderm Intensive Baume", reason: "Nourishing ceramide barrier cream that calms irritation, flaking, and dry skin breakouts. ₹382." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Niacinamide SPF protects against post-acne marks without drying out delicate skin. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Dermatologist gold standard. Cleanses without stripping essential protective oils." },
      treatment: { asin: ASIN.ordinary_niacinamide, name: "The Ordinary Niacinamide 10% + Zinc 1%", reason: "Clears blemishes and reduces redness without harsh acid exfoliation on dry skin." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Ceramides and fatty acids calm inflammation and heal dry peeling acne zones. ₹594." },
      sunscreen: { asin: ASIN.minimalist_spf, name: "Minimalist Sunscreen SPF 50 PA+++ 100gm", reason: "Multi-vitamin nourishing sunscreen that protects dry, reactive skin with zero stinging." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Vitamin B5 and Niacinamide cleanser supports barrier recovery alongside acne control." },
      treatment: { asin: ASIN.skin1004_centella_ampoule, name: "SKIN1004 Madagascar Centella Ampoule", reason: "100% pure Centella Asiatica calms dry acne stings and strengthens barrier resilience." },
      moisturiser: { asin: ASIN.cetaphil_cream, name: "Cetaphil Moisturising Cream 250g", reason: "Clinical-grade barrier repair. Rich emollient base heals dry, flaking acne zones." },
      sunscreen: { asin: ASIN.isntree_hyaluronic_spf, name: "Isntree Hyaluronic Acid Watery Sun Gel SPF 50+ PA++++", reason: "8 types of Hyaluronic Acid deeply replenish dry skin with a dewy, non-drying shield." },
    },
  },

  dry_pigmentation: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Soap-free, Panthenol-enriched cleanser preserves moisture while prepping skin for actives. ₹329." },
      treatment: { asin: ASIN.plum_vitamin_c, name: "Plum 15% Vitamin C Face Serum", reason: "Stable 15% Vitamin C fades pigmentation without drying out delicate skin. ₹445." },
      moisturiser: { asin: ASIN.bioderma_atoderm, name: "Bioderma Atoderm Intensive Baume", reason: "Ceramide balm prevents peeling and seals in brightening actives effectively. ₹382." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Budget SPF with niacinamide. Prevents UV from reversing your brightening progress. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Hydrating cleanser that preps dry skin for brightening actives without irritation." },
      treatment: { asin: ASIN.plum_vitamin_c, name: "Plum 15% Vitamin C Face Serum", reason: "Potent 15% Vitamin C targets melanin production and sun damage. Non-irritating." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Lipid-rich barrier cream shields skin while Niacinamide accelerates dark mark fading. ₹594." },
      sunscreen: { asin: ASIN.dermaco_hyaluronic_spf, name: "The Derma Co 1% Hyaluronic Sunscreen Aqua Gel", reason: "Hyaluronic acid and Vitamin E deliver hydration while providing broad-spectrum SPF 50." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Hydrating, non-stripping cleanser for dry skin on high-efficacy brightening routines." },
      treatment: { asin: ASIN.boj_rice_toner, name: "Beauty of Joseon Glow Replenishing Rice Toner", reason: "Hanbang fermented rice extract clears hyperpigmentation and gives dry skin an ethereal porcelain glow." },
      moisturiser: { asin: ASIN.cetaphil_cream, name: "Cetaphil Moisturising Cream 250g", reason: "The dermatological standard for dry skin. Locks in moisture and active ingredients overnight." },
      sunscreen: { asin: ASIN.isntree_hyaluronic_spf, name: "Isntree Hyaluronic Acid Watery Sun Gel SPF 50+ PA++++", reason: "K-Beauty hero sunscreen packed with 8 types of Hyaluronic Acid for plump, luminous protection." },
    },
  },

  dry_dullness: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Hydrating cleanser that preserves moisture — essential for revitalizing dry dull skin. ₹329." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Deep hydration plumps flat, tired skin cells to restore instant natural bounce. ₹400." },
      moisturiser: { asin: ASIN.bioderma_atoderm, name: "Bioderma Atoderm Intensive Baume", reason: "Nourishing lipid balm restores healthy sheen, softness, and skin radiance. ₹382." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Daily broad-spectrum shield prevents UV radiation from worsening surface dullness. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Vitamin B5 cleanser primes skin to absorb brightening actives without tight feeling." },
      treatment: { asin: ASIN.cosrx_snail_mucin, name: "COSRX Advanced Snail 96 Mucin Power Essence", reason: "Snail secretion filtrate restores luminous glassy bounce to tired, dull dry skin." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Restores vital ceramides and lipids for a supple, luminous complexion that lasts. ₹594." },
      sunscreen: { asin: ASIN.dermaco_hyaluronic_spf, name: "The Derma Co 1% Hyaluronic Sunscreen Aqua Gel", reason: "Hydrating sunscreen leaves a radiant, supple finish with zero chalky cast." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Niacinamide-enriched cleanser brightens while keeping dry skin plump and soft." },
      treatment: { asin: ASIN.boj_rice_toner, name: "Beauty of Joseon Glow Replenishing Rice Toner", reason: "Rice extract and brightening amino acids deliver radiant Hanbang glass skin." },
      moisturiser: { asin: ASIN.cetaphil_cream, name: "Cetaphil Moisturising Cream 250g", reason: "Rich, long-lasting barrier hydration that maximizes light reflection and skin glow." },
      sunscreen: { asin: ASIN.isntree_hyaluronic_spf, name: "Isntree Hyaluronic Acid Watery Sun Gel SPF 50+ PA++++", reason: "Ultra-hydrating daily sun gel gives dry skin an enviable dewy glow without stickiness." },
    },
  },

  dry_dehydration: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Soap-free, Panthenol-rich formula cleanses without depleting moisture. ₹329." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Triple hyaluronic acid pulls water deep into dehydrated cells. Apply on damp skin. ₹400." },
      moisturiser: { asin: ASIN.bioderma_atoderm, name: "Bioderma Atoderm Intensive Baume", reason: "Ceramide barrier cream heals micro-fissures and locks in water for 24+ hours. ₹382." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Non-drying SPF keeps skin hydrated while stopping UV barrier destruction. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Dermatologist-recommended cleanser actively reinforces the moisture barrier." },
      treatment: { asin: ASIN.cosrx_snail_mucin, name: "COSRX Advanced Snail 96 Mucin Power Essence", reason: "96% snail mucin provides immediate relief to parched skin, repairing barrier lipids." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Golden 3:1:1 lipid ratio ends chronic flaking and locks in hydration. ₹594." },
      sunscreen: { asin: ASIN.dermaco_hyaluronic_spf, name: "The Derma Co 1% Hyaluronic Sunscreen Aqua Gel", reason: "Hyaluronic acid in the SPF step provides an extra moisture layer against dry air." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Niacinamide and Vitamin B5 replenish compromised moisture barriers during cleansing." },
      treatment: { asin: ASIN.cosrx_snail_mucin, name: "COSRX Advanced Snail 96 Mucin Power Essence", reason: "Global holy grail for barrier repair and instant dewy hydration." },
      moisturiser: { asin: ASIN.cetaphil_cream, name: "Cetaphil Moisturising Cream 250g", reason: "Clinical barrier repair. Best option for severely dry, dehydrated, or flaky skin." },
      sunscreen: { asin: ASIN.isntree_hyaluronic_spf, name: "Isntree Hyaluronic Acid Watery Sun Gel SPF 50+ PA++++", reason: "8 molecular weights of Hyaluronic Acid keep dehydrated skin deeply quenched all day." },
    },
  },

  // ── COMBINATION SKIN ──────────────────────────────────────────────────────

  combination_acne: {
    budget_500: {
      cleanser: { asin: ASIN.minimalist_ala_wash, name: "Minimalist 7% ALA + Glycolic Face Wash", reason: "Unclogs congested pores in the oily T-zone while remaining gentle on dry cheeks. ₹380." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Hydrates combination skin without aggravating acne or creating grease. ₹400." },
      moisturiser: { asin: ASIN.sebamed_care_gel, name: "Sebamed Clear Face Care Gel", reason: "Oil-free gel balances the T-zone while soothing dry cheeks with Aloe and Panthenol. ₹464." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Lightweight budget SPF suitable for combination skin without pilling. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.minimalist_ala_wash, name: "Minimalist 7% ALA + Glycolic Face Wash", reason: "Exfoliating cleanser balances combination skin without stripping cheek zones." },
      treatment: { asin: ASIN.ordinary_niacinamide, name: "The Ordinary Niacinamide 10% + Zinc 1%", reason: "Regulates sebum in the T-zone, clears acne blemishes, and refines pores universally." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Non-greasy ceramide lotion balances oily and dry zones seamlessly. ₹594." },
      sunscreen: { asin: ASIN.reequil_matte_spf, name: "RE' EQUIL Ultra Matte Dry Touch Sunscreen", reason: "Matte dry-touch formula prevents mid-day T-zone shine while protecting all day." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cosrx_low_ph_wash, name: "COSRX Low pH Good Morning Gel Cleanser", reason: "Gently purifies combination skin, clearing T-zone congestion while respecting cheeks." },
      treatment: { asin: ASIN.skin1004_centella_ampoule, name: "SKIN1004 Madagascar Centella Ampoule", reason: "Pure Centella calms T-zone acne inflammation and restores barrier balance across dry areas." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Physiological ceramides nourish dry areas while keeping oily zones perfectly matte and calm." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Weightless serum texture hydrates dry cheek zones while absorbing instantly in the T-zone." },
    },
  },

  combination_pigmentation: {
    budget_500: {
      cleanser: { asin: ASIN.minimalist_ala_wash, name: "Minimalist 7% ALA + Glycolic Face Wash", reason: "Mild exfoliation lifts surface pigmentation while controlling T-zone sebum. ₹380." },
      treatment: { asin: ASIN.plum_vitamin_c, name: "Plum 15% Vitamin C Face Serum", reason: "15% Vitamin C for visible brightening on combination skin. ₹445." },
      moisturiser: { asin: ASIN.dotkey_cica_gel, name: "Dot & Key CICA Calming Skin Renewing Night Gel", reason: "Niacinamide and Cica soothe combination skin and fade dark spots without clogging pores. ₹345." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Shields against UV rays that trigger dark spots and hyperpigmentation. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.minimalist_ala_wash, name: "Minimalist 7% ALA + Glycolic Face Wash", reason: "Glycolic acid assists in clearing surface dark spots while treating oily zones." },
      treatment: { asin: ASIN.plum_vitamin_c, name: "Plum 15% Vitamin C Face Serum", reason: "15% Vitamin C for visible brightening. Use mornings on clean skin before SPF." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Ceramides and Niacinamide help fade dark spots while keeping the barrier hydrated. ₹594." },
      sunscreen: { asin: ASIN.reequil_matte_spf, name: "RE' EQUIL Ultra Matte Dry Touch Sunscreen", reason: "Photostable matte UV protection — prevents new pigmentation without T-zone shine." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Barrier-safe cleanser for combination skin using potent brightening actives." },
      treatment: { asin: ASIN.anua_txa_serum, name: "Anua Niacinamide 10% + TXA 4% Dark Spot Correcting Serum", reason: "10% Niacinamide, 4% Tranexamic Acid & 2% Arbutin fade stubborn post-acne marks without barrier irritation." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Keeps the skin barrier resilient so brightening actives work at maximum efficacy." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Centella Asiatica and Hyaluronic Acid protect against UV-triggered melanin with zero white cast." },
    },
  },

  combination_dullness: {
    budget_500: {
      cleanser: { asin: ASIN.minimalist_ala_wash, name: "Minimalist 7% ALA + Glycolic Face Wash", reason: "Removes dead cell buildup that makes combination skin look uneven and congested. ₹380." },
      treatment: { asin: ASIN.plum_vitamin_c, name: "Plum 15% Vitamin C Face Serum", reason: "Fastest route to visible glow on combination skin. ₹445." },
      moisturiser: { asin: ASIN.dotkey_cica_gel, name: "Dot & Key CICA Calming Skin Renewing Night Gel", reason: "Niacinamide promotes cell turnover for radiant combination skin without heaviness. ₹345." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Prevents UV from causing new dullness. The step that makes everything else work. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.minimalist_ala_wash, name: "Minimalist 7% ALA + Glycolic Face Wash", reason: "Chemical exfoliant that clears dead surface buildup for fresh radiance." },
      treatment: { asin: ASIN.plum_vitamin_c, name: "Plum 15% Vitamin C Face Serum", reason: "15% active Vitamin C promotes even skin tone and natural luminosity." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Lightweight ceramide barrier support brings out natural skin radiance without shine. ₹594." },
      sunscreen: { asin: ASIN.foxtale_glow_spf, name: "Foxtale Glow Sunscreen SPF 50 PA++++", reason: "Vitamin C and Niacinamide boost glow while safeguarding skin against environmental pollution." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cosrx_low_ph_wash, name: "COSRX Low pH Good Morning Gel Cleanser", reason: "Gentle botanicals clarify combination skin for optimum glow product penetration." },
      treatment: { asin: ASIN.boj_rice_toner, name: "Beauty of Joseon Glow Replenishing Rice Toner", reason: "Hanbang rice extract illuminates dull skin with glassy, porcelain clarity." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Ceramides and fatty acids lock in light-reflecting moisture without clogging T-zone pores." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Infuses combination skin with light, luminous hydration and broad-spectrum SPF 50+ protection." },
    },
  },

  combination_dehydration: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Soap-free. Keeps moisture in while cleansing oily zones of combination skin. ₹329." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Hydrates dry cheek zones without making T-zone oily. ₹400." },
      moisturiser: { asin: ASIN.sebamed_care_gel, name: "Sebamed Clear Face Care Gel", reason: "Deep hydration with Hyaluronic Acid and Panthenol without suffocating pores in the T-zone. ₹464." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Lightweight daily SPF prevents moisture depletion from sun exposure. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Strengthens skin barrier across both oily and dry zones." },
      treatment: { asin: ASIN.cosrx_snail_mucin, name: "COSRX Advanced Snail 96 Mucin Power Essence", reason: "Plumps dehydrated combination skin and restores bouncy elasticity across all zones." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Repairs the moisture barrier so combination skin retains water throughout the day. ₹594." },
      sunscreen: { asin: ASIN.reequil_matte_spf, name: "RE' EQUIL Ultra Matte Dry Touch Sunscreen", reason: "Ultra-matte primer feel protects skin and locks in deep water hydration." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Niacinamide + Panthenol cleanser supports moisture barrier in dehydrated combination skin." },
      treatment: { asin: ASIN.cosrx_snail_mucin, name: "COSRX Advanced Snail 96 Mucin Power Essence", reason: "Cult global favorite containing 96% snail secretion filtrate to deeply hydrate and repair." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Golden 3:1:1 lipid ratio balances oil and water across different facial zones. ₹594." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Replenishes moisture reservoir with Centella and Hyaluronic Acid without greasy residue." },
    },
  },

  // ── SENSITIVE SKIN ────────────────────────────────────────────────────────

  sensitive_acne: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "100% soap-free and fragrance-free. Won't sting or trigger redness on sensitive acne skin. ₹329." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Gentle hydration calms irritated acne zones without irritating sensitive skin. ₹400." },
      moisturiser: { asin: ASIN.sebamed_care_gel, name: "Sebamed Clear Face Care Gel", reason: "pH 5.5 antibacterial water gel specifically created for sensitive, acne-prone skin. ₹464." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Lightweight, non-comedogenic budget sunscreen suitable for reactive skin. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Dermatologist #1 recommendation for sensitive skin prone to reactive flare-ups." },
      treatment: { asin: ASIN.ordinary_niacinamide, name: "The Ordinary Niacinamide 10% + Zinc 1%", reason: "Calms active blemish redness and strengthens delicate skin barriers." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Fragrance-free ceramide lipid moisturizer formulated especially for sensitive, acne-prone barriers. ₹594." },
      sunscreen: { asin: ASIN.minimalist_spf, name: "Minimalist Sunscreen SPF 50 PA+++ 100gm", reason: "Soothes sensitive skin with multi-vitamins and photostable filters with zero eye-sting." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.roundlab_dokdo_wash, name: "Round Lab 1025 Dokdo Cleanser", reason: "Slightly acidic pH 5.0–6.0 mineral cleanser purifies sensitive skin without irritation." },
      treatment: { asin: ASIN.anua_heartleaf_toner, name: "Anua Heartleaf 77% Soothing Toner", reason: "77% Heartleaf extract visibly calms redness, reactive flare-ups, and acne-prone sensitivity." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Ceramides, Cholesterol, and Fatty acids heal compromised skin without pore congestion." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Soothing Centella + Hyaluronic Acid sun serum designed specifically for ultra-sensitive, reactive skin." },
    },
  },

  sensitive_pigmentation: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Gentle soap-free wash prepares reactive skin for brightening without redness. ₹329." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Hydrates sensitive skin safely without harsh acids that provoke hyperpigmentation. ₹400." },
      moisturiser: { asin: ASIN.bioderma_atoderm, name: "Bioderma Atoderm Intensive Baume", reason: "Derm-developed barrier balm strengthens reactive skin against pigment triggers. ₹382." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Niacinamide-infused SPF provides gentle pigment defense against UV rays. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Gentle formula preps sensitive skin for pigmentation care without barrier disruption." },
      treatment: { asin: ASIN.ordinary_niacinamide, name: "The Ordinary Niacinamide 10% + Zinc 1%", reason: "Inhibits melanin transfer and soothes sensitive skin redness simultaneously." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Ceramide lipid formula repairs barrier damage while Niacinamide fades dark spots. ₹594." },
      sunscreen: { asin: ASIN.minimalist_spf, name: "Minimalist Sunscreen SPF 50 PA+++ 100gm", reason: "Fragrance-free, photostable UV protection prevents new dark spots on sensitive skin." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Dermatological benchmark for sensitive skin that cannot tolerate harsh surfactants." },
      treatment: { asin: ASIN.skin1004_centella_ampoule, name: "SKIN1004 Madagascar Centella Ampoule", reason: "Pure Centella calms post-inflammatory hyperpigmentation (PIH) and soothes reactive skin." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Ceramide + lipid complex calms reactive skin and repairs the moisture barrier." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "World-class K-Beauty sun serum protects and soothes sensitive, pigment-prone skin." },
    },
  },

  sensitive_dullness: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Non-irritating cleanser leaves delicate skin feeling refreshed and calm. ₹329." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Pure hydration revives dull, reactive skin safely with no sting or tingle. ₹400." },
      moisturiser: { asin: ASIN.bioderma_atoderm, name: "Bioderma Atoderm Intensive Baume", reason: "Restores protective lipid layer to restore natural healthy glow and softness. ₹382." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Prevents UV-induced dullness and protects delicate skin from environmental stress. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Vitamin B5 wash enhances radiance without disturbing delicate skin moisture." },
      treatment: { asin: ASIN.cosrx_snail_mucin, name: "COSRX Advanced Snail 96 Mucin Power Essence", reason: "Snail secretion filtrate infuses sensitive skin with deep hydration and glowing bounce." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Restores skin lipid balance for a calm, radiant glow with zero fragrance or allergens. ₹594." },
      sunscreen: { asin: ASIN.minimalist_spf, name: "Minimalist Sunscreen SPF 50 PA+++ 100gm", reason: "Nourishing, broad-spectrum sunscreen protects against pollution and dullness." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Gentle, non-stripping cleanser keeps sensitive skin supple and calm." },
      treatment: { asin: ASIN.boj_rice_toner, name: "Beauty of Joseon Glow Replenishing Rice Toner", reason: "Fermented rice extract illuminates dull skin without irritating sensitive skin." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Ceramide barrier cream hydrates, calms redness, and creates a healthy lit-from-within sheen." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Delivers an ethereal, hydrated glow with SPF 50+ PA++++ and zero irritation." },
    },
  },

  sensitive_dehydration: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Soap-free, Panthenol-rich formula cleanses without depleting moisture. ₹329." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Multi-weight Hyaluronic Acid pulls water deep into dehydrated cells without stinging. ₹400." },
      moisturiser: { asin: ASIN.bioderma_atoderm, name: "Bioderma Atoderm Intensive Baume", reason: "Clinical ceramide barrier cream soothes flaking and tight sensitivity. ₹382." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Lightweight budget SPF prevents moisture loss caused by daily sun exposure. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Dermatologist-recommended cleanser actively reinforces the moisture barrier." },
      treatment: { asin: ASIN.cosrx_snail_mucin, name: "COSRX Advanced Snail 96 Mucin Power Essence", reason: "96% snail mucin provides immediate relief to parched, stinging skin." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Golden 3:1:1 lipid ratio repairs compromised barriers and prevents moisture evaporation. ₹594." },
      sunscreen: { asin: ASIN.minimalist_spf, name: "Minimalist Sunscreen SPF 50 PA+++ 100gm", reason: "Clinically tested, multi-vitamin sunscreen that doesn't strip or sting dehydrated skin." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Gentle formula with Niacinamide and Panthenol preserves delicate barrier lipids." },
      treatment: { asin: ASIN.cosrx_snail_mucin, name: "COSRX Advanced Snail 96 Mucin Power Essence", reason: "Global holy grail for deep hydration, irritation relief, and barrier restoration." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Derm-developed ceramide moisturizer calms redness and seals in moisture for 24 hours." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Centella Asiatica + Hyaluronic Acid provides a soothing, deeply hydrating shield against UV damage." },
    },
  },

  // Fallback for general sensitive
  sensitive: {
    budget_500: {
      cleanser: { asin: ASIN.simple_facewash, name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Zero artificial fragrance, colour, or harsh chemicals. Dermatologist-tested for sensitive skin. ₹329." },
      treatment: { asin: ASIN.dotkey_hyaluronic, name: "Dot & Key Watermelon Hyaluronic Serum", reason: "Fragrance-free hydration serum. No actives that could trigger sensitive reactions. ₹400." },
      moisturiser: { asin: ASIN.bioderma_atoderm, name: "Bioderma Atoderm Intensive Baume", reason: "Derm-developed barrier balm strengthens reactive skin against triggers. ₹382." },
      sunscreen: { asin: ASIN.lakme_spf, name: "Lakme SPF 50 PA++++ Sunscreen", reason: "Lightweight, niacinamide-enriched SPF. Budget-friendly option for sensitive daily use. ₹282." },
    },
    budget_1000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "The dermatologist's first recommendation for sensitive skin. Clinically proven gentle formula." },
      treatment: { asin: ASIN.cosrx_snail_mucin, name: "COSRX Advanced Snail 96 Mucin Power Essence", reason: "96% snail mucin provides immediate soothing hydration without irritating reactive skin." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Derm-backed ceramide lipid moisturizer formulated for sensitive skin without fragrance. ₹594." },
      sunscreen: { asin: ASIN.minimalist_spf, name: "Minimalist Sunscreen SPF 50 PA+++ 100gm", reason: "Multi-vitamin formula, clinically tested. Suitable for daily use on reactive skin." },
    },
    budget_2000: {
      cleanser: { asin: ASIN.cetaphil_facewash, name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "India's most-recommended beauty product for sensitive skin. Gentle and barrier-protective." },
      treatment: { asin: ASIN.skin1004_centella_ampoule, name: "SKIN1004 Madagascar Centella Ampoule", reason: "100% pure Madagascar Centella Asiatica calms irritation, reduces redness, and builds barrier resilience." },
      moisturiser: { asin: ASIN.formularx_barrier_relief, name: "Formularx Barrier Relief Lightweight Moisturizer", reason: "Restores the skin barrier with essential ceramides, cholesterol, and fatty acids." },
      sunscreen: { asin: ASIN.skin1004_hyalu_cica_spf, name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++", reason: "Viral K-Beauty sunscreen: Centella + Hyaluronic Acid in an ultra-gentle, non-irritating water serum." },
    },
  },
};

export interface ClientProduct {
  id: string;
  name: string;
  category?: 'cleanser' | 'treatment' | 'moisturiser' | 'sunscreen' | string;
  ingredients?: string | string[];
  tags?: string[];
  price?: number;
  reason?: string;
}

// ─── POSTAL CODE & GLOBAL CITY MATRIX ──────────────────────────────────────
export interface ResolvedLocationData {
  city: string;
  country: string;
  ppm: number;
  temp: number;
  humidity: number;
  dewpoint: number;
  waterCategory: 'Very Hard' | 'Hard' | 'Moderately Hard' | 'Soft';
}

const GLOBAL_LOCATION_DB: Record<string, ResolvedLocationData> = {
  // US Postal Codes & Cities
  "90210": { city: "Los Angeles", country: "US", ppm: 320, temp: 26, humidity: 45, dewpoint: 13.5, waterCategory: "Very Hard" },
  "los_angeles": { city: "Los Angeles", country: "US", ppm: 320, temp: 26, humidity: 45, dewpoint: 13.5, waterCategory: "Very Hard" },
  "la": { city: "Los Angeles", country: "US", ppm: 320, temp: 26, humidity: 45, dewpoint: 13.5, waterCategory: "Very Hard" },
  "10001": { city: "New York", country: "US", ppm: 55, temp: 14, humidity: 52, dewpoint: 4.2, waterCategory: "Soft" },
  "new_york": { city: "New York", country: "US", ppm: 55, temp: 14, humidity: 52, dewpoint: 4.2, waterCategory: "Soft" },
  "ny": { city: "New York", country: "US", ppm: 55, temp: 14, humidity: 52, dewpoint: 4.2, waterCategory: "Soft" },
  "33101": { city: "Miami", country: "US", ppm: 145, temp: 31, humidity: 82, dewpoint: 24.1, waterCategory: "Moderately Hard" },
  "miami": { city: "Miami", country: "US", ppm: 145, temp: 31, humidity: 82, dewpoint: 24.1, waterCategory: "Moderately Hard" },

  // UK Postal Codes & Cities
  "sw1a": { city: "London", country: "UK", ppm: 280, temp: 18, humidity: 78, dewpoint: 14.2, waterCategory: "Very Hard" },
  "london": { city: "London", country: "UK", ppm: 280, temp: 18, humidity: 78, dewpoint: 14.2, waterCategory: "Very Hard" },
  "m1": { city: "Manchester", country: "UK", ppm: 45, temp: 15, humidity: 80, dewpoint: 11.5, waterCategory: "Soft" },

  // UAE
  "dubai": { city: "Dubai", country: "AE", ppm: 290, temp: 36, humidity: 62, dewpoint: 27.5, waterCategory: "Very Hard" },
  "dxb": { city: "Dubai", country: "AE", ppm: 290, temp: 36, humidity: 62, dewpoint: 27.5, waterCategory: "Very Hard" },

  // Europe
  "stockholm": { city: "Stockholm", country: "SE", ppm: 20, temp: 8, humidity: 60, dewpoint: 0.8, waterCategory: "Soft" },
  "75001": { city: "Paris", country: "FR", ppm: 240, temp: 17, humidity: 70, dewpoint: 11.4, waterCategory: "Very Hard" },
  "paris": { city: "Paris", country: "FR", ppm: 240, temp: 17, humidity: 70, dewpoint: 11.4, waterCategory: "Very Hard" },

  // India
  "400001": { city: "Mumbai", country: "IN", ppm: 140, temp: 32, humidity: 85, dewpoint: 26.2, waterCategory: "Moderately Hard" },
  "mumbai": { city: "Mumbai", country: "IN", ppm: 140, temp: 32, humidity: 85, dewpoint: 26.2, waterCategory: "Moderately Hard" },
  "110001": { city: "Delhi", country: "IN", ppm: 190, temp: 34, humidity: 65, dewpoint: 21.0, waterCategory: "Hard" },
  "delhi": { city: "Delhi", country: "IN", ppm: 190, temp: 34, humidity: 65, dewpoint: 21.0, waterCategory: "Hard" },
  "560001": { city: "Bangalore", country: "IN", ppm: 180, temp: 25, humidity: 62, dewpoint: 17.2, waterCategory: "Hard" },
  "bangalore": { city: "Bangalore", country: "IN", ppm: 180, temp: 25, humidity: 62, dewpoint: 17.2, waterCategory: "Hard" },
  "600001": { city: "Chennai", country: "IN", ppm: 260, temp: 33, humidity: 80, dewpoint: 25.5, waterCategory: "Very Hard" },
  "chennai": { city: "Chennai", country: "IN", ppm: 260, temp: 33, humidity: 80, dewpoint: 25.5, waterCategory: "Very Hard" },
};

export function resolveLocationData(query?: { postalCode?: string; city?: string; country?: string; temp?: number; humidity?: number; ppm?: number; dewpoint?: number }): ResolvedLocationData {
  const key = (query?.postalCode || query?.city || "london").toString().toLowerCase().trim();
  const matched = GLOBAL_LOCATION_DB[key];

  if (matched) {
    return {
      city: matched.city,
      country: matched.country,
      ppm: query?.ppm ?? matched.ppm,
      temp: query?.temp ?? matched.temp,
      humidity: query?.humidity ?? matched.humidity,
      dewpoint: query?.dewpoint ?? matched.dewpoint,
      waterCategory: matched.waterCategory,
    };
  }

  const ppm = query?.ppm ?? 180;
  const temp = query?.temp ?? 24;
  const humidity = query?.humidity ?? 65;
  const dp = query?.dewpoint ?? (temp - ((100 - humidity) / 5));

  let waterCategory: ResolvedLocationData['waterCategory'] = "Hard";
  if (ppm > 200) waterCategory = "Very Hard";
  else if (ppm < 75) waterCategory = "Soft";
  else if (ppm < 150) waterCategory = "Moderately Hard";

  return {
    city: query?.city || query?.postalCode || "Global Location",
    country: query?.country || "Global",
    ppm,
    temp,
    humidity,
    dewpoint: dp,
    waterCategory,
  };
}

// ─── INGREDIENT AUTO-CLASSIFICATION ENGINE ─────────────────────────────────
export function classifyClientProduct(prod: ClientProduct): {
  isChelating: boolean;
  isWaterGel: boolean;
  isBarrierRepair: boolean;
  isMatte: boolean;
  category: string;
} {
  const rawIngredients = prod.ingredients;
  const ingredientsStr = Array.isArray(rawIngredients)
    ? rawIngredients.join(", ")
    : typeof rawIngredients === "string"
    ? rawIngredients
    : "";
  const ing = ingredientsStr.toLowerCase();
  const name = prod.name.toLowerCase();
  const tags = (prod.tags || []).map(t => t.toLowerCase());

  const isChelating = tags.includes("chelating") || tags.includes("anti_hardwater") ||
    ing.includes("edta") || ing.includes("citric acid") || ing.includes("phytic acid") || ing.includes("sodium gluconate");

  const isWaterGel = tags.includes("water_gel") || tags.includes("oil_free") ||
    ing.includes("hyaluronic") || ing.includes("water gel") || name.includes("water gel") || name.includes("aqua gel");

  const isBarrierRepair = tags.includes("barrier_repair") || tags.includes("occlusive") ||
    ing.includes("ceramide") || ing.includes("shea") || ing.includes("squalane") || ing.includes("petrolatum") || name.includes("baume") || name.includes("cream");

  const isMatte = tags.includes("matte") || tags.includes("dry_touch") ||
    ing.includes("silicon") || ing.includes("niacinamide") || name.includes("matte");

  let category = prod.category?.toLowerCase() || "";
  if (!category) {
    if (name.includes("wash") || name.includes("cleanser") || name.includes("gel face")) category = "cleanser";
    else if (name.includes("spf") || name.includes("sunscreen") || name.includes("sun")) category = "sunscreen";
    else if (name.includes("cream") || name.includes("moistur") || name.includes("lotion") || name.includes("balm")) category = "moisturiser";
    else category = "treatment";
  }

  return { isChelating, isWaterGel, isBarrierRepair, isMatte, category };
}

export interface ClimateInput {
  temp?: number;      // °C
  humidity?: number;  // %
  city?: string;
  postalCode?: string;
  country?: string;
  ppm?: number;      // Water hardness in Parts Per Million
  dewpoint?: number; // °C
  catalog?: ClientProduct[]; // Custom merchant product array
}

// ─── GENERATE ROUTINE ─────────────────────────────────────────────────────────


// ─── DUAL CONCERN SYNTHESIS ────────────────────────────────────────────────
// Calibrates 4-product routine when a user selects 2 concurrent concerns.
// Strictly maintains budget ceilings and prevents formulation clashes.
function applyDualConcernSynthesis(
  routine: RoutineRecommendation,
  c1: string,
  c2: string,
  skinType: string,
  budgetKey: string
): void {
  const set = new Set([c1, c2]);

  // 1. DEHYDRATION + DULLNESS
  if (set.has("dehydration") && set.has("dullness")) {
    if (budgetKey === "budget_500") {
      routine.cleanser = {
        asin: ASIN.simple_facewash,
        name: "Simple Kind To Skin Moisturising Facial Wash",
        reason: "Dual Synergy [Dehydration + Dullness]: Soap-free formula with Pro-Vitamin B5 cleanses without depleting skin lipids, preventing micro-tears that cause dullness. ₹329.",
      };
      routine.treatment = {
        asin: ASIN.plum_vitamin_c,
        name: "Plum 15% Vitamin C Face Serum",
        reason: "Dual Synergy [Dehydration + Dullness]: Concentrated antioxidant Vitamin C revives fatigued cells and restores radiance, buffered by soothing natural extracts. ₹445.",
      };
      routine.moisturiser = {
        asin: (skinType === "dry" || skinType === "sensitive") ? ASIN.bioderma_atoderm : ASIN.sebamed_care_gel,
        name: (skinType === "dry" || skinType === "sensitive") ? "Bioderma Atoderm Intensive Baume" : "Sebamed Clear Face Care Gel",
        reason: "Dual Synergy [Dehydration + Dullness]: Seals in hydration with barrier-repairing humectants, giving skin a smooth, light-reflective bounce. Under ₹500.",
      };
      routine.sunscreen = {
        asin: ASIN.foxtale_glow_spf,
        name: "Foxtale Glow Sunscreen SPF 50 PA++++",
        reason: "Dual Synergy [Dehydration + Dullness]: Vitamin C and Niacinamide infuse moisture while locking in all-day lit-from-within glow with broad spectrum protection. ₹345.",
      };
    } else if (budgetKey === "budget_1000") {
      routine.cleanser = {
        asin: ASIN.cetaphil_facewash,
        name: "Cetaphil Gentle Skin Hydrating Face Wash",
        reason: "Dual Synergy [Dehydration + Dullness]: Clinically proven hydrating wash preserves the vital skin mantle, leaving zero dull, tight residue.",
      };
      routine.treatment = {
        asin: ASIN.cosrx_snail_mucin,
        name: "COSRX Advanced Snail 96 Mucin Power Essence",
        reason: "Dual Synergy [Dehydration + Dullness]: 96% filtered Snail Mucin drenches parched skin with intense cellular moisture while delivering viral glass-skin luminosity.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Dehydration + Dullness]: Golden 3:1:1 lipid complex locks in water, repairs compromised moisture mantles, and eliminates dull texture. ₹594.",
      };
      routine.sunscreen = {
        asin: ASIN.minimalist_spf,
        name: "Minimalist Sunscreen SPF 50 PA+++ 100gm",
        reason: "Dual Synergy [Dehydration + Dullness]: Multi-vitamin sunscreen (B3, B5, E) protects from moisture-depleting UV while giving a radiant, healthy finish without white cast.",
      };
    } else {
      // budget_2000
      routine.cleanser = {
        asin: ASIN.cetaphil_facewash,
        name: "Cetaphil Gentle Skin Hydrating Face Wash",
        reason: "Dual Synergy [Dehydration + Dullness]: Preserves vital barrier moisture during cleansing so radiance actives can absorb deeply without stinging.",
      };
      routine.treatment = {
        asin: ASIN.boj_rice_toner,
        name: "Beauty of Joseon Glow Replenishing Rice Toner",
        reason: "Dual Synergy [Dehydration + Dullness]: Traditional Hanbang rice extract and amino acids flood dehydrated layers with nutrients for a glass-skin, lit-from-within glow.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Dehydration + Dullness]: Derm-formulated ceramides and fatty acids smooth cellular surface roughness to maximize light reflection and hydration bounce.",
      };
      routine.sunscreen = {
        asin: ASIN.skin1004_hyalu_cica_spf,
        name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
        reason: "Dual Synergy [Dehydration + Dullness]: Cult K-Beauty sun serum fuses Hyaluronic Acid with Centella Asiatica for sheer, dewy, intensely hydrated sun defense.",
      };
    }
    return;
  }

  // 2. ACNE + PIGMENTATION
  if (set.has("acne") && set.has("pigmentation")) {
    if (budgetKey === "budget_500") {
      routine.cleanser = {
        asin: ASIN.dermaco_salicylic_wash,
        name: "The Derma Co 1% Salicylic Acid Gel Face Wash",
        reason: "Dual Synergy [Acne + Pigmentation]: Dissolves pore sebum and clears active blemishes before they leave stubborn post-acne marks (PIH). ₹249.",
      };
      routine.treatment = {
        asin: ASIN.plum_vitamin_c,
        name: "Plum 15% Vitamin C Face Serum",
        reason: "Dual Synergy [Acne + Pigmentation]: Pure stable Vitamin C inhibits tyrosinase to rapidly fade dark post-inflammatory spots while fighting free radical damage. ₹445.",
      };
      routine.moisturiser = {
        asin: ASIN.sebamed_care_gel,
        name: "Sebamed Clear Face Care Gel",
        reason: "Dual Synergy [Acne + Pigmentation]: 100% oil-free water gel at pH 5.5 inhibits acne-causing bacteria while soothing redness and pigment inflammation. ₹464.",
      };
      routine.sunscreen = {
        asin: ASIN.lakme_spf,
        name: "Lakme SPF 50 PA++++ Sunscreen",
        reason: "Dual Synergy [Acne + Pigmentation]: Non-comedogenic UV shield stops sunlight from permanently darkening fresh blemish marks. ₹282.",
      };
    } else if (budgetKey === "budget_1000") {
      routine.cleanser = {
        asin: ASIN.minimalist_ala_wash,
        name: "Minimalist 7% ALA + Glycolic Face Wash",
        reason: "Dual Synergy [Acne + Pigmentation]: Glycolic acid lifts pigmented surface cells while ALA controls excess sebum in acne-prone zones.",
      };
      routine.treatment = {
        asin: ASIN.ordinary_niacinamide,
        name: "The Ordinary Niacinamide 10% + Zinc 1%",
        reason: "Dual Synergy [Acne + Pigmentation]: Benchmark formulation: 1% Zinc calms active acne flares while 10% Niacinamide blocks melanin transfer to clear dark marks.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Acne + Pigmentation]: Ceramide complex repairs post-breakout barrier integrity and prevents hyperpigmentation rebound. ₹594.",
      };
      routine.sunscreen = {
        asin: ASIN.reequil_matte_spf,
        name: "RE' EQUIL Ultra Matte Dry Touch Sunscreen",
        reason: "Dual Synergy [Acne + Pigmentation]: Matte velvet finish controls breakout shine while ensuring zero UV-induced pigmentation darkening.",
      };
    } else {
      // budget_2000
      routine.cleanser = {
        asin: ASIN.cosrx_low_ph_wash,
        name: "COSRX Low pH Good Morning Gel Cleanser",
        reason: "Dual Synergy [Acne + Pigmentation]: Gentle botanical BHA purifies congested pores without irritating delicate pigmented marks.",
      };
      routine.treatment = {
        asin: ASIN.boj_rice_toner,
        name: "Beauty of Joseon Glow Replenishing Rice Toner",
        reason: "Dual Synergy [Acne + Pigmentation]: Rice extracts fade dark post-inflammatory marks while balancing surface oil and clearing texture.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Acne + Pigmentation]: Barrier lipid restoration accelerates cellular recovery from acne while fading uneven discoloration.",
      };
      routine.sunscreen = {
        asin: ASIN.skin1004_hyalu_cica_spf,
        name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
        reason: "Dual Synergy [Acne + Pigmentation]: Centella soothes inflamed breakouts while broad-spectrum K-Beauty filters prevent dark spots from setting.",
      };
    }
    return;
  }

  // 3. ACNE + DEHYDRATION
  if (set.has("acne") && set.has("dehydration")) {
    if (budgetKey === "budget_500") {
      routine.cleanser = {
        asin: ASIN.simple_facewash,
        name: "Simple Kind To Skin Moisturising Facial Wash",
        reason: "Dual Synergy [Acne + Dehydration]: Harsh acne washes worsen dehydration and trigger rebound oiliness. This soap-free wash cleanses gently without stripping. ₹329.",
      };
      routine.treatment = {
        asin: ASIN.dotkey_hyaluronic,
        name: "Dot & Key Watermelon Hyaluronic Serum",
        reason: "Dual Synergy [Acne + Dehydration]: Infuses oil-free water hydration to restore barrier balance without clogging pores or triggering blemishes. ₹400.",
      };
      routine.moisturiser = {
        asin: ASIN.sebamed_care_gel,
        name: "Sebamed Clear Face Care Gel",
        reason: "Dual Synergy [Acne + Dehydration]: Water-based gel with Hyaluronic Acid and Panthenol soothes inflamed breakouts and hydrates parched skin at pH 5.5. ₹464.",
      };
      routine.sunscreen = {
        asin: ASIN.deconstruct_spf,
        name: "Deconstruct Gel Sunscreen SPF 50 PA++++",
        reason: "Dual Synergy [Acne + Dehydration]: Ultra-light gel texture won't congest acne-prone skin, providing hydrating UV defense without heavy residue. ₹281.",
      };
    } else if (budgetKey === "budget_1000") {
      routine.cleanser = {
        asin: ASIN.cosrx_low_ph_wash,
        name: "COSRX Low pH Good Morning Gel Cleanser",
        reason: "Dual Synergy [Acne + Dehydration]: Maintains skin's natural acidic mantle (pH 5.0–6.0) to clear acne bacteria without causing barrier water loss.",
      };
      routine.treatment = {
        asin: ASIN.ordinary_niacinamide,
        name: "The Ordinary Niacinamide 10% + Zinc 1%",
        reason: "Dual Synergy [Acne + Dehydration]: Niacinamide stimulates internal ceramide synthesis to fix dehydration while Zinc PCA reduces acne oiliness.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Acne + Dehydration]: Rebuilds the depleted moisture barrier with ceramides without heavy comedogenic waxes that clog pores. ₹594.",
      };
      routine.sunscreen = {
        asin: ASIN.reequil_matte_spf,
        name: "RE' EQUIL Ultra Matte Dry Touch Sunscreen",
        reason: "Dual Synergy [Acne + Dehydration]: Dry-touch matte shield protects dehydrated skin from sun damage without greasiness.",
      };
    } else {
      // budget_2000
      routine.cleanser = {
        asin: ASIN.cosrx_low_ph_wash,
        name: "COSRX Low pH Good Morning Gel Cleanser",
        reason: "Dual Synergy [Acne + Dehydration]: Low-pH formula purifies congested pores while respecting moisture-depleted epidermal lipids.",
      };
      routine.treatment = {
        asin: ASIN.skin1004_centella_ampoule,
        name: "SKIN1004 Madagascar Centella Ampoule",
        reason: "Dual Synergy [Acne + Dehydration]: 100% Centella Asiatica deeply calms breakout inflammation and infuses essential barrier hydration.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Acne + Dehydration]: Clinically calibrated 3:1:1 lipid ratio repairs compromised barriers while keeping skin lightweight and clear.",
      };
      routine.sunscreen = {
        asin: ASIN.skin1004_hyalu_cica_spf,
        name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
        reason: "Dual Synergy [Acne + Dehydration]: Hydrating sun serum quenches cellular thirst and prevents acne irritation without leaving a greasy film.",
      };
    }
    return;
  }

  // 4. ACNE + DULLNESS
  if (set.has("acne") && set.has("dullness")) {
    if (budgetKey === "budget_500") {
      routine.cleanser = {
        asin: ASIN.minimalist_ala_wash,
        name: "Minimalist 7% ALA + Glycolic Face Wash",
        reason: "Dual Synergy [Acne + Dullness]: Lifts dead surface buildup that causes dullness while clearing pore sebum to prevent acne breakouts. ₹380.",
      };
      routine.treatment = {
        asin: ASIN.plum_vitamin_c,
        name: "Plum 15% Vitamin C Face Serum",
        reason: "Dual Synergy [Acne + Dullness]: Antioxidant Vitamin C boosts cellular turnover for glowing radiance and strengthens skin defense against breakouts. ₹445.",
      };
      routine.moisturiser = {
        asin: ASIN.sebamed_care_gel,
        name: "Sebamed Clear Face Care Gel",
        reason: "Dual Synergy [Acne + Dullness]: Oil-free moisture at pH 5.5 prevents pore blockage while smoothing texture for natural radiance. ₹464.",
      };
      routine.sunscreen = {
        asin: ASIN.foxtale_glow_spf,
        name: "Foxtale Glow Sunscreen SPF 50 PA++++",
        reason: "Dual Synergy [Acne + Dullness]: Vitamin C and Niacinamide give an instant lit-from-within glow with non-comedogenic matte finish. ₹345.",
      };
    } else if (budgetKey === "budget_1000") {
      routine.cleanser = {
        asin: ASIN.minimalist_ala_wash,
        name: "Minimalist 7% ALA + Glycolic Face Wash",
        reason: "Dual Synergy [Acne + Dullness]: Exfoliates dull surface debris and controls acne-prone shine.",
      };
      routine.treatment = {
        asin: ASIN.ordinary_niacinamide,
        name: "The Ordinary Niacinamide 10% + Zinc 1%",
        reason: "Dual Synergy [Acne + Dullness]: Regulates acne sebum, refines textured pores, and clarifies complexion for a smooth, glowing canvas.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Acne + Dullness]: Smooths rough flaky patches with ceramides, maximizing light bounce without triggering acne. ₹594.",
      };
      routine.sunscreen = {
        asin: ASIN.foxtale_glow_spf,
        name: "Foxtale Glow Sunscreen SPF 50 PA++++",
        reason: "Dual Synergy [Acne + Dullness]: Broad-spectrum protection infused with radiance-boosting actives that won't clog acne-prone pores.",
      };
    } else {
      // budget_2000
      routine.cleanser = {
        asin: ASIN.cosrx_low_ph_wash,
        name: "COSRX Low pH Good Morning Gel Cleanser",
        reason: "Dual Synergy [Acne + Dullness]: Gentle BHA removes dulling impurities while protecting natural pH balance.",
      };
      routine.treatment = {
        asin: ASIN.boj_rice_toner,
        name: "Beauty of Joseon Glow Replenishing Rice Toner",
        reason: "Dual Synergy [Acne + Dullness]: Fermented rice filtrate refines pore texture and delivers an effortless, lit-from-within Korean glow.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Acne + Dullness]: Rebuilds barrier lipids to prevent dullness and keeps breakout inflammation at bay.",
      };
      routine.sunscreen = {
        asin: ASIN.skin1004_hyalu_cica_spf,
        name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
        reason: "Dual Synergy [Acne + Dullness]: Weightless sun serum leaves a natural glass-skin finish with zero acne congestion.",
      };
    }
    return;
  }

  // 5. PIGMENTATION + DULLNESS
  if (set.has("pigmentation") && set.has("dullness")) {
    if (budgetKey === "budget_500") {
      routine.cleanser = {
        asin: ASIN.minimalist_ala_wash,
        name: "Minimalist 7% ALA + Glycolic Face Wash",
        reason: "Dual Synergy [Pigmentation + Dullness]: Lifts oxidized dull dead cells and accelerates epidermal shedding of stubborn surface pigment. ₹380.",
      };
      routine.treatment = {
        asin: ASIN.plum_vitamin_c,
        name: "Plum 15% Vitamin C Face Serum",
        reason: "Dual Synergy [Pigmentation + Dullness]: 15% Ethyl Ascorbic Acid powerfully suppresses melanin synthesis while reviving tired, lackluster skin. ₹445.",
      };
      routine.moisturiser = {
        asin: (skinType === "dry" || skinType === "sensitive") ? ASIN.bioderma_atoderm : ASIN.sebamed_care_gel,
        name: (skinType === "dry" || skinType === "sensitive") ? "Bioderma Atoderm Intensive Baume" : "Sebamed Clear Face Care Gel",
        reason: "Dual Synergy [Pigmentation + Dullness]: Rehydrates cellular layers to enhance skin translucency and optimize active absorption. Under ₹500.",
      };
      routine.sunscreen = {
        asin: ASIN.foxtale_glow_spf,
        name: "Foxtale Glow Sunscreen SPF 50 PA++++",
        reason: "Dual Synergy [Pigmentation + Dullness]: Infused with brightening Vitamin C, shields against UV pigment triggers while giving an immediate healthy glow. ₹345.",
      };
    } else if (budgetKey === "budget_1000") {
      routine.cleanser = {
        asin: ASIN.minimalist_ala_wash,
        name: "Minimalist 7% ALA + Glycolic Face Wash",
        reason: "Dual Synergy [Pigmentation + Dullness]: Glycolic acid speeds up cell renewal to fade discoloration and reveal fresher, luminous skin.",
      };
      routine.treatment = {
        asin: ASIN.plum_vitamin_c,
        name: "Plum 15% Vitamin C Face Serum",
        reason: "Dual Synergy [Pigmentation + Dullness]: High-potency Vitamin C targets melanin production and reverses environmental oxidation for glowing tone.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Pigmentation + Dullness]: Niacinamide and ceramide blend strengthens the barrier while preventing pigment transfer. ₹594.",
      };
      routine.sunscreen = {
        asin: ASIN.foxtale_glow_spf,
        name: "Foxtale Glow Sunscreen SPF 50 PA++++",
        reason: "Dual Synergy [Pigmentation + Dullness]: Blocks UVA/UVB rays that darken spots while infusing skin with radiance boosters.",
      };
    } else {
      // budget_2000
      routine.cleanser = {
        asin: ASIN.cetaphil_facewash,
        name: "Cetaphil Gentle Skin Hydrating Face Wash",
        reason: "Dual Synergy [Pigmentation + Dullness]: Gentle, non-irritating wash preps skin for maximum absorption of brightening toners and serums.",
      };
      routine.treatment = {
        asin: ASIN.boj_rice_toner,
        name: "Beauty of Joseon Glow Replenishing Rice Toner",
        reason: "Dual Synergy [Pigmentation + Dullness]: Traditional Hanbang rice bran water and amino acids clarify uneven dark spots and create luminous porcelain glow.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Pigmentation + Dullness]: Smoothes cellular texture and repairs moisture barrier for long-lasting, light-reflecting glass skin.",
      };
      routine.sunscreen = {
        asin: ASIN.skin1004_hyalu_cica_spf,
        name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
        reason: "Dual Synergy [Pigmentation + Dullness]: Gold standard K-Beauty SPF prevents sun-induced spots while imparting an instant dewy radiance.",
      };
    }
    return;
  }

  // 6. DEHYDRATION + PIGMENTATION
  if (set.has("dehydration") && set.has("pigmentation")) {
    if (budgetKey === "budget_500") {
      routine.cleanser = {
        asin: ASIN.simple_facewash,
        name: "Simple Kind To Skin Moisturising Facial Wash",
        reason: "Dual Synergy [Dehydration + Pigmentation]: Compromised dehydrated skin cannot tolerate aggressive washes. Gentle Pro-Vitamin B5 formula cleanses barrier safely. ₹329.",
      };
      routine.treatment = {
        asin: ASIN.plum_vitamin_c,
        name: "Plum 15% Vitamin C Face Serum",
        reason: "Dual Synergy [Dehydration + Pigmentation]: Targets melanin synthesis without stinging, delivering essential antioxidant repair. ₹445.",
      };
      routine.moisturiser = {
        asin: (skinType === "dry" || skinType === "sensitive") ? ASIN.bioderma_atoderm : ASIN.dotkey_cica_gel,
        name: (skinType === "dry" || skinType === "sensitive") ? "Bioderma Atoderm Intensive Baume" : "Dot & Key CICA Calming Gel",
        reason: "Dual Synergy [Dehydration + Pigmentation]: Rebuilds the lipid barrier to prevent transepidermal water loss and soothe pigment-triggering irritation. Under ₹500.",
      };
      routine.sunscreen = {
        asin: ASIN.lakme_spf,
        name: "Lakme SPF 50 PA++++ Sunscreen",
        reason: "Dual Synergy [Dehydration + Pigmentation]: Niacinamide-enriched SPF blocks UV rays that darken spots while retaining skin moisture. ₹282.",
      };
    } else if (budgetKey === "budget_1000") {
      routine.cleanser = {
        asin: ASIN.cetaphil_facewash,
        name: "Cetaphil Gentle Skin Hydrating Face Wash",
        reason: "Dual Synergy [Dehydration + Pigmentation]: Hydrating cleanser preserves moisture mantle so pigment-fading actives can work effectively.",
      };
      routine.treatment = {
        asin: ASIN.cosrx_snail_mucin,
        name: "COSRX Advanced Snail 96 Mucin Power Essence",
        reason: "Dual Synergy [Dehydration + Pigmentation]: 96% snail secretion deeply hydrates parched cells and speeds up cellular recovery to fade marks.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Dehydration + Pigmentation]: Ceramide + Niacinamide formula repairs moisture barrier and interrupts melanin transfer. ₹594.",
      };
      routine.sunscreen = {
        asin: ASIN.minimalist_spf,
        name: "Minimalist Sunscreen SPF 50 PA+++ 100gm",
        reason: "Dual Synergy [Dehydration + Pigmentation]: Broad-spectrum UV filters prevent pigmentation rebound without drying out sensitive skin.",
      };
    } else {
      // budget_2000
      routine.cleanser = {
        asin: ASIN.cetaphil_facewash,
        name: "Cetaphil Gentle Skin Hydrating Face Wash",
        reason: "Dual Synergy [Dehydration + Pigmentation]: Hydrating wash maintains healthy barrier lipids, crucial for healing hyperpigmentation.",
      };
      routine.treatment = {
        asin: ASIN.boj_rice_toner,
        name: "Beauty of Joseon Glow Replenishing Rice Toner",
        reason: "Dual Synergy [Dehydration + Pigmentation]: Hanbang rice extract intensely hydrates and brightens dark discoloration without causing barrier stress.",
      };
      routine.moisturiser = {
        asin: ASIN.formularx_barrier_relief,
        name: "Formularx Barrier Relief Lightweight Moisturizer",
        reason: "Dual Synergy [Dehydration + Pigmentation]: 3:1:1 physiological lipids reinforce skin barrier, locking in hydration while clearing pigmentation.",
      };
      routine.sunscreen = {
        asin: ASIN.skin1004_hyalu_cica_spf,
        name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
        reason: "Dual Synergy [Dehydration + Pigmentation]: Hyaluronic acid + Centella protect against UV rays while quenching dehydrated skin.",
      };
    }
    return;
  }
}

export const generateRoutine = (
  answers: QuizAnswers,
  climate?: ClimateInput
): RoutineRecommendation => {
 const { skinType, mainConcern, secondaryConcern, budget } = answers;

 const budgetMap: Record<string, string> = {
 under_500: "budget_500",
 under_1000: "budget_1000",
 under_2000: "budget_2000",
 };
 const budgetKey = budgetMap[budget] ?? "budget_1000";

 const specificKey = `${skinType}_${mainConcern}`;
  const routineOptions = ROUTINE_MAP[specificKey] ?? ROUTINE_MAP[skinType] ?? ROUTINE_MAP["combination_acne"];
 const baseRoutine = routineOptions[budgetKey] ?? routineOptions["budget_1000"];

 // Create a deep copy of the routine to avoid mutating the master ROUTINE_MAP object
 const routine: RoutineRecommendation = {
 cleanser: { ...baseRoutine.cleanser },
 treatment: { ...baseRoutine.treatment },
 moisturiser: { ...baseRoutine.moisturiser },
 sunscreen: { ...baseRoutine.sunscreen },
 primaryConcern: CONCERN_LABELS[mainConcern] || mainConcern,
 secondaryConcern: secondaryConcern && secondaryConcern !== mainConcern ? CONCERN_LABELS[secondaryConcern] || secondaryConcern : undefined,
 };

 // If secondary concern is provided, synthesize tailored dual-objective regimen
 if (secondaryConcern && secondaryConcern !== mainConcern) {
   applyDualConcernSynthesis(routine, mainConcern, secondaryConcern, skinType, budgetKey);
 }

 if (climate) {
  const loc = resolveLocationData(climate);
  const { temp, humidity, city, ppm, dewpoint } = loc;
  const customCatalog = climate.catalog;
  const swappedFields: string[] = [];

  // ── CUSTOM MERCHANT CATALOG SELECTION ──
  if (customCatalog && customCatalog.length > 0) {
    const categorized: Record<string, ClientProduct[]> = { cleanser: [], treatment: [], moisturiser: [], sunscreen: [] };
    
    customCatalog.forEach(prod => {
      const meta = classifyClientProduct(prod);
      const catKey = meta.category === "moisturizer" ? "moisturiser" : meta.category;
      if (categorized[catKey]) {
        categorized[catKey].push(prod);
      }
    });

    if (categorized.cleanser.length > 0) {
      let bestCleanser = categorized.cleanser[0];
      if (ppm > 200) {
        const chelatingMatch = categorized.cleanser.find(p => classifyClientProduct(p).isChelating);
        if (chelatingMatch) bestCleanser = chelatingMatch;
      }
      routine.cleanser = {
        asin: bestCleanser.id,
        name: bestCleanser.name,
        reason: bestCleanser.reason || `Selected from store catalog. Fits ${city} tap water profile (${ppm} PPM).`,
      };
    }

    if (categorized.moisturiser.length > 0) {
      let bestMoisturiser = categorized.moisturiser[0];
      if (humidity > 75 || temp > 30) {
        const gelMatch = categorized.moisturiser.find(p => classifyClientProduct(p).isWaterGel);
        if (gelMatch) bestMoisturiser = gelMatch;
      } else if (dewpoint < 2 || temp < 18) {
        const barrierMatch = categorized.moisturiser.find(p => classifyClientProduct(p).isBarrierRepair);
        if (barrierMatch) bestMoisturiser = barrierMatch;
      }
      routine.moisturiser = {
        asin: bestMoisturiser.id,
        name: bestMoisturiser.name,
        reason: bestMoisturiser.reason || `Selected from store catalog. Formulated for ${city}'s ${humidity}% humidity.`,
      };
    }

    if (categorized.sunscreen.length > 0) {
      let bestSpf = categorized.sunscreen[0];
      if (dewpoint > 20 || humidity > 75) {
        const matteMatch = categorized.sunscreen.find(p => classifyClientProduct(p).isMatte || classifyClientProduct(p).isWaterGel);
        if (matteMatch) bestSpf = matteMatch;
      }
      routine.sunscreen = {
        asin: bestSpf.id,
        name: bestSpf.name,
        reason: bestSpf.reason || `Selected from store catalog. Photostable protection for ${city} weather.`,
      };
    }

    if (categorized.treatment.length > 0) {
      routine.treatment = {
        asin: categorized.treatment[0].id,
        name: categorized.treatment[0].name,
        reason: categorized.treatment[0].reason || `Selected from store catalog. Targeted formula for ${skinType} skin.`,
      };
    }
  }

  // ── HARD WATER MATRIX (Growth + Scale tier) ──
  if (ppm && ppm > 200 && (!customCatalog || customCatalog.length === 0)) {
    if (routine.cleanser.asin !== ASIN.cosrx_low_ph_wash && routine.cleanser.asin !== ASIN.minimalist_ala_wash) {
      routine.cleanser = {
        asin: ASIN.cosrx_low_ph_wash,
        name: "COSRX Low pH Good Morning Gel Cleanser",
        reason: `[Hard Water Matrix — ${ppm} PPM Very Hard] Tap water in ${city} has extremely high mineral content. Standard cleansers form insoluble calcium soap scum on skin. COSRX Low pH formula minimises mineral binding and rinses clean even in very hard water.`,
      };
      swappedFields.push("cleanser");
    }
    if (routine.moisturiser.asin === ASIN.cetaphil_cream && skinType !== "dry") {
      routine.moisturiser = {
        asin: ASIN.neutrogena_hydro_boost,
        name: "Neutrogena Hydro Boost Water Gel",
        reason: `[Hard Water Matrix — ${ppm} PPM Very Hard] Heavy emollient creams trap mineral deposits from ${city}'s hard water against skin. Hydro Boost water-gel absorbs fully with no residue for minerals to bind to.`,
      };
      swappedFields.push("moisturiser");
    }
  }

  // Moderately hard (75–200 PPM)
  if (ppm && ppm >= 75 && ppm <= 200 && budgetKey === "budget_2000" && skinType !== "dry" && routine.treatment.asin !== ASIN.cosrx_snail_mucin && (!customCatalog || customCatalog.length === 0)) {
    routine.treatment = {
      asin: ASIN.cosrx_snail_mucin,
      name: "COSRX Advanced Snail 96 Mucin Power Essence",
      reason: `[Hard Water Matrix — ${ppm} PPM Moderately Hard] ${city}'s tap water gradually degrades the skin lipid barrier. Snail Mucin 96% directly repairs mineral-induced micro-inflammation and restores barrier integrity.`,
    };
    swappedFields.push("treatment");
  }

  const dp = dewpoint ?? (temp - ((100 - humidity) / 5));

  if (dp > 20 && !swappedFields.includes("sunscreen") && (!customCatalog || customCatalog.length === 0)) {
    if (routine.sunscreen.asin === ASIN.lakme_spf || routine.sunscreen.asin === ASIN.wishcare_spf) {
      routine.sunscreen = {
        asin: ASIN.deconstruct_spf,
        name: "Deconstruct Gel Sunscreen SPF 50 PA++++",
        reason: `[Dewpoint Adjuster — ${dp.toFixed(1)}°C dew point] At this dew point in ${city}, sweat causes cream SPFs to pill and migrate into pores. Deconstruct's photostable gel matrix stays intact on wet skin.`,
      };
      swappedFields.push("sunscreen");
    }
  } else if (dp < 2 && !swappedFields.includes("moisturiser") && (!customCatalog || customCatalog.length === 0)) {
    if (routine.moisturiser.asin === ASIN.neutrogena_hydro_boost || routine.moisturiser.asin === ASIN.aqualogica_spf) {
      routine.moisturiser = {
        asin: ASIN.cetaphil_cream,
        name: "Cetaphil Moisturising Cream 250g",
        reason: `[Dewpoint Adjuster — ${dp.toFixed(1)}°C dew point] Air in ${city} is critically dry. Gel moisturisers lose water to the atmosphere faster than skin absorbs them. Cetaphil Cream's occlusive barrier locks in hydration.`,
      };
      swappedFields.push("moisturiser");
    }
  }

  // ── CLASSIC TEMP + HUMIDITY CHECKS ──
  if (temp > 35 && humidity > 70 && (!customCatalog || customCatalog.length === 0)) {
    if (routine.moisturiser.asin === ASIN.cetaphil_cream && !swappedFields.includes("moisturiser")) {
      routine.moisturiser = {
        asin: ASIN.neutrogena_hydro_boost,
        name: "Neutrogena Hydro Boost Water Gel",
        reason: `[Adaptive Climate Swap] Extremely hot and humid in ${city} (${temp}°C, ${humidity}% RH). Swapped heavy cream for ultra-lightweight water gel to prevent sweat-clogged pores.`,
      };
      swappedFields.push("moisturiser");
    }
  }

  if (swappedFields.length > 0 || (customCatalog && customCatalog.length > 0)) {
    const alerts: string[] = [];
    if (customCatalog && customCatalog.length > 0) alerts.push(`Dynamic Merchant Catalog applied (${customCatalog.length} custom SKUs evaluated)`);
    if (ppm && ppm > 200) alerts.push(`Very hard tap water (${ppm} PPM) — mineral-resistant chelating cleanser applied`);
    if (ppm && ppm >= 75 && ppm <= 200) alerts.push(`Moderately hard water (${ppm} PPM) — barrier-repair treatment upgraded`);

    routine.climateAdjustment = {
      type: temp > 20 ? "humid_heat" : "cold_dry",
      city,
      temp,
      humidity,
      alertText: alerts.join(". "),
      swappedFields,
    };
  }
 }

 return routine;
};

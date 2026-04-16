export interface QuizAnswers {
  skinType: string;
  mainConcern: string;
  budget: string;
  experience: string;
}

export interface RoutineRecommendation {
  cleanser: { asin: string; name: string; reason: string };
  treatment: { asin: string; name: string; reason: string };
  moisturiser: { asin: string; name: string; reason: string };
  sunscreen: { asin: string; name: string; reason: string };
}

const ASIN = {
  // ── CLEANSERS ──────────────────────────────────────────────────────────────
  cetaphil_facewash:      "B01CCGW4OE",
  simple_facewash:        "B00V4R0ET0",
  minimalist_ala_wash:    "B09VLDY46B",

  // ── TREATMENTS / SERUMS ────────────────────────────────────────────────────
  minimalist_niacinamide: "B0DH88LZ11",
  ordinary_niacinamide:   "B01MDTVZTZ",
  plum_vitamin_c:         "B095PRGHDX",
  minimalist_retinol:     "B091JG3GJ5",
  dotkey_hyaluronic:      "B0FG2PQVK5",

  // ── MOISTURISERS ───────────────────────────────────────────────────────────
  neutrogena_hydro_boost: "B00BQFTQW6",
  cetaphil_cream:         "B099MJH88B",

  // ── SUNSCREENS ─────────────────────────────────────────────────────────────																																																																																																													
  minimalist_spf:         "B0DHY6LQTW",
  aqualogica_spf:         "B0C9JPWLR4", 
  deconstruct_spf:        "B0B45RB1RV",
  lakme_spf:              "B00CS1KT96",
  wishcare_spf:           "B0CW1N7QRT",
};

const ROUTINE_MAP: Record<
  string,
  Record<string, RoutineRecommendation>
> = {

  // ── OILY SKIN ──────────────────────────────────────────────────────────────

  oily_acne: {
    budget_500: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Gently exfoliates excess oil and unclogs pores without stripping the skin barrier." },
      treatment:   { asin: ASIN.minimalist_niacinamide, name: "Minimalist 10% Niacinamide + Zinc Serum",  reason: "Controls sebum, reduces breakouts, and fades post-acne marks — the most useful active for oily acne-prone Indian skin." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Oil-free gel that hydrates without clogging pores. Essential even for oily skin." },
      sunscreen:   { asin: ASIN.minimalist_spf,         name: "Minimalist Sunscreen SPF 50 PA+++ 100gm",  reason: "Lightweight matte sunscreen — no white cast, no grease. Ideal for oily skin in Indian climate." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Gently exfoliates excess oil and unclogs pores without stripping the skin barrier." },
      treatment:   { asin: ASIN.ordinary_niacinamide,   name: "The Ordinary Niacinamide 10% + Zinc 1%",   reason: "The international benchmark for pore control and oil reduction. Cult product for a reason." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Oil-free gel that hydrates without clogging pores. Dermatologist-approved for oily skin." },
      sunscreen:   { asin: ASIN.deconstruct_spf,        name: "Deconstruct Gel Sunscreen SPF 50 PA++++",  reason: "4 next-gen UV filters. 100% photostable. Lightweight gel — perfect for oily and combination skin." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Dermatologist gold standard. Cleans without stripping — critical when using actives." },
      treatment:   { asin: ASIN.minimalist_niacinamide, name: "Minimalist 10% Niacinamide + Zinc Serum",  reason: "Controls sebum, reduces breakouts, and fades post-acne marks — the most useful active for Indian skin." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Oil-free gel that hydrates without clogging pores. Cult pick for oily skin globally." },
      sunscreen:   { asin: ASIN.aqualogica_spf,         name: "Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++", reason: "Anti-pollution factor technology. Watermelon + Niacinamide for oily Indian skin. No white cast." },
    },
  },

  oily_pigmentation: {
    budget_500: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Mild exfoliation helps surface pigmentation and keeps pores clear." },
      treatment:   { asin: ASIN.minimalist_niacinamide, name: "Minimalist 10% Niacinamide + Zinc Serum",  reason: "Fades dark spots and controls oil simultaneously — ideal for oily skin with pigmentation." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Lightweight oil-free hydration that won't interfere with your brightening actives." },
      sunscreen:   { asin: ASIN.minimalist_spf,         name: "Minimalist Sunscreen SPF 50 PA+++ 100gm",  reason: "Non-negotiable with any pigmentation routine. Sun exposure undoes all brightening progress within 48 hours." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Glycolic acid assists in clearing surface pigmentation while controlling oil." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "Stable 15% Vitamin C targets melanin and uneven tone. Use mornings before SPF for best results." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Oil-free hydration. Apply between Vitamin C and SPF for best layering." },
      sunscreen:   { asin: ASIN.deconstruct_spf,        name: "Deconstruct Gel Sunscreen SPF 50 PA++++",  reason: "Protects your brightening work from UV damage. Essential morning step with any pigmentation routine." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Barrier-safe cleanser — essential when using brightening actives that can increase sensitivity." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "Stable 15% Vitamin C with mandarin peel extract. Vegan, cruelty-free, dermat-tested." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Rich barrier repair that also works on the body. Pairs well with actives-heavy routines." },
      sunscreen:   { asin: ASIN.wishcare_spf,           name: "WishCare Niacinamide Sunscreen SPF 50 PA++++", reason: "8hr+ SPF protection with added niacinamide for dual pigmentation defence." },
    },
  },

  oily_dullness: {
    budget_500: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "ALA + Glycolic combination clears the dull buildup that makes oily skin look flat." },
      treatment:   { asin: ASIN.minimalist_niacinamide, name: "Minimalist 10% Niacinamide + Zinc Serum",  reason: "Brightens skin tone and controls the oil that contributes to a dull appearance." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Hydrated skin reflects light better. Oil-free gel for daily use." },
      sunscreen:   { asin: ASIN.aqualogica_spf,         name: "Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++", reason: "Radiance-boosting sunscreen with anti-pollution technology for Indian urban skin." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Exfoliates dead cells that cause dullness. Works on oily skin without over-drying." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "Vitamin C is the most direct ingredient for glow. 15% is clinical-level concentration." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Oil-free. Hyaluronic acid-based. Plumps and brightens skin texture." },
      sunscreen:   { asin: ASIN.deconstruct_spf,        name: "Deconstruct Gel Sunscreen SPF 50 PA++++",  reason: "Protects against UV-induced dullness and free radical damage." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Gentle cleanser with Vitamin B5 to prep skin for active ingredients." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "Mandarin peel extract targets surface dullness and uneven tone consistently." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "The hydration step that makes the glow visible. Works day and night." },
      sunscreen:   { asin: ASIN.wishcare_spf,           name: "WishCare Niacinamide Sunscreen SPF 50 PA++++", reason: "Dual-action: UV protection + niacinamide brightening in one morning step." },
    },
  },

  oily_dehydration: {
    budget_500: {
      cleanser:    { asin: ASIN.simple_facewash,        name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Soap-free formula that cleanses without removing moisture — critical for dehydrated oily skin." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Triple hyaluronic acid for deep, lasting hydration. Lightweight enough for oily skin." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "The go-to for oily skin that's actually dehydrated. Hydrates without adding oil." },
      sunscreen:   { asin: ASIN.minimalist_spf,         name: "Minimalist Sunscreen SPF 50 PA+++ 100gm",  reason: "Protects without drying. UV exposure worsens dehydration." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.simple_facewash,        name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Hydrating cleanser with Panthenol that strengthens the skin barrier." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Instantly plumps dehydrated skin. Lightweight, non-sticky, absorbs in seconds." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Hyaluronic acid-based. Hydrates for 48 hours without grease — dermat-approved for oily types." },
      sunscreen:   { asin: ASIN.aqualogica_spf,         name: "Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++", reason: "Dewy, hydrating sunscreen — counters the drying effect of UV exposure." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Niacinamide + Panthenol cleanser that actively supports the moisture barrier while cleansing." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Triple HA + Watermelon extract — deep hydration that's still light enough for oily skin." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Cult-favourite oil-free moisturiser. 48-hour hydration. Works on oily-dehydrated combination." },
      sunscreen:   { asin: ASIN.wishcare_spf,           name: "WishCare Niacinamide Sunscreen SPF 50 PA++++", reason: "Lightweight and non-drying. Niacinamide supports barrier health alongside UV protection." },
    },
  },

  // ── DRY SKIN ───────────────────────────────────────────────────────────────

  dry_acne: {
    budget_500: {
      cleanser:    { asin: ASIN.simple_facewash,        name: "Simple Kind To Skin Moisturising Facial Wash", reason: "100% soap-free. Retains moisture while clearing the skin — essential for dry acne-prone skin." },
      treatment:   { asin: ASIN.ordinary_niacinamide,   name: "The Ordinary Niacinamide 10% + Zinc 1%",   reason: "Controls acne without exfoliating or drying out the skin further." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Rich, fragrance-free barrier repair cream. Dermatologist standard for dry and sensitive skin." },
      sunscreen:   { asin: ASIN.lakme_spf,              name: "Lakme SPF 50 PA++++ Sunscreen",            reason: "Waterlight texture with niacinamide. Budget-friendly SPF that doesn't dry out." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "The dermatologist's cleanser for dry and sensitive skin. Niacinamide and Vitamin B5 preserve moisture." },
      treatment:   { asin: ASIN.minimalist_niacinamide, name: "Minimalist 10% Niacinamide + Zinc Serum",  reason: "Treats acne without acid exfoliation — the right call for dry skin prone to breakouts." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Long-duration barrier repair. Non-comedogenic. Works face and body. The dry skin essential." },
      sunscreen:   { asin: ASIN.minimalist_spf,         name: "Minimalist Sunscreen SPF 50 PA+++ 100gm",  reason: "Multi-vitamin formula SPF that doesn't strip moisture. 100gm — great value." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Vitamin B5 and Niacinamide cleanser. Supports barrier recovery alongside acne control." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Dry acne-prone skin needs hydration first, then acne control. This handles the hydration step." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Clinical-grade barrier repair. The best OTC moisturiser for consistently dry or eczema-prone skin." },
      sunscreen:   { asin: ASIN.aqualogica_spf,         name: "Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++", reason: "Dewy, hydrating sunscreen that adds moisture rather than stripping it." },
    },
  },

  dry_pigmentation: {
    budget_500: {
      cleanser:    { asin: ASIN.simple_facewash,        name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Soap-free, Panthenol-enriched cleanser that preserves moisture while prepping skin for actives." },
      treatment:   { asin: ASIN.ordinary_niacinamide,   name: "The Ordinary Niacinamide 10% + Zinc 1%",   reason: "Fades dark spots and strengthens the moisture barrier simultaneously." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Barrier repair cream. Keeps dry skin hydrated enough for brightening actives to work." },
      sunscreen:   { asin: ASIN.lakme_spf,              name: "Lakme SPF 50 PA++++ Sunscreen",            reason: "Budget SPF with niacinamide. Protects your pigmentation progress from being undone by UV." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Hydrating cleanser that preps dry skin for brightening actives without compromising the barrier." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "Vitamin C brightens. On dry skin, use morning only and follow with a richer moisturiser." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Rich barrier cream that seals in hydration and prevents actives from causing dryness." },
      sunscreen:   { asin: ASIN.wishcare_spf,           name: "WishCare Niacinamide Sunscreen SPF 50 PA++++", reason: "Niacinamide sunscreen adds an extra layer of brightening protection." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Paraben-free, sulphate-free. Hydrating cleanser for dry skin on brightening routines." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "Stable, effective Vitamin C for pigmentation. Vegan and dermat-tested." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "The dry skin standard. 4.5 stars, 4,200+ reviews. Non-comedogenic and fragrance-free." },
      sunscreen:   { asin: ASIN.aqualogica_spf,         name: "Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++", reason: "Dewy finish is ideal for dry skin. Adds radiance while protecting brightening results." },
    },
  },

  dry_dullness: {
    budget_500: {
      cleanser:    { asin: ASIN.simple_facewash,        name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Hydrating cleanser that doesn't strip — essential for dry dull skin that needs moisture, not less of it." },
      treatment:   { asin: ASIN.ordinary_niacinamide,   name: "The Ordinary Niacinamide 10% + Zinc 1%",   reason: "Brightens skin tone and evens texture on dry dull skin without causing dryness." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Well-hydrated skin looks instantly less dull. This is the best-value barrier repair cream." },
      sunscreen:   { asin: ASIN.lakme_spf,              name: "Lakme SPF 50 PA++++ Sunscreen",            reason: "Lightweight SPF that prevents UV-induced dullness and hyperpigmentation." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Vitamin B5 cleanser that brightens while cleansing. Sets up skin for treatment step." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Deep hydration is often all dry dull skin needs. Plumps and revives flat-looking skin." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Locks in hydration and restores the dewy look associated with healthy skin." },
      sunscreen:   { asin: ASIN.aqualogica_spf,         name: "Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++", reason: "Radiance-boosting sunscreen designed for the Indian skin tone spectrum." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Niacinamide-enriched cleanser — brightens while cleansing without stripping dry skin." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "Visible glow in 4–6 weeks. 15% concentration is clinical-level for dry skin with dullness." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Rich, long-lasting hydration. Healthy moisture levels make any skin look instantly more radiant." },
      sunscreen:   { asin: ASIN.wishcare_spf,           name: "WishCare Niacinamide Sunscreen SPF 50 PA++++", reason: "Niacinamide actively brightens while SPF protects against further UV-induced dullness." },
    },
  },

  dry_dehydration: {
    budget_500: {
      cleanser:    { asin: ASIN.simple_facewash,        name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Soap-free, enriched with Panthenol. Cleanses without removing any moisture from already-dehydrated skin." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Triple hyaluronic acid pulls water into the skin from the environment. The fastest fix for dehydrated dry skin." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Occlusive-rich formula seals in the hydration delivered by the serum. Essential for very dry skin." },
      sunscreen:   { asin: ASIN.lakme_spf,              name: "Lakme SPF 50 PA++++ Sunscreen",            reason: "Lightweight, non-drying SPF. UV protection is critical even for dehydrated skin." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Hydrating cleanser that actively supports the moisture barrier rather than challenging it." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Deep, instant hydration. Apply on damp skin for maximum absorption." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Rich barrier cream. Seals in serum hydration and prevents further transepidermal water loss." },
      sunscreen:   { asin: ASIN.aqualogica_spf,         name: "Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++", reason: "Dewy finish adds visible hydration while protecting against UV-caused dehydration." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Premium hydrating cleanser. Niacinamide and Vitamin B5 actively support a compromised moisture barrier." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Triple HA for layered hydration. Lightweight and absorbs before moisturiser." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Clinical barrier repair. Consistently recommended for very dry, dehydrated, or eczema-adjacent skin." },
      sunscreen:   { asin: ASIN.wishcare_spf,           name: "WishCare Niacinamide Sunscreen SPF 50 PA++++", reason: "Lightweight, non-drying formula. Niacinamide supports the barrier alongside UV protection." },
    },
  },

  // ── COMBINATION SKIN ───────────────────────────────────────────────────────

  combination_acne: {
    budget_500: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Targets oily T-zone and unclogs pores while being gentle on drier cheek areas." },
      treatment:   { asin: ASIN.minimalist_niacinamide, name: "Minimalist 10% Niacinamide + Zinc Serum",  reason: "Balances oil in the T-zone and reduces acne without over-drying combination skin." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Water gel that hydrates without adding oil to already-oily zones." },
      sunscreen:   { asin: ASIN.minimalist_spf,         name: "Minimalist Sunscreen SPF 50 PA+++ 100gm",  reason: "Matte, lightweight SPF that works across both oily and dry zones of combination skin." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Exfoliating cleanser that balances combination skin without over-drying the drier areas." },
      treatment:   { asin: ASIN.ordinary_niacinamide,   name: "The Ordinary Niacinamide 10% + Zinc 1%",   reason: "Regulates sebum in oily areas and reduces acne marks. Suitable across all zones." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Universally suitable for combination skin — hydrates without grease." },
      sunscreen:   { asin: ASIN.deconstruct_spf,        name: "Deconstruct Gel Sunscreen SPF 50 PA++++",  reason: "Airy gel texture ideal for combination skin. No white cast, non-comedogenic." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Gentle enough for the dry zones, effective enough for the oily areas of combination skin." },
      treatment:   { asin: ASIN.minimalist_niacinamide, name: "Minimalist 10% Niacinamide + Zinc Serum",  reason: "The combination skin essential. Regulates sebum in T-zone while supporting drier areas." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "One of the few moisturisers that genuinely works across both oily and dry zones." },
      sunscreen:   { asin: ASIN.aqualogica_spf,         name: "Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++", reason: "Balanced finish — neither too matte nor too dewy. Ideal for mixed skin types." },
    },
  },

  combination_pigmentation: {
    budget_500: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Mild exfoliation lifts surface pigmentation while managing oil in the T-zone." },
      treatment:   { asin: ASIN.minimalist_niacinamide, name: "Minimalist 10% Niacinamide + Zinc Serum",  reason: "Fades post-inflammatory hyperpigmentation and balances oil in combination skin zones." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Balances hydration across combination skin zones without heaviness." },
      sunscreen:   { asin: ASIN.minimalist_spf,         name: "Minimalist Sunscreen SPF 50 PA+++ 100gm",  reason: "Prevents UV from triggering new pigmentation. The most important step in any brightening routine." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Glycolic assists in shifting surface dark spots while treating oily zones." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "15% Vitamin C for visible brightening. Use mornings on clean skin before SPF." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Lightweight hydration that layers under SPF without greasiness." },
      sunscreen:   { asin: ASIN.deconstruct_spf,        name: "Deconstruct Gel Sunscreen SPF 50 PA++++",  reason: "Photostable UV protection — critical to prevent new pigmentation forming." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Barrier-safe cleanser for combination skin using brightening actives." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "Cruelty-free, dermat-tested. Stable form of Vitamin C for effective pigmentation control." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Keeps the skin hydrated enough for brightening actives to work at full efficacy." },
      sunscreen:   { asin: ASIN.wishcare_spf,           name: "WishCare Niacinamide Sunscreen SPF 50 PA++++", reason: "Double brightening protection — SPF blocks UV, niacinamide inhibits melanin transfer." },
    },
  },

  combination_dullness: {
    budget_500: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Removes the dull buildup that makes combination skin look flat and congested." },
      treatment:   { asin: ASIN.minimalist_niacinamide, name: "Minimalist 10% Niacinamide + Zinc Serum",  reason: "Brightens skin tone across all zones and controls the excess oil that dulls combination skin." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Hydrated skin reflects light better. Oil-free gel for daily glow maintenance." },
      sunscreen:   { asin: ASIN.aqualogica_spf,         name: "Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++", reason: "Radiance-focused SPF with anti-pollution technology for Indian skin." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.minimalist_ala_wash,    name: "Minimalist 7% ALA + Glycolic Face Wash",   reason: "Chemical exfoliant that clears the dead cell buildup causing dullness." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "The fastest route to visible glow on combination skin." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Keeps skin plump and dewy — the foundation of a glowing complexion." },
      sunscreen:   { asin: ASIN.deconstruct_spf,        name: "Deconstruct Gel Sunscreen SPF 50 PA++++",  reason: "Prevents UV from causing new dullness. The final step that makes the routine work." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Vitamin B5 cleanser that primes skin to absorb brightening actives more effectively." },
      treatment:   { asin: ASIN.plum_vitamin_c,         name: "Plum 15% Vitamin C Face Serum",            reason: "Vegan 15% Vitamin C. Glowing skin in 4–6 weeks with consistent use." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "4.4 stars, 10,400 reviews. Consistently rated the best oil-free glow moisturiser in India." },
      sunscreen:   { asin: ASIN.wishcare_spf,           name: "WishCare Niacinamide Sunscreen SPF 50 PA++++", reason: "Niacinamide + SPF in one step. Brightens and protects simultaneously." },
    },
  },

  combination_dehydration: {
    budget_500: {
      cleanser:    { asin: ASIN.simple_facewash,        name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Soap-free. Keeps moisture in while cleansing the oily zones of combination skin." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Hydrates the dry zones without making the oily zones greasier." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Water gel — the ideal moisturiser for dehydrated combination skin. Hydrates without clogging." },
      sunscreen:   { asin: ASIN.minimalist_spf,         name: "Minimalist Sunscreen SPF 50 PA+++ 100gm",  reason: "UV exposure worsens dehydration. Daily SPF is non-negotiable." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.simple_facewash,        name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Strengthens skin barrier. Combination skin that's dehydrated needs barrier support first." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Triple HA serum. Apply to damp skin for maximum hydration delivery." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Dermatologist-recommended for exactly this profile: oily in places, dehydrated overall." },
      sunscreen:   { asin: ASIN.aqualogica_spf,         name: "Aqualogica Radiance+ Dewy Sunscreen SPF 50 PA++++", reason: "Adds dewy hydration to the final step — counters dryness from UV exposure." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "Niacinamide + Panthenol cleanser that actively supports moisture barrier in dehydrated combination skin." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Non-sticky triple hyaluronic acid. The fastest visible improvement for dehydrated skin." },
      moisturiser: { asin: ASIN.neutrogena_hydro_boost, name: "Neutrogena Hydro Boost Water Gel",         reason: "Cult gel moisturiser. 48-hour hydration without grease — the best option for dehydrated-oily combination." },
      sunscreen:   { asin: ASIN.wishcare_spf,           name: "WishCare Niacinamide Sunscreen SPF 50 PA++++", reason: "Non-drying SPF formula. Niacinamide supports hydration alongside UV defence." },
    },
  },

  // ── SENSITIVE SKIN ─────────────────────────────────────────────────────────

  sensitive: {
    budget_500: {
      cleanser:    { asin: ASIN.simple_facewash,        name: "Simple Kind To Skin Moisturising Facial Wash", reason: "Zero artificial fragrance, colour, or harsh chemicals. Dermatologist-tested for sensitive skin." },
      treatment:   { asin: ASIN.ordinary_niacinamide,   name: "The Ordinary Niacinamide 10% + Zinc 1%",   reason: "Gentle active suitable for sensitive skin. Reduces redness and strengthens barrier." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Fragrance-free, non-comedogenic. The dermatologist's recommendation for sensitive and eczema-prone skin." },
      sunscreen:   { asin: ASIN.lakme_spf,              name: "Lakme SPF 50 PA++++ Sunscreen",            reason: "Lightweight, niacinamide-enriched SPF. Budget-friendly option for sensitive daily use." },
    },
    budget_1000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "The dermatologist's first recommendation for sensitive skin. Clinically proven gentle formula." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Fragrance-free hydration serum. No actives that could trigger sensitivity reactions." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "Clinical-grade barrier repair. Safe for eczema-prone skin and post-procedure recovery." },
      sunscreen:   { asin: ASIN.minimalist_spf,         name: "Minimalist Sunscreen SPF 50 PA+++ 100gm",  reason: "Multi-vitamin formula, clinically tested. Fragrance-free and suitable for daily use on reactive skin." },
    },
    budget_2000: {
      cleanser:    { asin: ASIN.cetaphil_facewash,      name: "Cetaphil Gentle Skin Hydrating Face Wash", reason: "1.3L+ reviews on Amazon India. India's most-reviewed beauty product for good reason." },
      treatment:   { asin: ASIN.dotkey_hyaluronic,      name: "Dot & Key Watermelon Hyaluronic Serum",    reason: "Calm, hydrating serum. Safe for all sensitive skin profiles including rosacea." },
      moisturiser: { asin: ASIN.cetaphil_cream,         name: "Cetaphil Moisturising Cream 250g",         reason: "4.5 stars across 4,200+ reviews. The consistent recommendation for sensitive skin in India." },
      sunscreen:   { asin: ASIN.wishcare_spf,           name: "WishCare Niacinamide Sunscreen SPF 50 PA++++", reason: "4.5 stars, fragrance-tolerant formula. Niacinamide soothes while SPF protects." },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GENERATE ROUTINE
// ─────────────────────────────────────────────────────────────────────────────

export const generateRoutine = (answers: QuizAnswers): RoutineRecommendation => {
  const { skinType, mainConcern, budget } = answers;

  const budgetMap: Record<string, string> = {
    under_500:  "budget_500",
    under_1000: "budget_1000",
    under_2000: "budget_2000",
  };
  const budgetKey = budgetMap[budget] ?? "budget_1000";

  // Build lookup key
  // Sensitive skin uses a single key regardless of concern
  const routineKey = skinType === "sensitive"
    ? "sensitive"
    : `${skinType}_${mainConcern}`;

  // Look up the routine map
  const routineOptions = ROUTINE_MAP[routineKey] ?? ROUTINE_MAP["combination_acne"];
  const routine = routineOptions[budgetKey] ?? routineOptions["budget_1000"];

  return routine;
};

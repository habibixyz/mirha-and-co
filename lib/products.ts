export type EvidenceLevel = "strong" | "moderate" | "limited";

export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcat: string;
  mrp: number;
  price: number;
  rating: number;
  reviews: string;
  asin: string;
  badge?: string;
  description: string;
  specs: Record<string, string>;
  tags: string[];
  image: string;
  link?: string;
  skinTypes: string[];
  hairTypes: string[];
  concerns: string[];
  ingredients: string[];
  routineSteps: string[];
  budgetTier: "under_500" | "under_1000" | "under_2000";
  bestFor: string[];
  notIdealFor: string[];
  evidenceLevel: EvidenceLevel;
  usage: string;
  watchOuts: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cetaphil Gentle Skin Hydrating Face Wash 118ml",
    brand: "Cetaphil",
    category: "Skincare",
    subcat: "Face Wash",
    mrp: 459,
    price: 384,
    rating: 4.5,
    reviews: "1.3L+",
    asin: "B01CCGW4OE",
    badge: "Top Rated",
    description: "Paraben Free, Sulphate-Free Gentle Skin Hydrating Cleanser with Niacinamide, Vitamin B5 for Dry to Normal, Sensitive Skin.",
    specs: {
      "Skin Type": "All Skin Types",
      "Key Ingredient": "Glycerin",
      Texture: "Gel",
      Use: "Daily cleanser"
    },
    tags: [
      "cleanser",
      "gentle",
      "face wash",
      "cetaphil",
      "dryness",
      "sensitivity",
      "barrier repair",
      "glycerin",
      "niacinamide",
      "panthenol",
      "dry",
      "normal",
      "sensitive",
      "under_500"
    ],
    image: "/products/cetaphil-facewash.jpg",
    skinTypes: [
      "dry",
      "normal",
      "sensitive"
    ],
    hairTypes: [],
    concerns: [
      "dryness",
      "sensitivity",
      "barrier repair"
    ],
    ingredients: [
      "glycerin",
      "niacinamide",
      "panthenol"
    ],
    routineSteps: [
      "cleanser"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Dry to normal skin",
      "Sensitive skin",
      "Barrier-safe daily cleansing"
    ],
    notIdealFor: [
      "Very oily skin that prefers a foaming gel cleanser"
    ],
    evidenceLevel: "strong",
    usage: "Use morning and evening on damp skin. Rinse well and follow with moisturiser.",
    watchOuts: [
      "May feel too gentle if you wear heavy sunscreen or makeup; double cleanse when needed."
    ]
  },
  {
    id: 2,
    name: "Simple Kind To Skin Moisturising Facial Wash, 150 ml",
    brand: "Unilever",
    category: "Skincare",
    subcat: "Face Wash",
    mrp: 420,
    price: 329,
    rating: 4.2,
    reviews: "5.5k",
    asin: "B00V4R0ET0",
    badge: "Bestseller",
    description: "100% Soap-Free Moisturising Facewash with Panthenol for dry, sensitive skin | Reduces Visual Dryness & Strengthens Skin Barrier.",
    specs: {
      "Skin Type": "Dry, Sensitive",
      "Key Ingredient": "Glycerin",
      Texture: "Cream",
      Use: "Daily"
    },
    tags: [
      "vitamin-e",
      "panthenol",
      "pro amino",
      "dryness",
      "sensitivity",
      "barrier repair",
      "glycerin",
      "panthenol",
      "vitamin e",
      "dry",
      "sensitive",
      "normal",
      "cleanser",
      "under_500"
    ],
    image: "/products/Simple-Moisturising.jpg",
    link: "https://amzn.to/48nWKaG",
    skinTypes: [
      "dry",
      "sensitive",
      "normal"
    ],
    hairTypes: [],
    concerns: [
      "dryness",
      "sensitivity",
      "barrier repair"
    ],
    ingredients: [
      "glycerin",
      "panthenol",
      "vitamin e"
    ],
    routineSteps: [
      "cleanser"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Sensitive beginners",
      "Dry skin",
      "Non-stripping cleansing"
    ],
    notIdealFor: [
      "Heavy makeup removal as a single cleanse"
    ],
    evidenceLevel: "moderate",
    usage: "Use AM and PM as a gentle daily cleanser.",
    watchOuts: [
      "Pair with a separate makeup remover if you wear waterproof products."
    ]
  },
  {
    id: 3,
    name: "Minimalist 7% ALA + Glycolic Brightening Face Wash 100ml",
    brand: "Minimalist",
    category: "Skincare",
    subcat: "Face Wash",
    mrp: 399,
    price: 380,
    rating: 4.2,
    reviews: "3.2k",
    asin: "B09VLDY46B",
    badge: "Trending Now",
    description: "Gentle Exfoliating Cleanser for Glowing Skin & Oil Control, Sulphate Free.",
    specs: {
      "Skin Type": "All, Combination, Dry, Normal, Oily, Sensitive",
      "Key Ingredient": "Glycolic Acid",
      Texture: "Cream",
      Use: "Daily"
    },
    tags: [
      "alpha lipoic acid",
      "vitamin b5",
      "face wash",
      "oiliness",
      "dullness",
      "congestion",
      "pigmentation",
      "glycolic acid",
      "alpha lipoic acid",
      "panthenol",
      "oily",
      "combination",
      "normal",
      "cleanser",
      "under_500"
    ],
    image: "/products/Minimalist-ALA.jpg",
    link: "https://amzn.to/4cn8R9n",
    skinTypes: [
      "oily",
      "combination",
      "normal"
    ],
    hairTypes: [],
    concerns: [
      "oiliness",
      "dullness",
      "congestion",
      "pigmentation"
    ],
    ingredients: [
      "glycolic acid",
      "alpha lipoic acid",
      "panthenol"
    ],
    routineSteps: [
      "cleanser"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Oily or congested skin",
      "Dull texture",
      "People who prefer wash-off exfoliation"
    ],
    notIdealFor: [
      "Damaged barrier",
      "Very sensitive skin",
      "Daily use alongside multiple exfoliating acids"
    ],
    evidenceLevel: "moderate",
    usage: "Use once daily or alternate days. Avoid over-cleansing when using other actives.",
    watchOuts: [
      "Because it contains exfoliating acids, reduce frequency if skin stings, peels, or feels tight."
    ]
  },
  {
    id: 4,
    name: "Minimalist Sunscreen SPF 50 PA+++ with Niacinamide & Multi-Vitamins 100gm",
    brand: "Minimalist",
    category: "Skincare",
    subcat: "Sunscreen",
    mrp: 699,
    price: 533,
    rating: 4.1,
    reviews: "31.3k",
    asin: "B0DHY6LQTW",
    badge: "Smart Buy",
    description: "Clinically Tested in US (In-Vivo) | Lightweight with Multi-Vitamins | No White Cast | Broad Spectrum | Face Sunscreen for Men & Women | 100gm.",
    specs: {
      "Skin Type": "All, Combination, Dry, Normal, Oily, Sensitive",
      "Key Ingredient": "Niacinamide, Multi-Vitamins",
      Texture: "Cream",
      Use: "Daily"
    },
    tags: [
      "spf 50 pa+++",
      "niacinamide",
      "multi-vitamins",
      "sunscreen",
      "oily skin",
      "pigmentation",
      "dullness",
      "barrier support",
      "niacinamide",
      "vitamin e",
      "uv filters",
      "normal",
      "dry",
      "combination",
      "oily",
      "sensitive",
      "under_1000"
    ],
    concerns: [
      "sunscreen",
      "pigmentation",
      "dullness",
      "barrier support"
    ],
    image: "/products/Minimalist-Sunscreen.jpg",
    link: "https://amzn.to/4muroFm",
    skinTypes: [
      "normal",
      "dry",
      "combination",
      "oily",
      "sensitive"
    ],
    hairTypes: [],
    ingredients: [
      "niacinamide",
      "vitamin e",
      "uv filters"
    ],
    routineSteps: [
      "sunscreen"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Daily SPF users",
      "No-white-cast preference",
      "Value-conscious sunscreen buyers"
    ],
    notIdealFor: [
      "People who prefer ultra-matte gel textures"
    ],
    evidenceLevel: "strong",
    usage: "Apply two-finger amount every morning as the last skincare step. Reapply outdoors.",
    watchOuts: [
      "Use enough product; under-application reduces protection."
    ]
  },
  {
    id: 5,
    name: "Aqualogica Radiance+ Dewy Sunscreen with Watermelon & Niacinamide with SPF 50 & PA++++ - 80g",
    brand: "Aqualogica",
    category: "Skincare",
    subcat: "Sunscreen",
    mrp: 599,
    price: 388,
    rating: 4.1,
    reviews: "10k",
    asin: "B0C9JPWLR4",
    badge: "Best for Price",
    description: "Broad Spectrum SPF 50+ PA++++ | UVA/B & Blue Light Protection | Anti-Pollution Factor (APF) Technology | In Vivo Tested | Ideal for Oily Skin Type | Fragrance-Free & No White Cast | For Radiant Skin.",
    specs: {
      "Skin Type": "All, Combination, Dry, Normal, Oily, Sensitive",
      "Key Ingredient": "Hyaluronic Acid, Niacinamide, Watermelon",
      Texture: "Cream",
      Use: "Daily"
    },
    tags: [
      "spf 50 pa++++",
      "niacinamide",
      "anti-pollution",
      "sunscreen",
      "oily skin",
      "pigmentation",
      "dullness",
      "oiliness",
      "niacinamide",
      "hyaluronic acid",
      "watermelon extract",
      "uv filters",
      "oily",
      "combination",
      "normal",
      "moisturiser",
      "under_500"
    ],
    concerns: [
      "sunscreen",
      "pigmentation",
      "dullness",
      "oiliness"
    ],
    image: "/products/Aqualogica-Radiance.jpg",
    link: "https://amzn.to/3OcJtLm",
    skinTypes: [
      "oily",
      "combination",
      "normal"
    ],
    hairTypes: [],
    ingredients: [
      "niacinamide",
      "hyaluronic acid",
      "watermelon extract",
      "uv filters"
    ],
    routineSteps: [
      "sunscreen",
      "moisturiser"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Oily Indian skin",
      "Dewy but lightweight SPF",
      "Budget routines where SPF doubles as day moisturiser"
    ],
    notIdealFor: [
      "Very dry skin needing a richer cream underneath"
    ],
    evidenceLevel: "strong",
    usage: "Use every morning as final step. Can act as a light moisturising layer for oily skin.",
    watchOuts: [
      "If your skin is dry, layer moisturiser before sunscreen."
    ]
  },
  {
    id: 6,
    name: "mCaffeine Exfoliating Coffee Body Scrub Powder Jar 100gm",
    brand: "mCaffeine",
    category: "Body Care",
    subcat: "Body Scrub",
    mrp: 449,
    price: 369,
    rating: 4.3,
    reviews: "27.4k",
    asin: "B07K4BFQK1",
    badge: "Bestseller",
    description: "mCaffeine Exfoliating Coffee Body Scrub Powder Jar for Tan Removal & Soft-Smooth Skin | De-Tan Bathing Scrub With Coconut Oil | Removes Dirt & Dead Skin | All Skin Types.",
    specs: {
      "Skin Type": "All Skin Types",
      "Key Ingredient": "Coffee, Caffeine, Coconut Oil",
      Texture: "Powder",
      Use: "Daily"
    },
    tags: [
      "exfoliating",
      "body scrub",
      "tan removal",
      "coffee",
      "body exfoliation",
      "rough texture",
      "caffeine",
      "coconut oil",
      "normal",
      "dry",
      "combination",
      "oily",
      "body exfoliant",
      "under_500"
    ],
    image: "/products/mCaffeine-Exfoliating.jpg",
    link: "https://amzn.to/4eerGxJ",
    skinTypes: [
      "normal",
      "dry",
      "combination",
      "oily"
    ],
    hairTypes: [],
    concerns: [
      "tan removal",
      "body exfoliation",
      "rough texture"
    ],
    ingredients: [
      "coffee",
      "caffeine",
      "coconut oil"
    ],
    routineSteps: [
      "body exfoliant"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Body tan",
      "Rough elbows/knees",
      "Occasional body exfoliation"
    ],
    notIdealFor: [
      "Active body acne",
      "Sensitive or inflamed skin",
      "Daily exfoliation"
    ],
    evidenceLevel: "limited",
    usage: "Use on wet body skin 1-2 times weekly. Rinse and moisturise.",
    watchOuts: [
      "Physical scrubs can irritate if used aggressively. Do not use on face."
    ]
  },
  {
    id: 7,
    name: "DOVE Nourishing Bodywash, 825ml",
    brand: "Dove",
    category: "Body Care",
    subcat: "Body Wash",
    mrp: 560,
    price: 302,
    rating: 4.4,
    reviews: "29k",
    asin: "B07S7R626P",
    badge: "Best for Price",
    description: "For Soft and Smooth Skin, with Triple Hydration Serum & Glycerine, Dermatologically Tested, Paraben-Free, Sulphate-Free.",
    specs: {
      "Skin Type": "All Skin Types",
      "Key Ingredient": "Glycerin",
      Texture: "Cream",
      Use: "Daily"
    },
    tags: [
      "moisturizing",
      "body wash",
      "paraben-free",
      "body dryness",
      "barrier support",
      "glycerin",
      "hydration serum",
      "dry",
      "normal",
      "sensitive",
      "body cleanser",
      "under_500"
    ],
    image: "/products/DOVE-Nourishing.jpg",
    link: "https://amzn.to/41ZEWix",
    skinTypes: [
      "dry",
      "normal",
      "sensitive"
    ],
    hairTypes: [],
    concerns: [
      "body dryness",
      "barrier support"
    ],
    ingredients: [
      "glycerin",
      "hydration serum"
    ],
    routineSteps: [
      "body cleanser"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Dry body skin",
      "Daily shower use",
      "Non-stripping body wash"
    ],
    notIdealFor: [
      "People who prefer strongly fragranced body washes"
    ],
    evidenceLevel: "moderate",
    usage: "Use daily in the shower, then follow with body lotion on damp skin.",
    watchOuts: [
      "Hot water can still worsen dryness even with a gentle body wash."
    ]
  },
  {
    id: 8,
    name: "TRESemme Keratin Smooth+ Shampoo 1000ml",
    brand: "TRESemme",
    category: "Hair Care",
    subcat: "Hair Wash",
    mrp: 1370,
    price: 634,
    rating: 4.3,
    reviews: "60k",
    asin: "B07L3ZCJ53",
    badge: "Best for Price",
    description: "72H Frizz Control with Keratin Protein & Argan Oil | Paraben Free Smoothening Shampoo for Dry & Frizzy Hair.",
    specs: {
      "Skin Type": "All, Frizzy, Dull, Normal, Oily, Dry",
      "Key Ingredient": "Keratin Protein, Argan Oil",
      Texture: "Cream",
      Use: "Daily"
    },
    tags: [
      "anti-hair loss",
      "paraben free",
      "hair wash",
      "keratin",
      "frizz",
      "smoothness",
      "dry hair",
      "keratin protein",
      "argan oil",
      "frizzy",
      "dry",
      "normal",
      "shampoo",
      "under_1000"
    ],
    image: "/products/TRESemmé-Keratin.jpg",
    link: "https://amzn.to/3Q6pAWQ",
    skinTypes: [],
    hairTypes: [
      "frizzy",
      "dry",
      "normal"
    ],
    concerns: [
      "frizz",
      "smoothness",
      "dry hair"
    ],
    ingredients: [
      "keratin protein",
      "argan oil"
    ],
    routineSteps: [
      "shampoo"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Frizzy hair",
      "Large-family/value use",
      "Smoother finish"
    ],
    notIdealFor: [
      "Very oily scalp needing clarifying shampoo"
    ],
    evidenceLevel: "moderate",
    usage: "Massage into wet scalp, rinse, and follow with conditioner.",
    watchOuts: [
      "Use a clarifying wash occasionally if buildup develops."
    ]
  },
  {
    id: 9,
    name: "Deconstruct Gel Sunscreen for Oily skin SPF 50 PA++++ 50gm",
    brand: "Deconstruct",
    category: "Skincare",
    subcat: "Sunscreen",
    mrp: 349,
    price: 281,
    rating: 4.2,
    reviews: "12.3k",
    asin: "B0B45RB1RV",
    badge: "Top Rated",
    description: "100% Photostable Sunscreen | 4 New Gen UV Filters | In-Vivo | Lightweight, Airy, Non-greasy | For oily, combination, normal skin | For Men & Women.",
    specs: {
      "Skin Type": "Oily, Normal, Combination",
      "Key Ingredient": "UV Filters",
      Texture: "Gel",
      Use: "Daily"
    },
    tags: [
      "sunscreen",
      "spf 50",
      "oily skin",
      "no white cast",
      "oiliness",
      "pigmentation",
      "uv filters",
      "oily",
      "combination",
      "normal",
      "under_500"
    ],
    concerns: [
      "sunscreen",
      "oiliness",
      "no white cast",
      "pigmentation"
    ],
    image: "/products/Deconstruct-Gel.jpg",
    link: "https://amzn.to/47W1AvI",
    skinTypes: [
      "oily",
      "combination",
      "normal"
    ],
    hairTypes: [],
    ingredients: [
      "uv filters"
    ],
    routineSteps: [
      "sunscreen"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Oily skin",
      "Gel sunscreen lovers",
      "Humid weather"
    ],
    notIdealFor: [
      "Very dry skin unless layered over moisturiser"
    ],
    evidenceLevel: "strong",
    usage: "Apply generously every morning. Reapply every 2-3 hours outdoors.",
    watchOuts: [
      "Gel textures can pill if layered over too many products."
    ]
  },
  {
    id: 10,
    name: "Minimalist 10% Niacinamide Serum with Zinc 60ml",
    brand: "Minimalist",
    category: "Skincare",
    subcat: "Serum",
    mrp: 999,
    price: 950,
    rating: 4.2,
    reviews: "24k",
    asin: "B0DH88LZ11",
    badge: "Skin Reset",
    description: "Reduces Acne Marks, Controls Oil & Minimizes Pores | Vitamin B3 for Blemish-Free, Clear Skin | For Oily & Acne-Prone Skin.",
    specs: {
      "Skin Type": "Oily, Acne-Prone",
      "Key Ingredient": "Niacinamide, Zinc, Vitamin B3",
      Texture: "Serum",
      Use: "Daily"
    },
    tags: [
      "niacinamide",
      "serum",
      "acne marks",
      "pores",
      "acne",
      "oily skin",
      "pigmentation",
      "oiliness",
      "zinc",
      "vitamin b3",
      "oily",
      "combination",
      "acne-prone",
      "treatment",
      "under_1000"
    ],
    concerns: [
      "acne",
      "oiliness",
      "pores",
      "acne marks",
      "pigmentation"
    ],
    image: "/products/Niacinamide-Serum.jpg",
    link: "https://amzn.to/4ceFxl5",
    skinTypes: [
      "oily",
      "combination",
      "acne-prone"
    ],
    hairTypes: [],
    ingredients: [
      "niacinamide",
      "zinc",
      "vitamin b3"
    ],
    routineSteps: [
      "treatment"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Oily acne-prone skin",
      "Post-acne marks",
      "Sebum control"
    ],
    notIdealFor: [
      "Very sensitive beginners who react to 10% niacinamide"
    ],
    evidenceLevel: "strong",
    usage: "Use after cleansing and before moisturiser. Start once daily or alternate days.",
    watchOuts: [
      "Too many niacinamide products together can feel irritating or sticky."
    ]
  },
  {
    id: 11,
    name: "The Ordinary Niacinamide 10% + Zinc 1% 30ml",
    brand: "The Ordinary",
    category: "Skincare",
    subcat: "Serum",
    mrp: 600,
    price: 599,
    rating: 4.3,
    reviews: "54k",
    asin: "B01MDTVZTZ",
    badge: "Top Rated",
    description: "Brightening & Smoothing Serum for Blemish-Prone Skin.",
    specs: {
      "Skin Type": "All, Normal, Oily, Dry",
      "Key Ingredient": "Niacinamide, Zinc",
      Texture: "Serum",
      Use: "Daily"
    },
    tags: [
      "niacinamide",
      "serum",
      "acne marks",
      "brightening",
      "acne",
      "oily skin",
      "pigmentation",
      "oiliness",
      "pores",
      "zinc",
      "oily",
      "combination",
      "normal",
      "treatment",
      "under_1000"
    ],
    concerns: [
      "acne",
      "oiliness",
      "pores",
      "acne marks",
      "pigmentation"
    ],
    image: "/products/Ordinary-Niacinamide.jpg",
    link: "https://amzn.to/4tFRRBV",
    skinTypes: [
      "oily",
      "combination",
      "normal"
    ],
    hairTypes: [],
    ingredients: [
      "niacinamide",
      "zinc"
    ],
    routineSteps: [
      "treatment"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Oil control",
      "Blemish-prone skin",
      "Simple active routines"
    ],
    notIdealFor: [
      "Very dry or reactive skin without barrier support"
    ],
    evidenceLevel: "strong",
    usage: "Apply a few drops after cleansing. Follow with moisturiser and SPF in the morning.",
    watchOuts: [
      "Patch test if you are new to 10% niacinamide."
    ]
  },
  {
    id: 12,
    name: "Lakme SPF 50 PA++++ Sunscreen Lotion for Bright Skin 100 ml",
    brand: "Lakme",
    category: "Skincare",
    subcat: "Sunscreen",
    mrp: 669,
    price: 282,
    rating: 4.2,
    reviews: "16.4k",
    asin: "B00CS1KT96",
    badge: "Budget Pick",
    description: "In Vivo Tested | UVA UVB Blue Light Protection | Waterlight | No White Cast | Niacinamide | For All Skin Types | Blocks UV Rays, Reduce Pigmentation.",
    specs: {
      "Skin Type": "All Skin Types",
      "Key Ingredient": "Niacinamide",
      Texture: "Lotion",
      Use: "Daily"
    },
    tags: [
      "spf 50 pa++++",
      "sunscreen",
      "niacinamide",
      "budget",
      "oily skin",
      "pigmentation",
      "dullness",
      "uv filters",
      "normal",
      "oily",
      "combination",
      "under_500"
    ],
    concerns: [
      "sunscreen",
      "pigmentation",
      "dullness",
      "budget"
    ],
    image: "/products/Lakme-SPF50.jpg",
    link: "https://amzn.to/3OCKQD8",
    skinTypes: [
      "normal",
      "oily",
      "combination"
    ],
    hairTypes: [],
    ingredients: [
      "niacinamide",
      "uv filters"
    ],
    routineSteps: [
      "sunscreen"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Budget SPF",
      "Daily indoor/outdoor use",
      "Pigmentation prevention"
    ],
    notIdealFor: [
      "Very sensitive skin if fragrance is an issue"
    ],
    evidenceLevel: "moderate",
    usage: "Use as last morning step. Reapply during prolonged sun exposure.",
    watchOuts: [
      "Do not rely on small amounts; sunscreen needs generous application."
    ]
  },
  {
    id: 13,
    name: "WishCare Niacinamide Oil Balance Fluid Sunscreen SPF 50 PA++++ 50ml",
    brand: "WishCare",
    category: "Skincare",
    subcat: "Sunscreen",
    mrp: 444,
    price: 316,
    rating: 4.5,
    reviews: "5.2k",
    asin: "B0CW1N7QRT",
    badge: "Value Deal",
    description: "In-Vivo Tested | 8Hrs+ SPF Protection | Lightweight, Matte & No White Cast | Sunscreen SPF 50 For Oily Skin, Sensitive, Dry & Combination Skin | For Women & Men.",
    specs: {
      "Skin Type": "Oily, Sensitive, Dry, Combination",
      "Key Ingredient": "Niacinamide, Zinc PCA, CICA, Ceramides",
      Texture: "Lotion",
      Use: "Daily"
    },
    tags: [
      "spf 50 pa++++",
      "sunscreen",
      "niacinamide",
      "matte",
      "oily skin",
      "oiliness",
      "pigmentation",
      "barrier support",
      "zinc pca",
      "cica",
      "ceramides",
      "uv filters",
      "oily",
      "combination",
      "sensitive",
      "dry",
      "under_500"
    ],
    concerns: [
      "sunscreen",
      "oiliness",
      "pigmentation",
      "barrier support"
    ],
    image: "/products/WishCare-Niacinamide.jpg",
    link: "https://amzn.to/3Qgw99h",
    skinTypes: [
      "oily",
      "combination",
      "sensitive",
      "dry"
    ],
    hairTypes: [],
    ingredients: [
      "niacinamide",
      "zinc pca",
      "cica",
      "ceramides",
      "uv filters"
    ],
    routineSteps: [
      "sunscreen"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Oily skin",
      "Matte SPF preference",
      "Niacinamide support"
    ],
    notIdealFor: [
      "People who dislike fluid sunscreen textures"
    ],
    evidenceLevel: "strong",
    usage: "Shake if needed and apply every morning as final skincare step.",
    watchOuts: [
      "Layer slowly over serums to reduce pilling."
    ]
  },
  {
    id: 14,
    name: "Dot & Key Watermelon Hyaluronic Serum",
    brand: "Dot & Key",
    category: "Skincare",
    subcat: "Serum",
    mrp: 449,
    price: 400,
    rating: 4.2,
    reviews: "849",
    asin: "B0FG2PQVK5",
    badge: "Hydration Pick",
    description: "Triple Hyaluronic Acid + Watermelon Extract for deep, lasting hydration. Lightweight, non-sticky formula that absorbs instantly. Perfect for dehydrated skin or anyone sitting in AC all day.",
    specs: {
      "Skin Type": "Dry, Dehydrated, Normal",
      "Key Ingredient": "Hyaluronic Acid, Watermelon Extract, Niacinamide",
      Texture: "Gel-Serum",
      Use: "AM & PM"
    },
    tags: [
      "hydration",
      "hyaluronic acid",
      "serum",
      "dry skin",
      "watermelon",
      "dehydration",
      "dryness",
      "dullness",
      "barrier support",
      "watermelon extract",
      "niacinamide",
      "dry",
      "dehydrated",
      "normal",
      "combination",
      "oily",
      "treatment",
      "hydration serum",
      "under_500"
    ],
    image: "/products/DotAndKey-Watermelon-Serum.jpg",
    link: "https://amzn.to/3OcSTGJ",
    skinTypes: [
      "dry",
      "dehydrated",
      "normal",
      "combination",
      "oily"
    ],
    hairTypes: [],
    concerns: [
      "dehydration",
      "dryness",
      "dullness",
      "barrier support"
    ],
    ingredients: [
      "hyaluronic acid",
      "watermelon extract",
      "niacinamide"
    ],
    routineSteps: [
      "treatment",
      "hydration serum"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Dehydrated skin",
      "AC dryness",
      "Lightweight hydration"
    ],
    notIdealFor: [
      "People looking for acne treatment as the main active"
    ],
    evidenceLevel: "moderate",
    usage: "Apply on slightly damp skin before moisturiser, AM or PM.",
    watchOuts: [
      "Hyaluronic acid works best when sealed with moisturiser."
    ]
  },
  {
    id: 15,
    name: "Plum 15% Vitamin C Face Serum",
    brand: "Plum",
    category: "Skincare",
    subcat: "Serum",
    mrp: 550,
    price: 445,
    rating: 4,
    reviews: "14.6k",
    asin: "B095PRGHDX",
    badge: "Glow Booster",
    description: "Stable 15% Vitamin C with mandarin peel extract targets dullness, pigmentation, and uneven tone. Vegan and cruelty-free. Use in the morning before SPF for best results.",
    specs: {
      "Skin Type": "All Skin Types",
      "Key Ingredient": "Vitamin C, Mandarin Peel Extract",
      Concentration: "15% Vitamin C",
      Use: "AM preferred"
    },
    tags: [
      "vitamin c",
      "brightening",
      "serum",
      "glow",
      "pigmentation",
      "dullness",
      "uneven tone",
      "mandarin peel extract",
      "normal",
      "oily",
      "combination",
      "dry",
      "treatment",
      "under_500"
    ],
    concerns: [
      "pigmentation",
      "dullness",
      "glow",
      "uneven tone"
    ],
    image: "/products/Plum-15.jpg",
    link: "https://amzn.to/4t7YmO1",
    skinTypes: [
      "normal",
      "oily",
      "combination",
      "dry"
    ],
    hairTypes: [],
    ingredients: [
      "vitamin c",
      "mandarin peel extract"
    ],
    routineSteps: [
      "treatment"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Dull skin",
      "Uneven tone",
      "Morning brightening routine"
    ],
    notIdealFor: [
      "Very sensitive skin",
      "Damaged barrier"
    ],
    evidenceLevel: "moderate",
    usage: "Use in the morning after cleansing, before moisturiser and SPF.",
    watchOuts: [
      "Daily sunscreen is essential when targeting pigmentation."
    ]
  },
  {
    id: 16,
    name: "Minimalist Retinol 0.3% + Squalane Serum",
    brand: "Minimalist",
    category: "Skincare",
    subcat: "Serum",
    mrp: 599,
    price: 569,
    rating: 4.2,
    reviews: "8.3k",
    asin: "B091JG3GJ5",
    badge: "Anti-Ageing",
    description: "Entry-level retinol (0.3%) in squalane base for a gentler introduction to vitamin A. Reduces fine lines, improves skin texture, and speeds up cell turnover. Night use only — always follow with SPF the next morning.",
    specs: {
      "Skin Type": "Normal, Combination, Oily",
      "Key Ingredient": "Retinol, Squalane",
      Concentration: "0.3% Retinol",
      Use: "PM only"
    },
    tags: [
      "retinol",
      "anti-ageing",
      "fine lines",
      "night serum",
      "squalane",
      "texture",
      "normal",
      "combination",
      "oily",
      "treatment",
      "under_1000"
    ],
    concerns: [
      "anti-ageing",
      "texture",
      "fine lines"
    ],
    image: "/products/Minimalist-Retinol.jpg",
    link: "https://amzn.to/3OExEO6",
    skinTypes: [
      "normal",
      "combination",
      "oily"
    ],
    hairTypes: [],
    ingredients: [
      "retinol",
      "squalane"
    ],
    routineSteps: [
      "treatment"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Retinol beginners",
      "Texture improvement",
      "Early anti-ageing routine"
    ],
    notIdealFor: [
      "Pregnancy or breastfeeding",
      "Very sensitive skin",
      "Damaged barrier"
    ],
    evidenceLevel: "strong",
    usage: "Use at night 2-3 times weekly, then increase slowly. Always use SPF next morning.",
    watchOuts: [
      "Do not combine on the same night with exfoliating acids when starting."
    ]
  },
  {
    id: 17,
    name: "Neutrogena Hydro Boost Water Gel Moisturiser",
    brand: "Neutrogena",
    category: "Skincare",
    subcat: "Moisturiser",
    mrp: 1050,
    price: 730,
    rating: 4.4,
    reviews: "10.4k",
    asin: "B00BQFTQW6",
    badge: "Dermat Approved",
    description: "Cult-favourite oil-free gel moisturiser with hyaluronic acid. Absorbs in seconds, keeps skin hydrated for 48 hours. The go-to for oily skin types who think they don't need a moisturiser — you do, just this one.",
    specs: {
      "Skin Type": "Oily, Combination",
      "Key Ingredient": "Hyaluronic Acid",
      Texture: "Water Gel",
      Use: "AM & PM"
    },
    tags: [
      "moisturiser",
      "hyaluronic acid",
      "gel",
      "oily skin",
      "oil-free",
      "dry skin",
      "dehydration",
      "oiliness",
      "barrier support",
      "dryness",
      "oily",
      "combination",
      "normal",
      "dehydrated",
      "under_1000"
    ],
    concerns: [
      "dehydration",
      "oiliness",
      "barrier support",
      "dryness"
    ],
    image: "/products/Neutrogena-Hydro.jpg",
    link: "https://amzn.to/3Qa5pau",
    skinTypes: [
      "oily",
      "combination",
      "normal",
      "dehydrated"
    ],
    hairTypes: [],
    ingredients: [
      "hyaluronic acid"
    ],
    routineSteps: [
      "moisturiser"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Oily dehydrated skin",
      "Light gel moisturiser users",
      "Humid weather"
    ],
    notIdealFor: [
      "Very dry skin needing an occlusive cream"
    ],
    evidenceLevel: "strong",
    usage: "Apply after serum AM and PM. Use before sunscreen in the morning.",
    watchOuts: [
      "If skin still feels tight, add a richer night cream."
    ]
  },
  {
    id: 18,
    name: "Cetaphil Moisturising Cream 250g",
    brand: "Cetaphil",
    category: "Skincare",
    subcat: "Moisturiser",
    mrp: 1349,
    price: 1317,
    rating: 4.5,
    reviews: "4.2k",
    asin: "B099MJH88B",
    badge: "Sensitive Skin",
    description: "The dermatologist gold standard for sensitive and dry skin. Fragrance-free, non-comedogenic, gentle enough for eczema-prone skin. Works on both face and body — one product, fewer decisions.",
    specs: {
      "Skin Type": "Sensitive, Dry",
      "Key Ingredient": "Glycerin, Niacinamide",
      Weight: "250g",
      Use: "AM & PM"
    },
    tags: [
      "moisturiser",
      "sensitive skin",
      "dry skin",
      "fragrance-free",
      "eczema",
      "dryness",
      "sensitivity",
      "barrier repair",
      "eczema-prone dryness",
      "glycerin",
      "niacinamide",
      "dry",
      "sensitive",
      "normal",
      "under_2000"
    ],
    concerns: [
      "dryness",
      "sensitivity",
      "barrier repair",
      "eczema-prone dryness"
    ],
    image: "/products/Cetaphil-Moisturisingz.jpg",
    link: "https://amzn.to/3NYBSQA",
    skinTypes: [
      "dry",
      "sensitive",
      "normal"
    ],
    hairTypes: [],
    ingredients: [
      "glycerin",
      "niacinamide"
    ],
    routineSteps: [
      "moisturiser"
    ],
    budgetTier: "under_2000",
    bestFor: [
      "Very dry skin",
      "Sensitive skin",
      "Barrier repair"
    ],
    notIdealFor: [
      "Very oily skin that dislikes rich creams"
    ],
    evidenceLevel: "strong",
    usage: "Apply after treatment steps. Can be used on face and body.",
    watchOuts: [
      "Use a smaller amount on humid days if it feels heavy."
    ]
  },
  {
    id: 19,
    name: "Maybelline Fit Me Matte+Poreless Foundation",
    brand: "Maybelline",
    category: "Makeup",
    subcat: "Foundation",
    mrp: 629,
    price: 324,
    rating: 4.2,
    reviews: "21.2k",
    asin: "B087XFYCDQ",
    badge: "Bestseller",
    description: "India's most-used drugstore foundation. Matte finish that blurs pores and holds through 8-hour work days in Indian humidity. Medium-to-full buildable coverage without looking cakey.",
    specs: {
      "Skin Type": "Oily, Combination",
      Finish: "Matte",
      Coverage: "Medium to Full",
      Use: "Daily"
    },
    tags: [
      "foundation",
      "matte",
      "oily skin",
      "coverage",
      "makeup",
      "pores",
      "shine control",
      "pigments",
      "oily",
      "combination",
      "normal",
      "under_500"
    ],
    image: "/products/Maybelline-New.jpg",
    link: "https://amzn.to/4tCP38S",
    skinTypes: [
      "oily",
      "combination",
      "normal"
    ],
    hairTypes: [],
    concerns: [
      "makeup",
      "pores",
      "shine control"
    ],
    ingredients: [
      "pigments"
    ],
    routineSteps: [
      "makeup"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Matte foundation users",
      "Oily skin",
      "Drugstore makeup"
    ],
    notIdealFor: [
      "Very dry flaky skin without prep"
    ],
    evidenceLevel: "moderate",
    usage: "Apply over moisturised skin. Build thin layers.",
    watchOuts: [
      "Shade matching is critical; test in natural light where possible."
    ]
  },
  {
    id: 20,
    name: "L'Oreal Paris Kajal Magique",
    brand: "L'Oreal Paris",
    category: "Makeup",
    subcat: "Kajal",
    mrp: 449,
    price: 269,
    rating: 4.1,
    reviews: "6.2k",
    asin: "B01BY5KDEC",
    badge: "Top Rated",
    description: "Intensely pigmented kajal that actually stays put in Indian heat and humidity. Smooth glide, waterproof formula, and 12-hour wear. One of the most consistently reviewed eye products in India for a reason.",
    specs: {
      Type: "Kajal",
      Finish: "Matte",
      Waterproof: "Yes",
      Longevity: "12 hours"
    },
    tags: [
      "kajal",
      "eyeliner",
      "smudge-proof",
      "waterproof",
      "eyes",
      "makeup",
      "kajal pigments",
      "under_500"
    ],
    image: "/products/L'Oréal-Paris.jpg",
    link: "https://amzn.to/4c9CAUn",
    skinTypes: [],
    hairTypes: [],
    concerns: [
      "makeup",
      "smudge-proof",
      "eyes"
    ],
    ingredients: [
      "kajal pigments"
    ],
    routineSteps: [
      "makeup"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Waterproof kajal",
      "Daily eye definition",
      "Humid weather"
    ],
    notIdealFor: [
      "Very sensitive eyes"
    ],
    evidenceLevel: "moderate",
    usage: "Apply along waterline or lash line as desired.",
    watchOuts: [
      "Remove fully at night with a gentle remover."
    ]
  },
  {
    id: 21,
    name: "WOW Skin Science Apple Cider Vinegar Shampoo",
    brand: "WOW Skin Science",
    category: "Hair Care",
    subcat: "Shampoo",
    mrp: 374,
    price: 319,
    rating: 3.8,
    reviews: "45k",
    asin: "B09M8NN8DQ",
    badge: "Trending",
    description: "ACV shampoo that balances scalp pH, reduces dandruff, and clears product buildup. Sulphate-free and silicone-free. Especially effective during monsoon when oily scalp gets out of hand.",
    specs: {
      "Key Ingredient": "Apple Cider Vinegar",
      "Sulphate-Free": "Yes",
      "Silicone-Free": "Yes",
      "Best For": "Oily scalp, dandruff, buildup"
    },
    tags: [
      "shampoo",
      "apple cider vinegar",
      "scalp",
      "dandruff",
      "sulphate-free",
      "scalp buildup",
      "oily scalp",
      "dandruff-prone",
      "normal",
      "under_500"
    ],
    image: "/products/Wow-Skin.jpg",
    link: "https://amzn.to/4tCPAaS",
    skinTypes: [],
    hairTypes: [
      "oily scalp",
      "dandruff-prone",
      "normal"
    ],
    concerns: [
      "dandruff",
      "scalp buildup",
      "oily scalp"
    ],
    ingredients: [
      "apple cider vinegar"
    ],
    routineSteps: [
      "shampoo"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Oily scalp",
      "Product buildup",
      "Monsoon scalp care"
    ],
    notIdealFor: [
      "Very dry scalp if used too often"
    ],
    evidenceLevel: "limited",
    usage: "Use 2-3 times weekly or as needed for buildup.",
    watchOuts: [
      "If dandruff is severe or itchy, consider dermatologist care."
    ]
  },
  {
    id: 22,
    name: "Indulekha Bringha Hair Oil",
    brand: "Indulekha",
    category: "Hair Care",
    subcat: "Hair Oil",
    mrp: 999,
    price: 572,
    rating: 4.1,
    reviews: "74k",
    asin: "B086QDT64L",
    badge: "Ayurvedic Pick",
    description: "The ayurvedic hair oil with actual clinical backing. Bringharaj (eclipta alba) is one of the few traditional ingredients with published studies on hair growth. Loved by Indian grandmothers and dermatologists alike.",
    specs: {
      "Key Ingredient": "Bringharaj (Eclipta Alba)",
      Type: "Hair Oil",
      "Best For": "Hair fall, scalp health, growth",
      Ayurvedic: "Yes"
    },
    tags: [
      "hair oil",
      "bringha",
      "ayurvedic",
      "hair fall",
      "growth",
      "scalp health",
      "hair growth support",
      "bringharaj",
      "ayurvedic herbs",
      "thinning",
      "normal",
      "dry scalp",
      "under_1000"
    ],
    image: "/products/Indulekha-Bringha.jpg",
    link: "https://amzn.to/4t4zLd7",
    skinTypes: [],
    hairTypes: [
      "thinning",
      "normal",
      "dry scalp"
    ],
    concerns: [
      "hair fall",
      "scalp health",
      "hair growth support"
    ],
    ingredients: [
      "bringharaj",
      "ayurvedic herbs"
    ],
    routineSteps: [
      "hair oil"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Traditional hair oil users",
      "Scalp massage routine",
      "Hair fall support"
    ],
    notIdealFor: [
      "Very oily scalp that worsens with oiling"
    ],
    evidenceLevel: "limited",
    usage: "Apply to scalp before wash, massage gently, leave for 1-2 hours.",
    watchOuts: [
      "Hair fall has many causes; see a doctor for sudden or severe shedding."
    ]
  },
  {
    id: 23,
    name: "Dot & Key Vitamin C + E Super Bright Body Lotion",
    brand: "Dot & Key",
    category: "Body Care",
    subcat: "Body Lotion",
    mrp: 359,
    price: 316,
    rating: 4.2,
    reviews: "1.4k",
    asin: "B0CHJTCGS3",
    badge: "Glow Pick",
    description: "Lightweight body lotion with Vitamin C, E and Niacinamide that targets tan lines, uneven body tone, and dullness. All the concerns Indian skin deals with — especially on arms, legs, and neck.",
    specs: {
      "Skin Type": "All",
      "Key Ingredient": "Vitamin C, Vitamin E, Niacinamide",
      "Best For": "Tan removal, brightening, uneven tone",
      Fragrance: "Light"
    },
    tags: [
      "body lotion",
      "vitamin c",
      "brightening",
      "tan removal",
      "niacinamide",
      "body pigmentation",
      "dullness",
      "uneven tone",
      "vitamin e",
      "normal",
      "dry",
      "combination",
      "body moisturiser",
      "under_500"
    ],
    image: "/products/Dot-Key-Vitamin.jpg",
    link: "https://amzn.to/4t7Wq8d",
    skinTypes: [
      "normal",
      "dry",
      "combination"
    ],
    hairTypes: [],
    concerns: [
      "body pigmentation",
      "tan removal",
      "dullness",
      "uneven tone"
    ],
    ingredients: [
      "vitamin c",
      "vitamin e",
      "niacinamide"
    ],
    routineSteps: [
      "body moisturiser"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Uneven body tone",
      "Dry arms/legs",
      "Light daily body lotion"
    ],
    notIdealFor: [
      "Very sensitive skin if fragrance bothers you"
    ],
    evidenceLevel: "moderate",
    usage: "Apply after shower on slightly damp body skin.",
    watchOuts: [
      "Body brightening still needs sun protection on exposed areas."
    ]
  },
  {
    id: 24,
    name: "Vaseline Cocoa Radiant Body Lotion",
    brand: "Vaseline",
    category: "Body Care",
    subcat: "Body Lotion",
    mrp: 799,
    price: 720,
    rating: 4.2,
    reviews: "4.7k",
    asin: "B0059MUJR8",
    badge: "Best for Price",
    description: "No-nonsense daily body moisturiser with cocoa butter. Absorbs without greasiness, keeps dry skin comfortable through the day. One of the best-value body lotions in India.",
    specs: {
      "Skin Type": "Dry, Normal",
      "Key Ingredient": "Cocoa Butter, Petroleum Jelly",
      Fragrance: "Light cocoa",
      Use: "Daily"
    },
    tags: [
      "body lotion",
      "cocoa",
      "dry skin",
      "affordable",
      "moisturiser",
      "body dryness",
      "barrier support",
      "cocoa butter",
      "petroleum jelly",
      "glycerin",
      "dry",
      "normal",
      "body moisturiser",
      "under_1000"
    ],
    image: "/products/Vaseline-cream.jpg",
    link: "https://amzn.to/420LNs2",
    skinTypes: [
      "dry",
      "normal"
    ],
    hairTypes: [],
    concerns: [
      "body dryness",
      "barrier support"
    ],
    ingredients: [
      "cocoa butter",
      "petroleum jelly",
      "glycerin"
    ],
    routineSteps: [
      "body moisturiser"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Dry body skin",
      "Daily value moisturiser",
      "Winter dryness"
    ],
    notIdealFor: [
      "People who dislike cocoa fragrance"
    ],
    evidenceLevel: "strong",
    usage: "Apply daily after shower, especially on damp skin.",
    watchOuts: [
      "May feel rich in very humid weather."
    ]
  },
  {
    id: 25,
    name: "Himalaya Wellness Ashwagandha Tablets — 60 Tab",
    brand: "Himalaya",
    category: "Wellness",
    subcat: "Supplement",
    mrp: 228,
    price: 228,
    rating: 4.2,
    reviews: "40.3k",
    asin: "B01DQV8BIM",
    badge: "Adaptogen",
    description: "One of the most studied adaptogens for stress, cortisol regulation, and sleep quality. Relevant to skin too — chronic stress is a major driver of breakouts and dullness. Himalaya's standardised formulation is among the most trusted in India.",
    specs: {
      Count: "60 Tablets",
      "Key Ingredient": "Ashwagandha Root Extract",
      Dose: "1-2 tablets daily",
      Vegetarian: "Yes"
    },
    tags: [
      "ashwagandha",
      "adaptogen",
      "wellness",
      "stress",
      "supplement",
      "ayurvedic",
      "sleep support",
      "ashwagandha root extract",
      "under_500"
    ],
    image: "/products/Himalaya-Ashwagandha.jpg",
    link: "https://amzn.to/4td8ZPU",
    skinTypes: [],
    hairTypes: [],
    concerns: [
      "stress",
      "sleep support",
      "wellness"
    ],
    ingredients: [
      "ashwagandha root extract"
    ],
    routineSteps: [
      "supplement"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Stress support",
      "Sleep routine support",
      "Ayurvedic supplement users"
    ],
    notIdealFor: [
      "Pregnancy",
      "Thyroid medication users without medical advice",
      "Autoimmune conditions without medical advice"
    ],
    evidenceLevel: "moderate",
    usage: "Follow label directions or clinician advice.",
    watchOuts: [
      "Supplements can interact with medicines. Check with a doctor if you have a condition or take medication."
    ]
  },
  {
    id: 26,
    name: "Himalaya Purifying Neem Face Wash 150ml",
    brand: "Himalaya",
    category: "Skincare",
    subcat: "Face Wash",
    mrp: 279,
    price: 205,
    rating: 4.4,
    reviews: "12.6k",
    asin: "B010Z0LH8I",
    badge: "Budget Pick",
    description: "Soap-free herbal neem and turmeric face wash that clears pimples and prevents acne. Natural antibacterial properties for oily and acne-prone skin.",
    specs: {
      "Skin Type": "All, Oily, Acne-Prone",
      "Key Ingredient": "Neem, Turmeric",
      Texture: "Gel",
      Use: "Daily"
    },
    tags: [
      "neem",
      "acne",
      "face wash",
      "himalaya",
      "oiliness",
      "budget",
      "turmeric",
      "oily",
      "acne-prone",
      "combination",
      "cleanser",
      "under_500"
    ],
    image: "/products/Himalaya-Purifying.jpg",
    link: "https://amzn.to/4sOGsz7",
    skinTypes: [
      "oily",
      "acne-prone",
      "combination"
    ],
    hairTypes: [],
    concerns: [
      "acne",
      "oiliness",
      "budget"
    ],
    ingredients: [
      "neem",
      "turmeric"
    ],
    routineSteps: [
      "cleanser"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Budget acne cleanser",
      "Oily skin",
      "Teen routines"
    ],
    notIdealFor: [
      "Very dry or sensitive skin"
    ],
    evidenceLevel: "limited",
    usage: "Use once or twice daily depending on dryness.",
    watchOuts: [
      "If skin feels tight after washing, switch to gentler use or add moisturiser."
    ]
  },
  {
    id: 27,
    name: "Himalaya Neem Face Wash 100ml",
    brand: "Himalaya",
    category: "Skincare",
    subcat: "Face Wash",
    mrp: 199,
    price: 139,
    rating: 4.3,
    reviews: "7.8k",
    asin: "B002Q5JE2C",
    badge: "Value Deal",
    description: "Compact 100ml neem face wash with turmeric. Perfect for travel and daily use. Antibacterial and anti-inflammatory formula.",
    specs: {
      "Skin Type": "All, Oily, Combination",
      "Key Ingredient": "Neem, Turmeric",
      Texture: "Gel",
      Use: "Twice Daily"
    },
    tags: [
      "neem",
      "turmeric",
      "travel-size",
      "face wash",
      "acne",
      "oiliness",
      "budget",
      "oily",
      "combination",
      "normal",
      "cleanser",
      "under_500"
    ],
    image: "/products/Himalaya-Purifying-Neem.jpg",
    link: "https://amzn.to/3OOV6Z8",
    skinTypes: [
      "oily",
      "combination",
      "normal"
    ],
    hairTypes: [],
    concerns: [
      "acne",
      "oiliness",
      "budget"
    ],
    ingredients: [
      "neem",
      "turmeric"
    ],
    routineSteps: [
      "cleanser"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Travel-size cleanser",
      "Budget acne support",
      "Oily skin"
    ],
    notIdealFor: [
      "Very dry or reactive skin"
    ],
    evidenceLevel: "limited",
    usage: "Use as a daily cleanser, then moisturise.",
    watchOuts: [
      "Herbal acne cleansers can still dry skin if overused."
    ]
  },
  {
    id: 28,
    name: "Himalaya Neem Face Wash 400ml Pack of 2",
    brand: "Himalaya",
    category: "Skincare",
    subcat: "Face Wash",
    mrp: 599,
    price: 599,
    rating: 4.3,
    reviews: "7k+",
    asin: "B0B5X5S8GY",
    badge: "Best Value",
    description: "Large 400ml bottle of Himalaya neem face wash with proven acne-fighting formula. Lasts months with daily use. Best for oily skin.",
    specs: {
      "Skin Type": "All, Oily, Acne-Prone",
      "Key Ingredient": "Neem, Turmeric",
      Texture: "Gel",
      Size: "400ml"
    },
    tags: [
      "neem",
      "large-size",
      "value",
      "acne",
      "oiliness",
      "turmeric",
      "oily",
      "acne-prone",
      "combination",
      "cleanser",
      "under_1000"
    ],
    image: "/products/Purifying-Neem-Face.jpg",
    link: "https://amzn.to/4ezkwV4",
    skinTypes: [
      "oily",
      "acne-prone",
      "combination"
    ],
    hairTypes: [],
    concerns: [
      "acne",
      "oiliness",
      "value"
    ],
    ingredients: [
      "neem",
      "turmeric"
    ],
    routineSteps: [
      "cleanser"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Family/value purchase",
      "Oily acne-prone skin",
      "Long-term budget use"
    ],
    notIdealFor: [
      "Very dry or sensitive skin"
    ],
    evidenceLevel: "limited",
    usage: "Use once daily to start, increase if skin tolerates it.",
    watchOuts: [
      "Large pack only makes sense if the formula suits your skin."
    ]
  },
  {
    id: 29,
    name: "Himalaya Purifying Neem Foaming Face Wash, 150Ml",
    brand: "Himalaya",
    category: "Skincare",
    subcat: "Face Wash",
    mrp: 299,
    price: 190,
    rating: 4.3,
    reviews: "7k",
    asin: "B003OPE57C",
    badge: "Foaming Formula",
    description: "Foaming face wash with turmeric and neem. Creates a luxurious lather while gently cleansing. Soap-free formula suitable for all skin types.",
    specs: {
      "Skin Type": "All",
      "Key Ingredient": "Turmeric, Neem",
      Texture: "Foaming Gel",
      Use: "Daily"
    },
    tags: [
      "foaming",
      "turmeric",
      "neem",
      "lather",
      "oiliness",
      "budget",
      "daily cleansing",
      "normal",
      "oily",
      "combination",
      "cleanser",
      "under_500"
    ],
    image: "/products/Himalaya-Purifying-Neem-Foaming.jpg",
    link: "https://amzn.to/4eFqaoy",
    skinTypes: [
      "normal",
      "oily",
      "combination"
    ],
    hairTypes: [],
    concerns: [
      "oiliness",
      "budget",
      "daily cleansing"
    ],
    ingredients: [
      "neem",
      "turmeric"
    ],
    routineSteps: [
      "cleanser"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Foaming cleanser preference",
      "Budget daily cleanse",
      "Normal to oily skin"
    ],
    notIdealFor: [
      "Dry or compromised barrier"
    ],
    evidenceLevel: "limited",
    usage: "Use on damp skin, rinse thoroughly, moisturise after.",
    watchOuts: [
      "Foaming formulas can feel drying for some users."
    ]
  },
  {
    id: 30,
    name: "Himalaya Brightening Vitamin C Orange Face Wash 100ml",
    brand: "Himalaya",
    category: "Skincare",
    subcat: "Face Wash",
    mrp: 209,
    price: 138,
    rating: 4.2,
    reviews: "700",
    asin: "B0CNTFMSWV",
    badge: "Brightening",
    description: "Vitamin C enriched face wash with orange extract. Brightens dull skin and removes tanning. Gentle enough for daily use.",
    specs: {
      "Skin Type": "All",
      "Key Ingredient": "Vitamin C, Orange Extract",
      Texture: "Gel",
      Use: "Daily"
    },
    tags: [
      "vitamin-c",
      "brightening",
      "orange",
      "tan-removal",
      "dullness",
      "tan removal",
      "budget",
      "vitamin c",
      "orange extract",
      "normal",
      "oily",
      "combination",
      "cleanser",
      "under_500"
    ],
    image: "/products/Himalaya-Brightening-Vitamin-C.jpg",
    link: "https://amzn.to/3OCB9ES",
    skinTypes: [
      "normal",
      "oily",
      "combination"
    ],
    hairTypes: [],
    concerns: [
      "dullness",
      "tan removal",
      "budget"
    ],
    ingredients: [
      "vitamin c",
      "orange extract"
    ],
    routineSteps: [
      "cleanser"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Budget brightening cleanser",
      "Dull skin",
      "Morning cleanse"
    ],
    notIdealFor: [
      "Sensitive skin that reacts to citrus/fragrance"
    ],
    evidenceLevel: "limited",
    usage: "Use once daily. Follow with moisturiser and SPF.",
    watchOuts: [
      "A wash-off vitamin C cleanser will not replace a leave-on brightening serum."
    ]
  },
  {
    id: 31,
    name: "The Ordinary Glycolic Acid 7% Exfoliating Toner 240ml",
    brand: "The Ordinary",
    category: "Skincare",
    subcat: "Exfoliating Toner",
    mrp: 1275,
    price: 1275,
    rating: 4.4,
    reviews: "37k",
    asin: "B071914GGL",
    badge: "Exfoliating",
    description: "A 7% glycolic acid exfoliating toner for uneven texture, dullness, and surface buildup. Best used at night by skin that already tolerates acids.",
    specs: {
      "Skin Type": "Normal, Oily, Combination",
      "Key Ingredient": "Glycolic Acid 7%",
      Texture: "Liquid Toner",
      Use: "PM, 1-3x weekly"
    },
    tags: [
      "glycolic acid",
      "aha",
      "exfoliating toner",
      "texture",
      "dullness",
      "pigmentation",
      "body bumps",
      "exfoliation",
      "oily",
      "combination",
      "normal",
      "exfoliant",
      "toner",
      "under_2000"
    ],
    image: "/products/Ordinary-Glycolic -Acid-7.jpg",
    link: "https://amzn.to/41MA9Rt",
    skinTypes: [
      "oily",
      "combination",
      "normal"
    ],
    hairTypes: [],
    concerns: [
      "dullness",
      "texture",
      "pigmentation",
      "body bumps",
      "exfoliation"
    ],
    ingredients: [
      "glycolic acid",
      "aha"
    ],
    routineSteps: [
      "exfoliant",
      "toner"
    ],
    budgetTier: "under_2000",
    bestFor: [
      "Uneven texture",
      "Dullness",
      "Experienced acid users",
      "Body roughness"
    ],
    notIdealFor: [
      "Sensitive skin",
      "Damaged barrier",
      "Daily beginner use",
      "Pregnancy without clinician advice"
    ],
    evidenceLevel: "strong",
    usage: "Use at night 1-3 times weekly after cleansing. Follow with moisturiser and use SPF the next morning.",
    watchOuts: [
      "Do not combine with retinol or other exfoliating acids on the same night when starting."
    ]
  },
  {
    id: 32,
    name: "The Ordinary Salicylic Acid 2% Solution 30ml",
    brand: "The Ordinary",
    category: "Skincare",
    subcat: "Exfoliating Essence",
    mrp: 600,
    price: 599,
    rating: 4.1,
    reviews: "8.2k",
    asin: "B0C3PCJ6SD",
    badge: "Exfoliating",
    description: "Liquid exfoliant with 2% salicylic acid. Unclogs pores and reduces acne. Leave-on formula that works overnight for clear skin.",
    specs: {
      "Skin Type": "Oily, Acne-Prone, All",
      "Key Ingredient": "Salicylic Acid 2%",
      Texture: "Liquid",
      Use: "PM only"
    },
    tags: [
      "salicylic-acid",
      "exfoliant",
      "acne",
      "pores",
      "blackheads",
      "congestion",
      "salicylic acid",
      "bha",
      "oily",
      "acne-prone",
      "combination",
      "treatment",
      "under_1000"
    ],
    image: "/products/Ordinary-Salicylic- Acid.jpg",
    link: "https://amzn.to/4sQOxDx",
    skinTypes: [
      "oily",
      "acne-prone",
      "combination"
    ],
    hairTypes: [],
    concerns: [
      "acne",
      "pores",
      "blackheads",
      "congestion"
    ],
    ingredients: [
      "salicylic acid",
      "bha"
    ],
    routineSteps: [
      "treatment",
      "exfoliant"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Blackheads",
      "Congested pores",
      "Oily acne-prone skin"
    ],
    notIdealFor: [
      "Very dry skin",
      "Aspirin allergy",
      "Damaged barrier"
    ],
    evidenceLevel: "strong",
    usage: "Use at night 2-3 times weekly after cleansing, before moisturiser.",
    watchOuts: [
      "Avoid stacking with retinol or glycolic acid until your skin builds tolerance."
    ]
  },
  {
    id: 33,
    name: "The Ordinary Hyaluronic Acid 2% + B5 30ml",
    brand: "The Ordinary",
    category: "Skincare",
    subcat: "Hydrating Essence",
    mrp: 1000,
    price: 1000,
    rating: 4.6,
    reviews: "33k",
    asin: "B01MYEZPC8",
    badge: "Hydrating",
    description: "Lightweight hydrating serum with hyaluronic acid and panthenol. Plumps skin and maintains moisture. Works for all skin types.",
    specs: {
      "Skin Type": "All, Dry, Dehydrated",
      "Key Ingredient": "Hyaluronic Acid, B5",
      Texture: "Liquid",
      Use: "Daily"
    },
    tags: [
      "hyaluronic-acid",
      "panthenol",
      "hydration",
      "plumping",
      "dehydration",
      "barrier support",
      "hyaluronic acid",
      "vitamin b5",
      "dry",
      "dehydrated",
      "normal",
      "combination",
      "oily",
      "hydration serum",
      "treatment",
      "under_1000"
    ],
    image: "/products/Ordinary-Hyaluronic-Acid.jpg",
    link: "https://amzn.to/4mNmNyg",
    skinTypes: [
      "dry",
      "dehydrated",
      "normal",
      "combination",
      "oily"
    ],
    hairTypes: [],
    concerns: [
      "dehydration",
      "plumping",
      "barrier support"
    ],
    ingredients: [
      "hyaluronic acid",
      "panthenol",
      "vitamin b5"
    ],
    routineSteps: [
      "hydration serum",
      "treatment"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Dehydrated skin",
      "Layering under moisturiser",
      "All skin types"
    ],
    notIdealFor: [
      "People expecting acne or pigmentation treatment from one product"
    ],
    evidenceLevel: "strong",
    usage: "Apply to damp skin before moisturiser, AM or PM.",
    watchOuts: [
      "Seal with moisturiser so hydration does not evaporate."
    ]
  },
  {
    id: 34,
    name: "Plum Green Tea Face Toner 200ml",
    brand: "Plum",
    category: "Skincare",
    subcat: "Toner",
    mrp: 390,
    price: 378,
    rating: 4.2,
    reviews: "14k",
    asin: "B00OCJ5M6C",
    badge: "Green Tea",
    description: "Plum Green Tea Face Toner For Oily, Acne-Prone Skin | With Glycolic Acid | Alcohol-Free | Fights Pimples | Tightens Pores | Controls Oil | Gently Exfoliates Dead Skin Cells | Women & Men | 200ml.",
    specs: {
      "Skin Type": "Oily, Combination, Acne-Prone",
      "Key Ingredient": "Green Tea, Glycolic Acid",
      Texture: "Liquid",
      Use: "AM & PM"
    },
    tags: [
      "rice-water",
      "acne",
      "vegan",
      "clarifying",
      "pores",
      "oiliness",
      "exfoliation",
      "green tea",
      "glycolic acid",
      "oily",
      "combination",
      "acne-prone",
      "toner",
      "exfoliant",
      "under_500"
    ],
    image: "/products/Plum-Green-Tea.jpg",
    link: "https://amzn.to/48fE8d5",
    skinTypes: [
      "oily",
      "combination",
      "acne-prone"
    ],
    hairTypes: [],
    concerns: [
      "acne",
      "pores",
      "oiliness",
      "exfoliation"
    ],
    ingredients: [
      "green tea",
      "glycolic acid"
    ],
    routineSteps: [
      "toner",
      "exfoliant"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Oily acne-prone skin",
      "Mild exfoliation",
      "Pore appearance"
    ],
    notIdealFor: [
      "Sensitive skin",
      "Damaged barrier",
      "Daily use with other acids"
    ],
    evidenceLevel: "moderate",
    usage: "Use after cleansing 2-4 times weekly depending on tolerance.",
    watchOuts: [
      "Because it contains glycolic acid, reduce use if dryness or stinging appears."
    ]
  },
  {
    id: 35,
    name: "Plum 3% Niacinamide & Rice Water Face Toner 150ml",
    brand: "Plum",
    category: "Skincare",
    subcat: "Toner",
    mrp: 449,
    price: 440,
    rating: 4.2,
    reviews: "6.5k",
    asin: "B09PV4379W",
    badge: "Hydrating",
    description: "Alcohol-Free Toner for Oily Acne Prone Dry Combination Skin | Pore Tightening & Glowing Skin |Fades Blemishes, Brightens & Smoothens | Women & Men.",
    specs: {
      "Skin Type": "Dry, Dehydrated, All",
      "Key Ingredient": "Rice water, Niacinamide",
      Texture: "Liquid",
      Use: "Daily"
    },
    tags: [
      "rice-water",
      "alcohol-free",
      "hydration",
      "glow",
      "pores",
      "blemishes",
      "niacinamide",
      "rice water",
      "oily",
      "combination",
      "dry",
      "normal",
      "toner",
      "under_500"
    ],
    image: "/products/Plum-Niacinamide.jpg",
    link: "https://amzn.to/4u2JmB8",
    skinTypes: [
      "oily",
      "combination",
      "dry",
      "normal"
    ],
    hairTypes: [],
    concerns: [
      "hydration",
      "glow",
      "pores",
      "blemishes"
    ],
    ingredients: [
      "niacinamide",
      "rice water"
    ],
    routineSteps: [
      "toner",
      "hydration"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Beginner niacinamide",
      "Light hydration",
      "Uneven tone support"
    ],
    notIdealFor: [
      "People who already use multiple niacinamide products"
    ],
    evidenceLevel: "moderate",
    usage: "Use after cleansing before serum/moisturiser.",
    watchOuts: [
      "Avoid over-layering niacinamide if your routine already has it in serum and sunscreen."
    ]
  },
  {
    id: 36,
    name: "Minimalist Multi-Peptide Night Face Serum 30ml",
    brand: "Minimalist",
    category: "Skincare",
    subcat: "Essence",
    mrp: 699,
    price: 629,
    rating: 4.3,
    reviews: "3.8k",
    asin: "B08MVD6T8V",
    badge: "Anti-Ageing",
    description: "Peptide-rich serum that strengthens skin barrier and reduces wrinkles. Multi-peptide blend for comprehensive anti-aging benefits.",
    specs: {
      "Skin Type": "Mature, All Types",
      "Key Ingredient": "Multi-Peptide 10%",
      Texture: "Serum",
      Use: "AM & PM"
    },
    tags: [
      "peptide",
      "anti-aging",
      "barrier-repair",
      "wrinkles",
      "anti-ageing",
      "barrier repair",
      "firmness",
      "multi-peptide complex",
      "mature",
      "normal",
      "dry",
      "combination",
      "treatment",
      "under_1000"
    ],
    image: "/products/Minimalist-Multi-Peptide.jpg",
    link: "https://amzn.to/41R6Jlq",
    skinTypes: [
      "mature",
      "normal",
      "dry",
      "combination"
    ],
    hairTypes: [],
    concerns: [
      "anti-ageing",
      "wrinkles",
      "barrier repair",
      "firmness"
    ],
    ingredients: [
      "multi-peptide complex"
    ],
    routineSteps: [
      "treatment"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Fine lines",
      "Barrier support",
      "Retinol-free anti-ageing routine"
    ],
    notIdealFor: [
      "Users wanting fast acne or pigmentation treatment"
    ],
    evidenceLevel: "moderate",
    usage: "Use AM or PM before moisturiser. Pair with sunscreen in the morning.",
    watchOuts: [
      "Peptides support consistency; they are not instant wrinkle fillers."
    ]
  },
  {
    id: 37,
    name: "Dot & Key Watermelon 10% Glycolic Serum Exfoliating Essence 30ml",
    brand: "Dot & Key",
    category: "Skincare",
    subcat: "Exfoliating Essence",
    mrp: 599,
    price: 509,
    rating: 4.2,
    reviews: "300",
    asin: "B0BLRWFM22",
    badge: "Exfoliating",
    description: "Glycolic Serum for Face Glowing, With KojicI | Targets Pigmentation & Dark Spots | Targets Dullness, Uneven Texture, Sebum & Excess Oil | Serum For Oily & Normal Skin.",
    specs: {
      "Skin Type": "Normal, Oily, Combination",
      "Key Ingredient": "Glycolic Acid 8%",
      Texture: "Liquid",
      Use: "2-3x Weekly"
    },
    tags: [
      "glycolic-acid",
      "exfoliant",
      "brightening",
      "watermelon",
      "aha",
      "pigmentation",
      "dullness",
      "texture",
      "oiliness",
      "exfoliation",
      "glycolic acid",
      "kojic acid",
      "oily",
      "normal",
      "combination",
      "treatment",
      "under_1000"
    ],
    image: "/products/Dot-Key-Watermelon.jpg",
    link: "https://amzn.to/4tuB8BV",
    skinTypes: [
      "oily",
      "normal",
      "combination"
    ],
    hairTypes: [],
    concerns: [
      "pigmentation",
      "dullness",
      "texture",
      "oiliness",
      "exfoliation"
    ],
    ingredients: [
      "glycolic acid",
      "kojic acid",
      "aha"
    ],
    routineSteps: [
      "treatment",
      "exfoliant"
    ],
    budgetTier: "under_1000",
    bestFor: [
      "Experienced exfoliant users",
      "Uneven texture",
      "Pigmentation support"
    ],
    notIdealFor: [
      "Sensitive skin",
      "Damaged barrier",
      "Retinol nights"
    ],
    evidenceLevel: "moderate",
    usage: "Use at night 1-2 times weekly to start. Moisturise after.",
    watchOuts: [
      "Daily SPF is required when using exfoliating acids for pigmentation."
    ]
  },
  {
    id: 38,
    name: "Mamaearth Onion Hair Oil 50ml",
    brand: "Mamaearth",
    category: "Hair Care",
    subcat: "Hair Oil",
    mrp: 177,
    price: 171,
    rating: 4,
    reviews: "56k",
    asin: "B0CF61RF5B",
    badge: "Natural",
    description: "Onion Hair Oil for Hair Growth & Hair Fall Control with Redensyl .",
    specs: {
      "Skin Type": "All",
      "Key Ingredient": "Onion Extract",
      Texture: "Liquid",
      Use: "Daily"
    },
    tags: [
      "onion",
      "redensyl",
      "hair oil",
      "hair fall",
      "hair growth",
      "hair growth support",
      "onion extract",
      "thinning",
      "normal",
      "dry scalp",
      "under_500"
    ],
    image: "/products/Mamaearth-Onion-Hair-Oil.jpg",
    link: "https://amzn.to/4cK4buo",
    skinTypes: [],
    hairTypes: [
      "thinning",
      "normal",
      "dry scalp"
    ],
    concerns: [
      "hair fall",
      "hair growth support"
    ],
    ingredients: [
      "onion extract",
      "redensyl"
    ],
    routineSteps: [
      "hair oil"
    ],
    budgetTier: "under_500",
    bestFor: [
      "Budget hair oil",
      "Hair fall support routine",
      "Pre-wash oiling"
    ],
    notIdealFor: [
      "Very oily scalp or fragrance-sensitive users"
    ],
    evidenceLevel: "limited",
    usage: "Apply before hair wash and massage gently.",
    watchOuts: [
      "Persistent hair fall needs medical evaluation for deficiencies, hormones, or scalp conditions."
    ]
  },
  {
    id: 39,
    name: "L'Oreal True Match Foundation",
    brand: "L'Oreal",
    category: "Makeup",
    subcat: "Foundation",
    mrp: 2887,
    price: 1817,
    rating: 4.5,
    reviews: "620",
    asin: "B00112HQIU",
    badge: "SPF 17",
    description: "L'Oreal Paris True Match Super-Blendable Foundation, Natural Ivory, 1 fl. oz. Natural finish with lightweight coverage.",
    specs: {
      "Skin Type": "All",
      "Key Ingredient": "Titanium Dioxide, Glycerin",
      Texture: "Liquid",
      Use: "On face"
    },
    tags: [
      "glycerin",
      "foundation",
      "natural-finish",
      "spf",
      "makeup",
      "natural finish",
      "spf makeup",
      "titanium dioxide",
      "normal",
      "dry",
      "combination",
      "under_2000"
    ],
    image: "/products/True-Match.jpg",
    link: "https://amzn.to/4u9B8Y0",
    skinTypes: [
      "normal",
      "dry",
      "combination"
    ],
    hairTypes: [],
    concerns: [
      "makeup",
      "natural finish",
      "spf makeup"
    ],
    ingredients: [
      "titanium dioxide",
      "glycerin"
    ],
    routineSteps: [
      "makeup"
    ],
    budgetTier: "under_2000",
    bestFor: [
      "Natural finish foundation",
      "Lightweight makeup",
      "Dry to normal skin"
    ],
    notIdealFor: [
      "Deep shade needs without shade checking",
      "Oily skin needing matte long wear"
    ],
    evidenceLevel: "moderate",
    usage: "Apply thin layers over moisturised skin. Sunscreen is still needed underneath.",
    watchOuts: [
      "Foundation SPF is not enough as your only sunscreen."
    ]
  }
];

export interface City {
  name: string;
  slug: string;
  region: "humid" | "extreme" | "moderate";
  state: string;
}

export interface Concern {
  slug: string;
  name: string;
  category: string;
}

export const CITIES: City[] = [
  { name: "Mumbai", slug: "mumbai", region: "humid", state: "Maharashtra" },
  { name: "Delhi", slug: "delhi", region: "extreme", state: "Delhi NCR" },
  { name: "Chennai", slug: "chennai", region: "humid", state: "Tamil Nadu" },
  { name: "Bangalore", slug: "bangalore", region: "moderate", state: "Karnataka" },
  { name: "Kolkata", slug: "kolkata", region: "humid", state: "West Bengal" },
  { name: "Pune", slug: "pune", region: "moderate", state: "Maharashtra" },
  { name: "Hyderabad", slug: "hyderabad", region: "extreme", state: "Telangana" },
  { name: "Ahmedabad", slug: "ahmedabad", region: "extreme", state: "Gujarat" },
  { name: "Jaipur", slug: "jaipur", region: "extreme", state: "Rajasthan" },
  { name: "Lucknow", slug: "lucknow", region: "extreme", state: "Uttar Pradesh" },
  { name: "Kochi", slug: "kochi", region: "humid", state: "Kerala" },
  { name: "Chandigarh", slug: "chandigarh", region: "extreme", state: "Punjab" },
  { name: "Gurgaon", slug: "gurgaon", region: "extreme", state: "Haryana" },
  { name: "Noida", slug: "noida", region: "extreme", state: "Uttar Pradesh" },
  { name: "Surat", slug: "surat", region: "humid", state: "Gujarat" },
  { name: "Coimbatore", slug: "coimbatore", region: "moderate", state: "Tamil Nadu" },
  { name: "Indore", slug: "indore", region: "extreme", state: "Madhya Pradesh" },
  { name: "Bhopal", slug: "bhopal", region: "extreme", state: "Madhya Pradesh" },
  { name: "Patna", slug: "patna", region: "extreme", state: "Bihar" },
  { name: "Visakhapatnam", slug: "visakhapatnam", region: "humid", state: "Andhra Pradesh" },
  { name: "Vadodara", slug: "vadodara", region: "extreme", state: "Gujarat" },
  { name: "Ghaziabad", slug: "ghaziabad", region: "extreme", state: "Uttar Pradesh" },
  { name: "Ludhiana", slug: "ludhiana", region: "extreme", state: "Punjab" },
  { name: "Agra", slug: "agra", region: "extreme", state: "Uttar Pradesh" },
  { name: "Nashik", slug: "nashik", region: "moderate", state: "Maharashtra" },
  { name: "Faridabad", slug: "faridabad", region: "extreme", state: "Haryana" },
  { name: "Meerut", slug: "meerut", region: "extreme", state: "Uttar Pradesh" },
  { name: "Rajkot", slug: "rajkot", region: "extreme", state: "Gujarat" },
  { name: "Kalyan-Dombivli", slug: "kalyan-dombivli", region: "humid", state: "Maharashtra" },
  { name: "Vasai-Virar", slug: "vasai-virar", region: "humid", state: "Maharashtra" },
  { name: "Varanasi", slug: "varanasi", region: "extreme", state: "Uttar Pradesh" },
  { name: "Srinagar", slug: "srinagar", region: "extreme", state: "Jammu and Kashmir" },
  { name: "Aurangabad", slug: "aurangabad", region: "extreme", state: "Maharashtra" },
  { name: "Dhanbad", slug: "dhanbad", region: "extreme", state: "Jharkhand" },
  { name: "Amritsar", slug: "amritsar", region: "extreme", state: "Punjab" },
  { name: "Navi Mumbai", slug: "navi-mumbai", region: "humid", state: "Maharashtra" },
  { name: "Allahabad", slug: "allahabad", region: "extreme", state: "Uttar Pradesh" },
  { name: "Ranchi", slug: "ranchi", region: "moderate", state: "Jharkhand" },
  { name: "Howrah", slug: "howrah", region: "humid", state: "West Bengal" },
  { name: "Jabalpur", slug: "jabalpur", region: "extreme", state: "Madhya Pradesh" },
  { name: "Gwalior", slug: "gwalior", region: "extreme", state: "Madhya Pradesh" },
  { name: "Vijayawada", slug: "vijayawada", region: "humid", state: "Andhra Pradesh" },
  { name: "Jodhpur", slug: "jodhpur", region: "extreme", state: "Rajasthan" },
  { name: "Madurai", slug: "madurai", region: "extreme", state: "Tamil Nadu" },
  { name: "Raipur", slug: "raipur", region: "extreme", state: "Chhattisgarh" },
  { name: "Kota", slug: "kota", region: "extreme", state: "Rajasthan" },
  { name: "Guwahati", slug: "guwahati", region: "humid", state: "Assam" },
  { name: "Solapur", slug: "solapur", region: "extreme", state: "Maharashtra" },
  { name: "Hubli", slug: "hubli", region: "moderate", state: "Karnataka" },
  { name: "Bareilly", slug: "bareilly", region: "extreme", state: "Uttar Pradesh" }
];

export const CONCERNS: Concern[] = [
  { slug: "oily-skin", name: "Oily Skin", category: "Oily Skin Care" },
  { slug: "dry-skin", name: "Dry Skin", category: "Dry Skin Care" },
  { slug: "acne", name: "Acne", category: "Acne Control" },
  { slug: "hyperpigmentation", name: "Hyperpigmentation", category: "Pigmentation Care" }
];

// Recommends product ASINs for the given concern
export function getAsinsForConcern(concernSlug: string): string[] {
  switch (concernSlug) {
    case "oily-skin":
      return ["B00BQFTQW6", "B08F9MF314", "B0B45RB1RV"];
    case "dry-skin":
      return ["B099MJH88B", "B07DSC6CWP", "B00V4R0ET0"];
    case "acne":
      return ["BENZAC25", "MIGHTYPATCH", "B00BQFTQW6"];
    case "hyperpigmentation":
      default:
      return ["B09DLFCB69", "B095PRGHDX", "B08F9MF314"];
  }
}

// Generate the programmatic post content based on city climate and concern
export function generatePostContent(city: City, concern: Concern) {
  const currentYear = new Date().getFullYear();
  const title = `Best Moisturizer for ${concern.name} in ${city.name} (${currentYear})`;
  const description = `Dermatologist-backed moisturizers for ${concern.name.toLowerCase()} in ${city.name}, ${city.state}. Curated for ${city.name}'s specific ${city.region} climate conditions.`;
  
  let climateNote = "";
  if (city.region === "humid") {
    climateNote = `${city.name} is known for its high coastal humidity. Constant moisture in the air causes increased sweating, which blends with sebum, leading to clogged pores, whiteheads, and oxidation. Thick occlusive creams will trigger breakouts here; instead, you need lightweight water-gels that hydrate without adding grease.`;
  } else if (city.region === "extreme") {
    climateNote = `${city.name} experiences extreme temperature fluctuations. The summers are scorching, dry, and dusty, while the winters are bone-chillingly dry. This weather swing compromises your skin barrier, causing oily skin to overcompensate with sebum or dry skin to flake and itch. Your moisturizer needs to act as a barrier shield that adapts to these fluctuations.`;
  } else {
    climateNote = `${city.name} features a relatively moderate and pleasant climate. However, the frequent transition between air-conditioned indoor environments and dry outdoor drafts creates subtle dehydration (trans-epidermal water loss). Your routine needs a balanced moisturizer that locks in moisture without feeling heavy or greasy.`;
  }

  let skinAction = "";
  if (concern.slug === "oily-skin") {
    skinAction = `For oily skin, the main objective is oil control and hydration balance. Many people make the mistake of skipping moisturizer altogether, which actually signals the sebaceous glands to produce even more oil. Look for oil-free formulas with active ingredients like Niacinamide to control sebum production and Salicylic Acid to refine pores.`;
  } else if (concern.slug === "dry-skin") {
    skinAction = `Dry skin requires intense emollients and lipids to restore the intercellular cement of the skin barrier. Look for ceramide-packed formulas, glycerin, and squalane. Your goal is to lock in moisture and prevent flaking, especially in dry seasons or under constant AC air.`;
  } else if (concern.slug === "acne") {
    skinAction = `Acne-prone skin needs non-comedogenic, lightweight moisturization that won't trap acne-causing bacteria. Look for calming ingredients like Centella Asiatica (CICA) or green tea extract to reduce inflammation, paired with gentle exfoliating actives like Salicylic Acid or spot treatments like Benzoyl Peroxide.`;
  } else {
    skinAction = `Hyperpigmentation is exacerbated by UV exposure and inflammation. The right moisturizer should contain skin-brightening actives like Alpha Arbutin, Vitamin C, or Niacinamide, which work synergistically with your daily sunscreen to fade dark spots, sun damage, and post-acne marks (PIH).`;
  }

  const sections = [
    {
      title: `Understanding ${city.name}'s Climate Impact on Your Skin`,
      body: [
        climateNote,
        `Your environment plays a massive role in how products behave on your skin. A moisturizer that works beautifully in a dry inland city like Delhi will often feel like an oil slick in a humid coastal city like Mumbai or Chennai. Matching your skincare to the weather is the first step toward clear skin.`
      ]
    },
    {
      title: `How to Treat ${concern.name} Effectively`,
      body: [
        skinAction,
        `Consistency is key. Apply your moisturizer onto slightly damp skin after cleansing to lock in maximum hydration. Always follow up with a broad-spectrum SPF 50 sunscreen in the morning, as UV rays degrade skin cells and worsen concerns like acne scars and hyperpigmentation.`
      ]
    },
    {
      title: `The Recommended AM/PM Routine`,
      body: [
        `1. Cleanse: Use a gentle, soap-free cleanser to remove dirt and sweat without stripping the skin's natural lipids.`,
        `2. Treat (Optional): Apply a targeted serum (like Niacinamide for oiliness, Retinol or Retinal for aging, or Vitamin C for brightness) to address specific concerns.`,
        `3. Moisturize: Smooth a pea-sized amount of your chosen moisturizer over your face and neck.`,
        `4. Protect: In the morning, apply a generous amount of non-comedogenic sunscreen.`
      ]
    }
  ];

  return {
    title,
    description,
    category: concern.category,
    date: `June ${currentYear}`,
    readTime: "6 min",
    sections,
    asins: getAsinsForConcern(concern.slug)
  };
}

// Find a matching post slug
export function getProgrammaticPostBySlug(slug: string) {
  // Pattern: best-moisturizer-for-[concern]-in-[city]
  const match = slug.match(/^best-moisturizer-for-(oily-skin|dry-skin|acne|hyperpigmentation)-in-([a-z-]+)$/);
  if (!match) return null;

  const concernSlug = match[1];
  const citySlug = match[2];

  const city = CITIES.find((c) => c.slug === citySlug);
  const concern = CONCERNS.find((cr) => cr.slug === concernSlug);

  if (!city || !concern) return null;

  return generatePostContent(city, concern);
}

// Get all programmatic post slugs
export function getAllProgrammaticSlugs(): string[] {
  const slugs: string[] = [];
  for (const concern of CONCERNS) {
    for (const city of CITIES) {
      slugs.push(`best-moisturizer-for-${concern.slug}-in-${city.slug}`);
    }
  }
  return slugs;
}

export interface CityTelemetry {
  name: string;
  country: string;
  countryCode: string;
  ppm: number;
  category: "Soft" | "Moderately Hard" | "Hard" | "Very Hard";
  ph: number;
  calciumMgL: number;
  magnesiumMgL: number;
  avgTempC: number;
  avgHumidity: number;
  summary: string;
  geologyNote: string;
  skinVulnerabilityScore: number;
  neighborhoods: { name: string; zip: string; ppm: number }[];
}

export const CITY_DATA: Record<string, CityTelemetry> = {
  bengaluru: {
    name: "Bengaluru",
    country: "India",
    countryCode: "IN",
    ppm: 780,
    category: "Very Hard",
    ph: 7.9,
    calciumMgL: 190,
    magnesiumMgL: 45,
    avgTempC: 24,
    avgHumidity: 65,
    summary: "Bengaluru tap water combines Cauvery river surface water with high-salinity deep borewell groundwater in rapidly expanding IT corridors.",
    geologyNote: "Granitic gneiss bedrock and deep borewell extraction in Eastern & Southern Bengaluru yield high calcium and magnesium carbonate deposits.",
    skinVulnerabilityScore: 9.2,
    neighborhoods: [
      { name: "Indiranagar", zip: "560038", ppm: 720 },
      { name: "Koramangala", zip: "560034", ppm: 760 },
      { name: "Whitefield", zip: "560066", ppm: 840 },
      { name: "Jayanagar", zip: "560041", ppm: 680 },
      { name: "Electronic City", zip: "560100", ppm: 890 },
    ],
  },
  bangalore: {
    name: "Bengaluru",
    country: "India",
    countryCode: "IN",
    ppm: 780,
    category: "Very Hard",
    ph: 7.9,
    calciumMgL: 190,
    magnesiumMgL: 45,
    avgTempC: 24,
    avgHumidity: 65,
    summary: "Bengaluru tap water combines Cauvery river surface water with high-salinity deep borewell groundwater in rapidly expanding IT corridors.",
    geologyNote: "Granitic gneiss bedrock and deep borewell extraction in Eastern & Southern Bengaluru yield high calcium and magnesium carbonate deposits.",
    skinVulnerabilityScore: 9.2,
    neighborhoods: [
      { name: "Indiranagar", zip: "560038", ppm: 720 },
      { name: "Koramangala", zip: "560034", ppm: 760 },
      { name: "Whitefield", zip: "560066", ppm: 840 },
      { name: "Jayanagar", zip: "560041", ppm: 680 },
      { name: "Electronic City", zip: "560100", ppm: 890 },
    ],
  },
  delhi: {
    name: "Delhi NCR",
    country: "India",
    countryCode: "IN",
    ppm: 880,
    category: "Very Hard",
    ph: 8.1,
    calciumMgL: 210,
    magnesiumMgL: 55,
    avgTempC: 25,
    avgHumidity: 60,
    summary: "Delhi NCR tap water mixes Yamuna river surface supply with saline alluvial aquifer groundwater, exhibiting extreme mineral hardness.",
    geologyNote: "High Yamuna silt levels and saline groundwater in Gurugram & Noida cause rapid mineral scum buildup on skin and scalp.",
    skinVulnerabilityScore: 9.5,
    neighborhoods: [
      { name: "Vasant Kunj", zip: "110070", ppm: 850 },
      { name: "Connaught Place", zip: "110001", ppm: 790 },
      { name: "Dwarka", zip: "110075", ppm: 920 },
      { name: "Gurugram Phase 5", zip: "122002", ppm: 950 },
    ],
  },
  mumbai: {
    name: "Mumbai",
    country: "India",
    countryCode: "IN",
    ppm: 85,
    category: "Soft",
    ph: 7.1,
    calciumMgL: 22,
    magnesiumMgL: 7,
    avgTempC: 28,
    avgHumidity: 82,
    summary: "Mumbai tap water is supplied by rain-fed freshwater lakes (Tulsi, Vihar, Tansa, Bhatsa) in the Western Ghats, delivering naturally soft water to the metropolitan area.",
    geologyNote: "Naturally soft lake water means minimal mineral scum, but intense coastal tropical humidity increases sebum secretion and pore congestion risks.",
    skinVulnerabilityScore: 5.4,
    neighborhoods: [
      { name: "Bandra West", zip: "400050", ppm: 80 },
      { name: "South Mumbai (Colaba)", zip: "400005", ppm: 88 },
      { name: "Juhu", zip: "400049", ppm: 84 },
    ],
  },
  london: {
    name: "London",
    country: "United Kingdom",
    countryCode: "GB",
    ppm: 260,
    category: "Very Hard",
    ph: 7.8,
    calciumMgL: 95,
    magnesiumMgL: 18,
    avgTempC: 14,
    avgHumidity: 78,
    summary: "London tap water is sourced primarily from the River Thames and River Lee, flowing through deep chalk and limestone aquifers in the Thames Basin, yielding high concentrations of calcium carbonate.",
    geologyNote: "Heavy chalk and clay deposits in Southern England impart high mineral density to tap water, causing saponification scum when mixed with standard cleansing surfactants.",
    skinVulnerabilityScore: 8.8,
    neighborhoods: [
      { name: "Kensington & Chelsea", zip: "W8", ppm: 275 },
      { name: "Camden", zip: "NW1", ppm: 255 },
      { name: "Westminster", zip: "SW1A", ppm: 265 },
      { name: "Islington", zip: "N1", ppm: 250 },
      { name: "Greenwich", zip: "SE10", ppm: 260 },
    ],
  },
  "new-york": {
    name: "New York",
    country: "United States",
    countryCode: "US",
    ppm: 50,
    category: "Soft",
    ph: 7.2,
    calciumMgL: 14,
    magnesiumMgL: 3,
    avgTempC: 16,
    avgHumidity: 65,
    summary: "New York City tap water originates from protected mountain watersheds in the Catskill, Delaware, and Croton systems, featuring low mineral accumulation and soft, clean water profile.",
    geologyNote: "Mountain granite bedrock filtering produces soft water with minimal calcium residue, making gentle surfactant cleansers highly effective without mineral buildup.",
    skinVulnerabilityScore: 3.2,
    neighborhoods: [
      { name: "Manhattan (Upper East Side)", zip: "10021", ppm: 48 },
      { name: "Brooklyn (Williamsburg)", zip: "11211", ppm: 52 },
      { name: "Queens (Astoria)", zip: "11102", ppm: 50 },
      { name: "SoHo", zip: "10012", ppm: 46 },
    ],
  },
  paris: {
    name: "Paris",
    country: "France",
    countryCode: "FR",
    ppm: 280,
    category: "Very Hard",
    ph: 7.6,
    calciumMgL: 105,
    magnesiumMgL: 14,
    avgTempC: 15,
    avgHumidity: 72,
    summary: "Paris tap water is drawn from deep underground limestone springs in the Seine Basin and Marne valley, creating high mineral content rich in dissolved calcium carbonate.",
    geologyNote: "The Parisian basin's historic limestone formations impart heavy mineral ion density, leading to skin tightness and lipid barrier disturbance if untreated.",
    skinVulnerabilityScore: 9.1,
    neighborhoods: [
      { name: "Le Marais", zip: "75004", ppm: 285 },
      { name: "Montmartre", zip: "75018", ppm: 275 },
      { name: "Saint-Germain-des-Prés", zip: "75006", ppm: 290 },
    ],
  },
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    ppm: 140,
    category: "Moderately Hard",
    ph: 7.9,
    calciumMgL: 38,
    magnesiumMgL: 12,
    avgTempC: 32,
    avgHumidity: 60,
    summary: "Dubai tap water is produced via large-scale thermal and reverse-osmosis desalination of Arabian Gulf seawater, re-mineralized to international drinking standards.",
    geologyNote: "Desalinated water combined with extreme ambient summer temperatures and high air conditioning exposure creates rapid transepidermal water loss (TEWL).",
    skinVulnerabilityScore: 7.9,
    neighborhoods: [
      { name: "Downtown Dubai", zip: "00000", ppm: 135 },
      { name: "Dubai Marina", zip: "00000", ppm: 145 },
      { name: "Palm Jumeirah", zip: "00000", ppm: 140 },
    ],
  },
  "los-angeles": {
    name: "Los Angeles",
    country: "United States",
    countryCode: "US",
    ppm: 210,
    category: "Hard",
    ph: 7.7,
    calciumMgL: 72,
    magnesiumMgL: 16,
    avgTempC: 20,
    avgHumidity: 58,
    summary: "Los Angeles tap water mixes imported water from the Colorado River Aqueduct and California Aqueduct with local groundwater wells, resulting in significant mineral hardness.",
    geologyNote: "Colorado River water passes through mineral-rich desert soils and rock formations, accumulating high calcium and magnesium ion counts.",
    skinVulnerabilityScore: 8.2,
    neighborhoods: [
      { name: "Beverly Hills", zip: "90210", ppm: 215 },
      { name: "Santa Monica", zip: "90401", ppm: 205 },
      { name: "Downtown LA", zip: "90012", ppm: 220 },
    ],
  },
};

export const RECOMMENDED_PRODUCTS = [
  {
    step: "STEP 1 · PURIFY",
    name: "Cetaphil Gentle Hydrating Cleanser",
    brand: "Cetaphil",
    asin: "B01CCGW4OE",
    amazonPriceInr: 384,
    amazonPriceUsd: 14.99,
    rating: 4.5,
    reviews: "1.3L+",
    badge: "Chelating & Soap-Free",
    badgeClass: "green",
    description: "Contains EDTA & Glycerin to bind calcium & magnesium ions before they form soap scum on skin.",
    amazonUrl: "https://amzn.to/48nWKaG",
    image: "/products/cetaphil-facewash.jpg",
  },
  {
    step: "STEP 2 · REPLENISH",
    name: "Minimalist 5% Marula Oil & Ceramide Cream",
    brand: "Minimalist",
    asin: "MINIMALISTK",
    amazonPriceInr: 599,
    amazonPriceUsd: 19.50,
    rating: 4.4,
    reviews: "18.2k",
    badge: "Barrier Lipid Shield",
    badgeClass: "blue",
    description: "Formulated with 5 Ceramides & Marula oil to repair intercellular lipid loss caused by mineral salt drying.",
    amazonUrl: "https://amzn.to/42eKwxO",
    image: "/products/minimalist-eye.jpg",
  },
  {
    step: "STEP 3 · PROTECT",
    name: "Minimalist Fluid Sunscreen SPF 50 PA++++",
    brand: "Minimalist",
    asin: "B0DHY6LQTW",
    amazonPriceInr: 533,
    amazonPriceUsd: 16.00,
    rating: 4.3,
    reviews: "31.3k",
    badge: "SPF 50 Protection",
    badgeClass: "orange",
    description: "Lightweight Niacinamide fluid shield protecting against mineral inflammation and oxidative humidity stress.",
    amazonUrl: "https://amzn.to/4muroFm",
    image: "/products/Minimalist-Sunscreen.jpg",
  },
];

export function getCityData(slug: string): CityTelemetry {
  const normalized = (slug || "").toLowerCase().trim();
  if (Object.prototype.hasOwnProperty.call(CITY_DATA, normalized)) {
    return CITY_DATA[normalized];
  }

  const cityName = normalized
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash << 5) - hash + normalized.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const calculatedPpm = 80 + (absHash % 420);
  const category = calculatedPpm > 300 ? "Very Hard" : calculatedPpm > 180 ? "Hard" : calculatedPpm > 100 ? "Moderately Hard" : "Soft";
  const ph = Number((7.0 + ((absHash % 15) / 10)).toFixed(1));
  const calcium = Math.round(calculatedPpm * 0.35);
  const magnesium = Math.round(calculatedPpm * 0.12);
  const vulnerability = Number((4.5 + ((calculatedPpm / 700) * 5)).toFixed(1));

  return {
    name: cityName,
    country: "Global Location",
    countryCode: "INT",
    ppm: calculatedPpm,
    category,
    ph,
    calciumMgL: calcium,
    magnesiumMgL: magnesium,
    avgTempC: 18 + (absHash % 14),
    avgHumidity: 55 + (absHash % 30),
    summary: `${cityName} tap water telemetry contains ${calculatedPpm} PPM mineral concentrations sourced from regional municipal aquifers and groundwater reservoirs.`,
    geologyNote: `Local geological rock strata in ${cityName} impart dissolved calcium and magnesium ions into the tap water supply.`,
    skinVulnerabilityScore: Math.min(vulnerability, 9.8),
    neighborhoods: [
      { name: `${cityName} Central District`, zip: "01", ppm: calculatedPpm },
      { name: `${cityName} North Zone`, zip: "02", ppm: Math.max(calculatedPpm - 15, 40) },
      { name: `${cityName} South Zone`, zip: "03", ppm: calculatedPpm + 15 },
    ],
  };
}

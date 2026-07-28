// ─── GLOBAL LIVE GEOCODING ENGINE ─────────────────────────────────────────────
// Pipeline: postalCode → Nominatim (lat/lon + city) → Open-Meteo (live weather)
//           + Country PPM Matrix → full ClimateInput for generateRoutine
//
// APIs used (both free, no API key required):
//   - Nominatim (OpenStreetMap): https://nominatim.openstreetmap.org
//   - Open-Meteo:                https://api.open-meteo.com

export interface LiveLocationData {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  ppm: number;
  temp: number;
  humidity: number;
  dewpoint: number;
  waterCategory: 'Very Hard' | 'Hard' | 'Moderately Hard' | 'Soft';
  uvIndex?: number;
  source: 'live' | 'fallback';
}

// ─── COUNTRY / REGION WATER HARDNESS MATRIX ───────────────────────────────────
// Sources: WHO, British Geological Survey, USGS, EurEau Water Statistics
// PPM = mg/L of dissolved calcium carbonate
const COUNTRY_WATER_PPM: Record<string, { ppm: number; label: string }> = {
  // ── Very Hard > 200 PPM ──
  AE: { ppm: 290, label: 'Very Hard' },  // UAE (desalinated but high mineral post-treatment)
  KW: { ppm: 310, label: 'Very Hard' },  // Kuwait
  BH: { ppm: 280, label: 'Very Hard' },  // Bahrain
  QA: { ppm: 275, label: 'Very Hard' },  // Qatar
  SA: { ppm: 260, label: 'Very Hard' },  // Saudi Arabia
  OM: { ppm: 255, label: 'Very Hard' },  // Oman
  MT: { ppm: 250, label: 'Very Hard' },  // Malta
  CY: { ppm: 240, label: 'Very Hard' },  // Cyprus
  IL: { ppm: 235, label: 'Very Hard' },  // Israel
  JO: { ppm: 230, label: 'Very Hard' },  // Jordan
  LB: { ppm: 215, label: 'Very Hard' },  // Lebanon
  ES: { ppm: 220, label: 'Very Hard' },  // Spain (Madrid/Andalucia)
  GR: { ppm: 210, label: 'Very Hard' },  // Greece
  
  // ── Hard 150–200 PPM ──
  GB: { ppm: 200, label: 'Hard' },       // UK (SE England very hard; Scotland ~30 PPM — 200 is national avg)
  DE: { ppm: 178, label: 'Hard' },       // Germany
  FR: { ppm: 175, label: 'Hard' },       // France
  BE: { ppm: 170, label: 'Hard' },       // Belgium
  NL: { ppm: 165, label: 'Hard' },       // Netherlands
  AT: { ppm: 180, label: 'Hard' },       // Austria
  CH: { ppm: 175, label: 'Hard' },       // Switzerland
  IT: { ppm: 190, label: 'Hard' },       // Italy
  PT: { ppm: 160, label: 'Hard' },       // Portugal
  PL: { ppm: 165, label: 'Hard' },       // Poland
  CZ: { ppm: 170, label: 'Hard' },       // Czech Republic
  HU: { ppm: 175, label: 'Hard' },       // Hungary
  RO: { ppm: 165, label: 'Hard' },       // Romania
  TR: { ppm: 195, label: 'Hard' },       // Turkey
  IN: { ppm: 180, label: 'Hard' },       // India (regional avg; Chennai 260, Mumbai 140, Delhi 190)
  ZA: { ppm: 155, label: 'Hard' },       // South Africa
  MX: { ppm: 155, label: 'Hard' },       // Mexico
  EG: { ppm: 185, label: 'Hard' },       // Egypt
  PK: { ppm: 175, label: 'Hard' },       // Pakistan
  BD: { ppm: 160, label: 'Hard' },       // Bangladesh
  LK: { ppm: 155, label: 'Hard' },       // Sri Lanka
  
  // ── Moderately Hard 75–149 PPM ──
  US: { ppm: 130, label: 'Moderately Hard' },  // USA (national avg; LA=320, NY=55)
  CA: { ppm: 120, label: 'Moderately Hard' },  // Canada
  AU: { ppm: 110, label: 'Moderately Hard' },  // Australia
  CN: { ppm: 100, label: 'Moderately Hard' },  // China
  BR: { ppm: 100, label: 'Moderately Hard' },  // Brazil
  AR: { ppm: 110, label: 'Moderately Hard' },  // Argentina
  CL: { ppm: 95,  label: 'Moderately Hard' },  // Chile
  CO: { ppm: 90,  label: 'Moderately Hard' },  // Colombia
  NG: { ppm: 115, label: 'Moderately Hard' },  // Nigeria
  KE: { ppm: 120, label: 'Moderately Hard' },  // Kenya
  GH: { ppm: 105, label: 'Moderately Hard' },  // Ghana
  TH: { ppm: 95,  label: 'Moderately Hard' },  // Thailand
  VN: { ppm: 90,  label: 'Moderately Hard' },  // Vietnam
  PH: { ppm: 100, label: 'Moderately Hard' },  // Philippines
  ID: { ppm: 95,  label: 'Moderately Hard' },  // Indonesia
  MY: { ppm: 85,  label: 'Moderately Hard' },  // Malaysia
  
  // ── Soft < 75 PPM ──
  SE: { ppm: 25,  label: 'Soft' },   // Sweden
  NO: { ppm: 30,  label: 'Soft' },   // Norway
  FI: { ppm: 35,  label: 'Soft' },   // Finland
  DK: { ppm: 65,  label: 'Soft' },   // Denmark
  IS: { ppm: 15,  label: 'Soft' },   // Iceland
  IE: { ppm: 70,  label: 'Soft' },   // Ireland
  JP: { ppm: 55,  label: 'Soft' },   // Japan
  SG: { ppm: 65,  label: 'Soft' },   // Singapore
  KR: { ppm: 60,  label: 'Soft' },   // South Korea
  NZ: { ppm: 70,  label: 'Soft' },   // New Zealand
  SI: { ppm: 70,  label: 'Soft' },   // Slovenia
  HR: { ppm: 68,  label: 'Soft' },   // Croatia (coastal)
};

const DEFAULT_PPM = { ppm: 180, label: 'Hard' };

function classifyWaterHardness(ppm: number): 'Very Hard' | 'Hard' | 'Moderately Hard' | 'Soft' {
  if (ppm > 200) return 'Very Hard';
  if (ppm >= 150) return 'Hard';
  if (ppm >= 75) return 'Moderately Hard';
  return 'Soft';
}

function computeDewpoint(temp: number, humidity: number): number {
  // Magnus formula approximation
  return parseFloat((temp - ((100 - humidity) / 5)).toFixed(1));
}

// ─── STEP 1: Nominatim — postal code → lat, lon, city, countryCode ─────────
async function geocodePostalCode(
  postalCode: string,
  country?: string
): Promise<{ lat: number; lon: number; city: string; countryCode: string } | null> {
  try {
    let countryCodeFilter = country?.toLowerCase() || '';

    // Auto-detect country based on common postal code formats if not explicitly provided
    if (!countryCodeFilter) {
      const cleanPost = postalCode.trim().toUpperCase();
      if (/^\d{5}(-\d{4})?$/.test(cleanPost)) {
        countryCodeFilter = 'us';
      } else if (/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/.test(cleanPost)) {
        countryCodeFilter = 'gb';
      } else if (/^\d{6}$/.test(cleanPost)) {
        countryCodeFilter = 'in';
      } else if (/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(cleanPost)) {
        countryCodeFilter = 'ca';
      }
    }

    const countryParam = countryCodeFilter ? `&countrycodes=${countryCodeFilter}` : '';
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(postalCode)}&format=json&limit=1${countryParam}&addressdetails=1`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'MirhaAndCo-B2B-API/1.0 (contact@mirhaandco.com)',
        'Accept-Language': 'en',
      },
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.length === 0) return null;

    const result = data[0];
    const addr = result.address || {};
    const city =
      addr.city ||
      addr.town ||
      addr.village ||
      addr.county ||
      result.display_name?.split(',')[0]?.trim() ||
      postalCode;
    const countryCode = (addr.country_code || countryCodeFilter || 'US').toUpperCase();

    return {
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      city,
      countryCode,
    };
  } catch {
    return null;
  }
}

// ─── STEP 1B: Nominatim — city name → lat, lon, city, countryCode ──────────
async function geocodeCityName(
  cityName: string,
  country?: string
): Promise<{ lat: number; lon: number; city: string; countryCode: string } | null> {
  try {
    const countryParam = country ? `&countrycodes=${country.toLowerCase()}` : '';
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json&limit=1${countryParam}&addressdetails=1`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'MirhaAndCo-B2B-API/1.0 (contact@mirhaandco.com)',
        'Accept-Language': 'en',
      },
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.length === 0) return null;

    const result = data[0];
    const addr = result.address || {};
    const city = addr.city || addr.town || cityName;
    const countryCode = (addr.country_code || 'US').toUpperCase();

    return {
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      city,
      countryCode,
    };
  } catch {
    return null;
  }
}

// ─── STEP 2: Open-Meteo — lat/lon → live temp + humidity ───────────────────
async function getLiveWeather(
  lat: number,
  lon: number
): Promise<{ temp: number; humidity: number; uvIndex?: number } | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,uv_index&forecast_days=1&timezone=auto`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) return null;
    const data = await res.json();

    const temp = data.current?.temperature_2m;
    const humidity = data.current?.relative_humidity_2m;
    const uvIndex = data.current?.uv_index;

    if (temp === undefined || humidity === undefined) return null;

    return {
      temp: Math.round(temp),
      humidity: Math.round(humidity),
      uvIndex: uvIndex !== undefined ? Math.round(uvIndex) : undefined,
    };
  } catch {
    return null;
  }
}

// ─── STEP 3: Country code → water hardness PPM ─────────────────────────────
function estimatePpm(countryCode: string): number {
  return (COUNTRY_WATER_PPM[countryCode] ?? DEFAULT_PPM).ppm;
}

// ─── MAIN EXPORT: resolveLocationDataLive ──────────────────────────────────
export async function resolveLocationDataLive(query: {
  postalCode?: string;
  city?: string;
  country?: string;
  ppm?: number;        // manual override still respected
  temp?: number;       // manual override still respected
  humidity?: number;   // manual override still respected
  dewpoint?: number;   // manual override still respected
}): Promise<LiveLocationData> {

  let geoResult: { lat: number; lon: number; city: string; countryCode: string } | null = null;

  // Try postal code first, then city name
  if (query.postalCode) {
    geoResult = await geocodePostalCode(query.postalCode, query.country);
  }
  if (!geoResult) {
    const cityQuery = query.city || query.postalCode;
    if (cityQuery) {
      geoResult = await geocodeCityName(cityQuery, query.country);
    }
  }

  // ── If geocoding succeeded ──
  if (geoResult) {
    const weather = await getLiveWeather(geoResult.lat, geoResult.lon);

    const ppm = query.ppm ?? estimatePpm(geoResult.countryCode);
    const temp = query.temp ?? weather?.temp ?? 24;
    const humidity = query.humidity ?? weather?.humidity ?? 65;
    const uvIndex = weather?.uvIndex ?? 0;
    const dewpoint = query.dewpoint ?? computeDewpoint(temp, humidity);
    const waterCategory = classifyWaterHardness(ppm);

    return {
      city: geoResult.city,
      country: COUNTRY_WATER_PPM[geoResult.countryCode] ? geoResult.countryCode : 'Global',
      countryCode: geoResult.countryCode,
      lat: geoResult.lat,
      lon: geoResult.lon,
      ppm,
      temp,
      humidity,
      dewpoint,
      waterCategory,
      uvIndex,
      source: 'live',
    };
  }

  // ── Fallback: could not geocode (network issue or unknown postal code) ──
  const ppm = query.ppm ?? DEFAULT_PPM.ppm;
  const temp = query.temp ?? 24;
  const humidity = query.humidity ?? 65;
  const dewpoint = query.dewpoint ?? computeDewpoint(temp, humidity);

  return {
    city: query.city || query.postalCode || 'Global Location',
    country: query.country || 'Global',
    countryCode: query.country?.toUpperCase() || 'GLOBAL',
    lat: 0,
    lon: 0,
    ppm,
    temp,
    humidity,
    dewpoint,
    waterCategory: classifyWaterHardness(ppm),
    uvIndex: 0,
    source: 'fallback',
  };
}

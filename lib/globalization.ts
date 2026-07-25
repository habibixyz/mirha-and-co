export type Locale = "en" | "hi" | "ar" | "es" | "fr";
export type Currency = "INR" | "USD" | "EUR" | "GBP" | "AED" | "SAR";

export interface CurrencyConfig {
 code: Currency;
 symbol: string;
 rate: number; // 1 INR = rate selected_currency
 locale: string;
 amazonDomain: string;
 affiliateTag: string;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
 INR: {
 code: "INR",
 symbol: "₹",
 rate: 1.0,
 locale: "en-IN",
 amazonDomain: "amazon.in",
 affiliateTag: "skinwithtanvi-21",
 },
 USD: {
 code: "USD",
 symbol: "$",
 rate: 0.012, // 1 INR = 0.012 USD
 locale: "en-US",
 amazonDomain: "amazon.com",
 affiliateTag: "skinwithtanvi-20",
 },
 EUR: {
 code: "EUR",
 symbol: "€",
 rate: 0.011, // 1 INR = 0.011 EUR
 locale: "de-DE",
 amazonDomain: "amazon.de",
 affiliateTag: "skinwithtanvi-20",
 },
 GBP: {
 code: "GBP",
 symbol: "£",
 rate: 0.0095, // 1 INR = 0.0095 GBP
 locale: "en-GB",
 amazonDomain: "amazon.co.uk",
 affiliateTag: "skinwithtan00-21",
 },
 AED: {
 code: "AED",
 symbol: "د.إ",
 rate: 0.044, // 1 INR = 0.044 AED
 locale: "ar-AE",
 amazonDomain: "amazon.ae",
 affiliateTag: "skinwithtanvi-20",
 },
 SAR: {
 code: "SAR",
 symbol: "ر.س",
 rate: 0.045, // 1 INR = 0.045 SAR
 locale: "ar-SA",
 amazonDomain: "amazon.sa",
 affiliateTag: "skinwithtanvi-20",
 },
};export const RTL_LOCALES: Locale[] = ["ar"];

export const DICTIONARY: Record<Locale, Record<string, string>> = {
 en: {
 "nav.ingredients": "Ingredient Checker",
 "nav.hardwater": "Hard Water",
 "nav.dupes": "Dupe Finder",
 "nav.kbeauty": "K-Beauty",
 "nav.men": "Men",
 "nav.blog": "Blog",
 "nav.b2b": "B2B SaaS",
 "nav.pricing": "Pricing",
 "nav.about": "About",
 "nav.dashboard": "Dashboard",
 "hero.eyebrow": "Mirha & Co. / The Global AI Skincare Assistant",
 "hero.title1": "Skincare,",
 "hero.title2": "decoded by AI.",
 "hero.copy": "We analyze ingredient science, cross-reference clinical research, and curate the market's best products. Upload your routine, scan ingredients, or get an instant AI analysis to build your perfect, science-backed regimen.",
 "hero.btn.primary": "Create Free AI Profile",
 "hero.btn.secondary": "Explore AI Tools",
 "hero.panel.tag": "Editor's Choice",
 "hero.panel.title": "AI Skin Analysis.",
 "hero.panel.desc": "Our advanced vision model analyzes your unique facial structure, skin type, and specific concerns to instantly map out your optimal, science-backed routine.",
 "trust.independent": "Advanced Vision AI",
 "trust.backed": "Instant Analysis",
 "trust.zero": "Personalized Routine",
 "section.concerns.title": "Target your skin concern",
 "section.concerns.desc": "We specialize in finding options tailored for real-world issues.",
 "section.editor.title": "Editor's Top Picks",
 "section.editor.desc": "Curated, science-backed recommendations for daily use.",
 "section.shop.title": "The Skincare Shelf",
 "section.shop.desc": "Browse all our top recommendations. Use the filters or search bar to find products.",
 "search.placeholder": "Search by ingredient, concern, or brand (e.g. Niacinamide, oily skin)...",
 "filter.category.all": "All",
 "filter.category.skincare": "Skincare",
 "filter.category.makeup": "Makeup",
 "filter.category.haircare": "Hair Care",
 "filter.category.bodycare": "Body Care",
 "filter.category.wellness": "Wellness",
 "filter.category.mensgrooming": "Men's Grooming",
 "filter.category.fragrance": "Fragrance",
 "filter.vegan": "Veg / Vegan Only",
 "filter.crueltyfree": "Cruelty-Free Only",
 "product.bestfor": "Best for",
 "product.viewdetails": "View details",
 "product.off": "off",
 "product.price": "Price",
 "product.rating": "Rating",
 "product.saving": "Saving",
 "product.amazon_btn": "View on Amazon",
 "product.back": "Back to picks",
 "product.avoid_if": "Avoid If",
 "product.how_to_use": "How To Use",
 "product.mirha_notes": "Mirha Notes",
 "product.key_details": "Key Details",
 "product.ingredients_notice": "Ingredients To Notice",
 "product.related": "Related picks",
 "product.disclosure": "Affiliate link. Mirha & Co. may earn commission at no extra cost to you. Prices may change on Amazon.",
 },
 hi: {
    "nav.ingredients": "सामग्री चेकर",
    "nav.hardwater": "हार्ड वाटर टेस्ट",
    "nav.dupes": "डुप फाइंडर",
    "nav.kbeauty": "के-ब्यूटी",
    "nav.men": "पुरुषों की स्किनकेयर",
    "nav.blog": "ब्लॉग",
    "nav.b2b": "B2B टेलीमेट्री API",
 "nav.pricing": "मूल्य निर्धारण",
 "nav.about": "हमारे बारे में",
 "nav.dashboard": "डैशबोर्ड",
 "hero.eyebrow": "मिर्हा एंड कंपनी / क्यूरेटेड ब्यूटी इंटेलिजेंस",
 "hero.title1": "स्किनकेयर,",
 "hero.title2": "स्पष्ट और सटीक।",
 "hero.copy": "हम सामग्री विज्ञान का विश्लेषण करते हैं, नैदानिक अनुसंधान का संदर्भ लेते हैं, और बाजार के सर्वोत्तम उत्पादों को चुनते हैं। कोई विपणन का झांसा नहीं—केवल स्पष्ट शिक्षा, उत्पाद मिलान और आपकी दिनचर्या को ट्रैक करने के लिए एक स्मार्ट डैशबोर्ड।",
 "hero.btn.primary": "पिक्स एक्सप्लोर करें",
 "hero.btn.secondary": "सामग्री जांचें",
 "hero.panel.tag": "संपादक की पसंद",
 "hero.panel.title": "क्यूरेटेड डेटा, शून्य शोर।",
 "hero.panel.desc": "हम सक्रिय सांद्रता, आणविक आकार और विशेषज्ञ नैदानिक अध्ययनों की छानबीन करते हैं। वास्तविक डेटाबेस तथ्यों को देखने और अपनी दिनचर्या बनाने के लिए त्वचा की चिंता चुनें।",
 "trust.independent": "गहन सामग्री अनुसंधान",
 "trust.backed": "व्यक्तिगत डैशबोर्ड",
 "trust.zero": "निष्पक्ष क्यूरेशन",
 "section.concerns.title": "अपनी त्वचा की चिंता पर ध्यान दें",
 "section.concerns.desc": "हम वास्तविक दुनिया की समस्याओं के लिए विशेष रूप से तैयार किए गए विकल्प खोजने में विशेषज्ञ हैं।",
 "section.editor.title": "संपादक की शीर्ष पसंद",
 "section.editor.desc": "दैनिक उपयोग के लिए क्यूरेटेड, विज्ञान-आधारित सिफारिशें।",
 "section.shop.title": "स्किनकेयर शेल्फ",
 "section.shop.desc": "हमारी सभी शीर्ष सिफारिशें ब्राउज़ करें। उत्पाद खोजने के लिए फ़िल्टर या खोज बार का उपयोग करें।",
 "search.placeholder": "सामग्री, चिंता या ब्रांड द्वारा खोजें (जैसे नियासिनामाइड, तैलीय त्वचा)...",
 "filter.category.all": "सभी",
 "filter.category.skincare": "स्किनकेयर",
 "filter.category.makeup": "मेकअप",
 "filter.category.haircare": "हेयर केयर",
 "filter.category.bodycare": "बॉडी केयर",
 "filter.category.wellness": "वेलनेस",
 "filter.category.mensgrooming": "पुरुषों की ग्रूमिंग",
 "filter.category.fragrance": "सुगंध (इत्र)",
 "filter.vegan": "केवल शाकाहारी / वीगन",
 "filter.crueltyfree": "क्रूरता-मुक्त केवल",
 "product.bestfor": "इसके लिए सर्वश्रेष्ठ",
 "product.viewdetails": "विवरण देखें",
 "product.off": "छूट",
 "product.price": "कीमत",
 "product.rating": "रेटिंग",
 "product.saving": "बचत",
 "product.amazon_btn": "अमेज़न पर देखें",
 "product.back": "पिक्स पर वापस जाएं",
 "product.avoid_if": "इससे बचें यदि",
 "product.how_to_use": "इस्तेमाल कैसे करें",
 "product.mirha_notes": "मिर्हा नोट्स",
 "product.key_details": "मुख्य विवरण",
 "product.ingredients_notice": "ध्यान देने योग्य सामग्री",
 "product.related": "संबंधित उत्पाद",
 "product.disclosure": "संबद्ध लिंक। मिर्हा एंड कंपनी बिना किसी अतिरिक्त लागत के कमीशन कमा सकती है। अमेज़न पर कीमतें बदल सकती हैं।",
 },
 ar: {
 "nav.ingredients": "فاحص المكونات",
 "nav.blog": "المدونة",
 "nav.pricing": "الأسعار",
 "nav.about": "من نحن",
 "nav.dashboard": "لوحة التحكم",
 "hero.eyebrow": "ميرها وشركاؤها / تنظيم ذكي لمنتجات التجميل",
 "hero.title1": "عناية بالبشرة،",
 "hero.title2": "بلا فلتر.",
 "hero.copy": "نحلل علم المكونات، ونقاطع الأبحاث السريرية، وننظم أفضل المنتجات في السوق. بلا كلام تسويقي فارغ — فقط تثقيف واضح، ومطابقة المنتجات، ولوحة تحكم ذكية لتتبع روتينك.",
 "hero.btn.primary": "استكشف الترشيحات",
 "hero.btn.secondary": "افحص المكونات",
 "hero.panel.tag": "خيار المحرر",
 "hero.panel.title": "بيانات منظمة، بلا ضجيج.",
 "hero.panel.desc": "نبحث في التركيزات النشطة، والأحجام الجزيئية، والدراسات السريرية للخبراء. اختاري مشكلة بشرتك لرؤية حقائق قاعدة البيانات الفعلية وبناء روتينك.",
 "trust.independent": "بحث عميق للمكونات",
 "trust.backed": "لوحة تحكم مخصصة",
 "trust.zero": "تنظيم غير متحيز",
 "section.concerns.title": "استهدفي مشكلة بشرتك",
 "section.concerns.desc": "نحن متخصصون في العثور على خيارات مخصصة لمشاكل البشرة الحقيقية.",
 "section.editor.title": "أفضل ترشيحات المحرر",
 "section.editor.desc": "توصيات منتقاة ومدعومة علمياً للاستخدام اليومي.",
 "section.shop.title": "رف العناية بالبشرة",
 "section.shop.desc": "تصفح جميع توصياتنا المميزة. استخدم الفلاتر أو شريط البحث للعثور على المنتجات.",
 "search.placeholder": "ابحثي حسب المكون، المشكلة، أو الماركة (مثال: نياسيناميد، بشرة دهنية)...",
 "filter.category.all": "الكل",
 "filter.category.skincare": "العناية بالبشرة",
 "filter.category.makeup": "المكياج",
 "filter.category.haircare": "العناية بالشعر",
 "filter.category.bodycare": "العناية بالجسم",
 "filter.category.wellness": "الصحة والعافية",
 "filter.category.mensgrooming": "العناية بالرجل",
 "filter.category.fragrance": "العطور",
 "filter.vegan": "نباتي فقط",
 "filter.crueltyfree": "غير مجرب على الحيوانات",
 "product.bestfor": "أفضل لـ",
 "product.viewdetails": "عرض التفاصيل",
 "product.off": "خصم",
 "product.price": "السعر",
 "product.rating": "التقييم",
 "product.saving": "التوفير",
 "product.amazon_btn": "عرض على أمازون",
 "product.back": "العودة للترشيحات",
 "product.avoid_if": "تجنبيه إذا",
 "product.how_to_use": "طريقة الاستخدام",
 "product.mirha_notes": "ملاحظات ميرها",
 "product.key_details": "تفاصيل رئيسية",
 "product.ingredients_notice": "المكونات الملاحظة",
 "product.related": "ترشيحات ذات صلة",
 "product.disclosure": "رابط تسويق بالعمولة. قد تكسب ميرها وشركاؤها عمولة دون أي تكلفة إضافية عليك. قد تتغير الأسعار على أمازون.",
 },
 es: {
 "nav.ingredients": "Analizador de Ingredientes",
 "nav.blog": "Blog",
 "nav.pricing": "Precios",
 "nav.about": "Sobre Nosotros",
 "nav.dashboard": "Panel de Control",
 "hero.eyebrow": "Mirha & Co. / Inteligencia de Belleza Curada",
 "hero.title1": "Skincare,",
 "hero.title2": "sin filtros.",
 "hero.copy": "Analizamos la ciencia de los ingredientes, contrastamos la investigación clínica y seleccionamos los mejores productos del mercado. Sin rodeos de marketing: solo educación clara, combinaciones de productos y un panel inteligente para rastrear tu rutina.",
 "hero.btn.primary": "Explorar Selección",
 "hero.btn.secondary": "Verificar Ingredientes",
 "hero.panel.tag": "Elección del Editor",
 "hero.panel.title": "Datos curados, cero ruido.",
 "hero.panel.desc": "Filtramos concentraciones activas, tamaños moleculares y estudios clínicos de expertos. Selecciona un problema de piel para ver los hechos reales de la base de datos y armar tu rutina.",
 "trust.independent": "Investigación de Ingredientes",
 "trust.backed": "Panel Personalizado",
 "trust.zero": "Curación Imparcial",
 "section.concerns.title": "Aborda tus problemas de piel",
 "section.concerns.desc": "Nos especializamos en encontrar opciones adaptadas a problemas del mundo real.",
 "section.editor.title": "Mejores Selecciones del Editor",
 "section.editor.desc": "Recomendaciones seleccionadas y respaldadas por la ciencia para el uso diario.",
 "section.shop.title": "El Estante de Cuidado de la Piel",
 "section.shop.desc": "Explora todas nuestras principales recomendaciones. Usa los filtros o la barra de búsqueda para encontrar productos.",
 "search.placeholder": "Buscar por ingrediente, problema o marca (ej. Niacinamida, piel grasa)...",
 "filter.category.all": "Todos",
 "filter.category.skincare": "Cuidado de la Piel",
 "filter.category.makeup": "Maquillaje",
 "filter.category.haircare": "Cuidado del Cabello",
 "filter.category.bodycare": "Cuidado del Cuerpo",
 "filter.category.wellness": "Bienestar",
 "filter.category.mensgrooming": "Cuidado Masculino",
 "filter.category.fragrance": "Fragancias",
 "filter.vegan": "Solo Vegano",
 "filter.crueltyfree": "Libre de Crueldad",
 "product.bestfor": "Ideal para",
 "product.viewdetails": "Ver detalles",
 "product.off": "de descuento",
 "product.price": "Precio",
 "product.rating": "Calificación",
 "product.saving": "Ahorro",
 "product.amazon_btn": "Ver en Amazon",
 "product.back": "Volver a selecciones",
 "product.avoid_if": "Evitar Si",
 "product.how_to_use": "Modo de Uso",
 "product.mirha_notes": "Notas de Mirha",
 "product.key_details": "Detalles Clave",
 "product.ingredients_notice": "Ingredientes a Destacar",
 "product.related": "Selecciones relacionadas",
 "product.disclosure": "Enlace de afiliado. Mirha & Co. puede ganar una comisión sin costo adicional para usted. Los precios pueden cambiar en Amazon.",
 },
 fr: {
 "nav.ingredients": "Analyseur d'Ingrédients",
 "nav.blog": "Blog",
 "nav.pricing": "Tarifs",
 "nav.about": "À Propos",
 "nav.dashboard": "Tableau de Bord",
 "hero.eyebrow": "Mirha & Co. / Intelligence Beauté Curatée",
 "hero.title1": "Des soins,",
 "hero.title2": "sans filtre.",
 "hero.copy": "Nous analysons la science des ingrédients, croisons les recherches cliniques et sélectionnons les meilleurs produits du marché. Pas de blabla marketing — juste une éducation claire, des recommandations de produits et un tableau de bord intelligent pour suivre votre routine.",
 "hero.btn.primary": "Explorer les Choix",
 "hero.btn.secondary": "Vérifier les Ingrédients",
 "hero.panel.tag": "Choix de l'Éditeur",
 "hero.panel.title": "Données sélectionnées, aucun bruit.",
 "hero.panel.desc": "Nous trions les concentrations actives, les tailles moléculaires et les études cliniques d'experts. Choisissez un problème de peau pour voir les faits réels de la base de données et créer votre routine.",
 "trust.independent": "Recherche d'Ingrédients",
 "trust.backed": "Tableau de Bord Personnel",
 "trust.zero": "Sélection Impartiale",
 "section.concerns.title": "Ciblez votre problème de peau",
 "section.concerns.desc": "We specialize in finding options tailored for real-world issues.",
 "section.editor.title": "Coups de Cœur de l'Éditeur",
 "section.editor.desc": "Recommandations sélectionnées et scientifiquement fondées pour un usage quotidien.",
 "section.shop.title": "L'Étagère de Soins",
 "section.shop.desc": "Parcourez toutes nos meilleures recommandations. Utilisez les filtres ou la barre de recherche pour trouver des produits.",
 "search.placeholder": "Rechercher par ingrédient, problème ou marque (ex. Niacinamide, peau grasse)...",
 "filter.category.all": "Tout",
 "filter.category.skincare": "Soins de la peau",
 "filter.category.makeup": "Maquillage",
 "filter.category.haircare": "Soins des cheveux",
 "filter.category.bodycare": "Soins du corps",
 "filter.category.wellness": "Bien-être",
 "filter.category.mensgrooming": "Soins Homme",
 "filter.category.fragrance": "Parfums",
 "filter.vegan": "Végane Uniquement",
 "filter.crueltyfree": "Sans Cruauté",
 "product.bestfor": "Idéal pour",
 "product.viewdetails": "Voir les détails",
 "product.off": "de réduction",
 "product.price": "Prix",
 "product.rating": "Évaluation",
 "product.saving": "Économie",
 "product.amazon_btn": "Voir sur Amazon",
 "product.back": "Retour aux sélections",
 "product.avoid_if": "Éviter Si",
 "product.how_to_use": "Conseils d'Utilisation",
 "product.mirha_notes": "Notes de Mirha",
 "product.key_details": "Détails Clés",
 "product.ingredients_notice": "Ingrédients à Noter",
 "product.related": "Sélections associées",
 "product.disclosure": "Lien d'affiliation. Mirha & Co. peut percevoir une commission sans frais supplémentaires pour vous. Les prix peuvent varier sur Amazon.",
 },
};

export const LANGUAGE_NAMES: Record<Locale, string> = {
 en: "English (US)",
 hi: "हिन्दी (IN)",
 ar: "العربية (AE)",
 es: "Español (ES)",
 fr: "Français (FR)",
};

/**
 * Format a price from INR to target currency
 */
export function convertAndFormatPrice(inrPrice: number, targetCurrency: Currency): string {
 const config = CURRENCIES[targetCurrency];
 const converted = inrPrice * config.rate;
 
 // Custom Arabic formatting to look nice
 if (targetCurrency === "AED" || targetCurrency === "SAR") {
 return `${Math.round(converted).toLocaleString(config.locale)} ${config.symbol}`;
 }
 
 return config.symbol + Math.round(converted).toLocaleString(config.locale);
}

/**
 * Format local Amazon Affiliate URL
 */
export function getLocalAffiliateUrl(
 asin: string,
 targetCurrency: Currency,
 name: string,
 brand: string,
 originalLink?: string
): string {
 const config = CURRENCIES[targetCurrency];
 
 // If we are looking for Indian Rupee, use the original affiliate configuration
 if (targetCurrency === "INR") {
 return originalLink || `https://www.amazon.in/dp/${asin}?tag=${config.affiliateTag}`;
 }

 // For international stores, search by Brand + Name to ensure they find the listing in their country's catalog!
 const query = encodeURIComponent(`${brand} ${name}`);
 return `https://www.${config.amazonDomain}/s?k=${query}&tag=${config.affiliateTag}`;
}

/**
 * Format local Amazon Brand Storefront URL
 */
export function getLocalBrandStorefrontUrl(
  brand: string,
  targetCurrency: Currency
): string {
  const config = CURRENCIES[targetCurrency];
  const query = encodeURIComponent(`${brand} storefront`);
  return `https://www.${config.amazonDomain}/s?k=${query}&tag=${config.affiliateTag}`;
}


/**
 * Dynamic price localization for blog post content
 */
export function getLocalizedPrices(text: string, targetCurrency: Currency): string {
  if (!text) return text;
  
  const config = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  const usdRate = CURRENCIES.USD.rate;
  const factor = config.rate / usdRate;

  // Helper to convert and format a single numeric value
  const convertValue = (val: number): string => {
    const converted = val * factor;
    // Round to nice numbers
    let rounded = Math.round(converted);
    if (rounded >= 100) {
      // Round to nearest 5 or 10 for cleaner display of larger numbers
      rounded = Math.round(rounded / 5) * 5;
    }
    
    if (targetCurrency === "AED" || targetCurrency === "SAR") {
      return `${rounded.toLocaleString(config.locale)} ${config.symbol}`;
    }
    return `${config.symbol}${rounded.toLocaleString(config.locale)}`;
  };

  // Replace ranges like $30-50 or $200–400 (hyphen or en-dash)
  let result = text.replace(/\$([0-9,]+)\s*[-–]\s*([0-9,]+)/g, (match, minStr, maxStr) => {
    const min = parseInt(minStr.replace(/,/g, ""), 10);
    const max = parseInt(maxStr.replace(/,/g, ""), 10);
    if (isNaN(min) || isNaN(max)) return match;
    
    const minConv = Math.round(min * factor);
    const maxConv = Math.round(max * factor);
    const minNice = minConv >= 100 ? Math.round(minConv / 5) * 5 : minConv;
    const maxNice = maxConv >= 100 ? Math.round(maxConv / 5) * 5 : maxConv;

    if (targetCurrency === "AED" || targetCurrency === "SAR") {
      return `${minNice.toLocaleString(config.locale)}–${maxNice.toLocaleString(config.locale)} ${config.symbol}`;
    } else {
      return `${config.symbol}${minNice.toLocaleString(config.locale)}–${config.symbol}${maxNice.toLocaleString(config.locale)}`;
    }
  });

  // Replace single prices like $345, $20, $1,000 (avoid matching already-converted prices)
  result = result.replace(/\$([0-9,]+)(?!\s*[-–]\s*[0-9,]+)/g, (match, priceStr) => {
    const cleanPrice = priceStr.replace(/,/g, "");
    const val = parseInt(cleanPrice, 10);
    if (isNaN(val)) return match;
    return convertValue(val);
  });

  // Replace Rupee ranges like ₹300-500 or ₹200–400
  result = result.replace(/₹\s*([0-9,]+)\s*[-–]\s*([0-9,]+)/g, (match, minStr, maxStr) => {
    const min = parseInt(minStr.replace(/,/g, ""), 10);
    const max = parseInt(maxStr.replace(/,/g, ""), 10);
    if (isNaN(min) || isNaN(max)) return match;
    
    const minConv = Math.round(min * config.rate);
    const maxConv = Math.round(max * config.rate);
    const minNice = minConv >= 100 ? Math.round(minConv / 5) * 5 : minConv;
    const maxNice = maxConv >= 100 ? Math.round(maxConv / 5) * 5 : maxConv;

    if (targetCurrency === "AED" || targetCurrency === "SAR") {
      return `${minNice.toLocaleString(config.locale)}–${maxNice.toLocaleString(config.locale)} ${config.symbol}`;
    } else {
      return `${config.symbol}${minNice.toLocaleString(config.locale)}–${config.symbol}${maxNice.toLocaleString(config.locale)}`;
    }
  });

  // Replace single Rupee prices like ₹500, ₹299
  result = result.replace(/₹\s*([0-9,]+)(?!\s*[-–]\s*[0-9,]+)/g, (match, priceStr) => {
    const cleanPrice = priceStr.replace(/,/g, "");
    const val = parseInt(cleanPrice, 10);
    if (isNaN(val)) return match;
    
    const converted = val * config.rate;
    let rounded = Math.round(converted);
    if (rounded >= 100) {
      rounded = Math.round(rounded / 5) * 5;
    }
    
    if (targetCurrency === "AED" || targetCurrency === "SAR") {
      return `${rounded.toLocaleString(config.locale)} ${config.symbol}`;
    }
    return `${config.symbol}${rounded.toLocaleString(config.locale)}`;
  });

  return result;
}

/**
 * Smart content localization for text
 */
export function getLocalizedContent(text: string, currency: string): string {
  if (!text) return text;
  
  const targetCurrency = (currency as Currency) || "USD";
  
  // First localize any prices listed in USD
  let localized = getLocalizedPrices(text, targetCurrency);

  if (targetCurrency === "INR") return localized;
  
  return localized
    .replace(/\bIndian Skin\b/g, "Brown & Olive Skin")
    .replace(/\bindian skin\b/g, "brown & olive skin")
    .replace(/\bin India\b/gi, "")
    .replace(/\bIndian Summer\b/gi, "High Humidity Climates")
    .replace(/\bIndian summer\b/gi, "high humidity climates")
    .replace(/\bIndian Climate\b/gi, "Humid Climates")
    .replace(/\bIndian Humidity\b/gi, "High Humidity")
    .replace(/\bIndian Girl's\b/gi, "Modern Girl's")
    .replace(/\bIndian\b/g, "South Asian")
    .replace(/\bindian\b/g, "south asian")
    .replace(/\s+/g, ' ').trim();
}

/**
 * Detects visitor's preferred currency based on browser locale / timezone
 */
export function detectPreferredCurrency(): Currency {
  if (typeof window === "undefined") return "USD";
  
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = navigator.language || "";

    if (tz.includes("Asia/Kolkata") || lang.includes("en-IN") || lang.includes("hi")) return "INR";
    if (tz.includes("Dubai") || tz.includes("Muscat") || lang.includes("ar-AE")) return "AED";
    if (tz.includes("Riyadh") || lang.includes("ar-SA")) return "SAR";
    if (tz.includes("London") || lang.includes("en-GB")) return "GBP";
    if (tz.includes("Europe") || lang.includes("de") || lang.includes("fr") || lang.includes("es")) return "EUR";
    return "USD";
  } catch {
    return "USD";
  }
}

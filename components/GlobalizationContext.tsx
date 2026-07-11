"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
 Locale,
 Currency,
 DICTIONARY,
 convertAndFormatPrice,
 getLocalAffiliateUrl,
 getLocalBrandStorefrontUrl,
 RTL_LOCALES,
  getLocalizedContent,
} from "@/lib/globalization";

interface GlobalizationContextProps {
 locale: Locale;
 currency: Currency;
 setLocale: (locale: Locale) => void;
 setCurrency: (currency: Currency) => void;
 t: (key: string) => string;
 formatPrice: (inrAmount: number) => string;
 getAffiliateUrl: (asin: string, name: string, brand: string, originalLink?: string) => string;
 getBrandStorefrontUrl: (brand: string) => string;
 isRtl: boolean;
 localizeContent: (text: string) => string;
}


function detectPreferredCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return "USD";
    if (tz.includes("Kolkata") || tz.includes("Calcutta") || tz.includes("Asia/Colombo") || tz.includes("Asia/Katmandu")) {
      return "INR";
    }
    if (tz.includes("London") || tz.includes("Europe/London") || tz.includes("Europe/Belfast")) {
      return "GBP";
    }
    if (tz.includes("Dubai") || tz.includes("Asia/Dubai")) {
      return "AED";
    }
    if (tz.includes("Riyadh") || tz.includes("Asia/Riyadh")) {
      return "SAR";
    }
    if (tz.includes("Europe/")) {
      return "EUR";
    }
    return "USD";
  } catch (e) {
    return "USD";
  }
}

const GlobalizationContext = createContext<GlobalizationContextProps | undefined>(undefined);

export function GlobalizationProvider({
 children,
 initialLocale,
 initialCurrency,
}: {
 children: React.ReactNode;
 initialLocale: Locale;
 initialCurrency: Currency;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [currency, setCurrencyState] = useState<Currency>(initialCurrency);
  const router = useRouter();

  // Client-side auto-update fallback for visitors from other countries
  useEffect(() => {
    const hasCurrencyCookie = document.cookie.split(';').some((item) => item.trim().startsWith('mirha_currency='));
    if (!hasCurrencyCookie) {
      const detected = detectPreferredCurrency();
      if (detected !== currency) {
        setCurrencyState(detected);
        document.cookie = `mirha_currency=${detected}; path=/; max-age=31536000; SameSite=Lax`;
        router.refresh();
      }
    }
  }, []);

 // Sync state with HTML dir attribute for RTL support (Arabic)
 useEffect(() => {
 const isRtl = RTL_LOCALES.includes(locale);
 document.documentElement.dir = isRtl ? "rtl" : "ltr";
 document.documentElement.lang = locale;
 }, [locale]);

 const setLocale = (newLocale: Locale) => {
 setLocaleState(newLocale);
 document.cookie = `mirha_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
 router.refresh();
 };

 const setCurrency = (newCurrency: Currency) => {
 setCurrencyState(newCurrency);
 document.cookie = `mirha_currency=${newCurrency}; path=/; max-age=31536000; SameSite=Lax`;
 router.refresh();
 };

 const t = (key: string): string => {
 const dict = DICTIONARY[locale] || DICTIONARY.en;
 return dict[key] || DICTIONARY.en[key] || key;
 };

 const formatPrice = (inrAmount: number): string => {
 return convertAndFormatPrice(inrAmount, currency);
 };

 const getAffiliateUrl = (asin: string, name: string, brand: string, originalLink?: string): string => {
 return getLocalAffiliateUrl(asin, currency, name, brand, originalLink);
 };

 const getBrandStorefrontUrl = (brand: string): string => {
 return getLocalBrandStorefrontUrl(brand, currency);
 };

 const isRtl = RTL_LOCALES.includes(locale);

 const localizeContent = (text: string): string => getLocalizedContent(text, currency);

 return (
 <GlobalizationContext.Provider
 value={{
 locale,
 currency,
 setLocale,
 setCurrency,
 t,
 formatPrice,
 getAffiliateUrl,
 getBrandStorefrontUrl,
 isRtl,
 localizeContent,
  }}
 >
 {children}
 </GlobalizationContext.Provider>
 );
}

export function useGlobalization() {
 const context = useContext(GlobalizationContext);
 if (!context) {
 throw new Error("useGlobalization must be used within a GlobalizationProvider");
 }
 return context;
}

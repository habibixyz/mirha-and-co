"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Locale,
  Currency,
  RTL_LOCALES,
  DICTIONARY,
  convertAndFormatPrice,
  getLocalAffiliateUrl,
  getLocalBrandStorefrontUrl,
  detectPreferredCurrency,
  getLocalizedContent,
} from "@/lib/globalization";

interface GlobalizationContextType {
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

const GlobalizationContext = createContext<GlobalizationContextType | undefined>(undefined);

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
    const hasCurrencyCookie = document.cookie.split(";").some((item) => item.trim().startsWith("mirha_currency="));
    if (!hasCurrencyCookie) {
      const detected = detectPreferredCurrency();
      if (detected !== currency) {
        setCurrencyState(detected);
        document.cookie = `mirha_currency=${detected}; path=/; max-age=31536000; SameSite=Lax`;
        router.refresh();
      }
    }
  }, []);

  // Sync state with HTML dir attribute for RTL support (Arabic) and trigger universal auto-translator
  useEffect(() => {
    const isRtl = RTL_LOCALES.includes(locale);
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = locale;

    // Universal Translation Engine Integration (Google Translate / Neural Translate)
    const targetLang = locale === "en" ? "en" : locale;
    document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${targetLang}; path=/`;

    // Inject Google Translate script dynamically if not present
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        if ((window as any).google && (window as any).google.translate) {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi,ar,es,fr",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };
    } else if ((window as any).google && (window as any).google.translate) {
      try {
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (select) {
          select.value = targetLang;
          select.dispatchEvent(new Event("change"));
        }
      } catch (e) {}
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `mirha_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Trigger translation reload / refresh
    const targetLang = newLocale === "en" ? "en" : newLocale;
    document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${targetLang}; path=/`;
    
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
      {/* Hidden element for Google Translate widget */}
      <div id="google_translate_element" style={{ display: "none" }} />
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

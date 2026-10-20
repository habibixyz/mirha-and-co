'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RotateCcw, ExternalLink, Check, ArrowRight, Zap, Droplets, Target, Shield, Sun, BookmarkCheck } from 'lucide-react';
import { RoutineRecommendation } from '@/lib/routineEngine';
import { PRODUCTS, getProductAffiliateUrl } from '@/lib/products';
import { useRoutineAnalytics } from '@/lib/hooks/useRoutineAnalytics';
import { syncQuizRoutineToVanity } from '@/app/(saas)/actions';

const STEPS_ORDER = [
  {
    key: 'cleanser',
    label: 'Cleanse',
    step: 'Step 1',
    icon: Droplets,
    color: '#e8f4fd',
    accentColor: '#0284c7',
    description: 'Remove pollution, excess oil, and product buildup while protecting your barrier.',
  },
  {
    key: 'treatment',
    label: 'Treat',
    step: 'Step 2',
    icon: Target,
    color: '#fdf0f8',
    accentColor: '#fc2779',
    description: 'Target your specific concern with clinically-backed active ingredients.',
  },
  {
    key: 'moisturiser',
    label: 'Hydrate',
    step: 'Step 3',
    icon: Shield,
    color: '#f0fdf4',
    accentColor: '#16a34a',
    description: 'Lock in moisture and strengthen your barrier. Yes, even oily skin needs this.',
  },
  {
    key: 'sunscreen',
    label: 'Protect',
    step: 'Step 4 · AM only',
    icon: Sun,
    color: '#fffbeb',
    accentColor: '#d97706',
    description: 'Your most important anti-aging product. Non-negotiable, every single morning.',
  },
];

interface RoutineResultProps {
  routine: RoutineRecommendation;
  onRestart: () => void;
  climate?: { temp: number; humidity: number; city: string; countryCode?: string };
  onClimateChange: (climate: { temp: number; humidity: number; city: string; countryCode?: string } | undefined) => void;
}

function ProductCard({
  asin,
  reason,
  countryCode,
  accentColor,
  onClick,
}: {
  asin: string;
  reason?: string;
  countryCode?: string;
  accentColor?: string;
  onClick?: () => void;
}) {
  const product = PRODUCTS.find((p) => p.asin === asin);

  if (!product) return null;

  const affiliateUrl = getProductAffiliateUrl(product, countryCode);

  const disc =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {reason && (
        <div
          className="rr-reason-box"
          style={{
            borderLeft: `3px solid ${accentColor || '#fc2779'}`,
          }}
        >
          {reason}
        </div>
      )}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={onClick}
        className="rr-product-card"
      >
        {/* Product Image */}
        <div className="rr-img-box">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '4px',
            }}
          />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {product.badge && (
            <p
              className="rr-product-badge"
              style={{
                color: accentColor || '#fc2779',
              }}
            >
              {product.badge}
            </p>
          )}

          <p className="rr-product-name">
            {product.name}
          </p>

          <p className="rr-product-brand">
            {product.brand}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {affiliateUrl.includes('cultbeauty') ? (
              <span className="rr-cult-beauty-text" style={{ fontSize: '13px', fontWeight: 500 }}>
                Shop on Cult Beauty
              </span>
            ) : (
              <>
                <span className="rr-product-price">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {disc > 0 && (
                  <>
                    <span className="rr-product-mrp">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="rr-discount-badge">
                      {disc}% off
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* CTA arrow */}
        <div
          className="rr-cta-arrow"
          style={{
            background: accentColor || '#fc2779',
          }}
        >
          <ExternalLink size={12} color="#fff" />
        </div>
      </a>
      <p className="rr-affiliate-note">
        Affiliate link · Commission at no extra cost to you
      </p>
    </div>
  );
}

const CLIMATE_PRESETS = [
  { city: "Mumbai (Summer/Monsoon)", temp: 38, humidity: 82, label: "💧 Mumbai", countryCode: "IN" },
  { city: "Delhi (Winter)", temp: 12, humidity: 25, label: "❄️ Delhi", countryCode: "IN" },
  { city: "Bangalore (Moderate)", temp: 24, humidity: 50, label: "🍃 Bangalore", countryCode: "IN" },
];

export default function RoutineResult({
  routine,
  onRestart,
  climate,
  onClimateChange,
}: RoutineResultProps) {
  const { trackAffiliateClick } = useRoutineAnalytics();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  // Climate Customization States
  const [showClimateModal, setShowClimateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const detectClimate = () => {
    const fetchByIP = async () => {
      try {
        const geoRes = await fetch("https://ipapi.co/json/");
        if (!geoRes.ok) throw new Error("IP Geo fetch failed");
        const geoData = await geoRes.json();

        const city = geoData.city || "India";
        const lat = geoData.latitude;
        const lon = geoData.longitude;
        const countryCode = geoData.country_code;

        if (lat && lon) {
          await fetchWeather(lat, lon, `${city} (Synced)`, countryCode);
        } else {
          throw new Error("No lat/lon from IP");
        }
      } catch (err) {
        console.error("IP climate sync failed:", err);
      }
    };

    const fetchWeather = async (lat: number, lon: number, cityName: string, countryCode?: string) => {
      try {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`
        );
        if (!weatherRes.ok) throw new Error("Weather fetch failed");
        const weatherData = await weatherRes.json();

        const temp = Math.round(weatherData.current.temperature_2m);
        const humidity = Math.round(weatherData.current.relative_humidity_2m);

        onClimateChange({ temp, humidity, city: cityName, countryCode });
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    };

    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const revRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            if (!revRes.ok) throw new Error("Reverse geocode failed");
            const revData = await revRes.json();
            const city = revData.city || revData.locality || revData.principalSubdivision || "Your Location";
            const countryCode = revData.countryCode;
            await fetchWeather(lat, lon, `${city} (GPS)`, countryCode);
          } catch (err) {
            console.warn("Reverse geocode failed:", err);
            await fetchWeather(lat, lon, "Your Location (GPS)");
          }
        },
        (error) => {
          console.log("GPS failed, falling back to IP:", error.message);
          fetchByIP();
        },
        { timeout: 5000 }
      );
    } else {
      fetchByIP();
    }
  };

  const handleSearchCity = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
      if (!res.ok) throw new Error("Geocoding search failed");
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("City search failed:", err);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectSearchResult = async (result: any) => {
    setShowClimateModal(false);
    setSearchQuery('');
    setSearchResults([]);
    try {
      const { latitude, longitude, name, admin1, country, country_code } = result;
      const cityName = `${name}${admin1 ? `, ${admin1}` : ''}${country ? `, ${country}` : ''}`;
      const countryCode = country_code || (country === 'India' ? 'IN' : undefined);

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m`
      );
      if (!weatherRes.ok) throw new Error("Weather fetch failed");
      const weatherData = await weatherRes.json();

      const temp = Math.round(weatherData.current.temperature_2m);
      const humidity = Math.round(weatherData.current.relative_humidity_2m);

      onClimateChange({ temp, humidity, city: cityName, countryCode });
    } catch (err) {
      console.error("Select city failed:", err);
    }
  };

  const router = useRouter();
  const [savingVanity, setSavingVanity] = useState(false);

  const handleSaveToVanity = async () => {
    setSavingVanity(true);
    try {
      const cleanserProduct = PRODUCTS.find((p) => p.asin === routine.cleanser?.asin);
      const treatmentProduct = PRODUCTS.find((p) => p.asin === routine.treatment?.asin);
      const moisturiserProduct = PRODUCTS.find((p) => p.asin === routine.moisturiser?.asin);
      const sunscreenProduct = PRODUCTS.find((p) => p.asin === routine.sunscreen?.asin);

      const amSteps = [
        `Gentle Cleanse: ${cleanserProduct?.name || 'Gentle Cleanser'}`,
        `Hydrate & Target: ${treatmentProduct?.name || 'Active Serum'}`,
        `Barrier Restore: ${moisturiserProduct?.name || 'Ceramide Moisturizer'}`,
        `UV Defense: ${sunscreenProduct?.name || 'Broad Spectrum SPF 50+'}`,
      ];

      const pmSteps = [
        `Double Cleanse: ${cleanserProduct?.name || 'Gentle Cleanser'}`,
        `Active Treatment: ${treatmentProduct?.name || 'Active Serum'}`,
        `Night Nourish: ${moisturiserProduct?.name || 'Ceramide Moisturizer'}`,
      ];

      const pending = {
        amSteps,
        pmSteps,
        climateCity: climate?.city || 'Synced',
      };

      // Always save to localStorage first as safety fallback
      if (typeof window !== 'undefined') {
        localStorage.setItem('mirha_pending_routine', JSON.stringify(pending));
      }

      // Attempt server sync
      const res = await syncQuizRoutineToVanity(pending);
      if (res?.unauthorized) {
        // Redirect to signup with returnUrl
        router.push('/signup?returnUrl=/dashboard/routines');
      } else if (res?.success) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('mirha_pending_routine');
        }
        router.push('/dashboard/routines');
      } else {
        router.push('/signup?returnUrl=/dashboard/routines');
      }
    } catch (err) {
      console.error('Error saving to vanity:', err);
      router.push('/signup?returnUrl=/dashboard/routines');
    } finally {
      setSavingVanity(false);
    }
  };

  return (
    <div className="rr-container">
      <style>{`
        .rr-container {
          min-height: 100vh;
          background: linear-gradient(160deg, #fdf9f5 0%, #f8f2ea 40%, #fdf6f0 100%);
          padding: 60px 20px 120px;
          transition: background 0.3s ease;
        }
        .rr-shell {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
        }
        .rr-hero {
          text-align: center;
          margin-bottom: 48px;
        }
        .rr-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border: 1px solid rgba(217,119,6,0.3);
          color: #78350f;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 9999px;
          margin-bottom: 20px;
          font-family: var(--font-mono, monospace);
        }
        .rr-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(30px, 6vw, 46px);
          font-weight: 400;
          color: #111;
          line-height: 1.1;
          margin: 0 0 14px;
        }
        .rr-subtitle {
          font-size: 14px;
          color: #7a6e66;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 28px;
        }
        .rr-profile-chips {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 0;
        }
        .rr-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 500;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
        }
        .rr-chip-climate {
          cursor: pointer;
          border: 1px solid #ccead4;
          background: #edf7f0;
          color: #2d7a4f;
        }
        .rr-chip-climate-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          display: inline-block;
        }

        /* Climate alert */
        .rr-climate-alert {
          padding: 14px 18px;
          border-radius: 0 10px 10px 0;
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 28px;
        }
        .rr-climate-alert-humid_heat {
          background: #fff9f0;
          color: #4a4340;
        }
        .rr-climate-alert-humid_heat .rr-climate-alert-strong {
          color: #d97706;
        }
        .rr-climate-alert-dry_cold {
          background: #f0f5ff;
          color: #4a4340;
        }
        .rr-climate-alert-dry_cold .rr-climate-alert-strong {
          color: #2563eb;
        }

        /* Vanity Bridge Card */
        .rr-vanity-bridge-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          background: linear-gradient(135deg, #ffffff 0%, #fff7f9 100%);
          border: 1.5px solid #fc2779;
          border-radius: 16px;
          padding: 22px 24px;
          margin-bottom: 28px;
          box-shadow: 0 8px 28px rgba(252, 39, 121, 0.08);
        }
        .rr-vanity-bridge-badge {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: rgba(252, 39, 121, 0.1);
          color: #fc2779;
          padding: 3px 8px;
          border-radius: 99px;
          font-family: var(--font-mono, monospace);
        }
        .rr-vanity-bridge-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 22px;
          border-radius: 12px;
          background: #fc2779;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: none;
          cursor: pointer;
          font-family: var(--font-mono, monospace);
          transition: all 0.25s;
          box-shadow: 0 4px 14px rgba(252, 39, 121, 0.3);
        }
        .rr-vanity-bridge-btn:hover {
          background: #e01e69;
          transform: translateY(-1px);
        }
        .rr-vanity-bridge-btn:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        /* Climate widget */
        .rr-climate-widget {
          background: rgba(255,255,255,0.85);
          border: 1px solid #e8e2d9;
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 36px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(155,126,107,0.06);
          transition: all 0.3s ease;
        }
        .rr-climate-widget-title {
          margin: 0;
          font-family: 'DM Serif Display', serif;
          font-size: 17px;
          color: #111;
          font-weight: 400;
        }
        .rr-climate-widget-subtitle {
          margin: 3px 0 0;
          font-size: 11px;
          color: #9b7e6b;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.04em;
        }
        .rr-preset-btn {
          padding: 7px 12px;
          font-size: 11px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-mono, monospace);
          font-weight: 400;
          border: 1px solid #ede8e0;
          background: #faf8f5;
          color: #555;
        }
        .rr-preset-btn:hover {
          border-color: #fc2779;
          color: #fc2779;
        }
        .rr-preset-btn-active {
          border-color: #111;
          background: #111;
          color: #fff;
          font-weight: 700;
        }
        .rr-preset-btn-search {
          border: 1px dashed #9b7e6b;
          background: #faf8f5;
          color: #9b7e6b;
          font-weight: 600;
        }

        /* Step cards */
        .rr-step-card {
          background: #fff;
          border: 1px solid #ede8e0;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.03);
          transition: box-shadow 0.3s, background-color 0.3s, border-color 0.3s;
        }
        .rr-step-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.06);
        }
        .rr-step-header {
          padding: 20px 24px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid #f0ebe3;
        }
        .rr-step-emoji {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .rr-step-number {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin: 0 0 3px;
          font-family: var(--font-mono, monospace);
          font-weight: 700;
        }
        .rr-step-title {
          font-family: 'DM Serif Display', serif;
          fontSize: 20px;
          font-weight: 400;
          color: #111;
          margin: 0 0 4px;
          line-height: 1.2;
        }
        .rr-step-desc {
          font-size: 12px;
          color: #888;
          line-height: 1.5;
          margin: 0;
        }
        .rr-step-body {
          padding: 20px 24px 24px;
        }

        /* Reason box */
        .rr-reason-box {
          background: #faf8f5;
          border: 1px solid rgba(227, 216, 206, 0.4);
          borderRadius: 0 8px 8px 0;
          padding: 10px 14px;
          font-size: 13px;
          color: #5c534c;
          line-height: 1.65;
        }

        /* Product card */
        .rr-product-card {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          border-radius: 12px;
          padding: 16px;
          text-decoration: none;
          color: inherit;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          background: #faf8f5;
          border: 1px solid #ede8e0;
        }
        .rr-product-card:hover {
          transform: translateY(-2px);
          border-color: #d6d0c9;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
        }
        .rr-img-box {
          width: 84px;
          height: 84px;
          flex-shrink: 0;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid #f0ebe3;
        }
        .rr-product-badge {
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 0 0 5px;
          font-family: var(--font-mono, monospace);
          font-weight: 700;
        }
        .rr-product-name {
          font-family: 'DM Serif Display', serif;
          font-size: 14.5px;
          color: #111;
          line-height: 1.3;
          margin: 0 0 3px;
          font-weight: 400;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .rr-product-brand {
          font-size: 11px;
          color: #999;
          margin: 0 0 8px;
          letter-spacing: 0.04em;
        }
        .rr-product-price {
          font-family: 'DM Serif Display', serif;
          font-size: 17px;
          color: #111;
          font-weight: 400;
        }
        .rr-product-mrp {
          font-size: 11px;
          color: #bbb;
          text-decoration: line-through;
        }
        .rr-discount-badge {
          font-size: 9px;
          color: #2d7a4f;
          background: #edf7f0;
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: 700;
        }
        .rr-cult-beauty-text {
          color: #9b7e6b;
        }
        .rr-cta-arrow {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;
          transition: transform 0.2s;
        }
        .rr-product-card:hover .rr-cta-arrow {
          transform: scale(1.08);
        }
        .rr-affiliate-note {
          font-size: 9px;
          color: #ccc;
          margin: 0;
          text-align: right;
          font-family: var(--font-mono, monospace);
        }

        /* Usage box */
        .rr-usage-box {
          background: #111;
          color: #fff;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 28px;
        }

        /* Actions */
        .rr-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
        }
        .rr-btn-secondary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 24px;
          background: transparent;
          border: 1px solid #ddd;
          color: #666;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.25s;
          font-family: var(--font-mono, monospace);
        }
        .rr-btn-secondary:hover {
          border-color: #fc2779;
          color: #fc2779;
        }
        .rr-btn-primary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 24px;
          background: #fc2779;
          color: #fff;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 10px;
          border: 1px solid #fc2779;
          transition: all 0.25s;
          cursor: pointer;
          font-family: var(--font-mono, monospace);
        }
        .rr-btn-primary:hover {
          background: #e01e69;
        }
        .rr-btn-dark {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 24px;
          background: #111;
          color: #fff;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 10px;
          border: 1px solid #111;
          transition: all 0.25s;
          cursor: pointer;
          font-family: var(--font-mono, monospace);
        }
        .rr-btn-dark:hover {
          background: #333;
        }

        /* Climate Modal */
        .rr-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .rr-modal-card {
          width: 100%;
          max-width: 440px;
          background: #fff;
          border: 1px solid #e8e2d9;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 24px 48px rgba(0,0,0,0.12);
        }
        .rr-modal-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          margin: 0 0 8px;
          color: #111;
        }
        .rr-modal-subtitle {
          font-size: 12px;
          color: #888;
          margin: 0 0 20px;
          line-height: 1.5;
        }
        .rr-modal-section-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #bbb;
          margin: 0 0 10px;
          font-family: var(--font-mono, monospace);
        }
        .rr-modal-preset-btn {
          padding: 8px 12px;
          font-size: 11px;
          border: 1px solid #ede8e0;
          background: #faf8f5;
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font-mono, monospace);
          color: #444;
          transition: all 0.2s;
        }
        .rr-modal-preset-btn:hover {
          border-color: #fc2779;
          color: #fc2779;
        }
        .rr-modal-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #ede8e0;
          border-radius: 10px;
          font-size: 13px;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          box-sizing: border-box;
          background: #fff;
          color: #111;
        }
        .rr-modal-input:focus {
          border-color: #fc2779;
        }
        .rr-modal-results {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-height: 180px;
          overflow-y: auto;
          margin-bottom: 20px;
          border: 1px solid #ede8e0;
          border-radius: 10px;
          padding: 6px;
        }
        .rr-modal-result-row {
          padding: 10px 12px;
          background: none;
          border: none;
          border-radius: 7px;
          text-align: left;
          font-size: 13px;
          color: #333;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s;
        }
        .rr-modal-result-row:hover {
          background: #faf8f5;
        }
        .rr-modal-footer {
          display: flex;
          gap: 8px;
          border-top: 1px solid #ede8e0;
          padding-top: 16px;
        }
        .rr-modal-auto-btn {
          flex: 1;
          padding: 11px;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          font-family: var(--font-mono, monospace);
          transition: background 0.2s;
        }
        .rr-modal-auto-btn:hover {
          background: #333;
        }
        .rr-modal-cancel-btn {
          padding: 11px 16px;
          background: none;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          color: #666;
          font-family: var(--font-mono, monospace);
        }

        /* ══════════════════════════════════════════
           DARK MODE STYLES
           ══════════════════════════════════════════ */
        html.dark .rr-container, .dark .rr-container {
          background: linear-gradient(160deg, #090d16 0%, #0d131f 50%, #090d16 100%) !important;
        }
        html.dark .rr-title, .dark .rr-title {
          color: #ffffff !important;
        }
        html.dark .rr-subtitle, .dark .rr-subtitle {
          color: #94a3b8 !important;
        }

        /* Chips in dark mode */
        html.dark .rr-chip-climate, .dark .rr-chip-climate {
          background: rgba(16, 185, 129, 0.12) !important;
          border-color: rgba(16, 185, 129, 0.3) !important;
          color: #34d399 !important;
        }

        /* Climate alert in dark mode */
        html.dark .rr-climate-alert-humid_heat, .dark .rr-climate-alert-humid_heat {
          background: rgba(245, 158, 11, 0.1) !important;
          color: #fde68a !important;
        }
        html.dark .rr-climate-alert-humid_heat .rr-climate-alert-strong, .dark .rr-climate-alert-humid_heat .rr-climate-alert-strong {
          color: #fbbf24 !important;
        }
        html.dark .rr-climate-alert-dry_cold, .dark .rr-climate-alert-dry_cold {
          background: rgba(59, 130, 246, 0.1) !important;
          color: #bfdbfe !important;
        }
        html.dark .rr-climate-alert-dry_cold .rr-climate-alert-strong, .dark .rr-climate-alert-dry_cold .rr-climate-alert-strong {
          color: #60a5fa !important;
        }

        /* Climate widget in dark mode */
        html.dark .rr-climate-widget, .dark .rr-climate-widget {
          background: #111827 !important;
          border-color: #1f293d !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4) !important;
        }
        html.dark .rr-climate-widget-title, .dark .rr-climate-widget-title {
          color: #ffffff !important;
        }
        html.dark .rr-climate-widget-subtitle, .dark .rr-climate-widget-subtitle {
          color: #cbd5e1 !important;
        }
        html.dark .rr-preset-btn, .dark .rr-preset-btn {
          background: #1e293b !important;
          border-color: #334155 !important;
          color: #cbd5e1 !important;
        }
        html.dark .rr-preset-btn:hover, .dark .rr-preset-btn:hover {
          border-color: #fc2779 !important;
          color: #ffffff !important;
        }
        html.dark .rr-preset-btn-active, .dark .rr-preset-btn-active {
          background: #fc2779 !important;
          border-color: #fc2779 !important;
          color: #ffffff !important;
        }
        html.dark .rr-preset-btn-search, .dark .rr-preset-btn-search {
          border: 1px dashed #fc2779 !important;
          color: #fda4af !important;
          background: rgba(252, 39, 121, 0.08) !important;
        }

        /* Step cards in dark mode */
        html.dark .rr-step-card, .dark .rr-step-card {
          background: #111827 !important;
          border-color: #1f293d !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
        }
        html.dark .rr-step-card:hover, .dark .rr-step-card:hover {
          border-color: #2e3a52 !important;
        }
        html.dark .rr-step-header, .dark .rr-step-header {
          border-bottom-color: #1f293d !important;
        }
        html.dark .rr-step-emoji, .dark .rr-step-emoji {
          background: #1a2234 !important;
        }
        html.dark .rr-step-title, .dark .rr-step-title {
          color: #ffffff !important;
        }
        html.dark .rr-step-desc, .dark .rr-step-desc {
          color: #94a3b8 !important;
        }

        /* Reason box in dark mode */
        html.dark .rr-reason-box, .dark .rr-reason-box {
          background: rgba(255, 255, 255, 0.04) !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
          color: #cbd5e1 !important;
        }

        /* Product cards in dark mode */
        html.dark .rr-product-card, .dark .rr-product-card {
          background: #141b29 !important;
          border-color: #222d42 !important;
          color: #f8fafc !important;
        }
        html.dark .rr-product-card:hover, .dark .rr-product-card:hover {
          border-color: #fc2779 !important;
          box-shadow: 0 6px 24px rgba(252, 39, 121, 0.15) !important;
        }
        html.dark .rr-img-box, .dark .rr-img-box {
          background: #ffffff !important;
          border-color: #2a374f !important;
        }
        html.dark .rr-product-name, .dark .rr-product-name {
          color: #ffffff !important;
        }
        html.dark .rr-product-brand, .dark .rr-product-brand {
          color: #94a3b8 !important;
        }
        html.dark .rr-product-price, .dark .rr-product-price {
          color: #ffffff !important;
        }
        html.dark .rr-product-mrp, .dark .rr-product-mrp {
          color: #64748b !important;
        }
        html.dark .rr-discount-badge, .dark .rr-discount-badge {
          color: #34d399 !important;
          background: rgba(16, 185, 129, 0.15) !important;
        }
        html.dark .rr-cult-beauty-text, .dark .rr-cult-beauty-text {
          color: #fda4af !important;
        }
        html.dark .rr-affiliate-note, .dark .rr-affiliate-note {
          color: #64748b !important;
        }

        /* Usage box in dark mode */
        html.dark .rr-usage-box, .dark .rr-usage-box {
          background: #0f1523 !important;
          border: 1px solid #1f293d !important;
          color: #f8fafc !important;
        }

        /* Actions in dark mode */
        html.dark .rr-btn-secondary, .dark .rr-btn-secondary {
          border-color: #334155 !important;
          color: #cbd5e1 !important;
        }
        html.dark .rr-btn-secondary:hover, .dark .rr-btn-secondary:hover {
          border-color: #fc2779 !important;
          color: #fc2779 !important;
        }
        html.dark .rr-btn-dark, .dark .rr-btn-dark {
          background: #1e293b !important;
          border-color: #334155 !important;
          color: #ffffff !important;
        }
        html.dark .rr-btn-dark:hover, .dark .rr-btn-dark:hover {
          background: #283548 !important;
        }

        /* Climate Modal in dark mode */
        html.dark .rr-modal-card, .dark .rr-modal-card {
          background: #0f1523 !important;
          border-color: #243046 !important;
          color: #ffffff !important;
          box-shadow: 0 24px 48px rgba(0,0,0,0.6) !important;
        }
        html.dark .rr-modal-title, .dark .rr-modal-title {
          color: #ffffff !important;
        }
        html.dark .rr-modal-subtitle, .dark .rr-modal-subtitle {
          color: #94a3b8 !important;
        }
        html.dark .rr-modal-section-label, .dark .rr-modal-section-label {
          color: #64748b !important;
        }
        html.dark .rr-modal-preset-btn, .dark .rr-modal-preset-btn {
          background: #1e293b !important;
          border-color: #334155 !important;
          color: #cbd5e1 !important;
        }
        html.dark .rr-modal-preset-btn:hover, .dark .rr-modal-preset-btn:hover {
          border-color: #fc2779 !important;
          color: #ffffff !important;
        }
        html.dark .rr-modal-input, .dark .rr-modal-input {
          background: #182234 !important;
          border-color: #2a3852 !important;
          color: #ffffff !important;
        }
        html.dark .rr-modal-results, .dark .rr-modal-results {
          border-color: #2a3852 !important;
          background: #182234 !important;
        }
        html.dark .rr-modal-result-row, .dark .rr-modal-result-row {
          color: #e2e8f0 !important;
        }
        html.dark .rr-modal-result-row:hover, .dark .rr-modal-result-row:hover {
          background: #243046 !important;
        }
        html.dark .rr-modal-footer, .dark .rr-modal-footer {
          border-top-color: #243046 !important;
        }
        html.dark .rr-modal-auto-btn, .dark .rr-modal-auto-btn {
          background: #fc2779 !important;
          color: #ffffff !important;
        }
        html.dark .rr-modal-cancel-btn, .dark .rr-modal-cancel-btn {
          border-color: #334155 !important;
          color: #94a3b8 !important;
        }

        /* Vanity bridge card in dark mode */
        html.dark .rr-vanity-bridge-card, .dark .rr-vanity-bridge-card {
          background: linear-gradient(135deg, #131926 0%, #1a2234 100%) !important;
          border-color: rgba(252, 39, 121, 0.5) !important;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4) !important;
        }
        html.dark .rr-vanity-bridge-card h3, .dark .rr-vanity-bridge-card h3 {
          color: #ffffff !important;
        }

        @media (max-width: 640px) {
          .rr-container { padding: 40px 16px 80px; }
          .rr-step-header { padding: 16px 18px 14px; }
          .rr-step-body { padding: 16px 18px 20px; }
          .rr-usage-box { padding: 24px 20px; }
          .rr-actions { flex-direction: column; }
          .rr-vanity-bridge-card {
            flex-direction: column;
            align-items: stretch;
            text-align: left;
            padding: 18px 16px;
          }
          .rr-vanity-bridge-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="rr-shell">
        {/* ── Hero ── */}
        <div className="rr-hero">
          <div className="rr-hero-badge">
            <Zap size={10} />
            Routine Generated
          </div>
          <h1 className="rr-title">
            Your Personalized<br />
            <em style={{ fontStyle: 'italic', color: '#fc2779' }}>4-Step Ritual</em>
          </h1>
          <p className="rr-subtitle">
            Curated for your skin type, concern, and local climate. All products are verified, reviewed, and available with fast delivery.
          </p>
          {/* Skin profile chips — populated from query params or placeholders */}
          <div className="rr-profile-chips">
            {climate && (
              <button
                className="rr-chip rr-chip-climate"
                onClick={() => setShowClimateModal(true)}
              >
                <span className="rr-chip-climate-dot" />
                {climate.city} · {climate.temp}°C, {climate.humidity}% RH
                <span style={{ fontSize: 9, opacity: 0.7, marginLeft: 4 }}>edit</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Save to Vanity Callout Card ── */}
        <div className="rr-vanity-bridge-card">
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="rr-vanity-bridge-badge">Personalized Regimen</span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Free Cloud Sync</span>
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontFamily: "'DM Serif Display', serif", color: '#111' }}>
              Save Routine to Your Digital Vanity
            </h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
              Sync your calibrated AM &amp; PM regimen directly into your dashboard to track daily progress and prevent formulation clashes.
            </p>
          </div>
          <button
            onClick={handleSaveToVanity}
            disabled={savingVanity}
            className="rr-vanity-bridge-btn"
          >
            {savingVanity ? (
              'Syncing...'
            ) : (
              <>
                <BookmarkCheck size={14} />
                Save to Vanity
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>

        {/* ── Climate Alert ── */}
        {routine.climateAdjustment && (
          <div
            className={`rr-climate-alert rr-climate-alert-${routine.climateAdjustment.type}`}
            style={{
              borderLeft: `4px solid ${routine.climateAdjustment.type === 'humid_heat' ? '#f59e0b' : '#3b82f6'}`,
            }}
          >
            <strong className="rr-climate-alert-strong">
              Climate Adaptation Active:{' '}
            </strong>
            <span className="rr-climate-alert-text">
              {routine.climateAdjustment.alertText}
            </span>
          </div>
        )}

        {/* ── Climate Presets ── */}
        <div className="rr-climate-widget">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <h3 className="rr-climate-widget-title">
                Adaptive Climate Engine
              </h3>
              <p className="rr-climate-widget-subtitle">
                Live weather sync adjusts your product picks in real-time
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CLIMATE_PRESETS.map((preset) => {
              const isActive = climate?.city === preset.city;
              return (
                <button
                  key={preset.city}
                  onClick={() => onClimateChange(preset)}
                  className={`rr-preset-btn ${isActive ? 'rr-preset-btn-active' : ''}`}
                >
                  {preset.label}
                </button>
              );
            })}
            <button
              onClick={() => onClimateChange(undefined)}
              className={`rr-preset-btn ${!climate ? 'rr-preset-btn-active' : ''}`}
            >
              🍃 Moderate
            </button>
            <button
              onClick={() => setShowClimateModal(true)}
              className="rr-preset-btn rr-preset-btn-search"
            >
              🔍 Search City
            </button>
          </div>
        </div>

        {/* ── Routine Steps — all expanded by default ── */}
        <div style={{ marginBottom: '48px' }}>
          {STEPS_ORDER.map((step) => {
            const product = routine[step.key as 'cleanser' | 'treatment' | 'moisturiser' | 'sunscreen'];
            if (!product) return null;

            return (
              <div key={step.key} className="rr-step-card">
                {/* Step Header */}
                <div className="rr-step-header">
                  <div className="rr-step-emoji" style={{ background: step.color, color: step.accentColor }}>
                    <step.icon size={20} strokeWidth={2.2} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="rr-step-number" style={{ color: step.accentColor }}>
                      {step.step}
                    </p>
                    <h2 className="rr-step-title">
                      {step.label}
                    </h2>
                    <p className="rr-step-desc">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Product — always visible */}
                <div className="rr-step-body">
                  <ProductCard
                    asin={product.asin}
                    reason={product.reason}
                    countryCode={climate?.countryCode}
                    accentColor={step.accentColor}
                    onClick={() =>
                      trackAffiliateClick({
                        asin: product.asin,
                        product: product.name,
                        step: step.key,
                      })
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── How to Use ── */}
        <div className="rr-usage-box">
          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '20px',
              fontWeight: 400,
              margin: '0 0 24px',
              color: '#fff',
            }}
          >
            How to Use Your Routine
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#f59e0b', margin: '0 0 14px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700 }}>
                ☀️ Morning (5 min)
              </p>
              {['Cleanse', 'Treat', 'Hydrate', 'Protect (SPF)'].map((label) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '13px', color: '#ddd' }}>
                  <Check size={13} color="#f59e0b" />
                  {label}
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#818cf8', margin: '0 0 14px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700 }}>
                🌙 Evening (5 min)
              </p>
              {['Cleanse', 'Treat', 'Hydrate'].map((label) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '13px', color: '#ddd' }}>
                  <Check size={13} color="#818cf8" />
                  {label}
                </div>
              ))}
              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: '11px', color: '#888', margin: 0 }}>Skip SPF at night</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', color: '#94a3b8', lineHeight: 1.65 }}>
            Visible results appear in <strong style={{ color: '#f59e0b' }}>4–8 weeks</strong> with consistent daily use. Introduce new actives 2–3x per week, then gradually increase frequency.
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="rr-actions">
          <button
            onClick={handleSaveToVanity}
            disabled={savingVanity}
            className="rr-btn-primary"
            style={{ flex: 1.4, fontSize: '11px', padding: '14px 20px', fontWeight: 700 }}
          >
            <BookmarkCheck size={14} />
            {savingVanity ? 'Syncing to Vanity...' : 'Save to Digital Vanity'}
            <ArrowRight size={13} />
          </button>

          <button
            onClick={onRestart}
            className="rr-btn-secondary"
          >
            <RotateCcw size={12} />
            Retake Quiz
          </button>

          <a
            href="/shop"
            className="rr-btn-dark"
          >
            All Products
            <ArrowRight size={12} />
          </a>
        </div>

        {/* ── Disclaimer ── */}
        <p
          style={{
            fontSize: '10px',
            color: '#888',
            textAlign: 'center',
            lineHeight: 1.6,
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          Not medical advice. Consult a dermatologist for serious skin concerns. Results may vary based on consistency and individual skin factors.
        </p>
      </div>

      {/* ── Climate Modal ── */}
      {showClimateModal && (
        <div
          onClick={() => setShowClimateModal(false)}
          className="rr-modal-backdrop"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rr-modal-card"
          >
            <h3 className="rr-modal-title">
              Select Your Location
            </h3>
            <p className="rr-modal-subtitle">
              Climate directly affects which textures and actives work best for your skin.
            </p>

            <p className="rr-modal-section-label">
              Quick Presets
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {CLIMATE_PRESETS.map((preset) => (
                <button
                  key={preset.city}
                  onClick={() => { onClimateChange(preset); setShowClimateModal(false); }}
                  className="rr-modal-preset-btn"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <p className="rr-modal-section-label">
              Search Any City
            </p>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchCity(e.target.value)}
                placeholder="Type city name (e.g. Mumbai, London)..."
                className="rr-modal-input"
              />
              {searching && (
                <div style={{ position: 'absolute', right: '12px', top: '13px', fontSize: '11px', color: '#999' }}>
                  Searching...
                </div>
              )}
            </div>

            {searchResults.length > 0 && (
              <div className="rr-modal-results">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectSearchResult(result)}
                    className="rr-modal-result-row"
                  >
                    <span style={{ fontWeight: 500 }}>{result.name}</span>
                    {result.admin1 && <span style={{ color: '#888', fontSize: '11px' }}>, {result.admin1}</span>}
                    {result.country && <span style={{ color: '#aaa', fontSize: '11px' }}> ({result.country})</span>}
                  </button>
                ))}
              </div>
            )}

            <div className="rr-modal-footer">
              <button
                onClick={() => { detectClimate(); setShowClimateModal(false); }}
                className="rr-modal-auto-btn"
              >
                📡 Auto-Detect
              </button>
              <button
                onClick={() => setShowClimateModal(false)}
                className="rr-modal-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

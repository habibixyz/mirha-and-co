'use client';

import React, { useState, useEffect } from 'react';
import { RotateCcw, ExternalLink, Check, ArrowRight, Zap, Droplets, Target, Shield, Sun } from 'lucide-react';
import { RoutineRecommendation } from '@/lib/routineEngine';
import { PRODUCTS, getProductAffiliateUrl } from '@/lib/products';
import { useRoutineAnalytics } from '@/lib/hooks/useRoutineAnalytics';

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
          style={{
            background: '#faf8f5',
            border: `1px solid ${accentColor || '#e3d8ce'}22`,
            borderLeft: `3px solid ${accentColor || '#9b7e6b'}`,
            borderRadius: '0 8px 8px 0',
            padding: '10px 14px',
            fontSize: '13px',
            color: '#5c534c',
            lineHeight: 1.65,
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
        style={{
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start',
          borderRadius: '12px',
          padding: '16px',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = accentColor ? accentColor + '44' : '#d6d0c9';
          el.style.boxShadow = `0 6px 20px ${accentColor ? accentColor + '18' : 'rgba(0,0,0,0.05)'}`;
          el.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = '#ede8e0';
          el.style.boxShadow = 'none';
          el.style.transform = 'translateY(0)';
        }}
      >
        {/* Product Image */}
        <div
          className="rr-img-box"
          style={{
            width: '84px',
            height: '84px',
            flexShrink: 0,
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
              style={{
                fontSize: '9px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: accentColor || '#9b7e6b',
                margin: '0 0 5px',
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 700,
              }}
            >
              {product.badge}
            </p>
          )}

          <p
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '14.5px',
              color: '#111',
              lineHeight: 1.3,
              margin: '0 0 3px',
              fontWeight: 400,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
            }}
          >
            {product.name}
          </p>

          <p
            style={{
              fontSize: '11px',
              color: '#999',
              margin: '0 0 8px',
              letterSpacing: '0.04em',
            }}
          >
            {product.brand}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {affiliateUrl.includes('cultbeauty') ? (
              <span style={{ fontSize: '13px', color: '#9b7e6b', fontWeight: 500 }}>
                Shop on Cult Beauty
              </span>
            ) : (
              <>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: '17px',
                    color: '#111',
                    fontWeight: 400,
                  }}
                >
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {disc > 0 && (
                  <>
                    <span style={{ fontSize: '11px', color: '#bbb', textDecoration: 'line-through' }}>
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                    <span
                      style={{
                        fontSize: '9px',
                        color: '#2d7a4f',
                        background: '#edf7f0',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        fontWeight: 700,
                      }}
                    >
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
          style={{
            flexShrink: 0,
            width: '34px',
            height: '34px',
            background: accentColor || '#111',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '8px',
          }}
        >
          <ExternalLink size={12} color="#fff" />
        </div>
      </a>
      <p
        style={{
          fontSize: '9px',
          color: '#ccc',
          margin: '0',
          textAlign: 'right',
          fontFamily: 'var(--font-mono, monospace)',
        }}
      >
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

  return (
    <div className="rr-container">
      <style>{`
        .rr-container {
          min-height: 100vh;
          background: linear-gradient(160deg, #fdf9f5 0%, #f8f2ea 40%, #fdf6f0 100%);
          padding: 60px 20px 120px;
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
          background: #fff;
          border: 1px solid #e3d8ce;
          border-radius: 9999px;
          font-size: 11px;
          color: #5c534c;
          font-weight: 500;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.05em;
        }
        .rr-chip-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fc2779;
          flex-shrink: 0;
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
        }

        /* Step cards */
        .rr-step-card {
          background: #fff;
          border: 1px solid #ede8e0;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.03);
          transition: box-shadow 0.3s;
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
        .rr-step-body {
          padding: 20px 24px 24px;
        }

        /* Product card */
        .rr-product-card {
          background: #faf8f5;
          border: 1px solid #ede8e0;
          color: #111;
        }
        .rr-img-box {
          background: #fff;
          border: 1px solid #f0ebe3;
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

        /* Dark mode */
        html.dark .rr-container, .dark .rr-container {
          background: linear-gradient(160deg, #0b0f19 0%, #0f1520 60%, #0b0f19 100%) !important;
        }
        html.dark .rr-title, .dark .rr-title { color: #fff !important; }
        html.dark .rr-subtitle, .dark .rr-subtitle { color: #9ca3af !important; }
        html.dark .rr-chip, .dark .rr-chip {
          background: #1f2937 !important;
          border-color: #374151 !important;
          color: #d1d5db !important;
        }
        html.dark .rr-climate-widget, .dark .rr-climate-widget {
          background: #111827 !important;
          border-color: #1f2937 !important;
        }
        html.dark .rr-climate-widget h3, .dark .rr-climate-widget h3 { color: #f8fafc !important; }
        html.dark .rr-step-card, .dark .rr-step-card {
          background: #111827 !important;
          border-color: #1f2937 !important;
        }
        html.dark .rr-step-header, .dark .rr-step-header {
          border-bottom-color: #1f2937 !important;
        }
        html.dark .rr-step-header h2, .dark .rr-step-header h2 { color: #fff !important; }
        html.dark .rr-step-header p, .dark .rr-step-header p { color: #9ca3af !important; }
        html.dark .rr-product-card, .dark .rr-product-card {
          background: #1f2937 !important;
          border-color: #374151 !important;
          color: #f8fafc !important;
        }
        html.dark .rr-product-card p, .dark .rr-product-card p { color: #f8fafc !important; }
        html.dark .rr-img-box, .dark .rr-img-box {
          background: #111827 !important;
          border-color: #374151 !important;
        }
        html.dark .rr-usage-box, .dark .rr-usage-box {
          background: #1e293b !important;
          color: #f8fafc !important;
        }

        @media (max-width: 640px) {
          .rr-container { padding: 40px 16px 80px; }
          .rr-step-header { padding: 16px 18px 14px; }
          .rr-step-body { padding: 16px 18px 20px; }
          .rr-usage-box { padding: 24px 20px; }
          .rr-actions { flex-direction: column; }
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
            <em style={{ fontStyle: 'italic', color: '#9b7e6b' }}>4-Step Ritual</em>
          </h1>
          <p className="rr-subtitle">
            Curated for your skin type, concern, and local climate. All products are verified, reviewed, and available with fast delivery.
          </p>
          {/* Skin profile chips — populated from query params or placeholders */}
          <div className="rr-profile-chips">
            {climate && (
              <button
                className="rr-chip"
                onClick={() => setShowClimateModal(true)}
                style={{ cursor: 'pointer', border: '1px solid #ccead4', background: '#edf7f0', color: '#2d7a4f' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0, display: 'inline-block' }} />
                {climate.city} · {climate.temp}°C, {climate.humidity}% RH
                <span style={{ fontSize: 9, opacity: 0.6, marginLeft: 4 }}>edit</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Climate Alert ── */}
        {routine.climateAdjustment && (
          <div
            style={{
              background: routine.climateAdjustment.type === 'humid_heat' ? '#fff9f0' : '#f0f5ff',
              borderLeft: `4px solid ${routine.climateAdjustment.type === 'humid_heat' ? '#f59e0b' : '#3b82f6'}`,
              padding: '14px 18px',
              borderRadius: '0 10px 10px 0',
              fontSize: '13px',
              color: '#4a4340',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}
          >
            <strong style={{ color: routine.climateAdjustment.type === 'humid_heat' ? '#d97706' : '#2563eb' }}>
              Climate Adaptation Active:{' '}
            </strong>
            {routine.climateAdjustment.alertText}
          </div>
        )}

        {/* ── Climate Presets ── */}
        <div className="rr-climate-widget">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ margin: 0, fontFamily: "'DM Serif Display', serif", fontSize: '17px', color: '#111', fontWeight: 400 }}>
                Adaptive Climate Engine
              </h3>
              <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#9b7e6b', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.04em' }}>
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
                  style={{
                    padding: '7px 12px',
                    fontSize: '11px',
                    border: `1px solid ${isActive ? '#111' : '#ede8e0'}`,
                    background: isActive ? '#111' : '#faf8f5',
                    color: isActive ? '#fff' : '#555',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {preset.label}
                </button>
              );
            })}
            <button
              onClick={() => onClimateChange(undefined)}
              style={{
                padding: '7px 12px',
                fontSize: '11px',
                border: `1px solid ${!climate ? '#111' : '#ede8e0'}`,
                background: !climate ? '#111' : '#faf8f5',
                color: !climate ? '#fff' : '#555',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono, monospace)',
                transition: 'all 0.2s',
              }}
            >
              🍃 Moderate
            </button>
            <button
              onClick={() => setShowClimateModal(true)}
              style={{
                padding: '7px 12px',
                fontSize: '11px',
                border: '1px dashed #9b7e6b',
                background: '#faf8f5',
                color: '#9b7e6b',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f5ebe6')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#faf8f5')}
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
                    <p
                      style={{
                        fontSize: '9px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: step.accentColor,
                        margin: '0 0 3px',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontWeight: 700,
                      }}
                    >
                      {step.step}
                    </p>
                    <h2
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: '20px',
                        fontWeight: 400,
                        color: '#111',
                        margin: '0 0 4px',
                        lineHeight: 1.2,
                      }}
                    >
                      {step.label}
                    </h2>
                    <p style={{ fontSize: '12px', color: '#888', lineHeight: 1.5, margin: 0 }}>
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
              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #222' }}>
                <p style={{ fontSize: '11px', color: '#555', margin: 0 }}>Skip SPF at night</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #222', fontSize: '12px', color: '#888', lineHeight: 1.65 }}>
            Visible results appear in <strong style={{ color: '#f59e0b' }}>4–8 weeks</strong> with consistent daily use. Introduce new actives 2–3x per week, then gradually increase frequency.
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="rr-actions">
          <button
            onClick={onRestart}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px 24px',
              background: 'transparent',
              border: '1px solid #ddd',
              color: '#666',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '10px',
              transition: 'all 0.25s',
              fontFamily: 'var(--font-mono, monospace)',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = '#fc2779';
              btn.style.color = '#fc2779';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = '#ddd';
              btn.style.color = '#666';
            }}
          >
            <RotateCcw size={12} />
            Retake Quiz
          </button>

          <a
            href="/blog/diwali-skincare-prep-glow-protocol"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '13px 24px',
              background: '#fc2779',
              color: '#fff',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '10px',
              border: '1px solid #fc2779',
              transition: 'all 0.25s',
              gap: '8px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono, monospace)',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#e01e69')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#fc2779')}
          >
            Diwali Prep Guide
            <ArrowRight size={12} />
          </a>

          <a
            href="/shop"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '13px 24px',
              background: '#111',
              color: '#fff',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '10px',
              border: '1px solid #111',
              transition: 'all 0.25s',
              gap: '8px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono, monospace)',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#333')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#111')}
          >
            All Products
            <ArrowRight size={12} />
          </a>
        </div>

        {/* ── Disclaimer ── */}
        <p
          style={{
            fontSize: '10px',
            color: '#bbb',
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
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '440px',
              background: '#fff',
              border: '1px solid #e8e2d9',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.12)',
            }}
          >
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', margin: '0 0 8px', color: '#111' }}>
              Select Your Location
            </h3>
            <p style={{ fontSize: '12px', color: '#888', margin: '0 0 20px', lineHeight: 1.5 }}>
              Climate directly affects which textures and actives work best for your skin.
            </p>

            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#bbb', margin: '0 0 10px', fontFamily: 'var(--font-mono, monospace)' }}>
              Quick Presets
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {CLIMATE_PRESETS.map((preset) => (
                <button
                  key={preset.city}
                  onClick={() => { onClimateChange(preset); setShowClimateModal(false); }}
                  style={{
                    padding: '8px 12px',
                    fontSize: '11px',
                    border: '1px solid #ede8e0',
                    background: '#faf8f5',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono, monospace)',
                    color: '#444',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.background = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#ede8e0'; e.currentTarget.style.background = '#faf8f5'; }}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#bbb', margin: '0 0 10px', fontFamily: 'var(--font-mono, monospace)' }}>
              Search Any City
            </p>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchCity(e.target.value)}
                placeholder="Type city name (e.g. Mumbai, London)..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #ede8e0',
                  borderRadius: '10px',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#fc2779')}
                onBlur={(e) => (e.target.style.borderColor = '#ede8e0')}
              />
              {searching && (
                <div style={{ position: 'absolute', right: '12px', top: '13px', fontSize: '11px', color: '#999' }}>
                  Searching...
                </div>
              )}
            </div>

            {searchResults.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '180px', overflowY: 'auto', marginBottom: '20px', border: '1px solid #ede8e0', borderRadius: '10px', padding: '6px' }}>
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectSearchResult(result)}
                    style={{ padding: '10px 12px', background: 'none', border: 'none', borderRadius: '7px', textAlign: 'left', fontSize: '13px', color: '#333', cursor: 'pointer', width: '100%', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#faf8f5')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                  >
                    <span style={{ fontWeight: 500 }}>{result.name}</span>
                    {result.admin1 && <span style={{ color: '#888', fontSize: '11px' }}>, {result.admin1}</span>}
                    {result.country && <span style={{ color: '#aaa', fontSize: '11px' }}> ({result.country})</span>}
                  </button>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #ede8e0', paddingTop: '16px' }}>
              <button
                onClick={() => { detectClimate(); setShowClimateModal(false); }}
                style={{
                  flex: 1,
                  padding: '11px',
                  background: '#111',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono, monospace)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#111')}
              >
                📡 Auto-Detect
              </button>
              <button
                onClick={() => setShowClimateModal(false)}
                style={{
                  padding: '11px 16px',
                  background: 'none',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  color: '#666',
                  fontFamily: 'var(--font-mono, monospace)',
                }}
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

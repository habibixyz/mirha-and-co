'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Droplets, 
  Wind, 
  Layers, 
  Shield, 
  Target, 
  Sun, 
  Flame, 
  Waves, 
  Tag, 
  Zap, 
  Compass, 
  Check, 
  RotateCcw,
  Sliders,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { QuizAnswers, RoutineRecommendation, generateRoutine } from '@/lib/routineEngine';
import RoutineResult from './RoutineResult';
import { useRoutineAnalytics } from '@/lib/hooks/useRoutineAnalytics';
import { useSearchParams } from 'next/navigation';

interface AnswerOption {
  id: string;
  label: string;
  badge: string;
  description: string;
  iconName: string;
}

interface StepConfig {
  id: keyof QuizAnswers | string;
  stepNumber: string;
  badge: string;
  question: string;
  subtitle: string;
  answers: AnswerOption[];
}

const QUIZ_STEPS: StepConfig[] = [
  {
    id: 'skinType',
    stepNumber: '01',
    badge: 'Skin Barrier Profile',
    question: "What's your primary skin type?",
    subtitle: 'This dictates which active concentrations, delivery vehicles, and hydration textures will nourish without clogging or stinging.',
    answers: [
      {
        id: 'oily',
        label: 'Oily',
        badge: 'High Sebum',
        iconName: 'droplets',
        description: 'Midday shine across face, visible pores, prone to blackheads and congestion.',
      },
      {
        id: 'dry',
        label: 'Dry',
        badge: 'Lipid Deficit',
        iconName: 'wind',
        description: 'Persistent tightness after washing, flaking around nose or brows, rough texture.',
      },
      {
        id: 'combination',
        label: 'Combination',
        badge: 'Dual Zone',
        iconName: 'layers',
        description: 'Oilier T-zone (forehead, nose, chin) with normal-to-dry or tight cheeks.',
      },
      {
        id: 'sensitive',
        label: 'Sensitive & Reactive',
        badge: 'Delicate Barrier',
        iconName: 'shield',
        description: 'Prone to burning, stinging under tap water, redness, easily triggered by fragrance.',
      },
    ],
  },
  {
    id: 'mainConcern',
    stepNumber: '02',
    badge: 'Active Ingredient Target',
    question: "What's your primary skin concern?",
    subtitle: "We will build your treatment step around clinically backed dermatological actives formulated for this exact objective.",
    answers: [
      {
        id: 'acne',
        label: 'Acne & Active Blemishes',
        badge: 'BHA & Sebum Control',
        iconName: 'target',
        description: 'Active whiteheads, inflammatory pimples, hormonal breakouts, and clogged pores.',
      },
      {
        id: 'pigmentation',
        label: 'Dark Spots & Pigmentation',
        badge: 'Melanin Inhibition',
        iconName: 'sun',
        description: 'Stubborn sun spots, melasma, post-acne marks (PIH), and uneven skin tone.',
      },
      {
        id: 'dullness',
        label: 'Dullness & Lack of Radiance',
        badge: 'Cellular Turnover',
        iconName: 'flame',
        description: 'Fatigued appearance, dead surface accumulation, looking for lit-from-within glow.',
      },
      {
        id: 'dehydration',
        label: 'Dehydration & Water Loss',
        badge: 'Barrier Repair',
        iconName: 'waves',
        description: 'Cracking moisture mantle, parched feeling despite regular moisturising.',
      },
    ],
  },
  {
    id: 'budget',
    stepNumber: '03',
    badge: 'Formulation Tier',
    question: "What's your preferred budget per product?",
    subtitle: "We've curated verified clinical performers, pharmacy gems, and Korean cult holy grails across all price tiers.",
    answers: [
      {
        id: 'under_500',
        label: 'Under ₹500 / product',
        badge: 'Pharmacy & Drugstore',
        iconName: 'tag',
        description: 'Smart essential formulations with proven actives (The Derma Co, Simple, Sebamed).',
      },
      {
        id: 'under_1000',
        label: 'Under ₹1,000 / product',
        badge: 'Clinical Favorite',
        iconName: 'zap',
        description: 'Cult clinical actives & derm brands (The Ordinary, Minimalist, Re\'equil, Formularx).',
      },
      {
        id: 'under_2000',
        label: 'Under ₹2,000 / product',
        badge: 'Luxury & K-Beauty',
        iconName: 'compass',
        description: 'Top-tier Korean glass-skin & luxury derm formulas (COSRX Snail, SKIN1004, Cetaphil).',
      },
    ],
  },
];

const CLIMATE_PRESETS = [
  { city: "Mumbai (Summer/Monsoon)", temp: 38, humidity: 82, label: "💧 Mumbai", countryCode: "IN" },
  { city: "Delhi (Winter)", temp: 12, humidity: 25, label: "❄️ Delhi", countryCode: "IN" },
  { city: "Bangalore (Moderate)", temp: 24, humidity: 50, label: "🍃 Bangalore", countryCode: "IN" },
];

function RenderQuizIcon({ name, isSelected }: { name: string; isSelected: boolean }) {
  const iconProps = {
    size: 20,
    strokeWidth: 2,
    color: isSelected ? '#ffffff' : '#9b7e6b',
  };

  switch (name) {
    case 'droplets':
      return <Droplets {...iconProps} />;
    case 'wind':
      return <Wind {...iconProps} />;
    case 'layers':
      return <Layers {...iconProps} />;
    case 'shield':
      return <Shield {...iconProps} />;
    case 'target':
      return <Target {...iconProps} />;
    case 'sun':
      return <Sun {...iconProps} />;
    case 'flame':
      return <Flame {...iconProps} />;
    case 'waves':
      return <Waves {...iconProps} />;
    case 'tag':
      return <Tag {...iconProps} />;
    case 'zap':
      return <Zap {...iconProps} />;
    case 'compass':
      return <Compass {...iconProps} />;
    default:
      return <Droplets {...iconProps} />;
  }
}

export default function RoutineQuiz() {
  const { trackQuizStart, trackQuizComplete } = useRoutineAnalytics();

  const [climate, setClimate] = useState<{ temp: number; humidity: number; city: string; countryCode?: string } | undefined>({
    temp: 38,
    humidity: 82,
    city: "Mumbai (Summer/Monsoon)",
    countryCode: "IN",
  });
  const [climateLoading, setClimateLoading] = useState(false);
  const [climateError, setClimateError] = useState(false);

  // Climate Customization States
  const [showClimateModal, setShowClimateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const detectClimate = () => {
    setClimateLoading(true);
    setClimateError(false);

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
        setClimateError(true);
        setClimateLoading(false);
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

        setClimate({
          temp,
          humidity,
          city: cityName,
          countryCode,
        });
      } catch (err) {
        console.error("Weather fetch failed:", err);
        setClimateError(true);
      } finally {
        setClimateLoading(false);
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
            console.warn("Reverse geocode failed, using default coordinate tag:", err);
            await fetchWeather(lat, lon, "Your Location (GPS)");
          }
        },
        (error) => {
          console.log("GPS access denied or failed, falling back to IP:", error.message);
          fetchByIP();
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    } else {
      fetchByIP();
    }
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    trackQuizStart();
    detectClimate();
    // Pre-select concern from URL param (?concern=acne etc.)
    const urlConcern = searchParams.get('concern');
    if (urlConcern) {
      const concernMap: Record<string, string> = {
        acne: 'acne',
        pigmentation: 'pigmentation',
        dullness: 'dullness',
        dehydration: 'dehydration',
        dryness: 'dehydration',
        oily: 'acne',
      };
      const mapped = concernMap[urlConcern.toLowerCase()];
      if (mapped) {
        setAnswers(prev => ({ ...prev, mainConcern: mapped as QuizAnswers['mainConcern'] }));
        setCurrentStep(1);
      }
    }
  }, []);

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showResult, setShowResult] = useState(false);
  const [routine, setRoutine] = useState<RoutineRecommendation | null>(null);

  const step = QUIZ_STEPS[currentStep];
  const selectedAnswer = answers[step.id as keyof QuizAnswers];
  const isAnswered = !!selectedAnswer;
  const isLastStep = currentStep === QUIZ_STEPS.length - 1;

  const handleSelectAnswer = (answerId: string) => {
    setAnswers({
      ...answers,
      [step.id]: answerId,
    });
  };

  const handleClimateChange = (newClimate: { temp: number; humidity: number; city: string } | undefined) => {
    setClimate(newClimate);
    if (answers.skinType && answers.mainConcern && answers.budget) {
      const generatedRoutine = generateRoutine(answers as QuizAnswers, newClimate);
      setRoutine(generatedRoutine);
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
    setClimateLoading(true);
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

      const newClimate = {
        temp,
        humidity,
        city: cityName,
        countryCode,
      };
      setClimate(newClimate);
      if (answers.skinType && answers.mainConcern && answers.budget) {
        const generatedRoutine = generateRoutine(answers as QuizAnswers, newClimate);
        setRoutine(generatedRoutine);
      }
    } catch (err) {
      console.error("Select city failed:", err);
      setClimateError(true);
    } finally {
      setClimateLoading(false);
    }
  };

  const handleSelectPreset = (preset: { city: string; temp: number; humidity: number }) => {
    const newClimate = {
      city: preset.city,
      temp: preset.temp,
      humidity: preset.humidity,
    };
    setClimate(newClimate);
    if (answers.skinType && answers.mainConcern && answers.budget) {
      const generatedRoutine = generateRoutine(answers as QuizAnswers, newClimate);
      setRoutine(generatedRoutine);
    }
    setShowClimateModal(false);
  };

  const middleSectionRef = useRef<HTMLDivElement>(null);

  const scrollToMiddle = () => {
    if (typeof window !== 'undefined' && middleSectionRef.current) {
      middleSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNext = () => {
    if (!isAnswered) return;

    if (isLastStep) {
      const completeAnswers = answers as QuizAnswers;
      const generatedRoutine = generateRoutine(completeAnswers, climate);
      setRoutine(generatedRoutine);
      trackQuizComplete(completeAnswers);
      setShowResult(true);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    } else {
      setCurrentStep(currentStep + 1);
      setTimeout(scrollToMiddle, 40);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimeout(scrollToMiddle, 40);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setRoutine(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  if (showResult && routine) {
    return (
      <RoutineResult
        routine={routine}
        onRestart={handleRestart}
        climate={climate}
        onClimateChange={handleClimateChange}
      />
    );
  }

  return (
    <div className="rq-container">
      <style>{`
        .rq-container {
          min-height: 100vh;
          background: radial-gradient(circle at 50% 0%, #faf6f0 0%, #f4eee6 50%, #eee6db 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 20px 48px;
        }
        .rq-title { color: #111111; }
        .rq-subtitle { color: #6b635c; }
        
        .rq-card { 
          background: #ffffff; 
          border: 1px solid #e8e0d5; 
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(155, 126, 107, 0.08);
        }

        .rq-option-btn {
          border: 1.5px solid #ede5da;
          background: #ffffff;
          color: #111111;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 14px;
          padding: 16px 18px;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          position: relative;
        }
        .rq-option-btn:hover {
          border-color: #9b7e6b;
          background: #faf8f5;
          transform: translateY(-1.5px);
          box-shadow: 0 4px 16px rgba(155, 126, 107, 0.1);
        }
        .rq-option-btn.active {
          border-color: #111111 !important;
          background: #faf8f5 !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08) !important;
        }

        .rq-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #fbf8f4;
          border: 1px solid #eee5da;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .rq-option-btn.active .rq-icon-box {
          background: #111111;
          border-color: #111111;
        }

        .rq-check-circle {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1.5px solid #d6cdc3;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
          transition: all 0.2s;
        }
        .rq-option-btn.active .rq-check-circle {
          background: #111111;
          border-color: #111111;
          color: #ffffff;
        }

        .rq-back-btn {
          background: transparent;
          border: 1.5px solid #e5dcce;
          color: #4a433d;
          border-radius: 12px;
          padding: 12px 20px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .rq-back-btn:hover:not(:disabled) {
          border-color: #111;
          color: #111;
          background: #fff;
        }
        .rq-back-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .rq-next-btn {
          background: #111111;
          border: 1.5px solid #111111;
          color: #ffffff;
          border-radius: 12px;
          padding: 12px 26px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .rq-next-btn:hover:not(:disabled) {
          background: #333333;
          border-color: #333333;
          transform: translateY(-1px);
        }
        .rq-next-btn:disabled {
          background: #e2dbd1;
          border-color: #e2dbd1;
          color: #8c837a;
          box-shadow: none;
          cursor: not-allowed;
        }

        html.dark .rq-container, .dark .rq-container {
          background: radial-gradient(circle at 50% 0%, #151922 0%, #0c0f16 100%) !important;
        }
        html.dark .rq-title, .dark .rq-title { color: #ffffff !important; }
        html.dark .rq-subtitle, .dark .rq-subtitle { color: #a1a1aa !important; }
        html.dark .rq-card, .dark .rq-card {
          background: #141923 !important;
          border-color: #262e3d !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
        }
        html.dark .rq-option-btn, .dark .rq-option-btn {
          background: #19202c !important;
          border-color: #283344 !important;
          color: #f4f4f5 !important;
        }
        html.dark .rq-option-btn:hover, .dark .rq-option-btn:hover {
          background: #202938 !important;
          border-color: #3b4759 !important;
        }
        html.dark .rq-option-btn.active, .dark .rq-option-btn.active {
          border-color: #fc2779 !important;
          background: #231c28 !important;
        }
        html.dark .rq-icon-box, .dark .rq-icon-box {
          background: #202938 !important;
          border-color: #2d3848 !important;
        }
        html.dark .rq-option-btn.active .rq-icon-box {
          background: #fc2779 !important;
          border-color: #fc2779 !important;
        }
        html.dark .rq-option-btn.active .rq-check-circle {
          background: #fc2779 !important;
          border-color: #fc2779 !important;
        }
        html.dark .rq-next-btn, .dark .rq-next-btn {
          background: #fc2779 !important;
          border-color: #fc2779 !important;
          color: #ffffff !important;
        }
        html.dark .rq-next-btn:hover:not(:disabled), .dark .rq-next-btn:hover:not(:disabled) {
          background: #e01e69 !important;
        }
        html.dark .rq-next-btn:disabled, .dark .rq-next-btn:disabled {
          background: #202938 !important;
          border-color: #202938 !important;
          color: #52525b !important;
        }
        html.dark .rq-modal-content, .dark .rq-modal-content {
          background: #141923 !important;
          border-color: #262e3d !important;
          color: #f4f4f5 !important;
        }

        @media (max-width: 640px) {
          .rq-container { padding: 24px 14px 44px; }
          .rq-card { padding: 24px 16px !important; }
          .rq-option-btn { padding: 13px 13px; gap: 12px; }
          .rq-icon-box { width: 38px; height: 38px; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '680px' }}>
        
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: currentStep === 0 ? '24px' : '14px', transition: 'all 0.3s' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              background: '#ffffff',
              border: '1px solid #e6ded3',
              borderRadius: '9999px',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8c705f',
              marginBottom: currentStep === 0 ? '10px' : '6px',
              fontFamily: 'var(--font-mono, monospace)',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(155, 126, 107, 0.06)',
            }}
          >
            <Compass size={11} color="#8c705f" />
            Mirha & Co. · Routine Builder
          </div>

          <h1
            className="rq-title"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: currentStep === 0 ? 'clamp(26px, 4.5vw, 36px)' : 'clamp(20px, 3.5vw, 26px)',
              fontWeight: 400,
              margin: currentStep === 0 ? '0 0 8px' : '0 0 4px',
              lineHeight: 1.15,
            }}
          >
            Your Personalized{' '}
            <em style={{ fontStyle: 'italic', color: '#9b7e6b' }}>4-Step Routine</em>
          </h1>

          {currentStep === 0 && (
            <p
              className="rq-subtitle"
              style={{
                fontSize: '13.5px',
                lineHeight: 1.55,
                margin: '0 auto 14px',
                maxWidth: '520px',
              }}
            >
              Answer 3 quick questions. We calibrate your answers against local city climate, humidity, and water hardness.
            </p>
          )}

          {currentStep === 0 && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fef7ec',
                border: '1px solid #fae6c6',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '11px',
                color: '#8a5b18',
                marginBottom: '12px',
                lineHeight: 1.4,
                maxWidth: '560px',
                textAlign: 'left',
              }}
            >
              <Calendar size={13} style={{ flexShrink: 0, color: '#b4731a' }} />
              <span>
                <strong>Festive Skin Reset:</strong> Weather shifts & festive air affect barrier lipids. Your routine is automatically calibrated.
              </span>
            </div>
          )}

          {/* Climate Sync Pill */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {climateLoading ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 12px',
                  background: '#ffffff',
                  border: '1px solid #ede8e0',
                  borderRadius: '20px',
                  fontSize: '10.5px',
                  color: '#9b7e6b',
                  fontFamily: 'var(--font-mono, monospace)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    background: '#9b7e6b',
                    borderRadius: '50%',
                    opacity: 0.6,
                  }}
                />
                Syncing local climate...
              </div>
            ) : climateError ? (
              <div
                onClick={() => setShowClimateModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 12px',
                  background: '#faf8f5',
                  border: '1px solid #ede8e0',
                  borderRadius: '20px',
                  fontSize: '10.5px',
                  color: '#888',
                  fontFamily: 'var(--font-mono, monospace)',
                  cursor: 'pointer',
                }}
              >
                Climate: Mumbai Default — 38°C, 82% RH
                <span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5, marginLeft: '6px' }}>edit</span>
              </div>
            ) : climate ? (
              <div
                onClick={() => setShowClimateModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  background: '#edf7f0',
                  border: '1px solid #ccead4',
                  borderRadius: '20px',
                  fontSize: '10.5px',
                  color: '#2d7a4f',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 500,
                  boxShadow: '0 2px 8px rgba(45, 122, 79, 0.05)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', flexShrink: 0 }} />
                Climate Synced: {climate.city} — {climate.temp}°C, {climate.humidity}% RH
                <span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6, marginLeft: '6px' }}>edit</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Middle Section: Progress Bar + Question Card + Navigation */}
        <div ref={middleSectionRef} style={{ scrollMarginTop: '60px' }}>
          {/* Step Progress Header */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#9b7e6b',
                  letterSpacing: '0.1em',
                }}
              >
                STEP {currentStep + 1} OF {QUIZ_STEPS.length}
              </span>
              <span style={{ color: '#d0c6b8' }}>·</span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#6e655d',
                }}
              >
                {step.badge}
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                color: '#999',
                letterSpacing: '0.05em',
              }}
            >
              {Math.round(((currentStep + 1) / QUIZ_STEPS.length) * 100)}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div
            style={{
              height: '4px',
              background: '#e9e1d6',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #9b7e6b 0%, #111111 100%)',
                width: `${((currentStep + 1) / QUIZ_STEPS.length) * 100}%`,
                transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '9999px',
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div
          className="rq-card"
          style={{
            padding: '42px 36px',
            marginBottom: '32px',
          }}
        >
          {/* Question Title */}
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(24px, 5vw, 30px)',
              fontWeight: 400,
              color: '#111',
              margin: '0 0 10px',
              lineHeight: 1.25,
            }}
          >
            {step.question}
          </h2>

          <p
            style={{
              fontSize: '13.5px',
              color: '#7a7067',
              margin: '0 0 28px',
              lineHeight: 1.6,
            }}
          >
            {step.subtitle}
          </p>

          {/* Answer Option Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {step.answers.map((answer) => {
              const isSelected = selectedAnswer === answer.id;
              return (
                <button
                  key={answer.id}
                  onClick={() => handleSelectAnswer(answer.id)}
                  className={`rq-option-btn ${isSelected ? 'active' : ''}`}
                >
                  {/* Option Icon */}
                  <div className="rq-icon-box">
                    <RenderQuizIcon name={answer.iconName} isSelected={isSelected} />
                  </div>

                  {/* Option Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: isSelected ? '#111' : '#222',
                        }}
                      >
                        {answer.label}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono, monospace)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: isSelected ? '#111111' : '#f2ebe2',
                          color: isSelected ? '#ffffff' : '#7d6d60',
                          fontWeight: 600,
                          flexShrink: 0,
                        }}
                      >
                        {answer.badge}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: '12.5px',
                        margin: 0,
                        color: isSelected ? '#4b433c' : '#756c64',
                        lineHeight: 1.5,
                      }}
                    >
                      {answer.description}
                    </p>
                  </div>

                  {/* Selection Indicator */}
                  <div className="rq-check-circle">
                    {isSelected && <Check size={13} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="rq-back-btn"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="rq-next-btn"
          >
            {isLastStep ? (
              <>
                Build My Routine
                <ArrowRight size={16} />
              </>
            ) : (
              <>
                Next Step
                <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>
        </div>

      </div>

      {/* Climate Modal */}
      {showClimateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            className="rq-modal-content"
            style={{
              width: '100%',
              maxWidth: '460px',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, fontFamily: "'DM Serif Display', serif", fontSize: '20px', fontWeight: 400 }}>
                  Adjust Climate Profile
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#888' }}>
                  Calibrate for your city's exact humidity and heat
                </p>
              </div>
              <button
                onClick={() => setShowClimateModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  color: '#999',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Presets */}
            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9b7e6b', margin: '0 0 10px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600 }}>
              Quick Presets
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {CLIMATE_PRESETS.map((preset) => (
                <button
                  key={preset.city}
                  onClick={() => handleSelectPreset(preset)}
                  style={{
                    padding: '8px 14px',
                    fontSize: '11.5px',
                    border: '1px solid #ede8e0',
                    background: '#faf8f5',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono, monospace)',
                    color: '#444',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#111';
                    e.currentTarget.style.background = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#ede8e0';
                    e.currentTarget.style.background = '#faf8f5';
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Custom Search */}
            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9b7e6b', margin: '0 0 10px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600 }}>
              Search Any City Worldwide
            </p>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchCity(e.target.value)}
                placeholder="Type city name (e.g. Mumbai, London, Dubai)..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1.5px solid #ede8e0',
                  borderRadius: '10px',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#111')}
                onBlur={(e) => (e.target.style.borderColor = '#ede8e0')}
              />
              {searching && (
                <div style={{ position: 'absolute', right: '12px', top: '12px', fontSize: '11px', color: '#999', fontFamily: 'var(--font-mono, monospace)' }}>
                  Searching...
                </div>
              )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  marginBottom: '20px',
                  border: '1px solid #ede8e0',
                  borderRadius: '10px',
                  padding: '6px',
                }}
              >
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectSearchResult(result)}
                    style={{
                      padding: '10px 12px',
                      background: 'none',
                      border: 'none',
                      borderRadius: '8px',
                      textAlign: 'left',
                      fontSize: '13px',
                      color: '#333',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#faf8f5')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                  >
                    <span style={{ fontWeight: 600 }}>{result.name}</span>
                    {result.admin1 && <span style={{ color: '#888', fontSize: '11px' }}>, {result.admin1}</span>}
                    {result.country && <span style={{ color: '#aaa', fontSize: '11px' }}> ({result.country})</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Auto-detect button */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #ede8e0', paddingTop: '18px' }}>
              <button
                onClick={() => {
                  detectClimate();
                  setShowClimateModal(false);
                }}
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
                📡 Auto-Detect Location
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

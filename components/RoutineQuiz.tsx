'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { QuizAnswers, RoutineRecommendation, generateRoutine } from '@/lib/routineEngine';
import RoutineResult from './RoutineResult';
import { useRoutineAnalytics } from '@/lib/hooks/useRoutineAnalytics';

const QUIZ_STEPS = [
 {
 id: 'skinType',
 question: "What's your skin type?",
 subtitle: 'This determines which actives and textures will work best for you.',
 answers: [
 { id: 'oily', label: 'Oily', description: 'Shine by midday, visible pores, prone to breakouts' },
 { id: 'dry', label: 'Dry', description: 'Tight feeling, flaking, dull texture' },
 { id: 'combination', label: 'Combination', description: 'Oily T-zone, dry cheeks' },
 { id: 'sensitive', label: 'Sensitive', description: 'Red, reactive, easily irritated' },
 ],
 },
 {
 id: 'mainConcern',
 question: "What's your primary skin concern?",
 subtitle: "We'll build around this to address what matters most to you.",
 answers: [
 { id: 'acne', label: 'Acne & Breakouts', description: 'Active pimples, congestion, post-acne marks' },
 { id: 'pigmentation', label: 'Dark Spots & Pigmentation', description: 'Uneven tone, hyperpigmentation, melasma' },
 { id: 'dullness', label: 'Dullness & Uneven Tone', description: 'Lack of glow, tired appearance' },
 { id: 'dehydration', label: 'Dehydration & Dryness', description: 'Tight, flaky, lack of moisture' },
 ],
 },
 {
 id: 'budget',
 question: "What's your budget per product?",
 subtitle: "We've curated options across all price points.",
 answers: [
 { id: 'under_500', label: 'Under ₹500', description: 'Best value, proven performers' },
 { id: 'under_1000', label: 'Under ₹1,000', description: 'Clinical-grade ingredients' },
 { id: 'under_2000', label: 'Under ₹2,000', description: 'Premium formulations' },
 ],
 },
];

const CLIMATE_PRESETS = [
 { city: "Mumbai (Summer/Monsoon)", temp: 38, humidity: 82, label: "💧 Mumbai Summer" },
 { city: "Delhi (Winter)", temp: 12, humidity: 25, label: "❄️ Delhi Winter" },
 { city: "Bangalore (Moderate)", temp: 24, humidity: 50, label: "🍃 Bangalore Spring" },
];

export default function RoutineQuiz() {
 const { trackQuizStart, trackQuizComplete } = useRoutineAnalytics();

 const [climate, setClimate] = useState<{ temp: number; humidity: number; city: string; countryCode?: string } | undefined>({
 temp: 38,
 humidity: 82,
 city: "Mumbai (Summer/Monsoon)",
 countryCode: "IN"
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
 countryCode
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
 // Try reverse geocoding via BigDataCloud client API
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

 useEffect(() => {
 trackQuizStart();
 detectClimate();
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
 countryCode
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
 humidity: preset.humidity
 };
 setClimate(newClimate);
 if (answers.skinType && answers.mainConcern && answers.budget) {
 const generatedRoutine = generateRoutine(answers as QuizAnswers, newClimate);
 setRoutine(generatedRoutine);
 }
 setShowClimateModal(false);
 };

 const handleNext = () => {
 if (!isAnswered) return;

 if (isLastStep) {
 const completeAnswers = answers as QuizAnswers;
 const generatedRoutine = generateRoutine(completeAnswers, climate);
 setRoutine(generatedRoutine);
 trackQuizComplete(completeAnswers);
 setShowResult(true);
 } else {
 setCurrentStep(currentStep + 1);
 }
 };

 const handleBack = () => {
 if (currentStep > 0) {
 setCurrentStep(currentStep - 1);
 }
 };

 const handleRestart = () => {
 setCurrentStep(0);
 setAnswers({});
 setShowResult(false);
 setRoutine(null);
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
 background: linear-gradient(135deg, #faf8f5 0%, #f5f1ed 100%);
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 40px 20px;
 }
 .rq-title { color: #111111; }
 .rq-subtitle { color: #777777; }
 .rq-card { background: #ffffff; border: 1px solid #e8e2d9; }
 .rq-btn { border: 1px solid #e8e2d9; background: #ffffff; color: #111111; }
 .rq-btn:hover { border-color: #d6d0c9; background: #faf8f5; }
 .rq-btn-active { border: 1px solid #111111; background: #111111; color: #ffffff; }
 .rq-modal-content { background: #ffffff; border: 1px solid #e8e2d9; color: #111111; }

 html.dark .rq-container, .dark .rq-container { background: #0b0f19 !important; }
 html.dark .rq-title, .dark .rq-title { color: #ffffff !important; }
 html.dark .rq-subtitle, .dark .rq-subtitle { color: #9ca3af !important; }
 html.dark .rq-card, .dark .rq-card { background: #111827 !important; border-color: #1f2937 !important; }
 html.dark .rq-btn, .dark .rq-btn { border-color: #374151 !important; background: #1f2937 !important; color: #f3f4f6 !important; }
 html.dark .rq-btn:hover, .dark .rq-btn:hover { border-color: #4b5563 !important; background: #374151 !important; }
 html.dark .rq-btn-active, .dark .rq-btn-active { border-color: #fc2779 !important; background: #fc2779 !important; color: #ffffff !important; }
 html.dark .rq-modal-content, .dark .rq-modal-content { background: #111827 !important; border-color: #1f2937 !important; color: #f8fafc !important; }
 `}</style>
 <div style={{ width: '100%', maxWidth: '640px' }}>
 {/* Header */}
 <div style={{ textAlign: 'center', marginBottom: '48px' }}>
 <p
 style={{
 fontSize: '10px',
 letterSpacing: '0.3em',
 textTransform: 'uppercase',
 color: '#9b7e6b',
 marginBottom: '12px',
 fontFamily: 'var(--font-mono, monospace)',
 }}
 >
 Mirha & Co. / Routine Builder
 </p>
 <h1
 className="rq-title"
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: 'clamp(32px, 6vw, 44px)',
 fontWeight: 400,
 margin: '0 0 16px',
 lineHeight: 1.2,
 }}
 >
 Your Perfect Routine
 </h1>
 <p
 className="rq-subtitle"
 style={{
 fontSize: '14px',
 lineHeight: 1.7,
 margin: '0 0 20px',
 }}
 >
 Answer 3 quick questions and we'll build a personalized routine with products curated for your exact skin needs.
 </p>

 {/* Climate Sync Pill */}
 <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
 {climateLoading ? (
 <div style={{
 display: 'inline-flex',
 alignItems: 'center',
 gap: '8px',
 padding: '6px 14px',
 background: '#fff',
 border: '1px solid #ede8e0',
 borderRadius: '20px',
 fontSize: '11px',
 color: '#9b7e6b',
 fontFamily: 'var(--font-mono, monospace)',
 boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
 }}>
 <span style={{
 display: 'inline-block',
 width: '6px',
 height: '6px',
 background: '#9b7e6b',
 borderRadius: '50%',
 opacity: 0.6
 }} />
 📡 Syncing local climate...
 </div>
 ) : climateError ? (
 <div
 onClick={() => setShowClimateModal(true)}
 style={{
 display: 'inline-flex',
 alignItems: 'center',
 gap: '8px',
 padding: '6px 14px',
 background: '#faf8f5',
 border: '1px solid #ede8e0',
 borderRadius: '20px',
 fontSize: '11px',
 color: '#888',
 fontFamily: 'var(--font-mono, monospace)',
 cursor: 'pointer',
 transition: 'all 0.2s',
 }}
 onMouseEnter={(e) => {
 e.currentTarget.style.borderColor = '#bbb';
 e.currentTarget.style.background = '#f5f1ed';
 }}
 onMouseLeave={(e) => {
 e.currentTarget.style.borderColor = '#ede8e0';
 e.currentTarget.style.background = '#faf8f5';
 }}
 >
 🍃 Climate: Mumbai Default (38°C, 82% RH) <span style={{ fontSize: '10px', opacity: 0.6, marginLeft: '4px' }}>✎</span>
 </div>
 ) : climate ? (
 <div
 onClick={() => setShowClimateModal(true)}
 style={{
 display: 'inline-flex',
 alignItems: 'center',
 gap: '8px',
 padding: '6px 14px',
 background: '#edf7f0',
 border: '1px solid #ccead4',
 borderRadius: '20px',
 fontSize: '11px',
 color: '#2d7a4f',
 fontFamily: 'var(--font-mono, monospace)',
 fontWeight: 500,
 boxShadow: '0 2px 8px rgba(45, 122, 79, 0.05)',
 cursor: 'pointer',
 transition: 'all 0.2s',
 }}
 onMouseEnter={(e) => {
 e.currentTarget.style.background = '#dcf2e3';
 e.currentTarget.style.borderColor = '#b7e2c2';
 }}
 onMouseLeave={(e) => {
 e.currentTarget.style.background = '#edf7f0';
 e.currentTarget.style.borderColor = '#ccead4';
 }}
 >
 <span style={{ fontSize: '12px' }}>🌍</span>
 Climate Synced: {climate.city} ({climate.temp}°C, {climate.humidity}% RH) <span style={{ fontSize: '10px', opacity: 0.6, marginLeft: '4px' }}>✎</span>
 </div>
 ) : null}
 </div>
 </div>

 {/* Progress Bar */}
 <div style={{ marginBottom: '48px' }}>
 <div
 style={{
 display: 'flex',
 justifyContent: 'space-between',
 alignItems: 'center',
 marginBottom: '16px',
 }}
 >
 <p
 style={{
 fontSize: '10px',
 letterSpacing: '0.15em',
 textTransform: 'uppercase',
 color: '#bbb',
 fontFamily: 'var(--font-mono, monospace)',
 }}
 >
 Step {currentStep + 1} of {QUIZ_STEPS.length}
 </p>
 <p
 style={{
 fontSize: '10px',
 letterSpacing: '0.15em',
 textTransform: 'uppercase',
 color: '#bbb',
 fontFamily: 'var(--font-mono, monospace)',
 }}
 >
 {Math.round(((currentStep + 1) / QUIZ_STEPS.length) * 100)}%
 </p>
 </div>
 <div
 style={{
 height: '1px',
 background: '#e8e2d9',
 borderRadius: '1px',
 overflow: 'hidden',
 }}
 >
 <div
 style={{
 height: '1px',
 background: '#111',
 width: `${((currentStep + 1) / QUIZ_STEPS.length) * 100}%`,
 transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
 }}
 />
 </div>
 </div>

 {/* Question Card */}
 <div
 style={{
 background: '#fff',
 border: '1px solid #e8e2d9',
 borderRadius: '16px',
 padding: '48px 32px',
 marginBottom: '40px',
 minHeight: '500px',
 display: 'flex',
 flexDirection: 'column',
 }}
 >
 {/* Question */}
 <h2
 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: 'clamp(24px, 5vw, 32px)',
 fontWeight: 400,
 color: '#111',
 margin: '0 0 12px',
 lineHeight: 1.3,
 }}
 >
 {step.question}
 </h2>

 {step.subtitle && (
 <p
 style={{
 fontSize: '14px',
 color: '#888',
 margin: '0 0 32px',
 lineHeight: 1.6,
 }}
 >
 {step.subtitle}
 </p>
 )}

 {/* Answers - scrollable if needed */}
 <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
 {step.answers.map((answer) => {
 const isSelected = selectedAnswer === answer.id;
 return (
 <button
 key={answer.id}
 onClick={() => handleSelectAnswer(answer.id)}
 style={{
 padding: '16px 20px',
 border: `1px solid ${isSelected ? '#111' : '#e8e2d9'}`,
 background: isSelected ? '#111' : '#fff',
 color: isSelected ? '#fff' : '#111',
 textAlign: 'left',
 transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
 cursor: 'pointer',
 borderRadius: '8px',
 boxShadow: isSelected ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
 }}
 onMouseEnter={(e) => {
 if (!isSelected) {
 const btn = e.currentTarget as HTMLButtonElement;
 btn.style.borderColor = '#d6d0c9';
 btn.style.background = '#faf8f5';
 }
 }}
 onMouseLeave={(e) => {
 if (!isSelected) {
 const btn = e.currentTarget as HTMLButtonElement;
 btn.style.borderColor = '#e8e2d9';
 btn.style.background = '#fff';
 }
 }}
 >
 <div
 style={{
 display: 'flex',
 justifyContent: 'space-between',
 alignItems: 'flex-start',
 gap: '12px',
 }}
 >
 <div>
 <p
 style={{
 fontSize: '15px',
 fontWeight: 500,
 margin: '0 0 4px',
 color: 'inherit',
 }}
 >
 {answer.label}
 </p>
 {answer.description && (
 <p
 style={{
 fontSize: '12px',
 margin: 0,
 opacity: 0.7,
 color: 'inherit',
 }}
 >
 {answer.description}
 </p>
 )}
 </div>
 <div
 style={{
 width: '20px',
 height: '20px',
 borderRadius: '50%',
 border: `2px solid ${isSelected ? '#fff' : 'currentColor'}`,
 background: isSelected ? '#fff' : 'transparent',
 flexShrink: 0,
 marginTop: '2px',
 }}
 />
 </div>
 </button>
 );
 })}
 </div>
 </div>

 {/* Navigation */}
 <div
 style={{
 display: 'flex',
 gap: '12px',
 justifyContent: 'space-between',
 }}
 >
 <button
 onClick={handleBack}
 disabled={currentStep === 0}
 style={{
 display: 'flex',
 alignItems: 'center',
 gap: '8px',
 padding: '12px 24px',
 background: 'transparent',
 border: '1px solid #e8e2d9',
 color: currentStep === 0 ? '#ddd' : '#111',
 fontSize: '11px',
 letterSpacing: '0.15em',
 textTransform: 'uppercase',
 cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
 borderRadius: '8px',
 transition: 'all 0.25s',
 fontFamily: 'var(--font-mono, monospace)',
 opacity: currentStep === 0 ? 0.5 : 1,
 }}
 onMouseEnter={(e) => {
 if (currentStep > 0) {
 const btn = e.currentTarget as HTMLButtonElement;
 btn.style.borderColor = '#111';
 btn.style.color = '#111';
 }
 }}
 onMouseLeave={(e) => {
 if (currentStep > 0) {
 const btn = e.currentTarget as HTMLButtonElement;
 btn.style.borderColor = '#e8e2d9';
 btn.style.color = '#111';
 }
 }}
 >
 <ChevronLeft size={14} />
 Back
 </button>

 <button
 onClick={handleNext}
 disabled={!isAnswered}
 style={{
 display: 'flex',
 alignItems: 'center',
 gap: '8px',
 padding: '12px 24px',
 background: isAnswered ? '#111' : '#ddd',
 color: '#fff',
 fontSize: '11px',
 letterSpacing: '0.15em',
 textTransform: 'uppercase',
 cursor: isAnswered ? 'pointer' : 'not-allowed',
 borderRadius: '8px',
 border: '1px solid #111',
 transition: 'all 0.25s',
 fontFamily: 'var(--font-mono, monospace)',
 }}
 onMouseEnter={(e) => {
 if (isAnswered) {
 const btn = e.currentTarget as HTMLButtonElement;
 btn.style.background = '#333';
 }
 }}
 onMouseLeave={(e) => {
 if (isAnswered) {
 const btn = e.currentTarget as HTMLButtonElement;
 btn.style.background = '#111';
 }
 }}
 >
 {isLastStep ? 'Generate Routine' : 'Next'}
 <ChevronRight size={14} />
 </button>
 </div>

 {/* Disclaimer */}
 <p
 style={{
 fontSize: '10px',
 color: '#bbb',
 textAlign: 'center',
 marginTop: '40px',
 lineHeight: 1.6,
 fontFamily: 'var(--font-mono, monospace)',
 }}
 >
 Results based on general skin profiles. Not medical advice. Consult a dermatologist for serious concerns.
 </p>
 </div>

 {showClimateModal && (
 <div
 onClick={() => setShowClimateModal(false)}
 style={{
 position: 'fixed',
 inset: 0,
 background: 'rgba(0,0,0,0.4)',
 backdropFilter: 'blur(4px)',
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
 borderRadius: '16px',
 padding: '24px',
 boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
 }}
 >
 <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', margin: '0 0 8px', color: '#111' }}>
 Select Your Location
 </h3>
 <p style={{ fontSize: '12px', color: '#888', margin: '0 0 20px', lineHeight: 1.5 }}>
 Skincare needs depend heavily on local humidity and temperature. Select a city to sync real-time weather and optimize your routine.
 </p>

 {/* Quick Presets */}
 <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#bbb', margin: '0 0 10px', fontFamily: 'var(--font-mono, monospace)' }}>
 Quick Presets
 </p>
 <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
 {CLIMATE_PRESETS.map((preset) => (
 <button
 key={preset.city}
 onClick={() => handleSelectPreset(preset)}
 style={{
 padding: '8px 12px',
 fontSize: '11px',
 border: '1px solid #ede8e0',
 background: '#faf8f5',
 borderRadius: '6px',
 cursor: 'pointer',
 fontFamily: 'var(--font-mono, monospace)',
 color: '#444',
 transition: 'all 0.2s',
 }}
 onMouseEnter={(e) => {
 const btn = e.currentTarget as HTMLButtonElement;
 btn.style.borderColor = '#111';
 btn.style.background = '#fff';
 }}
 onMouseLeave={(e) => {
 const btn = e.currentTarget as HTMLButtonElement;
 btn.style.borderColor = '#ede8e0';
 btn.style.background = '#faf8f5';
 }}
 >
 {preset.label}
 </button>
 ))}
 </div>

 {/* Custom Search */}
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
 borderRadius: '8px',
 fontSize: '13px',
 outline: 'none',
 fontFamily: 'inherit',
 transition: 'border-color 0.2s',
 }}
 onFocus={(e) => e.target.style.borderColor = '#111'}
 onBlur={(e) => e.target.style.borderColor = '#ede8e0'}
 />
 {searching && (
 <div style={{ position: 'absolute', right: '12px', top: '12px', fontSize: '12px', color: '#999' }}>
 Searching...
 </div>
 )}
 </div>

 {/* Search Results */}
 {searchResults.length > 0 && (
 <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '180px', overflowY: 'auto', marginBottom: '20px', border: '1px solid #ede8e0', borderRadius: '8px', padding: '6px' }}>
 {searchResults.map((result) => (
 <button
 key={result.id}
 onClick={() => handleSelectSearchResult(result)}
 style={{
 padding: '10px 12px',
 background: 'none',
 border: 'none',
 borderRadius: '6px',
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
 <span style={{ fontWeight: 500 }}>{result.name}</span>
 {result.admin1 && <span style={{ color: '#888', fontSize: '11px' }}>, {result.admin1}</span>}
 {result.country && <span style={{ color: '#aaa', fontSize: '11px' }}> ({result.country})</span>}
 </button>
 ))}
 </div>
 )}

 {/* Auto-detect button */}
 <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #ede8e0', paddingTop: '16px' }}>
 <button
 onClick={() => {
 detectClimate();
 setShowClimateModal(false);
 }}
 style={{
 flex: 1,
 padding: '10px',
 background: '#111',
 color: '#fff',
 border: 'none',
 borderRadius: '8px',
 fontSize: '11px',
 fontWeight: 500,
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
 padding: '10px 16px',
 background: 'none',
 border: '1px solid #ddd',
 borderRadius: '8px',
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

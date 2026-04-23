'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { QuizAnswers, RoutineRecommendation, generateRoutine } from '@/lib/routineEngine';
import RoutineResult from './RoutineResult';

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

export default function RoutineQuiz() {
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

  const handleNext = () => {
    if (!isAnswered) return;

    if (isLastStep) {
      const completeAnswers = answers as QuizAnswers;
      const generatedRoutine = generateRoutine(completeAnswers);
      setRoutine(generatedRoutine);
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
    return <RoutineResult routine={routine} onRestart={handleRestart} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #faf8f5 0%, #f5f1ed 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
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
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(32px, 6vw, 44px)',
              fontWeight: 400,
              color: '#111',
              margin: '0 0 16px',
              lineHeight: 1.2,
            }}
          >
            Your Perfect Routine
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#888',
              lineHeight: 1.7,
              margin: '0 0 32px',
            }}
          >
            Answer 3 quick questions and we'll build a personalized routine with products curated for your exact skin needs.
          </p>
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
    </div>
  );
}

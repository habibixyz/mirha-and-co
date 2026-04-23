'use client';

import React, { useState } from 'react';
import { RotateCcw, ExternalLink, Check, ArrowRight } from 'lucide-react';
import { RoutineRecommendation } from '@/lib/routineEngine';
import { PRODUCTS } from '@/lib/products';
import { useRoutineAnalytics } from '@/lib/hooks/useRoutineAnalytics';

const STEPS_ORDER = [
  {
    key: 'cleanser',
    label: 'Cleanse',
    step: 'Step 1',
    icon: '○',
    description: 'Remove oil, pollution, and product buildup while protecting your skin barrier.',
  },
  {
    key: 'treatment',
    label: 'Treat',
    step: 'Step 2',
    icon: '◇',
    description: 'Target your specific concern with clinically-backed active ingredients.',
  },
  {
    key: 'moisturiser',
    label: 'Hydrate',
    step: 'Step 3',
    icon: '△',
    description: 'Lock in moisture and strengthen your barrier. Yes, even oily skin needs this.',
  },
  {
    key: 'sunscreen',
    label: 'Protect',
    step: 'Step 4 (AM only)',
    icon: '□',
    description: 'Your most important anti-aging product. Non-negotiable, every morning.',
  },
];

interface RoutineResultProps {
  routine: RoutineRecommendation;
  onRestart: () => void;
}

function ProductCard({
  asin,
  reason,
  onClick,
}: {
  asin: string;
  reason?: string;
  onClick?: () => void;
}) {
  const product = PRODUCTS.find((p) => p.asin === asin);

  if (!product) return null;

  const affiliateUrl =
    product.link || `https://www.amazon.in/dp/${asin}?tag=skinwithtanvi-21`;

  const disc =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={onClick}
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        background: '#faf8f5',
        border: '1px solid #ede8e0',
        borderRadius: '12px',
        padding: '16px',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = '#d6d0c9';
        el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
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
        style={{
          width: '80px',
          height: '80px',
          flexShrink: 0,
          background: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #f0ebe3',
        }}
      >
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
              color: '#9b7e6b',
              margin: '0 0 6px',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            {product.badge}
          </p>
        )}

        <p
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '14px',
            color: '#111',
            lineHeight: 1.3,
            margin: '0 0 4px',
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
            margin: '0 0 6px',
            letterSpacing: '0.05em',
          }}
        >
          {product.brand}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '16px',
              color: '#111',
              fontWeight: 400,
            }}
          >
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {disc > 0 && (
            <>
              <span
                style={{
                  fontSize: '11px',
                  color: '#bbb',
                  textDecoration: 'line-through',
                }}
              >
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
              <span
                style={{
                  fontSize: '9px',
                  color: '#5a9e6f',
                  background: '#edf7f0',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontWeight: 600,
                }}
              >
                {disc}% off
              </span>
            </>
          )}
        </div>
      </div>

      {/* Arrow */}
      <div
        style={{
          flexShrink: 0,
          width: '32px',
          height: '32px',
          background: '#111',
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
  );
}

export default function RoutineResult({ routine, onRestart }: RoutineResultProps) {
  const { trackAffiliateClick } = useRoutineAnalytics();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #faf8f5 0%, #f5f1ed 100%)',
        paddingTop: '80px',
        paddingBottom: '120px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '680px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#9b7e6b',
              marginBottom: '16px',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            ✓ Routine Generated
          </p>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: 400,
              color: '#111',
              margin: '0 0 12px',
              lineHeight: 1.1,
            }}
          >
            Your Personalized<br />
            <em style={{ fontStyle: 'italic', color: '#9b7e6b' }}>4-Step Routine</em>
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#888',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            Curated specifically for your skin. All products available on Amazon India with verified reviews and fastest delivery.
          </p>
        </div>

        {/* Routine Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {STEPS_ORDER.map((step, index) => {
            const product = routine[step.key as keyof RoutineRecommendation];
            if (!product) return null;

            const isExpanded = expandedStep === step.key;

            return (
              <div
                key={step.key}
                style={{
                  background: '#fff',
                  border: '1px solid #ede8e0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.25s',
                }}
              >
                {/* Step Header */}
                <div
                  onClick={() => setExpandedStep(isExpanded ? null : step.key)}
                  style={{
                    padding: '20px 24px',
                    borderBottom: isExpanded ? '1px solid #f0ebe3' : 'none',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = '#faf8f5';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                  }}
                >
                  {/* Step Number */}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      flexShrink: 0,
                      border: '1px solid #ddd',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "monospace",
                      fontSize: '12px',
                      color: '#999',
                      fontWeight: 600,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#bbb',
                        margin: '0 0 4px',
                        fontFamily: 'var(--font-mono, monospace)',
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
                        margin: '0 0 6px',
                        lineHeight: 1.2,
                      }}
                    >
                      {step.label}
                    </h2>
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#888',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    style={{
                      color: '#bbb',
                      flexShrink: 0,
                      marginTop: '4px',
                      transition: 'transform 0.25s',
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  />
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ padding: '20px 24px' }}>
                    <p
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#ccc',
                        margin: '0 0 12px',
                        fontFamily: 'var(--font-mono, monospace)',
                      }}
                    >
                      Why This Product
                    </p>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#666',
                        lineHeight: 1.6,
                        margin: '0 0 16px',
                      }}
                    >
                      {product.reason}
                    </p>

                    <p
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#ccc',
                        margin: '0 0 12px',
                        fontFamily: 'var(--font-mono, monospace)',
                      }}
                    >
                      Recommended Product
                    </p>

                    <ProductCard
                      asin={product.asin}
                      onClick={() =>
                        trackAffiliateClick({
                          asin: product.asin,
                          product: product.name,
                          step: step.key,
                        })
                      }
                    />

                    <p
                      style={{
                        fontSize: '9px',
                        color: '#ccc',
                        margin: '12px 0 0',
                        textAlign: 'center',
                        fontFamily: 'var(--font-mono, monospace)',
                      }}
                    >
                      Affiliate link · Commission at no extra cost
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Usage Guide */}
        <div
          style={{
            background: '#111',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '32px',
            color: '#fff',
          }}
        >
          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '18px',
              fontWeight: 400,
              margin: '0 0 24px',
              color: '#fff',
            }}
          >
            How to Use
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* AM */}
            <div>
              <p
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#9b7e6b',
                  margin: '0 0 16px',
                  fontFamily: 'var(--font-mono, monospace)',
                }}
              >
                Morning (5 min)
              </p>
              {['Cleanse', 'Treat', 'Hydrate', 'Protect'].map((label, i) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '12px',
                    fontSize: '13px',
                    color: '#ddd',
                  }}
                >
                  <Check size={14} color="#9b7e6b" />
                  {label}
                </div>
              ))}
            </div>

            {/* PM */}
            <div>
              <p
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#9b7e6b',
                  margin: '0 0 16px',
                  fontFamily: 'var(--font-mono, monospace)',
                }}
              >
                Evening (5 min)
              </p>
              {['Cleanse', 'Treat', 'Hydrate'].map((label, i) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '12px',
                    fontSize: '13px',
                    color: '#ddd',
                  }}
                >
                  <Check size={14} color="#9b7e6b" />
                  {label}
                </div>
              ))}
              <div
                style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #222',
                }}
              >
                <p style={{ fontSize: '11px', color: '#666', margin: 0 }}>
                  Skip sunscreen at night
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #222',
              fontSize: '12px',
              color: '#999',
              lineHeight: 1.6,
            }}
          >
            Visible results appear in 4–8 weeks with consistent daily use. Start new actives 2–3x per week, then gradually increase.
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
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
              borderRadius: '8px',
              transition: 'all 0.25s',
              fontFamily: 'var(--font-mono, monospace)',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = '#111';
              btn.style.color = '#111';
              btn.style.background = '#faf8f5';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = '#ddd';
              btn.style.color = '#666';
              btn.style.background = 'transparent';
            }}
          >
            <RotateCcw size={12} />
            Retake Quiz
          </button>

          <a
            href="/"
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
              borderRadius: '8px',
              border: '1px solid #111',
              transition: 'all 0.25s',
              fontFamily: 'var(--font-mono, monospace)',
              gap: '8px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#333';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#111';
            }}
          >
            All Products
            <ArrowRight size={12} />
          </a>
        </div>

        {/* Disclaimer */}
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
    </div>
  );
}

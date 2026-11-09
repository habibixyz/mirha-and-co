"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, ShieldCheck } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
  shape: "circle" | "spark" | "petal";
}

export function DussehraCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;
    const maxParticles = isMobile ? 6 : 12;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Pause rendering during heavy scroll on mobile to keep 60fps scrolling buttery smooth
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const colors = [
      "rgba(255, 215, 0, ",   // Gold
      "rgba(245, 158, 11, ",  // Warm Saffron
      "rgba(253, 230, 138, ", // Pale Gold Shimmer
    ];

    // Spawn gentle ambient floating embers
    const spawnAmbient = () => {
      if (particlesRef.current.length < maxParticles && Math.random() < 0.15) {
        const baseColor = colors[Math.floor(Math.random() * colors.length)];
        particlesRef.current.push({
          x: Math.random() * width,
          y: height + 8,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -(Math.random() * 0.35 + 0.18), // Gentle calm ascent
          size: Math.random() * 1.5 + 0.9,    // Tiny, delicate micro-dust
          color: baseColor,
          alpha: Math.random() * 0.25 + 0.12, // Soft, non-distracting opacity
          decay: Math.random() * 0.0015 + 0.0008,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          shape: "circle",
        });
      }
    };

    const render = () => {
      if (!isScrolling) {
        ctx.clearRect(0, 0, width, height);

        spawnAmbient();

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0 || p.y < -15 || p.x < -15 || p.x > width + 15) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          // Zero shadowBlur — purely fill with RGBA for 0.05ms GPU paint cost
          ctx.beginPath();
          ctx.fillStyle = `${p.color}${Math.max(0, p.alpha)})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9998,
      }}
    />
  );
}

export function DussehraBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="dussehra-banner-root">
      <style>{`
        .dussehra-banner-root {
          position: relative;
          background: linear-gradient(90deg, #0b1118 0%, #111a24 35%, #162230 50%, #111a24 65%, #0b1118 100%);
          border-bottom: 1px solid rgba(56, 189, 248, 0.32);
          color: #f0f9ff;
          font-family: var(--font-dm-sans), sans-serif;
          z-index: 50;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.12);
        }

        .dussehra-banner-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 120% at 50% -20%, rgba(56, 189, 248, 0.18), transparent 75%);
          pointer-events: none;
        }

        .dussehra-banner-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(224, 242, 254, 0.15), transparent);
          transform: skewX(-20deg);
          animation: bannerShimmer 6s infinite ease-in-out;
          pointer-events: none;
        }

        @keyframes bannerShimmer {
          0% { left: -100%; }
          35% { left: 200%; }
          100% { left: 200%; }
        }

        .dussehra-banner-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0.55rem 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          font-size: 0.78rem;
          position: relative;
        }

        .dussehra-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(2, 132, 199, 0.15));
          border: 1px solid rgba(56, 189, 248, 0.5);
          color: #7dd3fc;
          font-weight: 700;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.2rem 0.65rem;
          border-radius: 9999px;
          flex-shrink: 0;
          box-shadow: 0 0 12px rgba(14, 165, 233, 0.25);
        }

        .dussehra-shield-icon {
          color: #38bdf8;
        }

        .dussehra-text-desktop {
          display: inline;
          font-weight: 500;
          color: rgba(240, 249, 255, 0.95);
          letter-spacing: 0.015em;
        }

        .dussehra-secondary-guide-link {
          color: #7dd3fc;
          text-decoration: underline;
          text-underline-offset: 3px;
          margin-left: 0.45rem;
          font-weight: 600;
          transition: color 0.15s ease;
        }

        .dussehra-secondary-guide-link:hover {
          color: #ffffff;
        }

        .dussehra-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: linear-gradient(135deg, #38bdf8, #0284c7);
          color: #0c151d !important;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.24rem 0.75rem;
          border-radius: 9999px;
          text-decoration: none;
          flex-shrink: 0;
          transition: all 0.2s ease;
          box-shadow: 0 2px 10px rgba(2, 132, 199, 0.35);
        }

        .dussehra-cta:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 4px 16px rgba(56, 189, 248, 0.5);
          background: linear-gradient(135deg, #7dd3fc, #38bdf8);
        }

        .dussehra-dismiss {
          position: absolute;
          right: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: rgba(240, 249, 255, 0.55);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 4px;
          transition: color 0.15s ease, background 0.15s ease;
          z-index: 2;
        }

        .dussehra-dismiss:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .dussehra-banner-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .dussehra-banner-inner {
            display: none;
          }
          .dussehra-banner-mobile {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0.45rem 2.2rem 0.75rem 0.75rem;
            position: relative;
            width: 100%;
            max-width: 100vw;
            box-sizing: border-box;
            overflow: hidden;
          }
          .dussehra-banner-mobile-link {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            text-decoration: none !important;
            font-size: 0.7rem;
            color: #f0f9ff;
            font-weight: 500;
            overflow: hidden;
            min-width: 0;
            flex: 1 1 auto;
          }
          .dussehra-banner-mobile-tag {
            background: rgba(14, 165, 233, 0.2);
            border: 1px solid rgba(56, 189, 248, 0.45);
            color: #7dd3fc;
            font-size: 0.55rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 0.15rem 0.45rem;
            border-radius: 9999px;
            flex-shrink: 0;
          }
          .dussehra-banner-mobile-title {
            color: #f0f9ff;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            min-width: 0;
            flex: 1 1 auto;
          }
        }
      `}</style>

      <div className="dussehra-banner-shimmer" />

      {/* Desktop view */}
      <div className="dussehra-banner-inner">
        <span className="dussehra-pill">
          <ShieldCheck size={12} className="dussehra-shield-icon" />
          Winter &amp; Smog Defense
        </span>

        <span className="dussehra-text-desktop">
          <strong>Peak Winter Dryness &amp; Smog:</strong> Protect your barrier against pollution spikes &amp; TEWL.
          <Link href="/blog/the-4-step-barrier-sun-reset-skincare-guide" className="dussehra-secondary-guide-link">
            Read 4-Step Reset Guide &rarr;
          </Link>
        </span>

        <Link href="/tools/routine" className="dussehra-cta">
          Build Routine &rarr;
        </Link>

        <button
          onClick={() => setVisible(false)}
          className="dussehra-dismiss"
          aria-label="Close Announcement"
          title="Dismiss"
        >
          <X size={14} />
        </button>
      </div>

      {/* Mobile view */}
      <div className="dussehra-banner-mobile">
        <Link href="/tools/routine" className="dussehra-banner-mobile-link">
          <span className="dussehra-banner-mobile-tag">Winter Reset</span>
          <span className="dussehra-banner-mobile-title">Build Your Barrier Routine &rarr;</span>
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="dussehra-dismiss"
          aria-label="Close Announcement"
          title="Dismiss"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}

export function DussehraHeroBadge() {
  return (
    <div className="dussehra-hero-badge-container">
      <style>{`
        .dussehra-hero-badge-container {
          display: inline-flex;
          margin-bottom: 14px;
        }

        /* Hide on mobile — the top announcement bar already covers it */
        @media (max-width: 768px) {
          .dussehra-hero-badge-container {
            display: none !important;
          }
        }

        .dussehra-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.95rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(240, 249, 255, 0.95), rgba(224, 242, 254, 0.8));
          border: 1px solid rgba(56, 189, 248, 0.45);
          color: #0369a1;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 2px 14px rgba(14, 165, 233, 0.18);
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .dussehra-hero-badge:hover {
          transform: translateY(-2px);
          border-color: rgba(2, 132, 199, 0.8);
          box-shadow: 0 6px 20px rgba(14, 165, 233, 0.3);
          background: linear-gradient(135deg, #e0f2fe, #bae6fd);
        }
      `}</style>
      <Link href="/tools/routine" className="dussehra-hero-badge" title="Build your personalised AM & PM skincare routine">
        <span>✦ Build Your Winter AM &amp; PM Routine &rarr;</span>
      </Link>
    </div>
  );
}


export default function DussehraVisuals() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Active through winter & smog season (November 2026 - February 2027)
  const now = new Date();
  const isWinterSeason =
    now >= new Date("2026-11-01T00:00:00+05:30") &&
    now <= new Date("2027-02-28T23:59:59+05:30");

  if (!isWinterSeason) return null;

  return (
    <>
      <DussehraBanner />
    </>
  );
}

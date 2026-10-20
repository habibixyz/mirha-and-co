"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Flame } from "lucide-react";

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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const colors = [
      "#FFD700", // Gold
      "#FFA500", // Warm Orange / Saffron
      "#FFE57F", // Light Gold Spark
      "#FF8F00", // Amber
      "#FFF3E0", // Pure shimmer
      "#F59E0B", // Royal Saffron
    ];

    // Spawn ambient floating golden embers
    const spawnAmbient = () => {
      if (particlesRef.current.length < 35 && Math.random() < 0.25) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: height + 10,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(Math.random() * 0.9 + 0.4),
          size: Math.random() * 2.8 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.7 + 0.3,
          decay: Math.random() * 0.003 + 0.0015,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
          shape: Math.random() > 0.4 ? "spark" : "circle",
        });
      }
    };

    // Burst celebratory firework sparks
    const triggerBurst = (x: number, y: number) => {
      const count = 32;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 4.5 + 1.5;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: Math.random() * 3.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
          shape: Math.random() > 0.5 ? "spark" : "circle",
        });
      }
    };

    const handleWindowClick = (e: MouseEvent) => {
      // If clicking interactive UI like buttons or links, also celebrate with a joyful burst
      triggerBurst(e.clientX, e.clientY);
    };

    window.addEventListener("click", handleWindowClick);

    // Initial festive burst from top center to welcome the user
    setTimeout(() => {
      triggerBurst(width * 0.5, height * 0.15);
    }, 600);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      spawnAmbient();

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;

        if (p.alpha <= 0 || p.y < -20 || p.x < -20 || p.x > width + 20) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.shape === "spark") {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          // Draw 4-point sparkle star
          ctx.beginPath();
          const s = p.size * 1.6;
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleWindowClick);
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
          background: linear-gradient(90deg, #120d08 0%, #23160a 35%, #2a1b0d 50%, #23160a 65%, #120d08 100%);
          border-bottom: 1px solid rgba(245, 182, 66, 0.38);
          color: #fbf5eb;
          font-family: var(--font-dm-sans), sans-serif;
          z-index: 50;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.12);
        }

        .dussehra-banner-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 120% at 50% -20%, rgba(251, 191, 36, 0.22), transparent 75%);
          pointer-events: none;
        }

        .dussehra-banner-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 223, 130, 0.15), transparent);
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
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(217, 119, 6, 0.12));
          border: 1px solid rgba(245, 182, 66, 0.5);
          color: #fcd34d;
          font-weight: 700;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.2rem 0.65rem;
          border-radius: 9999px;
          flex-shrink: 0;
          box-shadow: 0 0 12px rgba(245, 158, 11, 0.25);
        }

        .dussehra-flame-icon {
          animation: flamePulse 1.8s ease-in-out infinite alternate;
          color: #fbbf24;
        }

        @keyframes flamePulse {
          0% { transform: scale(0.95); opacity: 0.85; filter: drop-shadow(0 0 2px #f59e0b); }
          100% { transform: scale(1.15); opacity: 1; filter: drop-shadow(0 0 6px #fbbf24); }
        }

        .dussehra-text-desktop {
          display: inline;
          font-weight: 500;
          color: rgba(254, 243, 199, 0.95);
          letter-spacing: 0.015em;
        }

        .dussehra-text-mobile {
          display: none;
          font-weight: 500;
          color: rgba(254, 243, 199, 0.95);
        }

        .dussehra-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #120d08 !important;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.24rem 0.75rem;
          border-radius: 9999px;
          text-decoration: none;
          flex-shrink: 0;
          transition: all 0.2s ease;
          box-shadow: 0 2px 10px rgba(217, 119, 6, 0.35);
        }

        .dussehra-cta:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.5);
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
        }

        .dussehra-dismiss {
          position: absolute;
          right: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: rgba(254, 243, 199, 0.55);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 4px;
          transition: color 0.15s ease, background 0.15s ease;
        }

        .dussehra-dismiss:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 768px) {
          .dussehra-banner-inner {
            padding: 0.45rem 2.2rem 0.45rem 0.75rem;
            gap: 0.45rem;
            justify-content: flex-start;
          }
          .dussehra-text-desktop {
            display: none;
          }
          .dussehra-text-mobile {
            display: inline;
            font-size: 0.7rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .dussehra-pill {
            font-size: 0.52rem;
            padding: 0.15rem 0.45rem;
          }
          .dussehra-cta {
            font-size: 0.58rem;
            padding: 0.18rem 0.55rem;
          }
        }
      `}</style>

      <div className="dussehra-banner-shimmer" />

      <div className="dussehra-banner-inner">
        <span className="dussehra-pill">
          <Flame size={12} className="dussehra-flame-icon" />
          Vijayadashami 2026
        </span>

        <span className="dussehra-text-desktop">
          🏹 <strong>Happy Dussehra!</strong> Triumph of radiant skin over festive burnout & pollution. Slay dull skin with our AI routine.
        </span>

        <span className="dussehra-text-mobile">
          🏹 <strong>Happy Dussehra!</strong> Slay dull skin & festive burnout.
        </span>

        <Link href="/tools/analysis" className="dussehra-cta">
          Get Festive Glow &rarr;
        </Link>

        <button
          onClick={() => setVisible(false)}
          className="dussehra-dismiss"
          aria-label="Close Dussehra Announcement"
          title="Dismiss"
        >
          <X size={14} />
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

        .dussehra-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.95rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(254, 243, 199, 0.9), rgba(253, 230, 138, 0.65));
          border: 1px solid rgba(217, 119, 6, 0.4);
          color: #78350f;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 2px 14px rgba(245, 158, 11, 0.18);
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .dussehra-hero-badge:hover {
          transform: translateY(-2px);
          border-color: rgba(217, 119, 6, 0.7);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
          background: linear-gradient(135deg, #fef3c7, #fde68a);
        }

        .dussehra-hero-badge-arrow {
          font-size: 0.85rem;
        }
      `}</style>
      <Link href="/tools/analysis" className="dussehra-hero-badge" title="Dussehra Radiance Special">
        <span className="dussehra-hero-badge-arrow">🏹</span>
        <span>Vijayadashami Radiance · Victory Over Dull Skin</span>
      </Link>
    </div>
  );
}


export default function DussehraVisuals() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-activate during Dussehra 2026 week
  const now = new Date();
  const isDussehraSeason =
    now >= new Date("2026-10-18T00:00:00+05:30") &&
    now <= new Date("2026-10-25T23:59:59+05:30");

  if (!isDussehraSeason) return null;

  return (
    <>
      <DussehraBanner />
      {mounted && <DussehraCanvas active={true} />}
    </>
  );
}

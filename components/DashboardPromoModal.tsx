"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, Layers } from "lucide-react";

export default function DashboardPromoModal({ hasSession }: { hasSession: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Don't show if user is already logged in
    if (hasSession) return;

    // Check if user dismissed it in this session or previously
    const dismissed = localStorage.getItem("mirha_promo_dismissed");
    if (dismissed) return;

    // Trigger popup after a small delay (e.g. 2.5 seconds) for a better UX
    const timer = setTimeout(() => {
      setIsOpen(true);
      // Mark as dismissed immediately when shown so it does not pop up on every refresh
      localStorage.setItem("mirha_promo_dismissed", "true");
    }, 2500);

    return () => clearTimeout(timer);
  }, [hasSession]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="promo-overlay" onClick={handleClose}>
      <style>{`
        .promo-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(10, 10, 10, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: promoFadeIn 0.3s ease-out forwards;
        }

        .promo-card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(252, 39, 121, 0.15);
          border-radius: 24px;
          width: 100%;
          max-width: 460px;
          padding: 32px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);
          overflow: hidden;
          animation: promoScaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        html.dark .promo-card, .dark .promo-card {
          background: #121110 !important;
          border-color: rgba(252, 39, 121, 0.25) !important;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5) !important;
        }

        .promo-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: #8c857f;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .promo-close-btn:hover {
          background: rgba(22, 20, 18, 0.05);
          color: #fc2779;
        }

        html.dark .promo-close-btn:hover, .dark .promo-close-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .promo-card h2 {
          font-family: 'Playfair Display', 'DM Serif Display', serif;
          font-size: 24px;
          line-height: 1.25;
          color: #161412;
          margin: 8px 0 10px;
          font-weight: 600;
        }

        html.dark .promo-card h2, .dark .promo-card h2 {
          color: #ffffff !important;
        }

        .promo-card p {
          font-size: 13.5px;
          line-height: 1.6;
          color: #756b63;
          margin: 0 0 24px;
        }

        html.dark .promo-card p, .dark .promo-card p {
          color: #aba49d !important;
        }

        .promo-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
        }

        .promo-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: #161412;
        }

        html.dark .promo-feature-item, .dark .promo-feature-item {
          color: #f7f5f2 !important;
        }

        .promo-feature-bullet {
          color: #fc2779;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .promo-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #fc2779;
          color: #ffffff;
          border-radius: 12px;
          height: 48px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 8px 24px rgba(252, 39, 121, 0.25);
        }

        .promo-cta-btn:hover {
          background: #e01b63;
          transform: translateY(-1px);
        }

        @keyframes promoFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes promoScaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div className="promo-card" onClick={(e) => e.stopPropagation()}>
        <button className="promo-close-btn" onClick={handleClose}>
          <X size={18} />
        </button>

        <h2>Unlock Your Personalized Skincare Dashboard</h2>
        <p>
          Take control of your skincare routine. Create a free account to generate AM/PM regimens, 
          track product compatibility, and check hard water damage in your city.
        </p>

        <div className="promo-features">
          <div className="promo-feature-item">
            <Layers size={14} className="promo-feature-bullet" />
            <span>Generate customized AI skincare regimens</span>
          </div>
          <div className="promo-feature-item">
            <Layers size={14} className="promo-feature-bullet" />
            <span>Audit ingredient compatibility and conflicts</span>
          </div>
          <div className="promo-feature-item">
            <Layers size={14} className="promo-feature-bullet" />
            <span>Track skin changes with your personal Skin Journal</span>
          </div>
        </div>

        <Link href="/register" onClick={handleClose} className="promo-cta-btn">
          Get Started Free <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

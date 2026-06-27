"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top-btn"
      aria-label="Back to top"
    >
      <ArrowUp size={16} strokeWidth={2} />
      <style>{`
        .back-to-top-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(22, 20, 18, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          color: #161412;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 99999;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fade-in 0.3s ease;
        }

        .back-to-top-btn:hover {
          background: #161412;
          color: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          border-color: #161412;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .back-to-top-btn {
            bottom: 24px;
            right: 24px;
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </button>
  );
}

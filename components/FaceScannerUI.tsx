"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import faceImage from "./premium_face_scan.png";

export default function FaceScannerUI() {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push("/dashboard/analysis")}
      className="face-scan-container"
    >
      <style>{`
        .face-scan-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 440px;
          background-color: #000;
          overflow: hidden;
          cursor: pointer;
        }

        .portrait-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s ease;
          z-index: 1 !important; /* OVERRIDE GLOBAL CSS HIDING THE IMAGE */
        }
        
        .face-scan-container:hover .portrait-img {
          transform: scale(1.03);
        }

        .hud-corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          z-index: 5;
        }
        .hud-tl { top: 15%; left: 15%; border-right: none; border-bottom: none; }
        .hud-tr { top: 15%; right: 15%; border-left: none; border-bottom: none; }
        .hud-bl { bottom: 15%; left: 15%; border-right: none; border-top: none; }
        .hud-br { bottom: 15%; right: 15%; border-left: none; border-top: none; }

        .laser-line {
          position: absolute;
          left: 10%;
          width: 80%;
          height: 3px;
          background: #3b82f6;
          box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.8), 0 0 40px 15px rgba(59, 130, 246, 0.4);
          z-index: 10;
          animation: scan 2.5s ease-in-out infinite alternate;
        }

        @keyframes scan {
          0% { top: 15%; }
          100% { top: 85%; }
        }

        .facial-mesh {
          position: absolute;
          top: 39%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 34%;
          height: auto;
          z-index: 8;
          stroke: rgba(255, 255, 255, 0.85);
          stroke-width: 1.5;
          fill: none;
        }
        
        .mesh-dot {
          fill: #ffffff;
          animation: pulse-dot 1.5s infinite alternate;
        }

        @keyframes pulse-dot {
          0% { r: 2; opacity: 0.5; }
          100% { r: 4; opacity: 1; fill: #3b82f6; } 
        }

        .click-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .face-scan-container:hover .click-overlay {
          opacity: 1;
        }

        .click-badge {
          background: #3b82f6;
          color: #fff;
          padding: 12px 24px;
          border-radius: 30px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }
      `}</style>

      {/* Premium Generated Face Image */}
      <Image 
        src={faceImage} 
        alt="AI Face Scan" 
        fill
        className="portrait-img"
        placeholder="blur"
      />

      {/* HUD Frame */}
      <div className="hud-corner hud-tl"></div>
      <div className="hud-corner hud-tr"></div>
      <div className="hud-corner hud-bl"></div>
      <div className="hud-corner hud-br"></div>

      {/* SVG Facial Landmarks Mesh - High Density */}
      <svg className="facial-mesh" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid meet">
        {/* Outer Perimeter */}
        <path d="M 100 20 L 40 60 L 25 115 L 45 180 L 100 230 L 155 180 L 175 115 L 160 60 Z" />
        
        {/* Inner Eye / Nose Bridge */}
        <path d="M 40 60 L 65 110 L 85 115 L 100 135 L 115 115 L 135 110 L 160 60" />
        <path d="M 25 115 L 65 110" />
        <path d="M 175 115 L 135 110" />
        <path d="M 100 20 L 100 135" />
        
        {/* Nose Tip & Cheeks */}
        <path d="M 85 115 L 100 160 L 115 115" />
        <path d="M 100 135 L 100 160" />
        <path d="M 65 110 L 80 185" />
        <path d="M 135 110 L 120 185" />
        
        {/* Mouth Area */}
        <path d="M 80 185 L 100 160 L 120 185 L 100 205 Z" />
        <path d="M 45 180 L 80 185 L 25 115" />
        <path d="M 155 180 L 120 185 L 175 115" />
        
        {/* Lower Jaw Connections */}
        <path d="M 100 230 L 100 205" />
        <path d="M 45 180 L 100 205 L 155 180" />
        <path d="M 100 230 L 80 185" />
        <path d="M 100 230 L 120 185" />
        
        {/* Data Nodes */}
        {/* Forehead & Temples */}
        <circle cx="100" cy="20" r="3.5" className="mesh-dot" style={{animationDelay: "0.1s"}} />
        <circle cx="40" cy="60" r="3.5" className="mesh-dot" style={{animationDelay: "0.3s"}} />
        <circle cx="160" cy="60" r="3.5" className="mesh-dot" style={{animationDelay: "0.5s"}} />
        
        {/* Cheeks & Jawline */}
        <circle cx="25" cy="115" r="3.5" className="mesh-dot" style={{animationDelay: "0.7s"}} />
        <circle cx="175" cy="115" r="3.5" className="mesh-dot" style={{animationDelay: "0.2s"}} />
        <circle cx="45" cy="180" r="3.5" className="mesh-dot" style={{animationDelay: "0.6s"}} />
        <circle cx="155" cy="180" r="3.5" className="mesh-dot" style={{animationDelay: "0.4s"}} />
        <circle cx="100" cy="230" r="3.5" className="mesh-dot" style={{animationDelay: "0.8s"}} />
        
        {/* Eyes & Nose Bridge */}
        <circle cx="65" cy="110" r="3.5" className="mesh-dot" style={{animationDelay: "0.9s"}} />
        <circle cx="135" cy="110" r="3.5" className="mesh-dot" style={{animationDelay: "0.1s"}} />
        <circle cx="85" cy="115" r="3.5" className="mesh-dot" style={{animationDelay: "0.5s"}} />
        <circle cx="115" cy="115" r="3.5" className="mesh-dot" style={{animationDelay: "0.3s"}} />
        <circle cx="100" cy="135" r="3.5" className="mesh-dot" style={{animationDelay: "0.7s"}} />
        
        {/* Nose Tip & Mouth */}
        <circle cx="100" cy="160" r="3.5" className="mesh-dot" style={{animationDelay: "0.2s"}} />
        <circle cx="80" cy="185" r="3.5" className="mesh-dot" style={{animationDelay: "0.6s"}} />
        <circle cx="120" cy="185" r="3.5" className="mesh-dot" style={{animationDelay: "0.1s"}} />
        <circle cx="100" cy="205" r="3.5" className="mesh-dot" style={{animationDelay: "0.4s"}} />
      </svg>

      {/* Laser Scanner */}
      <div className="laser-line"></div>

      {/* Hover Action */}
      <div className="click-overlay">
        <div className="click-badge">
          Launch Scanner →
        </div>
      </div>
    </div>
  );
}

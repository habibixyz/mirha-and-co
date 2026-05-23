"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const WellnessAuraCanvas = dynamic(() => import("./WellnessAuraCanvas"), { ssr: false });

export default function WellnessAuraWrapper() {
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent initial SSR/hydration mismatch lag

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    // Lightweight fallback CSS gradient instead of loading Three.js on phones
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(162, 123, 92, 0.12) 0%, transparent 80%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    );
  }

  return <WellnessAuraCanvas />;
}

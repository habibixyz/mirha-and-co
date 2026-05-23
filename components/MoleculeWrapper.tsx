"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const MoleculeCanvas = dynamic(() => import("./MoleculeCanvas"), { ssr: false });

export default function MoleculeWrapper() {
  const [isMobile, setIsMobile] = useState(true); // Default true to prevent hydration mismatch lag

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    // Elegant static CSS background glow for mobile screens
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 60% 40%, rgba(217, 154, 143, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    );
  }

  return <MoleculeCanvas />;
}

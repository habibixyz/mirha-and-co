"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error caught by boundary:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        color: "var(--dash-ink, #161412)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "460px",
          width: "100%",
          background: "var(--dash-surface, #ffffff)",
          border: "1px solid var(--dash-border, #ede5dc)",
          borderRadius: "24px",
          padding: "2.5rem 2rem",
          textAlign: "center",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "rgba(239, 68, 68, 0.1)",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <AlertCircle size={28} />
        </div>

        <h2
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "var(--dash-ink, #161412)",
          }}
        >
          Something went wrong
        </h2>

        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--dash-muted, #756b63)",
            lineHeight: 1.55,
            marginBottom: "1.75rem",
          }}
        >
          We encountered an unexpected issue while loading this section. Please reload or return to your dashboard.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => reset()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#fc2779",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "0.75rem 1.4rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "transform 0.15s ease",
            }}
          >
            <RefreshCw size={15} /> Try Again
          </button>

          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "transparent",
              color: "var(--dash-ink, #161412)",
              border: "1px solid var(--dash-border, #ede5dc)",
              borderRadius: "12px",
              padding: "0.75rem 1.25rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={15} /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

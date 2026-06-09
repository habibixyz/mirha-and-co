// app/dashboard/DashboardClient.tsx
// NEW FILE — Client-side dashboard shell. Created alongside the updated page.tsx.

"use client";

import { useAuth } from "@/lib/auth";
import RoutineTracker from "@/components/RoutineTracker";
import IngredientConflictChecker from "@/components/IngredientConflictChecker";
import ShareableRoutineCard from "@/components/ShareableRoutineCard";
import { useState } from "react";

type Tab = "routine" | "conflicts" | "share";

const TABS: { id: Tab; label: string }[] = [
  { id: "routine", label: "Routine tracker" },
  { id: "conflicts", label: "Conflict checker" },
  { id: "share", label: "Share routine" },
];

export default function DashboardClient() {
  const { user, loading, isPro, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("routine");

  if (loading) {
    return (
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px", fontFamily: "inherit" }}>
        <p style={{ color: "#aaa", fontSize: 14 }}>Loading…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main style={{ maxWidth: 480, margin: "0 auto", padding: "80px 24px", fontFamily: "inherit", textAlign: "center" }}>
        <h1 style={{ fontSize: 24, fontWeight: 500, marginBottom: 12 }}>Your skin dashboard</h1>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>
          Sign in to track your routine, check ingredient conflicts, and build better skin habits.
        </p>
        <a
          href="/login"
          style={{
            display: "inline-block",
            background: "#1a1a1a",
            color: "#fff",
            padding: "12px 32px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            textDecoration: "none",
            marginRight: 10,
          }}
        >
          Sign in
        </a>
        <a
          href="/signup"
          style={{
            display: "inline-block",
            border: "1px solid #1a1a1a",
            color: "#1a1a1a",
            padding: "12px 32px",
            borderRadius: 8,
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          Create account
        </a>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px", fontFamily: "inherit" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 36,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>
            Hi, {user.name}
          </h1>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: 99,
                background: isPro ? "#1a1a1a" : "#f0f0f0",
                color: isPro ? "#fff" : "#555",
              }}
            >
              {isPro ? "Pro" : "Free"}
            </span>
            {user.skinType && (
              <span style={{ fontSize: 12, color: "#888" }}>{user.skinType}</span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {!isPro && (
            <a
              href="/pricing"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#1a1a1a",
                textDecoration: "none",
                border: "1px solid #1a1a1a",
                padding: "8px 16px",
                borderRadius: 8,
              }}
            >
              Upgrade to Pro
            </a>
          )}
          <button
            onClick={logout}
            style={{
              fontSize: 12,
              color: "#aaa",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Pro upgrade banner for free users */}
      {!isPro && (
        <div
          style={{
            border: "1px solid #e8e8e8",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fafafa",
          }}
        >
          <div>
            <p style={{ fontWeight: 500, fontSize: 14, marginBottom: 2 }}>
              Unlock routine tracking, conflict checker & more
            </p>
            <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
              Mirha Pro — ₹199/month. Cancel anytime.
            </p>
          </div>
          <a
            href="/pricing"
            style={{
              background: "#1a1a1a",
              color: "#fff",
              padding: "9px 20px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              marginLeft: 16,
            }}
          >
            See plans
          </a>
        </div>
      )}

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid #e8e8e8",
          marginBottom: 28,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "10px 18px",
              fontSize: 13,
              fontWeight: tab === t.id ? 500 : 400,
              color: tab === t.id ? "#1a1a1a" : "#888",
              background: "none",
              border: "none",
              borderBottom: tab === t.id ? "2px solid #1a1a1a" : "2px solid transparent",
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "routine" && <RoutineTracker />}
      {tab === "conflicts" && <IngredientConflictChecker />}
      {tab === "share" && <ShareableRoutineCard />}
    </main>
  );
}

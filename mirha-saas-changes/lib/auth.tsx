// lib/auth.tsx
// NEW FILE — Wrap your root layout with <AuthProvider> then use useAuth() anywhere.
//
// HOW TO USE IN layout.tsx:
//   import { AuthProvider } from "@/lib/auth";
//   <AuthProvider>{children}</AuthProvider>
//
// This is a lightweight client-side auth shell. Replace the mock with your
// actual auth provider (Clerk, NextAuth, Supabase Auth, etc).

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Plan = "free" | "pro" | "annual";

export interface User {
  id: string;
  email: string;
  name: string;
  plan: Plan;
  skinType?: "oily" | "dry" | "combination" | "normal" | "sensitive";
  skinConcerns?: string[];
  joinedAt: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isPro: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ---------------------------------------------------------------------------
// Mock session — replace this function with a real API call or Clerk/Supabase
// ---------------------------------------------------------------------------
async function fetchSession(): Promise<User | null> {
  // In production: return fetch('/api/auth/session').then(r => r.json())
  const stored = typeof window !== "undefined" ? localStorage.getItem("mirha_user") : null;
  return stored ? JSON.parse(stored) : null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSession()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, _password: string) => {
    // Replace with real auth call
    const mockUser: User = {
      id: Math.random().toString(36).slice(2),
      email,
      name: email.split("@")[0],
      plan: "free",
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem("mirha_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem("mirha_user");
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    localStorage.setItem("mirha_user", JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isPro: user?.plan === "pro" || user?.plan === "annual",
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// ---------------------------------------------------------------------------
// Paywall gate — wrap any component or section with this
// ---------------------------------------------------------------------------
export function ProGate({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isPro, loading } = useAuth();

  if (loading) return null;

  if (!isPro) {
    return (
      <>
        {fallback ?? (
          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              padding: "32px 24px",
              textAlign: "center",
              background: "#fafafa",
            }}
          >
            <p style={{ fontWeight: 500, marginBottom: 8, fontSize: 15 }}>
              This is a Pro feature
            </p>
            <p style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>
              Upgrade to Mirha Pro to unlock unlimited checks, conflict analysis, and routine
              tracking.
            </p>
            <a
              href="/pricing"
              style={{
                display: "inline-block",
                background: "#1a1a1a",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              See pricing →
            </a>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}

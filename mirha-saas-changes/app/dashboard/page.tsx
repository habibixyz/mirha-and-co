// app/dashboard/page.tsx
// REPLACE the existing dashboard/page.tsx with this file.
//
// Changes from original:
// - Shows user account info (name, plan, skin type)
// - Integrates RoutineTracker (Pro)
// - Integrates IngredientConflictChecker (Pro)
// - Integrates ShareableRoutineCard
// - Shows upgrade CTA for free users

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Mirha & Co.",
  description: "Your personal skincare dashboard. Track routines, check ingredients, and build better skin habits.",
};

// NOTE: The sub-components below are client components.
// This page itself can stay as a server component.
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return <DashboardClient />;
}

// components/RoutineTracker.tsx
// NEW FILE — Drop this onto the dashboard page.
// Shows saved AM/PM routine + weekly check-in log.
//
// Usage:
//   import RoutineTracker from "@/components/RoutineTracker";
//   <RoutineTracker />

"use client";

import { useState } from "react";
import { ProGate } from "@/lib/auth";

interface CheckIn {
  date: string; // ISO date string
  rating: 1 | 2 | 3 | 4 | 5;
  notes: string;
  skipped: boolean;
}

const SAMPLE_ROUTINE = {
  am: ["Cetaphil Gentle Face Wash", "Minimalist Niacinamide 10%", "Deconstruct SPF 50"],
  pm: [
    "Cetaphil Gentle Face Wash",
    "The Ordinary Glycolic Acid Toner",
    "Minimalist Retinol 0.3%",
    "Cetaphil Moisturising Cream",
  ],
};

const RATING_LABELS: Record<number, string> = {
  1: "Bad flare-up",
  2: "Not great",
  3: "Okay",
  4: "Looking good",
  5: "Skin loved it",
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export default function RoutineTracker() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [notes, setNotes] = useState("");
  const [skipped, setSkipped] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const alreadyCheckedIn = checkIns.some((c) => c.date === today());

  function submit() {
    if (alreadyCheckedIn) return;
    setCheckIns((prev) => [
      { date: today(), rating, notes, skipped },
      ...prev,
    ]);
    setSubmitted(true);
    setNotes("");
  }

  const streak = (() => {
    let count = 0;
    const d = new Date();
    while (true) {
      const iso = d.toISOString().slice(0, 10);
      if (!checkIns.find((c) => c.date === iso && !c.skipped)) break;
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  })();

  return (
    <ProGate>
      <div style={{ fontFamily: "inherit" }}>
        {/* Streak banner */}
        {streak > 0 && (
          <div
            style={{
              background: "#1a1a1a",
              color: "#fff",
              borderRadius: 10,
              padding: "12px 18px",
              fontSize: 13,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>🔥</span>
            <span>
              <strong>{streak}-day streak</strong> — keep going!
            </span>
          </div>
        )}

        {/* Current routine */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {(["am", "pm"] as const).map((slot) => (
            <div
              key={slot}
              style={{
                border: "1px solid #e8e8e8",
                borderRadius: 12,
                padding: "18px 16px",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#888",
                  marginBottom: 12,
                }}
              >
                {slot === "am" ? "Morning" : "Evening"}
              </p>
              <ol style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {SAMPLE_ROUTINE[slot].map((step, i) => (
                  <li
                    key={step}
                    style={{
                      fontSize: 13,
                      padding: "5px 0",
                      borderBottom: "1px solid #f5f5f5",
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#bbb", minWidth: 16 }}>{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Daily check-in */}
        <div
          style={{
            border: "1px solid #e8e8e8",
            borderRadius: 12,
            padding: "24px 20px",
            marginBottom: 24,
          }}
        >
          <p style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>Daily check-in</p>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>
            How did your skin feel today?
          </p>

          {submitted || alreadyCheckedIn ? (
            <p style={{ fontSize: 14, color: "#555" }}>
              ✓ Checked in for today. See you tomorrow.
            </p>
          ) : (
            <>
              {/* Skip toggle */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  marginBottom: 18,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={skipped}
                  onChange={(e) => setSkipped(e.target.checked)}
                />
                I skipped my routine today
              </label>

              {!skipped && (
                <>
                  {/* Rating */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    {([1, 2, 3, 4, 5] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRating(r)}
                        style={{
                          flex: 1,
                          padding: "10px 0",
                          border: `1px solid ${rating === r ? "#1a1a1a" : "#e5e5e5"}`,
                          borderRadius: 8,
                          background: rating === r ? "#1a1a1a" : "transparent",
                          color: rating === r ? "#fff" : "#555",
                          fontSize: 13,
                          fontWeight: rating === r ? 500 : 400,
                          cursor: "pointer",
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>
                    {RATING_LABELS[rating]}
                  </p>

                  {/* Notes */}
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any reactions, new products, or notes? (optional)"
                    rows={2}
                    style={{
                      width: "100%",
                      fontSize: 13,
                      padding: "10px 12px",
                      border: "1px solid #e5e5e5",
                      borderRadius: 8,
                      resize: "vertical",
                      marginBottom: 16,
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                </>
              )}

              <button
                onClick={submit}
                style={{
                  background: "#1a1a1a",
                  color: "#fff",
                  border: "none",
                  padding: "11px 24px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Log check-in
              </button>
            </>
          )}
        </div>

        {/* History */}
        {checkIns.length > 0 && (
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "#888",
                marginBottom: 14,
              }}
            >
              Recent check-ins
            </p>
            {checkIns.map((c) => (
              <div
                key={c.date}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  padding: "10px 0",
                  borderBottom: "1px solid #f5f5f5",
                  fontSize: 13,
                }}
              >
                <span style={{ color: "#aaa", minWidth: 60 }}>{formatDate(c.date)}</span>
                {c.skipped ? (
                  <span style={{ color: "#aaa" }}>Skipped</span>
                ) : (
                  <>
                    <span style={{ fontWeight: 500 }}>{c.rating}/5</span>
                    <span style={{ color: "#555" }}>{RATING_LABELS[c.rating]}</span>
                    {c.notes && (
                      <span style={{ color: "#888", fontStyle: "italic" }}>{c.notes}</span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ProGate>
  );
}

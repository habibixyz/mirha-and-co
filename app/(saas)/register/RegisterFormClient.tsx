"use client";

import Link from "next/link";
import { registerAction } from "@/app/(saas)/actions";
import { useActionState } from "react";

export function RegisterFormClient({ redirectVal = "/dashboard" }: { redirectVal?: string }) {
  const [state, action, isPending] = useActionState(registerAction, {});

  return (
    <div style={{
      background: 'var(--white)',
      border: "1px solid var(--rule)",
      borderRadius: "14px",
      padding: "2.5rem 2.2rem",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      boxShadow: '0 12px 40px rgba(40, 28, 20, 0.04)',
    }}>
      <h1 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "2rem",
        fontWeight: 400,
        margin: "0 0 0.5rem",
        color: "var(--ink)"
      }}>
        Create Account
      </h1>
      <p style={{ color: "var(--muted)", margin: "0 0 1.8rem", fontSize: "0.9rem" }}>
        Join Mirha &amp; Co. and transform your skin.
      </p>

      {/* Google Sign In Button */}
      <a
        href={`/api/auth/google?redirect=${encodeURIComponent(redirectVal)}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          padding: "0.75rem 1rem",
          borderRadius: "8px",
          border: "1px solid var(--rule)",
          background: "var(--white)",
          color: "var(--ink)",
          fontSize: "0.9rem",
          fontWeight: 500,
          textDecoration: "none",
          transition: "all 0.2s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        Sign up with Google
      </a>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "1.2rem 0" }}>
        <div style={{ flex: 1, height: "1px", background: "var(--rule)" }} />
        <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          or with email
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--rule)" }} />
      </div>

      <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="hidden" name="redirectTo" value={redirectVal} />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          style={{
            padding: "0.8rem 1rem",
            borderRadius: "8px",
            border: "1px solid var(--rule)",
            background: "transparent",
            color: "var(--ink)",
            fontSize: "0.9rem"
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          style={{
            padding: "0.8rem 1rem",
            borderRadius: "8px",
            border: "1px solid var(--rule)",
            background: "transparent",
            color: "var(--ink)",
            fontSize: "0.9rem"
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          style={{
            padding: "0.8rem 1rem",
            borderRadius: "8px",
            border: "1px solid var(--rule)",
            background: "transparent",
            color: "var(--ink)",
            fontSize: "0.9rem"
          }}
        />

        {state?.error && <p style={{ color: "var(--rose)", fontSize: "0.85rem", margin: 0 }}>{state.error}</p>}

        <button type="submit" disabled={isPending} style={{
          background: "var(--ink)",
          color: "var(--white)",
          border: "none",
          borderRadius: "8px",
          padding: "0.8rem",
          fontSize: "0.9rem",
          fontWeight: 500,
          cursor: isPending ? "not-allowed" : "pointer",
          marginTop: "0.5rem",
          opacity: isPending ? 0.7 : 1
        }}>
          {isPending ? "Creating..." : "Sign Up with Email"}
        </button>
      </form>

      <p style={{ margin: "1.5rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
        Already have an account? <Link href={`/login?redirect=${encodeURIComponent(redirectVal)}`} style={{ color: "var(--rose)", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
      </p>
    </div>
  );
}

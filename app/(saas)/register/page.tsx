"use client";

import Link from "next/link";
import { registerAction } from "@/app/(saas)/actions";
import { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, {});
  const searchParams = useSearchParams();
  const redirectVal = searchParams.get("redirect") || "/dashboard";

  return (
    <div style={{
      background: 'var(--white)',
      border: "1px solid var(--rule)",
      borderRadius: "14px",
      padding: "3rem",
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
      <p style={{ color: "var(--muted)", margin: "0 0 2rem", fontSize: "0.9rem" }}>
        Join Mirha & Co. and transform your skin.
      </p>

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
          {isPending ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <p style={{ margin: "1.5rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
        Already have an account? <Link href={`/login?redirect=${encodeURIComponent(redirectVal)}`} style={{ color: "var(--rose)", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    }}>
      <Suspense fallback={<div style={{ color: "var(--muted)" }}>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}

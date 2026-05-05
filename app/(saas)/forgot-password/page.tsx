"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useActionState } from "react";
import { resetPasswordAction } from "@/app/(saas)/actions";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [state, action, isPending] = useActionState(resetPasswordAction, {});

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
        }}>
            <div style={{
                background: "var(--white)",
                border: "1px solid var(--rule)",
                borderRadius: "14px",
                padding: "3rem",
                width: "100%",
                maxWidth: "400px",
                textAlign: "center",
                boxShadow: "0 12px 40px rgba(40, 28, 20, 0.04)",
            }}>
                <h1 style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    margin: "0 0 0.5rem",
                    color: "var(--ink)"
                }}>
                    New Password
                </h1>
                <p style={{ color: "var(--muted)", margin: "0 0 2rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Choose a new password for your Mirha & Co. account.
                </p>

                {!token ? (
                    <p style={{ color: "var(--rose)", fontSize: "0.85rem", margin: 0 }}>
                        This reset link is missing a token. Please request a new link.
                    </p>
                ) : (
                    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <input type="hidden" name="token" value={token} />
                        <input
                            type="password"
                            name="password"
                            placeholder="New Password"
                            required
                            minLength={8}
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
                        {state?.success && <p style={{ color: "#2d8a5c", fontSize: "0.85rem", margin: 0 }}>{state.success}</p>}

                        <button type="submit" disabled={isPending || Boolean(state?.success)} style={{
                            background: "var(--ink)",
                            color: "var(--white)",
                            border: "none",
                            borderRadius: "8px",
                            padding: "0.8rem",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            cursor: isPending || state?.success ? "not-allowed" : "pointer",
                            marginTop: "0.5rem",
                            opacity: isPending || state?.success ? 0.7 : 1
                        }}>
                            {isPending ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                )}

                <p style={{ margin: "1.5rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                    <Link href="/login" style={{ color: "var(--rose)", textDecoration: "none", fontWeight: 600 }}>Back to sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={null}>
            <ResetPasswordForm />
        </Suspense>
    );
}

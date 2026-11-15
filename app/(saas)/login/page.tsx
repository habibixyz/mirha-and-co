import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginFormClient } from "./LoginFormClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;
  const redirectVal = params?.redirect || "/dashboard";

  if (session?.userId) {
    redirect(redirectVal);
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    }}>
      <Suspense fallback={<div style={{ color: "var(--muted)" }}>Loading...</div>}>
        <LoginFormClient redirectVal={redirectVal} />
      </Suspense>
    </div>
  );
}

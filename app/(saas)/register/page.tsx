import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RegisterFormClient } from "./RegisterFormClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function RegisterPage({
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
        <RegisterFormClient redirectVal={redirectVal} />
      </Suspense>
    </div>
  );
}

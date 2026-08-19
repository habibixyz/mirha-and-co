"use client";

import dynamic from "next/dynamic";

// next/dynamic with ssr:false must be declared inside a Client Component in Next.js 16.
// This wrapper lets the Server Component (page.tsx) reference ShopFilterClient
// without pulling it into the critical SSR render path.
const ShopFilterClient = dynamic(() => import("@/components/ShopFilterClient"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9a8f86",
        fontSize: 13,
      }}
    >
      Loading shop…
    </div>
  ),
});

export default function ShopFilterClientLazy() {
  return <ShopFilterClient />;
}

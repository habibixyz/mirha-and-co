"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function GlobalBlogViewTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const parts = pathname.split("/").filter(Boolean);
    // Matches path pattern: /blog/slug-name
    if (parts.length === 2 && parts[0] === "blog") {
      const slug = parts[1];
      // Exclude structural routes
      if (slug !== "category" && slug !== "search" && slug !== lastTracked.current) {
        lastTracked.current = slug;

        fetch(`/api/views?slug=${slug}`, { method: "POST" })
          .then((res) => res.json())
          .then((data) => {
            if (process.env.NODE_ENV === "development") {
              console.log(`[Blog Tracker] Tracked view for ${slug}:`, data);
            }
          })
          .catch((err) => console.error("Failed to track view:", err));
      }
    }
  }, [pathname]);

  return null;
}

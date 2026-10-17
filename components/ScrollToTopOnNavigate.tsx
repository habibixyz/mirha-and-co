"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ensures that whenever a user navigates between routes or clicks on any tool/function,
 * the viewport immediately scrolls to the top of the destination page instead of
 * retaining previous scroll offset or jumping down the page.
 */
export default function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure any leftover overflow locks are cleared
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    // Immediately scroll to the top of the page on route transition
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

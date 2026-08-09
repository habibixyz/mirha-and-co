import { ReactNode } from "react";
import { GlobalBlogViewTracker } from "@/components/GlobalBlogViewTracker";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GlobalBlogViewTracker />
      {children}
    </>
  );
}

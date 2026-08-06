"use client";

import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { getPostsForConcern } from "@/lib/blog-utils";

const CATEGORY_COLORS: Record<string, string> = {
  SKINCARE: "#fc2779",
  BEAUTY: "#a27b5c",
  WELLNESS: "#7b8f6e",
  HAIR: "#6b7fa3",
  LIFESTYLE: "#8b6f9a",
  MAKEUP: "#c0766a",
};

interface Props {
  skinType?: string;
  mainConcern?: string;
  userName?: string;
}

export function DashboardReadingList({ skinType, mainConcern, userName }: Props) {
  // If no profile data yet, default to a broadly useful concern
  const concern = mainConcern || "acne";
  const skin = skinType || "oily";

  const posts = getPostsForConcern(concern, skin, 3);

  if (!posts.length) return null;

  const firstName = userName?.split(" ")[0] || "";

  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--rule)",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 12px 40px rgba(40, 28, 20, 0.04)",
        marginTop: "2rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              background: "rgba(252, 39, 121, 0.08)",
              borderRadius: "8px",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BookOpen size={16} color="#fc2779" />
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                margin: 0,
                color: "var(--ink)",
                fontWeight: 600,
              }}
            >
              {firstName ? `${firstName}'s Reading List` : "Your Reading List"}
            </h3>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              Picked for {skin} skin · {concern}
            </p>
          </div>
        </div>
        <Link
          href="/blog"
          style={{
            fontSize: "0.8rem",
            color: "var(--rose)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontWeight: 500,
          }}
        >
          All guides <ArrowRight size={13} />
        </Link>
      </div>

      {/* Guide Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {posts.map((post, i) => {
          const accentColor =
            CATEGORY_COLORS[post.category as keyof typeof CATEGORY_COLORS] ||
            "#fc2779";

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.9rem 1rem",
                  background: "var(--sand)",
                  border: "1px solid var(--rule)",
                  borderRadius: "10px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    accentColor + "55";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 4px 16px ${accentColor}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--rule)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    minWidth: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: accentColor,
                    color: "#fff",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  {i + 1}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: "0 0 3px",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.78rem",
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "5px",
                    }}
                  >
                    <Clock size={11} color="var(--muted)" />
                    <span
                      style={{ fontSize: "0.7rem", color: "var(--muted)" }}
                    >
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <ArrowRight
                  size={14}
                  color={accentColor}
                  style={{ flexShrink: 0, marginTop: "4px" }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

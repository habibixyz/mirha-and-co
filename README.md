# Mirha & Co

A modern, research-backed beauty & wellness platform built for Indian consumers.
Mirha & Co focuses on simplifying skincare through minimal routines, honest recommendations, and data-driven content.

---

## Overview

Mirha & Co is not a traditional blog.
It is a content + commerce system designed to:

* Help users understand skincare without overwhelm
* Recommend products that actually work in Indian conditions
* Monetize through curated affiliate recommendations

---

## Core Philosophy

* Minimal over maximal
* Science over hype
* Results over trends

Indian skin behaves differently due to climate, water quality, and lifestyle.
This platform is built specifically around those realities.

---

## Features

* Editorial-style blog system (Next.js App Router)
* SEO-optimized long-form content
* Affiliate-driven product recommendations
* Reusable product card components
* Internal linking for content discovery
* Clean, minimal UI for readability

---

## Tech Stack

* Next.js (App Router)
* React
* TypeScript
* Inline styling (custom design system)
* Amazon Affiliate Integration

---

## Project Structure

```bash
app/
 ├── blog/
 │    ├── page.tsx          # Blog index
 │    ├── [slug]/page.tsx   # Individual blog pages
 │
 ├── components/
 │    └── BlogProductCard.tsx
 │
 └── layout.tsx
```

---

## Blog System

Each blog page is built as a standalone component:

```tsx
export default function Page() {
  return <main>...</main>;
}
```

Blogs are manually registered inside:

```tsx
const posts = [...]
```

Each post includes:

* title
* slug
* category
* read time
* thumbnail

---

## Affiliate System

Product recommendations are injected using:

```tsx
<BlogProductCard asin="PRODUCT_ASIN" />
```

This allows:

* Clean product placement
* Consistent UI
* Scalable monetization

---

## SEO Strategy

* Problem-first blog topics
* India-specific keywords
* Internal linking across blogs
* Structured headings (H1, H2, H3)
* FAQ sections for search visibility

---

## Local Development

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

---

## Contribution

This project is currently curated and maintained as a focused brand system.

If you want to contribute:

* Suggest blog ideas
* Improve UI/UX
* Optimize performance
* Enhance SEO structure

---

## Roadmap

* Dynamic blog CMS (MDX or database-driven)
* Category filtering system
* Automated internal linking engine
* Conversion tracking (affiliate analytics)
* AI-assisted content generation

---

## License

This project is for educational and commercial use under Mirha & Co.

---

## Final Note

Mirha & Co is built on a simple idea:

Most skincare problems are not product problems.
They are understanding problems.

Fix the understanding — results follow.

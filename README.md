# Mirha & Co

A modern, AI-powered skincare and wellness SaaS platform built for a global audience. Mirha & Co simplifies skincare through minimal routines, data-driven AI consultations, and honest recommendations tailored to your local climate and region.

---

## Overview

Mirha & Co has evolved from an editorial blog into a fully-fledged **Software-as-a-Service (SaaS)** platform. It combines content, commerce, and intelligent tools to provide a premium skincare experience.

The platform is designed to:
* Help users track their skincare journey with digital journals and routine trackers.
* Provide instant, hyper-personalized advice via our AI Skincare Consultant ("Ask Mirha").
* Prevent skin damage using the Cross-Product Ingredient Conflict Checker.
* Monetize through tiered subscriptions (Pro vs. Free) and curated affiliate recommendations.

---

## Core Philosophy

* **Minimal over maximal:** Fewer products, better results.
* **Science over hype:** Active-ingredient focus without the marketing fluff.
* **Results over trends:** Tailored for the specific climate, water quality, and lifestyle realities of your region (US, UK, Asia, India, and beyond).

---

## Key SaaS Features

* **Secure Authentication:** Custom, secure user accounts with encrypted sessions.
* **Pro Subscriptions:** Integrated billing (Razorpay & Dodo Payments) to unlock premium features and higher usage limits.
* **AI Skincare Consultant:** A dynamic RAG (Retrieval-Augmented Generation) search engine powered by Gemini that answers queries based on our specific, verified product catalog.
* **Skin Journal & Analyzer:** Users can log daily skin progress, upload photos, and receive immediate AI dermatological analysis.
* **Routine Tracker:** Daily tracking of AM/PM routines to maintain consistency.
* **Conflict Checker (Pro Feature):** Cross-references ingredient lists between multiple products to warn users about dangerous chemical layerings (e.g., Retinol + AHAs).
* **Automated Email Workflows:** Resend integrations for welcome emails, password resets, and targeted lead-magnet downloads (e.g., Hard Water Guides, Dupe Sheets).
* **Globalized Commerce & Content:** 
  * Region-aware dynamic pricing and currency localization (USD, GBP, INR).
  * Automated Dupe Finder tool that redirects to local Amazon affiliate storefronts.
  * Regional editorial content tailored for diverse global climates and skin types.

---

## Tech Stack

* **Frontend:** Next.js 16 (App Router), React, TypeScript, Framer Motion
* **Styling:** Custom CSS design system (Vanilla CSS)
* **Backend:** Next.js Server Actions & API Routes
* **Database:** PostgreSQL hosted on Supabase
* **ORM:** Prisma
* **AI & Machine Learning:** Google Generative AI (Gemini Vision & Pro), Google Antigravity, OpenAI (Codex / ChatGPT), Anthropic Claude
* **Email:** Resend
* **Hosting:** Vercel

---

## AI Development & Codex / GPT-5.6 Integration

This platform was architected and built with extensive AI pair-programming leveraging **OpenAI Codex** and **GPT-5.6** models:

* **Full-Stack Architecture & Scaffolding**: Leveraged OpenAI Codex for rapid Next.js 16 App Router structuring, strict TypeScript interfaces, and Prisma ORM relational schema design (`User`, `Routine`, `SkinJournal`, `AiQueryLog`).
* **Algorithmic Logic & RAG Search**: Engineered core backend algorithms with GPT-5.6, including the **Cross-Product Ingredient Conflict Matrix** (detecting AHA + Retinol layering conflicts), regional climate localization logic, and product vector search retrieval.
* **Component Synthesis & Refactoring**: Applied Codex to generate responsive, glassmorphic UI components (`RoutineQuiz.tsx`, `IngredientConflictChecker.tsx`, `ShopFilterClient.tsx`) and optimize Next.js Server Actions.
* **Automated Tooling & Scripts**: Utilized Codex to generate batch optimization scripts (`scratch/optimize_all_assets.py`, `scratch/make_submission_zip.ps1`) to streamline asset management and deployment packaging.

### Multi-Model Ecosystem & Agentic Workflows

In addition to core Codex pair-programming, full-stack development and content synthesis were powered by an integrated multi-model AI suite:

* **Google Antigravity**: Driven by DeepMind's agentic AI coding assistant for end-to-end autonomous debugging, complex refactoring, deployment verification, and build pipeline stabilization.
* **Google Gemini**: Powers the live production RAG engine ("Ask Mirha"), dermatological image diagnostics, and routine generation.
* **ChatGPT (OpenAI) & Claude (Anthropic)**: Utilized for deep domain research, synthesizing regional skincare guides, refining chemical ingredient rules, and polishing UX copy.

---

## Project Structure

```bash
app/
 ├── (marketing)/       # Public pages, blogs, free tools, pricing
 ├── (saas)/            # Protected SaaS dashboard, routines, journals, conflicts
 ├── api/               # API endpoints (Webhooks, Chat, Payments)
components/             # Reusable UI elements (Sidebars, Modals, Cards)
lib/                    # Core logic (Auth, AI, Prisma Client, Search Index)
prisma/                 # Database schema and migrations
scratch/                # Maintenance scripts (Image fetchers, data sync)
```

---

## Database Schema (Prisma)

Our PostgreSQL database efficiently tracks:
* **Users & Sessions:** Secure authentication.
* **Subscriptions:** Free and Pro tier management.
* **Routines & SkinJournals:** User-generated progress tracking.
* **AiQueryLogs:** Background logging of all AI interactions (Queries, Responses, Context) to fine-tune our models.
* **Products:** The catalog used for AI Retrieval-Augmented Generation.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (.env)
# DATABASE_URL, DIRECT_URL, GEMINI_API_KEY, RESEND_API_KEY, etc.

# 3. Sync database
npx prisma db push
npx prisma generate

# 4. Start the development server
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Final Note

Mirha & Co is built on a simple idea:
*Most skincare problems are not product problems. They are understanding problems.*

Fix the understanding — results follow.

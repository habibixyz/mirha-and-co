# Mirha & Co

A modern, AI-powered skincare and wellness SaaS platform built specifically for Indian consumers. Mirha & Co simplifies skincare through minimal routines, data-driven AI consultations, and honest recommendations.

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
* **Results over trends:** Tailored for the climate, water quality, and lifestyle realities of Indian skin.

---

## Key SaaS Features

* **Secure Authentication:** Custom, secure user accounts with encrypted sessions.
* **Pro Subscriptions:** Integrated billing (Paddle/Stripe) to unlock premium features and higher usage limits.
* **AI Skincare Consultant:** A dynamic RAG (Retrieval-Augmented Generation) search engine powered by Gemini that answers queries based on our specific, verified product catalog.
* **Skin Journal & Analyzer:** Users can log daily skin progress, upload photos, and receive immediate AI dermatological analysis.
* **Routine Tracker:** Daily tracking of AM/PM routines to maintain consistency.
* **Conflict Checker (Pro Feature):** Cross-references ingredient lists between multiple products to warn users about dangerous chemical layerings (e.g., Retinol + AHAs).
* **Automated Email Workflows:** Resend integrations for welcome emails, password resets, and targeted lead-magnet downloads (e.g., Hard Water Guides, Dupe Sheets).

---

## Tech Stack

* **Frontend:** Next.js 16 (App Router), React, TypeScript, Framer Motion
* **Styling:** Custom CSS design system (Vanilla CSS)
* **Backend:** Next.js Server Actions & API Routes
* **Database:** PostgreSQL hosted on Supabase
* **ORM:** Prisma
* **AI:** Google Generative AI (Gemini Vision & Pro models)
* **Email:** Resend
* **Hosting:** Vercel

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

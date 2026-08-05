# Mirha & Co ✨

> **AI-powered skincare SaaS platform for Indian & global skin** — built with Next.js 16, Gemini AI, PostgreSQL, and a full B2B partner API.

**Live site:** [mirhaandco.com](https://www.mirhaandco.com) · **Stack:** Next.js · Prisma · PostgreSQL · Google Gemini · Razorpay · Dodo Payments · Vercel

---

## What is Mirha & Co?

Mirha & Co started as a skincare editorial blog and evolved into a fully-featured **AI skincare SaaS platform**. It serves both individual consumers (B2C) and business partners (B2B), offering:

- 🤖 **AI-powered skin analysis, routine generation, and product search** powered by Google Gemini
- 💳 **Tiered SaaS subscriptions** (Free & Pro) via Razorpay, Paddle, and Dodo Payments
- 📚 **135+ expert editorial blog posts** with real clinical skincare comparisons and affiliate monetization
- 🌐 **B2B SaaS API** for embedding skincare recommendation widgets into partner e-commerce sites
- 🗺️ **Hyper-localized recommendations** based on city-level climate, UV index, water hardness (TDS/PPM), and skin type

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Vercel (Next.js 16)                     │
│  ┌────────────────┐   ┌─────────────────┐   ┌────────────┐  │
│  │ (marketing)/   │   │   (saas)/        │   │  api/      │  │
│  │ Blog, Shop,    │   │  Dashboard,      │   │  REST &    │  │
│  │ Tools, Pricing │   │  Journal, Auth   │   │  Webhooks  │  │
│  └────────────────┘   └─────────────────┘   └────────────┘  │
└─────────────────────────────────────────────────────────────┘
           │                    │                   │
    ┌──────▼──────┐    ┌────────▼──────┐   ┌───────▼──────┐
    │  PostgreSQL  │    │  Google Gemini │   │   Resend     │
    │  (Railway/   │    │  (Gemini 1.5  │   │  (Email)     │
    │   Supabase)  │    │   Pro/Vision) │   └──────────────┘
    └─────────────┘    └───────────────┘
```

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.x (App Router) | Full-stack React framework with SSR/SSG/ISR |
| React | 19.2 | UI component library |
| TypeScript | 5.x | Type safety across the entire codebase |
| Framer Motion | 12.x | Micro-animations and page transitions |
| Three.js + R3F | 0.184 / 9.x | 3D molecule animations on hero sections |
| Lucide React | 1.8 | Icon library |
| Vanilla CSS | — | Custom design system, no Tailwind in production |

### Backend & API
| Technology | Purpose |
|---|---|
| Next.js Server Actions | Secure form handling, auth flows, data mutations |
| Next.js API Routes | REST endpoints for webhooks, B2B API, AI chat |
| Prisma ORM | Type-safe database queries and migrations |
| PostgreSQL | Primary relational database (Railway / Supabase) |
| Zod | Runtime input validation for all API endpoints |

### AI & Machine Learning
| Service | Purpose |
|---|---|
| Google Gemini 1.5 Pro | RAG-based skincare search engine ("Ask Mirha"), routine generation |
| Google Gemini Vision | AI skin analysis from uploaded journal photos |
| Vercel AI SDK | Streaming chat responses via `/api/chat` |
| `@google/generative-ai` | Direct Gemini API integration for advanced agent tasks |

### Payments
| Provider | Purpose |
|---|---|
| Razorpay | Primary Indian payment gateway (subscriptions + B2B) |
| Dodo Payments | Global payment provider (consumer + B2B subscriptions) |
| Paddle | Alternative international billing |

### Infrastructure & DevOps
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting, edge functions, preview deployments |
| Railway | PostgreSQL database hosting |
| Supabase | Optional DB + storage layer (Supabase client available) |
| GitLab CI | Automated pipeline (`.gitlab-ci.yml`) |
| Resend | Transactional emails (welcome, reset, b2b onboarding) |
| Vercel Analytics + Speed Insights | Real-time visitor analytics and core web vitals |

---

## Project Structure

```bash
mirha-and-co/
├── .agents/                    # Developer guidelines & AI agent workspace rules
│   └── AGENTS.md               # Critical guardrails: DB safety, auth, B2B API, blog ordering
│
├── app/
│   ├── (marketing)/            # Public-facing pages (no auth required)
│   │   ├── page.tsx            # Home page — shop, hero, product grid
│   │   ├── blog/               # 135+ editorial posts + category routes
│   │   ├── b2b/                # B2B landing page + pricing + checkout
│   │   ├── k-beauty/           # K-Beauty editorial landing page
│   │   ├── mens-grooming/      # Men's grooming editorial
│   │   ├── tools/
│   │   │   ├── routine/        # AI routine builder (4-step skincare quiz)
│   │   │   ├── ingredients/    # Ingredient checker tool
│   │   │   ├── dupes/          # Product dupe finder (with affiliate redirects)
│   │   │   └── hard-water/     # City-level water hardness + hair damage calculator
│   │   ├── water-quality/[city]/ # Programmatic water quality pages per city
│   │   ├── product/[asin]/     # Individual product pages
│   │   ├── pricing/            # Consumer subscription pricing
│   │   ├── about/, contact/, privacy/, terms/, refunds/
│   │   └── layout.tsx          # Shared nav, footer, analytics injection
│   │
│   ├── (saas)/                 # Protected SaaS dashboard (auth required)
│   │   ├── login/, register/   # Auth forms
│   │   ├── forgot-password/, reset-password/
│   │   ├── actions.ts          # All Server Actions (auth, subscription, journal)
│   │   └── dashboard/
│   │       ├── page.tsx        # Dashboard home
│   │       ├── search/         # AI-powered product search ("Ask Mirha")
│   │       ├── analysis/       # Skin photo upload + AI face analysis
│   │       ├── routines/       # AM/PM routine tracker
│   │       ├── journal/        # Skin journal (daily logs + AI analysis)
│   │       ├── conflicts/      # Ingredient conflict checker (Pro)
│   │       └── subscription/   # Subscription management page
│   │
│   └── api/
│       ├── chat/               # Streaming AI chat (Vercel AI SDK + Gemini)
│       ├── analysis/           # Skin photo AI analysis endpoint
│       ├── health/             # Internal health check
│       ├── translate/          # On-demand content localization
│       ├── agents/
│       │   ├── catalog-audit/  # AI agent: audits product catalog quality
│       │   ├── concierge/      # AI agent: skincare concierge
│       │   └── weather-guard/  # AI agent: weather-aware skincare advice
│       ├── razorpay/
│       │   ├── checkout/       # Consumer subscription checkout (Razorpay)
│       │   └── b2b-checkout/   # B2B API subscription checkout
│       ├── dodo/
│       │   ├── checkout/       # Consumer checkout (Dodo Payments)
│       │   └── b2b-checkout/   # B2B checkout (Dodo)
│       ├── b2b/
│       │   ├── lookup-key/     # Validate B2B API key
│       │   └── update-settings/ # Update B2B partner configuration
│       ├── v1/                 # ── Public B2B REST API ──
│       │   ├── health/         # GET /api/v1/health
│       │   ├── recommend/      # POST /api/v1/recommend (core engine)
│       │   ├── widget/         # GET /api/v1/widget (embeddable JS)
│       │   ├── catalog/        # GET /api/v1/catalog
│       │   └── analytics/      # GET /api/v1/analytics
│       └── webhooks/
│           ├── razorpay/       # Razorpay subscription lifecycle events
│           ├── dodo/           # Dodo Payments subscription events
│           └── paddle/         # Paddle billing events
│
├── components/                 # Reusable UI components
│   ├── SiteHeader.tsx          # Global navigation + dark mode + mobile drawer
│   ├── BlogProductCard.tsx     # Affiliate product card with Amazon links
│   ├── BlogFooterTools.tsx     # In-post tool CTA widgets
│   ├── ComparisonTable.tsx     # Side-by-side product comparison tables
│   ├── RoutineQuiz.tsx         # Multi-step routine questionnaire
│   ├── SearchExperience.tsx    # AI-powered search with RAG results
│   ├── ShopFilterClient.tsx    # Client-side filterable product shop
│   ├── AffiliateCard.tsx       # Affiliate product cards with region redirect
│   ├── DashboardPromoModal.tsx # Signup conversion modal
│   ├── BackToTop.tsx           # Scroll-to-top button
│   ├── RegionalGuidesSelector.tsx # City × Concern guide selector
│   ├── NewsletterForm.tsx      # Email list capture
│   ├── ThemeProvider.tsx       # Dark/light mode context
│   └── GlobalizationContext.tsx # Currency & locale context
│
├── lib/                        # Core business logic
│   ├── ai.ts                   # Gemini AI client configuration
│   ├── auth.ts                 # bcrypt + SHA-256 legacy password verification
│   ├── posts.ts                # Blog post registry, ordering, slug → image mapping
│   ├── high-intent-posts.ts    # 135+ editorial posts with affiliate ASINs
│   ├── products.ts             # Full affiliate product catalog (RAG source)
│   ├── routineEngine.ts        # B2B skincare recommendation engine
│   ├── geocoding.ts            # City → climate/water quality resolution
│   ├── searchIndex.ts          # Static in-memory RAG search index
│   ├── globalization.ts        # Region/currency/locale utilities
│   ├── programmatic-posts.ts   # City × concern programmatic page generator
│   ├── prisma.ts               # Prisma client singleton
│   ├── supabase.ts             # Supabase client (storage/auth)
│   ├── b2b.ts                  # B2B API key validation helpers
│   └── b2bEmail.ts             # Automated B2B onboarding email flows
│
├── prisma/
│   ├── schema.prisma           # Database schema (all models)
│   └── migrations/             # Versioned migration history
│
├── public/
│   ├── blog-thumbs/            # 74+ custom blog post thumbnail images
│   ├── products/               # Product images
│   └── images/                 # General site assets
│
├── tests/
│   └── auth.smoke.mjs          # Auth smoke test (bcrypt + legacy SHA-256)
│
└── scratch/                    # Maintenance scripts (image sync, data migration)
```

---

## Database Schema

Built on **PostgreSQL** via **Prisma ORM**. All migrations are versioned.

| Model | Description |
|---|---|
| `User` | Account with hashed password (bcrypt), skin profile, avatar, credits |
| `Session` | Server-managed auth sessions (no JWT cookie exposure) |
| `PasswordResetToken` | Secure time-limited reset tokens |
| `Routine` | Saved AM/PM skincare routines (JSON stored as string) |
| `SkinJournal` | Daily skin log entries with AI analysis, photos, ratings |
| `Subscription` | Consumer tier management (free/pro, provider ID references) |
| `Product` | Affiliate catalog for RAG — ASIN, ingredients, concerns, skin types |
| `FaceAnalysis` | AI skin analysis results (barrier, acne, redness, oiliness scores) |
| `AiQueryLog` | Full AI interaction log (query, response, type, metadata) |
| `Lead` | Newsletter and tool lead capture |
| `B2BApiKey` | Partner API keys with quota tracking and billing linkage |
| `B2BUsageLog` | Per-request API usage logs (endpoint, city, TDS, skin type) |
| `BlogPostView` | Real-time blog post view counter keyed by slug |

---

## B2B API — `/api/v1/*`

Mirha & Co exposes a production REST API for partner e-commerce sites to embed skincare recommendations.

### Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Health ping for uptime monitoring |
| `POST` | `/api/v1/recommend` | Personalized skincare recommendations + quota enforcement |
| `GET` | `/api/v1/widget` | Returns an embeddable JavaScript widget |
| `GET` | `/api/v1/catalog` | Full curated product catalog |
| `GET` | `/api/v1/analytics` | Partner usage analytics |

### Authentication
All production requests require an `apiKey` field. A trial key `b2b_trial_key` bypasses DB lookup for sandbox testing.

### Request Example
```bash
curl -X POST https://www.mirhaandco.com/api/v1/recommend \
  -H "Content-Type: application/json" \
  -d '{"apiKey":"your_key","skinType":"oily","mainConcern":"acne","city":"Mumbai","country":"IN"}'
```

---

## AI Agents

| Agent | Route | Description |
|---|---|---|
| **Catalog Audit** | `/api/agents/catalog-audit` | Audits affiliate catalog quality; validates product-content alignment |
| **Concierge** | `/api/agents/concierge` | High-level skincare concierge using multi-turn Gemini reasoning |
| **Weather Guard** | `/api/agents/weather-guard` | Climate-aware routine adjuster using UV, humidity, AQI data |

---

## Authentication

- **New users**: Passwords hashed with **bcrypt** (10 rounds).
- **Legacy users**: SHA-256 fallback preserved for pre-migration accounts — never remove.
- Server-side sessions stored in PostgreSQL (`Session` model), no stateful JWT cookies.
- Auth guarded via `tests/auth.smoke.mjs` (6 test cases, 0 failures required before any commit).

---

## Blog System

- **135+ posts** registered in `lib/high-intent-posts.ts` with real affiliate ASINs.
- Posts are ordered, filtered, and sorted in `lib/posts.ts` with `NEW_SLUGS` priority list.
- Custom thumbnails mapped per slug in `SLUG_IMAGE_MAP` inside `lib/posts.ts`.
- **New blog posts must always be placed at the top of the feed** — see `.agents/AGENTS.md` Rule #5.
- Blog post views tracked server-side in `BlogPostView` table and displayed live on cards.

---

## Environment Variables

```bash
# Database
DATABASE_URL=             # PostgreSQL connection string
DIRECT_URL=               # Supabase direct connection (for migrations)

# Auth
JWT_SECRET=               # Session signing secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI
GEMINI_API_KEY=           # Google Gemini Pro + Vision

# Email
RESEND_API_KEY=
PASSWORD_RESET_FROM=

# Payments — Razorpay (India)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_WEBHOOK_SECRET=
RAZORPAY_PRO_PLAN_ID=

# Payments — Dodo (Global)
DODO_PAYMENTS_API_KEY=
NEXT_PUBLIC_DODO_PRODUCT_ID=
DODO_WEBHOOK_SECRET=
DODO_B2B_GROWTH_PRODUCT_ID=
DODO_B2B_SCALE_PRODUCT_ID=

# Payments — Paddle (International)
PADDLE_API_KEY=
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
NEXT_PUBLIC_PADDLE_PRODUCT_ID=

# Site
NEXT_PUBLIC_SITE_URL=https://www.mirhaandco.com
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your DATABASE_URL, GEMINI_API_KEY, RESEND_API_KEY, etc.

# 3. Run database migrations
npx prisma migrate dev

# 4. Generate Prisma client
npx prisma generate

# 5. Start dev server (clears stale Turbopack cache first)
Remove-Item -Recurse -Force .next/dev -ErrorAction SilentlyContinue
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> ⚠️ **B2B API 404 on `/api/v1/*`?** This is a known Turbopack cache issue. Always run `Remove-Item -Recurse -Force .next\dev` before starting the dev server when working on B2B routes.

---

## Testing

```bash
# Auth smoke test (must pass 6/6 before any auth-related commit)
npm run test:auth
```

---

## Deployment

```bash
# Production deployment (Vercel picks up pushes to main automatically)
git push origin main

# Database migrations on production (never use prisma db push)
npx prisma migrate deploy
```

The production start script in `package.json` automatically runs `prisma migrate deploy` before starting the server.

---

## Developer Guardrails

See [`.agents/AGENTS.md`](.agents/AGENTS.md) for the full set of workspace rules. Key highlights:

- ❌ **Never run `prisma db push` on production** — always use `migrate deploy`
- 🔒 **Never touch the SHA-256 fallback login block** in `lib/auth.ts`
- 💳 **Never modify the `dodo_` prefix logic** in the Dodo webhook or subscription page
- 🔁 **Always clear Turbopack cache** before testing `/api/v1/*` routes
- 📋 **New blog posts always go to the top** of the `POSTS` array in `lib/posts.ts`

---

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution guidelines.

---

## License

See [`LICENSE`](LICENSE).

---

*Mirha & Co — Because most skincare problems are not product problems. They're understanding problems.*

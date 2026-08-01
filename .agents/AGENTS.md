# Critical Workspace Rules for Mirha & Co.

These rules are loaded automatically at startup. Any developer AI agent MUST strictly adhere to them to prevent database data loss or login/payment regressions.

## 1. Database Safety & Wipes Prevention
* **NEVER execute or suggest `prisma db push` on the production database.** 
* The production start script in `package.json` must always use `prisma migrate deploy` instead of `db push` to apply schema updates incrementally.
* Any schema change to `prisma/schema.prisma` must be done via migrations (`npx prisma migrate dev --name <migration_name>`) to preserve existing user data and skin analyses.

## 2. Login & Authentication Guardrails
* **DO NOT touch, modify, or remove the legacy SHA-256 fallback login verification block** in `lib/auth.ts` or `app/(saas)/actions.ts`. This is critical for preventing lockout of pre-migration accounts.
* Before committing any changes to the authentication logic, you **MUST** run the auth smoke test suite:
  ```bash
  npm run test:auth
  ```
  All tests must pass (`6 passed, 0 failed`) before staging any commit.

## 3. Subscription & Payments (Razorpay & Dodo Payments)
* **DO NOT change the `"dodo_"` prefix prefixing logic** in `app/api/webhooks/dodo/route.ts` or the matching check logic in `app/(saas)/dashboard/subscription/page.tsx`.
* Always support the fallback parsing of unprefixed Dodo subscriptions (IDs starting with `sub_0N`) to ensure existing paying members are recognized.
* Do not modify client-side checkout scripts (`checkout.js` load patterns) in `SubscriptionClient.tsx` or `b2b/page.tsx` without end-to-end payment validation.

## 4. B2B API (`/api/v1/*`) — Turbopack Cache & Health Checks

### Known Bug: Stale Turbopack Cache Causes 404s on `/api/v1/*`
Next.js 16 with Turbopack has a known issue where **a stale `.next/dev` cache from a previous dev server run will cause all `/api/v1/health`, `/api/v1/recommend`, and `/api/v1/widget` routes to return 404** — even though the routes exist and compile correctly.

**Symptoms:**
- `GET /api/v1/health` → 404 (first request takes ~29s, subsequent requests take ~64ms)
- `POST /api/v1/recommend` → 404
- `GET /api/v1/widget` → 404
- But `GET /api/health` (non-v1) works fine

**The Fix — ALWAYS do this before testing `/api/v1/*` routes:**
```powershell
# 1. Kill any running dev server first
# 2. Clear the stale cache
Remove-Item -Recurse -Force .next\dev -ErrorAction SilentlyContinue
# 3. Start fresh
npm run dev
```

### B2B API Verification Protocol
Whenever you touch any file in `app/api/v1/`, `lib/routineEngine.ts`, or `lib/geocoding.ts`, you MUST verify all 3 B2B endpoints before considering the task done:

```powershell
# Health check
$h = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/health" -TimeoutSec 60
Write-Host "Health: $($h.StatusCode)"   # Must be 200

# Widget check
$w = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/widget?apiKey=b2b_trial_key&skinType=oily&mainConcern=acne" -TimeoutSec 60
Write-Host "Widget: $($w.StatusCode)"   # Must be 200, Content-Type: application/javascript

# Recommend check (trial key)
$body = '{"apiKey":"b2b_trial_key","skinType":"oily","mainConcern":"acne","city":"Mumbai","country":"IN"}'
$r = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/recommend" -Method POST -ContentType "application/json" -Body $body -TimeoutSec 60
Write-Host "Recommend: $($r.StatusCode)"  # Must be 200, success: true
```

**Expected passing criteria:**
- All 3 return HTTP 200
- `/recommend` JSON has `success: true` and a non-null `recommendation.cleanser.name`
- `/widget` Content-Type is `application/javascript`
- A missing API key to `/recommend` returns 401
- An invalid `skinType` returns 400

### B2B API Files — Do Not Break
| File | Purpose |
|---|---|
| `app/api/v1/health/route.ts` | Simple health ping for B2B partners |
| `app/api/v1/recommend/route.ts` | Core recommendation engine + quota enforcement |
| `app/api/v1/widget/route.ts` | Embeddable JS widget for partner sites |
| `lib/routineEngine.ts` | Recommendation logic — changes affect all B2B customers |
| `lib/geocoding.ts` | Live climate/water data resolution |

* The trial key `b2b_trial_key` must **always** bypass DB lookup and work without any DB entry.
* The `monthlyQuota` enforcement and `usageThisMonth` increment in `recommend/route.ts` must never be removed — paying B2B customers are billed based on this.
* CORS headers (`Access-Control-Allow-Origin: *`) on all `/api/v1/*` routes are intentional — partner sites embed these from different origins.

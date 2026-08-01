---
name: b2b-api-health-check
description: >
  Verifies that all 3 Mirha & Co. B2B API endpoints (/api/v1/health, /api/v1/recommend, /api/v1/widget)
  are working correctly. Use this whenever touching app/api/v1/, lib/routineEngine.ts, lib/geocoding.ts,
  or when diagnosing 404s on any /api/v1/* route. Also handles the known Turbopack stale-cache bug that
  causes /api/v1/* to 404 even though files exist.
---

# B2B API Health Check Skill

## When to Use This Skill

Trigger this skill automatically whenever:
- You touch any file under `app/api/v1/`
- You modify `lib/routineEngine.ts` or `lib/geocoding.ts`
- Any `/api/v1/*` route returns a 404 in dev
- The user reports the B2B API is broken or not responding
- After a dev server restart (Turbopack cache may be stale)

---

## Step 1: Diagnose & Fix Turbopack Cache (Do This First)

### Known Bug
Next.js 16 + Turbopack has a bug where a **stale `.next/dev` cache causes all `/api/v1/*` routes to 404**,
even though the route files exist and compile correctly. The `/api/health` (non-v1) route continues to work,
which is the tell-tale sign of this specific bug.

### Diagnostic Signature
```
GET /api/v1/health  ->  404 (first hit ~29s, subsequent hits ~64ms)
GET /api/health     ->  200  <- still works, confirming its the cache bug
```

### Fix
```powershell
# Step 1: Kill any running dev server (Ctrl+C or kill the task)
# Step 2: Clear the stale Turbopack dev cache
Remove-Item -Recurse -Force .next\dev -ErrorAction SilentlyContinue
# Step 3: Restart fresh
npm run dev
```

After restarting, wait for the "Ready" message before testing again. The first request to each
route will be slow (~1-2s) as Turbopack compiles it fresh. That is normal.

---

## Step 2: Run the Full B2B Verification Suite

Run these in PowerShell from the project root (e:\MirhaProjects\mirha-and-co):

```powershell
# Test 1: Health
$h = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/health" -TimeoutSec 60
Write-Host "Health: $($h.StatusCode)"   # MUST be 200

# Test 2: Widget
$w = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/widget?apiKey=b2b_trial_key&skinType=oily&mainConcern=acne" -TimeoutSec 60
Write-Host "Widget: $($w.StatusCode) | CT: $($w.Headers['Content-Type'])"   # 200, application/javascript

# Test 3: Recommend (trial key)
$body = '{"apiKey":"b2b_trial_key","skinType":"oily","mainConcern":"acne","city":"Mumbai","country":"IN"}'
$r = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/recommend" -Method POST -ContentType "application/json" -Body $body -TimeoutSec 60
Write-Host "Recommend: $($r.StatusCode) | success: $(($r.Content | ConvertFrom-Json).success)"  # 200, True

# Test 4: Auth guard (expect 401)
try { Invoke-WebRequest -Uri "http://localhost:3000/api/v1/recommend" -Method POST -ContentType "application/json" -Body '{"skinType":"oily"}' -TimeoutSec 10 }
catch { Write-Host "Auth guard: $($_.Exception.Response.StatusCode.value__)" }  # MUST be 401

# Test 5: Input validation (expect 400)
try { Invoke-WebRequest -Uri "http://localhost:3000/api/v1/recommend" -Method POST -ContentType "application/json" -Body '{"apiKey":"b2b_trial_key","skinType":"bad"}' -TimeoutSec 10 }
catch { Write-Host "Validation: $($_.Exception.Response.StatusCode.value__)" }  # MUST be 400

# Test 6: CORS preflight (expect 204)
$o = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/recommend" -Method OPTIONS -TimeoutSec 10
Write-Host "CORS preflight: $($o.StatusCode)"  # MUST be 204
```

---

## Step 3: Pass/Fail Criteria

| Test | Expected |
|------|----------|
| GET /api/v1/health | 200, body contains "mirha-b2b-api" |
| GET /api/v1/widget | 200, Content-Type: application/javascript, CORS * |
| POST /api/v1/recommend (trial) | 200, success: true, non-empty cleanser.name |
| Missing API key | 401 |
| Invalid skinType | 400 |
| OPTIONS preflight | 204, Access-Control-Allow-Methods: POST, OPTIONS |

If any test fails, go back to Step 1 and clear the Turbopack cache first.
If clearing cache does not help, check for TypeScript errors in app/api/v1/recommend/route.ts or lib/geocoding.ts.

---

## Key Files - Handle With Care

| File | Risk |
|------|------|
| app/api/v1/recommend/route.ts | Core B2B revenue endpoint - quota billing logic lives here |
| app/api/v1/widget/route.ts | Embedded in partner sites - breaking changes affect external customers |
| app/api/v1/health/route.ts | Used by partner uptime monitors - keep it dead simple |
| lib/routineEngine.ts | Any change affects ALL B2B recommendation output |
| lib/geocoding.ts | Offline fallback must always work - do not require live API |

## Critical Invariants - Never Remove These

1. Trial key bypass: apiKey === "b2b_trial_key" must ALWAYS work without any DB lookup.
2. Monthly quota enforcement: usageThisMonth >= monthlyQuota check in recommend/route.ts - paying customers billed on this.
3. CORS star: All /api/v1/* routes must return Access-Control-Allow-Origin: * - partner sites are cross-origin.
4. Graceful geocoding fallback: If the live geocoding API is down, the endpoint must still return a recommendation using fallback climate data - never throw a 500.

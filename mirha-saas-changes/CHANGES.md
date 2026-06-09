# Mirha & Co. — SaaS Changes

This package contains the files needed to convert mirha-and-co from an
affiliate blog into a SaaS product with subscriptions, user accounts,
and retention mechanics.

---

## Files in this package

```
app/
  pricing/page.tsx          NEW — Pricing page (Free / Pro / Annual)
  dashboard/page.tsx        REPLACE — Updated dashboard shell
  dashboard/DashboardClient.tsx  NEW — Client dashboard with tabs

components/
  RoutineTracker.tsx        NEW — Daily check-in loop + streak tracker (Pro)
  IngredientConflictChecker.tsx  NEW — Cross-product conflict checker (Pro)
  ShareableRoutineCard.tsx  NEW — Copyable/shareable routine card

lib/
  auth.tsx                  NEW — Auth context, useAuth() hook, ProGate component
```

---

## Step-by-step integration

### 1. Add AuthProvider to your root layout

In `app/layout.tsx`, import and wrap children:

```tsx
import { AuthProvider } from "@/lib/auth";

// Inside your RootLayout:
<AuthProvider>
  {children}
</AuthProvider>
```

### 2. Add Pricing to your nav

In your `Header` or `Navbar` component, add:

```tsx
<Link href="/pricing">Pro</Link>
```

### 3. Replace your dashboard

Copy `app/dashboard/page.tsx` and `app/dashboard/DashboardClient.tsx`
into your repo's `app/dashboard/` directory.

### 4. Copy new components

Copy all files from `components/` into your repo's `components/` directory.

### 5. Wire up real auth

`lib/auth.tsx` ships with a **localStorage mock** so you can test
locally without a backend. Replace the `fetchSession`, `login`, and
`logout` functions with your real auth provider:

- **Clerk** (recommended for Next.js): https://clerk.com
- **Supabase Auth**: https://supabase.com/docs/guides/auth
- **NextAuth.js**: https://next-auth.js.org

### 6. Wire up payments

The pricing page links to `/api/auth/subscribe?plan=pro`.
Create that API route with Razorpay (India-first):

```
npm install razorpay
```

See: https://razorpay.com/docs/payments/payment-links/

### 7. Gate free vs. Pro features

Use the `ProGate` component anywhere you want to restrict content:

```tsx
import { ProGate } from "@/lib/auth";

<ProGate>
  {/* Only Pro users see this */}
  <FullIngredientReport />
</ProGate>
```

---

## What each file adds

| File | What it does |
|------|-------------|
| `pricing/page.tsx` | Full pricing page with Free / Pro / Annual plans, FAQ section |
| `lib/auth.tsx` | User context, isPro check, ProGate paywall wrapper |
| `dashboard/DashboardClient.tsx` | Tabbed dashboard with upgrade banner for free users |
| `RoutineTracker.tsx` | AM/PM routine display + daily check-in + streak counter |
| `IngredientConflictChecker.tsx` | Paste ingredients from 2 products, get conflict report |
| `ShareableRoutineCard.tsx` | One-tap copy/share of user's routine with affiliate links |

---

## Suggested next steps (not included)

- `/signup` and `/login` pages (use Clerk or Supabase UI)
- Persisting routines and check-ins to a database (Supabase/Postgres)
- Razorpay webhook to flip `user.plan` to `pro` on payment
- Email via Resend for welcome + weekly digest
- PWA manifest (`public/manifest.json`) for installability on mobile

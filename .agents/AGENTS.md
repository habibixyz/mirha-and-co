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

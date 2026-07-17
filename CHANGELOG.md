# Changelog

All notable changes to the **Mirha & Co.** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-07-18

### Added
- **SEO & Social Share Cards**: Added `metadataBase` and `canonical` URL routing in `app/(marketing)/layout.tsx` to enable Open Graph previews across Twitter, LinkedIn, and WhatsApp.
- **Dark Mode Theme Hardening**: Injected blocking early-theme detection scripts in marketing and SaaS layouts to prevent FOUC (Flash of Unstyled Content).
- **Theme-Aware Components**: Migrated hardcoded inline styles in `RoutineQuiz.tsx`, `RoutineResult.tsx`, `AffiliateCard.tsx`, and `SeoBlogPost.tsx` to high-contrast CSS variable overrides.
- **GitLab CI/CD Integration**: Added `.gitlab-ci.yml` pipeline configuration for automated builds.

### Fixed
- Fixed white background hover glitch on routine step cards and quiz options in dark mode.
- Resolved Next.js 16 `proxy.ts` and `middleware.ts` collision by consolidating auth middleware into `proxy.ts`.

---

## [1.0.0] - 2026-07-16

### Added
- Initial release of **Mirha & Co.** Skincare & Beauty SaaS platform.
- AI-Powered Skincare Diagnostics & Routine Generator (`/tools/routine`).
- Skincare Product Dupe Finder (`/tools/dupes`).
- Regional Hard Water Skin & Hair Damage Calculator (`/tools/hard-water`).
- B2B Skincare Intelligence API with HMAC authentication and key management.
- Dynamic Amazon India affiliate monetization engine.

# Internal Team Development Guidelines

Welcome to the internal development guide for **Mirha & Co.**

---

## Proprietary Software Notice

This repository contains proprietary source code owned exclusively by **Mirha & Co.** Access is granted strictly to authorized project contributors and team members.

---

## Local Development Setup

### Prerequisites
- **Node.js**: v18+ or v20+
- **npm**: v9+
- **PostgreSQL**: Local database or Railway instance

### Setup Steps
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

3. **Initialize Prisma Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run local dev server**:
   ```bash
   npm run dev
   ```

---

## Code Guidelines

- **TypeScript**: Mandatory strict typing across all route handlers and UI components.
- **Styling**: Standardize on Vanilla CSS variables with `.dark` root support. Avoid inline color overrides.
- **Production Build**: Verify `npx next build` before pushing any changes to `main`.

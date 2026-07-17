# Contributing to Mirha & Co.

Thank you for your interest in contributing to **Mirha & Co.**! We welcome contributions to improve our skincare AI tools, regional water diagnostic algorithms, and user interface.

---

## Getting Started

### Prerequisites
- **Node.js**: v18+ or v20+
- **npm**: v9+
- **PostgreSQL**: Local database or Railway instance

### Development Setup
1. **Clone the repository**:
   ```bash
   git clone https://gitlab.com/tanizcoldz/mirha-and-co.git
   cd mirha-and-co
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

4. **Initialize Prisma Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## Code Guidelines

- **TypeScript**: All new code should be written in TypeScript with proper type definitions.
- **Styling**: Standardize on Vanilla CSS and CSS variables. High-contrast dark mode support is mandatory (`html.dark .selector`). Avoid hardcoded inline hex colors in JSX.
- **Commits**: Write clear, imperative commit messages (e.g., `Fix dark mode FOUC in RoutineQuiz`).

---

## Submitting Pull Requests

1. Create a feature branch: `git checkout -b feature/your-feature-name`.
2. Ensure the production build passes cleanly: `npx next build`.
3. Open a Pull/Merge Request against the `main` branch.

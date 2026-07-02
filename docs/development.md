# FocusFlow Development Guide

**Last Updated:** July 2, 2026

This guide covers local development setup, coding standards, testing practices, and contribution workflows for FocusFlow.

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17 or higher ([Download](https://nodejs.org/))
- **pnpm** 8.0 or higher (`npm install -g pnpm`)
- **Docker** & **Docker Compose** ([Download](https://www.docker.com/products/docker-desktop/))
- **Git** 2.40 or higher

**Recommended (Optional):**
- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/akshatasawant9699/focusflow.git
cd focusflow

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Run database migrations (SQLite default)
pnpm db:push

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
focusflow/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Auth routes (login, signup)
│   ├── (dashboard)/       # Protected routes (today, focus, plans)
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── focus-mode/       # Focus mode components
│   ├── brain-dump/       # Brain dump modal
│   └── plan-card/        # Plan cards
├── lib/                   # Shared utilities
│   ├── db/               # Drizzle ORM setup
│   ├── auth/             # Authentication utilities
│   ├── utils/            # Helper functions
│   └── constants/        # App constants
├── public/                # Static assets
├── docs/                  # Documentation
├── scripts/               # Build/deployment scripts
├── tests/                 # Test files
│   ├── e2e/              # Playwright tests
│   └── unit/             # Vitest unit tests
├── .env.example           # Environment variables template
├── docker-compose.yml     # Docker setup
├── drizzle.config.ts      # Drizzle ORM config
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind CSS config
└── tsconfig.json          # TypeScript config
```

---

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
# Database (SQLite for local dev)
DATABASE_URL="file:./local.db"

# Auth (Lucia for self-hosted)
AUTH_SECRET="your-random-32-char-secret"

# Optional: For V1.1+ features
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
MICROSOFT_CLIENT_ID=""
MICROSOFT_CLIENT_SECRET=""
SALESFORCE_CLIENT_ID=""
SALESFORCE_CLIENT_SECRET=""
```

Generate `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

---

## Database Setup

FocusFlow uses **Drizzle ORM** with SQLite (local dev) and Postgres (production).

### Local Development (SQLite)

```bash
# Push schema to local SQLite database
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm db:studio
```

### Using Postgres (Optional)

```bash
# Start Postgres with Docker
docker-compose up -d postgres

# Update .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5432/focusflow"

# Run migrations
pnpm db:push
```

### Schema Changes

After modifying `lib/db/schema.ts`:

```bash
# Generate migration
pnpm db:generate

# Apply migration
pnpm db:migrate

# Or push directly (dev only)
pnpm db:push
```

---

## Running the App

### Development Mode

```bash
# Start Next.js dev server (hot reload enabled)
pnpm dev
```

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Docker (Self-Hosting Test)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## Code Standards

### TypeScript

- **Strict mode enabled** (`tsconfig.json` has `"strict": true`)
- **No `any` types** (use `unknown` and type guards)
- **Explicit return types** for functions

```typescript
// ✅ Good
export function calculateProgress(completed: number, total: number): number {
  return Math.round((completed / total) * 100);
}

// ❌ Bad
export function calculateProgress(completed, total) {
  return Math.round((completed / total) * 100);
}
```

### React Component Standards

```typescript
// ✅ Good: Functional component with proper types
interface PlanCardProps {
  plan: Plan;
  onStart: (planId: string) => void;
}

export function PlanCard({ plan, onStart }: PlanCardProps) {
  return (
    <div className="plan-card">
      <h3>{plan.title}</h3>
      <button onClick={() => onStart(plan.id)}>Start</button>
    </div>
  );
}

// ❌ Bad: No types, arrow function with implicit return
export const PlanCard = ({ plan, onStart }) => (
  <div className="plan-card">
    <h3>{plan.title}</h3>
    <button onClick={() => onStart(plan.id)}>Start</button>
  </div>
);
```

### Naming Conventions

- **Components:** PascalCase (`PlanCard.tsx`)
- **Functions:** camelCase (`calculateProgress`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_PLANS_VISIBLE`)
- **Files:** kebab-case for utilities (`parse-task-list.ts`)

### Styling (Tailwind CSS)

```tsx
// ✅ Good: Use Tailwind utility classes
<div className="flex items-center justify-between p-4 rounded-lg bg-gray-100">
  <h2 className="text-xl font-semibold">Today's Focus</h2>
</div>

// ❌ Bad: Inline styles or custom CSS
<div style={{ display: 'flex', padding: '16px' }}>
  <h2 style={{ fontSize: '20px' }}>Today's Focus</h2>
</div>
```

For complex components, use `cn()` helper:

```tsx
import { cn } from '@/lib/utils';

<button 
  className={cn(
    "px-4 py-2 rounded-md font-medium",
    isActive && "bg-blue-600 text-white",
    isDisabled && "opacity-50 cursor-not-allowed"
  )}
>
  Start Focus
</button>
```

---

## Testing

### Unit Tests (Vitest)

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

**Example Test:**

```typescript
// tests/unit/parse-task-list.test.ts
import { describe, it, expect } from 'vitest';
import { parseTaskList } from '@/lib/utils/parse-task-list';

describe('parseTaskList', () => {
  it('parses numbered list', () => {
    const input = '1. Write outline\n2. Draft introduction\n3. Proofread';
    const result = parseTaskList(input);
    
    expect(result).toHaveLength(3);
    expect(result[0].text).toBe('Write outline');
    expect(result[1].order).toBe(2);
  });

  it('handles empty input', () => {
    const result = parseTaskList('');
    expect(result).toEqual([]);
  });
});
```

### End-to-End Tests (Playwright)

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests in UI mode
pnpm test:e2e:ui

# Run specific test file
pnpm test:e2e tests/e2e/focus-mode.spec.ts
```

**Example E2E Test:**

```typescript
// tests/e2e/focus-mode.spec.ts
import { test, expect } from '@playwright/test';

test('can start focus session from paste-and-go', async ({ page }) => {
  await page.goto('/');
  
  // Paste task list
  await page.fill('[data-testid="paste-input"]', '1. Write tests\n2. Fix bug');
  await page.click('[data-testid="create-plan"]');
  
  // Start focus session
  await page.click('[data-testid="start-focus"]');
  
  // Verify focus mode is active
  await expect(page.locator('[data-testid="focus-mode"]')).toBeVisible();
  await expect(page.locator('[data-testid="current-step"]')).toHaveText('Write tests');
});
```

---

## Linting & Formatting

```bash
# Run ESLint
pnpm lint

# Fix ESLint issues
pnpm lint:fix

# Format with Prettier
pnpm format

# Check formatting
pnpm format:check
```

**Pre-commit Hook (Husky):**

Husky runs linting and formatting automatically before each commit.

```bash
# Install Husky hooks
pnpm prepare
```

---

## Git Workflow

### Branching Strategy

- `main` — Production-ready code
- `develop` — Integration branch (not used for solo dev; merges to main)
- Feature branches: `feature/paste-and-go`, `feature/focus-mode`
- Bug fixes: `fix/timer-not-stopping`, `fix/brain-dump-crash`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add paste-and-go plan import
fix: resolve timer not stopping on completion
docs: update development setup guide
chore: upgrade Next.js to 14.2
refactor: extract timer logic into hook
test: add E2E tests for focus mode
```

### Pull Request Process

1. **Create feature branch:**
   ```bash
   git checkout -b feature/brain-dump-modal
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat: add brain dump modal with voice capture"
   ```

3. **Push to GitHub:**
   ```bash
   git push origin feature/brain-dump-modal
   ```

4. **Open Pull Request:**
   - Use PR template (`.github/PULL_REQUEST_TEMPLATE.md`)
   - Link related issue (e.g., "Closes #12")
   - Add screenshots/videos for UI changes

5. **Address review feedback:**
   ```bash
   git add .
   git commit -m "refactor: simplify brain dump state management"
   git push origin feature/brain-dump-modal
   ```

6. **Merge after approval:**
   - Squash and merge (keeps history clean)
   - Delete branch after merge

---

## Common Tasks

### Adding a New Component

```bash
# Create component file
touch components/session-timer/SessionTimer.tsx

# Add component code
cat > components/session-timer/SessionTimer.tsx << 'EOF'
import { useState, useEffect } from 'react';

interface SessionTimerProps {
  duration: number; // seconds
  onComplete: () => void;
}

export function SessionTimer({ duration, onComplete }: SessionTimerProps) {
  const [remaining, setRemaining] = useState(duration);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining, onComplete]);

  return (
    <div className="text-4xl font-mono">
      {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}
    </div>
  );
}
EOF

# Add tests
touch tests/unit/session-timer.test.ts
```

### Adding a New API Route

```bash
# Create API route
touch app/api/plans/route.ts

# Add route handler
cat > app/api/plans/route.ts << 'EOF'
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { plans } from '@/lib/db/schema';

export async function GET() {
  try {
    const allPlans = await db.select().from(plans);
    return NextResponse.json(allPlans);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}
EOF
```

### Adding a Database Table

```typescript
// lib/db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  stepId: text('step_id'),
  durationSeconds: integer('duration_seconds').notNull(),
  energyLevel: text('energy_level'), // 'low' | 'medium' | 'high'
  focusQuality: text('focus_quality'), // 'distracted' | 'ok' | 'locked_in'
  startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
  endedAt: integer('ended_at', { mode: 'timestamp' }),
});
```

Then run migrations:
```bash
pnpm db:generate
pnpm db:migrate
```

---

## Debugging

### VS Code Launch Configuration

`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "pnpm dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Logging

```typescript
// Use debug logger in development
if (process.env.NODE_ENV === 'development') {
  console.log('[FocusMode] Timer started:', { duration, stepId });
}

// Use structured logging in production
import { logger } from '@/lib/logger';
logger.info('Timer started', { duration, stepId, userId });
```

---

## Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
ANALYZE=true pnpm build
```

### Image Optimization

```tsx
// Use Next.js Image component
import Image from 'next/image';

<Image 
  src="/hero.png" 
  alt="FocusFlow" 
  width={800} 
  height={600} 
  priority // for above-the-fold images
/>
```

### Code Splitting

```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic';

const FocusMode = dynamic(() => import('@/components/focus-mode/FocusMode'), {
  loading: () => <p>Loading focus mode...</p>,
  ssr: false // Don't render on server
});
```

---

## Troubleshooting

### "Module not found" errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Database migration issues

```bash
# Reset database (WARNING: deletes all data)
rm local.db
pnpm db:push
```

### Port 3000 already in use

```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

---

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Drizzle ORM Docs:** https://orm.drizzle.team
- **shadcn/ui Docs:** https://ui.shadcn.com
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Vitest Docs:** https://vitest.dev
- **Playwright Docs:** https://playwright.dev

---

## Getting Help

- **GitHub Discussions:** [Ask questions](https://github.com/akshatasawant9699/focusflow/discussions)
- **GitHub Issues:** [Report bugs](https://github.com/akshatasawant9699/focusflow/issues)
- **Discord:** Coming soon (V1.2+)

---

**Maintained by:** [@akshatasawant9699](https://github.com/akshatasawant9699)

Last updated: July 2, 2026
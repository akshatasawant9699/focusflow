# Contributing to FocusFlow

Thank you for considering contributing to FocusFlow. This is a pro bono community project built by and for people with ADHD. Every contribution helps.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [How to Contribute](#how-to-contribute)
5. [Coding Standards](#coding-standards)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Issue Guidelines](#issue-guidelines)
9. [Testing Requirements](#testing-requirements)
10. [Design Contributions](#design-contributions)
11. [Documentation Contributions](#documentation-contributions)
12. [Community Guidelines](#community-guidelines)

## Code of Conduct

FocusFlow is built for and by the neurodivergent community. We maintain a welcoming, shame-free environment.

**Expected behavior**:
- Assume good intent
- Use clear, direct language
- Respect cognitive differences
- Be patient with response times (maintainers are volunteers)
- Provide context when needed
- Accept feedback gracefully

**Unacceptable behavior**:
- Stigmatizing language about ADHD or mental health
- Pressure to work faster or outside stated availability
- Dismissing accessibility concerns
- Hostile or condescending communication
- Harassment of any kind

Violations will result in a warning, temporary ban, or permanent ban depending on severity. Report issues to the project maintainers.

## Getting Started

### Good First Issues

New to the project? Look for issues labeled:
- `good first issue` - Well-scoped, beginner-friendly tasks
- `help wanted` - Issues where maintainers specifically need help
- `documentation` - Improvements to docs, guides, or comments

Browse: [Good First Issues](https://github.com/akshatasawant9699/focusflow/labels/good%20first%20issue)

### Before You Start

1. Check if an issue already exists for what you want to work on
2. If not, create an issue describing the problem or feature
3. Wait for maintainer feedback before starting significant work
4. Comment on the issue to claim it (prevents duplicate work)
5. Fork the repository and create a branch from `main`

## Development Setup

### Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose (for local database)
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/focusflow
cd focusflow

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start local Postgres (or use SQLite by setting DATABASE_MODE=sqlite)
docker compose up -d postgres

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Open http://localhost:3000

### Database Options

**SQLite (simplest)**:
```bash
# In .env.local
DATABASE_MODE=sqlite
```

**Postgres (recommended for contributors working on DB features)**:
```bash
# In .env.local
DATABASE_MODE=postgres
DATABASE_URL=postgresql://focusflow:focusflow@localhost:5432/focusflow
```

### Running Tests

```bash
# Unit and integration tests
npm test

# E2E tests (requires app running)
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

### Accessibility Testing

```bash
# Automated accessibility checks
npm run test:a11y

# Manual testing checklist
# - Keyboard navigation (Tab, Enter, Esc work as expected)
# - Screen reader (NVDA on Windows, VoiceOver on Mac)
# - Reduced motion mode (test with prefers-reduced-motion enabled)
```

## How to Contribute

### Types of Contributions

We welcome:
- **Bug fixes**: Fixes for broken functionality
- **Features**: New capabilities within MVP or roadmap scope
- **Tests**: Unit, integration, or E2E test coverage
- **Documentation**: Guides, API docs, code comments, examples
- **Design**: UI/UX improvements, accessibility fixes
- **Translations**: Internationalization support (post-MVP)
- **Parser improvements**: Better paste detection for Goblin, ChatGPT, Claude outputs

### What We're Not Looking For (Yet)

- Features outside the MVP scope (see roadmap)
- Rewrites of working code without measurable improvement
- New dependencies without strong justification
- AI-powered features (we're BYOK only, by design)
- Gamification beyond soft streaks (can cause shame for ADHD users)

## Coding Standards

### TypeScript

- All new code must be TypeScript with strict mode enabled
- No `any` types unless absolutely necessary (document why)
- Use `interface` for public APIs, `type` for unions/intersections
- Prefer functional components and hooks over class components

### React Patterns

- Use React Server Components by default (Next.js App Router)
- Client components only when necessary (interactivity, hooks, browser APIs)
- Collocate components with their usage
- Keep components under 250 lines (extract sub-components if larger)

### CSS and Styling

- Tailwind CSS utility classes for styling
- Use design tokens from `tailwind.config.ts` (no hardcoded colors)
- Follow the design system in `docs/design-principles.md`
- Respect `prefers-reduced-motion` for all animations
- Test in dark mode

### File Organization

```
app/                    # Next.js App Router pages
components/             # Shared React components
  ui/                   # shadcn/ui components
  features/             # Feature-specific components
lib/                    # Shared utilities and logic
db/                     # Database schema and migrations
  schema/               # Drizzle schema definitions
  migrations/           # SQL migrations
hooks/                  # Custom React hooks
types/                  # TypeScript type definitions
public/                 # Static assets
docs/                   # Documentation
```

### Naming Conventions

- **Files**: `kebab-case.ts`, `PascalCase.tsx` for components
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `SCREAMING_SNAKE_CASE`
- **Database tables**: `snake_case`
- **CSS classes**: Tailwind utilities (no custom classes unless necessary)

### Comments

Default to writing no comments. Only add comments when:
- The WHY is non-obvious (hidden constraint, subtle invariant, workaround)
- Behavior would surprise a future reader
- Documenting a public API or complex algorithm

Do not comment WHAT the code does (good naming should make it clear) or reference current tasks/PRs (that context belongs in commit messages).

### Error Handling

- User-facing errors must have shame-free, actionable messages
- Log errors with context for debugging
- Never expose stack traces to users
- Use error boundaries for React component errors

Example:
```typescript
// Good
throw new Error("We couldn't save your plan. Check your connection and try again.")

// Bad
throw new Error("Database write failed: ECONNREFUSED")
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring (no behavior change)
- `test`: Adding or updating tests
- `chore`: Build, CI, dependencies, tooling

**Scope** (optional): Area of codebase (e.g., `parser`, `focus-session`, `ui`, `db`)

**Subject**: Short description (50 chars or less), imperative mood

**Body** (optional): Detailed explanation of what and why (not how)

**Footer** (optional): Reference issues (`Closes #123`) or breaking changes

### Examples

```
feat(parser): support Goblin.tools indented format

Detects nested bullet points from Goblin output and flattens
to a linear step list for V1. Preserves order and strips indent.

Closes #45
```

```
fix(focus-session): prevent timer from continuing after tab close

Sessions now auto-end after 10 minutes of tab inactivity.
Logs session as 'abandoned' rather than leaving it open indefinitely.

Fixes #78
```

```
docs: add self-hosting guide for SQLite mode

Clarifies that SQLite requires no Postgres container and is
suitable for single-user self-hosted instances.
```

## Pull Request Process

### Before Submitting

1. **Branch naming**: `feat/short-description`, `fix/short-description`, `docs/short-description`
2. **Tests pass**: Run `npm test` and `npm run test:e2e` locally
3. **Lint passes**: Run `npm run lint` and fix issues
4. **Types pass**: Run `npm run type-check`
5. **Manual testing**: Test your changes in the browser
6. **Accessibility check**: Verify keyboard navigation and reduced-motion mode

### PR Description Template

```markdown
## What does this PR do?

Brief description of the change.

## Why is this change needed?

Context on the problem being solved or feature being added.

## How was this tested?

- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing in browser
- [ ] Keyboard navigation tested
- [ ] Reduced motion mode tested
- [ ] Screen reader tested (if UI change)

## Related issues

Closes #123
Relates to #456

## Screenshots (if applicable)

Before/after screenshots for UI changes.

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Comments added for non-obvious parts
- [ ] Documentation updated (if needed)
- [ ] No breaking changes (or documented in PR)
- [ ] Commits follow commit message guidelines
```

### Review Process

1. Maintainers will review within 3-7 days (they're volunteers, be patient)
2. Address feedback with new commits (don't force-push during review)
3. Once approved, maintainers will merge
4. CI must pass before merge (tests, lint, build)

### What Makes a Good PR

- **Small and focused**: One logical change per PR
- **Well-tested**: Includes relevant tests
- **Clear description**: Explains what, why, and how
- **No unrelated changes**: Separate concerns into separate PRs
- **Follows conventions**: Matches project code style and patterns

## Issue Guidelines

### Reporting Bugs

Use the bug report template. Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (browser, OS, self-hosted or hosted)
- Screenshots or error messages
- Whether you're willing to submit a PR

### Requesting Features

Use the feature request template. Include:
- Problem being solved
- Proposed solution
- Alternatives considered
- How it aligns with project goals (execution layer, ADHD-first design)
- Whether you're willing to implement it

### Asking Questions

Use GitHub Discussions for questions. Issues are for actionable bugs and features only.

## Testing Requirements

### Unit Tests

Required for:
- Business logic (parser, session calculations, time externalization)
- Utilities and helpers
- Custom hooks
- Database queries (use test database)

Use Jest and React Testing Library.

### Integration Tests

Required for:
- API endpoints
- Database operations (Postgres and SQLite)
- Auth flows

### E2E Tests

Required for:
- Critical user journeys (paste, save, focus, complete)
- Focus session flow
- Brain dump capture
- Self-host mode

Use Playwright. Tests must pass in both hosted and self-host configurations.

### Parser Corpus Tests

The parser has a corpus of real-world inputs in `tests/fixtures/parser-corpus/`. When adding parser improvements:
1. Add your test case to the corpus (anonymized if needed)
2. Update snapshot tests
3. Document the format in `docs/parser-formats.md`

### Accessibility Tests

- Automated: `npm run test:a11y` runs axe-core checks
- Manual: Test with keyboard, screen reader, and reduced-motion mode
- Required before merging UI changes

## Design Contributions

FocusFlow follows ADHD-specific design principles. All design changes must align with these constraints.

### Design Principles

1. **Calm-warm baseline, energy earned**: Default state is soft pastels and stillness. Celebrations are brief and bright.
2. **Three is the maximum**: No more than 3 options, plans, or suggestions on a primary view.
3. **No shame UI**: No red badges, no guilt copy, no "you missed X days" language.
4. **Time as shapes**: Durations must be visual (progress bars, arcs, circles) not just numerals.
5. **Generous whitespace**: Reduce visual density. One focal element per view.

See [docs/design-principles.md](docs/design-principles.md) for complete guidelines.

### Design Tokens

All colors, spacing, and typography are defined in `tailwind.config.ts`. Do not hardcode values.

Example:
```tsx
// Good
<div className="bg-accent-warm text-text-primary rounded-card p-4">

// Bad
<div style={{ backgroundColor: '#FFB89A', color: '#2D2A26', borderRadius: '16px', padding: '1rem' }}>
```

### Submitting Design Changes

1. Create an issue with mockups or Figma links
2. Get maintainer approval before implementing
3. Submit PR with before/after screenshots
4. Include accessibility notes (color contrast, motion)

## Documentation Contributions

Documentation improvements are always welcome. Types of docs:

- **User guides**: How to use features (in `/docs`)
- **Developer guides**: How to build, test, deploy
- **API documentation**: Endpoint specs and examples
- **Code comments**: Non-obvious logic only
- **Design principles**: ADHD-specific constraints

### Documentation Standards

- Write in Markdown
- Use clear, direct language
- Avoid jargon (or define it on first use)
- Include examples and screenshots where helpful
- Test instructions (can someone follow them successfully?)

## Community Guidelines

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions, ideas, community support
- **Pull Requests**: Code review and technical discussion

### Response Time Expectations

This is a pro bono project maintained by volunteers. Response times vary:
- Simple PRs: 3-7 days
- Complex PRs: 1-2 weeks
- Issues: 1-2 weeks
- Questions in Discussions: Community-driven (may be faster)

If you don't hear back within these windows, a polite ping is welcome.

### Recognition

Contributors will be:
- Listed in `CONTRIBUTORS.md`
- Mentioned in release notes for significant contributions
- Credited in commit history

We do not offer financial compensation (this is a pro bono project), but we deeply appreciate every contribution.

## Questions?

- Read the [FAQ](docs/faq.md)
- Check [GitHub Discussions](https://github.com/akshatasawant9699/focusflow/discussions)
- Review [existing issues](https://github.com/akshatasawant9699/focusflow/issues)

Thank you for contributing to FocusFlow.

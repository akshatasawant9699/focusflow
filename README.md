# FocusFlow

Open-source focus companion for ADHD brains. You broke it down. Now do it.

## What is FocusFlow?

FocusFlow is the execution layer for people with ADHD. Tools like Goblin.tools, ChatGPT, and Claude are great at breaking tasks into steps. None of them help you actually do the steps. You close the tab and the breakdown evaporates.

FocusFlow picks up where breakdown tools stop. Paste a list of steps from anywhere and FocusFlow walks you through them, one focus session at a time. It defends your attention, externalizes time, parks distractions, and lets you celebrate small wins.

**Free forever. Open source. Privacy-first. Self-hostable. Built by and for the neurodivergent community.**

## Core Features

- **Paste-and-go**: Copy steps from Goblin.tools, ChatGPT, Claude, or your notes. Paste them into FocusFlow. Start working in under 15 seconds.
- **Single-task focus mode**: Fullscreen view with only the current step, visible countdown timer, and distraction parking. No navigation, no sidebar, no other steps.
- **Brain dump capture**: Global hotkey to capture thoughts without losing focus. Voice or text. Thoughts stay tagged to the session.
- **Time externalization**: All durations shown visually as shapes and progress indicators, not just numbers.
- **No shame UI**: No overdue badges, no guilt copy. Grace days on streaks. Reframes as "let's pick up here" instead of "you failed."
- **Self-hostable**: Run on your own hardware with `docker compose up`. SQLite or Postgres. Zero telemetry by default.

## Why FocusFlow exists

The ADHD productivity market is full of breakdown tools and scheduling tools. The gap nobody fills is the bridge from "I have a plan" to "I'm doing the thing." That's the gap FocusFlow fills.

We deliberately do not build an AI breakdown engine. We accept output from tools you already use. This keeps the scope tight, the cost zero, and positions FocusFlow as a community ally rather than a competitor.

## Getting Started

### Hosted version (recommended for most users)

Coming soon. Sign up for early access at [focusflow.app](https://focusflow.app)

### Self-hosting

Requirements: Docker and Docker Compose installed.

```bash
git clone https://github.com/akshatasawant9699/focusflow
cd focusflow
cp .env.example .env
docker compose up
```

Open http://localhost:3000

The default setup uses SQLite and requires no external services. For Postgres mode and advanced configuration, see [docs/self-hosting.md](docs/self-hosting.md).

## Project Status

FocusFlow is in active development. V1.0 MVP is targeted for 6-8 weeks from project start.

**Current status**: Repository initialization and architecture planning.

**MVP scope**:
- Paste-and-go task import with automatic list parsing
- Manual plan creation with rule-based skeleton fallback
- Single-task focus mode with timer and distraction parking
- Today view showing top 3 active plans
- Brain dump with global hotkey and voice capture
- Energy and mood logging
- Soft gamification (focus session streaks with grace days)
- Docker-based self-hosting with SQLite and Postgres support

**Not in MVP**: Calendar integration, browser extension, BYOK AI, body doubling, mobile native apps, Microsoft Graph, realtime cross-device sync.

See [docs/roadmap.md](docs/roadmap.md) for the full roadmap.

## Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **State management**: React Server Components, Zustand
- **Database**: Drizzle ORM (supports Postgres and SQLite)
- **Auth (hosted)**: Supabase Auth
- **Auth (self-host)**: Lucia or NextAuth with magic link
- **Deployment (hosted)**: Vercel + Supabase free tiers
- **Deployment (self-host)**: Docker Compose
- **License**: MIT

## Contributing

FocusFlow is a pro bono community project. Contributions are welcome and encouraged.

Before contributing, please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines, development setup, and code standards.

Quick links:
- [Good first issues](https://github.com/akshatasawant9699/focusflow/labels/good%20first%20issue)
- [Help wanted](https://github.com/akshatasawant9699/focusflow/labels/help%20wanted)
- [Development setup](docs/development.md)

## Design Principles

FocusFlow follows ADHD-specific design constraints:

1. **Decisions are expensive**: Default everything sensibly. Settings are progressive disclosure.
2. **Three is the maximum**: Never present more than 3 plans, 3 options, 3 suggestions on a primary view.
3. **No shame UI**: No red overdue badges, no guilt copy. Reframe as progress, not failure.
4. **Time must be visible**: Always show duration as a shape, not just a number.
5. **Hyperfocus is a risk, not a goal**: Build in stops, not just streaks.
6. **Capture must be lighter than thinking**: If capture takes effort, the thought is lost.
7. **Reduce, don't add**: Every feature is challenged on whether it reduces executive load or transfers it.

See [docs/design-principles.md](docs/design-principles.md) for the complete list.

## Privacy and Data

**Hosted version**:
- All user data encrypted at rest and in transit
- No data sale, no tracking beyond essential analytics (opt-in)
- OAuth tokens encrypted with AES-256
- GDPR and CCPA compliant
- EU and US data residency options

**Self-hosted version**:
- You own your data completely
- Zero outbound network calls except user-initiated OAuth
- No telemetry by default
- SQLite file or Postgres database you control
- Export your data as JSON at any time

## Documentation

- [Product Requirements Document](docs/PRD.md) - Full product specification
- [Development Setup](docs/development.md) - Local development guide
- [Self-Hosting Guide](docs/self-hosting.md) - Deployment options and configuration
- [API Documentation](docs/api.md) - REST API specifications
- [Design Principles](docs/design-principles.md) - ADHD-specific design constraints
- [Roadmap](docs/roadmap.md) - Feature timeline and priorities

## Community and Support

- **Issues**: [GitHub Issues](https://github.com/akshatasawant9699/focusflow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/akshatasawant9699/focusflow/discussions)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

FocusFlow is licensed under the [MIT License](LICENSE). Free to use, modify, and distribute.

## Acknowledgments

FocusFlow is inspired by and designed to complement:
- [Goblin.tools](https://goblin.tools) by Bram De Buyser - The gold standard for task breakdown
- The ADHD community on Reddit, Discord, and beyond
- Open source productivity tools that prioritize user agency over engagement metrics

## Maintainers

- Project Lead: [@akshatasawant9699](https://github.com/akshatasawant9699)

This is a pro bono community project. Maintainers volunteer their time. Please be patient and respectful.

# 🌱 FocusFlow

**You broke it down. Now do it.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Project Status: Pre-MVP](https://img.shields.io/badge/status-pre--MVP-yellow)](docs/roadmap.md)

Open-source focus companion that helps ADHD brains execute task breakdowns without overwhelm.

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

## Why FocusFlow Exists

The ADHD productivity market is fragmented across breakdown tools (Goblin.tools, ChatGPT), planning tools (Notion, Tiimo), and accountability tools (Focusmate, Beeminder). **None bridge the execution gap** between "I have a plan" and "I'm doing the thing."

### The Execution Gap

**Breakdown tools** (Goblin.tools, ChatGPT, Motion AI)  
✅ Great at: Splitting tasks into steps  
❌ Missing: Any help actually doing the steps

**Planning tools** (Notion, Tiimo, Structured)  
✅ Great at: Organizing and visualizing tasks  
❌ Missing: Real-time focus support and distraction management

**Accountability tools** (Focusmate, Flow Club, Beeminder)  
✅ Great at: Social pressure and commitment  
❌ Missing: Spontaneous support (require pre-booking), task integration

**FocusFlow bridges all three:**  
✨ Accepts breakdowns from any source (paste-and-go)  
🎯 Provides real-time focus scaffolding (single-task mode, brain dumps)  
🔥 Offers gentle accountability (streaks with grace days, no shame UI)

### Positioning

We deliberately **do not** build an AI breakdown engine. We accept output from tools you already use. This keeps the scope tight, the cost zero, and positions FocusFlow as a **community ally**, not a competitor.

See [docs/PRD.md](docs/PRD.md) for detailed competitive analysis of 20+ tools.

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

**Current Phase:** Pre-MVP (Week 0)  
**V1.0 MVP Target:** Mid-August 2026 (8-week build)  
**Latest Update:** July 2, 2026

### What's Complete ✅
- Comprehensive PRD with market analysis
- Technical architecture defined
- ADHD-specific design principles documented
- 4 user personas validated
- Repository structure and documentation

### What's Next 🔨
- Set up Next.js 14 + Drizzle ORM project structure
- Build paste-and-go parser (FR-001)
- Implement single-task focus mode (FR-002)
- Create brain dump capture system (FR-003)

### V1.0 MVP Scope

**Core Features (P0 — Must Have):**
- ✨ Paste-and-go task import with automatic list parsing
- 🎯 Single-task focus mode with timer and distraction parking
- 🧠 Brain dump capture (global hotkey + voice)
- 📋 Today view showing top 3 active plans
- 📝 Manual plan creation with rule-based skeleton fallback
- 💭 Energy and mood logging post-session
- 🔥 Soft gamification (focus session streaks with grace days)
- 🐳 Docker-based self-hosting (SQLite + Postgres support)

**Not in MVP:** Calendar integration, browser extension, BYOK AI, body doubling, mobile native apps, Microsoft Graph, realtime cross-device sync (all planned for V1.1+)

### Success Metrics (V1.0 Launch)
- 50+ GitHub stars in first 2 weeks
- 10+ successful self-hosting deployments
- 3+ organic ADHD community mentions
- 5+ user interviews confirm execution gap hypothesis

See [docs/roadmap.md](docs/roadmap.md) for the complete feature timeline and [docs/PRD.md](docs/PRD.md) for detailed requirements.

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

- 📋 **[Product Requirements Document](docs/PRD.md)** - Full product specification with market analysis
- 🗺️ **[Roadmap](docs/roadmap.md)** - Feature timeline from V1.0 MVP to V2.0+
- 🎨 **[Design Principles](docs/design-principles.md)** - 7 ADHD-specific design constraints
- 💻 **[Development Setup](docs/development.md)** - Local development, code standards, testing
- 🐳 **[Self-Hosting Guide](docs/self-hosting.md)** - Docker deployment, backups, security
- 📊 **[Notion Workspace](https://app.notion.com/p/FocusFlow-Project-Workspace-34ff086412b581fd9a0fe07e16055604)** - SDLC tasks, personas, risks register

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

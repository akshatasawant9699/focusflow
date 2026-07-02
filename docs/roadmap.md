# FocusFlow Roadmap

**Last Updated:** July 2, 2026  
**Version:** 1.0

This roadmap outlines the development timeline and feature priorities for FocusFlow. As a pro bono community project, timelines are estimates and may shift based on contributor availability and user feedback.

---

## Current Status: Pre-MVP (Week 0)

🎯 **Goal:** Validate execution gap hypothesis and build V1.0 MVP in 8 weeks

**What's Done:**
- ✅ Repository initialized with MIT license
- ✅ Comprehensive PRD v3.0 completed
- ✅ Market research (20+ competitive tools analyzed)
- ✅ Personas validated (4 user archetypes)
- ✅ Technical architecture defined
- ✅ ADHD design principles documented

**What's Next:**
- 🔨 Set up Next.js 14 project structure
- 🔨 Configure Drizzle ORM + database schema
- 🔨 Build core UI components (shadcn/ui)
- 🔨 Implement paste-and-go parser

---

## V1.0 MVP — "Execution Layer" (Weeks 1-8)

**Target Launch:** Mid-August 2026  
**Theme:** Bridge the gap from breakdown to execution

### Core Features (P0 — Must Have)

#### FR-001: Paste-and-Go Plan Import ✨
**Status:** Not started  
**Timeline:** Week 1  
**Description:** Accept task lists from any source and parse into actionable plans in <15 seconds

**Acceptance Criteria:**
- Single input field (no multi-step forms)
- Auto-detect list formats (numbered, bullets, Markdown, plaintext)
- Preview before creating plan
- Handle nested lists and prose fallback

---

#### FR-002: Single-Task Focus Mode 🎯
**Status:** Not started  
**Timeline:** Week 2  
**Description:** Fullscreen view with only current step, timer, and essential controls

**Acceptance Criteria:**
- Fullscreen overlay (no distractions)
- Countdown timer (numeric + progress ring)
- Three actions: Done, Brain Dump, Take Break
- High-contrast WCAG AAA compliant
- Subtle breathing animation

---

#### FR-003: Distraction Parking (Brain Dump) 🧠
**Status:** Not started  
**Timeline:** Week 2  
**Description:** Capture intrusive thoughts without leaving focus mode

**Acceptance Criteria:**
- Global hotkey (Cmd+Shift+D / Ctrl+Shift+D)
- In-session button
- Text + voice capture (Web Speech API)
- Auto-save with timestamp
- Accessible in post-session review

---

#### FR-004: Today View (Top 3 Plans) 📋
**Status:** Not started  
**Timeline:** Week 3  
**Description:** Dashboard showing 3 most urgent active plans

**Acceptance Criteria:**
- Show exactly 3 plans max
- Visual progress bars (not just percentages)
- Next step preview
- "Start Focus Session" button
- Sort by due date or recent activity

---

#### FR-005: Manual Plan Creation 📝
**Status:** Not started  
**Timeline:** Week 3  
**Description:** Fallback manual creation with smart suggestions

**Acceptance Criteria:**
- Rule-based step skeleton suggestions
- Keywords: "Write", "Code", "Study" trigger templates
- User can edit/reorder suggestions
- Generic fallback: Prepare → Do → Wrap up

---

#### FR-006: Energy & Mood Logging 💭
**Status:** Not started  
**Timeline:** Week 4  
**Description:** Post-session 2-question check-in

**Acceptance Criteria:**
- "How was your energy?" (Low/Medium/High)
- "How was your focus?" (Distracted/OK/Locked In)
- Optional notes field (collapsed by default)
- Skip button (no guilt)
- Non-judgmental language

---

#### FR-007: Focus Session Streaks 🔥
**Status:** Not started  
**Timeline:** Week 4  
**Description:** Track consecutive days with ≥1 session, with grace days

**Acceptance Criteria:**
- Display current streak on Today view
- Grace days: 1 missed day doesn't break streak
- Visual indicator for grace day used
- Streak history graph (30 days)
- Positive reframe on resets

---

#### FR-008: Self-Hosting with Docker 🐳
**Status:** Not started  
**Timeline:** Week 5-6  
**Description:** One-command deployment with SQLite or Postgres

**Acceptance Criteria:**
- `docker-compose.yml` in repo root
- SQLite default (no external services)
- Postgres opt-in via env vars
- Auto-migration on first run
- Health check endpoint
- HTTPS instructions (Caddy/Let's Encrypt)

---

### Launch Checklist (Week 7-8)

- [ ] End-to-end testing with 5 ADHD users
- [ ] Security audit (basic SQLi, XSS, CSRF checks)
- [ ] Documentation complete (setup, self-hosting, API)
- [ ] CONTRIBUTING.md with local dev guide
- [ ] GitHub labels configured (good first issue, help wanted)
- [ ] 10+ test deployments (self-hosted + Vercel)
- [ ] Launch blog post drafted
- [ ] Reddit/Discord announcement ready

**Success Metrics:**
- 50+ GitHub stars in first 2 weeks
- 10+ successful self-hosting reports
- 3+ ADHD community mentions
- 5+ user interviews confirm execution gap

---

## V1.1 — "Integrations & Refinements" (Weeks 9-12)

**Target Launch:** Late September 2026  
**Theme:** Connect with tools users already use

### Features (P1 — Fast Follow)

#### FR-009: Calendar Integration 📅
**Timeline:** Week 9-10  
**Description:** Sync focus sessions to Google Calendar and Microsoft 365

**Why It Matters:**
- Time blocking is critical for ADHD
- Import calendar events as session suggestions
- Prevent double-booking during focus mode

**Integrations:**
- Google Calendar API (OAuth 2.0)
- Microsoft Graph API (work accounts)
- Two-way sync (create blocks, mark tasks done)

---

#### FR-010: Pomodoro Timer Presets ⏱️
**Timeline:** Week 10  
**Description:** Customizable timer profiles

**Presets:**
- Classic Pomodoro (25 min work / 5 min break)
- Long session (50 min work / 10 min break)
- Deep work (90 min work / 20 min break)
- Quick wins (15 min work / 3 min break)

**Custom Profiles:**
- Save as "Morning Deep Work" vs "Post-Lunch Quick Wins"
- Per-plan timer defaults

---

#### FR-011: Browser Extension 🌐
**Timeline:** Week 11  
**Description:** Chrome/Firefox extension for quick capture

**Features:**
- Right-click context menu: "Add to FocusFlow"
- Global quick-add hotkey (Alt+Shift+F)
- Capture from any webpage
- Syncs to Today view

---

#### FR-012: Plan Templates 📄
**Timeline:** Week 11  
**Description:** Reusable plan templates

**Default Templates:**
- Weekly Review
- Morning Routine
- Client Onboarding Checklist
- Study Session
- Writing Session

**Custom Templates:**
- Create from existing plan
- Share templates in community

---

#### FR-013: Hosted Tier Launch ☁️
**Timeline:** Week 12  
**Description:** Managed hosting with cloud sync

**Pricing:**
- Free: 10 active plans, unlimited sessions, local only
- Pro ($8/month): Unlimited plans, cloud sync, voice capture, calendar integration
- Lifetime ($200 one-time, first 100 users)

**Infrastructure:**
- Vercel (frontend)
- Supabase (Postgres + Auth + Storage)
- Cloudflare (CDN)

---

### V1.1 Success Metrics

- 500+ monthly active users (self-hosted + hosted)
- 30%+ week-over-week retention (4 consecutive weeks)
- 10+ unprompted testimonials
- 1+ ADHD coach/therapist recommendation
- 100+ hosted tier signups (free tier)

---

## V1.2 — "Community & Accountability" (Weeks 13-16)

**Target Launch:** November 2026  
**Theme:** Build social accountability without surveillance

### Features (P2 — Later)

#### FR-014: Body Doubling Rooms 👥
**Timeline:** Week 13-14  
**Description:** Opt-in shared focus rooms (text-based, no video)

**How It Works:**
- Create or join public/private focus rooms
- See others' current tasks (text only)
- Async presence (no real-time requirement)
- No video, no voice (privacy-first)

**Use Cases:**
- "Accountability buddies" for remote workers
- Virtual study halls for students
- ADHD Discord integration

---

#### FR-015: Salesforce Tasks Integration 💼
**Timeline:** Week 14-15  
**Description:** Import Salesforce tasks, sync completion back

**Target Users:**
- Sales reps with ADHD managing follow-ups
- CSMs with scattered customer touchpoints
- Salesforce admins managing project backlogs

**Features:**
- OAuth 2.0 connection to Salesforce org
- Read Tasks object (filter by owner, due date, status)
- Import as FocusFlow plans
- Bi-directional sync (mark Salesforce task complete)

**Monetization:**
- Available on Pro tier only
- Enterprise tier ($15/user/month) for teams

---

#### FR-016: Voice Journaling 🎙️
**Timeline:** Week 15  
**Description:** Upgrade brain dumps to save audio files

**Features:**
- Save raw audio files (MP3/WebM)
- Auto-transcribe with Whisper API (optional)
- Self-hosted Whisper for privacy-first users
- Playback during session review

---

#### FR-017: Session Insights Dashboard 📊
**Timeline:** Week 16  
**Description:** Aggregate analytics for pattern recognition

**Metrics:**
- Best focus times (morning/afternoon/evening)
- Energy patterns over time
- Most productive task types
- Streak trends
- Export as CSV

**Privacy:**
- Data never leaves user's control
- Self-hosters: 100% local analytics
- Hosted tier: opt-in only, no third-party tracking

---

### V1.2 Success Metrics

- 1,000+ MAU
- 20+ paid subscribers ($160 MRR)
- 5+ body doubling rooms active daily
- 40%+ churn reduction (grace days working)

---

## V2.0+ — "Scale & Sustainability" (Q1 2027+)

**Target Launch:** March 2027+  
**Theme:** Platform maturity and ecosystem growth

### Major Features (Future)

#### FR-018: Mobile Native Apps 📱
**Platform:** React Native or Flutter  
**Why:** 60% of ADHD users report better focus on mobile (no desktop distractions)

**Features:**
- iOS and Android apps
- Offline-first with sync
- Push notifications for breaks (not tasks — no guilt)
- Widget for Today view

---

#### FR-019: BYOK AI Integration 🤖
**Description:** Bring Your Own Key for AI breakdowns

**Supported APIs:**
- OpenAI (ChatGPT)
- Anthropic (Claude)
- Google (Gemini)

**Use Case:**
- Users who want AI breakdown + execution in one place
- Optional — core product still accepts paste-and-go

---

#### FR-020: Accountability Partner System 🤝
**Description:** Buddy system (not coaching)

**Features:**
- Pair with another FocusFlow user
- Weekly check-ins (structured prompts)
- Share session streaks (opt-in)
- No surveillance, no comparisons

---

#### FR-021: Medication Reminder Integration 💊
**Description:** Gentle nudges (non-medical)

**Features:**
- Custom reminder times
- "Did you take your meds?" check-in
- No shame if missed
- Integrates with Apple Health / Google Fit

---

#### FR-022: Export to Therapist 📄
**Description:** PDF session summaries for ADHD coaching

**Use Case:**
- Users in therapy/coaching want to share progress
- Export last 30 days as PDF
- Includes: session counts, focus quality trends, parked thoughts themes

---

#### FR-023: AppExchange Distribution 🏢
**Description:** Salesforce AppExchange listing

**Target Market:**
- HR teams (Work.com wellness programs)
- Sales operations (rep productivity)
- Neurodiversity accommodation programs

**Requirements:**
- Security review (3-6 months)
- SSO support (SAML)
- Enterprise tier features

---

#### FR-024: Realtime Cross-Device Sync ⚡
**Description:** CRDT-based sync (not just polling)

**Why:**
- Start session on desktop, continue on mobile
- Multiple devices stay in sync instantly
- Offline-first, no conflicts

**Tech Stack:**
- Yjs or Automerge (CRDT library)
- WebSocket or WebRTC

---

## Feature Freeze & Maintenance Phases

After V2.0 launch, FocusFlow enters **maintenance mode**:

**What "Maintenance Mode" Means:**
- Bug fixes and security patches continue
- Community contributions accepted (PR review within 2 weeks)
- No new major features unless community-driven
- Hosting services remain operational

**Why Maintenance Mode:**
- ADHD project maintainers are vulnerable to burnout
- "Done > perfect" principle applies to roadmap too
- Focus on sustainability, not endless growth

---

## How to Influence the Roadmap

FocusFlow is a community project. You can influence priorities through:

1. **GitHub Discussions** — Feature requests with use case descriptions
2. **User Interviews** — Schedule 30-min chat via Calendly (link in README)
3. **Pull Requests** — Build the feature you want (follows CONTRIBUTING.md)
4. **Sponsorship** — Ko-fi/Patreon supporters get early access to beta features

**What Gets Prioritized:**
- Features that reduce executive load (not add cognitive burden)
- Requests from 3+ distinct users (signals real need)
- Contributions with PRs (show > tell)
- Features aligned with ADHD design principles

**What Gets Deprioritized:**
- Surveillance features (manager dashboards, productivity scoring)
- Gamification that creates shame (leaderboards, public streaks)
- Complex onboarding (tutorials >3 steps)
- Features that replicate existing tools (calendar, notes app, chat)

---

## Release Cadence

**V1.0 MVP:** One-time launch (Week 8)  
**V1.1:** Monthly releases (September - November 2026)  
**V1.2+:** Quarterly releases (Q4 2026 onwards)

**Patch Releases:** As needed for critical bugs (security, data loss, focus mode breaks)

**Beta Channel:** Users can opt into beta releases (hosted tier) for early testing

---

## Roadmap Tracking

**Public Board:** [GitHub Projects](https://github.com/akshatasawant9699/focusflow/projects)

**Columns:**
- 📋 Backlog (ideas, not committed)
- 🔨 In Progress (actively being built)
- 👀 In Review (PR submitted, awaiting merge)
- ✅ Done (shipped to production)
- 🚫 Won't Do (explained why)

**Labels:**
- `v1.0-mvp`, `v1.1-fast-follow`, `v1.2-community`, `v2.0-future`
- `p0-must-have`, `p1-nice-to-have`, `p2-later`, `p3-wishlist`
- `effort-xs`, `effort-s`, `effort-m`, `effort-l`, `effort-xl`

---

## FAQ

### Can I request a feature not on this roadmap?

Yes! Open a GitHub Discussion under "Ideas" category. Describe:
- What problem it solves (for which persona)
- Why existing features don't solve it
- How it aligns with ADHD design principles

### Why isn't [feature] in V1.0?

V1.0 focuses on the **execution gap**. Features in V1.1+ either:
- Require V1.0 validation first (e.g., we need users before building body doubling)
- Are integrations with external tools (calendar, Salesforce)
- Add complexity that could derail MVP launch

### What if a competitor launches this feature first?

We're okay with that. FocusFlow is not racing to "own" ADHD productivity. We're building a **community ally**, not a monopoly. If Goblin.tools adds focus mode, we'll celebrate and link to them.

### How do I contribute to roadmap execution?

See [CONTRIBUTING.md](../CONTRIBUTING.md) for:
- Local development setup
- PR guidelines
- Code standards
- How to claim a feature from the roadmap

---

**Last Updated:** July 2, 2026  
**Next Review:** August 15, 2026 (post-V1.0 launch)
# FocusFlow Project Management - Notion Setup Guide

This document contains all the databases and content you need to create in Notion for complete project management of FocusFlow.

---

## Database 1: SDLC Master Checklist

**Database Type:** Table with these properties:
- Phase (Select): Requirements, Design, Development, Testing, Deployment, Maintenance
- Task (Title)
- Description (Text)
- Owner (Person)
- Status (Select): Not Started, In Progress, Blocked, Completed
- Priority (Select): P0 (MVP), P1 (V1.1), P2 (Later)
- Due Date (Date)
- Dependencies (Relation to same database)
- FR Reference (Text)
- Notes (Text)

### Tasks to Add:

#### Phase: Requirements (P0 - MVP)
| Task | Description | Priority | FR Reference |
|------|-------------|----------|--------------|
| Finalize PRD review | Stakeholder review of PRD v2.0 | P0 | - |
| Define API contracts | Document all REST endpoints with request/response schemas | P0 | Section 17 |
| Create data model schemas | Define Drizzle ORM schemas for all entities | P0 | Section 6 |
| Document paste parser requirements | List all input formats to support (Goblin, ChatGPT, Claude, etc.) | P0 | FR-001 to FR-006 |
| Validate ADHD design principles | Clinical advisor review of UI/UX decisions | P0 | Section 12 |
| Set up analytics requirements | Define events and properties for PostHog | P0 | Section 13 |

#### Phase: Design (P0 - MVP)
| Task | Description | Priority | FR Reference |
|------|-------------|----------|--------------|
| Create design system tokens | Define color palette, typography, spacing, shadows | P0 | Section 12.2 |
| Design Today view wireframes | 3-plan card layout with CTAs | P0 | FR-030 to FR-033 |
| Design Focus session UI | Fullscreen single-task view with timer and controls | P0 | FR-020 to FR-026 |
| Design Brain dump overlay | Global capture interface with voice support | P0 | FR-040 to FR-043 |
| Design paste-and-go flow | Smart parser with preview and edit | P0 | FR-001 to FR-004 |
| Create celebration animations | 600ms bouncy spring animations (respect reduced-motion) | P0 | FR-025, FR-061 |
| Design empty states | Warm, non-guilt copy for all empty views | P0 | Section 12 |
| Create dark mode variants | Warm dark palette (not pure black) | P0 | Section 12.2 |
| Design reduced-motion mode | Instant state changes, no parallax | P0 | NFR-007 |

#### Phase: Development - Foundation (P0 - MVP)
| Task | Description | Priority | FR Reference |
|------|-------------|----------|--------------|
| Repository setup | Initialize Next.js 14 with TypeScript, Tailwind, shadcn/ui | P0 | Section 9.3 |
| Configure Drizzle ORM | Set up with Postgres and SQLite adapters | P0 | Section 9.3 |
| Set up Supabase project | Create project, configure Auth, enable RLS | P0 | Section 9.1 |
| Configure Vercel deployment | Set up auto-deploy from main branch | P0 | Section 9.4 |
| Set up CI/CD pipeline | GitHub Actions for tests, linting, type checking | P0 | Section 18 |
| Configure Resend | Email service for magic links (hosted mode) | P0 | Section 9.3 |
| Set up PostHog | Analytics with opt-in for hosted, disabled for self-host | P0 | NFR-010 |
| Configure Sentry | Error tracking and monitoring | P0 | Section 9.1 |
| Create Docker setup | docker-compose.yml for self-host mode | P0 | FR-090 |
| Write database migrations | Initial schema for User, Plan, Step, FocusSession, BrainDump | P0 | Section 6 |

#### Phase: Development - Core Features (P0 - MVP)
| Task | Description | Priority | FR Reference |
|------|-------------|----------|--------------|
| Implement authentication | Supabase Auth with Google OAuth and magic link | P0 | Section 17.1 |
| Build paste parser | Detect and parse numbered, bulleted, dashed, line-broken lists | P0 | FR-001 to FR-004 |
| Create parser test corpus | 100+ real-world samples from Goblin, ChatGPT, Claude, Notion | P0 | Section 18.1 |
| Build Plan CRUD API | Create, read, update, delete, archive endpoints | P0 | Section 17.2 |
| Build Step CRUD API | Create, update, delete, complete, reorder endpoints | P0 | Section 17.2 |
| Implement Today view | 3-plan card layout with energy-based ranking | P0 | FR-030 to FR-033 |
| Build Focus session UI | Fullscreen mode with visible countdown timer | P0 | FR-020 to FR-026 |
| Implement Focus session backend | Session tracking with interruption detection | P0 | Section 17.3 |
| Build tab blur detection | Log DistractionEvent after 30s of blur | P0 | FR-024 |
| Implement "Park thought" | Capture during focus without breaking flow | P0 | FR-023, FR-042 |
| Build Brain dump system | Global hotkey (Cmd/Ctrl+Shift+.) and voice capture | P0 | FR-040 to FR-043 |
| Implement Web Speech API | Browser-native voice transcription | P0 | FR-041 |
| Build time externalization | Visual progress bars, shrinking arcs, filling circles | P0 | FR-050, FR-051 |
| Implement soft gamification | Focus session streaks with grace days | P0 | FR-060 to FR-062 |
| Build energy/mood logging | Quick 1-5 scale + emoji, skippable | P0 | FR-070 |
| Create celebration animations | Bouncy spring on completion, max 600ms | P0 | FR-025, FR-061 |
| Implement rule-based skeleton | 3-step generic scaffold for empty plans | P0 | FR-011 |
| Build "Not feeling it" filter | Re-rank by user-selected current energy | P0 | FR-032 |

#### Phase: Development - Self-Hosting (P0 - MVP)
| Task | Description | Priority | FR Reference |
|------|-------------|----------|--------------|
| Create SQLite adapter | Single-file database mode for solo self-hosters | P0 | FR-091 |
| Write Docker documentation | Quick start guide targeting under 10 minutes | P0 | Section 10.1 |
| Build data export | Download all user data as JSON archive | P0 | FR-093, Section 17.5 |
| Disable telemetry in self-host | No outbound calls except user-initiated OAuth | P0 | FR-092, Section 10.4 |
| Test self-host parity | Same E2E tests pass on Supabase, Postgres, SQLite | P0 | NFR-013, Section 18.5 |
| Document SMTP fallback | Console output for magic links without SMTP | P0 | Section 10.3 |

#### Phase: Testing (P0 - MVP)
| Task | Description | Priority | FR Reference |
|------|-------------|----------|--------------|
| Write parser unit tests | 80%+ coverage on all format detection | P0 | Section 18.1 |
| Write session logic tests | Timer, interruption, completion, skip, extend | P0 | Section 18.1 |
| Write API integration tests | All endpoints with both Postgres and SQLite | P0 | Section 18.1 |
| Create E2E test suite | Playwright tests for paste → save → focus → done | P0 | Section 18.1 |
| Run E2E on all backends | Supabase, self-host Postgres, self-host SQLite | P0 | Section 18.5 |
| Set up accessibility tests | Automated axe-core in CI | P0 | Section 18.2 |
| Manual screen reader testing | NVDA + VoiceOver pass on all core flows | P0 | Section 18.2 |
| Test reduced-motion mode | All animations respect prefers-reduced-motion | P0 | Section 18.2 |
| Performance budget tests | LCP ≤2s on Moto G4, Today view JS ≤180KB gzipped | P0 | NFR-001, Section 18.4 |
| ADHD user testing | 8-person diary study with diagnosed users | P0 | Section 18.3 |

#### Phase: Deployment (P0 - MVP)
| Task | Description | Priority | FR Reference |
|------|-------------|----------|--------------|
| Set up production Supabase | Create prod project, configure backups | P0 | - |
| Configure Vercel production | Environment variables, domain, preview deploys | P0 | - |
| Set up monitoring | PostHog dashboards, Sentry alerts | P0 | - |
| Test self-host Docker | Clean VM test of docker compose up | P0 | FR-090 |
| Write deployment runbook | Step-by-step for emergency rollback | P0 | - |
| Set up status page | Public uptime monitoring | P0 | - |

#### Phase: Launch Preparation (P0 - MVP)
| Task | Description | Priority | FR Reference |
|------|-------------|----------|--------------|
| Write README.md | Clear value prop, quick start, features, self-hosting | P0 | - |
| Write CONTRIBUTING.md | Code of conduct, setup, PR process, good first issues | P0 | NFR-011 |
| Create issue templates | Bug report, feature request, documentation | P0 | - |
| Write self-hosting guide | Docker, VPS, NAS, bare-metal options | P0 | Section 10 |
| Record demo video | 2-minute walkthrough of paste → focus → done | P0 | - |
| Prepare launch posts | r/ADHD, Hacker News, Product Hunt drafts | P0 | - |
| Clinical advisor final review | Verify all claims, check for harm potential | P0 | Section 5 |
| Security audit | Third-party review of auth, encryption, RLS | P0 | Section 14 |
| GDPR compliance check | Privacy policy, data handling, right to deletion | P0 | NFR-006 |

---

## Database 2: Personas Directory

**Database Type:** Table with these properties:
- Name (Title)
- Age (Number)
- Role (Text)
- ADHD Journey (Text)
- Primary Need (Text)
- Pain Points (Text - Long)
- Current Tools (Text)
- Quote (Text)
- Status (Select): Active, Archived

### Personas to Add:

#### Persona 1: Maya (The Goblin Power-User)
- **Age:** 32
- **Role:** Software Engineer
- **ADHD Journey:** Diagnosed at 28, on medication, actively managing symptoms
- **Primary Need:** A place where Goblin.tools breakdowns live, persist, and pull her into action
- **Pain Points:**
  - Goblin breakdowns feel ephemeral - disappear when tab closes
  - Has to re-break-down the same tasks repeatedly
  - Loses momentum between getting the breakdown and starting work
  - Needs persistence across sessions and devices
- **Current Tools:** Goblin.tools (daily), Notion (inconsistently), Google Calendar
- **Quote:** "I love Goblin for breaking things down, but then what? The list just sits there and I still can't start."
- **Status:** Active

#### Persona 2: Devon (The AI Chat User)
- **Age:** 41
- **Role:** Startup Founder
- **ADHD Journey:** Undiagnosed but strongly suspects, high-functioning with coping mechanisms
- **Primary Need:** Paste breakdown from ChatGPT/Claude once, work through it across days
- **Pain Points:**
  - Gets excellent task breakdowns from ChatGPT during planning sessions
  - Loses breakdowns in chat history scrollback
  - Re-asks the same "how do I do X" questions to AI
  - No bridge between planning (AI chat) and execution (actual work)
- **Current Tools:** ChatGPT Pro, Claude, Linear (for company), scattered notes
- **Quote:** "I spend 30 minutes with ChatGPT getting the perfect breakdown, then I can't find it the next day."
- **Status:** Active

#### Persona 3: Priya (The Privacy-Conscious Student)
- **Age:** 24
- **Role:** Computer Science Grad Student
- **ADHD Journey:** Diagnosed at 19, medication, academic accommodations
- **Primary Need:** Self-hostable focus tool she can run on her own server
- **Pain Points:**
  - Refuses cloud productivity apps after previous data leak incident
  - Academic work contains sensitive research data
  - Needs focus tools but won't trust third-party servers
  - Budget-conscious, prefers open source
- **Current Tools:** Local markdown files, Vim, Pomodoro timer app (offline), self-hosted Nextcloud
- **Quote:** "I need focus support, but I need to own my data more."
- **Status:** Active

#### Persona 4: Sam (The Broke Parent)
- **Age:** 38
- **Role:** Single Parent, Part-Time Retail Manager
- **ADHD Journey:** Recently diagnosed, three kids, single income, no medication yet
- **Primary Need:** Free, simple tool that doesn't require credit card to start
- **Pain Points:**
  - Subscription fatigue - has tried 5 paid apps, can't sustain $20/month each
  - Needs dead-simple interface - no time to learn complex systems
  - Irregular schedule due to childcare - needs flexibility
  - Shame around "failing" at productivity apps
- **Current Tools:** Paper todo lists, phone reminders, free Trello board
- **Quote:** "I can't afford another subscription. I just need something that helps me get through my list."
- **Status:** Active

---

## Database 3: Entity Data Model

**Database Type:** Table with these properties:
- Entity Name (Title)
- Description (Text)
- Key Fields (Text - Long)
- Relationships (Relation to same database)
- RLS Policy (Text)
- Priority (Select): P0 (MVP), P1 (V1.1), P2 (Later)
- Migration Status (Select): Not Started, In Progress, Completed

### Entities to Add:

#### Entity: User
- **Description:** Authenticated account
- **Key Fields:**
  ```
  id: UUID (PK)
  email: String (unique)
  display_name: String (nullable)
  timezone: String (default UTC)
  preferences: JSONB (theme, default_session_duration, grace_days, etc.)
  created_at: Timestamp
  ```
- **Relationships:** Has many Plans, FocusSessions, BrainDumps, EnergyLogs
- **RLS Policy:** Users can only access their own records
- **Priority:** P0 (MVP)

#### Entity: Plan
- **Description:** A unit of intended work, paste-in or hand-typed
- **Key Fields:**
  ```
  id: UUID (PK)
  user_id: UUID (FK → User)
  title: String
  source: Enum (paste:goblin, paste:chatgpt, paste:claude, paste:other, manual, calendar)
  notes: Text (nullable, for surrounding prose from paste)
  created_at: Timestamp
  archived_at: Timestamp (nullable)
  ```
- **Relationships:** Belongs to User, has many Steps
- **RLS Policy:** Users can only access their own plans
- **Priority:** P0 (MVP)

#### Entity: Step
- **Description:** One actionable item within a Plan
- **Key Fields:**
  ```
  id: UUID (PK)
  plan_id: UUID (FK → Plan)
  order: Integer
  title: String
  estimated_minutes: Integer (nullable)
  completed_at: Timestamp (nullable)
  actual_minutes: Integer (nullable, calculated from focus sessions)
  energy_level: Integer 1-5 (nullable, suggested energy requirement)
  ```
- **Relationships:** Belongs to Plan, has many FocusSessions
- **RLS Policy:** Users can access steps of their own plans
- **Priority:** P0 (MVP)

#### Entity: FocusSession
- **Description:** A timeboxed work block on a step
- **Key Fields:**
  ```
  id: UUID (PK)
  user_id: UUID (FK → User)
  step_id: UUID (FK → Step, nullable if general focus session)
  started_at: Timestamp
  ended_at: Timestamp (nullable if in progress)
  planned_duration: Integer (minutes)
  actual_duration: Integer (nullable, calculated)
  interruption_count: Integer (default 0)
  outcome: Enum (completed, abandoned, extended)
  ```
- **Relationships:** Belongs to User and Step, has many DistractionEvents, has many parked BrainDumps
- **RLS Policy:** Users can only access their own sessions
- **Priority:** P0 (MVP)

#### Entity: BrainDump
- **Description:** Friction-free thought capture
- **Key Fields:**
  ```
  id: UUID (PK)
  user_id: UUID (FK → User)
  content: Text
  captured_at: Timestamp
  during_session_id: UUID (FK → FocusSession, nullable)
  source: Enum (hotkey, voice, browser_extension)
  promoted_to_plan_id: UUID (FK → Plan, nullable)
  ```
- **Relationships:** Belongs to User, optionally linked to FocusSession and Plan
- **RLS Policy:** Users can only access their own brain dumps
- **Priority:** P0 (MVP)

#### Entity: EnergyLog
- **Description:** Self-reported energy/mood snapshot
- **Key Fields:**
  ```
  id: UUID (PK)
  user_id: UUID (FK → User)
  logged_at: Timestamp
  energy_level: Integer 1-5
  mood: Enum (great, good, okay, rough, struggling)
  context: Text (nullable, optional note)
  after_session_id: UUID (FK → FocusSession, nullable)
  ```
- **Relationships:** Belongs to User, optionally linked to FocusSession
- **RLS Policy:** Users can only access their own logs
- **Priority:** P0 (MVP)

#### Entity: DistractionEvent
- **Description:** Logged drift during a focus session
- **Key Fields:**
  ```
  id: UUID (PK)
  session_id: UUID (FK → FocusSession)
  event_type: Enum (tab_blur, tab_focus, manual_pause)
  detected_at: Timestamp
  source: String
  ```
- **Relationships:** Belongs to FocusSession
- **RLS Policy:** Users can access distraction events from their own sessions
- **Priority:** P0 (MVP)

#### Entity: Integration (V1.1+)
- **Description:** OAuth connection for calendar read
- **Key Fields:**
  ```
  id: UUID (PK)
  user_id: UUID (FK → User)
  provider: Enum (google_calendar, microsoft_graph)
  access_token: String (encrypted AES-256)
  refresh_token: String (encrypted AES-256)
  scopes: String[]
  expires_at: Timestamp
  created_at: Timestamp
  ```
- **Relationships:** Belongs to User
- **RLS Policy:** Users can only access their own integrations
- **Priority:** P1 (V1.1)

---

## Database 4: Stakeholder Review Tracker

**Database Type:** Table with these properties:
- Stakeholder (Select from list below)
- Review Item (Title)
- Review Type (Select): PRD Review, Design Review, Code Review, Security Review, Clinical Review, Legal Review
- Due Date (Date)
- Status (Select): Pending, In Review, Approved, Changes Requested, Blocked
- Feedback (Text - Long)
- Action Items (Text - Long)
- Priority (Select): P0, P1, P2
- Completed Date (Date)

### Stakeholders to Define as Select Options:
- Project Lead (You)
- Clinical Advisor (Volunteer)
- ADHD Community (Reddit/Discord)
- Open Source Contributors
- Security Auditor (Pro-bono)
- Legal/Privacy Advisor (Pro-bono)
- Goblin.tools (Partnership)
- Beta Testers
- Self-Hosters

### Review Checkpoints to Add:

| Stakeholder | Review Item | Review Type | Due Date | Priority |
|-------------|-------------|-------------|----------|----------|
| Clinical Advisor | ADHD Design Principles | Clinical Review | Week 1 | P0 |
| Clinical Advisor | UI Copy for Shame-Free Language | Clinical Review | Week 2 | P0 |
| ADHD Community | PRD v2.0 Feedback | PRD Review | Week 1 | P0 |
| Project Lead | API Specifications Finalization | PRD Review | Week 1 | P0 |
| Open Source Contributors | Repository Structure and CONTRIBUTING.md | Code Review | Week 2 | P0 |
| Security Auditor | Authentication and Authorization Architecture | Security Review | Week 3 | P0 |
| Legal/Privacy Advisor | GDPR Compliance Check | Legal Review | Week 4 | P0 |
| Beta Testers | Paste Parser Accuracy | Code Review | Week 4 | P0 |
| ADHD Community | Focus Session UX Testing | Design Review | Week 5 | P0 |
| Clinical Advisor | Gamification Safety Review | Clinical Review | Week 5 | P0 |
| Self-Hosters | Docker Setup Simplicity Test | Code Review | Week 6 | P0 |
| Security Auditor | Pre-Launch Security Audit | Security Review | Week 7 | P0 |
| Beta Testers | End-to-End Beta Test (Hosted) | Code Review | Week 7 | P0 |
| Beta Testers | End-to-End Beta Test (Self-Host) | Code Review | Week 7 | P0 |
| Legal/Privacy Advisor | Privacy Policy Final Review | Legal Review | Week 8 | P0 |
| ADHD Community | Launch Readiness Feedback | PRD Review | Week 8 | P0 |

---

## Database 5: MVP Features Tracker

**Database Type:** Table with these properties:
- FR Code (Title) - e.g., FR-001
- Feature Name (Text)
- Description (Text - Long)
- Capability (Select): Paste-and-go, Manual Plan Creation, Focus Session, Today View, Brain Dump, Time Externalization, Soft Gamification, Energy/Mood Awareness, Calendar Awareness, Self-Hosting
- Priority (Select): P0 (MVP), P1 (V1.1), P2 (Later)
- Status (Select): Not Started, In Design, In Development, In Testing, Completed, Blocked
- Acceptance Criteria (Text - Long)
- Related Spec (Text) - e.g., SPEC-001
- Dependencies (Relation to same database)
- Assigned To (Person)
- Telemetry Events (Text)
- Notes (Text - Long)

### Import all requirements from Section 7 of the PRD

Example entries (create all from PRD Section 7):

| FR Code | Feature Name | Capability | Priority | Acceptance Criteria |
|---------|--------------|------------|----------|---------------------|
| FR-001 | Paste list auto-detection | Paste-and-go | P0 | User pastes text, system detects list structure (numbered, bulleted, dashed, line-broken) and parses into Steps automatically within 100ms |
| FR-002 | Recognize multiple formats | Paste-and-go | P0 | Parser handles: numbered lists (1. ...), bullets (-, *, •), Goblin nested format, plain line-by-line text |
| FR-020 | Start focus session from step | Focus Session | P0 | Tap any Step → enter fullscreen view with only: plan title, current step, visible countdown, Park thought button, Done button, Skip button |
| FR-030 | Show 3 active plans max | Today View | P0 | On open, show at most 3 active plans with top step of each surfaced as immediate action |
| FR-040 | Global hotkey capture | Brain Dump | P0 | Global hotkey (Cmd/Ctrl+Shift+.) opens capture overlay anywhere within 100ms |
| FR-090 | Docker compose quick start | Self-Hosting | P0 | `docker compose up` runs working FocusFlow instance with Postgres + app on single machine |

---

## Database 6: Risk Register

**Database Type:** Table with these properties:
- Risk (Title)
- Category (Select): Technical, Market, Product, Legal, Operational, Community
- Description (Text - Long)
- Impact (Select): Critical, High, Medium, Low
- Likelihood (Select): High, Medium, Low
- Mitigation Strategy (Text - Long)
- Mitigation Status (Select): Not Started, In Progress, Completed, Monitoring
- Owner (Person)
- Priority (Select): P0, P1, P2
- Notes (Text)

### Risks to Add (from Section 14):

| Risk | Category | Impact | Likelihood | Mitigation Strategy |
|------|----------|--------|------------|---------------------|
| Paste parser fails on real-world inputs | Technical | High | High | Snapshot tests against 100+ real Goblin/ChatGPT/Claude/Notion outputs; community-maintained parser corpus |
| Users want breakdown built-in despite positioning | Product | Medium | Medium | Clear in-product link to Goblin; rule-based skeleton fallback covers manual cases |
| Self-host complexity scares away users | Operational | Medium | Medium | One-command Docker setup; SQLite mode for solo users; video walkthrough |
| Mental-health-adjacent data leak | Legal | Critical | Low | Encryption, RLS, third-party audit before launch, self-host as ultimate privacy |
| Gamification triggers shame | Product | High | Medium | User testing with ADHD coaches, opt-out, grace days, no streak resets |
| Calendar API quota exhaustion | Technical | Medium | Low | Per-user rate limits, exponential backoff |
| Vercel/Supabase change free-tier terms | Operational | Medium | Low | Cloudflare Pages migration documented; self-host is ultimate fallback |
| Maintainer burnout (solo pro-bono) | Operational | Critical | High | Clear CONTRIBUTING.md from day one; hard scope discipline; "issues only" mode possible |
| Goblin.tools changes or shuts down | Market | Low | Low | We're not dependent on them — paste works regardless of source |
| Open-source project dies from low contributor velocity | Community | Medium | Medium | Easy first issues, clear roadmap, monthly contributor calls |

---

## Database 7: Weekly Sprint Planning

**Database Type:** Board (Kanban) with these columns:
- Backlog
- This Week
- In Progress
- Blocked
- In Review
- Completed

**Properties:**
- Task (Title)
- Week (Select): Week 1, Week 2, Week 3, Week 4, Week 5, Week 6, Week 7, Week 8
- Story Points (Number): 1, 2, 3, 5, 8
- Assigned To (Person)
- Related FR (Relation to MVP Features Tracker)
- Priority (Select): P0, P1, P2
- Due Date (Date)
- Notes (Text)

### Suggested 8-Week Sprint Breakdown:

#### Week 1: Foundation & Setup
- Repository bootstrap (Next.js 14, TypeScript, Tailwind, shadcn/ui)
- Drizzle ORM setup (Postgres + SQLite adapters)
- Supabase project creation and Auth configuration
- Initial database migrations (User, Plan, Step)
- CI/CD pipeline setup (GitHub Actions)
- Docker compose configuration
- Design system tokens definition

#### Week 2: Paste Parser & Plan Management
- Build paste parser (all formats)
- Create parser test corpus (100+ samples)
- Plan CRUD API endpoints
- Step CRUD API endpoints
- Plan and Step UI components
- Parser preview and edit UI
- Unit tests for parser

#### Week 3: Today View & Navigation
- Today view implementation (3-plan card layout)
- Energy-based ranking algorithm
- "Not feeling it" reshuffle
- Empty state UI
- Plan completion flow
- Navigation structure
- Responsive design pass

#### Week 4: Focus Session Core
- Focus session fullscreen UI
- Visible countdown timer (analog + digital)
- Session tracking backend
- Done/Skip/Extend controls
- Tab blur detection (30s threshold)
- Distraction event logging
- Session completion flow

#### Week 5: Brain Dump & Celebration
- Global hotkey implementation (Cmd/Ctrl+Shift+.)
- Brain dump overlay UI
- Web Speech API integration (voice capture)
- Brain dump backend (during session tagging)
- Celebration animations (600ms bouncy spring)
- Soft gamification (focus session streaks with grace days)
- Energy/mood logging

#### Week 6: Self-Hosting & Time Externalization
- SQLite adapter implementation
- Self-host documentation (Docker quick start)
- Data export functionality (JSON archive)
- Telemetry toggle (disabled by default for self-host)
- Time externalization UI (visual progress bars, arcs, circles)
- Rule-based skeleton for empty plans
- E2E tests for all three backends (Supabase, Postgres, SQLite)

#### Week 7: Testing & Polish
- Accessibility audit and fixes (WCAG 2.2 AA)
- Screen reader testing (NVDA + VoiceOver)
- Reduced-motion mode implementation and testing
- Performance optimization (meet all NFR budgets)
- Dark mode refinement
- ADHD user testing (8-person diary study)
- Security audit preparation

#### Week 8: Launch Preparation
- README.md, CONTRIBUTING.md, issue templates
- Self-hosting guide (multiple deployment options)
- Demo video (2 minutes)
- Launch posts (r/ADHD, Hacker News, Product Hunt)
- Clinical advisor final review
- Third-party security audit
- GDPR compliance check
- Privacy policy finalization
- Production deployment
- Post-launch monitoring setup

---

## Database 8: Technical Decisions Log (ADRs)

**Database Type:** Table with these properties:
- Decision Number (Number)
- Title (Title)
- Status (Select): Proposed, Accepted, Deprecated, Superseded
- Date (Date)
- Context (Text - Long)
- Decision (Text - Long)
- Consequences (Text - Long)
- Alternatives Considered (Text - Long)
- Related To (Relation to same database)

### Initial ADRs to Document:

#### ADR-001: Next.js 14 with App Router
- **Status:** Accepted
- **Context:** Need modern React framework with SSR, great DX, and Vercel hosting alignment
- **Decision:** Use Next.js 14 with App Router for the entire application
- **Consequences:** 
  - Pros: Server Components reduce JS bundle, built-in routing, excellent Vercel integration
  - Cons: App Router is newer, some libraries may not have RSC support yet
- **Alternatives Considered:** Remix, Vite + React Router, SvelteKit

#### ADR-002: Drizzle ORM for Multi-Database Support
- **Status:** Accepted
- **Context:** Need to support Postgres (Supabase + self-host) AND SQLite (solo self-host)
- **Decision:** Use Drizzle ORM as database abstraction layer
- **Consequences:**
  - Pros: TypeScript-first, supports both Postgres and SQLite, lightweight, great DX
  - Cons: Smaller ecosystem than Prisma, fewer community resources
- **Alternatives Considered:** Prisma (doesn't support SQLite well), Kysely, raw SQL

#### ADR-003: No AI Breakdown Engine
- **Status:** Accepted
- **Context:** Users already have breakdown tools (Goblin, ChatGPT, Claude). Building our own is scope creep.
- **Decision:** Accept paste-in breakdowns from any source. Offer rule-based skeleton fallback only.
- **Consequences:**
  - Pros: Zero AI cost, ships faster, positions us as complement not competitor, reduces complexity
  - Cons: Some users may expect built-in AI, need to educate on positioning
- **Alternatives Considered:** OpenAI API integration, self-hosted LLM, BYOK AI

#### ADR-004: Supabase for Hosted Backend
- **Status:** Accepted
- **Context:** Need managed Postgres, Auth, Realtime with generous free tier
- **Decision:** Use Supabase for hosted mode (Postgres, Auth, Realtime, Edge Functions)
- **Consequences:**
  - Pros: $0 up to 50K MAU, excellent DX, RLS for security, built-in Auth
  - Cons: Vendor lock-in risk (mitigated by self-host option), free tier limits
- **Alternatives Considered:** Firebase, PlanetScale, raw Postgres + Auth0, Cloudflare D1

#### ADR-005: MIT License
- **Status:** Accepted
- **Context:** Want maximum community adoption and contribution velocity
- **Decision:** Release under MIT license
- **Consequences:**
  - Pros: Simplest license, broad adoption, allows commercial use, encourages forks
  - Cons: No copyleft protection, forks could close source
- **Alternatives Considered:** Apache 2.0 (patent grant), AGPL (force forks open)

#### ADR-006: No Native Mobile Apps in V1
- **Status:** Accepted
- **Context:** Limited resources, mobile app development doubles scope
- **Decision:** V1 is responsive PWA only. Native apps in V2.
- **Consequences:**
  - Pros: Ships faster, one codebase, PWA gives offline + install
  - Cons: Some UX limitations (no true background processes, push notifications harder)
- **Alternatives Considered:** React Native immediately, Flutter, wait for Tauri mobile

#### ADR-007: PostHog for Analytics
- **Status:** Accepted
- **Context:** Need privacy-friendly analytics with generous free tier
- **Decision:** Use PostHog Cloud with opt-in for hosted, disabled for self-host
- **Consequences:**
  - Pros: Open source, $0 up to 1M events/month, feature flags, session replay, GDPR-compliant
  - Cons:** Slightly heavier than simpler solutions
- **Alternatives Considered:** Plausible, Fathom, Google Analytics (rejected for privacy), custom

#### ADR-008: Resend for Transactional Email
- **Status:** Accepted
- **Context:** Need email for magic link authentication in hosted mode
- **Decision:** Use Resend for transactional email (hosted), console fallback for self-host
- **Consequences:**
  - Pros: Great DX, $0 for 3K emails/month, React email templates
  - Cons: Self-hosters need to configure SMTP separately if they want email
- **Alternatives Considered:** SendGrid, Mailgun, AWS SES, Postmark

---

## How to Use These Databases

### Weekly PM Workflow:

1. **Monday Morning:**
   - Review SDLC Master Checklist for current week's tasks
   - Move tasks from Backlog to This Week in Sprint Planning board
   - Check Stakeholder Review Tracker for upcoming deadlines

2. **Daily Standup (Solo):**
   - Update Sprint Planning board (move cards to In Progress, Blocked, In Review, Completed)
   - Log any new risks discovered in Risk Register
   - Update MVP Features Tracker status for completed FRs

3. **Wednesday Mid-Week Check:**
   - Review Risk Register for any mitigation actions needed
   - Update Stakeholder Review Tracker with feedback received
   - Adjust Sprint Planning if blocked items require re-prioritization

4. **Friday Wrap-Up:**
   - Move completed tasks in SDLC Master Checklist to Completed status
   - Document any technical decisions in Technical Decisions Log
   - Plan next week's tasks in Sprint Planning board

5. **End of Week:**
   - Review progress against 8-week MVP timeline
   - Update stakeholders (community, contributors) on progress
   - Celebrate wins (even small ones - ADHD-friendly!)

### Cross-Database Links:

- Link MVP Features Tracker FRs to SDLC tasks via FR Reference field
- Link Sprint Planning tasks to MVP Features Tracker to track feature progress
- Link Stakeholder Review Tracker items to MVP Features or SDLC tasks
- Link Risk Register mitigations to SDLC tasks that implement the mitigation

---

## Next Steps After Setting Up:

1. Create all 8 databases in Notion
2. Populate with the content above
3. Create a main "FocusFlow PM Dashboard" page with:
   - Linked views of each database (filtered for current week/sprint)
   - Progress metrics (% of P0 tasks completed, risks mitigated, etc.)
   - Quick links to key documents (PRD, API specs, design mockups)
4. Set up weekly reminder to review and update
5. Share relevant views with stakeholders (clinical advisor, contributors, beta testers)


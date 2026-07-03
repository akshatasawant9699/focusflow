# Changelog

All notable changes to FocusFlow will be documented in this file.

## [Unreleased] - 2026-07-03

### ✨ Major Features Added

#### 🗄️ Database & Deployment
- **Vercel-Ready**: Switched from better-sqlite3 to Turso (LibSQL) for serverless compatibility
- **Next.js 16 Compatible**: Fixed async params in all dynamic routes
- **Database Migrations**: Auto-generate and push schema changes
- **Full API Layer**: RESTful endpoints for all features

#### 📊 Core Features (from PRD)

**FR-001: Paste & Go ✅**
- Import tasks from any source in under 15 seconds
- Auto-parse numbered lists, bullets, checkboxes, plain text
- Live preview before creating plan
- Save to database with persistent storage

**FR-002: Single-Task Focus Mode ✅**
- Fullscreen focus timer with progress ring
- Only current step visible (no distractions)
- 25-minute default timer with pause/resume
- Keyboard shortcuts (Space = pause, D = brain dump, Esc = exit)
- Auto-advance to next step on completion

**FR-003: Brain Dump (Distraction Parking) ✅**
- Global keyboard shortcut (press D during focus)
- Quick capture modal with autofocus
- Saves with session context
- View all parked thoughts at /thoughts
- Timestamps and optional voice transcription flag

**FR-004: Today View ✅**
- Dashboard showing top 3 active plans
- Real-time progress bars (0% → 100%)
- Step-by-step checklist with status icons
- "Start Next" button for each plan
- Completed plans section

**FR-006: Post-Session Mood & Energy Logging ✅**
- Modal after completing each step
- Focus quality: Locked In / Pretty Good / Distracted
- Energy level: High / Medium / Low
- Optional notes field
- All data saved to focus_sessions table

**FR-007: Focus Streaks with Grace Days ✅**
- 2 grace days per week (miss 2 days without breaking streak)
- Current streak + longest streak tracking
- No guilt messaging, positive reframes only
- Encouragement based on streak length
- "Active Today" badge when completed session

#### 🎭 Daily Mood Tracking
- 8 mood options with emoji (Amazing, Great, Good, Okay, Tired, Stressed, Sad, Angry)
- One mood per day, can update if changed
- Persists to mood_logs table
- Shows on home page
- Will be used for insights/trends

### 🏗️ Technical Improvements

**Database Schema:**
- `users` - User accounts and preferences
- `plans` - Task breakdowns with title and status
- `steps` - Individual tasks within plans
- `focus_sessions` - Completed focus sessions with mood/energy
- `parked_thoughts` - Brain dumps during sessions
- `mood_logs` - Daily mood tracking

**API Endpoints:**
- `/api/plans` - Create and list plans
- `/api/plans/[id]` - Get/update single plan
- `/api/steps/[id]` - Update step status
- `/api/sessions` - Start focus sessions
- `/api/sessions/[id]` - End sessions with mood data
- `/api/thoughts` - Save and list brain dumps
- `/api/moods` - Daily mood logging
- `/api/streaks` - Calculate focus streaks

**UI Components:**
- Glassmorphism design with animated gradients
- Responsive layouts (mobile → tablet → desktop)
- Framer Motion animations throughout
- No layout shifts on hover (fixed)
- Progress rings, countdown timers
- Post-session reflection modal
- Streak widget with grace days

### 🐛 Bug Fixes
- Fixed Next.js 16 async params in dynamic routes
- Fixed Tailwind CSS v4 compatibility (darkMode config)
- Fixed useSearchParams Suspense boundary warning
- Removed hover transforms that caused layout shifts
- Added proper null checks in focus page

### 📚 Documentation
- Comprehensive DEPLOYMENT.md guide
- Quick VERCEL_SETUP.md (5-minute setup)
- Updated README with Deploy to Vercel button
- Environment variables documented
- Database setup instructions

---

## [0.1.0] - 2026-07-02

### Initial Release
- Project scaffolding with Next.js 16
- Database schema design
- PRD documentation (45,000+ words)
- Market research on 20+ competitors
- 4 user personas (Maya, James, Priya, Kenji)
- 24 functional requirements defined

---

## Coming Next

### Short Term (V1.1)
- [ ] Break timer (5/15/25 minutes)
- [ ] Voice brain dumps (Web Speech API)
- [ ] Manual plan creation with smart suggestions
- [ ] Settings page (timer defaults, theme)
- [ ] Mood insights and trends
- [ ] Export/import plans

### Medium Term (V1.2)
- [ ] Body doubling rooms (multiplayer)
- [ ] Pomodoro integration
- [ ] Desktop app (Electron)
- [ ] Browser extension
- [ ] Mobile app (React Native)
- [ ] Salesforce integration (optional)

### Long Term (V2.0)
- [ ] AI task breakdown assistant
- [ ] Calendar integration
- [ ] Team features (shared focus rooms)
- [ ] Analytics dashboard
- [ ] Custom streak rules
- [ ] Gamification (badges, levels)

---

**For full PRD and roadmap:** See `/docs/PRD.md`

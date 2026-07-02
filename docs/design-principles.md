# FocusFlow Design Principles

**Version:** 1.0  
**Last Updated:** July 2, 2026

These design principles are **non-negotiable constraints** for FocusFlow. Every feature, UI decision, and code contribution must align with these principles. They are derived from ADHD research, community insights, and lived experience.

---

## Core Philosophy

> **"Reduce executive load, don't transfer it."**

Every design decision must answer: *Does this make it easier or harder for an ADHD brain to start and complete a task?*

If a feature adds cognitive burden (choices, setup, learning curve), it fails the test — no matter how "cool" or "industry standard" it is.

---

## The Seven Principles

### 1. Decisions Are Expensive 💰

**Principle:**  
Default everything sensibly. Settings are progressive disclosure. Never force a choice at the moment of action.

**Why It Matters:**  
ADHD brains experience decision fatigue faster than neurotypical brains. Every choice point is a potential abandonment point. "Configure your dashboard" onboarding = immediate exit.

**How to Apply:**

✅ **Do This:**
- Timer defaults to 25 minutes (sensible Pomodoro default)
- Today view automatically shows top 3 plans (sorted by due date)
- Brain dump hotkey pre-assigned (Cmd+Shift+D)
- Theme defaults to system preference (dark/light)

❌ **Don't Do This:**
- "Choose your timer duration" on first session
- "How many plans do you want to see?" during onboarding
- "Set up your workspace" multi-step wizard
- Blank slate UI ("You have no plans. What do you want to do?")

**Design Checklist:**
- [ ] Can a user complete this action without making a choice?
- [ ] If choices are required, is there a clear default selected?
- [ ] Are settings hidden until the user seeks them out?

**Code Example:**
```typescript
// ✅ Good: Sensible defaults
const defaultTimer = 25 * 60; // 25 minutes
const defaultBreak = 5 * 60;  // 5 minutes

// ❌ Bad: Force user to choose
function startSession() {
  const duration = prompt("How long do you want to focus?");
  // User now has to think, type, worry if they chose "right"
}
```

---

### 2. Three Is The Maximum 3️⃣

**Principle:**  
Never present more than 3 plans, options, or suggestions on a primary view. More = paralysis.

**Why It Matters:**  
ADHD brains struggle with comparison and prioritization. Showing 10 options triggers analysis paralysis. Three is the sweet spot: enough choice to feel agency, few enough to decide quickly.

**How to Apply:**

✅ **Do This:**
- Today view shows max 3 active plans
- Post-session mood logging has 3 options (Low/Medium/High)
- Timer presets offer 3 defaults (25/50/90 min)
- Plan templates show 3 suggestions ("Writing Session", "Study Time", "Deep Work")

❌ **Don't Do This:**
- Infinite scroll of plans
- 5-point Likert scales ("Rate your focus 1-5")
- 10+ timer preset options
- Dropdown menus with >3 choices in focus mode

**Design Checklist:**
- [ ] Count visible options. Are there ≤3?
- [ ] If >3 items exist, are extras hidden in a collapsed section?
- [ ] Is there visual hierarchy (Option 1 is largest/first)?

**UI Example:**
```tsx
// ✅ Good: Max 3 visible plans
<div className="today-view">
  {topThreePlans.map(plan => <PlanCard key={plan.id} {...plan} />)}
  {remainingPlans.length > 0 && (
    <CollapsedSection title={`${remainingPlans.length} more plans`}>
      {/* Hidden by default */}
    </CollapsedSection>
  )}
</div>

// ❌ Bad: Infinite scroll
<div className="today-view">
  {allPlans.map(plan => <PlanCard key={plan.id} {...plan} />)}
  {/* User scrolls endlessly, comparing, never starting */}
</div>
```

---

### 3. No Shame UI 🚫

**Principle:**  
No red overdue badges, no guilt copy. Reframe as progress, not failure.

**Why It Matters:**  
ADHD comes with lifelong experience of being told "you're lazy," "just try harder," "why can't you be normal." Productivity apps that mirror this shame trigger rejection. Users abandon apps that make them feel worse about themselves.

**How to Apply:**

✅ **Do This:**
- Streak resets say: "Starting fresh — your longest streak was 7 days! 🌱"
- Overdue tasks say: "Let's pick this up" (not "OVERDUE" in red)
- Grace days for streaks (1 missed day doesn't break streak)
- Energy logging uses neutral labels: "Low energy" (not "Bad" or "Lazy")
- Celebrate attempts, not just completions: "You started! That's the hardest part."

❌ **Don't Do This:**
- Red badges saying "3 overdue tasks"
- Guilt copy: "You were doing so well! Don't break your streak!"
- Productivity scores comparing user to others
- Notifications: "You haven't focused today. Your productivity is slipping."
- Visual indicators of "failure" (gray/faded completed tasks imply "dead")

**Design Checklist:**
- [ ] Does this label make the user feel judged?
- [ ] If a streak breaks, does the message reframe it positively?
- [ ] Are we celebrating effort (starting) or just outcomes (finishing)?

**Copywriting Guide:**

| ❌ Shame Language | ✅ Reframe |
|------------------|-----------|
| "You broke your streak" | "Starting fresh — your longest streak was 7 days!" |
| "Overdue" (red badge) | "Let's pick this up" (neutral blue) |
| "You failed to complete this task" | "This task is still waiting for you" |
| "Low productivity today" | "Today was tough. Tomorrow is a new day." |
| "You only focused for 10 minutes" | "You focused for 10 minutes! That's a start." |

---

### 4. Time Must Be Visible ⏰

**Principle:**  
Always show duration as a shape, not just a number. Time must be externalized visually.

**Why It Matters:**  
ADHD brains experience **time blindness**. "25 minutes left" is meaningless without a visual reference. Showing time as a shrinking circle or filling bar makes time tangible.

**How to Apply:**

✅ **Do This:**
- Timer displays as **progress ring + MM:SS number** (dual encoding)
- Session history shows time as **horizontal bars** (visual comparison)
- Plan progress uses **filled bars** ("3/8 steps" also shown as 37.5% bar)
- Break timers use **color-coded shapes** (green bar fills during break)

❌ **Don't Do This:**
- Timer shows only numbers (17:32 remaining)
- Session history as text list ("Session 1: 25 min, Session 2: 22 min")
- Plan progress as only text ("You've completed 3 of 8 steps")

**Design Checklist:**
- [ ] Is time shown as both shape (ring/bar) AND number?
- [ ] Can the user glance and see "how much is left" without reading?
- [ ] Does the visual change continuously (not just at milestones)?

**Implementation Example:**
```tsx
// ✅ Good: Dual encoding (shape + number)
<FocusTimer>
  <ProgressRing 
    value={timeRemaining} 
    max={totalDuration}
    className="breathing-animation" // Subtle pulse
  />
  <TimeDisplay>{formatMMSS(timeRemaining)}</TimeDisplay>
</FocusTimer>

// ❌ Bad: Just numbers
<div className="timer">{formatMMSS(timeRemaining)}</div>
```

---

### 5. Hyperfocus Is A Risk, Not A Goal ⚠️

**Principle:**  
Build in stops, not just streaks. Celebrate breaks, not just grind.

**Why It Matters:**  
ADHD hyperfocus can be productive (4-hour coding session) or harmful (skipping meals, ignoring bathroom, burning out). Productivity apps often gamify "hustle" and reward unsustainable behavior. FocusFlow must protect users from themselves.

**How to Apply:**

✅ **Do This:**
- After 90 minutes continuous work, prompt: "You've been crushing it. Time for a 10-min break?"
- Break suggestions include duration and activity ("5-min walk" not just "Take a break")
- Celebrate breaks: "Break completed! Your brain thanks you. 🧠"
- No "deep work streaks" that reward skipping self-care
- Weekly summary includes "You took 12 breaks this week — nice!"

❌ **Don't Do This:**
- Leaderboards for "longest focus session"
- Achievements like "Focused for 8 hours straight"
- Notifications that interrupt breaks ("Your break is over. Get back to work!")
- Gamify consecutive work days without breaks

**Design Checklist:**
- [ ] Does this feature reward unsustainable behavior?
- [ ] Are breaks treated as equally important as work?
- [ ] Does the UI prompt breaks proactively (not just let users burn out)?

**Break Prompting Logic:**
```typescript
// ✅ Good: Proactive break enforcement
if (continuousWorkTime > 90 * 60) {
  showNotification({
    title: "You've been crushing it!",
    body: "Time for a 10-min break? Your brain will thank you.",
    actions: ["Take Break", "5 More Minutes"]
  });
}

// ❌ Bad: No limits, no prompts
// User can work indefinitely until burnout
```

---

### 6. Capture Must Be Lighter Than Thinking 🪶

**Principle:**  
If capture takes effort, the thought is lost. Make capture effortless, not perfect.

**Why It Matters:**  
ADHD brains have constant intrusive thoughts during focus ("Did I email Sarah?" "I need to buy milk" "What was that website?"). If capturing these thoughts requires:
- Leaving focus mode
- Opening another app
- Typing into a form with required fields
- Organizing into categories

...the thought will be dismissed as "I'll remember later" (spoiler: you won't).

**How to Apply:**

✅ **Do This:**
- Brain dump opens with **global hotkey** (Cmd+Shift+D, one key press)
- Voice capture is **one button, auto-saves** (no "Are you sure?" confirmation)
- Text input **auto-saves on blur** (no Save button required)
- No required fields (user can dump "Sarah email" and parse later)
- Modal stays open until user explicitly closes (can dump multiple thoughts)

❌ **Don't Do This:**
- "Add Task" requires navigating to a different screen
- Form has required fields (Title, Description, Due Date)
- Voice capture requires "Press to start, press to stop, review transcription, confirm"
- Captured thoughts require categorization ("Is this a task, note, or reminder?")

**Design Checklist:**
- [ ] Can a user capture a thought in <3 seconds?
- [ ] Is there exactly 1 action required (hotkey or button)?
- [ ] Does capture work without leaving focus mode?

**Implementation Example:**
```tsx
// ✅ Good: Instant capture
<BrainDumpModal 
  hotkey="Cmd+Shift+D"
  autoSave={true}
  requiredFields={[]} // No required fields
  placeholder="What's on your mind?"
/>

// ❌ Bad: Multi-step capture
<TaskFormModal>
  <Input name="title" required /> {/* Thinking required */}
  <Textarea name="description" required />
  <DatePicker name="dueDate" required />
  <CategorySelect name="category" required />
  <Button type="submit">Save Task</Button> {/* Must click */}
</TaskFormModal>
```

---

### 7. Reduce, Don't Add ➖

**Principle:**  
Every feature is challenged on whether it reduces executive load or transfers it.

**Why It Matters:**  
The productivity app graveyard is full of features that sounded good but added cognitive burden:
- Complex tagging systems
- Custom fields
- Automation rules
- Integrations that require setup
- "Productivity scores"

Each feature adds mental overhead: "Am I using this right?" "Should I configure this?" "What if I miss something?"

**How to Apply:**

✅ **Do This:**
- Paste-and-go (reduces breakdown work to zero)
- Auto-sort Today view by due date (reduces prioritization work)
- Single-task focus mode (reduces comparison work)
- Grace days on streaks (reduces "restart from zero" despair)

❌ **Don't Do This:**
- Ask users to manually break down tasks (that's Goblin.tools' job)
- Ask users to schedule every task (that's calendar apps' job)
- Build complex project management (that's Notion's job)
- Add features because "competitors have it"

**Feature Evaluation Framework:**

Before adding any feature, answer these questions:

1. **What executive function does this reduce?**
   - Task initiation? Prioritization? Time estimation? Focus maintenance?
2. **What new cognitive work does this add?**
   - Setup? Configuration? Learning curve? Maintenance?
3. **Is the reduction > the addition?**
   - If not, cut the feature.

**Examples:**

| Feature | Reduces | Adds | Verdict |
|---------|---------|------|---------|
| Paste-and-go import | Manual task entry, app-switching | Parsing errors (rare) | ✅ Keep |
| Calendar integration | Scheduling cognitive load | OAuth setup | ⚠️ V1.1 (opt-in) |
| AI breakdown engine | Zero (users already have this) | API key setup, cost, prompt learning | ❌ Cut |
| Body doubling rooms | Isolation, accountability struggle | Social anxiety, scheduling | ⚠️ V1.2 (opt-in) |
| Custom CSS themes | Nothing (aesthetic preference) | Decision fatigue, setup time | ❌ Cut |

**Design Checklist:**
- [ ] What executive function burden does this remove?
- [ ] What new cognitive work does this create?
- [ ] Is there a simpler way to solve this?
- [ ] Can this be opt-in (progressive disclosure)?

---

## Applying the Principles

### During Feature Design

**Before building any feature, complete this checklist:**

1. [ ] **Decisions:** Can this be defaulted? Are choices minimized?
2. [ ] **Three Max:** Are there ≤3 options visible at decision points?
3. [ ] **No Shame:** Does the copy/UI reframe failure as progress?
4. [ ] **Time Visible:** Is time shown as shape + number?
5. [ ] **Hyperfocus Guard:** Does this reward unsustainable behavior?
6. [ ] **Capture Effort:** Is capture ≤3 seconds?
7. [ ] **Reduce Load:** Does this reduce more executive load than it adds?

If any answer is "No" or "I'm not sure," revise the design.

---

### During Code Review

**PR reviewers should check:**

- [ ] Does this PR add cognitive burden (new settings, choices, setup steps)?
- [ ] Are defaults sensible (can a new user succeed without configuration)?
- [ ] Is the UI shame-free (no guilt language, no red "overdue" badges)?
- [ ] Are time durations shown visually (not just numerically)?
- [ ] Does this feature encourage sustainable work habits?

---

### During User Testing

**Ask test users:**

1. "Did you have to make any decisions you weren't sure about?"
2. "Were there ever more than 3 options on screen?"
3. "Did anything make you feel judged or ashamed?"
4. "Could you tell how much time was left without reading numbers?"
5. "Did the app encourage you to take breaks?"
6. "How long did it take to capture a distracting thought?"
7. "Did this feature make starting easier or harder?"

If any answer reveals misalignment with principles, iterate.

---

## Anti-Patterns to Avoid

These are **common productivity app patterns that violate our principles:**

### ❌ The Blank Slate
**What It Is:** Empty state UI that says "You have no tasks. Click + to add one."  
**Why It's Bad:** Adds cognitive load (what should I add?), no guidance.  
**FocusFlow Approach:** Onboarding prompts: "Paste a task list from Goblin.tools, ChatGPT, or your notes."

---

### ❌ The Endless Backlog
**What It Is:** Infinite scroll of tasks, sorted by date added.  
**Why It's Bad:** Overwhelm, comparison paralysis, no prioritization.  
**FocusFlow Approach:** Today view shows max 3 plans. Backlog hidden in collapsed section.

---

### ❌ The Gamification Trap
**What It Is:** Points, badges, leaderboards, productivity scores.  
**Why It's Bad:** Creates shame when behind, rewards unsustainable grind.  
**FocusFlow Approach:** Simple streaks with grace days. No points, no competition.

---

### ❌ The Premature Optimization
**What It Is:** Features for "advanced users" shipped in V1.0 (custom fields, automation rules, API).  
**Why It's Bad:** Clutters UI for 90% of users who just want to start a task.  
**FocusFlow Approach:** Progressive disclosure. Advanced features hidden until requested.

---

### ❌ The Notification Nag
**What It Is:** Push notifications: "You haven't focused today!" "Your tasks are waiting!"  
**Why It's Bad:** Guilt, shame, anxiety. Users disable notifications, lose useful ones.  
**FocusFlow Approach:** No guilt notifications. Only helpful ones (break reminders, opt-in session start reminders).

---

### ❌ The Data Hoarder
**What It Is:** Track everything (time per task, productivity score, daily trends) and show graphs.  
**Why It's Bad:** Users feel surveilled. Data becomes another source of shame ("I'm not productive enough").  
**FocusFlow Approach:** Minimal tracking. Insights are opt-in, positive-framed, exportable.

---

## When to Break the Principles

These principles are **strong guidelines, not absolute laws**. They can be bent if:

1. **User Research Shows Otherwise**  
   If 10+ users consistently request a feature that violates a principle, and they articulate why it reduces their cognitive load, consider it.

2. **Technical Constraints Require It**  
   Example: OAuth setup adds cognitive load, but without it, calendar integration is impossible. Solution: Make it opt-in, guide users through it, save tokens securely.

3. **Accessibility Requires It**  
   Example: "Three is the maximum" might conflict with screen reader users who need more context. Accessibility wins.

**Process for Breaking a Principle:**

1. Document why (GitHub Discussion or RFC)
2. Propose alternative approach that minimizes harm
3. Get community feedback (does this still feel ADHD-friendly?)
4. Ship with clear "why we did this" explanation
5. Monitor feedback, revert if users report cognitive burden

---

## Resources & Research

These principles are informed by:

**ADHD Research:**
- Barkley, R. (2015). *Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment*
- Brown, T. (2013). *A New Understanding of ADHD in Children and Adults: Executive Function Impairments*
- Hallowell, E. & Ratey, J. (2011). *Driven to Distraction*

**Community Insights:**
- r/ADHD (500K+ members, common pain points)
- ADHD TikTok (#adhdtiktok, 15B+ views)
- ADHD coaching interviews (conducted April-June 2026)

**Design Research:**
- Nielsen Norman Group: "Reducing Cognitive Load for Users with ADHD"
- Microsoft Inclusive Design Toolkit
- Apple Human Interface Guidelines: Accessibility for Attention Challenges

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | July 2, 2026 | Initial design principles document |

---

**Maintained by:** [@akshatasawant9699](https://github.com/akshatasawant9699)  
**Community Input:** [GitHub Discussions → Design Principles](https://github.com/akshatasawant9699/focusflow/discussions)

---

*These principles are living guidelines. They evolve as we learn from the ADHD community. Suggest improvements via GitHub Discussions.*
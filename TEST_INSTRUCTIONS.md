# FocusFlow Testing Guide

## 🚀 Quick Start

The development server is running at: **http://localhost:3000**

---

## 🧪 Test 1: Paste-and-Go Feature (FR-001)

### What to Test:
The task list parser that accepts breakdowns from anywhere.

### Steps:
1. **Open your browser** → `http://localhost:3000`

2. **Copy one of these test cases:**

   **Test Case A: Numbered List**
   ```
   1. Research the topic thoroughly
   2. Create a detailed outline
   3. Write the first draft
   4. Edit for clarity and flow
   5. Proofread the final version
   ```

   **Test Case B: Bulleted List**
   ```
   - Set up development environment
   - Install dependencies
   - Write unit tests
   - Implement core feature
   - Debug and refactor
   ```

   **Test Case C: Checkbox List**
   ```
   - [ ] Read chapters 1-3
   - [ ] Take notes on key concepts
   - [ ] Create flashcards
   - [ ] Practice with sample problems
   - [ ] Review and summarize
   ```

   **Test Case D: Mixed/Plain Text**
   ```
   Email Sarah about project deadline
   Buy groceries (milk, eggs, bread)
   Finish the presentation slides
   Schedule dentist appointment
   Review pull requests
   ```

3. **Paste it into the text area**

4. **Watch the magic happen:**
   - ✅ Tasks parse in real-time
   - ✅ Preview shows parsed steps below
   - ✅ "Create Plan & Start Focus" button appears

5. **Click "Create Plan & Start Focus"**
   - ⚠️ Currently shows alert (database not connected yet)
   - This will work fully once we connect the backend

### ✅ Success Criteria:
- [ ] Text parses instantly (no delay)
- [ ] All formats work (numbered, bullets, checkboxes, plain text)
- [ ] Preview shows correct number of steps
- [ ] Preview displays step text accurately
- [ ] Button only enables when steps are detected

---

## 🎯 Test 2: Focus Mode (FR-002)

### What to Test:
The fullscreen focus timer with progress ring.

### Steps:
1. **Open in browser** → `http://localhost:3000/focus-demo`

2. **You should see:**
   - Fullscreen view with gradient background
   - Current step: "Write the introduction section"
   - Large circular progress ring (280px)
   - Timer displaying "25:00" in center
   - Three buttons: "Brain Dump (D)", "Start", "Done"

3. **Click "Start"**
   - ✅ Timer starts counting down (25:00 → 24:59 → 24:58...)
   - ✅ Progress ring animates clockwise
   - ✅ Button changes to "Pause"
   - ✅ Status text changes from "Paused" to "Focusing..."

4. **Test Pause:**
   - Click "Pause" button
   - ✅ Timer stops
   - ✅ Button changes back to "Resume"

5. **Test Resume:**
   - Click "Resume"
   - ✅ Timer continues from where it stopped

6. **Click "Done"**
   - ✅ Shows alert "Step completed!"
   - (In full version, this moves to next step)

### ✅ Success Criteria:
- [ ] Timer counts down smoothly (no jumps)
- [ ] Progress ring fills gradually
- [ ] Pause/Resume works correctly
- [ ] Button states update properly
- [ ] Time is visible as both number AND shape

---

## 🧠 Test 3: Brain Dump Feature (FR-003)

### What to Test:
The distraction capture system during focus sessions.

### Steps:
1. **While on focus demo page** (`http://localhost:3000/focus-demo`)

2. **Click "Brain Dump (D)" button**
   - ✅ Modal overlay appears
   - ✅ Background blurs
   - ✅ Cursor auto-focuses in text area

3. **Type a thought:**
   ```
   Remember to email Sarah about project
   ```

4. **Test keyboard shortcuts:**
   - Press **Esc** → Modal closes (thought not saved)
   - Open again, type something
   - Press **Cmd+Enter** (Mac) or **Ctrl+Enter** (Windows) → Saves and closes

5. **Click "Save" button**
   - ✅ Modal closes
   - ✅ Thought is logged to console (open DevTools to see)
   - ✅ Focus timer still running in background

### ✅ Success Criteria:
- [ ] Modal opens instantly
- [ ] Cursor is in text area immediately (no clicking needed)
- [ ] Esc key closes modal
- [ ] Cmd/Ctrl+Enter saves
- [ ] Save button works
- [ ] Focus timer doesn't reset when modal opens/closes

---

## ⌨️ Test 4: Keyboard Shortcuts

### On Focus Demo Page:

| Shortcut | Expected Behavior |
|----------|-------------------|
| **Space** | Currently not implemented (next sprint) |
| **D** | Currently not implemented (next sprint) |
| **Esc** | Currently not implemented (next sprint) |
| **Cmd/Ctrl+Enter** | Saves brain dump (when modal open) |

⚠️ Note: Global keyboard shortcuts will be added in next sprint. Currently only modal shortcuts work.

---

## 🐛 Test 5: Edge Cases

### Test Empty Input:
1. Go to `http://localhost:3000`
2. Leave text area empty
3. ✅ No preview should appear
4. ✅ Button should not show

### Test Invalid Input:
1. Type random characters: `asdfasdf 123 !!!`
2. ✅ Should parse as plain text (1 step)
3. ✅ Or show "Couldn't parse" message

### Test Nested Lists:
```
1. Main task
   - Subtask 1
   - Subtask 2
2. Another main task
```
⚠️ Currently only parses top-level items (by design for MVP)

### Test Long Text:
1. Paste a very long task (300+ characters)
2. ✅ Should parse successfully
3. ✅ Preview should show full text

---

## 📱 Test 6: Responsive Design

### Desktop (1920x1080):
- ✅ Content is centered
- ✅ Max width prevents too-wide layouts
- ✅ Progress ring is clearly visible

### Tablet (768px):
- Open DevTools → Toggle device toolbar
- Select "iPad"
- ✅ Layout adjusts gracefully
- ✅ Buttons remain accessible

### Mobile (375px):
- Select "iPhone SE"
- ✅ Text remains readable
- ✅ Progress ring scales down
- ✅ Buttons stack if needed

---

## 🎨 Test 7: Visual Design

### Check These Elements:

**Landing Page:**
- [ ] Gradient background (blue → white → purple)
- [ ] Clean, uncluttered layout
- [ ] Consistent spacing
- [ ] Readable fonts (Inter)
- [ ] Icons render correctly (Sparkles, CheckCircle)

**Focus Mode:**
- [ ] Fullscreen (no browser chrome visible)
- [ ] Progress ring animates smoothly
- [ ] Timer is large and readable (6xl font)
- [ ] Buttons have clear hover states
- [ ] Keyboard shortcut hints visible

**Brain Dump Modal:**
- [ ] Backdrop blur works
- [ ] Modal is centered
- [ ] Text area is large enough
- [ ] Save/Cancel buttons clear

---

## 🔍 Test 8: Browser DevTools

### Check Console:
1. Open DevTools (F12 or Cmd+Option+I)
2. Go to Console tab
3. ✅ Should see "Ready in 286ms" from Next.js
4. ✅ No error messages (red text)
5. When you save a brain dump:
   - ✅ Should log: "Brain dump saved: <your thought>"

### Check Network:
1. Go to Network tab
2. Reload page
3. ✅ All files load successfully (200 status)
4. ✅ No 404 errors
5. ✅ Page loads in < 2 seconds

---

## ✅ Testing Checklist

Use this checklist to track what you've tested:

### Core Features:
- [ ] Paste-and-go parses numbered lists
- [ ] Paste-and-go parses bulleted lists
- [ ] Paste-and-go parses checkbox lists
- [ ] Paste-and-go parses plain text
- [ ] Focus timer starts correctly
- [ ] Focus timer counts down smoothly
- [ ] Progress ring animates
- [ ] Pause/Resume works
- [ ] Brain dump modal opens
- [ ] Brain dump saves thoughts

### UX/UI:
- [ ] Landing page loads fast (< 2 sec)
- [ ] Text is readable
- [ ] Buttons have clear labels
- [ ] Hover states work
- [ ] Focus states visible (accessibility)
- [ ] Mobile responsive

### Edge Cases:
- [ ] Empty input handled gracefully
- [ ] Invalid input doesn't crash
- [ ] Long text displays correctly
- [ ] Modal closes with Esc
- [ ] Timer doesn't reset on brain dump

---

## 🐛 Found a Bug?

If something doesn't work as expected:

1. **Check the browser console** (F12) for error messages
2. **Note what you were doing** (steps to reproduce)
3. **Check if the server is still running** (should auto-reload)
4. **Try refreshing the page** (Cmd+R or Ctrl+R)

Common issues:
- **"Cannot GET /"** → Server crashed, restart with `npm run dev`
- **White screen** → Check console for errors
- **Styles not loading** → Clear browser cache (Cmd+Shift+R)

---

## 🎯 What's Working vs. What's Coming

### ✅ Working Now (Test These):
- Paste-and-go UI
- Task list parsing (4 formats)
- Live preview
- Focus timer
- Progress ring visualization
- Brain dump modal
- Keyboard shortcuts (in modal)

### 🚧 Coming Next (Don't Test Yet):
- Saving plans to database
- Loading real plan data
- Today view (top 3 plans)
- Manual plan creation
- Energy/mood logging
- Streak tracking
- Global keyboard shortcuts

---

## 🚀 Quick Test Script

Run this from your terminal to test if pages load:

```bash
# Test landing page
curl -I http://localhost:3000

# Test focus demo
curl -I http://localhost:3000/focus-demo

# Expected: HTTP/1.1 200 OK
```

---

## 📹 Record Your Test Session

If you want to share feedback:
1. Use screen recording (QuickTime on Mac, Game Bar on Windows)
2. Narrate what you're testing
3. Show any bugs or confusing UX
4. Save and share!

---

**Happy Testing! 🎉**

If you find issues or have suggestions, let me know and I'll fix them right away!

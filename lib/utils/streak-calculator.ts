/**
 * Streak Calculator with Grace Days
 *
 * ADHD-friendly streak tracking:
 * - 2 grace days per week (can miss 2 days without breaking streak)
 * - No guilt messaging
 * - Celebrates consistency, not perfection
 */

interface SessionDate {
  date: string; // YYYY-MM-DD
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  graceDaysUsed: number;
  graceDaysAvailable: number;
  lastSessionDate: string | null;
  streakStartDate: string | null;
  isActiveToday: boolean;
  encouragement: string;
}

const GRACE_DAYS_PER_WEEK = 2;

/**
 * Calculate current streak with grace days
 * A streak continues if:
 * 1. User completed at least 1 session on that day
 * 2. OR missed days are within grace day allowance (2 per week)
 */
export function calculateStreak(
  sessionDates: SessionDate[],
  today: string = new Date().toISOString().split('T')[0]
): StreakData {
  if (sessionDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      graceDaysUsed: 0,
      graceDaysAvailable: GRACE_DAYS_PER_WEEK,
      lastSessionDate: null,
      streakStartDate: null,
      isActiveToday: false,
      encouragement: "Ready to start your first session? 🌱",
    };
  }

  // Get unique dates and sort descending (most recent first)
  const uniqueDates = Array.from(
    new Set(sessionDates.map((s) => s.date))
  ).sort((a, b) => b.localeCompare(a));

  const todayDate = new Date(today);
  const lastSession = new Date(uniqueDates[0]);
  const isActiveToday = uniqueDates[0] === today;

  // Calculate current streak going backwards from last session
  let currentStreak = 0;
  let graceDaysUsed = 0;
  let streakStartDate: string | null = null;
  let currentDate = new Date(lastSession);

  // Count backwards from last session
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const hasSession = uniqueDates.includes(dateStr);

    if (hasSession) {
      currentStreak++;
      streakStartDate = dateStr;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      // No session on this day - check grace days
      const daysSinceLastSession = getDaysBetween(dateStr, uniqueDates[currentStreak] || today);

      if (daysSinceLastSession <= GRACE_DAYS_PER_WEEK && graceDaysUsed < GRACE_DAYS_PER_WEEK) {
        // Use grace day
        graceDaysUsed++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        // Streak broken
        break;
      }
    }

    // Safety: Don't go back more than 365 days
    if (getDaysBetween(currentDate.toISOString().split('T')[0], lastSession.toISOString().split('T')[0]) > 365) {
      break;
    }
  }

  // Calculate longest streak (all-time)
  let longestStreak = currentStreak;
  let tempStreak = 0;
  let tempGrace = 0;

  for (let i = 0; i < uniqueDates.length; i++) {
    tempStreak++;

    // Check gap to next date
    if (i < uniqueDates.length - 1) {
      const gap = getDaysBetween(uniqueDates[i + 1], uniqueDates[i]);

      if (gap > GRACE_DAYS_PER_WEEK + 1 || (gap > 1 && tempGrace >= GRACE_DAYS_PER_WEEK)) {
        // Streak broken
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 0;
        tempGrace = 0;
      } else if (gap > 1) {
        tempGrace += gap - 1;
      }
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  // Generate encouragement
  const encouragement = getEncouragement(currentStreak, graceDaysUsed, isActiveToday);

  return {
    currentStreak,
    longestStreak,
    graceDaysUsed,
    graceDaysAvailable: GRACE_DAYS_PER_WEEK - graceDaysUsed,
    lastSessionDate: uniqueDates[0],
    streakStartDate,
    isActiveToday,
    encouragement,
  };
}

/**
 * Get days between two dates
 */
function getDaysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Generate positive, ADHD-friendly encouragement
 * No guilt, no pressure - just celebration and support
 */
function getEncouragement(streak: number, graceUsed: number, isActiveToday: boolean): string {
  if (streak === 0) {
    return "No worries! Every streak starts with one session. You've got this! 💪";
  }

  if (isActiveToday && streak === 1) {
    return "Great start! You showed up today. 🌱";
  }

  if (isActiveToday && streak < 7) {
    return `${streak} days in a row! You're building momentum! 🚀`;
  }

  if (isActiveToday && streak >= 7 && streak < 14) {
    return `Amazing! ${streak}-day streak! You're crushing it! 🔥`;
  }

  if (isActiveToday && streak >= 14 && streak < 30) {
    return `Incredible ${streak}-day streak! Your consistency is inspiring! ✨`;
  }

  if (isActiveToday && streak >= 30) {
    return `WOW! ${streak} days!! You're a focus champion! 🏆`;
  }

  // Not active today
  if (graceUsed < GRACE_DAYS_PER_WEEK) {
    const remaining = GRACE_DAYS_PER_WEEK - graceUsed;
    return `You have ${remaining} grace day${remaining !== 1 ? 's' : ''} left this week. Take your time! 💜`;
  }

  return `${streak}-day streak! Take a break if you need it - you've earned it! 🌟`;
}

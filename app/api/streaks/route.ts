import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { focusSessions } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { calculateStreak } from '@/lib/utils/streak-calculator';

// GET /api/streaks - Get user's streak data
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'demo-user';

    // Get all completed sessions grouped by date
    const sessions = await db
      .select({
        date: sql<string>`DATE(${focusSessions.startedAt})`.as('date'),
      })
      .from(focusSessions)
      .where(eq(focusSessions.userId, userId))
      .groupBy(sql`DATE(${focusSessions.startedAt})`)
      .orderBy(sql`date DESC`);

    const sessionDates = sessions.map((s) => ({ date: s.date }));
    const streakData = calculateStreak(sessionDates);

    return NextResponse.json({ streak: streakData });
  } catch (error) {
    console.error('Error calculating streak:', error);
    return NextResponse.json(
      { error: 'Failed to calculate streak' },
      { status: 500 }
    );
  }
}

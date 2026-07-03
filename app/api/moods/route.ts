import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { moodLogs, users } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';

// POST /api/moods - Log daily mood
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = 'demo-user', mood } = body;

    if (!mood) {
      return NextResponse.json({ error: 'mood is required' }, { status: 400 });
    }

    const validMoods = ['amazing', 'great', 'good', 'okay', 'tired', 'stressed', 'sad', 'angry'];
    if (!validMoods.includes(mood)) {
      return NextResponse.json({ error: 'Invalid mood value' }, { status: 400 });
    }

    // Ensure user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!existingUser) {
      await db.insert(users).values({ id: userId });
    }

    // Get today's date (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    // Check if already logged today
    const existingLog = await db.query.moodLogs.findFirst({
      where: and(eq(moodLogs.userId, userId), eq(moodLogs.date, today)),
    });

    if (existingLog) {
      // Update existing log
      const [updated] = await db
        .update(moodLogs)
        .set({ mood })
        .where(eq(moodLogs.id, existingLog.id))
        .returning();

      return NextResponse.json({ moodLog: updated });
    }

    // Create new log
    const [moodLog] = await db
      .insert(moodLogs)
      .values({
        userId,
        mood,
        date: today,
      })
      .returning();

    return NextResponse.json({ moodLog }, { status: 201 });
  } catch (error) {
    console.error('Error logging mood:', error);
    return NextResponse.json({ error: 'Failed to log mood' }, { status: 500 });
  }
}

// GET /api/moods - Get mood history
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'demo-user';
    const limit = parseInt(searchParams.get('limit') || '30', 10);

    const logs = await db.query.moodLogs.findMany({
      where: eq(moodLogs.userId, userId),
      orderBy: [desc(moodLogs.date)],
      limit,
    });

    // Check if logged today
    const today = new Date().toISOString().split('T')[0];
    const loggedToday = logs.some((log) => log.date === today);

    return NextResponse.json({
      moodLogs: logs,
      loggedToday,
      todaysMood: loggedToday ? logs[0]?.mood : null,
    });
  } catch (error) {
    console.error('Error fetching mood logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mood logs' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { focusSessions, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// POST /api/sessions - Start a new focus session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = 'demo-user', stepId, durationSeconds } = body;

    if (!stepId || !durationSeconds) {
      return NextResponse.json(
        { error: 'stepId and durationSeconds are required' },
        { status: 400 }
      );
    }

    // Ensure user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!existingUser) {
      await db.insert(users).values({ id: userId });
    }

    // Create session
    const [session] = await db
      .insert(focusSessions)
      .values({
        userId,
        stepId,
        durationSeconds,
        startedAt: new Date(),
      })
      .returning();

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

// GET /api/sessions - Get all sessions for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'demo-user';

    const sessions = await db.query.focusSessions.findMany({
      where: eq(focusSessions.userId, userId),
      with: {
        step: {
          with: {
            plan: true,
          },
        },
      },
      orderBy: (focusSessions, { desc }) => [desc(focusSessions.startedAt)],
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}

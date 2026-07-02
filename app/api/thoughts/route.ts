import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parkedThoughts, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// POST /api/thoughts - Save a brain dump/parked thought
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = 'demo-user', sessionId, text, voiceTranscription = false } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'text is required' },
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

    // Create parked thought
    const [thought] = await db
      .insert(parkedThoughts)
      .values({
        userId,
        sessionId: sessionId || null,
        text,
        voiceTranscription,
        createdAt: new Date(),
      })
      .returning();

    return NextResponse.json({ thought }, { status: 201 });
  } catch (error) {
    console.error('Error saving thought:', error);
    return NextResponse.json(
      { error: 'Failed to save thought' },
      { status: 500 }
    );
  }
}

// GET /api/thoughts - Get all parked thoughts for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'demo-user';
    const sessionId = searchParams.get('sessionId');

    let query = db.query.parkedThoughts.findMany({
      where: eq(parkedThoughts.userId, userId),
      orderBy: (parkedThoughts, { desc }) => [desc(parkedThoughts.createdAt)],
    });

    // Filter by session if provided
    if (sessionId) {
      const thoughts = await db.query.parkedThoughts.findMany({
        where: eq(parkedThoughts.sessionId, sessionId),
        orderBy: (parkedThoughts, { desc }) => [desc(parkedThoughts.createdAt)],
      });
      return NextResponse.json({ thoughts });
    }

    const thoughts = await query;
    return NextResponse.json({ thoughts });
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch thoughts' },
      { status: 500 }
    );
  }
}

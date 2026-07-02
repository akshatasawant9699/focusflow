import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { focusSessions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// PATCH /api/sessions/[id] - Update session (end, pause, add notes)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      endedAt,
      actualDurationSeconds,
      energyLevel,
      focusQuality,
      notes,
      paused,
      completed,
    } = body;

    const updates: any = {};

    if (endedAt) updates.endedAt = new Date(endedAt);
    if (actualDurationSeconds !== undefined)
      updates.actualDurationSeconds = actualDurationSeconds;
    if (energyLevel) updates.energyLevel = energyLevel;
    if (focusQuality) updates.focusQuality = focusQuality;
    if (notes !== undefined) updates.notes = notes;

    // If completed, ensure endedAt is set
    if (completed && !updates.endedAt) {
      updates.endedAt = new Date();
    }

    const [updatedSession] = await db
      .update(focusSessions)
      .set(updates)
      .where(eq(focusSessions.id, id))
      .returning();

    if (!updatedSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({ session: updatedSession });
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    );
  }
}

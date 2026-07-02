import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { steps } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// PATCH /api/steps/[id] - Update step status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'in_progress', 'done', 'skipped'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required' },
        { status: 400 }
      );
    }

    const updates: any = { status };
    if (status === 'done') {
      updates.completedAt = new Date();
    }

    const [updatedStep] = await db
      .update(steps)
      .set(updates)
      .where(eq(steps.id, params.id))
      .returning();

    if (!updatedStep) {
      return NextResponse.json({ error: 'Step not found' }, { status: 404 });
    }

    return NextResponse.json({ step: updatedStep });
  } catch (error) {
    console.error('Error updating step:', error);
    return NextResponse.json(
      { error: 'Failed to update step' },
      { status: 500 }
    );
  }
}

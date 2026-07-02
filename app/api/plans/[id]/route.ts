import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { plans, steps } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/plans/[id] - Fetch a single plan with steps
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const plan = await db.query.plans.findFirst({
      where: eq(plans.id, id),
      with: {
        steps: {
          orderBy: (steps, { asc }) => [asc(steps.order)],
        },
      },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error fetching plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plan' },
      { status: 500 }
    );
  }
}

// PATCH /api/plans/[id] - Update plan status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['active', 'completed', 'archived'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required' },
        { status: 400 }
      );
    }

    const [updatedPlan] = await db
      .update(plans)
      .set({ status, updatedAt: new Date() })
      .where(eq(plans.id, id))
      .returning();

    if (!updatedPlan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ plan: updatedPlan });
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json(
      { error: 'Failed to update plan' },
      { status: 500 }
    );
  }
}

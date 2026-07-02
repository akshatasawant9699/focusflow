import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { plans, steps, users } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET /api/plans - Fetch all active plans for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'demo-user';

    // Ensure user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!existingUser) {
      await db.insert(users).values({ id: userId });
    }

    // Get all active plans with their steps
    const userPlans = await db.query.plans.findMany({
      where: eq(plans.userId, userId),
      with: {
        steps: {
          orderBy: (steps, { asc }) => [asc(steps.order)],
        },
      },
      orderBy: [desc(plans.createdAt)],
    });

    return NextResponse.json({ plans: userPlans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}

// POST /api/plans - Create a new plan with steps
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, steps: stepTexts, userId = 'demo-user' } = body;

    if (!title || !stepTexts || !Array.isArray(stepTexts)) {
      return NextResponse.json(
        { error: 'Title and steps array are required' },
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

    // Create plan
    const [plan] = await db
      .insert(plans)
      .values({
        userId,
        title,
        status: 'active',
      })
      .returning();

    // Create steps
    const stepsToInsert = stepTexts.map((step: { text: string; order: number }) => ({
      planId: plan.id,
      text: step.text,
      order: step.order,
      status: 'pending' as const,
    }));

    const createdSteps = await db.insert(steps).values(stepsToInsert).returning();

    return NextResponse.json(
      {
        plan: {
          ...plan,
          steps: createdSteps,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json(
      { error: 'Failed to create plan' },
      { status: 500 }
    );
  }
}

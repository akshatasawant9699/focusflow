'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FocusTimer } from '@/components/focus-mode/focus-timer';
import { BrainDumpModal } from '@/components/focus-mode/brain-dump-modal';
import { PostSessionModal } from '@/components/focus-mode/post-session-modal';

interface Step {
  id: string;
  text: string;
  order: number;
  status: 'pending' | 'in_progress' | 'done' | 'skipped';
}

interface Plan {
  id: string;
  title: string;
  steps: Step[];
}

function FocusPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('planId');
  const stepId = searchParams.get('stepId');

  const [plan, setPlan] = useState<Plan | null>(null);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showBrainDump, setShowBrainDump] = useState(false);
  const [showPostSession, setShowPostSession] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!planId || !stepId) {
      router.push('/today');
      return;
    }

    fetchPlanAndStartSession();
  }, [planId, stepId]);

  // Global keyboard shortcut for brain dump (D key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') {
        if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
          // Only if not typing in input
          if (
            document.activeElement?.tagName !== 'INPUT' &&
            document.activeElement?.tagName !== 'TEXTAREA'
          ) {
            e.preventDefault();
            setShowBrainDump(true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchPlanAndStartSession = async () => {
    try {
      // Fetch plan
      const response = await fetch(`/api/plans/${planId}`);
      const data = await response.json();

      if (!data.plan) {
        console.error('Plan not found:', data);
        router.push('/today');
        return;
      }

      setPlan(data.plan);

      const step = data.plan.steps?.find((s: Step) => s.id === stepId);

      if (!step) {
        console.error('Step not found:', stepId);
        router.push('/today');
        return;
      }

      setCurrentStep(step);

      // Start focus session
      const sessionResponse = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          stepId,
          durationSeconds: 25 * 60, // 25 minutes default
        }),
      });

      const sessionData = await sessionResponse.json();
      setSessionId(sessionData.session.id);

      // Mark step as in_progress
      await fetch(`/api/steps/${stepId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'in_progress' }),
      });

      setLoading(false);
    } catch (error) {
      console.error('Error starting focus session:', error);
      router.push('/today');
    }
  };

  const handleComplete = async () => {
    if (!currentStep) return;

    // Show post-session modal first
    setShowPostSession(true);
  };

  const handlePostSessionSave = async (data: {
    focusQuality: string;
    energyLevel: string;
    notes: string;
  }) => {
    if (!currentStep || !sessionId) return;

    try {
      // Mark step as done
      await fetch(`/api/steps/${currentStep.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'done' }),
      });

      // End session with mood/energy data
      await fetch(`/api/sessions/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endedAt: new Date().toISOString(),
          focusQuality: data.focusQuality,
          energyLevel: data.energyLevel,
          notes: data.notes,
          completed: true,
        }),
      });

      // Find next step
      if (plan) {
        const nextStep = plan.steps.find(
          (s) => s.order > currentStep.order && s.status === 'pending'
        );

        if (nextStep) {
          // Go to next step
          router.push(`/focus?planId=${planId}&stepId=${nextStep.id}`);
        } else {
          // All done! Go back to Today view
          router.push('/today');
        }
      }
    } catch (error) {
      console.error('Error completing step:', error);
    }
  };

  const handleBrainDump = () => {
    setShowBrainDump(true);
  };

  const handleSaveBrainDump = async (thought: string) => {
    if (!sessionId) return;

    try {
      await fetch('/api/thoughts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          sessionId,
          text: thought,
        }),
      });
      console.log('Brain dump saved');
    } catch (error) {
      console.error('Error saving brain dump:', error);
    }
  };

  const handleTakeBreak = async () => {
    if (!sessionId) return;

    try {
      // Pause session
      await fetch(`/api/sessions/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paused: true,
        }),
      });

      // TODO: Start 5-minute break timer
      alert('Break time! (Break timer coming soon)');
    } catch (error) {
      console.error('Error pausing session:', error);
    }
  };

  if (loading || !currentStep) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="text-white text-2xl font-bold animate-pulse-slow">
          Starting focus session...
        </div>
      </div>
    );
  }

  return (
    <>
      <FocusTimer
        stepText={currentStep.text}
        durationSeconds={25 * 60}
        onComplete={handleComplete}
        onBrainDump={handleBrainDump}
        onTakeBreak={handleTakeBreak}
      />

      <BrainDumpModal
        isOpen={showBrainDump}
        onClose={() => setShowBrainDump(false)}
        onSave={handleSaveBrainDump}
      />

      <PostSessionModal
        isOpen={showPostSession}
        onClose={() => setShowPostSession(false)}
        onSave={handlePostSessionSave}
        stepText={currentStep?.text || ''}
      />
    </>
  );
}

export default function FocusPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
          <div className="text-white text-2xl font-bold animate-pulse-slow">
            Loading...
          </div>
        </div>
      }
    >
      <FocusPageContent />
    </Suspense>
  );
}

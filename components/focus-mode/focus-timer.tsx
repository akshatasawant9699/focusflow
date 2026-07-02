'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, Brain } from 'lucide-react';

interface FocusTimerProps {
  stepText: string;
  durationSeconds: number;
  onComplete: () => void;
  onBrainDump: () => void;
  onTakeBreak: () => void;
}

export function FocusTimer({
  stepText,
  durationSeconds,
  onComplete,
  onBrainDump,
  onTakeBreak,
}: FocusTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Current Step */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            {stepText}
          </h2>
          <p className="text-sm text-muted-foreground">
            Focus on this one step. Nothing else matters right now.
          </p>
        </div>

        {/* Timer with Progress Ring */}
        <div className="flex justify-center">
          <ProgressRing
            value={timeRemaining}
            max={durationSeconds}
            size={280}
            strokeWidth={16}
          >
            <div className="text-center">
              <div className="text-6xl font-mono font-bold text-foreground">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {isRunning ? 'Focusing...' : 'Paused'}
              </div>
            </div>
          </ProgressRing>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={onBrainDump}
            className="gap-2"
          >
            <Brain className="h-5 w-5" />
            Brain Dump (D)
          </Button>

          <Button
            size="lg"
            onClick={toggleTimer}
            className="gap-2 px-8"
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                {timeRemaining === durationSeconds ? 'Start' : 'Resume'}
              </>
            )}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={onComplete}
            className="gap-2"
          >
            <SkipForward className="h-5 w-5" />
            Done
          </Button>
        </div>

        {/* Take Break Option */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={onTakeBreak}
            className="text-sm text-muted-foreground"
          >
            Need a break? (5 min)
          </Button>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Shortcuts: Space to pause/play • D for brain dump • Esc to exit</p>
        </div>
      </div>
    </div>
  );
}

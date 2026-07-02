'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, Brain, Coffee, CheckCircle } from 'lucide-react';

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

  const progress = (timeRemaining / durationSeconds) * 100;

  const toggleTimer = () => setIsRunning(!isRunning);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-8 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        {/* Step Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="glass-strong rounded-3xl p-8">
            <motion.h2
              key={stepText}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-3"
            >
              {stepText}
            </motion.h2>
            <p className="text-lg text-gray-600">
              Focus on this one step. Nothing else matters right now.
            </p>
          </div>
        </motion.div>

        {/* Timer with Progress Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse-slow" />

            {/* Timer */}
            <div className="relative glass-strong rounded-full p-8">
              <ProgressRing
                value={durationSeconds - timeRemaining}
                max={durationSeconds}
                size={320}
                strokeWidth={18}
              >
                <div className="text-center">
                  <motion.div
                    key={timeRemaining}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-7xl font-mono font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  >
                    {formatTime(timeRemaining)}
                  </motion.div>
                  <motion.div
                    animate={{
                      opacity: isRunning ? [1, 0.5, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-lg font-semibold text-gray-600 mt-3"
                  >
                    {isRunning ? '✨ Focusing...' : '⏸️ Paused'}
                  </motion.div>
                  <div className="mt-2 text-sm text-gray-500">
                    {Math.round(progress)}% complete
                  </div>
                </div>
              </ProgressRing>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={onBrainDump}
            className="glass-strong border-white/40 hover:glass text-gray-700 font-semibold gap-2 h-14 px-6"
          >
            <Brain className="h-5 w-5" />
            Brain Dump
            <kbd className="hidden md:inline-flex ml-2 px-2 py-1 text-xs bg-white/50 rounded">D</kbd>
          </Button>

          <Button
            size="lg"
            onClick={toggleTimer}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold gap-2 h-16 px-12 shadow-2xl hover:shadow-purple-500/50 transition-all"
          >
            {isRunning ? (
              <>
                <Pause className="h-6 w-6" />
                <span className="text-xl">Pause</span>
              </>
            ) : (
              <>
                <Play className="h-6 w-6" />
                <span className="text-xl">
                  {timeRemaining === durationSeconds ? 'Start' : 'Resume'}
                </span>
              </>
            )}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={onComplete}
            className="glass-strong border-white/40 hover:glass text-gray-700 font-semibold gap-2 h-14 px-6"
          >
            <CheckCircle className="h-5 w-5 text-green-500" />
            Done
          </Button>
        </motion.div>

        {/* Take Break Option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button
            variant="ghost"
            onClick={onTakeBreak}
            className="glass hover:glass-strong text-gray-700 gap-2"
          >
            <Coffee className="h-4 w-4" />
            Need a break? (5 min rest)
          </Button>
        </motion.div>

        {/* Keyboard Shortcuts Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 glass-strong rounded-2xl p-4 max-w-2xl mx-auto"
        >
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Shortcuts:</span> Space to pause/play • D for brain dump • Esc to exit
          </p>
        </motion.div>
      </div>
    </div>
  );
}

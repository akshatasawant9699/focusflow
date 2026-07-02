'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const moods = [
  { id: 'amazing', emoji: '🤩', label: 'Amazing', color: 'from-amber-400 via-yellow-400 to-orange-400' },
  { id: 'great', emoji: '😊', label: 'Great', color: 'from-emerald-400 via-green-400 to-teal-400' },
  { id: 'good', emoji: '🙂', label: 'Good', color: 'from-sky-400 via-blue-400 to-cyan-400' },
  { id: 'okay', emoji: '😐', label: 'Okay', color: 'from-slate-300 via-gray-300 to-zinc-300' },
  { id: 'tired', emoji: '😴', label: 'Tired', color: 'from-violet-400 via-purple-400 to-indigo-400' },
  { id: 'stressed', emoji: '😰', label: 'Stressed', color: 'from-orange-400 via-red-400 to-rose-400' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: 'from-blue-400 via-indigo-400 to-purple-400' },
  { id: 'angry', emoji: '😠', label: 'Angry', color: 'from-red-500 via-rose-500 to-pink-500' },
];

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [hasTrackedToday, setHasTrackedToday] = useState(false);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setHasTrackedToday(true);
    console.log('Mood tracked:', moodId);
  };

  if (hasTrackedToday && selectedMood) {
    const mood = moods.find(m => m.id === selectedMood);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-3xl p-12 text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-9xl mb-6"
        >
          {mood?.emoji}
        </motion.div>
        <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
          Feeling {mood?.label} today!
        </h3>
        <p className="text-xl text-white/90 drop-shadow-md">
          Thanks for checking in. Let's make today productive! 🌱
        </p>
      </motion.div>
    );
  }

  return (
    <Card className="glass-strong border-white/30 shadow-2xl overflow-hidden">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-white drop-shadow-lg mb-2">
          How are you feeling today?
        </CardTitle>
        <CardDescription className="text-base text-white/80 drop-shadow-md">
          Quick daily check-in to track your mood patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {moods.map((mood, index) => (
            <div key={mood.id} className="relative">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: 'spring' }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMoodSelect(mood.id)}
                className={`group w-full rounded-2xl p-6 flex flex-col items-center gap-3 transition-shadow duration-300 hover:shadow-2xl bg-gradient-to-br ${mood.color} overflow-hidden`}
              >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-2"
                >
                  {mood.emoji}
                </motion.div>
                <span className="text-base font-bold text-white drop-shadow-md">
                  {mood.label}
                </span>
              </div>
              </motion.button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

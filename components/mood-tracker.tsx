'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Meh, Frown, Angry, Heart, Zap, Coffee, Moon } from 'lucide-react';

const moods = [
  { id: 'amazing', emoji: '🤩', label: 'Amazing', color: 'from-yellow-400 to-orange-500', icon: Zap },
  { id: 'great', emoji: '😊', label: 'Great', color: 'from-green-400 to-emerald-500', icon: Smile },
  { id: 'good', emoji: '🙂', label: 'Good', color: 'from-blue-400 to-cyan-500', icon: Heart },
  { id: 'okay', emoji: '😐', label: 'Okay', color: 'from-gray-400 to-slate-500', icon: Meh },
  { id: 'tired', emoji: '😴', label: 'Tired', color: 'from-purple-400 to-indigo-500', icon: Moon },
  { id: 'stressed', emoji: '😰', label: 'Stressed', color: 'from-orange-400 to-red-400', icon: Coffee },
  { id: 'sad', emoji: '😢', label: 'Sad', color: 'from-blue-500 to-indigo-600', icon: Frown },
  { id: 'angry', emoji: '😠', label: 'Angry', color: 'from-red-500 to-rose-600', icon: Angry },
];

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [hasTrackedToday, setHasTrackedToday] = useState(false);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setHasTrackedToday(true);

    // TODO: Save to database
    console.log('Mood tracked:', moodId);
  };

  if (hasTrackedToday && selectedMood) {
    const mood = moods.find(m => m.id === selectedMood);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-3xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-8xl mb-4"
        >
          {mood?.emoji}
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Feeling {mood?.label} today!
        </h3>
        <p className="text-white/80">
          Thanks for checking in. Let's make today productive! 🌱
        </p>
      </motion.div>
    );
  }

  return (
    <Card className="glass-strong border-white/30 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          How are you feeling today?
        </CardTitle>
        <CardDescription className="text-lg text-gray-700">
          Quick daily check-in to track your mood patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {moods.map((mood, index) => {
            const Icon = mood.icon;
            return (
              <motion.button
                key={mood.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMoodSelect(mood.id)}
                className={`relative group rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br ${mood.color} text-white overflow-hidden`}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-5xl mb-2 transform group-hover:scale-125 transition-transform duration-300">
                    {mood.emoji}
                  </div>
                  <Icon className="w-6 h-6 mb-1 mx-auto opacity-80" />
                  <span className="text-sm font-semibold">{mood.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

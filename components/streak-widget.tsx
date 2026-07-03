'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Heart, Sparkles } from 'lucide-react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  graceDaysUsed: number;
  graceDaysAvailable: number;
  isActiveToday: boolean;
  encouragement: string;
}

export function StreakWidget() {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreak();
  }, []);

  const fetchStreak = async () => {
    try {
      const response = await fetch('/api/streaks?userId=demo-user');
      const data = await response.json();
      setStreak(data.streak);
    } catch (error) {
      console.error('Error fetching streak:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="glass-strong border-white/30 shadow-lg">
        <CardContent className="p-6">
          <div className="text-white text-center animate-pulse-slow">Loading streak...</div>
        </CardContent>
      </Card>
    );
  }

  if (!streak) return null;

  return (
    <Card className="glass-strong border-white/30 shadow-2xl overflow-hidden">
      <CardContent className="p-8">
        <div className="flex items-start justify-between gap-6">
          {/* Current Streak */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-3 rounded-xl ${
                streak.currentStreak > 0
                  ? 'bg-gradient-to-br from-orange-500 to-red-500'
                  : 'bg-white/20'
              }`}>
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white/70 text-sm font-semibold drop-shadow">Current Streak</div>
                <motion.div
                  key={streak.currentStreak}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-black text-white drop-shadow-lg"
                >
                  {streak.currentStreak}
                  <span className="text-xl ml-1 text-white/70">
                    {streak.currentStreak === 1 ? 'day' : 'days'}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Grace Days Indicator */}
            {streak.currentStreak > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <Heart className="w-4 h-4 text-pink-300" />
                <span className="text-white/80 text-sm drop-shadow">
                  {streak.graceDaysAvailable === 2 && (
                    <span>2 grace days available 💜</span>
                  )}
                  {streak.graceDaysAvailable === 1 && (
                    <span>1 grace day left this week</span>
                  )}
                  {streak.graceDaysAvailable === 0 && (
                    <span>No grace days left (that's okay!)</span>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Longest Streak */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <div className="text-white/70 text-sm font-semibold drop-shadow">Best</div>
            </div>
            <div className="text-3xl font-black text-white drop-shadow-lg">
              {streak.longestStreak}
            </div>
            <div className="text-white/60 text-xs drop-shadow">
              {streak.longestStreak === 1 ? 'day' : 'days'}
            </div>
          </div>
        </div>

        {/* Encouragement Message */}
        <motion.div
          key={streak.encouragement}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm"
        >
          <p className="text-white text-center font-medium leading-relaxed drop-shadow-md">
            {streak.encouragement}
          </p>
        </motion.div>

        {/* Active Today Badge */}
        {streak.isActiveToday && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
            className="mt-4 text-center"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-sm font-bold shadow-lg">
              ✅ Active Today!
            </span>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

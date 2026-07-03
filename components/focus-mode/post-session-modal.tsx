'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Zap, Battery, BatteryLow, BatteryMedium } from 'lucide-react';

interface PostSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { focusQuality: string; energyLevel: string; notes: string }) => void;
  stepText: string;
}

const focusQualities = [
  { id: 'locked_in', emoji: '🎯', label: 'Locked In', description: 'Deep focus, no distractions', color: 'from-green-500 to-emerald-500' },
  { id: 'ok', emoji: '👍', label: 'Pretty Good', description: 'Stayed on track mostly', color: 'from-blue-500 to-cyan-500' },
  { id: 'distracted', emoji: '😵‍💫', label: 'Distracted', description: 'Struggled to focus', color: 'from-orange-500 to-yellow-500' },
];

const energyLevels = [
  { id: 'high', icon: Battery, label: 'High Energy', description: 'Ready for more!', color: 'from-green-500 to-emerald-500' },
  { id: 'medium', icon: BatteryMedium, label: 'Medium', description: 'Feeling okay', color: 'from-blue-500 to-cyan-500' },
  { id: 'low', icon: BatteryLow, label: 'Low Energy', description: 'Need a break', color: 'from-orange-500 to-red-500' },
];

export function PostSessionModal({ isOpen, onClose, onSave, stepText }: PostSessionModalProps) {
  const [focusQuality, setFocusQuality] = useState<string | null>(null);
  const [energyLevel, setEnergyLevel] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (focusQuality && energyLevel) {
      onSave({
        focusQuality,
        energyLevel,
        notes,
      });
      onClose();
    }
  };

  const handleSkip = () => {
    onSave({
      focusQuality: 'ok',
      energyLevel: 'medium',
      notes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass-strong border-white/30 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-4"
            >
              <Sparkles className="w-16 h-16 text-yellow-400 drop-shadow-lg" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">
              Nice Work! ✨
            </CardTitle>
            <CardDescription className="text-lg text-white/90 drop-shadow-md">
              You completed: <span className="font-semibold">"{stepText}"</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-8">
            {/* Focus Quality */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 drop-shadow-md">
                How was your focus?
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {focusQualities.map((quality) => (
                  <button
                    key={quality.id}
                    onClick={() => setFocusQuality(quality.id)}
                    className={`p-4 rounded-xl transition-all ${
                      focusQuality === quality.id
                        ? `bg-gradient-to-br ${quality.color} shadow-xl scale-105`
                        : 'glass hover:glass-strong'
                    }`}
                  >
                    <div className="text-4xl mb-2">{quality.emoji}</div>
                    <div className="text-white font-bold text-sm drop-shadow">{quality.label}</div>
                    <div className="text-white/70 text-xs drop-shadow">{quality.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 drop-shadow-md">
                What's your energy level?
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {energyLevels.map((energy) => {
                  const Icon = energy.icon;
                  return (
                    <button
                      key={energy.id}
                      onClick={() => setEnergyLevel(energy.id)}
                      className={`p-4 rounded-xl transition-all ${
                        energyLevel === energy.id
                          ? `bg-gradient-to-br ${energy.color} shadow-xl scale-105`
                          : 'glass hover:glass-strong'
                      }`}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-2 text-white" />
                      <div className="text-white font-bold text-sm drop-shadow">{energy.label}</div>
                      <div className="text-white/70 text-xs drop-shadow">{energy.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 drop-shadow-md">
                Any notes? (optional)
              </h3>
              <Textarea
                placeholder="What worked well? What was challenging?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px] bg-white/70 backdrop-blur-sm border-2 border-white/50 focus:border-purple-400 focus:ring-4 focus:ring-purple-200/50 rounded-xl text-gray-800 placeholder:text-gray-500"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="flex-1 glass hover:glass-strong text-white font-semibold"
              >
                Skip
              </Button>
              <Button
                onClick={handleSave}
                disabled={!focusQuality || !energyLevel}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save & Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

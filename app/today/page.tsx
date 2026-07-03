'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Play, CheckCircle2, Plus, ArrowLeft, Trophy } from 'lucide-react';
import Link from 'next/link';
import { StreakWidget } from '@/components/streak-widget';

interface Step {
  id: string;
  text: string;
  order: number;
  status: 'pending' | 'in_progress' | 'done' | 'skipped';
  completedAt?: Date;
}

interface Plan {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: Date;
  steps: Step[];
}

export default function TodayPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans?userId=demo-user');
      const data = await response.json();
      setPlans(data.plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const startFocusSession = (plan: Plan) => {
    // Find the first pending step
    const nextStep = plan.steps.find(s => s.status === 'pending');
    if (nextStep) {
      window.location.href = `/focus?planId=${plan.id}&stepId=${nextStep.id}`;
    }
  };

  const activePlans = plans.filter(p => p.status === 'active').slice(0, 3);
  const completedPlans = plans.filter(p => p.status === 'completed');

  const getProgressPercentage = (plan: Plan) => {
    const doneSteps = plan.steps.filter(s => s.status === 'done').length;
    return Math.round((doneSteps / plan.steps.length) * 100);
  };

  if (loading) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
          <div className="text-center text-white text-xl animate-pulse-slow">Loading your plans...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-black text-white mb-2 drop-shadow-2xl">Today</h1>
            <p className="text-xl text-white/90 drop-shadow-lg">Your active plans and focus sessions</p>
          </div>
          <Link href="/">
            <Button className="glass-strong border-white/30 hover:glass text-white font-semibold gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </Button>
          </Link>
        </div>

        {/* Streak Widget */}
        <div className="mb-12">
          <StreakWidget />
        </div>

        {/* Active Plans */}
        {activePlans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl p-12 text-center shadow-2xl mb-8"
          >
            <div className="text-6xl mb-6">🌱</div>
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">No active plans yet</h2>
            <p className="text-xl text-white/90 mb-8 drop-shadow-md">
              Create your first plan to get started
            </p>
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all gap-3 px-8 py-6 text-lg rounded-xl"
              >
                <Plus className="w-6 h-6" />
                Create First Plan
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-white drop-shadow-lg" />
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">Active Plans</h2>
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-1.5 rounded-xl shadow-md text-sm">
                {activePlans.length}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activePlans.map((plan, index) => {
                const progress = getProgressPercentage(plan);
                const nextStep = plan.steps.find(s => s.status === 'pending');
                const doneCount = plan.steps.filter(s => s.status === 'done').length;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-strong border-white/30 shadow-2xl overflow-hidden hover:scale-[1.02] transition-transform">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <CardTitle className="text-2xl font-bold text-white drop-shadow-lg flex-1">
                            {plan.title}
                          </CardTitle>
                          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold px-3 py-1 rounded-lg shadow-md text-sm">
                            {progress}%
                          </div>
                        </div>
                        <CardDescription className="text-white/80 drop-shadow-md text-base">
                          {doneCount} of {plan.steps.length} steps completed
                        </CardDescription>

                        {/* Progress bar */}
                        <div className="mt-4 w-full bg-white/20 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full"
                          />
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Steps list */}
                        <div className="space-y-2">
                          {plan.steps.map((step, stepIndex) => (
                            <div
                              key={step.id}
                              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                                step.status === 'done'
                                  ? 'bg-green-500/20'
                                  : step.status === 'in_progress'
                                  ? 'bg-blue-500/20'
                                  : 'bg-white/10'
                              }`}
                            >
                              <div className={`min-w-[28px] h-7 rounded-lg flex items-center justify-center text-sm font-bold ${
                                step.status === 'done'
                                  ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
                                  : 'bg-white/30 text-white'
                              }`}>
                                {step.status === 'done' ? '✓' : stepIndex + 1}
                              </div>
                              <span className={`flex-1 text-sm font-medium ${
                                step.status === 'done' ? 'text-white/70 line-through' : 'text-white'
                              } drop-shadow`}>
                                {step.text}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Action button */}
                        {nextStep ? (
                          <Button
                            onClick={() => startFocusSession(plan)}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-lg hover:shadow-xl transition-all gap-2 py-6"
                          >
                            <Play className="w-5 h-5" />
                            Start Next: {nextStep.text.slice(0, 30)}...
                          </Button>
                        ) : (
                          <Button
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg gap-2 py-6"
                            disabled
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            All Steps Complete!
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Plans */}
        {completedPlans.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-white drop-shadow-lg" />
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">Completed</h2>
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-4 py-1.5 rounded-xl shadow-md text-sm">
                {completedPlans.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedPlans.slice(0, 6).map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-strong rounded-2xl p-6 border-white/30 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    <h3 className="font-bold text-lg text-white drop-shadow-md">{plan.title}</h3>
                  </div>
                  <p className="text-white/70 text-sm drop-shadow">
                    {plan.steps.length} steps • Completed
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Create New Plan CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/">
            <Button
              size="lg"
              className="glass-strong border-white/30 hover:glass text-white font-semibold gap-2 px-8 py-6"
            >
              <Plus className="w-5 h-5" />
              Create Another Plan
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

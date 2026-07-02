'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface ParkedThought {
  id: string;
  text: string;
  createdAt: Date;
  voiceTranscription: boolean;
  sessionId?: string;
}

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<ParkedThought[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThoughts();
  }, []);

  const fetchThoughts = async () => {
    try {
      const response = await fetch('/api/thoughts?userId=demo-user');
      const data = await response.json();
      setThoughts(data.thoughts);
    } catch (error) {
      console.error('Error fetching thoughts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
          <div className="text-center text-white text-xl animate-pulse-slow">Loading thoughts...</div>
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

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-black text-white mb-2 drop-shadow-2xl flex items-center gap-4">
              <Brain className="w-12 h-12" />
              Parked Thoughts
            </h1>
            <p className="text-xl text-white/90 drop-shadow-lg">
              Distractions you captured during focus sessions
            </p>
          </div>
          <Link href="/today">
            <Button className="glass-strong border-white/30 hover:glass text-white font-semibold gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Today
            </Button>
          </Link>
        </div>

        {/* Thoughts List */}
        {thoughts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl p-12 text-center shadow-2xl"
          >
            <Brain className="w-16 h-16 mx-auto mb-6 text-white/50" />
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
              No parked thoughts yet
            </h2>
            <p className="text-xl text-white/90 drop-shadow-md">
              Press <kbd className="px-3 py-1 bg-white/20 rounded-lg font-bold mx-1">D</kbd> during
              a focus session to capture distractions
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {thoughts.map((thought, index) => (
              <motion.div
                key={thought.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-strong border-white/30 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-white text-lg leading-relaxed drop-shadow-md mb-3">
                          {thought.text}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-white/70 drop-shadow">
                          <span>{formatDate(thought.createdAt)}</span>
                          {thought.voiceTranscription && (
                            <span className="px-2 py-0.5 bg-purple-500/30 rounded-full text-xs">
                              🎤 Voice
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/50 hover:text-white hover:bg-white/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Card */}
        {thoughts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 glass-strong rounded-2xl p-6 text-center"
          >
            <p className="text-white/90 text-lg drop-shadow">
              <span className="font-bold text-2xl text-white mr-2">{thoughts.length}</span>
              thought{thoughts.length !== 1 ? 's' : ''} captured
            </p>
            <p className="text-white/70 text-sm mt-2 drop-shadow">
              You're getting better at staying focused! 🎯
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}

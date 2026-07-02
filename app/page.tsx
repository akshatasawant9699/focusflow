import { PasteAndGo } from '@/components/paste-and-go';
import { MoodTracker } from '@/components/mood-tracker';
import { Sparkles, Target, Brain, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 animate-float">
          <div className="inline-block mb-6">
            <div className="text-8xl mb-4 animate-pulse-slow">🌱</div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            FocusFlow
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-lg">
            You broke it down. Now do it.
          </p>
          <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
            Open-source focus companion that helps ADHD brains execute task breakdowns without overwhelm.
            <br />
            Paste your tasks from anywhere and start focusing in under 15 seconds.
          </p>
        </div>

        {/* Mood Tracker - Daily Check-in */}
        <div className="max-w-5xl mx-auto mb-16">
          <MoodTracker />
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto mb-16">
          <PasteAndGo />
        </div>

        {/* Feature Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-strong rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-300 group shadow-xl">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-white mb-3 drop-shadow-md">Paste & Go</h3>
            <p className="text-white/80 text-sm leading-relaxed drop-shadow">
              Copy tasks from anywhere. Start in 15 seconds.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-300 group shadow-xl">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-white mb-3 drop-shadow-md">Single-Task Focus</h3>
            <p className="text-white/80 text-sm leading-relaxed drop-shadow">
              One step at a time. No sidebar clutter.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-300 group shadow-xl">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-white mb-3 drop-shadow-md">Brain Dump</h3>
            <p className="text-white/80 text-sm leading-relaxed drop-shadow">
              Park distractions instantly with global hotkey.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-300 group shadow-xl">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-white mb-3 drop-shadow-md">No Shame UI</h3>
            <p className="text-white/80 text-sm leading-relaxed drop-shadow">
              Grace days. Positive reframes. No guilt.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/90 text-sm drop-shadow">
          <p className="font-medium">Built with 💜 for the ADHD community • Open source • Privacy-first</p>
        </div>
      </div>
    </main>
  );
}

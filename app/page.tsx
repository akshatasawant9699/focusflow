import { PasteAndGo } from '@/components/paste-and-go';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🌱 FocusFlow
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            You broke it down. Now do it.
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Open-source focus companion that helps ADHD brains execute task breakdowns without overwhelm.
            Paste your tasks from anywhere and start focusing in under 15 seconds.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <PasteAndGo />

          {/* Design Principles Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-lg border bg-card">
              <div className="font-semibold mb-1">🎯 Single-Task Focus</div>
              <p className="text-muted-foreground">
                Only one step visible at a time. No sidebar clutter.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <div className="font-semibold mb-1">🧠 Brain Dump Capture</div>
              <p className="text-muted-foreground">
                Global hotkey to park distractions without losing focus.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <div className="font-semibold mb-1">🚫 No Shame UI</div>
              <p className="text-muted-foreground">
                Grace days on streaks. Positive reframes. No guilt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

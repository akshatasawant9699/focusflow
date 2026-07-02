'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseTaskList } from '@/lib/utils/parse-task-list';
import { CheckCircle2, Sparkles, Rocket, Copy, Check } from 'lucide-react';

export function PasteAndGo() {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState<{ text: string; order: number }[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      const parsed = parseTaskList(value);
      setPreview(parsed);
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  };

  const handleCreatePlan = async () => {
    if (preview.length === 0) return;

    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Creating plan with steps:', preview);
    alert(`✨ Plan created with ${preview.length} steps!\\n\\nRedirecting to Today view...`);
    setInput('');
    setPreview([]);
    setShowPreview(false);
    setIsCreating(false);
  };

  const exampleTasks = `1. Research the topic
2. Create outline
3. Write first draft
4. Edit and refine
5. Proofread`;

  const handleLoadExample = () => {
    setInput(exampleTasks);
    const parsed = parseTaskList(exampleTasks);
    setPreview(parsed);
    setShowPreview(true);
  };

  return (
    <Card className="glass-strong border-white/30 shadow-2xl overflow-hidden">
      <CardHeader className="relative pb-6">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Paste & Go
            </CardTitle>
            <CardDescription className="text-base text-white/90 leading-relaxed drop-shadow">
              Paste your task breakdown from anywhere. FocusFlow will parse it and get you started in under 15 seconds.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-8 pb-8">
        <div className="relative">
          <Textarea
            placeholder="Paste your tasks here...

Examples:
1. Research topic
2. Write outline
3. Draft first version

Or:
- Set up environment
- Write tests
- Implement feature

Any format works!"
            value={input}
            onChange={handleInputChange}
            className="min-h-[240px] text-base font-mono bg-white/70 backdrop-blur-sm border-2 border-white/50 focus:border-purple-400 focus:ring-4 focus:ring-purple-200/50 rounded-2xl resize-none transition-all shadow-lg text-gray-800 placeholder:text-gray-500"
          />

          {!input && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoadExample}
              className="absolute bottom-4 right-4 glass hover:glass-strong text-gray-700 font-medium"
            >
              <Copy className="w-4 h-4 mr-2" />
              Try Example
            </Button>
          )}
        </div>

        <AnimatePresence>
          {showPreview && preview.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="space-y-6"
            >
              {/* Header with step count and CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-strong rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-2 rounded-xl shadow-md">
                    {preview.length} step{preview.length !== 1 && 's'}
                  </div>
                  <span className="text-white font-semibold drop-shadow">
                    parsed successfully!
                  </span>
                </div>

                <Button
                  onClick={handleCreatePlan}
                  disabled={isCreating}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all gap-3 px-8 py-6 text-lg rounded-xl"
                >
                  {isCreating ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-6 h-6" />
                      Start Focus Session
                    </>
                  )}
                </Button>
              </div>

              {/* Preview list */}
              <div className="space-y-3 glass-strong rounded-2xl p-6 shadow-lg">
                {preview.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, type: 'spring' }}
                    className="flex items-start gap-4 group hover:bg-white/30 p-4 rounded-xl transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold min-w-[36px] h-9 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      {index + 1}
                    </div>
                    <span className="flex-1 text-white font-medium text-base leading-relaxed pt-1 drop-shadow">
                      {task.text}
                    </span>
                    <Check className="w-6 h-6 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1 drop-shadow" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showPreview && preview.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-strong rounded-2xl p-8 text-center shadow-lg"
          >
            <p className="text-white/90 font-medium">
              Couldn't parse any tasks. Try formatting as a numbered or bulleted list.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

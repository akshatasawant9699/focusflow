'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseTaskList } from '@/lib/utils/parse-task-list';
import { CheckCircle2, Sparkles, Rocket, Copy } from 'lucide-react';

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

    // TODO: Implement plan creation API call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    console.log('Creating plan with steps:', preview);

    // For now, just show success and redirect to focus mode
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
      <CardHeader className="relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
        <CardTitle className="flex items-center gap-3 text-3xl relative z-10">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Paste & Go
          </span>
        </CardTitle>
        <CardDescription className="text-gray-700 text-base">
          Paste your task breakdown from anywhere. FocusFlow will parse it and get you started in under 15 seconds.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
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
            className="min-h-[220px] font-mono text-sm bg-white/60 backdrop-blur-sm border-2 border-white/40 focus:border-purple-400 focus:ring-4 focus:ring-purple-200 rounded-2xl resize-none transition-all"
          />

          {!input && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoadExample}
              className="absolute bottom-3 right-3 text-xs glass hover:glass-strong"
            >
              <Copy className="w-3 h-3 mr-1" />
              Try Example
            </Button>
          )}
        </div>

        <AnimatePresence>
          {showPreview && preview.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between glass rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm px-3 py-1 rounded-full">
                    {preview.length} step{preview.length !== 1 && 's'}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    parsed successfully!
                  </span>
                </div>

                <Button
                  onClick={handleCreatePlan}
                  disabled={isCreating}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all gap-2"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      Start Focus Session
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-2 glass rounded-2xl p-6">
                {preview.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 text-sm group hover:bg-white/40 p-3 rounded-xl transition-all"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <span className="flex-1 text-gray-800 font-medium pt-1">
                      {task.text}
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
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
            className="glass rounded-2xl p-6 text-center"
          >
            <p className="text-sm text-gray-600">
              Couldn't parse any tasks. Try formatting as a numbered or bulleted list.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

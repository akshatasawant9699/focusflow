'use client';

import * as React from 'react';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseTaskList } from '@/lib/utils/parse-task-list';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function PasteAndGo() {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState<{ text: string; order: number }[]>([]);
  const [showPreview, setShowPreview] = useState(false);

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

    // TODO: Implement plan creation API call
    console.log('Creating plan with steps:', preview);

    // For now, just clear the form
    setInput('');
    setPreview([]);
    setShowPreview(false);

    alert(`Plan created with ${preview.length} steps! (Backend not implemented yet)`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Paste & Go
          </CardTitle>
          <CardDescription>
            Paste your task breakdown from anywhere. FocusFlow will parse it and get you started in under 15 seconds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={`Paste your tasks here...

Examples:
1. Research topic
2. Write outline
3. Draft first version

Or:
- Set up environment
- Write tests
- Implement feature

Any format works!`}
            value={input}
            onChange={handleInputChange}
            className="min-h-[200px] font-mono text-sm"
          />

          {showPreview && preview.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Preview ({preview.length} steps)</p>
                <Button onClick={handleCreatePlan} size="sm">
                  Create Plan & Start Focus
                </Button>
              </div>

              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                {preview.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="flex-1">{task.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showPreview && preview.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Couldn't parse any tasks. Try formatting as a numbered or bulleted list.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Save, X } from 'lucide-react';

interface BrainDumpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (thought: string) => void;
}

export function BrainDumpModal({ isOpen, onClose, onSave }: BrainDumpModalProps) {
  const [thought, setThought] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (thought.trim()) {
      onSave(thought);
      setThought('');
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Brain Dump
          </CardTitle>
          <CardDescription>
            Capture that intrusive thought and get back to focusing. No need to organize it now.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's on your mind?

Examples:
- Email Sarah about project
- Buy milk
- Research that framework I saw

Just dump it here. You can sort it out later."
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[150px]"
            autoFocus
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel (Esc)
            </Button>
            <Button onClick={handleSave} disabled={!thought.trim()}>
              <Save className="h-4 w-4 mr-2" />
              Save (⌘+Enter)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

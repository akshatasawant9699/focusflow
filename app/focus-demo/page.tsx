'use client';

import { useState } from 'react';
import { FocusTimer } from '@/components/focus-mode/focus-timer';
import { BrainDumpModal } from '@/components/focus-mode/brain-dump-modal';

export default function FocusDemoPage() {
  const [showBrainDump, setShowBrainDump] = useState(false);
  const [brainDumps, setBrainDumps] = useState<string[]>([]);

  const handleComplete = () => {
    alert('Step completed! (In real app, this would move to next step)');
  };

  const handleBrainDump = () => {
    setShowBrainDump(true);
  };

  const handleSaveBrainDump = (thought: string) => {
    setBrainDumps([...brainDumps, thought]);
    console.log('Brain dump saved:', thought);
  };

  const handleTakeBreak = () => {
    alert('Break time! (In real app, this would start a 5-minute break timer)');
  };

  return (
    <>
      <FocusTimer
        stepText="Write the introduction section"
        durationSeconds={25 * 60} // 25 minutes
        onComplete={handleComplete}
        onBrainDump={handleBrainDump}
        onTakeBreak={handleTakeBreak}
      />

      <BrainDumpModal
        isOpen={showBrainDump}
        onClose={() => setShowBrainDump(false)}
        onSave={handleSaveBrainDump}
      />
    </>
  );
}

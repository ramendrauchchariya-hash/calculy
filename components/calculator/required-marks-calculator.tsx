'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateRequiredMarks, formatNumber } from '@/lib/calculations';

export function RequiredMarksCalculator() {
  const [current, setCurrent] = React.useState('250');
  const [currentMax, setCurrentMax] = React.useState('300');
  const [remainingMax, setRemainingMax] = React.useState('200');
  const [target, setTarget] = React.useState('85');

  const result = calculateRequiredMarks(parseFloat(current) || 0, parseFloat(currentMax) || 0, parseFloat(remainingMax) || 0, parseFloat(target) || 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="rm-current" label="Current Marks" value={current} onChange={setCurrent} />
        <InputField id="rm-cmax" label="Current Max Marks" value={currentMax} onChange={setCurrentMax} />
        <InputField id="rm-rmax" label="Remaining Max Marks" value={remainingMax} onChange={setRemainingMax} hint="Marks still to be assessed" />
        <InputField id="rm-target" label="Target Percentage" value={target} onChange={setTarget} suffix="%" />
      </div>
      <ResultCard rows={[
        { label: 'Required Marks', value: formatNumber(result.requiredMarks, 2), highlight: true },
        { label: 'Achievable?', value: result.isAchievable ? 'Yes' : 'No — target too high' },
      ]} />
    </div>
  );
}

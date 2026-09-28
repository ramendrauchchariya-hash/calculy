'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { calculateMarksPercentage, formatNumber } from '@/lib/calculations';

export function MarksPercentageCalculator() {
  const [subjects, setSubjects] = React.useState([{ obtained: '85', max: '100' }, { obtained: '78', max: '100' }, { obtained: '92', max: '100' }]);

  const parsed = subjects.map((s) => ({ marksObtained: parseFloat(s.obtained) || 0, maxMarks: parseFloat(s.max) || 0 }));
  const result = calculateMarksPercentage(parsed);

  const update = (i: number, field: 'obtained' | 'max', val: string) => {
    const next = [...subjects]; next[i] = { ...next[i], [field]: val }; setSubjects(next);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        {subjects.map((s, i) => (
          <div key={i} className="flex gap-2">
            <input type="number" value={s.obtained} onChange={(e) => update(i, 'obtained', e.target.value)} placeholder="Obtained" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input type="number" value={s.max} onChange={(e) => update(i, 'max', e.target.value)} placeholder="Max" className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button onClick={() => setSubjects(subjects.filter((_, idx) => idx !== i))} className="px-2 text-sm border rounded-md hover:bg-accent">✕</button>
          </div>
        ))}
        <button onClick={() => setSubjects([...subjects, { obtained: '80', max: '100' }])} className="text-sm font-medium text-primary hover:underline">+ Add Subject</button>
      </div>
      <ResultCard rows={[
        { label: 'Total Marks', value: String(result.totalMarks) },
        { label: 'Maximum Marks', value: String(result.totalMaxMarks) },
        { label: 'Percentage', value: `${formatNumber(result.percentage, 2)}%`, highlight: true },
      ]} />
    </div>
  );
}

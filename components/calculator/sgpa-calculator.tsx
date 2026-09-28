'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { calculateSGPA, formatNumber } from '@/lib/calculations';

export function SGPACalculator() {
  const [subjects, setSubjects] = React.useState([{ grade: '9', credits: '4' }, { grade: '8', credits: '3' }, { grade: '7', credits: '3' }, { grade: '8', credits: '2' }]);

  const parsed = subjects.map((s) => ({ grade: parseFloat(s.grade) || 0, credits: parseFloat(s.credits) || 0 }));
  const result = calculateSGPA(parsed);

  const update = (i: number, field: 'grade' | 'credits', val: string) => {
    const next = [...subjects]; next[i] = { ...next[i], [field]: val }; setSubjects(next);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        {subjects.map((s, i) => (
          <div key={i} className="flex gap-2">
            <input type="number" value={s.grade} onChange={(e) => update(i, 'grade', e.target.value)} placeholder="Grade Point" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input type="number" value={s.credits} onChange={(e) => update(i, 'credits', e.target.value)} placeholder="Credits" className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button onClick={() => setSubjects(subjects.filter((_, idx) => idx !== i))} className="px-2 text-sm border rounded-md hover:bg-accent">✕</button>
          </div>
        ))}
        <button onClick={() => setSubjects([...subjects, { grade: '8', credits: '3' }])} className="text-sm font-medium text-primary hover:underline">+ Add Subject</button>
      </div>
      <ResultCard rows={[
        { label: 'SGPA', value: formatNumber(result.sgpa, 2), highlight: true },
        { label: 'Total Credits', value: String(result.totalCredits) },
      ]} />
    </div>
  );
}

'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { calculateCGPA, formatNumber } from '@/lib/calculations';

export function CGPACalculator() {
  const [semesters, setSemesters] = React.useState([{ gpa: '8.2', credits: '20' }, { gpa: '7.9', credits: '20' }, { gpa: '8.5', credits: '20' }, { gpa: '8.8', credits: '20' }]);

  const parsed = semesters.map((s) => ({ gpa: parseFloat(s.gpa) || 0, credits: parseFloat(s.credits) || 0 }));
  const result = calculateCGPA(parsed);

  const update = (i: number, field: 'gpa' | 'credits', val: string) => {
    const next = [...semesters]; next[i] = { ...next[i], [field]: val }; setSemesters(next);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        {semesters.map((s, i) => (
          <div key={i} className="flex gap-2">
            <input type="number" value={s.gpa} onChange={(e) => update(i, 'gpa', e.target.value)} placeholder="SGPA" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input type="number" value={s.credits} onChange={(e) => update(i, 'credits', e.target.value)} placeholder="Credits" className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button onClick={() => setSemesters(semesters.filter((_, idx) => idx !== i))} className="px-2 text-sm border rounded-md hover:bg-accent">✕</button>
          </div>
        ))}
        <button onClick={() => setSemesters([...semesters, { gpa: '8', credits: '20' }])} className="text-sm font-medium text-primary hover:underline">+ Add Semester</button>
      </div>
      <ResultCard rows={[
        { label: 'CGPA', value: formatNumber(result.cgpa, 2), highlight: true },
        { label: 'Total Credits', value: String(result.totalCredits) },
        { label: 'Equivalent %', value: `${formatNumber(result.cgpa * 9.5, 2)}%` },
      ]} />
    </div>
  );
}

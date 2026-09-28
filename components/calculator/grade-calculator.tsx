'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateGrade, formatNumber } from '@/lib/calculations';

export function GradeCalculator() {
  const [marks, setMarks] = React.useState('85');
  const [maxMarks, setMaxMarks] = React.useState('100');
  const [scale, setScale] = React.useState<'10' | '100'>('100');

  const result = calculateGrade(parseFloat(marks) || 0, parseFloat(maxMarks) || 0, scale);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="gr-marks" label="Marks Obtained" value={marks} onChange={setMarks} />
        <InputField id="gr-max" label="Maximum Marks" value={maxMarks} onChange={setMaxMarks} />
        <div className="space-y-1.5">
          <label htmlFor="gr-scale" className="text-sm font-medium">Grading Scale</label>
          <select id="gr-scale" value={scale} onChange={(e) => setScale(e.target.value as '10' | '100')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="100">100-point</option>
            <option value="10">10-point</option>
          </select>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Percentage', value: `${formatNumber(result.percentage, 2)}%` },
        { label: 'Grade', value: result.grade, highlight: true },
      ]} />
    </div>
  );
}

'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { calculateAverage, formatNumber } from '@/lib/calculations';

export function AverageCalculator() {
  const [input, setInput] = React.useState('85, 90, 78, 92, 80');

  const numbers = input.split(/[\s,]+/).map((n) => parseFloat(n)).filter((n) => isFinite(n));
  const result = calculateAverage(numbers);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="avg-input" className="text-sm font-medium">Numbers (comma or space separated)</label>
          <textarea id="avg-input" value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Mean (Average)', value: formatNumber(result.mean, 4), highlight: true },
        { label: 'Sum', value: formatNumber(result.sum, 2) },
        { label: 'Count', value: String(result.count) },
        { label: 'Minimum', value: formatNumber(result.min, 2) },
        { label: 'Maximum', value: formatNumber(result.max, 2) },
      ]} />
    </div>
  );
}

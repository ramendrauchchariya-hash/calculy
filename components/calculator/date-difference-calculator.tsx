'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { calculateDateDifference } from '@/lib/calculations';

export function DateDifferenceCalculator() {
  const [start, setStart] = React.useState('2025-01-01');
  const [end, setEnd] = React.useState('2026-09-27');

  const sd = new Date(start);
  const ed = new Date(end);
  const valid = !isNaN(sd.getTime()) && !isNaN(ed.getTime()) && ed >= sd;
  const result = valid ? calculateDateDifference(sd, ed) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="dd-start" className="text-sm font-medium">Start Date</label>
          <input id="dd-start" type="date" value={start} onChange={(e) => setStart(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="dd-end" className="text-sm font-medium">End Date</label>
          <input id="dd-end" type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
      </div>
      {result ? (
        <ResultCard rows={[
          { label: 'Days', value: String(result.days), highlight: true },
          { label: 'Weeks', value: String(result.weeks) },
          { label: 'Months', value: String(result.months) },
          { label: 'Years', value: String(result.years) },
        ]} />
      ) : <ResultCard rows={[{ label: 'Result', value: '—', highlight: true }]} />}
    </div>
  );
}

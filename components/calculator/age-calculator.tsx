'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { calculateAge } from '@/lib/calculations';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = React.useState('1995-03-15');
  const [targetDate, setTargetDate] = React.useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  });

  const birth = new Date(birthDate);
  const target = new Date(targetDate);
  const valid = !isNaN(birth.getTime()) && !isNaN(target.getTime()) && birth <= target;

  const result = valid ? calculateAge(birth, target) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="age-birth" className="text-sm font-medium">Date of Birth</label>
          <input
            id="age-birth"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="age-target" className="text-sm font-medium">Age as of Date</label>
          <input
            id="age-target"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        {!valid && (
          <p className="text-sm text-destructive">Please enter a valid date of birth that is before the target date.</p>
        )}
      </div>

      {result ? (
        <ResultCard
          rows={[
            { label: 'Years', value: String(result.years), highlight: true },
            { label: 'Months', value: String(result.months) },
            { label: 'Days', value: String(result.days) },
            { label: 'Total Days', value: result.totalDays.toLocaleString('en-IN') },
          ]}
        />
      ) : (
        <ResultCard rows={[{ label: 'Result', value: '—', highlight: true }]} />
      )}
    </div>
  );
}

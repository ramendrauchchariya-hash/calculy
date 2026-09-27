'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateCompoundInterest, formatINR } from '@/lib/calculations';

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = React.useState('100000');
  const [rate, setRate] = React.useState('8');
  const [years, setYears] = React.useState('5');
  const [frequency, setFrequency] = React.useState('4');

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(years) || 0;
  const n = parseInt(frequency) || 1;

  const result = calculateCompoundInterest(p, r, t, n);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="ci-principal" label="Principal Amount" value={principal} onChange={setPrincipal} prefix="₹" hint="Initial investment amount" />
        <InputField id="ci-rate" label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" step="0.1" />
        <InputField id="ci-years" label="Time Period" value={years} onChange={setYears} suffix="years" />
        <div className="space-y-1.5">
          <label htmlFor="ci-freq" className="text-sm font-medium">Compounding Frequency</label>
          <select
            id="ci-freq"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="1">Yearly</option>
            <option value="2">Half-Yearly</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
        </div>
      </div>

      <ResultCard
        rows={[
          { label: 'Principal', value: formatINR(p) },
          { label: 'Interest Earned', value: formatINR(result.interestEarned) },
          { label: 'Total Amount', value: formatINR(result.totalAmount), highlight: true },
        ]}
      />
    </div>
  );
}

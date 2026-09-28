'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateFD, formatINR } from '@/lib/calculations';

export function FDCalculator() {
  const [principal, setPrincipal] = React.useState('100000');
  const [rate, setRate] = React.useState('7');
  const [years, setYears] = React.useState('5');
  const [freq, setFreq] = React.useState('4');

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(years) || 0;
  const n = parseInt(freq) || 4;

  const result = calculateFD(p, r, t, n);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="fd-principal" label="Deposit Amount" value={principal} onChange={setPrincipal} prefix="₹" />
        <InputField id="fd-rate" label="Interest Rate" value={rate} onChange={setRate} suffix="%" step="0.1" />
        <InputField id="fd-years" label="Tenure" value={years} onChange={setYears} suffix="years" />
        <div className="space-y-1.5">
          <label htmlFor="fd-freq" className="text-sm font-medium">Compounding</label>
          <select id="fd-freq" value={freq} onChange={(e) => setFreq(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="1">Yearly</option>
            <option value="2">Half-Yearly</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Maturity Amount', value: formatINR(result.maturityAmount), highlight: true },
        { label: 'Interest Earned', value: formatINR(result.interestEarned) },
      ]} />
    </div>
  );
}

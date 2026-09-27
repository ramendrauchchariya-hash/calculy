'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateSimpleInterest, formatINR } from '@/lib/calculations';

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = React.useState('50000');
  const [rate, setRate] = React.useState('10');
  const [years, setYears] = React.useState('3');

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(years) || 0;

  const result = calculateSimpleInterest(p, r, t);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="si-principal" label="Principal Amount" value={principal} onChange={setPrincipal} prefix="₹" hint="Amount you want to invest or borrow" />
        <InputField id="si-rate" label="Interest Rate" value={rate} onChange={setRate} suffix="%" step="0.1" hint="Annual interest rate" />
        <InputField id="si-years" label="Time Period" value={years} onChange={setYears} suffix="years" hint="Duration in years" />
      </div>

      <ResultCard
        rows={[
          { label: 'Principal', value: formatINR(p) },
          { label: 'Simple Interest', value: formatINR(result.interest) },
          { label: 'Total Amount', value: formatINR(result.totalAmount), highlight: true },
        ]}
      />
    </div>
  );
}

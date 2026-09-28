'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateInflation, formatINR } from '@/lib/calculations';

export function InflationCalculator() {
  const [amount, setAmount] = React.useState('100000');
  const [rate, setRate] = React.useState('6');
  const [years, setYears] = React.useState('10');

  const a = parseFloat(amount) || 0;
  const r = parseFloat(rate) || 0;
  const y = parseFloat(years) || 0;

  const result = calculateInflation(a, r, y);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="inf-amount" label="Current Amount" value={amount} onChange={setAmount} prefix="₹" />
        <InputField id="inf-rate" label="Inflation Rate" value={rate} onChange={setRate} suffix="%" step="0.1" hint="India averages 4-6%" />
        <InputField id="inf-years" label="Time Period" value={years} onChange={setYears} suffix="years" />
      </div>
      <ResultCard rows={[
        { label: 'Future Cost', value: formatINR(result.futureAmount), highlight: true },
        { label: 'Increase in Value', value: formatINR(result.increase) },
      ]} />
    </div>
  );
}

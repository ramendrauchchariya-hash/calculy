'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateRD, formatINR } from '@/lib/calculations';

export function RDCalculator() {
  const [monthly, setMonthly] = React.useState('5000');
  const [rate, setRate] = React.useState('7');
  const [years, setYears] = React.useState('3');

  const m = parseFloat(monthly) || 0;
  const r = parseFloat(rate) || 0;
  const months = (parseFloat(years) || 0) * 12;

  const result = calculateRD(m, r, months);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="rd-monthly" label="Monthly Deposit" value={monthly} onChange={setMonthly} prefix="₹" />
        <InputField id="rd-rate" label="Interest Rate" value={rate} onChange={setRate} suffix="%" step="0.1" />
        <InputField id="rd-years" label="Tenure" value={years} onChange={setYears} suffix="years" />
      </div>
      <ResultCard rows={[
        { label: 'Total Deposited', value: formatINR(result.totalDeposited) },
        { label: 'Interest Earned', value: formatINR(result.estimatedInterest) },
        { label: 'Maturity Value', value: formatINR(result.maturityValue), highlight: true },
      ]} />
    </div>
  );
}

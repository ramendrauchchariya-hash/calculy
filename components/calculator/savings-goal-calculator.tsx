'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateSavingsGoal, formatINR } from '@/lib/calculations';

export function SavingsGoalCalculator() {
  const [target, setTarget] = React.useState('2000000');
  const [current, setCurrent] = React.useState('0');
  const [monthly, setMonthly] = React.useState('10000');
  const [rate, setRate] = React.useState('10');

  const t = parseFloat(target) || 0;
  const c = parseFloat(current) || 0;
  const m = parseFloat(monthly) || 0;
  const r = parseFloat(rate) || 0;

  const result = calculateSavingsGoal(t, c, m, r);
  const monthsRequired = result.monthsRequired === Infinity ? 'Never (increase monthly amount)' : `${result.monthsRequired} months (${(result.monthsRequired / 12).toFixed(1)} years)`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="sg-target" label="Target Amount" value={target} onChange={setTarget} prefix="₹" />
        <InputField id="sg-current" label="Current Savings" value={current} onChange={setCurrent} prefix="₹" />
        <InputField id="sg-monthly" label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="₹" />
        <InputField id="sg-rate" label="Expected Annual Return" value={rate} onChange={setRate} suffix="%" step="0.1" />
      </div>
      <ResultCard rows={[
        { label: 'Time Required', value: monthsRequired, highlight: true },
        { label: 'Total Contributions', value: formatINR(result.totalContributions) },
        { label: 'Estimated Growth', value: formatINR(result.estimatedGrowth) },
        { label: 'Final Value', value: formatINR(result.finalValue) },
      ]} />
    </div>
  );
}

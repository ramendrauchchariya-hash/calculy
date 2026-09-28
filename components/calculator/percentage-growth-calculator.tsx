'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculatePercentageChange, formatNumber, formatINR } from '@/lib/calculations';

export function PercentageGrowthCalculator() {
  const [oldVal, setOldVal] = React.useState('50000');
  const [newVal, setNewVal] = React.useState('60000');

  const o = parseFloat(oldVal) || 0;
  const n = parseFloat(newVal) || 0;

  const result = calculatePercentageChange(o, n);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="pg-old" label="Original Value" value={oldVal} onChange={setOldVal} prefix="₹" />
        <InputField id="pg-new" label="New Value" value={newVal} onChange={setNewVal} prefix="₹" />
      </div>
      <ResultCard rows={[
        { label: 'Absolute Change', value: formatINR(result.absoluteChange) },
        { label: 'Percentage Change', value: `${formatNumber(result.percentageChange, 2)}% (${result.direction})`, highlight: true },
      ]} />
    </div>
  );
}

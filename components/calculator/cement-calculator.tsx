'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateCement, formatNumber } from '@/lib/calculations';

export function CementCalculator() {
  const [volume, setVolume] = React.useState('1');
  const [ratio, setRatio] = React.useState('1:2:4');

  const result = calculateCement(parseFloat(volume) || 0, ratio);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="cem-vol" label="Concrete Volume" value={volume} onChange={setVolume} suffix="m³" />
        <div className="space-y-1.5">
          <label htmlFor="cem-ratio" className="text-sm font-medium">Mix Ratio</label>
          <select id="cem-ratio" value={ratio} onChange={(e) => setRatio(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="1:2:4">1:2:4 (M15)</option>
            <option value="1:1.5:3">1:1.5:3 (M20)</option>
            <option value="1:3:6">1:3:6 (M10)</option>
            <option value="1:1:2">1:1:2 (M25)</option>
          </select>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Cement Quantity', value: `${formatNumber(result.cementQty, 1)} kg` },
        { label: 'Cement Bags (50kg)', value: String(result.cementBags), highlight: true },
        { label: 'Sand', value: `${formatNumber(result.sandQty, 3)} m³` },
        { label: 'Aggregate', value: `${formatNumber(result.aggregateQty, 3)} m³` },
      ]} />
    </div>
  );
}

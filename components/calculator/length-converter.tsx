'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { convertUnit, unitConversions, formatNumber } from '@/lib/calculations';

export function LengthConverter() {
  const units = Object.keys(unitConversions.length);
  const [value, setValue] = React.useState('5');
  const [from, setFrom] = React.useState('m');
  const [to, setTo] = React.useState('ft');

  const result = convertUnit(parseFloat(value) || 0, 'length', from, to);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="lc-val" className="text-sm font-medium">Value</label>
          <input id="lc-val" type="number" value={value} onChange={(e) => setValue(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <div className="flex gap-2">
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <ResultCard rows={[{ label: 'Result', value: formatNumber(result, 6), highlight: true }]} />
    </div>
  );
}

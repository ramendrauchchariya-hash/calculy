'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { convertLandArea, landAreaConversions, formatNumber } from '@/lib/calculations';

export function LandAreaConverter() {
  const [value, setValue] = React.useState('2400');
  const [from, setFrom] = React.useState('sqft');
  const [to, setTo] = React.useState('sqm');

  const result = convertLandArea(parseFloat(value) || 0, from, to);
  const units = Object.keys(landAreaConversions);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="la-value" className="text-sm font-medium">Value</label>
          <input id="la-value" type="number" value={value} onChange={(e) => setValue(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="la-from" className="text-sm font-medium">From</label>
          <select id="la-from" value={from} onChange={(e) => setFrom(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="la-to" className="text-sm font-medium">To</label>
          <select id="la-to" value={to} onChange={(e) => setTo(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Converted Value', value: formatNumber(result, 4), highlight: true },
      ]} />
    </div>
  );
}

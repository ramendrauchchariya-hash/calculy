'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { convertTemperature, formatNumber } from '@/lib/calculations';

export function TemperatureConverter() {
  const [value, setValue] = React.useState('25');
  const [from, setFrom] = React.useState<'celsius' | 'fahrenheit' | 'kelvin'>('celsius');
  const [to, setTo] = React.useState<'celsius' | 'fahrenheit' | 'kelvin'>('fahrenheit');

  const result = convertTemperature(parseFloat(value) || 0, from, to);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="tc-val" className="text-sm font-medium">Value</label>
          <input id="tc-val" type="number" value={value} onChange={(e) => setValue(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <div className="flex gap-2">
          <select value={from} onChange={(e) => setFrom(e.target.value as 'celsius' | 'fahrenheit' | 'kelvin')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
            <option value="kelvin">Kelvin (K)</option>
          </select>
          <select value={to} onChange={(e) => setTo(e.target.value as 'celsius' | 'fahrenheit' | 'kelvin')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
            <option value="kelvin">Kelvin (K)</option>
          </select>
        </div>
      </div>
      <ResultCard rows={[{ label: 'Result', value: formatNumber(result, 4), highlight: true }]} />
    </div>
  );
}

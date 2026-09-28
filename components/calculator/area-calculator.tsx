'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { calculateArea, formatNumber } from '@/lib/calculations';

export function AreaCalculator() {
  const [shape, setShape] = React.useState<'rectangle' | 'square' | 'triangle' | 'circle'>('rectangle');
  const [dims, setDims] = React.useState<Record<string, string>>({ length: '30', width: '40', side: '10', base: '10', height: '8', radius: '7' });

  const numDims: Record<string, number> = {};
  for (const k in dims) numDims[k] = parseFloat(dims[k]) || 0;

  const result = calculateArea(shape, numDims);
  const setDim = (k: string, v: string) => setDims({ ...dims, [k]: v });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Shape</label>
          <div className="flex flex-wrap gap-2">
            {(['rectangle', 'square', 'triangle', 'circle'] as const).map((s) => (
              <button key={s} type="button" onClick={() => setShape(s)} className={`px-3 py-1.5 text-sm rounded-md border ${shape === s ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
            ))}
          </div>
        </div>
        {shape === 'rectangle' && (<><input type="number" value={dims.length} onChange={(e) => setDim('length', e.target.value)} placeholder="Length" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /><input type="number" value={dims.width} onChange={(e) => setDim('width', e.target.value)} placeholder="Width" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></>)}
        {shape === 'square' && <input type="number" value={dims.side} onChange={(e) => setDim('side', e.target.value)} placeholder="Side" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />}
        {shape === 'triangle' && (<><input type="number" value={dims.base} onChange={(e) => setDim('base', e.target.value)} placeholder="Base" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /><input type="number" value={dims.height} onChange={(e) => setDim('height', e.target.value)} placeholder="Height" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></>)}
        {shape === 'circle' && <input type="number" value={dims.radius} onChange={(e) => setDim('radius', e.target.value)} placeholder="Radius" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />}
      </div>
      <ResultCard rows={[
        { label: 'Area', value: formatNumber(result.area, 2), highlight: true },
        { label: 'Perimeter', value: formatNumber(result.perimeter, 2) },
      ]} />
    </div>
  );
}

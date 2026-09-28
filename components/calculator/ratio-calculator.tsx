'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { simplifyRatio, solveRatio } from '@/lib/calculations';

export function RatioCalculator() {
  const [mode, setMode] = React.useState<'simplify' | 'solve'>('simplify');
  const [a, setA] = React.useState('20');
  const [b, setB] = React.useState('30');
  const [c, setC] = React.useState('5');

  const aN = parseFloat(a) || 0;
  const bN = parseFloat(b) || 0;
  const cN = parseFloat(c) || 0;

  const simplifyResult = simplifyRatio(aN, bN);
  const solveResult = solveRatio(aN, bN, cN);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => setMode('simplify')} className={`px-3 py-1.5 text-sm rounded-md border ${mode === 'simplify' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Simplify Ratio</button>
          <button onClick={() => setMode('solve')} className={`px-3 py-1.5 text-sm rounded-md border ${mode === 'solve' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Solve Missing Value</button>
        </div>
        <InputField id="ratio-a" label={mode === 'simplify' ? 'Value A' : 'A (a:b = c:d)'} value={a} onChange={setA} />
        <InputField id="ratio-b" label={mode === 'simplify' ? 'Value B' : 'B (a:b = c:d)'} value={b} onChange={setB} />
        {mode === 'solve' && <InputField id="ratio-c" label="C (a:b = c:d)" value={c} onChange={setC} />}
      </div>
      <ResultCard rows={mode === 'simplify' ? [
        { label: 'Simplified Ratio', value: simplifyResult.ratio, highlight: true },
      ] : [
        { label: 'D', value: String(solveResult.d), highlight: true },
      ]} />
    </div>
  );
}

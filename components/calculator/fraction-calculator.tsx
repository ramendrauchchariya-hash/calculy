'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateFraction, formatNumber } from '@/lib/calculations';

export function FractionCalculator() {
  const [n1, setN1] = React.useState('1');
  const [d1, setD1] = React.useState('4');
  const [n2, setN2] = React.useState('2');
  const [d2, setD2] = React.useState('3');
  const [op, setOp] = React.useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');

  const result = calculateFraction(parseFloat(n1) || 0, parseFloat(d1) || 1, parseFloat(n2) || 0, parseFloat(d2) || 1, op);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Fraction 1</label>
          <div className="flex gap-2">
            <input type="number" value={n1} onChange={(e) => setN1(e.target.value)} placeholder="Numerator" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input type="number" value={d1} onChange={(e) => setD1(e.target.value)} placeholder="Denominator" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="flex gap-2">
          {(['add', 'subtract', 'multiply', 'divide'] as const).map((o) => (
            <button key={o} onClick={() => setOp(o)} className={`px-3 py-1.5 text-sm rounded-md border ${op === o ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>{o === 'add' ? '+' : o === 'subtract' ? '−' : o === 'multiply' ? '×' : '÷'}</button>
          ))}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Fraction 2</label>
          <div className="flex gap-2">
            <input type="number" value={n2} onChange={(e) => setN2(e.target.value)} placeholder="Numerator" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input type="number" value={d2} onChange={(e) => setD2(e.target.value)} placeholder="Denominator" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Simplified', value: result.simplified, highlight: true },
        { label: 'Decimal', value: formatNumber(result.decimal, 6) },
      ]} />
    </div>
  );
}

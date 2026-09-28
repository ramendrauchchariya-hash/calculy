'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { calculateTimeAdd } from '@/lib/calculations';

export function TimeCalculator() {
  const [h1, setH1] = React.useState('2');
  const [m1, setM1] = React.useState('45');
  const [s1, setS1] = React.useState('0');
  const [h2, setH2] = React.useState('3');
  const [m2, setM2] = React.useState('30');
  const [s2, setS2] = React.useState('0');
  const [op, setOp] = React.useState<'add' | 'subtract'>('add');

  const result = calculateTimeAdd(
    { hours: parseInt(h1) || 0, minutes: parseInt(m1) || 0, seconds: parseInt(s1) || 0 },
    { hours: parseInt(h2) || 0, minutes: parseInt(m2) || 0, seconds: parseInt(s2) || 0 },
    op
  );

  const inputCls = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => setOp('add')} className={`px-3 py-1.5 text-sm rounded-md border ${op === 'add' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Add</button>
          <button onClick={() => setOp('subtract')} className={`px-3 py-1.5 text-sm rounded-md border ${op === 'subtract' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Subtract</button>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Time 1</label>
          <div className="flex gap-2">
            <input type="number" value={h1} onChange={(e) => setH1(e.target.value)} placeholder="Hrs" className={inputCls} />
            <input type="number" value={m1} onChange={(e) => setM1(e.target.value)} placeholder="Min" className={inputCls} />
            <input type="number" value={s1} onChange={(e) => setS1(e.target.value)} placeholder="Sec" className={inputCls} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Time 2</label>
          <div className="flex gap-2">
            <input type="number" value={h2} onChange={(e) => setH2(e.target.value)} placeholder="Hrs" className={inputCls} />
            <input type="number" value={m2} onChange={(e) => setM2(e.target.value)} placeholder="Min" className={inputCls} />
            <input type="number" value={s2} onChange={(e) => setS2(e.target.value)} placeholder="Sec" className={inputCls} />
          </div>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Result', value: `${result.hours}h ${result.minutes}m ${result.seconds}s`, highlight: true },
      ]} />
    </div>
  );
}

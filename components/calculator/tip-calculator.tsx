'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateTip, formatINR } from '@/lib/calculations';

export function TipCalculator() {
  const [bill, setBill] = React.useState('2400');
  const [tipPct, setTipPct] = React.useState('10');
  const [people, setPeople] = React.useState('4');

  const b = parseFloat(bill) || 0;
  const t = parseFloat(tipPct) || 0;
  const p = parseInt(people) || 1;

  const result = calculateTip(b, t, p);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="tip-bill" label="Bill Amount" value={bill} onChange={setBill} prefix="₹" />
        <InputField id="tip-pct" label="Tip Percentage" value={tipPct} onChange={setTipPct} suffix="%" />
        <InputField id="tip-people" label="Number of People" value={people} onChange={setPeople} type="number" min={1} step="1" />
      </div>
      <ResultCard rows={[
        { label: 'Tip Amount', value: formatINR(result.tipAmount) },
        { label: 'Total Bill', value: formatINR(result.totalBill) },
        { label: 'Per Person', value: formatINR(result.perPerson), highlight: true },
      ]} />
    </div>
  );
}

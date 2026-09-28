'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateBillSplit, formatINR } from '@/lib/calculations';

export function BillSplitter() {
  const [bill, setBill] = React.useState('3600');
  const [people, setPeople] = React.useState('6');
  const [tipPct, setTipPct] = React.useState('0');

  const b = parseFloat(bill) || 0;
  const p = parseInt(people) || 1;
  const t = parseFloat(tipPct) || 0;

  const result = calculateBillSplit(b, p, t);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="bs-bill" label="Total Bill" value={bill} onChange={setBill} prefix="₹" />
        <InputField id="bs-people" label="Number of People" value={people} onChange={setPeople} type="number" min={1} step="1" />
        <InputField id="bs-tip" label="Tip Percentage" value={tipPct} onChange={setTipPct} suffix="%" />
      </div>
      <ResultCard rows={[
        { label: 'Tip', value: formatINR(result.tip) },
        { label: 'Total with Tip', value: formatINR(result.totalWithTip) },
        { label: 'Per Person', value: formatINR(result.perPerson), highlight: true },
      ]} />
    </div>
  );
}

'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateGST, formatINR } from '@/lib/calculations';

export function GSTCalculator() {
  const [amount, setAmount] = React.useState('1000');
  const [rate, setRate] = React.useState('18');
  const [mode, setMode] = React.useState<'exclusive' | 'inclusive'>('exclusive');

  const amt = parseFloat(amount) || 0;
  const gstRate = parseFloat(rate) || 0;

  const result = calculateGST(amt, gstRate, mode);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="gst-amount" label="Amount" value={amount} onChange={setAmount} prefix="₹" hint="Enter the transaction amount" />
        <InputField id="gst-rate" label="GST Rate" value={rate} onChange={setRate} suffix="%" step="0.1" hint="GST slab: 5%, 12%, 18%, or 28%" />
        <div className="space-y-1.5">
          <label className="text-sm font-medium">GST Type</label>
          <div className="flex rounded-md border overflow-hidden w-fit">
            <button
              type="button"
              onClick={() => setMode('exclusive')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${mode === 'exclusive' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
            >
              Exclusive (Add GST)
            </button>
            <button
              type="button"
              onClick={() => setMode('inclusive')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${mode === 'inclusive' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
            >
              Inclusive (Remove GST)
            </button>
          </div>
        </div>
      </div>

      <ResultCard
        rows={[
          { label: 'Base Amount', value: formatINR(result.baseAmount) },
          { label: 'GST Amount', value: formatINR(result.gstAmount) },
          { label: 'CGST', value: formatINR(result.cgst) },
          { label: 'SGST', value: formatINR(result.sgst) },
          { label: 'Total Amount', value: formatINR(result.totalAmount), highlight: true },
        ]}
      />
    </div>
  );
}

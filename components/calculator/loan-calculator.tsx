'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateLoan, formatINR } from '@/lib/calculations';

export function LoanCalculator() {
  const [amount, setAmount] = React.useState('500000');
  const [rate, setRate] = React.useState('13');
  const [tenure, setTenure] = React.useState('5');
  const [unit, setUnit] = React.useState<'years' | 'months'>('years');

  const principal = parseFloat(amount) || 0;
  const annualRate = parseFloat(rate) || 0;
  const months = unit === 'years' ? (parseFloat(tenure) || 0) * 12 : parseFloat(tenure) || 0;

  const result = calculateLoan(principal, annualRate, months);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="loan-amount" label="Loan Amount" value={amount} onChange={setAmount} prefix="₹" />
        <InputField id="loan-rate" label="Interest Rate" value={rate} onChange={setRate} suffix="%" step="0.1" />
        <div className="space-y-1.5">
          <label htmlFor="loan-tenure" className="text-sm font-medium">Loan Term</label>
          <div className="flex gap-2">
            <input id="loan-tenure" type="number" min={0} value={tenure} onChange={(e) => setTenure(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            <div className="flex rounded-md border overflow-hidden">
              <button type="button" onClick={() => setUnit('years')} className={`px-3 text-sm font-medium ${unit === 'years' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}>Years</button>
              <button type="button" onClick={() => setUnit('months')} className={`px-3 text-sm font-medium ${unit === 'months' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}>Months</button>
            </div>
          </div>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Monthly Payment', value: formatINR(result.monthlyPayment), highlight: true },
        { label: 'Total Interest', value: formatINR(result.totalInterest) },
        { label: 'Total Repayment', value: formatINR(result.totalRepayment) },
      ]} />
    </div>
  );
}

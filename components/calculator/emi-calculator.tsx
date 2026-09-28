'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateEMI, formatINR } from '@/lib/calculations';

export function EMICalculator() {
  const [amount, setAmount] = React.useState('1000000');
  const [rate, setRate] = React.useState('8.5');
  const [tenure, setTenure] = React.useState('20');
  const [tenureUnit, setTenureUnit] = React.useState<'years' | 'months'>('years');

  const principal = parseFloat(amount) || 0;
  const annualRate = parseFloat(rate) || 0;
  const months = tenureUnit === 'years' ? (parseFloat(tenure) || 0) * 12 : parseFloat(tenure) || 0;

  const result = calculateEMI(principal, annualRate, months);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="emi-amount" label="Loan Amount" value={amount} onChange={setAmount} prefix="₹" hint="Total amount you wish to borrow" />
        <InputField id="emi-rate" label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" step="0.1" hint="Interest rate offered by your lender" />
        <div className="space-y-1.5">
          <label htmlFor="emi-tenure" className="text-sm font-medium">Loan Tenure</label>
          <div className="flex gap-2">
            <input
              id="emi-tenure"
              type="number"
              min={0}
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="flex rounded-md border overflow-hidden">
              <button
                type="button"
                onClick={() => setTenureUnit('years')}
                className={`px-3 text-sm font-medium transition-colors ${tenureUnit === 'years' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
              >
                Years
              </button>
              <button
                type="button"
                onClick={() => setTenureUnit('months')}
                className={`px-3 text-sm font-medium transition-colors ${tenureUnit === 'months' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
              >
                Months
              </button>
            </div>
          </div>
        </div>
      </div>

      <ResultCard
        rows={[
          { label: 'Monthly EMI', value: formatINR(result.emi), highlight: true },
          { label: 'Total Interest', value: formatINR(result.totalInterest) },
          { label: 'Total Payment', value: formatINR(result.totalPayment) },
          { label: 'Principal Amount', value: formatINR(principal) },
        ]}
      />
    </div>
  );
}

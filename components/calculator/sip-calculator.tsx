'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateSIP, formatINR } from '@/lib/calculations';

export function SIPCalculator() {
  const [amount, setAmount] = React.useState('5000');
  const [rate, setRate] = React.useState('12');
  const [years, setYears] = React.useState('10');

  const monthly = parseFloat(amount) || 0;
  const annualRate = parseFloat(rate) || 0;
  const period = parseFloat(years) || 0;

  const result = calculateSIP(monthly, annualRate, period);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="sip-amount" label="Monthly Investment" value={amount} onChange={setAmount} prefix="₹" hint="Amount you invest every month" />
        <InputField id="sip-rate" label="Expected Annual Return" value={rate} onChange={setRate} suffix="%" step="0.1" hint="Expected return rate of the mutual fund" />
        <InputField id="sip-years" label="Investment Period" value={years} onChange={setYears} suffix="years" hint="Number of years you stay invested" />
      </div>

      <ResultCard
        rows={[
          { label: 'Invested Amount', value: formatINR(result.investedAmount) },
          { label: 'Estimated Returns', value: formatINR(result.estimatedReturns) },
          { label: 'Total Value', value: formatINR(result.totalValue), highlight: true },
        ]}
      />
    </div>
  );
}

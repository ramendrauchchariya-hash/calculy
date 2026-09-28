'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateSalary, formatINR } from '@/lib/calculations';

export function SalaryCalculator() {
  const [ctc, setCtc] = React.useState('1200000');
  const [basicPct, setBasicPct] = React.useState('50');
  const [deductions, setDeductions] = React.useState('0');

  const c = parseFloat(ctc) || 0;
  const b = parseFloat(basicPct) || 0;
  const d = parseFloat(deductions) || 0;

  const result = calculateSalary(c, b, 0, d);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="sal-ctc" label="Annual CTC" value={ctc} onChange={setCtc} prefix="₹" />
        <InputField id="sal-basic" label="Basic Salary %" value={basicPct} onChange={setBasicPct} suffix="%" />
        <InputField id="sal-deduct" label="Monthly Deductions" value={deductions} onChange={setDeductions} prefix="₹" hint="PF, tax, insurance, etc." />
      </div>
      <ResultCard rows={[
        { label: 'Monthly Gross', value: formatINR(result.monthlyGross) },
        { label: 'Estimated Deductions', value: formatINR(result.estimatedDeductions) },
        { label: 'Monthly Take-Home', value: formatINR(result.takeHome), highlight: true },
        { label: 'Annual Take-Home', value: formatINR(result.annualSalary) },
      ]} />
    </div>
  );
}

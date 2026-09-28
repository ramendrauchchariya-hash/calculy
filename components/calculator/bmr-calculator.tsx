'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateBMR, formatNumber } from '@/lib/calculations';

export function BMRCalculator() {
  const [weight, setWeight] = React.useState('75');
  const [height, setHeight] = React.useState('178');
  const [age, setAge] = React.useState('30');
  const [sex, setSex] = React.useState<'male' | 'female'>('male');

  const result = calculateBMR(parseFloat(weight) || 0, parseFloat(height) || 0, parseFloat(age) || 0, sex);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="bmr-w" label="Weight" value={weight} onChange={setWeight} suffix="kg" />
        <InputField id="bmr-h" label="Height" value={height} onChange={setHeight} suffix="cm" />
        <InputField id="bmr-a" label="Age" value={age} onChange={setAge} suffix="years" />
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Sex</label>
          <div className="flex gap-2">
            <button onClick={() => setSex('male')} className={`px-3 py-1.5 text-sm rounded-md border ${sex === 'male' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Male</button>
            <button onClick={() => setSex('female')} className={`px-3 py-1.5 text-sm rounded-md border ${sex === 'female' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Female</button>
          </div>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'BMR', value: `${formatNumber(result.bmr, 0)} cal/day`, highlight: true },
      ]} />
    </div>
  );
}

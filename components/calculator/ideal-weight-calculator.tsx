'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateIdealWeight, formatNumber } from '@/lib/calculations';

export function IdealWeightCalculator() {
  const [height, setHeight] = React.useState('178');
  const [sex, setSex] = React.useState<'male' | 'female'>('male');

  const result = calculateIdealWeight(parseFloat(height) || 0, sex);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="iw-h" label="Height" value={height} onChange={setHeight} suffix="cm" />
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Sex</label>
          <div className="flex gap-2">
            <button onClick={() => setSex('male')} className={`px-3 py-1.5 text-sm rounded-md border ${sex === 'male' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Male</button>
            <button onClick={() => setSex('female')} className={`px-3 py-1.5 text-sm rounded-md border ${sex === 'female' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Female</button>
          </div>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Ideal Weight', value: `${formatNumber(result.idealWeight, 1)} kg`, highlight: true },
        { label: 'Healthy Range', value: `${formatNumber(result.rangeLow, 1)} - ${formatNumber(result.rangeHigh, 1)} kg` },
      ]} />
    </div>
  );
}

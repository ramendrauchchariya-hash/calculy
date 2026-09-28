'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateWaterIntake, formatNumber } from '@/lib/calculations';

export function WaterIntakeCalculator() {
  const [weight, setWeight] = React.useState('70');
  const [activity, setActivity] = React.useState<'low' | 'moderate' | 'high'>('moderate');

  const result = calculateWaterIntake(parseFloat(weight) || 0, activity);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="wi-w" label="Weight" value={weight} onChange={setWeight} suffix="kg" />
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Activity Level</label>
          <div className="flex gap-2">
            <button onClick={() => setActivity('low')} className={`px-3 py-1.5 text-sm rounded-md border ${activity === 'low' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Low</button>
            <button onClick={() => setActivity('moderate')} className={`px-3 py-1.5 text-sm rounded-md border ${activity === 'moderate' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Moderate</button>
            <button onClick={() => setActivity('high')} className={`px-3 py-1.5 text-sm rounded-md border ${activity === 'high' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>High</button>
          </div>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Daily Water Intake', value: `${formatNumber(result.litres, 2)} litres`, highlight: true },
        { label: 'Glasses (250ml)', value: String(result.glasses) },
      ]} />
    </div>
  );
}

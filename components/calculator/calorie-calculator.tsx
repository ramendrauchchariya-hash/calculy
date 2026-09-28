'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateDailyCalories, formatNumber } from '@/lib/calculations';

export function CalorieCalculator() {
  const [weight, setWeight] = React.useState('75');
  const [height, setHeight] = React.useState('178');
  const [age, setAge] = React.useState('30');
  const [sex, setSex] = React.useState<'male' | 'female'>('male');
  const [activity, setActivity] = React.useState<'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive'>('moderate');

  const result = calculateDailyCalories(parseFloat(weight) || 0, parseFloat(height) || 0, parseFloat(age) || 0, sex, activity);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="cal-w" label="Weight" value={weight} onChange={setWeight} suffix="kg" />
        <InputField id="cal-h" label="Height" value={height} onChange={setHeight} suffix="cm" />
        <InputField id="cal-a" label="Age" value={age} onChange={setAge} suffix="years" />
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Sex</label>
          <div className="flex gap-2">
            <button onClick={() => setSex('male')} className={`px-3 py-1.5 text-sm rounded-md border ${sex === 'male' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Male</button>
            <button onClick={() => setSex('female')} className={`px-3 py-1.5 text-sm rounded-md border ${sex === 'female' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>Female</button>
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="cal-act" className="text-sm font-medium">Activity Level</label>
          <select id="cal-act" value={activity} onChange={(e) => setActivity(e.target.value as 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="active">Active (daily exercise)</option>
            <option value="veryActive">Very Active (intense daily training)</option>
          </select>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'BMR', value: `${formatNumber(result.bmr, 0)} cal/day` },
        { label: 'TDEE (Maintenance)', value: `${formatNumber(result.tdee, 0)} cal/day`, highlight: true },
        { label: 'Weight Loss (−500)', value: `${formatNumber(result.tdee - 500, 0)} cal/day` },
        { label: 'Weight Gain (+500)', value: `${formatNumber(result.tdee + 500, 0)} cal/day` },
      ]} />
    </div>
  );
}

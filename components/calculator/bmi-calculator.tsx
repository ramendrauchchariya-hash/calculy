'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateBMI, formatNumber } from '@/lib/calculations';

export function BMICalculator() {
  const [weight, setWeight] = React.useState('70');
  const [height, setHeight] = React.useState('170');

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;

  const result = calculateBMI(w, h);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="bmi-weight" label="Weight" value={weight} onChange={setWeight} suffix="kg" hint="Your weight in kilograms" />
        <InputField id="bmi-height" label="Height" value={height} onChange={setHeight} suffix="cm" hint="Your height in centimetres" />
      </div>

      <div className="space-y-4">
        <ResultCard
          rows={[
            { label: 'Your BMI', value: formatNumber(result.bmi, 1), highlight: true },
            { label: 'Category', value: result.category },
          ]}
        />
        <div className="rounded-lg border p-4 text-sm">
          <h3 className="font-semibold mb-2">BMI Categories</h3>
          <ul className="space-y-1 text-muted-foreground">
            <li>Underweight: BMI below 18.5</li>
            <li>Normal weight: BMI 18.5 – 24.9</li>
            <li>Overweight: BMI 25 – 29.9</li>
            <li>Obese: BMI 30 or above</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

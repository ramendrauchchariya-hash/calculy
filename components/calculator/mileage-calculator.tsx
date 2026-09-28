'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateMileage, formatNumber } from '@/lib/calculations';

export function MileageCalculator() {
  const [distance, setDistance] = React.useState('450');
  const [fuel, setFuel] = React.useState('30');

  const result = calculateMileage(parseFloat(distance) || 0, parseFloat(fuel) || 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="mi-dist" label="Distance" value={distance} onChange={setDistance} suffix="km" />
        <InputField id="mi-fuel" label="Fuel Used" value={fuel} onChange={setFuel} suffix="litres" />
      </div>
      <ResultCard rows={[
        { label: 'Mileage', value: `${formatNumber(result.mileage, 2)} km/l`, highlight: true },
      ]} />
    </div>
  );
}

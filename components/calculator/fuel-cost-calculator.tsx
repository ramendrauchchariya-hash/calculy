'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateFuelCost, formatNumber, formatINR } from '@/lib/calculations';

export function FuelCostCalculator() {
  const [distance, setDistance] = React.useState('400');
  const [mileage, setMileage] = React.useState('15');
  const [price, setPrice] = React.useState('106');

  const dist = parseFloat(distance) || 0;
  const mil = parseFloat(mileage) || 0;
  const fp = parseFloat(price) || 0;

  const result = calculateFuelCost(dist, mil, fp);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="fuel-distance" label="Distance" value={distance} onChange={setDistance} suffix="km" hint="Total distance of your trip" />
        <InputField id="fuel-mileage" label="Mileage" value={mileage} onChange={setMileage} suffix="km/l" hint="Your vehicle's fuel efficiency" />
        <InputField id="fuel-price" label="Fuel Price" value={price} onChange={setPrice} prefix="₹" suffix="/l" hint="Current fuel price per litre" />
      </div>

      <ResultCard
        rows={[
          { label: 'Fuel Needed', value: `${formatNumber(result.fuelNeeded, 2)} litres` },
          { label: 'Total Cost', value: formatINR(result.totalCost), highlight: true },
        ]}
      />
    </div>
  );
}

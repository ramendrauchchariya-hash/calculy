'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateElectricityCost, formatNumber, formatINR } from '@/lib/calculations';

export function ElectricityCostCalculator() {
  const [wattage, setWattage] = React.useState('1500');
  const [count, setCount] = React.useState('1');
  const [hours, setHours] = React.useState('8');
  const [days, setDays] = React.useState('30');
  const [rate, setRate] = React.useState('8');

  const result = calculateElectricityCost(parseFloat(wattage) || 0, parseInt(count) || 1, parseFloat(hours) || 0, parseFloat(days) || 0, parseFloat(rate) || 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="ec-watt" label="Appliance Wattage" value={wattage} onChange={setWattage} suffix="W" />
        <InputField id="ec-count" label="Number of Appliances" value={count} onChange={setCount} type="number" min={1} step="1" />
        <InputField id="ec-hours" label="Hours per Day" value={hours} onChange={setHours} />
        <InputField id="ec-days" label="Days per Month" value={days} onChange={setDays} />
        <InputField id="ec-rate" label="Rate per kWh" value={rate} onChange={setRate} prefix="₹" />
      </div>
      <ResultCard rows={[
        { label: 'Daily Consumption', value: `${formatNumber(result.dailyKWh, 2)} kWh` },
        { label: 'Monthly Consumption', value: `${formatNumber(result.monthlyKWh, 2)} kWh` },
        { label: 'Monthly Cost', value: formatINR(result.monthlyCost), highlight: true },
      ]} />
    </div>
  );
}

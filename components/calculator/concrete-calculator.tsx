'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateConcrete, formatNumber } from '@/lib/calculations';

export function ConcreteCalculator() {
  const [length, setLength] = React.useState('4');
  const [width, setWidth] = React.useState('3');
  const [depth, setDepth] = React.useState('0.15');

  const result = calculateConcrete(parseFloat(length) || 0, parseFloat(width) || 0, parseFloat(depth) || 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="conc-len" label="Length" value={length} onChange={setLength} suffix="m" />
        <InputField id="conc-wid" label="Width" value={width} onChange={setWidth} suffix="m" />
        <InputField id="conc-dep" label="Depth" value={depth} onChange={setDepth} suffix="m" />
      </div>
      <ResultCard rows={[
        { label: 'Volume (cubic metres)', value: `${formatNumber(result.volumeCubicM, 3)} m³`, highlight: true },
        { label: 'Volume (cubic feet)', value: `${formatNumber(result.volumeCubicFt, 2)} ft³` },
      ]} />
    </div>
  );
}

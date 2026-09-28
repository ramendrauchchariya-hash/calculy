'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateWallArea, formatNumber } from '@/lib/calculations';

export function WallAreaCalculator() {
  const [length, setLength] = React.useState('12');
  const [height, setHeight] = React.useState('9');
  const [openings, setOpenings] = React.useState('51');

  const result = calculateWallArea(parseFloat(length) || 0, parseFloat(height) || 0, parseFloat(openings) || 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="wa-len" label="Room Length" value={length} onChange={setLength} suffix="ft" />
        <InputField id="wa-ht" label="Wall Height" value={height} onChange={setHeight} suffix="ft" />
        <InputField id="wa-open" label="Openings Area" value={openings} onChange={setOpenings} suffix="sq ft" hint="Doors and windows" />
      </div>
      <ResultCard rows={[
        { label: 'Gross Wall Area', value: `${formatNumber(result.grossArea, 2)} sq ft` },
        { label: 'Opening Area', value: `${formatNumber(result.openingArea, 2)} sq ft` },
        { label: 'Net Wall Area', value: `${formatNumber(result.netArea, 2)} sq ft`, highlight: true },
      ]} />
    </div>
  );
}

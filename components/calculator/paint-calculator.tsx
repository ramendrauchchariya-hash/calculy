'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculatePaint, formatNumber } from '@/lib/calculations';

export function PaintCalculator() {
  const [length, setLength] = React.useState('20');
  const [height, setHeight] = React.useState('9');
  const [walls, setWalls] = React.useState('4');
  const [openings, setOpenings] = React.useState('51');
  const [coverage, setCoverage] = React.useState('140');
  const [coats, setCoats] = React.useState('2');

  const result = calculatePaint(parseFloat(length) || 0, parseFloat(height) || 0, parseInt(walls) || 1, parseFloat(openings) || 0, parseFloat(coverage) || 1, parseInt(coats) || 1);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="paint-len" label="Wall Length" value={length} onChange={setLength} suffix="ft" />
        <InputField id="paint-ht" label="Wall Height" value={height} onChange={setHeight} suffix="ft" />
        <InputField id="paint-walls" label="Number of Walls" value={walls} onChange={setWalls} type="number" min={1} step="1" />
        <InputField id="paint-open" label="Openings Area" value={openings} onChange={setOpenings} suffix="sq ft" hint="Doors and windows" />
        <InputField id="paint-cov" label="Coverage per Litre" value={coverage} onChange={setCoverage} suffix="sq ft" />
        <InputField id="paint-coats" label="Number of Coats" value={coats} onChange={setCoats} type="number" min={1} step="1" />
      </div>
      <ResultCard rows={[
        { label: 'Paintable Area', value: `${formatNumber(result.paintableArea, 2)} sq ft` },
        { label: 'Paint Needed', value: `${formatNumber(result.litresNeeded, 2)} litres`, highlight: true },
      ]} />
    </div>
  );
}

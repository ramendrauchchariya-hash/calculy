'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateBricks } from '@/lib/calculations';

export function BrickCalculator() {
  const [wallL, setWallL] = React.useState('10');
  const [wallH, setWallH] = React.useState('8');
  const [wallT, setWallT] = React.useState('0.23');
  const [mortar, setMortar] = React.useState('10');

  const result = calculateBricks(parseFloat(wallL) || 0, parseFloat(wallH) || 0, parseFloat(wallT) || 0, 0.19, 0.09, 0.09, parseFloat(mortar) || 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="brick-wl" label="Wall Length" value={wallL} onChange={setWallL} suffix="ft" />
        <InputField id="brick-wh" label="Wall Height" value={wallH} onChange={setWallH} suffix="ft" />
        <InputField id="brick-wt" label="Wall Thickness" value={wallT} onChange={setWallT} suffix="m" hint="0.23 for 9-inch wall" />
        <InputField id="brick-mortar" label="Mortar Allowance" value={mortar} onChange={setMortar} suffix="%" />
      </div>
      <ResultCard rows={[
        { label: 'Wall Volume', value: `${result.wallVolume.toFixed(3)} m³` },
        { label: 'Bricks Needed', value: String(result.brickCount), highlight: true },
      ]} />
    </div>
  );
}

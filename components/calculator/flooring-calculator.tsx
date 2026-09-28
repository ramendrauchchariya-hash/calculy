'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateFlooring, formatNumber } from '@/lib/calculations';

export function FlooringCalculator() {
  const [roomL, setRoomL] = React.useState('12');
  const [roomW, setRoomW] = React.useState('10');
  const [wastage, setWastage] = React.useState('10');

  const result = calculateFlooring(parseFloat(roomL) || 0, parseFloat(roomW) || 0, parseFloat(wastage) || 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="fl-len" label="Room Length" value={roomL} onChange={setRoomL} suffix="ft" />
        <InputField id="fl-wid" label="Room Width" value={roomW} onChange={setRoomW} suffix="ft" />
        <InputField id="fl-waste" label="Wastage" value={wastage} onChange={setWastage} suffix="%" />
      </div>
      <ResultCard rows={[
        { label: 'Room Area', value: `${formatNumber(result.area, 2)} sq ft` },
        { label: 'Flooring Needed', value: `${formatNumber(result.flooringQty, 2)} sq ft`, highlight: true },
      ]} />
    </div>
  );
}

'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateTiles, formatNumber } from '@/lib/calculations';

export function TileCalculator() {
  const [roomL, setRoomL] = React.useState('10');
  const [roomW, setRoomW] = React.useState('10');
  const [tileL, setTileL] = React.useState('2');
  const [tileW, setTileW] = React.useState('2');
  const [wastage, setWastage] = React.useState('10');

  const result = calculateTiles(parseFloat(roomL) || 0, parseFloat(roomW) || 0, parseFloat(tileL) || 0, parseFloat(tileW) || 0, parseFloat(wastage) || 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="tile-rl" label="Room Length" value={roomL} onChange={setRoomL} suffix="ft" />
        <InputField id="tile-rw" label="Room Width" value={roomW} onChange={setRoomW} suffix="ft" />
        <InputField id="tile-tl" label="Tile Length" value={tileL} onChange={setTileL} suffix="ft" />
        <InputField id="tile-tw" label="Tile Width" value={tileW} onChange={setTileW} suffix="ft" />
        <InputField id="tile-waste" label="Wastage" value={wastage} onChange={setWastage} suffix="%" />
      </div>
      <ResultCard rows={[
        { label: 'Floor Area', value: `${formatNumber(result.floorArea, 2)} sq ft` },
        { label: 'Tiles Needed', value: String(result.tilesNeeded) },
        { label: 'Tiles with Wastage', value: String(result.tilesWithWastage), highlight: true },
      ]} />
    </div>
  );
}

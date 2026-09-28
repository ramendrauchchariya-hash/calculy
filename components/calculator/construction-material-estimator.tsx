'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { estimateConstructionMaterial } from '@/lib/calculations';

export function ConstructionMaterialEstimator() {
  const [area, setArea] = React.useState('100');
  const [type, setType] = React.useState<'standard' | 'premium' | 'luxury'>('standard');

  const result = estimateConstructionMaterial(parseFloat(area) || 0, type);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="cme-area" label="Built-up Area" value={area} onChange={setArea} suffix="sq m" />
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Construction Type</label>
          <div className="flex gap-2">
            {(['standard', 'premium', 'luxury'] as const).map((t) => (
              <button key={t} type="button" onClick={() => setType(t)} className={`px-3 py-1.5 text-sm rounded-md border ${type === t ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
        </div>
      </div>
      <ResultCard rows={[
        { label: 'Cement Bags', value: String(result.cementBags), highlight: true },
        { label: 'Sand', value: `${result.sandCuM.toFixed(2)} m³` },
        { label: 'Aggregate', value: `${result.aggregateCuM.toFixed(2)} m³` },
        { label: 'Bricks', value: String(result.bricks) },
      ]} />
    </div>
  );
}

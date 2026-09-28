'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculatePercentage, calculatePercentageOf, formatNumber } from '@/lib/calculations';

export function PercentageCalculator() {
  const [mode, setMode] = React.useState<'ofTotal' | 'percentOf'>('ofTotal');
  const [value1, setValue1] = React.useState('30');
  const [value2, setValue2] = React.useState('150');

  const n1 = parseFloat(value1) || 0;
  const n2 = parseFloat(value2) || 0;

  const result =
    mode === 'ofTotal'
      ? { label: 'Percentage', value: `${formatNumber(calculatePercentage(n1, n2).percentage, 2)}%` }
      : { label: 'Result', value: formatNumber(calculatePercentageOf(n1, n2).result, 2) };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Calculation Type</label>
          <div className="flex rounded-md border overflow-hidden w-fit">
            <button
              type="button"
              onClick={() => setMode('ofTotal')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${mode === 'ofTotal' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
            >
              X is what % of Y
            </button>
            <button
              type="button"
              onClick={() => setMode('percentOf')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${mode === 'percentOf' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
            >
              X% of Y
            </button>
          </div>
        </div>
        <InputField
          id="pct-v1"
          label={mode === 'ofTotal' ? 'Value (X)' : 'Percentage (X)'}
          value={value1}
          onChange={setValue1}
          suffix={mode === 'percentOf' ? '%' : undefined}
        />
        <InputField
          id="pct-v2"
          label={mode === 'ofTotal' ? 'Total (Y)' : 'Number (Y)'}
          value={value2}
          onChange={setValue2}
        />
      </div>

      <ResultCard
        rows={[
          { label: result.label, value: result.value, highlight: true },
          {
            label: 'Calculation',
            value:
              mode === 'ofTotal'
                ? `(${value1} / ${value2}) × 100`
                : `(${value1} / 100) × ${value2}`,
          },
        ]}
      />
    </div>
  );
}

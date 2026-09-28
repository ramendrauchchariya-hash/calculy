'use client';

import * as React from 'react';
import { evaluateExpression } from '@/lib/calculations';

export function ScientificCalculator() {
  const [expr, setExpr] = React.useState('');
  const [result, setResult] = React.useState('0');

  const handleEvaluate = () => setResult(String(evaluateExpression(expr)));

  const buttons = [
    '7', '8', '9', '/', 'sin(', '4', '5', '6', '*', 'cos(',
    '1', '2', '3', '-', 'tan(', '0', '.', '(', ')', 'log(',
    'sqrt(', '^', 'pi', 'e', 'ln(',
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="text-right text-sm text-muted-foreground min-h-6 break-all">{expr || 'Enter expression'}</div>
        <div className="text-right text-2xl font-bold tabular-nums mt-1">{result}</div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => setExpr(expr + btn)} className="h-10 rounded-md border bg-background text-sm font-medium hover:bg-accent transition-colors">{btn}</button>
        ))}
        <button onClick={() => setExpr('')} className="h-10 rounded-md border bg-background text-sm font-medium hover:bg-accent">C</button>
        <button onClick={() => setExpr(expr.slice(0, -1))} className="h-10 rounded-md border bg-background text-sm font-medium hover:bg-accent">⌫</button>
        <button onClick={handleEvaluate} className="h-10 rounded-md bg-primary text-primary-foreground text-sm font-bold col-span-3">=</button>
      </div>
    </div>
  );
}

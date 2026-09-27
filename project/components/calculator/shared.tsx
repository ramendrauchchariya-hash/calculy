'use client';

import { cn } from '@/lib/utils';

interface ResultRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export function ResultCard({ rows, className }: { rows: ResultRow[]; className?: string }) {
  return (
    <div className={cn('rounded-lg border bg-muted/30 p-5', className)}>
      {rows.map((row, i) => (
        <div
          key={i}
          className={cn(
            'flex items-center justify-between py-2',
            i < rows.length - 1 && 'border-b',
            row.highlight && 'text-lg font-bold'
          )}
        >
          <span className={cn(row.highlight ? 'text-foreground' : 'text-muted-foreground text-sm')}>
            {row.label}
          </span>
          <span className={cn('font-semibold tabular-nums', row.highlight && 'text-primary text-xl')}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function CalculatorShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  min?: number;
  step?: string;
  prefix?: string;
  suffix?: string;
  id: string;
  hint?: string;
}

export function InputField({
  label,
  value,
  onChange,
  type = 'number',
  min = 0,
  step = 'any',
  prefix,
  suffix,
  id,
  hint,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-12' : 'pr-3'}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

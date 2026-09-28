'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateAttendance, formatNumber } from '@/lib/calculations';

export function AttendanceCalculator() {
  const [attended, setAttended] = React.useState('40');
  const [total, setTotal] = React.useState('60');
  const [target, setTarget] = React.useState('75');

  const result = calculateAttendance(parseFloat(attended) || 0, parseFloat(total) || 0, parseFloat(target) || 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="att-attended" label="Classes Attended" value={attended} onChange={setAttended} type="number" min={0} step="1" />
        <InputField id="att-total" label="Total Classes Held" value={total} onChange={setTotal} type="number" min={0} step="1" />
        <InputField id="att-target" label="Target Attendance" value={target} onChange={setTarget} suffix="%" />
      </div>
      <ResultCard rows={[
        { label: 'Current Attendance', value: `${formatNumber(result.attendancePercentage, 1)}%`, highlight: true },
        { label: 'Classes to Attend', value: String(result.classesToAttend) },
        { label: 'Can Miss', value: String(result.canMiss) },
      ]} />
    </div>
  );
}

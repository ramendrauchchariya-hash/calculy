'use client';

import * as React from 'react';
import { ResultCard } from './shared';
import { calculateGPA, formatNumber } from '@/lib/calculations';

export function GPACalculator() {
  const [courses, setCourses] = React.useState([{ grade: '9', credits: '4' }, { grade: '8', credits: '3' }, { grade: '7', credits: '3' }]);

  const parsed = courses.map((c) => ({ grade: parseFloat(c.grade) || 0, credits: parseFloat(c.credits) || 0 }));
  const result = calculateGPA(parsed);

  const updateCourse = (i: number, field: 'grade' | 'credits', val: string) => {
    const next = [...courses]; next[i] = { ...next[i], [field]: val }; setCourses(next);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        {courses.map((c, i) => (
          <div key={i} className="flex gap-2">
            <input type="number" value={c.grade} onChange={(e) => updateCourse(i, 'grade', e.target.value)} placeholder="Grade" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input type="number" value={c.credits} onChange={(e) => updateCourse(i, 'credits', e.target.value)} placeholder="Credits" className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button onClick={() => setCourses(courses.filter((_, idx) => idx !== i))} className="px-2 text-sm border rounded-md hover:bg-accent">✕</button>
          </div>
        ))}
        <button onClick={() => setCourses([...courses, { grade: '8', credits: '3' }])} className="text-sm font-medium text-primary hover:underline">+ Add Course</button>
      </div>
      <ResultCard rows={[
        { label: 'GPA', value: formatNumber(result.gpa, 2), highlight: true },
        { label: 'Total Credits', value: String(result.totalCredits) },
      ]} />
    </div>
  );
}

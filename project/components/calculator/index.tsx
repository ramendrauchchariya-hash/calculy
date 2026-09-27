'use client';

import * as React from 'react';
import { EMICalculator } from './emi-calculator';
import { SIPCalculator } from './sip-calculator';
import { GSTCalculator } from './gst-calculator';
import { PercentageCalculator } from './percentage-calculator';
import { AgeCalculator } from './age-calculator';
import { BMICalculator } from './bmi-calculator';
import { FuelCostCalculator } from './fuel-cost-calculator';
import { DiscountCalculator } from './discount-calculator';
import { CompoundInterestCalculator } from './compound-interest-calculator';
import { SimpleInterestCalculator } from './simple-interest-calculator';

const calculators: Record<string, React.ComponentType> = {
  'emi-calculator': EMICalculator,
  'sip-calculator': SIPCalculator,
  'gst-calculator': GSTCalculator,
  'percentage-calculator': PercentageCalculator,
  'age-calculator': AgeCalculator,
  'bmi-calculator': BMICalculator,
  'fuel-cost-calculator': FuelCostCalculator,
  'discount-calculator': DiscountCalculator,
  'compound-interest-calculator': CompoundInterestCalculator,
  'simple-interest-calculator': SimpleInterestCalculator,
};

export function CalculatorWidget({ slug }: { slug: string }) {
  const Component = calculators[slug];
  if (!Component) return null;
  return <Component />;
}

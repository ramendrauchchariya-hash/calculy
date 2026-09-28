'use client';

import * as React from 'react';
import { EMICalculator } from './emi-calculator';
import { LoanCalculator } from './loan-calculator';
import { SIPCalculator } from './sip-calculator';
import { SimpleInterestCalculator } from './simple-interest-calculator';
import { CompoundInterestCalculator } from './compound-interest-calculator';
import { FDCalculator } from './fd-calculator';
import { RDCalculator } from './rd-calculator';
import { GSTCalculator } from './gst-calculator';
import { DiscountCalculator } from './discount-calculator';
import { SalaryCalculator } from './salary-calculator';
import { TipCalculator } from './tip-calculator';
import { BillSplitter } from './bill-splitter';
import { InflationCalculator } from './inflation-calculator';
import { SavingsGoalCalculator } from './savings-goal-calculator';
import { PercentageGrowthCalculator } from './percentage-growth-calculator';
import { AreaCalculator } from './area-calculator';
import { TileCalculator } from './tile-calculator';
import { PaintCalculator } from './paint-calculator';
import { BrickCalculator } from './brick-calculator';
import { ConcreteCalculator } from './concrete-calculator';
import { CementCalculator } from './cement-calculator';
import { FlooringCalculator } from './flooring-calculator';
import { WallAreaCalculator } from './wall-area-calculator';
import { LandAreaConverter } from './land-area-converter';
import { ConstructionMaterialEstimator } from './construction-material-estimator';
import { PercentageCalculator } from './percentage-calculator';
import { GPACalculator } from './gpa-calculator';
import { CGPACalculator } from './cgpa-calculator';
import { SGPACalculator } from './sgpa-calculator';
import { AttendanceCalculator } from './attendance-calculator';
import { MarksPercentageCalculator } from './marks-percentage-calculator';
import { GradeCalculator } from './grade-calculator';
import { RequiredMarksCalculator } from './required-marks-calculator';
import { AgeCalculator } from './age-calculator';
import { DateDifferenceCalculator } from './date-difference-calculator';
import { TimeCalculator } from './time-calculator';
import { FuelCostCalculator } from './fuel-cost-calculator';
import { MileageCalculator } from './mileage-calculator';
import { ElectricityCostCalculator } from './electricity-cost-calculator';
import { AverageCalculator } from './average-calculator';
import { RatioCalculator } from './ratio-calculator';
import { ScientificCalculator } from './scientific-calculator';
import { FractionCalculator } from './fraction-calculator';
import { UnitConverter } from './unit-converter';
import { LengthConverter } from './length-converter';
import { WeightConverter } from './weight-converter';
import { TemperatureConverter } from './temperature-converter';
import { SpeedConverter } from './speed-converter';
import { BMICalculator } from './bmi-calculator';
import { BMRCalculator } from './bmr-calculator';
import { CalorieCalculator } from './calorie-calculator';
import { WaterIntakeCalculator } from './water-intake-calculator';
import { IdealWeightCalculator } from './ideal-weight-calculator';

const calculators: Record<string, React.ComponentType> = {
  'emi-calculator': EMICalculator,
  'loan-calculator': LoanCalculator,
  'sip-calculator': SIPCalculator,
  'simple-interest-calculator': SimpleInterestCalculator,
  'compound-interest-calculator': CompoundInterestCalculator,
  'fd-calculator': FDCalculator,
  'rd-calculator': RDCalculator,
  'gst-calculator': GSTCalculator,
  'discount-calculator': DiscountCalculator,
  'salary-calculator': SalaryCalculator,
  'tip-calculator': TipCalculator,
  'bill-splitter': BillSplitter,
  'inflation-calculator': InflationCalculator,
  'savings-goal-calculator': SavingsGoalCalculator,
  'percentage-growth-calculator': PercentageGrowthCalculator,
  'area-calculator': AreaCalculator,
  'tile-calculator': TileCalculator,
  'paint-calculator': PaintCalculator,
  'brick-calculator': BrickCalculator,
  'concrete-calculator': ConcreteCalculator,
  'cement-calculator': CementCalculator,
  'flooring-calculator': FlooringCalculator,
  'wall-area-calculator': WallAreaCalculator,
  'land-area-converter': LandAreaConverter,
  'construction-material-estimator': ConstructionMaterialEstimator,
  'percentage-calculator': PercentageCalculator,
  'gpa-calculator': GPACalculator,
  'cgpa-calculator': CGPACalculator,
  'sgpa-calculator': SGPACalculator,
  'attendance-calculator': AttendanceCalculator,
  'marks-percentage-calculator': MarksPercentageCalculator,
  'grade-calculator': GradeCalculator,
  'required-marks-calculator': RequiredMarksCalculator,
  'age-calculator': AgeCalculator,
  'date-difference-calculator': DateDifferenceCalculator,
  'time-calculator': TimeCalculator,
  'fuel-cost-calculator': FuelCostCalculator,
  'mileage-calculator': MileageCalculator,
  'electricity-cost-calculator': ElectricityCostCalculator,
  'average-calculator': AverageCalculator,
  'ratio-calculator': RatioCalculator,
  'scientific-calculator': ScientificCalculator,
  'fraction-calculator': FractionCalculator,
  'unit-converter': UnitConverter,
  'length-converter': LengthConverter,
  'weight-converter': WeightConverter,
  'temperature-converter': TemperatureConverter,
  'speed-converter': SpeedConverter,
  'bmi-calculator': BMICalculator,
  'bmr-calculator': BMRCalculator,
  'calorie-calculator': CalorieCalculator,
  'water-intake-calculator': WaterIntakeCalculator,
  'ideal-weight-calculator': IdealWeightCalculator,
};

export function CalculatorWidget({ slug }: { slug: string }) {
  const Component = calculators[slug];
  if (!Component) return null;
  return <Component />;
}

export function formatINR(amount: number, options?: { decimals?: boolean }): string {
  if (!isFinite(amount)) return '0';
  const decimals = options?.decimals ? 2 : 0;
  const rounded = decimals ? amount.toFixed(2) : Math.round(amount).toString();
  const [intPart, decPart] = rounded.split('.');

  const lastThree = intPart.slice(-3);
  const otherDigits = intPart.slice(0, -3);
  const formatted =
    otherDigits !== ''
      ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
      : lastThree;

  const result = decPart ? `${formatted}.${decPart}` : formatted;
  return `₹${result}`;
}

export function formatNumber(value: number, decimals = 2): string {
  if (!isFinite(value)) return '0';
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function safeNumber(value: number): number {
  if (!isFinite(value) || isNaN(value)) return 0;
  return value;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// EMI = P × r × (1+r)^n / ((1+r)^n - 1)
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): { emi: number; totalInterest: number; totalPayment: number } {
  const p = Math.max(0, principal);
  const n = Math.max(0, tenureMonths);
  const r = annualRate / 12 / 100;

  if (p === 0 || n === 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };
  if (r === 0) {
    const emi = p / n;
    return { emi, totalInterest: 0, totalPayment: p };
  }

  const factor = Math.pow(1 + r, n);
  const emi = (p * r * factor) / (factor - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;

  return {
    emi: safeNumber(emi),
    totalInterest: safeNumber(totalInterest),
    totalPayment: safeNumber(totalPayment),
  };
}

export function calculateSIP(
  monthlyInvestment: number,
  annualRate: number,
  years: number
): { investedAmount: number; estimatedReturns: number; totalValue: number } {
  const i = annualRate / 12 / 100;
  const n = years * 12;
  const p = Math.max(0, monthlyInvestment);

  if (p === 0 || n === 0) return { investedAmount: 0, estimatedReturns: 0, totalValue: 0 };

  let totalValue: number;
  if (i === 0) {
    totalValue = p * n;
  } else {
    totalValue = (p * (Math.pow(1 + i, n) - 1)) / i * (1 + i);
  }

  const investedAmount = p * n;
  const estimatedReturns = totalValue - investedAmount;

  return {
    investedAmount: safeNumber(investedAmount),
    estimatedReturns: safeNumber(estimatedReturns),
    totalValue: safeNumber(totalValue),
  };
}

export function calculateGST(
  amount: number,
  gstRate: number,
  mode: 'exclusive' | 'inclusive'
): { baseAmount: number; gstAmount: number; totalAmount: number; cgst: number; sgst: number } {
  const a = Math.max(0, amount);
  const rate = Math.max(0, gstRate);

  if (mode === 'exclusive') {
    const gstAmount = (a * rate) / 100;
    const totalAmount = a + gstAmount;
    return {
      baseAmount: a,
      gstAmount: safeNumber(gstAmount),
      totalAmount: safeNumber(totalAmount),
      cgst: safeNumber(gstAmount / 2),
      sgst: safeNumber(gstAmount / 2),
    };
  } else {
    const baseAmount = (a * 100) / (100 + rate);
    const gstAmount = a - baseAmount;
    return {
      baseAmount: safeNumber(baseAmount),
      gstAmount: safeNumber(gstAmount),
      totalAmount: a,
      cgst: safeNumber(gstAmount / 2),
      sgst: safeNumber(gstAmount / 2),
    };
  }
}

export function calculatePercentage(
  value: number,
  total: number
): { percentage: number } {
  if (total === 0) return { percentage: 0 };
  return { percentage: safeNumber((value / total) * 100) };
}

export function calculatePercentageOf(
  percentage: number,
  total: number
): { result: number } {
  return { result: safeNumber((percentage / 100) * total) };
}

export function calculateAge(
  birthDate: Date,
  asOfDate: Date = new Date()
): { years: number; months: number; days: number; totalDays: number } {
  let years = asOfDate.getFullYear() - birthDate.getFullYear();
  let months = asOfDate.getMonth() - birthDate.getMonth();
  let days = asOfDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(asOfDate.getFullYear(), asOfDate.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((asOfDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

  return { years, months, days, totalDays };
}

export function calculateBMI(
  weightKg: number,
  heightCm: number
): { bmi: number; category: string; categoryColor: string } {
  const h = heightCm / 100;
  if (weightKg <= 0 || h <= 0) return { bmi: 0, category: '—', categoryColor: 'muted' };

  const bmi = weightKg / (h * h);

  let category: string;
  let categoryColor: string;
  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = 'warning';
  } else if (bmi < 25) {
    category = 'Normal weight';
    categoryColor = 'success';
  } else if (bmi < 30) {
    category = 'Overweight';
    categoryColor = 'warning';
  } else {
    category = 'Obese';
    categoryColor = 'destructive';
  }

  return { bmi: safeNumber(bmi), category, categoryColor };
}

export function calculateFuelCost(
  distance: number,
  mileage: number,
  fuelPrice: number
): { fuelNeeded: number; totalCost: number } {
  if (mileage <= 0) return { fuelNeeded: 0, totalCost: 0 };
  const fuelNeeded = distance / mileage;
  const totalCost = fuelNeeded * fuelPrice;
  return {
    fuelNeeded: safeNumber(fuelNeeded),
    totalCost: safeNumber(totalCost),
  };
}

export function calculateDiscount(
  originalPrice: number,
  discountPercentage: number
): { discountAmount: number; finalPrice: number; youSave: number } {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;
  return {
    discountAmount: safeNumber(discountAmount),
    finalPrice: safeNumber(finalPrice),
    youSave: safeNumber(discountAmount),
  };
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number = 4
): { totalAmount: number; interestEarned: number } {
  const p = Math.max(0, principal);
  const r = annualRate / 100;
  const n = Math.max(1, compoundsPerYear);
  const t = Math.max(0, years);

  if (p === 0 || t === 0) return { totalAmount: p, interestEarned: 0 };

  const totalAmount = p * Math.pow(1 + r / n, n * t);
  const interestEarned = totalAmount - p;

  return {
    totalAmount: safeNumber(totalAmount),
    interestEarned: safeNumber(interestEarned),
  };
}

export function calculateSimpleInterest(
  principal: number,
  annualRate: number,
  years: number
): { interest: number; totalAmount: number } {
  const p = Math.max(0, principal);
  const interest = (p * annualRate * years) / 100;
  const totalAmount = p + interest;
  return {
    interest: safeNumber(interest),
    totalAmount: safeNumber(totalAmount),
  };
}

// Loan Calculator (same as EMI but with different framing)
export function calculateLoan(
  principal: number,
  annualRate: number,
  termMonths: number
): { monthlyPayment: number; totalInterest: number; totalRepayment: number } {
  const r = calculateEMI(principal, annualRate, termMonths);
  return {
    monthlyPayment: r.emi,
    totalInterest: r.totalInterest,
    totalRepayment: r.totalPayment,
  };
}

// FD Calculator
export function calculateFD(
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number = 4
): { maturityAmount: number; interestEarned: number } {
  const r = calculateCompoundInterest(principal, annualRate, years, compoundsPerYear);
  return { maturityAmount: r.totalAmount, interestEarned: r.interestEarned };
}

// RD Calculator
export function calculateRD(
  monthlyDeposit: number,
  annualRate: number,
  months: number,
  compoundsPerYear: number = 4
): { totalDeposited: number; estimatedInterest: number; maturityValue: number } {
  const p = Math.max(0, monthlyDeposit);
  const n = Math.max(0, months);
  if (p === 0 || n === 0) return { totalDeposited: 0, estimatedInterest: 0, maturityValue: 0 };

  const r = annualRate / 100 / compoundsPerYear;
  const periods = n * compoundsPerYear / 12;
  const monthlyRate = r;

  let maturityValue: number;
  if (r === 0) {
    maturityValue = p * n;
  } else {
    // RD formula: FV = P * (((1+i)^n - 1) / i) * (1+i), where i is quarterly rate, n is quarters
    const quarters = Math.ceil(n * compoundsPerYear / 12);
    maturityValue = (p * (Math.pow(1 + monthlyRate, quarters) - 1) / monthlyRate) * (1 + monthlyRate);
  }

  const totalDeposited = p * n;
  const estimatedInterest = maturityValue - totalDeposited;

  return {
    totalDeposited: safeNumber(totalDeposited),
    estimatedInterest: safeNumber(estimatedInterest),
    maturityValue: safeNumber(maturityValue),
  };
}

// Salary Calculator
export function calculateSalary(
  annualCTC: number,
  basicPercentage: number = 50,
  allowances: number = 0,
  deductions: number = 0
): { monthlyGross: number; estimatedDeductions: number; takeHome: number; annualSalary: number } {
  const ctc = Math.max(0, annualCTC);
  const monthlyGross = ctc / 12;
  const basic = (ctc * basicPercentage) / 100;
  const hra = basic * 0.5;
  const gross = basic + hra + allowances;
  const estimatedDeductions = deductions > 0 ? deductions : gross * 0.12;
  const takeHome = monthlyGross - estimatedDeductions;
  return {
    monthlyGross: safeNumber(monthlyGross),
    estimatedDeductions: safeNumber(estimatedDeductions),
    takeHome: safeNumber(takeHome),
    annualSalary: safeNumber(takeHome * 12),
  };
}

// Tip Calculator
export function calculateTip(
  billAmount: number,
  tipPercentage: number,
  numberOfPeople: number = 1
): { tipAmount: number; totalBill: number; perPerson: number } {
  const tip = (billAmount * tipPercentage) / 100;
  const total = billAmount + tip;
  const people = Math.max(1, numberOfPeople);
  return {
    tipAmount: safeNumber(tip),
    totalBill: safeNumber(total),
    perPerson: safeNumber(total / people),
  };
}

// Bill Splitter
export function calculateBillSplit(
  totalBill: number,
  numberOfPeople: number,
  tipPercentage: number = 0
): { tip: number; totalWithTip: number; perPerson: number } {
  const tip = (totalBill * tipPercentage) / 100;
  const totalWithTip = totalBill + tip;
  const people = Math.max(1, numberOfPeople);
  return {
    tip: safeNumber(tip),
    totalWithTip: safeNumber(totalWithTip),
    perPerson: safeNumber(totalWithTip / people),
  };
}

// Inflation Calculator
export function calculateInflation(
  startAmount: number,
  inflationRate: number,
  years: number
): { futureAmount: number; increase: number } {
  const rate = inflationRate / 100;
  const futureAmount = startAmount * Math.pow(1 + rate, years);
  return {
    futureAmount: safeNumber(futureAmount),
    increase: safeNumber(futureAmount - startAmount),
  };
}

// Savings Goal Calculator
export function calculateSavingsGoal(
  targetAmount: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number
): { monthsRequired: number; totalContributions: number; estimatedGrowth: number; finalValue: number } {
  const remaining = Math.max(0, targetAmount - currentSavings);
  if (remaining <= 0) return { monthsRequired: 0, totalContributions: 0, estimatedGrowth: 0, finalValue: currentSavings };

  const monthlyRate = annualReturn / 100 / 12;
  const monthly = Math.max(0, monthlyContribution);

  if (monthly === 0) {
    // Only growth on current savings
    if (monthlyRate === 0) return { monthsRequired: Infinity, totalContributions: 0, estimatedGrowth: 0, finalValue: currentSavings };
    const months = Math.log(targetAmount / currentSavings) / Math.log(1 + monthlyRate);
    return {
      monthsRequired: safeNumber(Math.ceil(months)),
      totalContributions: 0,
      estimatedGrowth: safeNumber(targetAmount - currentSavings),
      finalValue: targetAmount,
    };
  }

  // FV of current savings + FV of monthly contributions
  let months = 0;
  let value = currentSavings;
  while (value < targetAmount && months < 1200) {
    value = value * (1 + monthlyRate) + monthly;
    months++;
  }

  const totalContributions = monthly * months;
  const estimatedGrowth = value - currentSavings - totalContributions;

  return {
    monthsRequired: months,
    totalContributions: safeNumber(totalContributions),
    estimatedGrowth: safeNumber(estimatedGrowth),
    finalValue: safeNumber(value),
  };
}

// Percentage Change / Growth
export function calculatePercentageChange(
  startValue: number,
  endValue: number
): { absoluteChange: number; percentageChange: number; direction: string } {
  const absoluteChange = endValue - startValue;
  if (startValue === 0) return { absoluteChange: safeNumber(absoluteChange), percentageChange: 0, direction: '—' };
  const pct = (absoluteChange / startValue) * 100;
  return {
    absoluteChange: safeNumber(absoluteChange),
    percentageChange: safeNumber(pct),
    direction: pct >= 0 ? 'increase' : 'decrease',
  };
}

// Area Calculator
export function calculateArea(
  shape: 'rectangle' | 'square' | 'triangle' | 'circle',
  dimensions: Record<string, number>
): { area: number; perimeter: number } {
  let area = 0;
  let perimeter = 0;

  switch (shape) {
    case 'rectangle': {
      const l = Math.max(0, dimensions.length || 0);
      const w = Math.max(0, dimensions.width || 0);
      area = l * w;
      perimeter = 2 * (l + w);
      break;
    }
    case 'square': {
      const s = Math.max(0, dimensions.side || 0);
      area = s * s;
      perimeter = 4 * s;
      break;
    }
    case 'triangle': {
      const b = Math.max(0, dimensions.base || 0);
      const h = Math.max(0, dimensions.height || 0);
      area = (b * h) / 2;
      break;
    }
    case 'circle': {
      const r = Math.max(0, dimensions.radius || 0);
      area = Math.PI * r * r;
      perimeter = 2 * Math.PI * r;
      break;
    }
  }

  return { area: safeNumber(area), perimeter: safeNumber(perimeter) };
}

// Tile Calculator
export function calculateTiles(
  roomLength: number,
  roomWidth: number,
  tileLength: number,
  tileWidth: number,
  wastagePercentage: number = 10
): { floorArea: number; tilesNeeded: number; tilesWithWastage: number } {
  const floorArea = Math.max(0, roomLength) * Math.max(0, roomWidth);
  const tileArea = Math.max(0, tileLength) * Math.max(0, tileWidth);
  if (tileArea === 0) return { floorArea: safeNumber(floorArea), tilesNeeded: 0, tilesWithWastage: 0 };

  const tilesNeeded = Math.ceil(floorArea / tileArea);
  const tilesWithWastage = Math.ceil(tilesNeeded * (1 + wastagePercentage / 100));

  return {
    floorArea: safeNumber(floorArea),
    tilesNeeded: safeNumber(tilesNeeded),
    tilesWithWastage: safeNumber(tilesWithWastage),
  };
}

// Paint Calculator
export function calculatePaint(
  wallLength: number,
  wallHeight: number,
  numWalls: number = 1,
  openingsArea: number = 0,
  coveragePerLitre: number = 10,
  numCoats: number = 2
): { paintableArea: number; litresNeeded: number } {
  const grossArea = Math.max(0, wallLength) * Math.max(0, wallHeight) * Math.max(1, numWalls);
  const paintableArea = Math.max(0, grossArea - openingsArea);
  const litresNeeded = (paintableArea * numCoats) / Math.max(1, coveragePerLitre);
  return {
    paintableArea: safeNumber(paintableArea),
    litresNeeded: safeNumber(litresNeeded),
  };
}

// Brick Calculator
export function calculateBricks(
  wallLength: number,
  wallHeight: number,
  wallThickness: number,
  brickLength: number = 0.19,
  brickHeight: number = 0.09,
  brickWidth: number = 0.09,
  mortarAllowance: number = 10
): { wallVolume: number; brickCount: number } {
  const wallVolume = Math.max(0, wallLength) * Math.max(0, wallHeight) * Math.max(0, wallThickness);
  const brickVolume = Math.max(0, brickLength) * Math.max(0, brickHeight) * Math.max(0, brickWidth);
  if (brickVolume === 0) return { wallVolume: safeNumber(wallVolume), brickCount: 0 };

  const effectiveBrickVolume = brickVolume * (1 + mortarAllowance / 100);
  const brickCount = Math.ceil(wallVolume / effectiveBrickVolume);

  return {
    wallVolume: safeNumber(wallVolume),
    brickCount: safeNumber(brickCount),
  };
}

// Concrete Calculator
export function calculateConcrete(
  length: number,
  width: number,
  depth: number
): { volumeCubicM: number; volumeCubicFt: number } {
  const volM = Math.max(0, length) * Math.max(0, width) * Math.max(0, depth);
  const volFt = volM * 35.3147;
  return {
    volumeCubicM: safeNumber(volM),
    volumeCubicFt: safeNumber(volFt),
  };
}

// Cement Calculator
export function calculateCement(
  workVolume: number,
  mixRatio: string = '1:2:4',
  cementDensity: number = 1440,
  bagSize: number = 50
): { cementQty: number; cementBags: number; sandQty: number; aggregateQty: number } {
  const vol = Math.max(0, workVolume);
  const parts = mixRatio.split(':').map((p) => parseInt(p) || 0);
  const totalParts = parts.reduce((a, b) => a + b, 0);
  if (totalParts === 0) return { cementQty: 0, cementBags: 0, sandQty: 0, aggregateQty: 0 };

  const dryVolume = vol * 1.54; // wet to dry conversion
  const cementPart = parts[0] || 0;
  const sandPart = parts[1] || 0;
  const aggregatePart = parts[2] || 0;

  const cementVolQty = (dryVolume * cementPart) / totalParts;
  const cementQty = cementVolQty * cementDensity;
  const cementBags = Math.ceil(cementQty / bagSize);
  const sandQty = (dryVolume * sandPart) / totalParts;
  const aggregateQty = (dryVolume * aggregatePart) / totalParts;

  return {
    cementQty: safeNumber(cementQty),
    cementBags: safeNumber(cementBags),
    sandQty: safeNumber(sandQty),
    aggregateQty: safeNumber(aggregateQty),
  };
}

// Flooring Calculator
export function calculateFlooring(
  roomLength: number,
  roomWidth: number,
  wastage: number = 10
): { area: number; flooringQty: number } {
  const area = Math.max(0, roomLength) * Math.max(0, roomWidth);
  const flooringQty = area * (1 + wastage / 100);
  return { area: safeNumber(area), flooringQty: safeNumber(flooringQty) };
}

// Wall Area Calculator
export function calculateWallArea(
  wallLength: number,
  wallHeight: number,
  openingsArea: number = 0
): { grossArea: number; openingArea: number; netArea: number } {
  const grossArea = Math.max(0, wallLength) * Math.max(0, wallHeight);
  const openingArea = Math.max(0, openingsArea);
  const netArea = Math.max(0, grossArea - openingArea);
  return {
    grossArea: safeNumber(grossArea),
    openingArea: safeNumber(openingArea),
    netArea: safeNumber(netArea),
  };
}

// Land Area Converter
export const landAreaConversions: Record<string, number> = {
  'sqft': 1,
  'sqm': 10.7639,
  'sqyd': 9,
  'acre': 43560,
  'hectare': 107639,
};

export function convertLandArea(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  const fromFactor = landAreaConversions[fromUnit];
  const toFactor = landAreaConversions[toUnit];
  if (!fromFactor || !toFactor) return 0;
  return safeNumber((value * fromFactor) / toFactor);
}

// Construction Material Estimator
export function estimateConstructionMaterial(
  builtUpArea: number,
  constructionType: 'standard' | 'premium' | 'luxury' = 'standard'
): { cementBags: number; sandCuM: number; aggregateCuM: number; bricks: number } {
  const area = Math.max(0, builtUpArea);
  const multiplier = constructionType === 'premium' ? 1.2 : constructionType === 'luxury' ? 1.5 : 1;

  // Rough estimates per sqm for standard construction in India
  const cementPerSqm = 0.4 * multiplier; // bags per sqm
  const sandPerSqm = 0.018 * multiplier; // cuM per sqm
  const aggregatePerSqm = 0.025 * multiplier; // cuM per sqm
  const bricksPerSqm = 8 * multiplier; // bricks per sqm

  return {
    cementBags: safeNumber(Math.ceil(area * cementPerSqm)),
    sandCuM: safeNumber(area * sandPerSqm),
    aggregateCuM: safeNumber(area * aggregatePerSqm),
    bricks: safeNumber(Math.ceil(area * bricksPerSqm)),
  };
}

// Percentage Increase/Decrease
export function calculatePercentageIncrease(
  original: number,
  newValue: number
): { change: number; percentage: number; type: string } {
  const change = newValue - original;
  if (original === 0) return { change: safeNumber(change), percentage: 0, type: '—' };
  const pct = (change / original) * 100;
  return {
    change: safeNumber(change),
    percentage: safeNumber(pct),
    type: pct >= 0 ? 'increase' : 'decrease',
  };
}

// GPA Calculator
export function calculateGPA(
  courses: { grade: number; credits: number }[]
): { gpa: number; totalCredits: number; totalGradePoints: number } {
  const valid = courses.filter((c) => c.credits > 0);
  if (valid.length === 0) return { gpa: 0, totalCredits: 0, totalGradePoints: 0 };

  const totalCredits = valid.reduce((sum, c) => sum + c.credits, 0);
  const totalGradePoints = valid.reduce((sum, c) => sum + c.grade * c.credits, 0);
  const gpa = totalGradePoints / totalCredits;

  return {
    gpa: safeNumber(gpa),
    totalCredits: safeNumber(totalCredits),
    totalGradePoints: safeNumber(totalGradePoints),
  };
}

// CGPA Calculator
export function calculateCGPA(
  semesters: { gpa: number; credits: number }[]
): { cgpa: number; totalCredits: number } {
  const valid = semesters.filter((s) => s.credits > 0);
  if (valid.length === 0) return { cgpa: 0, totalCredits: 0 };

  const totalCredits = valid.reduce((sum, s) => sum + s.credits, 0);
  const totalGradePoints = valid.reduce((sum, s) => sum + s.gpa * s.credits, 0);
  const cgpa = totalGradePoints / totalCredits;

  return {
    cgpa: safeNumber(cgpa),
    totalCredits: safeNumber(totalCredits),
  };
}

// SGPA Calculator
export function calculateSGPA(
  subjects: { grade: number; credits: number }[]
): { sgpa: number; totalCredits: number } {
  const result = calculateGPA(subjects);
  return { sgpa: result.gpa, totalCredits: result.totalCredits };
}

// Attendance Calculator
export function calculateAttendance(
  classesAttended: number,
  totalClasses: number,
  targetPercentage: number = 75
): { attendancePercentage: number; classesToAttend: number; canMiss: number } {
  const attended = Math.max(0, classesAttended);
  const total = Math.max(0, totalClasses);
  if (total === 0) return { attendancePercentage: 0, classesToAttend: 0, canMiss: 0 };

  const attendancePercentage = (attended / total) * 100;
  const target = targetPercentage / 100;

  // Classes needed to reach target: (attended + x) / (total + x) >= target
  // x >= (target * total - attended) / (1 - target)
  let classesToAttend = 0;
  if (attendancePercentage < targetPercentage) {
    classesToAttend = Math.ceil((target * total - attended) / (1 - target));
    if (classesToAttend < 0) classesToAttend = 0;
  }

  // Can miss: (attended) / (total + x) >= target → x <= attended/target - total
  let canMiss = 0;
  if (target > 0 && target < 1) {
    canMiss = Math.floor(attended / target - total);
    if (canMiss < 0) canMiss = 0;
  }

  return {
    attendancePercentage: safeNumber(attendancePercentage),
    classesToAttend: safeNumber(classesToAttend),
    canMiss: safeNumber(canMiss),
  };
}

// Marks Percentage Calculator
export function calculateMarksPercentage(
  subjects: { marksObtained: number; maxMarks: number }[]
): { totalMarks: number; totalMaxMarks: number; percentage: number } {
  const valid = subjects.filter((s) => s.maxMarks > 0);
  if (valid.length === 0) return { totalMarks: 0, totalMaxMarks: 0, percentage: 0 };

  const totalMarks = valid.reduce((sum, s) => sum + Math.max(0, s.marksObtained), 0);
  const totalMaxMarks = valid.reduce((sum, s) => sum + s.maxMarks, 0);
  const percentage = (totalMarks / totalMaxMarks) * 100;

  return {
    totalMarks: safeNumber(totalMarks),
    totalMaxMarks: safeNumber(totalMaxMarks),
    percentage: safeNumber(percentage),
  };
}

// Grade Calculator
export function calculateGrade(
  marks: number,
  maxMarks: number,
  scale: '10' | '100' = '100'
): { percentage: number; grade: string } {
  if (maxMarks <= 0) return { percentage: 0, grade: '—' };
  const pct = (marks / maxMarks) * 100;
  let grade: string;
  if (scale === '10') {
    const gpa = (pct / 100) * 10;
    if (gpa >= 9) grade = 'O';
    else if (gpa >= 8) grade = 'A+';
    else if (gpa >= 7) grade = 'A';
    else if (gpa >= 6) grade = 'B+';
    else if (gpa >= 5) grade = 'B';
    else if (gpa >= 4) grade = 'C';
    else grade = 'F';
  } else {
    if (pct >= 90) grade = 'A+';
    else if (pct >= 80) grade = 'A';
    else if (pct >= 70) grade = 'B+';
    else if (pct >= 60) grade = 'B';
    else if (pct >= 50) grade = 'C';
    else if (pct >= 40) grade = 'D';
    else grade = 'F';
  }
  return { percentage: safeNumber(pct), grade };
}

// Required Marks Calculator
export function calculateRequiredMarks(
  currentMarks: number,
  currentMaxMarks: number,
  remainingMaxMarks: number,
  targetPercentage: number
): { requiredMarks: number; isAchievable: boolean } {
  const totalMax = currentMaxMarks + remainingMaxMarks;
  if (totalMax <= 0) return { requiredMarks: 0, isAchievable: false };

  const targetTotal = (targetPercentage / 100) * totalMax;
  const required = targetTotal - currentMarks;
  const isAchievable = required >= 0 && required <= remainingMaxMarks;

  return {
    requiredMarks: safeNumber(Math.max(0, required)),
    isAchievable,
  };
}

// Date Difference Calculator
export function calculateDateDifference(
  startDate: Date,
  endDate: Date
): { days: number; weeks: number; months: number; years: number } {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = endDate.getTime() - startDate.getTime();
  const days = Math.floor(diffMs / msPerDay);
  const weeks = Math.floor(days / 7);

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  if (endDate.getDate() < startDate.getDate()) months--;
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    days: safeNumber(days),
    weeks: safeNumber(weeks),
    months: safeNumber(months + years * 12),
    years: safeNumber(years),
  };
}

// Time Calculator
export function calculateTimeAdd(
  time1: { hours: number; minutes: number; seconds: number },
  time2: { hours: number; minutes: number; seconds: number },
  operation: 'add' | 'subtract' = 'add'
): { hours: number; minutes: number; seconds: number } {
  let totalSeconds: number;
  const t1 = time1.hours * 3600 + time1.minutes * 60 + time1.seconds;
  const t2 = time2.hours * 3600 + time2.minutes * 60 + time2.seconds;

  totalSeconds = operation === 'add' ? t1 + t2 : t1 - t2;
  if (totalSeconds < 0) totalSeconds = 0;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

// Mileage Calculator
export function calculateMileage(
  distance: number,
  fuelConsumed: number
): { mileage: number } {
  if (fuelConsumed <= 0) return { mileage: 0 };
  return { mileage: safeNumber(distance / fuelConsumed) };
}

// Electricity Cost Calculator
export function calculateElectricityCost(
  wattage: number,
  numAppliances: number,
  hoursPerDay: number,
  daysPerMonth: number,
  ratePerKWh: number
): { dailyKWh: number; monthlyKWh: number; monthlyCost: number } {
  const totalWatts = Math.max(0, wattage) * Math.max(1, numAppliances);
  const dailyKWh = (totalWatts * hoursPerDay) / 1000;
  const monthlyKWh = dailyKWh * daysPerMonth;
  const monthlyCost = monthlyKWh * ratePerKWh;
  return {
    dailyKWh: safeNumber(dailyKWh),
    monthlyKWh: safeNumber(monthlyKWh),
    monthlyCost: safeNumber(monthlyCost),
  };
}

// Average Calculator
export function calculateAverage(
  numbers: number[]
): { mean: number; sum: number; count: number; min: number; max: number } {
  const valid = numbers.filter((n) => isFinite(n));
  if (valid.length === 0) return { mean: 0, sum: 0, count: 0, min: 0, max: 0 };

  const sum = valid.reduce((a, b) => a + b, 0);
  const count = valid.length;
  const mean = sum / count;

  return {
    mean: safeNumber(mean),
    sum: safeNumber(sum),
    count,
    min: safeNumber(Math.min(...valid)),
    max: safeNumber(Math.max(...valid)),
  };
}

// Ratio Calculator
export function simplifyRatio(a: number, b: number): { ratio: string; simplified: [number, number] } {
  if (a === 0 || b === 0) return { ratio: `${a}:${b}`, simplified: [a, b] };
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const g = gcd(Math.abs(a), Math.abs(b));
  const sa = a / g;
  const sb = b / g;
  return { ratio: `${sa}:${sb}`, simplified: [sa, sb] };
}

export function solveRatio(a: number, b: number, c: number): { d: number } {
  if (a === 0) return { d: 0 };
  return { d: safeNumber((b * c) / a) };
}

// Fraction Calculator
export function calculateFraction(
  num1: number, den1: number,
  num2: number, den2: number,
  operation: 'add' | 'subtract' | 'multiply' | 'divide'
): { numerator: number; denominator: number; decimal: number; simplified: string } {
  let resultNum: number;
  let resultDen: number;

  switch (operation) {
    case 'add':
      resultNum = num1 * den2 + num2 * den1;
      resultDen = den1 * den2;
      break;
    case 'subtract':
      resultNum = num1 * den2 - num2 * den1;
      resultDen = den1 * den2;
      break;
    case 'multiply':
      resultNum = num1 * num2;
      resultDen = den1 * den2;
      break;
    case 'divide':
      resultNum = num1 * den2;
      resultDen = den1 * num2;
      break;
  }

  if (resultDen === 0) return { numerator: 0, denominator: 0, decimal: 0, simplified: 'undefined' };

  const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));
  const g = gcd(Math.abs(resultNum), Math.abs(resultDen));
  const sn = resultNum / g;
  const sd = resultDen / g;

  return {
    numerator: sn,
    denominator: sd,
    decimal: safeNumber(resultNum / resultDen),
    simplified: `${sn}/${sd}`,
  };
}

// Unit Converter
export const unitConversions: Record<string, Record<string, number>> = {
  length: {
    mm: 0.001, cm: 0.01, m: 1, km: 1000,
    inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.344,
  },
  weight: {
    mg: 0.000001, g: 0.001, kg: 1, tonne: 1000,
    ounce: 0.0283495, pound: 0.453592,
  },
  volume: {
    ml: 0.001, l: 1, 'cuM': 1000,
    'gallon': 3.78541, 'pint': 0.473176, 'cup': 0.236588,
  },
  speed: {
    'kmh': 1, 'ms': 3.6, 'mph': 1.60934, 'knot': 1.852,
  },
  area: {
    'sqmm': 0.000001, 'sqcm': 0.0001, 'sqm': 1, 'sqkm': 1000000,
    'sqft': 0.092903, 'sqyd': 0.836127, 'acre': 4046.86, 'hectare': 10000,
  },
  time: {
    'second': 1, 'minute': 60, 'hour': 3600, 'day': 86400, 'week': 604800, 'year': 31536000,
  },
};

export function convertUnit(
  value: number,
  category: string,
  fromUnit: string,
  toUnit: string
): number {
  const cat = unitConversions[category];
  if (!cat) return 0;
  const fromFactor = cat[fromUnit];
  const toFactor = cat[toUnit];
  if (!fromFactor || !toFactor) return 0;
  return safeNumber((value * fromFactor) / toFactor);
}

// Temperature Converter
export function convertTemperature(
  value: number,
  from: 'celsius' | 'fahrenheit' | 'kelvin',
  to: 'celsius' | 'fahrenheit' | 'kelvin'
): number {
  let celsius: number;
  switch (from) {
    case 'celsius': celsius = value; break;
    case 'fahrenheit': celsius = (value - 32) * 5 / 9; break;
    case 'kelvin': celsius = value - 273.15; break;
  }

  switch (to) {
    case 'celsius': return safeNumber(celsius);
    case 'fahrenheit': return safeNumber(celsius * 9 / 5 + 32);
    case 'kelvin': return safeNumber(celsius + 273.15);
  }
}

// BMR Calculator (Mifflin-St Jeor Equation)
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: 'male' | 'female'
): { bmr: number } {
  const base = 10 * Math.max(0, weightKg) + 6.25 * Math.max(0, heightCm) - 5 * Math.max(0, age);
  const bmr = sex === 'male' ? base + 5 : base - 161;
  return { bmr: safeNumber(bmr) };
}

// Daily Calorie Calculator (TDEE)
export function calculateDailyCalories(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive'
): { bmr: number; tdee: number } {
  const { bmr } = calculateBMR(weightKg, heightCm, age, sex);
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  const tdee = bmr * (multipliers[activityLevel] || 1.2);
  return { bmr: safeNumber(bmr), tdee: safeNumber(tdee) };
}

// Water Intake Calculator
export function calculateWaterIntake(
  weightKg: number,
  activityLevel: 'low' | 'moderate' | 'high' = 'moderate'
): { litres: number; glasses: number } {
  const weight = Math.max(0, weightKg);
  const mlPerKg: Record<string, number> = {
    low: 30,
    moderate: 35,
    high: 40,
  };
  const ml = weight * (mlPerKg[activityLevel] || 35);
  const litres = ml / 1000;
  return {
    litres: safeNumber(litres),
    glasses: safeNumber(Math.round(ml / 250)),
  };
}

// Ideal Weight Calculator (Devine Formula)
export function calculateIdealWeight(
  heightCm: number,
  sex: 'male' | 'female'
): { idealWeight: number; rangeLow: number; rangeHigh: number } {
  const heightInches = Math.max(0, heightCm) / 2.54;
  const over5ft = Math.max(0, heightInches - 60);

  const idealWeight = sex === 'male'
    ? 50 + 2.3 * over5ft
    : 45.5 + 2.3 * over5ft;

  return {
    idealWeight: safeNumber(idealWeight),
    rangeLow: safeNumber(idealWeight * 0.9),
    rangeHigh: safeNumber(idealWeight * 1.1),
  };
}

// Scientific Calculator expression evaluator
export function evaluateExpression(expr: string): number {
  try {
    const sanitized = expr
      .replace(/[^-+/*().0-9%\s\^a-z]/gi, '')
      .replace(/\^/g, '**')
      .replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

    if (!sanitized) return 0;

    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${sanitized})`)();
    if (typeof result !== 'number' || !isFinite(result)) return 0;
    return result;
  } catch {
    return 0;
  }
}

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

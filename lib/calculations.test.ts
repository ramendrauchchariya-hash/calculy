import {
  calculateEMI,
  calculateSIP,
  calculateGST,
  calculateCompoundInterest,
  calculateSimpleInterest,
  calculateBMI,
  calculateDiscount,
  calculateFuelCost,
  calculatePercentage,
  calculatePercentageOf,
  calculateAge,
  formatINR,
} from './calculations';

function approx(a: number, b: number, tolerance = 0.01): boolean {
  return Math.abs(a - b) < tolerance;
}

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
  console.log(`  ✓ ${msg}`);
}

function testEMI() {
  console.log('Testing EMI...');
  // ₹10,00,000 at 8.5% for 240 months → EMI ≈ 8678
  const r = calculateEMI(1000000, 8.5, 240);
  assert(approx(r.emi, 8678, 2), `EMI ≈ 8678, got ${r.emi}`);
  assert(r.totalPayment > r.totalInterest, 'total payment > total interest');
  assert(approx(r.totalPayment, r.emi * 240, 1), 'total payment = EMI × n');

  const zero = calculateEMI(0, 10, 12);
  assert(zero.emi === 0, 'zero principal → zero EMI');

  const noInterest = calculateEMI(12000, 0, 12);
  assert(approx(noInterest.emi, 1000, 0.01), '0% interest → principal/n');
  console.log();
}

function testSIP() {
  console.log('Testing SIP...');
  // ₹5000/month, 12%, 10 years → FV ≈ 11,61,695
  const r = calculateSIP(5000, 12, 10);
  assert(approx(r.totalValue, 1161695, 100), `SIP FV ≈ 1161695, got ${r.totalValue}`);
  assert(r.investedAmount === 600000, 'invested = 5000 × 120');
  assert(r.estimatedReturns > 0, 'returns > 0');
  console.log();
}

function testGST() {
  console.log('Testing GST...');
  const ex = calculateGST(1000, 18, 'exclusive');
  assert(approx(ex.gstAmount, 180, 0.01), 'exclusive GST = 180');
  assert(approx(ex.totalAmount, 1180, 0.01), 'exclusive total = 1180');
  assert(approx(ex.cgst, 90, 0.01), 'CGST = 90');

  const inc = calculateGST(1180, 18, 'inclusive');
  assert(approx(inc.baseAmount, 1000, 0.01), 'inclusive base = 1000');
  assert(approx(inc.gstAmount, 180, 0.01), 'inclusive GST = 180');
  console.log();
}

function testCompoundInterest() {
  console.log('Testing Compound Interest...');
  // ₹1,00,000 at 8% for 5 years, quarterly → ≈ 1,48,595
  const r = calculateCompoundInterest(100000, 8, 5, 4);
  assert(approx(r.totalAmount, 148595, 10), `CI total ≈ 148595, got ${r.totalAmount}`);
  assert(approx(r.interestEarned, 48595, 10), 'CI interest ≈ 48595');
  console.log();
}

function testSimpleInterest() {
  console.log('Testing Simple Interest...');
  // ₹50,000 at 10% for 3 years → SI = 15000
  const r = calculateSimpleInterest(50000, 10, 3);
  assert(approx(r.interest, 15000, 0.01), 'SI = 15000');
  assert(approx(r.totalAmount, 65000, 0.01), 'total = 65000');
  console.log();
}

function testBMI() {
  console.log('Testing BMI...');
  const r = calculateBMI(70, 170);
  assert(approx(r.bmi, 24.22, 0.1), `BMI ≈ 24.22, got ${r.bmi}`);
  assert(r.category === 'Normal weight', '70kg/170cm → normal');
  console.log();
}

function testDiscount() {
  console.log('Testing Discount...');
  const r = calculateDiscount(1500, 30);
  assert(approx(r.discountAmount, 450, 0.01), 'discount = 450');
  assert(approx(r.finalPrice, 1050, 0.01), 'final = 1050');
  console.log();
}

function testFuelCost() {
  console.log('Testing Fuel Cost...');
  const r = calculateFuelCost(400, 15, 106);
  assert(approx(r.fuelNeeded, 26.67, 0.01), 'fuel ≈ 26.67');
  assert(approx(r.totalCost, 2826.67, 0.5), 'cost ≈ 2827');
  console.log();
}

function testPercentage() {
  console.log('Testing Percentage...');
  const p = calculatePercentage(42, 50);
  assert(approx(p.percentage, 84, 0.01), '42/50 = 84%');
  const p2 = calculatePercentageOf(15, 2000);
  assert(approx(p2.result, 300, 0.01), '15% of 2000 = 300');
  console.log();
}

function testAge() {
  console.log('Testing Age...');
  const birth = new Date(1995, 2, 15);
  const asOf = new Date(2026, 8, 27);
  const r = calculateAge(birth, asOf);
  assert(r.years === 31, '31 years');
  assert(r.months === 6, '6 months');
  assert(r.days === 12, '12 days');
  console.log();
}

function testFormatINR() {
  console.log('Testing formatINR...');
  assert(formatINR(100000) === '₹1,00,000', 'lakh formatting');
  assert(formatINR(10000000) === '₹1,00,00,000', 'crore formatting');
  assert(formatINR(1500) === '₹1,500', 'thousand formatting');
  console.log();
}

function main() {
  console.log('=== Calculation Tests ===\n');
  testEMI();
  testSIP();
  testGST();
  testCompoundInterest();
  testSimpleInterest();
  testBMI();
  testDiscount();
  testFuelCost();
  testPercentage();
  testAge();
  testFormatINR();
  console.log('=== All tests passed ===');
}

main();

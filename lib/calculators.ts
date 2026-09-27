export type CategoryId =
  | 'finance'
  | 'daily-life'
  | 'health'
  | 'math';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RelatedCalculator {
  slug: string;
  title: string;
}

export interface CalculatorContent {
  intro: string;
  whatIs: { heading: string; body: string };
  formula: { heading: string; body: string; expression: string };
  howToCalculate: { heading: string; steps: string[] };
  example: { heading: string; body: string };
  factors: { heading: string; items: string[] };
  faqs: FAQ[];
}

export interface CalculatorMeta {
  slug: string;
  title: string;
  name: string;
  shortDescription: string;
  category: CategoryId;
  icon: string;
  keywords: string[];
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  related: RelatedCalculator[];
  content: CalculatorContent;
}

export const categories: Category[] = [
  {
    id: 'finance',
    name: 'Finance',
    slug: 'finance',
    description: 'Plan loans, investments, taxes, and savings with accurate financial calculators built for Indian users.',
    icon: 'Wallet',
  },
  {
    id: 'daily-life',
    name: 'Daily Life',
    slug: 'daily-life',
    description: 'Everyday calculations for shopping, travel, and personal budgeting made simple.',
    icon: 'ShoppingCart',
  },
  {
    id: 'health',
    name: 'Health',
    slug: 'health',
    description: 'Track your fitness and wellness with easy-to-use health calculators.',
    icon: 'HeartPulse',
  },
  {
    id: 'math',
    name: 'Math',
    slug: 'math',
    description: 'Solve common math problems quickly with straightforward percentage and interest tools.',
    icon: 'Calculator',
  },
];

export const calculators: CalculatorMeta[] = [
  {
    slug: 'emi-calculator',
    title: 'EMI Calculator',
    name: 'EMI Calculator',
    shortDescription: 'Calculate your monthly loan EMI, total interest, and total payment.',
    category: 'finance',
    icon: 'Landmark',
    keywords: ['EMI calculator', 'loan EMI calculator', 'monthly EMI calculator', 'home loan EMI'],
    seo: {
      title: 'EMI Calculator - Calculate Monthly Loan EMI | Calculy',
      description: 'Calculate your monthly loan EMI, total interest and total payment using our free EMI calculator. Enter loan amount, interest rate and tenure to calculate instantly.',
      ogTitle: 'EMI Calculator - Calculate Your Monthly Loan EMI',
      ogDescription: 'Free online EMI calculator for home, car, and personal loans. Get instant monthly installment, total interest, and repayment details.',
    },
    related: [
      { slug: 'sip-calculator', title: 'SIP Calculator' },
      { slug: 'compound-interest-calculator', title: 'Compound Interest Calculator' },
      { slug: 'simple-interest-calculator', title: 'Simple Interest Calculator' },
    ],
    content: {
      intro: 'Calculate your monthly loan EMI instantly by entering your loan amount, interest rate and loan tenure.',
      whatIs: {
        heading: 'What is EMI?',
        body: 'EMI stands for Equated Monthly Installment. It is the fixed amount you pay every month to repay a loan. Each EMI covers both the principal amount and the interest charged by the lender. In the early months, most of your payment goes toward interest; over time, more of it goes toward the principal.',
      },
      formula: {
        heading: 'EMI Formula',
        body: 'The EMI is calculated using the standard reducing-balance formula:',
        expression: 'EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)',
      },
      howToCalculate: {
        heading: 'How to calculate EMI',
        steps: [
          'Enter the loan amount (P) you wish to borrow.',
          'Enter the annual interest rate offered by your lender.',
          'Enter the loan tenure in months or years.',
          'The calculator converts the annual rate to a monthly rate (r = annual rate / 12 / 100).',
          'It applies the EMI formula and shows your monthly payment, total interest, and total repayment.',
        ],
      },
      example: {
        heading: 'EMI calculation example',
        body: 'Suppose you take a home loan of ₹10,00,000 at 8.5% annual interest for 20 years (240 months). The monthly rate is 8.5 / 12 / 100 = 0.00708. Applying the formula, your EMI comes to approximately ₹8,678 per month. Over 20 years you would repay about ₹20,82,720 in total, of which ₹10,82,720 is interest.',
      },
      factors: {
        heading: 'Factors affecting EMI',
        items: [
          'Loan amount — a higher principal increases the monthly EMI.',
          'Interest rate — a higher rate increases both EMI and total interest.',
          'Loan tenure — a longer tenure lowers the monthly EMI but increases total interest paid.',
          'Prepayments — part-payments reduce the principal and can lower future EMIs or tenure.',
        ],
      },
      faqs: [
        { question: 'What is EMI?', answer: 'EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay a loan. It includes both principal and interest portions.' },
        { question: 'How is EMI calculated?', answer: 'EMI is calculated using the formula P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate, and n is the number of monthly installments.' },
        { question: 'Does the EMI change during the loan tenure?', answer: 'For a fixed-rate loan, the EMI stays the same throughout. For floating-rate loans, the EMI or tenure may change when the lender revises the interest rate.' },
        { question: 'What happens if I prepay part of my loan?', answer: 'Prepayments reduce your outstanding principal. This lowers the total interest you pay and can either reduce your future EMIs or shorten your loan tenure.' },
        { question: 'Is this EMI calculator accurate for home loans?', answer: 'Yes. The calculator uses the standard reducing-balance formula that banks in India use for home, car, and personal loans. Actual EMIs may differ slightly due to processing fees and taxes.' },
      ],
    },
  },
  {
    slug: 'sip-calculator',
    title: 'SIP Calculator',
    name: 'SIP Calculator',
    shortDescription: 'Estimate the future value of your mutual fund SIP investments.',
    category: 'finance',
    icon: 'TrendingUp',
    keywords: ['SIP calculator', 'mutual fund SIP', 'monthly investment calculator', 'SIP returns'],
    seo: {
      title: 'SIP Calculator - Calculate Mutual Fund SIP Returns | Calculy',
      description: 'Use our free SIP calculator to estimate the future value of your monthly mutual fund SIP investments. Enter monthly amount, expected return rate, and investment period.',
      ogTitle: 'SIP Calculator - Estimate Your Mutual Fund SIP Returns',
      ogDescription: 'Calculate the future value of your SIP investments with expected returns and investment duration. Free, accurate, and easy to use.',
    },
    related: [
      { slug: 'emi-calculator', title: 'EMI Calculator' },
      { slug: 'compound-interest-calculator', title: 'Compound Interest Calculator' },
      { slug: 'simple-interest-calculator', title: 'Simple Interest Calculator' },
    ],
    content: {
      intro: 'Estimate the future value of your mutual fund SIP by entering your monthly investment amount, expected annual return, and investment duration.',
      whatIs: {
        heading: 'What is a SIP?',
        body: 'A Systematic Investment Plan (SIP) is a way to invest a fixed amount in mutual funds at regular intervals, usually monthly. SIPs help you build wealth over time through rupee-cost averaging and the power of compounding.',
      },
      formula: {
        heading: 'SIP Formula',
        body: 'The future value of a SIP is calculated using the compound interest formula for a series of regular investments:',
        expression: 'FV = P × ((1 + i)^n − 1) / i × (1 + i)',
      },
      howToCalculate: {
        heading: 'How to use the SIP calculator',
        steps: [
          'Enter the amount you invest every month.',
          'Enter the expected annual return rate of the mutual fund.',
          'Enter the number of years you plan to stay invested.',
          'The calculator shows the total amount you invested, the estimated returns, and the total future value.',
        ],
      },
      example: {
        heading: 'SIP calculation example',
        body: 'If you invest ₹5,000 every month for 10 years at an expected return of 12% per annum, your total invested amount is ₹6,00,000. The estimated returns come to about ₹5,61,695, giving a total future value of approximately ₹11,61,695.',
      },
      factors: {
        heading: 'Factors affecting SIP returns',
        items: [
          'Monthly investment amount — investing more each month builds a larger corpus.',
          'Investment duration — staying invested longer lets compounding work harder.',
          'Expected return rate — higher returns grow your corpus faster, but come with higher risk.',
          'Market performance — actual returns vary; mutual fund returns are not guaranteed.',
        ],
      },
      faqs: [
        { question: 'What is a SIP?', answer: 'A SIP (Systematic Investment Plan) is a method of investing a fixed amount in mutual funds at regular intervals, typically monthly.' },
        { question: 'Is SIP return guaranteed?', answer: 'No. SIP returns depend on the performance of the underlying mutual fund. The calculator shows an estimate based on the expected return rate you enter.' },
        { question: 'How is SIP return calculated?', answer: 'SIP returns are calculated using the future value of an annuity formula: FV = P × ((1 + i)^n − 1) / i × (1 + i), where i is the monthly rate and n is the number of months.' },
        { question: 'Can I start a SIP with a small amount?', answer: 'Yes. Many mutual funds in India allow SIPs starting from ₹100 or ₹500 per month.' },
        { question: 'What is a good expected return rate for SIP?', answer: 'Equity mutual funds have historically returned 10–14% over long periods, but this is not guaranteed. Debt funds typically return lower. Use a realistic rate based on the fund category.' },
      ],
    },
  },
  {
    slug: 'gst-calculator',
    title: 'GST Calculator',
    name: 'GST Calculator',
    shortDescription: 'Calculate GST inclusive or exclusive amounts with CGST and SGST breakdown.',
    category: 'finance',
    icon: 'ReceiptIndianRupee',
    keywords: ['GST calculator', 'GST inclusive', 'GST exclusive', 'CGST SGST calculator'],
    seo: {
      title: 'GST Calculator - Calculate GST Online | Calculy',
      description: 'Free online GST calculator for India. Calculate GST inclusive or exclusive amounts with CGST and SGST breakdown. Enter amount and GST rate to get instant results.',
      ogTitle: 'GST Calculator - Calculate GST Inclusive & Exclusive Amounts',
      ogDescription: 'Calculate GST online with CGST and SGST breakdown. Supports both inclusive and exclusive GST calculations for Indian businesses.',
    },
    related: [
      { slug: 'percentage-calculator', title: 'Percentage Calculator' },
      { slug: 'discount-calculator', title: 'Discount Calculator' },
      { slug: 'emi-calculator', title: 'EMI Calculator' },
    ],
    content: {
      intro: 'Calculate GST on any amount instantly. Choose between GST-inclusive and GST-exclusive modes and see the CGST and SGST breakdown.',
      whatIs: {
        heading: 'What is GST?',
        body: 'GST (Goods and Services Tax) is a unified indirect tax applied in India on the supply of goods and services. It replaced many earlier taxes like VAT, service tax, and excise duty. GST has different slabs — commonly 5%, 12%, 18%, and 28%.',
      },
      formula: {
        heading: 'GST Formula',
        body: 'For GST-exclusive (adding GST to a base amount):',
        expression: 'GST Amount = Base Amount × (GST Rate / 100)\nTotal = Base Amount + GST Amount',
      },
      howToCalculate: {
        heading: 'How to calculate GST',
        steps: [
          'Enter the amount and the applicable GST rate (5%, 12%, 18%, or 28%).',
          'Choose "Exclusive" if the amount does not include GST, or "Inclusive" if it already includes GST.',
          'For exclusive mode, GST is added to the base amount.',
          'For inclusive mode, the base amount is extracted by dividing by (1 + rate/100).',
          'The calculator also splits GST equally into CGST and SGST for intra-state supplies.',
        ],
      },
      example: {
        heading: 'GST calculation example',
        body: 'If a product costs ₹1,000 before GST and the rate is 18%, the GST amount is ₹180 and the total is ₹1,180. The CGST is ₹90 and the SGST is ₹90. If the price is ₹1,180 inclusive of 18% GST, the base amount is ₹1,000 and the GST portion is ₹180.',
      },
      factors: {
        heading: 'GST slabs and rules',
        items: [
          '5% — essential goods like food items and some household products.',
          '12% — processed food and certain manufactured goods.',
          '18% — most goods and services, the most common slab.',
          '28% — luxury items and sin goods like automobiles and tobacco.',
          'CGST + SGST apply to intra-state supplies; IGST applies to inter-state supplies.',
        ],
      },
      faqs: [
        { question: 'What is GST?', answer: 'GST (Goods and Services Tax) is a single indirect tax on the supply of goods and services in India, replacing multiple earlier taxes.' },
        { question: 'What are the GST rates in India?', answer: 'Common GST slabs in India are 5%, 12%, 18%, and 28%. Some items are exempt or taxed at 0.25%.' },
        { question: 'What is the difference between GST-inclusive and GST-exclusive?', answer: 'GST-exclusive means GST is added on top of the base amount. GST-inclusive means the quoted amount already contains GST and the base price needs to be extracted.' },
        { question: 'What are CGST and SGST?', answer: 'For intra-state supplies, GST is split equally into CGST (Central GST) and SGST (State GST). For inter-state supplies, the full amount is charged as IGST.' },
        { question: 'How do I remove GST from a total amount?', answer: 'Divide the total by (1 + GST rate / 100). For example, ₹1,180 inclusive of 18% GST gives a base of 1180 / 1.18 = ₹1,000.' },
      ],
    },
  },
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    name: 'Percentage Calculator',
    shortDescription: 'Calculate what percentage one number is of another, or find a percentage of a number.',
    category: 'math',
    icon: 'Percent',
    keywords: ['percentage calculator', 'what percent of', 'percentage of number', 'percent calculator'],
    seo: {
      title: 'Percentage Calculator - Calculate Percentages Online | Calculy',
      description: 'Free percentage calculator. Find what percentage one number is of another, or calculate a percentage of any number. Quick, accurate, and easy to use.',
      ogTitle: 'Percentage Calculator - Calculate Percentages Instantly',
      ogDescription: 'Calculate percentages online for free. Find what percent one number is of another, or calculate a percentage of any value.',
    },
    related: [
      { slug: 'gst-calculator', title: 'GST Calculator' },
      { slug: 'discount-calculator', title: 'Discount Calculator' },
      { slug: 'compound-interest-calculator', title: 'Compound Interest Calculator' },
    ],
    content: {
      intro: 'Quickly calculate what percentage one number is of another, or find a percentage of any number.',
      whatIs: {
        heading: 'What is a percentage?',
        body: 'A percentage expresses a number as a fraction of 100. The word "percent" means "per hundred." For example, 25% means 25 out of every 100, or one quarter.',
      },
      formula: {
        heading: 'Percentage Formula',
        body: 'To find what percentage a value is of a total:',
        expression: 'Percentage = (Value / Total) × 100',
      },
      howToCalculate: {
        heading: 'How to calculate a percentage',
        steps: [
          'To find what percent one number is of another, divide the part by the whole and multiply by 100.',
          'To find a percentage of a number, multiply the number by the percentage and divide by 100.',
          'For example, 20% of 150 = (20 / 100) × 150 = 30.',
          'To find what percent 30 is of 150, calculate (30 / 150) × 100 = 20%.',
        ],
      },
      example: {
        heading: 'Percentage calculation example',
        body: 'If you scored 42 out of 50 on a test, your percentage is (42 / 50) × 100 = 84%. Similarly, 15% of ₹2,000 is (15 / 100) × 2,000 = ₹300.',
      },
      factors: {
        heading: 'Common percentage uses',
        items: [
          'Exam scores and grades.',
          'Discounts and markups in shopping.',
          'Interest rates and financial returns.',
          'Tax rates like GST and income tax.',
          'Tracking changes over time, like sales growth.',
        ],
      },
      faqs: [
        { question: 'How do I calculate a percentage?', answer: 'Divide the part by the whole and multiply by 100. For example, (30 / 150) × 100 = 20%.' },
        { question: 'How do I find a percentage of a number?', answer: 'Multiply the number by the percentage and divide by 100. For example, 20% of 150 = (20 / 100) × 150 = 30.' },
        { question: 'What is the difference between percent and percentage points?', answer: 'A percent change compares to the original value. Percentage points measure the absolute difference between two percentages. For example, a rate going from 10% to 12% is a 2 percentage point increase but a 20% relative increase.' },
        { question: 'Can a percentage be more than 100%?', answer: 'Yes. A percentage above 100 means the part is larger than the whole, which is common when measuring growth or comparing to a baseline.' },
      ],
    },
  },
  {
    slug: 'age-calculator',
    title: 'Age Calculator',
    name: 'Age Calculator',
    shortDescription: 'Calculate your exact age in years, months, and days from your date of birth.',
    category: 'daily-life',
    icon: 'CalendarDays',
    keywords: ['age calculator', 'date of birth calculator', 'age in years months days', 'age from birthdate'],
    seo: {
      title: 'Age Calculator - Calculate Age from Date of Birth | Calculy',
      description: 'Free age calculator to find your exact age in years, months, and days from your date of birth. Quick, accurate, and easy to use.',
      ogTitle: 'Age Calculator - Find Your Exact Age',
      ogDescription: 'Calculate your exact age in years, months, and days from your date of birth. Free and accurate age calculator.',
    },
    related: [
      { slug: 'bmi-calculator', title: 'BMI Calculator' },
      { slug: 'percentage-calculator', title: 'Percentage Calculator' },
      { slug: 'fuel-cost-calculator', title: 'Fuel Cost Calculator' },
    ],
    content: {
      intro: 'Calculate your exact age in years, months, and days by entering your date of birth.',
      whatIs: {
        heading: 'What is an age calculator?',
        body: 'An age calculator finds the time elapsed between your date of birth and another date (usually today). It expresses the result in years, months, and days, accounting for leap years and varying month lengths.',
      },
      formula: {
        heading: 'How age is calculated',
        body: 'Age is calculated by subtracting the birth year, month, and day from the current date. If the current day is earlier in the month than the birth day, the calculator borrows from the previous month.',
        expression: 'Age = Current Date − Birth Date',
      },
      howToCalculate: {
        heading: 'How to calculate age',
        steps: [
          'Enter your date of birth in the date picker.',
          'The calculator uses today\'s date by default, or you can enter a specific date.',
          'It subtracts the birth date from the target date.',
          'The result shows your age in completed years, months, and days.',
        ],
      },
      example: {
        heading: 'Age calculation example',
        body: 'If your date of birth is 15 March 1995 and today is 27 September 2026, your age is 31 years, 6 months, and 12 days. The total number of days lived would be approximately 11,526 days.',
      },
      factors: {
        heading: 'Things to know about age calculation',
        items: [
          'Leap years add an extra day in February and are accounted for automatically.',
          'Months have different numbers of days (28–31), which the calculator handles.',
          'Age is usually expressed in completed years, not rounded up.',
          'Some official documents count age from the birthday, not the birth moment.',
        ],
      },
      faqs: [
        { question: 'How is age calculated?', answer: 'Age is calculated by subtracting your date of birth from the current date, then expressing the result in years, months, and days.' },
        { question: 'Does the age calculator account for leap years?', answer: 'Yes. The calculator counts the actual number of days between two dates, so leap years are included automatically.' },
        { question: 'Can I calculate age as of a future or past date?', answer: 'Yes. You can enter any target date to calculate age as of that date, not just today.' },
        { question: 'Why does my age in days differ from another calculator?', answer: 'Some calculators count only completed years, while others include the current year. This calculator counts exact elapsed days for precision.' },
      ],
    },
  },
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    name: 'BMI Calculator',
    shortDescription: 'Calculate your Body Mass Index and find out your weight category.',
    category: 'health',
    icon: 'HeartPulse',
    keywords: ['BMI calculator', 'body mass index', 'weight calculator', 'BMI chart'],
    seo: {
      title: 'BMI Calculator - Calculate Body Mass Index | Calculy',
      description: 'Free BMI calculator to check your Body Mass Index. Enter your height and weight to find out if you are underweight, normal, overweight, or obese.',
      ogTitle: 'BMI Calculator - Check Your Body Mass Index',
      ogDescription: 'Calculate your BMI instantly with height and weight. Find out your weight category and what it means for your health.',
    },
    related: [
      { slug: 'age-calculator', title: 'Age Calculator' },
      { slug: 'percentage-calculator', title: 'Percentage Calculator' },
      { slug: 'fuel-cost-calculator', title: 'Fuel Cost Calculator' },
    ],
    content: {
      intro: 'Calculate your Body Mass Index (BMI) by entering your height and weight to find out whether you are in a healthy weight range.',
      whatIs: {
        heading: 'What is BMI?',
        body: 'Body Mass Index (BMI) is a measure that uses your height and weight to estimate whether your weight is in a healthy range. It is widely used as a screening tool, though it does not directly measure body fat.',
      },
      formula: {
        heading: 'BMI Formula',
        body: 'BMI is calculated by dividing weight in kilograms by the square of height in metres:',
        expression: 'BMI = Weight (kg) / Height (m)²',
      },
      howToCalculate: {
        heading: 'How to calculate BMI',
        steps: [
          'Enter your weight in kilograms.',
          'Enter your height in centimetres.',
          'The calculator converts height to metres (cm / 100).',
          'It divides weight by height squared to get your BMI.',
          'Your BMI is matched to a category: underweight, normal, overweight, or obese.',
        ],
      },
      example: {
        heading: 'BMI calculation example',
        body: 'If you weigh 70 kg and are 170 cm tall, your height in metres is 1.70. BMI = 70 / (1.70 × 1.70) = 70 / 2.89 = 24.2. This falls in the normal weight range.',
      },
      factors: {
        heading: 'BMI categories',
        items: [
          'Underweight: BMI below 18.5',
          'Normal weight: BMI 18.5 to 24.9',
          'Overweight: BMI 25 to 29.9',
          'Obese: BMI 30 or above',
          'BMI is a general guide and may not be accurate for athletes, pregnant women, or the elderly.',
        ],
      },
      faqs: [
        { question: 'What is a healthy BMI?', answer: 'A BMI between 18.5 and 24.9 is generally considered healthy for most adults.' },
        { question: 'Is BMI accurate for everyone?', answer: 'No. BMI does not distinguish between muscle and fat, so it may overestimate body fat in muscular individuals like athletes and underestimate it in older adults who have lost muscle.' },
        { question: 'How is BMI calculated?', answer: 'BMI is calculated as weight in kilograms divided by height in metres squared: BMI = kg / m².' },
        { question: 'Should I rely only on BMI?', answer: 'No. BMI is a screening tool, not a diagnosis. Consult a healthcare professional for a full health assessment, especially before making major diet or exercise changes.' },
        { question: 'Is this BMI calculator suitable for children?', answer: 'This calculator uses adult BMI ranges. For children and teens, BMI is interpreted using age- and sex-specific percentile charts.' },
      ],
    },
  },
  {
    slug: 'fuel-cost-calculator',
    title: 'Fuel Cost Calculator',
    name: 'Fuel Cost Calculator',
    shortDescription: 'Estimate the fuel needed and total cost for any trip distance.',
    category: 'daily-life',
    icon: 'Fuel',
    keywords: ['fuel cost calculator', 'petrol cost', 'trip fuel cost', 'mileage calculator'],
    seo: {
      title: 'Fuel Cost Calculator - Estimate Trip Fuel Cost | Calculy',
      description: 'Free fuel cost calculator to estimate the fuel needed and total cost for any trip. Enter distance, mileage, and fuel price to get instant results.',
      ogTitle: 'Fuel Cost Calculator - Estimate Your Trip Fuel Expenses',
      ogDescription: 'Calculate how much fuel your trip will need and what it will cost. Enter distance, vehicle mileage, and current fuel price.',
    },
    related: [
      { slug: 'emi-calculator', title: 'EMI Calculator' },
      { slug: 'age-calculator', title: 'Age Calculator' },
      { slug: 'percentage-calculator', title: 'Percentage Calculator' },
    ],
    content: {
      intro: 'Estimate the fuel needed and the total cost of a trip by entering the distance, your vehicle\'s mileage, and the current fuel price.',
      whatIs: {
        heading: 'What is a fuel cost calculator?',
        body: 'A fuel cost calculator helps you estimate how much fuel your vehicle will consume for a given distance and how much that fuel will cost at current prices. It is useful for planning road trips and budgeting monthly fuel expenses.',
      },
      formula: {
        heading: 'Fuel Cost Formula',
        body: 'Fuel needed is the distance divided by mileage. Total cost is fuel needed multiplied by the fuel price:',
        expression: 'Fuel Needed = Distance / Mileage\nTotal Cost = Fuel Needed × Fuel Price',
      },
      howToCalculate: {
        heading: 'How to calculate fuel cost',
        steps: [
          'Enter the distance you plan to travel in kilometres.',
          'Enter your vehicle\'s mileage (km per litre or km per kg for CNG).',
          'Enter the current fuel price per litre.',
          'The calculator divides distance by mileage to find fuel needed.',
          'It multiplies fuel needed by the price to get the total cost.',
        ],
      },
      example: {
        heading: 'Fuel cost calculation example',
        body: 'If you plan to drive 400 km, your car gives a mileage of 15 km/l, and petrol costs ₹106 per litre, you will need about 26.67 litres of fuel. The total cost will be approximately ₹2,827.',
      },
      factors: {
        heading: 'Factors affecting fuel cost',
        items: [
          'Distance — longer trips need more fuel.',
          'Mileage — a more fuel-efficient vehicle lowers cost.',
          'Fuel price — prices vary by city and over time.',
          'Driving conditions — city traffic reduces mileage compared to highways.',
          'Vehicle condition — regular servicing keeps mileage optimal.',
        ],
      },
      faqs: [
        { question: 'How is fuel cost calculated?', answer: 'Divide the distance by your vehicle\'s mileage to get fuel needed, then multiply by the fuel price per litre to get the total cost.' },
        { question: 'What mileage should I enter?', answer: 'Enter your vehicle\'s real-world mileage, not the manufacturer\'s claimed figure. City mileage is usually lower than highway mileage.' },
        { question: 'Can I use this for diesel or CNG?', answer: 'Yes. Enter the mileage in km per unit (km/l for petrol/diesel, km/kg for CNG) and the corresponding fuel price.' },
        { question: 'Why does my actual fuel cost differ from the estimate?', answer: 'Real-world mileage depends on traffic, driving style, air conditioning use, and road conditions, so actual costs may vary from the estimate.' },
      ],
    },
  },
  {
    slug: 'discount-calculator',
    title: 'Discount Calculator',
    name: 'Discount Calculator',
    shortDescription: 'Find the final price after a discount and see how much you save.',
    category: 'daily-life',
    icon: 'Tag',
    keywords: ['discount calculator', 'sale price calculator', 'percentage discount', 'final price after discount'],
    seo: {
      title: 'Discount Calculator - Calculate Sale Price | Calculy',
      description: 'Free discount calculator to find the final price after a discount and see how much you save. Enter the original price and discount percentage.',
      ogTitle: 'Discount Calculator - Find the Price After Discount',
      ogDescription: 'Calculate the final price after any discount and see your savings instantly. Enter original price and discount percentage.',
    },
    related: [
      { slug: 'percentage-calculator', title: 'Percentage Calculator' },
      { slug: 'gst-calculator', title: 'GST Calculator' },
      { slug: 'fuel-cost-calculator', title: 'Fuel Cost Calculator' },
    ],
    content: {
      intro: 'Find the final price after a discount and see exactly how much you save by entering the original price and discount percentage.',
      whatIs: {
        heading: 'What is a discount?',
        body: 'A discount is a reduction in the original price of a product or service, usually expressed as a percentage. Stores offer discounts during sales, festivals, and clearance events to attract customers.',
      },
      formula: {
        heading: 'Discount Formula',
        body: 'The discount amount is the original price multiplied by the discount percentage divided by 100:',
        expression: 'Discount Amount = Original Price × (Discount % / 100)\nFinal Price = Original Price − Discount Amount',
      },
      howToCalculate: {
        heading: 'How to calculate a discount',
        steps: [
          'Enter the original price of the product.',
          'Enter the discount percentage offered.',
          'The calculator finds the discount amount by multiplying the price by the discount rate.',
          'It subtracts the discount amount from the original price to get the final price.',
        ],
      },
      example: {
        heading: 'Discount calculation example',
        body: 'If a shirt costs ₹1,500 and is on a 30% discount, the discount amount is ₹450 and the final price is ₹1,050. You save ₹450 on the purchase.',
      },
      factors: {
        heading: 'Types of discounts',
        items: [
          'Percentage discount — a percentage off the original price, like 20% off.',
          'Flat discount — a fixed amount off, like ₹200 off.',
          'Buy-one-get-one (BOGO) — a free or discounted item with purchase.',
          'Stacked discounts — multiple discounts applied in sequence, common in online sales.',
        ],
      },
      faqs: [
        { question: 'How do I calculate a discount?', answer: 'Multiply the original price by the discount percentage and divide by 100 to get the discount amount, then subtract it from the original price.' },
        { question: 'How do I calculate the final price after a discount?', answer: 'Final Price = Original Price − (Original Price × Discount % / 100). For example, ₹1,000 at 25% off gives a final price of ₹750.' },
        { question: 'Can I calculate multiple discounts?', answer: 'This calculator handles a single percentage discount. For stacked discounts, apply them one after another on the reduced price.' },
        { question: 'Is GST applied before or after the discount?', answer: 'In India, GST is usually applied on the discounted price. The discount is subtracted first, then GST is added to the remaining amount.' },
      ],
    },
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    name: 'Compound Interest Calculator',
    shortDescription: 'Calculate compound interest and total returns on your investment.',
    category: 'finance',
    icon: 'Layers',
    keywords: ['compound interest calculator', 'CI calculator', 'compound interest formula', 'investment growth'],
    seo: {
      title: 'Compound Interest Calculator - Calculate CI Online | Calculy',
      description: 'Free compound interest calculator. Calculate compound interest on your investments with customizable compounding frequency. Enter principal, rate, and time.',
      ogTitle: 'Compound Interest Calculator - Calculate Investment Growth',
      ogDescription: 'See how your money grows with compound interest. Enter principal, interest rate, time, and compounding frequency for instant results.',
    },
    related: [
      { slug: 'simple-interest-calculator', title: 'Simple Interest Calculator' },
      { slug: 'sip-calculator', title: 'SIP Calculator' },
      { slug: 'emi-calculator', title: 'EMI Calculator' },
    ],
    content: {
      intro: 'Calculate the compound interest on your investment by entering the principal amount, interest rate, time period, and compounding frequency.',
      whatIs: {
        heading: 'What is compound interest?',
        body: 'Compound interest is interest calculated on the initial principal as well as the interest accumulated from previous periods. In other words, you earn interest on your interest, which causes your investment to grow faster over time.',
      },
      formula: {
        heading: 'Compound Interest Formula',
        body: 'The total amount with compound interest is calculated as:',
        expression: 'A = P × (1 + r/n)^(n × t)\nCI = A − P',
      },
      howToCalculate: {
        heading: 'How to calculate compound interest',
        steps: [
          'Enter the principal amount you want to invest.',
          'Enter the annual interest rate.',
          'Enter the investment period in years.',
          'Choose how often interest is compounded (yearly, half-yearly, quarterly, or monthly).',
          'The calculator applies the formula and shows the total amount and interest earned.',
        ],
      },
      example: {
        heading: 'Compound interest example',
        body: 'If you invest ₹1,00,000 at 8% annual interest for 5 years, compounded quarterly (n = 4), the total amount becomes approximately ₹1,48,595 and the compound interest earned is ₹48,595.',
      },
      factors: {
        heading: 'Factors affecting compound interest',
        items: [
          'Principal — a larger initial investment earns more interest.',
          'Interest rate — higher rates grow your money faster.',
          'Time — the longer you stay invested, the greater the compounding effect.',
          'Compounding frequency — more frequent compounding (monthly vs yearly) yields slightly higher returns.',
        ],
      },
      faqs: [
        { question: 'What is compound interest?', answer: 'Compound interest is interest earned on both the original principal and the interest accumulated in previous periods. It lets your money grow faster than simple interest.' },
        { question: 'How is compound interest calculated?', answer: 'Using the formula A = P × (1 + r/n)^(n × t), where P is principal, r is the annual rate, n is the compounding frequency per year, and t is the number of years.' },
        { question: 'What is the best compounding frequency?', answer: 'More frequent compounding yields slightly higher returns. Monthly compounding earns more than quarterly, which earns more than yearly, given the same rate.' },
        { question: 'What is the difference between simple and compound interest?', answer: 'Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus accumulated interest, so it grows faster over time.' },
      ],
    },
  },
  {
    slug: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    name: 'Simple Interest Calculator',
    shortDescription: 'Calculate simple interest on a principal amount quickly.',
    category: 'finance',
    icon: 'Coins',
    keywords: ['simple interest calculator', 'SI calculator', 'simple interest formula', 'interest calculator'],
    seo: {
      title: 'Simple Interest Calculator - Calculate SI Online | Calculy',
      description: 'Free simple interest calculator. Calculate simple interest on any principal amount by entering the principal, interest rate, and time period.',
      ogTitle: 'Simple Interest Calculator - Calculate SI Instantly',
      ogDescription: 'Calculate simple interest on loans and investments. Enter principal, rate, and time to get the interest and total amount.',
    },
    related: [
      { slug: 'compound-interest-calculator', title: 'Compound Interest Calculator' },
      { slug: 'sip-calculator', title: 'SIP Calculator' },
      { slug: 'emi-calculator', title: 'EMI Calculator' },
    ],
    content: {
      intro: 'Calculate simple interest on any principal amount by entering the principal, annual interest rate, and time period.',
      whatIs: {
        heading: 'What is simple interest?',
        body: 'Simple interest is a method of calculating interest on a principal amount for a given time period. Unlike compound interest, it does not add interest on previously earned interest, so the interest amount stays the same each year.',
      },
      formula: {
        heading: 'Simple Interest Formula',
        body: 'Simple interest is calculated as:',
        expression: 'SI = (P × R × T) / 100\nTotal = P + SI',
      },
      howToCalculate: {
        heading: 'How to calculate simple interest',
        steps: [
          'Enter the principal amount.',
          'Enter the annual interest rate.',
          'Enter the time period in years.',
          'The calculator multiplies principal, rate, and time, then divides by 100 to get the interest.',
          'It adds the interest to the principal to show the total amount.',
        ],
      },
      example: {
        heading: 'Simple interest example',
        body: 'If you borrow ₹50,000 at 10% simple interest for 3 years, the interest is (50,000 × 10 × 3) / 100 = ₹15,000. The total amount to repay is ₹65,000.',
      },
      factors: {
        heading: 'Where simple interest applies',
        items: [
          'Short-term personal loans and car loans sometimes use simple interest.',
          'Some fixed deposits and savings accounts calculate interest this way.',
          'Simple interest is easier to compute but yields less than compound interest over long periods.',
          'The interest amount stays constant each year, unlike compound interest.',
        ],
      },
      faqs: [
        { question: 'What is simple interest?', answer: 'Simple interest is interest calculated only on the original principal for the entire period, without adding interest on previously earned interest.' },
        { question: 'How is simple interest calculated?', answer: 'Using the formula SI = (P × R × T) / 100, where P is principal, R is the annual interest rate, and T is the time in years.' },
        { question: 'What is the difference between simple and compound interest?', answer: 'Simple interest is calculated only on the principal, while compound interest is calculated on the principal plus accumulated interest. Over time, compound interest grows faster.' },
        { question: 'Is simple interest better than compound interest?', answer: 'For borrowers, simple interest results in lower total interest. For investors, compound interest yields higher returns over time.' },
      ],
    },
  },
];

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(categoryId: CategoryId): CalculatorMeta[] {
  return calculators.filter((c) => c.category === categoryId);
}

export function getCategoryById(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}

import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'About Calculy',
  'Learn about Calculy, a free online calculator platform for Indian users. Discover how our calculators work and our commitment to accuracy.',
  '/about'
);

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <Breadcrumbs items={[{ name: 'About' }]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-bold">About Calculy</h1>
      <div className="mt-6 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Calculy is a free online calculator platform built for Indian users. We offer a growing collection of accurate, easy-to-use calculators for everyday financial, personal, and mathematical needs — from EMI and SIP calculations to GST, BMI, percentages, and more.
        </p>
        <h2 className="text-xl font-bold text-foreground">How calculations are performed</h2>
        <p>
          Every calculator on Calculy uses standard, well-established mathematical formulas. For example, our EMI calculator uses the reducing-balance formula used by Indian banks, and our compound interest calculator supports multiple compounding frequencies. All calculation logic is written in reusable functions and tested against known examples to ensure accuracy.
        </p>
        <h2 className="text-xl font-bold text-foreground">Commitment to accuracy</h2>
        <p>
          We take accuracy seriously. Each calculator is verified against manually calculated results before being published. However, calculators are tools for estimation — actual results from banks, mutual funds, or tax authorities may differ due to fees, rule changes, or rounding.
        </p>
        <h2 className="text-xl font-bold text-foreground">Limitations</h2>
        <p>
          Calculy&apos;s calculators are for informational purposes only. They are not a substitute for professional financial, medical, or legal advice. For important decisions — such as taking a loan, making an investment, or assessing your health — please consult a qualified professional or official source.
        </p>
      </div>
    </div>
  );
}

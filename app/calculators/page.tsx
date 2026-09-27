import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { CalculatorCard } from '@/components/calculator-card';
import { CalculatorDirectory } from '@/components/calculator-directory';
import { calculators, categories, getCalculatorsByCategory } from '@/lib/calculators';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = pageMetadata(
  'All Calculators',
  'Browse all free online calculators on Calculy. Find EMI, SIP, GST, BMI, percentage, compound interest, and more calculators for Indian users.',
  '/calculators'
);

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumbs items={[{ name: 'Calculators' }]} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Calculators', url: '/calculators' }])} />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">All Calculators</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Browse our complete collection of free online calculators. Use the search and category filters to find the right tool for your calculation.
        </p>
      </div>

      {/* Category quick links */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/calculators/${cat.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
          >
            {cat.name} ({getCalculatorsByCategory(cat.id).length})
          </Link>
        ))}
      </div>

      <CalculatorDirectory calculators={calculators} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="All calculator cards">
        {calculators.map((calc) => (
          <CalculatorCard key={calc.slug} calculator={calc} />
        ))}
      </div>
    </div>
  );
}

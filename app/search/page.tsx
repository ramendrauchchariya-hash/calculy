import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { CalculatorSearch } from '@/components/calculator-search';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata(
    'Search Calculators',
    'Search for calculators on Calculy. Find EMI, SIP, GST, BMI, and other free online calculators.',
    '/search'
  ),
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <Breadcrumbs items={[{ name: 'Search' }]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-bold">Search Calculators</h1>
      <p className="mt-3 text-muted-foreground">
        Find the calculator you need by searching by name or keyword.
      </p>
      <div className="mt-8">
        <CalculatorSearch />
      </div>
    </div>
  );
}

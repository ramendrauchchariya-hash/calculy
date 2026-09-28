import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { RelatedCalculator } from '@/lib/calculators';
import { getCalculator } from '@/lib/calculators';

export function RelatedCalculators({ related }: { related: RelatedCalculator[] }) {
  const calculators = related
    .map((r) => getCalculator(r.slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  if (calculators.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-2xl font-bold mb-4">Related Calculators</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="group flex items-center justify-between rounded-lg border bg-card p-4 hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">{calc.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{calc.shortDescription}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
          </Link>
        ))}
      </div>
    </section>
  );
}

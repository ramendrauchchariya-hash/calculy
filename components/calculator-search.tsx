'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { calculators } from '@/lib/calculators';
import { CalculatorCard } from '@/components/calculator-card';

export function CalculatorSearch() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = React.useState(initialQuery);

  const results = React.useMemo(() => {
    if (!query.trim()) return calculators;
    const q = query.toLowerCase();
    return calculators.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          placeholder="Search for a calculator..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          aria-label="Search calculators"
          className="flex h-12 w-full rounded-lg border border-input bg-background pl-11 pr-10 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {results.length} calculator{results.length !== 1 ? 's' : ''} found
      </p>

      {results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((calc) => (
            <CalculatorCard key={calc.slug} calculator={calc} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No calculators found for &quot;{query}&quot;.</p>
          <p className="text-sm text-muted-foreground mt-2">Try a different search term or browse all calculators.</p>
        </div>
      )}
    </div>
  );
}

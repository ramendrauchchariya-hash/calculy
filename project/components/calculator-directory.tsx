'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { categories } from '@/lib/calculators';
import type { CalculatorMeta, CategoryId } from '@/lib/calculators';
import { cn } from '@/lib/utils';

interface CalculatorDirectoryProps {
  calculators: CalculatorMeta[];
}

export function CalculatorDirectory({ calculators }: CalculatorDirectoryProps) {
  const [query, setQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<CategoryId | 'all'>('all');

  const filtered = React.useMemo(() => {
    let result = calculators;
    if (activeCategory !== 'all') {
      result = result.filter((c) => c.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return result;
  }, [calculators, query, activeCategory]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search calculators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search calculators"
            className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-9 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              activeCategory === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'hover:border-primary'
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                activeCategory === cat.id ? 'bg-primary text-primary-foreground border-primary' : 'hover:border-primary'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filtered.length} calculator{filtered.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}

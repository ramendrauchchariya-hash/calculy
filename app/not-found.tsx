import Link from 'next/link';
import { Home, Search, Calculator } from 'lucide-react';
import { calculators } from '@/lib/calculators';

export default function NotFound() {
  const popular = calculators.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-2xl text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-bold">Calculator not found</h2>
      <p className="mt-3 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved. Try one of the links below.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/calculators"
          className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          <Calculator className="h-4 w-4" />
          All Calculators
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          <Search className="h-4 w-4" />
          Search
        </Link>
      </div>

      <div className="mt-12">
        <h3 className="font-semibold mb-4">Popular Calculators</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {popular.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="inline-flex items-center rounded-full border bg-card px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              {calc.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

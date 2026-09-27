import Link from 'next/link';
import { ArrowRight, Search, ShieldCheck, Zap, Calculator } from 'lucide-react';
import { calculators, categories, getCalculatorsByCategory } from '@/lib/calculators';
import { CalculatorCard, CategoryCard } from '@/components/calculator-card';

export default function HomePage() {
  const featured = [
    'emi-calculator',
    'sip-calculator',
    'gst-calculator',
    'bmi-calculator',
    'percentage-calculator',
    'compound-interest-calculator',
  ]
    .map((slug) => calculators.find((c) => c.slug === slug)!)
    .filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
              <ShieldCheck className="h-4 w-4 text-success" />
              Accurate calculations, free forever
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Free Online Calculators for{' '}
              <span className="text-primary">Indian Users</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              Calculate EMI, SIP, GST, BMI, percentages, compound interest, and more.
              Accurate, fast, and easy to use — built for everyday financial and personal calculations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Browse All Calculators
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/calculators/emi-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
              >
                Try EMI Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold mb-1">Instant Results</h2>
                <p className="text-sm text-muted-foreground">Get accurate calculations the moment you enter your values. No waiting, no sign-up.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold mb-1">Verified Formulas</h2>
                <p className="text-sm text-muted-foreground">Every calculator uses standard mathematical formulas, tested for accuracy against known examples.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold mb-1">Built for India</h2>
                <p className="text-sm text-muted-foreground">Supports Indian number formatting, rupee symbols, and local terms like EMI, SIP, GST, and lakh.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">Find the right calculator for your needs.</p>
          </div>
          <Link href="/calculators" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} count={getCalculatorsByCategory(cat.id).length} />
          ))}
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="bg-muted/30 border-y">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Popular Calculators</h2>
              <p className="mt-2 text-muted-foreground">Most used calculators on Calculy.</p>
            </div>
            <Link href="/calculators" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-12 text-center">
          <Search className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Can&apos;t find what you need?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Search through all our calculators or browse the full directory to find the right tool.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Search Calculators
            </Link>
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              Browse Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

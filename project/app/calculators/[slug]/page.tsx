import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { CalculatorCard } from '@/components/calculator-card';
import { CalculatorWidget } from '@/components/calculator';
import { FAQSection } from '@/components/faq-section';
import { RelatedCalculators } from '@/components/related-calculators';
import { JsonLd } from '@/components/json-ld';
import {
  calculators,
  categories,
  getCalculator,
  getCategory,
  getCalculatorsByCategory,
  getCategoryById,
} from '@/lib/calculators';
import {
  calculatorMetadata,
  categoryMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  webPageJsonLd,
} from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  const calcSlugs = calculators.map((c) => ({ slug: c.slug }));
  const catSlugs = categories.map((c) => ({ slug: c.slug }));
  return [...calcSlugs, ...catSlugs];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const calc = getCalculator(params.slug);
  if (calc) return calculatorMetadata(calc);

  const category = getCategory(params.slug);
  if (category) return categoryMetadata(category);

  return {};
}

export default function CalculatorOrCategoryPage({ params }: { params: { slug: string } }) {
  const calc = getCalculator(params.slug);
  if (calc) return <CalculatorPage calc={calc} />;

  const category = getCategory(params.slug);
  if (category) return <CategoryPage category={category} />;

  notFound();
}

function CalculatorPage({ calc }: { calc: NonNullable<ReturnType<typeof getCalculator>> }) {
  const category = getCategoryById(calc.category);
  const { content } = calc;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: category?.name ?? '', href: `/calculators/${category?.slug ?? ''}` },
          { name: calc.name },
        ]}
      />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Calculators', url: '/calculators' },
            { name: category?.name ?? '', url: `/calculators/${category?.slug ?? ''}` },
            { name: calc.name, url: `/calculators/${calc.slug}` },
          ]),
          webPageJsonLd(calc.name, calc.shortDescription, `/calculators/${calc.slug}`),
          faqJsonLd(content.faqs),
        ]}
      />

      <div className="mt-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold">{calc.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{content.intro}</p>
      </div>

      <div className="mt-8 rounded-xl border bg-card p-6 md:p-8 shadow-sm">
        <CalculatorWidget slug={calc.slug} />
      </div>

      {(calc.category === 'finance' || calc.category === 'health') && (
        <p className="mt-4 text-sm text-muted-foreground italic">
          Note: This calculator provides estimates for informational purposes only. Please verify important financial or health decisions with a qualified professional or official source.
        </p>
      )}

      <div className="mt-12 max-w-4xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-3">{content.whatIs.heading}</h2>
          <p className="text-muted-foreground leading-relaxed">{content.whatIs.body}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">{content.formula.heading}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{content.formula.body}</p>
          <div className="rounded-lg border bg-muted/50 p-4">
            <pre className="text-sm font-mono whitespace-pre-wrap break-words">{content.formula.expression}</pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">{content.howToCalculate.heading}</h2>
          <ol className="space-y-2">
            {content.howToCalculate.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">{content.example.heading}</h2>
          <p className="text-muted-foreground leading-relaxed">{content.example.body}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">{content.factors.heading}</h2>
          <ul className="space-y-2">
            {content.factors.items.map((item, i) => (
              <li key={i} className="flex gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <FAQSection faqs={content.faqs} />
      </div>

      <div className="mt-12 max-w-4xl">
        <RelatedCalculators related={calc.related} />
      </div>
    </div>
  );
}

function CategoryPage({ category }: { category: NonNullable<ReturnType<typeof getCategory>> }) {
  const categoryCalculators = getCalculatorsByCategory(category.id);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumbs items={[{ name: 'Calculators', href: '/calculators' }, { name: category.name }]} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators' },
          { name: category.name, url: `/calculators/${category.slug}` },
        ])}
      />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">{category.name} Calculators</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">{category.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryCalculators.map((calc) => (
          <CalculatorCard key={calc.slug} calculator={calc} />
        ))}
      </div>

      <div className="mt-12 pt-8 border-t">
        <h2 className="text-xl font-bold mb-4">Other Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.id !== category.id)
            .map((cat) => (
              <a
                key={cat.id}
                href={`/calculators/${cat.slug}`}
                className="inline-flex items-center rounded-full border bg-card px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                {cat.name} ({getCalculatorsByCategory(cat.id).length})
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

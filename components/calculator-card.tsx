import Link from 'next/link';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CalculatorMeta, Category } from '@/lib/calculators';
import { cn } from '@/lib/utils';

const iconMap = Icons as unknown as Record<string, LucideIcon>;

interface CalculatorCardProps {
  calculator: CalculatorMeta;
  className?: string;
}

export function CalculatorCard({ calculator, className }: CalculatorCardProps) {
  const Icon = iconMap[calculator.icon] ?? Icons.Calculator;

  return (
    <Link
      href={`/calculators/${calculator.slug}`}
      className={cn(
        'group flex flex-col rounded-xl border bg-card p-5 hover:shadow-lg hover:border-primary/30 transition-all',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-semibold group-hover:text-primary transition-colors">{calculator.name}</h3>
      </div>
      <p className="text-sm text-muted-foreground flex-1">{calculator.shortDescription}</p>
      <span className="mt-3 text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        Calculate <Icons.ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function CategoryCard({ category, count }: { category: Category; count: number }) {
  const Icon = iconMap[category.icon] ?? Icons.Calculator;

  return (
    <Link
      href={`/calculators/${category.slug}`}
      className="group flex flex-col items-center rounded-xl border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-3">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{category.name}</h3>
      <p className="text-sm text-muted-foreground text-center mt-1 line-clamp-2">{category.description}</p>
      <span className="mt-3 text-xs font-medium text-muted-foreground">{count} calculator{count !== 1 ? 's' : ''}</span>
    </Link>
  );
}

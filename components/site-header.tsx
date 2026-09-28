'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { calculators, categories } from '@/lib/calculators';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<typeof calculators>([]);
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    setSearchResults(
      calculators.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.toLowerCase().includes(q))
      )
    );
  }, [searchQuery]);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="h-5 w-5" />
            </span>
            <span>Calculy</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/calculators"
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent',
                pathname === '/calculators' && 'bg-accent'
              )}
            >
              All Calculators
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/calculators/${cat.slug}`}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent',
                  pathname === `/calculators/${cat.slug}` && 'bg-accent'
                )}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div ref={searchRef} className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search calculators..."
              className="w-56 pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search calculators"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-72 rounded-md border bg-popover shadow-md overflow-hidden z-50">
                {searchResults.slice(0, 6).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/calculators/${c.slug}`}
                    className="block px-4 py-2.5 text-sm hover:bg-accent transition-colors border-b last:border-b-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{c.shortDescription}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <ThemeToggle />
          <Link href="/search" className="sm:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            <Link href="/calculators" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
              All Calculators
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/calculators/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              >
                {cat.name}
              </Link>
            ))}
            <div className="border-t mt-2 pt-2 flex flex-col gap-1">
              <Link href="/about" className="px-3 py-2 text-sm rounded-md hover:bg-accent">About</Link>
              <Link href="/contact" className="px-3 py-2 text-sm rounded-md hover:bg-accent">Contact</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

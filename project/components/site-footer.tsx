import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { categories } from '@/lib/calculators';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calculator className="h-5 w-5" />
              </span>
              <span>Calculy</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free online calculators for Indian users. Accurate, fast, and easy to use.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/calculators/${cat.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name} Calculators
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Popular</h3>
            <ul className="space-y-2">
              <li><Link href="/calculators/emi-calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">EMI Calculator</Link></li>
              <li><Link href="/calculators/sip-calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">SIP Calculator</Link></li>
              <li><Link href="/calculators/gst-calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GST Calculator</Link></li>
              <li><Link href="/calculators/bmi-calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">BMI Calculator</Link></li>
              <li><Link href="/calculators/percentage-calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Percentage Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Search</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {year} Calculy. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">
            Calculators are for informational purposes only. Verify important decisions with qualified professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Terms of Use',
  'Read the terms of use for Calculy. Understand the conditions for using our free online calculators.',
  '/terms'
);

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <Breadcrumbs items={[{ name: 'Terms' }]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-bold">Terms of Use</h1>
      <div className="mt-6 space-y-6 text-muted-foreground leading-relaxed">
        <p>Last updated: September 2026</p>
        <h2 className="text-xl font-bold text-foreground">Acceptance of terms</h2>
        <p>
          By using Calculy, you agree to these terms. If you do not agree, please do not use the site.
        </p>
        <h2 className="text-xl font-bold text-foreground">Use of calculators</h2>
        <p>
          Calculy provides free online calculators for personal, non-commercial use. You may use the results for your own planning and decision-making, but you should not rely solely on them for critical financial, medical, or legal decisions.
        </p>
        <h2 className="text-xl font-bold text-foreground">No warranty</h2>
        <p>
          Calculy and its calculators are provided &quot;as is&quot; without warranties of any kind. While we strive for accuracy, we do not guarantee that results will be error-free or applicable to your specific situation.
        </p>
        <h2 className="text-xl font-bold text-foreground">Limitation of liability</h2>
        <p>
          Calculy is not liable for any decisions made based on calculator results. Always verify important outcomes with a qualified professional or official source.
        </p>
        <h2 className="text-xl font-bold text-foreground">Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.
        </p>
        <h2 className="text-xl font-bold text-foreground">Contact</h2>
        <p>
          Questions about these terms can be sent to contact@calculy.in.
        </p>
      </div>
    </div>
  );
}

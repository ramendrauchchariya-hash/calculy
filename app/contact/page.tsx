import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Contact Calculy',
  'Get in touch with the Calculy team. We welcome feedback, suggestions, and questions about our calculators.',
  '/contact'
);

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <Breadcrumbs items={[{ name: 'Contact' }]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-bold">Contact Us</h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          We&apos;d love to hear from you. Whether you have feedback on a calculator, a suggestion for a new tool, or a question about how something works, feel free to reach out.
        </p>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold text-foreground mb-2">Email</h2>
          <p>contact@calculy.in</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold text-foreground mb-2">Feedback</h2>
          <p>
            Found an issue with a calculation or have an idea for a new calculator? Let us know — we continuously improve Calculy based on user feedback.
          </p>
        </div>
      </div>
    </div>
  );
}

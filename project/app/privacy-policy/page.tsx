import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Privacy Policy',
  'Read the Calculy privacy policy. Learn how we handle data, cookies, and your information when using our calculators.',
  '/privacy-policy'
);

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-bold">Privacy Policy</h1>
      <div className="mt-6 space-y-6 text-muted-foreground leading-relaxed">
        <p>Last updated: September 2026</p>
        <h2 className="text-xl font-bold text-foreground">Overview</h2>
        <p>
          Calculy is a free calculator platform. We respect your privacy and are committed to protecting it. This policy explains what information we collect and how we use it.
        </p>
        <h2 className="text-xl font-bold text-foreground">Data we do not collect</h2>
        <p>
          Our calculators run entirely in your browser. The values you enter into any calculator — such as loan amounts, dates of birth, or weight — are not sent to our servers and are not stored. They exist only in your browser session and are lost when you close or refresh the page.
        </p>
        <h2 className="text-xl font-bold text-foreground">Analytics</h2>
        <p>
          We may use privacy-friendly analytics to understand which calculators are popular and how the site is used. This data is aggregated and does not identify individual users.
        </p>
        <h2 className="text-xl font-bold text-foreground">Cookies</h2>
        <p>
          Calculy may use essential cookies for functionality such as remembering your theme preference (light or dark mode). We do not use advertising or tracking cookies.
        </p>
        <h2 className="text-xl font-bold text-foreground">Third-party services</h2>
        <p>
          If we add third-party services in the future, this policy will be updated to reflect what data they process and how.
        </p>
        <h2 className="text-xl font-bold text-foreground">Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us at contact@calculy.in.
        </p>
      </div>
    </div>
  );
}

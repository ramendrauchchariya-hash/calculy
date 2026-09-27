import type { Metadata } from 'next';
import type { CalculatorMeta, Category } from './calculators';

export const SITE_URL = 'https://calculy.in';
export const SITE_NAME = 'Calculy';
export const SITE_DESCRIPTION = 'Calculy is a free online calculator platform for Indian users. Calculate EMI, SIP, GST, percentages, BMI, and more with accurate, easy-to-use tools.';

export function calculatorMetadata(calc: CalculatorMeta): Metadata {
  const url = `${SITE_URL}/calculators/${calc.slug}`;
  return {
    title: calc.seo.title,
    description: calc.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: calc.seo.ogTitle,
      description: calc.seo.ogDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/${calc.slug}.png`, width: 1200, height: 630, alt: calc.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.seo.ogTitle,
      description: calc.seo.ogDescription,
      images: [`${SITE_URL}/og/${calc.slug}.png`],
    },
    keywords: calc.keywords,
  };
}

export function categoryMetadata(category: Category): Metadata {
  const url = `${SITE_URL}/calculators/${category.slug}`;
  return {
    title: `${category.name} Calculators | ${SITE_NAME}`,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.name} Calculators`,
      description: category.description,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${category.name} Calculators`,
      description: category.description,
    },
  };
}

export function pageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

interface FAQItem { question: string; answer: string }

export function faqJsonLd(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function webPageJsonLd(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

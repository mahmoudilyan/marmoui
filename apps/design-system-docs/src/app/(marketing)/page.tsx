import { LandingPage } from '@/components/marketing/landing-page';
import { faqItems } from '@/components/marketing/faq-data';
import type { Metadata } from 'next';
import siteConfig from '@/../site.config';
import { getTestimonials } from '@/sanity/queries';

export const metadata: Metadata = {
	title: `${siteConfig.title} — Your AI agent, now a designer`,
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	alternates: { canonical: '/' },
};

const faqLd = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: faqItems.map(item => ({
		'@type': 'Question',
		name: item.q,
		acceptedAnswer: { '@type': 'Answer', text: item.a },
	})),
};

export default async function HomePage() {
	const testimonials = await getTestimonials();
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
			/>
			<LandingPage testimonials={testimonials} />
		</>
	);
}

import { LandingPage } from '@/components/marketing/landing-page';
import type { Metadata } from 'next';
import siteConfig from '@/../site.config';
import { getTestimonials } from '@/sanity/queries';

export const metadata: Metadata = {
	title: `${siteConfig.title} — Your AI agent, now a designer`,
	description: siteConfig.description,
	keywords: siteConfig.keywords,
};

export default async function HomePage() {
	const testimonials = await getTestimonials();
	return <LandingPage testimonials={testimonials} />;
}

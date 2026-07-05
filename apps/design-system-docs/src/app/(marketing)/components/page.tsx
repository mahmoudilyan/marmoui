import type { Metadata } from 'next';
import { ComponentsShowcase } from '@/components/marketing/components-showcase';
import siteConfig from '@/../site.config';

export const metadata: Metadata = {
	title: `Components — ${siteConfig.title}`,
	description:
		'Every Marmo UI component, rendered live from @marmoui/ui — buttons, forms, data display, overlays, navigation, and more.',
	keywords: [...siteConfig.keywords, 'component library', 'showcase'],
};

export default function ComponentsPage() {
	return <ComponentsShowcase />;
}

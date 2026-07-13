import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
/* @marmoui/ui's compiled Tailwind sheet must load BEFORE the app's: both
   register the same cascade layers, and the later sheet's utilities win.
   The app sheet is the complete one (it @source-scans ui/src too), so it
   must come last or pairs like `hidden lg:block` break site-wide. */
import '@marmoui/ui/style.css';
import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { SearchWrapper } from '@/components/search/search-wrapper';
import { Toaster } from '@marmoui/ui';
import { Analytics } from '@/components/analytics';
import siteConfig from '@/../site.config';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

const SITE_URL = 'https://www.marmoui.com';

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: siteConfig.title,
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	openGraph: {
		title: siteConfig.title,
		description: siteConfig.description,
		url: SITE_URL,
		siteName: siteConfig.title,
		images: [{ url: '/marmo-icon.svg', width: 512, height: 512, alt: siteConfig.title }],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.title,
		description: siteConfig.description,
		site: '@marmoui',
	},
};

const organizationLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	'@id': `${SITE_URL}/#organization`,
	name: 'Marmo UI',
	alternateName: 'Marmo',
	url: SITE_URL,
	logo: `${SITE_URL}/marmo-icon.svg`,
	description: siteConfig.description,
	sameAs: [siteConfig.githubMainUrl, 'https://x.com/marmoui'],
};

const websiteLd = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': `${SITE_URL}/#website`,
	url: SITE_URL,
	name: 'Marmo UI',
	publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
				/>
				{process.env.NODE_ENV === 'production' && (
					<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
				)}
			</head>
			<body className={inter.className} suppressHydrationWarning>
				<RootProvider
					theme={{
						defaultTheme: 'light',
					}}
				>
					<SearchWrapper>{children}</SearchWrapper>
				</RootProvider>
				<Toaster />
				<Analytics />
			</body>
		</html>
	);
}

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

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	keywords: siteConfig.keywords,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
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

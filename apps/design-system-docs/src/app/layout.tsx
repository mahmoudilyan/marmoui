import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@marmoui/ui/style.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { SearchWrapper } from '@/components/search/search-wrapper';
import { Toaster } from '@marmoui/ui';
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
			</body>
		</html>
	);
}

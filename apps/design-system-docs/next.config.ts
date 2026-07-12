import type { NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';

const nextConfig: NextConfig = {
	output: 'standalone',
	turbopack: {
		root: process.env.NEXT_TURBOPACK_ROOT || undefined,
		rules: {
			'*.svg': {
				loaders: [
					{
						loader: '@svgr/webpack',
						options: {
							icon: true,
						},
					},
				],
				as: '*.js',
			},
		},
	},
	reactStrictMode: true,
	// Performance optimizations
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	experimental: {
		optimizePackageImports: [
			'@marmoui/ui',
			'fumadocs-ui',
			'fumadocs-core',
			'fumadocs-mdx',
			'react-icons',
		],
		optimizeCss: true,
		// Enable faster refresh
		optimisticClientCache: true,
	},
	transpilePackages: ['@marmoui/ui'],
	async redirects() {
		return [
			{
				source: '/docs',
				destination: '/docs/introduction/get-started',
				permanent: true,
			},
			{
				source: '/docs/introduction/install-claude-plugin',
				destination: '/docs/introduction/install-agent',
				permanent: true,
			},
			{
				source: '/docs/introduction/design-system-roadmap',
				destination: '/docs/introduction/roadmap',
				permanent: true,
			},
			{
				source: '/docs/foundation/design-language',
				destination: '/docs/foundation/voice-and-tone',
				permanent: true,
			},
		];
	},
};

const withMDX = createMDX();

export default withMDX(nextConfig);

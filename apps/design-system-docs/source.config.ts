import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
	dir: 'content',
	docs: {
		schema: z.object({
			title: z.string(),
			description: z.string(),
			category: z.string().optional(),
			status: z.enum(['stable', 'beta', 'alpha', 'deprecated']).optional(),
			links: z
				.object({
					storybook: z.string().optional(),
					github: z.string().optional(),
				})
				.optional(),
			keywords: z.array(z.string()).optional(),
			lastUpdated: z.union([z.string(), z.date()]).optional(),
			wideLayout: z.boolean().optional(),
		}),
	},
});

export default defineConfig({
	mdxOptions: {
		rehypeCodeOptions: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
			// Optimize Shiki for dev mode - use lazy theme loading
			langs: [
				'tsx',
				'ts',
				'jsx',
				'js',
				'html',
				'css',
				'json',
				'md',
				'markdown',
				'bash',
				'sh',
				'shell',
			],
		},
	},
});

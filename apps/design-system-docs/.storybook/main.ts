import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';

import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		getAbsolutePath('@chromatic-com/storybook'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-docs'),
	],
	framework: '@storybook/react-vite',
	staticDirs: ['../public'],
	viteFinal: async config => {
		config.define = {
			...config.define,
			'process.env': {},
		};

		const existingAliases = Array.isArray(config.resolve?.alias)
			? config.resolve.alias
			: Object.entries(config.resolve?.alias ?? {}).map(([find, replacement]) => ({
					find,
					replacement,
				}));

		config.resolve = {
			...config.resolve,
			alias: [
				...existingAliases,
				{
					find: '@marmoui/ui/style.css',
					replacement: resolve(__dirname, '../../../packages/ui/dist/style.css'),
				},
				{
					find: '@marmoui/ui/tokens.css',
					replacement: resolve(__dirname, '../../../packages/ui/dist/tokens.css'),
				},
			],
		};

		return config;
	},
};
export default config;

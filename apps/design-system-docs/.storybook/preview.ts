import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { marmoTheme } from './marmo-theme';

// Import styles directly - this ensures styles load before components render
import '@marmoui/ui/style.css';

const preview: Preview = {
	parameters: {
		// Disable actions for better performance
		actions: { disable: true },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
			sort: 'alpha',
		},
		docs: {
			theme: marmoTheme,
			toc: {
				disable: true, // Disable TOC for faster loading
			},
			codePanel: true,
		},
		// Accessibility addon configuration (manual only)
		a11y: {
			element: '#storybook-root',
			manual: true,

			// Disable by default for performance
			disable: true,

			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo',
		},
		// Simplified backgrounds
		backgrounds: {
			options: {
				light: { name: 'light', value: 'var(--color-panel)' },
				dark: { name: 'dark', value: 'var(--color-panel)' },
			},
		},
		// Disable viewport addon for performance
		viewport: { disable: true },
		// Disable outline addon
		outline: { disable: true },
		// Disable measure addon
		measure: { disable: true },
	},

	decorators: [
		(Story, context) => {
			// Apply dark mode class to document root for proper CSS custom property inheritance
			const theme = context.globals.theme || 'light';

			React.useEffect(() => {
				if (typeof document !== 'undefined') {
					document.documentElement.className = theme === 'dark' ? 'dark' : '';
					document.body.className = theme === 'dark' ? 'dark' : '';
				}
			}, [theme]);

			return React.createElement(
				'div',
				{
					className: theme,
					style: {
						//padding: '1rem',
						minHeight: 'auto',
						backgroundColor: 'var(--color-panel)',
						color: 'var(--color-ink)',
						fontFamily: 'var(--font-body)',
					},
				},
				React.createElement(Story)
			);
		},
	],

	globalTypes: {
		theme: {
			description: 'Theme',
			defaultValue: 'light',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: [
					{ value: 'light', title: 'Light' },
					{ value: 'dark', title: 'Dark' },
				],
				dynamicTitle: true,
			},
		},
	},

	initialGlobals: {
		backgrounds: {
			value: 'light',
		},
	},
};

export default preview;

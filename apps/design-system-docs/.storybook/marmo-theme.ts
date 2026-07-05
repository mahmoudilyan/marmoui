import { create } from 'storybook/theming';

export const marmoTheme = create({
	base: 'light',
	brandTitle: 'Marmo UI',
	brandUrl: 'https://marmoui.com',
	brandImage: '/marmo-icon.svg',
	brandTarget: '_self',

	// Typography
	fontBase: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
	fontCode: '"Fira Code", "Monaco", "Consolas", monospace',

	// Colors
	colorPrimary: '#3C44A8',
	colorSecondary: '#4B56D2',

	// UI
	appBg: '#ffffff',
	appContentBg: '#ffffff',
	appBorderColor: '#e5e7eb',
	appBorderRadius: 8,

	// Text colors
	textColor: '#111827',
	textInverseColor: '#ffffff',

	// Toolbar default and active colors
	barTextColor: '#6b7280',
	barSelectedColor: '#3C44A8',
	barBg: '#f9fafb',

	// Form colors
	inputBg: '#ffffff',
	inputBorder: '#d1d5db',
	inputTextColor: '#111827',
	inputBorderRadius: 6,
});

export const marmoDarkTheme = create({
	base: 'dark',
	brandTitle: 'Marmo UI',
	brandUrl: 'https://marmoui.com',
	brandImage: '/marmo-icon.svg',
	brandTarget: '_self',

	// Typography
	fontBase: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
	fontCode: '"Fira Code", "Monaco", "Consolas", monospace',

	// Colors
	colorPrimary: '#3C44A8',
	colorSecondary: '#4B56D2',

	// UI
	appBg: '#0f172a',
	appContentBg: '#1e293b',
	appBorderColor: '#334155',
	appBorderRadius: 8,

	// Text colors
	textColor: '#f1f5f9',
	textInverseColor: '#0f172a',

	// Toolbar default and active colors
	barTextColor: '#94a3b8',
	barSelectedColor: '#3C44A8',
	barBg: '#1e293b',

	// Form colors
	inputBg: '#334155',
	inputBorder: '#475569',
	inputTextColor: '#f1f5f9',
	inputBorderRadius: 6,
});

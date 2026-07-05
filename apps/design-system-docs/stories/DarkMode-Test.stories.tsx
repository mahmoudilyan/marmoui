import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'Testing/Dark Mode Test',
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
# Dark Mode Test

This story tests the dark mode functionality to ensure CSS custom properties are working correctly.

## What to Test

1. **Toggle the theme** using the theme switcher in the Storybook toolbar
2. **Observe color changes** - backgrounds should become dark and text should become light
3. **CSS Custom Properties** - All colors should use the CSS variables defined in globals.css
4. **Border colors** should change appropriately
5. **Semantic colors** should maintain proper contrast

## Expected Behavior

- **Light Mode**: Light backgrounds, dark text
- **Dark Mode**: Dark backgrounds, light text
- **Smooth transitions** between themes
- **Proper contrast** maintained in both modes

If the colors don't change when switching themes, there may be an issue with:
- CSS file loading
- Dark mode class application
- CSS custom property inheritance
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DarkModeTestComponent = () => {
	return (
		<div className="p-8 space-y-6">
			<div className="bg-panel border border-border rounded-lg p-6">
				<h2 className="heading-xl font-bold text-ink-dark mb-4">Dark Mode Test Component</h2>
				<p className="body-md text-ink mb-6">
					This component tests various color tokens in both light and dark modes. Use the theme
					toggle in the Storybook toolbar to switch between themes.
				</p>

				{/* Background Colors Test */}
				<section className="mb-6">
					<h3 className="heading-md font-semibold text-ink-dark mb-3">Background Colors</h3>
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-panel border border-border p-4 rounded">
							<span className="body-sm text-ink-light">Panel Background</span>
							<div className="body-xs text-ink-muted">var(--color-panel)</div>
						</div>
						<div className="bg-secondary border border-border-secondary p-4 rounded">
							<span className="body-sm text-ink">Secondary Background</span>
							<div className="body-xs text-ink-muted">var(--color-secondary)</div>
						</div>
					</div>
				</section>

				{/* Text Colors Test */}
				<section className="mb-6">
					<h3 className="heading-md font-semibold text-ink-dark mb-3">Text Colors</h3>
					<div className="space-y-2">
						<p className="text-ink-dark">Primary text (ink-dark) - var(--color-ink-dark)</p>
						<p className="text-ink">Body text (ink) - var(--color-ink)</p>
						<p className="text-ink-light">Secondary text (ink-light) - var(--color-ink-light)</p>
						<p className="text-ink-muted">Muted text (ink-muted) - var(--color-ink-muted)</p>
					</div>
				</section>

				{/* Semantic Colors Test */}
				<section className="mb-6">
					<h3 className="heading-md font-semibold text-ink-dark mb-3">Semantic Colors</h3>
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-panel border border-border-primary p-4 rounded">
							<span className="text-ink-primary font-medium">Primary Color</span>
							<div className="body-xs text-ink-muted">border-border-primary & text-ink-primary</div>
						</div>
						<div className="bg-panel border border-border-success p-4 rounded">
							<span className="text-ink-success font-medium">Success Color</span>
							<div className="body-xs text-ink-muted">border-border-success & text-ink-success</div>
						</div>
						<div className="bg-panel border border-border-warning p-4 rounded">
							<span className="text-ink-warning font-medium">Warning Color</span>
							<div className="body-xs text-ink-muted">border-border-warning & text-ink-warning</div>
						</div>
						<div className="bg-panel border border-border-destructive p-4 rounded">
							<span className="text-ink-destructive font-medium">Destructive Color</span>
							<div className="body-xs text-ink-muted">
								border-border-destructive & text-ink-destructive
							</div>
						</div>
					</div>
				</section>

				{/* Interactive Elements Test */}
				<section className="mb-6">
					<h3 className="heading-md font-semibold text-ink-dark mb-3">Interactive Elements</h3>
					<div className="flex gap-4">
						<button className="px-4 py-2 bg-primary-solid text-primary-contrast rounded hover:bg-primary-solid-hover transition-colors">
							Primary Button
						</button>
						<button className="px-4 py-2 border border-border bg-panel text-ink rounded hover:border-border-hover transition-colors">
							Secondary Button
						</button>
						<button className="px-4 py-2 bg-destructive-solid text-white rounded hover:bg-destructive-solid-hover transition-colors">
							Destructive Button
						</button>
					</div>
				</section>

				{/* Color Swatches */}
				<section className="mb-6">
					<h3 className="heading-md font-semibold text-ink-dark mb-3">Color Variables Live Test</h3>
					<div className="grid grid-cols-4 gap-2">
						{[
							{ name: 'bg', var: 'var(--color-bg)' },
							{ name: 'panel', var: 'var(--color-panel)' },
							{ name: 'border', var: 'var(--color-border)' },
							{ name: 'primary-solid', var: 'var(--color-primary-solid)' },
							{ name: 'ink', var: 'var(--color-ink)' },
							{ name: 'ink-light', var: 'var(--color-ink-light)' },
							{ name: 'success-solid', var: 'var(--color-success-solid)' },
							{ name: 'destructive-solid', var: 'var(--color-destructive-solid)' },
						].map(color => (
							<div key={color.name} className="text-center">
								<div
									className="w-full h-8 rounded border border-border"
									style={{ backgroundColor: color.var }}
								></div>
								<div className="body-xs text-ink-muted mt-1">{color.name}</div>
							</div>
						))}
					</div>
				</section>

				{/* Theme Detection */}
				<section>
					<h3 className="heading-md font-semibold text-ink-dark mb-3">Theme Detection</h3>
					<div className="bg-muted p-4 rounded border border-border">
						<p className="body-sm text-ink">
							<strong>Current Theme:</strong>{' '}
							<span className="font-mono">
								{typeof document !== 'undefined' &&
								document.documentElement.classList.contains('dark')
									? 'Dark Mode'
									: 'Light Mode'}
							</span>
						</p>
						<p className="body-xs text-ink-muted mt-2">
							Theme is detected by checking if the 'dark' class is applied to the document element.
						</p>
					</div>
				</section>
			</div>
		</div>
	);
};

export const DarkModeTest: Story = {
	render: () => <DarkModeTestComponent />,
};

export const ColorTokensDemo: Story = {
	render: () => (
		<div className="p-8 space-y-4">
			<h2 className="heading-lg font-bold text-ink-dark">CSS Custom Properties Demo</h2>
			<div className="grid grid-cols-6 gap-2">
				{/* Primary colors */}
				{[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
					<div key={`primary-${shade}`} className="text-center">
						<div
							className="w-full h-12 rounded border border-border"
							style={{ backgroundColor: `var(--color-primary-${shade})` }}
						></div>
						<div className="body-xs text-ink-muted mt-1">primary-{shade}</div>
					</div>
				))}
			</div>
			<div className="grid grid-cols-6 gap-2 mt-6">
				{/* Gray colors */}
				{[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
					<div key={`gray-${shade}`} className="text-center">
						<div
							className="w-full h-12 rounded border border-border"
							style={{ backgroundColor: `var(--color-gray-${shade})` }}
						></div>
						<div className="body-xs text-ink-muted mt-1">gray-{shade}</div>
					</div>
				))}
			</div>
		</div>
	),
};

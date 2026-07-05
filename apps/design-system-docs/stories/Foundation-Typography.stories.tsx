import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@marmoui/ui';

const meta = {
	title: 'Foundation/Typography',
	component: Text,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
# Typography

Our typography system provides a consistent and scalable approach to text styling. Built on Inter for headings and body text, with Manrope for display purposes.

## Font Families

- **Heading**: Inter - Clean, readable, professional
- **Body**: Inter - Optimized for reading at all sizes  
- **Display**: Manrope - Geometric sans-serif for impact

## Type Scale

Our type scale follows a systematic approach with consistent line heights and letter spacing for optimal readability.

## Usage

\`\`\`tsx
import { Text } from '@marmoui/ui';

// Headings
<Text variant="heading-2xl" fontWeight="bold">Page Title</Text>
<Text variant="heading-lg" fontWeight="semibold">Section Title</Text>

// Body text
<Text variant="body-md">Default paragraph text</Text>
<Text variant="body-sm" color="text-ink-light">Secondary text</Text>

// Caps (uppercase labels)
<Text variant="caps-sm">Form Label</Text>
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Typography Scale Overview
// ============================================

export const TypographyScale: Story = {
	name: 'Type Scale',
	parameters: {
		docs: {
			description: {
				story: 'Complete typography scale showing all heading, body, and caps variants.',
			},
			source: {
				code: `
// Headings
<Text variant="heading-3xl" fontWeight="bold">Heading 3XL</Text>
<Text variant="heading-2xl" fontWeight="bold">Heading 2XL</Text>
<Text variant="heading-xl" fontWeight="semibold">Heading XL</Text>
<Text variant="heading-lg" fontWeight="semibold">Heading LG</Text>
<Text variant="heading-md" fontWeight="medium">Heading MD</Text>
<Text variant="heading-sm" fontWeight="medium">Heading SM</Text>
<Text variant="heading-xs" fontWeight="medium">Heading XS</Text>

// Body Text
<Text variant="body-lg">Body Large</Text>
<Text variant="body-md">Body Medium (default)</Text>
<Text variant="body-sm">Body Small</Text>
<Text variant="body-xs">Body Extra Small</Text>

// Caps (Uppercase)
<Text variant="caps-lg">CAPS LARGE</Text>
<Text variant="caps-md">CAPS MEDIUM</Text>
<Text variant="caps-sm">CAPS SMALL</Text>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="py-8">
			{/* Heading Scale */}
			<section>
				<Text variant="heading-lg" fontWeight="bold" className="mb-4 pb-2 border-b border-border">
					Heading Scale
				</Text>
				<div className="py-3">
					<div className="flex items-baseline gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								heading-3xl
							</Text>
						</div>
						<Text variant="heading-3xl" fontWeight="bold">
							The quick brown fox
						</Text>
					</div>
					<div className="flex items-baseline gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								heading-2xl
							</Text>
						</div>
						<Text variant="heading-2xl" fontWeight="bold">
							The quick brown fox jumps
						</Text>
					</div>
					<div className="flex items-baseline gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								heading-xl
							</Text>
						</div>
						<Text variant="heading-xl" fontWeight="semibold">
							The quick brown fox jumps over
						</Text>
					</div>
					<div className="flex items-baseline gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								heading-lg
							</Text>
						</div>
						<Text variant="heading-lg" fontWeight="semibold">
							The quick brown fox jumps over the lazy dog
						</Text>
					</div>
					<div className="flex items-baseline gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								heading-md
							</Text>
						</div>
						<Text variant="heading-md" fontWeight="medium">
							The quick brown fox jumps over the lazy dog
						</Text>
					</div>
					<div className="flex items-baseline gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								heading-sm
							</Text>
						</div>
						<Text variant="heading-sm" fontWeight="medium">
							The quick brown fox jumps over the lazy dog
						</Text>
					</div>
					<div className="flex items-baseline gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								heading-xs
							</Text>
						</div>
						<Text variant="heading-xs" fontWeight="medium">
							The quick brown fox jumps over the lazy dog
						</Text>
					</div>
				</div>
			</section>

			{/* Body Scale */}
			<section className="py-3">
				<Text variant="heading-lg" fontWeight="bold" className="mb-4 pb-2 border-b border-border">
					Body Text Scale
				</Text>
				<div className="space-y-3">
					<div className="flex items-start gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								body-lg
							</Text>
						</div>
						<div className="flex-1">
							<Text variant="body-lg">
								Body LG - Used for emphasized paragraph text, introductions, or important content
								that needs to stand out.
							</Text>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								body-md
							</Text>
						</div>
						<div className="flex-1">
							<Text variant="body-md">
								Body MD - The default body text size for most content, articles, and general reading
								material.
							</Text>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								body-sm
							</Text>
						</div>
						<div className="flex-1">
							<Text variant="body-sm">
								Body SM - Used for secondary information, captions, metadata, and supporting
								details.
							</Text>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								body-xs
							</Text>
						</div>
						<div className="flex-1">
							<Text variant="body-xs">
								Body XS - Smallest body text for fine print, legal text, or minimal space
								situations.
							</Text>
						</div>
					</div>
				</div>
			</section>

			{/* Caps Scale */}
			<section className="py-3">
				<Text variant="heading-lg" fontWeight="bold" className="mb-4 pb-2 border-b border-border">
					Caps (Uppercase) Scale
				</Text>
				<div className="space-y-3">
					<div className="flex items-baseline gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								caps-lg
							</Text>
						</div>
						<Text variant="caps-lg">Section Headers</Text>
					</div>
					<div className="flex items-baseline gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								caps-md
							</Text>
						</div>
						<Text variant="caps-md">Form Labels</Text>
					</div>
					<div className="flex items-baseline gap-4">
						<div className="w-32 text-right shrink-0">
							<Text variant="body-xs" color="text-ink">
								caps-sm
							</Text>
						</div>
						<Text variant="caps-sm">Small Metadata</Text>
					</div>
				</div>
			</section>
		</div>
	),
};

// ============================================
// Text Colors
// ============================================

export const TextColors: Story = {
	name: 'Colors',
	parameters: {
		docs: {
			description: {
				story: 'Text color options for different contexts and emphasis levels.',
			},
			source: {
				code: `
// Primary Text Colors (grayscale)
<Text color="text-ink-dark">High emphasis - headings</Text>
<Text color="text-ink">Default - body text</Text>
<Text color="text-ink-light">Low emphasis - secondary</Text>
<Text color="text-ink-muted">Muted - placeholders</Text>

// Semantic Colors
<Text color="text-ink-primary">Primary - brand actions</Text>
<Text color="text-ink-success">Success - confirmations</Text>
<Text color="text-ink-warning">Warning - caution</Text>
<Text color="text-ink-destructive">Destructive - errors</Text>
<Text color="text-ink-info">Info - helpful tips</Text>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="space-y-6">
			{/* Primary Text Colors */}
			<section>
				<Text variant="heading-md" fontWeight="semibold" className="mb-3">
					Primary Text Colors
				</Text>
				<div className="space-y-2 bg-panel border border-border rounded-lg p-4">
					<div className="flex items-center gap-4">
						<div className="w-40">
							<code className="text-xs bg-secondary px-2 py-1 rounded">text-ink-dark</code>
						</div>
						<Text variant="body-md" color="text-ink-dark">
							Ink Dark - Primary headings and high emphasis text
						</Text>
					</div>
					<div className="flex items-center gap-4">
						<div className="w-40">
							<code className="text-xs bg-secondary px-2 py-1 rounded">text-ink</code>
						</div>
						<Text variant="body-md" color="text-ink">
							Ink - Default body text and standard content
						</Text>
					</div>
					<div className="flex items-center gap-4">
						<div className="w-40">
							<code className="text-xs bg-secondary px-2 py-1 rounded">text-ink-light</code>
						</div>
						<Text variant="body-md" color="text-ink-light">
							Ink Light - Secondary text and metadata
						</Text>
					</div>
					<div className="flex items-center gap-4">
						<div className="w-40">
							<code className="text-xs bg-secondary px-2 py-1 rounded">text-ink-muted</code>
						</div>
						<Text variant="body-md" color="text-ink-muted">
							Ink Muted - Subtle text and placeholders
						</Text>
					</div>
				</div>
			</section>

			{/* Semantic Text Colors */}
			<section>
				<Text variant="heading-md" fontWeight="semibold" className="mb-3">
					Semantic Text Colors
				</Text>
				<div className="space-y-2 bg-panel border border-border rounded-lg p-4">
					<div className="flex items-center gap-4">
						<div className="w-40">
							<code className="text-xs bg-secondary px-2 py-1 rounded">text-ink-primary</code>
						</div>
						<Text variant="body-md" color="text-ink-primary">
							Primary - Brand and primary actions
						</Text>
					</div>
					<div className="flex items-center gap-4">
						<div className="w-40">
							<code className="text-xs bg-secondary px-2 py-1 rounded">text-ink-success</code>
						</div>
						<Text variant="body-md" color="text-ink-success">
							Success - Positive feedback and confirmations
						</Text>
					</div>
					<div className="flex items-center gap-4">
						<div className="w-40">
							<code className="text-xs bg-secondary px-2 py-1 rounded">text-ink-warning</code>
						</div>
						<Text variant="body-md" color="text-ink-warning">
							Warning - Caution and attention-grabbing content
						</Text>
					</div>
					<div className="flex items-center gap-4">
						<div className="w-40">
							<code className="text-xs bg-secondary px-2 py-1 rounded">text-ink-destructive</code>
						</div>
						<Text variant="body-md" color="text-ink-destructive">
							Destructive - Errors and critical information
						</Text>
					</div>
					<div className="flex items-center gap-4">
						<div className="w-40">
							<code className="text-xs bg-secondary px-2 py-1 rounded">text-ink-info</code>
						</div>
						<Text variant="body-md" color="text-ink-info">
							Info - Informational content and tips
						</Text>
					</div>
				</div>
			</section>
		</div>
	),
};

// ============================================
// Font Weights
// ============================================

export const FontWeights: Story = {
	name: 'Weights',
	parameters: {
		docs: {
			description: {
				story: 'Available font weights from regular to bold.',
			},
			source: {
				code: `
<Text fontWeight="regular">Regular (400)</Text>
<Text fontWeight="medium">Medium (500)</Text>
<Text fontWeight="semibold">Semibold (600)</Text>
<Text fontWeight="bold">Bold (700)</Text>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="space-y-4">
			<div className="space-y-3 bg-panel border border-border rounded-lg p-6">
				<div className="flex items-center gap-4">
					<div className="w-32">
						<code className="text-xs bg-secondary px-2 py-1 rounded">regular</code>
					</div>
					<Text variant="heading-lg" fontWeight="regular">
						Regular (400) - Standard text weight
					</Text>
				</div>
				<div className="flex items-center gap-4">
					<div className="w-32">
						<code className="text-xs bg-secondary px-2 py-1 rounded">medium</code>
					</div>
					<Text variant="heading-lg" fontWeight="medium">
						Medium (500) - Slight emphasis
					</Text>
				</div>
				<div className="flex items-center gap-4">
					<div className="w-32">
						<code className="text-xs bg-secondary px-2 py-1 rounded">semibold</code>
					</div>
					<Text variant="heading-lg" fontWeight="semibold">
						Semibold (600) - Strong emphasis
					</Text>
				</div>
				<div className="flex items-center gap-4">
					<div className="w-32">
						<code className="text-xs bg-secondary px-2 py-1 rounded">bold</code>
					</div>
					<Text variant="heading-lg" fontWeight="bold">
						Bold (700) - Maximum emphasis
					</Text>
				</div>
			</div>
		</div>
	),
};

// ============================================
// Semantic HTML Elements
// ============================================

export const SemanticElements: Story = {
	name: 'HTML Elements',
	parameters: {
		docs: {
			description: {
				story:
					'The Text component can render as any HTML element using the `as` prop for proper semantic markup.',
			},
			source: {
				code: `
// Render as different HTML elements
<Text as="h1" variant="heading-2xl">Heading 1</Text>
<Text as="h2" variant="heading-xl">Heading 2</Text>
<Text as="h3" variant="heading-lg">Heading 3</Text>
<Text as="p" variant="body-md">Paragraph</Text>
<Text as="span" variant="body-sm">Inline span</Text>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="space-y-4 bg-panel border border-border rounded-lg p-6">
			<div className="flex items-baseline gap-4">
				<div className="w-20">
					<code className="text-xs bg-secondary px-2 py-1 rounded">h1</code>
				</div>
				<Text as="h1" variant="heading-2xl" fontWeight="bold">
					Heading 1 Element
				</Text>
			</div>
			<div className="flex items-baseline gap-4">
				<div className="w-20">
					<code className="text-xs bg-secondary px-2 py-1 rounded">h2</code>
				</div>
				<Text as="h2" variant="heading-xl" fontWeight="semibold">
					Heading 2 Element
				</Text>
			</div>
			<div className="flex items-baseline gap-4">
				<div className="w-20">
					<code className="text-xs bg-secondary px-2 py-1 rounded">h3</code>
				</div>
				<Text as="h3" variant="heading-lg" fontWeight="semibold">
					Heading 3 Element
				</Text>
			</div>
			<div className="flex items-baseline gap-4">
				<div className="w-20">
					<code className="text-xs bg-secondary px-2 py-1 rounded">p</code>
				</div>
				<Text as="p" variant="body-md">
					Paragraph element for body text
				</Text>
			</div>
			<div className="flex items-baseline gap-4">
				<div className="w-20">
					<code className="text-xs bg-secondary px-2 py-1 rounded">span</code>
				</div>
				<Text as="span" variant="body-sm" color="text-ink-light">
					Inline span element
				</Text>
			</div>
		</div>
	),
};

// ============================================
// Typography in Context
// ============================================

export const TypographyInContext: Story = {
	name: 'In Context',
	parameters: {
		docs: {
			description: {
				story:
					'A realistic example showing how typography scales work together in article content.',
			},
			source: {
				code: `
<article>
  <Text as="h1" variant="heading-2xl" fontWeight="bold">
    Getting Started with Design Systems
  </Text>
  <Text variant="body-sm" color="text-ink-light">
    Published on March 15, 2024 • 5 min read
  </Text>

  <Text as="p" variant="body-lg">
    A design system is a collection of reusable components...
  </Text>

  <Text as="h2" variant="heading-lg" fontWeight="semibold">
    Why Use a Design System?
  </Text>

  <Text as="p" variant="body-md">
    Design systems provide numerous benefits...
  </Text>

  <div className="bg-secondary rounded-lg p-4">
    <Text variant="caps-sm" color="text-ink-primary">
      Quick Tip
    </Text>
    <Text variant="body-sm">
      Start small with your most commonly used components...
    </Text>
  </div>
</article>
				`,
				language: 'tsx',
			},
		},
	},
	render: () => (
		<div className="max-w-3xl">
			<article className="bg-panel border border-border rounded-lg p-6 space-y-4">
				<header>
					<Text as="h1" variant="heading-2xl" fontWeight="bold" className="mb-2">
						Getting Started with Design Systems
					</Text>
					<Text variant="body-sm" color="text-ink-light">
						Published on March 15, 2024 • 5 min read
					</Text>
				</header>

				<Text as="p" variant="body-lg">
					A design system is a collection of reusable components, guidelines, and standards that
					help teams build consistent user interfaces across products and platforms.
				</Text>

				<Text as="h2" variant="heading-lg" fontWeight="semibold" className="pt-4">
					Why Use a Design System?
				</Text>

				<Text as="p" variant="body-md">
					Design systems provide numerous benefits for both designers and developers. They ensure
					consistency, improve efficiency, and create a shared language between team members.
				</Text>

				<div className="bg-secondary rounded-lg p-4">
					<Text variant="caps-sm" color="text-ink-primary" className="mb-1">
						Quick Tip
					</Text>
					<Text variant="body-sm">
						Start small with your most commonly used components and gradually expand your design
						system as your team's needs grow.
					</Text>
				</div>

				<Text as="h3" variant="heading-md" fontWeight="medium" className="pt-2">
					Key Components
				</Text>

				<Text as="p" variant="body-md">
					Every design system should include:
				</Text>

				<ul className="space-y-1 ml-4 list-disc list-inside">
					<li>
						<Text as="span" variant="body-sm">
							Design tokens (colors, typography, spacing)
						</Text>
					</li>
					<li>
						<Text as="span" variant="body-sm">
							Component library with clear documentation
						</Text>
					</li>
					<li>
						<Text as="span" variant="body-sm">
							Usage guidelines and best practices
						</Text>
					</li>
					<li>
						<Text as="span" variant="body-sm">
							Accessibility standards and testing
						</Text>
					</li>
				</ul>

				<footer className="pt-4 border-t border-border">
					<Text variant="body-xs" color="text-ink-muted">
						This article demonstrates the typography scale in a realistic content context.
					</Text>
				</footer>
			</article>
		</div>
	),
};

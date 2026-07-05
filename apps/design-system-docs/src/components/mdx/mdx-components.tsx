/**
 * Custom MDX Components - Minimal overrides for Fumadocs
 * Most components are inherited from Fumadocs, we only add custom ones
 */

import type { MDXComponents } from 'mdx/types';
import { PropsTable } from '../props-table';
import { PropsTableEnhanced } from '../props-table-enhanced';
import {
	ComponentPageHeader,
	ComponentSection,
	CodeExample,
	Installation,
	Guideline,
	GuidelinesGrid,
	Callout,
	Card,
	Cards,
	Tab,
	Tabs,
	Accordion,
	Accordions,
	Step,
	Steps,
} from './component-page';
import { ColorPalette } from './color-palette';
import { SpacingTokens } from './spacing-palette';
import { ClientOnlyPreview } from './client-only-preview';
import { InteractiveCodeExample } from './interactive-code-example';
import { TypeInfo } from './type-info';
import * as PageSectionExamples from './page-section-examples';

/**
 * Component Preview - Simple preview wrapper
 */
interface ComponentPreviewProps {
	children: React.ReactNode;
	code?: string;
}

export function ComponentPreview({ children, code }: ComponentPreviewProps) {
	if (!code) {
		return (
			<div className="my-6 rounded-lg border bg-bg p-8 flex items-center justify-center min-h-[200px]">
				{children}
			</div>
		);
	}

	// If code is provided, use Tabs from component-page
	return (
		<Tabs items={['Preview', 'Code']}>
			<Tab value="Preview">
				<div className="p-8 flex items-center justify-center min-h-[200px] bg-fd-secondary/50 rounded-lg">
					{children}
				</div>
			</Tab>
			<Tab value="Code">
				<pre className="overflow-x-auto p-4 bg-gray-950 m-0">
					<code className="text-white font-mono text-sm">{code}</code>
				</pre>
			</Tab>
		</Tabs>
	);
}

/**
 * Export MDX components - Fumadocs handles most HTML elements automatically
 * We only need to export our custom components
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: (props: React.ComponentProps<'h1'>) => (
			<h1
				className="scroll-mt-24 text-4xl font-semibold tracking-tight text-ink mt-0 mb-6"
				{...props}
			/>
		),
		h2: (props: React.ComponentProps<'h2'>) => (
			<h2
				className="group scroll-mt-24 text-2xl font-semibold tracking-tight text-ink mt-14 mb-4 pb-2 border-b border-border first:mt-0"
				{...props}
			/>
		),
		h3: (props: React.ComponentProps<'h3'>) => (
			<h3
				className="scroll-mt-24 text-xl font-semibold tracking-tight text-ink mt-10 mb-3"
				{...props}
			/>
		),
		h4: (props: React.ComponentProps<'h4'>) => (
			<h4
				className="scroll-mt-24 text-lg font-semibold tracking-tight text-ink mt-8 mb-2"
				{...props}
			/>
		),
		p: (props: React.ComponentProps<'p'>) => (
			<p
				className="leading-7 text-ink/85 [&:not(:first-child)]:mt-5"
				{...props}
			/>
		),
		ul: (props: React.ComponentProps<'ul'>) => (
			<ul
				className="my-5 ml-6 list-disc space-y-2 text-ink/85 marker:text-muted-foreground"
				{...props}
			/>
		),
		ol: (props: React.ComponentProps<'ol'>) => (
			<ol
				className="my-5 ml-6 list-decimal space-y-2 text-ink/85 marker:text-muted-foreground marker:font-medium"
				{...props}
			/>
		),
		li: (props: React.ComponentProps<'li'>) => (
			<li className="leading-7 [&>p]:my-0" {...props} />
		),
		blockquote: (props: React.ComponentProps<'blockquote'>) => (
			<blockquote
				className="my-6 flex gap-3 rounded-lg border border-border border-l-4 border-l-sky-500 bg-bg py-3.5 pl-4 pr-5 text-sm leading-6 text-ink/85 shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:border-l-sky-400 [&>p]:my-0 [&>p+p]:mt-2 [&_strong]:text-ink [&_a]:text-sky-700 dark:[&_a]:text-sky-300 [&_a]:decoration-sky-400/50 hover:[&_a]:decoration-sky-500"
				{...props}
			>
				<svg
					aria-hidden
					viewBox="0 0 20 20"
					fill="currentColor"
					className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-500 dark:text-sky-400"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v.5a.75.75 0 001.5 0v-.5zm0 3a.75.75 0 00-1.5 0V14a.75.75 0 001.5 0V9.75z"
					/>
				</svg>
				<div className="min-w-0 flex-1">{props.children}</div>
			</blockquote>
		),
		hr: (props: React.ComponentProps<'hr'>) => (
			<hr className="my-12 border-t border-border" {...props} />
		),
		a: (props: React.ComponentProps<'a'>) => (
			<a
				className="font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
				{...props}
			/>
		),
		code: (props: React.ComponentProps<'code'>) => (
			<code
				className="rounded-md bg-fd-secondary px-1.5 py-0.5 font-mono text-[0.875em] text-ink before:content-none after:content-none [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:rounded-none [pre_&]:text-[1em] [figure_&]:bg-transparent [figure_&]:p-0 [figure_&]:rounded-none [figure_&]:text-[1em]"
				{...props}
			/>
		),
		table: (props: React.ComponentProps<'table'>) => (
			<div className="my-6 overflow-x-auto rounded-lg border border-border">
				<table className="w-full border-collapse text-sm" {...props} />
			</div>
		),
		thead: (props: React.ComponentProps<'thead'>) => (
			<thead className="bg-fd-secondary/60" {...props} />
		),
		tr: (props: React.ComponentProps<'tr'>) => (
			<tr className="border-b border-border last:border-b-0" {...props} />
		),
		th: (props: React.ComponentProps<'th'>) => (
			<th
				className="px-4 py-3 text-left font-semibold text-ink [&[align=center]]:text-center [&[align=right]]:text-right"
				{...props}
			/>
		),
		td: (props: React.ComponentProps<'td'>) => (
			<td
				className="px-4 py-3 text-ink/85 [&[align=center]]:text-center [&[align=right]]:text-right"
				{...props}
			/>
		),
		img: (props: React.ComponentProps<'img'>) => (
			// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
			<img className="my-6 rounded-lg border border-border" {...props} />
		),
		strong: (props: React.ComponentProps<'strong'>) => (
			<strong className="font-semibold text-ink" {...props} />
		),
		kbd: (props: React.ComponentProps<'kbd'>) => (
			<kbd
				className="inline-flex items-center rounded border border-border bg-fd-secondary px-1.5 py-0.5 font-mono text-xs text-ink shadow-sm"
				{...props}
			/>
		),
		ComponentPreview,
		Props: PropsTable,
		PropsEnhanced: PropsTableEnhanced,
		ComponentPageHeader,
		ComponentSection,
		CodeExample,
		Installation,
		Guideline,
		GuidelinesGrid,
		ClientOnlyPreview,
		InteractiveCodeExample,
		...PageSectionExamples,

		// Re-export Fumadocs components for direct use in MDX
		Callout,
		Card,
		Cards,
		Tab,
		Tabs,
		Accordion,
		Accordions,
		Step,
		Steps,

		// Color palette component
		ColorPalette,

		// Spacing palette component
		SpacingTokens,

		// Type info hover card
		TypeInfo,

		// Backward compatibility aliases
		InfoCallout: Callout, // Legacy alias for Callout

		// Allow passed components to override
		...components,
	};
}

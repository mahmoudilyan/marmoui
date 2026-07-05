import type { MDXComponents } from 'mdx/types';
import React from 'react';
import defaultComponents from 'fumadocs-ui/mdx';

import { useMDXComponents as getDocComponents } from '@/components/mdx/mdx-components';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'fumadocs-ui/components/tabs';
import { Banner } from 'fumadocs-ui/components/banner';
import { cn } from '@/lib/utils';
// Import UI components - imports are optimized via optimizePackageImports in next.config
import * as UIComponents from '@/components/mdx/ui-components';
import { getIconForLanguageExtension } from './components/language-icons';
import { CodeBlockTab } from 'fumadocs-ui/components/codeblock';
import { CodeBlock, Pre } from '@/components/codeblock';
import { CopyButton } from './components/copy-button';
import { ComponentsIndex } from '@/components/components-index';

export function useMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		// Start with Fumadocs defaults which handle code blocks properly
		...defaultComponents,
		h1: ({ className, ...props }: React.ComponentProps<'h1'>) => (
			<h1 className={cn('mt-2 scroll-m-20 font-heading text-3xl', className)} {...props} />
		),
		h2: ({ className, children, ...props }: React.ComponentProps<'h2'>) => {
			const id =
				(props as { id?: string }).id ||
				children?.toString().replace(/ /g, '-').replace(/'/g, '').replace(/\?/g, '').toLowerCase();

			return (
				<h2
					{...props}
					id={id}
					className={cn(
						'mt-12 scroll-m-20 font-heading text-ink-dark text-2xl first:mt-0 lg:mt-6 mb-2 [&+p]:!mt-4 *:[code]:text-2xl',
						className
					)}
				>
					{children}
				</h2>
			);
		},
		h3: ({ className, children, ...props }: React.ComponentProps<'h3'>) => {
			const id =
				(props as { id?: string }).id ||
				children?.toString().replace(/ /g, '-').replace(/'/g, '').replace(/\?/g, '').toLowerCase();

			return (
				<h3
					{...props}
					id={id}
					className={cn(
						'mt-8 scroll-m-20 text-lg font-semibold text-ink-dark *:[code]:text-lg',
						className
					)}
				>
					{children}
				</h3>
			);
		},
		h4: ({ className, ...props }: React.ComponentProps<'h4'>) => (
			<h4
				className={cn('mt-8 scroll-m-20 text-ink-dark font-medium tracking-tight', className)}
				{...props}
			/>
		),
		h5: ({ className, ...props }: React.ComponentProps<'h5'>) => (
			<h5
				className={cn('mt-8 scroll-m-20 text-lg font-medium tracking-tight', className)}
				{...props}
			/>
		),
		h6: ({ className, ...props }: React.ComponentProps<'h6'>) => (
			<h6
				className={cn('mt-8 scroll-m-20 text-ink-dark font-medium tracking-tight', className)}
				{...props}
			/>
		),
		a: ({ className, ...props }: React.ComponentProps<'a'>) => (
			<a
				className={cn('font-medium text-ink-primary underline underline-offset-4', className)}
				{...props}
			/>
		),
		p: ({ className, ...props }: React.ComponentProps<'p'>) => (
			<p
				className={cn('leading-relaxed text-ink [&:not(:first-child)]:mt-6', className)}
				{...props}
			/>
		),
		strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
			<strong className={cn('font-medium text-foreground', className)} {...props} />
		),
		ul: ({ className, ...props }: React.ComponentProps<'ul'>) => (
			<ul className={cn('my-6 ms-6 list-disc text-ink', className)} {...props} />
		),
		ol: ({ className, ...props }: React.ComponentProps<'ol'>) => (
			<ol className={cn('my-6 ms-6 list-decimal text-ink', className)} {...props} />
		),
		li: ({ className, ...props }: React.ComponentProps<'li'>) => (
			<li className={cn('mt-2', className)} {...props} />
		),
		blockquote: ({ className, ...props }: React.ComponentProps<'blockquote'>) => (
			<blockquote className={cn('mt-6 border-l-2 ps-6 italic', className)} {...props} />
		),
		img: ({ className, alt, ...props }: React.ComponentProps<'img'>) => (
			// eslint-disable-next-line @next/next/no-img-element
			<img className={cn('rounded-md', className)} alt={alt} {...props} />
		),
		hr: ({ ...props }: React.ComponentProps<'hr'>) => <hr className="my-4 md:my-8" {...props} />,
		table: ({ className, ...props }: React.ComponentProps<'table'>) => (
			<div className="my-6 w-full overflow-y-auto">
				<table
					className={cn('relative w-full overflow-hidden border-none text-sm', className)}
					{...props}
				/>
			</div>
		),
		tr: ({ className, ...props }: React.ComponentProps<'tr'>) => (
			<tr className={cn('last:border-b-none m-0 border-b', className)} {...props} />
		),
		th: ({ className, ...props }: React.ComponentProps<'th'>) => (
			<th
				className={cn(
					'px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
					className
				)}
				{...props}
			/>
		),
		td: ({ className, ...props }: React.ComponentProps<'td'>) => (
			<td
				className={cn(
					'px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
					className
				)}
				{...props}
			/>
		),
		// pre component - wrap ALL pre elements in CodeBlock for consistent Shiki styling
		pre: ({ className, children, ...props }: React.ComponentProps<'pre'>) => {
			// Always wrap in CodeBlock - it will handle detection and styling
			return (
				<CodeBlock {...props} className={className}>
					<Pre>{children}</Pre>
				</CodeBlock>
			);
		},
		// pre and figure are handled by defaultComponents from Fumadocs
		// They properly handle Shiki-generated code blocks
		figcaption: ({ className, children, ...props }: React.ComponentProps<'figcaption'>) => {
			const iconExtension =
				'data-language' in props && typeof props['data-language'] === 'string'
					? getIconForLanguageExtension(props['data-language'])
					: null;

			return (
				<figcaption
					className={cn(
						'flex items-center gap-2 text-code-foreground [&_svg]:size-5 [&_svg]:text-code-foreground [&_svg]:opacity-70 sm:[&_svg]:size-4',
						className
					)}
					{...props}
				>
					{iconExtension}
					{children}
				</figcaption>
			);
		},
		code: ({
			className,
			__raw__,
			__src__,
			__npm__,
			__yarn__,
			__pnpm__,
			__bun__,
			...props
		}: React.ComponentProps<'code'> & {
			__raw__?: string;
			__src__?: string;
			__npm__?: string;
			__yarn__?: string;
			__pnpm__?: string;
			__bun__?: string;
		}) => {
			// Block-level code blocks from Shiki/rehype-code have 'language-' classes
			// These should be handled by <pre> or <figure> components from defaultComponents
			const isBlockCode = className?.includes('language-') || className?.includes('shiki');

			// For block-level code blocks, return as-is - let <pre> or <figure> handle styling
			if (isBlockCode) {
				return <code className={className} {...props} />;
			}

			// npm command.
			const isNpmCommand = __npm__ && __yarn__ && __pnpm__ && __bun__;
			if (isNpmCommand) {
				return <CodeBlockTab value="npm" />;
			}

			// Inline Code - simple string children without language classes
			if (typeof props.children === 'string') {
				return (
					<code
						className={cn(
							'relative rounded-md bg-bg px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] outline-none',
							className
						)}
						{...props}
					/>
				);
			}

			// Default: return code as-is (for block-level, pre/figure will handle styling)
			return (
				<>
					{__raw__ && <CopyButton value={__raw__} src={__src__} />}
					<code className={className} {...props} />
				</>
			);
		},
		Step: ({ className, ...props }: React.ComponentProps<'h3'>) => (
			<h3 className={cn('mt-8 scroll-m-32 font-medium tracking-tight', className)} {...props} />
		),
		Steps: ({ ...props }) => (
			<div className="steps [&>h3]:step mb-12 [counter-reset:step] *:[h3]:first:!mt-0" {...props} />
		),
		Image: ({ src, className, width, height, alt, ...props }: React.ComponentProps<'img'>) => (
			<Image
				className={cn('mt-6 rounded-md border', className)}
				src={typeof src === 'string' ? src : ''}
				width={Number(width)}
				height={Number(height)}
				alt={alt || ''}
				{...props}
			/>
		),
		TabsList: ({ className, ...props }: React.ComponentProps<typeof TabsList>) => (
			<TabsList
				className={cn(
					'bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none',
					className
				)}
				{...props}
			/>
		),
		TabsTrigger: ({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) => (
			<TabsTrigger className={cn('rounded-lg', className)} {...props} />
		),
		TabsContent: ({ className, ...props }: React.ComponentProps<typeof TabsContent>) => (
			<TabsContent
				className={cn(
					'relative [&_h3]:text-base [&_h3]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6',
					className
				)}
				{...props}
			/>
		),
		Tab: ({ className, ...props }: React.ComponentProps<'div'>) => (
			<div className={cn(className)} {...props} />
		),
		Banner: ({ className, ...props }: React.ComponentProps<typeof Banner>) => (
			<Banner className={cn('my-6', className)} {...props} />
		),
		...UIComponents,
		ComponentsIndex,
		// Fumadocs defaults (Callout, Card, etc.)
		// Get all the custom MDX components (ComponentPreview, etc.)
		...getDocComponents(components || {}),
		// Allow passed components to override
		...(components || {}),
	};
}

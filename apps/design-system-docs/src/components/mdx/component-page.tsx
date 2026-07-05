/**
 * Re-export Fumadocs UI components for use in MDX files
 * This file provides a thin wrapper around Fumadocs components
 * to maintain backward compatibility with existing MDX content
 */

import { Callout as FumaCallout } from 'fumadocs-ui/components/callout';
import { Card as FumaCard, Cards as FumaCards } from 'fumadocs-ui/components/card';
import { Tab as FumaTab, Tabs as FumaTabs } from 'fumadocs-ui/components/tabs';
import {
	Accordion as FumaAccordion,
	Accordions as FumaAccordions,
} from 'fumadocs-ui/components/accordion';
import { CodeBlock, Pre } from '@/components/codeblock';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { CopyButton } from '@/components/copy-button';
import { getIconForLanguageExtension } from '@/components/language-icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SiStorybook, SiGithub } from 'react-icons/si';
import siteConfig from 'site.config';
import { type ComponentProps } from 'react';

// Wrapped Fumadocs components with custom classNames

export function Callout({ className, ...props }: ComponentProps<typeof FumaCallout>) {
	return <FumaCallout className={cn('border-secondary shadow-none', className)} {...props} />;
}

export function Card({ className, ...props }: ComponentProps<typeof FumaCard>) {
	return <FumaCard className={cn('', className)} {...props} />;
}

export function Cards({ className, ...props }: ComponentProps<typeof FumaCards>) {
	return <FumaCards className={cn('', className)} {...props} />;
}

export function Tab({ className, ...props }: ComponentProps<typeof FumaTab>) {
	return <FumaTab className={cn('', className)} {...props} />;
}

export function Tabs({ className, ...props }: ComponentProps<typeof FumaTabs>) {
	return <FumaTabs className={cn('', className)} {...props} />;
}

export function Accordion({ className, ...props }: ComponentProps<typeof FumaAccordion>) {
	return <FumaAccordion className={cn('', className)} {...props} />;
}

export function Accordions({ className, ...props }: ComponentProps<typeof FumaAccordions>) {
	return <FumaAccordions className={cn('border-secondary bg-panel', className)} {...props} />;
}

export { CodeBlock, Pre, Step, Steps };

// Legacy aliases for backward compatibility
export { Callout as InfoCallout };

/**
 * Component Page Header - Simple wrapper for consistency
 * Usage in MDX: <ComponentPageHeader title="Button" description="..." />
 */
interface ComponentPageHeaderProps {
	title: string;
	description: string;
	status?: 'stable' | 'beta' | 'alpha' | 'deprecated';
	category?: string;
	githubUrl?: string;
	storybookUrl?: string;
}

export function ComponentPageHeader({
	title,
	description,
	status = 'stable',
	category,
	githubUrl,
	storybookUrl,
}: ComponentPageHeaderProps) {
	const statusTypes = {
		stable: 'info',
		beta: 'info',
		alpha: 'warn',
		deprecated: 'error',
	} as const;
	return (
		<div className="mb-2">
			{category && (
				<p className="text-sm font-medium text-ink-light uppercase tracking-wider mb-2">
					{category}
				</p>
			)}
			<h1 className="text-4xl font-bold mb-4">{title}</h1>
			<p className="text-xl text-ink-light mb-4">{description}</p>
			<div className="flex items-center gap-2">
				{githubUrl && (
					<Link
						href={siteConfig.githubMainUrl + githubUrl}
						className="text-sm text-ink-light mb-4"
						target="_blank"
					>
						<SiGithub />
					</Link>
				)}
				{storybookUrl && (
					<Link
						href={siteConfig.storybookMainUrl + storybookUrl}
						className="text-sm text-ink-light mb-4"
						target="_blank"
					>
						<SiStorybook />
					</Link>
				)}
			</div>

			{status !== 'stable' && (
				<Callout type={statusTypes[status]} title={`Status: ${status}`}>
					This component is currently in {status} status.
				</Callout>
			)}
		</div>
	);
}

/**
 * Component Section - Semantic section wrapper
 * Usage: <ComponentSection title="Usage">...</ComponentSection>
 */
interface ComponentSectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

export function ComponentSection({ title, description, children }: ComponentSectionProps) {
	return (
		<section className="mt-12 scroll-mt-20" id={title.toLowerCase().replace(/\s+/g, '-')}>
			<h2 className="text-2xl font-bold mb-2">{title}</h2>
			{description && <p className="text-ink-light mb-6">{description}</p>}
			{children}
		</section>
	);
}

/**
 * Code Example with Preview - Uses Fumadocs Tabs
 * Usage:
 *   <CodeExample code="..." preview={<Button />} />
 *   <CodeExample src="src/components/previews/sidebar-layout-previews.tsx" componentName="SidebarWizardLayoutPreview" preview={<SidebarWizardLayoutPreview />} />
 */
interface CodeExampleProps {
	title?: string;
	description?: string;
	/** Inline code string. If `src` is provided, this is ignored. */
	code?: string;
	/** Path to a source file (relative to project root). The file contents will be read at build time. */
	src?: string;
	/** If provided with `src`, extracts only the named export function from the file. */
	componentName?: string;
	preview?: React.ReactNode;
	showCode?: boolean;
	language?: string;
	fileName?: string;
}

export async function CodeExample({
	title,
	description,
	code: codeProp,
	src,
	componentName,
	preview,
	showCode = true,
	language = 'tsx',
	fileName,
}: CodeExampleProps) {
	let code = codeProp ?? '';

	if (src) {
		const fs = await import('node:fs/promises');
		const path = await import('node:path');
		try {
			const fileContent = await fs.readFile(path.join(process.cwd(), src), 'utf-8');
			if (componentName) {
				// Extract the return statement JSX from the named function
				const pattern = new RegExp(
					`(?:export\\s+(?:default\\s+)?)?function\\s+${componentName}\\s*\\(`
				);
				const funcMatch = fileContent.search(pattern);
				if (funcMatch !== -1) {
					// Find "return (" within the function
					const returnMatch = fileContent.indexOf('return (', funcMatch);
					if (returnMatch !== -1) {
						// Start after "return ("
						const jsxStart = returnMatch + 'return ('.length;
						// Track parens to find the matching closing ")"
						let parenCount = 1;
						let end = jsxStart;
						for (let i = jsxStart; i < fileContent.length; i++) {
							if (fileContent[i] === '(') parenCount++;
							else if (fileContent[i] === ')') {
								parenCount--;
								if (parenCount === 0) {
									end = i;
									break;
								}
							}
						}
						code = fileContent.slice(jsxStart, end).trim();
					} else {
						code = fileContent;
					}
				} else {
					code = fileContent;
				}
			} else {
				code = fileContent;
			}
		} catch (error) {
			console.error(`Failed to read source file: ${src}`, error);
		}
	}
	const codeBlock = await ComponentCode({ code, language, fileName });

	if (!preview) {
		return (
			<div className="my-6">
				{(title || description) && (
					<div className="mb-3">
						{title && <h3 className="text-base font-semibold mb-1">{title}</h3>}
						{description && <p className="text-sm text-ink-light">{description}</p>}
					</div>
				)}
				{codeBlock}
			</div>
		);
	}

	return (
		<div className="my-6">
			{(title || description) && (
				<div className="mb-3">
					{title && <h3 className="text-base font-semibold mb-1">{title}</h3>}
					{description && <p className="text-sm text-ink-light">{description}</p>}
				</div>
			)}
			<Tabs
				items={['Preview', ...(showCode ? ['Code'] : [])]}
				defaultIndex={0}
				className="my-0 overflow-visible border-secondary bg-bg"
			>
				<Tab value="Preview" className="p-0 m-0 bg-panel rounded-b-xl overflow-visible">
					<div className="p-8 flex items-center justify-center min-h-[200px] bg-panel">
						{preview}
					</div>
				</Tab>
				{showCode && (
					<Tab value="Code" className="p-4 m-0 rounded-b-xl overflow-hidden">
						{codeBlock}
					</Tab>
				)}
			</Tabs>
		</div>
	);
}

/**
 * Component Code Display - Styled code block with copy button
 * Uses Shiki to highlight code strings, styled to match fumadocs CodeBlock
 */
async function ComponentCode({
	code,
	language = 'tsx',
	fileName,
}: {
	code: string;
	language: string;
	fileName?: string;
}) {
	const { codeToHtml } = await import('shiki');

	const html = await codeToHtml(code, {
		lang: language === 'tsx' ? 'tsx' : language === 'ts' ? 'typescript' : language,
		themes: {
			light: 'github-light',
			dark: 'github-dark',
		},
	});

	return (
		<figure className="shiki relative group bg-panel overflow-hidden my-0 not-prose text-sm">
			{fileName && (
				<div className="flex items-center gap-2 border-b border-border-secondary bg-panel px-4 h-9.5 text-ink-light">
					<span className="flex items-center gap-2 text-sm truncate">
						{getIconForLanguageExtension(language)}
						{fileName}
					</span>
				</div>
			)}
			<div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
				<CopyButton value={code} />
			</div>
			<div
				className="relative text-[13px] py-3.5 overflow-auto max-h-[500px] fd-scroll-container [&_pre]:min-w-full [&_pre]:w-max [&_.line]:px-4"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</figure>
	);
}

/**
 * Installation Section - Package manager tabs
 */
interface InstallationProps {
	packages?: string[];
	packageName?: string;
}

export async function Installation({ packages, packageName }: InstallationProps) {
	const pkgName = packageName || '@marmoui/ui';
	const installCommand = packages ? packages.join(' ') : pkgName;

	return (
		<div className="my-8">
			<h2 className="text-2xl font-bold mb-4">Installation</h2>
			<Tabs items={['npm', 'yarn', 'pnpm', 'bun']} defaultIndex={0} className="bg-bg border">
				<Tab value="npm">
					{await ComponentCode({ code: `npm install ${installCommand}`, language: 'bash' })}
				</Tab>
				<Tab value="yarn">
					{await ComponentCode({ code: `yarn add ${installCommand}`, language: 'bash' })}
				</Tab>
				<Tab value="pnpm">
					{await ComponentCode({ code: `pnpm add ${installCommand}`, language: 'bash' })}
				</Tab>
				<Tab value="bun">
					{await ComponentCode({ code: `bun add ${installCommand}`, language: 'bash' })}
				</Tab>
			</Tabs>
		</div>
	);
}

/**
 * Guidelines Grid - For Do's and Don'ts
 */
interface GuidelineProps {
	type: 'do' | 'dont';
	title: string;
	children: React.ReactNode;
	image?: string;
}

export function Guideline({ type, title, children, image }: GuidelineProps) {
	const badgeColor =
		type === 'do'
			? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
			: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
	const borderColor =
		type === 'do'
			? 'border-green-200 dark:border-green-900/50'
			: 'border-red-200 dark:border-red-900/50';

	return (
		<div className="space-y-3">
			<div className={cn('rounded-lg border p-4', borderColor, 'bg-card')}>
				<div className="flex items-start gap-3">
					<div
						className={cn(
							'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold',
							badgeColor
						)}
					>
						{type === 'do' ? '✓' : '✗'}
					</div>
					<div className="flex-1 min-w-0">
						<h4 className="font-semibold text-base mb-2">{title}</h4>
						<div className="text-sm text-muted-foreground">{children}</div>
					</div>
				</div>
			</div>
			{image && (
				<div className="relative overflow-hidden rounded-lg border border-border-secondary bg-muted">
					<img src={image} alt={title} className="w-full h-auto" />
				</div>
			)}
		</div>
	);
}

export function GuidelinesGrid({ children }: { children: React.ReactNode }) {
	return <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">{children}</div>;
}

/**
 * Code Block Tab - Syntax highlighted code block for use in Tabs
 * Usage in MDX:
 * <Tabs items={['TypeScript', 'JavaScript']}>
 *   <Tab value="TypeScript">
 *     <CodeBlockTab code="..." language="tsx" fileName="example.tsx" />
 *   </Tab>
 *   <Tab value="JavaScript">
 *     <CodeBlockTab code="..." language="jsx" fileName="example.jsx" />
 *   </Tab>
 * </Tabs>
 */
interface CodeBlockTabProps {
	code: string;
	language?: string;
	fileName?: string;
	className?: string;
}

export function CodeBlockTab({ code, language = 'tsx', fileName, className }: CodeBlockTabProps) {
	return (
		<figure className={cn('shiki relative group bg-panel overflow-hidden my-0', className)}>
			{fileName && (
				<figcaption
					data-language={language}
					className="flex items-center gap-2 border-b border-border-secondary bg-panel px-4 py-3 text-sm font-medium text-foreground"
				>
					<span className="flex items-center gap-2">
						{getIconForLanguageExtension(language)}
						{fileName}
					</span>
				</figcaption>
			)}
			<div className="absolute top-3 right-3 z-10">
				<CopyButton value={code} />
			</div>
			<div
				className="relative py-3.5 px-4 max-h-[450px] overflow-auto"
				dangerouslySetInnerHTML={{ __html: code }}
			/>
		</figure>
	);
}

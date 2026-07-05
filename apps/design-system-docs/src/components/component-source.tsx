import fs from 'node:fs/promises';
import path from 'node:path';
import * as React from 'react';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/copy-button';
import { getIconForLanguageExtension } from '@/components/language-icons';

interface ComponentSourceProps extends React.ComponentProps<'div'> {
	name?: string;
	src?: string;
	title?: string;
	language?: string;
	collapsible?: boolean;
}

export async function ComponentSource({
	name,
	src,
	title,
	language,
	collapsible = true,
	className,
}: ComponentSourceProps) {
	if (!name && !src) {
		return null;
	}

	let code: string | undefined;

	// If src is provided, read the file
	if (src) {
		try {
			const file = await fs.readFile(path.join(process.cwd(), src), 'utf-8');
			code = file;
		} catch (error) {
			console.error(`Failed to read file: ${src}`, error);
			return null;
		}
	}

	if (!code) {
		return null;
	}

	const lang = language ?? title?.split('.').pop() ?? 'tsx';

	return (
		<div className={cn('relative', className)}>
			{await ComponentCode({ code, language: lang, title })}
		</div>
	);
}

async function ComponentCode({
	code,
	language,
	title,
}: {
	code: string;
	language: string;
	title?: string;
}) {
	// Use Shiki to highlight code
	const { codeToHtml } = await import('shiki');

	const html = await codeToHtml(code, {
		lang: language === 'tsx' ? 'tsx' : language === 'ts' ? 'typescript' : language,
		themes: {
			light: 'light',
			dark: 'dark',
		},
	});

	return (
		<figure className="shiki relative group bg-panel overflow-hidden my-0">
			{title && (
				<figcaption
					data-language={language}
					className="flex items-center gap-2 border-b border-border bg-panel px-4 py-3 text-sm font-medium text-ink"
				>
					<span className="flex items-center gap-2">
						{getIconForLanguageExtension(language)}
						{title}
					</span>
				</figcaption>
			)}
			<div className="absolute top-2 right-2 z-10">
				<CopyButton value={code} />
			</div>
			<div
				className="relative p-6 max-h-[450px] overflow-auto"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</figure>
	);
}

'use client';

import * as React from 'react';
import { ReactNode, useState } from 'react';
import { codeToHtml } from 'shiki';
import { CopyButton } from '@/components/copy-button';
import { getIconForLanguageExtension } from '@/components/language-icons';
import { cn } from '@marmoui/ui';

/**
 * Client Component version of CodeExample for interactive previews with onClick handlers
 * This ensures the entire component tree is client-side, avoiding serialization issues
 */
interface InteractiveCodeExampleProps {
	title?: string;
	description?: string;
	code: string;
	children: ReactNode;
	showCode?: boolean;
	language?: string;
	fileName?: string;
}

export function InteractiveCodeExample({
	title,
	description,
	code,
	children,
	showCode = true,
	language = 'tsx',
	fileName,
}: InteractiveCodeExampleProps) {
	const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
	const [highlightedCode, setHighlightedCode] = useState<string>('');

	React.useEffect(() => {
		async function highlight() {
			const html = await codeToHtml(code, {
				lang: language === 'tsx' ? 'tsx' : language === 'ts' ? 'typescript' : language,
				themes: {
					light: 'github-light',
					dark: 'github-dark',
				},
			});
			setHighlightedCode(html);
		}
		highlight();
	}, [code, language]);

	return (
		<div className="my-6">
			{(title || description) && (
				<div className="mb-3">
					{title && <h3 className="text-base font-semibold mb-1">{title}</h3>}
					{description && <p className="text-sm text-ink-light">{description}</p>}
				</div>
			)}
			<div className="flex flex-col rounded-xl border border-secondary bg-panel">
				{/* Tab bar — matches fumadocs TabsList style */}
				<div className="flex gap-3.5 overflow-x-auto px-4 not-prose bg-bg rounded-t-xl">
					<button
						onClick={() => setActiveTab('preview')}
						className={cn(
							'inline-flex items-center whitespace-nowrap border-b py-2 text-sm font-medium transition-colors',
							activeTab === 'preview'
								? 'border-fd-primary text-fd-primary'
								: 'border-transparent text-ink-light hover:text-ink'
						)}
					>
						Preview
					</button>
					{showCode && (
						<button
							onClick={() => setActiveTab('code')}
							className={cn(
								'inline-flex items-center whitespace-nowrap border-b py-2 text-sm font-medium transition-colors',
								activeTab === 'code'
									? 'border-fd-primary text-fd-primary'
									: 'border-transparent text-ink-light hover:text-ink'
							)}
						>
							Code
						</button>
					)}
				</div>

				{/* Content */}
				{activeTab === 'preview' && (
					<div className="bg-panel">
						<div className="p-8 flex items-center justify-center min-h-[200px]">{children}</div>
					</div>
				)}
				{showCode && activeTab === 'code' && (
					<figure className="shiki relative group bg-panel overflow-hidden my-0 not-prose text-sm rounded-b-xl">
						{fileName && (
							<div className="flex items-center gap-2 border-b border-border bg-panel px-4 h-9.5 text-ink-light">
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
							dangerouslySetInnerHTML={{ __html: highlightedCode }}
						/>
					</figure>
				)}
			</div>
		</div>
	);
}

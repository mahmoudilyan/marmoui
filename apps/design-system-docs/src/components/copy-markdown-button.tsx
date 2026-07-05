'use client';

import * as React from 'react';
import { MdContentCopy, MdExpandMore } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { ButtonGroup, IconButton, Button } from '@marmoui/ui';

interface CopyMarkdownButtonProps {
	slug?: string[];
	title: string;
	description?: string;
}

export function CopyMarkdownButton({ slug, title, description }: CopyMarkdownButtonProps) {
	const [hasCopied, setHasCopied] = React.useState(false);
	const [copyType, setCopyType] = React.useState<'markdown' | 'claude' | 'openai' | null>(null);
	const [isOpen, setIsOpen] = React.useState(false);
	const [content, setContent] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const dropdownRef = React.useRef<HTMLDivElement>(null);

	// Fetch markdown content on demand
	const fetchContent = React.useCallback(async (): Promise<string> => {
		if (!slug) return '';
		if (content !== null) return content; // Already loaded

		setIsLoading(true);
		try {
			const slugPath = slug.join('/');
			const response = await fetch(`/api/markdown/${slugPath}`);
			if (response.ok) {
				const text = await response.text();
				setContent(text);
				return text;
			}
		} catch (error) {
			console.error('Failed to load markdown:', error);
		} finally {
			setIsLoading(false);
		}
		return '';
	}, [slug, content]);

	React.useEffect(() => {
		if (hasCopied) {
			const timeout = setTimeout(() => {
				setHasCopied(false);
				setCopyType(null);
			}, 2000);
			return () => clearTimeout(timeout);
		}
	}, [hasCopied]);

	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleCopy = async (type: 'markdown') => {
		// Fetch content on demand
		const finalContent = await fetchContent();

		// Copy markdown to clipboard
		try {
			await navigator.clipboard.writeText(finalContent);
			setHasCopied(true);
			setCopyType(type);
			setIsOpen(false);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	const handleAIOpen = async (type: 'claude' | 'openai') => {
		setIsOpen(false);

		// Fetch content first
		const finalContent = await fetchContent();

		// Build the prompt based on type
		let prompt = '';
		if (type === 'claude') {
			prompt = `Here is documentation for the ${title} component from the Marmo UI:

${description ? `Description: ${description}\n\n` : ''}${finalContent}

Please help me understand and implement this component following the guidelines and examples provided.`;
		} else {
			prompt = `# ${title} Component Documentation

${description ? `## Description\n${description}\n\n` : ''}## Full Documentation

${finalContent}

---
Please analyze this component documentation and help me implement it correctly.`;
		}

		// Copy to clipboard
		try {
			await navigator.clipboard.writeText(prompt);
			setHasCopied(true);
			setCopyType(type);

			// Open window after copying (content is in clipboard)
			const url = type === 'claude' ? 'https://claude.ai/new' : 'https://chat.openai.com/';
			window.open(url, '_blank');
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<ButtonGroup>
				<Button
					variant="secondary"
					size="sm"
					onClick={() => handleCopy('markdown')}
					disabled={isLoading}
					loading={isLoading}
					loadingText="Copying..."
				>
					<MdContentCopy className="h-4 w-4" />
					<span className="text-sm">Copy Markdown</span>
				</Button>
				<IconButton
					variant="secondary"
					size="sm"
					onClick={() => setIsOpen(!isOpen)}
					icon={<MdExpandMore className="h-4 w-4" />}
				/>
			</ButtonGroup>

			{isOpen && (
				<div
					className={cn(
						'absolute right-0 top-[30px] mt-1 z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md',
						'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2'
					)}
				>
					<button
						onClick={() => handleCopy('markdown')}
						className={cn(
							'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
							'hover:bg-bg hover:text-ink-dark',
							'focus:bg-bg focus:text-ink-dark'
						)}
					>
						<MdContentCopy className="mr-2 h-4 w-4" />
						Copy Markdown
					</button>

					<button
						onClick={() => handleAIOpen('claude')}
						className={cn(
							'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
							'hover:bg-bg hover:text-ink-dark',
							'focus:bg-bg focus:text-ink-dark'
						)}
					>
						<svg
							className="mr-2 h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M18 8L16 6L8 14L10 16L18 8Z" fill="currentColor" opacity="0.7" />
							<path d="M14 4L6 12L8 14L16 6L14 4Z" fill="currentColor" />
							<path d="M10 20L18 12L16 10L8 18L10 20Z" fill="currentColor" opacity="0.7" />
						</svg>
						Open in Claude
					</button>

					<button
						onClick={() => handleAIOpen('openai')}
						className={cn(
							'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
							'hover:bg-bg hover:text-ink-dark',
							'focus:bg-bg focus:text-ink-dark'
						)}
					>
						<svg
							className="mr-2 h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
								fill="currentColor"
							/>
						</svg>
						Open in ChatGPT
					</button>
				</div>
			)}
		</div>
	);
}

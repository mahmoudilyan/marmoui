'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
	title?: React.ReactNode;
	url: string;
	depth: number;
}

interface DocsTableOfContentsProps {
	toc: TocItem[];
	className?: string;
}

function useActiveItem(itemIds: string[]) {
	const [activeId, setActiveId] = React.useState<string | null>(null);

	React.useEffect(() => {
		// Default to first item on mount if nothing is active yet
		if (!activeId && itemIds?.length) {
			setActiveId(itemIds[0] ?? null);
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: '0% 0% -80% 0%' }
		);

		for (const id of itemIds ?? []) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			for (const id of itemIds ?? []) {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			}
		};
	}, [itemIds, activeId]);

	return activeId;
}

/**
 * Notion-style table of contents: a slim rail of bars (one per heading,
 * indented by depth) that expands into a popover with the full list on
 * hover or keyboard focus. Keeps the docs column narrow so component
 * previews get the width instead.
 */
export function DocsTableOfContents({ toc, className }: DocsTableOfContentsProps) {
	const itemIds = React.useMemo(() => toc.map((item) => item.url.replace('#', '')), [toc]);
	const activeHeading = useActiveItem(itemIds);
	const [open, setOpen] = React.useState(false);

	if (!toc?.length) {
		return null;
	}

	return (
		<div
			className={cn('relative', className)}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
			onFocus={() => setOpen(true)}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
			}}
		>
			{/* Rail — one bar per heading */}
			<button
				type="button"
				aria-label="Table of contents"
				aria-expanded={open}
				className="flex w-8 flex-col items-end gap-[7px] px-2 py-2"
			>
				{toc.map((item) => (
					<span
						key={item.url}
						aria-hidden
						className={cn(
							'h-0.5 rounded-full transition-colors duration-200',
							item.depth <= 2 ? 'w-4' : item.depth === 3 ? 'w-3' : 'w-2',
							item.url === `#${activeHeading}`
								? 'bg-[var(--color-ink-dark)]'
								: 'bg-[var(--color-ink-muted)]'
						)}
					/>
				))}
			</button>

			{/* Popover with the full list */}
			<div
				className={cn(
					'absolute right-full top-0 z-50 mr-1 w-64 origin-top-right rounded-xl border border-border bg-panel py-2 shadow-[0_12px_32px_rgba(15,23,42,0.12)] transition-all duration-150 ease-out',
					open
						? 'pointer-events-auto translate-x-0 scale-100 opacity-100'
						: 'pointer-events-none translate-x-1 scale-[0.98] opacity-0'
				)}
				role="navigation"
				aria-label="On this page"
			>
				<p className="px-4 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-light">
					On this page
				</p>
				<div className="max-h-[min(70vh,540px)] overflow-y-auto px-2">
					{toc.map((item) => (
						<a
							key={item.url}
							href={item.url}
							tabIndex={open ? 0 : -1}
							className="block rounded-md px-2 py-1.5 text-[13px] leading-snug text-ink-light no-underline transition-colors hover:bg-secondary hover:text-ink data-[active=true]:font-medium data-[active=true]:text-ink data-[depth=3]:ps-5 data-[depth=4]:ps-8"
							data-active={item.url === `#${activeHeading}`}
							data-depth={item.depth}
						>
							{item.title}
						</a>
					))}
				</div>
				<button
					type="button"
					tabIndex={open ? 0 : -1}
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className="mt-1.5 inline-flex items-center px-4 text-[11px] font-medium text-ink-light transition-colors hover:text-ink"
				>
					↑ Back to top
				</button>
			</div>
		</div>
	);
}

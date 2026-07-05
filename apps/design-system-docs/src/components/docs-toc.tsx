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

export function DocsTableOfContents({ toc, className }: DocsTableOfContentsProps) {
	const itemIds = React.useMemo(() => toc.map((item) => item.url.replace('#', '')), [toc]);
	const activeHeading = useActiveItem(itemIds);

	if (!toc?.length) {
		return null;
	}

	return (
		<div className={cn('z-10 flex flex-col gap-2 py-2 ps-6 pe-4 text-sm', className)}>
			<p className="flex h-7 items-center text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-light">
				On this page
			</p>
			<div className="relative ms-3.5 flex flex-col gap-0.5 before:absolute before:inset-y-0 before:-left-3.25 before:w-px before:bg-border">
				{toc.map((item) => (
					<a
						key={item.url}
						href={item.url}
						className="relative py-1.5 text-[0.8rem] leading-snug text-muted-foreground no-underline transition-colors before:absolute before:inset-y-1 before:-left-3.25 before:w-px before:rounded-full hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground data-[active=true]:before:w-0.5 data-[active=true]:before:bg-primary data-[depth=3]:ps-3.5 data-[depth=4]:ps-5.5"
						data-active={item.url === `#${activeHeading}`}
						data-depth={item.depth}
					>
						{item.title}
					</a>
				))}
			</div>
			<button
				type="button"
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				className="mt-3 inline-flex items-center text-[11px] font-medium text-ink-light hover:text-ink transition-colors"
			>
				↑ Back to top
			</button>
		</div>
	);
}


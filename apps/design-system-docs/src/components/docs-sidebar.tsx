'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { source } from '@/lib/source';

interface DocsSidebarProps {
	tree: typeof source.pageTree;
}

function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			className={cn('shrink-0 transition-transform duration-200', open && 'rotate-90', className)}
		>
			<path
				d="M6 4l4 4-4 4"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function hasActiveChild(item: any, pathname: string): boolean {
	if (item.type === 'page' && item.url === pathname) return true;
	if (item.children) {
		return item.children.some((child: any) => hasActiveChild(child, pathname));
	}
	return false;
}

function getFirstPageUrl(item: any): string | null {
	if (item.type === 'page' && item.url) return item.url;
	if (item.children) {
		for (const child of item.children) {
			const url = getFirstPageUrl(child);
			if (url) return url;
		}
	}
	return null;
}

function SidebarLink({ item, pathname }: { item: any; pathname: string }) {
	const isActive = pathname === item.url;
	return (
		<li>
			<Link
				href={item.url}
				className={cn(
					'flex items-center rounded-md px-3 py-1.5 text-[13px] transition-colors',
					'text-ink hover:bg-accent hover:text-ink-dark',
					isActive &&
						'bg-primary-muted text-ink-primary font-medium hover:bg-primary-muted hover:text-ink-primary'
				)}
			>
				<span>{item.name}</span>
			</Link>
		</li>
	);
}

function SidebarFolder({ item, pathname }: { item: any; pathname: string }) {
	const router = useRouter();
	const isChildActive = hasActiveChild(item, pathname);
	const [open, setOpen] = useState(false);

	// Auto-expand when a child is active (e.g. direct URL navigation)
	useEffect(() => {
		if (isChildActive) setOpen(true);
	}, [isChildActive]);

	function handleClick() {
		if (open) {
			setOpen(false);
		} else {
			setOpen(true);
			// Navigate to the first page in this folder
			if (!isChildActive) {
				const firstUrl = getFirstPageUrl(item);
				if (firstUrl) router.push(firstUrl);
			}
		}
	}

	return (
		<li>
			<button
				onClick={handleClick}
				className={cn(
					'flex w-full items-center justify-between rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors',
					'text-ink-light hover:bg-accent caps-md',
					isChildActive &&
						'bg-primary-muted text-ink-primary hover:bg-primary-muted hover:text-ink-primary'
				)}
			>
				<span>{item.name}</span>
				<ChevronIcon
					open={open}
					className={cn(isChildActive ? 'text-ink-primary' : 'text-muted-foreground/50')}
				/>
			</button>

			<div
				className={cn(
					'grid transition-[grid-template-rows] duration-200 ease-in-out',
					open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
				)}
			>
				<div className="overflow-hidden">
					{item.children && item.children.length > 0 && (
						<ul className="space-y-0.5 pt-1 pl-3">
							{item.children.map((child: any) => (
								<SidebarItem
									key={child.$id || child.url || Math.random()}
									item={child}
									pathname={pathname}
								/>
							))}
						</ul>
					)}
				</div>
			</div>
		</li>
	);
}

function SidebarItem({ item, pathname }: { item: any; pathname: string }) {
	if (item.type === 'separator') {
		return <li className="h-px w-full bg-border my-2" />;
	}

	if (item.type === 'page') {
		return <SidebarLink item={item} pathname={pathname} />;
	}

	if (item.type === 'folder') {
		return <SidebarFolder item={item} pathname={pathname} />;
	}

	return null;
}

export function DocsSidebar({ tree }: DocsSidebarProps) {
	const pathname = usePathname();

	return (
		<aside className="sticky top-[var(--header-height,64px)] hidden h-[calc(100vh-var(--header-height,64px))] w-64 shrink-0 md:block border-r border-border">
			<div className="no-scrollbar h-full overflow-auto py-6 px-4 lg:py-8 custom-scrollbar">
				<nav>
					<ul className="space-y-1">
						{tree.children.map((item: any) => (
							<SidebarItem
								key={item.$id || item.url || Math.random()}
								item={item}
								pathname={pathname}
							/>
						))}
					</ul>
				</nav>
			</div>
		</aside>
	);
}

'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Box } from '../box';
import { Sheet, SheetContent } from '../sheet';
import Panel from './panel';
import PageSection, { type PageSectionProps } from './page-section';
import { SideNavigation, SidebarProvider, useSidebar } from '../sidebar';
import type { NavigationItem } from '../sidebar/types';
import { MarmoIcon } from '../icons';

/**
 * Semantic app layout identifiers exposed to MCP / plugin layout selection.
 *
 * Ask the user which layout they need before generating a full page shell.
 */
export type AppLayoutId =
	| 'sidebar-collapsible'
	| 'sidebar-hidden'
	| 'top-nav'
	| 'dual-sidebar';

export interface AppLayoutPageSectionProps extends Omit<PageSectionProps, 'variant'> {}

export interface AppLayoutProps {
	/** Which application shell to render. */
	layout: AppLayoutId;
	children: React.ReactNode;
	className?: string;

	/** Navigation items for `dual-sidebar` (`SideNavigation`). */
	mainNavItems?: NavigationItem[];

	/** Left navigation panel — required for `sidebar-collapsible`. */
	sidebar?: React.ReactNode;

	/** Props forwarded to `PageSection`. Variant is set automatically from `layout`. */
	pageSection?: AppLayoutPageSectionProps;

	/** SidebarProvider config (dual-sidebar + sidebar-collapsible/hidden when wrapped). */
	sidebarConfig?: React.ComponentProps<typeof SidebarProvider>['config'];
}

const PAGE_SECTION_VARIANT: Record<AppLayoutId, PageSectionProps['variant']> = {
	'sidebar-collapsible': 'default',
	'sidebar-hidden': 'workspace',
	'top-nav': 'global',
	'dual-sidebar': 'compact',
};

/** Human-readable labels for MCP / UI layout pickers. */
export const APP_LAYOUT_OPTIONS: {
	id: AppLayoutId;
	title: string;
	description: string;
}[] = [
	{
		id: 'sidebar-collapsible',
		title: 'Collapsible sidebar',
		description:
			'Left navigation panel that minimizes to an icon rail. Page header with brand, search, and utilities (Figma Page Section — Default).',
	},
	{
		id: 'sidebar-hidden',
		title: 'Hidden sidebar',
		description:
			'Full-width header on top with the logo inside the hamburger toggle; primary nav sits UNDER the header as a horizontal row (Figma Page Section — Layout 2).',
	},
	{
		id: 'top-nav',
		title: 'Top navigation',
		description:
			'No left sidebar — global horizontal nav in the header (Figma Page Section — Layout 3).',
	},
	{
		id: 'dual-sidebar',
		title: 'Dual sidebar',
		description:
			'Icon rail + secondary navigation panel. Compact page title header (Figma Page Section — Layout 4).',
	},
];

export function appLayoutPageSectionVariant(layout: AppLayoutId): PageSectionProps['variant'] {
	return PAGE_SECTION_VARIANT[layout];
}

export function AppLayout({
	layout,
	children,
	className,
	mainNavItems = [],
	sidebar,
	pageSection,
	sidebarConfig,
}: AppLayoutProps) {
	const pageSectionVariant = PAGE_SECTION_VARIANT[layout];

	if (layout === 'top-nav') {
		const header = pageSection ? (
			<PageSection variant={pageSectionVariant} {...pageSection} />
		) : null;
		return (
			<Box className={cn('flex h-full min-h-0 flex-col overflow-hidden bg-bg', className)}>
				{header}
				<Panel className="flex flex-1 flex-col overflow-hidden">{children}</Panel>
			</Box>
		);
	}

	if (layout === 'dual-sidebar') {
		const header = pageSection ? (
			<PageSection variant={pageSectionVariant} {...pageSection} />
		) : null;
		return (
			<SidebarProvider mainNavItems={mainNavItems} config={sidebarConfig}>
				<Box className={cn('flex h-full min-h-0 overflow-hidden bg-bg', className)}>
					<SideNavigation />
					<Panel className="flex flex-1 flex-col overflow-hidden">
						{header}
						{children}
					</Panel>
				</Box>
			</SidebarProvider>
		);
	}

	if (layout === 'sidebar-hidden') {
		// Layout 2 — header spans full width on top; nav sits UNDER the header
		// as a horizontal row (not a left column). The brand logo lives inside
		// the hamburger toggle button.
		return (
			<SidebarProvider
				mainNavItems={mainNavItems}
				config={{
					defaultSecondaryOpen: true,
					...sidebarConfig,
				}}
			>
				<Box className={cn('flex h-full min-h-0 flex-col overflow-hidden bg-bg', className)}>
					{pageSection ? (
						<PageSection variant={pageSectionVariant} logoInToggle {...pageSection} />
					) : null}
					<HorizontalNavRow items={mainNavItems} />
					<Panel className="flex flex-1 flex-col overflow-hidden">{children}</Panel>
				</Box>
			</SidebarProvider>
		);
	}

	// sidebar-collapsible — left SidebarPanel that minimizes to an icon rail
	const railLogo = <MarmoIcon className="size-8" />;
	const sidebarWithRail =
		React.isValidElement(sidebar) &&
		typeof (sidebar.props as { collapseMode?: unknown }).collapseMode === 'undefined'
			? React.cloneElement(sidebar as React.ReactElement<Record<string, unknown>>, {
					collapseMode: 'rail',
					logo: railLogo,
				})
			: sidebar;

	const header = pageSection ? (
		<PageSection variant={pageSectionVariant} {...pageSection} />
	) : null;

	return (
		<SidebarProvider
			mainNavItems={mainNavItems}
			config={{
				defaultSecondaryOpen: true,
				...sidebarConfig,
			}}
		>
			<Box className={cn('flex h-full min-h-0 overflow-hidden bg-bg', className)}>
				{sidebarWithRail}
				<Panel className="flex flex-1 flex-col overflow-hidden">
					{header}
					{children}
				</Panel>
			</Box>
		</SidebarProvider>
	);
}

/**
 * Horizontal nav row rendered UNDER the header for `sidebar-hidden` (Layout 2).
 * Collapsible via the `SidebarProvider` secondary state.
 */
function HorizontalNavRow({ items }: { items: NavigationItem[] }) {
	const { secondaryIsOpen, activeMainItem, setActiveMainItem, mobileNavOpen, setMobileNavOpen } =
		useSidebar();
	const [activeId, setActiveId] = React.useState<string | null>(
		items[0]?.id ?? activeMainItem ?? null
	);

	if (items.length === 0) return null;

	return (
		<>
			{/* Desktop horizontal row — hidden when secondary is collapsed */}
			<div
				className={cn(
					'hidden md:flex h-12 shrink-0 items-center gap-space-xs border-b border-border-secondary bg-panel px-space-lg overflow-hidden transition-all',
					secondaryIsOpen ? 'opacity-100' : 'h-0 opacity-0 border-b-0'
				)}
			>
				<nav aria-label="Primary" className="flex items-center gap-space-xs">
					{items.map(item => {
						const isActive = activeId === item.id;
						return (
							<button
								key={item.id}
								type="button"
								onClick={() => {
									setActiveId(item.id);
									setActiveMainItem(item.id);
									item.onClick();
								}}
								className={cn(
									'inline-flex items-center gap-space-3xs rounded-radius-sm px-space-sm py-space-xs text-body-sm font-medium transition-colors cursor-pointer',
									isActive
										? 'bg-primary-muted text-ink-primary'
										: 'text-ink hover:bg-secondary hover:text-ink-dark'
								)}
							>
								{item.label}
							</button>
						);
					})}
				</nav>
			</div>

			{/* Mobile overlay nav (no side column on mobile) */}
			<MobileNavOverlay
				items={items}
				open={mobileNavOpen}
				onClose={() => setMobileNavOpen(false)}
			/>
		</>
	);
}

function MobileNavOverlay({
	items,
	open,
	onClose,
}: {
	items: NavigationItem[];
	open: boolean;
	onClose: () => void;
}) {
	const { setActiveMainItem } = useSidebar();
	return (
		<Sheet open={open} onOpenChange={next => (next ? null : onClose())}>
			<SheetContent side="left" className="w-64 p-space-md" showCloseButton>
				<nav aria-label="Primary" className="mt-space-md flex flex-col gap-space-3xs">
					{items.map(item => (
						<button
							key={item.id}
							type="button"
							onClick={() => {
								setActiveMainItem(item.id);
								item.onClick();
								onClose();
							}}
							className="block w-full rounded-radius-md px-space-sm py-space-xs text-left text-body-sm font-medium text-ink hover:bg-secondary"
						>
							{item.label}
						</button>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}

export default AppLayout;

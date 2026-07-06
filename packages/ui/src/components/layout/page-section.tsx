'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { DotsThree, List, BookOpen } from '@phosphor-icons/react';

import { Button } from '../button';
import { IconButton } from '../icon-button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../dropdown-menu';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../breadcrumbs';
import { Tooltip } from '../tooltip';
import { useSidebar } from '../sidebar/sidebar-provider';
import { useIsMobile } from '../../hooks/use-mobile';
import { MarmoIcon } from '../icons';
import {
	PageSectionHeaderBrand,
	PageSectionHeaderGlobalNav,
	PageSectionHeaderSearch,
	PageSectionHeaderUtilities,
	type PageSectionGlobalNavItem,
	type PageSectionProfile,
} from './page-section-header-parts';

interface BreadcrumbActionItem {
	label: string;
	onClick?: () => void;
	isDelete?: boolean;
	icon?: React.ReactElement;
}

export interface PageSectionBreadcrumbItem {
	label: string;
	href?: string;
	preserveQuery?: boolean;
	onClick?: () => void;
	actions?: BreadcrumbActionItem[];
}

export interface PageSectionActionItem {
	label: string;
	href?: string;
	onClick?: () => void;
	icon?: React.ReactElement;
	isDelete?: boolean;
}

export interface PageSectionSecondaryActionItem {
	label: string;
	href?: string;
	onClick?: () => void;
	icon?: React.ReactNode;
}

/**
 * PageSection visual variants — map to Figma "Page Section" component properties.
 *
 * | Variant     | Figma name   | Use with layout        |
 * |-------------|--------------|------------------------|
 * | `default`   | Default      | `sidebar-collapsible`  |
 * | `workspace` | Layout 2     | `sidebar-hidden`       |
 * | `global`    | Layout 3     | `top-nav`              |
 * | `compact`   | Layout 4     | `dual-sidebar`         |
 * | `profile`   | Profile Header | profile / settings pages |
 */
export type PageSectionVariant = 'default' | 'workspace' | 'global' | 'compact' | 'profile';

export interface PageSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: PageSectionVariant;

	// Breadcrumbs or a single page title
	breadcrumbs?: PageSectionBreadcrumbItem[];
	pageTitle?: string;

	// Primary CTA on the right
	primaryAction?: PageSectionActionItem;

	// Visible secondary buttons on the right (left of primary)
	secondaryActions?: PageSectionSecondaryActionItem[];

	// Overflow actions in a menu button
	otherActions?: PageSectionActionItem[];

	// Whether to show the secondary sidebar toggle button
	showSidebarToggle?: boolean;

	// default / workspace chrome
	showBrand?: boolean;
	brandLabel?: string;
	/**
	 * Render the brand logo inside the sidebar toggle button (Layout 2).
	 * Hides the standalone brand and shows logo + hamburger in the toggle.
	 */
	logoInToggle?: boolean;
	searchPlaceholder?: string;
	searchValue?: string;
	onSearchChange?: (value: string) => void;
	showHistory?: boolean;
	showNotifications?: boolean;
	showApps?: boolean;
	showHelp?: boolean;
	onHistoryClick?: () => void;
	onNotificationsClick?: () => void;
	onAppsClick?: () => void;
	onHelpClick?: () => void;
	profile?: PageSectionProfile;
	profileMenu?: React.ReactNode;

	// global variant
	globalNavItems?: PageSectionGlobalNavItem[];
}

function useSidebarToggle() {
	try {
		const sidebar = useSidebar();
		const isMobile = useIsMobile();
		return {
			secondaryIsOpen: sidebar.secondaryIsOpen,
			toggleSecondary: sidebar.toggleSecondary,
			mobileNavOpen: sidebar.mobileNavOpen,
			toggleMobileNav: sidebar.toggleMobileNav,
			isMobile,
		};
	} catch {
		return {
			secondaryIsOpen: false,
			toggleSecondary: () => {},
			mobileNavOpen: false,
			toggleMobileNav: () => {},
			isMobile: false,
		};
	}
}

function PageSectionActions({
	primaryAction,
	secondaryActions,
	otherActions,
}: Pick<PageSectionProps, 'primaryAction' | 'secondaryActions' | 'otherActions'>) {
	return (
		<div className="flex items-center gap-space-xs min-h-9">
			{secondaryActions?.map(action =>
				action.href ? (
					<Button key={action.label} variant="secondary" onClick={action.onClick} asChild>
						<a href={action.href}>{action.label}</a>
					</Button>
				) : (
					<Button key={action.label} variant="secondary" onClick={action.onClick}>
						{action.label}
					</Button>
				)
			)}

			{primaryAction ? (
				primaryAction.href ? (
					<Button
						variant="primary"
						onClick={primaryAction.onClick}
						leftIcon={primaryAction.icon || undefined}
						asChild
					>
						<a href={primaryAction.href}>{primaryAction.label}</a>
					</Button>
				) : (
					<Button
						variant="primary"
						onClick={primaryAction.onClick}
						leftIcon={primaryAction.icon || undefined}
					>
						{primaryAction.label}
					</Button>
				)
			) : null}

			{otherActions && otherActions.length > 0 ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<IconButton
							aria-label="More options"
						variant="secondary"
						icon={<DotsThree className="size-4" />}
					/>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="min-w-48">
						{otherActions.map(action => (
							<DropdownMenuItem
								key={action.label}
								onClick={action.onClick}
								variant={action.isDelete ? 'destructive' : undefined}
							>
								{action.icon}
								{action.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			) : null}
		</div>
	);
}

function PageSectionTitleBlock({
	breadcrumbs,
	pageTitle,
	handleBreadcrumbClick,
	showSidebarToggle,
	secondaryIsOpen,
	toggleSecondary,
	isMobile,
}: {
	breadcrumbs?: PageSectionBreadcrumbItem[];
	pageTitle?: string;
	handleBreadcrumbClick: (item: PageSectionBreadcrumbItem, e: React.MouseEvent) => void;
	showSidebarToggle: boolean;
	secondaryIsOpen: boolean;
	toggleSecondary: () => void;
	isMobile?: boolean;
}) {
	return (
		<div className="flex min-w-0 items-center gap-space-sm">
			{showSidebarToggle && !secondaryIsOpen ? (
				<div className="-mx-1.5">
					<Tooltip content="Open sidebar" side="bottom">
						<IconButton
							variant="ghost"
							size="sm"
							aria-label="Open sidebar"
					icon={isMobile ? <List /> : <BookOpen />}
					onClick={toggleSecondary}
				/>
			</Tooltip>
		</div>
	) : null}
	<div className="flex min-w-0 items-center gap-space-xs">
			{breadcrumbs && breadcrumbs.length > 0 ? (
					<Breadcrumb>
						<BreadcrumbList className="flex-nowrap">
							{breadcrumbs.map((item, index) => {
								const isLast = index === breadcrumbs.length - 1;
								return (
									<React.Fragment key={item.label}>
										<BreadcrumbItem className="min-w-0">
											{isLast ? (
												<div className="flex min-w-0 items-center gap-space-xs">
													<BreadcrumbPage className="truncate text-base font-medium text-foreground">
														{item.label}
													</BreadcrumbPage>
													{breadcrumbs.length > 1 &&
													item.actions &&
													item.actions.length > 0 ? (
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<IconButton
																	aria-label="More options"
																	variant="ghost"
																	size="xs"
																icon={<DotsThree className="size-4" />}
															/>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="start" className="min-w-48">
																{item.actions.map((action, actionIndex) => (
																	<DropdownMenuItem
																		key={action.label || actionIndex}
																		variant={action.isDelete ? 'destructive' : undefined}
																		onClick={action.onClick}
																	>
																		{action.icon}
																		{action.label}
																	</DropdownMenuItem>
																))}
															</DropdownMenuContent>
														</DropdownMenu>
													) : null}
												</div>
											) : (
												<BreadcrumbLink
													onClick={e => handleBreadcrumbClick(item, e)}
													href={item.href || '#'}
													className="truncate text-base"
												>
													{item.label}
												</BreadcrumbLink>
											)}
										</BreadcrumbItem>
										{!isLast ? <BreadcrumbSeparator /> : null}
									</React.Fragment>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				) : (
					<h2 className="truncate text-xl font-medium text-ink-dark">{pageTitle}</h2>
				)}
			</div>
		</div>
	);
}

function PageSectionSidebarToggle({
	show,
	secondaryIsOpen,
	toggleSecondary,
	isMobile,
	logoInToggle,
}: {
	show: boolean;
	secondaryIsOpen: boolean;
	toggleSecondary: () => void;
	isMobile?: boolean;
	logoInToggle?: boolean;
}) {
	if (!show) return null;

	const label = secondaryIsOpen ? 'Hide sidebar' : 'Open sidebar';

	if (logoInToggle) {
		return (
			<Tooltip content={label} side="bottom">
				<button
					type="button"
					onClick={toggleSecondary}
					aria-label={label}
					className="flex items-center gap-space-xs rounded-radius-md px-space-xs py-space-xs text-ink-dark hover:bg-secondary transition-colors cursor-pointer"
				>
			<MarmoIcon className="size-7" />
			<List className="size-5" />
				</button>
			</Tooltip>
		);
	}

	return (
		<Tooltip content={label} side="bottom">
			<IconButton
				variant="ghost"
				size="sm"
				aria-label={label}
		icon={isMobile ? <List /> : <BookOpen />}
		onClick={toggleSecondary}
	/>
</Tooltip>
);
}

export default function PageSection({
	variant = 'compact',
	breadcrumbs,
	pageTitle,
	primaryAction,
	secondaryActions,
	otherActions,
	showSidebarToggle = true,
	showBrand = true,
	brandLabel = 'Marmo',
	logoInToggle = false,
	searchPlaceholder,
	searchValue,
	onSearchChange,
	showHistory,
	showNotifications,
	showApps,
	showHelp,
	onHistoryClick,
	onNotificationsClick,
	onAppsClick,
	onHelpClick,
	profile,
	profileMenu,
	globalNavItems,
	className,
	...props
}: PageSectionProps) {
	const handleBreadcrumbClick = (item: PageSectionBreadcrumbItem, e: React.MouseEvent) => {
		if (item.onClick) {
			e.preventDefault();
			item.onClick();
		}
	};

	const { secondaryIsOpen, toggleSecondary, mobileNavOpen, toggleMobileNav, isMobile } =
		useSidebarToggle();

	// On mobile there is no side nav column — the toggle opens the nav as an
	// overlay (Sheet). On desktop it collapses/expands the side panel.
	const handleToggleSidebar = isMobile ? toggleMobileNav : toggleSecondary;
	const sidebarEffectivelyOpen = isMobile ? mobileNavOpen : secondaryIsOpen;

	const shellClass = cn(
		'sticky top-0 z-10 bg-panel border-b border-border-muted',
		variant === 'compact' || variant === 'profile'
			? 'px-space-2xl py-space-xl'
			: 'px-space-lg py-space-md',
		className
	);

	if (variant === 'global') {
		return (
			<div className={cn(shellClass, 'flex items-center gap-space-lg')} {...props}>
				<PageSectionHeaderBrand showBrand={showBrand} brandLabel={brandLabel} />
				{globalNavItems && globalNavItems.length > 0 ? (
					<PageSectionHeaderGlobalNav items={globalNavItems} />
				) : null}
				<div className="ml-auto">
					<PageSectionHeaderUtilities
						showHistory={showHistory}
						showNotifications={showNotifications}
						showApps={showApps}
						showHelp={showHelp ?? true}
						onHistoryClick={onHistoryClick}
						onNotificationsClick={onNotificationsClick}
						onAppsClick={onAppsClick}
						onHelpClick={onHelpClick}
						profile={profile}
						profileMenu={profileMenu}
					/>
				</div>
			</div>
		);
	}

	if (variant === 'default' || variant === 'workspace') {
		return (
			<div className={shellClass} {...props}>
				<div className="flex items-center gap-space-md">
					<PageSectionSidebarToggle
						show={showSidebarToggle}
						secondaryIsOpen={sidebarEffectivelyOpen}
						toggleSecondary={handleToggleSidebar}
						isMobile={isMobile}
						logoInToggle={logoInToggle}
					/>
					{logoInToggle ? null : (
						<PageSectionHeaderBrand showBrand={showBrand} brandLabel={brandLabel} />
					)}
					<PageSectionHeaderSearch
						searchPlaceholder={searchPlaceholder}
						searchValue={searchValue}
						onSearchChange={onSearchChange}
						className={variant === 'workspace' ? 'max-w-2xl' : undefined}
					/>
					<PageSectionHeaderUtilities
						showHistory={showHistory}
						showNotifications={showNotifications}
						showApps={showApps}
						showHelp={showHelp}
						onHistoryClick={onHistoryClick}
						onNotificationsClick={onNotificationsClick}
						onAppsClick={onAppsClick}
						onHelpClick={onHelpClick}
						profile={profile}
						profileMenu={profileMenu}
					/>
				</div>
				{(breadcrumbs?.length || pageTitle || primaryAction || secondaryActions?.length) && (
					<div className="mt-space-md flex items-center justify-between gap-space-md border-t border-border-secondary pt-space-md">
						<PageSectionTitleBlock
							breadcrumbs={breadcrumbs}
							pageTitle={pageTitle}
							handleBreadcrumbClick={handleBreadcrumbClick}
							showSidebarToggle={false}
							secondaryIsOpen={sidebarEffectivelyOpen}
							toggleSecondary={handleToggleSidebar}
							isMobile={isMobile}
						/>
						<PageSectionActions
							primaryAction={primaryAction}
							secondaryActions={secondaryActions}
							otherActions={otherActions}
						/>
					</div>
				)}
			</div>
		);
	}

	if (variant === 'profile') {
		return (
			<div className={cn(shellClass, 'flex items-center justify-between gap-space-md')} {...props}>
				<div className="flex min-w-0 items-center gap-space-md">
					{profile ? (
						<>
							<PageSectionHeaderBrand showBrand={false} />
							<div className="flex min-w-0 items-center gap-space-sm">
								{profile.avatarSrc ? (
									<img
										src={profile.avatarSrc}
										alt={profile.name}
										className="size-12 rounded-full object-cover"
									/>
								) : null}
								<div className="min-w-0">
									<h1 className="truncate text-heading-md font-semibold text-ink-dark">{profile.name}</h1>
									{profile.subtitle ? (
										<p className="truncate text-body-sm text-ink-muted">{profile.subtitle}</p>
									) : null}
								</div>
							</div>
						</>
					) : (
						<PageSectionTitleBlock
							breadcrumbs={breadcrumbs}
							pageTitle={pageTitle}
							handleBreadcrumbClick={handleBreadcrumbClick}
							showSidebarToggle={showSidebarToggle && !sidebarEffectivelyOpen}
							secondaryIsOpen={sidebarEffectivelyOpen}
							toggleSecondary={handleToggleSidebar}
							isMobile={isMobile}
						/>
					)}
				</div>
				<PageSectionActions
					primaryAction={primaryAction}
					secondaryActions={secondaryActions}
					otherActions={otherActions}
				/>
			</div>
		);
	}

	// compact — Figma Layout 4 (dual-sidebar pages)
	return (
		<div className={cn(shellClass, 'flex items-center justify-between')} {...props}>
			<PageSectionTitleBlock
				breadcrumbs={breadcrumbs}
				pageTitle={pageTitle}
				handleBreadcrumbClick={handleBreadcrumbClick}
				showSidebarToggle={showSidebarToggle && !sidebarEffectivelyOpen}
				secondaryIsOpen={sidebarEffectivelyOpen}
				toggleSecondary={handleToggleSidebar}
				isMobile={isMobile}
			/>
			<PageSectionActions
				primaryAction={primaryAction}
				secondaryActions={secondaryActions}
				otherActions={otherActions}
			/>
		</div>
	);
}

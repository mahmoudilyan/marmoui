'use client';
import React, { useState, useEffect, useRef } from 'react';
import type { ElementType } from 'react';
import { useSidebar } from './sidebar-provider';
import type { NavigationItem, SecondaryNavigationItem, SubNavigationItem } from './types';
import { Bell, GearSix, Question, List, SidebarSimple } from '@phosphor-icons/react';

import { SidebarAppearanceProvider, useSidebarAppearance } from './sidebar-appearance';
import { SidebarBrand } from './sidebar-brand';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Tooltip } from '../tooltip';
import { IconButton } from '../icon-button';
import { Button } from '../button';
import { Sheet, SheetContent } from '../sheet';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '../../lib/utils';

interface MainNavigationButtonProps {
	item: NavigationItem;
	isActive: boolean;
	icon: string | ElementType;
	onClick: () => void;
}

function MainNavigationButton({ item, isActive, onClick }: MainNavigationButtonProps) {
	const appearance = useSidebarAppearance();
	const isDark = appearance === 'dark';
	// Normalize icon types for JSX usage
	const IconFilled = typeof item.icon === 'string' ? null : (item.icon as ElementType);
	const IconOutlined =
		typeof item.iconOutlined === 'string' ? null : (item.iconOutlined as ElementType);
	const IconDuotone =
		typeof item.iconDuotone === 'string' ? null : (item.iconDuotone as ElementType);

	// Active icon: use duotone if available, otherwise filled
	const ActiveIcon = IconDuotone || IconFilled;

	return (
		<Tooltip content={item.label} side="right" delayDuration={200}>
			<button
				className={cn(
					'group relative flex items-center justify-center flex-shrink-0',
					'w-10 h-10 rounded-radius-md transition-all duration-200 cursor-pointer',
					isDark
						? isActive
							? 'bg-primary-600/30 shadow-sm'
							: 'hover:bg-white/5'
						: isActive
							? 'bg-panel shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
							: 'hover:bg-panel/50'
				)}
				onClick={onClick}
				data-name={`main-navigation-${item.id}`}
				aria-label={`Navigate to ${item.label}`}
			>
				<div className="relative w-6 h-6 flex items-center justify-center">
					{typeof item.icon === 'string' ? (
						<img alt={item.label} className="w-6 h-6 object-contain" src={item.icon} />
					) : (
						<>
							{/* Active State Icon (Duotone or Filled) */}
							{ActiveIcon && (
								<ActiveIcon
									className={cn(
										'w-6 h-6 transition-opacity duration-150 absolute',
										isActive
											? isDark
												? 'opacity-100 text-primary-300'
												: 'opacity-100 text-ink-primary'
											: 'opacity-0'
									)}
								/>
							)}
							{/* Inactive State Icon (Outlined, Dark Gray) */}
							{(IconOutlined || IconFilled) && (
								<>
									{IconOutlined ? (
										<IconOutlined
											className={cn(
												'w-6 h-6 transition-opacity duration-150',
												isActive
													? 'opacity-0'
													: isDark
														? 'opacity-100 text-gray-400 group-hover:text-white'
														: 'opacity-100 text-ink-dark group-hover:text-ink-primary'
											)}
										/>
									) : IconFilled ? (
										<IconFilled
											className={`
												w-6 h-6 transition-opacity duration-150
												${isActive ? 'opacity-0' : 'opacity-100 text-ink-dark group-hover:text-ink-primary'}
											`}
										/>
									) : null}
								</>
							)}
						</>
					)}
				</div>
			</button>
		</Tooltip>
	);
}

export interface SidebarSubItemProps {
	label: string;
	isActive?: boolean;
	onClick?: () => void;
	className?: string;
	showTopLine?: boolean; // First child connector
	showArrow?: boolean; // Active item connector
	showVerticalLine?: boolean; // Items before active
}

// Connector SVG Components
const TopLineConnector = () => (
	<svg
		width="2"
		height="4"
		viewBox="0 0 2 4"
		fill="none"
		className="absolute left-4 -top-1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M0 0H1.5V4H0V0Z" fill="var(--color-border)" />
	</svg>
);

const ArrowConnector = () => (
	<svg
		width="12"
		height="19"
		viewBox="0 0 12 19"
		fill="none"
		className="absolute left-4 -top-[1px]"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M2.01353e-07 0H1.5V9.95C1.5 10.8025 1.50058 11.3967 1.53838 11.8593C1.57547 12.3132 1.6446 12.574 1.74524 12.7715C1.96095 13.1948 2.30516 13.539 2.72852 13.7548C2.92604 13.8554 3.18681 13.9245 3.64068 13.9616C4.10331 13.9994 4.69755 14 5.55 14H8.93934L7.21967 12.2803C6.92678 11.9874 6.92678 11.5126 7.21967 11.2197C7.51256 10.9268 7.98744 10.9268 8.28033 11.2197L11.2803 14.2197C11.5732 14.5126 11.5732 14.9874 11.2803 15.2803L8.28033 18.2803C7.98744 18.5732 7.51256 18.5732 7.21967 18.2803C6.92678 17.9874 6.92678 17.5126 7.21967 17.2197L8.93934 15.5H5.51788C4.70505 15.5 4.04944 15.5 3.51853 15.4566C2.9719 15.412 2.49175 15.3176 2.04754 15.0913C1.34193 14.7317 0.768252 14.1581 0.408726 13.4525C0.182386 13.0082 0.0880253 12.5281 0.0433638 11.9815C-1.31503e-05 11.4506 -7.42804e-06 10.795 2.01353e-07 9.98212V0Z"
			fill="var(--color-border)"
		/>
	</svg>
);

const VerticalLineConnector = () => (
	<svg
		width="2"
		height="100%"
		viewBox="0 0 2 33"
		preserveAspectRatio="none"
		fill="none"
		className="absolute left-4 top-0 h-full"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M0 0H1.5V33H0V0Z" fill="var(--color-border)" />
	</svg>
);

export function SidebarSubItem({
	label,
	isActive,
	onClick,
	className = '',
	showTopLine,
	showArrow,
	showVerticalLine,
}: SidebarSubItemProps) {
	const appearance = useSidebarAppearance();
	const isDark = appearance === 'dark';

	return (
		<button
			className={cn(
				'group flex items-center w-full text-left py-2 pl-8 pr-2 relative h-8',
				'text-sm leading-5 rounded-md transition-all duration-150 cursor-pointer',
				isDark
					? isActive
						? 'text-white font-medium'
						: 'text-gray-400 font-normal hover:text-gray-200'
					: isActive
						? 'text-ink-dark font-medium'
						: 'text-ink-light font-normal hover:text-ink-dark',
				className
			)}
			onClick={onClick}
			aria-label={`Navigate to ${label}`}
		>
			{/* Connectors */}
			{showTopLine && <TopLineConnector />}
			{showArrow && <ArrowConnector />}
			{showVerticalLine && <VerticalLineConnector />}

			<span className="h-4 flex items-center">{label}</span>
		</button>
	);
}

export interface SidebarItemProps {
	label: string;
	/** Outlined icon - shown by default */
	iconOutlined?: React.ElementType | string;
	/** Filled icon - shown on hover and active state. If not provided, iconOutlined stays visible */
	iconFilled?: React.ElementType | string;
	isActive?: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
}

export function SidebarItem({
	label,
	iconOutlined,
	iconFilled,
	isActive,
	onClick,
	children,
	className = '',
}: SidebarItemProps) {
	const [isHovered, setIsHovered] = React.useState(false);
	const appearance = useSidebarAppearance();
	const isDark = appearance === 'dark';
	const hasChildren = React.Children.count(children) > 0;

	// Determine which icon to show
	const showFilledIcon = (isActive || isHovered) && iconFilled;

	// Check if icons are image URLs or components
	const isOutlinedImageUrl = typeof iconOutlined === 'string';
	const isFilledImageUrl = typeof iconFilled === 'string';

	// Get the current icon to display
	const currentIcon = showFilledIcon ? iconFilled : iconOutlined;
	const isImageUrl = showFilledIcon ? isFilledImageUrl : isOutlinedImageUrl;
	const IconComponent = !isImageUrl ? (currentIcon as ElementType | undefined) : null;

	return (
		<div className={`w-full ${className}`}>
			<button
				className={cn(
					'w-full flex items-center p-2 rounded-md transition-all duration-150 cursor-pointer',
					isDark
						? isActive
							? 'bg-primary-600/20 text-primary-200'
							: 'bg-transparent text-gray-300 hover:bg-white/5 hover:text-white'
						: isActive
							? 'bg-primary-muted'
							: 'bg-transparent hover:bg-panel'
				)}
				onClick={onClick}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				aria-label={label}
			>
				<div className="flex items-center gap-1.5 min-w-0">
					{/* Icon - only render if icon is provided */}
					{currentIcon && (
						<div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
							{isImageUrl ? (
								<img alt={label} className="w-5 h-5 object-contain" src={currentIcon as string} />
							) : (
								IconComponent && (
									<IconComponent
										className={cn(
											'w-4 h-4',
											isDark
												? isActive
													? 'text-primary-300'
													: 'text-gray-400 group-hover:text-gray-200'
												: cn(
														'text-icon',
														isActive && 'text-primary-solid hover:text-primary-solid-hover'
													)
										)}
									/>
								)
							)}
						</div>
					)}

					{/* Label */}
					<span
						className={cn(
							'text-sm leading-4 truncate transition-colors duration-150',
							isDark
								? isActive
									? 'font-medium text-white'
									: 'font-normal text-gray-300'
								: isActive
									? 'text-primary-solid font-medium'
									: isHovered
										? 'text-ink-dark font-normal'
										: 'text-ink font-normal'
						)}
					>
						{label}
					</span>
				</div>
			</button>

			{/* Sub-Items - visible when parent is active */}
			{hasChildren && isActive && (
				<div className="flex flex-col mt-1">
					{React.Children.map(children, (child, index) => {
						if (!React.isValidElement<SidebarSubItemProps>(child)) return child;

						const childrenArray = React.Children.toArray(children);
						const isFirst = index === 0;

						// Find the first active child index
						let activeIndex = -1;
						childrenArray.forEach((c, i) => {
							if (React.isValidElement<SidebarSubItemProps>(c) && c.props.isActive) {
								activeIndex = i;
							}
						});

						const isChildActive = child.props.isActive;
						const isBeforeActive = activeIndex !== -1 && index < activeIndex;

						// Determine connector props
						const connectorProps: Partial<SidebarSubItemProps> = {
							showTopLine: isFirst, // First child always has top line
							showArrow: isChildActive, // Active child has arrow
							showVerticalLine: isBeforeActive, // Items before active have vertical line
						};

						return React.cloneElement(child, connectorProps);
					})}
				</div>
			)}
		</div>
	);
}

// ============================================================================
// SidebarPanel — Compound component pattern (like shadcn Sidebar)
//
// Reads state from SidebarProvider automatically.
// Compose with SidebarPanelHeader, SidebarPanelContent, SidebarPanelFooter.
// Flexbox does the layout — no child-parsing magic.
//
// <SidebarPanel>
//   <SidebarPanelHeader><SidebarPanelTitle>Nav</SidebarPanelTitle></SidebarPanelHeader>
//   <SidebarPanelContent>…</SidebarPanelContent>
//   <SidebarPanelFooter>…</SidebarPanelFooter>
// </SidebarPanel>
// ============================================================================

// --- Sub-components ---

export interface SidebarPanelHeaderProps extends React.ComponentProps<'div'> {}

/** Non-scrollable header area at the top of the panel. */
export function SidebarPanelHeader({ className, ...props }: SidebarPanelHeaderProps) {
	return (
		<div
			data-slot="sidebar-panel-header"
			className={cn('flex flex-col gap-2 shrink-0', className)}
			{...props}
		/>
	);
}

export interface SidebarPanelContentProps extends React.ComponentProps<'nav'> {}

/** Scrollable content area that fills the remaining space. */
export function SidebarPanelContent({ className, ...props }: SidebarPanelContentProps) {
	return (
		<nav
			data-slot="sidebar-panel-content"
			role="navigation"
			aria-label="Secondary navigation"
			className={cn(
				'flex flex-col flex-1 overflow-y-auto gap-1 scrollbar-custom mt-1 min-h-0',
				className
			)}
			{...props}
		/>
	);
}

export interface SidebarPanelFooterProps extends React.ComponentProps<'div'> {}

/** Non-scrollable footer area pinned to the bottom of the panel. */
export function SidebarPanelFooter({ className, ...props }: SidebarPanelFooterProps) {
	return (
		<div
			data-slot="sidebar-panel-footer"
			className={cn('flex flex-col gap-2 pt-2 shrink-0', className)}
			{...props}
		/>
	);
}

export interface SidebarPanelTitleProps {
	/** The title text */
	children: React.ReactNode;
	/** Hide the collapse/expand toggle button. Default: `false` (toggle is shown). */
	hideToggle?: boolean;
	/** Custom className for the outer wrapper */
	className?: string;
}

/**
 * Pre-built title row with a collapse/expand toggle.
 * Reads `secondaryIsOpen` and `toggleSecondary` from `SidebarProvider` automatically.
 *
 * ```tsx
 * <SidebarPanel>
 *   <SidebarPanelHeader>
 *     <SidebarPanelTitle>Navigation</SidebarPanelTitle>
 *   </SidebarPanelHeader>
 * </SidebarPanel>
 * ```
 */
export function SidebarPanelTitle({
	children,
	hideToggle = false,
	className,
}: SidebarPanelTitleProps) {
	const { secondaryIsOpen, toggleSecondary } = useSidebar();
	const appearance = useSidebarAppearance();
	const isDark = appearance === 'dark';

	return (
		<div
			data-slot="sidebar-panel-title"
			className={cn('flex h-[60px] items-center justify-between pl-[10px] w-full shrink-0', className)}
		>
			<h2 className={cn('text-xl font-medium', isDark ? 'text-white' : 'text-ink-dark')}>{children}</h2>
			{!hideToggle && (
				<Tooltip content={secondaryIsOpen ? 'Collapse sidebar' : 'Expand sidebar'} side="bottom">
					<IconButton
						variant="ghost-body"
						size="sm"
						icon={<SidebarSimple />}
						onClick={toggleSecondary}
						aria-label={secondaryIsOpen ? 'Collapse sidebar' : 'Expand sidebar'}
					/>
				</Tooltip>
			)}
		</div>
	);
}

// --- Main SidebarPanel ---

export interface SidebarPanelProps {
	/**
	 * @deprecated No longer needed — reads from `SidebarProvider` automatically.
	 * Override: forces the open/closed state instead of reading from the provider.
	 */
	isOpen?: boolean;
	/**
	 * @deprecated No longer needed — reads from `SidebarProvider` automatically.
	 * Override: called on toggle instead of the provider's `toggleSecondary`.
	 */
	onToggle?: () => void;
	/** Animation duration in ms (desktop only) */
	animationDuration?: number;
	/** Custom className for the panel wrapper */
	className?: string;
	/**
	 * Compose with `SidebarPanelHeader`, `SidebarPanelContent`,
	 * and `SidebarPanelFooter`. Flexbox handles the layout automatically.
	 */
	children?: React.ReactNode;
	/** Width of the panel when open (desktop). Default: 224px */
	width?: number;
	/**
	 * Controls mobile behaviour.
	 * - `'sheet'` (default) — renders panel content inside a side-sliding Sheet overlay.
	 * - `'hidden'` — the panel is completely hidden on mobile (renders nothing).
	 */
	mobileMode?: 'sheet' | 'hidden';
	/** Visual theme for navigation surfaces. Figma primary nav uses `dark`. */
	appearance?: 'light' | 'dark';
	/**
	 * Desktop collapse behaviour.
	 * - `'hide'` (default) — collapses to zero width (fully hidden).
	 * - `'rail'` — minimizes to a narrow icon rail (Layout 1). Requires `logo`
	 *   to render the brand mark in the rail.
	 */
	collapseMode?: 'hide' | 'rail';
	/** Brand mark node rendered at the top of the collapsed icon rail (`collapseMode="rail"`). */
	logo?: React.ReactNode;
	/** Width of the collapsed icon rail (`collapseMode="rail"`). Default: 64px. */
	railWidth?: number;
}

/**
 * Secondary navigation panel.
 * Reads `secondaryIsOpen` and `toggleSecondary` from `SidebarProvider` automatically.
 *
 * ```tsx
 * <SidebarPanel>
 *   <SidebarPanelHeader>
 *     <SidebarPanelTitle>Navigation</SidebarPanelTitle>
 *   </SidebarPanelHeader>
 *   <SidebarPanelContent>…</SidebarPanelContent>
 * </SidebarPanel>
 * ```
 */
export function SidebarPanel({
	isOpen: isOpenProp,
	onToggle: onToggleProp,
	animationDuration = 300,
	className = '',
	children,
	width = 240,
	mobileMode = 'sheet',
	appearance = 'light',
	collapseMode = 'hide',
	logo,
	railWidth = 64,
}: SidebarPanelProps) {
	const { secondaryIsOpen, toggleSecondary, setSecondaryIsOpen, mobileNavOpen, setMobileNavOpen } =
		useSidebar();
	const isMobile = useIsMobile();

	// Track whether the mobile-close has been applied so we don't render the
	// Sheet for a single frame with open={true} (prevents flash).
	const [mobileReady, setMobileReady] = useState(false);
	const wasOpenBeforeMobile = useRef<boolean | null>(null);

	useEffect(() => {
		if (isMobile) {
			// Remember the desktop state, then close via provider so PageSection
			// and other consumers see secondaryIsOpen === false and show the toggle.
			wasOpenBeforeMobile.current = secondaryIsOpen;
			setSecondaryIsOpen(false);
			setMobileReady(true);
		} else {
			// Restore the desktop state when resizing back
			if (wasOpenBeforeMobile.current !== null) {
				setSecondaryIsOpen(wasOpenBeforeMobile.current);
				wasOpenBeforeMobile.current = null;
			}
			setMobileNavOpen(false);
			setMobileReady(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMobile]);

	// Allow deprecated prop overrides; fall back to provider
	const isOpen = isOpenProp ?? secondaryIsOpen;
	const onToggle = onToggleProp ?? toggleSecondary;

	// ── Mobile overlay (no side nav on mobile; toggle opens a Sheet over content) ──
	const mobileSheet =
		mobileMode !== 'hidden' && mobileReady ? (
			<Sheet
				open={mobileNavOpen}
				onOpenChange={open => {
					setMobileNavOpen(open);
				}}
			>
				<SheetContent side="left" className="w-[280px] p-0" showCloseButton={false}>
					<SidebarAppearanceProvider appearance={appearance}>
						<div className="flex flex-col h-full px-4 py-5">{children}</div>
					</SidebarAppearanceProvider>
				</SheetContent>
			</Sheet>
		) : null;

	const isDark = appearance === 'dark';
	const surfaceClass = isDark
		? 'bg-[#141422] border-r border-white/10 text-gray-200'
		: 'bg-bg border-r border-border-secondary';

	// Collapsed icon rail (desktop only) for `collapseMode="rail"`.
	const collapsedRail =
		collapseMode === 'rail' && !isOpen ? (
			<div
				className={cn(
					'group/rail hidden md:flex flex-col items-center gap-space-sm px-space-xs shrink-0 h-full overflow-hidden cursor-e-resize',
					surfaceClass
				)}
				style={{ width: `${railWidth}px` }}
			>
				<SidebarAppearanceProvider appearance={appearance}>
					{/* ChatGPT-style: brand mark at rest, expand affordance on hover. */}
					<Tooltip content="Expand sidebar" side="right" delayDuration={200}>
						<button
							type="button"
							onClick={onToggle}
							aria-label="Expand sidebar"
							className="flex h-[60px] w-full items-center justify-center cursor-e-resize"
						>
							<span className="flex items-center justify-center group-hover/rail:hidden">
								{logo}
							</span>
							<span
								className={cn(
									'hidden items-center justify-center rounded-radius-md p-space-xs group-hover/rail:flex',
									isDark ? 'text-gray-200 hover:bg-white/10' : 'text-ink-dark hover:bg-secondary'
								)}
							>
								<SidebarSimple className="size-5" />
							</span>
						</button>
					</Tooltip>
				</SidebarAppearanceProvider>
			</div>
		) : null;

	// ── Desktop panel (hidden below md via CSS so no flash on mobile) ──
	const desktopPanel = (
		<div
			className={cn(
				'hidden md:block h-full relative shrink-0 transition-all ease-in-out overflow-hidden z-10',
				surfaceClass,
				collapseMode === 'rail'
					? isOpen
						? ''
						: 'border-r-0'
					: isOpen
						? ''
						: 'w-0 border-r-0',
				className
			)}
			style={{
				transitionDuration: `${animationDuration}ms`,
				width: isOpen ? `${width}px` : collapseMode === 'rail' ? 0 : 0,
			}}
		>
			<div
				className={cn(
					'flex flex-col h-full overflow-hidden transition-opacity w-full px-4 pb-5',
					isOpen ? 'opacity-100' : 'opacity-0'
				)}
				style={{ transitionDuration: `${animationDuration}ms` }}
			>
				<SidebarAppearanceProvider appearance={appearance}>{children}</SidebarAppearanceProvider>
			</div>
		</div>
	);

	return (
		<>
			{mobileSheet}
			{collapsedRail}
			{desktopPanel}
		</>
	);
}

// ============================================================================
// SideNavigation - Full sidebar with primary rail and secondary panel
// ============================================================================

interface SideNavigationProps {
	className?: string;
	/** Primary rail + secondary panel theme. Figma dual-sidebar uses `dark`. */
	appearance?: 'light' | 'dark';
}

export function SideNavigation({ className = '', appearance = 'dark' }: SideNavigationProps) {
	const {
		secondaryIsOpen,
		toggleSecondary,
		activeMainItem,
		setActiveMainItem,
		activeSecondaryItem,
		setActiveSecondaryItem,
		activeSubItem,
		setActiveSubItem,
		mainNavItems,
		config,
		setSecondaryIsOpen,
	} = useSidebar();

	// Handle main navigation click
	const handleMainNavClick = (item: NavigationItem) => {
		setActiveMainItem(item.id);
		item.onClick();

		// If clicking on the same active item, toggle secondary panel
		if (activeMainItem === item.id) {
			toggleSecondary();
		} else if (!secondaryIsOpen) {
			// If secondary is closed and we click a different item, open it
			setSecondaryIsOpen(true);
		}
	};

	// Handle secondary navigation item click wrapper
	const createHandleSecondaryItemClick = (item: SecondaryNavigationItem) => () => {
		const hasSubItems = item.subItems && item.subItems.length > 0;

		// Set the item as active
		setActiveSecondaryItem(item.id);

		if (hasSubItems) {
			// Auto-navigate to first sub-item
			const firstSubItem = item.subItems?.[0];
			if (firstSubItem) {
				setActiveSubItem(firstSubItem.id);
				firstSubItem.onClick();
			}
		} else {
			// Clear sub-item selection when clicking an item without children
			setActiveSubItem(null);
			item.onClick();
		}
	};

	const handleSubItemClick = (subItem: SubNavigationItem) => {
		setActiveSubItem(subItem.id);
		subItem.onClick();
	};

	// Get current secondary navigation items
	const getCurrentSecondaryItems = (): SecondaryNavigationItem[] => {
		const activeMainNavItem = mainNavItems.find(item => item.id === activeMainItem);
		return activeMainNavItem?.children || [];
	};

	const currentSecondaryItems = getCurrentSecondaryItems();
	const animationDuration = config.animationDuration || 300;
	const activeMainNavItem = mainNavItems.find(item => item.id === activeMainItem);

	return (
		<div className={`flex sticky top-0 left-0 h-screen overflow-hidden ${className}`}>
			{/* Primary Navigation Rail — 64px, Figma Layout 4 */}
			<SidebarAppearanceProvider appearance={appearance}>
			<div
				className={cn(
					'flex flex-col items-center justify-between py-space-sm px-space-xs w-16 shrink-0 h-full z-20',
					appearance === 'dark'
						? 'bg-[#141422] border-r border-white/10'
						: 'bg-bg border-r border-border-secondary'
				)}
			>
				{/* Top Section */}
				<div className="flex flex-col items-center gap-space-sm w-full">
					<SidebarBrand showWordmark={false} inverted={appearance === 'dark'} className="px-0 py-space-md" />

					{/* Main Navigation Items */}
					<nav
						className="flex flex-col gap-[12px] w-full items-center"
						role="navigation"
						aria-label="Main navigation"
					>
						{mainNavItems.map(item => (
							<MainNavigationButton
								key={item.id}
								item={item}
								icon={item.icon}
								isActive={activeMainItem === item.id}
								onClick={() => handleMainNavClick(item)}
							/>
						))}
					</nav>
				</div>

				{/* Bottom Section - Utilities */}
				<div className="flex flex-col items-center gap-space-sm w-full">
					<div className="flex flex-col gap-space-sm items-center">
						<Tooltip content="Help" side="right" delayDuration={200}>
							<button
								className={cn(
									'size-space-6 flex items-center justify-center transition-colors duration-200 cursor-pointer',
									appearance === 'dark'
										? 'text-gray-400 hover:text-white'
										: 'text-ink-dark hover:text-ink-primary'
								)}
								aria-label="Help"
							>
								<Question className="size-space-5" />
							</button>
						</Tooltip>

						<Tooltip content="Settings" side="right" delayDuration={200}>
							<button
								className={cn(
									'size-space-6 flex items-center justify-center transition-colors duration-200 cursor-pointer',
									appearance === 'dark'
										? 'text-gray-400 hover:text-white'
										: 'text-ink-dark hover:text-ink-primary'
								)}
								aria-label="Settings"
							>
								<GearSix className="size-space-5" />
							</button>
						</Tooltip>

						<Tooltip content="Notifications" side="right" delayDuration={200}>
							<button
								className={cn(
									'relative flex size-6 items-center justify-center transition-colors duration-200 cursor-pointer',
									appearance === 'dark'
										? 'text-gray-400 hover:text-white'
										: 'text-ink-dark hover:text-ink-primary'
								)}
								aria-label="Notifications"
							>
								<Bell className="size-5" />
								<span className="absolute top-[2px] right-[2px] size-1.5 rounded-full border border-[#141422] bg-destructive-solid" />
							</button>
						</Tooltip>
					</div>

					<Popover>
						<PopoverTrigger asChild>
							<Button aria-label="User profile" variant="ghost">
								<Avatar size="xs">
									<AvatarFallback variant="normal">MK</AvatarFallback>
								</Avatar>
							</Button>
						</PopoverTrigger>
						<PopoverContent side="right" sideOffset={12} className="w-48">
							<div className="flex flex-col gap-1">
								<p className="text-sm font-medium text-ink-primary">Marmo User</p>
								<p className="text-xs text-ink-light">user@marmoui.com</p>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			</SidebarAppearanceProvider>

			{/* Secondary Navigation Panel */}
			<SidebarPanel animationDuration={animationDuration} appearance={appearance} width={240}>
				<SidebarPanelHeader>
					<SidebarPanelTitle>{activeMainNavItem?.label || 'Dashboard'}</SidebarPanelTitle>
				</SidebarPanelHeader>

				<SidebarPanelContent>
					{currentSecondaryItems.map(item => (
						<SidebarItem
							key={item.id}
							label={item.label}
							iconOutlined={item.iconOutlined}
							iconFilled={item.iconFilled}
							isActive={activeSecondaryItem === item.id}
							onClick={createHandleSecondaryItemClick(item)}
						>
							{item.subItems?.map(subItem => (
								<SidebarSubItem
									key={subItem.id}
									label={subItem.label}
									isActive={activeSubItem === subItem.id}
									onClick={() => handleSubItemClick(subItem)}
								/>
							))}
						</SidebarItem>
					))}
				</SidebarPanelContent>
			</SidebarPanel>
		</div>
	);
}

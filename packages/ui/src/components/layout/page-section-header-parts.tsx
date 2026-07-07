'use client';

import * as React from 'react';
import { SquaresFour, Question, ClockClockwise, CaretDown, Bell, MagnifyingGlass } from '@phosphor-icons/react';

import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { IconButton } from '../icon-button';
import { Input } from '../input';
import { Tooltip } from '../tooltip';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../dropdown-menu';
import { MarmoLogoWordmark } from '../icons';

export interface PageSectionGlobalNavItem {
	label: string;
	href?: string;
	onClick?: () => void;
	hasMenu?: boolean;
	isActive?: boolean;
	/**
	 * Mega-menu content for `hasMenu` items (Layout 3 / `top-nav`).
	 * Each group renders as a labelled column of links inside a wide dropdown.
	 */
	menu?: PageSectionGlobalNavMenuGroup[];
}

export interface PageSectionGlobalNavMenuLink {
	label: string;
	href?: string;
	description?: string;
	onClick?: () => void;
}

export interface PageSectionGlobalNavMenuGroup {
	label?: string;
	links: PageSectionGlobalNavMenuLink[];
}

export interface PageSectionProfile {
	name: string;
	subtitle?: string;
	avatarSrc?: string;
	avatarFallback?: string;
}

interface HeaderBrandProps {
	showBrand?: boolean;
	brandLabel?: string;
	className?: string;
}

export function PageSectionHeaderBrand({
	showBrand = true,
	brandLabel = 'Marmo',
	className,
}: HeaderBrandProps) {
	if (!showBrand) return null;

	return (
		<div className={cn('flex items-center gap-space-xs shrink-0', className)}>
			<MarmoLogoWordmark className="h-9 w-auto" inverted={false} aria-label={brandLabel} />
		</div>
	);
}

interface HeaderSearchProps {
	searchPlaceholder?: string;
	searchValue?: string;
	onSearchChange?: (value: string) => void;
	className?: string;
}

export function PageSectionHeaderSearch({
	searchPlaceholder = 'Search',
	searchValue,
	onSearchChange,
	className,
}: HeaderSearchProps) {
	return (
		<div className={cn('min-w-0 flex-1 max-w-xl', className)}>
			<Input
				size="md"
				placeholder={searchPlaceholder}
				value={searchValue}
				onChange={event => onSearchChange?.(event.target.value)}
				startAdornment={<MagnifyingGlass className="size-4 text-icon" />}
				aria-label={searchPlaceholder}
			/>
		</div>
	);
}

interface HeaderUtilitiesProps {
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
	className?: string;
}

export function PageSectionHeaderUtilities({
	showHistory = true,
	showNotifications = true,
	showApps = true,
	showHelp = false,
	onHistoryClick,
	onNotificationsClick,
	onAppsClick,
	onHelpClick,
	profile,
	profileMenu,
	className,
}: HeaderUtilitiesProps) {
	return (
		<div className={cn('flex items-center gap-space-2xs shrink-0', className)}>
			{showHistory ? (
				<Tooltip content="History" side="bottom">
					<IconButton
						variant="ghost-body"
						size="sm"
						aria-label="History"
						icon={<ClockClockwise className="size-5" />}
						onClick={onHistoryClick}
					/>
				</Tooltip>
			) : null}
			{showHelp ? (
				<Tooltip content="Help" side="bottom">
					<IconButton
						variant="ghost-body"
						size="sm"
						aria-label="Help"
						icon={<Question className="size-5" />}
						onClick={onHelpClick}
					/>
				</Tooltip>
			) : null}
			{showNotifications ? (
				<Tooltip content="Notifications" side="bottom">
					<IconButton
						variant="ghost-body"
						size="sm"
						aria-label="Notifications"
						icon={<Bell className="size-5" />}
						onClick={onNotificationsClick}
					/>
				</Tooltip>
			) : null}
			{showApps ? (
				<Tooltip content="Apps" side="bottom">
					<IconButton
						variant="ghost-body"
						size="sm"
						aria-label="Apps"
						icon={<SquaresFour className="size-5" />}
						onClick={onAppsClick}
					/>
				</Tooltip>
			) : null}
			{profileMenu ??
				(profile ? (
					<Avatar size="sm">
						{profile.avatarSrc ? <AvatarImage src={profile.avatarSrc} alt={profile.name} /> : null}
						<AvatarFallback>{profile.avatarFallback ?? profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>
				) : null)}
		</div>
	);
}

interface HeaderGlobalNavProps {
	items: PageSectionGlobalNavItem[];
	className?: string;
}

function GlobalNavItemTrigger({
	item,
	className,
}: {
	item: PageSectionGlobalNavItem;
	className?: string;
}) {
	return (
		<span className={cn('inline-flex items-center gap-space-3xs', className)}>
			{item.label}
			{item.hasMenu ? <CaretDown className="size-4" /> : null}
		</span>
	);
}

function GlobalNavMegaMenu({ item }: { item: PageSectionGlobalNavItem }) {
	const groups = item.menu ?? [];
	const hasGroups = groups.length > 0;

	return (
		<DropdownMenuContent
			align="start"
			sideOffset={8}
			className="min-w-md border border-secondary p-space-md shadow-lg"
		>
			{hasGroups ? (
				<div className="grid grid-cols-2 gap-space-md">
					{groups.map((group, groupIndex) => (
						<div key={group.label || groupIndex} className="flex flex-col gap-space-2xs">
							{group.label ? (
								<p className="px-space-xs text-caps-sm font-semibold uppercase tracking-caps-sm text-ink-muted">
									{group.label}
								</p>
							) : null}
							<div className="flex flex-col">
								{group.links.map(link => (
									<DropdownMenuItem
										key={link.label}
										onClick={link.onClick}
										className="flex flex-col items-start gap-0 rounded-radius-md px-space-xs py-space-2xs"
									>
										<span className="text-body-sm font-medium text-ink-dark">{link.label}</span>
										{link.description ? (
											<span className="text-body-xs text-ink-muted">{link.description}</span>
										) : null}
									</DropdownMenuItem>
								))}
							</div>
						</div>
					))}
				</div>
			) : (
				<DropdownMenuItem onClick={item.onClick}>{item.label}</DropdownMenuItem>
			)}
		</DropdownMenuContent>
	);
}

export function PageSectionHeaderGlobalNav({ items, className }: HeaderGlobalNavProps) {
	return (
		<nav aria-label="Global navigation" className={cn('flex items-center gap-space-xs', className)}>
			{items.map(item => {
				const triggerClass = cn(
					'inline-flex items-center gap-space-3xs rounded-radius-sm px-space-sm py-space-xs text-body-sm font-medium transition-colors cursor-pointer data-[state=open]:bg-secondary data-[state=open]:text-ink-dark data-[state=open]:[&_svg]:rotate-180 [&_svg]:transition-transform',
					item.isActive
						? 'bg-primary-muted text-ink-primary'
						: 'text-ink hover:bg-secondary hover:text-ink-dark'
				);

				if (item.hasMenu) {
					return (
						<DropdownMenu key={item.label}>
							<DropdownMenuTrigger asChild>
								<button type="button" className={triggerClass} aria-haspopup="menu">
									<GlobalNavItemTrigger item={item} />
								</button>
							</DropdownMenuTrigger>
							<GlobalNavMegaMenu item={item} />
						</DropdownMenu>
					);
				}

				if (item.href) {
					return (
						<a key={item.label} href={item.href} className={triggerClass} onClick={item.onClick}>
							<GlobalNavItemTrigger item={item} />
						</a>
					);
				}

				return (
					<button key={item.label} type="button" onClick={item.onClick} className={triggerClass}>
						<GlobalNavItemTrigger item={item} />
					</button>
				);
			})}
		</nav>
	);
}

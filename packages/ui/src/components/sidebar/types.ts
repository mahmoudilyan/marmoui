import type { ElementType } from 'react';

export interface SubNavigationItem {
	id: string;
	label: string;
	onClick: () => void;
	active?: boolean;
}

export interface SecondaryNavigationItem {
	id: string;
	label: string;
	iconOutlined?: string | ElementType; // Material Icons outlined version (default state)
	iconFilled?: string | ElementType; // Material Icons filled version (hover/active state)
	onClick: () => void;
	active?: boolean;
	expanded?: boolean; // Whether this item is expanded to show sub-items
	subItems?: SubNavigationItem[]; // Optional sub-navigation items
}

export interface NavigationItem {
	id: string;
	label: string;
	icon: string | ElementType; // Primary icon (filled version)
	iconOutlined?: string | ElementType; // Outlined version for default state
	iconDuotone?: string | ElementType; // Duotone/twotone version for active state
	onClick: () => void;
	active?: boolean;
	children?: SecondaryNavigationItem[]; // Secondary nav as children
}

export interface SidebarState {
	secondaryIsOpen: boolean;
	activeMainItem: string | null;
	activeSecondaryItem: string | null;
	activeSubItem: string | null;
	expandedSecondaryItems: string[];
	mainNavItems: NavigationItem[];
	/** Overlay nav open state for mobile (sidebar-collapsible / sidebar-hidden). */
	mobileNavOpen: boolean;
}

export interface SidebarActions {
	setSecondaryIsOpen: (open: boolean) => void;
	toggleSecondary: () => void;
	setActiveMainItem: (itemId: string) => void;
	setActiveSecondaryItem: (itemId: string) => void;
	setActiveSubItem: (itemId: string | null) => void;
	setMainNavItems: (items: NavigationItem[]) => void;
	toggleSecondaryExpanded: (itemId: string) => void;
	setExpandedSecondaryItems: (itemIds: string[]) => void;
	setMobileNavOpen: (open: boolean) => void;
	toggleMobileNav: () => void;
}

export interface SidebarStore extends SidebarState, SidebarActions {}

export interface SidebarProps {
	mainNavItems?: NavigationItem[];
	className?: string;
}

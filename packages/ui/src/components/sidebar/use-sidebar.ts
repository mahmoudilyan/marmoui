// hooks/useSideBar.ts
import React from 'react';
import { create } from 'zustand';

interface SubNavigationItem {
	id: string;
	label: string;
	onClick: () => void;
	active?: boolean;
}

interface SecondaryNavigationItem {
	id: string;
	label: string;
	iconOutlined: string; // Material Icons outlined version
	iconFilled: string; // Material Icons filled version
	onClick: () => void;
	active?: boolean;
	expanded?: boolean; // Whether this item is expanded to show sub-items
	subItems?: SubNavigationItem[]; // Optional sub-navigation items
}

interface NavigationItem {
	id: string;
	label: string;
	icon: string;
	onClick: () => void;
	active?: boolean;
	children?: SecondaryNavigationItem[]; // Secondary nav as children
}

interface SideBarStore {
	secondaryIsOpen: boolean;
	activeMainItem: string | null;
	activeSecondaryItem: string | null;
	activeSubItem: string | null;
	expandedSecondaryItems: string[];
	mainNavItems: NavigationItem[];

	// Actions
	setSecondaryIsOpen: (open: boolean) => void;
	toggleSecondary: () => void;
	setActiveMainItem: (itemId: string) => void;
	setActiveSecondaryItem: (itemId: string) => void;
	setActiveSubItem: (itemId: string | null) => void;
	setMainNavItems: (items: NavigationItem[]) => void;
	toggleSecondaryExpanded: (itemId: string) => void;
	setExpandedSecondaryItems: (itemIds: string[]) => void;
}

export const useSideBar = create<SideBarStore>((set, get) => ({
	secondaryIsOpen: true,
	activeMainItem: 'dashboard',
	activeSecondaryItem: null,
	activeSubItem: null,
	expandedSecondaryItems: [],
	mainNavItems: [],

	setSecondaryIsOpen: open => set({ secondaryIsOpen: open }),

	toggleSecondary: () =>
		set(state => ({
			secondaryIsOpen: !state.secondaryIsOpen,
		})),

	setActiveMainItem: itemId =>
		set({
			activeMainItem: itemId,
			activeSecondaryItem: null,
			activeSubItem: null,
		}),

	setActiveSecondaryItem: itemId => set({ activeSecondaryItem: itemId }),

	setActiveSubItem: itemId => set({ activeSubItem: itemId }),

	setMainNavItems: items => set({ mainNavItems: items }),

	toggleSecondaryExpanded: itemId =>
		set(state => ({
			expandedSecondaryItems: state.expandedSecondaryItems.includes(itemId)
				? state.expandedSecondaryItems.filter(id => id !== itemId)
				: [...state.expandedSecondaryItems, itemId],
		})),

	setExpandedSecondaryItems: itemIds => set({ expandedSecondaryItems: itemIds }),
}));

// Alternative React hook version (if you prefer not to use Zustand)
export const useSideBarState = () => {
	const [secondaryIsOpen, setSecondaryIsOpen] = React.useState(true);
	const [activeMainItem, setActiveMainItem] = React.useState<string | null>('dashboard');
	const [activeSecondaryItem, setActiveSecondaryItem] = React.useState<string | null>(null);
	const [activeSubItem, setActiveSubItem] = React.useState<string | null>(null);
	const [expandedSecondaryItems, setExpandedSecondaryItems] = React.useState<string[]>([]);

	const toggleSecondary = () => {
		setSecondaryIsOpen(prev => !prev);
	};

	const toggleSecondaryExpanded = (itemId: string) => {
		setExpandedSecondaryItems(prev =>
			prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
		);
	};

	return {
		secondaryIsOpen,
		setSecondaryIsOpen,
		toggleSecondary,
		activeMainItem,
		setActiveMainItem,
		activeSecondaryItem,
		setActiveSecondaryItem,
		activeSubItem,
		setActiveSubItem,
		expandedSecondaryItems,
		setExpandedSecondaryItems,
		toggleSecondaryExpanded,
	};
};

export type { NavigationItem, SecondaryNavigationItem, SubNavigationItem };

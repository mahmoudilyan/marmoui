'use client';
import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { NavigationItem, SidebarState } from './types';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

interface SidebarConfig {
	defaultMainItem?: string;
	/**
	 * Initial open state for the secondary panel.
	 *
	 * To persist across reloads, read the `sidebar_state` cookie in a
	 * **server component** and pass the value here:
	 *
	 * ```tsx
	 * // layout.tsx (server component)
	 * import { cookies } from 'next/headers';
	 * import { SIDEBAR_COOKIE_NAME } from '@marmoui/ui';
	 *
	 * export default async function Layout({ children }) {
	 *   const cookieStore = await cookies();
	 *   const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value !== 'false';
	 *   return (
	 *     <SidebarProvider config={{ defaultSecondaryOpen: defaultOpen }} …>
	 *       {children}
	 *     </SidebarProvider>
	 *   );
	 * }
	 * ```
	 */
	defaultSecondaryOpen?: boolean;
	animationDuration?: number;
	/** When `true`, the open/closed state is written to a cookie on every change. */
	persistState?: boolean;
}

interface SidebarContextType extends SidebarState {
	// Actions
	setSecondaryIsOpen: (open: boolean) => void;
	toggleSecondary: () => void;
	setActiveMainItem: (itemId: string) => void;
	setActiveSecondaryItem: (itemId: string) => void;
	setActiveSubItem: (itemId: string | null) => void;
	toggleSecondaryExpanded: (itemId: string) => void;
	setExpandedSecondaryItems: (itemIds: string[]) => void;

	// Mobile overlay nav (used by sidebar-collapsible / sidebar-hidden on small screens)
	mobileNavOpen: boolean;
	setMobileNavOpen: (open: boolean) => void;
	toggleMobileNav: () => void;

	// Config
	config: SidebarConfig;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

type SidebarAction =
	| { type: 'SET_SECONDARY_OPEN'; payload: boolean }
	| { type: 'TOGGLE_SECONDARY' }
	| { type: 'SET_ACTIVE_MAIN_ITEM'; payload: string }
	| { type: 'SET_ACTIVE_SECONDARY_ITEM'; payload: string }
	| { type: 'SET_ACTIVE_SUB_ITEM'; payload: string | null }
	| { type: 'TOGGLE_SECONDARY_EXPANDED'; payload: string }
	| { type: 'SET_EXPANDED_SECONDARY_ITEMS'; payload: string[] }
	| { type: 'SET_MAIN_NAV_ITEMS'; payload: NavigationItem[] }
	| { type: 'SET_MOBILE_NAV_OPEN'; payload: boolean }
	| { type: 'TOGGLE_MOBILE_NAV' };

function sideNavigationReducer(state: SidebarState, action: SidebarAction): SidebarState {
	switch (action.type) {
		case 'SET_SECONDARY_OPEN':
			return { ...state, secondaryIsOpen: action.payload };

		case 'TOGGLE_SECONDARY':
			return { ...state, secondaryIsOpen: !state.secondaryIsOpen };

		case 'SET_ACTIVE_MAIN_ITEM':
			return {
				...state,
				activeMainItem: action.payload,
				activeSecondaryItem: null,
				activeSubItem: null,
			};

		case 'SET_ACTIVE_SECONDARY_ITEM':
			return { ...state, activeSecondaryItem: action.payload };

		case 'SET_ACTIVE_SUB_ITEM':
			return { ...state, activeSubItem: action.payload };

		case 'TOGGLE_SECONDARY_EXPANDED':
			const itemId = action.payload;
			const isExpanded = state.expandedSecondaryItems.includes(itemId);
			// Single accordion behavior: only one item can be expanded at a time
			return {
				...state,
				expandedSecondaryItems: isExpanded ? [] : [itemId],
			};

		case 'SET_EXPANDED_SECONDARY_ITEMS':
			return { ...state, expandedSecondaryItems: action.payload };

		case 'SET_MAIN_NAV_ITEMS':
			return { ...state, mainNavItems: action.payload };

		case 'SET_MOBILE_NAV_OPEN':
			return { ...state, mobileNavOpen: action.payload };

		case 'TOGGLE_MOBILE_NAV':
			return { ...state, mobileNavOpen: !state.mobileNavOpen };

		default:
			return state;
	}
}

interface SidebarProviderProps {
	children: React.ReactNode;
	mainNavItems: NavigationItem[];
	config?: SidebarConfig;
}

export function SidebarProvider({ children, mainNavItems, config = {} }: SidebarProviderProps) {
	const defaultConfig: SidebarConfig = {
		defaultMainItem: mainNavItems[0]?.id || 'dashboard',
		defaultSecondaryOpen: true,
		animationDuration: 300,
		persistState: false,
		...config,
	};

	const initialState: SidebarState = {
		secondaryIsOpen: defaultConfig.defaultSecondaryOpen!,
		activeMainItem: defaultConfig.defaultMainItem!,
		activeSecondaryItem: null,
		activeSubItem: null,
		expandedSecondaryItems: [],
		mainNavItems,
		mobileNavOpen: false,
	};

	const [state, dispatch] = useReducer(sideNavigationReducer, initialState);

	// Write cookie on every change — reading happens server-side
	useEffect(() => {
		if (defaultConfig.persistState) {
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${state.secondaryIsOpen}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
		}
	}, [state.secondaryIsOpen, defaultConfig.persistState]);

	// Actions
	const setSecondaryIsOpen = useCallback((open: boolean) => {
		dispatch({ type: 'SET_SECONDARY_OPEN', payload: open });
	}, []);

	const toggleSecondary = useCallback(() => {
		dispatch({ type: 'TOGGLE_SECONDARY' });
	}, []);

	const setActiveMainItem = useCallback((itemId: string) => {
		dispatch({ type: 'SET_ACTIVE_MAIN_ITEM', payload: itemId });
	}, []);

	const setActiveSecondaryItem = useCallback((itemId: string) => {
		dispatch({ type: 'SET_ACTIVE_SECONDARY_ITEM', payload: itemId });
	}, []);

	const setActiveSubItem = useCallback((itemId: string | null) => {
		dispatch({ type: 'SET_ACTIVE_SUB_ITEM', payload: itemId });
	}, []);

	const toggleSecondaryExpanded = useCallback((itemId: string) => {
		// Close all other items when opening a new one (single accordion behavior)
		dispatch({ type: 'TOGGLE_SECONDARY_EXPANDED', payload: itemId });
	}, []);

	const setExpandedSecondaryItems = useCallback((itemIds: string[]) => {
		dispatch({ type: 'SET_EXPANDED_SECONDARY_ITEMS', payload: itemIds });
	}, []);

	const setMobileNavOpen = useCallback((open: boolean) => {
		dispatch({ type: 'SET_MOBILE_NAV_OPEN', payload: open });
	}, []);

	const toggleMobileNav = useCallback(() => {
		dispatch({ type: 'TOGGLE_MOBILE_NAV' });
	}, []);

	const contextValue: SidebarContextType = {
		...state,
		setSecondaryIsOpen,
		toggleSecondary,
		setActiveMainItem,
		setActiveSecondaryItem,
		setActiveSubItem,
		toggleSecondaryExpanded,
		setExpandedSecondaryItems,
		mobileNavOpen: state.mobileNavOpen,
		setMobileNavOpen,
		toggleMobileNav,
		config: defaultConfig,
	};

	return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSideBar must be used within a SideBarProvider');
	}
	return context;
}

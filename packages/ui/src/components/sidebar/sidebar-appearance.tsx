'use client';

import * as React from 'react';

export type SidebarAppearance = 'light' | 'dark';

const SidebarAppearanceContext = React.createContext<SidebarAppearance>('light');

export function SidebarAppearanceProvider({
	appearance = 'light',
	children,
}: {
	appearance?: SidebarAppearance;
	children: React.ReactNode;
}) {
	return (
		<SidebarAppearanceContext.Provider value={appearance}>{children}</SidebarAppearanceContext.Provider>
	);
}

export function useSidebarAppearance() {
	return React.useContext(SidebarAppearanceContext);
}


// ── Collapsed-rail context ──────────────────────────────────────────────────
// True while children render inside the 52px collapsed rail; nav primitives
// switch to icon-only presentation (ChatGPT-style).

const SidebarCollapsedContext = React.createContext(false);

export function SidebarCollapsedProvider({
	collapsed,
	children,
}: {
	collapsed: boolean;
	children: React.ReactNode;
}) {
	return (
		<SidebarCollapsedContext.Provider value={collapsed}>
			{children}
		</SidebarCollapsedContext.Provider>
	);
}

export function useSidebarCollapsed(): boolean {
	return React.useContext(SidebarCollapsedContext);
}

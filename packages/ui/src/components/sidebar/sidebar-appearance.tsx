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

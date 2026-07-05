import * as React from 'react';

export type ChartConfig = Record<
	string,
	{
		label: React.ReactNode;
		icon?: React.ComponentType<{ className?: string }>;
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: { light: string; dark: string } }
	)
>;

export const THEMES = { light: '', dark: '.dark' } as const;

export interface ChartContextValue {
	config: ChartConfig;
}

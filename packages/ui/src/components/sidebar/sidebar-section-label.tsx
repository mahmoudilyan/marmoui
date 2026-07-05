'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { useSidebarAppearance } from './sidebar-appearance';

export interface SidebarSectionLabelProps {
	children: React.ReactNode;
	className?: string;
}

/** Caps section divider label — e.g. COMPONENTS, MORE (Figma sidebar). */
export function SidebarSectionLabel({ children, className }: SidebarSectionLabelProps) {
	const appearance = useSidebarAppearance();
	const isDark = appearance === 'dark';

	return (
		<p
			className={cn(
				'px-space-sm py-space-xs text-caps-sm font-medium uppercase tracking-caps-sm',
				isDark ? 'text-gray-400' : 'text-ink-muted',
				className
			)}
		>
			{children}
		</p>
	);
}

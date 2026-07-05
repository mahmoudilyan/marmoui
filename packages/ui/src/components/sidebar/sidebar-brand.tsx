'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import MarmoIconLogo, { MarmoLogoWordmark } from '../icons/marmo-icon-logo';

export interface SidebarBrandProps {
	/** Show wordmark beside the mark. Default: true */
	showWordmark?: boolean;
	/** Use light text for dark sidebars. Default: false */
	inverted?: boolean;
	className?: string;
}

/** Sidebar header brand row — Figma Primary Navigation logo + Marmo label. */
export function SidebarBrand({ showWordmark = true, inverted = false, className }: SidebarBrandProps) {
	return (
		<div className={cn('flex items-center gap-space-sm px-space-sm py-space-md', className)}>
			{showWordmark ? (
				<MarmoLogoWordmark className="h-9 w-auto" inverted={inverted} />
			) : (
				<MarmoIconLogo className="size-9" />
			)}
		</div>
	);
}

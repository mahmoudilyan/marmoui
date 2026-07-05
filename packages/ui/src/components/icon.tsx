import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const iconSizeVariants = cva('inline-flex items-center justify-center [&_svg]:shrink-0', {
	variants: {
		size: {
			xs: '[&_svg]:size-3',
			sm: '[&_svg]:size-4',
			md: '[&_svg]:size-5',
			lg: '[&_svg]:size-6',
			xl: '[&_svg]:size-7',
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

export interface UiIconProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof iconSizeVariants> {
	/**
	 * The icon element to render (e.g., from react-icons/md)
	 */
	icon: React.ReactElement;
	/**
	 * Accessible label for screen readers. If omitted, icon is hidden from AT.
	 */
	label?: string;
	/**
	 * Primary color token suffix (maps to CSS var --color-<fill>). Default: 'ink'
	 */
	fill?: string;
	/**
	 * Secondary color token suffix for two-tone icons. If omitted, defaults to the
	 * primary fill with 60% opacity via CSS.
	 */
	fillSecondary?: string;
}

function Icon({ icon, label, size, className, fill = 'ink', fillSecondary, ...rest }: UiIconProps) {
	const ariaProps = label
		? ({ role: 'img', 'aria-label': label } as const)
		: ({ 'aria-hidden': true } as const);

	const style: React.CSSProperties = {
		color: `var(--color-${fill})`,
		['--icon-secondary-color' as any]: fillSecondary
			? `var(--color-${fillSecondary})`
			: `var(--color-${fill})`,
		['--icon-secondary-opacity' as any]: 0.6,
	};

	return (
		<span
			data-slot="icon"
			className={cn(iconSizeVariants({ size }), className)}
			style={style}
			data-two-tone="true"
			{...ariaProps}
			{...rest}
		>
			{icon}
		</span>
	);
}

export { Icon };

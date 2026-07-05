import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';
import { buttonVariants, iconButtonSizeVariants } from './button-variants';
import { Icon } from './icon';
import { Spinner } from './spinner';
import { ButtonGroupContext } from './button-group';

export interface IconButtonProps
	extends
		React.ComponentProps<'button'>,
		VariantProps<typeof buttonVariants>,
		VariantProps<typeof iconButtonSizeVariants> {
	/**
	 * Render as child component using Radix Slot
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * Show loading state with spinning refresh icon
	 * @default false
	 */
	loading?: boolean;
	/**
	 * The icon element to display (typically from react-icons/md)
	 */
	icon?: React.ReactElement;
}

function IconButton({
	className,
	variant = 'primary',
	size,
	asChild = false,
	icon,
	loading,
	...props
}: IconButtonProps) {
	const Comp = asChild ? Slot : 'button';
	const groupCtx = React.useContext(ButtonGroupContext);
	const resolvedSize = size ?? groupCtx?.size ?? 'md';

	return (
		<Comp
			data-slot="icon-button"
			className={cn(buttonVariants({ variant }), iconButtonSizeVariants({ size: resolvedSize }), className)}
			{...props}
		>
		{loading ? (
			<Spinner
				className="animate-spin text-current !p-0 !fill-none size-4"
				aria-hidden="true"
			/>
		) : icon ? (
			<Icon icon={icon} size={resolvedSize} fill="inherit" />
		) : null}
		</Comp>
	);
}

export { IconButton };

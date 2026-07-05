import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';
import { buttonVariants, buttonSizeVariants } from './button-variants';
import { Icon } from './icon';
import { Spinner } from './spinner';
import { ButtonGroupContext } from './button-group';

export interface ButtonProps
	extends
		React.ComponentProps<'button'>,
		VariantProps<typeof buttonVariants>,
		VariantProps<typeof buttonSizeVariants> {
	/**
	 * Render as child component using Radix Slot
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * Show loading state with spinner icon
	 * @default false
	 */
	loading?: boolean;
	/**
	 * Custom text to display during loading state
	 */
	loadingText?: React.ReactNode;
	/**
	 * Icon to display on the left side of the button
	 */
	leftIcon?: React.ReactElement;
	/**
	 * Icon to display on the right side of the button
	 */
	rightIcon?: React.ReactElement;
}

function Button({
	className,
	variant = 'primary',
	size,
	asChild = false,
	children,
	loading,
	loadingText,
	leftIcon,
	rightIcon,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : 'button';
	const groupCtx = React.useContext(ButtonGroupContext);
	const resolvedSize = size ?? groupCtx?.size ?? 'md';
	if (asChild) {
		return (
			<Comp
				data-slot="button"
				className={cn(buttonVariants({ variant }), buttonSizeVariants({ size: resolvedSize }), className)}
				{...props}
			>
				{children}
			</Comp>
		);
	}

	const hasLeftIcon = !!(leftIcon && !loading);
	const hasRightIcon = !!(rightIcon && !loading);

	return (
		<Comp
			data-slot="button"
			data-left-icon={hasLeftIcon ? '' : undefined}
			data-right-icon={hasRightIcon ? '' : undefined}
			className={cn(buttonVariants({ variant }), buttonSizeVariants({ size: resolvedSize }), className)}
			{...props}
		>
			{hasLeftIcon && (
				<Icon
					icon={leftIcon!}
					size={resolvedSize}
					className={cn('icon icon-left')}
					fill="inherit"
				/>
			)}
			{loading ? (
				<>
					<Spinner
						className="animate-spin text-current !p-0 !fill-none size-4"
						aria-hidden="true"
					/>
					{loadingText && <span className="ml-2">{loadingText}</span>}
				</>
			) : (
				children
			)}
			{hasRightIcon && (
				<Icon
					icon={rightIcon!}
					size={resolvedSize}
					className={cn('icon icon-right')}
					fill="inherit"
				/>
			)}
		</Comp>
	);
}

export { Button };

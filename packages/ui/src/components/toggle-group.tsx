'use client';

import * as React from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';
import { toggleVariants } from './toggle';
import { toggleGroupRoundingClasses } from './button-variants';

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
	size: 'md',
	variant: 'secondary',
});
function ToggleGroup({
	className,
	variant,
	size,
	children,
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>) {
	return (
		<ToggleGroupPrimitive.Root
			data-slot="toggle-group"
			data-variant={variant}
			data-size={size}
			className={cn('group/toggle-group flex w-fit items-center rounded-md', className)}
			{...props}
		>
			<ToggleGroupContext.Provider value={{ variant, size }}>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	);
}
function ToggleGroupItem({
	className,
	children,
	variant,
	size,
	leftIcon,
	rightIcon,
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
	VariantProps<typeof toggleVariants> & {
		leftIcon?: React.ReactNode;
		rightIcon?: React.ReactNode;
	}) {
	const context = React.useContext(ToggleGroupContext);
	const currentSize = context.size || size || 'md';
	const roundingClasses = toggleGroupRoundingClasses[currentSize];
	const leftIconSpacing = size === 'sm' ? 'mr-1' : size === 'xs' ? 'mr-0.5' : 'mr-2';
	const rightIconSpacing = size === 'sm' ? 'ml-1' : size === 'xs' ? 'ml-0.5' : 'ml-2';

	return (
		<ToggleGroupPrimitive.Item
			data-slot="toggle-group-item"
			data-variant={context.variant || variant}
			data-size={currentSize}
			className={cn(
				toggleVariants({
					variant: context.variant || variant,
					size: currentSize,
				}),
				'min-w-0 shrink-0 rounded-none',
				roundingClasses,
				'focus:z-10 focus-visible:z-10 border-l-0 first:border-l',
				className
			)}
			{...props}
		>
			{leftIcon && <span className={cn(leftIconSpacing, 'icon')}>{leftIcon}</span>}
			{children}
			{rightIcon && <span className={cn(rightIconSpacing, 'icon')}>{rightIcon}</span>}
		</ToggleGroupPrimitive.Item>
	);
}
export { ToggleGroup, ToggleGroupItem };

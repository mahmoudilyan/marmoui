'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { buttonSizeVariants, buttonVariants } from './button-variants';

import { cn } from '../lib/utils';
type ButtonSizeKey = NonNullable<VariantProps<typeof buttonSizeVariants>['size']>;

const createVariantMap = <TKey extends string>(
	keys: readonly TKey[],
	getClassName: (key: TKey) => string
): Record<TKey, string> =>
	keys.reduce<Record<TKey, string>>(
		(acc, key) => {
			acc[key] = getClassName(key);
			return acc;
		},
		{} as Record<TKey, string>
	);

const toggleVariants = cva('', {
	variants: {
		variant: {
			secondary: buttonVariants({ variant: 'secondary' }),
		},
		size: createVariantMap<ButtonSizeKey>(['md', 'sm', 'xs', 'lg'] as const, size =>
			buttonSizeVariants({ size })
		),
	},
	defaultVariants: {
		variant: 'secondary',
		size: 'md',
	},
});

function Toggle({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive.Root
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

type ButtonGroupSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonGroupContextValue {
	size: ButtonGroupSize;
}

export const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(null);

const buttonGroupVariants = cva('inline-flex', {
	variants: {
		attached: {
			// The outer boundary belongs to the group itself, not to whichever
			// child happens to be first/last — so it stays visible regardless
			// of any button's hover/focus/active state.
			true: '[&>*]:focus:z-10 [&>*]:hover:z-10 rounded-md border border-border-secondary overflow-hidden',
			false: 'gap-2',
		},
		orientation: {
			horizontal: 'flex-row items-center',
			vertical: 'flex-col',
		},
	},
	compoundVariants: [
		{
			attached: true,
			orientation: 'horizontal',
			class:
				'[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-px',
		},
		{
			attached: true,
			orientation: 'vertical',
			class:
				'[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:-mt-px [&>*]:w-full',
		},
	],
	defaultVariants: {
		attached: true,
		orientation: 'horizontal',
	},
});

export interface ButtonGroupProps
	extends React.ComponentProps<'div'>, VariantProps<typeof buttonGroupVariants> {
	children: React.ReactNode;
	size?: ButtonGroupSize;
}

function ButtonGroup({
	className,
	attached = true,
	orientation = 'horizontal',
	size = 'md',
	children,
	...props
}: ButtonGroupProps) {
	return (
		<ButtonGroupContext.Provider value={{ size }}>
			<div
				data-slot="button-group"
				className={cn(buttonGroupVariants({ attached, orientation, className }))}
				role="group"
				{...props}
			>
				{children}
			</div>
		</ButtonGroupContext.Provider>
	);
}

export { ButtonGroup, buttonGroupVariants };

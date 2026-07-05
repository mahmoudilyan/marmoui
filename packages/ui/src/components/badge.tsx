import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const badgeVariants = cva(
	'inline-flex gap-1 items-center text-ink-dark rounded font-medium leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				normal: 'bg-secondary text-ink-dark border-transparent',
				success: 'bg-green-100 text-ink-dark border-transparent',
				warning: 'bg-yellow-100 text-ink-dark border-transparent',
				info: 'bg-blue-100 text-ink-dark border-transparent',
				destructive: 'bg-red-100 text-ink-dark border-transparent',
			},
			size: {
				sm: 'px-space-xs body-xs h-space-lg',
				md: 'px-space-xs body-xs h-space-xl',
			},
		},
		defaultVariants: {
			variant: 'normal',
			size: 'md',
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

function Badge({
	className,
	variant = 'normal',
	size,
	leftIcon,
	rightIcon,
	children,
	...props
}: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant, size }), className)} {...props}>
			{leftIcon}
			{children}
			{rightIcon}
		</div>
	);
}

export { Badge, badgeVariants };

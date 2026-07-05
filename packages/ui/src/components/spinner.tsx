import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const spinnerVariants = cva('animate-spin inline-block', {
	variants: {
		size: {
			xs: 'size-3 border-[1.5px]',
			sm: 'size-4 border-2',
			md: 'size-5 border-2',
			lg: 'size-6 border-2',
			xl: 'size-8 border-[3px]',
		},
		variant: {
			primary: 'text-primary-solid',
			secondary: 'text-ink-dark',
			ghost: 'text-ink-dark',
			'ghost-body': 'text-ink-dark',
			destructive: 'text-white',
		},
	},
	defaultVariants: {
		size: 'md',
		variant: 'primary',
	},
});

const labelSizeMap = {
	xs: 'text-xs',
	sm: 'text-sm',
	md: 'text-sm',
	lg: 'text-base',
	xl: 'text-lg',
} as const;

export interface SpinnerProps
	extends Omit<React.ComponentProps<'span'>, 'size'>,
		VariantProps<typeof spinnerVariants> {
	/**
	 * Accessible label (always used for aria-label).
	 * When `showLabel` is true, the label is also rendered visually.
	 */
	label?: string;
	/**
	 * Render the label text visually next to the spinner.
	 * @default false
	 */
	showLabel?: boolean;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
	({ className, size, variant, label = 'Loading...', showLabel = false, ...props }, ref) => {
		const spinner = (
			<span
				className={cn(
					'rounded-full border-current/20 border-t-current',
					spinnerVariants({ size, variant }),
					!showLabel && className
				)}
			/>
		);

		if (showLabel) {
			return (
				<span
					ref={ref}
					role="status"
					aria-label={label}
					className={cn('inline-flex items-center gap-2', className)}
					{...props}
				>
					{spinner}
					<span className={cn('text-ink', labelSizeMap[size ?? 'md'])}>{label}</span>
				</span>
			);
		}

		return (
			<span
				ref={ref}
				role="status"
				aria-label={label}
				className={cn(
					'rounded-full border-current/20 border-t-current',
					spinnerVariants({ size, variant }),
					className
				)}
				{...props}
			>
				<span className="sr-only">{label}</span>
			</span>
		);
	}
);

Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants };

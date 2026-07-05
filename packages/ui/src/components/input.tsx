import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const inputVariants = cva(
	'flex w-full border bg-panel text-sm text-ink file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ink-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-[border-color,box-shadow]',
	{
		variants: {
			variant: {
				normal:
					'border-border-input hover:border-border-hover focus-visible:border-primary-solid focus-visible:ring-[2px] focus-visible:ring-primary-bright',
				destructive:
					'border-destructive-solid ring-[2px] ring-red-200 focus-visible:ring-[2px] focus-visible:ring-red-200',
				success:
					'border-success-solid ring-[3px] ring-green-200 focus-visible:ring-[3px] focus-visible:ring-green-200',
				warning:
					'border-yellow-500 ring-[2px] ring-yellow-200 focus-visible:ring-[2px] focus-visible:ring-yellow-200',
			},
			size: {
				sm: 'h-8 px-3 py-1 text-xs rounded-sm',
				md: 'h-9 px-3 py-1 rounded-md',
				lg: 'h-12 px-3 py-2 text-base rounded-md',
			},
		},
		defaultVariants: {
			variant: 'normal',
			size: 'md',
		},
	}
);

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, variant = 'normal', size = 'md', type, startAdornment, endAdornment, ...props },
		ref
	) => {
		if (startAdornment || endAdornment) {
			return (
				<div className="relative flex items-center">
					{startAdornment && (
						<div className="absolute left-3 z-10 flex items-center text-ink-light">
							{startAdornment}
						</div>
					)}
					<input
						type={type}
						className={cn(
							inputVariants({ variant, size }),
							startAdornment && 'pl-10',
							endAdornment && 'pr-10',
							className
						)}
						ref={ref}
						{...props}
					/>
					{endAdornment && (
						<div className="absolute right-3 z-10 flex items-center text-ink-light">
							{endAdornment}
						</div>
					)}
				</div>
			);
		}

		return (
			<input
				type={type}
				className={cn(inputVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input, inputVariants };

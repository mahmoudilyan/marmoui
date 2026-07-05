'use client';

import * as React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';

const SliderRoot = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn('relative flex w-full touch-none select-none items-center', className)}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
			<SliderPrimitive.Range className="absolute h-full bg-primary" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
	</SliderPrimitive.Root>
));
SliderRoot.displayName = SliderPrimitive.Root.displayName;

// Enhanced Slider component that matches the Chakra UI API
export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
	marks?: Array<number | { value: number; label: React.ReactNode }>;
	label?: React.ReactNode;
	showValue?: boolean;
	size?: 'sm' | 'md' | 'lg';
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
	(
		{
			marks: marksProp,
			label,
			showValue = false,
			size = 'md',
			className,
			value,
			defaultValue,
			...rest
		},
		ref
	) => {
		const currentValue = value ?? defaultValue ?? [0];
		const displayValue = Array.isArray(currentValue) ? currentValue[0] : currentValue;

		const marks = marksProp?.map(mark => {
			if (typeof mark === 'number') return { value: mark, label: undefined };
			return mark;
		});

		const hasMarkLabel = !!marks?.some(mark => mark.label);

		const sizeClasses = {
			sm: {
				track: 'h-1',
				thumb: 'h-4 w-4',
			},
			md: {
				track: 'h-2',
				thumb: 'h-5 w-5',
			},
			lg: {
				track: 'h-3',
				thumb: 'h-6 w-6',
			},
		};

		return (
			<div className={cn('w-full space-y-2', className)}>
				{/* Header with label and value */}
				{(label || showValue) && (
					<div className="flex justify-between items-center">
						{label && (
							<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
								{label}
							</label>
						)}
						{showValue && <span className="text-sm text-muted-foreground">{displayValue}</span>}
					</div>
				)}

				{/* Slider control */}
				<div className={cn('relative', hasMarkLabel && 'mb-8')}>
					<SliderPrimitive.Root
						ref={ref}
						className="relative flex w-full touch-none select-none items-center"
						value={value}
						defaultValue={defaultValue}
						{...rest}
					>
						<SliderPrimitive.Track
							className={cn(
								'relative w-full grow overflow-hidden rounded-full bg-secondary',
								sizeClasses[size].track
							)}
						>
							<SliderPrimitive.Range className="absolute h-full bg-primary" />
						</SliderPrimitive.Track>
						{currentValue?.map((_, index) => (
							<SliderPrimitive.Thumb
								key={index}
								className={cn(
									'block rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
									sizeClasses[size].thumb
								)}
							/>
						))}
					</SliderPrimitive.Root>

					{/* Marks */}
					{marks && marks.length > 0 && (
						<div className="relative mt-2">
							{marks.map((mark, index) => {
								const markValue = typeof mark === 'number' ? mark : mark.value;
								const markLabel = typeof mark === 'number' ? undefined : mark.label;
								const min = rest.min ?? 0;
								const max = rest.max ?? 100;
								const percentage = ((markValue - min) / (max - min)) * 100;

								return (
									<div
										key={index}
										className="absolute transform -translate-x-1/2"
										style={{ left: `${percentage}%` }}
									>
										{/* Mark indicator */}
										<div className="w-1 h-1 bg-border rounded-full" />
										{/* Mark label */}
										{markLabel && (
											<div className="mt-1 text-xs text-muted-foreground text-center whitespace-nowrap">
												{markLabel}
											</div>
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		);
	}
);

Slider.displayName = 'Slider';

export { Slider, SliderRoot };

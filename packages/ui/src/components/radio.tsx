'use client';

import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';

const RadioGroup = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
	return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const Radio = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			data-slot="radio"
			className={cn(
				'peer bg-panel border-border-input',
				'data-[state=checked]:border-primary-solid',
				'focus-visible:ring-[3px] focus-visible:ring-ring',
				'size-4 shrink-0 rounded-full border transition-colors outline-none',
				'flex items-center justify-center',
				'disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator
				data-slot="radio-indicator"
				className="flex items-center justify-center"
			>
				<div className="size-2 rounded-full bg-primary-solid" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
});
Radio.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, Radio };

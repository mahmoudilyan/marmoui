import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { Check } from '@phosphor-icons/react';
import { cn } from '../lib/utils';

const CheckboxComponent = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentProps<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
	return (
		<CheckboxPrimitive.Root
			ref={ref}
			data-slot="checkbox"
			className={cn(
				'peer bg-panel border-border-input',
				'data-[state=checked]:bg-primary-solid data-[state=checked]:text-primary-contrast data-[state=checked]:border-primary-solid',
				'focus-visible:bg-primary-bright aria-invalid:red-200 aria-invalid:border-destructive size-4',
				'shrink-0 rounded-xs border transition-border outline-none focus-visible:ring-[3px]',
				'disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-primary-contrast transition-none"
			>
				<Check weight="regular" className="size-3.5 text-primary-contrast" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
});

CheckboxComponent.displayName = 'Checkbox';

// Memoize for better performance
const Checkbox = React.memo(CheckboxComponent);

export { Checkbox };

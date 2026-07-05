import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';

// Shadcn-style single Progress component (Radix-based)
const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className="h-full w-full flex-1 bg-primary transition-all"
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// Compatibility group API similar to Chakra usage in app code
interface ProgressContextValue {
	value?: number;
}

const ProgressContext = React.createContext<ProgressContextValue>({ value: 0 });

interface ProgressRootProps extends React.HTMLAttributes<HTMLDivElement> {
	value?: number;
}

function ProgressRoot({ value = 0, className, children, ...rest }: ProgressRootProps) {
	return (
		<ProgressContext.Provider value={{ value }}>
			<div className={className} {...rest}>
				{children}
			</div>
		</ProgressContext.Provider>
	);
}

function ProgressLabel({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('text-ink', className)} {...rest}>
			{children}
		</div>
	);
}

function ProgressBar({ className, style, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
	const { value = 0 } = React.useContext(ProgressContext);
	return (
		<div
			className={cn('w-full h-1 rounded-full bg-secondary overflow-hidden', className)}
			{...rest}
		>
			<div
				className="h-full bg-primary-solid transition-all"
				style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
			/>
		</div>
	);
}

export { Progress, ProgressRoot, ProgressBar, ProgressLabel };

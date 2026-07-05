import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '../lib/utils';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
	as?: React.ElementType;
	asChild?: boolean;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
	({ className, as: Component = 'div', asChild = false, ...props }, ref) => {
		const Comp = asChild ? (Slot as unknown as React.ElementType) : Component;

		return <Comp ref={ref} className={cn(className)} {...props} />;
	}
);

Box.displayName = 'Box';

export { Box };

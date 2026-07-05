import * as React from 'react';
import { Box, type BoxProps } from './box';
import { cn } from '../lib/utils';

export interface FlexProps extends BoxProps {
	// Flex direction
	direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
	// Flex wrap
	wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
	// Align items
	align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
	// Justify content
	justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
	// Gap
	gap?: string;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
	({ className, direction, wrap, align, justify, gap, ...props }, ref) => {
		const flexClasses = cn(
			'flex',
			direction && `flex-${direction}`,
			wrap && `flex-${wrap}`,
			align && `items-${align}`,
			justify && `justify-${justify}`,
			gap && `gap-${gap}`,
			className
		);

		return <Box ref={ref} className={flexClasses} {...props} />;
	}
);

Flex.displayName = 'Flex';

export { Flex };

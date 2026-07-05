import * as React from 'react';
import { cn } from '../lib/utils';
import { Star } from '@phosphor-icons/react';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
	icon?: React.ReactElement;
	count?: number;
	value?: number;
	label?: React.ReactNode;
	readOnly?: boolean;
	onValueChange?: (value: number) => void;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(function Rating(props, ref) {
	const {
		icon,
		count = 5,
		value = 0,
		label,
		readOnly = false,
		onValueChange,
		className,
		...rest
	} = props;

	const [hoveredValue, setHoveredValue] = React.useState(0);

	const IconComponent = icon || <Star weight="fill" className="w-4 h-4" />;

	return (
		<div ref={ref} className={cn('flex items-center gap-2', className)} {...rest}>
			{label && <span className="text-sm font-medium text-foreground">{label}</span>}
			<div className="flex items-center gap-1">
				{Array.from({ length: count }).map((_, index) => {
					const starValue = index + 1;
					const isFilled = (hoveredValue || value) >= starValue;

					return (
						<button
							key={index}
							type="button"
							disabled={readOnly}
							className={cn(
								'transition-colors duration-200',
								!readOnly && 'hover:scale-110 cursor-pointer',
								readOnly && 'cursor-default',
								isFilled ? 'text-yellow-500' : 'text-muted-foreground'
							)}
							onClick={() => !readOnly && onValueChange?.(starValue)}
							onMouseEnter={() => !readOnly && setHoveredValue(starValue)}
							onMouseLeave={() => !readOnly && setHoveredValue(0)}
							aria-label={`Rate ${starValue} stars`}
						>
							{React.cloneElement(IconComponent, {
								className: cn(IconComponent.props.className, isFilled && 'fill-current'),
							})}
						</button>
					);
				})}
			</div>
		</div>
	);
});

'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Checkbox } from './checkbox';

export interface AvatarCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	hiddenAvatar?: boolean;
	isHovered?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'xs';
	src?: string;
	name?: string;
	fallback?: string;
	variant?:
		| 'normal'
		| 'blue'
		| 'red'
		| 'yellow'
		| 'orange'
		| 'purple'
		| 'pink'
		| 'green'
		| 'indigo'
		| 'teal';
}

const AvatarCheckboxComponent = React.forwardRef<HTMLDivElement, AvatarCheckboxProps>(
	function AvatarCheckbox(
		{
			checked,
			onCheckedChange,
			hiddenAvatar,
			isHovered = false,
			size = 'md',
			src,
			name,
			fallback,
			variant = 'normal',
			className,
			'aria-label': ariaLabel,
			...props
		},
		ref
	) {
		const isAvatarHidden = hiddenAvatar || checked;

		const sizeMap = {
			xs: 'h-6 w-6',
			sm: 'h-8 w-8',
			md: 'h-10 w-10',
			lg: 'h-12 w-12',
		};

		const checkboxSizeMap = {
			xs: 'h-3 w-3',
			sm: 'h-4 w-4',
			md: 'h-4 w-4',
			lg: 'h-5 w-5',
		};

		// Handle Radix UI CheckedState (boolean | 'indeterminate')
		const handleCheckedChange = React.useCallback(
			(checkedState: boolean | 'indeterminate') => {
				if (onCheckedChange && typeof checkedState === 'boolean') {
					onCheckedChange(checkedState);
				}
			},
			[onCheckedChange]
		);

		return (
			<div className={cn('relative', sizeMap[size], className)} ref={ref} {...props}>
				<Avatar
					className={cn(
						'transition-opacity duration-100',
						isHovered || isAvatarHidden ? 'opacity-0' : 'opacity-100',
						sizeMap[size]
					)}
				>
					<AvatarImage src={src} alt={name} />
					<AvatarFallback variant={variant}>{fallback || name?.[0]?.toUpperCase()}</AvatarFallback>
				</Avatar>
				<div
					className={cn(
						'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-100',
						isHovered || isAvatarHidden ? 'opacity-100' : 'opacity-0'
					)}
				>
					<Checkbox
						checked={checked}
						onCheckedChange={handleCheckedChange}
						aria-label={ariaLabel}
						className={checkboxSizeMap[size]}
					/>
				</div>
			</div>
		);
	}
);

AvatarCheckboxComponent.displayName = 'AvatarCheckbox';

// Memoize the component to prevent unnecessary re-renders
export const AvatarCheckbox = React.memo(AvatarCheckboxComponent);

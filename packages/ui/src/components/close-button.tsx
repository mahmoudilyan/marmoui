import { Button, ButtonProps } from './button';
import * as React from 'react';
import { X } from '@phosphor-icons/react';
import { cn } from '../lib/utils';

export interface CloseButtonProps extends Omit<ButtonProps, 'variant'> {}

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
	function CloseButton(props, ref) {
		const { children, className, size = 'sm', ...rest } = props;

		return (
			<Button
				variant="ghost"
				size={size}
				aria-label="Close"
				ref={ref}
				className={cn('h-6 w-6 p-0', className)}
				{...rest}
			>
				{children ?? <X className="h-4 w-4" />}
			</Button>
		);
	}
);

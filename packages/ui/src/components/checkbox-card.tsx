'use client';

import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { Check } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Label } from './label';
import { Icon } from './icon';

const CheckboxCardGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return <div className={cn('grid gap-2', className)} {...props} ref={ref} />;
	}
);
CheckboxCardGroup.displayName = 'CheckboxCardGroup';

export interface CheckboxCardItemProps extends React.ComponentPropsWithoutRef<
	typeof CheckboxPrimitive.Root
> {
	rootRef?: React.Ref<HTMLDivElement>;
	icon?: React.ReactElement;
	label?: React.ReactNode;
	description?: React.ReactNode;
	addon?: React.ReactNode;
	indicator?: React.ReactNode | null;
	indicatorPlacement?: 'start' | 'end' | 'inside';
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const DefaultCheckboxIndicator = () => (
	<div
		className={cn(
			'flex size-4 shrink-0 items-center justify-center rounded-xs border border-border-input transition-colors',
			'group-has-data-[state=checked]/card:bg-primary-solid group-has-data-[state=checked]/card:border-primary-solid'
		)}
	>
		<Check
			weight="regular"
			className="size-3.5 text-primary-contrast opacity-0 group-has-data-[state=checked]/card:opacity-100 transition-opacity"
		/>
	</div>
);

const CheckboxCardItem = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	CheckboxCardItemProps
>(
	(
		{
			className,
			icon,
			label,
			description,
			addon,
			children,
			rootRef,
			inputProps,
			indicator,
			indicatorPlacement = 'end',
			...props
		},
		ref
	) => {
		const showIndicator = indicator !== null;
		const indicatorEl =
			indicator !== undefined && indicator !== null ? indicator : <DefaultCheckboxIndicator />;

		return (
			<div
				ref={rootRef}
				className={cn(
					'group/card relative flex w-full items-start gap-3 rounded-md border border-border bg-panel px-4 py-5 shadow-xs outline-none has-data-[state=checked]:border-border-primary has-data-[state=checked]:ring-1 has-data-[state=checked]:ring-border-primary has-data-[disabled]:opacity-50 has-data-[disabled]:pointer-events-none has-data-[disabled]:cursor-not-allowed',
					className
				)}
			>
				<CheckboxPrimitive.Root
					ref={ref}
					className="absolute inset-0 opacity-0 cursor-pointer"
					{...props}
				>
					<CheckboxPrimitive.Indicator />
				</CheckboxPrimitive.Root>
				{showIndicator && indicatorPlacement === 'start' && (
					<div className="pointer-events-none shrink-0 pt-0.5">{indicatorEl}</div>
				)}
				<div className="pointer-events-none flex grow items-start gap-4 [&_button]:pointer-events-auto [&_button]:relative [&_button]:z-10 [&_a]:pointer-events-auto [&_a]:relative [&_a]:z-10 [&_input]:pointer-events-auto [&_input]:relative [&_input]:z-10">
					{icon && (
						<div className="shrink-0 size-12 bg-bg flex items-center justify-center rounded-full text-icon">
							<Icon icon={icon} size="md" />
						</div>
					)}
					<div className="flex grow flex-col gap-1">
						{label && (
							<Label
								htmlFor={props.id}
								className="cursor-pointer text-ink-dark font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-5"
							>
								{label}
							</Label>
						)}
						{description && (
							<p
								id={props.id ? `${props.id}-description` : undefined}
								className="text-xs text-ink-light leading-5"
							>
								{description}
							</p>
						)}
						{children}
						{addon && <div className="mt-1">{addon}</div>}
					</div>
				</div>
				{showIndicator && indicatorPlacement === 'end' && (
					<div className="pointer-events-none shrink-0 pt-0.5">{indicatorEl}</div>
				)}
			</div>
		);
	}
);
CheckboxCardItem.displayName = CheckboxPrimitive.Root.displayName;

const CheckboxCardLabel = Label;

// Alias for consistency
const CheckboxCard = CheckboxCardGroup;

export { CheckboxCard, CheckboxCardGroup, CheckboxCardItem, CheckboxCardLabel };

'use client';

import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';
import { Label } from './label';
import { Icon } from './icon';

const RadioCard = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
	return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioCard.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioCardItemProps extends React.ComponentPropsWithoutRef<
	typeof RadioGroupPrimitive.Item
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

const DefaultRadioIndicator = () => (
	<div
		className={cn(
			'flex size-4 shrink-0 items-center justify-center rounded-full border border-border-input transition-colors',
			'group-has-data-[state=checked]/card:border-primary-solid'
		)}
	>
		<div className="size-2 rounded-full bg-primary-solid scale-0 group-has-data-[state=checked]/card:scale-100 transition-transform" />
	</div>
);

const RadioCardItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	RadioCardItemProps
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
			indicator !== undefined && indicator !== null ? indicator : <DefaultRadioIndicator />;

		return (
			<div
				ref={rootRef}
				className={cn(
					'group/card relative flex w-full items-start gap-3 rounded-md border border-border bg-panel px-4 py-5 shadow-xs outline-none has-data-[state=checked]:border-border-primary has-data-[state=checked]:ring-1 has-data-[state=checked]:ring-border-primary has-data-[disabled]:opacity-50 has-data-[disabled]:pointer-events-none has-data-[disabled]:cursor-not-allowed',
					className
				)}
			>
				<RadioGroupPrimitive.Item
					ref={ref}
					className="absolute inset-0 opacity-0 cursor-pointer"
					{...props}
				>
					<RadioGroupPrimitive.Indicator />
				</RadioGroupPrimitive.Item>
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
RadioCardItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioCardLabel = Label;

export { RadioCard, RadioCardItem, RadioCardLabel };

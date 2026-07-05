import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { Check, CaretDown, CaretUp } from '@phosphor-icons/react';
import { cn } from '../lib/utils';

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select" {...props} />;
}
function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}
function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}
function SelectTrigger({
	className,
	size = 'md',
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: 'sm' | 'md';
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"border-border-input bg-panel data-[placeholder]:text-ink-muted [&_svg:not([class*='text-'])]:text-icon",
				'flex w-fit items-center justify-between gap-2 rounded-md border px-3 py-1 text-sm whitespace-nowrap outline-none cursor-pointer',
				'transition-[border-color,box-shadow]',
				'hover:border-border-hover',
				'focus-visible:border-primary-solid focus-visible:ring-[2px] focus-visible:ring-primary-bright',
				'data-[state=open]:border-primary-solid data-[state=open]:ring-[2px] data-[state=open]:ring-primary-bright',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				'disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none',
				'data-[size=md]:min-h-9 data-[size=sm]:min-h-8',
				'*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1',
				"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<CaretDown className="size-4 text-icon" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}
function SelectContent({
	className,
	children,
	position = 'popper',
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				className={cn(
					'bg-panel text-ink data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border-secondary shadow-md',
					position === 'popper' &&
						'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
					className
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						'px-0 py-1.5',
						position === 'popper' &&
							'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}
function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn('px-2 py-1.5 caps-md text-ink-light font-medium data-[inset]:pl-8', className)}
			{...props}
		/>
	);
}
function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				'focus:bg-bg relative flex w-full cursor-pointer items-center gap-2 rounded-none px-3 py-2 pr-8 text-sm outline-hidden select-none transition-colors',
				'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				"[&_svg:not([class*='text-'])]:text-icon [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				'*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
				className
			)}
			{...props}
		>
			<span className="absolute right-2 flex size-4 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<Check className="size-4 text-primary-solid" weight="regular" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}
function SelectSeparator({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn('bg-border-secondary pointer-events-none -mx-1 my-1 h-px', className)}
			{...props}
		/>
	);
}
function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn('flex cursor-default items-center justify-center py-1', className)}
			{...props}
		>
			<CaretUp className="size-4" />
		</SelectPrimitive.ScrollUpButton>
	);
}
function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn('flex cursor-default items-center justify-center py-1', className)}
			{...props}
		>
			<CaretDown className="size-4" />
		</SelectPrimitive.ScrollDownButton>
	);
}
export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};

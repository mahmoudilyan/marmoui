'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';

const inputGroupVariants = cva(
	'group/input-group border-border-input relative flex w-full items-center border outline-none has-[>textarea]:h-auto bg-panel dark:border-gray-300 transition-[border-color,box-shadow]',
	{
		variants: {
			size: {
				sm: 'h-8 rounded-sm',
				md: 'h-10 rounded-md',
				lg: 'h-12 rounded-md',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	}
);

function InputGroup({
	className,
	size = 'md',
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupVariants>) {
	return (
		<div
			data-slot="input-group"
			data-size={size}
			role="group"
			className={cn(
				inputGroupVariants({ size }),
				// Variants based on alignment.
				'has-[>[data-align=inline-start]]:[&>input]:pl-2',
				'has-[>[data-align=inline-end]]:[&>input]:pr-2',
				'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
				'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',
				// Hover state.
				'hover:border-border-hover dark:hover:border-gray-400',
				// Focus state.
				'has-[[data-slot=input-group-control]:focus-visible]:border-primary-solid has-[[data-slot=input-group-control]:focus-visible]:ring-primary-bright has-[[data-slot=input-group-control]:focus-visible]:ring-[2px] ring-offset-0',
				// Error state - always visible ring.
				'has-[[data-slot][aria-invalid=true]]:ring-[2px] has-[[data-slot][aria-invalid=true]]:ring-red-200 has-[[data-slot][aria-invalid=true]]:border-destructive-solid dark:has-[[data-slot][aria-invalid=true]]:border-red-500',
				className
			)}
			{...props}
		/>
	);
}
const inputGroupAddonVariants = cva(
	"text-ink-light flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
	{
		variants: {
			align: {
				'inline-start': 'order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]',
				'inline-end': 'order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]',
				'block-start':
					'order-first w-full justify-start px-3 pt-2 [.border-b]:pb-2 group-has-[>input]/input-group:pt-2',
				'block-end':
					'order-last w-full justify-start px-3 pb-2 [.border-t]:pt-2 group-has-[>input]/input-group:pb-2',
			},
		},
		defaultVariants: {
			align: 'inline-start',
		},
	}
);
function InputGroupAddon({
	className,
	align = 'inline-start',
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
	return (
		<div
			role="group"
			data-slot="input-group-addon"
			data-align={align}
			className={cn(inputGroupAddonVariants({ align }), className)}
			onClick={e => {
				if ((e.target as HTMLElement).closest('button')) {
					return;
				}
				e.currentTarget.parentElement?.querySelector('input')?.focus();
			}}
			{...props}
		/>
	);
}
const inputGroupButtonVariants = cva('text-sm shadow-none flex gap-2 items-center', {
	variants: {
		size: {
			xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
			sm: 'h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5',
			'icon-xs': 'size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
			'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
		},
	},
	defaultVariants: {
		size: 'xs',
	},
});
function InputGroupButton({
	className,
	type = 'button',
	variant = 'ghost',
	size = 'xs',
	...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> &
	VariantProps<typeof inputGroupButtonVariants>) {
	return (
		<Button
			type={type}
			data-size={size}
			variant={variant}
			className={cn(inputGroupButtonVariants({ size }), className)}
			{...props}
		/>
	);
}
function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			className={cn(
				"text-ink-light flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	);
}
function InputGroupInput({
	className,
	size = 'md',
	...props
}: Omit<React.ComponentProps<'input'>, 'size'> & { size?: 'sm' | 'md' | 'lg' }) {
	return (
		<Input
			data-slot="input-group-control"
			size={size}
			className={cn(
				'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
				className
			)}
			{...props}
		/>
	);
}
function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<Textarea
			data-slot="input-group-control"
			className={cn(
				'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent',
				className
			)}
			{...props}
		/>
	);
}
export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupInput,
	InputGroupTextarea,
};

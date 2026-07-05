'use client';

import * as React from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import { Check, CaretRight, Circle } from '@phosphor-icons/react';
import { cn } from '../lib/utils';

const MenuRoot = DropdownMenuPrimitive.Root;
const MenuTrigger = DropdownMenuPrimitive.Trigger;
const MenuGroup = DropdownMenuPrimitive.Group;
const MenuPortal = DropdownMenuPrimitive.Portal;
const MenuSub = DropdownMenuPrimitive.Sub;
const MenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const MenuSubTrigger = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ref}
		className={cn(
			'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
			inset && 'pl-8',
			className
		)}
		{...props}
	>
		{children}
		<CaretRight className="ml-auto h-4 w-4" weight="fill" />
	</DropdownMenuPrimitive.SubTrigger>
));
MenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const MenuSubContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.SubContent
		ref={ref}
		className={cn(
			'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
			className
		)}
		{...props}
	/>
));
MenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const MenuContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className
			)}
			{...props}
		/>
	</DropdownMenuPrimitive.Portal>
));
MenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const MenuItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Item
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			inset && 'pl-8',
			className
		)}
		{...props}
	/>
));
MenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const MenuCheckboxItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			className
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Check className="h-4 w-4" weight="fill" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
));
MenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const MenuRadioItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
	<DropdownMenuPrimitive.RadioItem
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			className
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Circle className="h-2 w-2 text-current" weight="fill" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.RadioItem>
));
MenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const MenuLabel = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Label
		ref={ref}
		className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
		{...props}
	/>
));
MenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const MenuSeparator = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Separator
		ref={ref}
		className={cn('-mx-1 my-1 h-px bg-muted', className)}
		{...props}
	/>
));
MenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const MenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
	);
};
MenuShortcut.displayName = 'MenuShortcut';

// Additional wrapper components for easier migration from Chakra UI
interface MenuItemGroupProps extends React.ComponentPropsWithoutRef<typeof MenuGroup> {
	title?: string;
}

const MenuItemGroup = React.forwardRef<React.ElementRef<typeof MenuGroup>, MenuItemGroupProps>(
	({ title, children, ...props }, ref) => (
		<MenuGroup ref={ref} {...props}>
			{title && <MenuLabel>{title}</MenuLabel>}
			{children}
		</MenuGroup>
	)
);
MenuItemGroup.displayName = 'MenuItemGroup';

const MenuItemText = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
	<span className={cn('flex-1', className)} {...props} />
);
MenuItemText.displayName = 'MenuItemText';

const MenuItemCommand = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
	<MenuShortcut className={className} {...props} />
);
MenuItemCommand.displayName = 'MenuItemCommand';

// Enhanced trigger item for sub-menus
interface MenuTriggerItemProps extends React.ComponentPropsWithoutRef<typeof MenuSubTrigger> {
	startIcon?: React.ReactNode;
}

const MenuTriggerItem = React.forwardRef<
	React.ElementRef<typeof MenuSubTrigger>,
	MenuTriggerItemProps
>(({ startIcon, children, className, ...props }, ref) => (
	<MenuSubTrigger ref={ref} className={cn('gap-2', className)} {...props}>
		{startIcon}
		{children}
	</MenuSubTrigger>
));
MenuTriggerItem.displayName = 'MenuTriggerItem';

export {
	MenuRoot,
	MenuTrigger,
	MenuContent,
	MenuItem,
	MenuCheckboxItem,
	MenuRadioItem,
	MenuLabel,
	MenuSeparator,
	MenuShortcut,
	MenuGroup,
	MenuPortal,
	MenuSub,
	MenuSubContent,
	MenuSubTrigger,
	MenuRadioGroup,
	MenuItemGroup,
	MenuItemText,
	MenuItemCommand,
	MenuTriggerItem,
};

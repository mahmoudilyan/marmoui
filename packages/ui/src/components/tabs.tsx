'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

interface TabsContextValue {
	variant?: 'line' | 'pill';
	orientation?: 'horizontal' | 'vertical';
}

const TabsContext = React.createContext<TabsContextValue>({
	variant: 'line',
	orientation: 'horizontal',
});

const useTabsContext = () => {
	const context = React.useContext(TabsContext);
	if (!context) {
		throw new Error('Tabs compound components must be used within Tabs');
	}
	return context;
};

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
	variant?: 'line' | 'pill';
	orientation?: 'horizontal' | 'vertical';
}

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
	({ variant = 'line', orientation = 'horizontal', className, ...props }, ref) => (
		<TabsContext.Provider value={{ variant, orientation }}>
			<TabsPrimitive.Root
				ref={ref}
				orientation={orientation}
				className={cn(
					orientation === 'vertical' &&
						'grid grid-cols-[var(--tabs-list-width,180px)_1fr] gap-6',
					className
				)}
				{...props}
			/>
		</TabsContext.Provider>
	)
);
Tabs.displayName = TabsPrimitive.Root.displayName;

const tabsListVariants = cva('inline-flex items-center', {
	variants: {
		variant: {
			line: 'gap-8',
			pill: 'gap-2',
		},
		orientation: {
			horizontal: 'flex-row border-b border-border',
			vertical: 'flex-col border-r border-border',
		},
	},
	compoundVariants: [
		{
			variant: 'line',
			orientation: 'horizontal',
			className: 'border-b border-border',
		},
		{
			variant: 'line',
			orientation: 'vertical',
			className: 'border-0 gap-1',
		},
		{
			variant: 'pill',
			orientation: 'horizontal',
			className: 'border-0',
		},
		{
			variant: 'pill',
			orientation: 'vertical',
			className: 'border-0 gap-1',
		},
	],
	defaultVariants: {
		variant: 'line',
		orientation: 'horizontal',
	},
});

const tabsTriggerVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-base font-medium text-ink-light transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				line: 'relative bg-transparent',
				pill: 'rounded',
			},
			orientation: {
				horizontal: '',
				vertical: '',
			},
		},
		compoundVariants: [
			{
				variant: 'line',
				orientation: 'horizontal',
				className:
					'data-[state=active]:text-ink-dark data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary-solid',
			},
			{
				variant: 'line',
				orientation: 'vertical',
				className:
					'w-full justify-end data-[state=active]:text-ink-dark data-[state=active]:after:absolute data-[state=active]:after:right-0 data-[state=active]:after:top-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-0.5 data-[state=active]:after:bg-primary-solid',
			},
			{
				variant: 'pill',
				orientation: 'horizontal',
				className: 'data-[state=active]:bg-secondary data-[state=active]:text-ink-dark hover:bg-bg',
			},
			{
				variant: 'pill',
				orientation: 'vertical',
				className:
					'w-full justify-end data-[state=active]:bg-secondary data-[state=active]:text-ink-dark hover:bg-bg',
			},
		],
		defaultVariants: {
			variant: 'line',
			orientation: 'horizontal',
		},
	}
);

export interface TabsListProps
	extends
		React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
		VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
	({ className, variant: variantProp, orientation: orientationProp, ...props }, ref) => {
		const context = useTabsContext();
		const variant = variantProp ?? context.variant;
		const orientation = orientationProp ?? context.orientation;

		return (
			<TabsPrimitive.List
				ref={ref}
				className={cn(tabsListVariants({ variant, orientation }), className)}
				{...props}
			/>
		);
	}
);
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
	extends
		React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
		VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	TabsTriggerProps
>(({ className, variant: variantProp, orientation: orientationProp, ...props }, ref) => {
	const context = useTabsContext();
	const variant = variantProp ?? context.variant;
	const orientation = orientationProp ?? context.orientation;

	return (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn('cursor-pointer', tabsTriggerVariants({ variant, orientation }), className)}
			{...props}
		/>
	);
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
	const { orientation } = useTabsContext();
	return (
		<TabsPrimitive.Content
			ref={ref}
			className={cn(
				orientation === 'vertical' ? '' : 'mt-2',
				'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				className
			)}
			{...props}
		/>
	);
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

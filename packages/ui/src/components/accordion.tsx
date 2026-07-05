import * as React from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { CaretDown } from '@phosphor-icons/react';
import { cn } from '../lib/utils';

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

const AccordionItem = React.forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn('border-b border-border-secondary bg-bg px-4 py-2 mb-2 rounded-md', className)}
		{...props}
	/>
));

function AccordionTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					'flex flex-1 items-center justify-between py-3 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
					className
				)}
				{...props}
			>
				{children}
				<CaretDown className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}
function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-sm"
			{...props}
		>
			<div className={cn('pt-0 pb-4', className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
}

// function AccordionContent({
//   className,
//   children,
//   ...props
// }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
//   return (
//     <AccordionPrimitive.Content
//       data-slot="accordion-content"
// 			className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"

// 		className="overflow-hidden border-t border-border-secondary text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
// 		{...props}
// 	>
// 		<div className={cn('pb-4 pt-4', className)}>{children}</div>
// 	</AccordionPrimitive.Content>
// ));

export { Accordion, AccordionTrigger, AccordionItem, AccordionContent };

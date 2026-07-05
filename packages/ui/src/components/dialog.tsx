import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { X } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { cva } from 'class-variance-authority';
import { IconButton } from './icon-button';

export const dialogVariants = cva('', {
	variants: {
		size: {
			sm: 'w-[320px]',
			md: 'w-[620px] sm:max-w-full',
			lg: 'w-[980px] sm:max-w-full',
			xl: 'w-[1120px] sm:max-w-full',
			full: '', // full-screen layout is applied directly in DialogContent
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
				className
			)}
			{...props}
		/>
	);
}
function DialogContent({
	className,
	children,
	showCloseButton = true,
	size = 'md',
	outsideScroll = false,
	scrollable = false,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	showCloseButton?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
	/** When true the overlay becomes the scroll container — the dialog grows naturally
	 *  and the user scrolls the backdrop rather than an internal content area. */
	outsideScroll?: boolean;
	/** When true the dialog gets a max-height and switches to flex-col layout so an
	 *  internal ScrollArea can expand while the header and footer stay pinned. */
	scrollable?: boolean;
}) {
	const closeButton = showCloseButton && (
		<DialogPrimitive.Close
			data-slot="dialog-close"
			className={cn(
				'ring-offset-background focus:ring-ring absolute top-4 right-4 rounded h-8 w-8 flex items-center justify-center',
				'bg-panel hover:bg-bg hover:text-ink-dark cursor-pointer data-[state=open]:text-ink transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none:size-4',
				'[[data-slot=dialog-content]:has([data-slot=dialog-header])_&]:top-3'
			)}
		>
			<X />
			<span className="sr-only">Close</span>
		</DialogPrimitive.Close>
	);

	if (outsideScroll) {
		const resolvedSize = size === 'full' ? 'md' : (size as 'sm' | 'md' | 'lg' | 'xl');
		return (
			<DialogPortal>
				<DialogOverlay />
				{/*
				 * DialogPrimitive.Content IS the scroll container.
				 * react-remove-scroll wraps this element, so scroll within it is allowed.
				 * We suppress Radix's pointer-down dismiss and use DialogPrimitive.Close
				 * on the backdrop flex area instead so click-outside still closes the dialog.
				 */}
				<DialogPrimitive.Content
					data-slot="dialog-content"
					data-size={size}
					onPointerDownOutside={(e) => e.preventDefault()}
					onInteractOutside={(e) => e.preventDefault()}
					{...props}
					className="fixed inset-0 z-50 overflow-y-auto duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
				>
					<DialogPrimitive.Close asChild>
						{/* Clicking this outer area (the backdrop) closes the dialog */}
						<div className="flex min-h-full items-start justify-center py-8 px-4 cursor-default">
							{/* stopPropagation prevents panel clicks from bubbling to the Close above */}
							<div
								className={cn(
									'bg-panel relative grid border p-6 shadow-lg rounded-lg duration-200',
									'w-full max-w-[calc(100%-2rem)]',
									dialogVariants({ size: resolvedSize }),
									className
								)}
								onClick={(e) => e.stopPropagation()}
								onPointerDown={(e) => e.stopPropagation()}
							>
								{children}
								{closeButton}
							</div>
						</div>
					</DialogPrimitive.Close>
				</DialogPrimitive.Content>
			</DialogPortal>
		);
	}

	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				data-size={size}
				className={cn(
					'bg-panel data-[state=open]:animate-in data-[state=closed]:animate-out',
					'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
					'fixed z-50 grid border p-6 shadow-lg duration-200',
					size === 'full'
						? 'inset-0 rounded-none grid-rows-[auto_1fr_auto]'
						: cn(
								'top-1/2 left-1/2 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg',
								// scrollable: add grid rows so the 1fr middle row gives ScrollArea a
						// concrete height that h-full on the viewport can resolve against
								scrollable && 'max-h-[80vh] grid-rows-[auto_1fr_auto] overflow-hidden',
								dialogVariants({ size })
							),
					className
				)}
				{...props}
			>
				{children}
				{closeButton}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				'flex flex-col gap-2 text-center sm:text-left shrink-0 -ml-6 -mr-6 -mt-6 [box-shadow:inset_0_-1px_0_var(--color-border-secondary)] px-6 py-4',
				className
			)}
			{...props}
		/>
	);
}
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6',
				// in full-screen dialogs the footer is a grid row — no top margin needed
				'[[data-slot=dialog-content][data-size=full]_&]:mt-0',
				className
			)}
			{...props}
		/>
	);
}
function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn(
				'text-ink-dark font-medium mb-2 pr-10 in-data-[slot=dialog-header]:mb-0 in-data-[slot=dialog-header]:pr-0',
				className
			)}
			{...props}
		/>
	);
}
function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn('text-sm mb-2 in-data-[slot=dialog-header]:mb-0', className)}
			{...props}
		/>
	);
}
export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};

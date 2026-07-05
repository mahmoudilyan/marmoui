'use client';

import * as React from 'react';
import { DotsSixVertical } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import type { SortableItemRenderProps } from './drag-drop/sortable-grid';

export type WidgetDragHandleProps = SortableItemRenderProps['dragHandleProps'];
export type WidgetContainerProps = SortableItemRenderProps['containerProps'];

export interface WidgetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
	/** Widget title rendered as CardTitle inside CardHeader. Omit to render a headerless widget. */
	title?: React.ReactNode;
	/** Filter controls rendered on a second row of CardHeader (Select, DatePicker, etc.). */
	filters?: React.ReactNode;
	/** Trailing controls rendered to the right of the title (IconButton, menu). */
	actions?: React.ReactNode;
	/** Footer slot rendered below CardContent. Use for Pagination on table widgets. */
	footer?: React.ReactNode;
	/**
	 * dnd-kit drag handle props from `SortableGrid` / `SortableItem` render callback.
	 * When present, Widget renders the drag-handle button and wires it to dnd-kit.
	 * Omit when the Widget is not part of a sortable context.
	 */
	dragHandleProps?: WidgetDragHandleProps;
	/** Override the drag handle aria-label. Only applies when `dragHandleProps` is set. */
	dragHandleLabel?: string;
	/** Hide the visible drag handle button while keeping the dnd-kit listeners attached. */
	hideDragHandle?: boolean;
	/** Visually indicate the widget is currently being dragged. Wired by the SortableGrid render callback. */
	isDragging?: boolean;
	/** Visually indicate this widget is the active drop target. */
	isDropTarget?: boolean;
	/** Class applied to the underlying Card. */
	className?: string;
	/** Class applied to CardHeader. */
	headerClassName?: string;
	/** Class applied to CardContent. */
	contentClassName?: string;
	/** Class applied to footer wrapper. */
	footerClassName?: string;
	children?: React.ReactNode;
}

const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(function Widget(
	{
		title,
		filters,
		actions,
		footer,
		dragHandleProps,
		dragHandleLabel = 'Drag to reorder widget',
		hideDragHandle = false,
		isDragging = false,
		isDropTarget = false,
		className,
		headerClassName,
		contentClassName,
		footerClassName,
		children,
		...rest
	},
	ref
) {
	const hasFilters = Boolean(filters);
	const hasTitle = title != null && title !== false && title !== '';
	const hasActions = Boolean(actions);
	const hasHeader = hasTitle || hasActions || hasFilters;
	const sortable = Boolean(dragHandleProps);
	const showDragHandle = sortable && !hideDragHandle;

	const dragHandleButton =
		showDragHandle && dragHandleProps ? (
			<button
				type="button"
				ref={dragHandleProps.ref}
				{...dragHandleProps.attributes}
				{...dragHandleProps.listeners}
				data-drag-handle={dragHandleProps['data-drag-handle']}
				aria-label={dragHandleLabel}
				className={cn(
					'absolute z-10 flex size-6 items-center justify-center rounded text-ink-light',
					'cursor-grab -left-[3px] top-1/2 -translate-y-1/2',
					'opacity-0 transition-opacity duration-150',
					'group-hover/widget:opacity-100 focus-visible:opacity-100 data-[dragging=true]:opacity-100',
					'hover:text-ink-dark',
					'active:cursor-grabbing',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-solid'
				)}
				data-dragging={isDragging ? 'true' : undefined}
			>
				<DotsSixVertical className="size-4" aria-hidden />
			</button>
		) : null;

	return (
		<Card
			ref={ref}
			data-sortable={sortable ? 'true' : undefined}
			data-dragging={isDragging ? 'true' : undefined}
			data-drop-target={isDropTarget ? 'true' : undefined}
			className={cn(
				'group/widget relative flex h-full flex-col',
				sortable && 'transition-shadow',
				isDragging && 'opacity-60 shadow-lg ring-2 ring-primary-solid/40',
				isDropTarget && 'ring-2 ring-primary-solid',
				className
			)}
			{...rest}
		>
			{hasHeader && (
				<CardHeader className={cn('flex flex-col gap-2 px-4 py-3 relative', headerClassName)}>
					<div className="flex flex-row items-center justify-between gap-3">
						<div className="flex min-w-0 items-center gap-2">
							{hasTitle && (
								<CardTitle className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ink-dark [&>span:first-child]:truncate">
									{title}
								</CardTitle>
							)}
						</div>
						{hasActions && (
							<div className="-mt-1 flex shrink-0 items-center gap-1.5">{actions}</div>
						)}
					</div>
					{hasFilters && (
						<div className="flex min-w-0 items-center gap-2 *:min-w-0 *:shrink">{filters}</div>
					)}
					{dragHandleButton}
				</CardHeader>
			)}
			<CardContent
				className={cn(
					'flex flex-1 flex-col gap-3 p-4',
					hasHeader ? 'pt-3' : 'pt-4',
					contentClassName
				)}
			>
				{children}
				{!hasHeader && dragHandleButton}
			</CardContent>
			{footer && (
				<div
					className={cn(
						'flex items-center justify-end border-t border-border-secondary px-4 py-2',
						footerClassName
					)}
				>
					{footer}
				</div>
			)}
		</Card>
	);
});

Widget.displayName = 'Widget';

export { Widget };

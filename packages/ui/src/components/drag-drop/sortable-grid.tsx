'use client';

import * as React from 'react';
import {
	DndContext,
	type DndContextProps,
	type DragEndEvent,
	type DragStartEvent,
	KeyboardSensor,
	MeasuringStrategy,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	rectSortingStrategy,
	type SortingStrategy,
	useSortable,
	verticalListSortingStrategy,
	horizontalListSortingStrategy,
	sortableKeyboardCoordinates,
	arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface SortableItemRenderProps {
	id: string;
	isDragging: boolean;
	/**
	 * Spread onto the element that should be the grid/list child. Carries the
	 * dnd-kit node ref + transform/transition styles. The consumer's root takes
	 * the gridColumn / span styling so the layout flows correctly.
	 */
	containerProps: {
		ref: (node: HTMLElement | null) => void;
		style: React.CSSProperties;
		'data-sortable-item-id': string;
	};
	/**
	 * Spread onto the drag-handle button. Carries the dnd-kit activator ref +
	 * pointer/keyboard listeners. Use a real `<button>` so keyboard activation works.
	 */
	dragHandleProps: {
		ref: (node: HTMLElement | null) => void;
		attributes: ReturnType<typeof useSortable>['attributes'];
		listeners: ReturnType<typeof useSortable>['listeners'];
		'data-drag-handle': true;
	};
}

export interface SortableGridProps<T extends { id: string }> {
	items: T[];
	onReorder: (next: T[]) => void;
	strategy?: 'grid' | 'vertical' | 'horizontal';
	children: (item: T, render: SortableItemRenderProps) => React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	role?: string;
	ariaLabel?: string;
	containerRef?: React.Ref<HTMLDivElement>;
	onDragStartItem?: (id: string) => void;
	onDragEndItem?: (id: string) => void;
}

const strategies: Record<NonNullable<SortableGridProps<{ id: string }>['strategy']>, SortingStrategy> = {
	grid: rectSortingStrategy,
	vertical: verticalListSortingStrategy,
	horizontal: horizontalListSortingStrategy,
};

export function SortableGrid<T extends { id: string }>({
	items,
	onReorder,
	strategy = 'grid',
	children,
	className,
	style,
	role,
	ariaLabel,
	containerRef,
	onDragStartItem,
	onDragEndItem,
}: SortableGridProps<T>) {
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);

	const handleDragStart = (event: DragStartEvent) => {
		onDragStartItem?.(String(event.active.id));
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = items.findIndex((item) => item.id === active.id);
			const newIndex = items.findIndex((item) => item.id === over.id);
			if (oldIndex >= 0 && newIndex >= 0) {
				onReorder(arrayMove(items, oldIndex, newIndex));
			}
		}
		onDragEndItem?.(String(active.id));
	};

	return (
		<DragDropProvider sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<SortableContext items={items.map((item) => item.id)} strategy={strategies[strategy]}>
				<div ref={containerRef} className={className} style={style} role={role} aria-label={ariaLabel}>
					{items.map((item) => (
						<SortableItem key={item.id} id={item.id}>
							{(render) => children(item, render)}
						</SortableItem>
					))}
				</div>
			</SortableContext>
		</DragDropProvider>
	);
}

interface DragDropProviderProps {
	sensors?: DndContextProps['sensors'];
	onDragStart?: DndContextProps['onDragStart'];
	onDragEnd?: DndContextProps['onDragEnd'];
	onDragCancel?: DndContextProps['onDragCancel'];
	onDragOver?: DndContextProps['onDragOver'];
	children: React.ReactNode;
}

/**
 * Thin wrapper over dnd-kit's `DndContext`. Use when you need an explicit
 * provider boundary around a custom drag flow (e.g. dragging items from a
 * palette into a canvas). For simple sortable lists, prefer `SortableGrid`.
 */
export function DragDropProvider({
	sensors,
	onDragStart,
	onDragEnd,
	onDragCancel,
	onDragOver,
	children,
}: DragDropProviderProps) {
	const defaultSensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);
	return (
		<DndContext
			sensors={sensors ?? defaultSensors}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDragCancel={onDragCancel}
			onDragOver={onDragOver}
			measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
		>
			{children}
		</DndContext>
	);
}

interface SortableItemProps {
	id: string;
	disabled?: boolean;
	children: (render: SortableItemRenderProps) => React.ReactNode;
}

/**
 * Low-level wrapper for a single sortable item. Use when you need to integrate
 * a sortable item into a structure that `SortableGrid` does not handle (e.g.
 * absolute-positioned overlays, virtualised rows).
 *
 * The render callback receives the drag-handle ref + dnd-kit attributes/listeners.
 * Spread them onto the element the user should grab. If you do not want a
 * dedicated handle, spread them onto the item root instead.
 */
export function SortableItem({ id, disabled = false, children }: SortableItemProps) {
	const { setNodeRef, setActivatorNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id,
		disabled,
	});

	const containerStyle: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.7 : 1,
	};

	return (
		<>
			{children({
				id,
				isDragging,
				containerProps: {
					ref: setNodeRef,
					style: containerStyle,
					'data-sortable-item-id': id,
				},
				dragHandleProps: {
					ref: setActivatorNodeRef,
					attributes,
					listeners,
					'data-drag-handle': true,
				},
			})}
		</>
	);
}

export { arrayMove } from '@dnd-kit/sortable';

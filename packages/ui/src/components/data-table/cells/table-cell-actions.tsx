'use client';

import * as React from 'react';
import type { Row, Table as TanstackTable } from '@tanstack/react-table';
import { cn } from '../../../lib/utils';

const DROPDOWN_CONTENT_SELECTOR = '[data-slot="dropdown-menu-content"]';
const ACTIONS_CONTAINER_SELECTOR = '[data-table-cell-actions]';

interface TableCellActionsProps<TData> {
	row: Row<TData>;
	table: TanstackTable<TData>;
	children: React.ReactNode;
	/** Content to display in the cell. Actions overlay this on hover. */
	content?: React.ReactNode;
	className?: string;
}

export function TableCellActions<TData>({
	row,
	table,
	children,
	content,
	className,
}: TableCellActionsProps<TData>) {
	const [isRowHovered, setIsRowHovered] = React.useState(false);
	const [isActionsHovered, setIsActionsHovered] = React.useState(false);
	const [isActionsOpen, setIsActionsOpen] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const actionsContainerRef = React.useRef<HTMLDivElement>(null);

	// Show actions when row is hovered OR actions are hovered OR dropdown is open
	const shouldShowActions = isRowHovered || isActionsHovered || isActionsOpen;

	const openActions = React.useCallback(() => {
		setIsActionsOpen(true);
	}, []);

	const closeActions = React.useCallback(() => {
		setIsRowHovered(false);
		setIsActionsHovered(false);
		setIsActionsOpen(false);
	}, []);

	const handleActionsBlur = React.useCallback(
		(event: React.FocusEvent<HTMLDivElement>) => {
			const next = event.relatedTarget as HTMLElement | null;
			if (next?.closest(ACTIONS_CONTAINER_SELECTOR)) return;
			if (next?.closest(DROPDOWN_CONTENT_SELECTOR)) return;
			closeActions();
		},
		[closeActions]
	);

	// Handle table row hover
	React.useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Find the closest table row
		const tableRow = container.closest('tr');
		if (!tableRow) return;

		const handleMouseEnter = () => setIsRowHovered(true);
		const handleMouseLeave = (event: MouseEvent) => {
			// Check if mouse is moving to actions or dropdown
			const next = event.relatedTarget as HTMLElement | null;
			if (next?.closest(ACTIONS_CONTAINER_SELECTOR)) return;
			if (next?.closest(DROPDOWN_CONTENT_SELECTOR)) return;

			setIsRowHovered(false);
		};

		tableRow.addEventListener('mouseenter', handleMouseEnter);
		tableRow.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			tableRow.removeEventListener('mouseenter', handleMouseEnter);
			tableRow.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	// Handle outside clicks and escape key
	React.useEffect(() => {
		if (!isActionsOpen) return;

		const handlePointerDown = (event: MouseEvent | PointerEvent) => {
			const target = event.target as HTMLElement | null;
			if (target?.closest(ACTIONS_CONTAINER_SELECTOR)) return;
			if (target?.closest(DROPDOWN_CONTENT_SELECTOR)) return;
			closeActions();
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			closeActions();
		};

		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [closeActions, isActionsOpen]);

	return (
		<div ref={containerRef} className={cn('relative', content ? 'flex items-center' : 'min-h-[40px]', className)}>
			{content}
			{shouldShowActions && (
				<div
					ref={actionsContainerRef}
					data-table-cell-actions
					className="absolute right-2 top-1/2 -translate-y-1/2"
					style={{ zIndex: 100 }}
					onPointerDownCapture={openActions}
					onFocusCapture={openActions}
					onBlurCapture={handleActionsBlur}
					onMouseEnter={() => setIsActionsHovered(true)}
					onMouseLeave={event => {
						const next = event.relatedTarget as HTMLElement | null;
						if (
							next &&
							typeof next.closest === 'function' &&
							next.closest(DROPDOWN_CONTENT_SELECTOR)
						)
							return;

						setIsActionsHovered(false);
					}}
				>
					{children}
				</div>
			)}
		</div>
	);
}

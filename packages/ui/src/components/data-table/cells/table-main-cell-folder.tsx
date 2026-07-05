'use client';

import * as React from 'react';
import { Folder } from '@phosphor-icons/react';
import type { Row, Table as TanstackTable } from '@tanstack/react-table';
import { Checkbox } from '../../checkbox';
import { cn } from '../../../lib/utils';

const DROPDOWN_CONTENT_SELECTOR = '[data-slot="dropdown-menu-content"]';
const ACTIONS_CONTAINER_SELECTOR = '[data-table-main-actions]';

interface BaseTableMainCellFolderProps<TData> {
	row: Row<TData>;
	table: TanstackTable<TData>;
	actions?: React.ReactNode;
	onPrimaryClick?: () => void;
	children?: React.ReactNode;
	showRowCheckbox?: boolean;
}

export interface TableMainCellFolderProps<TData> extends BaseTableMainCellFolderProps<TData> {}

interface TableMainCellFolderContentProps<TData> extends BaseTableMainCellFolderProps<TData> {}

function TableMainCellFolderContent<TData>({
	row,
	table,
	actions,
	onPrimaryClick,
	children,
	showRowCheckbox = true,
}: TableMainCellFolderContentProps<TData>) {
	const [isHovered, setIsHovered] = React.useState(false);
	const [isActionsOpen, setIsActionsOpen] = React.useState(false);
	const { getIsSomePageRowsSelected, getIsAllPageRowsSelected } = table;

	const shouldShowCheckbox =
		showRowCheckbox && (isHovered || getIsSomePageRowsSelected() || getIsAllPageRowsSelected());
	const hasActions = Boolean(actions);
	const shouldShowActions = hasActions && (isHovered || isActionsOpen);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const actionsContainerRef = React.useRef<HTMLDivElement>(null);

	const openActions = React.useCallback(() => {
		setIsHovered(true);
		setIsActionsOpen(true);
	}, []);

	const closeActions = React.useCallback(() => {
		setIsHovered(false);
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

	React.useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Find the closest table row
		const tableRow = container.closest('tr');
		if (!tableRow) return;

		const handleMouseEnter = () => setIsHovered(true);
		const handleMouseLeave = () => setIsHovered(false);

		tableRow.addEventListener('mouseenter', handleMouseEnter);
		tableRow.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			tableRow.removeEventListener('mouseenter', handleMouseEnter);
			tableRow.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

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
		<div
			ref={containerRef}
			className="relative flex w-full items-center py-3 px-2"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={event => {
				const next = event.relatedTarget as HTMLElement | null;
				if (next?.closest(ACTIONS_CONTAINER_SELECTOR)) return;
				if (next?.closest(DROPDOWN_CONTENT_SELECTOR)) return;
				closeActions();
			}}
		>
			{shouldShowCheckbox ? (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={row.getToggleSelectedHandler()}
					className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
					onClick={e => e.stopPropagation()}
				/>
			) : null}

			<div
				className={cn(
					'relative flex w-full items-center gap-3 rounded-lg pr-4 transition-colors duration-150',
					showRowCheckbox ? 'pl-9' : 'pl-0 -ml-1',
					onPrimaryClick ? 'cursor-pointer' : 'cursor-default'
				)}
			>
				<div className="flex flex-1 flex-col py-1">
					<button
						type="button"
						onClick={() => onPrimaryClick?.()}
						className={cn(
							'group flex max-w-full flex-1 items-start gap-3 text-left',
							onPrimaryClick
								? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-md cursor-pointer'
								: ''
						)}
					>
						<span className="mt-0.5 inline-flex size-8 items-center justify-center rounded-md text-blue-300">
							<Folder className="size-6" />
						</span>
						<div className="flex flex-1 flex-col gap-1">{children}</div>
					</button>
				</div>
				{/* 
				{hasActions && (
					<div
						ref={actionsContainerRef}
						data-table-main-actions
						className="relative"
						onPointerDownCapture={openActions}
						onFocusCapture={openActions}
						onBlurCapture={handleActionsBlur}
					>
						{shouldShowActions && (
							<div className="absolute right-0 -translate-y-1/2 top-[50%]">{actions}</div>
						)}
					</div>
				)} */}
			</div>
		</div>
	);
}

export function TableMainCellFolder<TData>({
	children,
	...props
}: React.PropsWithChildren<TableMainCellFolderProps<TData>>) {
	return <TableMainCellFolderContent {...props}>{children}</TableMainCellFolderContent>;
}

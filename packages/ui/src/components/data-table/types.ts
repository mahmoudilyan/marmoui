import type { ColumnDef } from '@tanstack/react-table';
import type { ReactNode } from 'react';

export interface TableState {
	pagination: {
		pageIndex: number;
		pageSize: number;
	};
	sorting: { column: number; dir: 'asc' | 'desc' }[];
	columns: DataTableColumn[];
	view?: string;
	search: string;
	folderId?: string;
	filters?: Record<string, any>;
}

export interface DataTableColumn {
	data: string;
	searchable: boolean;
	orderable: boolean;
}

export interface TableFiltersState {
	[key: string]: any;
}

export interface TableRowActionButton {
	text: string;
	onClick?: () => void;
	icon?: ReactNode;
	isDelete?: boolean;
}

export interface TableRowActionListButton extends TableRowActionButton {
	type: 'button';
}

export interface TableRowActionDivider {
	type: 'divider';
}

export type TableRowActionListItem = TableRowActionListButton | TableRowActionDivider;

export interface TableRowActions {
	master: TableRowActionButton | null;
	list: TableRowActionListItem[];
}

// Filter Types
export interface FilterOption {
	label: string;
	value: string;
	description?: string;
}

// Base filter interface
interface BaseFilter {
	id: string;
	label: string;
}

// Select filter (single selection)
export interface SelectFilter extends BaseFilter {
	type: 'select';
	options: FilterOption[] | (() => Promise<FilterOption[]>);
	placeholder?: string;
}

// Multi-select filter (multiple selections)
export interface MultiSelectFilter extends BaseFilter {
	type: 'multiselect';
	options: FilterOption[] | (() => Promise<FilterOption[]>);
	placeholder?: string;
	searchPlaceholder?: string;
	searchable?: boolean;
}

// Date filter
export interface DateFilter extends BaseFilter {
	type: 'date';
	mode?: 'single' | 'range';
	placeholder?: string;
}

// Boolean filter (toggle/switch)
export interface BooleanFilter extends BaseFilter {
	type: 'boolean';
	trueLabel?: string;
	falseLabel?: string;
}

// Union type for all filters
export type TableFilter = SelectFilter | MultiSelectFilter | DateFilter | BooleanFilter;

export interface TableProps<T> {
	columns: ColumnDef<T>[];
	data: T[];
	dataType?: string;
	total?: number;
	isLoadingBody?: boolean;
	isLoadingHeaders?: boolean;
	onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void;
	pageSize?: number;
	currentPage?: number;
	columnVisibility?: Record<string, boolean>;
	size?: 'sm' | 'md' | 'lg';
	filters?: TableFilter[];
	tableState?: TableState;
	setTableState?: (state: TableState) => void;
	searchPlaceholder?: string;
	hideSearch?: boolean;
	hideColumnsMenu?: boolean;
	onRowSelectionChange?: (selectedRows: T[]) => void;
	className?: string;
	useScrollArea?: boolean;
	maxHeight?: string;
	actionBarActions?: ReactNode | ((selectedRows: T[]) => ReactNode);
	showDefaultActionBarActions?: boolean;
	columnPinning?: { left?: string[]; right?: string[] };
}

export const HIDDEN_COLUMNS = ['select', 'actions'];

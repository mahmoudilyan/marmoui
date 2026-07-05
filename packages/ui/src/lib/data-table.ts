import type {
	TableFiltersState,
	DataTableColumn,
	TableState,
} from '../components/data-table/types';

export interface DataTableParams {
	draw?: number;
	start: number;
	length: number;
	'search[value]': string;
	'search[regex]': boolean;
	folderid?: string;
	view: string;
	[key: string]: any;
}

export function convertColumnsToFormData(columns: DataTableColumn[]) {
	return columns.reduce(
		(acc, col, index) => {
			acc[`columns[${index}][data]`] = col.data;
			acc[`columns[${index}][searchable]`] = col.searchable ? 'true' : 'false';
			acc[`columns[${index}][orderable]`] = col.orderable ? 'true' : 'false';
			return acc;
		},
		{} as Record<string, string>
	);
}

export function convertOrderToFormData(order: { column: number; dir: 'asc' | 'desc' }[]) {
	return order.reduce(
		(acc, sort, index) => {
			acc[`order[${index}][column]`] = sort.column.toString();
			acc[`order[${index}][dir]`] = sort.dir;
			return acc;
		},
		{} as Record<string, string>
	);
}

export function createServerParams(
	tableState: TableState,
	additionalParams?: Record<string, any>
): Omit<DataTableParams, 'draw'> {
	const { pagination, sorting, columns, view, search, folderId, filters } = tableState;

	// Create base params without filters
	const baseParams = {
		start: pagination.pageIndex * pagination.pageSize,
		length: pagination.pageSize,
		'search[value]': search || '',
		'search[regex]': false,
		...convertOrderToFormData(sorting),
		...convertColumnsToFormData(columns),
		folderid: folderId,
		view: view || 'list',
		...additionalParams,
	};

	// Process filters to handle arrays properly
	const filterParams: TableFiltersState = {};
	Object.entries(filters || {}).forEach(([key, filter]) => {
		if (Array.isArray(filter)) {
			// Check if it's a date range
			if (filter.length === 2 && (filter[0] instanceof Date || filter[1] instanceof Date)) {
				// Convert dates to ISO strings for the API
				filterParams[key] = filter.map(d => (d instanceof Date ? d.toISOString() : d));
			} else {
				// For array filters, use the array bracket notation
				filterParams[`${key}[]`] = filter;
			}
		} else if (filter instanceof Date) {
			// Convert single date to ISO string
			filterParams[key] = filter.toISOString();
		} else if (filter !== null && filter !== undefined) {
			filterParams[key] = filter;
		}
	});

	return {
		...baseParams,
		...filterParams,
	} as DataTableParams;
}

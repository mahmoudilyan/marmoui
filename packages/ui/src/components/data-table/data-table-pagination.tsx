'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '../pagination';
import { usePagination } from '../../hooks/use-pagination';

interface DataTablePaginationProps {
	dataType: string;
	table: any;
	total?: number;
	currentPage: number;
	pageSize: number;
	className?: string;
}

export function DataTablePagination({
	dataType = 'Item',
	table,
	total = 0,
	currentPage,
	pageSize,
	className,
}: DataTablePaginationProps) {
	const totalPages = Math.ceil(total / pageSize);

	const pageSizeOptions = [10, 20, 30, 40, 50];

	const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
		currentPage: currentPage + 1,
		totalPages: totalPages || 1,
		paginationItemsToDisplay: 5,
	});

	return (
		<div className={cn('flex items-center justify-between gap-3 max-sm:flex-col', className)}>
			{/* Page size selector */}
			<div className="flex flex-1 items-center gap-2">
				<Select
					value={pageSize.toString()}
					onValueChange={value => {
						table.setPageSize(Number(value));
					}}
					aria-label="Results per page"
				>
					<SelectTrigger className="h-8 w-[70px]">
						<SelectValue placeholder={pageSize.toString()} />
					</SelectTrigger>
					<SelectContent side="top">
						{pageSizeOptions.map(size => (
							<SelectItem key={size} value={size.toString()}>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<span className="text-sm font-medium capitalize">{dataType} per page</span>
			</div>

			{/* Pagination buttons */}
			<Pagination>
				<PaginationContent>
					{/* Previous page button */}
					<PaginationItem>
						<IconButton
							size="sm"
							variant="secondary"
							className="disabled:pointer-events-none disabled:opacity-50"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
							aria-label="Go to previous page"
							icon={<CaretLeft size={16} aria-hidden="true" />}
						/>
					</PaginationItem>

					{/* Left ellipsis (...) */}
					{showLeftEllipsis && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{/* Page number buttons */}
					{pages.map(page => {
						const isActive = page === currentPage + 1;
						return (
							<PaginationItem key={page}>
								<Button
									size="sm"
									variant={isActive ? 'secondary' : 'ghost'}
									onClick={() => table.setPageIndex(page - 1)}
									aria-current={isActive ? 'page' : undefined}
									className="min-w-[2rem]"
								>
									{page}
								</Button>
							</PaginationItem>
						);
					})}

					{/* Right ellipsis (...) */}
					{showRightEllipsis && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{/* Next page button */}
					<PaginationItem>
						<IconButton
							size="sm"
							variant="secondary"
							className="disabled:pointer-events-none disabled:opacity-50"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
							aria-label="Go to next page"
							icon={<CaretRight size={16} aria-hidden="true" />}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}

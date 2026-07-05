'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

interface DataTableSkeletonProps {
	rows?: number;
	columns?: number;
	className?: string;
}

export function DataTableSkeleton({ rows = 5, columns = 4, className }: DataTableSkeletonProps) {
	return (
		<div className={cn('space-y-4', className)}>
			{/* Header skeleton */}
			<div className="flex items-center justify-between">
				<div className="h-8 w-[250px] bg-muted animate-pulse rounded" />
				<div className="flex space-x-2">
					<div className="h-8 w-[100px] bg-muted animate-pulse rounded" />
					<div className="h-8 w-[100px] bg-muted animate-pulse rounded" />
				</div>
			</div>

			{/* Table skeleton */}
			<div>
				<div className="overflow-x-auto">
					<table className="w-full">
						{/* Table header skeleton */}
						<thead>
							<tr className="border-b">
								{Array.from({ length: columns }).map((_, index) => (
									<th key={index} className="h-12 px-4">
										<div className="h-4 bg-muted animate-pulse rounded w-full" />
									</th>
								))}
							</tr>
						</thead>

						{/* Table body skeleton */}
						<tbody>
							{Array.from({ length: rows }).map((_, rowIndex) => (
								<tr key={rowIndex} className="border-b">
									{Array.from({ length: columns }).map((_, colIndex) => (
										<td key={colIndex} className="p-4">
											<div className="h-4 bg-muted animate-pulse rounded w-full" />
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Pagination skeleton */}
			<div className="flex items-center justify-between px-2">
				<div className="h-4 w-[200px] bg-muted animate-pulse rounded" />
				<div className="flex items-center space-x-6">
					<div className="h-4 w-[100px] bg-muted animate-pulse rounded" />
					<div className="h-4 w-[100px] bg-muted animate-pulse rounded" />
					<div className="flex space-x-2">
						{Array.from({ length: 4 }).map((_, index) => (
							<div key={index} className="h-8 w-8 bg-muted animate-pulse rounded" />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

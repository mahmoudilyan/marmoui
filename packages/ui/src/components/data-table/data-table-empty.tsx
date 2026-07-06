'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Tray } from '@phosphor-icons/react';

interface DataTableEmptyProps {
	dataType?: string;
	className?: string;
}

export function DataTableEmpty({ dataType = 'item', className }: DataTableEmptyProps) {
	const plural = dataType.endsWith('s') ? dataType : `${dataType}s`;
	return (
		<div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
			<Tray className="h-12 w-12 text-muted-foreground mb-4" />
			<h3 className="text-lg font-medium">No {plural} found</h3>
			<p className="text-sm text-muted-foreground mt-1">
				Get started by creating your first {dataType.endsWith('s') ? dataType.slice(0, -1) : dataType}.
			</p>
		</div>
	);
}

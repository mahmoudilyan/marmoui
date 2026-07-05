'use client';
import * as React from 'react';
import { cn } from '../../lib/utils';

function Table({
	className,
	containerless = false, // New prop
	...props
}: React.ComponentProps<'table'> & { containerless?: boolean }) {
	const table = (
		<table
			data-slot="table"
			className={cn('w-full caption-bottom text-sm', className)}
			{...props}
		/>
	);

	if (containerless) {
		return table;
	}

	return (
		<div data-slot="table-container" className="relative w-full overflow-x-auto">
			{table}
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return (
		<thead
			data-slot="table-header"
			className={cn(
				'bg-bg',
				'shadow-[0_1px_0_0_rgba(0,0,0,0.05)]',
				'[&_th]:bg-bg [&_th]:border-0',
				className
			)}
			{...props}
		/>
	);
}
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return (
		<tbody
			data-slot="table-body"
			className={cn('[&_tr:last-child]:border-0 border-border-secondary bg', className)}
			{...props}
		/>
	);
}
function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0 border-border-secondary bg',
				className
			)}
			{...props}
		/>
	);
}
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				'hover:bg-bg data-[state=selected]:bg-bg border-b border-border-secondary transition-colors',
				className
			)}
			{...props}
		/>
	);
}
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				'text-ink-light h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
				className
			)}
			{...props}
		/>
	);
}
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pl-0 [&>[role=checkbox]]:translate-y-[2px] border-border-secondary',
				className
			)}
			{...props}
		/>
	);
}
function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
	return (
		<caption
			data-slot="table-caption"
			className={cn('text-ink-muted-foreground mt-4 text-sm', className)}
			{...props}
		/>
	);
}
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

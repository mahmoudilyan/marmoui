import * as React from 'react';
import { CaretLeft, CaretRight, DotsThreeOutline } from '@phosphor-icons/react';

import { cn } from '../lib/utils';
import { Button } from './button';
import { IconButton } from './icon-button';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn('flex items-center justify-end', className)}
			{...props}
		/>
	);
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn('flex flex-row items-center gap-1', className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
} & Omit<React.ComponentProps<typeof Button>, 'variant'>;

function PaginationLink({
	className,
	isActive,
	size = 'sm',
	children,
	...props
}: PaginationLinkProps) {
	return (
		<Button
			type="button"
			size={size}
			variant={isActive ? 'secondary' : 'ghost'}
			aria-current={isActive ? 'page' : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			className={cn('min-w-8 tabular-nums', className)}
			{...props}
		>
			{children}
		</Button>
	);
}

function PaginationPrevious({
	className,
	'aria-label': ariaLabel,
	...props
}: Omit<React.ComponentProps<typeof IconButton>, 'icon' | 'variant'>) {
	return (
		<IconButton
			type="button"
			size="sm"
			variant="secondary"
			data-slot="pagination-previous"
			aria-label={ariaLabel ?? 'Go to previous page'}
			icon={<CaretLeft size={16} aria-hidden="true" />}
			className={cn('disabled:pointer-events-none disabled:opacity-50', className)}
			{...props}
		/>
	);
}

function PaginationNext({
	className,
	'aria-label': ariaLabel,
	...props
}: Omit<React.ComponentProps<typeof IconButton>, 'icon' | 'variant'>) {
	return (
		<IconButton
			type="button"
			size="sm"
			variant="secondary"
			data-slot="pagination-next"
			aria-label={ariaLabel ?? 'Go to next page'}
			icon={<CaretRight size={16} aria-hidden="true" />}
			className={cn('disabled:pointer-events-none disabled:opacity-50', className)}
			{...props}
		/>
	);
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn('flex size-9 items-center justify-center', className)}
			{...props}
		>
			<DotsThreeOutline size={16} weight="fill" />
			<span className="sr-only">More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};

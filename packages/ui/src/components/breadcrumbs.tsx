import * as React from 'react';
import { DotsThree } from '@phosphor-icons/react';
import { Slot } from '@radix-ui/react-slot';
import { TbSlash as Slash } from 'react-icons/tb';
import { cn } from '../lib/utils';

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
	return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}
function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				'text-ink-light flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
				className
			)}
			{...props}
		/>
	);
}
function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn('inline-flex items-center gap-1.5', className)}
			{...props}
		/>
	);
}
function BreadcrumbLink({
	asChild,
	className,
	...props
}: React.ComponentProps<'a'> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot : 'a';
	return (
		<Comp
			data-slot="breadcrumb-link"
			className={cn(
				'hover:text-ink hover:underline-offset-2 hover:underline hover:decoration-ink-muted transition-colors',
				className
			)}
			{...props}
		/>
	);
}
function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={cn('text-ink-dark font-medium text-lg', className)}
			{...props}
		/>
	);
}
function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn('[&>svg]:size-3.5', className)}
			{...props}
		>
			{children ?? <Slash />}
		</li>
	);
}
function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn('flex size-9 items-center justify-center', className)}
			{...props}
		>
			<DotsThree className="size-4" />
			<span className="sr-only">More</span>
		</span>
	);
}
export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};

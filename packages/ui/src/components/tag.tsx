import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { X } from '@phosphor-icons/react';

const tagVariants = cva(
	[
		'inline-flex items-center overflow-clip rounded-[4px] font-normal whitespace-nowrap transition-colors',
		'bg-bg hover:bg-secondary active:bg-muted text-ink',
		'focus-visible:outline-none focus-visible:shadow-[0px_0px_0px_2px_var(--color-primary-bright)]',
	],
	{
		variants: {
			size: {
				sm: [
					'h-[var(--spacing-space-lg)] gap-[6px]',
					'pl-[6px] pr-[6px]',
					'text-[13px] leading-none',
				].join(' '),
				md: [
					'h-[var(--spacing-space-2xl)] gap-[4px]',
					'pl-[6px] pr-[6px]',
					'text-[14px] leading-none',
				].join(' '),
				lg: ['h-[36px] gap-[4px]', 'pl-[6px] pr-[6px]', 'text-[16px] leading-none'].join(' '),
			},
		},
		defaultVariants: {
			size: 'md',
		},
	}
);

export interface TagProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof tagVariants> {
	children: React.ReactNode;
	startElement?: React.ReactNode;
	endElement?: React.ReactNode;
	closable?: boolean;
	onClose?: VoidFunction;
	disabled?: boolean;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(function Tag(props, ref) {
	const {
		className,
		size = 'md',
		startElement,
		endElement,
		closable,
		onClose,
		disabled,
		children,
		...rest
	} = props;

	const closeButtonSize = size === 'sm' ? 'size-4' : 'size-5';

	if (closable) {
		return (
			<div
				ref={ref}
				data-slot="tag"
				className={cn(
					tagVariants({ size }),
					'gap-[6px]!',
					disabled && 'pointer-events-none text-ink-muted [&_svg]:text-ink-muted',
					className
				)}
				{...rest}
			>
				<span className="inline-flex items-center gap-[6px]">
					{startElement && <span className="shrink-0 inline-flex items-center">{startElement}</span>}
					<span>{children}</span>
				</span>
				<button
					type="button"
					className={cn('shrink-0 rounded-[2px] text-icon hover:text-ink hover:bg-muted transition-colors', closeButtonSize)}
					onClick={onClose}
					aria-label="Remove"
					disabled={disabled}
				>
					<X className="size-full" />
				</button>
			</div>
		);
	}

	return (
		<div
			ref={ref}
			data-slot="tag"
			className={cn(
				tagVariants({ size }),
				disabled && 'pointer-events-none text-ink-muted [&_svg]:text-ink-muted',
				className
			)}
			{...rest}
		>
			{startElement && <span className="shrink-0 inline-flex items-center">{startElement}</span>}
			<span>{children}</span>
			{endElement && <span className={cn('shrink-0 inline-flex items-center', closeButtonSize)}>{endElement}</span>}
		</div>
	);
});

export { tagVariants };

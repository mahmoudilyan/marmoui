import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../lib/utils';

type Align = 'start' | 'center' | 'end' | 'justify';
type AsElement =
	| 'dt'
	| 'dd'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'span'
	| 'strong'
	| 'legend';
type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type TextVariant =
	| 'heading-xs'
	| 'heading-sm'
	| 'heading-md'
	| 'heading-lg'
	| 'heading-xl'
	| 'heading-2xl'
	| 'heading-3xl'
	| 'body-xs'
	| 'body-sm'
	| 'body-md'
	| 'body-lg'
	| 'caps-lg'
	| 'caps-md'
	| 'caps-sm';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
	align?: Align;
	as?: AsElement;
	breakWord?: boolean;
	children?: React.ReactNode;
	color?: string; // expects a class or CSS color token
	fontWeight?: FontWeight;
	id?: string;
	numeric?: boolean;
	truncate?: boolean;
	variant?: TextVariant;
	visuallyHidden?: boolean;
	textDecoration?: 'line-through';
	asChild?: boolean;
}

const alignMap: Record<Align, string> = {
	start: 'text-left',
	center: 'text-center',
	end: 'text-right',
	justify: 'text-justify',
};

const weightMap: Record<FontWeight, string> = {
	regular: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
};

// Map variants to their CSS class names
const variantClassMap: Record<TextVariant, string> = {
	'heading-xs': 'heading-xs',
	'heading-sm': 'heading-sm',
	'heading-md': 'heading-md',
	'heading-lg': 'heading-lg',
	'heading-xl': 'heading-xl',
	'heading-2xl': 'heading-2xl',
	'heading-3xl': 'heading-3xl',
	'body-xs': 'body-xs',
	'body-sm': 'body-sm',
	'body-md': 'body-md',
	'body-lg': 'body-lg',
	'caps-lg': 'caps-lg',
	'caps-md': 'caps-md',
	'caps-sm': 'caps-sm',
};

export function Text({
	align,
	as = 'span',
	breakWord,
	children,
	color,
	fontWeight,
	id,
	numeric,
	truncate,
	variant = 'body-md',
	visuallyHidden,
	textDecoration,
	className,
	asChild,
	...rest
}: TextProps) {
	const Comp: any = asChild ? Slot : as || 'span';
	const isCaps = variant?.startsWith('caps-');

	return (
		<Comp
			id={id}
			className={cn(
				// Use the pre-defined CSS class for the variant
				variant && variantClassMap[variant],
				isCaps && 'uppercase text-ink-light',
				// weight
				fontWeight && weightMap[fontWeight],
				// alignment
				align && alignMap[align],
				// utilities
				truncate && 'truncate block',
				breakWord && 'break-words',
				numeric && 'tabular-nums',
				visuallyHidden && 'sr-only',
				textDecoration === 'line-through' && 'line-through',
				color,
				className
			)}
			{...rest}
		>
			{children}
		</Comp>
	);
}

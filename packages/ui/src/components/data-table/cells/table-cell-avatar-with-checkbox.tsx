'use client';

import type { Row } from '@tanstack/react-table';
import * as React from 'react';
import { AvatarCheckbox, type AvatarCheckboxProps } from '../../avatar-checkbox';

type AvatarPalette = NonNullable<AvatarCheckboxProps['variant']>;

const avatarPalettes: AvatarPalette[] = [
	'normal',
	'blue',
	'red',
	'yellow',
	'orange',
	'purple',
	'pink',
	'green',
	'indigo',
	'teal',
];

function getValueByKey<TData>(item: TData, keys: string[]): string | undefined {
	if (!item || typeof item !== 'object') return undefined;

	const record = item as Record<string, unknown>;
	for (const key of keys) {
		const value = record[key];
		if (typeof value === 'string' && value.length > 0) return value;
	}

	return undefined;
}

function getDeterministicPalette(seed: string): AvatarPalette {
	let hash = 0;

	for (let index = 0; index < seed.length; index += 1) {
		hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
	}

	return avatarPalettes[hash % avatarPalettes.length];
}

export interface TableCellAvatarWithCheckboxProps<TData> extends Omit<
	React.HTMLAttributes<HTMLDivElement>,
	'onChange' | 'children' | 'defaultValue' | 'defaultChecked'
> {
	row: Row<TData>;
	getId?: (item: TData) => string;
	getName?: (item: TData) => string | undefined;
	getSrc?: (item: TData) => string | undefined;
	getFallback?: (item: TData) => string | undefined;
	getVariant?: (item: TData) => AvatarPalette;
	size?: AvatarCheckboxProps['size'];
	'aria-label'?: string;
}

function TableCellAvatarWithCheckboxInner<TData>(
	{
		row,
		getId,
		getName,
		getSrc,
		getFallback,
		getVariant,
		size = 'sm',
		'aria-label': ariaLabel = 'Select row',
		...props
	}: TableCellAvatarWithCheckboxProps<TData>,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const [isHovered, setIsHovered] = React.useState(false);
	const rowToggleRef = React.useRef(row.toggleSelected);

	rowToggleRef.current = row.toggleSelected;

	const setRefs = React.useCallback(
		(node: HTMLDivElement | null) => {
			containerRef.current = node;

			if (typeof ref === 'function') {
				ref(node);
			} else if (ref) {
				ref.current = node;
			}
		},
		[ref]
	);

	const rowId =
		getId?.(row.original) ?? getValueByKey(row.original, ['id', 'uuid', 'key']) ?? row.id;
	const name =
		getName?.(row.original) ??
		getValueByKey(row.original, ['name', 'fullName', 'displayName', 'email', 'title']);
	const src =
		getSrc?.(row.original) ??
		getValueByKey(row.original, ['avatar', 'avatarUrl', 'image', 'imageUrl', 'src']);
	const fallback = getFallback?.(row.original);
	const variant = React.useMemo(
		() => getVariant?.(row.original) ?? getDeterministicPalette(rowId),
		[getVariant, row.original, rowId]
	);

	React.useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const tableRow = container.closest('tr');
		if (!tableRow) return;

		const handleMouseEnter = () => setIsHovered(true);
		const handleMouseLeave = () => setIsHovered(false);

		tableRow.addEventListener('mouseenter', handleMouseEnter);
		tableRow.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			tableRow.removeEventListener('mouseenter', handleMouseEnter);
			tableRow.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	const handleChange = React.useCallback((value: boolean) => {
		rowToggleRef.current(!!value);
	}, []);

	return (
		<div ref={setRefs} {...props}>
			<AvatarCheckbox
				checked={row.getIsSelected()}
				onCheckedChange={handleChange}
				aria-label={ariaLabel}
				size={size}
				name={name}
				src={src}
				fallback={fallback}
				variant={variant}
				isHovered={isHovered}
			/>
		</div>
	);
}

const TableCellAvatarWithCheckboxBase = React.forwardRef(TableCellAvatarWithCheckboxInner);

TableCellAvatarWithCheckboxBase.displayName = 'TableCellAvatarWithCheckbox';

const ForwardedTableCellAvatarWithCheckbox = TableCellAvatarWithCheckboxBase as <TData>(
	props: TableCellAvatarWithCheckboxProps<TData> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement;

export const TableCellAvatarWithCheckbox = ForwardedTableCellAvatarWithCheckbox;

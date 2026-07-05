'use client';

import * as React from 'react';
import { Badge, Card, CardContent, IconButton, SortableGrid } from '@marmoui/ui';
import {
	MdDelete,
	MdDragIndicator,
	MdEdit,
	MdEmail,
	MdLink,
	MdShortText,
	MdToggleOn,
} from 'react-icons/md';

interface ListItem {
	id: string;
	label: string;
	hint: string;
}

const initialList: ListItem[] = [
	{ id: 'i1', label: 'Pricing', hint: 'Visited 12,400 times this month' },
	{ id: 'i2', label: 'Features', hint: 'Visited 9,800 times' },
	{ id: 'i3', label: 'Integrations', hint: 'Visited 6,200 times' },
	{ id: 'i4', label: 'Blog', hint: 'Visited 4,800 times' },
	{ id: 'i5', label: 'Docs', hint: 'Visited 3,100 times' },
];

export function SortableListPreview() {
	const [items, setItems] = React.useState(initialList);
	return (
		<div className="not-prose w-full max-w-lg">
			<SortableGrid
				items={items}
				onReorder={setItems}
				strategy="vertical"
				className="group/list flex flex-col gap-1 rounded-md border border-border-secondary bg-panel p-2"
				ariaLabel="Reorderable pages"
			>
				{(item, { containerProps, dragHandleProps, isDragging }) => (
					<div
						{...containerProps}
						className={
							'flex items-center gap-2 rounded border border-transparent bg-panel px-2 py-2 transition-shadow ' +
							(isDragging ? 'border-border-secondary shadow-md' : 'hover:border-border-secondary')
						}
					>
						<button
							type="button"
							ref={dragHandleProps.ref}
							{...dragHandleProps.attributes}
							{...dragHandleProps.listeners}
							data-drag-handle={dragHandleProps['data-drag-handle']}
							aria-label={`Drag ${item.label}`}
							className="cursor-grab text-ink-light opacity-0 transition-opacity hover:text-ink-dark focus-visible:opacity-100 active:cursor-grabbing group-hover/list:opacity-100"
						>
							<MdDragIndicator aria-hidden className="size-4" />
						</button>
						<div className="min-w-0 flex-1">
							<div className="truncate text-sm font-medium text-ink-dark">{item.label}</div>
							<div className="truncate text-xs text-ink-light">{item.hint}</div>
						</div>
					</div>
				)}
			</SortableGrid>
		</div>
	);
}

interface GridCard {
	id: string;
	title: string;
	value: string;
}

const initialGrid: GridCard[] = [
	{ id: 'g1', title: 'Revenue', value: '$24,800' },
	{ id: 'g2', title: 'New signups', value: '1,240' },
	{ id: 'g3', title: 'Email CTR', value: '3.42%' },
	{ id: 'g4', title: 'AOV', value: '$72.40' },
	{ id: 'g5', title: 'Sessions', value: '14,820' },
	{ id: 'g6', title: 'Bounce', value: '38.4%' },
];

export function SortableGridPreview() {
	const [items, setItems] = React.useState(initialGrid);
	return (
		<div className="not-prose w-full">
			<SortableGrid
				items={items}
				onReorder={setItems}
				strategy="grid"
				className="group/grid grid grid-cols-2 gap-3 sm:grid-cols-3"
				ariaLabel="Reorderable KPI tiles"
			>
				{(item, { containerProps, dragHandleProps, isDragging }) => (
					<Card {...containerProps} className={isDragging ? 'ring-2 ring-primary-solid/40' : undefined}>
						<CardContent className="relative flex flex-col gap-1 p-4">
							<button
								type="button"
								ref={dragHandleProps.ref}
								{...dragHandleProps.attributes}
								{...dragHandleProps.listeners}
								data-drag-handle={dragHandleProps['data-drag-handle']}
								aria-label={`Drag ${item.title}`}
								className="absolute -left-1 top-1/2 flex size-6 -translate-y-1/2 cursor-grab items-center justify-center rounded text-ink-light opacity-0 transition-opacity hover:text-ink-dark focus-visible:opacity-100 active:cursor-grabbing group-hover/grid:opacity-100"
							>
								<MdDragIndicator aria-hidden className="size-4" />
							</button>
							<span className="text-xs font-medium uppercase tracking-wide text-ink-light">{item.title}</span>
							<span className="font-heading text-2xl font-semibold tabular-nums text-ink-dark">{item.value}</span>
						</CardContent>
					</Card>
				)}
			</SortableGrid>
		</div>
	);
}

interface FieldItem {
	id: string;
	type: 'text' | 'email' | 'url' | 'consent';
	label: string;
	required?: boolean;
}

const fieldIcons: Record<FieldItem['type'], React.ElementType> = {
	text: MdShortText,
	email: MdEmail,
	url: MdLink,
	consent: MdToggleOn,
};

const initialFields: FieldItem[] = [
	{ id: 'f1', type: 'email', label: 'Email address', required: true },
	{ id: 'f2', type: 'text', label: 'First name' },
	{ id: 'f3', type: 'text', label: 'Last name' },
	{ id: 'f4', type: 'url', label: 'Website' },
	{ id: 'f5', type: 'consent', label: 'GDPR consent', required: true },
];

export function FormFieldReorderPreview() {
	const [fields, setFields] = React.useState(initialFields);
	return (
		<div className="not-prose w-full max-w-xl">
			<SortableGrid
				items={fields}
				onReorder={setFields}
				strategy="vertical"
				className="group/fields flex flex-col gap-2 rounded-md border border-border-secondary bg-panel p-3"
				ariaLabel="Form fields"
			>
				{(field, { containerProps, dragHandleProps, isDragging }) => {
					const Icon = fieldIcons[field.type];
					return (
						<div
							{...containerProps}
							className={
								'flex items-center gap-3 rounded-md border border-border-secondary bg-bg px-3 py-2 transition-shadow ' +
								(isDragging ? 'shadow-md' : '')
							}
						>
							<button
								type="button"
								ref={dragHandleProps.ref}
								{...dragHandleProps.attributes}
								{...dragHandleProps.listeners}
								data-drag-handle={dragHandleProps['data-drag-handle']}
								aria-label={`Drag ${field.label}`}
								className="cursor-grab text-ink-light opacity-0 transition-opacity hover:text-ink-dark focus-visible:opacity-100 active:cursor-grabbing group-hover/fields:opacity-100"
							>
								<MdDragIndicator aria-hidden className="size-4" />
							</button>
							<Icon aria-hidden className="size-4 text-ink-light" />
							<div className="min-w-0 flex-1">
								<div className="flex items-center gap-2">
									<span className="truncate text-sm font-medium text-ink-dark">{field.label}</span>
									{field.required && <Badge variant="info">Required</Badge>}
								</div>
								<span className="text-xs text-ink-light capitalize">{field.type} field</span>
							</div>
							<div className="flex items-center gap-1">
								<IconButton variant="ghost" size="sm" aria-label={`Edit ${field.label}`} icon={<MdEdit />} />
								<IconButton variant="ghost" size="sm" aria-label={`Delete ${field.label}`} icon={<MdDelete />} />
							</div>
						</div>
					);
				}}
			</SortableGrid>
		</div>
	);
}

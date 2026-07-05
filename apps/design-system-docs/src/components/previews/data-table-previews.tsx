// @ts-nocheck — ColumnDef types come from @tanstack/react-table which is a transitive dep
'use client';
import React from 'react';
import {
	DataTable,
	Badge,
	Button,
	ButtonGroup,
	IconButton,
	Avatar,
	AvatarFallback,
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
	TableCellActions,
} from '@marmoui/ui';
import type { TableState } from '@marmoui/ui';
import {
	MdMoreHoriz,
	MdDelete,
	MdEmail,
	MdPersonAdd,
	MdOutlineEdit,
	MdOutlineEmail,
	MdOutlineDelete,
	MdOutlinePersonAdd,
	MdPersonOutline,
} from 'react-icons/md';

// --- Shared data types ---

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	status: string;
	initials: string;
}

const sampleUsers: User[] = [
	{ id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', initials: 'JD' },
	{ id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', initials: 'JS' },
	{ id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', initials: 'BW' },
	{ id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active', initials: 'AB' },
	{ id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'active', initials: 'CD' },
];

// --- Basic Table (no sticky columns) ---

const basicColumns: any[] = [
	{ accessorKey: 'name', header: 'Name' },
	{ accessorKey: 'email', header: 'Email' },
	{ accessorKey: 'role', header: 'Role' },
];

export function DataTableBasicPreview() {
	return (
		<div className="w-full">
			<DataTable data={sampleUsers} columns={basicColumns} />
		</div>
	);
}

// --- Custom Cells ---

const richColumns: any[] = [
	{
		accessorKey: 'name',
		header: 'User',
		cell: ({ row }) => (
			<div className="flex items-center gap-3">
				<Avatar size="sm">
					<AvatarFallback>{row.original.initials}</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-medium">{row.original.name}</div>
					<div className="text-sm text-ink-light">{row.original.email}</div>
				</div>
			</div>
		),
		size: 300,
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => <span className="text-muted-foreground">{row.original.role}</span>,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<Badge variant={row.original.status === 'active' ? 'success' : 'normal'}>
			{row.original.status}
			</Badge>
		),
	},
];

export function DataTableRichCellsPreview() {
	return (
		<div className="w-full">
			<DataTable data={sampleUsers} columns={richColumns} />
		</div>
	);
}

// --- Row Actions (no sticky columns — actions overlay last cell on hover) ---

const actionColumns: any[] = [
	{
		accessorKey: 'email',
		header: 'Contact',
		cell: ({ row }) => {
			const user = row.original;
			return (
				<div className="flex items-center gap-3">
					<Avatar size="sm">
						<AvatarFallback>{user.initials}</AvatarFallback>
					</Avatar>
					<span className="text-ink-dark font-medium truncate">{user.email}</span>
				</div>
			);
		},
		size: 300,
	},
	{
		accessorKey: 'role',
		header: 'Role',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: (info) => {
			const user = info.row.original;
			return (
				<TableCellActions
					row={info.row}
					table={info.table}
					content={
						<Badge variant={user.status === 'active' ? 'success' : 'normal'}>
							{user.status}
						</Badge>
					}
				>
					<ButtonGroup attached={true} size="sm">
						<Button variant="secondary">View</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<IconButton
									variant="secondary"
									size="sm"
									aria-label="More options"
									icon={<MdMoreHoriz className="size-4" />}
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="min-w-52">
								<DropdownMenuItem><MdPersonOutline /> View Profile</DropdownMenuItem>
								<DropdownMenuItem><MdOutlineEdit /> Edit Contact</DropdownMenuItem>
								<DropdownMenuItem><MdOutlineEmail /> Send Email</DropdownMenuItem>
								<DropdownMenuItem><MdOutlinePersonAdd /> Add to List</DropdownMenuItem>
								<DropdownMenuItem variant="destructive"><MdOutlineDelete /> Delete</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</ButtonGroup>
				</TableCellActions>
			);
		},
	},
];

export function DataTableRowActionsPreview() {
	return (
		<div className="w-full">
			<DataTable data={sampleUsers} columns={actionColumns} />
		</div>
	);
}

// --- Row Actions with Sticky Column ---

const stickyActionColumns: any[] = [
	{
		id: 'email',
		accessorKey: 'email',
		header: 'Contact',
		cell: (info) => {
			const user = info.row.original;
			return (
				<div className="flex items-center gap-1.5 w-full group/row">
					<Avatar size="sm">
						<AvatarFallback>{user.initials}</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0 overflow-hidden">
						<span className="text-ink-dark font-medium truncate block">{user.email}</span>
					</div>
					<div className="flex-shrink-0 opacity-0 group-hover/row:opacity-100 has-[button[data-state=open]]:opacity-100 transition-opacity">
						<TableCellActions row={info.row} table={info.table}>
							<ButtonGroup attached={true} size="sm">
								<Button variant="secondary">View</Button>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<IconButton
											variant="secondary"
											size="sm"
											aria-label="More options"
											icon={<MdMoreHoriz className="size-4" />}
										/>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="min-w-52">
										<DropdownMenuItem><MdPersonOutline /> View Profile</DropdownMenuItem>
										<DropdownMenuItem><MdOutlineEdit /> Edit Contact</DropdownMenuItem>
										<DropdownMenuItem><MdOutlineEmail /> Send Email</DropdownMenuItem>
										<DropdownMenuItem><MdOutlinePersonAdd /> Add to List</DropdownMenuItem>
										<DropdownMenuItem variant="destructive"><MdOutlineDelete /> Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</ButtonGroup>
						</TableCellActions>
					</div>
				</div>
			);
		},
		size: 400,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		size: 200,
	},
	{
		accessorKey: 'role',
		header: 'Role',
		size: 200,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		size: 200,
		cell: ({ row }) => (
			<Badge variant={row.original.status === 'active' ? 'success' : 'normal'}>
				{row.original.status}
			</Badge>
		),
	},
];

export function DataTableRowActionsStickyPreview() {
	return (
		<div className="w-full">
			<DataTable
				data={sampleUsers}
				columns={stickyActionColumns}
				columnPinning={{ left: ['email'] }}
			/>
		</div>
	);
}

// --- Filters ---

const defaultTableState: TableState = {
	pagination: { pageIndex: 0, pageSize: 10 },
	sorting: [],
	filters: {},
	columns: [],
	search: '',
	view: 'list',
};

export function DataTableFiltersPreview() {
	const [tableState, setTableState] = React.useState<TableState>(defaultTableState);

	return (
		<div className="w-full">
			<DataTable
				data={sampleUsers}
				columns={richColumns}
				tableState={tableState}
				setTableState={(newState) => setTableState(prev => ({ ...prev, ...newState }))}
				filters={[
					{
						id: 'role',
						label: 'Role',
						type: 'multiselect',
						placeholder: 'Select roles',
						searchable: true,
						options: [
							{ label: 'Admin', value: 'admin' },
							{ label: 'Editor', value: 'editor' },
							{ label: 'Viewer', value: 'viewer' },
						],
					},
					{
						id: 'status',
						label: 'Status',
						type: 'select',
						options: [
							{ value: 'active', label: 'Active' },
							{ value: 'inactive', label: 'Inactive' },
						],
					},
				]}
			/>
		</div>
	);
}

// --- Bulk Actions ---

export function DataTableBulkActionsPreview() {
	return (
		<div className="w-full">
			<DataTable
				data={sampleUsers}
				columns={richColumns}
				dataType="user"
				actionBarActions={(selectedRows) => (
					<ButtonGroup attached={false} size="sm">
						<Button variant="secondary" size="sm" leftIcon={<MdEmail />}>
							Send Email
						</Button>
						<Button variant="secondary" size="sm" leftIcon={<MdPersonAdd />}>
							Add to List
						</Button>
						<Button variant="destructive" size="sm" leftIcon={<MdDelete />}>
							Delete
						</Button>
						<IconButton variant="secondary" size="sm" icon={<MdMoreHoriz />} aria-label="More actions" />
					</ButtonGroup>
				)}
			/>
		</div>
	);
}

// --- Loading ---

export function DataTableLoadingPreview() {
	return (
		<div className="w-full">
			<DataTable data={[]} columns={basicColumns} isLoadingBody={true} dataType="contact" />
		</div>
	);
}

// --- Empty ---

export function DataTableEmptyPreview() {
	return (
		<div className="w-full">
			<DataTable data={[]} columns={basicColumns} dataType="contact" />
		</div>
	);
}

// --- Real-World Example ---

import { TableMainHeaderCell } from '@marmoui/ui';

interface Contact {
	id: string;
	email: string;
	name: string;
	phone: string;
	status: string;
	list_name: string;
	created_at: string;
	initials: string;
}

const sampleContacts: Contact[] = [
	{ id: '1', email: 'john@example.com', name: 'John Doe', phone: '(555) 123-4567', status: 'active', list_name: 'Newsletter', created_at: '2026-01-15', initials: 'JD' },
	{ id: '2', email: 'jane@example.com', name: 'Jane Smith', phone: '(555) 234-5678', status: 'active', list_name: 'VIP Members', created_at: '2026-02-01', initials: 'JS' },
	{ id: '3', email: 'bob@example.com', name: 'Bob Wilson', phone: '(555) 345-6789', status: 'inactive', list_name: 'Newsletter', created_at: '2025-11-20', initials: 'BW' },
	{ id: '4', email: 'alice@example.com', name: 'Alice Brown', phone: '(555) 456-7890', status: 'active', list_name: 'Customers', created_at: '2026-01-28', initials: 'AB' },
	{ id: '5', email: 'charlie@example.com', name: 'Charlie Davis', phone: '(555) 567-8901', status: 'active', list_name: 'VIP Members', created_at: '2026-03-05', initials: 'CD' },
];

export function DataTableRealWorldPreview() {
	const [tableState, setTableState] = React.useState<TableState>(defaultTableState);
	const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({
		phone: true,
		list_name: true,
		created_at: false,
	});

	const columns = React.useMemo<any[]>(() => [
		{
			id: 'email',
			accessorKey: 'email',
			header: ({ table }) => (
				<TableMainHeaderCell label="Email" columnIndex={0} table={table} />
			),
			cell: (info) => {
				const contact = info.row.original;
				return (
					<div className="flex items-center gap-1.5 w-full group/row">
						<Avatar size="sm">
							<AvatarFallback>{contact.initials}</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<span className="text-ink-dark font-medium truncate block">
								{contact.email}
							</span>
						</div>
						<div className="flex-shrink-0 opacity-0 group-hover/row:opacity-100 has-[button[data-state=open]]:opacity-100 transition-opacity">
							<TableCellActions row={info.row} table={info.table}>
								<ButtonGroup attached={true} size="sm">
									<Button variant="secondary">View</Button>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<IconButton
												variant="secondary"
												size="sm"
												aria-label="More options"
												icon={<MdMoreHoriz className="size-4" />}
											/>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="min-w-52">
											<DropdownMenuItem><MdPersonOutline /> View Profile</DropdownMenuItem>
											<DropdownMenuItem><MdOutlineEdit /> Edit Contact</DropdownMenuItem>
											<DropdownMenuItem><MdOutlineEmail /> Send Email</DropdownMenuItem>
											<DropdownMenuItem><MdOutlinePersonAdd /> Add to List</DropdownMenuItem>
											<DropdownMenuItem variant="destructive"><MdOutlineDelete /> Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</ButtonGroup>
							</TableCellActions>
						</div>
					</div>
				);
			},
			size: 400,
			enableHiding: false,
		},
		{
			accessorKey: 'name', header: 'Name', size: 200,
			meta: { label: 'Name', group: 'Contact Info' },
		},
		{
			accessorKey: 'phone', header: 'Phone', size: 150,
			meta: { label: 'Phone', group: 'Contact Info' },
		},
		{
			accessorKey: 'status', header: 'Status',
			cell: ({ row }) => (
				<Badge variant={row.original.status === 'active' ? 'success' : 'normal'}>
			{row.original.status}
			</Badge>
		),
		meta: { label: 'Status', group: 'Contact Info' },
		},
		{
			accessorKey: 'list_name', header: 'List', size: 150,
			meta: { label: 'List', group: 'Contact Info' },
		},
		{
			accessorKey: 'created_at', header: 'Created',
			cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
			meta: { label: 'Created', group: 'Details' },
		},
	], []);

	return (
		<div className="w-full">
			<DataTable<Contact>
				columns={columns}
				data={sampleContacts}
				total={sampleContacts.length}
				dataType="contact"
				tableState={tableState}
				setTableState={(newState) => setTableState(prev => ({ ...prev, ...newState }))}
				onColumnVisibilityChange={setColumnVisibility}
				columnVisibility={columnVisibility}
				columnPinning={{ left: ['email'] }}
				filters={[
					{
						id: 'lists',
						label: 'List(s)',
						type: 'multiselect',
						placeholder: 'Select lists',
						searchable: true,
						options: [
							{ label: 'Newsletter', value: 'newsletter' },
							{ label: 'VIP Members', value: 'vip' },
							{ label: 'Customers', value: 'customers' },
						],
					},
					{
						id: 'dateRange',
						label: 'Sign Up Date',
						type: 'date',
						mode: 'range',
					},
				]}
				actionBarActions={(selectedContacts) => (
					<ButtonGroup attached={false} size="sm">
						<Button variant="secondary" size="sm" leftIcon={<MdEmail />}>
							Send Email
						</Button>
						<Button variant="secondary" size="sm" leftIcon={<MdPersonAdd />}>
							Add to List
						</Button>
						<Button variant="destructive" size="sm" leftIcon={<MdDelete />}>
							Delete
						</Button>
						<IconButton variant="secondary" size="sm" icon={<MdMoreHoriz />} aria-label="More actions" />
					</ButtonGroup>
				)}
			/>
		</div>
	);
}

// --- Column Visibility ---

export function DataTableColumnVisibilityPreview() {
	const cols: any[] = [
		{ accessorKey: 'name', header: 'Name', enableHiding: false },
		{ accessorKey: 'email', header: 'Email', meta: { label: 'Email', group: 'Contact Info' } },
		{ accessorKey: 'role', header: 'Role', meta: { label: 'Role', group: 'Organization' } },
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => (
				<Badge variant={row.original.status === 'active' ? 'success' : 'normal'}>
					{row.original.status}
				</Badge>
			),
			meta: { label: 'Status', group: 'Organization' },
		},
	];

	return (
		<div className="w-full">
			<DataTable data={sampleUsers} columns={cols} />
		</div>
	);
}

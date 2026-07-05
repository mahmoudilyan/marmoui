import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	DataTable as DataTableBase,
	Badge as BadgeBase,
	Button as ButtonBase,
	IconButton as IconButtonBase,
	Avatar as AvatarBase,
	AvatarFallback as AvatarFallbackBase,
} from '@marmoui/ui';
import { MdMoreVert, MdEdit, MdDelete } from 'react-icons/md';

// Type assertions to fix React 19 compatibility
const DataTable = DataTableBase as any;
const Badge = BadgeBase as any;
const Button = ButtonBase as any;
const IconButton = IconButtonBase as any;
const Avatar = AvatarBase as any;
const AvatarFallback = AvatarFallbackBase as any;

// Sample data
const sampleUsers = [
	{
		id: '1',
		name: 'John Doe',
		email: 'john@example.com',
		role: 'Admin',
		status: 'active',
		lastLogin: '2024-03-15',
		avatar: 'JD',
	},
	{
		id: '2',
		name: 'Jane Smith',
		email: 'jane@example.com',
		role: 'Editor',
		status: 'active',
		lastLogin: '2024-03-14',
		avatar: 'JS',
	},
	{
		id: '3',
		name: 'Bob Johnson',
		email: 'bob@example.com',
		role: 'Viewer',
		status: 'inactive',
		lastLogin: '2024-03-10',
		avatar: 'BJ',
	},
	{
		id: '4',
		name: 'Alice Brown',
		email: 'alice@example.com',
		role: 'Editor',
		status: 'active',
		lastLogin: '2024-03-15',
		avatar: 'AB',
	},
	{
		id: '5',
		name: 'Charlie Davis',
		email: 'charlie@example.com',
		role: 'Viewer',
		status: 'pending',
		lastLogin: 'Never',
		avatar: 'CD',
	},
];

const columns = [
	{
		accessorKey: 'name',
		header: 'User',
		cell: ({ row }: any) => (
			<div className="flex items-center gap-3">
				<Avatar size="sm">
					<AvatarFallback size="sm">{row.original.avatar}</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-medium">{row.original.name}</div>
					<div className="text-sm text-ink-light">{row.original.email}</div>
				</div>
			</div>
		),
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }: any) => (
			<Badge
				variant={
					row.original.role === 'Admin'
						? 'destructive'
						: row.original.role === 'Editor'
							? 'alert'
							: 'default'
				}
				size="sm"
			>
				{row.original.role}
			</Badge>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }: any) => (
			<Badge
				variant={
					row.original.status === 'active'
						? 'success'
						: row.original.status === 'pending'
							? 'warning'
							: 'default'
				}
				size="sm"
			>
				{row.original.status}
			</Badge>
		),
	},
	{
		accessorKey: 'lastLogin',
		header: 'Last Login',
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }: any) => (
			<div className="flex items-center gap-1">
				<IconButton variant="ghost" size="xs" icon={<MdEdit />} aria-label="Edit user" />
				<IconButton variant="ghost" size="xs" icon={<MdDelete />} aria-label="Delete user" />
				<IconButton variant="ghost" size="xs" icon={<MdMoreVert />} aria-label="More options" />
			</div>
		),
	},
];

const meta = {
	title: 'Components/DataTable',
	component: DataTable,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
# Data Table

A comprehensive data table component built on TanStack Table with sorting, filtering, pagination, and row selection capabilities.

## Features

- **Sorting**: Click column headers to sort data
- **Filtering**: Built-in search and filter functionality
- **Pagination**: Navigate through large datasets
- **Row Selection**: Single or multiple row selection
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Keyboard navigation and screen reader support
- **Customizable**: Flexible cell rendering and styling

## Usage

\`\`\`tsx
import { DataTable } from '@marmoui/ui';

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

<DataTable
  data={data}
  columns={columns}
/>
\`\`\`

## Column Definition

Columns support various configuration options:
- \`accessorKey\`: The data property to display
- \`header\`: Column header text or component
- \`cell\`: Custom cell rendering function
- \`sortable\`: Enable sorting for this column
- \`filterable\`: Enable filtering for this column
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="w-full">
			<DataTable data={sampleUsers} columns={columns} />
		</div>
	),
};

export const SimpleTable: Story = {
	render: () => {
		const simpleColumns = [
			{ accessorKey: 'name', header: 'Name' },
			{ accessorKey: 'email', header: 'Email' },
			{ accessorKey: 'role', header: 'Role' },
		];

		return (
			<div className="w-full">
				<DataTable data={sampleUsers} columns={simpleColumns} />
			</div>
		);
	},
};

export const WithSearch: Story = {
	render: () => (
		<div className="w-full space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-medium">User Management</h3>
				<Button variant="primary" size="sm">
					Add User
				</Button>
			</div>
			<DataTable
				data={sampleUsers}
				columns={columns}
				searchable
				searchPlaceholder="Search users..."
			/>
		</div>
	),
};

export const WithSelectionAndActions: Story = {
	render: () => {
		const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

		return (
			<div className="w-full space-y-4">
				{selectedRows.length > 0 && (
					<div className="flex items-center gap-2 p-3 bg-primary-50 border border-primary-200 rounded-lg">
						<span className="text-sm font-medium">
							{selectedRows.length} user{selectedRows.length === 1 ? '' : 's'} selected
						</span>
						<Button variant="secondary" size="sm">
							Export
						</Button>
						<Button variant="destructive" size="sm">
							Delete
						</Button>
					</div>
				)}
				<DataTable
					data={sampleUsers}
					columns={columns}
					selectable
					onSelectionChange={setSelectedRows}
				/>
			</div>
		);
	},
};

export const ProjectsTable: Story = {
	render: () => {
		const projects = [
			{
				id: '1',
				name: 'Website Redesign',
				status: 'In Progress',
				priority: 'High',
				assignee: 'John Doe',
				dueDate: '2024-03-20',
				progress: 75,
			},
			{
				id: '2',
				name: 'Mobile App',
				status: 'Planning',
				priority: 'Medium',
				assignee: 'Jane Smith',
				dueDate: '2024-04-15',
				progress: 25,
			},
			{
				id: '3',
				name: 'API Documentation',
				status: 'Completed',
				priority: 'Low',
				assignee: 'Bob Johnson',
				dueDate: '2024-03-01',
				progress: 100,
			},
		];

		const projectColumns = [
			{
				accessorKey: 'name',
				header: 'Project',
				cell: ({ row }: any) => (
					<div>
						<div className="font-medium">{row.original.name}</div>
						<div className="text-sm text-ink-light">#{row.original.id}</div>
					</div>
				),
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: ({ row }: any) => (
					<Badge
						variant={
							row.original.status === 'Completed'
								? 'success'
								: row.original.status === 'In Progress'
									? 'alert'
									: 'default'
						}
						size="sm"
					>
						{row.original.status}
					</Badge>
				),
			},
			{
				accessorKey: 'priority',
				header: 'Priority',
				cell: ({ row }: any) => (
					<Badge
						variant={
							row.original.priority === 'High'
								? 'destructive'
								: row.original.priority === 'Medium'
									? 'warning'
									: 'default'
						}
						size="sm"
					>
						{row.original.priority}
					</Badge>
				),
			},
			{
				accessorKey: 'assignee',
				header: 'Assignee',
			},
			{
				accessorKey: 'progress',
				header: 'Progress',
				cell: ({ row }: any) => (
					<div className="flex items-center gap-2">
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-primary-600 h-2 rounded-full transition-all"
								style={{ width: `${row.original.progress}%` }}
							></div>
						</div>
						<span className="text-xs font-medium min-w-[3ch]">{row.original.progress}%</span>
					</div>
				),
			},
			{
				accessorKey: 'dueDate',
				header: 'Due Date',
			},
		];

		return (
			<div className="w-full">
				<DataTable
					data={projects}
					columns={projectColumns}
					searchable
					searchPlaceholder="Search projects..."
				/>
			</div>
		);
	},
};

export const CompactTable: Story = {
	render: () => {
		const compactColumns = [
			{ accessorKey: 'name', header: 'Name' },
			{ accessorKey: 'email', header: 'Email' },
			{
				accessorKey: 'status',
				header: 'Status',
				cell: ({ row }: any) => (
					<div className={`inline-flex items-center gap-1 text-xs`}>
						<div
							className={`w-2 h-2 rounded-full ${
								row.original.status === 'active'
									? 'bg-green-500'
									: row.original.status === 'pending'
										? 'bg-yellow-500'
										: 'bg-gray-400'
							}`}
						></div>
						{row.original.status}
					</div>
				),
			},
		];

		return (
			<div className="w-full">
				<DataTable data={sampleUsers} columns={compactColumns} size="sm" />
			</div>
		);
	},
};

export const EmptyState: Story = {
	render: () => (
		<div className="w-full">
			<DataTable
				data={[]}
				columns={columns}
				emptyMessage="No users found"
				emptyDescription="Get started by adding your first user."
			/>
		</div>
	),
};

export const LoadingState: Story = {
	render: () => (
		<div className="w-full">
			<DataTable data={[]} columns={columns} loading />
		</div>
	),
};

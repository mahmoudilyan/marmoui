// @ts-nocheck -- Pattern previews intentionally keep table examples lightweight for docs.
'use client';

import { useMemo, useState } from 'react';
import {
	Badge,
	Box,
	Button,
	ButtonGroup,
	DataTable,
	DialogDescription,
	DialogFooter,
	DialogManager,
	DialogProvider,
	DialogTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Field,
	IconButton,
	Input,
	PageSection,
	Panel,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SidebarItem,
	SidebarPanel,
	SidebarPanelContent,
	SidebarPanelFooter,
	SidebarPanelHeader,
	SidebarPanelTitle,
	SidebarProvider,
	SidebarSubItem,
	TableCellActions,
	TableCellAvatarWithCheckbox,
	TableMainCell,
	TableMainHeaderCell,
	Textarea,
	useDialog,
} from '@marmoui/ui';
import type { DialogManagerConfig, TableState } from '@marmoui/ui';
import {
	MdCampaign,
	MdDashboard,
	MdMoreHoriz,
	MdOutlineCampaign,
	MdOutlineDashboard,
	MdOutlineInfo,
	MdOutlineNotifications,
	MdOutlinePeople,
	MdPeople,
} from 'react-icons/md';

interface Contact {
	id: string;
	name: string;
	email: string;
	status: 'active' | 'pending' | 'failed';
}

const contacts: Contact[] = [
	{ id: '1', name: 'Ava Carter', email: 'ava@example.com', status: 'active' },
	{ id: '2', name: 'Noah Patel', email: 'noah@example.com', status: 'pending' },
	{ id: '3', name: 'Mia Thompson', email: 'mia@example.com', status: 'active' },
	{ id: '4', name: 'Leo Morgan', email: 'leo@example.com', status: 'failed' },
	{ id: '5', name: 'Sofia Chen', email: 'sofia@example.com', status: 'active' },
	{ id: '6', name: 'Eli Brooks', email: 'eli@example.com', status: 'pending' },
];

function DeleteContactDialog({
	dialogTitle = 'Delete contact?',
	dialogDescription = 'This action cannot be undone.',
	onClose,
}: {
	dialogTitle?: string;
	dialogDescription?: string;
	onClose: () => void;
}) {
	return (
		<>
			<DialogTitle>{dialogTitle}</DialogTitle>
			<DialogDescription>{dialogDescription}</DialogDescription>
			<DialogFooter>
				<Button variant="secondary" size="sm" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="destructive" size="sm" onClick={onClose}>
					Delete
				</Button>
			</DialogFooter>
		</>
	);
}

function SendEmailDialog({
	dialogTitle = 'Send email',
	dialogDescription = 'Compose a quick message for this contact.',
	contactName = 'Ava Carter',
	onClose,
}: {
	dialogTitle?: string;
	dialogDescription?: string;
	contactName?: string;
	onClose: () => void;
}) {
	return (
		<>
			<DialogTitle>{dialogTitle}</DialogTitle>
			<DialogDescription>{dialogDescription}</DialogDescription>
			<div className="space-y-4 py-space-md">
				<Field label="Recipient">
					<Input value={contactName} readOnly />
				</Field>
				<Field label="Message">
					<Textarea rows={4} placeholder="Write a short message..." />
				</Field>
			</div>
			<DialogFooter>
				<Button variant="secondary" size="sm" onClick={onClose}>
					Cancel
				</Button>
				<Button size="sm" onClick={onClose}>
					Send email
				</Button>
			</DialogFooter>
		</>
	);
}

const dialogPreviewConfig: DialogManagerConfig = {
	dialogs: {
		deleteContact: DeleteContactDialog,
		sendEmail: SendEmailDialog,
	},
	defaultConfig: {
		size: 'md',
		closeOnEscape: true,
		closeOnInteractOutside: true,
	},
};

function ConfirmationDialogPreviewActions() {
	const { openDialog } = useDialog();

	return (
		<Button
			variant="destructive"
			onClick={() =>
				openDialog('deleteContact', {
					dialogTitle: 'Delete "ava@example.com"?',
					dialogDescription: 'The contact and all related activity will be permanently removed.',
				})
			}
		>
			Delete contact
		</Button>
	);
}

function OtherDialogPreviewActions() {
	const { openDialog } = useDialog();

	return (
		<div className="flex flex-wrap gap-2">
			<Button
				onClick={() =>
					openDialog('sendEmail', {
						dialogTitle: 'Send email to Ava',
						contactName: 'Ava Carter',
					})
				}
			>
				Send email
			</Button>
			<Button
				variant="secondary"
				onClick={() =>
					openDialog(
						'sendEmail',
						{
							dialogTitle: 'Large compose dialog',
							dialogDescription: 'Use config overrides for wider dialogs.',
							contactName: 'Noah Patel',
						},
						{ size: 'lg' }
					)
				}
			>
				Open large dialog
			</Button>
		</div>
	);
}

export function PatternConfirmationDialogPreview() {
	return (
		<div className="w-full rounded-xl border border-border-secondary bg-panel p-space-2xl">
			<DialogProvider>
				<ConfirmationDialogPreviewActions />
				<DialogManager config={dialogPreviewConfig} />
			</DialogProvider>
		</div>
	);
}

export function PatternDialogsForOtherActionsPreview() {
	return (
		<div className="w-full rounded-xl border border-border-secondary bg-panel p-space-2xl">
			<DialogProvider>
				<OtherDialogPreviewActions />
				<DialogManager config={dialogPreviewConfig} />
			</DialogProvider>
		</div>
	);
}

export function PatternFormWithValidationPreview() {
	return (
		<div className="w-full max-w-2xl rounded-xl border border-border-secondary bg-panel p-space-2xl">
			<form className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<Field label="First name" required>
						<Input placeholder="Ava" defaultValue="Ava" />
					</Field>
					<Field label="Last name" required>
						<Input placeholder="Carter" defaultValue="Carter" />
					</Field>
				</div>
				<Field label="Email" required>
					<Input type="email" placeholder="ava@example.com" defaultValue="ava@example.com" />
				</Field>
				<Field label="Status" required>
					<Select defaultValue="active">
						<SelectTrigger>
							<SelectValue placeholder="Select status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="active">Active</SelectItem>
							<SelectItem value="pending">Pending</SelectItem>
						</SelectContent>
					</Select>
				</Field>
				<Field label="Notes">
					<Textarea rows={4} placeholder="Internal notes about this contact..." />
				</Field>
				<div className="flex justify-end gap-2">
					<Button type="button" variant="secondary">
						Cancel
					</Button>
					<Button type="button">Save contact</Button>
				</div>
			</form>
		</div>
	);
}

function PatternContactsTable({ compact = false }: { compact?: boolean }) {
	const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
	const [tableState, setTableState] = useState<TableState>({
		pagination: { pageIndex: 0, pageSize: 20 },
		sorting: [],
		filters: {},
		columns: [],
		search: '',
		view: 'list',
	});

	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: ({ table }) => (
					<TableMainHeaderCell label="Name" columnIndex={0} table={table} />
				),
				cell: ({ row, table }) => (
					<TableMainCell row={row} table={table} showRowCheckbox={false}>
						<div className="flex min-w-0 items-center gap-2">
							<TableCellAvatarWithCheckbox<Contact> row={row} getName={contact => contact.name} />
							<div className="flex min-w-0 flex-col">
								<span className="truncate font-medium text-ink-dark">{row.original.name}</span>
								<span className="truncate text-ink-light">{row.original.email}</span>
							</div>
						</div>
					</TableMainCell>
				),
				enableHiding: false,
				size: 320,
			},
			{ accessorKey: 'email', header: 'Email', size: 240 },
			{
				accessorKey: 'status',
				header: 'Status',
				size: 160,
				cell: ({ row }) => {
					const variantMap = {
						active: 'success',
						pending: 'warning',
						failed: 'destructive',
					} as const;

					return <Badge variant={variantMap[row.original.status]}>{row.original.status}</Badge>;
				},
			},
			{
				id: 'actions',
				header: '',
				enableSorting: false,
				enableHiding: false,
				size: 96,
				cell: ({ row, table }) => (
					<TableCellActions row={row} table={table}>
						<ButtonGroup attached size="sm">
							<Button variant="secondary" size="sm">
								View
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<IconButton
										variant="secondary"
										size="sm"
										aria-label="More options"
										icon={<MdMoreHoriz />}
									/>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>Edit contact</DropdownMenuItem>
									<DropdownMenuItem variant="destructive">Delete contact</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</ButtonGroup>
					</TableCellActions>
				),
			},
		],
		[]
	);

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<DataTable<Contact>
				className="h-full"
				columns={columns}
				data={contacts}
				total={contacts.length}
				dataType="contact"
				tableState={tableState}
				setTableState={setTableState}
				pageSize={tableState.pagination.pageSize}
				currentPage={tableState.pagination.pageIndex}
				columnVisibility={columnVisibility}
				onColumnVisibilityChange={setColumnVisibility}
				maxHeight={compact ? '300px' : '360px'}
				filters={[
					{
						id: 'status',
						label: 'Status',
						type: 'select',
						placeholder: 'Select status',
						options: [
							{ label: 'Active', value: 'active' },
							{ label: 'Pending', value: 'pending' },
							{ label: 'Failed', value: 'failed' },
						],
					},
					{
						id: 'createdAt',
						label: 'Created',
						type: 'date',
						mode: 'range',
						placeholder: 'Select date range',
					},
				]}
			/>
		</div>
	);
}

function PatternSidebar({
	pathname,
	navigate,
}: {
	pathname: string;
	navigate: (href: string) => void;
}) {
	return (
		<SidebarPanel>
			<SidebarPanelHeader>
				<SidebarPanelTitle>Navigation</SidebarPanelTitle>
			</SidebarPanelHeader>

			<SidebarPanelContent>
				<SidebarItem
					label="Dashboard"
					iconOutlined={MdOutlineDashboard}
					iconFilled={MdDashboard}
					isActive={pathname === '/dashboard'}
					onClick={() => navigate('/dashboard')}
				/>
				<SidebarItem
					label="Contacts"
					iconOutlined={MdOutlinePeople}
					iconFilled={MdPeople}
					isActive={pathname.startsWith('/contacts')}
					onClick={() => navigate('/contacts')}
				>
					<SidebarSubItem
						label="All Contacts"
						isActive={pathname === '/contacts'}
						onClick={() => navigate('/contacts')}
					/>
					<SidebarSubItem
						label="Segments"
						isActive={pathname === '/contacts/segments'}
						onClick={() => navigate('/contacts/segments')}
					/>
				</SidebarItem>
				<SidebarItem
					label="Campaigns"
					iconOutlined={MdOutlineCampaign}
					iconFilled={MdCampaign}
					isActive={pathname.startsWith('/campaigns')}
					onClick={() => navigate('/campaigns')}
				/>
			</SidebarPanelContent>

			<SidebarPanelFooter className="flex flex-row">
				<IconButton
					variant="ghost-body"
					aria-label="Notifications"
					icon={<MdOutlineNotifications />}
				/>
				<IconButton variant="ghost-body" aria-label="Help" icon={<MdOutlineInfo />} />
			</SidebarPanelFooter>
		</SidebarPanel>
	);
}

export function PatternDataTableWithFiltersPreview() {
	return (
		<div className="h-[520px] w-full overflow-hidden rounded-xl border border-border-secondary bg-panel">
			<div className="flex h-full min-h-0 flex-col px-space-2xl py-space-md">
				<PatternContactsTable compact />
			</div>
		</div>
	);
}

export function PatternAppShellPreview() {
	const [pathname, setPathname] = useState('/contacts');

	return (
		<div className="h-[620px] w-full overflow-hidden rounded-xl border border-border-secondary bg-panel shadow-sm">
			<SidebarProvider mainNavItems={[]} config={{ defaultSecondaryOpen: true }}>
				<Box className="relative flex h-full overflow-hidden">
					<PatternSidebar pathname={pathname} navigate={setPathname} />
					<Panel className="flex flex-1 flex-col overflow-hidden">
						<PageSection
							breadcrumbs={[{ label: pathname.startsWith('/campaigns') ? 'Campaigns' : 'Contacts' }]}
							primaryAction={{ label: 'Create Contact', onClick: () => {} }}
							otherActions={[
								{ label: 'Import CSV', onClick: () => {} },
								{ label: 'Manage lists', onClick: () => {} },
							]}
						/>
						<div className="flex-1 min-h-0 px-space-2xl py-space-md">
							<PatternContactsTable compact />
						</div>
					</Panel>
				</Box>
			</SidebarProvider>
		</div>
	);
}

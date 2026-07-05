'use client';

import React, { useState } from 'react';
import {
	Archive,
	ArrowSquareOut,
	CaretRight,
	ChartBar,
	ChatTeardropText,
	Copy,
	DotsThree,
	DownloadSimple,
	GearSix,
	PencilSimple,
	Question,
	ShareNetwork,
	SignOut,
	Trash,
} from '@phosphor-icons/react';
import {
	Avatar,
	AvatarFallback,
	Button,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	IconButton,
} from '@marmoui/ui';
import { GitHub } from '@/components/icons/github-icon';
import { cn } from '@/lib/utils';

const iconClass = 'size-5 shrink-0 text-icon';

/** Basic dropdown with simple items */
export function DropdownBasicPreview() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">Options</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Menu items with leading icons */
export function DropdownWithIconsPreview() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<IconButton
					variant="ghost"
					size="sm"
					icon={<DotsThree className={iconClass} />}
					aria-label="Row actions"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuItem>
					<PencilSimple className={iconClass} aria-hidden />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem>
					<ShareNetwork className={iconClass} aria-hidden />
					Share
				</DropdownMenuItem>
				<DropdownMenuItem>
					<DownloadSimple className={iconClass} aria-hidden />
					Download
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<Trash className={iconClass} aria-hidden />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Grouped items with labels and separators */
export function DropdownWithLabelsPreview() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">View Options</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuLabel>Display</DropdownMenuLabel>
				<DropdownMenuItem>Grid View</DropdownMenuItem>
				<DropdownMenuItem>List View</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Sort By</DropdownMenuLabel>
				<DropdownMenuItem>Name</DropdownMenuItem>
				<DropdownMenuItem>Date</DropdownMenuItem>
				<DropdownMenuItem>Size</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Checkbox items for toggling options */
export function DropdownCheckboxPreview() {
	const [notifications, setNotifications] = useState(true);
	const [emails, setEmails] = useState(false);
	const [updates, setUpdates] = useState(true);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">Preferences</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuLabel>Notifications</DropdownMenuLabel>
				<DropdownMenuCheckboxItem checked={notifications} onCheckedChange={setNotifications}>
					Push Notifications
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem checked={emails} onCheckedChange={setEmails}>
					Email Notifications
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem checked={updates} onCheckedChange={setUpdates}>
					Product Updates
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Radio items for exclusive selection */
export function DropdownRadioPreview() {
	const [position, setPosition] = useState('top');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">Position</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Disabled menu items */
export function DropdownDisabledPreview() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">File</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuItem>New File</DropdownMenuItem>
				<DropdownMenuItem>Open</DropdownMenuItem>
				<DropdownMenuItem disabled>Save (No changes)</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Export</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Table row action menu */
export function DropdownRowActionsPreview() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<IconButton
					variant="ghost"
					size="sm"
					icon={<DotsThree className={iconClass} />}
					aria-label="Row actions"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuItem onSelect={() => {}}>
					<ArrowSquareOut className={iconClass} aria-hidden />
					View Details
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => {}}>
					<PencilSimple className={iconClass} aria-hidden />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => {}}>
					<Copy className={iconClass} aria-hidden />
					Duplicate
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive" onSelect={() => {}}>
					<Trash className={iconClass} aria-hidden />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Menu with keyboard shortcuts */
export function DropdownShortcutsPreview() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">Edit</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuItem>
					Copy
					<DropdownMenuShortcut>Cmd+C</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Paste
					<DropdownMenuShortcut>Cmd+V</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Cut
					<DropdownMenuShortcut>Cmd+X</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Select All
					<DropdownMenuShortcut>Cmd+A</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Nested sub-menus */
export function DropdownSubMenuPreview() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">Actions</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuItem>
					<PencilSimple className={iconClass} aria-hidden />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Copy className={iconClass} aria-hidden />
					Duplicate
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<ShareNetwork className={iconClass} aria-hidden />
						Share
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Email</DropdownMenuItem>
						<DropdownMenuItem>Slack</DropdownMenuItem>
						<DropdownMenuItem>Copy Link</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<Archive className={iconClass} aria-hidden />
						Move to
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Archive</DropdownMenuItem>
						<DropdownMenuItem>Drafts</DropdownMenuItem>
						<DropdownMenuItem>Trash</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<Trash className={iconClass} aria-hidden />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/* ───────────────────────── Profile Dropdown Menu ───────────────────────── */

const profileMenuItems = [
	{ icon: ChartBar, label: 'Analytics' },
	{ icon: GearSix, label: 'Settings' },
	{ icon: Question, label: 'Help Center' },
	{ icon: ChatTeardropText, label: 'Send Feedback' },
] as const;

/** Figma Profile Dropdown (`7469:54750`) — open menu panel. */
function ProfileDropdownMenuPanel({
	className,
	embedded = false,
}: {
	className?: string;
	embedded?: boolean;
}) {
	return (
		<div
			className={cn(
				'w-full overflow-hidden py-1.5',
				!embedded && 'rounded border border-secondary bg-panel shadow-md',
				className
			)}
		>
			<div
				className={cn('flex items-center gap-2 bg-bg px-4 py-3 -mt-1.5', embedded && '-mx-1')}
			>
				<Avatar size="md" variant="blue">
					<AvatarFallback>VF</AvatarFallback>
				</Avatar>
				<div className="min-w-0 flex flex-col gap-0.5">
					<span className="text-sm font-medium leading-tight text-ink-dark">Viktor Frankl</span>
					<span className="text-xs font-normal text-ink-light">Psychology Legend</span>
				</div>
			</div>

			<div className={cn('bg-border-secondary h-px', embedded && '-mx-1')} role="separator" />

			<div className="flex items-center justify-between gap-3 px-4 py-3">
				<span className="flex min-w-0 items-center gap-3">
					<GitHub className="size-5 shrink-0" aria-hidden />
					<span className="flex min-w-0 flex-col">
						<span className="body-sm font-normal text-ink-dark">Github</span>
						<span className="text-xs text-ink-light">Active</span>
					</span>
				</span>
				<CaretRight className="size-4 shrink-0 text-icon" aria-hidden />
			</div>

			<div className={cn('bg-border-secondary h-px', embedded && '-mx-1')} role="separator" />

			{profileMenuItems.map(({ icon: Icon, label }) => (
				<div key={label} className="flex items-center gap-2 px-4 py-2 body-sm text-ink">
					<Icon className={iconClass} aria-hidden />
					{label}
				</div>
			))}

			<div className={cn('bg-border-secondary my-1.5 h-px', embedded && '-mx-1')} role="separator" />

			<div className="flex items-center gap-2 px-4 py-2 body-sm text-ink-destructive">
				<SignOut className={iconClass} aria-hidden />
				Log out
			</div>
		</div>
	);
}

export function ProfileDropdownMenuPreview({ className }: { className?: string }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" className={className}>
					<Avatar size="sm" className="mr-2">
						<AvatarFallback variant="blue">VF</AvatarFallback>
					</Avatar>
					Viktor Frankl
					<CaretRight className="ml-1 size-4 rotate-90" aria-hidden />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-[329px] p-0">
				<ProfileDropdownMenuPanel embedded />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Static (always-open) version for hero floating display. */
export function ProfileDropdownMenuStaticPreview({ className }: { className?: string }) {
	return <ProfileDropdownMenuPanel className={className} />;
}

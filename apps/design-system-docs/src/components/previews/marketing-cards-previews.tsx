'use client';

import * as React from 'react';
import {
	Alert,
	AlertAction,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarStack,
	Badge,
	Button,
	ButtonGroup,
	Calendar,
	Card,
	CardContent,
	IconButton,
	Input,
	Progress,
	Tabs,
	TabsList,
	TabsTrigger,
	ToastBar,
} from '@marmoui/ui';
import {
	MdAttachFile,
	MdBarChart,
	MdChecklist,
	MdDateRange,
	MdFolder,
	MdInbox,
	MdLocationOn,
	MdMoreHoriz,
	MdSend,
	MdSnooze,
	MdStar,
	MdDelete,
	MdDrafts,
	MdReport,
	MdInfo,
	MdSearch,
	MdComment,
	MdOutlineEmojiEmotions,
} from 'react-icons/md';
import { cn } from '@/lib/utils';

export {
	ProfileDropdownMenuPreview,
	ProfileDropdownMenuStaticPreview,
} from './dropdown-menu-previews';

function RubyOnRailsIcon({ className }: { className?: string }) {
	return (
		<img src="/ruby-icon.svg" alt="" className={cn('object-contain', className)} aria-hidden />
	);
}

/* ───────────────────────── Project Card ───────────────────────── */

export interface ProjectCardPreviewProps {
	title?: string;
	tag?: string;
	description?: string;
	progress?: number;
	tasks?: string;
	dueDate?: string;
	className?: string;
}

export function ProjectCardPreview({
	title = 'Services Features',
	tag = 'Ruby on Rails',
	description = 'Science is driven by evidence gathered in experiments, and by the falsification of extant theories and their replacement with newer, asymptotically truer, ones.',
	progress = 75,
	tasks = '3/6',
	dueDate = '1 Jan 2023',
	className,
}: ProjectCardPreviewProps) {
	return (
		<Card className={className}>
			<CardContent className="flex flex-col gap-4 p-4">
				<div className="flex items-start gap-3">
					<div className="flex size-16 shrink-0 items-center justify-center rounded-xs bg-red-100">
						<RubyOnRailsIcon className="size-10" />
					</div>
					<div className="flex min-w-0 flex-1 flex-col gap-1 py-1">
						<p className="text-heading-sm font-medium tracking-tight text-ink-dark">{title}</p>
						<Badge
							variant="normal"
							size="sm"
							className="w-fit"
							leftIcon={<RubyOnRailsIcon className="size-3.5" />}
						>
							{tag}
						</Badge>
					</div>
					<IconButton variant="ghost" aria-label="More actions" className="shrink-0">
						<MdMoreHoriz />
					</IconButton>
				</div>

				<p className="body-md text-ink">{description}</p>

				<div className="flex flex-col gap-2 border-t border-border-secondary pt-3">
					<div className="flex items-center justify-between">
						<span className="text-caps-sm font-semibold uppercase tracking-caps-sm text-ink-light">
							Progress
						</span>
						<span className="body-sm text-ink-light">{progress}%</span>
					</div>
					<Progress value={progress} />
				</div>

				<div className="flex items-center justify-between border-t border-border-secondary pt-3">
					<div className="flex items-center gap-4">
						<span className="flex items-center gap-1 body-sm text-ink-light">
							<MdChecklist className="size-4" />
							{tasks}
						</span>
						<span className="flex items-center gap-1 body-sm text-ink-light">
							<MdDateRange className="size-4" />
							{dueDate}
						</span>
					</div>
					<AvatarStack max={3} size="sm">
						<Avatar>
							<AvatarFallback>AB</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback>CD</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback>EF</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback>GH</AvatarFallback>
						</Avatar>
					</AvatarStack>
				</div>
			</CardContent>
		</Card>
	);
}

/* ───────────────────────── Message Card ───────────────────────── */

export interface MessageCardPreviewProps {
	sender?: string;
	time?: string;
	preview?: string;
	unread?: boolean;
	className?: string;
}

export function MessageCardPreview({
	sender = 'John Locke',
	time = '10:20 AM',
	preview = 'Message excerpt goes here and change it dfaaa',
	unread = true,
	className,
}: MessageCardPreviewProps) {
	return (
		<Card className={className}>
			<CardContent className="flex items-center gap-3 p-3">
				{unread && <span className="h-full w-0.5 shrink-0 rounded-full bg-primary-solid" />}
				<Avatar size="md" showStatus statusColor="success">
					<AvatarFallback>
						{sender
							.split(' ')
							.map(n => n[0])
							.join('')
							.slice(0, 2)}
					</AvatarFallback>
				</Avatar>
				<div className="flex min-w-0 flex-1 flex-col">
					<div className="flex items-center justify-between gap-2">
						<p className="truncate text-heading-xs font-medium text-ink-dark">{sender}</p>
						<span className="shrink-0 body-sm text-ink-light">{time}</span>
					</div>
					<p className="truncate body-sm text-ink">{preview}</p>
				</div>
			</CardContent>
		</Card>
	);
}

/* ───────────────────────── Profile Card ───────────────────────── */

export interface ProfileCardPreviewProps {
	name?: string;
	role?: string;
	posts?: string;
	followers?: string;
	following?: string;
	projects?: string;
	location?: string;
	headerImage?: string;
	avatarImage?: string;
	className?: string;
}

export function ProfileCardPreview({
	name = 'Benjamin Franklin',
	role = 'Author',
	posts = '997',
	followers = '373k',
	following = '299',
	projects = '5 Projects',
	location = 'Istanbul, Turkey',
	headerImage = '/marketing/benjamin-header.jpg',
	avatarImage,
	className,
}: ProfileCardPreviewProps) {
	const stats = [
		{ label: 'Posts', value: posts },
		{ label: 'Followers', value: followers },
		{ label: 'Following', value: following },
	];
	return (
		<Card className={className}>
			<div className="relative h-32 w-full overflow-hidden rounded-t-md bg-secondary">
				{headerImage ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={headerImage} alt="" className="size-full object-cover" />
				) : null}
			</div>
			<CardContent className="flex flex-col gap-0 p-0">
				<div className="flex items-end gap-3 px-4 pb-3">
					<Avatar size="xl" className="-mt-10 border-4 border-white">
						{avatarImage ? <AvatarImage src={avatarImage} alt={name} /> : null}
						<AvatarFallback>
							{name
								.split(' ')
								.map(n => n[0])
								.join('')
								.slice(0, 2)}
						</AvatarFallback>
					</Avatar>
					<div className="pb-1">
						<p className="text-heading-xs font-medium text-ink-dark">{name}</p>
						<p className="body-sm text-ink-light">{role}</p>
					</div>
				</div>

				<div className="grid grid-cols-3 border-y border-border-secondary">
					{stats.map((s, i) => (
						<div
							key={s.label}
							className={`flex flex-col items-center py-3 ${i < stats.length - 1 ? 'border-r border-border-secondary' : ''}`}
						>
							<span className="text-heading-sm font-medium text-ink">{s.value}</span>
							<span className="text-caps-sm font-semibold uppercase tracking-caps-sm text-ink-light">
								{s.label}
							</span>
						</div>
					))}
				</div>

				<div className="flex flex-col gap-2 px-4 py-3">
					<span className="flex items-center gap-2 body-md text-ink">
						<MdFolder className="size-5 text-ink-light" />
						{projects}
					</span>
					<span className="flex items-center gap-2 body-md text-ink">
						<MdLocationOn className="size-5 text-ink-light" />
						{location}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}

export function CalendarPreview({ className }: { className?: string }) {
	return <Calendar mode="single" selected={new Date()} onSelect={() => {}} />;
}

/* ───────────────────────── Colored Widget ───────────────────────── */

export interface ColoredWidgetPreviewProps {
	label?: string;
	value?: string | number;
	trend?: string;
	accent?: 'violet' | 'blue' | 'green' | 'orange';
	icon?: React.ReactNode;
	className?: string;
}

const widgetAccents = {
	violet: 'bg-[#6b6ae0] text-white',
	blue: 'bg-[#3b82f6] text-white',
	green: 'bg-[#2f855a] text-white',
	orange: 'bg-[#ff5c8d] text-white',
} as const;

export function ColoredWidgetPreview({
	label = 'New epics',
	value = 32,
	trend = '+43%',
	accent = 'violet',
	icon,
	className,
}: ColoredWidgetPreviewProps) {
	return (
		<div
			className={`flex flex-col gap-3 rounded-md p-4 ${widgetAccents[accent]} ${className ?? ''}`}
		>
			<div className="flex items-start justify-between">
				<span className="flex size-8 items-center justify-center rounded-md bg-white/15">
					{icon ?? <MdChecklist className="size-4" />}
				</span>
				<div className="text-right">
					<p className="text-caps-sm font-semibold uppercase tracking-caps-sm text-white/80">
						{label}
					</p>
					<p className="text-heading-xl font-bold tabular-nums">{value}</p>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<MdBarChart className="size-4 text-white/70" />
				<span className="body-sm text-white/90">{trend}</span>
			</div>
		</div>
	);
}

/* ───────────────────────── Secondary Navigation ───────────────────────── */

export interface SecondaryNavPreviewProps {
	className?: string;
}

const navItems = [
	{ icon: MdInbox, label: 'Inbox', count: '7', active: true },
	{ icon: MdStar, label: 'Starred' },
	{ icon: MdSnooze, label: 'Snoozed', count: '2' },
	{ icon: MdSend, label: 'Sent' },
	{ icon: MdDrafts, label: 'Draft' },
	{ icon: MdReport, label: 'Spam' },
	{ icon: MdDelete, label: 'Trash' },
];

export function SecondaryNavPreview({ className }: SecondaryNavPreviewProps) {
	return (
		<nav className={cn('flex w-full flex-col', className)} aria-label="Secondary navigation">
			{navItems.map(({ icon: Icon, label, count, active }) => (
				<div
					key={label}
					className={cn(
						'flex items-center gap-2 py-2 pl-4 pr-2',
						active ? 'border-l-2 border-primary-solid bg-primary-muted' : 'rounded-sm'
					)}
				>
					<Icon className="size-5 shrink-0 text-icon" aria-hidden />
					<span className="min-w-0 flex-1 text-xs leading-[18px] text-ink">{label}</span>
					{count ? (
						<span className="shrink-0 text-[10px] font-semibold uppercase leading-4 tracking-[0.04em] text-ink">
							{count}
						</span>
					) : null}
				</div>
			))}
		</nav>
	);
}

/** Figma Card-Comment (`7469:54933`) — posted comment row for marketing hero. */
export interface CardCommentPreviewProps {
	author?: string;
	time?: string;
	comment?: string;
	className?: string;
}

export function CardCommentPreview({
	author = 'Brooklyn Simmons',
	time = '8:00 PM',
	comment = 'Read what you love until you love what you read',
	className,
}: CardCommentPreviewProps) {
	const initials = author
		.split(' ')
		.map(part => part[0])
		.join('')
		.slice(0, 2);

	return (
		<Card className={cn('w-full max-w-[309px] bg-transparent shadow-none border-none', className)}>
			<CardContent className="flex items-start gap-3 p-0">
				<Avatar size="md" className="rounded-md">
					<AvatarFallback className="rounded-md">{initials}</AvatarFallback>
				</Avatar>
				<div className="min-w-0 flex flex-1 flex-col gap-0.5">
					<div className="flex items-baseline justify-between gap-2">
						<p className="truncate text-sm font-medium text-ink-dark">{author}</p>
						<span className="shrink-0 text-xs text-ink-light">{time}</span>
					</div>
					<p className="body-sm leading-snug text-ink">{comment}</p>
				</div>
			</CardContent>
		</Card>
	);
}

/* ───────────────────────── Input Comment ───────────────────────── */

/** Figma InputComment — comment composer with avatar, emoji, and send. */
export interface InputCommentPreviewProps {
	author?: string;
	required?: boolean;
	initialValue?: string;
	placeholder?: string;
	helperText?: string;
	className?: string;
}

export function InputCommentPreview({
	author = 'Thaer Shayeb',
	required = true,
	initialValue = 'This looks great',
	placeholder = 'Write a comment…',
	helperText = 'Comment will be public',
	className,
}: InputCommentPreviewProps) {
	const [value, setValue] = React.useState(initialValue);

	return (
		<div className={cn('flex w-full flex-col gap-2', className)}>
			<p className="text-sm font-medium text-ink-dark">
				{author} {required ? <span className="text-destructive">*</span> : null}
			</p>
			<div className="flex items-center gap-2">
				<Avatar size="md" className="shrink-0 rounded-md">
					<AvatarFallback className="rounded-md">TS</AvatarFallback>
				</Avatar>
				<div className="flex min-w-0 flex-1 items-center gap-1 rounded-md border border-border-input bg-panel py-1 pl-3 pr-1 shadow-sm">
					<input
						type="text"
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder={placeholder}
						className="min-w-0 flex-1 border-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
					/>
					<button
						type="button"
						className="flex size-8 shrink-0 items-center justify-center rounded-sm text-icon transition-colors hover:bg-bg"
						aria-label="Insert emoji"
					>
						<MdOutlineEmojiEmotions className="size-5" aria-hidden />
					</button>
					<IconButton
						variant="primary"
						size="sm"
						icon={<MdSend className="size-4 text-white" />}
						aria-label="Send comment"
					/>
				</div>
			</div>
			<p className="body-xs text-ink-light">{helperText}</p>
		</div>
	);
}

/** @deprecated Use `InputCommentPreview` */
export const CommentPreview = InputCommentPreview;
export type CommentPreviewProps = InputCommentPreviewProps;

/* ───────────────────────── Alert Preview (Scheduled Maintenance) ───────────────────────── */

export function ScheduledMaintenanceAlertPreview({ className }: { className?: string }) {
	return (
		<Alert variant="info" className={className}>
			<AlertIcon>
				<MdInfo />
			</AlertIcon>
			<AlertContent>
				<AlertTitle>Scheduled Maintenance</AlertTitle>
				<AlertDescription>
					Our website will be undergoing scheduled maintenance this Saturday from 2 AM to 4 AM.
				</AlertDescription>
				<AlertAction>
					<ButtonGroup attached={false}>
						<Button variant="secondary" size="sm">
							Learn More
						</Button>
						<Button variant="ghost" size="sm">
							Cancel
						</Button>
					</ButtonGroup>
				</AlertAction>
			</AlertContent>
		</Alert>
	);
}

/* ───────────────────────── Task Card Preview ───────────────────────── */

function ReactBadgeIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden
		>
			<circle cx="12" cy="12" r="2.5" fill="#53C1DE" />
			<ellipse cx="12" cy="12" rx="10" ry="4" stroke="#53C1DE" strokeWidth="1.2" />
			<ellipse
				cx="12"
				cy="12"
				rx="10"
				ry="4"
				stroke="#53C1DE"
				strokeWidth="1.2"
				transform="rotate(60 12 12)"
			/>
			<ellipse
				cx="12"
				cy="12"
				rx="10"
				ry="4"
				stroke="#53C1DE"
				strokeWidth="1.2"
				transform="rotate(120 12 12)"
			/>
		</svg>
	);
}

export interface TaskCardPreviewProps {
	title?: string;
	tag?: string;
	attachments?: string;
	tasks?: string;
	comments?: string;
	className?: string;
}

/** Figma Card-Task (`7469:54934`) — horizontal task row for marketing hero. */
export function TaskCardPreview({
	title = 'Image Editor React Component',
	tag = 'React',
	attachments = '1',
	tasks = '3/6',
	comments = '2',
	className,
}: TaskCardPreviewProps) {
	return (
		<Card className={className}>
			<CardContent className="flex h-16 items-center gap-4 p-4">
				<div className="flex min-w-0 flex-1 items-center gap-1.5">
					<p className="truncate text-base font-medium text-ink-dark">{title}</p>
					<Badge
						variant="normal"
						size="sm"
						className="shrink-0"
						leftIcon={<ReactBadgeIcon className="size-3.5" />}
					>
						{tag}
					</Badge>
				</div>
				<div className="flex shrink-0 items-center gap-4">
					<div className="flex items-center gap-4 text-xs text-ink-light">
						<span className="flex items-center gap-1">
							<MdAttachFile className="size-4 shrink-0" aria-hidden />
							{attachments}
						</span>
						<span className="flex items-center gap-1">
							<MdChecklist className="size-4 shrink-0" aria-hidden />
							{tasks}
						</span>
						<span className="flex items-center gap-1">
							<MdComment className="size-4 shrink-0" aria-hidden />
							{comments}
						</span>
					</div>
					<Avatar size="md" badgeCount={2}>
						<AvatarFallback variant="blue">TS</AvatarFallback>
					</Avatar>
				</div>
			</CardContent>
		</Card>
	);
}

/* ───────────────────────── Toasts Preview ───────────────────────── */

/** Static toast bars for marketing — never auto-dismiss (no live Sonner queue). */
export function ToastsPreview({
	className,
	commentClassName,
}: {
	className?: string;
	commentClassName?: string;
}) {
	return (
		<div className={cn('flex gap-5', className)}>
			<ToastBar
				title="Info Toasts"
				variant="info"
				action={{ label: 'Undo' }}
				showCloseButton={false}
				className="min-w-0 flex-1"
			/>
			<div className="flex min-w-0 flex-1 flex-col gap-5">
				<ToastBar
					title="Success Toasts"
					variant="success"
					action={{ label: 'Undo' }}
					showCloseButton={false}
				/>
			</div>
		</div>
	);
}

/* ───────────────────────── Board Tabs Preview ───────────────────────── */

export function BoardTabsPreview({ className }: { className?: string }) {
	return (
		<Tabs defaultValue="board" className={className}>
			<TabsList variant="line">
				<TabsTrigger value="board">Board</TabsTrigger>
				<TabsTrigger value="calendar">Calendar</TabsTrigger>
				<TabsTrigger value="activity">Activity</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}

/* ───────────────────────── Badges Preview ───────────────────────── */

export function StatusBadgesPreview({ className }: { className?: string }) {
	return (
		<div className={`flex flex-wrap gap-1.5 ${className ?? ''}`}>
			<Badge variant="success" size="sm">
				Successful
			</Badge>
			<Badge variant="warning" size="sm">
				Limited
			</Badge>
			<Badge variant="info" size="sm">
				Application Tour
			</Badge>
		</div>
	);
}

/* ───────────────────────── Inputs Preview ───────────────────────── */

export function InputsPreview({ className }: { className?: string }) {
	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<div className="flex flex-col gap-1.5">
				<span className="text-xs font-medium text-ink-dark">Text Field</span>
				<Input
					size="sm"
					placeholder="Enter project name"
					startAdornment={<MdAttachFile className="size-4" />}
				/>
			</div>
			<div className="flex flex-col gap-1.5">
				<span className="text-xs font-medium text-ink-dark">Search</span>
				<Input size="sm" placeholder="Search…" startAdornment={<MdSearch className="size-4" />} />
			</div>
		</div>
	);
}

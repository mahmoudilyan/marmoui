'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogProvider,
	DialogManager,
	useDialog,
	Button,
	Input,
	Checkbox,
	ScrollArea,
	DialogStack,
	DialogStackTrigger,
	DialogStackOverlay,
	DialogStackBody,
	DialogStackContent,
	DialogStackHeader,
	DialogStackTitle,
	DialogStackDescription,
	DialogStackFooter,
	DialogStackNext,
	DialogStackPrevious,
} from '@marmoui/ui';
import type { DialogManagerConfig } from '@marmoui/ui';
import {
	MdDelete,
	MdPersonAdd,
	MdEmail,
	MdSettings,
	MdPerson,
	MdFacebook,
	MdLink,
	MdBarChart,
	MdSmartToy,
	MdGroup,
} from 'react-icons/md';

// ─── Pattern 1: No Header (Simple Confirmation) ────────────────────────────

/** Small simple confirmation — no DialogHeader, title/description directly in content */
export function DialogBasicPreview() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					Open Dialog
				</Button>
			</DialogTrigger>
			<DialogContent size="sm">
				<DialogTitle>Are you sure you want to perform this action?</DialogTitle>
				<DialogDescription>
					Please confirm your intention to proceed by clicking the "Confirm" button below.
				</DialogDescription>
				<DialogFooter>
					<Button variant="secondary">Cancel</Button>
					<Button variant="primary">Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/** Medium confirmation with "Don't show me again" checkbox — no DialogHeader */
export function DialogConfirmationPreview() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">Show Confirmation</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Are you sure you want to perform this action?</DialogTitle>
				<DialogDescription>
					Please confirm your intention to proceed by clicking the "Confirm" button below.
				</DialogDescription>
				<DialogFooter className="sm:justify-between sm:items-center">
					<label className="flex items-center gap-2 text-sm cursor-pointer select-none">
						<Checkbox />
						Don&apos;t show me this again
					</label>
					<div className="flex gap-2">
						<Button variant="secondary">Cancel</Button>
						<Button variant="primary">Confirm</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/** Destructive confirmation — no DialogHeader, red Delete button */
export function DialogDestructivePreview() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive" size="sm">
					Delete Item
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Are you sure you want to perform this delete action?</DialogTitle>
				<DialogDescription>
					Please confirm your intention to proceed by clicking the "Delete" button below.
				</DialogDescription>
				<DialogFooter className="sm:justify-between sm:items-center">
					<label className="flex items-center gap-2 text-sm cursor-pointer select-none">
						<Checkbox />
						Don&apos;t show me this again
					</label>
					<div className="flex gap-2">
						<Button variant="secondary">Cancel</Button>
						<Button variant="destructive">Delete</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// ─── Pattern 2: With Header ─────────────────────────────────────────────────

/** Form dialog with DialogHeader — Create Audience style */
export function DialogFormPreview() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="primary" size="sm">
					Create Audience
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Audience</DialogTitle>
				</DialogHeader>
				<div className="pt-4">
					<div className="mb-2">
						<label className="text-sm font-medium">
							Audience Name <span className="text-red-500">*</span>
						</label>
						<Input placeholder="e.g. All Subscribers" />
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Matching Lists</label>
						<Input placeholder="All Lists" />
					</div>
				</div>
				<DialogFooter>
					<Button variant="secondary">Cancel</Button>
					<Button variant="primary">Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/** Settings dialog — large with DialogHeader + left sidebar navigation */
export function DialogSettingsPreview() {
	const [activeSection, setActiveSection] = useState('general');

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					Campaign Settings
				</Button>
			</DialogTrigger>
			<DialogContent size="lg">
				<DialogHeader>
					<DialogTitle>Campaign Settings</DialogTitle>
				</DialogHeader>
				<div className="flex -mx-6 -mb-6 overflow-hidden rounded-b-lg min-h-[360px]">
					{/* Sidebar */}
					<div className="w-52 border-r border-border-secondary shrink-0 p-2 bg-bg">
						<button
							className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm transition-colors ${
								activeSection === 'general'
									? 'bg-primary-subtle text-primary font-medium'
									: 'text-ink hover:bg-border/30'
							}`}
							onClick={() => setActiveSection('general')}
						>
							<MdSettings className="w-4 h-4 shrink-0" />
							General Settings
						</button>
						<button
							className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm transition-colors ${
								activeSection === 'shortcodes'
									? 'bg-primary-subtle text-primary font-medium'
									: 'text-ink hover:bg-border/30'
							}`}
							onClick={() => setActiveSection('shortcodes')}
						>
							<MdPerson className="w-4 h-4 shrink-0" />
							Shortcodes
						</button>
					</div>
					{/* Content */}
					<div className="flex-1 p-6 flex flex-col gap-4">
						{activeSection === 'general' ? (
							<>
								<div>
									<h3 className="font-medium text-ink-dark">Default Sending Values</h3>
									<p className="text-sm text-ink-light mt-1">
										Sending defaults prefill required data when composing a campaign so you
										don&apos;t have to reinsert them each time.
									</p>
								</div>
								<div className="space-y-1">
									<label className="text-sm font-medium">
										Reply to <span className="text-red-500">*</span>
									</label>
									<Input placeholder="email@example.com" />
								</div>
							</>
						) : (
							<div>
								<h3 className="font-medium text-ink-dark">Shortcodes</h3>
								<p className="text-sm text-ink-light mt-1">Manage your campaign shortcodes here.</p>
							</div>
						)}
						<div className="mt-auto flex justify-end gap-2 pt-4 border-t border-border-secondary">
							<Button variant="secondary" size="sm">
								Cancel
							</Button>
							<Button variant="primary" size="sm">
								Save
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

// ─── Management Panel ────────────────────────────────────────────────────────

type ConnectionCategory = 'social' | 'webinars' | 'crms';

const connectionCategories: Record<
	ConnectionCategory,
	{ label: string; icon: React.ReactNode; items: { id: string; name: string; count: number }[] }
> = {
	social: {
		label: 'Social Media',
		icon: <MdFacebook />,
		items: [
			{ id: 'facebook', name: 'Facebook', count: 7 },
			{ id: 'twitter', name: 'Twitter', count: 2 },
			{ id: 'instagram', name: 'Instagram', count: 0 },
		],
	},
	webinars: {
		label: 'Webinars',
		icon: <MdGroup />,
		items: [
			{ id: 'zoom', name: 'Zoom', count: 3 },
			{ id: 'teams', name: 'MS Teams', count: 1 },
		],
	},
	crms: {
		label: 'CRMs',
		icon: <MdLink />,
		items: [
			{ id: 'salesforce', name: 'Salesforce', count: 0 },
			{ id: 'hubspot', name: 'HubSpot', count: 2 },
		],
	},
};

/**
 * Management Panel — NOT a single action dialog. A navigation hub where users
 * browse and manage grouped items. No confirm/cancel footer — actions are inline.
 */
export function DialogManagementPanelPreview() {
	const [activeItem, setActiveItem] = useState('facebook');

	const allItems = Object.values(connectionCategories).flatMap(c => c.items);
	const selected = allItems.find(i => i.id === activeItem);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					Manage Connections
				</Button>
			</DialogTrigger>
			<DialogContent size="lg">
				<DialogHeader>
					<DialogTitle>Manage Connections</DialogTitle>
				</DialogHeader>
				<div className="-mx-6 -mb-6 flex overflow-hidden rounded-b-lg min-h-[360px]">
					{/* Navigation sidebar */}
					<div className="w-52 border-r border-border-secondary shrink-0 p-2 bg-bg space-y-3">
						{Object.entries(connectionCategories).map(([key, { label, items }]) => (
							<div key={key}>
								<p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider px-3 py-1">
									{label}
								</p>
								{items.map(item => (
									<button
										key={item.id}
										className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors ${
											activeItem === item.id
												? 'bg-primary-subtle text-primary font-medium'
												: 'text-ink hover:bg-border/30'
										}`}
										onClick={() => setActiveItem(item.id)}
									>
										<span>{item.name}</span>
										{item.count > 0 && <span className="text-xs text-ink-muted">{item.count}</span>}
									</button>
								))}
							</div>
						))}
					</div>
					{/* Contextual content — changes per selection, no global footer */}
					<div className="flex-1 p-6">
						<h3 className="font-medium text-ink-dark mb-2">Add {selected?.name} Account</h3>
						<p className="text-sm text-ink-light mb-4">
							Connect your {selected?.name} account to start managing and scheduling posts directly
							from the platform.
						</p>
						<Button variant="primary" size="sm">
							Connect Account
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

// ─── Scroll Patterns ────────────────────────────────────────────────────────

/**
 * Sticky footer with scrollable content — uses the `scrollable` prop which applies
 * max-h + flex-col layout. DialogHeader and DialogFooter stay pinned; ScrollArea fills
 * the remaining height and scrolls its content.
 */
export function DialogStickyFooterPreview() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					Sticky Footer
				</Button>
			</DialogTrigger>
			<DialogContent scrollable>
				<DialogHeader>
					<DialogTitle>Create Contact</DialogTitle>
				</DialogHeader>

				<ScrollArea className="min-h-0 -ml-6 -mr-6">
					<div className="pt-6 space-y-4 pr-6 pl-6">
						<Input placeholder="First Name" />
						<Input placeholder="Last Name" />
						<Input placeholder="Email Address" />
						<Input placeholder="Phone Number" />
						<Input placeholder="Company" />
						<Input placeholder="Job Title" />
						<Input placeholder="Address Line 1" />
						<Input placeholder="Address Line 2" />
						<Input placeholder="City" />
						<Input placeholder="State / Province" />
						<Input placeholder="ZIP / Postal Code" />
						<Input placeholder="Country" />
					</div>
				</ScrollArea>

				<DialogFooter>
					<Button variant="secondary" size="sm">
						Cancel
					</Button>
					<Button variant="primary" size="sm">
						Create Contact
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/**
 * Scrollable content list — header stays pinned, the list scrolls.
 * No footer: selection or dismissal happens via the X button or row click.
 */
export function DialogScrollableContentPreview() {
	const templates = [
		'Welcome Email',
		'Order Confirmation',
		'Shipping Notification',
		'Password Reset',
		'Weekly Newsletter',
		'Abandoned Cart',
		'Re-engagement Campaign',
		'Product Announcement',
		'Event Invitation',
		'Survey Request',
		'Referral Program',
		'Account Upgrade',
	];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					Scrollable Content
				</Button>
			</DialogTrigger>
			<DialogContent scrollable>
				<DialogHeader>
					<DialogTitle>Choose a Template</DialogTitle>
				</DialogHeader>

				<ScrollArea className="min-h-0 -ml-6 -mr-6">
					<div className="">
						{templates.map((name, i) => (
							<div
								key={i}
								className="flex items-center gap-3 py-3 border-b border-border-secondary last:border-0 cursor-pointer hover:bg-bg transition-colors pl-6 pr-6"
							>
								<div className="h-8 w-8 bg-secondary rounded shrink-0 flex items-center justify-center text-xs font-medium text-ink-light">
									{i + 1}
								</div>
								<div>
									<p className="text-sm font-medium text-ink-dark">{name}</p>
									<p className="text-xs text-ink-light">Email template</p>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}

/**
 * Second sticky footer example — multi-section settings form.
 * Demonstrates `scrollable` with grouped content (sections + checkboxes).
 */
export function DialogStickyFooterAltPreview() {
	const sections = [
		{
			title: 'Email Notifications',
			items: [
				'New campaign published',
				'Campaign performance report',
				'New subscriber joined',
				'Unsubscribe event',
			],
		},
		{
			title: 'In-App Notifications',
			items: ['Task assigned to you', 'Comment on your campaign', 'Weekly digest'],
		},
		{
			title: 'Security Alerts',
			items: ['Login from new device', 'Password changed', 'Two-factor authentication disabled'],
		},
	];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					Sticky Footer (Settings)
				</Button>
			</DialogTrigger>
			<DialogContent scrollable>
				<DialogHeader>
					<DialogTitle>Notification Preferences</DialogTitle>
					<DialogDescription>Choose when and how you get notified.</DialogDescription>
				</DialogHeader>

				<ScrollArea className="min-h-0">
					<div className="py-6 pr-2 space-y-6">
						{sections.map(section => (
							<div key={section.title}>
								<p className="text-xs font-medium text-ink-light uppercase tracking-wide mb-3">
									{section.title}
								</p>
								<div className="space-y-3">
									{section.items.map(item => (
										<label key={item} className="flex items-center justify-between cursor-pointer">
											<span className="text-sm text-ink">{item}</span>
											<Checkbox defaultChecked />
										</label>
									))}
								</div>
							</div>
						))}
					</div>
				</ScrollArea>

				<DialogFooter className="mt-0 pt-6 border-t border-border-secondary">
					<Button variant="secondary" size="sm">
						Cancel
					</Button>
					<Button variant="primary" size="sm">
						Save Preferences
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/**
 * Outside scroll — the dialog grows naturally with its content; no internal max-height.
 * The backdrop overlay becomes the scroll container so the user scrolls the page behind
 * the dialog rather than an internal area.
 */
export function DialogOutsideScrollPreview() {
	const sections = [
		{
			title: '1. Acceptance of Terms',
			body: 'By accessing or using our platform, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you may not access the service.',
		},
		{
			title: '2. Use of Service',
			body: 'You may use our service only for lawful purposes and in accordance with these Terms. You agree not to use the service in any way that violates applicable local, national, or international law or regulation.',
		},
		{
			title: '3. Intellectual Property',
			body: 'The service and its original content, features, and functionality are and will remain the exclusive property of the company and its licensors. The service is protected by copyright, trademark, and other laws.',
		},
		{
			title: '4. Privacy Policy',
			body: 'Your use of the service is also governed by our Privacy Policy, which is incorporated into these Terms by this reference. Please review our Privacy Policy, which describes our practices.',
		},
		{
			title: '5. Termination',
			body: 'We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.',
		},
		{
			title: '6. Limitation of Liability',
			body: 'In no event shall the company, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.',
		},
		{
			title: '7. Changes to Terms',
			body: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.',
		},
	];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					Outside Scroll
				</Button>
			</DialogTrigger>
			<DialogContent outsideScroll>
				<DialogTitle>Terms &amp; Conditions</DialogTitle>
				<DialogDescription>
					Please read the full agreement before accepting. Scroll down to see all sections.
				</DialogDescription>

				<div className="pt-6 space-y-5">
					{sections.map((s, i) => (
						<div key={i}>
							<h4 className="text-sm font-medium text-ink-dark mb-1">{s.title}</h4>
							<p className="text-sm text-ink-light leading-relaxed">{s.body}</p>
						</div>
					))}
				</div>

				<DialogFooter>
					<Button variant="secondary" size="sm">
						Decline
					</Button>
					<Button variant="primary" size="sm">
						Accept &amp; Continue
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// ─── Controlled ─────────────────────────────────────────────────────────────

/** Controlled dialog — open/close via React state. No header — simple single-purpose dialog. */
export function DialogControlledPreview() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Open Controlled</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Controlled Dialog</DialogTitle>
				<DialogDescription>This dialog state is controlled by React state.</DialogDescription>
				<p className="text-sm">
					Open state: <span className="font-mono text-primary-solid">{String(open)}</span>
				</p>
				<DialogFooter>
					<Button variant="secondary" onClick={() => setOpen(false)}>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// ─── All Sizes ───────────────────────────────────────────────────────────────

/** All sizes side by side */
export function DialogSizesPreview() {
	return (
		<div className="flex gap-2 flex-wrap">
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="secondary" size="sm">
						Small (320px)
					</Button>
				</DialogTrigger>
				<DialogContent size="sm">
					<DialogTitle>Small Dialog</DialogTitle>
					<DialogDescription>320px — quick confirmations and simple prompts.</DialogDescription>
					<DialogFooter>
						<Button variant="secondary">Cancel</Button>
						<Button variant="primary">Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger asChild>
					<Button variant="secondary" size="sm">
						Medium (620px)
					</Button>
				</DialogTrigger>
				<DialogContent size="md">
					<DialogTitle>Medium Dialog</DialogTitle>
					<DialogDescription>620px — default size for most dialogs and forms.</DialogDescription>
					<DialogFooter>
						<Button variant="secondary">Cancel</Button>
						<Button variant="primary">Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger asChild>
					<Button variant="secondary" size="sm">
						Large (980px)
					</Button>
				</DialogTrigger>
				<DialogContent size="lg">
					<DialogHeader>
						<DialogTitle>Large Dialog</DialogTitle>
						<DialogDescription>980px — settings panels, complex forms, sidebars.</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="secondary">Cancel</Button>
						<Button variant="primary">Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger asChild>
					<Button variant="secondary" size="sm">
						Extra Large (1120px)
					</Button>
				</DialogTrigger>
				<DialogContent size="xl">
					<DialogHeader>
						<DialogTitle>Extra Large Dialog</DialogTitle>
						<DialogDescription>1120px — rich content, data tables, wide layouts.</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="secondary">Cancel</Button>
						<Button variant="primary">Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger asChild>
					<Button variant="secondary" size="sm">
						Full
					</Button>
				</DialogTrigger>
				<DialogContent size="full">
					<DialogHeader>
						<DialogTitle>Full Screen Dialog</DialogTitle>
					</DialogHeader>
					<ScrollArea className="min-h-0">
						<div className="py-6 pr-2 space-y-4 max-w-2xl">
							<p className="text-sm text-ink-light">
								Covers the entire viewport — ideal for immersive flows, editors, or mobile-first
								layouts. The content area grows to fill all available space between the header and
								footer and scrolls when content overflows.
							</p>
							{Array.from({ length: 12 }).map((_, i) => (
								<p key={i} className="text-sm text-ink-light">
									Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
									veniam, quis nostrud exercitation ullamco laboris.
								</p>
							))}
						</div>
					</ScrollArea>
					<DialogFooter>
						<Button variant="secondary">Cancel</Button>
						<Button variant="primary">Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

// ─── useDialog + DialogManager previews ────────────────────────────────────

/** Sample dialog component for the registry */
function DeleteCampaignDialog({
	onClose,
	dialogTitle = 'Delete Campaign',
	dialogDescription = 'This action cannot be undone.',
	campaignName = 'this campaign',
}: {
	onClose: () => void;
	dialogTitle?: string;
	dialogDescription?: string;
	campaignName?: string;
}) {
	return (
		<>
			<DialogTitle>{dialogTitle}</DialogTitle>
			<DialogDescription>
				Are you sure you want to delete{' '}
				<span className="font-semibold text-ink">{campaignName}</span>? This will permanently remove
				the campaign and all associated data.
			</DialogDescription>
			<DialogFooter>
				<Button variant="secondary" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="destructive" onClick={onClose}>
					Delete Campaign
				</Button>
			</DialogFooter>
		</>
	);
}

function CreateContactDialog({ onClose }: { onClose: () => void }) {
	return (
		<>
			<DialogHeader>
				<DialogTitle>Create Contact</DialogTitle>
			</DialogHeader>
			<form className="space-y-4 py-4">
				<div>
					<label className="text-sm font-medium">Email</label>
					<Input placeholder="john@example.com" />
				</div>
				<div>
					<label className="text-sm font-medium">Name</label>
					<Input placeholder="John Doe" />
				</div>
			</form>
			<DialogFooter>
				<Button variant="secondary" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="primary" onClick={onClose}>
					Create Contact
				</Button>
			</DialogFooter>
		</>
	);
}

function SendEmailDialog({ onClose, contactName }: { onClose: () => void; contactName?: string }) {
	const { openDialog } = useDialog();
	return (
		<>
			<DialogTitle>Send Email</DialogTitle>
			<DialogDescription>
				{contactName ? `Send an email to ${contactName}` : 'Compose a new email'}
			</DialogDescription>
			<form>
				<div>
					<label className="text-sm font-medium">Subject</label>
					<Input placeholder="Email subject..." />
				</div>
			</form>
			<DialogFooter>
				<Button variant="secondary" onClick={onClose}>
					Cancel
				</Button>
				<Button
					variant="primary"
					onClick={() =>
						openDialog('createContact', {
							contactName: contactName,
						})
					}
				>
					Create Contact
				</Button>
			</DialogFooter>
		</>
	);
}

/** Demo dialog config for the preview */
const demoDialogConfig: DialogManagerConfig = {
	dialogs: {
		deleteCampaign: DeleteCampaignDialog,
		createContact: CreateContactDialog,
		sendEmail: SendEmailDialog,
	},
	defaultConfig: {
		size: 'md',
		closeOnEscape: true,
		closeOnInteractOutside: true,
	},
};

/** Buttons that call openDialog — must be inside DialogProvider */
function UseDialogDemoButtons() {
	const { openDialog, closeDialog } = useDialog();

	return (
		<div className="space-y-4">
			<p className="text-sm text-ink-light">
				Click any button to open a dialog via{' '}
				<code className="text-xs bg-bg px-1 py-0.5 rounded">useDialog()</code>:
			</p>
			<div className="flex gap-2 flex-wrap">
				<Button
					variant="destructive"
					size="sm"
					onClick={() =>
						openDialog('deleteCampaign', {
							dialogTitle: 'Delete "Summer Sale"?',
							dialogDescription: 'This action cannot be undone.',
							campaignName: 'Summer Sale',
							onClose: () => {
								(console.log('Campaign deleted'), closeDialog());
							},
						})
					}
				>
					<MdDelete className="mr-1" /> Delete Campaign
				</Button>
				<Button variant="primary" size="sm" onClick={() => openDialog('createContact')}>
					<MdPersonAdd className="mr-1" /> Create Contact
				</Button>
				<Button
					variant="secondary"
					size="sm"
					onClick={() =>
						openDialog('sendEmail', {
							contactName: 'Jane Smith',
						})
					}
				>
					<MdEmail className="mr-1" /> Send Email
				</Button>
			</div>
		</div>
	);
}

/** Full useDialog + DialogManager preview */
export function UseDialogPreview() {
	return (
		<DialogProvider>
			<div className="p-4 bg-bg border border-border rounded-lg">
				<UseDialogDemoButtons />
			</div>
			<DialogManager config={demoDialogConfig} />
		</DialogProvider>
	);
}

/** Dialog stack preview — uses DialogStack component with visual stacking */
export function DialogStackPreview() {
	return (
		<DialogStack>
			<DialogStackTrigger asChild>
				<Button>Open Stacked Dialogs</Button>
			</DialogStackTrigger>
			<DialogStackOverlay />
			<DialogStackBody>
				<DialogStackContent>
					<DialogStackHeader>
						<DialogStackTitle>Campaign Details</DialogStackTitle>
						<DialogStackDescription>
							Fill in the basic information for your campaign.
						</DialogStackDescription>
					</DialogStackHeader>
					<div className="space-y-4 py-4">
						<div>
							<label className="text-sm font-medium">Campaign Name</label>
							<Input placeholder="Summer Sale 2026" />
						</div>
					</div>
					<DialogStackFooter>
						<DialogStackPrevious asChild>
							<Button variant="secondary" size="sm">
								Previous
							</Button>
						</DialogStackPrevious>
						<DialogStackNext asChild>
							<Button variant="primary" size="sm">
								Next
							</Button>
						</DialogStackNext>
					</DialogStackFooter>
				</DialogStackContent>

				<DialogStackContent>
					<DialogStackHeader>
						<DialogStackTitle>Select Audience</DialogStackTitle>
						<DialogStackDescription>Choose who will receive this campaign.</DialogStackDescription>
					</DialogStackHeader>
					<div className="space-y-4 py-4">
						<div>
							<label className="text-sm font-medium">Audience Segment</label>
							<Input placeholder="All subscribers" />
						</div>
					</div>
					<DialogStackFooter>
						<DialogStackPrevious asChild>
							<Button variant="secondary" size="sm">
								Previous
							</Button>
						</DialogStackPrevious>
						<DialogStackNext asChild>
							<Button variant="primary" size="sm">
								Next
							</Button>
						</DialogStackNext>
					</DialogStackFooter>
				</DialogStackContent>

				<DialogStackContent>
					<DialogStackHeader>
						<DialogStackTitle>Review &amp; Send</DialogStackTitle>
						<DialogStackDescription>
							Review your campaign settings before sending.
						</DialogStackDescription>
					</DialogStackHeader>
					<div className="py-4">
						<p className="text-sm text-ink-light">
							Everything looks good. Click send to launch your campaign.
						</p>
					</div>
					<DialogStackFooter>
						<DialogStackPrevious asChild>
							<Button variant="secondary" size="sm">
								Previous
							</Button>
						</DialogStackPrevious>
						<Button variant="primary" size="sm">
							Send Campaign
						</Button>
					</DialogStackFooter>
				</DialogStackContent>
			</DialogStackBody>
		</DialogStack>
	);
}

/** Clickable dialog stack preview */
export function DialogStackClickablePreview() {
	return (
		<DialogStack clickable>
			<DialogStackTrigger asChild>
				<Button variant="secondary">Open Clickable Stack</Button>
			</DialogStackTrigger>
			<DialogStackOverlay />
			<DialogStackBody>
				<DialogStackContent>
					<DialogStackHeader>
						<DialogStackTitle>Step 1: Details</DialogStackTitle>
						<DialogStackDescription>Click any previous dialog to go back.</DialogStackDescription>
					</DialogStackHeader>
					<div className="py-4">
						<Input placeholder="Enter details..." />
					</div>
					<DialogStackFooter>
						<DialogStackNext asChild>
							<Button variant="primary" size="sm">
								Next
							</Button>
						</DialogStackNext>
					</DialogStackFooter>
				</DialogStackContent>

				<DialogStackContent>
					<DialogStackHeader>
						<DialogStackTitle>Step 2: Content</DialogStackTitle>
						<DialogStackDescription>
							Click the card behind to go back to Step 1.
						</DialogStackDescription>
					</DialogStackHeader>
					<div className="py-4">
						<Input placeholder="Enter content..." />
					</div>
					<DialogStackFooter>
						<DialogStackPrevious asChild>
							<Button variant="secondary" size="sm">
								Previous
							</Button>
						</DialogStackPrevious>
						<DialogStackNext asChild>
							<Button variant="primary" size="sm">
								Next
							</Button>
						</DialogStackNext>
					</DialogStackFooter>
				</DialogStackContent>

				<DialogStackContent>
					<DialogStackHeader>
						<DialogStackTitle>Step 3: Confirm</DialogStackTitle>
						<DialogStackDescription>Click previous cards to navigate back.</DialogStackDescription>
					</DialogStackHeader>
					<div className="py-4">
						<p className="text-sm text-ink-light">Ready to submit.</p>
					</div>
					<DialogStackFooter>
						<DialogStackPrevious asChild>
							<Button variant="secondary" size="sm">
								Previous
							</Button>
						</DialogStackPrevious>
						<Button variant="primary" size="sm">
							Submit
						</Button>
					</DialogStackFooter>
				</DialogStackContent>
			</DialogStackBody>
		</DialogStack>
	);
}

/** Individual dialog component pattern preview */
export function DialogComponentPatternPreview({
	dialogTitle,
	dialogDescription,
	campaignName,
	onClose,
}: {
	dialogTitle: string;
	dialogDescription: string;
	campaignName: string;
	onClose: () => void;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive" size="sm">
					Delete Campaign
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogDescription>
					{dialogDescription || `Are you sure you want to delete this ${campaignName}?`}
				</DialogDescription>
				<DialogFooter>
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={onClose}>
						Delete Campaign
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

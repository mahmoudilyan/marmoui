'use client';

import type { ReactNode } from 'react';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	DatePicker,
	Field,
	IconButton,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@marmoui/ui';
import {
	MdBusiness,
	MdLocationOn,
	MdPhoneIphone,
	MdSend,
	MdSettings,
	MdShoppingCart,
	MdTableRows,
	MdMoreHoriz,
} from 'react-icons/md';

export function CardStatsPreview() {
	const stats = [
		{ label: 'Sent', value: '13,796' },
		{ label: 'Opened', value: '2,197 - 15.92%' },
		{ label: 'Unique Clicks', value: '49 - (29 unique) - 0.21%' },
		{ label: 'Click Conversions', value: '4 - (2%)' },
		{ label: 'Ecommerce Conversions', value: '37 | $4.4' },
		{ label: 'Unsubscribed', value: '7 - 0.05%' },
	];

	return (
		<div className="grid gap-space-md md:grid-cols-3">
			{stats.map(stat => (
				<Card key={stat.label}>
					<CardContent className="px-space-md py-space-md">
						<p className="text-caps-sm font-medium uppercase tracking-caps-sm text-ink-light">
							{stat.label}
						</p>
						<p className="mt-space-2xs text-heading-md font-medium text-ink-dark">{stat.value}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

export function CardContactProfilePreview() {
	return (
		<Card className="max-w-md overflow-hidden">
			<CardHeader>
				<div className="flex justify-between gap-4">
					<Avatar size="lg">
						<AvatarImage src="https://api.dicebear.com/9.x/lorelei/svg" alt="User Avatar" />
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-2 items-start">
						<div className="flex gap-1 items-center">
							<CardTitle className="text-heading-md font-medium text-ink-dark">John Doe</CardTitle>
							<CardDescription className="text-ink-light">johndoe@company.com</CardDescription>
						</div>
						<Badge variant="success">Repeated Customers 120</Badge>
						<ButtonGroup attached={false} size="sm">
							<IconButton variant="secondary" icon={<MdSend />} aria-label="Send Email" />
							<IconButton variant="secondary" icon={<MdMoreHoriz />} aria-label="Delete" />
						</ButtonGroup>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<dl className="grid gap-space-sm text-sm">
					<ContactDetail icon={<MdLocationOn />} label="Location" value="California, USA" />
					<ContactDetail icon={<MdPhoneIphone />} label="Phone" value="-" />
					<ContactDetail icon={<MdBusiness />} label="Company" value="Acme Inc." />
					<ContactDetail icon={<MdTableRows />} label="Lists" value="4" emphasize />
					<ContactDetail icon={<MdShoppingCart />} label="E-Commerce" value="2" emphasize />
				</dl>
			</CardContent>
		</Card>
	);
}

function ContactDetail({
	icon,
	label,
	value,
	emphasize = false,
}: {
	icon: ReactNode;
	label: string;
	value: string;
	emphasize?: boolean;
}) {
	return (
		<div className="flex items-center justify-between gap-space-md">
			<dt className="flex min-w-0 items-center gap-space-xs text-ink">
				<span className="text-icon">{icon}</span>
				<span className="truncate">{label}</span>
			</dt>
			<dd className={emphasize ? 'font-medium text-primary-solid' : 'text-ink-light'}>{value}</dd>
		</div>
	);
}

export function CardContactFieldsPreview() {
	const fields = [
		['Package', '-'],
		['Address', 'Los Angeles, CA'],
		['Shipping Address', 'San Francisco, CA'],
		['Contact Number', 'N/A'],
		['Business Name', 'TechCorp'],
		['Total Spend', '$50.00'],
		['Customer Segments', '5'],
	];

	return (
		<Card className="max-w-md overflow-hidden">
			<CardHeader>
				<CardTitle>Contact Fields</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid gap-space-sm text-sm">
					{fields.map(([label, value]) => (
						<div key={label} className="flex justify-between gap-space-md">
							<dt className="text-ink">{label}</dt>
							<dd className="text-right text-ink-light">{value}</dd>
						</div>
					))}
				</dl>
			</CardContent>
		</Card>
	);
}

export function CardContentActionsPreview() {
	return (
		<Card className="max-w-xl overflow-hidden">
			<CardHeader className="border-b border-border-secondary p-space-lg">
				<div className="flex items-center justify-between gap-space-md">
					<CardTitle>Lists History</CardTitle>
					<IconButton
						className="-mt-1"
						variant="ghost"
						size="sm"
						aria-label="Configure chart"
						icon={<MdSettings />}
					/>
				</div>
				<div className="flex flex-wrap gap-space-xs pt-space-sm">
					<Select defaultValue="all">
						<SelectTrigger className="w-40">
							<SelectValue placeholder="Select list" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Lists</SelectItem>
							<SelectItem value="customers">Customers</SelectItem>
							<SelectItem value="leads">Leads</SelectItem>
						</SelectContent>
					</Select>
					<DatePicker placeholder="Select date range" isRange triggerType="input" />
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex h-20 items-center justify-center">Dynamic content goes here</div>
			</CardContent>
		</Card>
	);
}

export function CardFormAlternativePreview() {
	return (
		<form className="mx-auto w-full max-w-2xl space-y-4" onSubmit={event => event.preventDefault()}>
			<Field label="First name" required>
				<Input placeholder="Ava" required />
			</Field>
			<Field label="Email" required>
				<Input type="email" placeholder="ava@example.com" required />
			</Field>
			<div className="flex justify-end gap-2">
				<Button variant="secondary" type="button">
					Cancel
				</Button>
				<Button type="submit">Save contact</Button>
			</div>
		</form>
	);
}

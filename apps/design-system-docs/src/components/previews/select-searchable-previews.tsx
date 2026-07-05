'use client';

import * as React from 'react';
import { SelectSearchable } from '@marmoui/ui';

const frameworks = [
	{ label: 'Next.js', value: 'next', description: 'React framework by Vercel' },
	{ label: 'SvelteKit', value: 'sveltekit', description: 'Svelte meta-framework' },
	{ label: 'Nuxt', value: 'nuxt', description: 'Vue.js framework' },
	{ label: 'Remix', value: 'remix', description: 'Full stack React framework' },
	{ label: 'Astro', value: 'astro', description: 'Content-focused framework' },
	{ label: 'Gatsby', value: 'gatsby', description: 'Static site generator' },
];

const countries = [
	{ label: 'United States', value: 'us' },
	{ label: 'United Kingdom', value: 'uk' },
	{ label: 'Canada', value: 'ca' },
	{ label: 'Australia', value: 'au' },
	{ label: 'Germany', value: 'de' },
	{ label: 'France', value: 'fr' },
	{ label: 'Japan', value: 'jp' },
	{ label: 'Brazil', value: 'br' },
	{ label: 'India', value: 'in' },
	{ label: 'Mexico', value: 'mx' },
];

const tags = [
	{ label: 'VIP Customer', value: 'vip' },
	{ label: 'New Lead', value: 'new-lead' },
	{ label: 'Returning', value: 'returning' },
	{ label: 'High Value', value: 'high-value' },
	{ label: 'At Risk', value: 'at-risk' },
	{ label: 'Churned', value: 'churned' },
	{ label: 'Enterprise', value: 'enterprise' },
	{ label: 'Trial User', value: 'trial' },
];

const teamMembers = [
	{ label: 'Alice Johnson', value: 'alice', description: 'Product Manager' },
	{ label: 'Bob Smith', value: 'bob', description: 'Engineering Lead' },
	{ label: 'Carol White', value: 'carol', description: 'Designer' },
	{ label: 'David Brown', value: 'david', description: 'Backend Developer' },
	{ label: 'Eva Martinez', value: 'eva', description: 'Frontend Developer' },
	{ label: 'Frank Lee', value: 'frank', description: 'QA Engineer' },
];

export function SelectSearchableBasicPreview() {
	const [value, setValue] = React.useState<string>('');

	return (
		<SelectSearchable
			items={frameworks}
			placeholder="Select a framework..."
			searchPlaceholder="Search frameworks..."
			value={value}
			onChange={setValue}
		/>
	);
}

export function SelectSearchableCountryPreview() {
	const [value, setValue] = React.useState<string>('');

	return (
		<SelectSearchable
			items={countries}
			placeholder="Select a country..."
			searchPlaceholder="Search countries..."
			value={value}
			onChange={setValue}
		/>
	);
}

export function SelectSearchableMultiplePreview() {
	const [value, setValue] = React.useState<string[]>(['vip', 'high-value']);

	return (
		<SelectSearchable
			items={tags}
			multiple
			placeholder="Add tags..."
			searchPlaceholder="Search tags..."
			value={value}
			onChange={setValue}
		/>
	);
}

export function SelectSearchableMultipleTeamPreview() {
	const [value, setValue] = React.useState<string[]>([]);

	return (
		<SelectSearchable
			items={teamMembers}
			multiple
			placeholder="Assign team members..."
			searchPlaceholder="Search people..."
			value={value}
			onChange={setValue}
		/>
	);
}

export function SelectSearchableMaxTagsPreview() {
	const [value, setValue] = React.useState<string[]>(['vip', 'high-value', 'returning', 'enterprise']);

	return (
		<SelectSearchable
			items={tags}
			multiple
			maxTags={2}
			placeholder="Add tags..."
			searchPlaceholder="Search tags..."
			value={value}
			onChange={setValue}
		/>
	);
}

export function SelectSearchableMaxNumberPreview() {
	const [value, setValue] = React.useState<string[]>([]);

	return (
		<SelectSearchable
			items={teamMembers}
			multiple
			maxNumber={3}
			placeholder="Pick up to 3 people..."
			searchPlaceholder="Search people..."
			value={value}
			onChange={setValue}
		/>
	);
}

export function SelectSearchableWithDescriptionPreview() {
	const [value, setValue] = React.useState<string>('');

	return (
		<SelectSearchable
			items={frameworks}
			placeholder="Pick a framework..."
			searchPlaceholder="Type to filter..."
			emptyMessage="No frameworks match your search."
			value={value}
			onChange={setValue}
		/>
	);
}

export function SelectSearchableDisabledPreview() {
	return (
		<SelectSearchable
			items={frameworks}
			placeholder="Disabled select..."
			disabled
		/>
	);
}

const tableColumns = [
	{ label: 'Customer Name', value: 'name' },
	{ label: 'Email Address', value: 'email' },
	{ label: 'Order Total', value: 'total' },
	{ label: 'Status', value: 'status' },
	{ label: 'Date Created', value: 'date' },
	{ label: 'Payment Method', value: 'payment' },
	{ label: 'Shipping Address', value: 'shipping' },
];

export function SelectSearchableCheckboxPreview() {
	const [value, setValue] = React.useState<string[]>(['name', 'email', 'total', 'status']);

	return (
		<SelectSearchable
			items={tableColumns}
			multiple
			indicator="checkbox"
			placeholder="Toggle columns..."
			searchPlaceholder="Search columns..."
			value={value}
			onChange={setValue}
		/>
	);
}

const permissions = [
	{ label: 'View Dashboard', value: 'view-dashboard' },
	{ label: 'Edit Products', value: 'edit-products' },
	{ label: 'Manage Orders', value: 'manage-orders' },
	{ label: 'Access Reports', value: 'access-reports' },
	{ label: 'Manage Users', value: 'manage-users' },
	{ label: 'Billing Settings', value: 'billing' },
];

export function SelectSearchableCheckboxPermissionsPreview() {
	const [value, setValue] = React.useState<string[]>(['view-dashboard', 'access-reports']);

	return (
		<SelectSearchable
			items={permissions}
			multiple
			indicator="checkbox"
			placeholder="Assign permissions..."
			searchPlaceholder="Search permissions..."
			value={value}
			onChange={setValue}
		/>
	);
}

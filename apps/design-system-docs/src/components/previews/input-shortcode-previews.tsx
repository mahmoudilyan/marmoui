'use client';

import React, { useState } from 'react';
import { InputShortcode } from '@marmoui/ui';

const allShortcodes = [
	{
		id: 'contact',
		section: 'contact',
		text: 'Contact',
		menu: [
			{ text: 'First Name', value: '{{first_name}}' },
			{ text: 'Last Name', value: '{{last_name}}' },
			{ text: 'Full Name', value: '{{full_name}}' },
			{ text: 'Email', value: '{{email}}' },
			{ text: 'Phone', value: '{{phone}}' },
		],
	},
	{
		id: 'order',
		section: 'order',
		text: 'Order',
		menu: [
			{ text: 'Order ID', value: '{{order_id}}' },
			{ text: 'Order Total', value: '{{order_total}}' },
			{ text: 'Product Name', value: '{{product_name}}' },
			{ text: 'Order Date', value: '{{order_date}}' },
			{ text: 'Tracking Number', value: '{{tracking_number}}' },
		],
	},
	{
		id: 'account',
		section: 'account',
		text: 'Account',
		menu: [
			{ text: 'Account ID', value: '{{account_id}}' },
			{ text: 'Company Name', value: '{{company_name}}' },
			{ text: 'Plan Name', value: '{{plan_name}}' },
			{ text: 'Renewal Date', value: '{{renewal_date}}' },
		],
	},
	{
		id: 'affiliate',
		section: 'affiliate',
		text: 'Affiliate',
		menu: [
			{ text: 'Affiliate Name', value: '{{affiliate_name}}' },
			{ text: 'Commission Rate', value: '{{commission_rate}}' },
			{ text: 'Referral Link', value: '{{referral_link}}' },
			{ text: 'Earnings', value: '{{earnings}}' },
		],
	},
	{
		id: 'links',
		section: 'links',
		text: 'Links',
		menu: [
			{ text: 'Login URL', value: '{{login_url}}' },
			{ text: 'Invoice URL', value: '{{invoice_url}}' },
			{ text: 'Unsubscribe URL', value: '{{unsubscribe_url}}' },
			{ text: 'Dashboard URL', value: '{{dashboard_url}}' },
		],
	},
];

/** Basic with a single shortcode group */
export function InputShortcodeBasicPreview() {
	const [value, setValue] = useState('');

	return (
		<InputShortcode
			value={value}
			onChange={setValue}
			shortcodes={[allShortcodes[0]]}
		/>
	);
}

/** Multiple shortcode groups */
export function InputShortcodeMultiGroupPreview() {
	const [value, setValue] = useState('');

	return (
		<InputShortcode
			value={value}
			onChange={setValue}
			shortcodes={allShortcodes}
			placeholder="Compose with merge fields..."
		/>
	);
}

/** Emoji picker only */
export function InputShortcodeEmojiOnlyPreview() {
	const [value, setValue] = useState('');

	return (
		<InputShortcode
			value={value}
			onChange={setValue}
			enableEmoji
			placeholder="Type and add emoji..."
		/>
	);
}

/** Shortcodes + Emoji combined */
export function InputShortcodeWithEmojiPreview() {
	const [value, setValue] = useState('');

	return (
		<InputShortcode
			value={value}
			onChange={setValue}
			shortcodes={allShortcodes}
			enableEmoji
			placeholder="Hey {{first_name}}, your order is ready! 🎉"
		/>
	);
}

/** Disabled state */
export function InputShortcodeDisabledPreview() {
	return (
		<InputShortcode
			value="Hello {{first_name}}"
			onChange={() => {}}
			shortcodes={[allShortcodes[0]]}
			disabled
		/>
	);
}

/** With placeholder */
export function InputShortcodePlaceholderPreview() {
	const [value, setValue] = useState('');

	return (
		<InputShortcode
			value={value}
			onChange={setValue}
			shortcodes={[allShortcodes[0], allShortcodes[1]]}
			placeholder="Enter email subject line..."
		/>
	);
}

/** Async loading from backend */
export function InputShortcodeAsyncPreview() {
	const [value, setValue] = useState('');

	const loadShortcodes = async () => {
		// Simulate API call with a delay
		await new Promise((resolve) => setTimeout(resolve, 1500));
		return allShortcodes;
	};

	return (
		<InputShortcode
			value={value}
			onChange={setValue}
			onLoadShortcodes={loadShortcodes}
			placeholder="Click the shortcode button to load from API..."
		/>
	);
}

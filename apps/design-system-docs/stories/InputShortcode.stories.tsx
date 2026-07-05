import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputShortcode as InputShortcodeBase } from '@marmoui/ui';

const InputShortcode = InputShortcodeBase as any;

const shortcodes = [
	{
		id: 'contact',
		section: 'Contact',
		text: 'Contact Fields',
		menu: [
			{ text: 'First Name', value: '[first_name]' },
			{ text: 'Last Name', value: '[last_name]' },
			{ text: 'Email', value: '[email]' },
		],
	},
	{
		id: 'company',
		section: 'Company',
		text: 'Company Fields',
		menu: [
			{ text: 'Company Name', value: '[company_name]' },
			{ text: 'Website', value: '[website]' },
		],
	},
];

const meta = {
	title: 'Components/InputShortcode',
	component: InputShortcode,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# InputShortcode

An input with shortcode picker and optional emoji support for personalized content.

## Features
- **Shortcode picker**: Insert merge fields from dropdown
- **Emoji support**: Optional emoji picker
- **Grouped shortcodes**: Organized by category
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof InputShortcodeBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = React.useState('');
		return (
			<div className="w-[400px]">
				<InputShortcode
					value={value}
					onChange={setValue}
					shortcodes={shortcodes}
					placeholder="Enter subject with personalization..."
				/>
			</div>
		);
	},
};

export const WithEmoji: Story = {
	render: () => {
		const [value, setValue] = React.useState('');
		return (
			<div className="w-[400px]">
				<InputShortcode
					value={value}
					onChange={setValue}
					shortcodes={shortcodes}
					enableEmoji
					placeholder="Type a message with emojis..."
				/>
			</div>
		);
	},
};

export const WithInitialValue: Story = {
	render: () => {
		const [value, setValue] = React.useState('Hello [first_name], welcome to our platform!');
		return (
			<div className="w-[400px]">
				<InputShortcode
					value={value}
					onChange={setValue}
					shortcodes={shortcodes}
					placeholder="Enter subject..."
				/>
			</div>
		);
	},
};

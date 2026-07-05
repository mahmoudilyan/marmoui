import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCard as CheckboxCardBase } from '@marmoui/ui';
import { MdEmail, MdSms, MdNotifications, MdPhone } from 'react-icons/md';

const CheckboxCard = CheckboxCardBase as any;

const meta = {
	title: 'Components/CheckboxCard',
	component: CheckboxCard,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# CheckboxCard

A checkbox styled as a selectable card for multi-select scenarios.

## Features
- **Visual selection**: Card-based checkbox options
- **Icon support**: Optional icon for each option
- **Description**: Secondary text for context
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof CheckboxCardBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [selected, setSelected] = React.useState<string[]>(['email']);
		const toggle = (val: string) =>
			setSelected((prev) =>
				prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
			);
		return (
			<div className="flex flex-col gap-3 w-[350px]">
				<CheckboxCard
					checked={selected.includes('email')}
					onChange={() => toggle('email')}
					title="Email"
					description="Get notified via email"
					icon={<MdEmail size={20} />}
				/>
				<CheckboxCard
					checked={selected.includes('sms')}
					onChange={() => toggle('sms')}
					title="SMS"
					description="Get notified via text message"
					icon={<MdSms size={20} />}
				/>
				<CheckboxCard
					checked={selected.includes('push')}
					onChange={() => toggle('push')}
					title="Push Notifications"
					description="Get notified on your device"
					icon={<MdNotifications size={20} />}
				/>
				<CheckboxCard
					checked={selected.includes('phone')}
					onChange={() => toggle('phone')}
					title="Phone Call"
					description="Get called for urgent alerts"
					icon={<MdPhone size={20} />}
				/>
			</div>
		);
	},
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioCard as RadioCardBase } from '@marmoui/ui';
import { MdCreditCard, MdAccountBalance, MdPayments } from 'react-icons/md';

const RadioCard = RadioCardBase as any;

const meta = {
	title: 'Components/RadioCard',
	component: RadioCard,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# RadioCard

A radio button styled as a selectable card for visually rich single-select options.

## Features
- **Visual selection**: Card-based radio options
- **Icon support**: Optional icons for each option
- **Description**: Secondary text for each option
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof RadioCardBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = React.useState('card');
		return (
			<div className="flex flex-col gap-3 w-[350px]">
				<RadioCard
					value="card"
					checked={value === 'card'}
					onChange={() => setValue('card')}
					title="Credit Card"
					description="Pay with Visa, Mastercard, or Amex"
					icon={<MdCreditCard size={20} />}
				/>
				<RadioCard
					value="bank"
					checked={value === 'bank'}
					onChange={() => setValue('bank')}
					title="Bank Transfer"
					description="Direct debit from your bank account"
					icon={<MdAccountBalance size={20} />}
				/>
				<RadioCard
					value="paypal"
					checked={value === 'paypal'}
					onChange={() => setValue('paypal')}
					title="PayPal"
					description="Pay using your PayPal balance"
					icon={<MdPayments size={20} />}
				/>
			</div>
		);
	},
};

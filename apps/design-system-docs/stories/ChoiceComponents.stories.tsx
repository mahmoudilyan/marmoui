import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Switch as SwitchBase,
	RadioGroup as RadioGroupBase,
	Radio as RadioBase,
	RadioCard as RadioCardBase,
	RadioCardItem as RadioCardItemBase,
	Checkbox as CheckboxBase,
	AvatarCheckbox as AvatarCheckboxBase,
	Label as LabelBase,
	Button as ButtonBase,
} from '@marmoui/ui';
import {
	MdEmail,
	MdSms,
	MdNotifications,
	MdDarkMode,
	MdLightMode,
	MdCreditCard,
	MdAccountBalance,
	MdPayment,
	MdStar,
	MdRocket,
	MdWorkspaces,
} from 'react-icons/md';

// Type assertions for React 19 compatibility
const Switch = SwitchBase as any;
const RadioGroup = RadioGroupBase as any;
const Radio = RadioBase as any;
const RadioCard = RadioCardBase as any;
const RadioCardItem = RadioCardItemBase as any;
const Checkbox = CheckboxBase as any;
const AvatarCheckbox = AvatarCheckboxBase as any;
const Label = LabelBase as any;
const Button = ButtonBase as any;

const meta = {
	title: 'Components/Forms/Choice Components',
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Choice Components

A collection of components for user selections including toggles, radio buttons, checkboxes, and specialized selection components.

## Components Included

- **Switch**: Toggle switch for on/off states
- **RadioGroup**: Standard radio button group
- **RadioCard**: Card-style radio options with icons and descriptions
- **Checkbox**: Standard checkbox for multiple selections
- **AvatarCheckbox**: Avatar with integrated checkbox for user selection

## Usage

\`\`\`tsx
import { 
  Switch, 
  RadioGroup, 
  RadioGroupItem,
  Checkbox,
  Label 
} from '@marmoui/ui';

// Switch
<Switch checked={enabled} onCheckedChange={setEnabled} />

// Radio Group
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1">Option 1</Radio>
  <Radio value="option2">Option 2</Radio>
</RadioGroup>

// Checkbox
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// SWITCH STORIES
// ============================================

export const SwitchDefault: Story = {
	name: 'Switch - Default',
	render: () => {
		const [enabled, setEnabled] = React.useState(false);

		return (
			<div className="flex items-center gap-3">
				<Switch checked={enabled} onCheckedChange={setEnabled} />
				<Label>{enabled ? 'Enabled' : 'Disabled'}</Label>
			</div>
		);
	},
};

export const SwitchWithLabels: Story = {
	name: 'Switch - With Labels',
	render: () => {
		const [notifications, setNotifications] = React.useState(true);
		const [marketing, setMarketing] = React.useState(false);
		const [updates, setUpdates] = React.useState(true);

		return (
			<div className="flex flex-col gap-4 w-80">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<MdNotifications className="text-ink-light" />
						<Label>Push Notifications</Label>
					</div>
					<Switch checked={notifications} onCheckedChange={setNotifications} />
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<MdEmail className="text-ink-light" />
						<Label>Marketing Emails</Label>
					</div>
					<Switch checked={marketing} onCheckedChange={setMarketing} />
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<MdSms className="text-ink-light" />
						<Label>Product Updates</Label>
					</div>
					<Switch checked={updates} onCheckedChange={setUpdates} />
				</div>
			</div>
		);
	},
};

export const SwitchDisabled: Story = {
	name: 'Switch - Disabled',
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<Switch disabled />
				<Label className="text-ink-light">Disabled Off</Label>
			</div>
			<div className="flex items-center gap-3">
				<Switch disabled checked />
				<Label className="text-ink-light">Disabled On</Label>
			</div>
		</div>
	),
};

export const SwitchThemeToggle: Story = {
	name: 'Switch - Theme Toggle',
	render: () => {
		const [isDark, setIsDark] = React.useState(false);

		return (
			<div className="flex items-center gap-3 p-4 rounded-lg border border-border">
				<MdLightMode className={isDark ? 'text-ink-light' : 'text-yellow-500'} size={20} />
				<Switch checked={isDark} onCheckedChange={setIsDark} />
				<MdDarkMode className={isDark ? 'text-blue-500' : 'text-ink-light'} size={20} />
			</div>
		);
	},
};

// ============================================
// RADIO GROUP STORIES
// ============================================

export const RadioGroupDefault: Story = {
	name: 'RadioGroup - Default',
	render: () => {
		const [value, setValue] = React.useState('option1');

		return (
			<RadioGroup value={value} onValueChange={setValue}>
				<Radio value="option1">Option 1</Radio>
				<Radio value="option2">Option 2</Radio>
				<Radio value="option3">Option 3</Radio>
			</RadioGroup>
		);
	},
};

export const RadioGroupHorizontal: Story = {
	name: 'RadioGroup - Horizontal',
	render: () => {
		const [value, setValue] = React.useState('small');

		return (
			<div>
				<Label className="block mb-2">Size</Label>
				<RadioGroup value={value} onValueChange={setValue} className="flex flex-row gap-4">
					<Radio value="small">Small</Radio>
					<Radio value="medium">Medium</Radio>
					<Radio value="large">Large</Radio>
				</RadioGroup>
			</div>
		);
	},
};

export const RadioGroupWithDescriptions: Story = {
	name: 'RadioGroup - With Descriptions',
	render: () => {
		const [value, setValue] = React.useState('email');

		return (
			<RadioGroup value={value} onValueChange={setValue} className="gap-4">
				<div className="flex flex-col gap-1">
					<Radio value="email">
						<span className="font-medium">Email Notifications</span>
					</Radio>
					<p className="text-sm text-ink-light ml-6">
						Receive notifications via email when someone mentions you.
					</p>
				</div>
				<div className="flex flex-col gap-1">
					<Radio value="sms">
						<span className="font-medium">SMS Notifications</span>
					</Radio>
					<p className="text-sm text-ink-light ml-6">
						Get text messages for urgent notifications only.
					</p>
				</div>
				<div className="flex flex-col gap-1">
					<Radio value="none">
						<span className="font-medium">No Notifications</span>
					</Radio>
					<p className="text-sm text-ink-light ml-6">Turn off all external notifications.</p>
				</div>
			</RadioGroup>
		);
	},
};

// ============================================
// RADIO CARD STORIES
// ============================================

export const RadioCardDefault: Story = {
	name: 'RadioCard - Default',
	render: () => {
		const [value, setValue] = React.useState('credit');

		return (
			<RadioCard value={value} onValueChange={setValue} className="w-96">
				<RadioCardItem
					value="credit"
					icon={<MdCreditCard size={24} className="text-primary" />}
					label="Credit Card"
					description="Pay with Visa, Mastercard, or American Express"
				/>
				<RadioCardItem
					value="bank"
					icon={<MdAccountBalance size={24} className="text-primary" />}
					label="Bank Transfer"
					description="Direct bank account transfer"
				/>
				<RadioCardItem
					value="paypal"
					icon={<MdPayment size={24} className="text-primary" />}
					label="PayPal"
					description="Pay securely with your PayPal account"
				/>
			</RadioCard>
		);
	},
};

export const RadioCardPlans: Story = {
	name: 'RadioCard - Pricing Plans',
	render: () => {
		const [value, setValue] = React.useState('pro');

		return (
			<RadioCard value={value} onValueChange={setValue} className="w-96">
				<RadioCardItem
					value="starter"
					icon={<MdStar size={24} className="text-yellow-500" />}
					label="Starter"
					description="Perfect for individuals and small projects"
					addon={
						<div className="text-lg font-bold text-primary">
							$9<span className="text-sm font-normal text-ink-light">/mo</span>
						</div>
					}
				/>
				<RadioCardItem
					value="pro"
					icon={<MdRocket size={24} className="text-blue-500" />}
					label="Pro"
					description="Best for growing teams and businesses"
					addon={
						<div className="text-lg font-bold text-primary">
							$29<span className="text-sm font-normal text-ink-light">/mo</span>
						</div>
					}
				/>
				<RadioCardItem
					value="enterprise"
					icon={<MdWorkspaces size={24} className="text-purple-500" />}
					label="Enterprise"
					description="For large organizations with custom needs"
					addon={<div className="text-lg font-bold text-primary">Custom</div>}
				/>
			</RadioCard>
		);
	},
};

// ============================================
// CHECKBOX STORIES
// ============================================

export const CheckboxDefault: Story = {
	name: 'Checkbox - Default',
	render: () => {
		const [checked, setChecked] = React.useState(false);

		return (
			<div className="flex items-center gap-2">
				<Checkbox
					id="terms"
					checked={checked}
					onCheckedChange={(value: boolean | 'indeterminate') => setChecked(value === true)}
				/>
				<Label htmlFor="terms">Accept terms and conditions</Label>
			</div>
		);
	},
};

export const CheckboxGroup: Story = {
	name: 'Checkbox - Group',
	render: () => {
		const [selected, setSelected] = React.useState<string[]>(['email']);

		const toggle = (value: string) => {
			setSelected(prev =>
				prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
			);
		};

		return (
			<div className="flex flex-col gap-3">
				<Label className="font-medium">Notification Preferences</Label>
				<div className="flex items-center gap-2">
					<Checkbox
						id="email"
						checked={selected.includes('email')}
						onCheckedChange={() => toggle('email')}
					/>
					<Label htmlFor="email">Email notifications</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox
						id="sms"
						checked={selected.includes('sms')}
						onCheckedChange={() => toggle('sms')}
					/>
					<Label htmlFor="sms">SMS notifications</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox
						id="push"
						checked={selected.includes('push')}
						onCheckedChange={() => toggle('push')}
					/>
					<Label htmlFor="push">Push notifications</Label>
				</div>
			</div>
		);
	},
};

export const CheckboxIndeterminate: Story = {
	name: 'Checkbox - Indeterminate',
	render: () => {
		const [items, setItems] = React.useState({
			item1: true,
			item2: false,
			item3: true,
		});

		const allChecked = Object.values(items).every(Boolean);
		const someChecked = Object.values(items).some(Boolean);
		const isIndeterminate = someChecked && !allChecked;

		const handleParentChange = () => {
			const newValue = !allChecked;
			setItems({
				item1: newValue,
				item2: newValue,
				item3: newValue,
			});
		};

		return (
			<div className="flex flex-col gap-3">
				<div className="flex items-center gap-2">
					<Checkbox
						id="parent"
						checked={isIndeterminate ? 'indeterminate' : allChecked}
						onCheckedChange={handleParentChange}
					/>
					<Label htmlFor="parent" className="font-medium">
						Select All
					</Label>
				</div>
				<div className="ml-6 flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<Checkbox
							id="item1"
							checked={items.item1}
							onCheckedChange={() => setItems(prev => ({ ...prev, item1: !prev.item1 }))}
						/>
						<Label htmlFor="item1">Item 1</Label>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="item2"
							checked={items.item2}
							onCheckedChange={() => setItems(prev => ({ ...prev, item2: !prev.item2 }))}
						/>
						<Label htmlFor="item2">Item 2</Label>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="item3"
							checked={items.item3}
							onCheckedChange={() => setItems(prev => ({ ...prev, item3: !prev.item3 }))}
						/>
						<Label htmlFor="item3">Item 3</Label>
					</div>
				</div>
			</div>
		);
	},
};

export const CheckboxDisabled: Story = {
	name: 'Checkbox - Disabled',
	render: () => (
		<div className="flex flex-col gap-3">
			<div className="flex items-center gap-2">
				<Checkbox id="disabled1" disabled />
				<Label htmlFor="disabled1" className="text-ink-light">
					Disabled unchecked
				</Label>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox id="disabled2" disabled checked />
				<Label htmlFor="disabled2" className="text-ink-light">
					Disabled checked
				</Label>
			</div>
		</div>
	),
};

// ============================================
// REAL-WORLD EXAMPLES
// ============================================

export const NotificationSettings: Story = {
	name: 'Example - Notification Settings',
	render: () => {
		const [settings, setSettings] = React.useState({
			emailNotifications: true,
			pushNotifications: false,
			smsNotifications: false,
			weeklyDigest: true,
			marketingEmails: false,
		});

		const updateSetting = (key: keyof typeof settings) => {
			setSettings(prev => ({ ...prev, [key]: !prev[key] }));
		};

		return (
			<div className="w-96 p-6 border border-border rounded-lg bg-panel">
				<h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div>
							<Label className="font-medium">Email Notifications</Label>
							<p className="text-xs text-ink-light">Receive updates via email</p>
						</div>
						<Switch
							checked={settings.emailNotifications}
							onCheckedChange={() => updateSetting('emailNotifications')}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<Label className="font-medium">Push Notifications</Label>
							<p className="text-xs text-ink-light">Browser push notifications</p>
						</div>
						<Switch
							checked={settings.pushNotifications}
							onCheckedChange={() => updateSetting('pushNotifications')}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<Label className="font-medium">SMS Notifications</Label>
							<p className="text-xs text-ink-light">Text message alerts</p>
						</div>
						<Switch
							checked={settings.smsNotifications}
							onCheckedChange={() => updateSetting('smsNotifications')}
						/>
					</div>
					<hr className="border-border" />
					<div className="flex items-center gap-2">
						<Checkbox
							id="weekly"
							checked={settings.weeklyDigest}
							onCheckedChange={() => updateSetting('weeklyDigest')}
						/>
						<Label htmlFor="weekly">Weekly digest email</Label>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="marketing"
							checked={settings.marketingEmails}
							onCheckedChange={() => updateSetting('marketingEmails')}
						/>
						<Label htmlFor="marketing">Marketing communications</Label>
					</div>
					<Button className="w-full mt-2">Save Preferences</Button>
				</div>
			</div>
		);
	},
};

export const SubscriptionForm: Story = {
	name: 'Example - Subscription Form',
	render: () => {
		const [plan, setPlan] = React.useState('monthly');
		const [paymentMethod, setPaymentMethod] = React.useState('credit');
		const [agreeTerms, setAgreeTerms] = React.useState(false);

		return (
			<div className="w-96 p-6 border border-border rounded-lg bg-panel">
				<h3 className="text-lg font-semibold mb-4">Choose Your Plan</h3>
				<div className="flex flex-col gap-6">
					<div>
						<Label className="font-medium mb-2 block">Billing Cycle</Label>
						<RadioGroup value={plan} onValueChange={setPlan} className="flex gap-4">
							<Radio value="monthly">Monthly</Radio>
							<Radio value="yearly">Yearly (Save 20%)</Radio>
						</RadioGroup>
					</div>

					<div>
						<Label className="font-medium mb-2 block">Payment Method</Label>
						<RadioCard value={paymentMethod} onValueChange={setPaymentMethod}>
							<RadioCardItem
								value="credit"
								icon={<MdCreditCard size={20} />}
								label="Credit Card"
								description="Visa, Mastercard, Amex"
							/>
							<RadioCardItem
								value="paypal"
								icon={<MdPayment size={20} />}
								label="PayPal"
								description="Pay with PayPal"
							/>
						</RadioCard>
					</div>

					<div className="flex items-start gap-2">
						<Checkbox
							id="terms"
							checked={agreeTerms}
							onCheckedChange={(checked: boolean | 'indeterminate') =>
								setAgreeTerms(checked === true)
							}
							className="mt-0.5"
						/>
						<Label htmlFor="terms" className="text-sm">
							I agree to the{' '}
							<a href="#" className="text-primary underline">
								terms of service
							</a>{' '}
							and{' '}
							<a href="#" className="text-primary underline">
								privacy policy
							</a>
						</Label>
					</div>

					<Button disabled={!agreeTerms} className="w-full">
						Subscribe Now
					</Button>
				</div>
			</div>
		);
	},
};

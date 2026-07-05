import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Input as InputBase,
	InputGroup as InputGroupBase,
	InputGroupAddon as InputGroupAddonBase,
	InputGroupButton as InputGroupButtonBase,
	InputGroupInput as InputGroupInputBase,
	InputGroupText as InputGroupTextBase,
	InputGroupTextarea as InputGroupTextareaBase,
	InputShortcode as InputShortcodeBase,
	NumberInput as NumberInputBase,
	TagsInput as TagsInputBase,
	TagsInputLabel as TagsInputLabelBase,
	TagsInputList as TagsInputListBase,
	TagsInputInput as TagsInputInputBase,
	TagsInputItem as TagsInputItemBase,
	Button as ButtonBase,
	IconButton as IconButtonBase,
	Label as LabelBase,
} from '@marmoui/ui';
import {
	MdSearch,
	MdVisibility,
	MdVisibilityOff,
	MdEmail,
	MdLock,
	MdPerson,
	MdLink,
	MdAttachMoney,
	MdSend,
	MdContentCopy,
} from 'react-icons/md';

// Type assertions for React 19 compatibility
const Input = InputBase as any;
const InputGroup = InputGroupBase as any;
const InputGroupAddon = InputGroupAddonBase as any;
const InputGroupButton = InputGroupButtonBase as any;
const InputGroupInput = InputGroupInputBase as any;
const InputGroupText = InputGroupTextBase as any;
const InputGroupTextarea = InputGroupTextareaBase as any;
const InputShortcode = InputShortcodeBase as any;
const NumberInput = NumberInputBase as any;
const TagsInput = TagsInputBase as any;
const TagsInputLabel = TagsInputLabelBase as any;
const TagsInputList = TagsInputListBase as any;
const TagsInputInput = TagsInputInputBase as any;
const TagsInputItem = TagsInputItemBase as any;
const Button = ButtonBase as any;
const IconButton = IconButtonBase as any;
const Label = LabelBase as any;

const meta = {
	title: 'Components/Forms/Input',
	component: Input,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Input Components

A comprehensive collection of input components for forms, including basic text inputs, grouped inputs with addons, shortcode inputs with emoji support, rich text inputs, number inputs, and tag inputs.

## Components Included

- **Input**: Basic text input with variants and sizes
- **InputGroup**: Compound input with addons, buttons, and icons
- **InputShortcode**: Input with shortcode picker and emoji support
- **NumberInput**: Numeric input with increment/decrement controls
- **TagsInput**: Multi-value input for tags/chips

## Usage

\`\`\`tsx
import { Input, InputGroup, NumberInput, TagsInput } from '@marmoui/ui';

// Basic Input
<Input placeholder="Enter text..." />

// Input with variants
<Input variant="destructive" placeholder="Error state" />

// Number Input
<NumberInput min={0} max={100} step={1} />
\`\`\`
				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['normal', 'destructive', 'success', 'warning'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		disabled: { control: 'boolean' },
		placeholder: { control: 'text' },
	},
	args: {
		variant: 'normal',
		size: 'md',
		placeholder: 'Enter text...',
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// BASIC INPUT STORIES
// ============================================

export const Default: Story = {
	args: {},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-6 w-80">
			<div>
				<Label className="mb-2 block">Normal (Default)</Label>
				<Input variant="normal" placeholder="Normal input" />
				<p className="text-xs text-ink-light mt-1">Hover and focus to see state changes</p>
			</div>
			<div>
				<Label className="mb-2 block text-destructive">Destructive / Error</Label>
				<Input variant="destructive" placeholder="Error input" />
				<p className="text-xs text-ink-destructive mt-1">Always shows red border and ring</p>
			</div>
			<div>
				<Label className="mb-2 block text-ink-success">Success</Label>
				<Input variant="success" placeholder="Success input" />
				<p className="text-xs text-ink-success mt-1">Always shows green border and ring</p>
			</div>
			<div>
				<Label className="mb-2 block text-ink-warning">Warning</Label>
				<Input variant="warning" placeholder="Warning input" />
				<p className="text-xs text-ink-warning mt-1">Always shows yellow border and ring</p>
			</div>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-80">
			<div>
				<Label className="mb-1 block">Small</Label>
				<Input size="sm" placeholder="Small input" />
			</div>
			<div>
				<Label className="mb-1 block">Medium (Default)</Label>
				<Input size="md" placeholder="Medium input" />
			</div>
			<div>
				<Label className="mb-1 block">Large</Label>
				<Input size="lg" placeholder="Large input" />
			</div>
		</div>
	),
};

export const WithAdornments: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-80">
			<div>
				<Label className="mb-1 block">Start Adornment</Label>
				<Input startAdornment={<MdSearch size={18} />} placeholder="Search..." />
			</div>
			<div>
				<Label className="mb-1 block">End Adornment</Label>
				<Input endAdornment={<MdEmail size={18} />} placeholder="Email address" />
			</div>
			<div>
				<Label className="mb-1 block">Both Adornments</Label>
				<Input
					startAdornment={<MdAttachMoney size={18} />}
					endAdornment={<span className="text-xs text-ink-light">USD</span>}
					placeholder="0.00"
				/>
			</div>
		</div>
	),
};

export const PasswordInput: Story = {
	render: () => {
		const [showPassword, setShowPassword] = React.useState(false);

		return (
			<div className="w-80">
				<Label className="mb-1 block">Password</Label>
				<Input
					type={showPassword ? 'text' : 'password'}
					startAdornment={<MdLock size={18} />}
					endAdornment={
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="hover:text-ink transition-colors"
						>
							{showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
						</button>
					}
					placeholder="Enter password"
				/>
			</div>
		);
	},
};

export const DisabledState: Story = {
	args: {
		disabled: true,
		value: 'Disabled input',
	},
};

// ============================================
// INPUT GROUP STORIES
// ============================================

export const InputGroupBasic: Story = {
	name: 'InputGroup - Basic',
	render: () => (
		<div className="flex flex-col gap-4 w-96">
			<div>
				<Label className="mb-1 block">With Icon Addon</Label>
				<InputGroup>
					<InputGroupAddon>
						<MdSearch size={16} />
					</InputGroupAddon>
					<InputGroupInput placeholder="Search..." />
				</InputGroup>
			</div>
			<div>
				<Label className="mb-1 block">With Text Addon</Label>
				<InputGroup>
					<InputGroupAddon>
						<InputGroupText>https://</InputGroupText>
					</InputGroupAddon>
					<InputGroupInput placeholder="example.com" />
				</InputGroup>
			</div>
			<div>
				<Label className="mb-1 block">With End Addon</Label>
				<InputGroup>
					<InputGroupInput placeholder="Username" />
					<InputGroupAddon align="inline-end">
						<InputGroupText>@domain.com</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
			</div>
		</div>
	),
};

export const InputGroupWithButtons: Story = {
	name: 'InputGroup - With Buttons',
	render: () => (
		<div className="flex flex-col gap-4 w-96">
			<div>
				<Label className="mb-1 block">Copy Link</Label>
				<InputGroup>
					<InputGroupAddon>
						<MdLink size={16} />
					</InputGroupAddon>
					<InputGroupInput value="https://example.com/share/abc123" readOnly />
					<InputGroupAddon align="inline-end">
						<InputGroupButton variant="ghost" size="xs">
							<MdContentCopy size={14} />
							Copy
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</div>
			<div>
				<Label className="mb-1 block">Send Message</Label>
				<InputGroup>
					<InputGroupInput placeholder="Type your message..." />
					<InputGroupAddon align="inline-end">
						<InputGroupButton variant="primary" size="xs">
							<MdSend size={14} />
							Send
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</div>
		</div>
	),
};

export const InputGroupSizes: Story = {
	name: 'InputGroup - Sizes',
	render: () => (
		<div className="flex flex-col gap-4 w-96">
			<div>
				<Label className="mb-1 block">Small</Label>
				<InputGroup size="sm">
					<InputGroupAddon>
						<MdSearch size={14} />
					</InputGroupAddon>
					<InputGroupInput size="sm" placeholder="Small search..." />
				</InputGroup>
			</div>
			<div>
				<Label className="mb-1 block">Medium</Label>
				<InputGroup size="md">
					<InputGroupAddon>
						<MdSearch size={16} />
					</InputGroupAddon>
					<InputGroupInput size="md" placeholder="Medium search..." />
				</InputGroup>
			</div>
			<div>
				<Label className="mb-1 block">Large</Label>
				<InputGroup size="lg">
					<InputGroupAddon>
						<MdSearch size={18} />
					</InputGroupAddon>
					<InputGroupInput size="lg" placeholder="Large search..." />
				</InputGroup>
			</div>
		</div>
	),
};

// ============================================
// INPUT SHORTCODE STORIES
// ============================================

const sampleShortcodes = [
	{
		id: 'contact',
		section: 'Contact',
		text: 'Contact Fields',
		menu: [
			{ text: 'First Name', value: '[first_name]' },
			{ text: 'Last Name', value: '[last_name]' },
			{ text: 'Email', value: '[email]' },
			{ text: 'Phone', value: '[phone]' },
		],
	},
	{
		id: 'company',
		section: 'Company',
		text: 'Company Fields',
		menu: [
			{ text: 'Company Name', value: '[company_name]' },
			{ text: 'Company Address', value: '[company_address]' },
			{ text: 'Website', value: '[website]' },
		],
	},
	{
		id: 'date',
		section: 'Date',
		text: 'Date Fields',
		menu: [
			{ text: 'Current Date', value: '[current_date]' },
			{ text: 'Current Year', value: '[current_year]' },
			{ text: 'Today', value: '[today]' },
		],
	},
];

export const InputShortcodeBasic: Story = {
	name: 'InputShortcode - Basic',
	render: () => {
		const [value, setValue] = React.useState('');

		return (
			<div className="w-96">
				<Label className="mb-1 block">Subject Line</Label>
				<InputShortcode
					value={value}
					onChange={setValue}
					shortcodes={sampleShortcodes}
					placeholder="Enter subject with personalization..."
				/>
				<p className="text-xs text-ink-light mt-2">Click the code icon to insert shortcodes</p>
			</div>
		);
	},
};

export const InputShortcodeWithEmoji: Story = {
	name: 'InputShortcode - With Emoji',
	render: () => {
		const [value, setValue] = React.useState('');

		return (
			<div className="w-96">
				<Label className="mb-1 block">Message</Label>
				<InputShortcode
					value={value}
					onChange={setValue}
					shortcodes={sampleShortcodes}
					enableEmoji
					placeholder="Type a message with emojis..."
				/>
				<p className="text-xs text-ink-light mt-2">Use emoji picker and shortcode insertion</p>
			</div>
		);
	},
};

// ============================================
// TAGS INPUT STORIES
// ============================================

export const TagsInputBasic: Story = {
	name: 'TagsInput - Basic',
	render: () => {
		const [values, setValues] = React.useState<string[]>(['React', 'TypeScript']);

		return (
			<div className="w-96">
				<TagsInput value={values} onValueChange={setValues}>
					<TagsInputLabel>Technologies</TagsInputLabel>
					<TagsInputList>
						{values.map(value => (
							<TagsInputItem key={value} value={value}>
								{value}
							</TagsInputItem>
						))}
						<TagsInputInput placeholder="Add technology..." />
					</TagsInputList>
				</TagsInput>
			</div>
		);
	},
};

export const TagsInputWithManyTags: Story = {
	name: 'TagsInput - With Many Tags',
	render: () => {
		const [values, setValues] = React.useState<string[]>([
			'JavaScript',
			'TypeScript',
			'React',
			'Next.js',
			'Node.js',
			'GraphQL',
		]);

		return (
			<div className="w-96">
				<TagsInput value={values} onValueChange={setValues}>
					<TagsInputLabel>Skills</TagsInputLabel>
					<TagsInputList>
						{values.map(value => (
							<TagsInputItem key={value} value={value}>
								{value}
							</TagsInputItem>
						))}
						<TagsInputInput placeholder="Add skill..." />
					</TagsInputList>
				</TagsInput>
				<p className="text-xs text-ink-light mt-2">
					Press Enter or comma to add, Backspace to remove
				</p>
			</div>
		);
	},
};

// ============================================
// FORM EXAMPLES
// ============================================

export const LoginForm: Story = {
	name: 'Example - Login Form',
	render: () => {
		const [email, setEmail] = React.useState('');
		const [password, setPassword] = React.useState('');
		const [showPassword, setShowPassword] = React.useState(false);

		return (
			<div className="w-80 p-6 border border-border rounded-lg bg-panel">
				<h3 className="text-lg font-semibold mb-4">Sign In</h3>
				<div className="flex flex-col gap-4">
					<div>
						<Label className="mb-1 block">Email</Label>
						<Input
							type="email"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
							startAdornment={<MdEmail size={18} />}
							placeholder="you@example.com"
						/>
					</div>
					<div>
						<Label className="mb-1 block">Password</Label>
						<Input
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
							startAdornment={<MdLock size={18} />}
							endAdornment={
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="hover:text-ink transition-colors"
								>
									{showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
								</button>
							}
							placeholder="••••••••"
						/>
					</div>
					<Button className="w-full">Sign In</Button>
				</div>
			</div>
		);
	},
};

export const ProductForm: Story = {
	name: 'Example - Product Form',
	render: () => {
		const [price, setPrice] = React.useState<number | undefined>(29.99);
		const [quantity, setQuantity] = React.useState<number | undefined>(100);
		const [tags, setTags] = React.useState<string[]>(['New', 'Featured']);

		return (
			<div className="w-96 p-6 border border-border rounded-lg bg-panel">
				<h3 className="text-lg font-semibold mb-4">Add Product</h3>
				<div className="flex flex-col gap-4">
					<div>
						<Label className="mb-1 block">Product Name</Label>
						<Input placeholder="Enter product name" />
					</div>
					<div>
						<Label className="mb-1 block">Price</Label>
						<InputGroup>
							<InputGroupAddon>
								<MdAttachMoney size={16} />
							</InputGroupAddon>
							<InputGroupInput placeholder="0.00" type="number" step="0.01" />
							<InputGroupAddon align="inline-end">
								<InputGroupText>USD</InputGroupText>
							</InputGroupAddon>
						</InputGroup>
					</div>
					<div>
						<Label className="mb-1 block">Stock Quantity</Label>
						<NumberInput value={quantity} onValueChange={setQuantity} min={0} step={1} />
					</div>
					<div>
						<TagsInput value={tags} onValueChange={setTags}>
							<TagsInputLabel>Product Tags</TagsInputLabel>
							<TagsInputList>
								{tags.map(tag => (
									<TagsInputItem key={tag} value={tag}>
										{tag}
									</TagsInputItem>
								))}
								<TagsInputInput placeholder="Add tag..." />
							</TagsInputList>
						</TagsInput>
					</div>
					<Button className="w-full">Save Product</Button>
				</div>
			</div>
		);
	},
};
